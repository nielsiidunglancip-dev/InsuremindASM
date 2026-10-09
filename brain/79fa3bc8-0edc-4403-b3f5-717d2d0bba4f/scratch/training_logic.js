// ==================== TRAINING EVENT MANAGEMENT ====================
function initTrainingState() {
  if (!localStorage.getItem("pa_trainings")) localStorage.setItem("pa_trainings", JSON.stringify([]));
  if (!localStorage.getItem("pa_training_attendance")) localStorage.setItem("pa_training_attendance", JSON.stringify({}));
  if (!localStorage.getItem("pa_training_quiz_attempts")) localStorage.setItem("pa_training_quiz_attempts", JSON.stringify({}));
}
initTrainingState();

function showCreateTrainingModal() {
  document.getElementById("trn-ev-title").value = "";
  document.getElementById("trn-ev-time").value = "";
  document.getElementById("trn-ev-method").value = "Tatap Muka";
  document.getElementById("trn-ev-link").value = "";
  document.getElementById("trn-ev-pdf").value = "";
  document.getElementById("trn-ev-quota").value = "";
  document.getElementById("trn-ev-token").value = "7512";
  document.getElementById("modal-create-training").classList.add("active");
}

function hideCreateTrainingModal() {
  document.getElementById("modal-create-training").classList.remove("active");
}

function saveTrainingEvent() {
  const title = document.getElementById("trn-ev-title").value;
  const time = document.getElementById("trn-ev-time").value;
  const method = document.getElementById("trn-ev-method").value;
  const link = document.getElementById("trn-ev-link").value;
  const pdf = document.getElementById("trn-ev-pdf").value;
  const quota = document.getElementById("trn-ev-quota").value;
  const token = document.getElementById("trn-ev-token").value;

  if (!title || !time || !quota || !token) {
    alert("Harap lengkapi field mandatory (Judul, Waktu, Kuota, Token).");
    return;
  }

  let trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const newEv = {
    id: "TRN-" + Date.now(),
    title, time, method, link, pdf, quota: parseInt(quota), token,
    endTime: null,
    quiz: [],
    certTemplate: { title: "Certificate of Completion", trainer: "Trainer", company: "ASM Academy" }
  };
  trainings.push(newEv);
  localStorage.setItem("pa_trainings", JSON.stringify(trainings));
  hideCreateTrainingModal();
  renderTrainerTrainings();
  alert("Jadwal training berhasil dibuat!");
}

