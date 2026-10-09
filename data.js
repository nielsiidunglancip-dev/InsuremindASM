// data.js
// Database Lokal untuk InsureMind Agent + Gamifikasi

// 1. Kategori Materi Belajar Asuransi
const STUDY_MATERIALS_DEFAULT = [
  {
    id: "dasar-asuransi",
    title: "Dasar-Dasar Asuransi Umum",
    category: "Dasar Asuransi",
    icon: "shield-check",
    shortDesc: "Konsep dasar pengalihan risiko, hukum asuransi, dan 6 prinsip dasar (Insurable Interest, Indemnity, dll.).",
    article: `Asuransi Umum (General Insurance) adalah mekanisme proteksi finansial terhadap kerusakan harta benda, kerugian finansial, atau tanggung jawab hukum kepada pihak ketiga.

Asuransi bekerja menggunakan hukum bilangan besar (Law of Large Numbers), di mana risiko dari banyak peserta digabungkan untuk menutupi kerugian dari segelintir peserta yang tertimpa musibah.

6 Prinsip Utama Asuransi:
1. **Insurable Interest**: Hubungan keuangan yang sah antara tertanggung dan objek asuransi.
2. **Utmost Good Faith**: Kewajiban bagi penanggung dan tertanggung untuk memaparkan semua fakta material secara jujur.
3. **Indemnity**: Pemulihan kondisi finansial tertanggung tepat seperti sesaat sebelum kerugian terjadi (tidak mencari keuntungan).
4. **Subrogation**: Pengalihan hak tuntut dari tertanggung kepada penanggung setelah klaim dibayarkan.
5. **Contribution**: Pembagian kontribusi pembayaran klaim secara proporsional jika objek diasuransikan di beberapa perusahaan.
6. **Proximate Cause**: Penyebab aktif, efisien, dan terdekat yang memicu rantai kejadian kerugian.`,
    summary: "Asuransi umum melindungi aset dari kerugian finansial dengan mengalihkan risiko kepada perusahaan asuransi menggunakan 6 prinsip dasar universal.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Mock video
    pdfName: "Panduan_Dasar_Asuransi_Umum.pdf",
    quiz: [
      {
        question: "Manakah prinsip asuransi yang melarang tertanggung mengambil keuntungan dari klaim asuransi?",
        options: ["Insurable Interest", "Indemnity", "Subrogation", "Utmost Good Faith"],
        correctAnswer: 1,
        explanation: "Prinsip Indemnity (Ganti Rugi) menyatakan bahwa tujuan asuransi adalah mengembalikan posisi keuangan nasabah seperti sebelum kejadian, bukan menjadi ajang mencari keuntungan."
      },
      {
        question: "Hak perusahaan asuransi untuk menuntut pihak ketiga yang bersalah atas kerugian tertanggung setelah klaim dibayar disebut...",
        options: ["Kontribusi", "Subrogasi", "Proximate Cause", "Ko-asuransi"],
        correctAnswer: 1,
        explanation: "Subrogasi adalah pengalihan hak hukum tertanggung untuk menuntut pihak ketiga yang bersalah kepada penanggung (perusahaan asuransi)."
      }
    ]
  },
  {
    id: "kendaraan-bermotor",
    title: "Asuransi Kendaraan Bermotor (PSAKOB)",
    category: "Asuransi Kendaraan Bermotor",
    icon: "car",
    shortDesc: "Memahami jaminan Comprehensive (All Risk) vs Total Loss Only (TLO) berdasarkan standar PSAKOB.",
    article: `Asuransi Kendaraan Bermotor diatur dalam Polis Standar Asuransi Kendaraan Bermotor Indonesia (PSAKOB).

Jaminan Utama:
1. **Comprehensive (All Risk)**: Menjamin kerusakan sebagian (penyok, lecet, tabrakan) hingga kehilangan total akibat pencurian.
2. **Total Loss Only (TLO)**: Menjamin kerugian jika biaya perbaikan bernilai >= 75% dari harga pasar kendaraan sesaat sebelum kejadian, atau jika hilang dicuri.

Pengecualian Penting:
- Pengemudi tidak memiliki SIM yang sah untuk peruntukan kendaraan tersebut.
- Pengemudi di bawah pengaruh alkohol atau zat terlarang.
- Kendaraan digunakan untuk perlombaan kejuaraan, pawai, atau demonstrasi.
- Kerusakan akibat banjir/gempa bumi tidak dijamin kecuali diperluas.`,
    summary: "PSAKOB membagi jaminan menjadi All Risk dan TLO dengan pengecualian ketat terkait kelayakan pengemudi dan kondisi penggunaan kendaraan.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Polis_Standar_PSAKOB.pdf",
    quiz: [
      {
        question: "Berapa persentase batas minimal kerusakan agar klaim dapat dikategorikan sebagai Total Loss Only (TLO)?",
        options: ["50% dari harga pasar", "75% dari harga pasar", "60% dari harga pasar", "90% dari harga pasar"],
        correctAnswer: 1,
        explanation: "Sesuai PSAKOB, kerugian dikategorikan TLO apabila estimasi biaya perbaikan mencapai minimal 75% dari harga pasar kendaraan sesaat sebelum terjadinya kerugian."
      },
      {
        question: "Apakah kerusakan akibat pengemudi tidak memiliki SIM saat kecelakaan dijamin dalam PSAKOB?",
        options: ["Dijamin penuh", "Dijamin hanya 50%", "Tidak dijamin (Pengecualian)", "Dijamin jika membayar denda"],
        correctAnswer: 2,
        explanation: "Mengemudi tanpa SIM merupakan pengecualian mutlak dalam polis standar asuransi kendaraan bermotor (PSAKOB) sehingga klaim akan ditolak."
      }
    ]
  },
  {
    id: "asuransi-properti",
    title: "Asuransi Properti & Kebakaran (PSAKBI)",
    category: "Asuransi Properti",
    icon: "home",
    shortDesc: "Menganalisis jaminan dasar FLEXAS dan perluasan risiko seperti gempa bumi, banjir, dan sabotase.",
    article: `Polis Standar Asuransi Kebakaran Indonesia (PSAKBI) menjamin kerusakan harta benda yang secara langsung disebabkan oleh **FLEXAS**:
- **F**ire (Kebakaran): Kebakaran akibat kelalaian, rambatan api, atau korsleting listrik.
- **L**ightning (Petir): Kerusakan akibat sambaran petir langsung pada bangunan/instalasi.
- **E**xplosion (Ledakan): Ledakan dari kompor gas, mesin uap, atau alat rumah tangga.
- **A**ircraft (Kejatuhan Pesawat): Kejatuhan pesawat terbang atau benda angkasa luar.
- **S**moke (Asap): Asap yang keluar dari kebakaran harta benda yang dijamin.

Perluasan Jaminan:
Untuk melindungi properti dari Gempa Bumi (tsunami), Banjir (angin topan), Kerusuhan (huru-hara), atau Terorisme, tertanggung harus membeli klausul perluasan khusus dengan rate tambahan.`,
    summary: "PSAKBI menjamin risiko dasar FLEXAS. Kerusakan akibat bencana alam lainnya membutuhkan perluasan jaminan opsional.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Buku_Panduan_PSAKBI.pdf",
    quiz: [
      {
        question: "Manakah yang TIDAK termasuk dalam jaminan dasar FLEXAS dalam asuransi kebakaran?",
        options: ["Fire (Kebakaran)", "Lightning (Petir)", "Earthquake (Gempa Bumi)", "Smoke (Asap)"],
        correctAnswer: 2,
        explanation: "Gempa bumi (Earthquake) bukan bagian dari FLEXAS. Gempa bumi memerlukan perluasan polis tersendiri (Polis Standar Asuransi Gempa Bumi Indonesia)."
      },
      {
        question: "Jika terjadi korsleting listrik yang membakar tirai lalu menghanguskan rumah, penyebab terdekat (proximate cause) kerugian tersebut adalah...",
        options: ["Sambaran petir", "Kebakaran akibat korsleting listrik", "Asap tebal", "Ledakan instalasi"],
        correctAnswer: 1,
        explanation: "Korsleting listrik adalah penyebab awal yang aktif dan efisien yang menimbulkan api, sehingga dianalisis sebagai kebakaran (Fire)."
      }
    ]
  },
  {
    id: "marine-cargo",
    title: "Asuransi Pengangkutan Barang (Marine Cargo)",
    category: "Asuransi Marine Cargo",
    icon: "ship",
    shortDesc: "Membahas perlindungan barang kiriman laut, darat, udara menggunakan klausul internasional ICC A, B, dan C.",
    article: `Asuransi Marine Cargo menjamin kerusakan atau kehilangan barang komoditas selama masa pengiriman dari tempat asal (warehouse) hingga tempat tujuan (destination).

Kondisi Jaminan Internasional (Institute Cargo Clauses - ICC):
1. **ICC 'C' (Paling Sempit)**: Hanya menjamin kerugian akibat insiden besar seperti kapal tenggelam, tabrakan, kebakaran, atau kandas.
2. **ICC 'B' (Sedang)**: Menjamin seluruh jaminan ICC C ditambah masuknya air laut ke dalam palka, tersapu gelombang, atau kerusakan total colli saat bongkar muat.
3. **ICC 'A' (Paling Luas / All Risk)**: Menjamin seluruh risiko kerusakan fisik kecuali yang dikecualikan secara eksplisit (seperti salah pengemasan, kebocoran alami, keterlambatan).`,
    summary: "Marine Cargo memproteksi barang transit dengan opsi jaminan ICC A, B, atau C sesuai profil risiko barang dan anggaran.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Institute_Cargo_Clauses_Guide.pdf",
    quiz: [
      {
        question: "Klausul pengangkutan barang manakah yang memberikan perlindungan paling luas (All Risks)?",
        options: ["ICC 'C'", "ICC 'B'", "ICC 'A'", "ICC 'Basic'"],
        correctAnswer: 2,
        explanation: "ICC 'A' bersifat 'All Risks', yang berarti menjamin seluruh kerusakan fisik kecuali yang secara spesifik tercantum dalam daftar pengecualian."
      }
    ]
  },
  {
    id: "liability-insurance",
    title: "Asuransi Tanggung Jawab Hukum (Liability)",
    category: "Asuransi Liability",
    icon: "briefcase",
    shortDesc: "Proteksi terhadap klaim ganti rugi dari pihak ketiga akibat kelalaian bisnis atau produk cacat.",
    article: `Asuransi Liability (Tanggung Jawab Hukum/TJH) melindungi tertanggung (baik pribadi maupun badan usaha) dari risiko tuntutan hukum dari pihak ketiga akibat cidera badan (bodily injury) atau kerusakan properti (property damage) yang disebabkan oleh kelalaian tertanggung.

Jenis Liability Utama:
1. **Public Liability**: Menjamin tanggung jawab hukum operasional bisnis sehari-hari di lokasi usaha.
2. **Product Liability**: Menjamin tuntutan akibat cedera/sakit yang dialami konsumen karena mengonsumsi atau menggunakan produk yang diproduksi tertanggung.
3. **Professional Indemnity**: Melindungi profesional (dokter, agen, konsultan) dari kelalaian intelektual atau malpraktik kerja.`,
    summary: "Asuransi Liability memproteksi kas keuangan tertanggung dari pengeluaran tuntutan hukum ganti rugi pihak ketiga.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Liability_Insurance_Framework.pdf",
    quiz: [
      {
        question: "Asuransi yang melindungi profesi konsultan atau dokter dari kesalahan diagnosis/malpraktik disebut...",
        options: ["Public Liability", "Product Liability", "Professional Indemnity", "Employer's Liability"],
        correctAnswer: 2,
        explanation: "Professional Indemnity khusus menjamin tanggung jawab hukum atas kerugian finansial akibat kelalaian pemberian jasa profesional."
      }
    ]
  },
  {
    id: "engineering-insurance",
    title: "Asuransi Rekayasa (Engineering)",
    category: "Asuransi Engineering",
    icon: "tool",
    shortDesc: "Asuransi proyek konstruksi CAR, EAR, serta kerusakan mesin operasional MB.",
    article: `Asuransi Engineering ditujukan untuk proyek konstruksi sipil, instalasi mesin, serta operasional mesin industri berat.

Jenis Polis Utama:
1. **CAR (Contractors' All Risks)**: Melindungi seluruh pekerjaan konstruksi bangunan (gedung, jalan raya, jembatan) dari kerusakan tak terduga serta tuntutan pihak ketiga sekitar proyek.
2. **EAR (Erection All Risks)**: Fokus pada proyek pemasangan/instalasi mesin industri, turbin pembangkit, dll.
3. **MB (Machinery Breakdown)**: Menjamin kerusakan internal tak terduga pada mesin operasional pabrik akibat korsleting internal, kelalaian operator, atau patah poros.`,
    summary: "Asuransi engineering melindungi investasi fisik proyek konstruksi dan mesin operasional dari kerusakan fisik tak terduga.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "CAR_EAR_Insurance_Standard.pdf",
    quiz: [
      {
        question: "Polis manakah yang paling tepat digunakan untuk proyek pembangunan gedung bertingkat baru?",
        options: ["Machinery Breakdown (MB)", "Contractors' All Risks (CAR)", "Erection All Risks (EAR)", "Public Liability"],
        correctAnswer: 1,
        explanation: "CAR (Contractors' All Risks) dirancang khusus untuk melindungi pekerjaan konstruksi sipil seperti gedung, jembatan, dan jalan raya."
      }
    ]
  },
  {
    id: "travel-insurance",
    title: "Asuransi Perjalanan (Travel Insurance)",
    category: "Asuransi Travel",
    icon: "globe",
    shortDesc: "Proteksi komprehensif perjalanan domestik dan internasional terhadap delay, bagasi hilang, dan medis.",
    article: `Asuransi Perjalanan melindungi pelancong dari kerugian finansial selama bepergian jauh, baik domestik maupun luar negeri.

Manfaat Proteksi:
- **Biaya Medis Darurat**: Pengobatan di rumah sakit luar negeri karena sakit atau kecelakaan.
- **Keterlambatan Penerbangan**: Ganti rugi kompensasi uang tunai jika pesawat delay melebihi 4-6 jam.
- **Kehilangan / Kerusakan Bagasi**: Ganti rugi atas hilangnya koper oleh maskapai penerbangan.
- **Evakuasi Medis Darurat**: Pengantaran darurat ke rumah sakit rujukan terdekat menggunakan ambulans udara.`,
    summary: "Asuransi perjalanan meminimalkan risiko ketidaknyamanan operasional dan medis selama perjalanan wisata atau bisnis.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Travel_Insurance_Overview.pdf",
    quiz: [
      {
        question: "Manakah perlindungan yang biasanya TIDAK termasuk dalam jaminan standar asuransi perjalanan?",
        options: ["Evakuasi Medis", "Kompensasi Bagasi Hilang", "Pembatalan Tiket Secara Sukarela", "Delay Pesawat"],
        correctAnswer: 2,
        explanation: "Pembatalan penerbangan secara sukarela oleh penumpang tanpa alasan medis/darurat yang sah umumnya dikecualikan dari polis perjalanan."
      }
    ]
  },
  {
    id: "personal-accident",
    title: "Asuransi Kecelakaan Diri (Personal Accident)",
    category: "Asuransi Personal Accident",
    icon: "heart",
    shortDesc: "Menjamin santunan kematian, cacat tetap, dan biaya medis akibat kecelakaan murni.",
    article: `Asuransi Kecelakaan Diri (Personal Accident) memberikan santunan berupa uang pertanggungan jika tertanggung mengalami cedera fisik, cacat tetap, atau meninggal dunia yang semata-mata disebabkan oleh kecelakaan kekelakaan dari luar.

Manfaat Utama:
1. **Kematian akibat Kecelakaan (Accidental Death)**: Pembayaran 100% uang pertanggungan kepada ahli waris.
2. **Cacat Tetap (Permanent Disablement)**: Santunan persenan tertentu sesuai tabel medis jika kehilangan anggota tubuh secara permanen (tangan, kaki, penglihatan).
3. **Biaya Medis (Medical Expenses)**: Reimbursement biaya perawatan rumah sakit akibat kecelakaan.

*Penting*: Kematian akibat penyakit biasa atau bunuh diri **tidak dijamin** oleh asuransi kecelakaan diri.`,
    summary: "Menyediakan santunan tunai cepat untuk membantu keluarga mengatasi dampak finansial cedera parah atau kematian akibat kecelakaan fisik.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Personal_Accident_Policy_Terms.pdf",
    quiz: [
      {
        question: "Apakah kematian akibat serangan jantung mendadak dijamin dalam asuransi Kecelakaan Diri?",
        options: ["Dijamin penuh", "Tidak dijamin", "Dijamin 50%", "Dijamin jika memiliki riwayat medis"],
        correctAnswer: 1,
        explanation: "Tidak dijamin. Serangan jantung adalah kondisi penyakit medis dari dalam tubuh, sedangkan asuransi Kecelakaan Diri mensyaratkan benturan kekerasan eksternal sebagai penyebab utama."
      }
    ]
  },
  {
    id: "kesehatan-insurance",
    title: "Asuransi Kesehatan (Health Insurance)",
    category: "Asuransi Kesehatan",
    icon: "activity",
    shortDesc: "Mempelajari koordinasi manfaat (COB), jaminan rawat inap, rawat jalan, dan limit inner limit.",
    article: `Asuransi Kesehatan menjamin biaya pengobatan medis akibat sakit atau cedera kecelakaan.

Sistem Limitasi Jaminan:
1. **Inner Limit**: Batasan plafon maksimal untuk setiap item pengobatan (misal batas biaya kamar per hari, batas dokter per kunjungan).
2. **As Charged (Sesuai Tagihan)**: Pembayaran tagihan sesuai batas total limit tahunan kartu peserta.

Metode Pembayaran:
- **Cashless**: Cukup menunjukkan kartu asuransi di rumah sakit rekanan/provider.
- **Reimbursement**: Tertanggung membayar dahulu di rumah sakit non-rekanan lalu mengajukan klaim dokumen kwitansi ke perusahaan asuransi.`,
    summary: "Asuransi kesehatan membiayai perawatan medis rawat inap dan jalan dengan metode cashless maupun reimbursement.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Panduan_Asuransi_Kesehatan.pdf",
    quiz: [
      {
        question: "Metode pembayaran rumah sakit di mana nasabah cukup menggesek kartu kepesertaan tanpa bayar di tempat disebut...",
        options: ["Reimbursement", "Cashless", "Deposito Medis", "Coordination of Benefits"],
        correctAnswer: 1,
        explanation: "Metode Cashless memungkinkan peserta bertransaksi langsung secara digital di rumah sakit rekanan dengan otorisasi jaminan perusahaan asuransi."
      }
    ]
  },
  {
    id: "chatbot-info",
    title: "Penggunaan AI Chatbot dalam Penjualan Asuransi",
    category: "Chatbot untuk Agen Asuransi",
    icon: "message-circle",
    shortDesc: "Bagaimana agen memanfaatkan AI untuk menjelaskan produk, menganalisis polis, dan melatih simulasi penjualan.",
    article: `Artificial Intelligence (AI) kini mengubah cara agen asuransi bekerja. Chatbot AI dapat membantu agen dalam berbagai hal:
- **Penjelasan Produk Cepat**: Mendapatkan kutipan jaminan dan pengecualian polis asuransi dalam hitungan detik.
- **Draf Penawaran & Email**: Membuat surat penawaran (quotation pitch) yang dipersonalisasi untuk prospek.
- **Menjawab Pertanyaan Sulit**: Menemukan basis regulasi OJK atau hukum asuransi ketika berhadapan dengan prospek yang kritis.
- **Latihan Handling Objection**: Mensimulasikan skenario nasabah menolak membeli polis untuk melatih respons mental agen.

Dalam menu AI Insurance Coach di platform ini, Anda dapat menggunakan AI secara langsung untuk mendukung aktivitas kerja Anda.`,
    summary: "AI Chatbot membantu mempercepat respons informasi agen, pembuatan materi penawaran, serta sarana belajar interaktif.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfName: "Panduan_AI_Untuk_Agen_Asuransi.pdf",
    quiz: [
      {
        question: "Bagaimana AI dapat membantu agen dalam menghadapi keberatan nasabah (handling objection)?",
        options: [
          "Membeli polis secara otomatis untuk nasabah",
          "Mensimulasikan argumen penolakan nasabah dan memberikan alternatif jawaban yang profesional",
          "Membatalkan polis nasabah tanpa penalti",
          "Mengganti komisi agen secara langsung"
        ],
        correctAnswer: 1,
        explanation: "AI dapat berperan sebagai simulator bermain peran (roleplay) untuk melatih teknik negosiasi dan menjawab keberatan nasabah secara taktis."
      }
    ]
  }
];

