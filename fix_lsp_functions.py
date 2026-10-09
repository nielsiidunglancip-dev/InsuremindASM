import re

with open('app.js', encoding='utf-8') as f:
    content = f.read()

# Define the start and end of the block to replace
start_marker = "window.checkSertifikasiStatus = function() {"
end_marker = "window.updateLspRegistrationStatus ="

start_idx = content.find(start_marker)
# Find the end of the updateLspRegistrationStatus block
# We know it ends before "// Hook into existing navigation or initialization"
hook_idx = content.find("// Hook into existing navigation or initialization")
if start_idx == -1 or hook_idx == -1:
    print("Error: markers not found")
    exit(1)

NEW_BLOCK = """window.checkSertifikasiStatus = function() {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    if (!activeUser) return;

    const btnDaftar = document.getElementById('btn-daftar-uji-kompetensi');
    if (!btnDaftar) return;

    const allRegs = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
    const userRegs = allRegs.filter(r => r.code === activeUser.code);
    const latestReg = userRegs.length > 0 ? userRegs[userRegs.length - 1] : null;
    const feedbackBox = document.getElementById('lsp-feedback-msg');
    const statusPanel = document.getElementById('lsp-status-panel');

    // Cek sertifikasi aktif dari localStorage (diset saat Trainer klik "Lulus")
    const certData = JSON.parse(localStorage.getItem(`sertifikasi_${activeUser.code}`)) || null;
    const today = new Date();
    const isCertActive  = certData && new Date(certData.expiry) > today;
    const isCertExpired = certData && new Date(certData.expiry) <= today;

    const setBtn = (text, bg, color, border, disabled) => {
        btnDaftar.innerHTML = text;
        btnDaftar.style.cssText = `background:${bg}; color:${color}; border:${border}; cursor:${disabled ? 'not-allowed' : 'pointer'}; opacity:1; width:100%;`;
        btnDaftar.disabled = disabled;
        btnDaftar.onclick = disabled ? null : window.daftarUjiKompetensi;
    };

    const showPanel = (html) => { if (statusPanel) { statusPanel.style.display = 'block'; statusPanel.innerHTML = html; } };
    const hidePanel = () => { if (statusPanel) statusPanel.style.display = 'none'; };
    if (feedbackBox) feedbackBox.style.display = 'none';

    if (isCertActive) {
        setBtn('✅ Sertifikasi Anda Masih Aktif', '#d4edda', '#155724', '1px solid #c3e6cb', true);
        showPanel(`<div style="background:#d4edda; border:1px solid #c3e6cb; border-radius:10px; padding:14px; font-size:13px; margin-top:12px;">
            <div style="font-weight:700; color:#155724; margin-bottom:6px;">🏅 Sertifikasi Aktif</div>
            <div style="color:#155724;">Skema: <strong>${certData.schema || '-'}</strong></div>
            <div style="color:#155724;">Tanggal Lulus: <strong>${certData.lulusDate || '-'}</strong></div>
            <div style="color:#155724;">Berlaku s/d: <strong>${new Date(certData.expiry).toLocaleDateString('id-ID')}</strong></div>
        </div>`);
        return;
    }

    if (isCertExpired) {
        setBtn('🔄 Sertifikasi Kadaluarsa — Daftar Perpanjang', '#e65100', 'white', 'none', false);
        showPanel(`<div style="background:#fff3e0; border:1px solid #ffcc02; border-radius:10px; padding:14px; font-size:13px; color:#e65100; margin-top:12px;">
            ⚠️ Sertifikasi Anda telah kadaluarsa sejak ${new Date(certData.expiry).toLocaleDateString('id-ID')}. Silakan daftar kembali untuk perpanjangan.
        </div>`);
        return;
    }

    // NEW LOGIC: Allow re-registration for both Tidak Lulus AND Pending
    if (!latestReg || latestReg.status === 'Tidak Lulus' || latestReg.status === 'Pending') {
        if (latestReg && latestReg.status === 'Tidak Lulus') {
            setBtn('📝 Daftar Ujian Kembali', '#ef4444', 'white', 'none', false);
            showPanel(`<div style="background:#fee2e2; border:1px solid #fca5a5; border-radius:10px; padding:14px; font-size:13px; margin-top:12px; color:#991b1b;">
                <div style="font-weight:700; margin-bottom:6px;">❌ Hasil Ujian: Tidak Lulus</div>
                <div>Skema: <strong>${latestReg.schema}</strong></div>
                ${latestReg.feedback ? `<div style="margin-top:8px; padding:8px; background:rgba(0,0,0,0.06); border-radius:6px;">💬 <strong>Catatan Trainer:</strong><br>${latestReg.feedback}</div>` : ''}
                <div style="margin-top:10px; font-size:12px; color:#b91c1c;">Anda dapat mendaftar kembali untuk mengikuti ujian ulang.</div>
            </div>`);
        } else if (latestReg && latestReg.status === 'Pending') {
            setBtn('📝 Ajukan Ulang Pendaftaran', '#f59e0b', 'white', 'none', false);
            showPanel(`<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:14px; font-size:13px; margin-top:12px; color:#92400e;">
                <div style="font-weight:700; margin-bottom:6px;">⚠️ Pendaftaran Perlu Perbaikan</div>
                <div>Skema: <strong>${latestReg.schema}</strong></div>
                ${latestReg.feedback ? `<div style="margin-top:8px; padding:8px; background:rgba(0,0,0,0.06); border-radius:6px;">💬 <strong>Catatan Trainer:</strong><br>${latestReg.feedback}</div>` : ''}
                <div style="margin-top:10px; font-size:12px; color:#92400e;">Silakan lengkapi syarat sesuai catatan di atas, lalu ajukan ulang pendaftaran.</div>
            </div>`);
        } else {
            setBtn('📝 Daftar Ikut Uji Kompetensi', 'var(--accent-orange)', 'white', 'none', false);
            hidePanel();
        }
        
        // Remove the old failed/pending registration on new submit
        btnDaftar.onclick = function() {
            const allR = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
            const filtered = allR.filter(r => !(r.code === activeUser.code && (r.status === 'Tidak Lulus' || r.status === 'Pending')));
            localStorage.setItem('lsp_registrations', JSON.stringify(filtered));
            window.daftarUjiKompetensi();
        };
        return;
    }

    // Ada pendaftaran aktif — tampilkan status
    const status = latestReg.status || 'Menunggu Review';
    const cfgMap = {
        'Menunggu Review': { btn: '⏳ Menunggu Review oleh Trainer', bg: '#e2e8f0', color: '#475569', border: '1px solid #cbd5e1', panelBg: '#f8fafc', panelBorder: '#e2e8f0', panelColor: '#475569' },
        'Diproses':        { btn: '🔄 Pendaftaran Sedang Diproses',  bg: '#dbeafe', color: '#1d4ed8', border: '1px solid #93c5fd', panelBg: '#eff6ff', panelBorder: '#bfdbfe', panelColor: '#1d4ed8' },
        'Dijadwalkan':     { btn: '📅 Ujian Sudah Dijadwalkan',       bg: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7', panelBg: '#ecfdf5', panelBorder: '#a7f3d0', panelColor: '#065f46' },
        'Lulus':           { btn: '🏅 Selamat! Anda Lulus Ujian',    bg: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', panelBg: '#d4edda', panelBorder: '#c3e6cb', panelColor: '#155724' },
    };
    const cfg = cfgMap[status] || cfgMap['Menunggu Review'];
    setBtn(cfg.btn, cfg.bg, cfg.color, cfg.border, true);

    const scheduleHtml = latestReg.scheduleDate ? `<div style="margin-bottom:4px;">🗓️ Jadwal Ujian: <strong>${latestReg.scheduleDate}</strong></div>` : '';
    const feedbackHtml = latestReg.feedback ? `<div style="margin-top:8px; padding:8px; background:rgba(0,0,0,0.05); border-radius:6px;">💬 <strong>Catatan Trainer:</strong><br>${latestReg.feedback}</div>` : '';
    showPanel(`<div style="background:${cfg.panelBg}; border:1px solid ${cfg.panelBorder}; border-radius:10px; padding:14px; font-size:13px; margin-top:12px; color:${cfg.panelColor};">
        <div style="font-weight:700; margin-bottom:8px;">Status: ${status}</div>
        <div style="margin-bottom:4px;">📋 Skema: <strong>${latestReg.schema}</strong></div>
        <div style="margin-bottom:4px;">📅 Tanggal Daftar: <strong>${latestReg.date}</strong></div>
        ${scheduleHtml}${feedbackHtml}
    </div>`);
};

// ============ TRAINER: LSP REGISTRATION MANAGEMENT ============

window.renderLspRegistrations = function() {
    const tbody = document.getElementById('lsp-registrations-tbody');
    if (!tbody) return;

    const regs = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
    if (regs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada data pendaftar.</td></tr>';
        return;
    }

    const badgeCss = {
        'Menunggu Review': 'background:#e2e8f0; color:#475569;',
        'Diproses':        'background:#dbeafe; color:#1d4ed8;',
        'Pending':         'background:#fef3c7; color:#92400e;',
        'Dijadwalkan':     'background:#d1fae5; color:#065f46;',
        'Lulus':           'background:#d4edda; color:#155724;',
        'Tidak Lulus':     'background:#fee2e2; color:#991b1b;',
    };
    const badge = s => `<span style="padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; ${badgeCss[s] || badgeCss['Menunggu Review']}">${s || 'Menunggu Review'}</span>`;
    
    // Pending now acts as a final state from trainer's perspective until user re-registers
    const isFinal = s => s === 'Lulus' || s === 'Tidak Lulus' || s === 'Pending';

    tbody.innerHTML = regs.map((reg, i) => `
        <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 8px; font-size:12px; color:#94a3b8;">${reg.code}</td>
            <td style="padding:10px 8px; font-size:13px; font-weight:600;">${reg.name}</td>
            <td style="padding:10px 8px;"><span style="background:#eff6ff; color:#1d4ed8; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:600;">${reg.schema}</span></td>
            <td style="padding:10px 8px; font-size:12px; color:#64748b;">${reg.date}</td>
            <td style="padding:10px 8px;">${badge(reg.status)}</td>
            <td style="padding:10px 8px; font-size:12px; color:#64748b; max-width:140px; word-break:break-word;">${reg.scheduleDate ? `<div style="color:#065f46; font-weight:600;">📅 ${reg.scheduleDate}</div>` : ''}${reg.feedback || '<span style="color:#cbd5e1;">—</span>'}</td>
            <td style="padding:10px 8px;">
                ${isFinal(reg.status)
                    ? `<span style="font-size:11px; color:#94a3b8; font-style:italic;">Final</span>`
                    : `<div style="display:flex; gap:4px; flex-wrap:wrap;">
                        <button onclick="openLspStatusModal(${i},'Diproses')"    style="padding:3px 8px; font-size:10px; border-radius:5px; background:#3b82f6; border:none; color:white; cursor:pointer; font-weight:600;">Proses</button>
                        <button onclick="openLspStatusModal(${i},'Pending')"     style="padding:3px 8px; font-size:10px; border-radius:5px; background:#f59e0b; border:none; color:white; cursor:pointer; font-weight:600;">Pending</button>
                        <button onclick="openLspStatusModal(${i},'Dijadwalkan')" style="padding:3px 8px; font-size:10px; border-radius:5px; background:#10b981; border:none; color:white; cursor:pointer; font-weight:600;">Jadwalkan</button>
                        <button onclick="openLspStatusModal(${i},'Lulus')"       style="padding:3px 8px; font-size:10px; border-radius:5px; background:#16a34a; border:none; color:white; cursor:pointer; font-weight:600;">Lulus ✓</button>
                        <button onclick="openLspStatusModal(${i},'Tidak Lulus')" style="padding:3px 8px; font-size:10px; border-radius:5px; background:#ef4444; border:none; color:white; cursor:pointer; font-weight:600;">Tdk Lulus</button>
                       </div>`}
            </td>
        </tr>`).join('');
};

window.openLspStatusModal = function(index, newStatus) {
    const modal = document.getElementById('modal-lsp-status-update');
    if (!modal) return;
    document.getElementById('lsp-modal-status-label').innerText = newStatus;
    document.getElementById('lsp-modal-feedback').value = '';
    document.getElementById('lsp-modal-schedule-row').style.display = (newStatus === 'Dijadwalkan') ? 'block' : 'none';
    document.getElementById('lsp-modal-schedule').value = '';
    const headerColors = { 'Diproses':'#3b82f6','Pending':'#f59e0b','Dijadwalkan':'#10b981','Lulus':'#16a34a','Tidak Lulus':'#ef4444' };
    document.getElementById('lsp-modal-header').style.background = headerColors[newStatus] || '#475569';
    modal.style.display = 'flex';
    modal.dataset.index = index;
    modal.dataset.status = newStatus;
};

window.closeLspStatusModal = function() {
    const modal = document.getElementById('modal-lsp-status-update');
    if (modal) modal.style.display = 'none';
};

window.confirmLspStatusUpdate = function() {
    const modal = document.getElementById('modal-lsp-status-update');
    if (!modal) return;
    const index = parseInt(modal.dataset.index);
    const newStatus = modal.dataset.status;
    const feedback = document.getElementById('lsp-modal-feedback').value.trim();
    const scheduleDate = document.getElementById('lsp-modal-schedule').value;

    const regs = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
    if (!regs[index]) return;

    regs[index].status = newStatus;
    regs[index].feedback = feedback;
    if (newStatus === 'Dijadwalkan' && scheduleDate) {
        regs[index].scheduleDate = new Date(scheduleDate).toLocaleDateString('id-ID');
    }

    // Jika LULUS: rekam sertifikasi aktif (berlaku 2 tahun)
    if (newStatus === 'Lulus') {
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 2);
        localStorage.setItem(`sertifikasi_${regs[index].code}`, JSON.stringify({
            status: 'AKTIF', schema: regs[index].schema,
            lulusDate: new Date().toLocaleDateString('id-ID'), expiry: expiry.toISOString()
        }));
    }
    // Jika TIDAK LULUS atau PENDING: hapus sertifikasi agar bisa daftar ulang
    if (newStatus === 'Tidak Lulus' || newStatus === 'Pending') {
        localStorage.removeItem(`sertifikasi_${regs[index].code}`);
    }

    localStorage.setItem('lsp_registrations', JSON.stringify(regs));
    window.closeLspStatusModal();
    window.renderLspRegistrations();

    const toastMap = {
        'Lulus':       `🏅 ${regs[index].name} dinyatakan LULUS! Sertifikasi aktif 2 tahun.`,
        'Tidak Lulus': `❌ ${regs[index].name} dinyatakan tidak lulus.`,
        'Dijadwalkan': `📅 Ujian ${regs[index].name} berhasil dijadwalkan.`,
        'Diproses':    `🔄 Pendaftaran ${regs[index].name} sedang diproses.`,
        'Pending':     `⚠️ Pendaftaran ${regs[index].name} dikembalikan (Pending).`,
    };
    const toastType = newStatus === 'Lulus' ? 'success' : newStatus === 'Tidak Lulus' ? 'error' : 'info';
    if (window.showToast) window.showToast(toastMap[newStatus] || `Status diubah ke ${newStatus}`, toastType);
};
"""

new_content = content[:start_idx] + NEW_BLOCK + content[hook_idx:]
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("SUCCESS: LSP functions updated safely with python script")
