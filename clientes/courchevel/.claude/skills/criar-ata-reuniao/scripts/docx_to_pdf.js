#!/usr/bin/env node
/**
 * docx_to_pdf.js — Converte um arquivo .docx em .pdf via Google Drive API.
 *
 * Uso: node docx_to_pdf.js <input.docx> <output.pdf>
 *
 * Requer credenciais OAuth Google em ~/.claude/google-token.json
 * e ~/.claude/google-oauth-credentials.json.
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const https = require("https");

const TOKEN_PATH = path.join(os.homedir(), ".claude", "google-token.json");
const CREDS_PATH = path.join(os.homedir(), ".claude", "google-oauth-credentials.json");

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode}: ${buf.toString().slice(0, 500)}`));
        }
        resolve({ status: res.statusCode, headers: res.headers, body: buf });
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function refreshAccessToken() {
  const tok = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, "utf-8"));
  const c = creds.installed || creds.web || creds;
  const params = new URLSearchParams({
    client_id: c.client_id,
    client_secret: c.client_secret,
    refresh_token: tok.refresh_token,
    grant_type: "refresh_token",
  }).toString();
  const { body } = await httpsRequest({
    hostname: "oauth2.googleapis.com",
    path: "/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(params),
    },
  }, params);
  return JSON.parse(body.toString()).access_token;
}

async function uploadAsGoogleDoc(access, docxPath) {
  const fileBytes = fs.readFileSync(docxPath);
  const boundary = "nyo_b_" + Date.now();
  const metadata = {
    name: path.basename(docxPath, ".docx") + "__tmp",
    mimeType: "application/vnd.google-apps.document",
  };
  const head = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify(metadata) + `\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document\r\n\r\n`
  );
  const tail = Buffer.from(`\r\n--${boundary}--`);
  const body = Buffer.concat([head, fileBytes, tail]);
  const { body: resp } = await httpsRequest({
    hostname: "www.googleapis.com",
    path: "/upload/drive/v3/files?uploadType=multipart",
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
      "Content-Length": body.length,
    },
  }, body);
  return JSON.parse(resp.toString()).id;
}

async function exportPdf(access, fileId, pdfOut) {
  const { body } = await httpsRequest({
    hostname: "www.googleapis.com",
    path: `/drive/v3/files/${fileId}/export?mimeType=application/pdf`,
    method: "GET",
    headers: { Authorization: `Bearer ${access}` },
  });
  fs.writeFileSync(pdfOut, body);
  return body.length;
}

async function deleteTmpFile(access, fileId) {
  await httpsRequest({
    hostname: "www.googleapis.com",
    path: `/drive/v3/files/${fileId}`,
    method: "DELETE",
    headers: { Authorization: `Bearer ${access}` },
  });
}

async function main() {
  const [, , docxArg, pdfArg] = process.argv;
  if (!docxArg || !pdfArg) {
    console.error("Uso: node docx_to_pdf.js <input.docx> <output.pdf>");
    process.exit(2);
  }
  const docxPath = path.resolve(docxArg);
  const pdfOut = path.resolve(pdfArg);

  console.log("→ Refreshing Google OAuth token...");
  const access = await refreshAccessToken();

  console.log("→ Uploading DOCX as Google Doc...");
  const fileId = await uploadAsGoogleDoc(access, docxPath);
  console.log(`  tmp id: ${fileId}`);

  console.log("→ Exporting as PDF...");
  const size = await exportPdf(access, fileId, pdfOut);
  console.log(`OK · PDF gerado: ${pdfOut} (${size.toLocaleString()} bytes)`);

  console.log("→ Cleaning up...");
  await deleteTmpFile(access, fileId);
  console.log("OK · tmp deletado do Drive");
}

main().catch((err) => { console.error("ERRO:", err.message); process.exit(1); });
