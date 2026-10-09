import sys

with open("d:\\AI\\Antigravity\\app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

out = []
for line in lines:
    if line.strip() == "// 2. TOMBOL TOKEN":
        break
    out.append(line)

new_tail = """    // 2. TOMBOL TOKEN
    if (isHadir) {
      btnToken = `<button class="btn-primary" style="width:100%; margin-bottom:8px; background:#10b981; border:none; cursor:default;" disabled>✅ Hadir Terkonfirmasi</button>`;
    } else if (isExpired) {
      btnToken = `<button class="btn-secondary" style="width:100%; margin-bottom:8px; opacity:0.5; cursor:not-allowed;" disabled>Konfirmasi Kehadiran (Waktu Habis)</button>${expireMsg}`;
    } else if (!isFinished) {
      // Training belum selesai
      btnToken = `<button class="btn-secondary" style="width:100%; margin-bottom:8px; opacity:0.5; cursor:not-allowed;" disabled>Konfirmasi Kehadiran (Menunggu Selesai)</button>`;
    } else {
      // isFinished == true, belum hadir
      if (isRSVP) {
        btnToken = `<button class="btn-primary" style="width:100%; margin-bottom:8px;" onclick="openTokenModal('${t.id}')">Konfirmasi Kehadiran (Masukkan Token)</button>`;
      } else {
        // Jika belum RSVP, tetap dikunci
        btnToken = `<button class="btn-secondary" style="width:100%; margin-bottom:8px; opacity:0.5; cursor:not-allowed;" disabled>Konfirmasi Kehadiran (Masukkan Token)</button>`;
      }
    }

    // 3. TOMBOL MATERI
    if (isHadir) {
      btnMateri = `<button class="btn-primary" style="width:100%; margin-bottom:8px; background:#3b82f6; border:none;" onclick="window.open('${t.pdf}', '_blank')">Unduh Materi PDF</button>`;
    } else {
      btnMateri = `<button class="btn-secondary" style="width:100%; margin-bottom:8px; opacity:0.5; cursor:not-allowed;" disabled>Unduh Materi PDF</button>`;
    }

    // 4. TOMBOL KUIS
    if (isHadir) {
      if (attemptData.passed) {
        btnKuis = `<button class="btn-primary" style="width:100%; background:#10b981; border:none; cursor:default;" disabled>✅ Kuis Lulus (${attemptData.bestScore}%)</button>`;
        btnCert = `<button class="btn-primary" style="width:100%; background:#f59e0b; border:none; margin-top:8px;" onclick="generateTrainingCert('${t.id}')">🏆 Download Sertifikat Resmi</button>`;
      } else if (attemptData.attempts >= 2) {
        btnKuis = `<button class="btn-secondary" style="width:100%; opacity:0.5; cursor:not-allowed;" disabled>Ikuti Kuis Singkat</button>
                   <small style='color:red; display:block; text-align:center; font-weight:bold; margin-top:8px;'>Anda gagal dalam 2x percobaan. Sila mendaftar ulang pada sesi training berikutnya.</small>`;
      } else if (attemptData.attempts === 1) {
        btnKuis = `<button class="btn-primary" style="width:100%;" onclick="openTrainingQuiz('${t.id}')">Ulangi Kuis (Kesempatan Terakhir)</button>`;
      } else {
        btnKuis = `<button class="btn-primary" style="width:100%;" onclick="openTrainingQuiz('${t.id}')">Ikuti Kuis Singkat</button>`;
      }
    } else {
      btnKuis = `<button class="btn-secondary" style="width:100%; opacity:0.5; cursor:not-allowed;" disabled>Ikuti Kuis Singkat</button>`;
    }

    let actionBtnHTML = btnRsvp + btnToken + btnMateri + btnKuis + btnCert;

    const card = document.createElement("div");
    card.className = "content-card";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.innerHTML = `
      <div style="flex:1;">
        <h3>${t.title}</h3>
        <p style="font-size:13px; color:var(--text-muted);"><i class="icon">📅</i> ${new Date(t.time).toLocaleString()}</p>
        <p style="font-size:13px; color:var(--text-muted);"><i class="icon">🎥</i> ${t.method}</p>
        <p style="font-size:13px; color:var(--text-muted);">Kuota: ${t.quota}</p>
      </div>
      <div style="margin-top:16px; border-top:1px solid #e2e8f0; padding-top:16px;">
        ${actionBtnHTML}
      </div>
    `;
    grid.appendChild(card);
  });
}

function rsvpTraining(id) {
  const email = currentUser.email;
  let att = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
  if (!att[email]) att[email] = {};
  att[email][id] = { status: "RSVP", attendedAt: Date.now() };
  localStorage.setItem("pa_training_attendance", JSON.stringify(att));
  alert("RSVP Berhasil! Materi pelatihan sekarang terbuka.");
  renderAgenTrainings();
}

let currentTokenEvId = null;
function openTokenModal(id) {
  currentTokenEvId = id;
  document.getElementById("agen-input-token").value = "";
  document.getElementById("modal-training-token").classList.add("active");
}
function hideTrainingTokenModal() { document.getElementById("modal-training-token").classList.remove("active"); }

function submitTrainingToken() {
  const token = document.getElementById("agen-input-token").value;
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === currentTokenEvId);
  if (ev.token === token) {
    const email = currentUser.email;
    let att = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
    if (!att[email]) att[email] = {};
    att[email][currentTokenEvId] = { status: "Hadir", attendedAt: Date.now() };
    localStorage.setItem("pa_training_attendance", JSON.stringify(att));
    alert("Absensi berhasil! Materi pelatihan terbuka.");
    hideTrainingTokenModal();
    renderAgenTrainings();
  } else {
    alert("Token tidak valid!");
  }
}

// QUIZ PLAYER
let currentQuizEvId = null;
function openTrainingQuiz(id) {
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === id);
  if (!ev.quiz || ev.quiz.length < 10) {
    alert("Kuis belum dipublish oleh Trainer.");
    return;
  }
  currentQuizEvId = id;
  const attemptsData = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
  const myAtt = attemptsData[currentUser.email] && attemptsData[currentUser.email][id] ? attemptsData[currentUser.email][id] : { attempts: 0 };
  
  document.getElementById("agen-quiz-attempts-left").innerText = `Sisa Kesempatan: ${2 - myAtt.attempts}x`;
  
  const container = document.getElementById("agen-quiz-questions-container");
  container.innerHTML = "";
  
  ev.quiz.forEach((q, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "20px";
    div.innerHTML = `
      <p style="font-weight:600; margin-bottom:8px;">${i+1}. ${q.q}</p>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_${i}" value="a"> A. ${q.a}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_${i}" value="b"> B. ${q.b}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_${i}" value="c"> C. ${q.c}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_${i}" value="d"> D. ${q.d}</label>
    `;
    container.appendChild(div);
  });

  document.getElementById("modal-training-quiz").classList.add("active");
}
function hideTrainingQuizModal() { document.getElementById("modal-training-quiz").classList.remove("active"); }

function submitTrainingQuiz() {
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === currentQuizEvId);
  const quiz = ev.quiz;
  
  let correctCount = 0;
  quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q_${i}"]:checked`);
    if (selected && selected.value === q.correct) correctCount++;
  });
  
  const score = Math.round((correctCount / quiz.length) * 100);
  const email = currentUser.email;
  let attemptsData = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
  if (!attemptsData[email]) attemptsData[email] = {};
  if (!attemptsData[email][currentQuizEvId]) attemptsData[email][currentQuizEvId] = { attempts: 0, passed: false };
  
  let rec = attemptsData[email][currentQuizEvId];
  rec.attempts++;
  
  if (score >= 70) {
    rec.passed = true;
    rec.bestScore = score;
    localStorage.setItem("pa_training_quiz_attempts", JSON.stringify(attemptsData));
    alert(`Selamat! Skor Anda ${score}%. Anda LULUS dan Sertifikat telah di-generate.`);
    hideTrainingQuizModal();
    renderAgenTrainings();
  } else {
    localStorage.setItem("pa_training_quiz_attempts", JSON.stringify(attemptsData));
    if (rec.attempts >= 2) {
      alert(`Skor Anda ${score}%. Anda tidak mencapai batas kelulusan 70% dalam 2x percobaan. Anda diwajibkan mendaftar dan mengikuti ulang kelas training dengan materi sejenis pada jadwal berikutnya.`);
      hideTrainingQuizModal();
      renderAgenTrainings();
    } else {
      alert(`Skor Anda ${score}%. Kelulusan minimal adalah 70%. Anda memiliki 1x kesempatan terakhir untuk mengulang.`);
      hideTrainingQuizModal();
      renderAgenTrainings();
    }
  }
}

// GENERATE CERTIFICATE
function generateTrainingCert(id) {
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === id);
  const templ = ev.certTemplate || { title: "Certificate of Completion", trainer: "Trainer", company: "ASM Academy" };
  
  const certBody = document.getElementById("cert-paper-body");
  certBody.innerHTML = `
    <div style="border: 10px solid #f59e0b; padding: 40px; text-align: center; font-family: Georgia, serif; position: relative; min-height: 400px; background: #fff;">
      <h1 style="font-size: 36px; color: #1e293b; margin-bottom: 10px; text-transform: uppercase;">${templ.title}</h1>
      <p style="font-size: 18px; color: #64748b;">Diberikan dengan bangga kepada:</p>
      <h2 style="font-size: 48px; color: #0f172a; margin: 20px 0; font-family: 'Times New Roman', Times, serif; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 10px;">${currentUser.name}</h2>
      <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">Atas partisipasi dan kelulusannya pada training eksklusif:</p>
      <h3 style="font-size: 24px; color: #3b82f6; margin-bottom: 40px;">${ev.title}</h3>
      <div style="display: flex; justify-content: space-between; margin-top: 50px; padding: 0 40px;">
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #64748b; margin-bottom: 5px;">Tanggal Terbit</p>
          <p style="font-weight: bold; border-top: 1px solid #cbd5e1; padding-top: 10px;">${new Date().toLocaleDateString('id-ID')}</p>
        </div>
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #64748b; margin-bottom: 5px;">Disahkan Oleh</p>
          <div style="height: 45px; font-family: 'Brush Script MT', cursive; font-size: 28px; color: #0f172a;">${templ.trainer}</div>
          <p style="font-weight: bold; border-top: 1px solid #cbd5e1; padding-top: 10px;">${templ.company}</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById("cert-print-modal").classList.add("active");
}

// 3. TRIGGER EKSEKUSI UTAMA SAAT HALAMAN SELESAI DIMUAT
window.addEventListener('DOMContentLoaded', () => {
    renderHub();
    renderProductionChart();
});

// ==================== [TAHAP 3: SIMULASI TRANSAKSI BACKEND API] ====================
function simulatePushApiTransaction() {
  const premiumInput = document.getElementById("sim-api-premium");
  const loadingEl = document.getElementById("sim-api-loading");
  
  if (!premiumInput) return;
  const premiumVal = parseInt(premiumInput.value) || 0;
  
  if (premiumVal <= 0) {
    alert("Masukkan nominal premi yang valid untuk simulasi.");
    return;
  }
  
  // Tampilkan loading spinner
  if (loadingEl) loadingEl.style.display = "flex";
  
  // Simulasi proses API selama 1.5 - 2 detik
  setTimeout(() => {
    // Sembunyikan loading
    if (loadingEl) loadingEl.style.display = "none";
    
    // Asumsi komisi 15% dari premi
    const komisiVal = premiumVal * 0.15;
    
    // 1. Update Objek productionData (Chart Global)
    productionData.totalGPW += premiumVal;
    productionData.totalKomisi += komisiVal;
    
    // Update data bulan ini (Juni -> index 5)
    // Asumsi data.gpw dan data.komisi dalam satuan juta (1.0 = 1 Juta)
    const addedGpwJuta = premiumVal / 1000000;
    const addedKomisiJuta = komisiVal / 1000000;
    
    productionData.monthly[5].gpw += addedGpwJuta;
    productionData.monthly[5].komisi += addedKomisiJuta;
    
    // 2. Update Objek contestData & Animasi Radial
    // Asumsikan target = 1000 Juta. Tambahan 1 Juta = 0.1%
    const addedPct = (addedGpwJuta / 1000) * 100;
    contestData.persentaseGlobal = Math.min(contestData.persentaseGlobal + addedPct, 100);
    
    const pctInt = Math.round(contestData.persentaseGlobal);
    const contestPctText = document.getElementById("contest-pct-text");
    if (contestPctText) contestPctText.innerText = `${pctInt}%`;
    
    const pathEl = document.getElementById("contest-progress-path");
    if (pathEl) {
      const offset = 314 - (314 * contestData.persentaseGlobal / 100);
      pathEl.style.strokeDashoffset = offset;
      if (contestData.persentaseGlobal >= 100) {
        pathEl.style.stroke = "var(--success-green)";
      }
    }
    
    // 3. Update Tabel Detail Pencapaian Kontes (DOM Langsung)
    // Data dummy awal: Tercapai GPW 550 Juta, Kurang GPW 450 Juta
    const tercapaiGpwEl = document.getElementById("tbl-tercapai-gpw");
    const kurangGpwEl = document.getElementById("tbl-kurang-gpw");
    
    if (tercapaiGpwEl && kurangGpwEl) {
      // Ekstrak angka "550 Juta" -> 550
      let currentTercapai = parseFloat(tercapaiGpwEl.innerText.replace(" Juta", "").replace(",", "."));
      let currentKurang = parseFloat(kurangGpwEl.innerText.replace(" Juta", "").replace(",", "."));
      
      currentTercapai += addedGpwJuta;
      currentKurang = Math.max(0, currentKurang - addedGpwJuta);
      
      // Update format ke dalam tabel (1 angka desimal jika ada koma)
      tercapaiGpwEl.innerText = `${currentTercapai % 1 === 0 ? currentTercapai : currentTercapai.toFixed(1)} Juta`;
      kurangGpwEl.innerText = `${currentKurang % 1 === 0 ? currentKurang : currentKurang.toFixed(1)} Juta`;
      
      // Update juga NGPW (Asumsi NGPW naik 80% dari GPW)
      const tercapaiNgpwEl = document.getElementById("tbl-tercapai-ngpw");
      const kurangNgpwEl = document.getElementById("tbl-kurang-ngpw");
      if (tercapaiNgpwEl && kurangNgpwEl) {
        let curNgpw = parseFloat(tercapaiNgpwEl.innerText.replace(" Juta", ""));
        let curKurangNgpw = parseFloat(kurangNgpwEl.innerText.replace(" Juta", ""));
        curNgpw += addedGpwJuta * 0.8;
        curKurangNgpw = Math.max(0, curKurangNgpw - (addedGpwJuta * 0.8));
        tercapaiNgpwEl.innerText = `${curNgpw % 1 === 0 ? curNgpw : curNgpw.toFixed(1)} Juta`;
        kurangNgpwEl.innerText = `${curKurangNgpw % 1 === 0 ? curKurangNgpw : curKurangNgpw.toFixed(1)} Juta`;
      }
    }
    
    // 4. Update Teks Total di Dashboard
    const totalGpwEl = document.getElementById("chart-total-gpw");
    if (totalGpwEl) totalGpwEl.innerText = `Rp ${productionData.totalGPW.toLocaleString("id-ID")}`;
    
    const totalKomisiEl = document.getElementById("chart-total-komisi");
    if (totalKomisiEl) totalKomisiEl.innerText = `Rp ${productionData.totalKomisi.toLocaleString("id-ID")}`;
    
    // Render ulang batang chart CSS agar batang naik
    renderProductionChart();
    
    // Notifikasi Sukses
    alert("Polis Berhasil Diterbitkan!\\n\\nData Produksi & Kontes Anda Telah Diperbarui via API Server Pusat secara Real-Time.");
    
  }, 1800);
}
"""

out.append(new_tail)

with open("d:\\AI\\Antigravity\\app.js", "w", encoding="utf-8") as f:
    f.writelines(out)

print("FIX SUCCESSFUL")