function renderTrainerTrainings() {
  const tbody = document.getElementById("trainer-training-rows");
  if (!tbody) return;
  const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
  tbody.innerHTML = "";
  trainings.forEach(t => {
    const tr = document.createElement("tr");
    const isFinished = t.endTime !== null;
    tr.innerHTML = `
      <td><strong>${t.title}</strong><br><small>Token: ${t.token}</small></td>
      <td>${new Date(t.time).toLocaleString()}</td>
      <td>${t.method}</td>
      <td>
        ${isFinished ? \`<span style="color:red; font-weight:bold;">Selesai</span>\` : 
          \`<button class="btn-secondary" onclick="setTrainingFinished('\${t.id}')" style="padding:4px 8px; font-size:11px;">Set Selesai</button>\`}
        <button class="btn-primary" onclick="openManageQuiz('\${t.id}')" style="padding:4px 8px; font-size:11px; margin-top:4px;">Kelola Kuis (\${t.quiz.length})</button>
        <button class="btn-secondary" onclick="openCertBuilder('\${t.id}')" style="padding:4px 8px; font-size:11px; margin-top:4px;">Templat Sertifikat</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function setTrainingFinished(id) {
  if (!confirm("Selesaikan training ini? Hitung mundur 1 jam masa sanggah akan dimulai.")) return;
  let trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const idx = trainings.findIndex(t => t.id === id);
  if (idx > -1) {
    trainings[idx].endTime = Date.now();
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    renderTrainerTrainings();
    renderAgenTrainings();
  }
}

// QUIZ BUILDER
let currentEditingQuizId = null;
function openManageQuiz(id) {
  currentEditingQuizId = id;
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === id);
  const container = document.getElementById("quiz-questions-container");
  container.innerHTML = "";
  if (ev.quiz && ev.quiz.length > 0) {
    ev.quiz.forEach(q => addQuizQuestionRow(q));
  } else {
    addQuizQuestionRow();
  }
  document.getElementById("modal-manage-quiz").classList.add("active");
}

function hideManageQuizModal() {
  document.getElementById("modal-manage-quiz").classList.remove("active");
}

function addQuizQuestionRow(data = null) {
  const container = document.getElementById("quiz-questions-container");
  const div = document.createElement("div");
  div.className = "quiz-builder-row";
  div.style.border = "1px solid #e2e8f0";
  div.style.padding = "12px";
  div.style.marginBottom = "12px";
  div.style.borderRadius = "8px";
  div.innerHTML = \`
    <input type="text" class="qb-q" placeholder="Pertanyaan" value="\${data ? data.q : ''}" style="width:100%; margin-bottom:8px;" required>
    <div style="display:flex; gap:8px; margin-bottom:8px;">
      <input type="text" class="qb-a" placeholder="Opsi A" value="\${data ? data.a : ''}" style="flex:1;" required>
      <input type="text" class="qb-b" placeholder="Opsi B" value="\${data ? data.b : ''}" style="flex:1;" required>
    </div>
    <div style="display:flex; gap:8px; margin-bottom:8px;">
      <input type="text" class="qb-c" placeholder="Opsi C" value="\${data ? data.c : ''}" style="flex:1;" required>
      <input type="text" class="qb-d" placeholder="Opsi D" value="\${data ? data.d : ''}" style="flex:1;" required>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <select class="qb-ans" style="width:auto;">
        <option value="a" \${data && data.correct === 'a' ? 'selected' : ''}>Kunci Jawaban: A</option>
        <option value="b" \${data && data.correct === 'b' ? 'selected' : ''}>Kunci Jawaban: B</option>
        <option value="c" \${data && data.correct === 'c' ? 'selected' : ''}>Kunci Jawaban: C</option>
        <option value="d" \${data && data.correct === 'd' ? 'selected' : ''}>Kunci Jawaban: D</option>
      </select>
      <button class="btn-secondary" onclick="this.parentElement.parentElement.remove()" style="padding:4px 8px; color:red;">Hapus Soal</button>
    </div>
  \`;
  container.appendChild(div);
}

function saveQuizQuestions() {
  const rows = document.querySelectorAll(".quiz-builder-row");
  if (rows.length < 10) {
    alert("Kuis minimal harus memiliki 10 soal untuk bisa dipublish.");
    return;
  }
  let quiz = [];
  let valid = true;
  rows.forEach(r => {
    const q = r.querySelector(".qb-q").value;
    const a = r.querySelector(".qb-a").value;
    const b = r.querySelector(".qb-b").value;
    const c = r.querySelector(".qb-c").value;
    const d = r.querySelector(".qb-d").value;
    const ans = r.querySelector(".qb-ans").value;
    if (!q || !a || !b || !c || !d) valid = false;
    quiz.push({ q, a, b, c, d, correct: ans });
  });

  if (!valid) {
    alert("Pastikan semua form pertanyaan dan opsi jawaban telah diisi.");
    return;
  }

  let trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const idx = trainings.findIndex(t => t.id === currentEditingQuizId);
  if (idx > -1) {
    trainings[idx].quiz = quiz;
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    alert("Kuis berhasil dipublish!");
    hideManageQuizModal();
    renderTrainerTrainings();
  }
}

// CERTIFICATE BUILDER
let currentEditingCertId = null;
function openCertBuilder(id) {
  currentEditingCertId = id;
  const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const ev = trainings.find(t => t.id === id);
  document.getElementById("cert-bld-title").value = ev.certTemplate.title || "";
  document.getElementById("cert-bld-trainer").value = ev.certTemplate.trainer || "";
  document.getElementById("cert-bld-company").value = ev.certTemplate.company || "";
  document.getElementById("modal-cert-builder").classList.add("active");
}

function hideCertBuilderModal() {
  document.getElementById("modal-cert-builder").classList.remove("active");
}

function saveCertBuilder() {
  const title = document.getElementById("cert-bld-title").value;
  const trainer = document.getElementById("cert-bld-trainer").value;
  const company = document.getElementById("cert-bld-company").value;
  let trainings = JSON.parse(localStorage.getItem("pa_trainings"));
  const idx = trainings.findIndex(t => t.id === currentEditingCertId);
  if (idx > -1) {
    trainings[idx].certTemplate = { title, trainer, company };
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    alert("Template sertifikat disimpan!");
    hideCertBuilderModal();
  }
}

// ==================== AGENT TRAINING LOGIC ====================
function renderAgenTrainings() {
  const grid = document.getElementById("agen-training-grid");
  if (!grid) return;
  const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
  const att = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
  const attempts = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
  
  const email = currentUser.email;
  const myAtt = att[email] || {};
  const myAttm = attempts[email] || {};

  grid.innerHTML = "";
  trainings.forEach(t => {
    const isAttended = !!myAtt[t.id];
    const attemptData = myAttm[t.id] || { attempts: 0, passed: false };
    
    let tokenDisabled = false;
    let tokenMsg = "";
    if (t.endTime) {
      const msDiff = Date.now() - t.endTime;
      const hoursDiff = msDiff / (1000 * 60 * 60);
      if (hoursDiff > 1) {
        tokenDisabled = true;
        tokenMsg = "<small style='color:red;'>Masa absensi susulan telah habis.</small>";
      }
    }

    let actionBtnHTML = "";
    if (isAttended) {
      actionBtnHTML = \`<button class="btn-primary" style="width:100%; margin-bottom:8px; background:#10b981;" onclick="window.open('\${t.pdf}', '_blank')">Unduh Materi PDF</button>\`;
      
      if (attemptData.passed) {
        actionBtnHTML += \`<button class="btn-primary" style="width:100%; background:#f59e0b;" onclick="generateTrainingCert('\${t.id}')">Cetak Sertifikat</button>\`;
      } else if (attemptData.attempts >= 2) {
        actionBtnHTML += \`<button class="btn-secondary" style="width:100%; color:red;" disabled>Gagal. Wajib daftar ulang.</button>\`;
      } else {
        const btnTxt = attemptData.attempts === 1 ? "Ulangi Kuis (Kesempatan Terakhir)" : "Ikuti Kuis Singkat";
        actionBtnHTML += \`<button class="btn-primary" style="width:100%;" onclick="openTrainingQuiz('\${t.id}')">\${btnTxt}</button>\`;
      }
    } else {
      if (!tokenDisabled) {
        actionBtnHTML = \`
          <button class="btn-primary" style="width:100%; margin-bottom:8px;" onclick="rsvpTraining('\${t.id}')">Konfirmasi Hadir (RSVP)</button>
          <button class="btn-secondary" style="width:100%;" onclick="openTokenModal('\${t.id}')">Absen via Token</button>
        \`;
      } else {
        actionBtnHTML = tokenMsg;
      }
    }

    const card = document.createElement("div");
    card.className = "content-card";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.innerHTML = \`
      <div style="flex:1;">
        <h3>\${t.title}</h3>
        <p style="font-size:13px; color:var(--text-muted);"><i class="icon">📅</i> \${new Date(t.time).toLocaleString()}</p>
        <p style="font-size:13px; color:var(--text-muted);"><i class="icon">🎥</i> \${t.method}</p>
        <p style="font-size:13px; color:var(--text-muted);">Kuota: \${t.quota}</p>
      </div>
      <div style="margin-top:16px; border-top:1px solid #e2e8f0; padding-top:16px;">
        \${actionBtnHTML}
      </div>
    \`;
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
  
  document.getElementById("agen-quiz-attempts-left").innerText = \`Sisa Kesempatan: \${2 - myAtt.attempts}x\`;
  
  const container = document.getElementById("agen-quiz-questions-container");
  container.innerHTML = "";
  
  ev.quiz.forEach((q, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "20px";
    div.innerHTML = \`
      <p style="font-weight:600; margin-bottom:8px;">\${i+1}. \${q.q}</p>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_\${i}" value="a"> A. \${q.a}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_\${i}" value="b"> B. \${q.b}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_\${i}" value="c"> C. \${q.c}</label>
      <label style="display:block; margin-bottom:4px; cursor:pointer;"><input type="radio" name="q_\${i}" value="d"> D. \${q.d}</label>
    \`;
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
    const selected = document.querySelector(\`input[name="q_\${i}"]:checked\`);
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
    alert(\`Selamat! Skor Anda \${score}%. Anda LULUS dan Sertifikat telah di-generate.\`);
    hideTrainingQuizModal();
    renderAgenTrainings();
  } else {
    localStorage.setItem("pa_training_quiz_attempts", JSON.stringify(attemptsData));
    if (rec.attempts >= 2) {
      alert(\`Skor Anda \${score}%. Anda tidak mencapai batas kelulusan 70% dalam 2x percobaan. Anda diwajibkan mendaftar dan mengikuti ulang kelas training dengan materi sejenis pada jadwal berikutnya.\`);
      hideTrainingQuizModal();
      renderAgenTrainings();
    } else {
      alert(\`Skor Anda \${score}%. Kelulusan minimal adalah 70%. Anda memiliki 1x kesempatan terakhir untuk mengulang.\`);
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
  certBody.innerHTML = \`
    <div style="border: 10px solid #f59e0b; padding: 40px; text-align: center; font-family: Georgia, serif; position: relative; min-height: 400px; background: #fff;">
      <h1 style="font-size: 36px; color: #1e293b; margin-bottom: 10px; text-transform: uppercase;">\${templ.title}</h1>
      <p style="font-size: 18px; color: #64748b;">Diberikan dengan bangga kepada:</p>
      <h2 style="font-size: 48px; color: #0f172a; margin: 20px 0; font-family: 'Times New Roman', Times, serif; border-bottom: 2px solid #e2e8f0; display: inline-block; padding-bottom: 10px;">\${currentUser.name}</h2>
      <p style="font-size: 18px; color: #64748b; margin-bottom: 30px;">Atas partisipasi dan kelulusannya pada training eksklusif:</p>
      <h3 style="font-size: 24px; color: #3b82f6; margin-bottom: 40px;">\${ev.title}</h3>
      <div style="display: flex; justify-content: space-between; margin-top: 50px; padding: 0 40px;">
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #64748b; margin-bottom: 5px;">Tanggal Terbit</p>
          <p style="font-weight: bold; border-top: 1px solid #cbd5e1; padding-top: 10px;">\${new Date().toLocaleDateString('id-ID')}</p>
        </div>
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #64748b; margin-bottom: 5px;">Disahkan Oleh</p>
          <div style="height: 45px; font-family: 'Brush Script MT', cursive; font-size: 28px; color: #0f172a;">\${templ.trainer}</div>
          <p style="font-weight: bold; border-top: 1px solid #cbd5e1; padding-top: 10px;">\${templ.company}</p>
        </div>
      </div>
    </div>
  \`;
  document.getElementById("cert-print-modal").classList.add("active");
}
