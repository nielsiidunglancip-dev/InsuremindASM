// server.js — InsureMind Agent | Backend Express API Server
// Modul 3.3: PPT Builder - Auto Proposal System
// Menggunakan pptxgenjs untuk generate file PPTX server-side

const express = require("express");
const cors = require("cors");
const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// Load PDF knowledge base (RAG Context Stuffing)
let knowledgeBase = "";
try {
  const kbPath = path.join(__dirname, "materi_pdf_text.json");
  const kbData = JSON.parse(fs.readFileSync(kbPath, "utf-8"));
  knowledgeBase = kbData.map(item => `[Sumber: ${item.source}, Hal: ${item.page}]\n${item.text}`).join("\n\n");
  console.log(`[✅] Knowledge base loaded: ${kbData.length} chunks.`);
} catch (e) {
  console.warn("[⚠️] Could not load materi_pdf_text.json. RAG will not work.", e.message);
}

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(".")); // Serve file statis (index.html, app.js, dll)

// ─── Helper: Format Rupiah ──────────────────────────────────────────────────
function formatRupiah(number) {
  if (!number && number !== 0) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

// ─── Route: Health Check ────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "InsureMind Agent Backend Running ✅", timestamp: new Date().toISOString() });
});

// ─── Route: Generate PPTX Proposal ─────────────────────────────────────────
app.post("/api/generate-pptx", async (req, res) => {
  try {
    const {
      namaNasabah = "Nasabah",
      namaAgen = "Agen InsureMind",
      jenisAsuransi = "Asuransi Umum",
      totalPremi = 0,
      nilaiPertanggungan = 0,
      catatanTambahan = "",
    } = req.body;

    // Validasi input
    if (!namaNasabah || namaNasabah.trim() === "") {
      return res.status(400).json({ error: "Nama nasabah tidak boleh kosong." });
    }

    // ─── Inisialisasi PptxGenJS ───────────────────────────────────────────
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE"; // 16:9

    // Definisi warna & font
    const NAVY = "0F172A";
    const BLUE_LIGHT = "38BDF8";
    const WHITE = "FFFFFF";
    const GRAY_LIGHT = "F1F5F9";
    const GRAY_MID = "94A3B8";
    const GREEN_ACCENT = "10B981";
    const ORANGE_ACCENT = "F59E0B";

    const FONT_MAIN = "Calibri";
    const DATE_NOW = new Date().toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });

    // ═══════════════════════════════════════════════════════════════════════
    // SLIDE 1 — COVER PROPOSAL
    // ═══════════════════════════════════════════════════════════════════════
    const slide1 = pptx.addSlide();
    slide1.background = { color: NAVY };

    // Garis dekorasi kiri (aksen biru)
    slide1.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 0.12, h: "100%",
      fill: { color: BLUE_LIGHT },
      line: { color: BLUE_LIGHT },
    });

    // Garis dekorasi bawah (underline judul)
    slide1.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: 2.8, w: 4.0, h: 0.06,
      fill: { color: BLUE_LIGHT },
      line: { color: BLUE_LIGHT },
    });

    // Label "PROPOSAL ASURANSI RESMI"
    slide1.addText("PROPOSAL ASURANSI RESMI", {
      x: 0.5, y: 1.2, w: 8.5, h: 0.5,
      fontSize: 13,
      fontFace: FONT_MAIN,
      color: BLUE_LIGHT,
      bold: true,
      charSpacing: 3,
    });

    // Judul Produk
    slide1.addText(jenisAsuransi.toUpperCase(), {
      x: 0.5, y: 1.8, w: 8.5, h: 1.0,
      fontSize: 36,
      fontFace: FONT_MAIN,
      color: WHITE,
      bold: true,
    });

    // Nama Nasabah
    slide1.addText(`Dipersiapkan untuk: ${namaNasabah}`, {
      x: 0.5, y: 3.1, w: 6.5, h: 0.5,
      fontSize: 14,
      fontFace: FONT_MAIN,
      color: GRAY_LIGHT,
    });

    // Nama Agen
    slide1.addText(`Agen: ${namaAgen}`, {
      x: 0.5, y: 3.65, w: 6.5, h: 0.4,
      fontSize: 12,
      fontFace: FONT_MAIN,
      color: GRAY_MID,
    });

    // Tanggal
    slide1.addText(DATE_NOW, {
      x: 0.5, y: 4.05, w: 6.5, h: 0.4,
      fontSize: 11,
      fontFace: FONT_MAIN,
      color: GRAY_MID,
    });

    // Logo teks kanan bawah
    slide1.addText("ASM Academy", {
      x: 7.0, y: 4.5, w: 2.5, h: 0.5,
      fontSize: 18,
      fontFace: FONT_MAIN,
      color: BLUE_LIGHT,
      bold: true,
      align: "right",
    });
    slide1.addText("InsureMind Agent Platform", {
      x: 5.5, y: 4.9, w: 4.0, h: 0.3,
      fontSize: 9,
      fontFace: FONT_MAIN,
      color: GRAY_MID,
      align: "right",
    });

    // Badge "RAHASIA" / watermark ringan
    slide1.addShape(pptx.ShapeType.rect, {
      x: 8.8, y: 0.15, w: 1.5, h: 0.35,
      fill: { color: ORANGE_ACCENT },
      line: { color: ORANGE_ACCENT },
      rounding: true,
    });
    slide1.addText("RESMI", {
      x: 8.8, y: 0.15, w: 1.5, h: 0.35,
      fontSize: 9,
      fontFace: FONT_MAIN,
      color: WHITE,
      bold: true,
      align: "center",
      valign: "middle",
    });

    // ═══════════════════════════════════════════════════════════════════════
    // SLIDE 2 — RINGKASAN MANFAAT & TABEL PREMI
    // ═══════════════════════════════════════════════════════════════════════
    const slide2 = pptx.addSlide();
    slide2.background = { color: "F8FAFC" };

    // Header bar
    slide2.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: 1.1,
      fill: { color: NAVY },
      line: { color: NAVY },
    });

    // Judul header slide 2
    slide2.addText("RINGKASAN MANFAAT & DETAIL PREMI", {
      x: 0.4, y: 0.0, w: 7.5, h: 1.1,
      fontSize: 18,
      fontFace: FONT_MAIN,
      color: WHITE,
      bold: true,
      valign: "middle",
    });

    // Nomor Slide
    slide2.addText("02", {
      x: 9.0, y: 0.0, w: 0.7, h: 1.1,
      fontSize: 30,
      fontFace: FONT_MAIN,
      color: BLUE_LIGHT,
      bold: true,
      align: "center",
      valign: "middle",
    });

    // Info nasabah
    slide2.addText([
      { text: "Nama Nasabah: ", options: { bold: true, color: "334155" } },
      { text: namaNasabah, options: { color: "0F172A" } },
    ], {
      x: 0.4, y: 1.3, w: 9.0, h: 0.4,
      fontSize: 12, fontFace: FONT_MAIN,
    });

    slide2.addText([
      { text: "Jenis Asuransi: ", options: { bold: true, color: "334155" } },
      { text: jenisAsuransi, options: { color: "0F172A" } },
    ], {
      x: 0.4, y: 1.65, w: 9.0, h: 0.4,
      fontSize: 12, fontFace: FONT_MAIN,
    });

    // Tabel Manfaat & Premi
    const tableRows = [
      [
        { text: "KOMPONEN", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
        { text: "DETAIL", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
        { text: "KETERANGAN", options: { bold: true, color: WHITE, fill: NAVY, align: "center" } },
      ],
      [
        { text: "Produk Asuransi", options: { bold: true } },
        { text: jenisAsuransi },
        { text: "Produk resmi terdaftar OJK" },
      ],
      [
        { text: "Nama Tertanggung", options: { bold: true } },
        { text: namaNasabah },
        { text: "Sesuai identitas KTP" },
      ],
      [
        { text: "Nilai Pertanggungan (UP)", options: { bold: true } },
        { text: formatRupiah(nilaiPertanggungan), options: { color: "0284C7", bold: true } },
        { text: "Basis kalkulasi premi OJK" },
      ],
      [
        { text: "Total Premi Tahunan", options: { bold: true } },
        { text: formatRupiah(totalPremi), options: { color: GREEN_ACCENT, bold: true } },
        { text: "Sesuai tarif resmi OJK" },
      ],
      [
        { text: "Tanggal Penawaran", options: { bold: true } },
        { text: DATE_NOW },
        { text: "Berlaku 14 hari" },
      ],
      [
        { text: "Nama Agen Penjual", options: { bold: true } },
        { text: namaAgen },
        { text: "Berlisensi AAUI/OJK" },
      ],
    ];

    if (catatanTambahan && catatanTambahan.trim() !== "") {
      tableRows.push([
        { text: "Catatan Khusus", options: { bold: true } },
        { text: catatanTambahan, options: { colspan: 2 } },
        { text: "" },
      ]);
    }

    slide2.addTable(tableRows, {
      x: 0.4, y: 2.15, w: 9.2, h: 2.5,
      rowH: 0.37,
      fontFace: FONT_MAIN,
      fontSize: 11,
      border: { pt: 1, color: "E2E8F0" },
      fill: { color: WHITE },
      colW: [2.8, 3.4, 3.0],
    });

    // ─── Footer Compliance Disclaimer ──────────────────────────────────────
    slide2.addShape(pptx.ShapeType.rect, {
      x: 0, y: 4.75, w: "100%", h: 0.8,
      fill: { color: "1E293B" },
      line: { color: "1E293B" },
    });

    slide2.addText(
      "⚖️  DISCLAIMER KEPATUHAN HUKUM: Dokumen ini bersifat rahasia dan ditujukan khusus bagi calon tertanggung yang namanya tercantum di atas. " +
      "Informasi premi dalam proposal ini dihitung berdasarkan Surat Edaran OJK No. 6/SEOJK.05/2017 tentang Penetapan Tarif Premi Asuransi Harta Benda dan Asuransi Kendaraan Bermotor. " +
      "Penawaran ini bukan merupakan polis asuransi. Polis resmi hanya berlaku setelah SPPA disetujui oleh penanggung dan premi diterima.",
      {
        x: 0.3, y: 4.78, w: 9.4, h: 0.72,
        fontSize: 7.5,
        fontFace: FONT_MAIN,
        color: GRAY_MID,
        wrap: true,
        valign: "middle",
      }
    );

    // ─── Generate & Kirim PPTX sebagai Buffer ──────────────────────────────
    const safeFileName = namaNasabah.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_").substring(0, 50);
    const fileName = `Proposal_${safeFileName}.pptx`;

    // pptxgenjs dapat menghasilkan buffer Node.js
    const pptxBuffer = await pptx.write({ outputType: "nodebuffer" });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", pptxBuffer.length);
    res.end(pptxBuffer);

    console.log(`[✅] PPTX Generated: ${fileName} (${(pptxBuffer.length / 1024).toFixed(1)} KB)`);

  } catch (error) {
    console.error("[❌] Error generating PPTX:", error);
    res.status(500).json({
      error: "Gagal membuat file PPTX.",
      detail: error.message,
    });
  }
});