// 2. Database Produk Asuransi
const INSURANCE_PRODUCTS_DEFAULT = [
  {
    id: "prod-motor",
    name: "InsureMind Auto Protection",
    category: "Asuransi Kendaraan Bermotor",
    benefits: "Melindungi kendaraan pribadi Anda dari kecelakaan lalu lintas, pencurian, perbuatan jahat orang lain, hingga kebakaran.",
    object: "Mobil penumpang non-komersial berusia maksimal 10 tahun (All Risk) atau 15 tahun (TLO).",
    warranty: "Jaminan Comprehensive (All Risk) menjamin kerusakan kecil hingga berat. Jaminan Total Loss Only menjamin kerusakan >= 75% atau kehilangan.",
    extension: "Huru-hara (SRCC), Terorisme & Sabotase, Banjir & Badai, Gempa Bumi, Tanggung Jawab Hukum Pihak Ketiga (TPL) hingga Rp 50.000.000, serta Kecelakaan Diri Penumpang.",
    exclusions: "Digunakan sebagai taksi online tanpa melapor, pengemudi tidak memiliki SIM, ban pecah tanpa kecelakaan ikutan, penggelapan oleh sopir pribadi.",
    claimCase: "Mobil menabrak pembatas jalan tol sehingga bemper depan dan radiator hancur. Estimasi perbaikan Rp 25.000.000. Klaim disetujui penuh dengan pemotongan risiko sendiri (Own Risk) Rp 300.000 per kejadian.",
    faqs: [
      { q: "Apakah mobil yang disewakan dapat diasuransikan?", a: "Bisa, namun harus dideklarasikan sebagai penggunaan komersial dengan penyesuaian rate premi OJK." },
      { q: "Apa itu risiko sendiri (Own Risk)?", a: "Biaya yang ditanggung nasabah pada setiap kejadian klaim, standar OJK adalah Rp 300.000 per klaim kendaraan." }
    ]
  },
  {
    id: "prod-property",
    name: "InsureMind Home Shield & Business",
    category: "Asuransi Properti",
    benefits: "Melindungi bangunan rumah tinggal, ruko, kantor, beserta seluruh perabot di dalamnya dari musibah kebakaran dan bencana alam.",
    object: "Bangunan konstruksi beton (Kelas I), semi permanen (Kelas II), atau kayu (Kelas III) beserta isinya.",
    warranty: "Jaminan dasar FLEXAS (Kebakaran, Sambaran Petir langsung, Ledakan tabung/mesin, Kejatuhan Pesawat, dan Asap akibat kebakaran).",
    extension: "Kerusuhan (SRCC), Kebanjiran & Angin Topan, Gempa Bumi & Tsunami, Biaya Pembersihan Puing, Ganti Rugi Sewa Rumah Sementara.",
    exclusions: "Pencurian selama kebakaran terjadi (kecuali diperluas), bangunan sengaja dibakar oleh pemilik sendiri, keausan alami bahan bangunan.",
    claimCase: "Kebakaran ruko akibat korsleting listrik di lantai 2. Kerugian bangunan dan stok dagangan senilai Rp 350.000.000. Tim Loss Adjuster melakukan survei dan klaim disetujui penuh setelah dikurangi depresiasi barang dagangan.",
    faqs: [
      { q: "Bagaimana cara menentukan nilai pertanggungan rumah?", a: "Dihitung berdasarkan luas bangunan dikali biaya bangun kembali per meter persegi saat ini, tidak termasuk nilai tanah." },
      { q: "Apakah asuransi ini wajib bagi rumah yang diagunkan ke Bank?", a: "Ya, Bank mensyaratkan asuransi kebakaran dengan klausul bank (Bank Clause) untuk melindungi jaminan kredit." }
    ]
  },
  {
    id: "prod-pa",
    name: "InsureMind Persona Safe",
    category: "Asuransi Personal Accident",
    benefits: "Memberikan kepastian perlindungan finansial keluarga atas risiko kematian mendadak atau cacat permanen akibat kecelakaan.",
    object: "Individu berusia 17 - 65 tahun.",
    warranty: "Uang pertanggungan meninggal dunia akibat kecelakaan, santunan cacat tetap total/sebagian, penggantian biaya medis pengobatan kecelakaan.",
    extension: "Perlindungan risiko kecelakaan akibat mengendarai sepeda motor (klausul khusus), keracunan gas makanan tidak sengaja.",
    exclusions: "Kecelakaan akibat olahraga ekstrem (bungee jumping, balap motor profesional), bunuh diri, kecelakaan saat melakukan tindakan kriminal.",
    claimCase: "Tertanggung terjatuh dari tangga di rumah dan mengalami patah tulang tangan kanan. Biaya operasi di RS senilai Rp 15.000.000 diganti seluruhnya melalui sistem reimbursement asuransi.",
    faqs: [
      { q: "Apakah asuransi kecelakaan diri sama dengan asuransi jiwa?", a: "Berbeda. Asuransi jiwa menjamin kematian akibat penyebab medis apa pun, sedangkan Personal Accident hanya menjamin akibat kecelakaan fisik eksternal." }
    ]
  }
];

