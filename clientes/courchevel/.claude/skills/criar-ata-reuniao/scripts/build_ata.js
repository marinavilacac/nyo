#!/usr/bin/env node
/**
 * build_ata.js — Gera ata em .docx no padrão visual NYO.
 *
 * Inspirado no skill `relatorio-status-duvidas` (build_doc.js): layout fixo,
 * componentes simples, sem page breaks artificiais, fluxo natural.
 *
 * Uso:
 *   node build_ata.js <conteudo.json> <saida.docx>
 *
 * Conteúdo: ver assets/example_ata.json para schema.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType,
  HeadingLevel, PageNumber,
} = require("docx");

// ─── Paleta NYO ─────────────────────────────────────────────────────────────
const COLOR = {
  ink:      "111111",
  mute:     "6B6B6B",
  soft:     "9A9A9A",
  red:      "FF0000",   // vermelho oficial NYO (RGB 255,0,0)
  redDark:  "CC0000",
  redSoft:  "FFE8E5",
  amber:    "92400E",
  amberSoft:"FEF3C7",
  green:    "065F46",
  greenSoft:"D1FAE5",
  blue:     "1E40AF",
  blueSoft: "DBEAFE",
  warm:     "FAF6EF",
  line:     "E0E0E0",
  lineSoft: "EDEDED",
  paper:    "FFFFFF",
};

const PALETTE = {
  amber: { fill: COLOR.amberSoft, line: COLOR.amber },
  red:   { fill: COLOR.redSoft,   line: COLOR.red },
  green: { fill: COLOR.greenSoft, line: COLOR.green },
  blue:  { fill: COLOR.blueSoft,  line: COLOR.blue },
  warm:  { fill: COLOR.warm,      line: COLOR.red },
};

// Tipografia oficial NYO:
// - heading/body: Arial (fallback de Sequel Sans, que não é Web Font)
// - tag: Space Grotesk (Google Fonts resolve no Google Docs e Word com conexão)
const FONT = {
  heading: "Arial",
  body:    "Arial",
  tag:     "Space Grotesk",
  mono:    "Courier New",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const border = (color = COLOR.line, size = 4) => ({
  top:    { style: BorderStyle.SINGLE, size, color },
  bottom: { style: BorderStyle.SINGLE, size, color },
  left:   { style: BorderStyle.SINGLE, size, color },
  right:  { style: BorderStyle.SINGLE, size, color },
});
const noBorder = () => ({
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
});
const cellPad = { top: 100, bottom: 100, left: 140, right: 140 };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60, line: 300 },
    ...opts,
    children: [new TextRun({ text, font: FONT.body, size: 22, color: COLOR.ink, ...(opts.run || {}) })],
  });
}

function pRich(parts, opts = {}) {
  // parts: array of { text, bold?, italic?, color?, size? }
  return new Paragraph({
    spacing: { before: 60, after: 60, line: 300 },
    ...opts,
    children: parts.map(part => new TextRun({
      text: part.text,
      font: FONT.body,
      size: part.size ?? 22,
      bold: part.bold,
      italics: part.italic,
      color: part.color ?? COLOR.ink,
    })),
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40, line: 290 },
    ...opts,
    children: [new TextRun({ text, font: FONT.body, size: 22, color: COLOR.ink, ...(opts.run || {}) })],
  });
}

function bulletRich(parts) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40, line: 290 },
    children: parts.map(part => new TextRun({
      text: part.text,
      font: FONT.body,
      size: part.size ?? 22,
      bold: part.bold,
      italics: part.italic,
      color: part.color ?? COLOR.ink,
    })),
  });
}

function H1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, color: COLOR.ink, size: 32, font: FONT.heading })],
  });
}
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, bold: true, color: COLOR.ink, size: 26, font: FONT.heading })],
  });
}
function H3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, color: COLOR.ink, size: 22, font: FONT.heading })],
  });
}
function spacer(after = 100) {
  return new Paragraph({ spacing: { before: 0, after }, children: [new TextRun("")] });
}

function sectionTag(num, label) {
  return new Paragraph({
    spacing: { before: 360, after: 20 },
    children: [new TextRun({
      text: `SEÇÃO ${num} · ${label.toUpperCase()}`,
      bold: true, color: COLOR.red, size: 16, characterSpacing: 60, font: FONT.tag,
    })],
  });
}

// ─── Componentes ─────────────────────────────────────────────────────────────
function calloutBox(label, text, palette = "amber") {
  const pal = PALETTE[palette] || PALETTE.amber;
  return new Table({
    width: { size: 9640, type: WidthType.DXA },
    columnWidths: [9640],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top:    { style: BorderStyle.SINGLE, size: 4,  color: pal.line },
              bottom: { style: BorderStyle.SINGLE, size: 4,  color: pal.line },
              left:   { style: BorderStyle.SINGLE, size: 18, color: pal.line },
              right:  { style: BorderStyle.SINGLE, size: 4,  color: pal.line },
            },
            width: { size: 9640, type: WidthType.DXA },
            shading: { fill: pal.fill, type: ShadingType.CLEAR },
            margins: { top: 180, bottom: 180, left: 240, right: 240 },
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({
                  text: (label || "").toUpperCase(),
                  bold: true, color: pal.line, size: 16, characterSpacing: 50, font: FONT.tag,
                })],
              }),
              new Paragraph({
                spacing: { after: 0, line: 290 },
                children: [new TextRun({ text: text || "", size: 22, color: COLOR.ink, font: FONT.body })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function fichaTecnica(ficha) {
  // Build 2-row table for 4 cols
  const items = [
    { t: "CLIENTE",    v: ficha.cliente    || "" },
    { t: "DATA",       v: ficha.data       || "" },
    { t: "MODALIDADE", v: ficha.modalidade || "" },
    { t: "DURAÇÃO",    v: ficha.duracao    || "" },
  ];
  return new Table({
    width: { size: 9640, type: WidthType.DXA },
    columnWidths: [2410, 2410, 2410, 2410],
    rows: [
      new TableRow({
        children: items.map((c) => new TableCell({
          borders: border(COLOR.line, 4),
          width: { size: 2410, type: WidthType.DXA },
          shading: { fill: COLOR.warm, type: ShadingType.CLEAR },
          margins: cellPad,
          children: [
            new Paragraph({
              spacing: { after: 30 },
              children: [new TextRun({
                text: c.t, bold: true, color: COLOR.mute, size: 14, characterSpacing: 40, font: FONT.tag,
              })],
            }),
            new Paragraph({
              children: [new TextRun({ text: c.v, bold: true, color: COLOR.ink, size: 20, font: FONT.body })],
            }),
          ],
        })),
      }),
    ],
  });
}

function tableSimple(headers, rows, colWidths) {
  const cols = colWidths || headers.map(() => Math.floor(9640 / headers.length));

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders: border(COLOR.ink, 4),
      width: { size: cols[i], type: WidthType.DXA },
      shading: { fill: COLOR.ink, type: ShadingType.CLEAR },
      margins: cellPad,
      children: [new Paragraph({
        children: [new TextRun({
          text: h.toUpperCase(), bold: true, color: "FFFFFF", size: 16, characterSpacing: 40, font: FONT.tag,
        })],
      })],
    })),
  });

  const dataRows = rows.map((row, idx) => {
    const fill = idx % 2 === 1 ? "FAF8F4" : COLOR.paper;
    return new TableRow({
      children: row.map((cell, i) => new TableCell({
        borders: border(COLOR.lineSoft, 4),
        width: { size: cols[i], type: WidthType.DXA },
        shading: { fill, type: ShadingType.CLEAR },
        margins: cellPad,
        children: [new Paragraph({
          spacing: { before: 30, after: 30, line: 280 },
          children: [new TextRun({ text: cell, size: 20, color: COLOR.ink, font: FONT.body })],
        })],
      })),
    });
  });

  return new Table({
    width: { size: 9640, type: WidthType.DXA },
    columnWidths: cols,
    rows: [headerRow, ...dataRows],
  });
}

function quoteBox(attribution, text) {
  return new Table({
    width: { size: 9640, type: WidthType.DXA },
    columnWidths: [9640],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left:   { style: BorderStyle.SINGLE, size: 24, color: COLOR.red },
              right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 9640, type: WidthType.DXA },
            margins: { top: 100, bottom: 100, left: 280, right: 100 },
            children: [
              new Paragraph({
                spacing: { after: 60, line: 290 },
                children: [new TextRun({ text: text, italics: true, size: 22, color: COLOR.ink, font: FONT.body })],
              }),
              new Paragraph({
                spacing: { after: 0 },
                children: [new TextRun({
                  text: (attribution || "").toUpperCase(),
                  bold: true, color: COLOR.mute, size: 13, characterSpacing: 40, font: FONT.tag,
                })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ─── Builder principal ───────────────────────────────────────────────────────
function buildChildren(c) {
  const out = [];

  // ─── CABEÇALHO DA CAPA ──────────────────────────────────────────────────
  const h = c.header || {};

  // Linha vermelha fina no topo (marca visual NYO)
  out.push(new Paragraph({
    spacing: { before: 0, after: 200 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 24, color: COLOR.red, space: 1 },
    },
    children: [new TextRun({ text: "" })],
  }));

  // Selo (label em vermelho, Space Grotesk uppercase com character spacing)
  if (h.label) {
    out.push(new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({
        text: h.label, bold: true, color: COLOR.red, size: 18, characterSpacing: 80, font: FONT.tag,
      })],
    }));
  }

  // Tipo do documento (ex: "Ata de Reunião") em cinza claro discreto
  if (h.kind) {
    out.push(new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({
        text: h.kind.toUpperCase(), bold: false, color: COLOR.soft, size: 14, characterSpacing: 60, font: FONT.tag,
      })],
    }));
  }

  // Título principal (grande, peso forte)
  if (h.title) {
    out.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({
        text: h.title, bold: true, color: COLOR.ink, size: 56, font: FONT.heading,
      })],
    }));
  }

  // Subtítulo (itálico cinza)
  if (h.subtitle) {
    out.push(new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({
        text: h.subtitle, italics: true, color: COLOR.mute, size: 22, font: FONT.body,
      })],
    }));
  }

  // Linha divisória sutil antes da ficha
  out.push(new Paragraph({
    spacing: { before: 0, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.ink, space: 1 },
    },
    children: [new TextRun({ text: "" })],
  }));

  if (c.ficha) {
    out.push(fichaTecnica(c.ficha));
    out.push(spacer(320));
  }

  let sectionNum = 0;
  const nextSec = () => String(++sectionNum).padStart(2, "0");

  // §1 Contexto
  if (c.contexto && c.contexto.length) {
    out.push(sectionTag(nextSec(), "Contexto"));
    out.push(H1(c.contexto_titulo || "Contexto da reunião"));
    for (const par of c.contexto) out.push(p(par));
  }

  // §2 Participantes
  if (c.participantes) {
    out.push(sectionTag(nextSec(), "Participantes"));
    out.push(H1("Quem esteve presente"));
    if (c.participantes.cliente && c.participantes.cliente.length) {
      out.push(H3(c.participantes.cliente_label || "Courchevel"));
      for (const part of c.participantes.cliente) {
        out.push(bulletRich([
          { text: part.nome, bold: true },
          { text: " · " + (part.papel || "") },
          ...(part.obs ? [{ text: " · " + part.obs, color: COLOR.mute }] : []),
        ]));
      }
    }
    if (c.participantes.nyo && c.participantes.nyo.length) {
      out.push(H3(c.participantes.nyo_label || "NYO"));
      for (const part of c.participantes.nyo) {
        out.push(bulletRich([
          { text: part.nome, bold: true },
          { text: " · " + (part.papel || "") },
        ]));
      }
    }
  }

  // §3 Decisões
  if (c.decisoes && c.decisoes.length) {
    out.push(sectionTag(nextSec(), "Decisões"));
    out.push(H1(c.decisoes_titulo || "Decisões formalizadas na reunião"));
    if (c.decisoes_intro) out.push(p(c.decisoes_intro));
    for (const dec of c.decisoes) {
      if (dec.titulo) out.push(H3(dec.titulo));
      if (dec.descricao) out.push(p(dec.descricao));
      if (dec.bullets) for (const b of dec.bullets) out.push(bullet(b));
    }
  }

  // §4 Acordos por empreendimento
  if (c.acordos && c.acordos.length) {
    out.push(sectionTag(nextSec(), "Acordos"));
    out.push(H1(c.acordos_titulo || "Acordos sobre os empreendimentos"));
    if (c.acordos_intro) out.push(p(c.acordos_intro));
    for (const ac of c.acordos) {
      out.push(H3(ac.titulo));
      if (ac.paragrafos) for (const par of ac.paragrafos) out.push(p(par));
      if (ac.bullets) for (const b of ac.bullets) out.push(bullet(b));
    }
  }

  // §5 Callout crítico (dependência do cliente)
  if (c.dependencia_cliente) {
    out.push(sectionTag(nextSec(), "Dependência crítica"));
    out.push(H1(c.dependencia_cliente.titulo || "Dependência crítica para a execução"));
    out.push(calloutBox(
      c.dependencia_cliente.label || "Atenção",
      c.dependencia_cliente.texto || "",
      c.dependencia_cliente.palette || "warm"
    ));
    out.push(spacer(140));
    if (c.dependencia_cliente.complemento) out.push(p(c.dependencia_cliente.complemento));
  }

  // §6 Pendências da Courchevel
  if (c.pendencias_cliente && c.pendencias_cliente.length) {
    out.push(sectionTag(nextSec(), "Pendências do cliente"));
    out.push(H1(c.pendencias_cliente_titulo || "O que a Courchevel precisa entregar"));
    if (c.pendencias_cliente_intro) out.push(p(c.pendencias_cliente_intro));
    out.push(tableSimple(
      ["Item", "Responsável", "Prazo"],
      c.pendencias_cliente,
      [5300, 2200, 2140]
    ));
  }

  // §7 Pendências da NYO
  if (c.pendencias_nyo && c.pendencias_nyo.length) {
    out.push(sectionTag(nextSec(), "Pendências da NYO"));
    out.push(H1(c.pendencias_nyo_titulo || "O que a NYO entrega no curto prazo"));
    if (c.pendencias_nyo_intro) out.push(p(c.pendencias_nyo_intro));
    out.push(tableSimple(
      ["Entrega", "Responsável", "Prazo"],
      c.pendencias_nyo,
      [5300, 2200, 2140]
    ));
  }

  // §8 Stakeholders mencionados
  if (c.stakeholders && c.stakeholders.length) {
    out.push(sectionTag(nextSec(), "Stakeholders"));
    out.push(H1(c.stakeholders_titulo || "Stakeholders mencionados não presentes"));
    for (const s of c.stakeholders) {
      out.push(bulletRich([
        { text: s.nome, bold: true },
        { text: " · " + (s.papel || "") },
        ...(s.obs ? [{ text: " · " + s.obs, color: COLOR.mute }] : []),
      ]));
    }
  }

  // §9 Próximos passos
  if (c.proximos_passos && c.proximos_passos.length) {
    out.push(sectionTag(nextSec(), "Próximos passos"));
    out.push(H1(c.proximos_passos_titulo || "Próximos passos firmes"));
    for (const grupo of c.proximos_passos) {
      out.push(H3(grupo.titulo));
      if (grupo.bullets) for (const b of grupo.bullets) out.push(bullet(b));
    }
  }

  // §10 Falas registradas
  if (c.falas && c.falas.length) {
    out.push(sectionTag(nextSec(), "Falas"));
    out.push(H1(c.falas_titulo || "Falas de destaque registradas"));
    for (const f of c.falas) {
      out.push(quoteBox(f.autor, f.texto));
      out.push(spacer(120));
    }
  }

  // Seções genéricas (uso por documentos não-ata: briefings, solicitações, planejamentos).
  // Cada seção vira H1 com tag de seção. Blocos suportados: h3, p, bullet, bullet-prefix, callout.
  if (c.secoes && c.secoes.length) {
    for (const sec of c.secoes) {
      out.push(sectionTag(nextSec(), sec.tag || sec.titulo));
      out.push(H1(sec.titulo));
      if (sec.intro) out.push(p(sec.intro));
      for (const bl of (sec.blocos || [])) {
        if (bl.tipo === "h3") out.push(H3(bl.texto));
        else if (bl.tipo === "h2") out.push(H2(bl.texto));
        else if (bl.tipo === "bullet") out.push(bullet(bl.texto));
        else if (bl.tipo === "bullet-prefix") out.push(bulletRich([
          { text: bl.prefix || "", bold: true },
          { text: bl.texto || "" },
        ]));
        else if (bl.tipo === "callout") out.push(calloutBox(bl.label || "Observação", bl.texto, bl.palette || "warm"));
        else if (bl.tipo === "spacer") out.push(spacer(bl.size || 100));
        else out.push(p(bl.texto || ""));
      }
    }
  }

  // §11 Pontos de atenção
  if (c.pontos_atencao && c.pontos_atencao.length) {
    out.push(sectionTag(nextSec(), "Pontos de atenção"));
    out.push(H1(c.pontos_atencao_titulo || "Pontos de atenção registrados pela NYO"));
    for (const pt of c.pontos_atencao) {
      out.push(bulletRich([
        { text: pt.titulo + ": ", bold: true },
        { text: pt.descricao },
      ]));
    }
  }

  // Fechamento / assinatura
  if (c.assinatura) {
    out.push(spacer(360));
    out.push(new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({
        text: "—", color: COLOR.mute, size: 18, font: FONT.body,
      })],
    }));
    out.push(new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({
        text: c.assinatura,
        italics: true, color: COLOR.mute, size: 18, font: FONT.body,
      })],
    }));
  }

  return out;
}

function buildDocument(content) {
  return new Document({
    creator: "NYO Agência",
    title: (content.header && content.header.title) || "Ata de Reunião",
    styles: {
      default: { document: { run: { font: FONT.body, size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, font: FONT.heading, color: COLOR.ink },
          paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0,
            keepNext: true, keepLines: true } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: FONT.heading, color: COLOR.ink },
          paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1,
            keepNext: true, keepLines: true } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 22, bold: true, font: FONT.heading, color: COLOR.ink },
          paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2,
            keepNext: true, keepLines: true } },
      ],
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 280 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1300, right: 1300, bottom: 1300, left: 1300 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({
              text: (content.header && content.header.label)
                ? content.header.label + " · " + (content.header.title || "")
                : "",
              color: COLOR.mute, size: 14, characterSpacing: 30, font: FONT.tag,
            })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Página ", color: COLOR.mute, size: 14, font: FONT.tag }),
              new TextRun({ children: [PageNumber.CURRENT], color: COLOR.mute, size: 14, font: FONT.tag }),
              new TextRun({ text: " de ", color: COLOR.mute, size: 14, font: FONT.tag }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], color: COLOR.mute, size: 14, font: FONT.tag }),
            ],
          })],
        }),
      },
      children: buildChildren(content),
    }],
  });
}

// ─── CLI ────────────────────────────────────────────────────────────────────
async function main() {
  const [, , inputArg, outputArg] = process.argv;
  if (!inputArg || !outputArg) {
    console.error("Uso: node build_ata.js <input.json> <output.docx>");
    process.exit(2);
  }
  const inputPath = path.resolve(inputArg);
  const outputPath = path.resolve(outputArg);
  const content = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const doc = buildDocument(content);
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buf);
  console.log("OK · DOCX gerado:", outputPath);
}

if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1); });
}

module.exports = { buildDocument, buildChildren };