// ─── Route: AI Product Finder (RAG) ──────────────────────────────────────────
app.post("/api/ai-product-finder", async (req, res) => {
  try {
    const { query } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid API Key" });
    }
    const apiKey = authHeader.split(" ")[1];

    if (!knowledgeBase) {
      return res.status(500).json({ error: "Knowledge base is not loaded on the server." });
    }

    const promptText = `Anda adalah konsultan Asuransi Sinar Mas yang ahli. 
Tugas Anda adalah memberikan rekomendasi maksimal 2 produk asuransi Sinar Mas yang paling tepat berdasarkan pertanyaan atau kebutuhan agen berikut ini:
- Pertanyaan Agen: "${query}"

PENTING: Gunakan referensi materi PDF perusahaan berikut ini untuk mencari produk yang tepat dan menyusun alasan. JANGAN mengarang produk yang tidak ada di referensi.
Jika tidak ada produk yang relevan di referensi, sampaikan dengan sopan.

Referensi Materi:
${knowledgeBase}

Jawab HANYA dengan format HTML ringan. Gunakan bullet points untuk '🎯 Produk yang Direkomendasikan' dan paragraf singkat untuk '💡 Alasan'.`;

    // Fetch is available globally in Node 18+
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    res.json({ result: generatedText });

  } catch (error) {
    console.error("[❌] Error in AI Product Finder:", error);
    res.status(500).json({ error: error.message });
  }
});
// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  🚀  InsureMind Agent Backend Server             ║
║      Port : http://localhost:${PORT}              ║
║      API  : POST /api/generate-pptx              ║
║      Ready to serve PPTX proposals! ✅           ║
╚══════════════════════════════════════════════════╝
  `);
});