// 3. Materi Coaching Agen Asuransi
const COACHING_MATERIALS_DEFAULT = [
  {
    id: "prospecting",
    title: "Prospecting: Menemukan Prospek Potensial",
    tips: "Gunakan metode ANCOR (Authority, Need, Cost, Opportunity, Relationship). Jangan habiskan waktu memprospek orang yang tidak memiliki wewenang membeli atau tidak mampu membayar premi.",
    checklist: [
      "Membuat daftar 100 kontak nama potensial (keluarga, teman, rekan bisnis)",
      "Melakukan riset profil media sosial target sebelum menghubungi",
      "Memilah prospek berdasarkan kategori produk (mobil, properti, kesehatan)"
    ]
  },
  {
    id: "presentasi",
    title: "Teknik Presentasi Produk & Nilai Tambah",
    tips: "Fokus pada SOLUSI, bukan fitur teknis produk. Jangan jelaskan polis secara rumit; jelaskan skenario kerugian finansial yang dapat dialami nasabah jika tidak membeli asuransi.",
    checklist: [
      "Membuka presentasi dengan contoh kasus klaim yang rileks dan relevan",
      "Menerjemahkan bahasa hukum polis ke dalam simulasi analogi sederhana",
      "Menyajikan 2 alternatif paket penawaran (Basic vs Premium)"
    ]
  },
  {
    id: "closing",
    title: "Teknik Closing Penjualan",
    tips: "Gunakan 'Assumptive Close' (Mengasumsikan nasabah setuju membeli) atau 'Urgency Close' (Menginfokan promo kuota terbatas atau masa berlaku tarif premi diskon).",
    checklist: [
      "Mengajukan pertanyaan pilihan: 'Bapak ingin pembayaran via transfer bank atau kartu kredit?'",
      "Meminta kelengkapan KTP dan STNK kendaraan secara sopan untuk draf polis",
      "Membantu mengisi formulir SPPA di hadapan nasabah"
    ]
  },
  {
    id: "follow-up",
    title: "Strategi Follow Up Tanpa Mengganggu",
    tips: "Jangan sekadar bertanya 'Bagaimana penawaran saya kemarin?'. Kirimkan informasi bermanfaat tambahan seperti artikel tips merawat mobil atau info regulasi asuransi baru.",
    checklist: [
      "Menjadwalkan tindak lanjut 3 hari setelah proposal penawaran dikirim",
      "Mengirim ucapan hari raya secara personal untuk membangun kedekatan emosional",
      "Mengundang prospek ke acara edukasi finansial / webinar perusahaan"
    ]
  },
  {
    id: "handling-objection",
    title: "Mengatasi Keberatan Nasabah (Handling Objection)",
    tips: "Gunakan metode FEET (Feel, Felt, Found). Dengarkan keberatan nasabah sepenuhnya tanpa memotong kalimat mereka. Validasi kekhawatiran mereka sebelum memberi solusi.",
    checklist: [
      "Objection 'Premi terlalu mahal' -> Tunjukkan nilai kerugian nyata jika terjadi klaim mandiri",
      "Objection 'Saya sudah punya asuransi lain' -> Tawarkan review komparasi celah proteksi (gap analysis)",
      "Objection 'Saya pikir-pikir dulu' -> Berikan penawaran urgensi jangka waktu jaminan"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing untuk Agen Asuransi",
    tips: "Gunakan iklan berbayar (Facebook & Instagram Ads) dengan target demografi lokal yang spesifik (misal: pemilik mobil baru di kota tertentu).",
    checklist: [
      "Membuat landing page portofolio agen yang bersih dan tepercaya",
      "Mengunggah konten edukasi tips asuransi 2 kali seminggu",
      "Membuat video testimoni kepuasan nasabah saat klaim mereka dibantu"
    ]
  },
  {
    id: "personal-branding",
    title: "Membangun Personal Branding Profesional",
    tips: "Posisikan diri Anda sebagai 'Risk Advisor' (Penasihat Risiko), bukan sales asuransi agresif. Bagikan sertifikasi kelulusan LSP Anda di LinkedIn.",
    checklist: [
      "Memperbarui profil LinkedIn dengan gelar keagenan berlisensi",
      "Menggunakan foto profil formal dengan senyum bersahabat",
      "Aktif menulis komentar analitis mengenai perkembangan industri asuransi"
    ]
  },
  {
    id: "penggunaan-ai",
    title: "Optimalisasi AI dalam Pekerjaan Agen",
    tips: "Manfaatkan ChatGPT / Claude untuk mempermudah penyusunan email tindak lanjut, draf konten edukasi sosial media, dan merangkum pengecualian polis yang panjang.",
    checklist: [
      "Menguasai teknik prompt AI untuk simulasi kalkulasi komparasi asuransi",
      "Menggunakan AI untuk menyunting draf proposal penawaran agar lebih persuasif",
      "Melatih percakapan negosiasi prospek lewat bot simulator AI"
    ]
  }
];

// 4. Modul Sertifikasi LSP
const LSP_PREP_DEFAULT = [
  {
    qualification: "Level 3",
    title: "Kualifikasi Agen Level 3 (Asuransi Umum)",
    units: [
      { code: "M.66ASU01.001.1", name: "Menerapkan Kode Etik Keagenan Asuransi Umum" },
      { code: "M.66ASU01.002.1", name: "Menjelaskan Dasar Hukum Asuransi dan Regulasi OJK" },
      { code: "M.66ASU01.003.1", name: "Memasarkan Produk Asuransi Umum Tingkat Dasar" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: "Fokus pada pemahaman 6 prinsip dasar asuransi, aturan denda rebating OJK, serta tata cara pengisian SPPA yang benar.",
    summary: "Sertifikasi wajib tingkat awal untuk mendapatkan lisensi resmi AAUI guna memasarkan produk asuransi kebakaran dan kendaraan standar."
  },
  {
    qualification: "Level 4 - Bonding",
    title: "Kualifikasi Agen Level 4 (Bonding)",
    units: [
      { code: "M.66ASU02.005.1", name: "Menganalisis Risiko Penjaminan (Suretyship)" },
      { code: "M.66ASU02.006.1", name: "Memasarkan Produk Jaminan Proyek (Bid Bond, Performance Bond, dll.)" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: "Pahami perbedaan mekanisme asuransi (2 pihak) dengan penjaminan suretyship (3 pihak: Principal, Obligee, Surety). Hafalkan jenis-jenis jaminan proyek.",
    summary: "Kualifikasi lanjutan bagi agen asuransi yang ingin fokus melayani penjaminan proyek konstruksi pemerintah dan swasta."
  },
  {
    qualification: "Level 4 - PAYDI",
    title: "Kualifikasi Agen Level 4 (PAYDI)",
    units: [
      { code: "M.66ASU03.010.1", name: "Menjelaskan Karakteristik Produk Asuransi Dikaitkan Investasi (PAYDI)" },
      { code: "M.66ASU03.011.1", name: "Melakukan Evaluasi Profil Risiko Investasi Calon Tertanggung" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: "Konsentrasi pada regulasi SEOJK PAYDI mengenai cuti premi, waiting period, ilustrasi investasi, dan kewajiban merekam proses penjualan.",
    summary: "Sertifikasi khusus yang diwajibkan OJK bagi agen yang memasarkan produk asuransi jiwa/umum yang mengandung unsur investasi."
  }
];

// 5. Bank Soal Ujian (60 Soal Pilihan Ganda & Studi Kasus)
const TRYOUT_QUESTIONS_BANK = [
  {
    id: 1,
    category: "Dasar Asuransi",
    question: "Manakah di bawah ini yang merupakan perwujudan prinsip 'Insurable Interest' yang tepat?",
    options: [
      "Mengasuransikan rumah dinas milik perusahaan tanpa persetujuan direksi",
      "Mengasuransikan bangunan rumah yang dimiliki secara sah oleh diri sendiri",
      "Mengasuransikan mobil milik pacar karena sering dipinjam",
      "Mengasuransikan gudang milik tetangga sebelah ruko"
    ],
    correctAnswer: 1,
    explanation: "Insurable Interest mensyaratkan adanya hubungan kepemilikan keuangan yang sah dan diakui oleh hukum antara tertanggung dan objek asuransi."
  },
  {
    id: 2,
    category: "Dasar Asuransi",
    question: "Kewajiban pihak tertanggung untuk memaparkan semua fakta material secara jujur dan lengkap saat pengisian SPPA diatur dalam prinsip...",
    options: ["Indemnity", "Subrogation", "Utmost Good Faith", "Contribution"],
    correctAnswer: 2,
    explanation: "Utmost Good Faith (Itikad Baik yang Paling Mutlak) mewajibkan kedua belah pihak bersikap jujur dan transparan mengenai kondisi objek."
  },
  {
    id: 3,
    category: "Dasar Asuransi",
    question: "Ganti rugi asuransi ditujukan untuk mengembalikan tertanggung ke posisi keuangan sebelum kerugian, tanpa mencari keuntungan berlebih. Ini merupakan prinsip...",
    options: ["Contribution", "Indemnity", "Insurable Interest", "Proximate Cause"],
    correctAnswer: 1,
    explanation: "Prinsip Indemnity menyatakan bahwa ganti rugi maksimal setara dengan kerugian nyata (tidak boleh double claim untuk untung)."
  },
  {
    id: 4,
    category: "Dasar Asuransi",
    question: "Jika asuransi A menjamin Rp 60 juta dan asuransi B menjamin Rp 40 juta atas ruko senilai Rp 100 juta. Jika terjadi klaim Rp 20 juta, berapakah porsi pembayaran asuransi B berdasarkan prinsip Kontribusi?",
    options: ["Rp 20.000.000", "Rp 10.000.000", "Rp 8.000.000", "Rp 12.000.000"],
    correctAnswer: 2,
    explanation: "Proporsi B adalah 40% (40 juta dari total 100 juta). Maka porsi ganti rugi B = 40% x Rp 20.000.000 = Rp 8.000.000."
  },
  {
    id: 5,
    category: "Dasar Asuransi",
    question: "Dalam asuransi properti, jika api membakar instalasi listrik hingga menyebabkan korsleting dan memicu ledakan tabung gas yang menghancurkan dinding. Penyebab terdekat (Proximate Cause) dari runtuhnya dinding adalah...",
    options: ["Ledakan gas", "Runtuhnya dinding", "Kebakaran awal", "Korsleting listrik"],
    correctAnswer: 2,
    explanation: "Kebakaran awal (Fire) adalah penyebab aktif dan efisien yang mengawali seluruh rantai kejadian tanpa intervensi eksternal."
  },
  {
    id: 6,
    category: "Dasar Asuransi",
    question: "Subrogasi hanya berlaku pada kontrak asuransi yang bersifat...",
    options: ["Investasi", "Indemnity (Ganti Rugi)", "Santunan Jiwa", "Tabungan"],
    correctAnswer: 1,
    explanation: "Subrogasi hanya berlaku pada kontrak indemnity karena tujuannya mencegah tertanggung menerima ganti rugi ganda (dari asuransi dan pihak ketiga)."
  },
  {
    id: 7,
    category: "Dasar Asuransi",
    question: "Manakah di bawah ini yang digolongkan sebagai 'Fakta Material' dalam asuransi kendaraan?",
    options: [
      "Warna interior jok mobil",
      "Pernah mengalami modifikasi mesin untuk meningkatkan kecepatan (balapan)",
      "Merek parfum mobil yang digunakan",
      "Tempat membeli bahan bakar minyak"
    ],
    correctAnswer: 1,
    explanation: "Modifikasi mesin untuk balapan meningkatkan profil risiko kecelakaan secara signifikan, sehingga termasuk fakta material yang wajib dilaporkan."
  },
  {
    id: 8,
    category: "Dasar Asuransi",
    question: "Pengalihan risiko dari tertanggung kepada penanggung dalam dunia asuransi disebut...",
    options: ["Risk Retention", "Risk Transfer", "Risk Avoidance", "Risk Reduction"],
    correctAnswer: 1,
    explanation: "Risk Transfer (Transfer Risiko) adalah proses memindahkan konsekuensi finansial akibat kerugian kepada perusahaan asuransi dengan imbalan premi."
  },
  {
    id: 9,
    category: "Dasar Asuransi",
    question: "Bentuk tertulis dari perjanjian asuransi yang sah secara hukum dinamakan...",
    options: ["SPPA", "Kwitansi Premi", "Polis Asuransi", "Surat Penawaran"],
    correctAnswer: 2,
    explanation: "Polis asuransi adalah dokumen tertulis yang berfungsi sebagai kontrak hukum perjanjian asuransi."
  },
  {
    id: 10,
    category: "Dasar Asuransi",
    question: "Apakah yang dimaksud dengan 'Law of Large Numbers'?",
    options: [
      "Semakin banyak objek sejenis yang diasuransikan, semakin akurat prediksi kerugian secara statistik",
      "Semakin tinggi premi, semakin besar nilai ganti rugi",
      "Hukum OJK mengenai batas minimal modal perusahaan asuransi",
      "Perhitungan matematis denda keterlambatan bayar premi"
    ],
    correctAnswer: 0,
    explanation: "Hukum bilangan besar menyatakan bahwa semakin besar jumlah sampel acak objek sejenis yang dikumpulkan, probabilitas hasil statistik mendekati kenyataan."
  },
  {
    id: 11,
    category: "Kendaraan Bermotor",
    question: "Menurut PSAKOB, risiko manakah yang secara standar dijamin dalam polis Comprehensive?",
    options: [
      "Kerusakan akibat gempa bumi",
      "Tabrakan, benturan, tergelincir, terperosok, dan pencurian",
      "Kerusakan akibat aksi terorisme",
      "Kerugian akibat mesin aus karena pemakaian"
    ],
    correctAnswer: 1,
    explanation: "Tabrakan, tergelincir, dan pencurian merupakan jaminan standar PSAKOB. Gempa bumi dan terorisme memerlukan perluasan."
  },
  {
    id: 12,
    category: "Kendaraan Bermotor",
    question: "Klaim kehilangan mobil akibat penggelapan oleh sopir pribadi tertanggung statusnya adalah...",
    options: [
      "Dijamin penuh dalam Comprehensive",
      "Dikecualikan dalam ketentuan standar PSAKOB",
      "Dijamin jika mobil dibeli secara tunai",
      "Dijamin dengan potongan risiko sendiri 50%"
    ],
    correctAnswer: 1,
    explanation: "Penggelapan, penipuan, atau hipnotis yang dilakukan oleh karyawan/sopir pribadi dikecualikan dalam polis standar kendaraan."
  },
  {
    id: 13,
    category: "Kendaraan Bermotor",
    question: "Berdasarkan PSAKOB, biaya penderekan kendaraan ke bengkel terdekat yang dijamin maksimal sebesar...",
    options: [
      "10% dari nilai pertanggungan",
      "0.5% dari nilai pertanggungan kendaraan",
      "Rp 5.000.000",
      "1% dari harga pertanggungan kendaraan"
    ],
    correctAnswer: 1,
    explanation: "Standar PSAKOB menjamin biaya derek/pertolongan darurat maksimal sebesar 0,5% dari harga pertanggungan kendaraan."
  },
  {
    id: 14,
    category: "Kendaraan Bermotor",
    question: "Tarif premi asuransi kendaraan bermotor di Indonesia diatur secara ketat oleh OJK berdasarkan...",
    options: [
      "Umur tertanggung dan jenis kelamin",
      "Wilayah nomor polisi kendaraan dan kategori harga pertanggungan",
      "Jarak tempuh harian kendaraan",
      "Merek pabrikan mobil saja"
    ],
    correctAnswer: 1,
    explanation: "OJK membagi tarif premi kendaraan berdasarkan Wilayah (I, II, III) dan batas harga kendaraan untuk menjamin keadilan tarif."
  },
  {
    id: 15,
    category: "Kendaraan Bermotor",
    question: "Wilayah II dalam tarif asuransi kendaraan bermotor OJK mencakup daerah...",
    options: [
      "Sumatera dan kepulauan sekitarnya",
      "DKI Jakarta, Banten, Jawa Barat",
      "Jawa Tengah, Jawa Timur, Bali, NTB, NTT",
      "Kalimantan, Sulawesi, Papua"
    ],
    correctAnswer: 1,
    explanation: "Wilayah II OJK khusus mencakup wilayah DKI Jakarta, Banten, dan Jawa Barat karena kepadatan lalu lintas dan profil risikonya."
  },
  {
    id: 16,
    category: "Kendaraan Bermotor",
    question: "Jaminan Third Party Liability (TPL) dalam asuransi mobil menjamin...",
    options: [
      "Kerusakan mobil milik tertanggung sendiri",
      "Tanggung jawab hukum atas cedera tubuh atau kerusakan aset milik orang lain akibat ditabrak kendaraan tertanggung",
      "Biaya perawatan medis istri tertanggung",
      "Kerusakan barang pribadi di dalam dashboard"
    ],
    correctAnswer: 1,
    explanation: "TPL menjamin ganti rugi atas tuntutan hukum dari pihak ketiga (orang lain) akibat kecelakaan yang disebabkan oleh kendaraan tertanggung."
  },
  {
    id: 17,
    category: "Kendaraan Bermotor",
    question: "Klausul 'Own Risk' (Deductible) pada asuransi mobil berfungsi untuk...",
    options: [
      "Meningkatkan komisi agen asuransi",
      "Menghindari klaim-klaim kecil yang tidak efisien biaya administrasinya",
      "Menokl seluruh klaim secara halus",
      "Mengurangi nilai pertanggungan tahun berikutnya"
    ],
    correctAnswer: 1,
    explanation: "Own Risk (Deductible/Risiko Sendiri) mewajibkan nasabah menanggung sebagian kecil biaya klaim (misal Rp 300rb) untuk mencegah klaim lecet sangat kecil yang membebani administrasi."
  },
  {
    id: 18,
    category: "Kendaraan Bermotor",
    question: "Jika mobil asuransi Comprehensive menabrak pohon hingga hancur dengan biaya perbaikan Rp 120 Juta (Harga pasar mobil Rp 150 Juta), bagaimanakah penyelesaian klaimnya?",
    options: [
      "Diselesaikan dengan ganti rugi Total Loss (TLO)",
      "Diselesaikan dengan jaminan partial loss (perbaikan bengkel) dikurangi own risk",
      "Ditolak karena menabrak benda mati",
      "Diganti mobil baru dengan tipe yang sama"
    ],
    correctAnswer: 1,
    explanation: "Biaya perbaikan Rp 120 juta adalah 80% dari harga pasar (>= 75%). Maka nasabah berhak meminta penyelesaian klaim secara TLO (ganti rugi tunai senilai harga pasar)."
  },
  {
    id: 19,
    category: "Kendaraan Bermotor",
    question: "Apakah asuransi kendaraan otomatis menjamin barang berharga yang hilang di dalam bagasi mobil saat mobil dicuri?",
    options: [
      "Ya, otomatis dijamin penuh",
      "Tidak dijamin, kecuali ada perluasan barang pribadi (personal effect) dengan limit tertentu",
      "Dijamin hanya jika mobil dikunci rapat",
      "Dijamin oleh TPL"
    ],
    correctAnswer: 1,
    explanation: "Polis standar PSAKOB mengecualikan barang-barang pribadi di dalam kendaraan. Harus ada perluasan klausul 'Personal Effects' khusus."
  },
  {
    id: 20,
    category: "Kendaraan Bermotor",
    question: "Kapan masa pertanggungan asuransi kendaraan bermotor standar berakhir?",
    options: [
      "Setelah terjadi klaim pertama",
      "12 bulan (1 tahun) sejak tanggal mulai yang tercantum di polis",
      "Saat mobil dijual kepada pihak lain (otomatis gugur kecuali dialihkan resmi)",
      "Pernyataan 2 dan 3 benar"
    ],
    correctAnswer: 3,
    explanation: "Polis berlaku selama 1 tahun, dan perlindungan otomatis berakhir saat kepemilikan mobil beralih ke orang lain (kecuali dilaporkan tertulis ke penanggung)."
  },
  {
    id: 21,
    category: "Asuransi Properti",
    question: "Berdasarkan PSAKBI, manakah penyebab asap (smoke) yang kerusakannya dijamin oleh polis standar?",
    options: [
      "Asap dari pembakaran hutan di dekat rumah",
      "Asap yang berasal dari kebakaran harta benda yang diasuransikan itu sendiri",
      "Asap dari pabrik tetangga yang mencemari udara",
      "Asap akibat fogging nyamuk demam berdarah"
    ],
    correctAnswer: 1,
    explanation: "PSAKBI hanya menjamin asap yang timbul dari kebakaran objek yang diasuransikan (bagian dari jaminan FLEXAS)."
  },
  {
    id: 22,
    category: "Asuransi Properti",
    question: "Ledakan yang dikecualikan dalam polis standar kebakaran Indonesia (PSAKBI) adalah...",
    options: [
      "Ledakan tabung gas elpiji dapur",
      "Ledakan akibat reaksi nuklir atau senjata militer",
      "Ledakan kompresor pendingin udara (AC)",
      "Ledakan mesin uap rumah tangga"
    ],
    correctAnswer: 1,
    explanation: "Ledakan nuklir, perang, sabotase, dan terorisme dikecualikan dalam polis kebakaran standar."
  },
  {
    id: 23,
    category: "Asuransi Properti",
    question: "Manakah kelas konstruksi bangunan dengan risiko kebakaran tertinggi menurut OJK?",
    options: [
      "Kelas I (Konstruksi beton dan tahan api)",
      "Kelas II (Konstruksi semi permanen / kayu sebagian)",
      "Kelas III (Konstruksi kayu seluruhnya atau mudah terbakar)",
      "Semua kelas dinilai sama oleh OJK"
    ],
    correctAnswer: 2,
    explanation: "Kelas III memiliki bahan bangunan kayu yang mudah terbakar, sehingga dinilai memiliki risiko tertinggi dengan tarif rate premi tertinggi."
  },
  {
    id: 24,
    category: "Asuransi Properti",
    question: "Apakah runtuhnya bangunan akibat tanah longsor dijamin secara otomatis dalam PSAKBI?",
    options: [
      "Ya, otomatis dijamin karena longsor dipicu hujan",
      "Tidak dijamin, harus diperluas dengan klausul tanah longsor (Landslide/Subsidence)",
      "Dijamin hanya jika rumah roboh total",
      "Dijamin oleh asuransi jiwa"
    ],
    correctAnswer: 1,
    explanation: "Roboh akibat pergeseran tanah/longsor dikecualikan dalam PSAKBI standar dan memerlukan perluasan premi khusus."
  },
  {
    id: 25,
    category: "Asuransi Properti",
    question: "Batas waktu pelaporan klaim kebakaran kepada perusahaan asuransi setelah kejadian musibah menurut PSAKBI maksimal...",
    options: ["24 jam", "7 hari kalender", "30 hari kerja", "14 hari kalender"],
    correctAnswer: 1,
    explanation: "PSAKBI mensyaratkan tertanggung memberikan pemberitahuan tertulis mengenai kerugian dalam waktu maksimal 7 hari sejak kejadian."
  },
  {
    id: 26,
    category: "Asuransi Properti",
    question: "Klausul 'Underinsurance' (Pertanggungan di bawah nilai) berlaku apabila...",
    options: [
      "Nilai pertanggungan di polis lebih kecil dari nilai pemulihan bangunan sebenarnya saat kejadian",
      "Nilai premi yang dibayarkan terlalu murah",
      "Nasabah mengasuransikan bangunan di dua perusahaan berbeda",
      "Tinggi bangunan melebihi 5 lantai"
    ],
    correctAnswer: 0,
    explanation: "Underinsurance terjadi saat nilai pertanggungan di polis < nilai aset asli, berakibat pembayaran klaim dilakukan secara proporsional."
  },
  {
    id: 27,
    category: "Asuransi Properti",
    question: "Di bawah ini, manakah harta benda yang TIDAK dijamin di bawah PSAKBI kecuali dipertegas secara tertulis di polis?",
    options: [
      "Furnitur kayu meja kursi",
      "Uang kertas, surat berharga, emas batangan, dan lukisan bernilai seni tinggi",
      "Perkakas dapur kompor gas",
      "Instalasi kabel listrik tembok"
    ],
    correctAnswer: 1,
    explanation: "Uang, emas, surat berharga, dan karya seni merupakan barang bernilai konsentrasi tinggi yang dikecualikan dari jaminan standar asuransi properti umum."
  },
  {
    id: 28,
    category: "Asuransi Properti",
    question: "Tarif premi asuransi kebakaran bangunan ditentukan berdasarkan okupasi. Contoh okupasi berisiko tinggi adalah...",
    options: ["Kantor pemerintahan", "Sekolah", "Pabrik petasan atau gudang kimia", "Rumah tinggal pribadi"],
    correctAnswer: 2,
    explanation: "Pabrik petasan/kimia menyimpan bahan mudah meledak dan terbakar, sehingga masuk kategori okupasi risiko sangat ekstrem."
  },
  {
    id: 29,
    category: "Asuransi Properti",
    question: "Apabila terjadi kebakaran pada rumah tertanggung, dan di saat yang sama beberapa barang dijarah oleh massa di luar ruko. Apakah penjarahan tersebut diganti asuransi?",
    options: [
      "Otomatis diganti karena terjadi bersamaan kebakaran",
      "Tidak diganti, kecuali ruko diperluas dengan jaminan Kerusuhan & Penjarahan (RSMD)",
      "Diganti 100% tanpa potongan",
      "Diganti oleh kepolisian"
    ],
    correctAnswer: 1,
    explanation: "Penjarahan akibat kerusuhan dikecualikan dalam PSAKBI standar. Harus ada perluasan jaminan Riot, Strike, Malicious Damage (RSMD)."
  },
  {
    id: 30,
    category: "Asuransi Properti",
    question: "Apa fungsi dari 'Reinstatement Clause' dalam asuransi properti?",
    options: [
      "Kewajiban mengembalikan premi jika tidak ada klaim",
      "Pengembalian nilai pertanggungan ke nilai semula setelah terjadi klaim parsial dan dibayar preminya kembali",
      "Pembatalan sepihak kontrak polis",
      "Klausul denda keterlambatan klaim"
    ],
    correctAnswer: 1,
    explanation: "Setelah klaim dibayarkan, nilai pertanggungan berkurang. Reinstatement Clause memulihkan nilai pertanggungan ke nominal awal agar perlindungan tetap maksimal."
  },
  {
    id: 31,
    category: "Regulasi & Etika",
    question: "Lembaga resmi di Indonesia yang berhak mengeluarkan sertifikat kelulusan ujian keagenan asuransi umum adalah...",
    options: [
      "Otoritas Jasa Keuangan (OJK)",
      "Asosiasi Asuransi Umum Indonesia (AAUI) melalui LSP Asuransi",
      "Kementerian Keuangan",
      "Persatuan Agen Asuransi Indonesia (PAAI)"
    ],
    correctAnswer: 1,
    explanation: "LSP (Lembaga Sertifikasi Profesi) AAUI adalah badan yang ditunjuk untuk menyelenggarakan ujian sertifikasi agen asuransi umum."
  },
  {
    id: 32,
    category: "Regulasi & Etika",
    question: "Sanksi terberat dari OJK bagi agen asuransi yang terbukti menipu nasabah atau menggelapkan premi adalah...",
    options: [
      "Teguran lisan dari direksi perusahaan",
      "Pencabutan lisensi keagenan, masuk daftar hitam (blacklist) industri, dan tuntutan pidana",
      "Penundaan komisi selama 1 bulan",
      "Kewajiban mengikuti ujian sertifikasi ulang"
    ],
    correctAnswer: 1,
    explanation: "Pelanggaran hukum berat seperti penipuan/penggelapan premi berakibat pencabutan lisensi permanen dan proses hukum pidana."
  },
  {
    id: 33,
    category: "Regulasi & Etika",
    question: "Praktek agen memberikan diskon ilegal atau menyerahkan sebagian komisinya kepada nasabah agar mau membeli polis disebut...",
    options: ["Underwriting", "Coinsurance", "Rebating", "Commission Sharing"],
    correctAnswer: 2,
    explanation: "Rebating dilarang oleh asosiasi dan OJK karena merusak integritas profesi agen dan memicu persaingan tidak sehat."
  },
  {
    id: 34,
    category: "Regulasi & Etika",
    question: "Masa berlaku lisensi agen asuransi umum AAUI di Indonesia adalah...",
    options: ["1 tahun", "2 tahun", "5 tahun", "Berlaku seumur hidup"],
    correctAnswer: 1,
    explanation: "Lisensi keagenan AAUI berlaku selama 2 tahun dan wajib diperpanjang dengan mengikuti program CPD (Continuous Professional Development)."
  },
  {
    id: 35,
    category: "Regulasi & Etika",
    question: "Setiap informasi penting mengenai profil risiko objek asuransi yang dapat mempengaruhi keputusan Underwriter disebut...",
    options: ["Fakta Sekunder", "Fakta Material (Material Facts)", "Klaim Historis", "Brosur Produk"],
    correctAnswer: 1,
    explanation: "Fakta material adalah fakta krusial yang mempengaruhi keputusan penilai risiko untuk menerima/menolak asuransi atau menentukan besaran premi."
  },
  {
    id: 36,
    category: "Regulasi & Etika",
    question: "Apakah diperbolehkan bagi seorang agen untuk merangkap memasarkan produk dari dua perusahaan asuransi umum yang berbeda secara bersamaan?",
    options: [
      "Diperbolehkan asal nasabah mengetahui",
      "Tidak diperbolehkan menurut regulasi OJK (Single Agent Rule)",
      "Diperbolehkan jika komisi dibagi adil",
      "Diperbolehkan khusus di wilayah luar Jawa"
    ],
    correctAnswer: 1,
    explanation: "Regulasi Single Agent Rule menyatakan agen hanya boleh mewakili satu perusahaan asuransi untuk satu jenis asuransi (jiwa/umum)."
  },
  {
    id: 37,
    category: "Regulasi & Etika",
    question: "Dalam perlindungan konsumen keuangan OJK, perusahaan asuransi wajib menyampaikan ringkasan informasi produk bernama...",
    options: ["SPPA", "RIPLAY (Ringkasan Informasi Produk dan Layanan)", "Kwitansi Polis", "Tabel Underwriting"],
    correctAnswer: 1,
    explanation: "RIPLAY wajib disediakan perusahaan asuransi untuk mempermudah calon nasabah memahami manfaat, biaya, dan risiko produk secara transparan."
  },
  {
    id: 38,
    category: "Regulasi & Etika",
    question: "Tindakan agen membujuk nasabah untuk membatalkan polis yang aktif lalu membeli polis baru dengannya semata-mata demi komisi baru disebut...",
    options: ["Twisting", "Churning", "Rebating", "Cross-selling"],
    correctAnswer: 0,
    explanation: "Twisting adalah tindakan membujuk nasabah membatalkan polis lama untuk membeli polis baru demi komisi baru, yang merugikan nasabah."
  },
  {
    id: 39,
    category: "Regulasi & Etika",
    question: "Bila terjadi perselisihan klaim antara nasabah dan perusahaan asuransi, lembaga penyelesaian sengketa alternatif di luar pengadilan adalah...",
    options: ["Bank Indonesia", "LAPS Sektor Jasa Keuangan (LAPS SJK)", "LSP AAUI", "Asosiasi Pialang Asuransi"],
    correctAnswer: 1,
    explanation: "LAPS SJK adalah lembaga resmi terakreditasi OJK yang menyelesaikan sengketa perdata antara konsumen dan pelaku usaha keuangan."
  },
  {
    id: 40,
    category: "Regulasi & Etika",
    question: "Klausul 'Premium Warranty' menegaskan bahwa premi wajib dilunasi dalam batas waktu tertentu sejak polis terbit. Jika lewat batas waktu...",
    options: [
      "Polis diperpanjang gratis",
      "Polis otomatis batal demi hukum (void) dan klaim di masa itu ditolak",
      "Nasabah dikenakan denda bunga 10%",
      "Agen wajib menanggung premi tersebut"
    ],
    correctAnswer: 1,
    explanation: "Premium Warranty membatalkan penjaminan (void) sejak awal jika pelunasan premi melewati batas waktu yang disepakati."
  },
  {
    id: 41,
    category: "Bonding & Suretyship",
    question: "Siapakah yang disebut sebagai 'Principal' dalam transaksi Suretyship?",
    options: [
      "Pemilik proyek yang menerima jaminan",
      "Kontraktor / Pihak yang dijamin dan wajib melaksanakan proyek",
      "Perusahaan asuransi yang menerbitkan sertifikat jaminan",
      "Konsultan pengawas proyek"
    ],
    correctAnswer: 1,
    explanation: "Principal adalah kontraktor/rekanan yang memohon penjaminan dan berkewajiban menyelesaikan proyek sesuai kontrak."
  },
  {
    id: 42,
    category: "Bonding & Suretyship",
    question: "Perbedaan mendasar antara Asuransi Tradisional dengan Suretyship adalah...",
    options: [
      "Asuransi melibatkan 2 pihak, Suretyship melibatkan 3 pihak (Surety, Principal, Obligee)",
      "Asuransi tidak memiliki hak subrogasi, Suretyship memiliki hak ganti rugi (Indemnity Agreement)",
      "Suretyship tidak mengharapkan kerugian (zero loss expectation)",
      "Pernyataan 1 dan 3 benar"
    ],
    correctAnswer: 3,
    explanation: "Suretyship melibatkan 3 pihak dan didasari prinsip zero loss expectation, di mana Principal harus mengembalikan kerugian kepada Surety."
  },
  {
    id: 43,
    category: "Bonding & Suretyship",
    question: "Jaminan yang diajukan kontraktor untuk mengikuti proses lelang/tender proyek konstruksi disebut...",
    options: ["Performance Bond", "Bid Bond (Jaminan Penawaran)", "Advance Payment Bond", "Maintenance Bond"],
    correctAnswer: 1,
    explanation: "Bid Bond (Jaminan Penawaran) menjamin bahwa kontraktor peserta tender tidak mengundurkan diri secara sepihak selama proses lelang."
  },
  {
    id: 44,
    category: "Bonding & Suretyship",
    question: "Jaminan Pelaksanaan (Performance Bond) menjamin obligee bahwa...",
    options: [
      "Principal akan mengembalikan uang muka proyek",
      "Principal akan menyelesaikan proyek konstruksi sesuai spesifikasi teknik dan batas waktu dalam kontrak",
      "Principal akan memelihara bangunan selama masa garansi",
      "Principal akan membayar upah buruh proyek"
    ],
    correctAnswer: 1,
    explanation: "Performance Bond menjamin kelangsungan penyelesaian fisik proyek konstruksi jika kontraktor mangkir/wanprestasi."
  },
  {
    id: 45,
    category: "Bonding & Suretyship",
    question: "Dokumen krusial yang ditandatangani Principal sebelum Surety menerbitkan jaminan proyek adalah...",
    options: [
      "SPPA Kendaraan",
      "Ganti Rugi Penjaminan (Agreement of Indemnity)",
      "Polis Kebakaran",
      "Pernyataan OJK"
    ],
    correctAnswer: 1,
    explanation: "Agreement of Indemnity (Surat Perjanjian Ganti Rugi) memberikan hak hukum kepada Surety untuk menyita aset Principal jika terjadi klaim jaminan."
  },
  {
    id: 46,
    category: "PAYDI",
    question: "PAYDI singkatan dari...",
    options: [
      "Produk Asuransi Yang Dikaitkan dengan Investasi",
      "Perjanjian Asuransi Yang Dikelola Investasi",
      "Program Asuransi Yang Disesuaikan Dana Investasi",
      "Polis Asuransi Yang Diproteksi Dana Investasi"
    ],
    correctAnswer: 0,
    explanation: "PAYDI adalah singkatan resmi OJK untuk Produk Asuransi Yang Dikaitkan dengan Investasi (atau dikenal sebagai Unit Link)."
  },
  {
    id: 47,
    category: "PAYDI",
    question: "Risiko fluktuasi nilai investasi pada produk PAYDI (Unit Link) ditanggung sepenuhnya oleh...",
    options: ["Perusahaan Asuransi", "Otoritas Jasa Keuangan (OJK)", "Pemegang Polis (Nasabah)", "Agen Asuransi"],
    correctAnswer: 2,
    explanation: "Dalam PAYDI, hasil dan risiko investasi (fluktuasi pasar) ditanggung oleh nasabah sendiri. Perusahaan asuransi hanya mengelola dan menjamin proteksi jiwa."
  },
  {
    id: 48,
    category: "PAYDI",
    question: "Alokasi dana premi asuransi PAYDI pada tahun-tahun awal (tahun ke-1 dan ke-2) utamanya digunakan untuk...",
    options: [
      "Investasi reksa dana saham",
      "Biaya Akuisisi perusahaan (penerbitan polis, komisi agen, biaya medis)",
      "Cadangan klaim gratis nasabah",
      "Bonus loyalty nasabah"
    ],
    correctAnswer: 1,
    explanation: "Premi tahun awal didominasi biaya akuisisi untuk menutup operasional awal polis, sehingga nilai investasi tahun awal biasanya sangat kecil."
  },
  {
    id: 49,
    category: "PAYDI",
    question: "Berdasarkan SEOJK PAYDI terbaru, kewajiban agen saat menjelaskan ilustrasi investasi PAYDI kepada nasabah adalah...",
    options: [
      "Menjamin hasil investasi pasti untung di atas bunga bank",
      "Melakukan perekaman video atau suara saat proses penjualan penjelasan produk",
      "Menyembunyikan biaya akuisisi",
      "Menyarankan nasabah berinvestasi di aset kripto"
    ],
    correctAnswer: 1,
    explanation: "Regulasi SEOJK PAYDI mewajibkan dokumentasi perekaman visual/audio saat penjelasan produk untuk meminimalkan miss-selling."
  },
  {
    id: 50,
    category: "PAYDI",
    question: "Fund Investasi PAYDI yang ditempatkan pada instrumen pasar uang (deposito/obligasi jangka pendek) memiliki profil risiko...",
    options: ["Sangat Tinggi", "Sedang", "Rendah dan Stabil", "Spekulatif Ekstrem"],
    correctAnswer: 2,
    explanation: "Money Market Fund (Pasar Uang) menempatkan dana pada instrumen jangka pendek yang stabil sehingga risikonya rendah dengan imbal hasil terukur."
  },
  {
    id: 51,
    category: "Studi Kasus",
    question: "STUDI KASUS: Sebuah truk ekspedisi mengangkut beras senilai Rp 200 Juta dengan asuransi ICC B. Di tengah jalan tol, ban truk pecah sehingga truk terbalik dan beras tumpah ke aspal. Hujan turun lebat merusak beras. Apakah klaim asuransi kargo ini disetujui?",
    options: [
      "Ditolak karena kecelakaan ban pecah",
      "Diterima, karena terbaliknya truk dan masuknya air hujan merupakan risiko yang dijamin dalam ICC B",
      "Ditolak karena beras bukan komoditas asuransi",
      "Diterima 10% saja"
    ],
    correctAnswer: 1,
    explanation: "ICC B menjamin kerusakan barang akibat alat angkut darat terbalik serta masuknya air hujan/air laut ke dalam barang kiriman."
  },
  {
    id: 52,
    category: "Studi Kasus",
    question: "STUDI KASUS: Pak Roni membeli asuransi kebakaran untuk rumahnya. Kontrak ditandatangani 1 Mei 2026. Pak Roni tidak melunasi premi hingga 15 Juni 2026 (lewat batas tenggang 30 hari Premium Warranty). Pada 20 Juni 2026 rumahnya kebakaran. Bagaimana keputusan perusahaan asuransi?",
    options: [
      "Membayar klaim lalu memotong hutang premi",
      "Menolak klaim karena polis batal demi hukum (void) akibat wanprestasi pembayaran premi melewati tenggat warranty",
      "Membayar klaim 50% karena unsur kemanusiaan",
      "Menuntut Pak Roni ke pengadilan"
    ],
    correctAnswer: 1,
    explanation: "Berdasarkan klausul Premium Warranty, kegagalan melunasi premi dalam batas waktu yang ditentukan (biasanya 30 hari) mengakibatkan polis batal sejak awal secara hukum."
  },
  {
    id: 53,
    category: "Studi Kasus",
    question: "STUDI KASUS: Ibu Ami memarkir mobilnya di bahu jalan. Mobil tersebut ditabrak oleh sebuah taksi. Kerusakan mobil Ibu Ami Rp 8.000.000. Perusahaan asuransi Ibu Ami membayar klaim perbaikan Rp 8.000.000. Setelah itu, perusahaan asuransi Ibu Ami menuntut ganti rugi kepada perusahaan taksi tersebut sebesar Rp 8.000.000. Hak ini diperoleh melalui prinsip...",
    options: ["Indemnity", "Contribution", "Subrogation", "Utmost Good Faith"],
    correctAnswer: 2,
    explanation: "Subrogasi mengalihkan hak menuntut pihak ketiga yang bersalah kepada perusahaan asuransi setelah klaim tertanggung diselesaikan."
  },
  {
    id: 54,
    category: "Studi Kasus",
    question: "STUDI KASUS: Sebuah pabrik tekstil diasuransikan dengan nilai pertanggungan bangunan Rp 10 Miliar. Padahal, nilai pembangunan kembali sesungguhnya saat kejadian kebakaran adalah Rp 15 Miliar (Underinsurance). Terjadi kebakaran sebagian dengan taksiran kerugian Rp 3 Miliar. Berapakah ganti rugi yang dibayarkan penanggung?",
    options: [
      "Rp 3.000.000.000 (Sesuai kerugian nyata)",
      "Rp 2.000.000.000 (Dihitung proporsional: 10/15 x Rp 3 Miliar)",
      "Rp 10.000.000.000 (Sesuai nilai polis)",
      "Ditolak sepenuhnya karena salah nilai"
    ],
    correctAnswer: 1,
    explanation: "Di bawah aturan Underinsurance, ganti rugi dihitung proporsional: (Nilai Pertanggungan / Nilai Sebenarnya) x Nilai Kerugian = (10M / 15M) x 3M = Rp 2 Miliar."
  },
  {
    id: 55,
    category: "Studi Kasus",
    question: "STUDI KASUS: Pak Andi menabrak tiang listrik dengan mobilnya karena mengantuk. Ternyata Pak Andi memiliki lisensi SIM A yang sudah kedaluwarsa 2 bulan. Kerusakan mobil Rp 15.000.000. Bagaimana status klaim mobil Pak Andi?",
    options: [
      "Diterima karena kelalaian mengantuk dijamin",
      "Ditolak karena SIM tidak berlaku/mati melanggar ketentuan wajib kelayakan pengemudi dalam pengecualian polis",
      "Diterima dengan denda tambahan",
      "Diganti 75%"
    ],
    correctAnswer: 1,
    explanation: "SIM kedaluwarsa dianggap tidak memiliki SIM yang sah, yang merupakan pengecualian mutlak dalam ketentuan standar PSAKOB."
  },
  {
    id: 56,
    category: "Studi Kasus",
    question: "STUDI KASUS: Toko emas milik Pak Tedi kebakaran. Pak Tedi mengajukan klaim emas batangan yang meleleh senilai Rp 200 Juta. Namun di polis asuransi kebakaran dasarnya tidak tertulis klausul penjaminan barang berharga (valuables). Keputusan klaim emas batangan tersebut adalah...",
    options: [
      "Diterima karena emas berada di dalam toko",
      "Ditolak karena barang berharga dikecualikan dalam polis standar kebakaran kecuali dipertegas tertulis di polis",
      "Diganti berupa uang cash setengahnya",
      "Diganti dengan batasan denda own risk"
    ],
    correctAnswer: 1,
    explanation: "Logam mulia, perhiasan, dan barang seni bernilai tinggi dikecualikan secara standar dalam PSAKBI kecuali diperluas tertulis dengan premi tambahan."
  },
  {
    id: 57,
    category: "Studi Kasus",
    question: "STUDI KASUS: Seorang kontraktor proyek jalan tol mengajukan klaim jaminan EAR untuk perbaikan aspal yang terkelupas akibat banjir bandang. Namun proyek tersebut baru direncanakan dan belum mulai dikerjakan. Apakah jaminan asuransi sudah aktif?",
    options: [
      "Aktif sejak pembayaran tanda jadi",
      "Tidak aktif, jaminan rekayasa EAR/CAR baru aktif setelah pekerjaan fisik dimulai di lokasi proyek atau material diturunkan di lokasi",
      "Aktif seumur hidup kontraktor",
      "Aktif jika disetujui OJK"
    ],
    correctAnswer: 1,
    explanation: "Polis CAR/EAR aktif setelah pekerjaan fisik di lokasi dimulai atau material pertama diturunkan di lokasi proyek (mana yang terjadi lebih dulu)."
  },
  {
    id: 58,
    category: "Studi Kasus",
    question: "STUDI KASUS: Ibu Dian mengajukan klaim asuransi kesehatan rawat inap. RS menagih biaya kamar Rp 1.500.000 per hari. Namun limit kamar di polis Ibu Dian adalah Rp 1.000.000 per hari (Inner Limit). Bagaimana proses pembayarannya?",
    options: [
      "Asuransi menolak seluruh tagihan rumah sakit",
      "Asuransi membayar Rp 1.000.000 per hari, dan selisih Rp 500.000 per hari ditanggung/dibayar mandiri oleh Ibu Dian (Excess Bill)",
      "Asuransi membayar penuh Rp 1.500.000",
      "Ibu Dian dituntut denda"
    ],
    correctAnswer: 1,
    explanation: "Sesuai sistem Inner Limit, penanggung hanya membayar maksimal plafon di polis. Kelebihan biaya (excess bill) wajib dibayar oleh peserta."
  },
  {
    id: 59,
    category: "Studi Kasus",
    question: "STUDI KASUS: Selama proses lelang proyek pembangunan jembatan, Kontraktor PT Maju yang memenangkan tender tiba-tiba membatalkan diri karena kekurangan modal kerja. Obligee mengajukan klaim atas Bid Bond PT Maju. Dampak klaim bagi Surety adalah...",
    options: [
      "Surety membayar nilai jaminan penawaran lelang kepada Obligee, lalu menuntut ganti rugi penuh (recovery) kepada PT Maju selaku Principal",
      "Surety mengalami kerugian total tanpa bisa menagih PT Maju",
      "Surety membatalkan tender secara sepihak",
      "Surety dipidanakan oleh negara"
    ],
    correctAnswer: 0,
    explanation: "Mekanisme Suretyship mewajibkan Surety membayar jaminan kepada Obligee, dan berhak menagih kembali seluruh uang klaim kepada Principal (PT Maju) sesuai Perjanjian Ganti Rugi."
  },
  {
    id: 60,
    category: "Studi Kasus",
    question: "STUDI KASUS: Pak Rudi membeli PAYDI premi berkala. Selama penjualan, Agen Roni menyatakan bahwa investasi Unit Link ini dijamin pasti memberikan untung 15% per tahun dan tidak ada risiko rugi. Setelah 2 tahun, dana investasi Pak Rudi turun 10% karena pasar saham anjlok. Pak Rudi menuntut perusahaan asuransi karena merasa ditipu. Pelanggaran apa yang dilakukan Agen Roni?",
    options: [
      "Rebating",
      "Miss-selling (penjualan menyesatkan dengan memberikan garansi hasil investasi yang melanggar kode etik OJK)",
      "Twisting",
      "Coinsurance"
    ],
    correctAnswer: 1,
    explanation: "Menjanjikan imbal hasil pasti pada produk investasi Unit Link merupakan tindakan Miss-selling yang melanggar keras kode etik pemasaran produk jasa keuangan OJK."
  }
];

// 5.5. Kurikulum Silabus Training
const TRAINING_SYLLABUS_DEFAULT = [
  {
    level: "Basic",
    materials: [
      { id: "basic-1", no: 1, title: "BOP", mandiri: false, online: true, kuis: false },
      { id: "basic-2", no: 2, title: "Business Partner Application", mandiri: false, online: true, kuis: false },
      { id: "basic-3", no: 3, title: "Digitalisasi", mandiri: true, online: true, kuis: true },
      { id: "basic-4", no: 4, title: "Tutorial Uji Kompetensi Agen", mandiri: true, online: true, kuis: true }
    ]
  },
  {
    level: "Intermediate",
    materials: [
      { id: "int-1", no: 1, title: "Simas Rumah Hemat ++", mandiri: true, online: true, kuis: true },
      { id: "int-2", no: 2, title: "Simas Ruko", mandiri: true, online: true, kuis: true },
      { id: "int-3", no: 3, title: "Simas Sehat Gold", mandiri: true, online: true, kuis: true },
      { id: "int-4", no: 4, title: "Simas Sehat Income", mandiri: true, online: true, kuis: true },
      { id: "int-5", no: 5, title: "Simas Travel + Covid 19", mandiri: true, online: true, kuis: true },
      { id: "int-6", no: 6, title: "Simas PA Siswa", mandiri: true, online: true, kuis: true },
      { id: "int-7", no: 7, title: "Simas Mudik", mandiri: true, online: true, kuis: true },
      { id: "int-8", no: 8, title: "Simas Sepeda", mandiri: true, online: true, kuis: true },
      { id: "int-9", no: 9, title: "Simas Sehat Executive", mandiri: true, online: true, kuis: true },
      { id: "int-10", no: 10, title: "Simas Mikro", mandiri: true, online: true, kuis: true },
      { id: "int-11", no: 11, title: "Simas Pet Insurance", mandiri: true, online: true, kuis: true },
      { id: "int-12", no: 12, title: "Simas Mobil", mandiri: true, online: true, kuis: true },
      { id: "int-13", no: 13, title: "Dan lainnya", mandiri: true, online: true, kuis: true }
    ]
  },
  {
    level: "Advanced",
    materials: [
      { id: "adv-1", no: 1, title: "Cash in Safe & Cash in Transit", mandiri: true, online: true, kuis: true },
      { id: "adv-2", no: 2, title: "Heavy Equipment", mandiri: true, online: true, kuis: true },
      { id: "adv-3", no: 3, title: "Marine Cargo", mandiri: true, online: true, kuis: true },
      { id: "adv-4", no: 4, title: "Property All Risk", mandiri: true, online: true, kuis: true },
      { id: "adv-5", no: 5, title: "Simas Sehat Corporate", mandiri: true, online: true, kuis: true },
      { id: "adv-6", no: 6, title: "Surety Bond & Kontra Bank Garansi", mandiri: true, online: true, kuis: true },
      { id: "adv-7", no: 7, title: "Simas CAR", mandiri: true, online: true, kuis: true },
      { id: "adv-8", no: 8, title: "Marine Hull", mandiri: true, online: true, kuis: true },
      { id: "adv-9", no: 9, title: "Trade Credit Insurance", mandiri: true, online: true, kuis: true },
      { id: "adv-10", no: 10, title: "Growing Trees", mandiri: true, online: true, kuis: true },
      { id: "adv-11", no: 11, title: "Asuransi Kredit Ekspor", mandiri: true, online: true, kuis: true },
      { id: "adv-12", no: 12, title: "Asuransi Liability", mandiri: true, online: true, kuis: true },
      { id: "adv-13", no: 13, title: "Siber Risk Insurance", mandiri: true, online: true, kuis: true },
      { id: "adv-14", no: 14, title: "Dan lainnya", mandiri: true, online: true, kuis: true }
    ]
  }
];

// 6. Item Toko Virtual Reward
const SHOP_ITEMS_DEFAULT = [
  { id: "streak_freeze", name: "Streak Freeze 🛡️", desc: "Melindungi api belajar Anda agar tidak hangus jika absen belajar selama 1 hari.", price: 50, icon: "shield" },
  { id: "infinite_ai", name: "Unlimited AI Coach 💬", desc: "Akses konsultasi tanpa batasan kuota harian dengan mentor AI.", price: 100, icon: "message-circle" },
  { id: "gold_profile", name: "Bingkai Emas Premium 👑", desc: "Menampilkan lingkaran bingkai emas megah di foto profil dan papan peringkat Anda.", price: 15, icon: "award" },
  { id: "director_coffee", name: "Virtual Coffee Chat ☕", desc: "Sesi mentoring virtual 1-on-1 selama 30 menit bersama Senior Regional Director.", price: 30, icon: "coffee" },
  { id: "voucher_pulsa_50k", name: "Voucher Pulsa Rp 50.000 📱", desc: "Pulsa senilai Rp 50.000 dikirim langsung ke nomor HP terdaftar Anda dalam 1x24 jam.", price: 75, icon: "phone" },
  { id: "game_ticket", name: "Tiket Main Lagi 🎮", desc: "Menambah 1x kuota bermain game edukasi Arena Game di luar batas harian 2x gratis.", price: 5, icon: "gift" }
];

// 7. Data Awal Papan Peringkat (Mock Leaderboard)
const LEADERBOARD_NATIONAL_DEFAULT = [
  { name: "Coach Hendra, AAIK", branch: "Jakarta Pusat", xp: 2450, isUser: false, hasGoldFrame: true },
  { name: "Budi Santoso", branch: "Surabaya", xp: 1800, isUser: false, hasGoldFrame: false },
  { name: "Ani Wijaya", branch: "Bandung", xp: 1650, isUser: false, hasGoldFrame: true },
  { name: "Siti Rahma", branch: "Medan", xp: 950, isUser: false, hasGoldFrame: false },
  { name: "Dedi Hermawan", branch: "Semarang", xp: 820, isUser: false, hasGoldFrame: false },
  { name: "Lisa Permata", branch: "Makassar", xp: 710, isUser: false, hasGoldFrame: false },
  { name: "Toni Setiawan", branch: "Palembang", xp: 620, isUser: false, hasGoldFrame: false },
  { name: "Rina Melati", branch: "Denpasar", xp: 530, isUser: false, hasGoldFrame: false },
  { name: "Joko Susilo", branch: "Yogyakarta", xp: 480, isUser: false, hasGoldFrame: false }
];

const LEADERBOARD_BRANCH_DEFAULT = [
  { name: "Denny Pratama", branch: "Jakarta Raya", xp: 840, isUser: false, hasGoldFrame: false },
  { name: "Sarah Aurelia", branch: "Jakarta Raya", xp: 690, isUser: false, hasGoldFrame: true },
  { name: "Kevin Sanjaya", branch: "Jakarta Raya", xp: 410, isUser: false, hasGoldFrame: false },
  { name: "Maya Kartika", branch: "Jakarta Raya", xp: 320, isUser: false, hasGoldFrame: false },
  { name: "Andre Taulany", branch: "Jakarta Raya", xp: 150, isUser: false, hasGoldFrame: false },
  { name: "Taufik Hidayat", branch: "Jakarta Raya", xp: 90, isUser: false, hasGoldFrame: false }
];

const UNDERWRITING_CASES_DEFAULT = [
  {
    id: "case-01",
    title: "Pemilik Mobil Sport 20 Tahun",
    category: "Asuransi Kendaraan Bermotor (Comprehensive)",
    risk: "Nasabah berusia 20 tahun, mengendarai mobil sport dengan cc tinggi, memiliki riwayat 3 kali ditilang karena mengebut dalam 1 tahun terakhir.",
    premi: "Rp 15.000.000 / tahun",
    emoji: "🚗",
    correctAnswer: "reject",
    feedback: "TOLAK! Pengemudi muda dengan mobil sport berperforma tinggi dan riwayat tilang mengebut memiliki risiko kecelakaan sangat tinggi (moral & physical hazard)."
  },
  {
    id: "case-02",
    title: "Gudang Kayu Tanpa Proteksi Kebakaran",
    category: "Asuransi Kebakaran & Properti",
    risk: "Gudang penyimpanan kayu gelondongan dengan konstruksi kayu (kelas 3), tidak dilengkapi sprinkler maupun APAR, terletak di daerah padat industri.",
    premi: "Rp 8.500.000 / tahun",
    emoji: "🪵",
    correctAnswer: "reject",
    feedback: "TOLAK! Gudang kayu konstruksi kelas 3 tanpa alat proteksi kebakaran (APAR/sprinkler) memiliki tingkat bahaya kebakaran yang tidak dapat diterima."
  },
  {
    id: "case-03",
    title: "Sedan Keluarga dengan Garasi Tertutup",
    category: "Asuransi Kendaraan Bermotor (Comprehensive)",
    risk: "Nasabah keluarga berusia 35 tahun, menggunakan mobil sedan untuk aktivitas harian, selalu parkir di garasi rumah terkunci, rekam jejak mengemudi bersih 5 tahun.",
    premi: "Rp 3.200.000 / tahun",
    emoji: "🚙",
    correctAnswer: "accept",
    feedback: "TERIMA! Ini adalah preferred risk (risiko baik). Usia matang, parkir aman, dan rekam jejak mengemudi yang bersih."
  },
  {
    id: "case-04",
    title: "Kapal Kayu Tradisional Usia 35 Tahun",
    category: "Asuransi Rangka Kapal (Marine Hull)",
    risk: "Kapal kayu pinisi tradisional buatan tahun 1991, digunakan untuk mengangkut barang antar pulau di daerah navigasi berombak besar.",
    premi: "Rp 45.000.000 / tahun",
    emoji: "🚢",
    correctAnswer: "reject",
    feedback: "TOLAK! Kapal kayu tradisional berusia di atas 30 tahun memiliki risiko pelapukan, kebocoran, dan kegagalan struktural yang sangat tinggi di laut lepas."
  },
  {
    id: "case-05",
    title: "Pabrik Tekstil dengan Sprinkler & Hydrant",
    category: "Asuransi Kebakaran & Properti",
    risk: "Pabrik tekstil modern dengan konstruksi beton kelas 1, dilengkapi sistem pemadam otomatis sprinkler, hydrant halaman aktif, dan tim tanggap darurat 24 jam.",
    premi: "Rp 25.000.000 / tahun",
    emoji: "🏭",
    correctAnswer: "accept",
    feedback: "TERIMA! Meskipun industri tekstil memiliki risiko kebakaran sedang, mitigasi risiko pabrik ini sangat baik (konstruksi kelas 1, sprinkler, hydrant)."
  },
  {
    id: "case-06",
    title: "Pengiriman Uang Rp 1 Miliar via Motor",
    category: "Asuransi Uang (Cash in Transit)",
    risk: "Pengiriman uang tunai sebesar Rp 1.000.000.000 dari kantor cabang ke bank utama, dilakukan setiap hari Senin menggunakan sepeda motor oleh satu orang karyawan tanpa pengawalan.",
    premi: "Rp 12.000.000 / tahun",
    emoji: "💰",
    correctAnswer: "reject",
    feedback: "TOLAK! Pengiriman uang tunai bernilai tinggi menggunakan sepeda motor oleh satu orang tanpa pengawalan bersenjata memiliki risiko perampokan yang sangat tinggi."
  },
  {
    id: "case-07",
    title: "Karyawan Administrasi Usia 28 Tahun",
    category: "Asuransi Kecelakaan Diri (Personal Accident)",
    risk: "Nasabah bekerja penuh waktu sebagai staf administrasi kantor (pekerjaan dalam ruangan, risiko rendah), usia 28 tahun, riwayat kesehatan prima tanpa hobi ekstrem.",
    premi: "Rp 250.000 / tahun",
    emoji: "👨‍💼",
    correctAnswer: "accept",
    feedback: "TERIMA! Risiko sangat rendah (pekerjaan kantor kelas risiko 1), profil kesehatan baik, dan tidak ada aktivitas ekstrem."
  },
  {
    id: "case-08",
    title: "Pariwisata Pendakian Gunung Everest",
    category: "Asuransi Kecelakaan Diri (Personal Accident)",
    risk: "Nasabah berusia 45 tahun berencana mendaki Gunung Everest (ketinggian di atas 8.000 meter) sebagai bagian dari tur ekspedisi ekstrem selama 2 bulan.",
    premi: "Rp 5.000.000 / trip",
    emoji: "🏔️",
    correctAnswer: "reject",
    feedback: "TOLAK! Pendakian gunung dengan ketinggian di atas 2.500 meter merupakan pengecualian standar dalam polis Kecelakaan Diri karena risiko fatal yang ekstrem."
  },
  {
    id: "case-09",
    title: "Toko Sembako Ruko 2 Lantai",
    category: "Asuransi Kebakaran & Properti",
    risk: "Ruko beton 2 lantai digunakan untuk usaha grosir sembako, berlokasi di area pasar teratur, memiliki APAR 2 unit di setiap lantai, instalasi listrik diperbarui tahun lalu.",
    premi: "Rp 1.800.000 / tahun",
    emoji: "🏪",
    correctAnswer: "accept",
    feedback: "TERIMA! Risiko ruko sembako di pasar teratur dengan peralatan pemadam APAR standar dan instalasi listrik terawat adalah risiko yang sehat."
  },
  {
    id: "case-10",
    title: "Atlet Tinju Profesional",
    category: "Asuransi Kecelakaan Diri (Personal Accident)",
    risk: "Nasabah adalah atlet tinju profesional kelas berat nasional, aktif bertanding dalam kompetisi resmi maupun sparing latihan mingguan.",
    premi: "Rp 1.500.000 / tahun",
    emoji: "🥊",
    correctAnswer: "reject",
    feedback: "TOLAK! Olahraga beladiri kontak fisik profesional seperti tinju dikecualikan dari jaminan Kecelakaan Diri standar karena frekuensi cedera yang sangat tinggi."
  }
];

const WORD_DUEL_QUESTIONS_DEFAULT = [
  {
    word: "SUBROGASI",
    clue: "Pengalihan hak menuntut dari tertanggung kepada penanggung terhadap pihak ketiga setelah klaim dibayar.",
    category: "Prinsip Asuransi"
  },
  {
    word: "INDEMNITAS",
    clue: "Prinsip ganti rugi keuangan yang adil untuk mengembalikan tertanggung ke posisi keuangan sesaat sebelum kerugian.",
    category: "Prinsip Asuransi"
  },
  {
    word: "PREMI",
    clue: "Sejumlah uang yang wajib dibayarkan oleh tertanggung kepada penanggung sebagai imbalan proteksi.",
    category: "Istilah Umum"
  },
  {
    word: "POLIS",
    clue: "Dokumen perjanjian tertulis resmi yang memuat kontrak asuransi antara penanggung dan tertanggung.",
    category: "Istilah Umum"
  },
  {
    word: "UNDERWRITING",
    clue: "Proses seleksi, penilaian, dan penggolongan risiko calon tertanggung untuk menentukan kelayakan dan tarif premi.",
    category: "Proses Bisnis"
  },
  {
    word: "KLAIM",
    clue: "Tuntutan resmi dari tertanggung kepada penanggung untuk membayar ganti rugi atas kerugian yang dijamin.",
    category: "Proses Bisnis"
  },
  {
    word: "REASURANSI",
    clue: "Proses di mana perusahaan asuransi mengasuransikan kembali sebagian risikonya ke perusahaan lain.",
    category: "Bisnis Lanjutan"
  },
  {
    word: "COMPREHENSIVE",
    clue: "Jenis penutupan asuransi kendaraan bermotor yang menjamin kerugian sebagian maupun kerugian total.",
    category: "Asuransi Kendaraan"
  },
  {
    word: "RETENSI",
    clue: "Bagian dari risiko yang ditanggung sendiri oleh perusahaan asuransi (tidak dilemparkan ke reasuransi).",
    category: "Manajemen Risiko"
  },
  {
    word: "KOINSURANSI",
    clue: "Pertanggungan bersama atas suatu risiko oleh dua atau lebih perusahaan asuransi secara proporsional.",
    category: "Bisnis Lanjutan"
  }
];

// 8. Data Master Agen Per Cabang (Khusus Role Pimpinan Cabang & Isolasi Data)
const BRANCH_AGENTS_DEFAULT = [
  {
    code: "AGN-001",
    name: "Rian Aditya",
    email: "rian.aditya@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 1,
    level: "BPP",
    production: 450000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "RA",
    certifications: {
      level3: { status: "Lulus", date: "15 Jan 2025", score: 92, expiry: "15 Jan 2027" },
      level4_bonding: { status: "Lulus", date: "10 Mar 2025", score: 88, expiry: "10 Mar 2027" },
      level4_paydi: { status: "Lulus", date: "02 Feb 2025", score: 90, expiry: "02 Feb 2027" }
    },
    learning: {
      currentModule: "Asuransi Properti & Kebakaran (PSAKBI)",
      progressPct: 100,
      completedChapters: 6,
      totalChapters: 6,
      quizScore: 95,
      lastActive: "Hari ini, 14:30",
      status: "On Track"
    },
    trainingsAttended: ["TRN-01", "TRN-02", "TRN-03"],
    trainingsRSVP: ["TRN-01", "TRN-02", "TRN-03", "TRN-04"]
  },
  {
    code: "AGN-004",
    name: "Denny Pratama",
    email: "denny.pratama@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 2,
    level: "MC",
    production: 380000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "DP",
    certifications: {
      level3: { status: "Lulus", date: "20 Jan 2025", score: 86, expiry: "20 Jan 2027" },
      level4_bonding: { status: "Dalam Proses", date: "Jadwal: 25 Okt 2026", score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Asuransi Pengangkutan Barang (Marine Cargo)",
      progressPct: 85,
      completedChapters: 5,
      totalChapters: 6,
      quizScore: 84,
      lastActive: "Kemarin, 19:15",
      status: "On Track"
    },
    trainingsAttended: ["TRN-01", "TRN-02"],
    trainingsRSVP: ["TRN-01", "TRN-02", "TRN-03"]
  },
  {
    code: "AGN-008",
    name: "Sarah Aurelia",
    email: "sarah.aurelia@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 3,
    level: "MC",
    production: 320000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "SA",
    certifications: {
      level3: { status: "Lulus", date: "05 Feb 2025", score: 88, expiry: "05 Feb 2027" },
      level4_bonding: { status: "Lulus", date: "12 Apr 2025", score: 90, expiry: "12 Apr 2027" },
      level4_paydi: { status: "Dalam Proses", date: "Ujian: 30 Okt 2026", score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Asuransi Tanggung Jawab Hukum (Liability)",
      progressPct: 75,
      completedChapters: 4,
      totalChapters: 6,
      quizScore: 80,
      lastActive: "2 hari lalu",
      status: "On Track"
    },
    trainingsAttended: ["TRN-01", "TRN-03"],
    trainingsRSVP: ["TRN-01", "TRN-03"]
  },
  {
    code: "AGN-012",
    name: "Kevin Sanjaya",
    email: "kevin.sanjaya@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 4,
    level: "NR",
    production: 210000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "KS",
    certifications: {
      level3: { status: "Lulus", date: "18 Feb 2025", score: 78, expiry: "18 Feb 2027" },
      level4_bonding: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Dasar-Dasar Asuransi Umum",
      progressPct: 60,
      completedChapters: 3,
      totalChapters: 5,
      quizScore: 78,
      lastActive: "3 hari lalu",
      status: "Lambat"
    },
    trainingsAttended: ["TRN-01"],
    trainingsRSVP: ["TRN-01", "TRN-02"]
  },
  {
    code: "AGN-015",
    name: "Maya Kartika",
    email: "maya.kartika@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 5,
    level: "NR",
    production: 165000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "MK",
    certifications: {
      level3: { status: "Dalam Proses", date: "Ujian: 18 Okt 2026", score: null, expiry: "-" },
      level4_bonding: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Asuransi Kendaraan Bermotor (PSAKOB)",
      progressPct: 45,
      completedChapters: 2,
      totalChapters: 5,
      quizScore: 70,
      lastActive: "5 hari lalu",
      status: "Lambat"
    },
    trainingsAttended: ["TRN-02"],
    trainingsRSVP: ["TRN-02"]
  },
  {
    code: "AGN-021",
    name: "Andre Taulany",
    email: "andre.taulany@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 6,
    level: "NR",
    production: 95000000,
    status: "Kurang Aktif",
    statusColor: "yellow",
    avatar: "AT",
    certifications: {
      level3: { status: "Dalam Proses", date: "Verifikasi Berkas", score: null, expiry: "-" },
      level4_bonding: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Dasar-Dasar Asuransi Umum",
      progressPct: 25,
      completedChapters: 1,
      totalChapters: 5,
      quizScore: 55,
      lastActive: "1 minggu lalu",
      status: "Stagnan"
    },
    trainingsAttended: [],
    trainingsRSVP: ["TRN-01"]
  },
  {
    code: "AGN-027",
    name: "Taufik Hidayat",
    email: "taufik.hidayat@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 7,
    level: "NR",
    production: 60000000,
    status: "Inaktif",
    statusColor: "red",
    avatar: "TH",
    certifications: {
      level3: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_bonding: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Dasar-Dasar Asuransi Umum",
      progressPct: 10,
      completedChapters: 0,
      totalChapters: 5,
      quizScore: 0,
      lastActive: "2 minggu lalu",
      status: "Stagnan"
    },
    trainingsAttended: [],
    trainingsRSVP: []
  },
  {
    code: "AGN-033",
    name: "Dewi Anggraini",
    email: "dewi.anggraini@asm-academy.id",
    branch: "Cabang Fatmawati",
    rank: 8,
    level: "NR",
    production: 45000000,
    status: "Aktif (Baru)",
    statusColor: "green",
    avatar: "DA",
    certifications: {
      level3: { status: "Dalam Proses", date: "Registrasi Baru", score: null, expiry: "-" },
      level4_bonding: { status: "Belum Mengambil", date: null, score: null, expiry: "-" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: {
      currentModule: "Etika & Regulasi Keagenan AAUI",
      progressPct: 40,
      completedChapters: 2,
      totalChapters: 5,
      quizScore: 68,
      lastActive: "Kemarin, 11:20",
      status: "On Track"
    },
    trainingsAttended: ["TRN-03"],
    trainingsRSVP: ["TRN-03", "TRN-04"]
  },
  // Agen Cabang Lain (untuk testing data isolation)
  {
    code: "AGN-050",
    name: "Budi Santoso",
    email: "budi.santoso@asm-academy.id",
    branch: "Cabang Surabaya",
    rank: 1,
    level: "BPP",
    production: 650000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "BS",
    certifications: {
      level3: { status: "Lulus", date: "10 Jan 2025", score: 95, expiry: "10 Jan 2027" },
      level4_bonding: { status: "Lulus", date: "15 Feb 2025", score: 92, expiry: "15 Feb 2027" },
      level4_paydi: { status: "Lulus", date: "01 Mar 2025", score: 89, expiry: "01 Mar 2027" }
    },
    learning: { currentModule: "All Modules Completed", progressPct: 100, completedChapters: 8, totalChapters: 8, quizScore: 98, lastActive: "Hari ini", status: "On Track" },
    trainingsAttended: ["TRN-01", "TRN-02"],
    trainingsRSVP: ["TRN-01", "TRN-02"]
  },
  {
    code: "AGN-051",
    name: "Ani Wijaya",
    email: "ani.wijaya@asm-academy.id",
    branch: "Cabang Bandung",
    rank: 1,
    level: "MC",
    production: 510000000,
    status: "Aktif",
    statusColor: "green",
    avatar: "AW",
    certifications: {
      level3: { status: "Lulus", date: "12 Jan 2025", score: 90, expiry: "12 Jan 2027" },
      level4_bonding: { status: "Lulus", date: "20 Feb 2025", score: 85, expiry: "20 Feb 2027" },
      level4_paydi: { status: "Belum Mengambil", date: null, score: null, expiry: "-" }
    },
    learning: { currentModule: "Asuransi Properti", progressPct: 90, completedChapters: 5, totalChapters: 6, quizScore: 89, lastActive: "Kemarin", status: "On Track" },
    trainingsAttended: ["TRN-01"],
    trainingsRSVP: ["TRN-01"]
  }
];

const BRANCH_TRAININGS_DEFAULT = [
  {
    id: "TRN-01",
    title: "Mastering Commercial Property Insurance & Risk Assessment",
    category: "Properti",
    trainer: "Coach Hendra Wijaya, AAIK",
    date: "02 Okt 2026",
    time: "09:00 - 11:30 WIB",
    mode: "Live Webinar Zoom",
    token: "PROP2026",
    status: "Selesai",
    rsvpAgents: ["AGN-001", "AGN-004", "AGN-008", "AGN-012", "AGN-021"],
    attendedAgents: ["AGN-001", "AGN-004", "AGN-008", "AGN-012"]
  },
  {
    id: "TRN-02",
    title: "Strategi Penetrasi Asuransi Kendaraan PSAKOB & All Risk",
    category: "Kendaraan Bermotor",
    trainer: "Coach Hendra Wijaya, AAIK",
    date: "04 Okt 2026",
    time: "13:30 - 15:30 WIB",
    mode: "Live Webinar Zoom",
    token: "AUTO44",
    status: "Selesai",
    rsvpAgents: ["AGN-001", "AGN-004", "AGN-012", "AGN-015"],
    attendedAgents: ["AGN-001", "AGN-004", "AGN-015"]
  },
  {
    id: "TRN-03",
    title: "Teknik Closing Surety Bond & Kontra Bank Garansi Proyek",
    category: "Suretyship & Bonding",
    trainer: "Ir. Gunawan Santoso (Guest Expert)",
    date: "06 Okt 2026",
    time: "10:00 - 12:00 WIB",
    mode: "Live Webinar Zoom",
    token: "SURETY99",
    status: "Selesai",
    rsvpAgents: ["AGN-001", "AGN-004", "AGN-008", "AGN-033"],
    attendedAgents: ["AGN-001", "AGN-008", "AGN-033"]
  },
  {
    id: "TRN-04",
    title: "Bedah Regulasi OJK & Etika Keagenan Perlindungan Konsumen",
    category: "Regulasi",
    trainer: "Siti Rahma, S.H.",
    date: "12 Okt 2026",
    time: "14:00 - 16:00 WIB",
    mode: "Live Webinar Zoom",
    token: "ETIKA77",
    status: "Mendatang",
    rsvpAgents: ["AGN-001", "AGN-033"],
    attendedAgents: []
  }
];

// Helper untuk inisialisasi data default ke LocalStorage
function initializeDatabase() {
  if (!localStorage.getItem("pa_underwriting_cases")) {
    localStorage.setItem("pa_underwriting_cases", JSON.stringify(UNDERWRITING_CASES_DEFAULT));
  }
  if (!localStorage.getItem("pa_word_duel_questions")) {
    localStorage.setItem("pa_word_duel_questions", JSON.stringify(WORD_DUEL_QUESTIONS_DEFAULT));
  }
  if (!localStorage.getItem("pa_materials")) {
    localStorage.setItem("pa_materials", JSON.stringify(STUDY_MATERIALS_DEFAULT));
  }
  if (!localStorage.getItem("pa_products")) {
    localStorage.setItem("pa_products", JSON.stringify(INSURANCE_PRODUCTS_DEFAULT));
  }
  if (!localStorage.getItem("pa_coaching")) {
    localStorage.setItem("pa_coaching", JSON.stringify(COACHING_MATERIALS_DEFAULT));
  }
  if (!localStorage.getItem("pa_lsp_prep")) {
    localStorage.setItem("pa_lsp_prep", JSON.stringify(LSP_PREP_DEFAULT));
  }
  if (!localStorage.getItem("pa_questions")) {
    localStorage.setItem("pa_questions", JSON.stringify(TRYOUT_QUESTIONS_BANK));
  }
  if (!localStorage.getItem("pa_syllabus")) {
    localStorage.setItem("pa_syllabus", JSON.stringify(TRAINING_SYLLABUS_DEFAULT));
  }
  const existingBranchAgents = JSON.parse(localStorage.getItem("pa_branch_agents")) || [];
  const needsBranchAgentMigration = existingBranchAgents.length === 0 || !existingBranchAgents[0].certifications || !("level4_bonding" in existingBranchAgents[0].certifications);
  if (needsBranchAgentMigration) {
    localStorage.setItem("pa_branch_agents", JSON.stringify(BRANCH_AGENTS_DEFAULT));
  }
  if (!localStorage.getItem("pa_branch_trainings")) {
    localStorage.setItem("pa_branch_trainings", JSON.stringify(BRANCH_TRAININGS_DEFAULT));
  }
  // Selalu sync katalog reward dengan data terbaru (agar item baru langsung muncul)
  const existingShopItems = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
  const existingIds = existingShopItems.map(i => i.id);
  const defaultIds = SHOP_ITEMS_DEFAULT.map(i => i.id);
  // Tambahkan item default yang belum ada di localStorage
  const hasNewItems = defaultIds.some(id => !existingIds.includes(id));
  if (hasNewItems || existingShopItems.length === 0) {
    // Merge: pertahankan item custom (dari trainer), tambah item default yang belum ada
    const customItems = existingShopItems.filter(i => !defaultIds.includes(i.id));
    localStorage.setItem("daftar_katalog_reward", JSON.stringify([...SHOP_ITEMS_DEFAULT, ...customItems]));
  }
  if (!localStorage.getItem("pa_leaderboard_national")) {
    localStorage.setItem("pa_leaderboard_national", JSON.stringify(LEADERBOARD_NATIONAL_DEFAULT));
  }
  if (!localStorage.getItem("pa_leaderboard_branch")) {
    localStorage.setItem("pa_leaderboard_branch", JSON.stringify(LEADERBOARD_BRANCH_DEFAULT));
  }
  
  // Inisialisasi data pengguna demo jika belum ada
  if (!localStorage.getItem("pa_users")) {
    const demoUsers = [
      { email: "rian.aditya@asm-academy.id", password: "PasswordAgen123", role: "Agen", name: "Rian Aditya", code: "AGN-001", avatar: "RA", branch: "Cabang Fatmawati" },
      { email: "hendra.wijaya@asm-academy.id", password: "PasswordTrainer123", role: "Trainer", name: "Hendra Wijaya", code: "TRN-099", avatar: "HW", branch: "Kantor Pusat" },
      { email: "siti.aminah@asm-academy.id", password: "PasswordAdmin123", role: "Admin", name: "Siti Aminah", code: "ADM-999", avatar: "SA", branch: "Kantor Pusat" },
      { email: "bambang.fatmawati@asm-academy.id", password: "PasswordPincab123", role: "Pimpinan Cabang", name: "Bambang Sudarsono", code: "PCB-007", avatar: "BS", branch: "Cabang Fatmawati" }
    ];
    localStorage.setItem("pa_users", JSON.stringify(demoUsers));
  }

  // State awal progres belajar agen jika belum ada
  if (!localStorage.getItem("pa_agent_progress")) {
    const initialProgress = {};
    // Progress awal agen Rian Aditya
    const rianKey = "progress_agen@insuremind.id";
    // Streak diinisialisasi 2 hari, login terakhir kemarin untuk melatih streak continuation
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    initialProgress[rianKey] = {
      completedChapters: ["dasar-asuransi"], // materi pertama dianggap selesai untuk contoh awal
      bestTryoutScore: null,
      selectedQualification: "Level 3",
      certifications: {
        "Level 3": { status: "Belum Ujian", expiryDays: null, date: null },
        "Level 4 - Bonding": { status: "Belum Ujian", expiryDays: null, date: null },
        "Level 4 - PAYDI": { status: "Belum Ujian", expiryDays: null, date: null }
      },
      quizScores: {}, // format: { chapterId: score }
      badges: ["Kader Pratama"],
      examHistory: [], // daftar simulasi ujian yang pernah diikuti
      proposalHistory: [], // daftar penawaran yang dibuat
      
      // Gamifikasi fields
      xp: 120,
      coins: 40,
      level: 1,
      streak: 2,
      lastActiveDate: yesterdayStr,
      rewardsOwned: [],
      missions: [
        { id: "mission-read", text: "Pelajari 1 Modul Asuransi", type: "read", target: 1, current: 0, rewardXp: 50, rewardCoins: 15, claimed: false },
        { id: "mission-calc", text: "Hitung Simulasi Premi", type: "calc", target: 1, current: 0, rewardXp: 30, rewardCoins: 10, claimed: false },
        { id: "mission-chat", text: "Tanya AI Insurance Coach", type: "chat", target: 1, current: 0, rewardXp: 20, rewardCoins: 5, claimed: false }
      ]
    };
    localStorage.setItem("pa_agent_progress", JSON.stringify(initialProgress));
  }
}

// Jalankan inisialisasi database
initializeDatabase();
