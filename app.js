// 1. DATA KREDENSIAL AKUN DEMO
const demoAccounts = {
    agen: {
        email: "rian.aditya@asm-academy.id",
        password: "PasswordAgen123",
        name: "Rian Aditya",
        role: "Agen",
        code: "AGN-001",
        avatar: "RA",
        branch: "Cabang Fatmawati"
    },
    trainer: {
        email: "hendra.wijaya@asm-academy.id",
        password: "PasswordTrainer123",
        name: "Hendra Wijaya",
        role: "Trainer",
        code: "TRN-099",
        avatar: "HW",
        branch: "Kantor Pusat"
    },
    admin: {
        email: "siti.aminah@asm-academy.id",
        password: "PasswordAdmin123",
        name: "Siti Aminah",
        role: "Admin",
        code: "ADM-999",
        avatar: "SA",
        branch: "Kantor Pusat"
    },
    pincab: {
        email: "bambang.fatmawati@asm-academy.id",
        password: "PasswordPincab123",
        name: "Bambang Sudarsono",
        role: "Pimpinan Cabang",
        code: "PCB-007",
        avatar: "BS",
        branch: "Cabang Fatmawati"
    }
};

// Initialize database users - always ensure default accounts exist and have passwords
(function initDefaultUsers() {
    const defaultUsersList = [
        { email: "rian.aditya@asm-academy.id", password: "PasswordAgen123", name: "Rian Aditya", role: "Agen", code: "AGN-001", avatar: "RA", branch: "Cabang Fatmawati" },
        { email: "hendra.wijaya@asm-academy.id", password: "PasswordTrainer123", name: "Hendra Wijaya", role: "Trainer", code: "TRN-099", avatar: "HW", branch: "Kantor Pusat" },
        { email: "siti.aminah@asm-academy.id", password: "PasswordAdmin123", name: "Siti Aminah", role: "Admin", code: "ADM-999", avatar: "SA", branch: "Kantor Pusat" },
        { email: "bambang.fatmawati@asm-academy.id", password: "PasswordPincab123", name: "Bambang Sudarsono", role: "Pimpinan Cabang", code: "PCB-007", avatar: "BS", branch: "Cabang Fatmawati" }
    ];
    
    let existingUsers = [];
    try {
        existingUsers = JSON.parse(localStorage.getItem('pa_users')) || [];
    } catch(e) {
        existingUsers = [];
    }
    
    // Check if existing data is valid (has passwords). If not, reset.
    const isValid = existingUsers.length > 0 && existingUsers.every(u => u.password);
    
    if (!isValid) {
        // Reset to defaults
        localStorage.setItem('pa_users', JSON.stringify(defaultUsersList));
    } else {
        // Merge: ensure each default account exists with correct password
        let changed = false;
        defaultUsersList.forEach(def => {
            const found = existingUsers.find(u => u.email === def.email);
            if (!found) {
                existingUsers.push(def);
                changed = true;
            } else if (!found.password || !found.branch) {
                found.password = def.password;
                found.branch = def.branch;
                changed = true;
            }
        });
        if (changed) localStorage.setItem('pa_users', JSON.stringify(existingUsers));
    }
})();

if (!localStorage.getItem('pa_audit_logs')) {
    const defaultAuditLogsList = [
        { timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString('id-ID'), user: 'System', role: 'Sistem', activity: 'Sistem diinisialisasi sukses.', ip: '127.0.0.1' },
        { timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString('id-ID'), user: 'System', role: 'Sistem', activity: 'Pengguna demo di-seed ke database.', ip: '127.0.0.1' },
        { timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString('id-ID'), user: 'Siti Aminah', role: 'Admin', activity: 'Melakukan login admin.', ip: '192.168.1.102' }
    ];
    localStorage.setItem('pa_audit_logs', JSON.stringify(defaultAuditLogsList));
}

// 5. FUNGSI RENDER DASHBOARD DINAMIS
function renderProductionChart() {
    const container = document.getElementById('production-chart-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const data = [
        { month: 'Jan', val: 40 },
        { month: 'Feb', val: 65 },
        { month: 'Mar', val: 50 },
        { month: 'Apr', val: 80 },
        { month: 'May', val: 95 },
        { month: 'Jun', val: 120 }
    ];
    
    const maxVal = 120;
    
    data.forEach(item => {
        const heightPct = (item.val / maxVal) * 100;
        const barCol = document.createElement('div');
        barCol.style.display = 'flex';
        barCol.style.flexDirection = 'column';
        barCol.style.justifyContent = 'flex-end';
        barCol.style.alignItems = 'center';
        barCol.style.flex = '1';
        barCol.style.height = '100%';
        
        const bar = document.createElement('div');
        bar.style.width = '30px';
        bar.style.height = '0%'; 
        bar.style.background = 'linear-gradient(to top, #1a4f8a, #007bff)';
        bar.style.borderRadius = '4px 4px 0 0';
        bar.style.transition = 'height 1s ease-out';
        
        const label = document.createElement('span');
        label.innerText = item.month;
        label.style.fontSize = '11px';
        label.style.marginTop = '8px';
        label.style.color = '#666';
        
        barCol.appendChild(bar);
        barCol.appendChild(label);
        container.appendChild(barCol);
        
        setTimeout(() => {
            bar.style.height = heightPct + '%';
        }, 100);
    });
}

// 1. DATA MASTER HUB MULTI-MEDIA & KOMENTAR
const hubPostsData = [
    {
        id: "post-1",
        author: "Siti Aminah (Admin)",
        avatarColor: "#1d3557",
        time: "Baru saja",
        content: "Selamat pagi! Jangan lupa target kuartal ini sudah mencapai 75%. Mari semangat terus mencapai target 1 Miliar!",
        mediaType: "text", // Format Teks Biasa
        mediaUrl: "",
        comments: [
            { user: "Rian Aditya (Anda)", text: "Siap, Bu Siti! Tim kami sedang kejar target pekan ini. 🚀" }
        ]
    },
    {
        id: "post-2",
        author: "Siti Admin (Admin)",
        avatarColor: "#007bff",
        time: "1 Hari yang lalu",
        content: "Simak Teaser Produk Asuransi Kendaraan Terbaru kita. Pastikan Anda memahami selling point-nya sebelum menawarkan ke prospek.",
        mediaType: "video", // Format Video YouTube Embed (Anti-Error 153)
        mediaUrl: "https://www.youtube.com/embed/UwIvT8YkEgQ",
        comments: [
            { user: "Budi Santoso", text: "Wah mantap! Gaskan!" },
            { user: "Rian Aditya (Anda)", text: "Terima kasih infonya." }
        ]
    },
    {
        id: "post-3",
        author: "Hendra Wijaya (Trainer)",
        avatarColor: "#2a9d8f",
        time: "2 jam yang lalu",
        content: "Materi pelatihan Produk Asuransi Jiwa & Surety Bond terbaru sudah diupload ke sistem. Silakan dipelajari untuk bekal prospek minggu ini.",
        mediaType: "image", // Format Foto/Gambar
        mediaUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
        comments: []
    }
];

// 2. FUNGSI UTAMA RENDER HUB MULTI-MEDIA & INTERAKTIF
window.renderHubPosts = function() {
    const hubContainers = document.querySelectorAll('.hub-feed-list');
    const oldContainer = document.getElementById('hub-feed-list');
    const containersToUpdate = hubContainers.length > 0 ? Array.from(hubContainers) : (oldContainer ? [oldContainer] : []);
    
    if (containersToUpdate.length === 0) return;

    if (!window.hubDataLoaded) {
        const savedPosts = localStorage.getItem('pa_hub_posts');
        if (savedPosts) {
            hubPostsData = JSON.parse(savedPosts);
        }
        window.hubDataLoaded = true;
    }

    let fullHtml = "";

    hubPostsData.forEach(post => {
        let mediaHtml = '';
        if (post.mediaType === 'image' && post.mediaUrl) {
            mediaHtml = `
                <div style="margin: 10px 0 12px 46px; max-width: 100%; border-radius: 8px; overflow: hidden; border: 1px solid #eaedf1;">
                    <img src="${post.mediaUrl}" alt="Post Media" style="width: 100%; height: auto; display: block;">
                </div>
            `;
        } else if (post.mediaType === 'video' && post.mediaUrl) {
            mediaHtml = `
                <div style="margin: 10px 0 12px 46px; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; border: 1px solid #eaedf1; background: #000;">
                    <iframe src="${post.mediaUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                </div>
            `;
        }

        let commentsHtml = '';
        post.comments.forEach(cmt => {
            commentsHtml += `
                <div style="background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin-top: 5px; font-size: 12px;">
                    <strong>${cmt.user}:</strong> <span style="color: #555;">${cmt.text}</span>
                </div>
            `;
        });

        fullHtml += `
            <div style="border-bottom: 1px solid #eee; padding: 20px 0; font-family: sans-serif;">
                <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px;">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background: ${post.avatarColor}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">
                        ${post.author.charAt(0)}
                    </div>
                    <div>
                        <h5 style="margin: 0; font-size: 14px; color: #333;">${post.author}</h5>
                        <span style="font-size: 11px; color: #999;">${post.time}</span>
                    </div>
                </div>
                
                <p style="margin: 0 0 10px 46px; font-size: 13px; color: #444; line-height: 1.4;">${post.content}</p>
                
                ${mediaHtml}
                
                <div style="margin-left: 46px; border-top: 1px dashed #f0f0f0; padding-top: 10px;">
                    <div id="comments-list-${post.id}">${commentsHtml}</div>
                    
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <input type="text" id="input-${post.id}" placeholder="Tulis komentar..." style="flex: 1; padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; outline: none;">
                        <button onclick="addComment(event, '${post.id}')" style="background: #2563eb; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; cursor: pointer;">Kirim</button>
                    </div>
                </div>
            </div>
        `;
    });

    containersToUpdate.forEach(container => {
        container.innerHTML = fullHtml;
    });
};

window.submitHubPost = function(rolePrefix) {
    let textInputId = 'hub-input-text';
    let imageInputId = 'hub-input-image';
    let videoInputId = 'hub-input-video';
    
    if (rolePrefix) {
        textInputId += '-' + rolePrefix;
        imageInputId += '-' + rolePrefix;
        videoInputId += '-' + rolePrefix;
    }

    const textEl = document.getElementById(textInputId);
    const imgEl = document.getElementById(imageInputId);
    const vidEl = document.getElementById(videoInputId);

    if (!textEl) return;
    const content = textEl.value.trim();
    if (!content) {
        alert("Silakan isi pengumuman terlebih dahulu.");
        return;
    }

    let mediaType = null;
    let mediaUrl = null;

    if (vidEl && vidEl.value.trim()) {
        mediaType = 'video';
        mediaUrl = vidEl.value.trim();
    } else if (imgEl && imgEl.value.trim()) {
        mediaType = 'image';
        mediaUrl = imgEl.value.trim();
    }

    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user")) || { name: "System Admin", role: "Admin" };

    const newPost = {
        id: Date.now(),
        author: activeUser.name + " (" + activeUser.role + ")",
        time: "Baru saja",
        avatarColor: "#1e293b",
        content: content,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        comments: []
    };

    hubPostsData.unshift(newPost);
    localStorage.setItem('pa_hub_posts', JSON.stringify(hubPostsData));

    textEl.value = '';
    if (imgEl) imgEl.value = '';
    if (vidEl) vidEl.value = '';

    renderHubPosts();
    alert("Pengumuman berhasil diposting!");
};

// 3. LOGIKA TAMBAH KOMENTAR BARU (SIMULASI ROLE-PLAY)
window.addComment = function(e, postId) {
    let inputField = e.target.previousElementSibling;
    let commentText = inputField.value.trim();

    if (!commentText) {
        alert("Komentar tidak boleh kosong.");
        return;
    }

    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user")) || { name: "System Admin" };
    let userName = activeUser.name + " (" + (activeUser.role || "Anda") + ")";

    const post = hubPostsData.find(p => p.id == postId);
    if (post) {
        post.comments.push({
            user: userName,
            text: commentText
        });
        localStorage.setItem('pa_hub_posts', JSON.stringify(hubPostsData));
        inputField.value = '';
        renderHubPosts();
    }
};

function updateAircraftPosition() {
    const dropdown = document.getElementById('manifest-select');
    if (!dropdown) return;
    
    const planeAvatar = document.getElementById('plane-avatar');
    const flightPathFill = document.getElementById('flight-path-fill');
    const fuelLevelFill = document.getElementById('fuel-level-fill');
    const fuelPctText = document.getElementById('fuel-pct-text');
    
    const manifestData = {
        'non-ssc': { planePct: 33, fuelPct: 20 },
        'ssc': { planePct: 66, fuelPct: 60 },
        'bonding': { planePct: 100, fuelPct: 100 }
    };
    
    const val = dropdown.value;
    const target = manifestData[val] || manifestData['non-ssc'];
    
    if (planeAvatar) {
        planeAvatar.style.transition = 'bottom 1.5s ease-in-out';
        planeAvatar.style.bottom = target.planePct + '%';
    }
    if (flightPathFill) {
        flightPathFill.style.transition = 'height 1.5s ease-in-out';
        flightPathFill.style.height = target.planePct + '%';
    }
    if (fuelLevelFill) {
        fuelLevelFill.style.transition = 'height 1.5s ease-in-out, background 1.5s';
        fuelLevelFill.style.height = target.fuelPct + '%';
        
        if (target.fuelPct > 80) fuelLevelFill.style.background = '#10b981';
        else if (target.fuelPct > 40) fuelLevelFill.style.background = '#f59e0b';
        else fuelLevelFill.style.background = '#ef4444';
    }
    if (fuelPctText) {
        fuelPctText.innerText = target.fuelPct + '%';
    }
}

function onManifestChange() {
    updateAircraftPosition();
}

// 2. FUNGSI UNTUK OTOMATIS MENGISI FORM (AUTO-FILL)
// Fungsi bypassLoginDemo lama dihapus, digantikan oleh forceBypassLogin di bagian akhir file.

// 4. LOGIKA TOMBOL MASUK SEKARANG (SUBMIT LOGIN)
window.handleLogin = function(e) {
    try {
        if (e && typeof e.preventDefault === 'function') e.preventDefault(); 

        const emailField = document.getElementById('login-email');
        const passwordField = document.getElementById('login-password');

        if (!emailField || !passwordField || !emailField.value || !passwordField.value) {
            alert("Silakan pilih akun demo di bawah atau isi email dan password terlebih dahulu!");
            return;
        }

        const defaultUsers = [
            { email: "rian.aditya@asm-academy.id", password: "PasswordAgen123", name: "Rian Aditya", role: "Agen", code: "AGN-001", avatar: "RA", branch: "Cabang Fatmawati" },
            { email: "hendra.wijaya@asm-academy.id", password: "PasswordTrainer123", name: "Hendra Wijaya", role: "Trainer", code: "TRN-099", avatar: "HW", branch: "Kantor Pusat" },
            { email: "siti.aminah@asm-academy.id", password: "PasswordAdmin123", name: "Siti Aminah", role: "Admin", code: "ADM-999", avatar: "SA", branch: "Kantor Pusat" },
            { email: "bambang.fatmawati@asm-academy.id", password: "PasswordPincab123", name: "Bambang Sudarsono", role: "Pimpinan Cabang", code: "PCB-007", avatar: "BS", branch: "Cabang Fatmawati" }
        ];
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('pa_users')) || defaultUsers;
        } catch(e) {
            users = defaultUsers;
        }
        // If users don't have passwords (old data), reset to defaults
        if (!users.every(u => u.password)) {
            users = defaultUsers;
            localStorage.setItem('pa_users', JSON.stringify(defaultUsers));
        }
        
        let activeAccount = users.find(u => u.email === emailField.value);
        if (!activeAccount) {
            alert("Akun tidak ditemukan! Pastikan email benar.");
            return;
        }
        if (passwordField.value !== activeAccount.password) {
            alert("Kata sandi salah!");
            return;
        }
        
        // Log to Audit Log!
        if (typeof window.logAuditEvent === 'function') {
            window.logAuditEvent(activeAccount.name, activeAccount.role, "Berhasil masuk ke sistem.");
        }

        const setHtml = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
        setHtml('sidebar-user-name', activeAccount.name);
        setHtml('sidebar-user-role', activeAccount.role);
        setHtml('sidebar-user-code', activeAccount.code);
        setHtml('sidebar-avatar', activeAccount.avatar);
        setHtml('user-initials', activeAccount.avatar);
        setHtml('header-avatar-circle', activeAccount.avatar);
        setHtml('header-profile-name', activeAccount.name);
        if (activeAccount.name && typeof activeAccount.name === 'string') {
            setHtml('dash-user-name', activeAccount.role + ' ' + activeAccount.name.split(' ')[0]);
        }

        try {
            sessionStorage.setItem('currentUserRole', activeAccount.role);
            sessionStorage.setItem('pa_active_user', JSON.stringify(activeAccount));
        } catch(storageErr) {
            console.warn('SessionStorage tidak tersedia', storageErr);
        }

        const agenMenu = document.getElementById('agen-menu-group');
        const trainerMenu = document.getElementById('trainer-menu-group');
        const adminMenu = document.getElementById('admin-menu-group');
        const pimpinanMenu = document.getElementById('pimpinan-menu-group');
        if (agenMenu) agenMenu.style.display = activeAccount.role === 'Agen' ? 'block' : 'none';
        if (trainerMenu) trainerMenu.style.display = activeAccount.role === 'Trainer' ? 'block' : 'none';
        if (adminMenu) adminMenu.style.display = activeAccount.role === 'Admin' ? 'block' : 'none';
        if (pimpinanMenu) pimpinanMenu.style.display = (activeAccount.role === 'Pimpinan Cabang' || activeAccount.role === 'Pimpinan' || activeAccount.role === 'Pincab') ? 'block' : 'none';

        const loginPageElement = document.getElementById('login-screen'); 
        const dashboardPageElement = document.getElementById('app-shell'); 

        if (loginPageElement && dashboardPageElement) {
            loginPageElement.style.display = 'none';
            dashboardPageElement.style.display = '';
        }
        
        if (activeAccount.role === 'Trainer') {
            if (typeof navigateTo === 'function') navigateTo('trainer-dashboard');
        } else if (activeAccount.role === 'Admin') {
            if (typeof navigateTo === 'function') navigateTo('admin-dashboard');
        } else if (activeAccount.role === 'Pimpinan Cabang' || activeAccount.role === 'Pimpinan' || activeAccount.role === 'Pincab') {
            if (typeof navigateTo === 'function') navigateTo('pimpinan-dashboard');
        } else {
            if (typeof navigateTo === 'function') navigateTo('dashboard');
        }
        
        // WAJIB PANGGIL ULANG SEMUA FUNGSI INISIALISASI UNTUK MEMBANGUNKAN DASHBOARD
        console.log("Memicu render ulang seluruh komponen dashboard...");
        
        if (typeof renderProductionChart === 'function') {
            renderProductionChart();
        } else if (typeof initCharts === 'function') {
            initCharts();
        }

        if (typeof renderHubPosts === 'function') {
            renderHubPosts();
        } else if (typeof initHub === 'function') {
            initHub();
        }

        if (typeof renderGamification === 'function') {
            renderGamification();
        } else if (typeof updateAircraftPosition === 'function') {
            updateAircraftPosition(); 
        }

        const manifestDropdown = document.getElementById('manifest-dropdown');
        if (manifestDropdown) {
            manifestDropdown.dispatchEvent(new Event('change'));
        }

        if (typeof renderAgenTrainings === 'function') {
            renderAgenTrainings();
        }

        if (typeof renderTrainerTrainings === 'function') {
            renderTrainerTrainings();
        }
        if (typeof renderRecommendationBar === 'function') renderRecommendationBar();
        if (typeof renderBelajarAsuransi === 'function') renderBelajarAsuransi("Basic", "");
        if (typeof renderTrainerProgress === 'function') renderTrainerProgress();
        if (typeof renderTrainerClaims === 'function') renderTrainerClaims();
        if (typeof window.applyCosmetics === 'function') window.applyCosmetics();
        if (typeof window.syncGamificationWidgets === 'function') window.syncGamificationWidgets();
        
        // Inisialisasi modul Pimpinan Cabang jika login sebagai Pimpinan Cabang
        if (activeAccount.role === 'Pimpinan Cabang' || activeAccount.role === 'Pimpinan' || activeAccount.role === 'Pincab') {
            if (typeof window.renderPincabDashboard === 'function') window.renderPincabDashboard();
            if (typeof window.renderPincabSertifikasi === 'function') window.renderPincabSertifikasi();
            if (typeof window.renderPincabAktivitas === 'function') window.renderPincabAktivitas();
        }
        console.log("[Login] Login berhasil sebagai: " + activeAccount.role);
    } catch(err) {
        alert("CRITICAL ERROR DALAM LOGIN: " + err.message + "\n" + err.stack);
        console.error(err);
    }
};

// LOGIKA TOMBOL KELUAR SESI
window.handleLogout = function(e) {
    if (e) e.preventDefault();
    
    // Hapus data sesi aktif
    sessionStorage.removeItem('pa_active_user');
    window.activeAccount = null;
    
    // Refresh halaman sepenuhnya agar bersih
    window.location.reload(true);
};

// 6. FUNGSI NAVIGASI & SIDEBAR UTAMA
window.toggleNavDropdown = function(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    dropdown.classList.toggle('open');
    const btn = dropdown.previousElementSibling;
    if (btn && btn.classList.contains('sidebar-dropdown-btn')) {
        btn.classList.toggle('open');
    }
};

window.navigateTo = function(pageId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Tampilkan target section
    let targetPageId = pageId;
    if (pageId === 'admin-user' || pageId === 'admin-log') {
        targetPageId = 'admin-dashboard';
    }
    const target = document.getElementById('page-' + targetPageId);
    if (target) target.classList.add('active');
    
    // Update link aktif di sidebar
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.getElementById('nav-' + pageId);
    if (activeLink) activeLink.classList.add('active');
    
    // Tutup sidebar di mobile jika sedang terbuka
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    // Render specific page contents
    if (pageId === 'agen-training') {
        if (typeof window.renderAgenTrainings === 'function') window.renderAgenTrainings();
    } else if (pageId === 'trainer-training') {
        if (typeof window.renderTrainerTrainings === 'function') window.renderTrainerTrainings();
    } else if (pageId === 'coaching') {
        if (typeof window.renderCoachingCategories === 'function') window.renderCoachingCategories();
    } else if (pageId === 'produk') {
        if (typeof window.renderProductCatalog === 'function') window.renderProductCatalog();
    } else if (pageId === 'admin-master') {
        if (typeof window.renderAdminProducts === 'function') window.renderAdminProducts();
        if (typeof window.renderAdminUnderwritingCases === 'function') window.renderAdminUnderwritingCases();
        if (typeof window.renderAdminWordDuelQuestions === 'function') window.renderAdminWordDuelQuestions();
        if (typeof window.renderTrainerMaterials === 'function') window.renderTrainerMaterials();
        if (typeof window.switchAdminMasterTab === 'function') window.switchAdminMasterTab('prod');
    } else if (pageId === 'admin-rewards') {
        if (typeof window.renderAdminRewards === 'function') window.renderAdminRewards();
    } else if (pageId === 'admin-katalog') {
        if (typeof window.renderAdminKatalog === 'function') window.renderAdminKatalog();
    } else if (pageId === 'rewards') {
        if (typeof window.renderRewardsShop === 'function') window.renderRewardsShop();
    } else if (pageId === 'arena-game') {
        if (typeof window.updateGameQuotaUI === 'function') window.updateGameQuotaUI();
    } else if (pageId === 'admin-dashboard') {
        if (typeof window.switchAdminTab === 'function') window.switchAdminTab('adm-sys-report');
        if (typeof window.renderAdminUsers === 'function') window.renderAdminUsers();
        if (typeof window.renderAuditLogs === 'function') window.renderAuditLogs();
        if (typeof window.renderDashboardAuditLogs === 'function') window.renderDashboardAuditLogs();
    } else if (pageId === 'admin-user') {
        if (typeof window.switchAdminTab === 'function') window.switchAdminTab('adm-user-mgmt');
        if (typeof window.renderAdminUsers === 'function') window.renderAdminUsers();
    } else if (pageId === 'admin-log') {
        if (typeof window.switchAdminTab === 'function') window.switchAdminTab('adm-logs');
        if (typeof window.renderAuditLogs === 'function') window.renderAuditLogs();
    }
    
    // Render dinamis untuk halaman Progress
    if (pageId === 'progress' && typeof window.renderAgentProgressPage === 'function') {
        window.renderAgentProgressPage();
    }
    
    // Render ATC page cockpit
    if (pageId === 'atc') {
        if (typeof window.renderGamification === 'function') window.renderGamification();
        if (typeof window.renderATCGamification === 'function') window.renderATCGamification();
        if (typeof window.updateATCManifestData === 'function') window.updateATCManifestData();
    }
    
    // Render Pimpinan Cabang pages
    if (pageId === 'pimpinan-dashboard') {
        if (typeof window.renderPincabDashboard === 'function') window.renderPincabDashboard();
    } else if (pageId === 'pimpinan-sertifikasi') {
        if (typeof window.renderPincabSertifikasi === 'function') window.renderPincabSertifikasi();
    } else if (pageId === 'pimpinan-aktivitas') {
        if (typeof window.renderPincabAktivitas === 'function') window.renderPincabAktivitas();
    } else if (pageId === 'dashboard') {
        if (typeof window.renderDashboardProactiveOpportunity === 'function') window.renderDashboardProactiveOpportunity();
        if (typeof window.renderAgentTodoListWidget === 'function') window.renderAgentTodoListWidget();
        if (typeof window.updateSmartNotificationBadge === 'function') window.updateSmartNotificationBadge();
    } else if (pageId === 'kalkulator') {
        if (typeof window.calculatePremium === 'function') window.calculatePremium();
    }
};

let underwritingCases = JSON.parse(localStorage.getItem('pa_underwriting_cases')) || (typeof UNDERWRITING_CASES_DEFAULT !== 'undefined' ? UNDERWRITING_CASES_DEFAULT : []);
let wordDuelQuestions = JSON.parse(localStorage.getItem('pa_word_duel_questions')) || (typeof WORD_DUEL_QUESTIONS_DEFAULT !== 'undefined' ? WORD_DUEL_QUESTIONS_DEFAULT : []);

let productCatalog = JSON.parse(localStorage.getItem('productCatalog')) || [
    {
        id: "prod-001",
        name: "Simas Rumah Hemat++",
        icon: "🏠",
        category: "Properti",
        categoryColor: "#10b981", 
        desc: "Perlindungan komprehensif untuk rumah tinggal Anda dari risiko kebakaran, pencurian, dan bencana alam dengan premi hemat.",
        target: ["Pemilik Rumah Tinggal", "Keluarga Muda", "Nasabah KPR"],
        advantages: [
            "Premi terjangkau mulai dari Rp 100.000/tahun",
            "Jaminan ganti rugi 100% nilai bangunan",
            "Termasuk santunan kecelakaan diri untuk penghuni"
        ],
        faq: [
            { q: "Apakah perlindungan mencakup gempa bumi?", a: "Ya, gempa bumi merupakan perluasan jaminan yang sudah termasuk di dalam paket ++." },
            { q: "Bagaimana cara klaim jika terjadi kebakaran?", a: "Segera laporkan kejadian maksimal 3x24 jam melalui aplikasi atau call center, lalu siapkan dokumen surat keterangan kepolisian." }
        ],
        docs: [
            { name: "RIPLAY Umum", link: "#" },
            { name: "Brosur Digital", link: "#" }
        ]
    },
    {
        id: "prod-002",
        name: "Simas Travel Overseas",
        icon: "✈️",
        category: "Travel",
        categoryColor: "#3b82f6", 
        desc: "Asuransi perjalanan luar negeri dengan pertanggungan medis, keterlambatan penerbangan, dan kehilangan bagasi di seluruh dunia.",
        target: ["Wisatawan Mancanegara", "Pebisnis Internasional", "Keluarga Liburan"],
        advantages: [
            "Perlindungan medis darurat tanpa batas",
            "Kompensasi keterlambatan penerbangan hingga Rp 5.000.000",
            "Layanan bantuan darurat 24/7 di seluruh dunia"
        ],
        faq: [
            { q: "Apakah mencakup evakuasi medis darurat?", a: "Ya, evakuasi medis darurat dijamin 100% biaya aktual yang terjadi." },
            { q: "Apakah visa Schengen ditanggung jika ditolak?", a: "Ya, terdapat jaminan pengembalian biaya visa apabila ditolak oleh kedutaan." }
        ],
        docs: [
            { name: "Ringkasan Informasi Produk", link: "#" },
            { name: "Tabel Manfaat", link: "#" }
        ]
    }
];

window.renderProductCatalog = function() {
    const container = document.getElementById("products-catalog-container");
    if (!container) return;

    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
    container.style.gap = '25px';
    container.innerHTML = "";

    productCatalog.forEach(prod => {
        let targetsHTML = prod.target.map(t => `<li style="margin-left:20px; color:#475569; font-size:14px; line-height:1.6;">${t}</li>`).join("");
        let docsHTML = prod.docs.map(d => `<a href="${d.link}" style="display:inline-block; margin-right:10px; font-size:13px; color:#0284c7; background:#f0f9ff; padding:4px 8px; border-radius:4px; text-decoration:none; border:1px solid #bae6fd;">📄 ${d.name}</a>`).join("");

        const card = document.createElement("div");
        card.style.background = "white";
        card.style.borderRadius = "12px";
        card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
        card.style.border = "1px solid #e2e8f0";
        card.style.padding = "25px";
        card.style.display = "flex";
        card.style.flexDirection = "column";

        card.innerHTML = `
            <div style="font-size:20px; font-weight:bold; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:10px;">
                <span style="font-size:28px;">${prod.icon}</span> ${prod.name}
            </div>
            <p style="color:#64748b; font-size:14px; margin-top:0; margin-bottom:15px; line-height:1.5;">${prod.desc}</p>
            
            <div style="margin-bottom:15px;">
                <span style="background:${prod.categoryColor}; color:white; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;">🏷️ Kategori: ${prod.category}</span>
            </div>

            <div style="margin-bottom:15px; flex-grow:1;">
                <h4 style="margin:0 0 5px 0; font-size:14px; color:#334155;">📌 Cocok untuk:</h4>
                <ul style="margin:0; padding:0; list-style-type:disc;">
                    ${targetsHTML}
                </ul>
            </div>

            <hr style="border:none; border-top:1px solid #e2e8f0; margin:15px 0;">

            <div style="margin-bottom:20px;">
                ${docsHTML}
            </div>

            <button class="btn-primary" style="width:100%; padding:12px; text-align:center; font-weight:bold; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:8px;" onclick="window.showProductDetail('${prod.id}')">
                🔵 Lihat Detail
            </button>
        `;
        container.appendChild(card);
    });
};

window.showProductDetail = function(productId) {
    const prod = productCatalog.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById("modal-product-detail");
    const content = document.getElementById("product-detail-content");
    if (!modal || !content) return;

    let advHTML = prod.advantages.map(a => `<li style="margin-bottom:10px; display:flex; gap:10px; align-items:flex-start;"><span style="color:#10b981; font-size:16px;">✅</span><span style="color:#334155; font-size:15px; line-height:1.5;">${a}</span></li>`).join("");
    
    let faqHTML = prod.faq.map(f => `
        <div style="margin-bottom:15px; border-bottom:1px solid #e2e8f0; padding-bottom:15px;">
            <div style="font-weight:600; color:#0f172a; font-size:15px; margin-bottom:5px;">Q: ${f.q}</div>
            <div style="color:#475569; font-size:14px; line-height:1.5;">A: ${f.a}</div>
        </div>
    `).join("");

    content.innerHTML = `
        <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px; border-bottom:2px solid #f1f5f9; padding-bottom:15px;">
            <div style="font-size:48px;">${prod.icon}</div>
            <div>
                <h2 style="margin:0; color:#0f172a; font-size:24px;">${prod.name}</h2>
                <span style="display:inline-block; margin-top:5px; background:${prod.categoryColor}; color:white; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;">🏷️ Kategori: ${prod.category}</span>
            </div>
        </div>

        <div style="margin-bottom:25px;">
            <p style="color:#475569; font-size:16px; line-height:1.6; margin:0;">${prod.desc}</p>
        </div>

        <div style="margin-bottom:25px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:20px;">
            <h3 style="margin-top:0; color:#0f172a; font-size:18px; margin-bottom:15px; display:flex; align-items:center; gap:8px;">🌟 Keunggulan Produk</h3>
            <ul style="margin:0; padding:0; list-style:none;">
                ${advHTML}
            </ul>
        </div>

        <div>
            <h3 style="margin-top:0; color:#0f172a; font-size:18px; margin-bottom:15px;">❓ Frequently Asked Questions (FAQ)</h3>
            ${faqHTML}
        </div>
    `;

    modal.classList.add("active");
};

// ==========================================
// AI PRODUCT FINDER LOGIC
// ==========================================

window.findAIProduct = async function() {
    const queryEl = document.getElementById('ai-find-query');
    
    if (!queryEl || !queryEl.value.trim()) {
        alert("Silakan ketik pertanyaan Anda terlebih dahulu.");
        return;
    }

    const query = queryEl.value.trim();

    const btn = document.getElementById('btn-ai-find');
    const resultDiv = document.getElementById('ai-find-result');
    
    // UI Loading state
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = "⏳ AI sedang membaca referensi produk...";
    btn.disabled = true;
    resultDiv.style.display = 'none';

    try {
        const apiKey = localStorage.getItem('gemini_api_key');
        let responseHTML = "";
        
        const mockResponse = async () => {
            await new Promise(r => setTimeout(r, 2000));
            return `
                <div style="margin-bottom:15px; padding:10px; background:#fffbeb; color:#b45309; border-radius:6px; font-size:13px; border:1px solid #fde68a;">
                    ⚠️ <strong>Mode Simulasi:</strong> API Key tidak ditemukan atau Backend tidak terhubung. Menampilkan respons AI buatan (mock).
                </div>
                <h4 style="margin-top:0; color:#0f172a;">🎯 Rekomendasi berdasarkan "${query.substring(0, 30)}...":</h4>
                <ul style="margin-bottom:15px; padding-left:20px;">
                    <li><strong>Simas Properti Optima</strong> - Perlindungan komprehensif yang sesuai dengan kebutuhan pencarian Anda.</li>
                    <li><strong>Simas Usaha Makmur</strong> - Menutupi risiko spesifik yang Anda sebutkan dalam pertanyaan.</li>
                </ul>
                <h4 style="margin-top:0; color:#0f172a;">💡 Alasan:</h4>
                <p style="margin:0;">Berdasarkan pertanyaan Anda, produk-produk ini memberikan jaminan paling luas untuk menutup risiko terkait dengan perhitungan premi yang kompetitif.</p>
            `;
        };

        if (apiKey) {
            try {
                // Call backend API instead of calling Gemini directly from frontend
                const res = await fetch('http://localhost:3001/api/ai-product-finder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({ query })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || res.statusText);
                }

                const data = await res.json();
                responseHTML = data.result;
                responseHTML = responseHTML.replace(/```html/g, '').replace(/```/g, '');
            } catch (apiError) {
                console.warn("Backend API Error, falling back to mock:", apiError);
                responseHTML = await mockResponse();
            }
        } else {
            responseHTML = await mockResponse();
        }

        resultDiv.innerHTML = responseHTML;
        resultDiv.style.display = 'block';
    } catch (e) {
        resultDiv.innerHTML = `<p style="color:#ef4444; margin:0;">Maaf, terjadi kesalahan internal: ${e.message}</p>`;
        resultDiv.style.display = 'block';
    } finally {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
    }
};

// ==========================================
// ADMIN: PRODUCT MANAGEMENT LOGIC
// ==========================================

window.renderAdminProducts = function() {
    const tbody = document.getElementById('admin-product-rows');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    productCatalog.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:20px;">${prod.icon}</span>
                <strong>${prod.name}</strong>
            </td>
            <td><span style="background:${prod.categoryColor}; color:white; padding:4px 8px; border-radius:12px; font-size:12px; font-weight:600;">${prod.category}</span></td>
            <td style="text-align:center;">
                <button onclick="window.showAdminProductModal('${prod.id}')" style="background:#eab308; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px; margin-right:4px;">✏️ Edit</button>
                <button onclick="window.deleteAdminProduct('${prod.id}')" style="background:#ef4444; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px;">🗑️ Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

window.showAdminProductModal = function(id = null) {
    const modal = document.getElementById('modal-admin-product');
    const title = document.getElementById('adm-prod-modal-title');
    
    document.getElementById('adm-prod-id').value = id || '';
    document.getElementById('adm-prod-faq-container').innerHTML = '';
    document.getElementById('adm-prod-doc-container').innerHTML = '';

    if (id) {
        title.innerText = 'Edit Produk Asuransi';
        const prod = productCatalog.find(p => p.id === id);
        if (prod) {
            document.getElementById('adm-prod-name').value = prod.name;
            document.getElementById('adm-prod-cat').value = prod.category;
            document.getElementById('adm-prod-desc').value = prod.desc;
            document.getElementById('adm-prod-target').value = prod.target.join(', ');
            document.getElementById('adm-prod-adv').value = prod.advantages.join('\\n');
            
            prod.faq.forEach(f => window.addAdminProdFaq(f.q, f.a));
            prod.docs.forEach(d => window.addAdminProdDoc(d.name, d.link));
        }
    } else {
        title.innerText = 'Tambah Produk Baru';
        document.getElementById('adm-prod-name').value = '';
        document.getElementById('adm-prod-cat').value = 'Kendaraan';
        document.getElementById('adm-prod-desc').value = '';
        document.getElementById('adm-prod-target').value = '';
        document.getElementById('adm-prod-adv').value = '';
        window.addAdminProdFaq();
        window.addAdminProdDoc();
    }
    
    modal.classList.add('active');
};

window.addAdminProdFaq = function(q = '', a = '') {
    const container = document.getElementById('adm-prod-faq-container');
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '10px';
    div.style.marginBottom = '10px';
    div.innerHTML = `
        <input type="text" placeholder="Pertanyaan (Q)" value="${q}" class="faq-q" style="flex:1; padding:8px; border:1px solid #cbd5e1; border-radius:6px; font-family:inherit; font-size:13px;">
        <input type="text" placeholder="Jawaban (A)" value="${a}" class="faq-a" style="flex:1; padding:8px; border:1px solid #cbd5e1; border-radius:6px; font-family:inherit; font-size:13px;">
        <button onclick="this.parentElement.remove()" style="background:#ef4444; color:white; border:none; border-radius:6px; padding:0 12px; cursor:pointer;">X</button>
    `;
    container.appendChild(div);
};

window.addAdminProdDoc = function(name = '', link = '') {
    const container = document.getElementById('adm-prod-doc-container');
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '10px';
    div.style.marginBottom = '10px';
    div.innerHTML = `
        <input type="text" placeholder="Nama Dokumen" value="${name}" class="doc-n" style="flex:1; padding:8px; border:1px solid #cbd5e1; border-radius:6px; font-family:inherit; font-size:13px;">
        <input type="url" placeholder="https://drive.google.com/..." value="${link}" class="doc-l" style="flex:2; padding:8px; border:1px solid #cbd5e1; border-radius:6px; font-family:inherit; font-size:13px;">
        <button onclick="this.parentElement.remove()" style="background:#ef4444; color:white; border:none; border-radius:6px; padding:0 12px; cursor:pointer;">X</button>
    `;
    container.appendChild(div);
};

window.saveAdminProduct = function() {
    const id = document.getElementById('adm-prod-id').value;
    const name = document.getElementById('adm-prod-name').value;
    const category = document.getElementById('adm-prod-cat').value;
    const desc = document.getElementById('adm-prod-desc').value;
    
    if (!name || !desc) {
        alert("Nama dan Deskripsi produk wajib diisi!");
        return;
    }

    const target = document.getElementById('adm-prod-target').value.split(',').map(s => s.trim()).filter(s => s);
    const advantages = document.getElementById('adm-prod-adv').value.split('\\n').map(s => s.trim()).filter(s => s);
    
    const faqs = [];
    document.querySelectorAll('#adm-prod-faq-container > div').forEach(div => {
        const q = div.querySelector('.faq-q').value.trim();
        const a = div.querySelector('.faq-a').value.trim();
        if (q && a) faqs.push({ q, a });
    });

    const docs = [];
    document.querySelectorAll('#adm-prod-doc-container > div').forEach(div => {
        const n = div.querySelector('.doc-n').value.trim();
        const l = div.querySelector('.doc-l').value.trim();
        if (n && l) docs.push({ name: n, link: l });
    });

    let catColor = "#64748b";
    if (category === "Properti") catColor = "#10b981";
    else if (category === "Travel") catColor = "#3b82f6";
    else if (category === "Kendaraan") catColor = "#f59e0b";
    else if (category === "Kesehatan") catColor = "#ec4899";

    const newProd = {
        id: id || 'prod-' + Date.now(),
        name,
        icon: "📦",
        category,
        categoryColor: catColor,
        desc,
        target,
        advantages,
        faq: faqs,
        docs
    };

    if (id) {
        const idx = productCatalog.findIndex(p => p.id === id);
        if (idx !== -1) {
            newProd.icon = productCatalog[idx].icon; // Preserve old icon
            productCatalog[idx] = newProd;
        }
    } else {
        productCatalog.push(newProd);
    }

    localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
    
    document.getElementById('modal-admin-product').classList.remove('active');
    window.renderAdminProducts();
    alert("Produk berhasil disimpan!");
};

window.deleteAdminProduct = function(id) {
    if (confirm('Anda yakin ingin menghapus produk ini?')) {
        const idx = productCatalog.findIndex(p => p.id === id);
        if (idx !== -1) {
            productCatalog.splice(idx, 1);
            localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
            window.renderAdminProducts();
        }
    }
};

window.switchAdminMasterTab = function(tabId) {
    const tabContainers = {
        'prod': 'adm-master-prod-container',
        'game-underwriting': 'adm-master-underwriting-container',
        'game-word-duel': 'adm-master-word-duel-container',
        'belajar': 'adm-master-belajar-container'
    };
    
    // Hide all
    Object.values(tabContainers).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = 'none';
            el.classList.remove('active');
        }
    });
    
    // Show active
    const activeId = tabContainers[tabId];
    const activeEl = document.getElementById(activeId);
    if (activeEl) {
        activeEl.style.display = 'block';
        activeEl.classList.add('active');
    }
    
    // Update tab buttons active state
    const buttons = [
        { id: 'tab-btn-adm-prod', tab: 'prod' },
        { id: 'tab-btn-adm-underwriting', tab: 'game-underwriting' },
        { id: 'tab-btn-adm-word', tab: 'game-word-duel' },
        { id: 'tab-btn-adm-belajar', tab: 'belajar' }
    ];
    
    buttons.forEach(item => {
        const btn = document.getElementById(item.id);
        if (btn) {
            if (item.tab === tabId) {
                btn.classList.add('active');
                btn.style.color = 'var(--primary-blue)';
            } else {
                btn.classList.remove('active');
                btn.style.color = 'var(--text-muted)';
            }
        }
    });
};

// ==========================================
// ADMIN: GAME UNDERWRITING MANAGEMENT
// ==========================================

window.renderAdminUnderwritingCases = function() {
    const tbody = document.getElementById('admin-underwriting-rows');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    underwritingCases.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align:center; font-size:20px;">${c.emoji || '⚖️'}</td>
            <td><strong>${c.title}</strong></td>
            <td><span style="font-size:12px; color:var(--text-muted);">${c.category}</span></td>
            <td><span style="padding:4px 8px; border-radius:12px; font-size:12px; font-weight:600; background-color:${c.correctAnswer === 'accept' ? '#dcfce7' : '#fee2e2'}; color:${c.correctAnswer === 'accept' ? '#166534' : '#991b1b'};">${c.correctAnswer === 'accept' ? 'TERIMA' : 'TOLAK'}</span></td>
            <td style="text-align:center;">
                <button onclick="window.showAddUnderwritingModal('${c.id}')" style="background:#eab308; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px; margin-right:4px;">✏️ Edit</button>
                <button onclick="window.deleteAdminUnderwritingCase('${c.id}')" style="background:#ef4444; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px;">🗑️ Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

window.showAddUnderwritingModal = function(id = null) {
    const modal = document.getElementById('modal-admin-underwriting');
    const title = document.getElementById('adm-underwriting-modal-title');
    if (!modal) return;
    
    document.getElementById('adm-und-id').value = id || '';
    
    if (id) {
        title.innerText = 'Edit Kasus Underwriting';
        const c = underwritingCases.find(item => item.id === id);
        if (c) {
            document.getElementById('adm-und-emoji').value = c.emoji || '';
            document.getElementById('adm-und-title').value = c.title || '';
            document.getElementById('adm-und-category').value = c.category || '';
            document.getElementById('adm-und-risk').value = c.risk || '';
            document.getElementById('adm-und-premi').value = c.premi || '';
            document.getElementById('adm-und-answer').value = c.correctAnswer || 'accept';
            document.getElementById('adm-und-feedback').value = c.feedback || '';
        }
    } else {
        title.innerText = 'Tambah Kasus Underwriting';
        document.getElementById('adm-und-emoji').value = '';
        document.getElementById('adm-und-title').value = '';
        document.getElementById('adm-und-category').value = '';
        document.getElementById('adm-und-risk').value = '';
        document.getElementById('adm-und-premi').value = '';
        document.getElementById('adm-und-answer').value = 'accept';
        document.getElementById('adm-und-feedback').value = '';
    }
    
    modal.classList.add('active');
};

window.saveAdminUnderwritingCase = function() {
    const id = document.getElementById('adm-und-id').value;
    const emoji = document.getElementById('adm-und-emoji').value.trim() || '⚖️';
    const title = document.getElementById('adm-und-title').value.trim();
    const category = document.getElementById('adm-und-category').value.trim();
    const risk = document.getElementById('adm-und-risk').value.trim();
    const premi = document.getElementById('adm-und-premi').value.trim();
    const correctAnswer = document.getElementById('adm-und-answer').value;
    const feedback = document.getElementById('adm-und-feedback').value.trim();
    
    if (!title || !category || !risk || !premi || !feedback) {
        alert('Mohon lengkapi semua kolom input formulir kasus.');
        return;
    }
    
    const newCase = {
        id: id || 'case-' + Date.now(),
        title,
        category,
        risk,
        premi,
        emoji,
        correctAnswer,
        feedback
    };
    
    if (id) {
        const idx = underwritingCases.findIndex(c => c.id === id);
        if (idx !== -1) underwritingCases[idx] = newCase;
    } else {
        underwritingCases.push(newCase);
    }
    
    localStorage.setItem('pa_underwriting_cases', JSON.stringify(underwritingCases));
    document.getElementById('modal-admin-underwriting').classList.remove('active');
    window.renderAdminUnderwritingCases();
    alert('Kasus underwriting berhasil disimpan!');
};

window.deleteAdminUnderwritingCase = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kasus underwriting ini?')) {
        const idx = underwritingCases.findIndex(c => c.id === id);
        if (idx !== -1) {
            underwritingCases.splice(idx, 1);
            localStorage.setItem('pa_underwriting_cases', JSON.stringify(underwritingCases));
            window.renderAdminUnderwritingCases();
        }
    }
};

// ==========================================
// ADMIN: GAME WORD DUEL MANAGEMENT
// ==========================================

window.renderAdminWordDuelQuestions = function() {
    const tbody = document.getElementById('admin-word-duel-rows');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    wordDuelQuestions.forEach((q, idx) => {
        const qId = q.id || 'word-' + idx;
        if (!q.id) q.id = qId;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${q.word}</strong></td>
            <td><span style="background-color:#e2e8f0; color:#334155; padding:4px 8px; border-radius:12px; font-size:12px; font-weight:600;">${q.category}</span></td>
            <td><p style="font-size:13px; color:var(--text-muted); margin:0;">${q.clue}</p></td>
            <td style="text-align:center;">
                <button onclick="window.showAddWordDuelModal('${q.id}')" style="background:#eab308; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px; margin-right:4px;">✏️ Edit</button>
                <button onclick="window.deleteAdminWordDuelQuestion('${q.id}')" style="background:#ef4444; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:12px;">🗑️ Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

window.showAddWordDuelModal = function(id = null) {
    const modal = document.getElementById('modal-admin-word-duel');
    const title = document.getElementById('adm-word-modal-title');
    if (!modal) return;
    
    document.getElementById('adm-wd-id').value = id || '';
    
    if (id) {
        title.innerText = 'Edit Istilah Word Duel';
        const q = wordDuelQuestions.find(item => item.id === id);
        if (q) {
            document.getElementById('adm-wd-word').value = q.word || '';
            document.getElementById('adm-wd-category').value = q.category || '';
            document.getElementById('adm-wd-clue').value = q.clue || '';
        }
    } else {
        title.innerText = 'Tambah Istilah Word Duel';
        document.getElementById('adm-wd-word').value = '';
        document.getElementById('adm-wd-category').value = '';
        document.getElementById('adm-wd-clue').value = '';
    }
    
    modal.classList.add('active');
};

window.saveAdminWordDuelQuestion = function() {
    const id = document.getElementById('adm-wd-id').value;
    const word = document.getElementById('adm-wd-word').value.trim().toUpperCase();
    const category = document.getElementById('adm-wd-category').value.trim();
    const clue = document.getElementById('adm-wd-clue').value.trim();
    
    if (!word || !category || !clue) {
        alert('Mohon lengkapi semua kolom input formulir istilah.');
        return;
    }
    
    const newQuestion = {
        id: id || 'word-' + Date.now(),
        word,
        category,
        clue
    };
    
    if (id) {
        const idx = wordDuelQuestions.findIndex(q => q.id === id);
        if (idx !== -1) wordDuelQuestions[idx] = newQuestion;
    } else {
        wordDuelQuestions.push(newQuestion);
    }
    
    localStorage.setItem('pa_word_duel_questions', JSON.stringify(wordDuelQuestions));
    document.getElementById('modal-admin-word-duel').classList.remove('active');
    window.renderAdminWordDuelQuestions();
    alert('Istilah word duel berhasil disimpan!');
};

window.deleteAdminWordDuelQuestion = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus istilah word duel ini?')) {
        const idx = wordDuelQuestions.findIndex(q => q.id === id);
        if (idx !== -1) {
            wordDuelQuestions.splice(idx, 1);
            localStorage.setItem('pa_word_duel_questions', JSON.stringify(wordDuelQuestions));
            window.renderAdminWordDuelQuestions();
        }
    }
};


window.renderCoachingCategories = function() {
    const listContainer = document.getElementById("coaching-categories-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    const paCoachings = JSON.parse(localStorage.getItem('pa_coachings')) || [];
    const trainerModules = paCoachings.map(c => {
        return {
            id: c.id,
            title: c.title,
            icon: "📝",
            goal: c.goal,
            summary: c.summary,
            duration: c.duration,
            video: c.video,
            fileName: c.fileName,
            tips: c.tips,
            checklist: c.checklist,
            isDynamic: true
        };
    });
    
    const defaultModules = [
        {
            id: "teknik-closing",
            title: "Teknik Closing Efektif",
            icon: "💡",
            goal: "Meningkatkan rasio closing menjadi 40% dari total presentasi",
            summary: "Panduan langkah demi langkah untuk menutup penjualan dengan persentase keberhasilan tinggi.",
            video: "https://www.youtube.com/watch?v=1_SVA1X6s1Y",
            fileName: "Panduan_Closing.pdf",
            duration: "3",
            tips: "Gunakan Urgency Close untuk mendorong keputusan cepat. Selalu ulang kembali manfaat yang disetujui prospek.",
            checklist: "Lakukan Assumptive Close pada 3 prospek\nBerikan penawaran terbatas pada 2 prospek\nBuat ringkasan manfaat untuk 5 klien",
            isDynamic: false
        },
        {
            id: "handling-objection",
            title: "Menangani Keberatan (Objection)",
            icon: "🛡️",
            goal: "Agen mampu menjawab 5 jenis penolakan paling umum dengan percaya diri",
            summary: "Cara profesional menghadapi penolakan dari prospek tanpa memaksa.",
            video: "https://www.youtube.com/watch?v=F_1WcK1yvO0",
            fileName: "Skrip_Jawaban_Objection.pdf",
            duration: "5",
            tips: "Dengarkan dengan empati dan jangan menyela. Fokus pada nilai jangka panjang, bukan hanya harga premi.",
            checklist: "Catat 3 penolakan prospek hari ini\nGunakan teknik Feel, Felt, Found minimal 2 kali",
            isDynamic: false
        },
        {
            id: "prospecting",
            title: "Strategi Prospecting",
            icon: "🎯",
            goal: "Mendapatkan minimal 10 prospek baru per minggu",
            summary: "Cara mendapatkan prospek berkualitas secara konsisten setiap minggu.",
            video: "https://www.youtube.com/watch?v=Jm21uXp4qB8",
            fileName: "Template_Pesan_Sosmed.docx",
            duration: "7",
            tips: "Manfaatkan jaringan atau referal dari klien yang puas (Word of Mouth).",
            checklist: "Kumpulkan 10 referal dari klien\nPosting konten edukasi asuransi di media sosial\nHubungi 5 kenalan dari komunitas hobi",
            isDynamic: false
        },
        {
            id: "fact-finding",
            title: "Fact Finding & Analisis Kebutuhan",
            icon: "🔍",
            goal: "Menganalisa profil risiko nasabah dengan akurat",
            summary: "Menemukan akar permasalahan finansial calon nasabah sebelum menawarkan solusi.",
            video: "https://www.youtube.com/watch?v=3A0ZpT7E0x4",
            duration: "2",
            tips: "Gunakan pertanyaan terbuka (5W1H) untuk memancing nasabah bercerita.",
            checklist: "Lakukan fact finding lengkap dengan 2 prospek\nPetakan struktur keluarga prospek sebelum presentasi produk",
            isDynamic: false
        }
    ];

    const modules = [...trainerModules, ...defaultModules];

    modules.forEach(mod => {
        const btn = document.createElement("button");
        btn.className = "sidebar-link"; // Menggunakan class sidebar-link agar terlihat rapi seperti tombol sidebar
        btn.style.textAlign = "left";
        btn.style.padding = "10px 15px";
        btn.style.marginBottom = "5px";
        btn.style.width = "100%";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.innerHTML = `<span style="margin-right:8px; font-size:18px;">${mod.icon}</span> <span style="font-weight:500;">${mod.title}</span>`;
        btn.onclick = () => window.renderCoachingDetail(mod, btn);
        listContainer.appendChild(btn);
    });
};

window.renderCoachingDetail = function(module, activeBtn) {
    const listContainer = document.getElementById("coaching-categories-list");
    if (listContainer) {
        const btns = listContainer.querySelectorAll('button');
        btns.forEach(b => b.classList.remove('active'));
    }
    if (activeBtn) activeBtn.classList.add('active');

    const detailContainer = document.getElementById("coaching-detail-content");
    if (!detailContainer) return;
    
    let checklistHTML = "";
    if (module.checklist) {
        const listItems = module.checklist.split('\n').filter(l => l.trim() !== "");
        if (listItems.length > 0) {
            checklistHTML = listItems.map((item, idx) => `
                <div style="display:flex; align-items:flex-start; gap:12px; padding:12px 15px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; margin-bottom:10px; transition: all 0.2s;">
                    <input type="checkbox" id="chk-${module.id}-${idx}" style="width:20px; height:20px; margin-top:2px; cursor:pointer; accent-color:#0ea5e9;">
                    <label for="chk-${module.id}-${idx}" style="margin:0; cursor:pointer; font-size:15px; color:#334155; line-height:1.5;">${item}</label>
                </div>
            `).join('');
        }
    } else {
        checklistHTML = "<p style='color:var(--text-muted); font-size:14px; font-style:italic;'>Tidak ada target aktivitas spesifik yang harus diceklis.</p>";
    }

    let videoHTML = "";
    if (module.video) {
        let embedUrl = module.video;
        if (embedUrl.includes("watch?v=")) {
            embedUrl = embedUrl.replace("watch?v=", "embed/");
            // Menghapus parameter tambahan jika ada, misal &t=1s
            if (embedUrl.includes("&")) {
                embedUrl = embedUrl.split("&")[0];
            }
        }
        videoHTML = `
            <div style="margin-top:20px; position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <iframe src="${embedUrl}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }

    let headerTags = "";
    if (module.duration) headerTags += `<span style="background:#dcfce7; color:#166534; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; display:inline-flex; align-items:center; gap:4px;">⏱️ Target: ${module.duration} Hari</span>`;
    if (module.fileName) headerTags += `<span style="background:#e0f2fe; color:#0369a1; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; display:inline-flex; align-items:center; gap:4px;">📄 Lampiran Tersedia</span>`;

    detailContainer.innerHTML = `
        <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; overflow: hidden;">
            
            <!-- Header Section -->
            <div style="padding: 30px; border-bottom: 1px solid #e2e8f0; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);">
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                    <div style="font-size:48px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${module.icon}</div>
                    <div>
                        <h2 style="margin:0; color:#0f172a; font-size:26px; font-weight:700;">${module.title}</h2>
                        <div style="display:flex; gap:8px; margin-top:8px;">${headerTags}</div>
                    </div>
                </div>
                ${module.goal ? `<p style="margin:0 0 10px 0; color:#059669; font-weight:600; font-size:15px;">🎯 Tujuan: ${module.goal}</p>` : ''}
                ${module.summary ? `<div style="margin-top:15px;"><strong style="color:#334155; font-size:15px;">📝 Ringkasan Materi:</strong><p style="color:#475569; font-size:15px; line-height:1.6; margin:6px 0 0 0;">${module.summary}</p></div>` : ''}
                ${videoHTML}
                ${module.fileName ? `<div style="margin-top:15px;"><a href="#" style="display:inline-flex; align-items:center; gap:8px; color:#0284c7; font-weight:600; text-decoration:none; padding:8px 12px; background:#f0f9ff; border-radius:6px; border:1px solid #bae6fd;">⬇️ Unduh Modul Pendukung: ${module.fileName}</a></div>` : ''}
            </div>

            <!-- Body Section -->
            <div style="padding: 30px;">
                
                ${module.tips ? `
                <div style="margin-bottom: 30px; padding: 20px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <h4 style="color: #1d4ed8; margin-top:0; margin-bottom: 10px; display:flex; align-items:center; gap:8px; font-size:16px;">
                        💡 Tips dari Trainer
                    </h4>
                    <p style="font-size: 14px; color: #1e3a8a; margin: 0; white-space: pre-line; line-height:1.6;">${module.tips}</p>
                </div>` : ''}

                <!-- Checklist Interaktif -->
                <h3 style="margin-top:0; margin-bottom:15px; font-size:18px; color:#0f172a; border-bottom:2px solid #f1f5f9; padding-bottom:10px;">
                    ✅ Checklist Aktivitas Agen
                </h3>
                <div style="margin-bottom:25px;">
                    ${checklistHTML}
                </div>

                <!-- Upload Bukti -->
                <div class="form-group" style="margin-bottom:35px; background:#f8fafc; padding:20px; border-radius:8px; border:1px dashed #cbd5e1;">
                    <label style="font-weight:600; color:#334155; margin-bottom:10px; display:block; font-size:15px;">
                        📁 Upload Bukti Aktivitas Lapangan
                    </label>
                    <input type="file" id="agen-coach-file" style="width:100%; padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer;" accept="image/*,.pdf,.doc,.docx">
                    <small style="color:#64748b; display:block; margin-top:8px;">Format yang didukung: JPG, PNG, PDF, DOC. Lampirkan foto meeting atau catatan klien.</small>
                </div>

                <!-- Self Assessment Form -->
                <div style="background:#f1f5f9; padding:25px; border-radius:10px;">
                    <h3 style="margin-top:0; margin-bottom:15px; font-size:18px; color:#0f172a;">Self Assessment (Evaluasi Diri)</h3>
                    
                    <div class="form-group" style="margin-bottom:20px;">
                        <label style="font-weight:600; color:#334155; font-size:14px;">Tingkat Pemahaman Materi</label>
                        <select id="agen-coach-level" style="width:100%; padding:12px; border-radius:6px; border:1px solid #cbd5e1; margin-top:8px; font-size:14px;">
                            <option value="">-- Pilih Tingkat Pemahaman --</option>
                            <option value="Sangat Paham">Sangat Paham - Siap dipraktekkan secara mandiri</option>
                            <option value="Cukup Paham">Cukup Paham - Masih butuh sedikit latihan</option>
                            <option value="Kurang Paham">Kurang Paham - Perlu bimbingan lanjutan dari Trainer</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-bottom:25px;">
                        <label style="font-weight:600; color:#334155; font-size:14px;">Kendala yang Dihadapi (Opsional)</label>
                        <textarea id="agen-coach-obstacle" rows="3" placeholder="Ceritakan kendala Anda saat mempraktekkan materi ini di lapangan..." style="width:100%; padding:12px; border-radius:6px; border:1px solid #cbd5e1; margin-top:8px; font-family:inherit; font-size:14px;"></textarea>
                    </div>

                    <button class="btn-primary" style="width:100%; padding:16px; font-size:16px; font-weight:bold; display:flex; justify-content:center; align-items:center; gap:10px; border-radius:8px;" onclick="window.submitCoachingReport('${module.id}')">
                        🚀 Submit Laporan Coaching
                    </button>
                </div>
                
            </div>
        </div>
    `;
};

window.submitCoachingReport = function(moduleId) {
    const level = document.getElementById("agen-coach-level").value;
    if (!level) {
        alert("Peringatan: Silakan pilih tingkat pemahaman Anda terlebih dahulu di bagian Self Assessment.");
        return;
    }
    
    // Check if any checkbox exists and at least one is checked (optional validation, skipped for simplicity)
    
    alert("Berhasil! Laporan Coaching Anda telah disubmit.\\nTrainer Anda akan meninjau progres dan bukti aktivitas yang telah dilampirkan.");
};


window.toggleSidebar = function() {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
};

// ==================== FUNGSI JADWAL TRAINING (AGEN) ====================

function getFlyerUrl(title) {
    const t = (title || "").toLowerCase();
    if (t.includes("marine") || t.includes("cargo") || t.includes("pengangkutan")) {
        return "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=600&auto=format&fit=crop";
    }
    if (t.includes("travel") || t.includes("perjalanan")) {
        return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop";
    }
    if (t.includes("growing") || t.includes("trees") || t.includes("pohon")) {
        return "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop";
    }
    if (t.includes("heavy") || t.includes("equipment") || t.includes("alat berat")) {
        return "https://images.unsplash.com/photo-1579684389782-64d84b5e905a?q=80&w=600&auto=format&fit=crop";
    }
    if (t.includes("level 3") || t.includes("dasar keagenan")) {
        return "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop";
    }
    if (t.includes("paydi")) {
        return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop";
}

window.openFlyerLightbox = function(imageSrc) {
    // Hapus overlay lama jika ada
    const old = document.getElementById('flyer-lightbox-overlay');
    if (old) old.remove();

    // Buat overlay baru
    const overlay = document.createElement('div');
    overlay.id = 'flyer-lightbox-overlay';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0',
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.92)',
        zIndex: '2147483647',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out'
    });
    overlay.onclick = function(e) {
        if (e.target === overlay) overlay.remove();
    };

    // Tombol tutup
    const closeBtn = document.createElement('div');
    Object.assign(closeBtn.style, {
        position: 'absolute', top: '20px', right: '20px',
        width: '44px', height: '44px',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '28px', color: '#fff',
        lineHeight: '1', fontWeight: '300', zIndex: '10',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
    });
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() { overlay.remove(); };

    // Gambar
    const img = document.createElement('img');
    img.src = imageSrc;
    Object.assign(img.style, {
        maxWidth: '90vw', maxHeight: '88vh',
        objectFit: 'contain',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        display: 'block', cursor: 'default'
    });
    img.onclick = function(e) { e.stopPropagation(); };

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
};

window.closeFlyerLightbox = function() {
    const overlay = document.getElementById('flyer-lightbox-overlay');
    if (overlay) overlay.remove();
};

// Inisialisasi Data Training jika kosong
function initTrainingData() {
    const raw = localStorage.getItem("pa_trainings");
    if (!raw || raw === "[]" || (Array.isArray(JSON.parse(raw)) && JSON.parse(raw).length === 0)) {
        const defaultTrainings = [
            {
                id: "tr-001",
                title: "Sertifikasi Keagenan Level 3 (Dasar Keagenan)",
                time: Date.now() - 3600000, 
                method: "Online Zoom Meeting",
                quota: "100 Peserta",
                token: "1234",
                pdf: "#",
                quiz: [
                    { q: "Apa yang dimaksud dengan Insurable Interest?", a: "Kepentingan finansial yang sah", b: "Diskon premi", c: "Batal demi hukum", d: "Klaim ganda", correct: "a" },
                    { q: "Prinsip Utmost Good Faith mewajibkan agen untuk?", a: "Menutupi penyakit", b: "Memberi diskon", c: "Mengungkap fakta material secara jujur", d: "Membayar premi", correct: "c" }
                ]
            },
            {
                id: "tr-002",
                title: "Sertifikasi Khusus - Produk PAYDI",
                time: Date.now() + (24 * 3600000), 
                method: "Offline (Kantor Pusat)",
                quota: "50 Peserta",
                token: "8888",
                pdf: "#",
                quiz: [
                    { q: "PAYDI adalah singkatan dari?", a: "Produk Asuransi Yang Dikaitkan dengan Investasi", b: "Premi Asuransi Yang Dibayar", c: "Polis Asuransi Yang Diperbarui", d: "Pusat Asuransi Yang Diotorisasi", correct: "a" }
                ]
            }
        ];
        localStorage.setItem("pa_trainings", JSON.stringify(defaultTrainings));
    }
}

window.renderJadwalTrainingSection = function(userRole) {
    const trainingContainer = document.getElementById('agen-training-grid'); 
    if (!trainingContainer) return;

    if (userRole === 'Trainer' || userRole === 'Admin') {
        const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
        
        let activeClassesHtml = '';
        trainings.forEach(t => {
            // Simulated attendance count
            const attendance = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
            let registeredCount = 0;
            for(let key in attendance) {
                if(attendance[key][t.id]) registeredCount++;
            }
            
            // formatting time
            const dateObj = new Date(t.time);
            const dateStr = dateObj.toLocaleDateString('id-ID') + ', ' + dateObj.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'}) + ' WIB';
            
            activeClassesHtml += `
                <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    <h5 style="margin: 0 0 10px 0; font-size: 15px;">${t.title}</h5>
                    <p style="margin: 3px 0; font-size: 12px; color: #555;">📅 ${dateStr}</p>
                    <p style="margin: 3px 0; font-size: 12px; color: #555;">📍 Media: ${t.method}</p>
                    <p style="margin: 3px 0; font-size: 12px; color: #555;">👥 Terdaftar: ${registeredCount} / ${t.quota}</p>
                    <div style="margin-top: 15px; background: #e8f4fd; padding: 8px; border-radius: 4px; text-align: center;">
                        <span style="font-size: 11px; color: #0056b3; display: block;">TOKEN KEHADIRAN AKTIF:</span>
                        <strong style="font-size: 16px; color: #0056b3;">${t.token}</strong>
                    </div>
                </div>
            `;
        });

        trainingContainer.innerHTML = `
            <div style="padding: 20px; font-family: sans-serif; grid-column: 1 / -1;">
                <h3 style="margin-bottom: 5px;">Manajemen Jadwal Training (Mode ${userRole})</h3>
                <p style="color: #666; font-size: 13px; margin-bottom: 20px;">Buat jadwal kelas, tentukan kuota, dan generate token kehadiran untuk agen.</p>
                
                <!-- FORM BUAT JADWAL BARU -->
                <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 25px; max-width: 600px;">
                    <h4 style="margin-top: 0; margin-bottom: 15px;">+ Buat Kelas Training Baru</h4>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <input type="text" id="new-tr-title" placeholder="Nama Topik Training (Contoh: Produk Surety Bond Level 4)" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <div style="display: flex; gap: 10px;">
                            <input type="datetime-local" id="new-tr-time" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <input type="text" id="new-tr-method" placeholder="Metode (Zoom / Tatap Muka)" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <input type="url" id="new-tr-flyer" placeholder="Tautan URL Gambar Flyer Training (Opsional)" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <input type="number" id="new-tr-quota" placeholder="Kuota Peserta" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <button style="padding: 10px; background: #007bff; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;" onclick="publishNewTraining()">Publikasikan Jadwal</button>
                    </div>
                </div>

                <!-- DAFTAR KELAS YANG SEDANG BERJALAN -->
                <h4>Daftar Kelas Aktif & Kontrol Token</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
                    ${activeClassesHtml}
                </div>
            </div>
        `;
    } else {
        renderJadwalTrainingUntukAgen();
    }
}

window.publishNewTraining = function() {
    const title = document.getElementById('new-tr-title').value;
    const timeStr = document.getElementById('new-tr-time').value;
    const method = document.getElementById('new-tr-method').value;
    const quota = document.getElementById('new-tr-quota').value;
    const flyerUrl = document.getElementById('new-tr-flyer') ? document.getElementById('new-tr-flyer').value : "";
    
    if(!title || !timeStr || !method || !quota) {
        alert("Mohon lengkapi semua field form pembuatan kelas.");
        return;
    }
    
    const time = new Date(timeStr).getTime();
    const token = Math.floor(1000 + Math.random() * 9000).toString(); // Generate random 4 digit token
    const id = "tr-" + Math.floor(Math.random() * 100000);
    
    const newTraining = {
        id: id,
        title: title,
        time: time,
        method: method,
        quota: quota + " Peserta",
        token: token,
        pdf: "#",
        flyerUrl: flyerUrl,
        quiz: [] // Kuis dapat diatur di menu lain
    };
    
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    trainings.unshift(newTraining); // Add to top
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    
    alert("Jadwal kelas berhasil dipublikasikan! Token akses adalah: " + token);
    
    // Refresh the view
    renderAgenTrainings();
};

window.renderAgenTrainings = function() {
    const role = sessionStorage.getItem('currentUserRole') || 'Agen';
    renderJadwalTrainingSection(role);
    if (typeof window.renderSyllabusUI === 'function') window.renderSyllabusUI();
};

window.renderJadwalTrainingUntukAgen = function() {
    initTrainingData();
    const grid = document.getElementById("agen-training-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const attendance = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
    const user = JSON.parse(sessionStorage.getItem('pa_active_user'));
    const email = (user && user.email) ? user.email : "demo@agen.com";
    const myAttendance = attendance[email] || {};
    
    // Sanitasi data attempts yang corrupt (akibat bug double-submit sebelumnya)
    let attemptsData = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
    let needsSave = false;
    if (attemptsData[email]) {
        for (const tid in attemptsData[email]) {
            const rec = attemptsData[email][tid];
            if (rec && rec.attempts > 2 && !rec.passed) {
                rec.attempts = 2; // cap ke maksimum
                needsSave = true;
            }
            if (rec && rec.attempts < 0) {
                rec.attempts = 0;
                needsSave = true;
            }
        }
        if (needsSave) localStorage.setItem("pa_training_quiz_attempts", JSON.stringify(attemptsData));
    }
    const myAttempts = attemptsData[email] || {};

    trainings.forEach(t => {
        let isRSVP = myAttendance[t.id] && myAttendance[t.id].status === "RSVP";
        let isHadir = myAttendance[t.id] && myAttendance[t.id].status === "Hadir";
        let attemptData = myAttempts[t.id] || { attempts: 0, passed: false };

        let actionBtnHTML = "";
        
        const isCompleted = t.status === "Completed";
        const isExpired = Date.now() > t.time;
        const pdfMap = {
            'tr-001': '/materi_pdf/1. Prinsip Dasar Asuransi.pdf',
            'tr-002': '/materi_pdf/3. Produk Asuransi Umum 300925.pdf',
        };
        const pdfUrl = (t.pdf && t.pdf !== '#') ? t.pdf : (pdfMap[t.id] || '/materi_pdf/1. Prinsip Dasar Asuransi.pdf');

        if (attemptData.passed) {
            // Kondisi D: Setelah Lulus Kuis -> Tampilkan tombol utama 'Download Sertifikat Resmi'
            actionBtnHTML = `
                <button class="btn-primary" style="width:100%; background:#f59e0b; border:none; box-shadow:0 4px 10px rgba(245,158,11,0.25);" onclick="window.openPrintCertificate('${t.title}', '${attemptData.bestScore || 100}')">🏆 Download Sertifikat Resmi</button>
            `;
        } else if (isHadir) {
            // Kondisi C: Setelah Token Diisi -> Tampilkan dua tombol sejajar (Unduh Materi PDF dan Ikuti Kuis Singkat)
            let kuisBtnHtml = "";
            if (attemptData.attempts >= 2) {
                kuisBtnHtml = `<button class="btn-secondary btn-training-half" style="opacity:0.5; cursor:not-allowed; background:#f1f5f9; color:#64748b; border:1px solid #cbd5e1;" disabled>❌ Kuis (Habis)</button>`;
            } else {
                kuisBtnHtml = `<button class="btn-primary btn-training-half" onclick="openTrainingQuiz('${t.id}')">📝 Ikuti Kuis</button>`;
            }

            actionBtnHTML = `
                <div class="training-card-row">
                    <a href="${pdfUrl}" target="_blank" rel="noopener" class="btn-primary btn-training-pdf" style="background:#3b82f6; border:none; display:flex; align-items:center; justify-content:center; text-decoration:none; padding:10px 0; border-radius:8px; color:white; font-weight:600; box-sizing:border-box;">📄 PDF</a>
                    ${kuisBtnHtml}
                </div>
            `;
        } else if (isRSVP) {
            let pretestAttempts = JSON.parse(localStorage.getItem("pa_training_pretest_attempts")) || {};
            let myPretest = (pretestAttempts[email] && pretestAttempts[email][t.id]) ? pretestAttempts[email][t.id] : null;
            let pretestScore = (myAttendance[t.id] && myAttendance[t.id].pretestScore !== undefined) ? myAttendance[t.id].pretestScore : (myPretest ? myPretest.score : null);

            let pretestBadgeHtml = (pretestScore !== null) ? 
                `<div style="font-size:11.5px; color:#0369a1; background:#e0f2fe; border:1px solid #bae6fd; border-radius:6px; padding:4px 8px; margin-top:8px; font-weight:700; display:flex; align-items:center; gap:4px; justify-content:center; width:100%; box-sizing:border-box;">📊 Skor Pre-Test: ${pretestScore}/100</div>` : '';

            if (isCompleted || isExpired) {
                // Kondisi B: Training Selesai & sudah RSVP -> Tampilkan tombol 'Konfirmasi Kehadiran'
                actionBtnHTML = `
                    <button class="btn-primary" style="width:100%;" onclick="openTokenModal('${t.id}')">Konfirmasi Kehadiran</button>
                    ${pretestBadgeHtml}
                `;
            } else {
                // Kondisi A Awal: Hanya tampilkan tombol 'RSVP Berhasil'
                actionBtnHTML = `
                    <button class="btn-primary" style="width:100%; background:#10b981; border:none; cursor:default;" disabled>✅ RSVP Berhasil</button>
                    ${pretestBadgeHtml}
                `;
            }
        } else {
            // Belum RSVP sama sekali
            if (isCompleted || isExpired) {
                actionBtnHTML = `
                    <button class="btn-secondary" style="width:100%; opacity:0.6; cursor:not-allowed; background:#f1f5f9; color:#64748b; border:1px solid #cbd5e1;" disabled>❌ Sesi Telah Berakhir</button>
                `;
            } else {
                actionBtnHTML = `
                    <button class="btn-primary" style="width:100%;" onclick="window.rsvpTraining('${t.id}')">Daftar (RSVP) Sekarang</button>
                `;
            }
        }

        const defaultFlyer = getFlyerUrl(t.title);
        const flyerImageSrc = (t.flyerUrl && t.flyerUrl.trim() !== "") ? t.flyerUrl.trim() : defaultFlyer;
        
        const card = document.createElement("div");
        card.className = "content-card training-compact-card";
        
        // Build card HTML — src gambar TIDAK disisipkan ke innerHTML untuk menghindari bug Base64
        const tDate = new Date(t.time);
        const hariList = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        const hariNama = hariList[tDate.getDay()];
        const tanggal = tDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        const jam = tDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

        const isTatapMuka = !t.method.toLowerCase().includes('zoom') && !t.method.toLowerCase().includes('online');
        const lokasiHTML = isTatapMuka ? `
        <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#4b5563; margin-bottom: 8px; background: #f3f4f6; border-radius: 6px; padding: 6px 10px; border: 1px dashed #d1d5db;">
            <span style="font-size:14px;">📍</span>
            <span>Lokasi: <strong style="color:#111827;">${t.link || 'Kantor Pusat ASM'}</strong></span>
        </div>` : '';

        let zoomLinkHTML = "";
        if (!isTatapMuka && (isRSVP || isHadir)) {
            const zoomUrl = (t.link && t.link.startsWith('http')) ? t.link : 'https://zoom.us/j/1234567890';
            const mId = t.zoomId ? t.zoomId : '-';
            const mPw = t.zoomPw ? t.zoomPw : '-';
            
            zoomLinkHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; border-bottom: 1px dashed #bbf7d0; padding-bottom: 6px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:14px;">🎥</span>
                        <span style="font-size:12px; font-weight:700; color:#166534;">Link Zoom:</span>
                    </div>
                    <a href="${zoomUrl}" target="_blank" rel="noopener" style="padding: 4px 10px; font-size: 11px; text-decoration: none; background: #15803d; border: none; border-radius: 6px; color: white; font-weight: bold; text-align: center; white-space: nowrap; box-shadow: 0 2px 4px rgba(21,128,61,0.2);">Gabung Zoom</a>
                </div>
                <div style="display: flex; flex-direction: column; gap: 3px; font-size: 11px; color: #166534;">
                    <div>🆔 ID Rapat: <strong style="color:#14532d;">${mId}</strong></div>
                    <div>🔑 Passcode: <strong style="color:#14532d;">${mPw}</strong></div>
                </div>
            </div>
            `;
        }

        card.innerHTML = `
        <div class="training-flyer-wrapper" style="cursor:zoom-in; position:relative;">
            <img class="flyer-thumb" alt="Flyer ${t.title.replace(/"/g,'&quot;')}" style="width:100%; height:140px; object-fit:cover; display:block; border-radius:8px 8px 0 0; transition:transform 0.3s ease;">
            <div class="training-method-badge">${t.method}</div>
            <div style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,0.55);color:#fff;font-size:11px;padding:3px 8px;border-radius:12px;backdrop-filter:blur(4px);">🔍 Klik untuk perbesar</div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 14px 16px;">
            <div style="flex:1;">
                <h3 style="font-size:14px; color:var(--primary-navy); margin-bottom:10px; font-weight: 700; line-height:1.4;">${t.title}</h3>
                
                <!-- Blok Tanggal Premium -->
                <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #bfdbfe; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                        <span style="font-size:18px;">📅</span>
                        <div>
                            <div style="font-size:13px; font-weight:800; color:#1d4ed8; letter-spacing:0.3px;">${hariNama}, ${tanggal}</div>
                            <div style="font-size:12px; font-weight:600; color:#3b82f6; margin-top:1px;">🕐 Pukul ${jam}</div>
                        </div>
                    </div>
                </div>

                ${lokasiHTML}
                ${zoomLinkHTML}

                <div style="display:flex; align-items:center; gap:5px; font-size:12px; color:var(--text-muted);">
                    <span>👥</span>
                    <span>Kuota: <strong style="color:#374151;">${t.quota}</strong></span>
                </div>
            </div>
            <div style="margin-top:12px; border-top:1px solid #e2e8f0; padding-top:12px; width: 100%;">
                ${actionBtnHTML}
            </div>
        </div>
        `;

        // Pasang src dan onclick ke wrapper (lebih reliable) — aman untuk Base64 panjang
        const imgEl = card.querySelector('.flyer-thumb');
        const wrapperEl = card.querySelector('.training-flyer-wrapper');
        if (imgEl) {
            imgEl.src = flyerImageSrc;
            imgEl.onerror = function() { this.onerror = null; this.src = defaultFlyer; };
        }
        if (wrapperEl) {
            // Simpan src di dataset agar tidak bergantung pada this.src saat klik
            wrapperEl.dataset.flyer = flyerImageSrc;
            wrapperEl.addEventListener('click', function() {
                const src = this.dataset.flyer || (this.querySelector('.flyer-thumb') ? this.querySelector('.flyer-thumb').src : '');
                window.openFlyerLightbox(src);
            });
        }

        grid.appendChild(card);
    });
};

// ==================== BANK SOAL PRE-TEST TRAINING ====================
const PRETEST_QUESTION_BANK = {
    default: [
        { q: "Apa fungsi utama dari asuransi dalam perlindungan finansial ekonomi?", a: "Menghilangkan seluruh kemungkinan terjadinya risiko fisik", b: "Pengalihan dampak kerugian finansial atas risiko tak terduga (Risk Transfer)", c: "Investasi dengan jaminan imbal hasil pasti di atas deposito", d: "Menghindari kewajiban pelaporan pajak tahunan", correct: "b" },
        { q: "Siapa pihak yang berkewajiban membayar premi dalam polis asuransi?", a: "Perusahaan Asuransi (Penanggung)", b: "Tertanggung atau Pemegang Polis", c: "Agen Penjual Asuransi", d: "Pialang Asuransi", correct: "b" },
        { q: "Prinsip dasar 'Indemnity' dalam asuransi umum bertujuan untuk?", a: "Memberikan keuntungan finansial tambahan kepada nasabah", b: "Mengembalikan posisi keuangan tertanggung ke kondisi sesaat sebelum kerugian terjadi", c: "Melipatgandakan nilai klaim jika premi lunas", d: "Menangguhkan kewajiban bayar penanggung", correct: "b" }
    ],
    property: [
        { q: "Objek apa sajakah yang dapat dipertanggungkan dalam Polis Standar Asuransi Kebakaran Indonesia (PSAKI)?", a: "Hanya dokumen berharga dan uang tunai", b: "Bangunan, mesin pabrik, perabot, dan persediaan barang dagangan (stok)", c: "Kendaraan bermotor yang sedang melintas di jalan raya", d: "Kesehatan pribadi karyawan kantor", correct: "b" },
        { q: "Klausul apa yang menjamin hilangnya laba usaha akibat bangunan tempat usaha terbakar?", a: "Total Loss Only (TLO)", b: "Business Interruption / Consequential Loss (Kehilangan Keuntungan Usaha)", c: "Subrogasi Otomatis", d: "Klausul Pro-rata Premi", correct: "b" },
        { q: "Ketentuan 'Cash Before Cover' (CBC) dalam penerbitan polis berarti?", a: "Klaim dibayar di muka sebelum survei", b: "Premi wajib dilunasi terlebih dahulu agar jaminan asuransi berlaku efektif", c: "Polis dapat diterbitkan secara gratis selama 30 hari", d: "Diskon tunai untuk nasabah korporat", correct: "b" }
    ],
    motor: [
        { q: "Apa perbedaan mendasar antara jaminan Comprehensive (All Risk) dan Total Loss Only (TLO) pada PSAKOB?", a: "TLO menjamin kerusakan kecil seperti baret atau penyok ringan", b: "Comprehensive menjamin kerugian sebagian (partial) hingga total, sedangkan TLO hanya menjamin kerugian di atas 75%", c: "TLO memiliki tarif premi yang jauh lebih mahal", d: "Comprehensive tidak menjamin risiko kehilangan/pencurian", correct: "b" },
        { q: "Risiko apa yang TIDAK dijamin secara standar dalam PSAKOB kecuali diperluas?", a: "Tabrakan di jalan tol", b: "Banjir, angin topan, gempa bumi, dan huru-hara (SRCC)", c: "Terguling akibat jalanan licin", d: "Benturan dengan dinding atau pohon tumbang", correct: "b" },
        { q: "Apa yang dimaksud dengan Risiko Sendiri (Deductible / Own Risk)?", a: "Bonus yang diberikan jika tidak ada klaim dalam 1 tahun", b: "Jumlah biaya tertentu yang harus ditanggung sendiri oleh nasabah untuk setiap kejadian klaim", c: "Komisi tambahan untuk agen penjual", d: "Biaya administrasi pencetakan polis", correct: "b" }
    ],
    surety: [
        { q: "Dalam mekanisme Surety Bond, pihak yang memberikan jaminan kepada pemilik proyek (Obligee) disebut?", a: "Principal (Kontraktor)", b: "Surety (Perusahaan Asuransi Penjamin)", c: "Obligee (Pemilik Proyek)", d: "Konsultan Pengawas Proyek", correct: "b" },
        { q: "Jaminan yang dipersyaratkan bagi kontraktor saat mengikuti lelang tender proyek adalah?", a: "Performance Bond (Jaminan Pelaksanaan)", b: "Bid Bond (Jaminan Penawaran Lelang)", c: "Advance Payment Bond (Jaminan Uang Muka)", d: "Maintenance Bond (Jaminan Pemeliharaan)", correct: "b" },
        { q: "Apa fungsi utama dari Kontra Bank Garansi (Counter Guarantee)?", a: "Sebagai polis tabungan kontraktor", b: "Jaminan perusahaan asuransi kepada pihak Bank untuk penerbitan Bank Garansi bagi kontraktor", c: "Pengganti uang muka proyek pembangunan", d: "Pelunasan hutang pajak proyek", correct: "b" }
    ]
};

window.getPretestQuestionsForTraining = function(trainingTitle, trainingObj) {
    if (trainingObj && trainingObj.pretest && Array.isArray(trainingObj.pretest) && trainingObj.pretest.length > 0) {
        return trainingObj.pretest;
    }
    const title = (trainingTitle || '').toLowerCase();
    if (title.includes('properti') || title.includes('property') || title.includes('kebakaran') || title.includes('psakbi')) {
        return PRETEST_QUESTION_BANK.property;
    } else if (title.includes('kendaraan') || title.includes('motor') || title.includes('mobil') || title.includes('psakob')) {
        return PRETEST_QUESTION_BANK.motor;
    } else if (title.includes('surety') || title.includes('garansi') || title.includes('bonding')) {
        return PRETEST_QUESTION_BANK.surety;
    }
    return PRETEST_QUESTION_BANK.default;
};

let currentPretestTrainingId = null;

// Buka Modal Pre-Test saat Agen Klik 'Daftar (RSVP) Sekarang'
window.rsvpTraining = function(id) {
    if (!id || id === 'undefined') {
        if (window.showToast) window.showToast("ID training tidak valid.", "error");
        return;
    }

    try {
        let user = null;
        try {
            const storedUser = sessionStorage.getItem('pa_active_user');
            if (storedUser && storedUser !== "undefined") user = JSON.parse(storedUser);
        } catch(e) {}
        const email = (user && user.email) ? user.email : "demo@agen.com";

        let att = {};
        try {
            const storedAtt = localStorage.getItem("pa_training_attendance");
            if (storedAtt) att = JSON.parse(storedAtt) || {};
        } catch(e) {}

        // Cek jika sudah RSVP
        if (att[email] && att[email][id] && att[email][id].status === "RSVP") {
            if (window.showToast) window.showToast("Anda sudah terdaftar (RSVP) di training ini.", "info");
            else alert("Anda sudah terdaftar di training ini.");
            return;
        }

        // Buka Modal Pre-Test
        window.openTrainingPretestModal(id);
    } catch(err) {
        alert("Terjadi kesalahan: " + err.message);
    }
};

window.openTrainingPretestModal = function(trainingId) {
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trn = trainings.find(t => t.id === trainingId) || { id: trainingId, title: "Live Training Interaktif" };

    currentPretestTrainingId = trainingId;

    const modal = document.getElementById("modal-training-pretest");
    if (!modal) return;

    const titleEl = document.getElementById("agen-pretest-title");
    if (titleEl) titleEl.innerText = `Pre-Test: ${trn.title}`;

    const subtitleEl = document.getElementById("agen-pretest-subtitle");
    if (subtitleEl) subtitleEl.innerText = `Selesaikan pertanyaan asesmen dasar untuk mengonfirmasi pendaftaran (RSVP) kelas "${trn.title}".`;

    const container = document.getElementById("agen-pretest-questions-container");
    if (container) {
        container.innerHTML = "";
        const questions = window.getPretestQuestionsForTraining(trn.title, trn);

        questions.forEach((q, i) => {
            const card = document.createElement("div");
            card.style.cssText = "background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 14px;";
            card.innerHTML = `
                <p style="font-weight: 700; margin: 0 0 10px 0; font-size: 13.5px; color: #0f172a; line-height: 1.5;">
                    <span style="background: #0284c7; color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 6px;">${i+1}</span>
                    ${q.q}
                </p>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <label style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12.5px; cursor: pointer; color: #334155; transition: all 0.2s;">
                        <input type="radio" name="pretest_q_${i}" value="a" required style="accent-color: #0284c7;">
                        <span><strong>A.</strong> ${q.a}</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12.5px; cursor: pointer; color: #334155; transition: all 0.2s;">
                        <input type="radio" name="pretest_q_${i}" value="b" required style="accent-color: #0284c7;">
                        <span><strong>B.</strong> ${q.b}</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12.5px; cursor: pointer; color: #334155; transition: all 0.2s;">
                        <input type="radio" name="pretest_q_${i}" value="c" required style="accent-color: #0284c7;">
                        <span><strong>C.</strong> ${q.c}</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12.5px; cursor: pointer; color: #334155; transition: all 0.2s;">
                        <input type="radio" name="pretest_q_${i}" value="d" required style="accent-color: #0284c7;">
                        <span><strong>D.</strong> ${q.d}</span>
                    </label>
                </div>
            `;
            container.appendChild(card);
        });
    }

    modal.classList.add("active");
};

window.hideTrainingPretestModal = function() {
    const modal = document.getElementById("modal-training-pretest");
    if (modal) modal.classList.remove("active");
};

window.submitTrainingPretest = function(e) {
    if (e) e.preventDefault();

    if (!currentPretestTrainingId) {
        window.hideTrainingPretestModal();
        return;
    }

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trn = trainings.find(t => t.id === currentPretestTrainingId) || { id: currentPretestTrainingId, title: "Training" };
    const questions = window.getPretestQuestionsForTraining(trn.title, trn);

    // Hitung jawaban benar
    let correctCount = 0;
    let allAnswered = true;

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="pretest_q_${i}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else if (selected.value === q.correct) {
            correctCount++;
        }
    });

    if (!allAnswered) {
        if (window.showToast) window.showToast(`Mohon jawab seluruh ${questions.length} soal Pre-Test terlebih dahulu.`, "warning");
        else alert(`Mohon jawab seluruh ${questions.length} soal Pre-Test terlebih dahulu.`);
        return;
    }

    const score = Math.round((correctCount / questions.length) * 100);

    let user = null;
    try {
        const storedUser = sessionStorage.getItem('pa_active_user');
        if (storedUser && storedUser !== "undefined") user = JSON.parse(storedUser);
    } catch(err) {}
    const email = (user && user.email) ? user.email : "demo@agen.com";

    // 1. Simpan Rekam Pre-Test
    let pretestAttempts = JSON.parse(localStorage.getItem("pa_training_pretest_attempts")) || {};
    if (!pretestAttempts[email]) pretestAttempts[email] = {};
    pretestAttempts[email][currentPretestTrainingId] = {
        score: score,
        correctCount: correctCount,
        totalQuestions: questions.length,
        timestamp: Date.now()
    };
    localStorage.setItem("pa_training_pretest_attempts", JSON.stringify(pretestAttempts));

    // 2. Simpan Status RSVP di Attendance
    let att = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
    if (!att[email]) att[email] = {};
    att[email][currentPretestTrainingId] = {
        status: "RSVP",
        pretestScore: score,
        attendedAt: Date.now()
    };
    localStorage.setItem("pa_training_attendance", JSON.stringify(att));

    window.hideTrainingPretestModal();

    // 3. Refresh Tampilan Agen
    if (typeof window.renderAgenTrainings === 'function') {
        window.renderAgenTrainings();
    }

    // 4. Tampilkan Notifikasi Sukses Pendaftaran + Skor Pre-Test
    const successOverlay = document.createElement('div');
    successOverlay.id = 'pretest-success-overlay';
    successOverlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.6);
        z-index: 99999999; display: flex; align-items: center; justify-content: center;
    `;
    successOverlay.innerHTML = `
        <div style="
            background: white; border-radius: 16px; padding: 28px 24px;
            max-width: 440px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            text-align: center; font-family: inherit;
        ">
            <div style="font-size: 46px; margin-bottom: 8px;">🎉</div>
            <h3 style="margin: 0 0 6px; color: #0f172a; font-size: 19px;">Pre-Test Selesai &amp; RSVP Berhasil!</h3>
            <p style="margin: 0 0 16px; color: #64748b; font-size: 13.5px;">
                Terima kasih telah melengkapi asesmen pemahaman awal.
            </p>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; margin-bottom: 20px;">
                <span style="font-size: 12px; color: #166534; font-weight: 600; text-transform: uppercase;">Skor Baseline Pre-Test</span>
                <div style="font-size: 28px; font-weight: 800; color: #15803d; margin: 4px 0;">${score} / 100</div>
                <div style="font-size: 12px; color: #166534;">(${correctCount} dari ${questions.length} soal terjawab benar)</div>
            </div>
            <p style="font-size: 12.5px; color: #475569; margin: 0 0 20px;">
                Tautan sesi webinar dan jadwal kelas kini telah aktif pada kartu pelatihan Anda.
            </p>
            <button onclick="document.getElementById('pretest-success-overlay').remove()" style="
                padding: 10px 24px; border: none; background: #0284c7;
                color: white; border-radius: 8px; font-size: 14px; font-weight: 700;
                cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(2,132,199,0.3);
            ">🚀 Siap Mengikuti Training</button>
        </div>
    `;
    document.body.appendChild(successOverlay);
};

window.markTrainingCompleted = function(id) {
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const t = trainings.find(x => x.id === id);
    if (!t) {
        if (window.showToast) window.showToast("Training tidak ditemukan.", "error");
        return;
    }
    if (t.status === "Completed") {
        if (window.showToast) window.showToast("Training ini sudah ditandai selesai.", "info");
        return;
    }

    // Custom in-page confirmation dialog (tidak bisa diblokir browser)
    const overlay = document.createElement('div');
    overlay.id = 'custom-confirm-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.55);
        z-index: 99999999; display: flex; align-items: center; justify-content: center;
    `;
    overlay.innerHTML = `
        <div style="
            background: white; border-radius: 16px; padding: 32px 28px;
            max-width: 420px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            text-align: center; font-family: inherit;
        ">
            <div style="font-size: 48px; margin-bottom: 12px;">✅</div>
            <h3 style="margin: 0 0 10px; color: #0f172a; font-size: 18px;">Nyatakan Kelas Selesai?</h3>
            <p style="margin: 0 0 24px; color: #64748b; font-size: 14px; line-height: 1.6;">
                Agen yang sudah RSVP akan dapat mengonfirmasi kehadiran menggunakan token kelas.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="btn-confirm-cancel" style="
                    padding: 10px 24px; border: 1px solid #cbd5e1; background: white;
                    color: #475569; border-radius: 8px; font-size: 14px; font-weight: 600;
                    cursor: pointer; min-width: 100px;
                ">Batal</button>
                <button id="btn-confirm-ok" style="
                    padding: 10px 24px; border: none; background: #f59e0b;
                    color: white; border-radius: 8px; font-size: 14px; font-weight: 600;
                    cursor: pointer; min-width: 140px;
                ">✅ Ya, Selesaikan</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeOverlay = () => {
        if (overlay && overlay.parentElement) overlay.remove();
    };

    document.getElementById('btn-confirm-cancel').onclick = closeOverlay;

    document.getElementById('btn-confirm-ok').onclick = () => {
        closeOverlay();
        const trainingsNow = JSON.parse(localStorage.getItem("pa_trainings")) || [];
        const target = trainingsNow.find(x => x.id === id);
        if (target) {
            target.status = "Completed";
            localStorage.setItem("pa_trainings", JSON.stringify(trainingsNow));
            if (typeof window.renderTrainerTrainings === 'function') window.renderTrainerTrainings();
            if (typeof window.renderAgenTrainings === 'function') window.renderAgenTrainings();
            if (window.showToast) window.showToast("✅ Training berhasil dinyatakan SELESAI! Agen yang RSVP kini dapat konfirmasi kehadiran.", "success");
        }
    };
};


let currentTokenEvId = null;
window.openTokenModal = function(id) {
    currentTokenEvId = id;
    const input = document.getElementById("agen-input-token");
    if (input) {
        input.value = "";
        input.disabled = false;
        input.readOnly = false;
    }
    document.getElementById("modal-training-token").classList.add("active");
    
    // Auto focus with slight delay to ensure modal is rendered
    setTimeout(() => {
        if (input) input.focus();
    }, 100);
};

// ==================== FUNGSI RENDER SILABUS ====================
window.renderSyllabusUI = function() {
    let syllabusData = JSON.parse(localStorage.getItem("pa_syllabus")) || [];
    
    // Recovery mechanism if localStorage data was somehow corrupted or empty
    if (syllabusData.length === 0 && typeof TRAINING_SYLLABUS_DEFAULT !== 'undefined') {
        syllabusData = TRAINING_SYLLABUS_DEFAULT;
        localStorage.setItem("pa_syllabus", JSON.stringify(TRAINING_SYLLABUS_DEFAULT));
    }
    let html = '<table class="data-table" style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">';
    html += '<thead style="background:#f1f5f9;"><tr><th style="padding:10px; border-bottom:2px solid #cbd5e1;">No</th><th style="padding:10px; border-bottom:2px solid #cbd5e1;">Materi</th><th style="padding:10px; border-bottom:2px solid #cbd5e1; text-align:center;">Mandiri</th><th style="padding:10px; border-bottom:2px solid #cbd5e1; text-align:center;">Online</th><th style="padding:10px; border-bottom:2px solid #cbd5e1; text-align:center;">Kuis</th></tr></thead>';
    html += '<tbody>';
    
    syllabusData.forEach(lvl => {
        const levelName = lvl.level ? String(lvl.level).toUpperCase() : "UMUM";
        html += `<tr style="background-color:#e2e8f0;"><td colspan="5" style="padding:10px; font-weight:800; color:var(--primary-navy); font-size:14px;">LEVEL ${levelName}</td></tr>`;
        
        if (lvl.materials && Array.isArray(lvl.materials)) {
            lvl.materials.forEach((item, idx) => {
                const no = item.no || (idx + 1);
                const title = item.title || "Materi";
                const mandiri = item.mandiri ? 'Ya' : 'Tidak';
                const online = item.online ? 'Ya' : 'Tidak';
                const kuis = item.kuis ? 'Ya' : 'Tidak';
                
                html += `<tr style="border-bottom:1px solid #e2e8f0;">
                    <td style="padding:10px;">${no}</td>
                    <td style="padding:10px; font-weight:500;">${title}</td>
                    <td style="padding:10px; text-align:center;">${mandiri}</td>
                    <td style="padding:10px; text-align:center;">${online}</td>
                    <td style="padding:10px; text-align:center;">${kuis}</td>
                </tr>`;
            });
        }
    });
    
    html += '</tbody></table>';
    
    const agenContainer = document.getElementById('agen-syllabus-container');
    if (agenContainer) agenContainer.innerHTML = html;
    
    const trainerContainer = document.getElementById('trainer-syllabus-container');
    if (trainerContainer) trainerContainer.innerHTML = html;
};

window.hideTrainingTokenModal = function() {
    document.getElementById("modal-training-token").classList.remove("active");
};

window.submitTrainingToken = function(e) {
    if (e) e.preventDefault();
    try {
        const token = document.getElementById("agen-input-token").value;
        if (!currentTokenEvId) {
            alert("Terjadi kesalahan: Sesi tidak terdeteksi. Silakan muat ulang halaman.");
            return;
        }
        const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
        const ev = trainings.find(t => t.id === currentTokenEvId);
        if (ev && ev.token === token) {
            const user = JSON.parse(sessionStorage.getItem('pa_active_user'));
            const email = (user && user.email) ? user.email : "demo@agen.com";
            let att = {};
            try {
                const storedAtt = localStorage.getItem("pa_training_attendance");
                if (storedAtt) {
                    const parsed = JSON.parse(storedAtt);
                    att = Array.isArray(parsed) ? Object.assign({}, parsed) : parsed;
                }
            } catch(e) {}
            if (!att[email]) att[email] = {};
            att[email][currentTokenEvId] = { status: "Hadir", attendedAt: Date.now() };
            localStorage.setItem("pa_training_attendance", JSON.stringify(att));
            alert("Absensi berhasil! Materi pelatihan dan Kuis kini terbuka.");
            hideTrainingTokenModal();
            if (typeof window.renderAgenTrainings === 'function') window.renderAgenTrainings();
        } else {
            alert("Token yang Anda masukkan salah atau tidak valid!");
        }
    } catch(err) {
        alert("Kesalahan Sistem: " + err.message);
    }
};

let currentQuizEvId = null;
window.openTrainingQuiz = function(id) {
    const trainings = JSON.parse(localStorage.getItem("pa_trainings"));
    const ev = trainings ? trainings.find(t => t.id === id) : null;
    if (!ev || !ev.quiz || ev.quiz.length === 0) {
        if (window.showToast) window.showToast("Kuis belum tersedia untuk training ini.", "warning");
        return;
    }
    currentQuizEvId = id;

    const user = JSON.parse(sessionStorage.getItem('pa_active_user'));
    const email = (user && user.email) ? user.email : "demo@agen.com";
    const attemptsData = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
    const myAtt = (attemptsData[email] && attemptsData[email][id]) ? attemptsData[email][id] : { attempts: 0 };
    
    const sisaKesempatan = 2 - myAtt.attempts;
    if (sisaKesempatan <= 0) {
        if (window.showToast) window.showToast("Kesempatan kuis Anda telah habis.", "error");
        return;
    }
    
    document.getElementById("agen-quiz-attempts-left").innerText = `Sisa Kesempatan: ${sisaKesempatan}x`;
    const container = document.getElementById("agen-quiz-questions-container");
    container.innerHTML = "";
    
    ev.quiz.forEach((q, i) => {
        const div = document.createElement("div");
        div.style.marginBottom = "15px";
        div.innerHTML = `
        <p style="font-weight:600; margin-bottom:8px; font-size:13px;">${i+1}. ${q.q}</p>
        <label style="display:block; margin-bottom:4px; font-size:12.5px; cursor:pointer;"><input type="radio" name="q_${i}" value="a"> A. ${q.a}</label>
        <label style="display:block; margin-bottom:4px; font-size:12.5px; cursor:pointer;"><input type="radio" name="q_${i}" value="b"> B. ${q.b}</label>
        <label style="display:block; margin-bottom:4px; font-size:12.5px; cursor:pointer;"><input type="radio" name="q_${i}" value="c"> C. ${q.c}</label>
        <label style="display:block; margin-bottom:4px; font-size:12.5px; cursor:pointer;"><input type="radio" name="q_${i}" value="d"> D. ${q.d}</label>
        `;
        container.appendChild(div);
    });
    
    document.getElementById("modal-training-quiz").classList.add("active");
};


window.hideTrainingQuizModal = function() {
    document.getElementById("modal-training-quiz").classList.remove("active");
};

window.submitTrainingQuiz = function(e) {
    if (e) e.preventDefault();
    
    // Guard against double-submit
    if (window._quizSubmitting) return;
    window._quizSubmitting = true;
    setTimeout(() => { window._quizSubmitting = false; }, 2000);

    try {
        const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
        const ev = trainings.find(t => t.id === currentQuizEvId);
        
        if (!ev || !ev.quiz) {
            if (window.showToast) window.showToast("Kesalahan: Data kuis tidak ditemukan.", "error");
            window._quizSubmitting = false;
            return;
        }
        
        let correctCount = 0;
        ev.quiz.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q_${i}"]:checked`);
            if (selected && selected.value === q.correct) correctCount++;
        });
        
        const score = Math.round((correctCount / ev.quiz.length) * 100);
        
        // Gunakan email user aktif yang sedang login
        const user = JSON.parse(sessionStorage.getItem('pa_active_user'));
        const email = (user && user.email) ? user.email : "demo@agen.com";
        
        let attemptsData = JSON.parse(localStorage.getItem("pa_training_quiz_attempts")) || {};
        if (!attemptsData[email]) attemptsData[email] = {};
        if (!attemptsData[email][currentQuizEvId]) attemptsData[email][currentQuizEvId] = { attempts: 0, passed: false };
        
        let rec = attemptsData[email][currentQuizEvId];
        rec.attempts++;
        
        const passed = score >= 70;
        if (passed) {
            rec.passed = true;
            rec.bestScore = score;
            // Integrasi Logika Progres Agen
            if (ev.level) {
                let progressData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
                const userKey = `progress_${email}`;
                if (!progressData[userKey]) progressData[userKey] = {};
                if (!progressData[userKey].levelProgress) progressData[userKey].levelProgress = { Basic: 0, Intermediate: 0, Advanced: 0 };
                progressData[userKey].levelProgress[ev.level] = (progressData[userKey].levelProgress[ev.level] || 0) + 1;
                localStorage.setItem("pa_agent_progress", JSON.stringify(progressData));
            }
        }
        localStorage.setItem("pa_training_quiz_attempts", JSON.stringify(attemptsData));
        
        hideTrainingQuizModal();
        if (typeof window.renderAgenTrainings === 'function') window.renderAgenTrainings();
        
        // Tampilkan hasil dengan custom dialog (tidak diblokir browser)
        const sisaKesempatan = Math.max(0, 2 - rec.attempts);
        const resultOverlay = document.createElement('div');
        resultOverlay.id = 'quiz-result-overlay';
        resultOverlay.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.6);
            z-index: 99999999; display: flex; align-items: center; justify-content: center;
        `;
        const bgColor = passed ? '#f0fdf4' : '#fef2f2';
        const borderColor = passed ? '#86efac' : '#fca5a5';
        const emoji = passed ? '🎉' : '😔';
        const statusText = passed ? 'LULUS!' : 'Belum Lulus';
        const statusColor = passed ? '#16a34a' : '#dc2626';
        const detailText = passed
            ? `Selamat! Anda berhasil lulus dengan skor <strong>${score}%</strong>.<br>Sertifikat pelatihan kini dapat diunduh.`
            : `Skor Anda <strong>${score}%</strong>. Minimal kelulusan 70%.<br>${sisaKesempatan > 0 ? `Sisa kesempatan: <strong>${sisaKesempatan}x</strong>` : '<span style="color:#dc2626">Kesempatan telah habis.</span>'}`;
        const btnLabel = passed ? '🏆 Lihat Sertifikat' : 'Tutup';
        let pretestData = JSON.parse(localStorage.getItem("pa_training_pretest_attempts")) || {};
        let myPretest = (pretestData[email] && pretestData[email][currentQuizEvId]) ? pretestData[email][currentQuizEvId] : null;
        let comparisonHtml = "";
        if (myPretest && myPretest.score !== undefined) {
            let delta = score - myPretest.score;
            let deltaColor = delta >= 0 ? '#16a34a' : '#dc2626';
            comparisonHtml = `
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; margin: 12px 0 16px; font-size: 12.5px; display: flex; justify-content: space-around; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                    <div>
                        <div style="color: #64748b; font-size: 11px; font-weight: 600;">Pre-Test</div>
                        <strong style="font-size: 15px; color: #0284c7;">${myPretest.score}%</strong>
                    </div>
                    <div style="font-size: 16px; color: #94a3b8;">➔</div>
                    <div>
                        <div style="color: #64748b; font-size: 11px; font-weight: 600;">Post-Test</div>
                        <strong style="font-size: 15px; color: ${statusColor};">${score}%</strong>
                    </div>
                    <div style="background: ${delta >= 0 ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${delta >= 0 ? '#bbf7d0' : '#fecaca'}; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: ${deltaColor}; font-size: 11.5px;">
                        ${delta >= 0 ? '+' : ''}${delta}% Pertumbuhan
                    </div>
                </div>
            `;
        }

        resultOverlay.innerHTML = `
            <div style="
                background: ${bgColor}; border: 2px solid ${borderColor};
                border-radius: 20px; padding: 32px 28px; max-width: 400px; width: 90%;
                text-align: center; font-family: inherit; box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            ">
                <div style="font-size: 50px; margin-bottom: 6px;">${emoji}</div>
                <h2 style="margin: 0 0 6px; color: ${statusColor}; font-size: 22px;">${statusText}</h2>
                <div style="font-size: 42px; font-weight: 800; color: ${statusColor}; margin-bottom: 8px;">${score}%</div>
                ${comparisonHtml}
                <p style="margin: 0 0 20px; color: #374151; font-size: 13.5px; line-height: 1.5;">${detailText}</p>
                <button id="btn-close-quiz-result" style="
                    padding: 12px 32px; border: none; background: ${btnBg};
                    color: white; border-radius: 10px; font-size: 15px; font-weight: 700;
                    cursor: pointer; width: 100%; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                ">${btnLabel}</button>
            </div>
        `;
        document.body.appendChild(resultOverlay);

        // Pasang event listener setelah elemen ada di DOM (menghindari masalah parsing onclick)
        const closeBtn = document.getElementById('btn-close-quiz-result');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const overlay = document.getElementById('quiz-result-overlay');
                if (overlay) overlay.remove();
                // Jika lulus, buka sertifikat
                if (passed && ev) {
                    window.openPrintCertificate(ev.title, score);
                }
            });
        }
        
    } catch(err) {
        window._quizSubmitting = false;
        if (window.showToast) window.showToast("Terjadi kesalahan sistem: " + err.message, "error");
    }
};


window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.loadDataFromStorage === 'function') {
        window.loadDataFromStorage();
    }
    
    if (typeof window.renderBelajarAsuransi === 'function') {
        window.renderBelajarAsuransi(window.currentActiveLevel, "");
    }
    
    if (typeof window.renderRecommendationBar === 'function') {
        window.renderRecommendationBar();
    }
    
    if (typeof window.renderAgenTrainings === 'function') {
        window.renderAgenTrainings();
    }
    if (typeof window.evaluateAgentCertificates === 'function') {
        window.evaluateAgentCertificates();
    }
    if (typeof window.renderTrainerTrainings === 'function') {
        window.renderTrainerTrainings();
    }
    if (typeof window.renderTrainerEvaluasi === 'function') {
        window.renderTrainerEvaluasi();
    }
    if (typeof window.renderTrainerMaterials === 'function') window.renderTrainerMaterials();
    if (typeof window.renderTrainerCoaching === 'function') window.renderTrainerCoaching();
    if (typeof window.renderTrainerProgress === 'function') window.renderTrainerProgress();
    if (typeof window.renderTrainerClaims === 'function') window.renderTrainerClaims();
});

// ==================== FUNGSI PERSISTENSI DATA STORAGE ====================
window.modules = [];
window.pa_agent_module_progress = {};
window.masterBankSoal = {};

window.loadDataFromStorage = function() {
    const savedMaterials = localStorage.getItem("pa_materials");
    if (savedMaterials) {
        window.modules = JSON.parse(savedMaterials);
    } else {
        window.modules = []; 
    }
    
    const savedProgress = localStorage.getItem("pa_agent_module_progress");
    if (savedProgress && savedProgress !== "{}") {
        window.pa_agent_module_progress = JSON.parse(savedProgress);
    } else {
        window.pa_agent_module_progress = {};
    }

    if (!window.pa_agent_module_progress["AGN-001_dasar-asuransi"]) {
        window.pa_agent_module_progress["AGN-001_dasar-asuransi"] = {
            agentId: "AGN-001",
            moduleId: "dasar-asuransi",
            metodeIkut: "Mandiri",
            statusMateri: "SELESAI",
            statusKuis: "Lulus",
            skorKuis: 80,
            sisaRemedial: 2,
            preTestScore: 60,
            postTestAttempts: 1,
            postTestScore: 80,
            currentPhase: "completed"
        };
        localStorage.setItem("pa_agent_module_progress", JSON.stringify(window.pa_agent_module_progress));
    }
    
    const savedBankSoal = localStorage.getItem("pa_master_bank_soal");
    if (savedBankSoal) {
        window.masterBankSoal = JSON.parse(savedBankSoal);
    } else {
        window.masterBankSoal = {};
    }
};

window.saveDataToStorage = function() {
    localStorage.setItem("pa_materials", JSON.stringify(window.modules));
    localStorage.setItem("pa_agent_module_progress", JSON.stringify(window.pa_agent_module_progress));
    localStorage.setItem("pa_master_bank_soal", JSON.stringify(window.masterBankSoal));
};

// ==================== RENDERING MATERI BERDASARKAN LEVEL ====================
window.currentActiveLevel = "Basic";

window.switchLevelTab = function(level) {
    window.currentActiveLevel = level;
    
    const tabs = ["Basic", "Intermediate", "Advanced"];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-level-${t.toLowerCase()}`);
        if (btn) {
            btn.className = (t === level) ? "btn-primary" : "btn-secondary";
        }
    });
    
    const searchInput = document.getElementById("search-materi");
    const searchTerm = searchInput ? searchInput.value : "";
    window.renderBelajarAsuransi(window.currentActiveLevel, searchTerm);
};

window.filterMaterials = function() {
    const searchInput = document.getElementById("search-materi");
    const searchTerm = searchInput ? searchInput.value : "";
    window.renderBelajarAsuransi(window.currentActiveLevel, searchTerm);
};

window.setupMaterialTabs = function() {
    try {
        const tabs = document.querySelectorAll('.player-tab-btn');
        const contents = document.querySelectorAll('.player-tab-content');
        
        if (tabs.length === 0 || contents.length === 0) return;
        
        tabs.forEach((tab, index) => {
            // Hapus onclick bawaan HTML jika ada
            tab.removeAttribute('onclick');
            
            tab.addEventListener('click', function() {
                // Hapus class active dari semua tab
                tabs.forEach(t => t.classList.remove('active'));
                // Tambahkan class active ke tab yang diklik
                this.classList.add('active');
                
                // Sembunyikan semua konten
                contents.forEach(c => {
                    c.style.display = 'none';
                    c.classList.remove('active');
                });
                
                // Tampilkan konten yang sesuai urutan
                if (contents[index]) {
                    contents[index].style.display = 'block';
                    contents[index].classList.add('active');
                }
            });
        });
    } catch (e) {
        console.error("Gagal inisialisasi tab materi:", e);
    }
};

window.getActiveAgentId = function() {
    const userStr = sessionStorage.getItem('pa_active_user') || localStorage.getItem('pa_active_user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            return user.code || user.id || 'AGN-001';
        } catch(e) {
            return 'AGN-001';
        }
    }
    return 'AGN-001';
};

window.loadModuleDetail = function(moduleId) {
    try {
        if (!document.getElementById('pa-dynamic-style')) {
            const style = document.createElement('style');
            style.id = 'pa-dynamic-style';
            style.innerHTML = `
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes bounce {
                    from { transform: translateY(0); }
                    to { transform: translateY(-8px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        window.renderCoursePlayer(moduleId);
    } catch (e) {
        console.error("Gagal memuat detail modul:", e);
    }
};

window.renderCoursePlayer = function(moduleId) {
    const container = document.querySelector('.course-player-container');
    if (!container) return;

    window.currentActiveModuleId = moduleId;
    const moduleData = window.modules.find(m => m.id === moduleId);
    if (!moduleData) {
        container.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--text-muted);">Modul tidak ditemukan.</p>`;
        return;
    }

    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");

    if (progress.currentPhase === "pre-test") {
        window.renderPreTestUI(container, moduleData, progress);
    } else if (progress.currentPhase === "learning") {
        window.renderLearningUI(container, moduleData, progress);
    } else if (progress.currentPhase === "post-test") {
        window.renderPostTestUI(container, moduleData, progress);
    } else if (progress.currentPhase === "completed") {
        window.renderCompletedUI(container, moduleData, progress);
    } else if (progress.currentPhase === "failed") {
        window.renderFailedUI(container, moduleData, progress);
    }
};

window.renderPreTestUI = function(container, moduleData, progress) {
    container.innerHTML = `
        <div class="course-player-header">
            <h2 id="player-title">Pre-Test: ${moduleData.title}</h2>
            <span class="badge" id="player-category">${moduleData.cat || 'Dasar Asuransi'}</span>
        </div>
        <div style="padding: 40px 24px; text-align: center; background: white;">
            <div style="font-size: 60px; margin-bottom: 20px;">📝</div>
            <h3 style="margin-bottom: 12px; color: var(--primary-navy); font-weight:800; font-size:18px;">Uji Pemahaman Awal (Pre-Test)</h3>
            <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 24px auto; font-size: 13.5px; line-height: 1.6;">
                Sebelum mempelajari materi ini, silakan ikuti pre-test singkat terlebih dahulu.
                Hasil dari pre-test ini bertujuan untuk mengukur tingkat pemahaman awal Anda dan <strong>tidak memengaruhi kelulusan akhir modul</strong>.
            </p>
            <button class="btn-primary" onclick="window.startPreTestQuiz('${moduleData.id}')" style="padding: 12px 30px; font-size: 14.5px; font-weight: bold; width:auto; border:none; border-radius:6px; cursor:pointer;">
                Mulai Pre-Test Sekarang
            </button>
        </div>
    `;
};

window.startPreTestQuiz = function(moduleId) {
    const container = document.querySelector('.course-player-container');
    if (!container) return;
    
    const moduleData = window.modules.find(m => m.id === moduleId);
    const questions = window.getModuleQuestions(moduleData, 'pre-test');
    
    let html = `
        <div class="course-player-header" style="border-bottom: 1px solid var(--border-color); padding: 20px; background: #f8fafc; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h2 style="margin: 0; font-size: 16px; color: var(--primary-navy); font-weight:800;">Pre-Test: ${moduleData.title}</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--text-muted);">Jawablah pertanyaan di bawah ini dengan jujur.</p>
            </div>
            <span class="badge" style="background-color: var(--primary-blue-light); color: var(--primary-blue); font-size: 10.5px; font-weight: bold; padding: 4px 10px; border-radius: 6px; white-space:nowrap;">
                Wajib Diisi
            </span>
        </div>
        <div style="padding: 24px; max-height: 480px; overflow-y: auto; background:#fafafa;">
            <form id="pre-test-form">
    `;
    
    questions.forEach((q, idx) => {
        html += `
            <div style="margin-bottom: 20px; padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <p style="font-weight: 700; font-size: 14px; color: var(--text-dark); margin-bottom: 12px; line-height: 1.5;">${idx + 1}. ${q.question}</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
        `;
        q.options.forEach((opt, optIdx) => {
            const char = String.fromCharCode(65 + optIdx); // A, B, C, D
            html += `
                <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #475569; cursor: pointer; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='transparent'">
                    <input type="radio" name="pre_q_${idx}" value="${optIdx}" required style="accent-color: var(--primary-blue); width: 15px; height: 15px; margin: 0; cursor:pointer;">
                    <span><strong>${char}.</strong> ${opt}</span>
                </label>
            `;
        });
        html += `
                </div>
            </div>
        `;
    });
    
    html += `
            </form>
        </div>
        <div class="course-player-footer" style="padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; background: #f8fafc;">
            <button class="btn-primary" onclick="window.submitPreTestQuiz('${moduleId}')" style="padding: 10px 20px; font-size: 13.5px; font-weight: bold; width:auto; border:none; border-radius:6px; cursor:pointer;">
                Kirim Jawaban Pre-Test
            </button>
        </div>
    `;
    container.innerHTML = html;
};

window.submitPreTestQuiz = function(moduleId) {
    const form = document.getElementById('pre-test-form');
    if (!form) return;
    
    const moduleData = window.modules.find(m => m.id === moduleId);
    const questions = window.getModuleQuestions(moduleData, 'pre-test');
    
    for (let idx = 0; idx < questions.length; idx++) {
        const checked = form.querySelector(`input[name="pre_q_${idx}"]:checked`);
        if (!checked) {
            window.showToast("Silakan jawab semua pertanyaan kuis terlebih dahulu.", "warning");
            return;
        }
    }
    
    let correctCount = 0;
    questions.forEach((q, idx) => {
        const checked = form.querySelector(`input[name="pre_q_${idx}"]:checked`);
        if (checked && parseInt(checked.value) === q.correctIndex) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    progress.preTestScore = score;
    progress.currentPhase = "learning";
    progress.statusMateri = "Belajar";
    window.saveDataToStorage();
    
    if (typeof window.renderBelajarAsuransi === 'function') {
        window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
    }
    
    window.showPreTestScoreModal(score, moduleId);
};

window.showPreTestScoreModal = function(score, moduleId) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'pre-test-score-modal';
    modalDiv.style.position = 'fixed';
    modalDiv.style.top = '0';
    modalDiv.style.left = '0';
    modalDiv.style.width = '100vw';
    modalDiv.style.height = '100vh';
    modalDiv.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
    modalDiv.style.backdropFilter = 'blur(4px)';
    modalDiv.style.display = 'flex';
    modalDiv.style.justifyContent = 'center';
    modalDiv.style.alignItems = 'center';
    modalDiv.style.zIndex = '999999';
    
    modalDiv.innerHTML = `
        <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 90%; max-width: 400px; text-align: center; border: 1px solid var(--border-color); animation: scaleUp 0.25s ease; box-sizing: border-box;">
            <div style="font-size: 50px; margin-bottom: 16px;">📊</div>
            <h3 style="margin-bottom: 8px; color: var(--primary-navy); font-size: 18px; font-weight: 800;">Pre-Test Selesai!</h3>
            <p style="font-size: 14.5px; color: var(--text-dark); margin-bottom: 16px;">
                Nilai Pre-test Anda: <strong style="font-size: 18px; color: var(--primary-blue);">${score}/100</strong>.
            </p>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5; padding: 0 10px;">
                Mari tingkatkan pemahaman Anda di sesi belajar dengan membaca materi dan menonton video pembelajaran!
            </p>
            <button class="btn-primary" id="btn-pretest-close" style="width: 100%; padding: 12px; font-weight: bold; font-size: 13.5px; border:none; border-radius:6px; cursor:pointer;">
                Lanjut ke Sesi Belajar
            </button>
        </div>
    `;
    
    document.body.appendChild(modalDiv);
    
    document.getElementById('btn-pretest-close').addEventListener('click', () => {
        modalDiv.remove();
        window.renderCoursePlayer(moduleId);
    });
};

window.renderLearningUI = function(container, moduleData, progress) {
    let artContent = moduleData.article || moduleData.content || "";
    if (artContent) {
        artContent = artContent.replace(/\n/g, "<br>");
    } else {
        artContent = "<p>Tidak ada artikel tertulis untuk modul ini.</p>";
    }
    
    let summaryText = moduleData.desc || 'Tidak ada ringkasan.';
    let pdfUrl = moduleData.pdfLink || '#';
    let disableAttr = moduleData.pdfLink ? '' : 'pointer-events: none; opacity: 0.6;';
    let titleText = moduleData.pdfLink ? 'Materi PDF Tersedia' : 'Materi PDF Tidak Tersedia';
    let descText = moduleData.pdfLink 
        ? 'Klik tombol di bawah ini untuk membuka dan mengunduh materi PDF resmi melalui Google Drive dengan aman.' 
        : 'Belum ada tautan materi PDF yang diunggah oleh Trainer untuk modul ini.';
        
    let rawVideo = moduleData.video || moduleData.videoUrl || '';
    let embedUrl = rawVideo;
    if (rawVideo.includes("youtube.com/watch?v=")) {
        const vidId = rawVideo.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}`;
    } else if (rawVideo.includes("youtu.be/")) {
        const vidId = rawVideo.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}`;
    }
    
    let videoContentHtml = `
        <div class="video-player-wrapper">
          <iframe id="player-video-frame" width="100%" height="360" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
          <p class="video-caption" style="margin-top: 10px; font-size: 12px; color: var(--text-muted);">
              Gunakan video pemaparan ini untuk menyelaraskan teori dengan praktek penjualan di lapangan.
          </p>
        </div>
    `;
    if (!rawVideo || rawVideo.trim() === '') {
        videoContentHtml = `
            <div style="padding: 40px 20px; text-align: center; color: var(--text-muted); background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1; margin-top: 20px; font-size: 13px;">
                Belum ada video untuk materi ini.
            </div>
        `;
    }

    container.innerHTML = `
        <div class="course-player-header">
            <h2 id="player-title" style="margin:0; font-size: 18px; color: var(--primary-navy); font-weight:800;">${moduleData.title}</h2>
            <span class="badge" id="player-category">${moduleData.cat || 'Dasar Asuransi'}</span>
        </div>
        <div class="player-tabs">
            <button class="player-tab-btn active">Artikel</button>
            <button class="player-tab-btn">Video Pembelajaran</button>
            <button class="player-tab-btn">Unduh Dokumen PDF</button>
            <button class="player-tab-btn">Ringkasan</button>
        </div>
        
        <div class="player-tab-content active" id="tab-article" style="display: block; padding: 20px; min-height: 250px; line-height: 1.6; font-size:13.5px; color:#334155;">
            <div id="player-article-content" class="rich-text-area">${artContent}</div>
        </div>
        <div class="player-tab-content" id="tab-video" style="display: none; padding: 20px;">
            ${videoContentHtml}
        </div>
        <div class="player-tab-content" id="tab-pdf" style="display: none; padding: 20px;">
            <div class="pdf-card-box" style="text-align: center; padding: 40px 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; margin-bottom: 16px;">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3 style="margin-bottom: 8px; color: var(--text-dark); font-size:16px; font-weight:700;">${titleText}</h3>
                <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.5;">${descText}</p>
                <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background-color 0.2s; font-size:13px; ${disableAttr}" onmouseover="this.style.backgroundColor='#1d4ed8'" onmouseout="this.style.backgroundColor='#2563eb'">
                    Buka Materi di Google Drive
                </a>
            </div>
        </div>
        <div class="player-tab-content" id="tab-summary" style="display: none; padding: 20px; line-height: 1.6; font-size:13.5px; color:#334155;">
            <div class="summary-box">
                <h3 style="font-size:15px; font-weight:700; margin-bottom:10px; color:var(--primary-navy);">Ringkasan Eksekutif</h3>
                <p id="player-summary-text">${summaryText}</p>
            </div>
        </div>
        
        <div class="course-player-footer" style="padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; background: #f8fafc;">
            <button class="btn-primary" onclick="window.startPostTestPhase('${moduleData.id}')" style="padding: 12px 24px; font-weight: bold; font-size: 13.5px; display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--primary-blue) 0%, #1e40af 100%); border:none; width:auto; cursor:pointer;">
                <span>Selesai Belajar & Ambil Post-test</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>
    `;
    
    window.setupMaterialTabs();
};

window.startPostTestPhase = function(moduleId) {
    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    progress.currentPhase = "post-test";
    window.saveDataToStorage();
    
    window.renderCoursePlayer(moduleId);
};

window.renderPostTestUI = function(container, moduleData, progress) {
    const questions = window.getModuleQuestions(moduleData, 'post-test');
    const kkmVal = (window.masterBankSoal && window.masterBankSoal[moduleData.id] && window.masterBankSoal[moduleData.id].kkm) !== undefined ? window.masterBankSoal[moduleData.id].kkm : 70;
    
    let html = `
        <div class="course-player-header" style="border-bottom: 1px solid var(--border-color); padding: 20px; background: #f8fafc; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h2 style="margin: 0; font-size: 16px; color: var(--primary-navy); font-weight:800;">Post-Test Evaluasi: ${moduleData.title}</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--text-muted);">
                    Nilai Kelulusan KKM: <span style="font-weight: 700; color: #10b981;">${kkmVal}%</span> | 
                    Sisa Remedial: <span style="font-weight: 700; color: var(--danger-red);">${progress.sisaRemedial} kali</span>
                </p>
            </div>
            <span class="badge" style="background-color: #fee2e2; color: #b91c1c; font-size: 10.5px; font-weight: bold; padding: 4px 10px; border-radius: 6px; white-space:nowrap;">
                Evaluasi Akhir
            </span>
        </div>
        <div style="padding: 24px; max-height: 480px; overflow-y: auto; background:#fafafa;">
            <form id="post-test-form">
    `;
    
    questions.forEach((q, idx) => {
        html += `
            <div style="margin-bottom: 20px; padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <p style="font-weight: 700; font-size: 14px; color: var(--text-dark); margin-bottom: 12px; line-height: 1.5;">${idx + 1}. ${q.question}</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
        `;
        q.options.forEach((opt, optIdx) => {
            const char = String.fromCharCode(65 + optIdx); // A, B, C, D
            html += `
                <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #475569; cursor: pointer; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='transparent'">
                    <input type="radio" name="post_q_${idx}" value="${optIdx}" required style="accent-color: var(--primary-blue); width: 15px; height: 15px; margin: 0; cursor:pointer;">
                    <span><strong>${char}.</strong> ${opt}</span>
                </label>
            `;
        });
        html += `
                </div>
            </div>
        `;
    });
    
    html += `
            </form>
        </div>
        <div class="course-player-footer" style="padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; background: #f8fafc;">
            <button class="btn-primary" onclick="window.submitPostTestQuiz('${moduleData.id}')" style="padding: 10px 20px; font-size: 13.5px; font-weight: bold; width:auto; border:none; border-radius:6px; cursor:pointer; background: linear-gradient(135deg, #10B981 0%, #059669 100%);">
                Kirim Jawaban Post-Test
            </button>
        </div>
    `;
    container.innerHTML = html;
};

window.submitPostTestQuiz = function(moduleId) {
    const form = document.getElementById('post-test-form');
    if (!form) return;
    
    const moduleData = window.modules.find(m => m.id === moduleId);
    const questions = window.getModuleQuestions(moduleData, 'post-test');
    
    for (let idx = 0; idx < questions.length; idx++) {
        const checked = form.querySelector(`input[name="post_q_${idx}"]:checked`);
        if (!checked) {
            window.showToast("Silakan jawab semua pertanyaan terlebih dahulu.", "warning");
            return;
        }
    }
    
    let correctCount = 0;
    questions.forEach((q, idx) => {
        const checked = form.querySelector(`input[name="post_q_${idx}"]:checked`);
        if (checked && parseInt(checked.value) === q.correctIndex) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    progress.postTestAttempts++;
    progress.postTestScore = score;
    
    const kkmVal = (window.masterBankSoal && window.masterBankSoal[moduleId] && window.masterBankSoal[moduleId].kkm) !== undefined ? window.masterBankSoal[moduleId].kkm : 70;
    if (score >= kkmVal) {
        progress.currentPhase = "completed";
        progress.statusMateri = "SELESAI";
        progress.statusKuis = "Lulus";
        progress.skorKuis = score;
        window.saveDataToStorage();
        
        if (typeof window.issueCertificate === 'function') {
            window.issueCertificate(agentId, moduleId);
        }
        
        window.addAgentXpAndCoins(100, 50);
        
        if (typeof window.evaluateAgentCertificates === 'function') {
            window.evaluateAgentCertificates();
        }
        if (typeof window.renderRecommendationBar === 'function') {
            window.renderRecommendationBar();
        }
        if (typeof window.renderBelajarAsuransi === 'function') {
            window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
        }
        
        window.renderCoursePlayer(moduleId);
        if (typeof window.triggerConfetti === 'function') {
            window.triggerConfetti();
        }
    } else {
        if (progress.sisaRemedial > 0) {
            progress.sisaRemedial--;
            progress.currentPhase = "failed";
            progress.statusKuis = "Gagal";
            progress.skorKuis = score;
            window.saveDataToStorage();
            
            if (typeof window.evaluateAgentCertificates === 'function') {
                window.evaluateAgentCertificates();
            }
            if (typeof window.renderRecommendationBar === 'function') {
                window.renderRecommendationBar();
            }
            if (typeof window.renderBelajarAsuransi === 'function') {
                window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
            }
            
            window.renderCoursePlayer(moduleId);
        } else {
            progress.preTestScore = null;
            progress.postTestAttempts = 0;
            progress.postTestScore = null;
            progress.statusKuis = "Belum Ikut";
            progress.skorKuis = 0;
            progress.sisaRemedial = 2;
            progress.statusMateri = "Belum Diikuti";
            progress.currentPhase = "pre-test";
            window.saveDataToStorage();
            
            if (typeof window.evaluateAgentCertificates === 'function') {
                window.evaluateAgentCertificates();
            }
            if (typeof window.renderRecommendationBar === 'function') {
                window.renderRecommendationBar();
            }
            if (typeof window.renderBelajarAsuransi === 'function') {
                window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
            }
            
            window.showPermanentFailureModal(score, moduleId);
        }
    }
};

window.showPermanentFailureModal = function(score, moduleId) {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'permanent-failure-modal';
    modalDiv.style.position = 'fixed';
    modalDiv.style.top = '0';
    modalDiv.style.left = '0';
    modalDiv.style.width = '100vw';
    modalDiv.style.height = '100vh';
    modalDiv.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
    modalDiv.style.backdropFilter = 'blur(4px)';
    modalDiv.style.display = 'flex';
    modalDiv.style.justifyContent = 'center';
    modalDiv.style.alignItems = 'center';
    modalDiv.style.zIndex = '999999';
    
    const kkmVal = (window.masterBankSoal && window.masterBankSoal[moduleId] && window.masterBankSoal[moduleId].kkm) !== undefined ? window.masterBankSoal[moduleId].kkm : 70;
    
    modalDiv.innerHTML = `
        <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 90%; max-width: 400px; text-align: center; border: 1px solid var(--border-color); animation: scaleUp 0.25s ease; box-sizing: border-box;">
            <div style="font-size: 50px; margin-bottom: 16px;">❌</div>
            <h3 style="margin-bottom: 8px; color: var(--danger-red); font-size: 18px; font-weight: 800;">Percobaan Remedial Habis</h3>
            <p style="font-size: 14.5px; color: var(--text-dark); margin-bottom: 16px;">
                Nilai Post-test Anda: <strong style="font-size: 18px; color: var(--danger-red);">${score}/100</strong> (Di bawah KKM ${kkmVal}%).
            </p>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5; padding:0 10px;">
                Anda telah menggunakan 3 kali kesempatan evaluasi untuk modul ini dan belum berhasil lulus. Anda harus mengulang modul ini dari awal (Pre-Test).
            </p>
            <button class="btn-primary" id="btn-fail-reset-close" style="width: 100%; padding: 12px; font-weight: bold; font-size: 13.5px; border:none; border-radius:6px; cursor:pointer; background-color: var(--danger-red);">
                Mulai Ulang Modul
            </button>
        </div>
    `;
    
    document.body.appendChild(modalDiv);
    
    document.getElementById('btn-fail-reset-close').addEventListener('click', () => {
        modalDiv.remove();
        window.renderCoursePlayer(moduleId);
    });
};

window.renderCompletedUI = function(container, moduleData, progress) {
    container.innerHTML = `
        <div class="course-player-header">
            <h2 id="player-title" style="margin:0; font-size: 18px; color: var(--primary-navy); font-weight:800;">Evaluasi Lulus: ${moduleData.title}</h2>
            <span class="badge" id="player-category">${moduleData.cat || 'Dasar Asuransi'}</span>
        </div>
        <div style="padding: 40px 20px; text-align: center; background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);">
            <div style="font-size: 64px; margin-bottom: 16px; animation: bounce 1s infinite alternate;">🏆</div>
            <h2 style="color: #15803d; font-size: 22px; font-weight: 800; margin-bottom: 8px;">Selamat, Anda Lulus!</h2>
            <p style="color: var(--text-light); font-size: 13.5px; margin-bottom: 24px; max-width: 420px; margin-left: auto; margin-right: auto; line-height:1.5;">
                Anda telah berhasil menyelesaikan seluruh rangkaian materi dan evaluasi untuk modul <strong>${moduleData.title}</strong>.
            </p>
            
            <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 30px; align-items:center;">
                <div style="background: white; border: 1px solid #bbf7d0; border-radius: 12px; padding: 12px 20px; box-shadow: 0 4px 6px rgba(21,128,61,0.02);">
                    <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Skor Pre-Test</div>
                    <div style="font-size: 18px; font-weight: 800; color: #475569; margin-top:2px;">${progress.preTestScore}%</div>
                </div>
                <div style="font-size: 18px; color: #15803d; font-weight:bold;">➡️</div>
                <div style="background: white; border: 1px solid #bbf7d0; border-radius: 12px; padding: 12px 20px; box-shadow: 0 4px 6px rgba(21,128,61,0.02); background-color: #f0fdf4;">
                    <div style="font-size: 10px; color: #166534; font-weight: 700; text-transform: uppercase;">Skor Post-Test</div>
                    <div style="font-size: 18px; font-weight: 800; color: #166534; margin-top:2px;">${progress.postTestScore}%</div>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; margin: 0 auto;">
                <button class="btn-primary" onclick="window.downloadModuleCertificate('${moduleData.title}', ${progress.postTestScore})" style="padding: 12px; font-weight: bold; font-size: 13.5px; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); border: none; border-radius:6px; cursor:pointer; width:100%;">
                    🏆 Unduh Sertifikat Resmi
                </button>
                <div style="font-weight:700; color:#15803d; font-size:12.5px; padding: 6px; background:#e8f5e9; border-radius:6px;">
                    ✓ Reward +100 XP & +50 Koin telah diklaim!
                </div>
                <button class="btn-secondary" onclick="navigateTo('belajar')" style="padding: 11px; font-weight: bold; font-size: 13px; border-radius:6px; cursor:pointer; width:100%;">
                    Kembali ke Daftar Materi
                </button>
            </div>
        </div>
    `;
};

window.downloadModuleCertificate = function(title, score) {
    if (typeof window.openPrintCertificate === 'function') {
        window.openPrintCertificate(title, score);
    } else {
        alert(`Sertifikat Kelulusan Modul: ${title} (Skor: ${score}%)`);
    }
};

window.renderFailedUI = function(container, moduleData, progress) {
    const kkmVal = (window.masterBankSoal && window.masterBankSoal[moduleData.id] && window.masterBankSoal[moduleData.id].kkm) !== undefined ? window.masterBankSoal[moduleData.id].kkm : 70;
    container.innerHTML = `
        <div class="course-player-header">
            <h2 id="player-title" style="margin:0; font-size: 18px; color: var(--primary-navy); font-weight:800;">Evaluasi Belum Lulus: ${moduleData.title}</h2>
            <span class="badge" id="player-category">${moduleData.cat || 'Dasar Asuransi'}</span>
        </div>
        <div style="padding: 40px 20px; text-align: center; background: linear-gradient(180deg, #fef2f2 0%, #ffffff 100%);">
            <div style="font-size: 64px; margin-bottom: 16px;">📚</div>
            <h2 style="color: #b91c1c; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Nilai Belum Mencapai KKM</h2>
            <p style="color: var(--text-light); font-size: 14px; margin-bottom: 20px; max-width: 440px; margin-left: auto; margin-right: auto; line-height: 1.5;">
                Skor Post-Test Anda: <strong style="color: var(--danger-red); font-size: 16px;">${progress.postTestScore}%</strong> (KKM Kelulusan: <strong>${kkmVal}%</strong>).
            </p>
            
            <div style="margin-bottom: 24px; display: inline-block; padding: 12px 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 6px; text-align: left;">
                <p style="margin: 0; font-size: 13px; color: #78350f; font-weight: 600;">
                    ⚠️ Sisa kesempatan remedial Anda: <span style="color: var(--danger-red); font-weight: 800; font-size: 14.5px;">${progress.sisaRemedial} kali</span>
                </p>
                <p style="margin: 4px 0 0 0; font-size: 11.5px; color: #92400e; line-height:1.4;">
                    Jika sisa kesempatan habis dan gagal kembali, Anda harus mengulang modul ini dari awal.
                </p>
            </div>
            
            <div style="display: flex; gap: 12px; justify-content: center; max-width: 360px; margin: 0 auto; flex-wrap: wrap;">
                <button class="btn-primary" onclick="window.relearnMaterialPhase('${moduleData.id}')" style="flex: 1; padding: 11px; font-weight: bold; font-size: 13px; background: #2563eb; border: none; border-radius:6px; cursor:pointer; white-space: nowrap;">
                    📖 Pelajari Ulang Materi
                </button>
                <button class="btn-primary" onclick="window.startRemedialPhase('${moduleData.id}')" style="flex: 1; padding: 11px; font-weight: bold; font-size: 13px; background: #10b981; border: none; border-radius:6px; cursor:pointer; white-space: nowrap;">
                    📝 Remedial Post-Test
                </button>
            </div>
            <button class="btn-secondary" onclick="navigateTo('belajar')" style="margin-top: 16px; width: 100%; max-width: 360px; padding: 10px; font-weight: 700; font-size: 13px; border-radius:6px; cursor:pointer;">
                Kembali ke Daftar Materi
            </button>
        </div>
    `;
};

window.relearnMaterialPhase = function(moduleId) {
    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    progress.currentPhase = "learning";
    window.saveDataToStorage();
    
    window.renderCoursePlayer(moduleId);
};

window.startRemedialPhase = function(moduleId) {
    const agentId = window.getActiveAgentId();
    const progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    progress.currentPhase = "post-test";
    window.saveDataToStorage();
    
    window.renderCoursePlayer(moduleId);
};

window.openMaterialDetail = function(id) {
    window.loadModuleDetail(id);
    window.navigateTo('belajar-detail');
};

// ==================== LOGIKA PENYELESAIAN MATERI (MARK DONE) ====================
window.markActiveChapterDone = function() {
    try {
        const moduleId = window.currentActiveModuleId;
        if (!moduleId) {
            alert("Tidak dapat menandai selesai. ID Materi tidak ditemukan.");
            return;
        }

        const moduleData = window.modules.find(m => m.id === moduleId);
        if (!moduleData) return;

        const agentId = (window.currentUser && window.currentUser.id) ? window.currentUser.id : "AGN-001";
        
        // Ambil atau buat objek progress
        let progress = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");

        if (moduleData.wajibKuis) {
            // CABANG 1: WAJIB KUIS
            progress.statusMateri = "Selesai Baca";
            window.saveDataToStorage();

            alert("Materi selesai dibaca! Silakan kerjakan Kuis Kompetensi di tab sebelah untuk menyelesaikan modul ini.");
            
            // Pindah otomatis ke tab Kuis
            const tabs = document.querySelectorAll('.player-tab-btn');
            const quizTabBtn = Array.from(tabs).find(el => el.textContent.includes('Kuis'));
            if (quizTabBtn) {
                quizTabBtn.click();
            }
        } else {
            // CABANG 2: TIDAK WAJIB KUIS
            progress.statusMateri = "SELESAI";
            progress.statusKuis = "Lulus";
            window.saveDataToStorage();

            if (typeof window.triggerConfetti === 'function') window.triggerConfetti();
            alert("Selamat! Anda telah menyelesaikan materi ini.");
            
            // Update UI & Data secara real-time
            if (typeof window.evaluateAgentCertificates === 'function') {
                window.evaluateAgentCertificates();
            }
            if (typeof window.renderRecommendationBar === 'function') {
                window.renderRecommendationBar();
            }
            if (typeof window.renderBelajarAsuransi === 'function') {
                window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
            }

            window.navigateTo('belajar');
        }

    } catch (error) {
        console.error("Gagal menandai materi selesai:", error);
    }
};

// ==================== LOGIKA REKOMENDASI MATERI (PRIORITAS BERTINGKAT) ====================
window.getLatestAgentRecommendation = function() {
    const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user'));
    const agentId = (activeUser && activeUser.id) ? activeUser.id : "AGN-001";
    const agentEmail = (activeUser && activeUser.email) ? activeUser.email : "demo@agen.com";
    
    // Prioritas 1 (Melanjutkan Belajar): Selesai Baca, Belum Ikut Kuis
    for (let i = 0; i < window.modules.length; i++) {
        let m = window.modules[i];
        let prog = window.pa_agent_module_progress[`${agentId}_${m.id}`];
        if (prog && m.wajibKuis) {
            if (prog.statusMateri === 'Selesai Baca' && prog.statusKuis === 'Belum Ikut') {
                return { type: 'RESUME', judul: m.title, id: m.id };
            }
        }
    }
    
    // Prioritas 2 (Remedial Kuis): Gagal, masih ada sisaRemedial
    for (let i = 0; i < window.modules.length; i++) {
        let m = window.modules[i];
        let prog = window.pa_agent_module_progress[`${agentId}_${m.id}`];
        if (prog && m.wajibKuis) {
            if (prog.statusKuis === 'Gagal' && prog.sisaRemedial > 0) {
                return { type: 'REMEDIAL', judul: m.title, id: m.id, sisa: prog.sisaRemedial };
            }
        }
    }

    // Prioritas 3 (Lanjutkan Membaca): Sedang membaca materi (statusMateri === 'Belajar')
    for (let i = 0; i < window.modules.length; i++) {
        let m = window.modules[i];
        let prog = window.pa_agent_module_progress[`${agentId}_${m.id}`];
        if (prog && prog.statusMateri === 'Belajar') {
            return { type: 'READING', judul: m.title, id: m.id };
        }
    }
    
    // Prioritas 4 (Mulai Belajar): Belum pernah dibaca/diikuti
    for (let i = 0; i < window.modules.length; i++) {
        let m = window.modules[i];
        let prog = window.pa_agent_module_progress[`${agentId}_${m.id}`];
        if (!prog || prog.statusMateri === 'Belum Diikuti' || prog.statusMateri === 'Belum Mulai') {
            return { type: 'START', judul: m.title, id: m.id };
        }
    }
    
    // Prioritas 5 (Jadwal Training Terdekat): Online/Onsite belum dihadiri
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const attendance = JSON.parse(localStorage.getItem("pa_training_attendance")) || {};
    const myAttendance = attendance[agentEmail] || {};
    
    let nearestTraining = null;
    let now = new Date().getTime();
    
    for (let i = 0; i < trainings.length; i++) {
        let t = trainings[i];
        if (t.method === 'Online' || t.method === 'Onsite') {
            if (!myAttendance[t.id] || myAttendance[t.id].status !== "Hadir") {
                if (t.time >= now) {
                    if (!nearestTraining || t.time < nearestTraining.time) {
                        nearestTraining = t;
                    }
                }
            }
        }
    }
    
    if (nearestTraining) {
        let d = new Date(nearestTraining.time);
        let tgl = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        return { type: 'LIVE_TRAINING', judul: nearestTraining.title, tanggal: tgl };
    }
    
    // Fallback: Semua selesai
    return { type: 'ALL_CLEAR', pesan: "Semua materi aman! Anda siap mengikuti uji kompetensi." };
};

window.renderRecommendationBar = function() {
    const card = document.getElementById("dash-recommendation-card");
    if (!card) return;
    
    const rec = window.getLatestAgentRecommendation();
    
    let content = '';
    let clickAction = '';
    let bgColor = '#f0f9ff';
    let textColor = '#0369a1';
    let borderColor = '#bae6fd';
    
    if (rec.type === 'RESUME') {
        content = `🎯 Lanjutkan Belajar: Anda belum menyelesaikan kuis materi "${rec.judul}". Klik di sini untuk lanjut!`;
        clickAction = `window.openMaterialDetail('${rec.id}')`;
        bgColor = '#fef2f2'; textColor = '#b91c1c'; borderColor = '#fecaca';
    } else if (rec.type === 'REMEDIAL') {
        content = `⚠️ Remedial Kuis: Yuk coba lagi kuis "${rec.judul}". Sisa kesempatan Anda ${rec.sisa}x lagi!`;
        clickAction = `window.openMaterialDetail('${rec.id}')`;
        bgColor = '#fffbeb'; textColor = '#d97706'; borderColor = '#fde68a';
    } else if (rec.type === 'READING') {
        content = `📖 Lanjutkan Membaca: Selesaikan membaca materi "${rec.judul}". Klik di sini untuk lanjut!`;
        clickAction = `window.openMaterialDetail('${rec.id}')`;
        bgColor = '#f0f9ff'; textColor = '#0284c7'; borderColor = '#bae6fd';
    } else if (rec.type === 'START') {
        content = `📖 Mulai Belajar: Yuk pelajari materi baru "${rec.judul}". Klik di sini untuk mulai!`;
        clickAction = `window.openMaterialDetail('${rec.id}')`;
        bgColor = '#f0f9ff'; textColor = '#0284c7'; borderColor = '#bae6fd';
    } else if (rec.type === 'LIVE_TRAINING') {
        content = `📅 Live Training Terdekat: Ikuti kelas "${rec.judul}" pada ${rec.tanggal}. Klik untuk daftar!`;
        clickAction = `window.navigateTo('dashboard')`;
    } else {
        content = `✅ ${rec.pesan}`;
        clickAction = '';
        bgColor = '#dcfce7'; textColor = '#16a34a'; borderColor = '#bbf7d0';
    }

    if (clickAction) {
        card.innerHTML = `
            <div onclick="${clickAction}" 
                 onmouseover="this.style.filter='brightness(0.95)'" 
                 onmouseout="this.style.filter='brightness(1)'"
                 style="cursor: pointer; transition: 0.2s; padding: 16px; border-radius: 8px; background-color: ${bgColor}; color: ${textColor}; font-weight: 600; border: 1px solid ${borderColor}; display: flex; align-items: center; justify-content: space-between;">
                <span>${content}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
        `;
    } else {
        card.innerHTML = `
            <div style="padding: 16px; border-radius: 8px; background-color: ${bgColor}; color: ${textColor}; font-weight: 600; border: 1px solid ${borderColor};">
                ${content}
            </div>
        `;
    }
};

window.renderBelajarAsuransi = function(selectedLevel, searchQuery) {
    const container = document.getElementById("container-list-materi");
    if (!container) return;
    
    const term = searchQuery ? searchQuery.toLowerCase() : "";
    
    let filtered = window.modules.filter(m => {
        const mLevel = m.level || "Basic";
        if (mLevel !== selectedLevel) return false;
        
        if (term) {
            return (m.title && m.title.toLowerCase().includes(term)) || 
                   (m.cat && m.cat.toLowerCase().includes(term));
        }
        return true;
    });
    
    container.innerHTML = "";
    
    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); grid-column:1/-1;">Tidak ada materi ${selectedLevel} yang sesuai.</p>`;
        return;
    }
    
    filtered.forEach(m => {
        const agentId = "AGN-001"; // Default agen mock
        
        // Cek progress agen
        let progressObj = { statusMateri: "Belum Diikuti" };
        if (typeof window.initAgentModuleProgress === 'function') {
            progressObj = window.initAgentModuleProgress(agentId, m.id, "Mandiri");
        }
        
        let statusText = progressObj.statusMateri;
        let pct = 0;
        if (statusText === "SELESAI") {
            pct = 100;
        } else if (statusText === "Selesai Baca" || statusText === "Belajar") {
            pct = 50;
        }

        let lvlText = (m.level || selectedLevel || "Basic").toUpperCase();
        let lvlIcon = "🛡️";
        if (lvlText === "INTERMEDIATE") lvlIcon = "⚡";
        if (lvlText === "ADVANCED") lvlIcon = "🏆";
        let lvlBadge = `${lvlIcon} ${lvlText}`;

        let xpReward = m.xpReward || (lvlText === "BASIC" ? 100 : lvlText === "INTERMEDIATE" ? 150 : 200);
        let koinReward = m.koinReward || (lvlText === "BASIC" ? 20 : lvlText === "INTERMEDIATE" ? 30 : 50);
        let estMin = m.estMinutes || (lvlText === "BASIC" ? 15 : lvlText === "INTERMEDIATE" ? 20 : 25);
        let qCount = m.quiz ? m.quiz.length : 10;
        
        const html = `
            <div class="material-card" onclick="window.openMaterialDetail('${m.id}')">
              <div class="material-card-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; width:100%;">
                <span class="card-badge-level">${lvlBadge}</span>
                <span class="card-badge-reward ${lvlText === 'ADVANCED' ? 'advanced' : ''}">⚡ +${xpReward} XP &nbsp;•&nbsp; 🪙 ${koinReward} Koin</span>
              </div>
              
              <div class="material-card-body">
                <div class="material-card-title-row">
                  <div class="mat-icon-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div class="mat-title-box">
                    <h3>${m.title}</h3>
                    <span class="mat-cat-label">${m.cat || m.category || 'Kategori Umum'}</span>
                  </div>
                </div>
                
                <p class="material-card-desc">${m.desc || m.shortDesc || "Kuasai materi ini untuk memperkuat kompetensi keagenan Anda."}</p>
                
                <div class="material-card-meta">
                  <span>⏱️ Estimasi: ${estMin} Menit</span>
                  <span class="meta-dot">•</span>
                  <span>📝 ${qCount} Soal Kuis</span>
                </div>
              </div>
              
              <div class="material-card-footer-futuristic">
                <div class="card-progress-container">
                  <div class="card-progress-label">
                    <span>Progres Belajar</span>
                    <strong>${pct}%</strong>
                  </div>
                  <div class="card-progress-bar-bg">
                    <div class="card-progress-bar-fill" style="width: ${pct}%"></div>
                  </div>
                </div>
                ${pct === 100 ? `
                  <button class="btn-cta-futuristic btn-green" onclick="event.stopPropagation(); window.openMaterialDetail('${m.id}')">🏆 Modul Tuntas</button>
                ` : `
                  <button class="btn-cta-futuristic btn-blue" onclick="event.stopPropagation(); window.openMaterialDetail('${m.id}')">🚀 Mulai Tantangan</button>
                `}
              </div>
            </div>
        `;
        container.innerHTML += html;
    });
};

// ==================== LOGIKA PELACAKAN PROGRES AGEN & KUIS MODUL ====================
window.initAgentModuleProgress = function(agentId, moduleId, method = "Mandiri") {
    let key = `${agentId}_${moduleId}`;
    
    if (!window.pa_agent_module_progress[key]) {
        window.pa_agent_module_progress[key] = {
            agentId: agentId,
            moduleId: moduleId,
            metodeIkut: method,
            statusMateri: "Belum Diikuti",
            statusKuis: "Belum Ikut",
            skorKuis: 0,
            sisaRemedial: 2,
            preTestScore: null,
            postTestAttempts: 0,
            postTestScore: null,
            currentPhase: "pre-test"
        };
        window.saveDataToStorage();
    } else {
        let rec = window.pa_agent_module_progress[key];
        if (rec.preTestScore === undefined) rec.preTestScore = null;
        if (rec.postTestAttempts === undefined) rec.postTestAttempts = 0;
        if (rec.postTestScore === undefined) rec.postTestScore = null;
        if (rec.currentPhase === undefined) {
            if (rec.statusMateri === "SELESAI") {
                rec.currentPhase = "completed";
            } else if (rec.preTestScore !== null) {
                rec.currentPhase = "learning";
            } else {
                rec.currentPhase = "pre-test";
            }
        }
    }
    return window.pa_agent_module_progress[key];
};

window.getModuleQuestions = function(module, type = 'post-test') {
    const bank = window.masterBankSoal && window.masterBankSoal[module.id];
    if (bank) {
        const list = type === 'pre-test' ? bank.preTest : bank.postTest;
        if (list && Array.isArray(list) && list.length > 0) {
            return list.map(q => ({
                question: q.question,
                options: q.options,
                correctIndex: q.correctIndex,
                explanation: q.explanation || ""
            }));
        }
    }
    
    // Fallback to legacy structure
    if (module.soalKuis && Array.isArray(module.soalKuis) && module.soalKuis.length > 0) {
        return module.soalKuis.map(q => ({
            question: q.q,
            options: [q.a, q.b, q.c, q.d],
            correctIndex: ['a', 'b', 'c', 'd'].indexOf(q.correct),
            explanation: q.explanation || "Kunci jawaban yang benar adalah " + q.correct.toUpperCase() + "."
        }));
    } else if (module.quiz && Array.isArray(module.quiz) && module.quiz.length > 0) {
        return module.quiz.map(q => ({
            question: q.question,
            options: q.options,
            correctIndex: q.correctAnswer !== undefined ? q.correctAnswer : q.correctIndex,
            explanation: q.explanation || ""
        }));
    }
    return [
        {
            question: "Apa tujuan utama mempelajari modul ini?",
            options: ["Meningkatkan pengetahuan", "Mendapatkan komisi saja", "Mengabaikan nasabah", "Semua salah"],
            correctIndex: 0,
            explanation: "Materi ini bertujuan untuk meningkatkan kompetensi dan profesionalisme agen."
        }
    ];
};

window.addAgentXpAndCoins = function(xpAmount, coinAmount) {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    if (!activeUser && currentRole === 'Agen') {
        activeUser = { email: "agen@insuremind.id", role: "Agen", name: "Rian Aditya" };
    }
    if (!activeUser || activeUser.role !== 'Agen') return;

    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let rianKey = "progress_" + activeUser.email;
    let userProgress = progData[rianKey];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"] || {};
    }

    userProgress.xp = (userProgress.xp || 0) + xpAmount;
    userProgress.coins = (userProgress.coins || 0) + coinAmount;
    
    const newLevel = Math.floor(userProgress.xp / 100) + 1;
    if (newLevel > (userProgress.level || 1)) {
        userProgress.level = newLevel;
        window.showToast(`🎉 Level Up! Anda sekarang Level ${newLevel}!`, "success");
    }

    progData[rianKey] = userProgress;
    localStorage.setItem("pa_agent_progress", JSON.stringify(progData));
    
    window.syncGamificationWidgets();
};

window.markMaterialAsRead = function(agentId, moduleId) {
    let key = `${agentId}_${moduleId}`;
    if (window.pa_agent_module_progress[key] && window.pa_agent_module_progress[key].statusMateri !== "SELESAI") {
        window.pa_agent_module_progress[key].statusMateri = "Selesai Baca";
        window.saveDataToStorage();
    }
};

window.submitAgenMaterialQuiz = function(agentId, moduleId, score) {
    let key = `${agentId}_${moduleId}`;
    
    if (!window.pa_agent_module_progress[key]) {
        window.pa_agent_module_progress[key] = {
            agentId: agentId,
            moduleId: moduleId,
            metodeIkut: "Mandiri",
            statusMateri: "Selesai Baca",
            statusKuis: "Belum Ikut",
            skorKuis: 0,
            sisaRemedial: 2
        };
    }
    
    let rec = window.pa_agent_module_progress[key];
    
    if (score >= 70) {
        rec.statusKuis = "Lulus";
        rec.skorKuis = score;
        rec.statusMateri = "SELESAI";
        window.saveDataToStorage();
        
        issueCertificate(agentId, moduleId);
        if (typeof window.triggerConfetti === 'function') window.triggerConfetti();
        alert(`Selamat! Anda LULUS dengan skor ${score}%. Modul telah ditandai SELESAI dan Sertifikat diterbitkan.`);
    } else {
        if (rec.sisaRemedial > 0) {
            rec.sisaRemedial--;
            rec.statusKuis = "Gagal";
            rec.skorKuis = score;
            window.saveDataToStorage();
            alert(`Anda GAGAL. Skor ${score}%. Sisa remedial: ${rec.sisaRemedial} kali.`);
        } else {
            rec.statusKuis = "Gagal Permanen";
            rec.skorKuis = score;
            window.saveDataToStorage();
            alert(`Anda GAGAL. Skor ${score}%. Anda telah kehabisan kesempatan mengulang kuis untuk modul ini.`);
        }
    }
};

window.triggerConfetti = function() {
    if (typeof confetti === 'function') {
        var count = 200;
        var defaults = { origin: { y: 0.7 }, zIndex: 99999 };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
};

window.issueCertificate = function(agentId, moduleId) {
    let certs = JSON.parse(localStorage.getItem("pa_agent_certificates")) || [];
    certs.push({
        agentId: agentId,
        moduleId: moduleId,
        date: new Date().toISOString()
    });
    localStorage.setItem("pa_agent_certificates", JSON.stringify(certs));
};

window.renderAgenMaterialQuiz = function(moduleId) {
    const container = document.getElementById("player-quiz-container");
    if (!container) return;
    
    const mat = window.modules.find(m => m.id === moduleId);
    
    if (!mat || !mat.wajibKuis || !mat.soalKuis || mat.soalKuis.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted);">Tidak ada kuis wajib untuk materi ini.</p>`;
        return;
    }

    const agentId = "AGN-001"; 
    let progressData = window.initAgentModuleProgress(agentId, moduleId, "Mandiri");
    
    if (progressData.statusKuis === "Lulus") {
        container.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <h3 style="color:var(--success-color); margin-bottom:12px;">✅ Anda Telah Lulus Kuis Ini</h3>
                <p style="margin-bottom:16px;">Skor Anda: <strong>${progressData.skorKuis}%</strong></p>
                <button class="btn-secondary" disabled style="opacity:0.8; cursor:not-allowed;">Sertifikat Diterbitkan</button>
            </div>
        `;
        return;
    }
    
    if (progressData.sisaRemedial <= 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <h3 style="color:var(--danger-red); margin-bottom:12px;">❌ Kesempatan Ujian Habis</h3>
                <p style="margin-bottom:16px; font-weight:600;">Kesempatan ujian habis. Silakan hubungi Trainer untuk reset evaluasi manual.</p>
                <button class="btn-primary" disabled style="background:#ccc; cursor:not-allowed;">Mulai Kuis Terkunci</button>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="margin-bottom: 20px; padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
            <p style="margin:0; font-size: 14px;"><strong>Perhatian:</strong> Sisa kesempatan mengulang kuis ini: <span style="color:var(--danger-red); font-weight:bold;">${progressData.sisaRemedial} kali</span></p>
        </div>
    `;
    
    html += `<form id="form-agen-mat-quiz">`;
    mat.soalKuis.forEach((soal, i) => {
        html += `
            <div class="quiz-question-box" style="margin-bottom: 20px; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--border-radius-md);">
                <p style="font-weight: 600; margin-bottom: 12px;">${i + 1}. ${soal.q}</p>
                <label style="display:block; margin-bottom:8px; cursor:pointer;"><input type="radio" name="q${i}" value="a"> A. ${soal.a}</label>
                <label style="display:block; margin-bottom:8px; cursor:pointer;"><input type="radio" name="q${i}" value="b"> B. ${soal.b}</label>
                <label style="display:block; margin-bottom:8px; cursor:pointer;"><input type="radio" name="q${i}" value="c"> C. ${soal.c}</label>
                <label style="display:block; margin-bottom:8px; cursor:pointer;"><input type="radio" name="q${i}" value="d"> D. ${soal.d}</label>
            </div>
        `;
    });
    html += `<button type="button" class="btn-primary" onclick="submitAgenMaterialQuizForm('${moduleId}')" style="width:100%; padding:12px;">Kirim Jawaban Kuis</button>`;
    html += `</form>`;
    
    container.innerHTML = html;
};

window.submitAgenMaterialQuizForm = function(moduleId) {
    let materials = JSON.parse(localStorage.getItem('pa_materials')) || [];
    const mat = materials.find(m => m.id === moduleId);
    if (!mat) return;
    
    let correctCount = 0;
    mat.soalKuis.forEach((soal, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === soal.correct) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / mat.soalKuis.length) * 100);
    const agentId = "AGN-001";
    
    window.submitAgenMaterialQuiz(agentId, moduleId, score);
    window.renderAgenMaterialQuiz(moduleId);
};

window.evaluateAgentCertificates = function() {
    let progressData = JSON.parse(localStorage.getItem("pa_agent_module_progress")) || {};
    let materials = JSON.parse(localStorage.getItem('pa_materials')) || [];
    
    let targets = { Basic: 4, Intermediate: 13, Advanced: 14 };
    let completed = { Basic: 0, Intermediate: 0, Advanced: 0 };
    
    materials.forEach(mat => {
        let key = `AGN-001_${mat.id}`; 
        let rec = progressData[key];
        if (rec && rec.statusMateri === "SELESAI") {
            if (mat.level === "Basic") completed.Basic++;
            if (mat.level === "Intermediate") completed.Intermediate++;
            if (mat.level === "Advanced") completed.Advanced++;
        }
    });

    const updateUI = (lvlId, target, count) => {
        const progEl = document.getElementById(`cert-prog-${lvlId}`);
        const statEl = document.getElementById(`cert-stat-${lvlId}`);
        const btnEl = document.getElementById(`btn-cert-${lvlId}`);
        
        if (!progEl || !statEl || !btnEl) return;
        
        progEl.innerText = `${count}/${target}`;
        
        if (count >= target) {
            statEl.innerText = "Memenuhi Syarat";
            statEl.className = "cert-badge cert-badge-success";
            btnEl.disabled = false;
        } else {
            statEl.innerText = "Belum Memenuhi Syarat";
            statEl.className = "cert-badge cert-badge-danger";
            btnEl.disabled = true;
        }
    };
    
    updateUI('basic', targets.Basic, completed.Basic);
    updateUI('int', targets.Intermediate, completed.Intermediate);
    updateUI('adv', targets.Advanced, completed.Advanced);
    
    if (typeof window.renderAgentProgressPage === 'function') {
        window.renderAgentProgressPage();
    }
};

window.renderAgentProgressPage = function() {
    let progressData = JSON.parse(localStorage.getItem("pa_agent_module_progress")) || {};
    let materials = JSON.parse(localStorage.getItem('pa_materials')) || [];
    let trainings = JSON.parse(localStorage.getItem('pa_trainings')) || [];
    let attendanceData = JSON.parse(localStorage.getItem('pa_training_attendance')) || {};
    let trainingQuizData = JSON.parse(localStorage.getItem('pa_training_quiz_attempts')) || {};
    
    // Gunakan data user yang sedang login (bukan hardcoded)
    const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user'));
    const agentId = (activeUser && activeUser.id) ? activeUser.id : "AGN-001";
    const agentEmail = (activeUser && activeUser.email) ? activeUser.email : "demo@agen.com";
    const agentName = (activeUser && activeUser.name) ? activeUser.name : "Agen";

    
    let totalScore = 0;
    let quizCount = 0;
    let lmsSelesaiCount = 0;
    let tableHtml = "";
    
    // 1. Hitung Total Skor & Render Tabel Riwayat Kuis LMS
    for (const key in progressData) {
        if (key.startsWith(agentId + "_")) {
            const rec = progressData[key];
            if (rec.statusMateri === "SELESAI") {
                lmsSelesaiCount++;
            }
            if (rec.statusKuis !== "Belum Ikut") {
                totalScore += Number(rec.skorKuis || 0);
                quizCount++;
                
                const mat = materials.find(m => m.id === rec.moduleId);
                const title = mat ? (mat.judul || mat.title) : rec.moduleId;
                
                let badgeHtml = "";
                if (rec.statusKuis === "Lulus") {
                    badgeHtml = `<span class="cert-badge cert-badge-success">${rec.statusKuis}</span>`;
                } else {
                    badgeHtml = `<span class="cert-badge cert-badge-danger">${rec.statusKuis}</span>`;
                }
                
                tableHtml += `
                    <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:12px 8px; font-weight:600;">${title}</td>
                        <td style="padding:12px 8px; font-weight:700; color:var(--primary-navy);">${rec.skorKuis || 0}</td>
                        <td style="padding:12px 8px;">${badgeHtml}</td>
                    </tr>
                `;
            }
        }
    }
    
    // Suntikkan ke tabel Nilai Kuis Bab (LMS)
    const tableBody = document.getElementById("progress-quiz-rows");
    if (tableBody) {
        if (tableHtml === "") {
            tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada riwayat kuis yang diikuti</td></tr>`;
        } else {
            tableBody.innerHTML = tableHtml;
        }
    }
    
    // 2. Kalkulasi 'Total Training Selesai' & Render Tabel Live Training
    let liveSelesaiCount = 0;
    let liveTableHtml = "";
    const myAttendance = attendanceData[agentEmail] || {};
    const myLiveQuiz = trainingQuizData[agentEmail] || {};
    
    trainings.forEach(t => {
        const attendRecord = myAttendance[t.id];
        if (attendRecord) {
            const isHadir = attendRecord.status === "Hadir";
            if (isHadir) liveSelesaiCount++;
            
            const liveQuizRecord = myLiveQuiz[t.id];
            let liveScore = '-';
            if (liveQuizRecord && liveQuizRecord.bestScore !== undefined) {
                liveScore = liveQuizRecord.bestScore;
                totalScore += Number(liveScore);
                quizCount++;
            }
            
            const dateStr = new Date(t.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'});
            
            let statusBadge = isHadir 
                ? `<span class="cert-badge cert-badge-success">Hadir</span>` 
                : `<span class="cert-badge cert-badge-danger">${attendRecord.status}</span>`;
            
            let actionBtn = isHadir 
                ? `<button class="btn-outline-primary" style="padding:4px 8px; font-size:11px;" onclick="openPrintCertificate('${t.title}', '${liveScore}')">Unduh Sertifikat</button>` 
                : `-`;
                
            liveTableHtml += `
                <tr style="border-bottom:1px solid #e2e8f0;">
                    <td style="padding:12px 8px; font-weight:600;">${t.title}</td>
                    <td style="padding:12px 8px;">${dateStr}</td>
                    <td style="padding:12px 8px; font-weight:700;">${liveScore}</td>
                    <td style="padding:12px 8px;">${statusBadge}</td>
                    <td style="padding:12px 8px;">${actionBtn}</td>
                </tr>
            `;
        }
    });
    
    // Tampilkan rata-rata GABUNGAN ke widget Progress Page dan Dashboard
    const avgScoreProgEl = document.getElementById("prog-avg-quiz");
    const avgScoreDashEl = document.getElementById("dash-last-quiz");
    const avgLabelDashEl = document.getElementById("dash-last-quiz-label");
    
    let finalAvgText = "--";
    if (quizCount > 0) {
        finalAvgText = Math.round(totalScore / quizCount);
    }
    
    if (avgScoreProgEl) avgScoreProgEl.innerText = finalAvgText;
    if (avgScoreDashEl) avgScoreDashEl.innerText = finalAvgText;
    if (avgLabelDashEl) {
        avgLabelDashEl.innerText = quizCount > 0 ? "Rata-rata Skor Keseluruhan" : "Belum mengerjakan kuis";
    }
    
    const liveTableBody = document.getElementById("progress-live-cert-rows");
    if (liveTableBody) {
        if (liveTableHtml === "") {
            liveTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada sertifikat dari Live Training yang tersedia.</td></tr>`;
        } else {
            liveTableBody.innerHTML = liveTableHtml;
        }
    }
    
    const totalExamsEl = document.getElementById("prog-total-exams");
    if (totalExamsEl) {
        totalExamsEl.innerText = (lmsSelesaiCount + liveSelesaiCount) + " Kali";
    }
    
    // 3. Render Lencana Pencapaian
    const badgesContainer = document.getElementById("badges-container-list");
    if (badgesContainer) {
        let targets = { Basic: 4, Intermediate: 13, Advanced: 14 };
        let completed = { Basic: 0, Intermediate: 0, Advanced: 0 };
        
        materials.forEach(mat => {
            let key = `${agentId}_${mat.id}`; 
            let rec = progressData[key];
            if (rec && rec.statusMateri === "SELESAI") {
                if (mat.level === "Basic") completed.Basic++;
                if (mat.level === "Intermediate") completed.Intermediate++;
                if (mat.level === "Advanced") completed.Advanced++;
            }
        });
        
        let badgesHtml = "";
        let badgeCount = 0;
        
        const renderBadge = (title, color1, color2, icon) => {
            return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:8px; padding:16px; background:#fff; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); transition:transform 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, ${color1}, ${color2}); display:flex; align-items:center; justify-content:center; font-size:32px; box-shadow:0 8px 16px -4px ${color2}; border:3px solid #fff;">
                    ${icon}
                </div>
                <span style="font-size:12px; font-weight:700; color:var(--primary-navy); text-align:center;">${title}</span>
            </div>
            `;
        };
        
        if (completed.Basic >= targets.Basic) {
            badgesHtml += renderBadge("Lulusan Basic", "#FDE047", "#F59E0B", "🥉");
            badgeCount++;
        }
        if (completed.Intermediate >= targets.Intermediate) {
            badgesHtml += renderBadge("Ekspert Intermediate", "#E2E8F0", "#64748B", "🥈");
            badgeCount++;
        }
        if (completed.Advanced >= targets.Advanced) {
            badgesHtml += renderBadge("Master Advanced", "#FEF08A", "#EAB308", "🏆");
            badgeCount++;
        }
        
        const badgeCountEl = document.getElementById("total-badges-count");
        if (badgeCountEl) {
            badgeCountEl.innerText = badgeCount + " Lencana";
        }
        
        if (badgesHtml === "") {
            badgesContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); grid-column:1/-1; padding:20px 0;">Belum ada lencana yang diraih. Terus selesaikan kuis untuk mendapatkan lencana!</p>`;
            badgesContainer.style.display = "block";
        } else {
            badgesContainer.style.display = "grid";
            badgesContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(120px, 1fr))";
            badgesContainer.style.gap = "1rem";
            badgesContainer.innerHTML = badgesHtml;
        }
    }
};

// ==================== FUNGSI CETAK SERTIFIKAT ====================
window.openPrintCertificate = function(trainingTitle, score) {
    const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user'));
    const namaAgen = (activeUser && activeUser.name) ? activeUser.name : 'Agen';
    const scoreText = score ? `${score}%` : '100%';
    const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const certWindow = window.open('', '_blank', 'width=900,height=650');
    if (!certWindow) {
        if (window.showToast) window.showToast('Popup diblokir. Izinkan popup untuk mencetak sertifikat.', 'warning');
        return;
    }

    certWindow.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Sertifikat - ${trainingTitle}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
  .cert { width: 800px; min-height: 560px; background: white; border: 12px solid #0f172a; border-radius: 4px; padding: 48px 60px; text-align: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  .cert::before { content: ''; position: absolute; inset: 8px; border: 2px solid #008DDA; border-radius: 2px; pointer-events: none; }
  .logo-area { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; }
  .logo-box { width: 48px; height: 48px; background: #0f172a; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 18px; }
  .logo-text { font-size: 22px; font-weight: 800; color: #0f172a; }
  .logo-text span { color: #008DDA; }
  .cert-label { font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: #64748b; margin-bottom: 12px; font-weight: 600; }
  .cert-title { font-family: 'Playfair Display', serif; font-size: 40px; color: #0f172a; margin-bottom: 28px; line-height: 1.2; }
  .cert-presented { font-size: 14px; color: #64748b; margin-bottom: 12px; }
  .cert-name { font-family: 'Playfair Display', serif; font-size: 34px; color: #008DDA; font-weight: 700; margin-bottom: 20px; border-bottom: 2px solid #008DDA; display: inline-block; padding-bottom: 6px; }
  .cert-desc { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 28px; }
  .cert-training { font-size: 17px; font-weight: 700; color: #0f172a; background: #f0f9ff; border: 1px solid #bae6fd; padding: 10px 24px; border-radius: 8px; display: inline-block; margin-bottom: 24px; }
  .cert-meta { display: flex; justify-content: space-around; margin-top: 32px; padding-top: 24px; border-top: 1px dashed #cbd5e1; }
  .cert-meta-item { text-align: center; }
  .cert-meta-item .val { font-size: 22px; font-weight: 800; color: #0f172a; }
  .cert-meta-item .lbl { font-size: 11px; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
  .cert-footer { margin-top: 32px; font-size: 11px; color: #94a3b8; }
  @media print { body { background: white; } .no-print { display: none; } }
  .print-btn { margin-top: 20px; padding: 12px 32px; background: #0f172a; color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
</style>
</head>
<body>
<div>
  <div class="cert">
    <div class="logo-area">
      <div class="logo-box">ASM</div>
      <div class="logo-text">ASM <span>Academy</span></div>
    </div>
    <p class="cert-label">Sertifikat Kelulusan</p>
    <h1 class="cert-title">Certificate of Completion</h1>
    <p class="cert-presented">Dengan bangga diberikan kepada</p>
    <div class="cert-name">${namaAgen}</div>
    <p class="cert-desc">
      Telah berhasil menyelesaikan dan lulus ujian kuis pada program<br>Live Training resmi ASM Insurance Academy
    </p>
    <div class="cert-training">🎓 ${trainingTitle}</div>
    <div class="cert-meta">
      <div class="cert-meta-item">
        <div class="val">${scoreText}</div>
        <div class="lbl">Skor Kuis</div>
      </div>
      <div class="cert-meta-item">
        <div class="val">LULUS</div>
        <div class="lbl">Status</div>
      </div>
      <div class="cert-meta-item">
        <div class="val">${tanggal}</div>
        <div class="lbl">Tanggal</div>
      </div>
    </div>
    <p class="cert-footer">Sertifikat ini diterbitkan secara digital oleh ASM Insurance Academy • Tidak memerlukan tanda tangan basah</p>
  </div>
  <div style="text-align:center;" class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
    <button class="print-btn" style="background:#64748b; margin-left:12px;" onclick="window.close()">Tutup</button>
  </div>
</div>
</body>
</html>`);
    certWindow.document.close();
};

window.renderTrainerEvaluasi = function() {
    const tbody = document.getElementById("trainer-evaluasi-rows");
    if (!tbody) return;
    
    let progressData = JSON.parse(localStorage.getItem("pa_agent_module_progress")) || {};
    let materials = JSON.parse(localStorage.getItem('pa_materials')) || [];
    
    let html = "";
    for (const key in progressData) {
        const rec = progressData[key];
        if (rec.statusKuis === "Gagal" || rec.statusKuis === "Gagal Permanen") {
            const mat = materials.find(m => m.id === rec.moduleId);
            const judulModul = mat ? (mat.judul || mat.title) : rec.moduleId;
            
            let statusText = rec.sisaRemedial <= 0 
                ? "Kehabisan Kesempatan Kuis" 
                : `Gagal (Sisa Kesempatan: ${rec.sisaRemedial})`;
            
            html += `
              <tr>
                <td>Agen (ID: ${rec.agentId})</td>
                <td>${judulModul}</td>
                <td><span style="color:var(--danger-red); font-weight:600;">${statusText}</span></td>
                <td>Baru Saja</td>
                <td>
                  <button class="btn-primary" style="padding:4px 8px; font-size:11px; margin-right:4px;" onclick="overrideLuluskanAgen('${rec.agentId}', '${rec.moduleId}')">Luluskan</button>
                  <button class="btn-secondary" style="padding:4px 8px; font-size:11px; margin-right:4px;" onclick="alert('Tindakan ditolak.')">Tolak</button>
                  <button class="btn-outline-warning" onclick="resetKesempatanAgen('${rec.agentId}', '${rec.moduleId}')">Reset Kesempatan</button>
                </td>
              </tr>
            `;
        }
    }
    
    if (html === "") {
        html = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">Tidak ada agen yang gagal ujian saat ini.</td></tr>`;
    }
    tbody.innerHTML = html;
};

window.resetKesempatanAgen = function(agentId, moduleId) {
    let key = `${agentId}_${moduleId}`;
    if (window.pa_agent_module_progress[key]) {
        window.pa_agent_module_progress[key].sisaRemedial = 2;
        window.pa_agent_module_progress[key].statusKuis = "Belum Ikut";
        window.saveDataToStorage();
        alert("Kesempatan kuis berhasil di-reset menjadi 2 kali. Agen kini bisa mengulang ujiannya.");
        renderTrainerEvaluasi();
    }
};

window.overrideLuluskanAgen = function(agentId, moduleId) {
    if (confirm("Anda yakin ingin secara paksa meluluskan agen ini?")) {
        let key = `${agentId}_${moduleId}`;
        if (window.pa_agent_module_progress[key]) {
            window.pa_agent_module_progress[key].statusKuis = "Lulus";
            window.pa_agent_module_progress[key].statusMateri = "SELESAI";
            window.saveDataToStorage();
            
            if (typeof window.issueCertificate === 'function') {
                window.issueCertificate(agentId, moduleId);
            }
            alert("Agen berhasil diluluskan secara manual dan sertifikat telah diterbitkan.");
            renderTrainerEvaluasi();
        }
    }
};

// ==================== FUNGSI JADWAL TRAINING (TRAINER) ====================
window.showCreateTrainingModal = function() {
    document.getElementById("trn-ev-title").value = "";
    document.getElementById("trn-ev-time").value = "";
    document.getElementById("trn-ev-method").value = "Tatap Muka";
    if(document.getElementById("trn-ev-level")) document.getElementById("trn-ev-level").value = "Basic";
    document.getElementById("trn-ev-link").value = "";
    document.getElementById("trn-ev-pdf").value = "";
    document.getElementById("trn-ev-quota").value = "";
    document.getElementById("trn-ev-token").value = "";
    const modal = document.getElementById("modal-create-training");
    if (modal) modal.style.display = "flex";
};

window.hideCreateTrainingModal = function() {
    const modal = document.getElementById("modal-create-training");
    if (modal) modal.style.display = "none";
};

window.saveTrainingEvent = async function() {
    const title = document.getElementById("trn-ev-title").value;
    const timeStr = document.getElementById("trn-ev-time").value;
    const method = document.getElementById("trn-ev-method").value;
    const levelEl = document.getElementById("trn-ev-level");
    const level = levelEl ? levelEl.value : "Basic";
    const link = document.getElementById("trn-ev-link").value;
    const pdf = document.getElementById("trn-ev-pdf").value;
    const quota = document.getElementById("trn-ev-quota").value;
    const token = document.getElementById("trn-ev-token").value;

    if (!title || !timeStr || !method || !quota || !token) {
        alert("Lengkapi semua kolom yang diperlukan.");
        return;
    }

    let flyerUrl = "";
    const flyerInput = document.getElementById("trn-ev-flyer");
    if (flyerInput && flyerInput.files && flyerInput.files.length > 0) {
        const file = flyerInput.files[0];
        try {
            flyerUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = e => reject(e);
                reader.readAsDataURL(file);
            });
        } catch(e) {
            console.error("Gagal membaca file gambar:", e);
        }
    }

    const zoomId = document.getElementById("trn-ev-zoom-id") ? document.getElementById("trn-ev-zoom-id").value.trim() : "";
    const zoomPw = document.getElementById("trn-ev-zoom-pw") ? document.getElementById("trn-ev-zoom-pw").value.trim() : "";

    const newTraining = {
        id: "tr-" + Math.floor(Math.random() * 100000),
        title: title,
        time: new Date(timeStr).getTime(),
        method: method,
        level: level,
        link: link,
        zoomId: zoomId,
        zoomPw: zoomPw,
        pdf: pdf,
        flyerUrl: flyerUrl,
        quota: quota + " Peserta",
        token: token,
        status: "Scheduled", // New status
        quiz: [] 
    };

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    trainings.unshift(newTraining);
    try {
        localStorage.setItem("pa_trainings", JSON.stringify(trainings));
        alert("Jadwal training berhasil disimpan!");
        hideCreateTrainingModal();
        renderTrainerTrainings();
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert("Gagal menyimpan: Ukuran gambar terlalu besar! Mohon gunakan gambar dengan ukuran lebih kecil (maks ~2MB).");
            console.error("LocalStorage Quota Exceeded:", e);
        } else {
            alert("Gagal menyimpan data training.");
            console.error("Error saving training:", e);
        }
    }
};

window.renderTrainerTrainings = function() {
    const tbody = document.getElementById("trainer-training-rows");
    if (!tbody) return;
    if (typeof window.renderSyllabusUI === 'function') window.renderSyllabusUI();
    
    // Ensure data exists
    initTrainingData();
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    let attendance = {};
    try {
        const storedAtt = localStorage.getItem("pa_training_attendance");
        if (storedAtt) {
            const parsed = JSON.parse(storedAtt);
            attendance = Array.isArray(parsed) ? Object.assign({}, parsed) : parsed;
        }
    } catch(e) {}
    tbody.innerHTML = "";
    
    trainings.forEach(t => {
        let totalPeserta = 0;
        let hadirCount = 0;
        for (let userEmail in attendance) {
            if (attendance[userEmail][t.id]) {
                totalPeserta++;
                if (attendance[userEmail][t.id].status === "Hadir") hadirCount++;
            }
        }

        const tr = document.createElement("tr");
        const dateStr = new Date(t.time).toLocaleString('id-ID');
        const isCompleted = t.status === "Completed";
        const completeBtn = isCompleted 
            ? `<span style="color:#10b981; font-weight:bold; font-size:11px; display:inline-block; margin-top:4px;">✅ Selesai</span>` 
            : `<button class="btn-primary" style="padding:4px 8px; font-size:11px; background:#f59e0b; margin-top:4px;" onclick="markTrainingCompleted('${t.id}')">✅ Nyatakan Selesai</button>`;
            
        tr.innerHTML = `
            <td>
                <strong>${t.title}</strong>
                <div style="margin-top: 4px; font-size: 11px; color: #10b981; font-weight: 600;">
                    👥 RSVP: ${totalPeserta} Agen | Hadir: ${hadirCount} Agen
                </div>
            </td>
            <td>${dateStr}</td>
            <td>${t.method}</td>
            <td>
                <span style="font-size:11px; padding:4px 8px; border-radius:4px; background:#e0f2fe; color:#0284c7; font-weight:bold; display:inline-block; margin-bottom:4px;">Token: ${t.token}</span>
                <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
                    <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:#0284c7; border-color:#0284c7;" onclick="window.openEditTrainingPretestModal('${t.id}')">📋 Pre-Test</button>
                    <button class="btn-primary" style="padding:4px 8px; font-size:11px;" onclick="openEditTrainingQuizModal('${t.id}')">📝 Kuis</button>
                    <button style="padding:4px 8px; font-size:11px; background:#f8fafc; color:#334155; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; font-weight:600;" onclick="window.openEditTrainingModal('${t.id}')">✏️ Edit</button>
                    <button style="padding:4px 8px; font-size:11px; background:#fef2f2; color:#dc2626; border:1px solid #fecaca; border-radius:6px; cursor:pointer; font-weight:600;" onclick="window.deleteTraining('${t.id}')">🗑️ Hapus</button>
                </div>
                <div style="margin-top:4px;">${completeBtn}</div>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

let currentEditTrainingId = null;

window.openEditTrainingQuizModal = function(id) {
    currentEditTrainingId = id;
    renderQuizQuestionsList();
    const modal = document.getElementById("modal-edit-training-quiz");
    if (modal) modal.style.display = "flex";
};

window.hideEditTrainingQuizModal = function() {
    const modal = document.getElementById("modal-edit-training-quiz");
    if (modal) modal.style.display = "none";
};

// ==================== EDIT JADWAL TRAINING ====================
let currentEditingTrainingId = null;

window.openEditTrainingModal = function(id) {
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const t = trainings.find(x => x.id === id);
    if (!t) return;

    currentEditingTrainingId = id;

    // Isi form dengan data yang ada
    document.getElementById('edit-tr-title').value = t.title || '';
    document.getElementById('edit-tr-method').value = t.method || 'Tatap Muka';
    document.getElementById('edit-tr-link').value = t.link || '';
    document.getElementById('edit-tr-pdf').value = t.pdf || '';
    document.getElementById('edit-tr-quota').value = parseInt(t.quota) || '';
    document.getElementById('edit-tr-token').value = t.token || '';
    document.getElementById('edit-tr-zoom-id').value = t.zoomId || '';
    document.getElementById('edit-tr-zoom-pw').value = t.zoomPw || '';

    // Set datetime-local
    if (t.time) {
        const d = new Date(t.time);
        const offset = d.getTimezoneOffset();
        const local = new Date(d.getTime() - offset * 60000);
        document.getElementById('edit-tr-time').value = local.toISOString().slice(0, 16);
    }

    // Tampilkan preview flyer jika ada
    const preview = document.getElementById('edit-tr-flyer-preview');
    if (preview) {
        if (t.flyerUrl) {
            preview.innerHTML = `<img src="${t.flyerUrl}" style="width:100%; max-height:80px; object-fit:cover; border-radius:6px; margin-top:6px;">`;
        } else {
            preview.innerHTML = '<span style="font-size:11px; color:#94a3b8;">Belum ada flyer</span>';
        }
    }

    const modal = document.getElementById('modal-edit-training');
    if (modal) modal.style.display = 'flex';
};

window.closeEditTrainingModal = function() {
    const modal = document.getElementById('modal-edit-training');
    if (modal) modal.style.display = 'none';
    currentEditingTrainingId = null;
};

window.saveEditTraining = async function() {
    if (!currentEditingTrainingId) return;

    const title = document.getElementById('edit-tr-title').value.trim();
    const timeStr = document.getElementById('edit-tr-time').value;
    const method = document.getElementById('edit-tr-method').value;
    const link = document.getElementById('edit-tr-link').value.trim();
    const pdf = document.getElementById('edit-tr-pdf').value.trim();
    const quota = document.getElementById('edit-tr-quota').value;
    const token = document.getElementById('edit-tr-token').value.trim();
    const zoomId = document.getElementById('edit-tr-zoom-id') ? document.getElementById('edit-tr-zoom-id').value.trim() : '';
    const zoomPw = document.getElementById('edit-tr-zoom-pw') ? document.getElementById('edit-tr-zoom-pw').value.trim() : '';

    if (!title || !timeStr || !method || !quota || !token) {
        alert('Mohon lengkapi semua kolom yang diperlukan.');
        return;
    }

    const trainings = JSON.parse(localStorage.getItem('pa_trainings')) || [];
    const idx = trainings.findIndex(x => x.id === currentEditingTrainingId);
    if (idx === -1) { alert('Data training tidak ditemukan.'); return; }

    // Baca file flyer baru jika ada
    let newFlyerUrl = trainings[idx].flyerUrl || '';
    const flyerInput = document.getElementById('edit-tr-flyer');
    if (flyerInput && flyerInput.files && flyerInput.files.length > 0) {
        try {
            newFlyerUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = e => reject(e);
                reader.readAsDataURL(flyerInput.files[0]);
            });
        } catch(e) { console.error('Gagal membaca file flyer:', e); }
    }

    // Update data
    trainings[idx] = {
        ...trainings[idx],
        title: title,
        time: new Date(timeStr).getTime(),
        method: method,
        link: link,
        pdf: pdf,
        quota: quota + ' Peserta',
        token: token,
        zoomId: zoomId,
        zoomPw: zoomPw,
        flyerUrl: newFlyerUrl
    };

    try {
        localStorage.setItem('pa_trainings', JSON.stringify(trainings));
        alert('Jadwal training berhasil diperbarui!');
        window.closeEditTrainingModal();
        renderTrainerTrainings();
    } catch(e) {
        if (e.name === 'QuotaExceededError') {
            alert('Gagal menyimpan: ukuran gambar terlalu besar!');
        } else {
            alert('Gagal menyimpan perubahan.');
        }
    }
};

// ==================== HAPUS JADWAL TRAINING ====================
window.deleteTraining = function(id) {
    const trainings = JSON.parse(localStorage.getItem('pa_trainings')) || [];
    const t = trainings.find(x => x.id === id);
    if (!t) return;

    // Buat modal konfirmasi kustom (tidak bergantung pada confirm() bawaan browser)
    const old = document.getElementById('delete-confirm-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'delete-confirm-overlay';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.6)', zIndex: '2147483647',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
        background: '#fff', borderRadius: '16px', padding: '28px 32px',
        maxWidth: '420px', width: '90%', textAlign: 'center',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
    });

    box.innerHTML = `
        <div style="font-size:40px; margin-bottom:12px;">🗑️</div>
        <h3 style="margin: 0 0 8px; font-size:18px; color:#0f172a;">Hapus Jadwal Training?</h3>
        <p style="margin: 0 0 20px; font-size:14px; color:#64748b; line-height:1.5;">
            Anda akan menghapus:<br><strong style="color:#dc2626;">"${t.title}"</strong><br><br>
            Tindakan ini <strong>tidak dapat dibatalkan</strong>.
        </p>
        <div style="display:flex; gap:12px; justify-content:center;">
            <button id="del-cancel-btn" style="padding:10px 24px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; border-radius:8px; font-weight:600; cursor:pointer; font-size:14px;">Batal</button>
            <button id="del-confirm-btn" style="padding:10px 24px; border:none; background:linear-gradient(135deg,#ef4444,#dc2626); color:white; border-radius:8px; font-weight:700; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(220,38,38,0.3);">Ya, Hapus</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('del-cancel-btn').onclick = function() { overlay.remove(); };
    document.getElementById('del-confirm-btn').onclick = function() {
        overlay.remove();
        const updated = JSON.parse(localStorage.getItem('pa_trainings') || '[]').filter(x => x.id !== id);
        localStorage.setItem('pa_trainings', JSON.stringify(updated));

        // Tampilkan notifikasi sukses
        const toast = document.createElement('div');
        Object.assign(toast.style, {
            position: 'fixed', bottom: '24px', right: '24px',
            background: '#10b981', color: '#fff', padding: '14px 20px',
            borderRadius: '12px', fontWeight: '600', fontSize: '14px',
            boxShadow: '0 8px 24px rgba(16,185,129,0.3)', zIndex: '2147483647',
            animation: 'none'
        });
        toast.textContent = '✅ Jadwal training berhasil dihapus!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);

        renderTrainerTrainings();
    };
};

window.renderQuizQuestionsList = function() {
    const listContainer = document.getElementById("quiz-questions-list");
    if (!listContainer || !currentEditTrainingId) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const training = trainings.find(t => t.id === currentEditTrainingId);
    
    if (!training || !training.quiz || training.quiz.length === 0) {
        listContainer.innerHTML = '<p style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px 0;">Belum ada pertanyaan kuis.</p>';
        return;
    }

    listContainer.innerHTML = "";
    training.quiz.forEach((q, i) => {
        const item = document.createElement("div");
        item.style.cssText = "padding: 12px; border: 1px solid var(--border-color); border-radius: var(--border-radius-md); margin-bottom: 10px; position: relative;";
        item.innerHTML = `
            <div style="font-size: 13px; font-weight: bold; margin-bottom: 6px; padding-right: 24px;">${i + 1}. ${q.q}</div>
            <div style="font-size: 12px; margin-bottom: 2px; color: ${q.correct === 'a' ? 'var(--success-green)' : 'var(--text-muted)'}; font-weight: ${q.correct === 'a' ? 'bold' : 'normal'};">A. ${q.a}</div>
            <div style="font-size: 12px; margin-bottom: 2px; color: ${q.correct === 'b' ? 'var(--success-green)' : 'var(--text-muted)'}; font-weight: ${q.correct === 'b' ? 'bold' : 'normal'};">B. ${q.b}</div>
            <div style="font-size: 12px; margin-bottom: 2px; color: ${q.correct === 'c' ? 'var(--success-green)' : 'var(--text-muted)'}; font-weight: ${q.correct === 'c' ? 'bold' : 'normal'};">C. ${q.c}</div>
            <div style="font-size: 12px; margin-bottom: 2px; color: ${q.correct === 'd' ? 'var(--success-green)' : 'var(--text-muted)'}; font-weight: ${q.correct === 'd' ? 'bold' : 'normal'};">D. ${q.d}</div>
            <button onclick="deleteQuizQuestion(${i})" style="position: absolute; top: 12px; right: 12px; background: none; border: none; color: var(--danger-red); cursor: pointer; padding: 4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;
        listContainer.appendChild(item);
    });
};

window.addQuizQuestion = function() {
    if (!currentEditTrainingId) return;

    const q = document.getElementById("new-quiz-q").value.trim();
    const a = document.getElementById("new-quiz-a").value.trim();
    const b = document.getElementById("new-quiz-b").value.trim();
    const c = document.getElementById("new-quiz-c").value.trim();
    const d = document.getElementById("new-quiz-d").value.trim();
    const correct = document.getElementById("new-quiz-correct").value;

    if (!q || !a || !b || !c || !d) {
        if (window.showToast) window.showToast("Mohon lengkapi semua isian pertanyaan dan pilihan jawaban.", "error");
        else alert("Mohon lengkapi semua isian pertanyaan dan pilihan jawaban.");
        return;
    }

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditTrainingId);
    
    if (trainingIndex > -1) {
        if (!trainings[trainingIndex].quiz) {
            trainings[trainingIndex].quiz = [];
        }
        
        // Membatasi penambahan maksimal hingga 20 soal sesuai permintaan
        if (trainings[trainingIndex].quiz.length >= 20) {
            if (window.showToast) window.showToast("Maksimal kuis yang bisa dibuat adalah 20 soal.", "error");
            else alert("Maksimal kuis yang bisa dibuat adalah 20 soal.");
            return;
        }
        trainings[trainingIndex].quiz.push({ q, a, b, c, d, correct });
        localStorage.setItem("pa_trainings", JSON.stringify(trainings));
        
        // Reset form
        document.getElementById("new-quiz-q").value = "";
        document.getElementById("new-quiz-a").value = "";
        document.getElementById("new-quiz-b").value = "";
        document.getElementById("new-quiz-c").value = "";
        document.getElementById("new-quiz-d").value = "";
        document.getElementById("new-quiz-correct").value = "a";

        renderQuizQuestionsList();
        if (window.showToast) window.showToast("Pertanyaan berhasil ditambahkan!", "success");
    }
};

window.deleteQuizQuestion = function(index) {
    if (!currentEditTrainingId) return;
    
    if (!confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditTrainingId);
    
    if (trainingIndex > -1 && trainings[trainingIndex].quiz) {
        trainings[trainingIndex].quiz.splice(index, 1);
        localStorage.setItem("pa_trainings", JSON.stringify(trainings));
        renderQuizQuestionsList();
    }
};

// ==================== TRAINER PRE-TEST MANAGEMENT ====================
let currentEditPretestTrainingId = null;

window.openEditTrainingPretestModal = function(id) {
    currentEditPretestTrainingId = id;
    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const training = trainings.find(t => t.id === id);
    
    const titleEl = document.getElementById("edit-pretest-modal-title");
    if (titleEl && training) {
        titleEl.innerText = `Kelola Pre-Test: ${training.title}`;
    }
    
    renderPretestQuestionsList();
    const modal = document.getElementById("modal-edit-training-pretest");
    if (modal) modal.style.display = "flex";
};

window.hideEditTrainingPretestModal = function() {
    const modal = document.getElementById("modal-edit-training-pretest");
    if (modal) modal.style.display = "none";
    currentEditPretestTrainingId = null;
};

window.renderPretestQuestionsList = function() {
    const listContainer = document.getElementById("pretest-questions-list");
    if (!listContainer || !currentEditPretestTrainingId) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const training = trainings.find(t => t.id === currentEditPretestTrainingId);
    
    if (!training) return;

    const hasCustomPretest = training.pretest && Array.isArray(training.pretest) && training.pretest.length > 0;
    
    if (!hasCustomPretest) {
        listContainer.innerHTML = `
            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:14px; text-align:center;">
                <div style="font-size:13px; font-weight:700; color:#1e40af; margin-bottom:4px;">ℹ️ Menggunakan Bank Soal Otomatis</div>
                <div style="font-size:12px; color:#3b82f6; line-height:1.4;">
                    Saat ini sesi ini menggunakan soal Pre-Test dari Bank Soal bawaan (berdasarkan topik judul).<br>
                    Tambahkan soal kustom di bawah atau klik tombol <strong>"🔄 Muat Bank Soal Default"</strong> untuk mulai kustomisasi.
                </div>
            </div>
        `;
        return;
    }

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:12px; color:#64748b; font-weight:600;">Total: ${training.pretest.length} Soal Pre-Test Kustom</span>
            <button onclick="window.resetPretestToBankDefault()" style="font-size:11px; background:#fef2f2; color:#dc2626; border:1px solid #fecaca; border-radius:4px; padding:2px 8px; cursor:pointer;">
                Kembalikan ke Bank Default
            </button>
        </div>
    `;

    training.pretest.forEach((q, i) => {
        html += `
            <div style="padding:12px; border:1px solid #e2e8f0; border-radius:8px; margin-bottom:10px; position:relative; background:white;">
                <div style="font-size:13px; font-weight:bold; margin-bottom:6px; padding-right:28px; color:#0f172a;">${i + 1}. ${q.q}</div>
                <div style="font-size:12px; margin-bottom:2px; color:${q.correct === 'a' ? '#16a34a' : '#64748b'}; font-weight:${q.correct === 'a' ? 'bold' : 'normal'};">A. ${q.a} ${q.correct === 'a' ? '✓ (Kunci)' : ''}</div>
                <div style="font-size:12px; margin-bottom:2px; color:${q.correct === 'b' ? '#16a34a' : '#64748b'}; font-weight:${q.correct === 'b' ? 'bold' : 'normal'};">B. ${q.b} ${q.correct === 'b' ? '✓ (Kunci)' : ''}</div>
                <div style="font-size:12px; margin-bottom:2px; color:${q.correct === 'c' ? '#16a34a' : '#64748b'}; font-weight:${q.correct === 'c' ? 'bold' : 'normal'};">C. ${q.c} ${q.correct === 'c' ? '✓ (Kunci)' : ''}</div>
                <div style="font-size:12px; margin-bottom:2px; color:${q.correct === 'd' ? '#16a34a' : '#64748b'}; font-weight:${q.correct === 'd' ? 'bold' : 'normal'};">D. ${q.d} ${q.correct === 'd' ? '✓ (Kunci)' : ''}</div>
                <button onclick="window.deletePretestQuestion(${i})" title="Hapus Soal" style="position:absolute; top:10px; right:10px; background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; border-radius:4px; cursor:pointer; padding:3px 7px; font-size:11px; font-weight:700;">
                    🗑️
                </button>
            </div>
        `;
    });

    listContainer.innerHTML = html;
};

window.addPretestQuestion = function() {
    if (!currentEditPretestTrainingId) return;

    const q = (document.getElementById("new-pretest-q")?.value || "").trim();
    const a = (document.getElementById("new-pretest-a")?.value || "").trim();
    const b = (document.getElementById("new-pretest-b")?.value || "").trim();
    const c = (document.getElementById("new-pretest-c")?.value || "").trim();
    const d = (document.getElementById("new-pretest-d")?.value || "").trim();
    const correct = document.getElementById("new-pretest-correct")?.value || "a";

    if (!q || !a || !b || !c || !d) {
        if (window.showToast) window.showToast("Mohon lengkapi semua isian pertanyaan dan pilihan jawaban A-D.", "error");
        else alert("Mohon lengkapi semua isian pertanyaan dan pilihan jawaban A-D.");
        return;
    }

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditPretestTrainingId);
    
    if (trainingIndex > -1) {
        if (!trainings[trainingIndex].pretest || !Array.isArray(trainings[trainingIndex].pretest)) {
            trainings[trainingIndex].pretest = [];
        }
        
        if (trainings[trainingIndex].pretest.length >= 20) {
            if (window.showToast) window.showToast("Maksimal soal Pre-Test yang bisa dibuat adalah 20 soal.", "error");
            else alert("Maksimal soal Pre-Test yang bisa dibuat adalah 20 soal.");
            return;
        }

        trainings[trainingIndex].pretest.push({ q, a, b, c, d, correct });
        localStorage.setItem("pa_trainings", JSON.stringify(trainings));
        
        // Reset form
        document.getElementById("new-pretest-q").value = "";
        document.getElementById("new-pretest-a").value = "";
        document.getElementById("new-pretest-b").value = "";
        document.getElementById("new-pretest-c").value = "";
        document.getElementById("new-pretest-d").value = "";
        document.getElementById("new-pretest-correct").value = "a";

        window.renderPretestQuestionsList();
        if (window.showToast) window.showToast("Soal Pre-Test berhasil ditambahkan!", "success");
        else alert("Soal Pre-Test berhasil ditambahkan!");
    }
};

window.deletePretestQuestion = function(index) {
    if (!currentEditPretestTrainingId) return;
    
    if (!confirm("Apakah Anda yakin ingin menghapus soal Pre-Test ini?")) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditPretestTrainingId);
    
    if (trainingIndex > -1 && trainings[trainingIndex].pretest) {
        trainings[trainingIndex].pretest.splice(index, 1);
        localStorage.setItem("pa_trainings", JSON.stringify(trainings));
        window.renderPretestQuestionsList();
    }
};

window.loadPretestTemplateFromBank = function() {
    if (!currentEditPretestTrainingId) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditPretestTrainingId);
    if (trainingIndex === -1) return;

    const trn = trainings[trainingIndex];
    // Ambil default dari bank
    const bankQuestions = window.getPretestQuestionsForTraining(trn.title, null);
    
    trn.pretest = JSON.parse(JSON.stringify(bankQuestions));
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    
    window.renderPretestQuestionsList();
    if (window.showToast) window.showToast("Berhasil memuat 3 soal dari Bank Soal ke daftar edit!", "success");
    else alert("Berhasil memuat 3 soal dari Bank Soal ke daftar edit!");
};

window.resetPretestToBankDefault = function() {
    if (!currentEditPretestTrainingId) return;
    
    if (!confirm("Kembalikan ke Bank Soal Otomatis? Soal kustom pada training ini akan dihapus.")) return;

    const trainings = JSON.parse(localStorage.getItem("pa_trainings")) || [];
    const trainingIndex = trainings.findIndex(t => t.id === currentEditPretestTrainingId);
    if (trainingIndex === -1) return;

    trainings[trainingIndex].pretest = [];
    localStorage.setItem("pa_trainings", JSON.stringify(trainings));
    
    window.renderPretestQuestionsList();
    if (window.showToast) window.showToast("Pre-Test dikembalikan ke Bank Soal bawaan.", "info");
};

// ==================== DASHBOARD TRAINER (MATERI & COACHING) ====================
window.switchTrainerTab = function(tabId) {
    const tabs = document.querySelectorAll('.trn-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    const btns = document.querySelectorAll('.trn-tab-btn');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Auto-load LSP registrations when tab opens
    if (tabId === 'trn-lsp-mgmt' && typeof window.renderLspRegistrations === 'function') {
        window.renderLspRegistrations();
    }

    // Update LSP badge count on tab bar
    const regs = JSON.parse(localStorage.getItem('lsp_registrations') || '[]');
    const pendingCount = regs.filter(r => r.status === 'Menunggu Review').length;
    const badge = document.getElementById('lsp-badge-count');
    if (badge) {
        badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
        badge.innerText = pendingCount;
    }
};

window.switchAdminTab = function(tabId) {
    const tabs = document.querySelectorAll('.adm-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    const btns = document.querySelectorAll('.adm-tab-btn');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// ─── ADMIN: USER MANAGEMENT & AUDIT LOGS ───────────────────────────────────

function getRoleBadgeStyle(role) {
    switch (role) {
        case 'Admin': return 'background:#fee2e2; color:#ef4444; border: 1px solid #fca5a5;';
        case 'Trainer': return 'background:#e0f2fe; color:#0284c7; border: 1px solid #bae6fd;';
        case 'Agen': return 'background:#dcfce7; color:#16a34a; border: 1px solid #bbf7d0;';
        case 'Kepala Cabang': return 'background:#fef9c3; color:#ca8a04; border: 1px solid #fef08a;';
        default: return 'background:#f1f5f9; color:#475569; border: 1px solid #cbd5e1;';
    }
}

window.renderAdminUsers = function() {
    const tbody = document.getElementById('admin-user-rows');
    if (!tbody) return;
    
    let users = JSON.parse(localStorage.getItem('pa_users')) || Object.values(demoAccounts);
    
    tbody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        const isSelf = user.email === 'siti.aminah@asm-academy.id';
        
        tr.innerHTML = `
            <td><strong>${user.code || '-'}</strong></td>
            <td>${user.name || '-'}</td>
            <td>${user.email || '-'}</td>
            <td><span class="role-badge" style="font-size:10px; padding:2px 6px; border-radius:4px; ${getRoleBadgeStyle(user.role)}">${user.role || '-'}</span></td>
            <td>
                ${isSelf ? '<span style="color:var(--text-muted); font-size:11px; font-style:italic;">Aktif (Anda)</span>' : `
                    <button onclick="editAdminUser('${user.email}')" class="btn-secondary" style="padding:4px 8px; font-size:11px; display:inline-block; width:auto; margin-right:4px; cursor:pointer;">Edit</button>
                    <button onclick="deleteAdminUser('${user.email}')" class="btn-danger" style="padding:4px 8px; font-size:11px; display:inline-block; width:auto; background:#ef4444; color:white; border:none; border-radius:4px; cursor:pointer;">Hapus</button>
                `}
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    const userStatEl = document.getElementById('adm-stat-users');
    if (userStatEl) {
        userStatEl.innerText = users.length;
    }
};

window.showCreateUserModal = function() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('adm-user-modal-title').innerText = 'Tambah Pengguna Baru';
        document.getElementById('adm-usr-name').value = '';
        document.getElementById('adm-usr-email').value = '';
        document.getElementById('adm-usr-pass').value = '';
        document.getElementById('adm-usr-role').value = 'Agen';
        document.getElementById('adm-usr-code').value = '';
        document.getElementById('adm-usr-branch').value = '';
        modal.removeAttribute('data-edit-email');
    }
};

window.hideCreateUserModal = function() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.classList.remove('active');
};

window.editAdminUser = function(email) {
    let users = JSON.parse(localStorage.getItem('pa_users')) || Object.values(demoAccounts);
    const user = users.find(u => u.email === email);
    if (!user) return;
    
    const modal = document.getElementById('admin-user-modal');
    if (modal) {
        modal.setAttribute('data-edit-email', email);
        modal.classList.add('active');
        document.getElementById('adm-user-modal-title').innerText = 'Edit Pengguna';
        document.getElementById('adm-usr-name').value = user.name || '';
        document.getElementById('adm-usr-email').value = user.email || '';
        document.getElementById('adm-usr-pass').value = '';
        document.getElementById('adm-usr-role').value = user.role || 'Agen';
        document.getElementById('adm-usr-code').value = user.code || '';
        document.getElementById('adm-usr-branch').value = user.branch || '';
    }
};

window.saveAdminUser = function() {
    const modal = document.getElementById('admin-user-modal');
    if (!modal) return;
    
    const name = document.getElementById('adm-usr-name').value.trim();
    const email = document.getElementById('adm-usr-email').value.trim();
    const password = document.getElementById('adm-usr-pass').value.trim();
    const role = document.getElementById('adm-usr-role').value;
    const code = document.getElementById('adm-usr-code').value.trim();
    const branch = document.getElementById('adm-usr-branch').value.trim();
    
    if (!name || !email || !role || !code) {
        alert("Semua kolom wajib diisi (kecuali Kantor Cabang)!");
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('pa_users')) || Object.values(demoAccounts);
    const editEmail = modal.getAttribute('data-edit-email');
    
    if (editEmail) {
        const index = users.findIndex(u => u.email === editEmail);
        if (index !== -1) {
            users[index].name = name;
            users[index].email = email;
            if (password) users[index].password = password;
            users[index].role = role;
            users[index].code = code;
            users[index].branch = branch;
            users[index].avatar = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }
        window.logAuditEvent('Siti Aminah', 'Admin', `Mengubah data pengguna: ${name} (${role})`);
    } else {
        if (users.some(u => u.email === email)) {
            alert("Email sudah terdaftar!");
            return;
        }
        users.push({
            name,
            email,
            password: password || 'Password123',
            role,
            code,
            branch,
            avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        });
        window.logAuditEvent('Siti Aminah', 'Admin', `Menambahkan pengguna baru: ${name} (${role})`);
    }
    
    localStorage.setItem('pa_users', JSON.stringify(users));
    window.renderAdminUsers();
    window.hideCreateUserModal();
    if (window.showToast) window.showToast("Data pengguna berhasil disimpan!", "success");
};

window.deleteAdminUser = function(email) {
    if (email === 'siti.aminah@asm-academy.id') {
        alert("Tidak dapat menghapus akun admin Anda sendiri!");
        return;
    }
    
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        let users = JSON.parse(localStorage.getItem('pa_users')) || Object.values(demoAccounts);
        const userToDelete = users.find(u => u.email === email);
        const name = userToDelete ? userToDelete.name : email;
        const role = userToDelete ? userToDelete.role : '';
        
        users = users.filter(u => u.email !== email);
        localStorage.setItem('pa_users', JSON.stringify(users));
        window.renderAdminUsers();
        
        window.logAuditEvent('Siti Aminah', 'Admin', `Menghapus pengguna: ${name} (${role})`);
        if (window.showToast) window.showToast("Pengguna berhasil dihapus!", "info");
    }
};

window.logAuditEvent = function(user, role, activity) {
    let logs = JSON.parse(localStorage.getItem('pa_audit_logs')) || [];
    const ips = ['192.168.1.102', '192.168.1.105', '172.16.24.12', '10.0.5.45'];
    const randomIp = ips[Math.floor(Math.random() * ips.length)];
    
    logs.unshift({
        timestamp: new Date().toLocaleString('id-ID'),
        user: user,
        role: role,
        activity: activity,
        ip: randomIp
    });
    
    if (logs.length > 100) logs = logs.slice(0, 100);
    localStorage.setItem('pa_audit_logs', JSON.stringify(logs));
    
    if (typeof window.renderAuditLogs === 'function') window.renderAuditLogs();
    if (typeof window.renderDashboardAuditLogs === 'function') window.renderDashboardAuditLogs();
};

window.renderDashboardAuditLogs = function() {
    const list = document.getElementById('admin-audit-logs');
    if (!list) return;
    
    let logs = JSON.parse(localStorage.getItem('pa_audit_logs')) || [];
    list.innerHTML = '';
    logs.slice(0, 5).forEach(log => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>[${log.timestamp}]</strong> ${log.user} (${log.role}): ${log.activity}`;
        list.appendChild(li);
    });
};

window.renderAuditLogs = function() {
    const tbody = document.getElementById('admin-audit-rows');
    if (!tbody) return;
    
    let logs = JSON.parse(localStorage.getItem('pa_audit_logs')) || [];
    const searchQuery = (document.getElementById('log-search')?.value || '').toLowerCase().trim();
    const roleFilter = document.getElementById('log-filter-role')?.value || 'all';
    
    tbody.innerHTML = '';
    logs.forEach(log => {
        if (roleFilter !== 'all' && log.role !== roleFilter) return;
        if (searchQuery) {
            const matchesUser = (log.user || '').toLowerCase().includes(searchQuery);
            const matchesActivity = (log.activity || '').toLowerCase().includes(searchQuery);
            if (!matchesUser && !matchesActivity) return;
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="white-space:nowrap; font-size:12px; color:var(--text-muted);">${log.timestamp}</td>
            <td><strong>${log.user}</strong></td>
            <td><span class="role-badge" style="font-size:10px; padding:2px 6px; border-radius:4px; ${getRoleBadgeStyle(log.role)}">${log.role}</span></td>
            <td>${log.activity}</td>
            <td style="font-family:monospace; font-size:11.5px; color:var(--text-muted);">${log.ip}</td>
        `;
        tbody.appendChild(tr);
    });
};

window.filterAuditLogs = function() {
    window.renderAuditLogs();
};

window.clearAuditLogs = function() {
    if (confirm("Apakah Anda yakin ingin menghapus semua log audit? Tindakan ini tidak dapat dibatalkan.")) {
        const clearedLogs = [
            { timestamp: new Date().toLocaleString('id-ID'), user: 'Siti Aminah', role: 'Admin', activity: 'Membersihkan seluruh log audit.', ip: '192.168.1.102' }
        ];
        localStorage.setItem('pa_audit_logs', JSON.stringify(clearedLogs));
        window.renderAuditLogs();
        window.renderDashboardAuditLogs();
        if (window.showToast) window.showToast("Log audit berhasil dibersihkan.", "info");
    }
};

// -- Kelola Materi --
// -- Kelola Materi --
window.switchModuleFormTab = function(tabName) {
    const sections = document.querySelectorAll('.mod-form-section');
    sections.forEach(s => s.style.display = 'none');
    
    const activeSection = document.getElementById(`mod-form-section-${tabName}`);
    if (activeSection) activeSection.style.display = 'block';
    
    const buttons = document.querySelectorAll('.mod-tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.color = '#64748b';
        btn.style.borderBottom = '3px solid transparent';
    });
    
    const activeBtn = document.getElementById(`tab-btn-mod-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.color = '#2563eb';
        activeBtn.style.borderBottom = '3px solid #2563eb';
    }
};

window.updateQuestionNumbers = function(type) {
    const listId = type === 'pre' ? 'pretest-questions-list' : 'posttest-questions-list';
    const container = document.getElementById(listId);
    if (!container) return;
    const blocks = container.querySelectorAll('.quiz-question-block');
    blocks.forEach((block, idx) => {
        const titleEl = block.querySelector('.q-block-title');
        if (titleEl) {
            titleEl.textContent = `Soal ${idx + 1}`;
        }
    });
    
    const btnId = type === 'pre' ? 'btn-add-pretest-q' : 'btn-add-posttest-q';
    const btn = document.getElementById(btnId);
    if (btn) {
        if (blocks.length >= 10) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.title = 'Maksimal 10 soal tercapai';
        } else {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.title = '';
        }
    }
};

window.createQuestionBlockHtml = function(type, idx, qData = null) {
    const prefix = type;
    const qText = qData ? qData.question : '';
    const optA = qData && qData.options ? qData.options[0] : '';
    const optB = qData && qData.options ? qData.options[1] : '';
    const optC = qData && qData.options ? qData.options[2] : '';
    const optD = qData && qData.options ? qData.options[3] : '';
    const correctIdx = qData && qData.correctIndex !== undefined ? qData.correctIndex : 0;
    
    return `
        <div class="quiz-question-block" style="border: 1.5px solid #e2e8f0; padding: 20px; margin-bottom: 20px; border-radius: 12px; background-color: #ffffff; position: relative;">
          <button type="button" onclick="this.closest('.quiz-question-block').remove(); window.updateQuestionNumbers('${type}');" style="position: absolute; top: 16px; right: 16px; background: #fee2e2; border: 1px solid #fecaca; color: #ef4444; border-radius: 6px; padding: 4px 8px; font-size: 11.5px; font-weight: 700; cursor: pointer;">Hapus</button>
          
          <h5 class="q-block-title" style="margin-top: 0; margin-bottom: 16px; color: #1e293b; font-size: 14px; font-weight: 800;">Soal ${idx + 1}</h5>
          
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; color: #475569;">Pertanyaan</label>
            <textarea class="${prefix}-q-text" placeholder="Tuliskan pertanyaan ujian di sini..." rows="2" style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box; resize: vertical;" required>${qText}</textarea>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #475569;">Pilihan A</label>
              <input type="text" class="${prefix}-q-a" value="${optA}" placeholder="Jawaban A" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box;" required>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #475569;">Pilihan B</label>
              <input type="text" class="${prefix}-q-b" value="${optB}" placeholder="Jawaban B" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box;" required>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #475569;">Pilihan C</label>
              <input type="text" class="${prefix}-q-c" value="${optC}" placeholder="Jawaban C" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box;" required>
            </div>
            <div>
              <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #475569;">Pilihan D</label>
              <input type="text" class="${prefix}-q-d" value="${optD}" placeholder="Jawaban D" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box;" required>
            </div>
          </div>
          
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; color: #475569;">Kunci Jawaban Benar</label>
            <select class="${prefix}-q-correct" style="width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; font-family: inherit; box-sizing: border-box; background: #fff;">
              <option value="0" ${correctIdx === 0 ? 'selected' : ''}>A</option>
              <option value="1" ${correctIdx === 1 ? 'selected' : ''}>B</option>
              <option value="2" ${correctIdx === 2 ? 'selected' : ''}>C</option>
              <option value="3" ${correctIdx === 3 ? 'selected' : ''}>D</option>
            </select>
          </div>
        </div>
    `;
};

window.addPreTestQuestionBlock = function(qData = null) {
    const container = document.getElementById('pretest-questions-list');
    if (!container) return;
    const count = container.querySelectorAll('.quiz-question-block').length;
    if (count >= 10) {
        window.showToast("Maksimal 10 soal untuk Pre-Test.", "warning");
        return;
    }
    const div = document.createElement('div');
    div.innerHTML = window.createQuestionBlockHtml('pre', count, qData);
    container.appendChild(div.firstElementChild);
    window.updateQuestionNumbers('pre');
};

window.addPostTestQuestionBlock = function(qData = null) {
    const container = document.getElementById('posttest-questions-list');
    if (!container) return;
    const count = container.querySelectorAll('.quiz-question-block').length;
    if (count >= 10) {
        window.showToast("Maksimal 10 soal untuk Post-Test.", "warning");
        return;
    }
    const div = document.createElement('div');
    div.innerHTML = window.createQuestionBlockHtml('post', count, qData);
    container.appendChild(div.firstElementChild);
    window.updateQuestionNumbers('post');
};

window.showCreateMaterialModal = function(editModuleId = null) {
    const idInput = document.getElementById("trn-mat-id");
    const heading = document.getElementById("modal-module-title-heading");
    const titleInput = document.getElementById("trn-mat-title");
    const catInput = document.getElementById("trn-mat-cat");
    const levelInput = document.getElementById("trn-mat-level");
    const descInput = document.getElementById("trn-mat-desc");
    const articleInput = document.getElementById("trn-mat-article");
    const pdfInput = document.getElementById("trn-mat-pdf");
    const videoInput = document.getElementById("trn-mat-video");
    const kkmInput = document.getElementById("trn-mat-kkm");
    const estTimeInput = document.getElementById("trn-mat-est-time");
    
    // Clear list containers
    document.getElementById('pretest-questions-list').innerHTML = '';
    document.getElementById('posttest-questions-list').innerHTML = '';
    
    if (editModuleId) {
        // Mode Edit
        if (idInput) idInput.value = editModuleId;
        if (heading) heading.textContent = "Edit Modul Belajar";
        
        const m = window.modules.find(x => x.id === editModuleId);
        if (m) {
            if (titleInput) titleInput.value = m.title || m.judul || "";
            if (catInput) catInput.value = m.cat || m.kategori || "Dasar Asuransi";
            if (levelInput) levelInput.value = m.level || "Basic";
            if (descInput) descInput.value = m.desc || "";
            if (articleInput) articleInput.value = m.article || "";
            if (pdfInput) pdfInput.value = m.pdf || "";
            if (videoInput) videoInput.value = m.video || "";
            if (estTimeInput) estTimeInput.value = m.estMinutes || 15;
            
            const bank = window.masterBankSoal && window.masterBankSoal[editModuleId];
            const kkm = bank && bank.kkm !== undefined ? bank.kkm : 70;
            if (kkmInput) kkmInput.value = kkm;
            
            if (bank) {
                if (bank.preTest && Array.isArray(bank.preTest)) {
                    bank.preTest.forEach(q => window.addPreTestQuestionBlock(q));
                }
                if (bank.postTest && Array.isArray(bank.postTest)) {
                    bank.postTest.forEach(q => window.addPostTestQuestionBlock(q));
                }
            } else {
                // If legacy quiz format, load them as Post-test questions by default
                const legacyQs = window.getModuleQuestions(m, 'post-test');
                if (legacyQs && legacyQs.length > 0 && legacyQs[0].question !== "Apa tujuan utama mempelajari modul ini?") {
                    legacyQs.forEach(q => window.addPostTestQuestionBlock(q));
                }
            }
        }
    } else {
        // Mode Tambah Baru
        if (idInput) idInput.value = "";
        if (heading) heading.textContent = "Tambah Modul Belajar Baru";
        
        if (titleInput) titleInput.value = "";
        if (catInput) catInput.value = "Dasar Asuransi";
        if (levelInput) levelInput.value = "Basic";
        if (descInput) descInput.value = "";
        if (articleInput) articleInput.value = "";
        if (pdfInput) pdfInput.value = "";
        if (videoInput) videoInput.value = "";
        if (kkmInput) kkmInput.value = "70";
        if (estTimeInput) estTimeInput.value = "15";
        
        window.addPreTestQuestionBlock();
        window.addPostTestQuestionBlock();
    }
    
    window.switchModuleFormTab('info');
    window.updateQuestionNumbers('pre');
    window.updateQuestionNumbers('post');
    
    if (typeof window.updateDescCounter === 'function') {
        window.updateDescCounter();
    }
    
    const modal = document.getElementById('modal-create-module-fixed');
    if (modal) modal.style.display = 'flex';
};

window.updateDescCounter = function() {
    const descInput = document.getElementById("trn-mat-desc");
    const counter = document.getElementById("trn-mat-desc-counter");
    if (!descInput || !counter) return;
    
    const len = descInput.value.length;
    counter.textContent = `${len}/120 karakter`;
    if (len >= 120) {
        counter.style.color = "#ef4444"; // Red
    } else {
        counter.style.color = "#64748b"; // Gray
    }
};

window.hideCreateMaterialModal = function() {
    const modal = document.getElementById('modal-create-module-fixed');
    if (modal) modal.style.display = 'none';
};

window.saveTrainerMaterial = function() {
    const idInput = document.getElementById("trn-mat-id");
    const title = document.getElementById("trn-mat-title").value.trim();
    const cat = document.getElementById("trn-mat-cat").value;
    const level = document.getElementById("trn-mat-level").value;
    const desc = document.getElementById("trn-mat-desc").value.trim();
    const article = document.getElementById("trn-mat-article").value.trim();
    const pdf = document.getElementById("trn-mat-pdf").value.trim();
    const video = document.getElementById("trn-mat-video").value.trim();
    const kkmInput = document.getElementById("trn-mat-kkm");
    const kkmVal = parseInt(kkmInput.value) || 70;
    const estTimeInput = document.getElementById("trn-mat-est-time");
    const estMinutes = parseInt(estTimeInput ? estTimeInput.value : "15") || 15;
    
    if (!title) {
        alert("Judul Modul wajib diisi.");
        window.switchModuleFormTab('info');
        return;
    }
    if (!desc) {
        alert("Deskripsi Modul wajib diisi.");
        window.switchModuleFormTab('info');
        return;
    }
    if (!estMinutes || estMinutes <= 0) {
        alert("Estimasi Waktu Belajar wajib diisi dengan angka positif.");
        window.switchModuleFormTab('info');
        return;
    }
    
    // Extract Pre-Test Questions
    let preTest = [];
    const preBlocks = document.querySelectorAll("#pretest-questions-list .quiz-question-block");
    preBlocks.forEach(block => {
        const question = block.querySelector(".pre-q-text").value.trim();
        const a = block.querySelector(".pre-q-a").value.trim();
        const b = block.querySelector(".pre-q-b").value.trim();
        const c = block.querySelector(".pre-q-c").value.trim();
        const d = block.querySelector(".pre-q-d").value.trim();
        const correctIndex = parseInt(block.querySelector(".pre-q-correct").value);
        if (question) {
            preTest.push({ question, options: [a, b, c, d], correctIndex });
        }
    });
    
    // Extract Post-Test Questions
    let postTest = [];
    const postBlocks = document.querySelectorAll("#posttest-questions-list .quiz-question-block");
    postBlocks.forEach(block => {
        const question = block.querySelector(".post-q-text").value.trim();
        const a = block.querySelector(".post-q-a").value.trim();
        const b = block.querySelector(".post-q-b").value.trim();
        const c = block.querySelector(".post-q-c").value.trim();
        const d = block.querySelector(".post-q-d").value.trim();
        const correctIndex = parseInt(block.querySelector(".post-q-correct").value);
        if (question) {
            postTest.push({ question, options: [a, b, c, d], correctIndex });
        }
    });
    
    if (preTest.length === 0) {
        alert("Wajib menambahkan minimal 1 soal Pre-Test (Maksimal 10).");
        window.switchModuleFormTab('pretest');
        return;
    }
    if (postTest.length === 0) {
        alert("Wajib menambahkan minimal 1 soal Post-Test (Maksimal 10).");
        window.switchModuleFormTab('posttest');
        return;
    }
    
    const moduleId = idInput.value || ("MOD-" + Math.floor(Math.random() * 100000));
    
    // Save to masterBankSoal
    window.masterBankSoal[moduleId] = {
        preTest: preTest,
        postTest: postTest,
        kkm: kkmVal
    };
    
    // Save/Update in window.modules
    let mIndex = window.modules.findIndex(x => x.id === moduleId);
    let modObj = {
        id: moduleId,
        title: title,
        judul: title,
        cat: cat,
        level: level,
        desc: desc,
        article: article,
        pdf: pdf,
        video: video,
        estMinutes: estMinutes,
        quizCount: postTest.length,
        wajibKuis: true
    };
    
    if (mIndex > -1) {
        window.modules[mIndex] = modObj;
    } else {
        window.modules.unshift(modObj);
    }
    
    window.saveDataToStorage();
    
    alert(idInput.value ? "Modul Berhasil Diupdate!" : "Modul Berhasil Disimpan & Dipublikasikan!");
    window.hideCreateMaterialModal();
    window.renderTrainerMaterials();
    
    // Refresh Agen Grid
    if (typeof window.renderBelajarAsuransi === 'function') {
        window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
    }
};

window.deleteTrainerMaterial = function(moduleId) {
    if (confirm("Apakah Anda yakin ingin menghapus modul ini beserta seluruh kuisnya?")) {
        window.modules = window.modules.filter(m => m.id !== moduleId);
        if (window.masterBankSoal[moduleId]) {
            delete window.masterBankSoal[moduleId];
        }
        window.saveDataToStorage();
        window.renderTrainerMaterials();
        
        if (typeof window.renderBelajarAsuransi === 'function') {
            window.renderBelajarAsuransi(window.currentActiveLevel || "Basic", "");
        }
    }
};

window.renderTrainerMaterials = function() {
    const tbodyTrainer = document.getElementById('trainer-material-rows');
    const tbodyAdmin = document.getElementById('admin-material-rows');
    
    const renderRows = (tbody) => {
        if (!tbody) return;
        tbody.innerHTML = "";
        
        if (window.modules.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding: 20px;">Belum ada modul aktif. Silakan tambah modul baru.</td></tr>`;
            return;
        }
        
        window.modules.forEach(m => {
            if (!m) return;
            const judulTeks = m.title || m.judul || 'Tanpa Judul';
            const bank = window.masterBankSoal && window.masterBankSoal[m.id];
            const qCount = bank && bank.postTest ? bank.postTest.length : (m.quizCount || 0);
            
            tbody.innerHTML += `
                <tr>
                    <td><strong>${m.id}</strong></td>
                    <td><strong>${judulTeks}</strong><br><small style="color:var(--text-muted); font-weight:600;">Kategori: ${m.cat || 'Umum'}</small></td>
                    <td><span class="badge ${m.level === 'Basic' ? 'badge-info' : (m.level === 'Intermediate' ? 'badge-warning' : 'badge-danger')}" style="padding:4px 8px; border-radius:4px; font-weight:bold; font-size:11px;">${m.level || 'Basic'}</span></td>
                    <td>${qCount} Soal</td>
                    <td><strong>${m.estMinutes || 15}</strong> Menit</td>
                    <td style="text-align: center;">
                        <button class="btn-primary" style="padding:4px 10px; font-size:11.5px; width:auto; display:inline-block; margin-right:4px;" onclick="window.showCreateMaterialModal('${m.id}')">Edit</button>
                        <button class="btn-secondary" style="padding:4px 10px; font-size:11.5px; width:auto; display:inline-block; background-color:#ef4444; border:none; color:white;" onclick="window.deleteTrainerMaterial('${m.id}')">Hapus</button>
                    </td>
                </tr>
            `;
        });
    };
    
    renderRows(tbodyTrainer);
    renderRows(tbodyAdmin);
};

// -- Kelola Coaching --
window.showCreateCoachingModal = function() {
    document.getElementById("trn-coach-title").value = "";
    document.getElementById("trn-coach-goal").value = "";
    document.getElementById("trn-coach-summary").value = "";
    document.getElementById("trn-coach-video").value = "";
    document.getElementById("trn-coach-file").value = "";
    document.getElementById("trn-coach-duration").value = "";
    document.getElementById("trn-coach-tips").value = "";
    document.getElementById("trn-coach-checklist").value = "";
    const modal = document.getElementById("trainer-coaching-modal");
    if (modal) modal.classList.add("active");
};

window.hideCreateCoachingModal = function() {
    const modal = document.getElementById("trainer-coaching-modal");
    if (modal) modal.classList.remove("active");
};

window.saveTrainerCoaching = function() {
    const title = document.getElementById("trn-coach-title").value;
    const goal = document.getElementById("trn-coach-goal").value;
    const summary = document.getElementById("trn-coach-summary").value;
    const video = document.getElementById("trn-coach-video").value;
    const duration = document.getElementById("trn-coach-duration").value;
    
    // Untuk file, biasanya kita ambil nama filenya saja untuk demo
    const fileInput = document.getElementById("trn-coach-file");
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "";
    
    const tips = document.getElementById("trn-coach-tips").value;
    const checklist = document.getElementById("trn-coach-checklist").value;
    
    if (!title) {
        alert("Judul Taktik wajib diisi.");
        return;
    }
    
    let coachings = JSON.parse(localStorage.getItem('pa_coachings')) || [];
    coachings.unshift({
        id: "coach-" + Date.now(),
        title: title,
        goal: goal,
        summary: summary,
        video: video,
        fileName: fileName,
        duration: duration,
        tips: tips,
        checklist: checklist,
        targetCount: checklist.split('\n').filter(l => l.trim() !== "").length
    });
    localStorage.setItem('pa_coachings', JSON.stringify(coachings));
    
    alert("Taktik Coaching Berhasil Disimpan!");
    hideCreateCoachingModal();
    renderTrainerCoaching();
};

window.renderTrainerCoaching = function() {
    const tbody = document.getElementById('trainer-coaching-rows');
    if (!tbody) return;
    
    let coachings = JSON.parse(localStorage.getItem('pa_coachings')) || [];
    if (coachings.length === 0) {
        coachings = [
            { id: "coach-1", title: "Teknik Presentasi Produk", tips: "Awali pertemuan dengan pertanyaan terbuka...", targetCount: 4 }
        ];
        localStorage.setItem('pa_coachings', JSON.stringify(coachings));
    }
    
    tbody.innerHTML = "";
    coachings.forEach((c, index) => {
        const shortTips = (c.tips || "").length > 50 ? (c.tips || "").substring(0, 50) + "..." : (c.tips || "");
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${c.title}</strong></td>
                <td>${shortTips}</td>
                <td>${c.targetCount} Target</td>
                <td>
                    <button class="btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="alert('Demo: Hapus taktik ini')">Hapus</button>
                </td>
            </tr>
        `;
    });
};

// -- Progres & Reward --
window.renderTrainerProgress = function() {
    const tbody = document.getElementById('trainer-agent-progress-rows');
    if (!tbody) return;
    tbody.innerHTML = `
        <tr>
            <td>AGN-001</td>
            <td>Budi Santoso</td>
            <td>85% Selesai</td>
            <td>90 (Lulus)</td>
            <td>LSP A</td>
        </tr>
        <tr>
            <td>AGN-002</td>
            <td>Siti Aminah</td>
            <td>40% Selesai</td>
            <td>-</td>
            <td>Belum Pilih</td>
        </tr>
    `;
};

window.renderTrainerClaims = function() {
    const tbody = document.getElementById('trainer-claims-rows');
    if (!tbody) return;
    
    let claims = JSON.parse(localStorage.getItem("pa_reward_claims")) || [];
    let html = "";
    
    // Tampilkan data terbaru di atas
    claims.slice().reverse().forEach(claim => {
        const statusColor = claim.status === "Selesai" ? "#059669" : "#d97706";
        html += `
            <tr>
                <td>${claim.agentName}</td>
                <td>${claim.rewardName}</td>
                <td>${claim.date}</td>
                <td><span style="color:${statusColor}; font-weight:bold;">${claim.status}</span></td>
                <td>
                    ${claim.status !== "Selesai" ? `<button class="btn-primary" style="padding:4px 8px; font-size:11px;" onclick="completeClaim('${claim.id}')">Tandai Selesai</button>` : `<span style="font-size:12px; color:var(--text-muted);">Tuntas</span>`}
                </td>
            </tr>
        `;
    });
    
    if (claims.length === 0) {
        html = `<tr><td colspan="5" style="text-align:center; padding:20px;">Belum ada klaim hadiah.</td></tr>`;
    }
    
    tbody.innerHTML = html;
};

window.completeClaim = function(claimId) {
    let claims = JSON.parse(localStorage.getItem("pa_reward_claims")) || [];
    let idx = claims.findIndex(c => c.id === claimId);
    if (idx !== -1) {
        claims[idx].status = "Selesai";
        localStorage.setItem("pa_reward_claims", JSON.stringify(claims));
        renderTrainerClaims();
    }
};

window.filterTrainerClaims = function(status) {
    // Bisa dikembangkan untuk filter All, Selesai, Menunggu
    renderTrainerClaims();
};

// ==================== TEMPLATE SERTIFIKAT ====================
window.updateCertPreview = function() {
    const bgSelect = document.getElementById('cert-bg-select').value;
    const nameColor = document.getElementById('cert-name-color').value;
    const titleColor = document.getElementById('cert-title-color').value;
    const titleText = document.getElementById('cert-title').value;
    
    const canvas = document.getElementById('cert-preview-canvas');
    const nameEl = document.getElementById('preview-cert-name');
    const titleEl = document.getElementById('preview-cert-title');
    
    if (bgSelect === 'blue-gold') {
        canvas.style.background = 'linear-gradient(135deg, #e0f2fe, #bae6fd)';
        canvas.style.border = '2px solid #0284c7';
    } else if (bgSelect === 'modern-light') {
        canvas.style.background = '#f8fafc';
        canvas.style.border = '2px dashed #cbd5e1';
    } else if (bgSelect === 'dark-premium') {
        canvas.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
        canvas.style.border = '2px solid #fbbf24';
        if (titleColor === '#0f172a') titleEl.style.color = '#f8fafc'; // auto contrast
        if (nameColor === '#1e293b') nameEl.style.color = '#fbbf24';
    }
    
    nameEl.style.color = nameColor;
    titleEl.style.color = titleColor;
    
    if (titleText) {
        titleEl.textContent = titleText;
    } else {
        titleEl.textContent = "Sertifikat Kelulusan";
    }
};

window.saveCertTemplate = function() {
    const title = document.getElementById('cert-title').value;
    if (!title) {
        alert('Mohon isi Judul Template Sertifikat terlebih dahulu.');
        return;
    }
    alert('Template Sertifikat "' + title + '" berhasil disimpan dan siap digunakan untuk kelulusan agen!');
};

// ==================== AUTO LOGIN MAKRO ====================
window.autoLogin = function(email, password) {
    console.log("[AutoLogin] Memproses login untuk: " + email);
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');

    if (emailInput && passInput) {
        emailInput.value = email;
        passInput.value = password;
        
        const form = document.getElementById('form-login');
        if (form) {
            const mockEvent = new Event('submit', { cancelable: true, bubbles: true });
            form.dispatchEvent(mockEvent);
            
            // Backup invocation
            if (typeof window.handleLogin === 'function') {
                window.handleLogin(mockEvent);
            }
        } else {
            alert("Form tidak ditemukan!");
        }
    } else {
        alert("Elemen form login tidak ditemukan oleh sistem auto-login.");
    }
};

// AGGRESSIVE BINDING UNTUK MEMASTIKAN TOMBOL SELALU AKTIF
setInterval(() => {
    const btnAgen = document.getElementById('btn-demo-agent');
    if (btnAgen && !btnAgen.hasAttribute('data-bound')) {
        btnAgen.addEventListener('click', (e) => { e.preventDefault(); window.autoLogin(demoAccounts.agen.email, demoAccounts.agen.password); });
        btnAgen.setAttribute('data-bound', 'true');
    }
    const btnTrainer = document.getElementById('id-demo-trainer');
    if (btnTrainer && !btnTrainer.hasAttribute('data-bound')) {
        btnTrainer.addEventListener('click', (e) => { e.preventDefault(); window.autoLogin(demoAccounts.trainer.email, demoAccounts.trainer.password); });
        btnTrainer.setAttribute('data-bound', 'true');
    }
    const btnAdmin = document.getElementById('btn-demo-admin');
    if (btnAdmin && !btnAdmin.hasAttribute('data-bound')) {
        btnAdmin.addEventListener('click', (e) => { e.preventDefault(); window.autoLogin(demoAccounts.admin.email, demoAccounts.admin.password); });
        btnAdmin.setAttribute('data-bound', 'true');
    }
    const btnPincab = document.getElementById('btn-demo-pincab');
    if (btnPincab && !btnPincab.hasAttribute('data-bound')) {
        btnPincab.addEventListener('click', (e) => { e.preventDefault(); window.autoLogin(demoAccounts.pincab.email, demoAccounts.pincab.password); });
        btnPincab.setAttribute('data-bound', 'true');
    }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {

    // --- PEMBERSIHAN MEMORI APMA (SANGAT PENTING) ---
    console.log("Menjalankan inisialisasi aplikasi...");
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) { 
                registration.unregister(); 
                console.log("Rogue Service Worker dari APMA berhasil dihapus.");
            }
        });
    }

    // Attach events to quiz submit buttons manually to override any HTML binding issues
    const btnSubmitQuiz = document.getElementById('btn-submit-quiz');
    if (btnSubmitQuiz) {
        btnSubmitQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.submitTrainingQuiz(e);
        });
    }

    // Connect chatbot
    const sendBtn = document.getElementById('send-chat-btn');

    // Hubungkan tombol demo login
    document.querySelectorAll('.btn-demo').forEach(btn => {
        const text = btn.textContent || btn.innerText;
        if (text.includes('Agen')) {
            btn.onclick = (e) => { e.preventDefault(); window.autoLogin(demoAccounts.agen.email, demoAccounts.agen.password); };
        } else if (text.includes('Trainer')) {
            btn.onclick = (e) => { e.preventDefault(); window.autoLogin(demoAccounts.trainer.email, demoAccounts.trainer.password); };
        } else if (text.includes('Admin')) {
            btn.onclick = (e) => { e.preventDefault(); window.autoLogin(demoAccounts.admin.email, demoAccounts.admin.password); };
        } else if (text.includes('Pincab') || text.includes('Pimcab') || text.includes('Bambang')) {
            btn.onclick = (e) => { e.preventDefault(); window.autoLogin(demoAccounts.pincab.email, demoAccounts.pincab.password); };
        }
    });
    
    // Pastikan form utama juga ter-bind dengan benar
    const formLogin = document.getElementById('form-login') || document.querySelector('form');
    if (formLogin) {
        formLogin.onsubmit = window.handleLogin;
    }
    // Inisialisasi dropdown kategori
    if (typeof window.renderCategoryDropdowns === 'function') {
        window.renderCategoryDropdowns();
    }

    const btn = document.getElementById('btn-add-module-fixed');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Tombol diklik!");
            showCreateMaterialModal(); 
        });
    }
    
    // Render dinamis awal jika user sudah login sebelumnya
    const activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    if (activeUser && activeUser.role === 'Admin') {
        if (typeof window.renderAdminUsers === 'function') window.renderAdminUsers();
        if (typeof window.renderAuditLogs === 'function') window.renderAuditLogs();
        if (typeof window.renderDashboardAuditLogs === 'function') window.renderDashboardAuditLogs();
    }
});

// ==================== KATEGORI ASURANSI DINAMIS ====================
window.initInsuranceCategories = function() {
    let categories = JSON.parse(localStorage.getItem('pa_insurance_categories'));
    if (!categories) {
        categories = [
            'Dasar Asuransi', 'Asuransi Kendaraan Bermotor', 'Asuransi Properti', 
            'Asuransi Marine Cargo', 'Asuransi Liability', 'Asuransi Engineering', 
            'Asuransi Travel', 'Asuransi Personal Accident', 'Asuransi Kesehatan'
        ];
        localStorage.setItem('pa_insurance_categories', JSON.stringify(categories));
    }
    return categories;
};

window.renderCategoryDropdowns = function() {
    const categories = window.initInsuranceCategories();
    const dropdowns = [
        document.getElementById('trn-mat-cat'),
        document.getElementById('trn-ev-cat')
    ];
    
    dropdowns.forEach(dropdown => {
        if (dropdown) {
            const oldVal = dropdown.value;
            dropdown.innerHTML = '';
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                dropdown.appendChild(opt);
            });
            if (oldVal && categories.includes(oldVal)) {
                dropdown.value = oldVal;
            }
        }
    });
};

window.showNewCategoryInline = function(type) {
    const btn = document.getElementById(`btn-add-cat-${type}`);
    const inlineContainer = document.getElementById(`new-cat-inline-${type}`);
    const input = document.getElementById(`new-cat-input-${type}`);
    
    if (btn) btn.style.display = 'none';
    if (inlineContainer) inlineContainer.style.display = 'flex';
    if (input) {
        input.value = '';
        input.focus();
    }
};

window.cancelNewCategoryInline = function(type) {
    const btn = document.getElementById(`btn-add-cat-${type}`);
    const inlineContainer = document.getElementById(`new-cat-inline-${type}`);
    
    if (btn) btn.style.display = 'inline';
    if (inlineContainer) inlineContainer.style.display = 'none';
};

window.saveNewCategoryInline = function(type) {
    const input = document.getElementById(`new-cat-input-${type}`);
    if (!input) return;
    
    const newCat = input.value.trim();
    if (newCat !== '') {
        let categories = window.initInsuranceCategories();
        if (!categories.includes(newCat)) {
            categories.push(newCat);
            localStorage.setItem('pa_insurance_categories', JSON.stringify(categories));
            window.renderCategoryDropdowns();
            
            // Set active selection
            const selectEl = document.getElementById(type === 'mat' ? 'trn-mat-cat' : 'trn-ev-cat');
            if (selectEl) selectEl.value = newCat;
            
            alert(`Kategori '${newCat}' berhasil ditambahkan dan dipilih!`);
        } else {
            alert('Kategori tersebut sudah terdaftar.');
        }
    }
    window.cancelNewCategoryInline(type);
};

window.hideLevelUpModal = function() { const el = document.getElementById('modal-level-up'); if (el) el.style.display = 'none'; };

window.manifestData = {
    "Semua Produk": { gpw: { target: 1000, tercapai: 550 }, ngpw: { target: 800, tercapai: 450 }, profit: { target: 200, tercapai: 120 } },
    "Non SSC": { gpw: { target: 600, tercapai: 400 }, ngpw: { target: 500, tercapai: 380 }, profit: { target: 120, tercapai: 110 } },
    "SSC": { gpw: { target: 300, tercapai: 100 }, ngpw: { target: 200, tercapai: 50 }, profit: { target: 50, tercapai: 5 } },
    "Bonding": { gpw: { target: 100, tercapai: 50 }, ngpw: { target: 100, tercapai: 20 }, profit: { target: 30, tercapai: 5 } }
};

window.updateManifestData = function() {
    const dropdown = document.getElementById('manifest-dropdown');
    if (!dropdown) return;
    const selected = dropdown.value;
    const data = window.manifestData[selected] || window.manifestData["Semua Produk"];
    
    const gpwTargetEl = document.getElementById('gpw-target');
    const gpwTercapaiEl = document.getElementById('gpw-tercapai');
    const gpwKurangEl = document.getElementById('gpw-kurang');
    if (gpwTargetEl) gpwTargetEl.innerText = data.gpw.target + ' Juta';
    if (gpwTercapaiEl) gpwTercapaiEl.innerText = data.gpw.tercapai + ' Juta';
    if (gpwKurangEl) gpwKurangEl.innerText = Math.max(0, data.gpw.target - data.gpw.tercapai) + ' Juta';
    
    const ngpwTargetEl = document.getElementById('ngpw-target');
    const ngpwTercapaiEl = document.getElementById('ngpw-tercapai');
    const ngpwKurangEl = document.getElementById('ngpw-kurang');
    if (ngpwTargetEl) ngpwTargetEl.innerText = data.ngpw.target + ' Juta';
    if (ngpwTercapaiEl) ngpwTercapaiEl.innerText = data.ngpw.tercapai + ' Juta';
    if (ngpwKurangEl) ngpwKurangEl.innerText = Math.max(0, data.ngpw.target - data.ngpw.tercapai) + ' Juta';
    
    const profitTargetEl = document.getElementById('profit-target');
    const profitTercapaiEl = document.getElementById('profit-tercapai');
    const profitKurangEl = document.getElementById('profit-kurang');
    if (profitTargetEl) profitTargetEl.innerText = data.profit.target + ' Juta';
    if (profitTercapaiEl) profitTercapaiEl.innerText = data.profit.tercapai + ' Juta';
    if (profitKurangEl) profitKurangEl.innerText = Math.max(0, data.profit.target - data.profit.tercapai) + ' Juta';
    
    window.updateAircraftPosition();
    
    const profitPct = data.profit.tercapai / data.profit.target;
    const gpwPct = data.gpw.tercapai / data.gpw.target;
    const ngpwPct = data.ngpw.tercapai / data.ngpw.target;
    const maxProg = Math.max(gpwPct, ngpwPct);
    
    if (maxProg > profitPct + 0.1) {
        setTimeout(() => {
            alert("🤖 [AI Co-Pilot] Kapten! Jarak tempuh premi kita sudah jauh, tapi tangki Profit tertinggal! Segera kejar target profit agar Anda bisa mendarat sah di destinasi.");
        }, 500);
    }
};

window.showDestinationModal = function(destName, imgUrl, desc) {
    document.getElementById('dest-modal-title').innerText = destName;
    document.getElementById('dest-modal-image').src = imgUrl;
    document.getElementById('dest-modal-desc').innerText = desc;
    document.getElementById('modal-destination-viewer').classList.add('active');
};

window.renderGamification = function() {
    const container = document.getElementById('gamification-cockpit-container');
    if (!container) return;

    container.innerHTML = `
        <div class="content-card cockpit-main-area" style="padding: 0; overflow: hidden; display: flex; border: 2px solid var(--border-color);">
            <div style="padding: 20px; background: var(--primary-navy); color: white; flex: 1; position: relative;">
                <h3 style="margin-bottom: 8px; font-weight: 800; font-size: 16px;">🛫 Kokpit Pencapaian Agen</h3>
                <p id="cockpit-status-text" style="font-size: 12px; font-weight: 600; color: #fcd34d; margin-bottom: 15px;"></p>
                <p style="font-size: 12px; opacity: 0.8; margin-bottom: 20px; line-height: 1.4;">Jarak tempuh pesawat dihitung dari (GPW vs NGPW tertinggi). Tangki bensin adalah pencapaian Profit Anda.</p>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8;">PROGRES GPW</div>
                    <div style="font-size: 13px; font-weight: 800; color: white;" id="cockpit-gpw-pct">0%</div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8;">PROGRES NGPW</div>
                    <div style="font-size: 13px; font-weight: 800; color: white;" id="cockpit-ngpw-pct">0%</div>
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <div style="font-size: 11px; font-weight: 700; color: #f87171;">PROFIT (BENSIN)</div>
                    <div style="font-size: 13px; font-weight: 800; color: #f87171;" id="cockpit-profit-pct">0%</div>
                </div>
            </div>
            
            <div class="flight-radar-container" style="min-width: 250px;">
                <div class="radar-bg-grid"></div>
                <div class="vertical-flight-path">
                    <div class="path-line"></div>
                    <div class="path-fill" id="flight-path-fill" style="height: 0%;"></div>
                    
                    <div class="waypoint active" style="bottom: 0%;">
                        <div class="waypoint-lbl">Start</div>
                        <div class="waypoint-dot"></div>
                    </div>
                    <div class="waypoint" style="bottom: 33%;" id="wp-1">
                        <div class="waypoint-lbl">Malang</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Gunung Bromo, Malang', 'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2025/11/04/969332ae-ac6c-4155-bec2-baa6c509f0d2-1762243266394-4b9641fde9aa3e7d9479676b563ca3b1.jpg', 'Nikmati keindahan matahari terbit di Gunung Bromo yang eksotis!')">👁️</div>
                    </div>
                    <div class="waypoint" style="bottom: 66%;" id="wp-2">
                        <div class="waypoint-lbl">Jepang</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Japan Ski Adventure', 'https://ik.imagekit.io/tvlk/blog/2024/07/Japan-Ski.jpg', 'Rasakan sensasi bermain salju dan ski di resor pegunungan Jepang.')">👁️</div>
                    </div>
                    <div class="waypoint" style="bottom: 100%;" id="wp-3">
                        <div class="waypoint-lbl" style="color: #fcd34d;">Santorini</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Santorini, Yunani', 'https://asset.kompas.com/crops/Lntiy-KH6OdtHX09zzadr2M_3Hc=/104x0:1920x1211/750x500/data/photo/2020/05/11/5eb8f3bef3d8f.jpg', 'Pemandangan indah kubah biru dan lautan Mediterania menanti Anda.')">👁️</div>
                    </div>
                </div>
                
                <div class="plane-avatar" id="plane-avatar" style="bottom: 0%;">
                    <div class="avatar-img-circle" id="cockpit-avatar">RA</div>
                    <div class="plane-icon" style="transform: rotate(-45deg);">✈️</div>
                </div>
                
                <div class="fuel-gauge-container" style="position: absolute; right: 15px; bottom: 20px;">
                    <div class="fuel-cylinder">
                        <div class="fuel-level green" id="fuel-level" style="height: 100%;"></div>
                    </div>
                    <div class="fuel-percentage" id="fuel-percentage">100%</div>
                </div>
            </div>
        </div>
    `;
    
    const avatarEl = document.getElementById('cockpit-avatar');
    if (avatarEl) {
        const initials = document.getElementById('user-initials');
        if (initials) avatarEl.innerText = initials.innerText;
    }
    
    setTimeout(window.updateAircraftPosition, 100);
};

window.updateAircraftPosition = function() {
    const gpwTargetEl = document.getElementById('gpw-target');
    if (!gpwTargetEl) return;
    
    let gpwTarget = parseFloat(gpwTargetEl.innerText) || 1;
    let gpwTercapai = parseFloat(document.getElementById('gpw-tercapai').innerText) || 0;
    
    let ngpwTarget = parseFloat(document.getElementById('ngpw-target').innerText) || 1;
    let ngpwTercapai = parseFloat(document.getElementById('ngpw-tercapai').innerText) || 0;
    
    let profitTarget = parseFloat(document.getElementById('profit-target').innerText) || 1;
    let profitTercapai = parseFloat(document.getElementById('profit-tercapai').innerText) || 0;
    
    let gpwPct = (gpwTercapai / gpwTarget) * 100;
    let ngpwPct = (ngpwTercapai / ngpwTarget) * 100;
    let profitPct = (profitTercapai / profitTarget) * 100;
    
    let flightPct = Math.max(gpwPct, ngpwPct);
    
    let flightRenderPct = Math.min(flightPct, 100);
    let profitRenderPct = Math.min(profitPct, 100);

    const planeAvatar = document.getElementById('plane-avatar');
    const flightPathFill = document.getElementById('flight-path-fill');
    if (planeAvatar) planeAvatar.style.bottom = flightRenderPct + '%';
    if (flightPathFill) flightPathFill.style.height = flightRenderPct + '%';
    
    if (document.getElementById('cockpit-gpw-pct')) document.getElementById('cockpit-gpw-pct').innerText = Math.round(gpwPct) + '%';
    if (document.getElementById('cockpit-ngpw-pct')) document.getElementById('cockpit-ngpw-pct').innerText = Math.round(ngpwPct) + '%';
    if (document.getElementById('cockpit-profit-pct')) document.getElementById('cockpit-profit-pct').innerText = Math.round(profitPct) + '%';
    
    const statusText = document.getElementById('cockpit-status-text');
    if (statusText) {
        let dest = "Malang";
        if (flightPct >= 33 && flightPct < 66) dest = "Jepang";
        else if (flightPct >= 66) dest = "Santorini";
        
        const activeUser = sessionStorage.getItem('pa_active_user') ? JSON.parse(sessionStorage.getItem('pa_active_user')) : { name: "Agen" };
        statusText.innerText = `Kapten ${activeUser.name.split(' ')[0]} — Penerbangan menuju ${dest} (${Math.round(flightPct)}% Jarak Tempuh)`;
    }
    
    const wp1 = document.getElementById('wp-1');
    const wp2 = document.getElementById('wp-2');
    const wp3 = document.getElementById('wp-3');
    if (wp1) wp1.className = flightPct >= 33 ? 'waypoint active' : 'waypoint';
    if (wp2) wp2.className = flightPct >= 66 ? 'waypoint active' : 'waypoint';
    if (wp3) wp3.className = flightPct >= 100 ? 'waypoint active' : 'waypoint';
    
    const fuelLevel = document.getElementById('fuel-level');
    const fuelPercentage = document.getElementById('fuel-percentage');
    if (fuelLevel) {
        fuelLevel.style.height = profitRenderPct + '%';
        fuelLevel.className = 'fuel-level';
        
        if (profitPct < flightPct - 10) {
            fuelLevel.classList.add('red');
            fuelLevel.style.background = 'var(--danger-red)';
            fuelLevel.style.boxShadow = 'none';
        } else if (profitPct < flightPct) {
            fuelLevel.classList.add('yellow');
            fuelLevel.style.background = 'var(--warning-gold)';
            fuelLevel.style.boxShadow = 'none';
        } else {
            fuelLevel.classList.add('green');
            fuelLevel.style.background = 'var(--success-green)';
            fuelLevel.style.boxShadow = '0 0 15px var(--success-green)';
        }
    }
    if (fuelPercentage) fuelPercentage.innerText = Math.round(profitPct) + '%';
    
    const globalProgress = document.getElementById('contest-progress-path');
    const globalProgressText = document.getElementById('contest-pct-text');
    if (globalProgressText) globalProgressText.innerText = Math.round(flightPct) + '%';
    if (globalProgress) {
        const offset = 314 - (314 * flightRenderPct / 100);
        globalProgress.style.strokeDashoffset = offset;
    }
};

// ==========================================
// TOKO REWARD VIRTUAL (ADMIN/TRAINER & AGEN)
// ==================== KATALOG PRODUK (ADMIN) ====================

let _importedProdukData = null; // temp storage for uploaded file

window.renderAdminKatalog = function() {
    const tbody = document.getElementById('katalog-produk-rows');
    if (!tbody) return;

    // Load produk: gabungan dari data default dan custom admin
    const defaultProds = (typeof INSURANCE_PRODUCTS_DEFAULT !== 'undefined') ? INSURANCE_PRODUCTS_DEFAULT : [];
    const customProds = JSON.parse(localStorage.getItem('pa_products_custom')) || [];
    let allProds = [...defaultProds, ...customProds];

    // Filter & Search
    const searchVal = (document.getElementById('katalog-search')?.value || '').toLowerCase();
    const filterKat = document.getElementById('katalog-filter-kategori')?.value || '';
    if (searchVal) allProds = allProds.filter(p => (p.name||'').toLowerCase().includes(searchVal));
    if (filterKat) allProds = allProds.filter(p => p.category === filterKat);

    // Update stats
    const allForStats = [...defaultProds, ...customProds];
    const uniqueKat = [...new Set(allForStats.map(p => p.category))].length;
    const lastUpdate = localStorage.getItem('pa_products_last_update') || '-';
    const el = (id) => document.getElementById(id);
    if (el('katalog-total-produk')) el('katalog-total-produk').innerText = allForStats.length;
    if (el('katalog-total-kategori')) el('katalog-total-kategori').innerText = uniqueKat;
    if (el('katalog-last-update')) el('katalog-last-update').innerText = lastUpdate;

    if (allProds.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);">Tidak ada produk ditemukan. Klik "+ Tambah Produk Baru" untuk mulai.</td></tr>`;
        return;
    }

    tbody.innerHTML = allProds.map((p, i) => {
        const isDefault = defaultProds.find(d => d.id === p.id);
        const badgeHtml = isDefault
            ? `<span style="font-size:10px; background:#dbeafe; color:#1d4ed8; padding:2px 7px; border-radius:10px; font-weight:600; margin-left:6px;">BAWAAN</span>`
            : `<span style="font-size:10px; background:#d1fae5; color:#065f46; padding:2px 7px; border-radius:10px; font-weight:600; margin-left:6px;">CUSTOM</span>`;
        const benefitPreview = (p.benefits || '-').substring(0, 70) + ((p.benefits||'').length > 70 ? '...' : '');
        const urlLink = p.url ? `<a href="${p.url}" target="_blank" style="font-size:11px; color:#008DDA; display:block; margin-top:2px;">🔗 Lihat Produk Resmi</a>` : '';
        const editBtn = isDefault ? `<button disabled title="Produk bawaan tidak bisa diedit" style="padding:4px 10px; font-size:11px; border-radius:6px; background:#e2e8f0; border:none; color:#94a3b8; cursor:not-allowed;">Edit</button>` : `<button onclick="showTambahProdukModal('${p.id}')" style="padding:4px 10px; font-size:11px; border-radius:6px; background:#3b82f6; border:none; color:white; cursor:pointer;">Edit</button>`;
        const hapusBtn = isDefault ? `<button disabled title="Produk bawaan tidak bisa dihapus" style="padding:4px 10px; font-size:11px; border-radius:6px; background:#e2e8f0; border:none; color:#94a3b8; cursor:not-allowed; margin-left:4px;">Hapus</button>` : `<button onclick="hapusProduk('${p.id}')" style="padding:4px 10px; font-size:11px; border-radius:6px; background:#ef4444; border:none; color:white; cursor:pointer; margin-left:4px;">Hapus</button>`;
        return `
        <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:12px 8px; color:#94a3b8; font-size:13px;">${i + 1}</td>
            <td style="padding:12px 8px;">
                <div style="font-weight:700; font-size:13px; color:var(--primary-navy);">${p.name || '-'}${badgeHtml}</div>
                ${urlLink}
            </td>
            <td style="padding:12px 8px;">
                <span style="font-size:12px; background:#f0f9ff; color:#0369a1; padding:3px 8px; border-radius:6px; white-space:nowrap;">${p.category || '-'}</span>
            </td>
            <td style="padding:12px 8px; font-size:12px; color:#475569; max-width:240px;">${benefitPreview}</td>
            <td style="padding:12px 8px; text-align:center;">${editBtn}${hapusBtn}</td>
        </tr>`;
    }).join('');
};

window.showTambahProdukModal = function(produkId) {
    const modal = document.getElementById('modal-tambah-produk');
    if (!modal) return;

    // Reset form
    ['produk-edit-id','produk-name','produk-url','produk-benefits','produk-object','produk-warranty','produk-extension','produk-exclusions','produk-claimcase'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('produk-category').value = '';
    document.getElementById('modal-produk-title').innerText = 'Tambah Produk Baru';

    if (produkId) {
        // Mode edit — ambil dari custom
        const customProds = JSON.parse(localStorage.getItem('pa_products_custom')) || [];
        const prod = customProds.find(p => p.id === produkId);
        if (prod) {
            document.getElementById('modal-produk-title').innerText = 'Edit Produk';
            document.getElementById('produk-edit-id').value = prod.id;
            document.getElementById('produk-name').value = prod.name || '';
            document.getElementById('produk-category').value = prod.category || '';
            document.getElementById('produk-url').value = prod.url || '';
            document.getElementById('produk-benefits').value = prod.benefits || '';
            document.getElementById('produk-object').value = prod.object || '';
            document.getElementById('produk-warranty').value = prod.warranty || '';
            document.getElementById('produk-extension').value = prod.extension || '';
            document.getElementById('produk-exclusions').value = prod.exclusions || '';
            document.getElementById('produk-claimcase').value = prod.claimCase || '';
        }
    }

    modal.style.display = 'flex';
};

window.closeTambahProdukModal = function() {
    const modal = document.getElementById('modal-tambah-produk');
    if (modal) modal.style.display = 'none';
};

window.saveProduk = function() {
    const name = document.getElementById('produk-name').value.trim();
    const category = document.getElementById('produk-category').value;
    if (!name) { if (window.showToast) window.showToast('Nama produk wajib diisi.', 'warning'); return; }
    if (!category) { if (window.showToast) window.showToast('Kategori wajib dipilih.', 'warning'); return; }
    const benefits = document.getElementById('produk-benefits').value.trim();
    if (!benefits) { if (window.showToast) window.showToast('Manfaat / Benefit wajib diisi.', 'warning'); return; }

    const editId = document.getElementById('produk-edit-id').value;
    let customProds = JSON.parse(localStorage.getItem('pa_products_custom')) || [];

    const produkData = {
        id: editId || `prod-custom-${Date.now()}`,
        name,
        category,
        url: document.getElementById('produk-url').value.trim(),
        benefits,
        object: document.getElementById('produk-object').value.trim(),
        warranty: document.getElementById('produk-warranty').value.trim(),
        extension: document.getElementById('produk-extension').value.trim(),
        exclusions: document.getElementById('produk-exclusions').value.trim(),
        claimCase: document.getElementById('produk-claimcase').value.trim(),
    };

    if (editId) {
        const idx = customProds.findIndex(p => p.id === editId);
        if (idx >= 0) customProds[idx] = produkData; else customProds.push(produkData);
    } else {
        customProds.push(produkData);
    }

    localStorage.setItem('pa_products_custom', JSON.stringify(customProds));
    localStorage.setItem('pa_products_last_update', new Date().toLocaleDateString('id-ID'));

    window.closeTambahProdukModal();
    window.renderAdminKatalog();
    if (window.showToast) window.showToast(`Produk "${name}" berhasil ${editId ? 'diperbarui' : 'ditambahkan'}!`, 'success');
};

window.hapusProduk = function(produkId) {
    // Custom confirm dialog (hindari browser alert)
    const overlay = document.createElement('div');
    overlay.id = 'confirm-hapus-produk';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
        <div style="background:white;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,0.2);">
            <div style="font-size:48px;margin-bottom:12px;">🗑️</div>
            <h3 style="margin:0 0 8px;color:#0f172a;">Hapus Produk?</h3>
            <p style="font-size:13px;color:#64748b;margin:0 0 24px;">Produk ini akan dihapus dari katalog secara permanen.</p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button onclick="document.getElementById('confirm-hapus-produk').remove()" style="padding:10px 24px;background:#e2e8f0;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-weight:600;color:#374151;">Batal</button>
                <button id="btn-confirm-hapus" style="padding:10px 24px;background:#ef4444;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-weight:600;color:white;">Ya, Hapus</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    document.getElementById('btn-confirm-hapus').addEventListener('click', () => {
        let customProds = JSON.parse(localStorage.getItem('pa_products_custom')) || [];
        customProds = customProds.filter(p => p.id !== produkId);
        localStorage.setItem('pa_products_custom', JSON.stringify(customProds));
        localStorage.setItem('pa_products_last_update', new Date().toLocaleDateString('id-ID'));
        overlay.remove();
        window.renderAdminKatalog();
        if (window.showToast) window.showToast('Produk berhasil dihapus.', 'success');
    });
};

window.downloadTemplateProduk = function() {
    const template = [
        {
            "name": "Nama Produk (Contoh: Simas Mobil Exclusive)",
            "category": "Asuransi Kendaraan Bermotor",
            "url": "https://sinarmas.co.id/produk/simas-mobil-exclusive-proteksi-mobil-anda",
            "benefits": "Jelaskan manfaat utama produk ini untuk nasabah.",
            "object": "Apa yang diasuransikan, contoh: Mobil penumpang non-komersial max 10 tahun.",
            "warranty": "Risiko-risiko yang dijamin, contoh: All Risk mencakup kerusakan kecil hingga besar.",
            "extension": "Jaminan perluasan opsional, contoh: Banjir, Gempa, SRCC, TPL.",
            "exclusions": "Risiko yang TIDAK dijamin, contoh: Penggelapan oleh sopir, ban pecah tanpa kecelakaan.",
            "claimCase": "Contoh nyata kasus klaim yang bisa digunakan agen saat presentasi ke nasabah."
        },
        {
            "name": "Produk Kedua (hapus baris ini jika tidak perlu)",
            "category": "Asuransi Properti",
            "url": "",
            "benefits": "...",
            "object": "...",
            "warranty": "...",
            "extension": "...",
            "exclusions": "...",
            "claimCase": "..."
        }
    ];
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'template_produk_asuransi.json';
    document.body.appendChild(a); // Required for some browsers
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    if (window.showToast) window.showToast('Template JSON berhasil didownload!', 'success');
};

window.showUploadProdukModal = function() {
    const modal = document.getElementById('modal-upload-produk');
    if (!modal) return;
    _importedProdukData = null;
    document.getElementById('upload-file-label').innerText = 'Klik untuk pilih file JSON atau drag & drop di sini';
    document.getElementById('upload-preview-area').style.display = 'none';
    document.getElementById('upload-produk-file').value = '';
    modal.style.display = 'flex';
};

window.closeUploadProdukModal = function() {
    const modal = document.getElementById('modal-upload-produk');
    if (modal) modal.style.display = 'none';
};

window.handleProdukFileUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    document.getElementById('upload-file-label').innerText = `📄 ${file.name}`;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            if (!Array.isArray(parsed)) throw new Error('Format tidak valid. File harus berupa array JSON.');
            const valid = parsed.filter(p => p.name && p.category && p.benefits);
            if (valid.length === 0) throw new Error('Tidak ada produk valid ditemukan. Pastikan setiap produk memiliki field: name, category, benefits.');
            _importedProdukData = valid;
            document.getElementById('upload-preview-text').innerHTML = `✅ Ditemukan <strong>${valid.length} produk valid</strong> siap diimport dari file <em>${file.name}</em>.`;
            document.getElementById('upload-preview-area').style.display = 'block';
        } catch(err) {
            document.getElementById('upload-preview-text').innerHTML = `❌ Error: ${err.message}`;
            document.getElementById('upload-preview-area').style.display = 'block';
            _importedProdukData = null;
        }
    };
    reader.readAsText(file);
};

window.confirmImportProduk = function() {
    if (!_importedProdukData || _importedProdukData.length === 0) return;
    const existing = JSON.parse(localStorage.getItem('pa_products_custom')) || [];
    const withIds = _importedProdukData.map(p => ({
        ...p,
        id: p.id || `prod-import-${Date.now()}-${Math.random().toString(36).substr(2,5)}`,
        claimCase: p.claimCase || p.claimcase || ''
    }));
    const merged = [...existing, ...withIds];
    localStorage.setItem('pa_products_custom', JSON.stringify(merged));
    localStorage.setItem('pa_products_last_update', new Date().toLocaleDateString('id-ID'));
    window.closeUploadProdukModal();
    window.renderAdminKatalog();
    if (window.showToast) window.showToast(`${withIds.length} produk berhasil diimport ke katalog!`, 'success');
    _importedProdukData = null;
};

// ==========================================

window.renderAdminRewards = function() {
    const tbody = document.getElementById("admin-rewards-tbody");
    if (!tbody) return;
    
    let rewards = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
    let html = "";
    
    const iconMap = { "shield": "🛡️", "message-circle": "💬", "award": "👑", "coffee": "☕", "phone": "📱", "gift": "🎮" };
    
    rewards.forEach(item => {
        const displayIcon = iconMap[item.icon] || item.icon || '🎁';
        html += `
        <tr>
            <td style="font-size: 24px; text-align:center;">${displayIcon}</td>
            <td style="font-weight: bold;">${item.name}</td>
            <td>${item.type || 'Virtual Item'}</td>
            <td style="color: var(--warning-gold); font-weight: bold;">${item.price} Koin</td>
            <td style="font-size:12px; color:var(--text-muted);">${item.desc}</td>
            <td style="text-align:center;">
                <button class="btn-primary" style="padding:4px 8px; font-size:12px;" onclick="openAdminRewardModal('${item.id}')">Edit</button>
                <button class="btn-secondary" style="padding:4px 8px; font-size:12px; border-color:var(--danger-red); color:var(--danger-red);" onclick="deleteAdminReward('${item.id}')">Hapus</button>
            </td>
        </tr>`;
    });
    
    if (rewards.length === 0) {
        html = `<tr><td colspan="6" style="text-align:center; padding:20px;">Belum ada item reward.</td></tr>`;
    }
    
    tbody.innerHTML = html;
};

window.openAdminRewardModal = function(id = null) {
    if (id) {
        const rewards = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
        const item = rewards.find(r => r.id === id);
        if (item) {
            document.getElementById("modal-reward-title").innerText = "Edit Item Reward";
            document.getElementById("adm-rew-id").value = item.id;
            document.getElementById("adm-rew-name").value = item.name;
            document.getElementById("adm-rew-desc").value = item.desc;
            document.getElementById("adm-rew-price").value = item.price;
            document.getElementById("adm-rew-icon").value = item.icon || '🎁';
        }
    } else {
        document.getElementById("modal-reward-title").innerText = "Tambah Item Reward";
        document.getElementById("adm-rew-id").value = "";
        document.getElementById("adm-rew-name").value = "";
        document.getElementById("adm-rew-desc").value = "";
        document.getElementById("adm-rew-price").value = "";
        document.getElementById("adm-rew-icon").value = "";
    }
    document.getElementById("modal-admin-reward").classList.add("active");
};

window.saveAdminReward = function() {
    const idField = document.getElementById("adm-rew-id").value;
    const name = document.getElementById("adm-rew-name").value.trim();
    const desc = document.getElementById("adm-rew-desc").value.trim();
    const price = parseInt(document.getElementById("adm-rew-price").value) || 0;
    const icon = document.getElementById("adm-rew-icon").value.trim() || '🎁';
    
    if (!name || price <= 0) {
        alert("Nama item dan harga koin tidak boleh kosong/nol.");
        return;
    }
    
    let rewards = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
    
    if (idField) {
        const idx = rewards.findIndex(r => r.id === idField);
        if (idx !== -1) {
            rewards[idx].name = name;
            rewards[idx].desc = desc;
            rewards[idx].price = price;
            rewards[idx].icon = icon;
        }
    } else {
        rewards.push({
            id: 'rw_' + Date.now(),
            name: name,
            desc: desc,
            price: price,
            icon: icon,
            type: 'Virtual Item'
        });
    }
    
    localStorage.setItem("daftar_katalog_reward", JSON.stringify(rewards));
    document.getElementById("modal-admin-reward").classList.remove("active");
    renderAdminRewards();
    alert("Item reward berhasil disimpan!");
};

window.deleteAdminReward = function(id) {
    if (confirm("Yakin ingin menghapus item reward ini?")) {
        let rewards = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
        rewards = rewards.filter(r => r.id !== id);
        localStorage.setItem("daftar_katalog_reward", JSON.stringify(rewards));
        renderAdminRewards();
    }
};

window.renderRewardsShop = function() {
    const grid = document.getElementById("rewards-shop-grid");
    if (!grid) return;
    
    let rewards = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
    let html = "";
    
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    
    if (!activeUser && currentRole === 'Agen') {
        activeUser = { email: "agen@insuremind.id", role: "Agen", name: "Rian Aditya" };
        sessionStorage.setItem("pa_active_user", JSON.stringify(activeUser));
    }
    
    const progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    
    if (activeUser && activeUser.role === 'Agen') {
        let userProgress = progData["progress_" + activeUser.email];
        if (!userProgress) {
            userProgress = progData["progress_agen@insuremind.id"] || {};
        }
        const coins = userProgress.coins || 0;
        
        const iconMap = { "shield": "🛡️", "message-circle": "💬", "award": "👑", "coffee": "☕", "phone": "📱", "gift": "🎮" };
        
        let gridHtml = "";
        rewards.forEach(item => {
            const displayIcon = iconMap[item.icon] || item.icon || '🎁';
            gridHtml += `
            <div class="shop-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; text-align: center; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div style="font-size: 40px; margin-bottom: 10px;">${displayIcon}</div>
                <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                <p style="font-size: 12px; color: var(--text-muted); margin: 0 0 15px 0; min-height: 35px; flex: 1;">${item.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
                    <span style="font-weight: bold; color: var(--warning-gold); font-size: 14px;">${item.price} Koin</span>
                    <button class="btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="buyReward('${item.id}', ${item.price})">Beli</button>
                </div>
            </div>`;
        });
        
        if (rewards.length === 0) {
            gridHtml = `<p style="grid-column: 1/-1; text-align:center;">Toko sedang kosong.</p>`;
        }
        
        html = `
        <div style="grid-column: 1/-1; margin-bottom: 20px; font-weight: bold; padding: 15px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display:flex; align-items:center; gap:10px;">
                <span>Saldo Koin Anda:</span>
                <span style="color: var(--warning-gold); font-size: 16px; display: flex; align-items: center;">${coins} Koin</span>
            </div>
            <button class="btn-primary" style="padding: 6px 12px; font-size: 11px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border:none; width:auto; cursor:pointer;" onclick="window.addDemoCoins(100)">⚡ +100 Koin (Demo)</button>
        </div>
        ${gridHtml}`;
    } else {
        html = `<p>Silakan login sebagai Agen untuk mengakses Toko Reward.</p>`;
    }
    
    grid.innerHTML = html;
};

window.pendingPurchase = null;

window.buyReward = function(id, price) {
    const catalog = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
    const item = catalog.find(r => r.id === id);
    const itemName = item ? item.name : id;
    
    window.pendingPurchase = { id, price };
    
    const modal = document.getElementById('shop-confirm-modal');
    const title = document.getElementById('shop-item-title');
    const desc = document.getElementById('shop-item-desc');
    const btnBuy = document.getElementById('btn-confirm-buy');
    
    if (modal) {
        if (title) title.innerText = `Beli ${itemName}`;
        if (desc) desc.innerText = `Apakah Anda yakin ingin menukarkan ${price} Koin untuk membeli "${itemName}"?`;
        if (btnBuy) {
            btnBuy.innerText = `Beli (${price} Koin)`;
            btnBuy.onclick = window.confirmPurchaseRewardItem;
        }
        modal.classList.add('active');
    }
};

window.hideShopConfirmModal = function() {
    const modal = document.getElementById('shop-confirm-modal');
    if (modal) modal.classList.remove('active');
    window.pendingPurchase = null;
};

window.confirmPurchaseRewardItem = function() {
    if (!window.pendingPurchase) return;
    
    const { id, price } = window.pendingPurchase;
    
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    
    if (!activeUser && currentRole === 'Agen') {
        activeUser = { email: "agen@insuremind.id", role: "Agen", name: "Rian Aditya" };
    }
    
    if (!activeUser || activeUser.role !== 'Agen') {
        window.hideShopConfirmModal();
        return;
    }
    
    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let userProgress = progData["progress_" + activeUser.email];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"];
    }
    
    if (!userProgress) {
        window.hideShopConfirmModal();
        return;
    }
    
    if (userProgress.coins < price) {
        window.showToast("Maaf, saldo koin Anda tidak mencukupi untuk membeli item ini.", "error");
        window.hideShopConfirmModal();
        return;
    }
    
    // Proses pembelian
    userProgress.coins -= price;
    if (!userProgress.rewardsOwned) userProgress.rewardsOwned = [];
    userProgress.rewardsOwned.push(id);
    
    // Efek Samping Game Ticket
    if (id === 'game_ticket') {
        const quotaKey = "pa_game_quota_" + activeUser.email;
        let quota = localStorage.getItem(quotaKey);
        if (quota === null) {
            localStorage.setItem(quotaKey, "3");
        } else {
            localStorage.setItem(quotaKey, (parseInt(quota) + 1).toString());
        }
        
        // update UI if we are in arena-game page
        if (typeof window.updateGameQuotaUI === 'function') {
            window.updateGameQuotaUI();
        }
    }
    
    localStorage.setItem("pa_agent_progress", JSON.stringify(progData));
    
    // Log histori klaim hadiah ke pa_reward_claims
    let claims = JSON.parse(localStorage.getItem("pa_reward_claims")) || [];
    let catalog = JSON.parse(localStorage.getItem("daftar_katalog_reward")) || [];
    let item = catalog.find(r => r.id === id);
    let itemName = item ? item.name : "Item tidak diketahui";
    
    let now = new Date();
    let dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    
    // Jika tipe voucher fisik, statusnya "Menunggu", jika virtual "Selesai"
    let statusKlaim = item && item.name && item.name.toLowerCase().includes("voucher") ? "Menunggu" : "Selesai";
    
    claims.push({
        id: "claim_" + Date.now(),
        agentName: activeUser.name || "Agen",
        agentEmail: activeUser.email,
        rewardId: id,
        rewardName: itemName,
        date: dateStr,
        status: statusKlaim
    });
    localStorage.setItem("pa_reward_claims", JSON.stringify(claims));
    
    window.showToast(`Pembelian berhasil! "${itemName}" telah ditambahkan ke inventory Anda.`, "success");
    
    window.hideShopConfirmModal();
    window.renderRewardsShop();
    
    // Refresh header coins and other widgets
    window.syncGamificationWidgets();
    
    if (typeof window.applyCosmetics === 'function') {
        window.applyCosmetics();
    }
};

window.applyCosmetics = function() {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    if (!activeUser || activeUser.role !== 'Agen') return;
    
    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let userProgress = progData["progress_" + activeUser.email] || progData["progress_agen@insuremind.id"] || {};
    let rewardsOwned = userProgress.rewardsOwned || [];
    
    const profileContainers = document.querySelectorAll('.user-profile-summary, .mobile-user-avatar');
    
    // Check if the user owns Bingkai Emas Premium (id: gold_profile)
    if (rewardsOwned.includes('gold_profile')) {
        profileContainers.forEach(el => el.classList.add('gold-frame'));
    } else {
        profileContainers.forEach(el => el.classList.remove('gold-frame'));
    }
};

// Premium Toast & Gamification Widget Sync Implementation
window.showToast = function(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    else if (type === 'error') icon = '❌';
    else if (type === 'warning') icon = '⚠️';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.classList.remove('show'); setTimeout(() => this.parentElement.remove(), 400);">&times;</button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast && toast.parentElement) {
                    toast.remove();
                }
            }, 400);
        }
    }, 3000);
};

window.syncAgentDashboardStats = function() {
    const activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    if (currentRole !== 'Agen') return;
    
    const email = activeUser ? activeUser.email : "agen@insuremind.id";
    const agentId = activeUser ? activeUser.id : "AGN-001";
    const agentCode = activeUser ? activeUser.code : "AGN-001";

    // 1. Career Progress Widget on Dashboard
    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let userProgress = progData["progress_" + email] || progData["progress_agen@insuremind.id"] || {};
    const xp = userProgress.xp || 0;
    const level = userProgress.level || 1;
    let rankName = "NR";
    if (level === 2) rankName = "MC";
    else if (level >= 3) rankName = "BPP";

    const xpNext = level * 500;
    const xpPrev = (level - 1) * 500;
    const xpInLevel = xp - xpPrev;
    const xpNeededForNext = 500;
    const pct = Math.min(100, Math.max(0, (xpInLevel / xpNeededForNext) * 100));

    const dashRankName = document.getElementById('dash-rank-name');
    if (dashRankName) dashRankName.innerText = `Agen ${rankName}`;
    const dashXpNeeded = document.getElementById('dash-xp-needed');
    if (dashXpNeeded) dashXpNeeded.innerText = `${xp} / ${xpNext} XP`;
    const dashLevelFill = document.getElementById('dash-level-fill');
    if (dashLevelFill) dashLevelFill.style.width = `${pct}%`;

    // 2. Learning Progress Stat Card
    let progressData = JSON.parse(localStorage.getItem("pa_agent_module_progress")) || {};
    let materials = JSON.parse(localStorage.getItem('pa_materials')) || [];
    let totalMaterials = materials.length || 10;
    let completedCount = 0;
    for (const key in progressData) {
        if (key.startsWith(agentId + "_")) {
            const rec = progressData[key];
            if (rec.statusMateri === "SELESAI") {
                completedCount++;
            }
        }
    }
    const learningPct = totalMaterials > 0 ? Math.round((completedCount / totalMaterials) * 100) : 0;
    const dashProgressPct = document.getElementById('dash-progress-pct');
    if (dashProgressPct) dashProgressPct.innerText = `${learningPct}%`;
    const dashProgressFill = document.getElementById('dash-progress-fill');
    if (dashProgressFill) dashProgressFill.style.width = `${learningPct}%`;

    // 3. Materials Done Stat Card
    const dashMaterialsDone = document.getElementById('dash-materials-done');
    if (dashMaterialsDone) dashMaterialsDone.innerText = `${completedCount} / ${totalMaterials}`;

    // 4. Last Quiz Score Stat Card
    let trainings = JSON.parse(localStorage.getItem('pa_trainings')) || [];
    let attendanceData = JSON.parse(localStorage.getItem('pa_training_attendance')) || {};
    let trainingQuizData = JSON.parse(localStorage.getItem('pa_training_quiz_attempts')) || {};
    let totalScore = 0;
    let quizCount = 0;

    for (const key in progressData) {
        if (key.startsWith(agentId + "_")) {
            const rec = progressData[key];
            if (rec.statusKuis !== "Belum Ikut") {
                totalScore += Number(rec.skorKuis || 0);
                quizCount++;
            }
        }
    }

    const myAttendance = attendanceData[email] || {};
    const myLiveQuiz = trainingQuizData[email] || {};
    trainings.forEach(t => {
        const attendRecord = myAttendance[t.id];
        if (attendRecord && attendRecord.status === "Hadir") {
            const liveQuizRecord = myLiveQuiz[t.id];
            if (liveQuizRecord && liveQuizRecord.bestScore !== undefined) {
                totalScore += Number(liveQuizRecord.bestScore);
                quizCount++;
            }
        }
    });

    const avgScoreDashEl = document.getElementById("dash-last-quiz");
    const avgLabelDashEl = document.getElementById("dash-last-quiz-label");
    let finalAvgText = "--";
    if (quizCount > 0) {
        finalAvgText = Math.round(totalScore / quizCount);
    }
    if (avgScoreDashEl) avgScoreDashEl.innerText = finalAvgText;
    if (avgLabelDashEl) {
        avgLabelDashEl.innerText = quizCount > 0 ? "Rata-rata Skor Keseluruhan" : "Belum mengerjakan kuis";
    }

    // 5. LSP Certification Stat Card
    const certData = JSON.parse(localStorage.getItem(`sertifikasi_${agentCode}`)) || null;
    const allRegs = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
    const userRegs = allRegs.filter(r => r.code === agentCode);
    const latestReg = userRegs.length > 0 ? userRegs[userRegs.length - 1] : null;

    let certStatusText = "Tidak Aktif";
    let certLevelText = "Level 3";
    let certColor = "#ef4444"; // red-500

    const today = new Date();
    const isCertActive = certData && new Date(certData.expiry) > today;

    if (isCertActive) {
        certStatusText = "Aktif";
        certLevelText = certData.schema || "Level 3";
        certColor = "#10b981"; // green-500
    } else if (latestReg) {
        certStatusText = latestReg.status || "Menunggu Review";
        certLevelText = latestReg.schema || "Level 3";
        if (latestReg.status === "Dijadwalkan" || latestReg.status === "Lulus") {
            certColor = "#10b981";
        } else if (latestReg.status === "Tidak Lulus") {
            certColor = "#ef4444";
        } else {
            certColor = "#f59e0b"; // orange/amber-500
        }
    } else {
        certStatusText = "Belum Terdaftar";
        certLevelText = "Daftar Sertifikasi";
        certColor = "#64748b"; // slate-500
    }

    const dashCertStatus = document.getElementById('dash-cert-status');
    if (dashCertStatus) {
        dashCertStatus.innerText = certStatusText;
        dashCertStatus.style.color = certColor;
    }
    const dashCertDesc = document.getElementById('dash-cert-desc');
    if (dashCertDesc) {
        dashCertDesc.innerText = certLevelText;
    }
};

window.syncGamificationWidgets = function() {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    if (!activeUser && currentRole === 'Agen') {
        activeUser = { email: "agen@insuremind.id", role: "Agen", name: "Rian Aditya" };
    }
    if (!activeUser || activeUser.role !== 'Agen') return;

    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let userProgress = progData["progress_" + activeUser.email] || progData["progress_agen@insuremind.id"];
    
    if (!userProgress) return;

    const coins = userProgress.coins || 0;
    const xp = userProgress.xp || 0;
    const level = userProgress.level || 1;
    const streak = userProgress.streak || 0;

    let rankName = "NR";
    if (level === 2) rankName = "MC";
    else if (level >= 3) rankName = "BPP";

    const xpNext = level * 500;
    const xpPrev = (level - 1) * 500;
    const xpInLevel = xp - xpPrev;
    const xpNeededForNext = 500;
    const pct = Math.min(100, Math.max(0, (xpInLevel / xpNeededForNext) * 100));

    const topLevel = document.getElementById('top-level-txt');
    if (topLevel) topLevel.innerText = `Level ${level} (${rankName})`;

    const topXp = document.getElementById('top-xp-txt');
    if (topXp) topXp.innerText = `${xp} XP`;

    const topStreak = document.getElementById('top-streak-txt');
    if (topStreak) topStreak.innerText = `${streak} Hari`;

    const topCoins = document.getElementById('top-coins-txt');
    if (topCoins) topCoins.innerText = `${coins} Koin`;

    const profileRank = document.getElementById('header-profile-rank');
    if (profileRank) profileRank.innerText = `Level ${level} — ${rankName} ⭐`;

    const xpBar = document.getElementById('header-xp-bar-fill');
    if (xpBar) xpBar.style.width = `${pct}%`;

    const xpText = document.getElementById('header-xp-text');
    if (xpText) xpText.innerText = `${xp} / ${xpNext} XP`;

    const profilCoin = document.getElementById('profil-coin-balance');
    if (profilCoin) profilCoin.innerText = `${coins} Koin`;

    const profilTotalXp = document.getElementById('profil-total-xp');
    if (profilTotalXp) profilTotalXp.innerText = xp;

    const profilStreakVal = document.getElementById('profil-streak');
    if (profilStreakVal) profilStreakVal.innerText = streak;

    const profilLevelVal = document.getElementById('profil-level');
    if (profilLevelVal) profilLevelVal.innerText = level;

    const profilRankNameLbl = document.getElementById('profil-rank-name-lbl');
    if (profilRankNameLbl) profilRankNameLbl.innerText = `Agen ${rankName}`;

    const profilRankBadge = document.getElementById('profil-rank-badge');
    if (profilRankBadge) profilRankBadge.innerText = `⭐ Agen ${rankName}`;

    const profilXpLbl = document.getElementById('profil-xp-lbl');
    if (profilXpLbl) profilXpLbl.innerText = `${xp} / ${xpNext} XP`;

    const profilXpFill = document.getElementById('profil-xp-fill');
    if (profilXpFill) profilXpFill.style.width = `${pct}%`;

    // Panggil sinkronisasi khusus widget dashboard agen
    window.syncAgentDashboardStats();
};

// Pastikan dipanggil saat awal buka jika sesi tersimpan
document.addEventListener("DOMContentLoaded", function() {
    window.syncGamificationWidgets();
    window.applyCosmetics();
});

// Demo Helpers for Testing
window.addDemoCoins = function(amount) {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    const currentRole = sessionStorage.getItem("currentUserRole");
    if (!activeUser && currentRole === 'Agen') {
        activeUser = { email: "agen@insuremind.id", role: "Agen", name: "Rian Aditya" };
    }
    if (!activeUser || activeUser.role !== 'Agen') return;

    let progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let rianKey = "progress_" + activeUser.email;
    let userProgress = progData[rianKey];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"] || {};
    }
    
    userProgress.coins = (userProgress.coins || 0) + amount;
    progData[rianKey] = userProgress;
    localStorage.setItem("pa_agent_progress", JSON.stringify(progData));
    
    window.showToast(`Berhasil menambahkan +${amount} Koin Demo!`, "success");
    window.renderRewardsShop();
    window.syncGamificationWidgets();
};

window.resetDemoQuota = function() {
    const email = window.getActiveUserEmail();
    const quotaKey = "pa_game_quota_" + email;
    localStorage.setItem(quotaKey, "2");
    window.updateGameQuotaUI();
    window.showToast("Kuota bermain berhasil di-reset menjadi 2 sesi!", "success");
};

// ==================== SERTIFIKASI LSP LOGIC ====================

const LspSyllabusData = {
    'Level 3': {
        title: 'Kualifikasi Agen Level 3 (Asuransi Umum)',
        desc: 'Materi dasar asuransi umum, pengetahuan hukum asuransi, dan prinsip underwriting serta klaim dasar sesuai standar LSP AAUI.',
        units: [
            'K.65ASR00.032.1: Mengidentifikasi Kebutuhan Nasabah',
            'K.65ASR00.033.1: Melaksanakan Proses Penjualan Produk Asuransi',
            'K.65ASR00.034.1: Melaksanakan Pelayanan Nasabah'
        ],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        materiUrl: '#'
    },
    'Level 4 - Bonding': {
        title: 'Kualifikasi Agen Level 4 (Bonding)',
        desc: 'Materi spesialisasi produk khusus penjaminan proyek (Surety Bond, Customs Bond) dan analisis kelayakan risiko kontraktor.',
        units: [
            'K.65ASR00.032.1: Mengidentifikasi Kebutuhan Nasabah',
            'K.65ASR00.033.1: Melaksanakan Proses Penjualan Produk Asuransi',
            'K.65ASR00.034.1: Melaksanakan Pelayanan Nasabah',
            'K.65ASR00.035.1: Melaksanakan Proses Penjualan Produk Khusus (Bonding)'
        ],
        videoUrl: 'https://www.youtube.com/embed/l482T0yNkeo', // Placeholder
        materiUrl: '#'
    },
    'Level 4 - PAYDI': {
        title: 'Kualifikasi Agen Level 4 (PAYDI)',
        desc: 'Materi spesialisasi produk khusus Produk Asuransi Yang Dikaitkan Dengan Investasi (PAYDI / Unit Link) sesuai SEOJK.',
        units: [
            'K.65ASR00.032.1: Mengidentifikasi Kebutuhan Nasabah',
            'K.65ASR00.033.1: Melaksanakan Proses Penjualan Produk Asuransi',
            'K.65ASR00.034.1: Melaksanakan Pelayanan Nasabah',
            'K.65ASR00.035.1: Melaksanakan Proses Penjualan Produk Khusus (PAYDI)'
        ],
        videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', // Placeholder
        materiUrl: '#'
    }
};

window.selectQualification = function(level) {
    const data = LspSyllabusData[level];
    if (!data) return;

    // Update Text Content
    const titleEl = document.getElementById('lsp-qualification-title');
    const descEl = document.getElementById('lsp-qualification-desc');
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;

    // Update Syllabus Units
    const ul = document.getElementById('lsp-units-container');
    if (ul) {
        ul.innerHTML = '';
        data.units.forEach(unit => {
            const li = document.createElement('li');
            li.style.marginBottom = '8px';
            li.innerHTML = `✅ ${unit}`;
            ul.appendChild(li);
        });
    }

    // Update Video
    const videoFrame = document.getElementById('lsp-video-frame');
    if (videoFrame) {
        videoFrame.src = data.videoUrl;
    }
};

window.bacaMateriLSP = function() {
    if (window.showToast) window.showToast('Fitur baca materi akan segera tersedia.', 'info');
};

window.unduhMateriLSP = function() {
    if (window.showToast) window.showToast('Mengunduh modul PDF persiapan sertifikasi...', 'info');
};

window.daftarUjiKompetensi = function() {
    let activeUser = JSON.parse(sessionStorage.getItem("pa_active_user"));
    if (!activeUser) {
        if (window.showToast) window.showToast("Sesi berakhir, silakan login kembali.", "error");
        return;
    }

    const allRegs = JSON.parse(localStorage.getItem('lsp_registrations')) || [];
    const userRegs = allRegs.filter(r => r.code === activeUser.code);
    const latestReg = userRegs.length > 0 ? userRegs[userRegs.length - 1] : null;

    // Jika ada pendaftaran aktif (bukan Tidak Lulus), blokir double submit
    if (latestReg && latestReg.status !== 'Tidak Lulus') {
        if (window.showToast) window.showToast('Anda sudah memiliki pendaftaran aktif.', 'warning');
        return;
    }

    const schemaRaw = document.getElementById('select-qualification-type') ? document.getElementById('select-qualification-type').value : 'Level 3';
    let schema = schemaRaw;
    if (schemaRaw === 'Level 3') schema = 'Level 3 (Asuransi Umum)';
    else if (schemaRaw === 'Level 4 - Bonding') schema = 'Level 4 (Bonding)';
    else if (schemaRaw === 'Level 4 - PAYDI') schema = 'Level 4 (PAYDI)';

    allRegs.push({
        name: activeUser.name,
        code: activeUser.code,
        schema: schema,
        date: new Date().toLocaleDateString('id-ID'),
        status: 'Menunggu Review',
        feedback: '',
        scheduleDate: ''
    });
    localStorage.setItem('lsp_registrations', JSON.stringify(allRegs));

    if (window.showToast) window.showToast(`Pendaftaran Uji Kompetensi ${schema} berhasil diajukan! Trainer akan meninjau pendaftaran Anda.`, 'success');
    checkSertifikasiStatus();
};

window.checkSertifikasiStatus = function() {
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
        const expiryStr = expiry.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        const todayStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        localStorage.setItem(`sertifikasi_${regs[index].code}`, JSON.stringify({
            status: 'AKTIF', schema: regs[index].schema,
            lulusDate: todayStr, expiry: expiry.toISOString()
        }));

        // Update database cabang agar pimpinan cabang melihat status terbarunya
        const branchAgents = JSON.parse(localStorage.getItem('pa_branch_agents')) || [];
        const bAgent = branchAgents.find(a => a.code === regs[index].code);
        if (bAgent) {
            if (!bAgent.certifications) bAgent.certifications = {};
            const sc = regs[index].schema || '';
            if (sc.includes('Level 3')) {
                bAgent.certifications.level3 = { status: 'Lulus', date: todayStr, score: 88, expiry: expiryStr };
            } else if (sc.includes('Bonding')) {
                bAgent.certifications.level4_bonding = { status: 'Lulus', date: todayStr, score: 88, expiry: expiryStr };
            } else if (sc.includes('PAYDI')) {
                bAgent.certifications.level4_paydi = { status: 'Lulus', date: todayStr, score: 88, expiry: expiryStr };
            }
            localStorage.setItem('pa_branch_agents', JSON.stringify(branchAgents));
        }
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
// Hook into existing navigation or initialization
const originalNavigateTo = window.navigateTo;
if (originalNavigateTo) {
    window.navigateTo = function(pageId) {
        originalNavigateTo(pageId);
        if (pageId === 'trainer-training' || pageId === 'trainer-dashboard' || pageId === 'admin-dashboard') {
            setTimeout(renderLspRegistrations, 100);
        }
        if (pageId === 'sertifikasi') {
            setTimeout(checkSertifikasiStatus, 100);
        }
        if (pageId === 'leaderboard') {
            setTimeout(() => {
                if (typeof window.switchLeaderboardTab === 'function') window.switchLeaderboardTab('lead-national');
            }, 100);
        }
        if (pageId === 'arena-game') {
            setTimeout(() => {
                if (typeof window.updateGameQuotaUI === 'function') window.updateGameQuotaUI();
            }, 100);
        }
    };
} else {
    // If navigateTo isn't globally accessible here easily, just call it periodically or on load
    document.addEventListener("DOMContentLoaded", function() {
        setInterval(renderLspRegistrations, 2000); // Polling for demo updates
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        if(typeof selectQualification === 'function') {
            selectQualification('Level 3');
            checkSertifikasiStatus();
        }
        renderLspRegistrations();
    }, 500);
});

// ==================== [MODUL 3.3] PPT BUILDER & PROPOSAL GENERATOR ====================

window.switchProposalTab = function(tabId) {
    // Hide all prop contents
    const contents = document.querySelectorAll('.prop-content');
    contents.forEach(c => c.classList.remove('active'));
    
    // Show target prop content
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    
    // Update tab buttons active state
    const buttons = document.querySelectorAll('.prop-tab-btn');
    buttons.forEach(btn => {
        const onclickVal = btn.getAttribute('onclick') || '';
        if (onclickVal.includes(tabId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

window.checkPptxBackend = async function() {
    const statusDot = document.querySelector('#pptx-backend-status .status-dot');
    const statusText = document.getElementById('pptx-status-text');
    const apiHost = window.location.protocol === 'file:' ? 'http://localhost:3001' : '';
    
    if (statusDot) {
        statusDot.className = 'status-dot checking';
    }
    if (statusText) {
        statusText.innerText = 'Memeriksa koneksi server...';
    }
    
    try {
        const response = await fetch(`${apiHost}/api/health`);
        if (response.ok) {
            if (statusDot) statusDot.className = 'status-dot online';
            if (statusText) statusText.innerText = 'Server Terhubung (Ready) ✅';
        } else {
            throw new Error('Server returned error status');
        }
    } catch(e) {
        if (statusDot) statusDot.className = 'status-dot offline';
        if (statusText) statusText.innerText = 'Server Tidak Terhubung (Offline) ⚠️';
    }
};

window.openPptxBuilderTab = function() {
    // 1. Get values from proposal generator form
    const custName = document.getElementById('prop-cust-name')?.value || '';
    const product = document.getElementById('prop-product-select')?.value || '';
    const insuredValue = document.getElementById('prop-insured-value')?.value || '';
    const premium = document.getElementById('prop-calculated-premium')?.value || '';
    
    // 2. Populate PPT Builder form
    const pptxCustNameInput = document.getElementById('pptx-nama-nasabah');
    const pptxProductInput = document.getElementById('pptx-jenis-asuransi');
    const pptxUpInput = document.getElementById('pptx-nilai-pertanggungan');
    const pptxPremiInput = document.getElementById('pptx-total-premi');
    const pptxAgentInput = document.getElementById('pptx-nama-agen');
    const autoFillBanner = document.getElementById('pptx-auto-fill-info');
    
    let hasDataImported = false;
    
    if (pptxCustNameInput && custName) {
        pptxCustNameInput.value = custName;
        hasDataImported = true;
    }
    if (pptxProductInput && product) {
        pptxProductInput.value = product;
        hasDataImported = true;
    }
    if (pptxUpInput && insuredValue) {
        pptxUpInput.value = insuredValue;
        hasDataImported = true;
    }
    if (pptxPremiInput && premium) {
        pptxPremiInput.value = premium;
        hasDataImported = true;
    }
    
    // Set agent name based on currently logged in user
    if (pptxAgentInput) {
        const currentUserStr = sessionStorage.getItem('pa_active_user') || localStorage.getItem('pa_active_user');
        if (currentUserStr) {
            try {
                const user = JSON.parse(currentUserStr);
                pptxAgentInput.value = user.name || 'Agen InsureMind';
            } catch(e) {
                pptxAgentInput.value = 'Agen InsureMind';
            }
        } else {
            pptxAgentInput.value = 'Agen InsureMind';
        }
    }
    
    // 3. Show auto-fill info banner if data was imported
    if (autoFillBanner) {
        autoFillBanner.style.display = hasDataImported ? 'flex' : 'none';
    }
    
    // 4. Update preview & check backend
    window.updatePptxPreview();
    window.checkPptxBackend();
};

window.updatePptxPreview = function() {
    const custName = document.getElementById('pptx-nama-nasabah')?.value || 'Nama Nasabah';
    const product = document.getElementById('pptx-jenis-asuransi')?.value || 'Nama Produk Asuransi';
    const upVal = parseInt(document.getElementById('pptx-nilai-pertanggungan')?.value || '0') || 0;
    const premiVal = parseInt(document.getElementById('pptx-total-premi')?.value || '0') || 0;
    
    // Helper function to format Rupiah
    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(num);
    };
    
    const prevJenis = document.getElementById('prev-jenis');
    const prevNasabah = document.getElementById('prev-nasabah');
    const prevProd = document.getElementById('prev-prod');
    const prevUp = document.getElementById('prev-up');
    const prevPremi = document.getElementById('prev-premi');
    
    if (prevJenis) prevJenis.innerText = product.toUpperCase();
    if (prevNasabah) prevNasabah.innerText = `Untuk: ${custName}`;
    if (prevProd) prevProd.innerText = product;
    if (prevUp) prevUp.innerText = formatRupiah(upVal);
    if (prevPremi) prevPremi.innerText = formatRupiah(premiVal);
};

window.downloadProposalPptx = async function() {
    const namaNasabah = document.getElementById('pptx-nama-nasabah')?.value || '';
    const namaAgen = document.getElementById('pptx-nama-agen')?.value || '';
    const jenisAsuransi = document.getElementById('pptx-jenis-asuransi')?.value || '';
    const nilaiPertanggungan = parseInt(document.getElementById('pptx-nilai-pertanggungan')?.value || '0') || 0;
    const totalPremi = parseInt(document.getElementById('pptx-total-premi')?.value || '0') || 0;
    const catatanTambahan = document.getElementById('pptx-catatan')?.value || '';
    
    if (!namaNasabah.trim()) {
        alert('Nama calon tertanggung (nasabah) tidak boleh kosong.');
        return;
    }
    
    const downloadBtn = document.getElementById('btn-download-pptx');
    const btnText = document.getElementById('pptx-btn-text');
    const originalText = btnText ? btnText.innerText : 'Download File PPTX Penawaran';
    
    // Set loading state
    if (downloadBtn) downloadBtn.disabled = true;
    if (btnText) btnText.innerText = '⏳ Sedang membuat PPTX...';
    
    try {
        const payload = {
            namaNasabah,
            namaAgen,
            jenisAsuransi,
            nilaiPertanggungan,
            totalPremi,
            catatanTambahan
        };
        
        const apiHost = window.location.protocol === 'file:' ? 'http://localhost:3001' : '';
        const response = await fetch(`${apiHost}/api/generate-pptx`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            let errorText = 'Gagal membuat file PPTX.';
            try {
                const errData = await response.json();
                errorText = errData.error || errData.detail || errorText;
            } catch(e) {}
            throw new Error(errorText);
        }
        
        const blob = await response.blob();
        
        // Create download link
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        
        let fileName = `Proposal_${namaNasabah.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")}.pptx`;
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition);
            if (matches && matches[1]) {
                fileName = matches[1];
            }
        }
        
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
        
    } catch(error) {
        console.error('Error downloading PPTX:', error);
        alert('Terjadi kesalahan saat mengunduh proposal PPTX: ' + error.message);
    } finally {
        if (downloadBtn) downloadBtn.disabled = false;
        if (btnText) btnText.innerText = originalText;
    }
};

// Bind real-time input change listeners for PPTX forms
document.addEventListener("DOMContentLoaded", function() {
    const inputs = ['pptx-nama-nasabah', 'pptx-jenis-asuransi', 'pptx-nilai-pertanggungan', 'pptx-total-premi', 'pptx-catatan'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                if (typeof window.updatePptxPreview === 'function') {
                    window.updatePptxPreview();
                }
            });
        }
    });
});

// =========================================================================
// [MODUL 4.3] ARENA GAME EDUKASI (SWIPE MATCH & WORD DUEL) ENGINE
// =========================================================================

// State variables
let swipeTimerInterval = null;
let swipeTimeLeft = 5;
let activeSwipeCases = [];
let activeSwipeIndex = 0;
let swipeCorrectCount = 0;
let swipeWrongCount = 0;
let swipeStreakCount = 0;
let activeGameType = ''; // 'swipe' or 'word'

let wordDuelTimerInterval = null;
let wordDuelTimeLeft = 60;
let wordDuelScore = 0;
let wordDuelCorrectCount = 0;
let activeWordDuelQuestions = [];
let activeWordDuelIndex = 0;
let currentWordAnswer = '';

// Quota Helper Functions
window.getActiveUserEmail = function() {
    const currentUserStr = sessionStorage.getItem('pa_active_user') || localStorage.getItem('pa_active_user');
    if (currentUserStr) {
        try {
            const user = JSON.parse(currentUserStr);
            return user.email || 'agen@insuremind.id';
        } catch(e) {
            return 'agen@insuremind.id';
        }
    }
    return 'agen@insuremind.id';
};

window.updateGameQuotaUI = function() {
    const email = window.getActiveUserEmail();
    const quotaKey = "pa_game_quota_" + email;
    if (localStorage.getItem(quotaKey) === null) {
        localStorage.setItem(quotaKey, "2");
    }
    const quota = parseInt(localStorage.getItem(quotaKey)) || 0;
    
    const quotaText = document.getElementById('game-quota-text');
    if (quotaText) {
        if (quota > 2) {
            quotaText.innerText = `${quota} Sesi Tersisa (Bonus Tiket)`;
        } else {
            quotaText.innerText = `${quota} / 2 Sesi Tersisa`;
        }
    }
    
    // Show/hide Beli Tiket button
    const buyTicketBtn = document.getElementById('btn-buy-ticket');
    if (buyTicketBtn) {
        buyTicketBtn.style.display = (quota === 0) ? 'inline-block' : 'none';
    }
};

// ==================== GAME 1: UNDERWRITING SWIPE MATCH ====================

window.startSwipeGame = function() {
    const email = window.getActiveUserEmail();
    const quotaKey = "pa_game_quota_" + email;
    const quota = parseInt(localStorage.getItem(quotaKey)) || 0;
    
    if (quota <= 0) {
        // Show Quota Exhausted Modal
        const modal = document.getElementById('game-quota-modal');
        if (modal) modal.classList.add('active');
        return;
    }
    
    // Deduct 1 session from quota
    localStorage.setItem(quotaKey, (quota - 1).toString());
    window.updateGameQuotaUI();
    
    // Hide Selection Hub, Show Arena
    const gameHub = document.getElementById('game-hub-grid');
    const quotaBar = document.getElementById('game-quota-bar');
    const arena = document.getElementById('game-swipe-arena');
    
    if (gameHub) gameHub.style.display = 'none';
    if (quotaBar) quotaBar.style.display = 'none';
    if (arena) arena.style.display = 'block';
    
    activeGameType = 'swipe';
    swipeStreakCount = 0;
    swipeCorrectCount = 0;
    swipeWrongCount = 0;
    activeSwipeIndex = 0;
    
    // Get cases and shuffle
    const cases = JSON.parse(localStorage.getItem('pa_underwriting_cases')) || [];
    if (cases.length === 0) {
        alert("Tidak ada soal underwriting. Admin harus menambahkannya terlebih dahulu.");
        window.exitGame('swipe');
        return;
    }
    
    activeSwipeCases = [...cases].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    // Reset scoreboard
    document.getElementById('swipe-streak').innerText = '0';
    document.getElementById('swipe-correct').innerText = '0';
    document.getElementById('swipe-wrong').innerText = '0';
    
    window.renderSwipeCard();
};

window.renderSwipeCard = function() {
    if (swipeTimerInterval) clearInterval(swipeTimerInterval);
    
    if (activeSwipeIndex >= activeSwipeCases.length) {
        window.endSwipeGame();
        return;
    }
    
    const currentCase = activeSwipeCases[activeSwipeIndex];
    
    // Update DOM card
    document.getElementById('swipe-card-tag').innerText = `KASUS ${activeSwipeIndex + 1} / ${activeSwipeCases.length}`;
    document.getElementById('swipe-card-emoji').innerText = currentCase.emoji || '⚖️';
    document.getElementById('swipe-card-title').innerText = currentCase.title;
    document.getElementById('swipe-card-desc').innerText = currentCase.risk;
    document.getElementById('swipe-detail-risk').innerText = currentCase.category;
    document.getElementById('swipe-detail-premi').innerText = currentCase.premi;
    document.getElementById('swipe-card-num').innerText = `Kartu ${activeSwipeIndex + 1} / ${activeSwipeCases.length}`;
    
    // Hide hints & feedback
    document.getElementById('swipe-hint-left').style.opacity = '0';
    document.getElementById('swipe-hint-right').style.opacity = '0';
    document.getElementById('swipe-feedback').style.display = 'none';
    
    // Reset Card Animation style
    const card = document.getElementById('swipe-card');
    if (card) {
        card.className = 'swipe-card';
        card.style.transform = 'none';
        card.style.opacity = '1';
    }
    
    // Start 5 Seconds timer
    swipeTimeLeft = 5;
    document.getElementById('swipe-timer-num').innerText = '5';
    document.getElementById('swipe-timer-path').setAttribute('stroke-dasharray', '100, 100');
    
    swipeTimerInterval = setInterval(() => {
        swipeTimeLeft--;
        document.getElementById('swipe-timer-num').innerText = swipeTimeLeft.toString();
        
        const offset = (swipeTimeLeft / 5) * 100;
        document.getElementById('swipe-timer-path').setAttribute('stroke-dasharray', `${offset}, 100`);
        
        if (swipeTimeLeft <= 0) {
            clearInterval(swipeTimerInterval);
            // Treat as wrong (time out)
            window.handleSwipeAnswer('timeout');
        }
    }, 1000);
};

window.handleSwipeAnswer = function(answer) {
    if (swipeTimerInterval) clearInterval(swipeTimerInterval);
    
    const currentCase = activeSwipeCases[activeSwipeIndex];
    let isCorrect = false;
    
    if (answer === 'timeout') {
        swipeWrongCount++;
        swipeStreakCount = 0;
    } else {
        isCorrect = (answer === currentCase.correctAnswer);
        if (isCorrect) {
            swipeCorrectCount++;
            swipeStreakCount++;
        } else {
            swipeWrongCount++;
            swipeStreakCount = 0;
        }
    }
    
    // Update scoreboard
    document.getElementById('swipe-streak').innerText = swipeStreakCount.toString();
    document.getElementById('swipe-correct').innerText = swipeCorrectCount.toString();
    document.getElementById('swipe-wrong').innerText = swipeWrongCount.toString();
    
    // Display feedback overlay
    const feedback = document.getElementById('swipe-feedback');
    if (feedback) {
        feedback.style.display = 'flex';
        feedback.style.flexDirection = 'column';
        feedback.style.justifyContent = 'center';
        feedback.style.alignItems = 'center';
        feedback.style.padding = '20px';
        feedback.style.textAlign = 'center';
        
        if (isCorrect) {
            feedback.innerHTML = `<h3 style="color:#22c55e; font-size:24px; font-weight:800; margin:0 0 10px 0;">✓ BENAR</h3>
                                  <p style="font-size:13px; color:#f8fafc; margin:0;">${currentCase.feedback}</p>`;
        } else {
            feedback.innerHTML = `<h3 style="color:#ef4444; font-size:24px; font-weight:800; margin:0 0 10px 0;">✗ ${answer === 'timeout' ? 'WAKTU HABIS' : 'SALAH'}</h3>
                                  <p style="font-size:13px; color:#f8fafc; margin:0;">${currentCase.feedback}</p>`;
        }
    }
    
    // Card animation
    const card = document.getElementById('swipe-card');
    if (card) {
        if (answer === 'accept') {
            card.classList.add('animate-right');
            document.getElementById('swipe-hint-right').style.opacity = '1';
        } else if (answer === 'reject') {
            card.classList.add('animate-left');
            document.getElementById('swipe-hint-left').style.opacity = '1';
        } else {
            // timeout animation (fade out downwards)
            card.style.transform = 'translateY(50px)';
            card.style.opacity = '0';
        }
    }
    
    // Wait for animation & feedback read time (1.2 seconds) before loading next card
    setTimeout(() => {
        activeSwipeIndex++;
        window.renderSwipeCard();
    }, 1200);
};

window.endSwipeGame = function() {
    if (swipeTimerInterval) clearInterval(swipeTimerInterval);
    
    // Hide game arena
    document.getElementById('game-swipe-arena').style.display = 'none';
    
    // Open game result modal
    const modal = document.getElementById('game-result-modal');
    if (modal) modal.classList.add('active');
    
    document.getElementById('game-result-emoji').innerText = '🏆';
    document.getElementById('game-result-title').innerText = 'Swipe Match Selesai!';
    document.getElementById('game-result-desc').innerText = 'Berikut adalah analisis performa penjaminan (underwriting) Anda.';
    
    // Award calculations: +5 XP per correct. If 10 streak (10 correct in a row): +50 XP and +10 Coins.
    let xpGained = swipeCorrectCount * 5;
    let coinsGained = 0;
    
    if (swipeCorrectCount === 10) {
        xpGained += 50;
        coinsGained += 10;
        // Trigger confetti
        if (typeof window.confetti === 'function') {
            window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }
    
    // Update Agent Progress
    const email = window.getActiveUserEmail();
    const progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    const rianKey = "progress_" + email;
    let userProgress = progData[rianKey];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"] || {};
    }
    
    userProgress.xp = (userProgress.xp || 0) + xpGained;
    userProgress.coins = (userProgress.coins || 0) + coinsGained;
    
    progData[rianKey] = userProgress;
    localStorage.setItem("pa_agent_progress", JSON.stringify(progData));
    
    // Render Stats
    document.getElementById('game-result-stats').innerHTML = `
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">BENAR</div>
            <div style="font-size:18px; font-weight:800; color:#166534;">${swipeCorrectCount}</div>
        </div>
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">SALAH</div>
            <div style="font-size:18px; font-weight:800; color:#991b1b;">${swipeWrongCount}</div>
        </div>
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">HADIAH</div>
            <div style="font-size:13px; font-weight:800; color:var(--primary-blue);">+${xpGained} XP<br>+${coinsGained} Koin</div>
        </div>
    `;
    
    // Sync Top Widgets
    if (typeof window.renderGamification === 'function') {
        window.renderGamification();
    }
    if (typeof window.syncGamificationWidgets === 'function') {
        window.syncGamificationWidgets();
    }
    
    // Log history
    let history = JSON.parse(localStorage.getItem('pa_game_history')) || [];
    history.push({
        date: new Date().toLocaleDateString('id-ID'),
        game: 'Underwriting Swipe Match',
        correct: swipeCorrectCount,
        wrong: swipeWrongCount,
        score: swipeCorrectCount * 10,
        rewardXp: xpGained,
        rewardCoins: coinsGained
    });
    localStorage.setItem('pa_game_history', JSON.stringify(history));
};

// ==================== GAME 2: INSURANCE WORD DUEL ====================

window.startWordDuelGame = function() {
    const email = window.getActiveUserEmail();
    const quotaKey = "pa_game_quota_" + email;
    const quota = parseInt(localStorage.getItem(quotaKey)) || 0;
    
    if (quota <= 0) {
        const modal = document.getElementById('game-quota-modal');
        if (modal) modal.classList.add('active');
        return;
    }
    
    localStorage.setItem(quotaKey, (quota - 1).toString());
    window.updateGameQuotaUI();
    
    const gameHub = document.getElementById('game-hub-grid');
    const quotaBar = document.getElementById('game-quota-bar');
    const arena = document.getElementById('game-word-arena');
    
    if (gameHub) gameHub.style.display = 'none';
    if (quotaBar) quotaBar.style.display = 'none';
    if (arena) arena.style.display = 'block';
    
    activeGameType = 'word';
    wordDuelScore = 0;
    wordDuelCorrectCount = 0;
    wordDuelTimeLeft = 60;
    activeWordDuelIndex = 0;
    
    const words = JSON.parse(localStorage.getItem('pa_word_duel_questions')) || [];
    if (words.length === 0) {
        alert("Tidak ada istilah asuransi di database. Admin harus menambahkannya.");
        window.exitGame('word');
        return;
    }
    
    activeWordDuelQuestions = [...words].sort(() => 0.5 - Math.random());
    
    document.getElementById('word-timer').innerText = '60';
    document.getElementById('word-score').innerText = '0';
    document.getElementById('word-correct-count').innerText = '0';
    document.getElementById('word-timer-bar').style.width = '100%';
    document.getElementById('word-feedback').innerText = '';
    document.getElementById('word-answer-input').value = '';
    
    // Start global countdown
    if (wordDuelTimerInterval) clearInterval(wordDuelTimerInterval);
    wordDuelTimerInterval = setInterval(() => {
        wordDuelTimeLeft--;
        document.getElementById('word-timer').innerText = wordDuelTimeLeft.toString();
        
        const pct = (wordDuelTimeLeft / 60) * 100;
        document.getElementById('word-timer-bar').style.width = `${pct}%`;
        
        if (wordDuelTimeLeft <= 0) {
            clearInterval(wordDuelTimerInterval);
            window.endWordDuelGame();
        }
    }, 1000);
    
    window.renderWordDuelQuestion();
};

window.renderWordDuelQuestion = function() {
    if (activeWordDuelIndex >= activeWordDuelQuestions.length) {
        // Wrap around (reshuffle if user completes all words under 60 seconds)
        const words = JSON.parse(localStorage.getItem('pa_word_duel_questions')) || [];
        activeWordDuelQuestions = [...words].sort(() => 0.5 - Math.random());
        activeWordDuelIndex = 0;
    }
    
    const q = activeWordDuelQuestions[activeWordDuelIndex];
    currentWordAnswer = q.word.toUpperCase();
    
    document.getElementById('word-category-badge').innerText = `Kategori: ${q.category}`;
    document.getElementById('word-clue-box').innerText = q.clue;
    document.getElementById('word-answer-input').value = '';
    document.getElementById('word-feedback').innerText = '';
    document.getElementById('word-answer-input').focus();
    
    // Scramble letters
    let letters = q.word.split('');
    let scrambled = '';
    
    // Shuffle helper
    let attempts = 0;
    do {
        letters.sort(() => 0.5 - Math.random());
        scrambled = letters.join('').toUpperCase();
        attempts++;
    } while (scrambled === currentWordAnswer && attempts < 10);
    
    // Render letters
    const display = document.getElementById('scramble-display');
    if (display) {
        display.innerHTML = letters.map(char => `<span class="scramble-letter">${char}</span>`).join('');
    }
};

window.submitWordDuelAnswer = function() {
    const input = document.getElementById('word-answer-input');
    const feedback = document.getElementById('word-feedback');
    if (!input || !feedback) return;
    
    const val = input.value.trim().toUpperCase();
    if (!val) return;
    
    if (val === currentWordAnswer) {
        // Correct answer
        wordDuelScore += 10;
        wordDuelCorrectCount++;
        
        document.getElementById('word-score').innerText = wordDuelScore.toString();
        document.getElementById('word-correct-count').innerText = wordDuelCorrectCount.toString();
        
        feedback.className = 'word-feedback correct-answer';
        feedback.innerText = '✓ BENAR! (+10 Poin)';
        
        // Brief delay before loading next question
        setTimeout(() => {
            activeWordDuelIndex++;
            window.renderWordDuelQuestion();
        }, 800);
    } else {
        // Wrong answer
        feedback.className = 'word-feedback wrong-answer';
        feedback.innerText = '✗ SALAH! Coba lagi.';
    }
};

window.skipWordDuelQuestion = function() {
    const feedback = document.getElementById('word-feedback');
    
    wordDuelScore = Math.max(0, wordDuelScore - 5);
    document.getElementById('word-score').innerText = wordDuelScore.toString();
    
    if (feedback) {
        feedback.className = 'word-feedback wrong-answer';
        feedback.innerText = '⏭️ DILEWATI (-5 Poin)';
    }
    
    setTimeout(() => {
        activeWordDuelIndex++;
        window.renderWordDuelQuestion();
    }, 800);
};

window.endWordDuelGame = function() {
    if (wordDuelTimerInterval) clearInterval(wordDuelTimerInterval);
    
    document.getElementById('game-word-arena').style.display = 'none';
    
    const modal = document.getElementById('game-result-modal');
    if (modal) modal.classList.add('active');
    
    document.getElementById('game-result-emoji').innerText = '⏱️';
    document.getElementById('game-result-title').innerText = 'Waktu Habis!';
    document.getElementById('game-result-desc').innerText = 'Insurance Word Duel selesai.';
    
    // XP gained is equal to final score
    let xpGained = wordDuelScore;
    let coinsGained = 0;
    
    // Award bonuses based on high score
    if (wordDuelScore >= 80) {
        coinsGained += 5;
        if (typeof window.confetti === 'function') {
            window.confetti({ particleCount: 80, spread: 60 });
        }
    }
    
    // Save rewards
    const email = window.getActiveUserEmail();
    const progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    const rianKey = "progress_" + email;
    let userProgress = progData[rianKey];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"] || {};
    }
    
    userProgress.xp = (userProgress.xp || 0) + xpGained;
    userProgress.coins = (userProgress.coins || 0) + coinsGained;
    
    progData[rianKey] = userProgress;
    localStorage.setItem("pa_agent_progress", JSON.stringify(progData));
    
    // Render stats
    document.getElementById('game-result-stats').innerHTML = `
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">SKOR AKHIR</div>
            <div style="font-size:18px; font-weight:800; color:var(--primary-blue);">${wordDuelScore}</div>
        </div>
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">BENAR</div>
            <div style="font-size:18px; font-weight:800; color:#166534;">${wordDuelCorrectCount}</div>
        </div>
        <div style="background:#f1f5f9; padding:10px 15px; border-radius:6px; min-width:80px;">
            <div style="font-size:10px; color:var(--text-muted); font-weight:700;">HADIAH</div>
            <div style="font-size:13px; font-weight:800; color:var(--accent-orange);">+${xpGained} XP<br>+${coinsGained} Koin</div>
        </div>
    `;
    
    if (typeof window.renderGamification === 'function') {
        window.renderGamification();
    }
    if (typeof window.syncGamificationWidgets === 'function') {
        window.syncGamificationWidgets();
    }
    
    // Update Leaderboard immediately
    if (typeof window.renderLeaderboard === 'function') {
        window.renderLeaderboard('lead-national');
    }
    
    // Log history
    let history = JSON.parse(localStorage.getItem('pa_game_history')) || [];
    history.push({
        date: new Date().toLocaleDateString('id-ID'),
        game: 'Insurance Word Duel',
        correct: wordDuelCorrectCount,
        wrong: 0,
        score: wordDuelScore,
        rewardXp: xpGained,
        rewardCoins: coinsGained
    });
    localStorage.setItem('pa_game_history', JSON.stringify(history));
};

// ==================== GENERAL GAME HELPERS ====================

window.exitGame = function(type) {
    if (confirm('Apakah Anda yakin ingin keluar dari permainan sekarang? Progress sesi ini tidak akan tersimpan.')) {
        if (swipeTimerInterval) clearInterval(swipeTimerInterval);
        if (wordDuelTimerInterval) clearInterval(wordDuelTimerInterval);
        
        document.getElementById('game-swipe-arena').style.display = 'none';
        document.getElementById('game-word-arena').style.display = 'none';
        
        document.getElementById('game-hub-grid').style.display = 'grid';
        document.getElementById('game-quota-bar').style.display = 'flex';
        
        window.updateGameQuotaUI();
    }
};

window.playAgainGame = function() {
    window.closeGameResultModal();
    if (activeGameType === 'swipe') {
        window.startSwipeGame();
    } else if (activeGameType === 'word') {
        window.startWordDuelGame();
    }
};

window.closeGameResultModal = function() {
    const modal = document.getElementById('game-result-modal');
    if (modal) modal.classList.remove('active');
    
    document.getElementById('game-hub-grid').style.display = 'grid';
    document.getElementById('game-quota-bar').style.display = 'flex';
    
    window.updateGameQuotaUI();
};

window.closeGameQuotaModal = function() {
    const modal = document.getElementById('game-quota-modal');
    if (modal) modal.classList.remove('active');
};

// ==========================================
// GAMIFIKASI: PAPAN PERINGKAT (LEADERBOARD)
// ==========================================

window.switchLeaderboardTab = function(tabId) {
    const natBtn = document.getElementById('lead-national-btn');
    const brBtn = document.getElementById('lead-branch-btn');
    if (natBtn && brBtn) {
        if (tabId === 'lead-national') {
            natBtn.classList.add('active');
            brBtn.classList.remove('active');
        } else {
            natBtn.classList.remove('active');
            brBtn.classList.add('active');
        }
    }
    
    window.renderLeaderboard(tabId);
};

window.renderLeaderboard = function(tabId = 'lead-national') {
    const podiumContainer = document.getElementById('leaderboard-podium');
    const rowsContainer = document.getElementById('leaderboard-rows-container');
    if (!podiumContainer || !rowsContainer) return;
    
    podiumContainer.innerHTML = '';
    rowsContainer.innerHTML = '';
    
    const dbKey = tabId === 'lead-national' ? 'pa_leaderboard_national' : 'pa_leaderboard_branch';
    let data = JSON.parse(localStorage.getItem(dbKey)) || [];
    
    // Sync current active user
    const email = window.getActiveUserEmail();
    const progData = JSON.parse(localStorage.getItem("pa_agent_progress")) || {};
    let userProgress = progData["progress_" + email];
    if (!userProgress) {
        userProgress = progData["progress_agen@insuremind.id"] || {};
    }
    
    const userXP = userProgress.xp || 120;
    const hasGoldFrame = (userProgress.rewardsOwned || []).includes('gold_frame');
    
    // Look up user entry
    const activeUser = JSON.parse(sessionStorage.getItem("pa_active_user")) || { name: "Rian Aditya" };
    let userEntry = data.find(item => item.isUser === true || item.name === activeUser.name);
    if (userEntry) {
        userEntry.xp = userXP;
        userEntry.hasGoldFrame = hasGoldFrame;
        userEntry.isUser = true;
    } else {
        data.push({
            name: activeUser.name || "Rian Aditya",
            branch: activeUser.branch || "Jakarta Raya",
            xp: userXP,
            isUser: true,
            hasGoldFrame: hasGoldFrame
        });
    }
    
    // Sort desc
    data.sort((a, b) => b.xp - a.xp);
    localStorage.setItem(dbKey, JSON.stringify(data));
    
    // Podium rendering for top 3
    const top3 = data.slice(0, 3);
    const rest = data.slice(3);
    
    const first = top3[0];
    const second = top3[1];
    const third = top3[2];
    
    let podiumHtml = "";
    
    // 2nd Place (Left)
    if (second) {
        podiumHtml += `
        <div class="podium-step step-two" style="display:flex; flex-direction:column; align-items:center; flex:1; padding:10px;">
            <div class="podium-avatar ${second.hasGoldFrame ? 'gold-frame' : ''}" style="width:60px; height:60px; border-radius:50%; background:#1e293b; border:2px solid #94a3b8; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; position:relative; font-size:16px; margin-bottom:8px; ${second.hasGoldFrame ? 'box-shadow: 0 0 10px #eab308; border-color:#eab308;' : ''}">
                ${second.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                <div style="position:absolute; bottom:-5px; right:-5px; background:#94a3b8; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; color:black;">2</div>
            </div>
            <span style="font-size:13px; font-weight:700; color:var(--text-dark); text-align:center;">${second.name}</span>
            <span style="font-size:11px; color:var(--text-muted);">${second.branch || 'Jakarta'}</span>
            <span style="font-size:12px; font-weight:700; color:var(--primary-blue); margin-top:4px;">${second.xp} XP</span>
        </div>`;
    }
    
    // 1st Place (Center)
    if (first) {
        podiumHtml += `
        <div class="podium-step step-one" style="display:flex; flex-direction:column; align-items:center; flex:1.2; padding:10px; transform: translateY(-10px);">
            <div class="podium-avatar ${first.hasGoldFrame ? 'gold-frame' : ''}" style="width:80px; height:80px; border-radius:50%; background:#1e293b; border:3px solid #fbbf24; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; position:relative; font-size:22px; margin-bottom:8px; box-shadow:0 10px 20px rgba(251, 191, 36, 0.15); ${first.hasGoldFrame ? 'box-shadow: 0 0 15px #eab308; border-color:#eab308;' : ''}">
                👑 ${first.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                <div style="position:absolute; bottom:-5px; right:-5px; background:#fbbf24; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; color:black;">1</div>
            </div>
            <span style="font-size:14px; font-weight:800; color:var(--text-dark); text-align:center;">${first.name}</span>
            <span style="font-size:11px; color:var(--text-muted);">${first.branch || 'Jakarta'}</span>
            <span style="font-size:13px; font-weight:800; color:var(--accent-orange); margin-top:4px;">${first.xp} XP</span>
        </div>`;
    }
    
    // 3rd Place (Right)
    if (third) {
        podiumHtml += `
        <div class="podium-step step-three" style="display:flex; flex-direction:column; align-items:center; flex:1; padding:10px;">
            <div class="podium-avatar ${third.hasGoldFrame ? 'gold-frame' : ''}" style="width:60px; height:60px; border-radius:50%; background:#1e293b; border:2px solid #b45309; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; position:relative; font-size:16px; margin-bottom:8px; ${third.hasGoldFrame ? 'box-shadow: 0 0 10px #eab308; border-color:#eab308;' : ''}">
                ${third.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                <div style="position:absolute; bottom:-5px; right:-5px; background:#b45309; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; color:white;">3</div>
            </div>
            <span style="font-size:13px; font-weight:700; color:var(--text-dark); text-align:center;">${third.name}</span>
            <span style="font-size:11px; color:var(--text-muted);">${third.branch || 'Jakarta'}</span>
            <span style="font-size:12px; font-weight:700; color:var(--primary-blue); margin-top:4px;">${third.xp} XP</span>
        </div>`;
    }
    
    podiumContainer.innerHTML = podiumHtml;
    
    // Rows list
    rest.forEach((item, index) => {
        const rank = index + 4;
        const div = document.createElement('div');
        div.className = `leaderboard-row-item ${item.isUser ? 'highlight-user' : ''} ${item.hasGoldFrame ? 'gold-frame-user' : ''}`;
        div.style = `display:flex; align-items:center; padding:12px 16px; border-radius:8px; margin-bottom:8px; background:${item.isUser ? 'rgba(0, 141, 218, 0.05)' : '#f8fafc'}; border:1px solid ${item.isUser ? 'var(--primary-blue)' : '#e2e8f0'}; ${item.hasGoldFrame ? 'box-shadow: 0 0 8px rgba(234, 179, 8, 0.2); border-color:#eab308;' : ''}`;
        div.innerHTML = `
            <div style="width:30px; font-weight:800; font-size:14px; color:var(--text-muted);">${rank}</div>
            <div style="width:36px; height:36px; border-radius:50%; background:#e2e8f0; color:#475569; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; margin-right:12px; ${item.hasGoldFrame ? 'border: 2px solid #eab308;' : ''}">
                ${item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div style="flex:1;">
                <div style="font-size:13px; font-weight:700; color:var(--text-dark);">${item.name} ${item.isUser ? '<strong>(Anda)</strong>' : ''}</div>
                <div style="font-size:11px; color:var(--text-muted);">${item.branch || 'Jakarta'}</div>
            </div>
            <div style="font-size:13px; font-weight:800; color:var(--primary-blue);">${item.xp} XP</div>
        `;
        rowsContainer.appendChild(div);
    });
};

// ==================== ATC GAMIFICATION (HALAMAN ATC) ====================

window.renderATCGamification = function() {
    const container = document.getElementById('atc-gamification-cockpit-container');
    if (!container) return;

    container.innerHTML = `
        <div class="content-card cockpit-main-area" style="padding: 0; overflow: hidden; display: flex; border: 2px solid var(--border-color);">
            <div style="padding: 20px; background: var(--primary-navy); color: white; flex: 1; position: relative;">
                <h3 style="margin-bottom: 8px; font-weight: 800; font-size: 16px;">🛫 Kokpit Pencapaian ATC</h3>
                <p id="atc-cockpit-status-text" style="font-size: 12px; font-weight: 600; color: #fcd34d; margin-bottom: 15px;"></p>
                <p style="font-size: 12px; opacity: 0.8; margin-bottom: 20px; line-height: 1.4;">Jarak tempuh pesawat dihitung dari (GPW vs NGPW tertinggi). Tangki bensin adalah pencapaian Profit Anda.</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8;">PROGRES GPW</div>
                    <div style="font-size: 13px; font-weight: 800; color: white;" id="atc-cockpit-gpw-pct">0%</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8;">PROGRES NGPW</div>
                    <div style="font-size: 13px; font-weight: 800; color: white;" id="atc-cockpit-ngpw-pct">0%</div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <div style="font-size: 11px; font-weight: 700; color: #f87171;">PROFIT (BENSIN)</div>
                    <div style="font-size: 13px; font-weight: 800; color: #f87171;" id="atc-cockpit-profit-pct">0%</div>
                </div>
            </div>
            <div class="flight-radar-container" style="min-width: 250px;">
                <div class="radar-bg-grid"></div>
                <div class="vertical-flight-path">
                    <div class="path-line"></div>
                    <div class="path-fill" id="atc-flight-path-fill" style="height: 0%;"></div>
                    <div class="waypoint active" style="bottom: 0%;">
                        <div class="waypoint-lbl">Start</div>
                        <div class="waypoint-dot"></div>
                    </div>
                    <div class="waypoint" style="bottom: 33%;" id="atc-wp-1">
                        <div class="waypoint-lbl">Malang</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Gunung Bromo, Malang', 'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2025/11/04/969332ae-ac6c-4155-bec2-baa6c509f0d2-1762243266394-4b9641fde9aa3e7d9479676b563ca3b1.jpg', 'Nikmati keindahan matahari terbit di Gunung Bromo yang eksotis!')">👁️</div>
                    </div>
                    <div class="waypoint" style="bottom: 66%;" id="atc-wp-2">
                        <div class="waypoint-lbl">Jepang</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Japan Ski Adventure', 'https://ik.imagekit.io/tvlk/blog/2024/07/Japan-Ski.jpg', 'Rasakan sensasi bermain salju dan ski di resor pegunungan Jepang.')">👁️</div>
                    </div>
                    <div class="waypoint" style="bottom: 100%;" id="atc-wp-3">
                        <div class="waypoint-lbl" style="color: #fcd34d;">Santorini</div>
                        <div class="waypoint-dot"></div>
                        <div class="btn-checkpoint" onclick="showDestinationModal('Santorini, Yunani', 'https://asset.kompas.com/crops/Lntiy-KH6OdtHX09zzadr2M_3Hc=/104x0:1920x1211/750x500/data/photo/2020/05/11/5eb8f3bef3d8f.jpg', 'Pemandangan indah kubah biru dan lautan Mediterania menanti Anda.')">👁️</div>
                    </div>
                </div>
                <div class="plane-avatar" id="atc-plane-avatar" style="bottom: 0%;">
                    <div class="avatar-img-circle" id="atc-cockpit-avatar">RA</div>
                    <div class="plane-icon" style="transform: rotate(-45deg);">✈️</div>
                </div>
                <div class="fuel-gauge-container" style="position: absolute; right: 15px; bottom: 20px;">
                    <div class="fuel-cylinder">
                        <div class="fuel-level green" id="atc-fuel-level" style="height: 100%;"></div>
                    </div>
                    <div class="fuel-percentage" id="atc-fuel-percentage">100%</div>
                </div>
            </div>
        </div>
    `;

    const avatarEl = document.getElementById('atc-cockpit-avatar');
    if (avatarEl) {
        const initials = document.getElementById('user-initials');
        if (initials) avatarEl.innerText = initials.innerText;
    }

    setTimeout(window.updateATCAircraftPosition, 100);
};

const atcTargets = {
  'malang': { nama: 'Malang + Bromo', reqArp: 2800, gpw: 600, ngpw: 500, profit: 120 },
  'jepang': { nama: 'Japan Ski Adventure', reqArp: 6500, gpw: 1000, ngpw: 800, profit: 200 },
  'santorini': { nama: 'Santorini - Yunani', reqArp: 14500, gpw: 2100, ngpw: 1700, profit: 525 }
};
window.atcTargets = atcTargets;

window.updateATCAircraftPosition = function(destKey) {
    let key = (destKey || localStorage.getItem('atc_selected_target') || 'malang').toLowerCase();
    if (key === 'japan') key = 'jepang';
    const targetData = atcTargets[key] || atcTargets['malang'];

    const parseJuta = (id, fallback) => {
        const el = document.getElementById(id);
        if (!el) return fallback;
        const val = parseFloat((el.innerText || '').replace(/[^0-9.,]/g, '').replace(',', '.'));
        return isNaN(val) ? fallback : val;
    };

    let gpwTarget = targetData.gpw;
    let ngpwTarget = targetData.ngpw;
    let profitTarget = targetData.profit;

    let gpwTercapai = parseJuta('atc-gpw-tercapai', parseJuta('gpw-tercapai', 550));
    let ngpwTercapai = parseJuta('atc-ngpw-tercapai', parseJuta('ngpw-tercapai', 450));
    let profitTercapai = parseJuta('atc-profit-tercapai', parseJuta('profit-tercapai', 120));

    let gpwPct    = (gpwTercapai / gpwTarget) * 100;
    let ngpwPct   = (ngpwTercapai / ngpwTarget) * 100;
    let profitPct = (profitTercapai / profitTarget) * 100;
    let flightPct = Math.max(gpwPct, ngpwPct);
    let flightRenderPct = Math.min(flightPct, 100);
    let profitRenderPct = Math.min(profitPct, 100);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.style.bottom = val + '%'; };
    const setHeight = (id, val) => { const el = document.getElementById(id); if (el) el.style.height = val + '%'; };
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };

    setEl('atc-plane-avatar', flightRenderPct);
    setHeight('atc-flight-path-fill', flightRenderPct);
    setText('atc-cockpit-gpw-pct', Math.round(gpwPct) + '%');
    setText('atc-cockpit-ngpw-pct', Math.round(ngpwPct) + '%');
    setText('atc-cockpit-profit-pct', Math.round(profitPct) + '%');

    const statusText = document.getElementById('atc-cockpit-status-text');
    if (statusText) {
        statusText.innerText = 'Penerbangan menuju ' + targetData.nama;
    }

    const wp1 = document.getElementById('atc-wp-1');
    const wp2 = document.getElementById('atc-wp-2');
    const wp3 = document.getElementById('atc-wp-3');
    if (wp1) wp1.className = flightPct >= 33 ? 'waypoint active' : 'waypoint';
    if (wp2) wp2.className = flightPct >= 66 ? 'waypoint active' : 'waypoint';
    if (wp3) wp3.className = flightPct >= 100 ? 'waypoint active' : 'waypoint';

    const fuelLevel = document.getElementById('atc-fuel-level');
    const fuelPercentage = document.getElementById('atc-fuel-percentage');
    if (fuelLevel) {
        fuelLevel.style.height = profitRenderPct + '%';
        fuelLevel.className = 'fuel-level';
        if (profitPct < flightPct - 10) {
            fuelLevel.classList.add('red');
            fuelLevel.style.background = 'var(--danger-red)';
            fuelLevel.style.boxShadow = 'none';
        } else if (profitPct < flightPct) {
            fuelLevel.classList.add('yellow');
            fuelLevel.style.background = 'var(--warning-gold)';
            fuelLevel.style.boxShadow = 'none';
        } else {
            fuelLevel.classList.add('green');
            fuelLevel.style.background = 'var(--success-green)';
            fuelLevel.style.boxShadow = '0 0 15px var(--success-green)';
        }
    }
    if (fuelPercentage) fuelPercentage.innerText = Math.round(profitPct) + '%';
};

window.updateATCManifestData = function() {
    if (!window.manifestData) return;
    const dropdown = document.getElementById('atc-manifest-dropdown');
    const selected = dropdown ? dropdown.value : 'Semua Produk';
    const data = window.manifestData[selected] || window.manifestData['Semua Produk'];

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('atc-gpw-target',      data.gpw.target + ' Juta');
    set('atc-gpw-tercapai',    data.gpw.tercapai + ' Juta');
    set('atc-gpw-kurang',      Math.max(0, data.gpw.target - data.gpw.tercapai) + ' Juta');
    set('atc-ngpw-target',     data.ngpw.target + ' Juta');
    set('atc-ngpw-tercapai',   data.ngpw.tercapai + ' Juta');
    set('atc-ngpw-kurang',     Math.max(0, data.ngpw.target - data.ngpw.tercapai) + ' Juta');
    set('atc-profit-target',   data.profit.target + ' Juta');
    set('atc-profit-tercapai', data.profit.tercapai + ' Juta');
    set('atc-profit-kurang',   Math.max(0, data.profit.target - data.profit.tercapai) + ' Juta');
};

window.selectATCTarget = function(dest) {
    let key = (dest || '').toLowerCase();
    if (key === 'japan') key = 'jepang';
    const targetData = atcTargets[key] || atcTargets['malang'];

    // 1. Class active hanya ada pada kartu yang dipilih
    document.querySelectorAll('.target-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById('target-card-' + key) || document.getElementById('target-card-' + dest);
    if (activeCard) activeCard.classList.add('active');

    // Save selected target to localStorage
    localStorage.setItem('atc_selected_target', key);

    // 2. Teks header kokpit berubah menjadi 'Penerbangan menuju [nama destinasi]'
    const statusText = document.getElementById('atc-cockpit-status-text');
    if (statusText) {
        statusText.innerText = 'Penerbangan menuju ' + targetData.nama;
    }

    // 3. Angka pada kolom 'Target' di tabel bawah diperbarui menggunakan data atcTargets
    const parseJuta = (id, fallback) => {
        const el = document.getElementById(id);
        if (!el) return fallback;
        const val = parseFloat((el.innerText || '').replace(/[^0-9.,]/g, '').replace(',', '.'));
        return isNaN(val) ? fallback : val;
    };

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };

    const gpwTercapai = parseJuta('atc-gpw-tercapai', parseJuta('gpw-tercapai', 550));
    const ngpwTercapai = parseJuta('atc-ngpw-tercapai', parseJuta('ngpw-tercapai', 450));
    const profitTercapai = parseJuta('atc-profit-tercapai', parseJuta('profit-tercapai', 120));

    set('atc-gpw-target', targetData.gpw.toLocaleString('id-ID') + ' Juta');
    set('atc-gpw-kurang', Math.max(0, targetData.gpw - gpwTercapai).toLocaleString('id-ID') + ' Juta');

    set('atc-ngpw-target', targetData.ngpw.toLocaleString('id-ID') + ' Juta');
    set('atc-ngpw-kurang', Math.max(0, targetData.ngpw - ngpwTercapai).toLocaleString('id-ID') + ' Juta');

    set('atc-profit-target', targetData.profit.toLocaleString('id-ID') + ' Juta');
    set('atc-profit-kurang', Math.max(0, targetData.profit - profitTercapai).toLocaleString('id-ID') + ' Juta');

    // 4. Kalkulasi ulang persentase progress bar dan posisi pesawat di radar berdasarkan angka target yang baru
    window.updateATCAircraftPosition(key);
};

// Restore selected ATC target on page load
(function restoreATCTargetOnLoad() {
    function restore() {
        try {
            const stored = localStorage.getItem('atc_selected_target');
            if (!stored) return;
            const parsed = JSON.parse(stored);
            const el = document.getElementById('target-card-' + parsed.name);
            if (el) el.classList.add('active');
        } catch(e) {}
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restore);
    } else {
        restore();
    }
})();

// =========================================================================
// MODUL KHUSUS: ROLE PIMPINAN CABANG (BRANCH LEADER) - ASM ACADEMY
// =========================================================================

// 1. Helper: Mendapatkan Cabang Aktif (Data Scope & Isolation)
window.getPincabActiveBranch = function() {
    try {
        const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user'));
        if (activeUser && activeUser.branch && activeUser.branch !== 'Kantor Pusat') {
            return activeUser.branch;
        }
    } catch(e) {}
    return "Cabang Fatmawati";
};

// 2. Helper: Mengambil Data Master Agen khusus Cabang Bersangkutan
window.getPincabBranchAgents = function() {
    const branch = window.getPincabActiveBranch();
    let allAgents = [];
    try {
        allAgents = JSON.parse(localStorage.getItem('pa_branch_agents')) || [];
    } catch(e) {
        allAgents = [];
    }
    if (allAgents.length === 0 && typeof BRANCH_AGENTS_DEFAULT !== 'undefined') {
        allAgents = BRANCH_AGENTS_DEFAULT;
        localStorage.setItem('pa_branch_agents', JSON.stringify(allAgents));
    }

    // Auto-migrate legacy levels to new hierarchy: NR, MC, BPP
    let modified = false;
    allAgents = allAgents.map(a => {
        if (a.level === 'Pratama' || a.level === 'Kader Pratama') {
            a.level = 'NR';
            modified = true;
        } else if (a.level === 'Madya' || a.level === 'Kader Madya') {
            a.level = (a.rank === 1 || a.code === 'AGN-001') ? 'BPP' : 'MC';
            modified = true;
        } else if (a.level === 'Utama' || a.level === 'Kader Utama') {
            a.level = 'BPP';
            modified = true;
        }
        return a;
    });
    if (modified) {
        localStorage.setItem('pa_branch_agents', JSON.stringify(allAgents));
    }

    // Filter hanya agen yang ada di cabang ini (Isolasi Data Scope)
    return allAgents.filter(a => a.branch === branch);
};

// 3. Helper: Mengambil Data Master Training Cabang
window.getPincabBranchTrainings = function() {
    let trainings = [];
    try {
        trainings = JSON.parse(localStorage.getItem('pa_branch_trainings')) || [];
    } catch(e) {
        trainings = [];
    }
    if (trainings.length === 0 && typeof BRANCH_TRAININGS_DEFAULT !== 'undefined') {
        trainings = BRANCH_TRAININGS_DEFAULT;
        localStorage.setItem('pa_branch_trainings', JSON.stringify(trainings));
    }
    return trainings;
};

// 4. Helper: Format Rupiah Standar
function formatCurrencyIDR(num) {
    if (!num && num !== 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(num);
}

// 5. RENDER HALAMAN 1: DASHBOARD MONITORING CABANG (OVERVIEW)
window.renderPincabDashboard = function() {
    const branch = window.getPincabActiveBranch();
    const agents = window.getPincabBranchAgents();

    // Update Header Badges
    const branchBadge = document.getElementById('pincab-branch-badge');
    if (branchBadge) branchBadge.innerText = branch;

    const leaderNameEl = document.getElementById('pincab-leader-name');
    try {
        const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user'));
        if (leaderNameEl && activeUser && activeUser.name) {
            leaderNameEl.innerText = activeUser.name;
        }
    } catch(e) {}

    // Hitung Metrik Utama
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status.includes('Aktif')).length;
    const inactiveAgents = agents.filter(a => a.status === 'Inaktif').length;
    const passedCert = agents.filter(a => a.certifications && a.certifications.level3 && a.certifications.level3.status === 'Lulus').length;
    const certRate = totalAgents > 0 ? ((passedCert / totalAgents) * 100).toFixed(1) : "0.0";
    
    const activeTrainingAgents = agents.filter(a => a.trainingsAttended && a.trainingsAttended.length > 0).length;
    const trainingRate = totalAgents > 0 ? ((activeTrainingAgents / totalAgents) * 100).toFixed(1) : "0.0";

    const totalProd = agents.reduce((sum, a) => sum + (a.production || 0), 0);

    // Tampilkan di Metrik Cards
    const totalEl = document.getElementById('pincab-total-agents');
    if (totalEl) totalEl.innerHTML = `${totalAgents} <span class="stat-unit">Agen</span>`;

    const activeDescEl = document.getElementById('pincab-active-agents-desc');
    if (activeDescEl) activeDescEl.innerHTML = `<span class="badge-dot-green"></span> ${activeAgents} Aktif • ${inactiveAgents} Inaktif`;

    const certRateEl = document.getElementById('pincab-cert-rate');
    if (certRateEl) certRateEl.innerText = `${certRate}%`;

    const certDescEl = document.getElementById('pincab-cert-desc');
    if (certDescEl) certDescEl.innerText = `${passedCert} dari ${totalAgents} agen tersertifikasi resmi AAUI`;

    const trainRateEl = document.getElementById('pincab-training-rate');
    if (trainRateEl) trainRateEl.innerText = `${trainingRate}%`;

    const trainDescEl = document.getElementById('pincab-training-desc');
    if (trainDescEl) trainDescEl.innerText = `${activeTrainingAgents} dari ${totalAgents} agen aktif ikut live training`;

    const prodEl = document.getElementById('pincab-total-production');
    if (prodEl) prodEl.innerText = formatCurrencyIDR(totalProd);

    // Render Tabel Daftar Agen Cabang
    window.filterPincabAgentsTable();
};

// 6. Filter & Render Tabel Agen Cabang (Level & Status)
window.filterPincabAgentsTable = function() {
    const agents = window.getPincabBranchAgents();
    const levelFilter = document.getElementById('pincab-filter-level') ? document.getElementById('pincab-filter-level').value : 'all';
    const statusFilter = document.getElementById('pincab-filter-status') ? document.getElementById('pincab-filter-status').value : 'all';
    const tbody = document.getElementById('pincab-agents-table-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filtered = agents.filter(a => {
        let matchLevel = (levelFilter === 'all') || (a.level === levelFilter);
        let matchStatus = (statusFilter === 'all');
        if (statusFilter === 'Aktif') matchStatus = a.status.includes('Aktif');
        else if (statusFilter === 'Kurang Aktif') matchStatus = (a.status === 'Kurang Aktif');
        else if (statusFilter === 'Inaktif') matchStatus = (a.status === 'Inaktif');
        return matchLevel && matchStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">Tidak ada data agen yang sesuai dengan filter.</td></tr>`;
        return;
    }

    filtered.forEach((agent, index) => {
        const rankNum = agent.rank || (index + 1);
        let rankBadgeClass = "rank-other";
        if (rankNum === 1) rankBadgeClass = "rank-1";
        else if (rankNum === 2) rankBadgeClass = "rank-2";
        else if (rankNum === 3) rankBadgeClass = "rank-3";

        let statusBadge = `<span class="badge-status-lulus">🟢 ${agent.status}</span>`;
        if (agent.status === 'Kurang Aktif') {
            statusBadge = `<span class="badge-status-proses">🟡 Kurang Aktif</span>`;
        } else if (agent.status === 'Inaktif') {
            statusBadge = `<span class="badge-status-belum" style="background:#fee2e2; color:#991b1b;">🔴 Inaktif</span>`;
        }

        let levelBadgeColor = '#0f766e';
        let levelBadgeBg = '#f0fdfa';
        let levelBorderColor = '#99f6e4';
        if (agent.level === 'BPP') {
            levelBadgeColor = '#b45309';
            levelBadgeBg = '#fef3c7';
            levelBorderColor = '#fde047';
        } else if (agent.level === 'MC') {
            levelBadgeColor = '#0284c7';
            levelBadgeBg = '#f0f9ff';
            levelBorderColor = '#bae6fd';
        }

        const progressPct = agent.learning ? (agent.learning.progressPct || 0) : 0;
        let progressFillColor = progressPct >= 80 ? '#10b981' : (progressPct >= 40 ? '#0284c7' : '#f59e0b');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align:center;">
                <span class="pincab-rank-badge ${rankBadgeClass}">#${rankNum}</span>
            </td>
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:34px; height:34px; border-radius:50%; background:#e0f2fe; color:#0369a1; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        ${agent.avatar || 'AG'}
                    </div>
                    <div>
                        <strong style="color:var(--primary-navy); font-size:13.5px;">${agent.name}</strong>
                        <div style="font-size:11.5px; color:var(--text-muted);">${agent.code} • ${agent.email}</div>
                    </div>
                </div>
            </td>
            <td style="text-align:center;">
                <span style="font-size:11.5px; font-weight:700; color:${levelBadgeColor}; background:${levelBadgeBg}; padding:4px 10px; border-radius:12px; border:1px solid ${levelBorderColor};">
                    ${agent.level}
                </span>
            </td>
            <td style="text-align:right; font-weight:700; color:var(--primary-navy);">
                ${formatCurrencyIDR(agent.production)}
            </td>
            <td style="text-align:center;">
                ${statusBadge}
            </td>
            <td>
                <div style="font-size:12px; display:flex; justify-content:space-between; margin-bottom:2px;">
                    <span style="color:var(--text-muted); font-size:11px; max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${agent.learning ? agent.learning.currentModule : 'Dasar Asuransi'}</span>
                    <strong style="color:var(--primary-navy);">${progressPct}%</strong>
                </div>
                <div class="pincab-progress-bar-wrap">
                    <div class="pincab-progress-bar-fill" style="width:${progressPct}%; background:${progressFillColor};"></div>
                </div>
            </td>
            <td style="text-align:center;">
                <button onclick="window.showPincabAgentDetail('${agent.code}')" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#334155; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                    🔍 Detail
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// 7. RENDER HALAMAN 2: PEMANTAUAN SERTIFIKASI LSP & UJIAN
window.renderPincabSertifikasi = function() {
    const agents = window.getPincabBranchAgents();
    
    // Hitung Ringkasan Sertifikasi
    const totalAgents = agents.length;
    const l3Pass = agents.filter(a => {
        const c = a.certifications || {};
        return c.level3 && c.level3.status === 'Lulus';
    }).length;
    const l3Pending = totalAgents - l3Pass;
    
    const l4BondingPass = agents.filter(a => {
        const c = a.certifications || {};
        const b = c.level4_bonding || c.level4;
        return b && b.status === 'Lulus';
    }).length;
    const l4BondingProcess = agents.filter(a => {
        const c = a.certifications || {};
        const b = c.level4_bonding || c.level4;
        return b && b.status === 'Dalam Proses';
    }).length;

    const l4PaydiPass = agents.filter(a => {
        const c = a.certifications || {};
        const p = c.level4_paydi || (c.special && c.special.name && c.special.name.includes("PAYDI") ? c.special : null);
        return p && p.status === 'Lulus';
    }).length;
    const l4PaydiProcess = agents.filter(a => {
        const c = a.certifications || {};
        const p = c.level4_paydi || (c.special && c.special.name && c.special.name.includes("PAYDI") ? c.special : null);
        return p && p.status === 'Dalam Proses';
    }).length;
    
    const pendingFollowup = agents.filter(a => {
        const c = a.certifications || {};
        const l3 = c.level3 && c.level3.status === 'Lulus';
        const b = (c.level4_bonding && c.level4_bonding.status === 'Lulus') || (c.level4 && c.level4.status === 'Lulus');
        const p = (c.level4_paydi && c.level4_paydi.status === 'Lulus') || (c.special && c.special.status === 'Lulus');
        return !(l3 && b && p);
    }).length;

    const l3StatEl = document.getElementById('pincab-cert-l3-stat');
    if (l3StatEl) l3StatEl.innerText = `${l3Pass} Lulus / ${l3Pending} Belum`;

    const l4StatEl = document.getElementById('pincab-cert-l4-stat');
    if (l4StatEl) l4StatEl.innerText = `${l4BondingPass} Lulus / ${l4BondingProcess} Proses`;

    const spStatEl = document.getElementById('pincab-cert-special-stat');
    if (spStatEl) spStatEl.innerText = `${l4PaydiPass} Lulus / ${l4PaydiProcess} Proses`;

    const pendStatEl = document.getElementById('pincab-cert-pending-stat');
    if (pendStatEl) pendStatEl.innerText = `${pendingFollowup} Agen`;

    window.filterPincabCertMatrix();
};

// 8. Filter & Render Matriks Sertifikasi (8 Kolom Sesuai Regulasi LSP)
window.filterPincabCertMatrix = function() {
    const agents = window.getPincabBranchAgents();
    const query = (document.getElementById('pincab-cert-search') ? document.getElementById('pincab-cert-search').value : '').toLowerCase().trim();
    const statusFilter = document.getElementById('pincab-cert-status-filter') ? document.getElementById('pincab-cert-status-filter').value : 'all';
    const tbody = document.getElementById('pincab-cert-matrix-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filtered = agents.filter(a => {
        const matchQuery = !query || a.name.toLowerCase().includes(query) || a.code.toLowerCase().includes(query);
        
        let matchStatus = true;
        const cert = a.certifications || {};
        const l3 = cert.level3 || { status: 'Belum Mengambil' };
        const l4b = cert.level4_bonding || cert.level4 || { status: 'Belum Mengambil' };
        const l4p = cert.level4_paydi || (cert.special && cert.special.name && cert.special.name.includes("PAYDI") ? cert.special : { status: 'Belum Mengambil' });

        if (statusFilter === 'pending_only') {
            matchStatus = !(l3.status === 'Lulus' && l4b.status === 'Lulus' && l4p.status === 'Lulus');
        } else if (statusFilter === 'l3_lulus') {
            matchStatus = (l3.status === 'Lulus');
        } else if (statusFilter === 'l4_bonding_lulus') {
            matchStatus = (l4b.status === 'Lulus');
        } else if (statusFilter === 'l4_paydi_lulus') {
            matchStatus = (l4p.status === 'Lulus');
        } else if (statusFilter === 'all_certified') {
            matchStatus = (l3.status === 'Lulus' && l4b.status === 'Lulus' && l4p.status === 'Lulus');
        } else if (statusFilter === 'unregistered') {
            matchStatus = (l3.status === 'Belum Mengambil' || l4b.status === 'Belum Mengambil' || l4p.status === 'Belum Mengambil');
        }

        return matchQuery && matchStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">Tidak ada agen yang cocok dengan kriteria pencarian & filter.</td></tr>`;
        return;
    }

    filtered.forEach(agent => {
        const cert = agent.certifications || {};
        const l3 = cert.level3 || { status: "Belum Mengambil" };
        const l4b = cert.level4_bonding || cert.level4 || { status: "Belum Mengambil" };
        const l4p = cert.level4_paydi || (cert.special && cert.special.name && cert.special.name.includes("PAYDI") ? cert.special : { status: "Belum Mengambil" });

        const renderBadge = (item) => {
            if (item.status === 'Lulus') return `<span class="badge-status-lulus" style="display:inline-block; font-size:11.5px; padding:3px 8px; border-radius:12px; font-weight:700; background:#dcfce7; color:#15803d;">✅ Lulus ${item.score ? '(' + item.score + ')' : ''}</span>`;
            if (item.status === 'Dalam Proses') return `<span class="badge-status-proses" style="display:inline-block; font-size:11.5px; padding:3px 8px; border-radius:12px; font-weight:700; background:#fef3c7; color:#92400e;">⏳ Dalam Proses</span>`;
            return `<span class="badge-status-belum" style="display:inline-block; font-size:11.5px; padding:3px 8px; border-radius:12px; font-weight:600; background:#f1f5f9; color:#64748b;">⚪ Belum</span>`;
        };

        const formatExpiry = (item) => {
            if (item.status === 'Lulus' && item.expiry && item.expiry !== '-') {
                return `<span style="font-size:11.5px; color:#15803d; font-weight:600;">Berlaku s/d<br>${item.expiry}</span>`;
            } else if (item.status === 'Dalam Proses' && item.date) {
                return `<span style="font-size:11px; color:#b45309; font-weight:600;">${item.date}</span>`;
            } else if (item.expiry && item.expiry !== '-') {
                return `<span style="font-size:11.5px; color:#475569;">${item.expiry}</span>`;
            }
            return `<span style="font-size:12px; color:#94a3b8;">—</span>`;
        };

        const isFullyCertified = (l3.status === 'Lulus') && (l4b.status === 'Lulus') && (l4p.status === 'Lulus');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:10px 8px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:34px; height:34px; border-radius:50%; background:#f1f5f9; color:#475569; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        ${agent.avatar || 'AG'}
                    </div>
                    <div>
                        <strong style="color:var(--primary-navy); font-size:13px; cursor:pointer;" onclick="window.showPincabAgentDetail('${agent.code}')">${agent.name}</strong>
                        <div style="font-size:11px; color:var(--text-muted);">${agent.code} • ${agent.level}</div>
                    </div>
                </div>
            </td>
            <td style="text-align:center; padding:10px 6px;">${renderBadge(l3)}</td>
            <td style="text-align:center; padding:10px 6px;">${formatExpiry(l3)}</td>
            <td style="text-align:center; padding:10px 6px;">${renderBadge(l4b)}</td>
            <td style="text-align:center; padding:10px 6px;">${formatExpiry(l4b)}</td>
            <td style="text-align:center; padding:10px 6px;">${renderBadge(l4p)}</td>
            <td style="text-align:center; padding:10px 6px;">${formatExpiry(l4p)}</td>
            <td style="text-align:center; padding:10px 6px;">
                ${isFullyCertified ? 
                    `<span style="font-size:11.5px; color:#16a34a; font-weight:700; background:#dcfce7; padding:4px 8px; border-radius:12px; display:inline-block;">✅ Lengkap</span>` : 
                    `<button onclick="window.sendPincabCertificationReminder('${agent.code}')" style="background:#eff6ff; border:1px solid #93c5fd; color:#1d4ed8; padding:5px 9px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;">
                        📢 Nudge
                    </button>`
                }
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// 9. Broadcast / Kirim Reminder Sertifikasi
window.sendPincabCertificationReminder = function(target) {
    const agents = window.getPincabBranchAgents();
    if (target === 'all_pending') {
        const pendingAgents = agents.filter(a => {
            const c = a.certifications || {};
            const l3 = c.level3 && c.level3.status === 'Lulus';
            const b = (c.level4_bonding && c.level4_bonding.status === 'Lulus') || (c.level4 && c.level4.status === 'Lulus');
            const p = (c.level4_paydi && c.level4_paydi.status === 'Lulus') || (c.special && c.special.status === 'Lulus');
            return !(l3 && b && p);
        });
        if (pendingAgents.length === 0) {
            alert("Seluruh agen di cabang ini sudah lulus sertifikasi lengkap Level 3 (Asuransi Umum), Level 4 (Bonding), dan Level 4 (PAYDI)!");
            return;
        }
        const names = pendingAgents.map(a => a.name).join(", ");
        alert(`📢 NOTIFIKASI BROADCAST DIKIRIM!\n\nPengingat jadwal ujian dan kelengkapan sertifikasi LSP resmi (Level 3 & Level 4) berhasil dikirim via WhatsApp & Notifikasi Portal ke ${pendingAgents.length} agen:\n\n${names}\n\nPesan: "Bapak/Ibu Pimpinan Cabang mengingatkan Anda untuk segera menyelesaikan uji kompetensi lisensi keagenan Level 3 (Asuransi Umum) dan Level 4 (Bonding / PAYDI) periode ini."`);
    } else {
        const agent = agents.find(a => a.code === target);
        if (agent) {
            alert(`📢 PENGINGAT TERKIRIM KE ${agent.name.toUpperCase()} (${agent.code})\n\nNotifikasi pengingat persiapan ujian sertifikasi LSP resmi (Level 3 / Level 4) telah dikirimkan ke email ${agent.email} dan nomor WhatsApp agen.`);
        }
    }
};

// 10. RENDER HALAMAN 3: AKTIVITAS BELAJAR & TRAINING AGEN
window.renderPincabAktivitas = function() {
    const agents = window.getPincabBranchAgents();
    const trainings = window.getPincabBranchTrainings();

    // 1. Render Tabel Live Training
    const liveTbody = document.getElementById('pincab-live-trainings-tbody');
    if (liveTbody) {
        liveTbody.innerHTML = '';
        trainings.forEach(trn => {
            const branchAgentCodes = agents.map(a => a.code);
            const branchRsvpCount = (trn.rsvpAgents || []).filter(c => branchAgentCodes.includes(c)).length;
            const branchAttendedCount = (trn.attendedAgents || []).filter(c => branchAgentCodes.includes(c)).length;
            const pct = branchRsvpCount > 0 ? Math.round((branchAttendedCount / branchRsvpCount) * 100) : (trn.status === 'Mendatang' ? 0 : 100);

            let pctBadgeColor = pct >= 80 ? '#16a34a' : (pct >= 50 ? '#d97706' : '#dc2626');
            let pctBadgeBg = pct >= 80 ? '#dcfce7' : (pct >= 50 ? '#fef3c7' : '#fee2e2');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="font-weight:700; color:var(--primary-navy); font-size:13.5px;">${trn.title}</div>
                    <div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">ID: ${trn.id} • Kategori: <strong>${trn.category}</strong> • ${trn.mode}</div>
                </td>
                <td>
                    <div style="font-size:13px; font-weight:600; color:#334155;">${trn.trainer}</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">📅 ${trn.date} (${trn.time})</div>
                </td>
                <td style="text-align:center; font-weight:700; color:#0284c7;">
                    ${branchRsvpCount} / ${agents.length} Agen
                </td>
                <td style="text-align:center; font-weight:700; color:#16a34a;">
                    ${trn.status === 'Mendatang' ? `<span style="color:#64748b; font-weight:500;">Belum Mulai</span>` : `${branchAttendedCount} Agen`}
                </td>
                <td style="text-align:center;">
                    ${trn.status === 'Mendatang' ? 
                        `<span style="font-size:11.5px; background:#f1f5f9; color:#64748b; padding:4px 8px; border-radius:12px; font-weight:600;">Jadwal Mendatang</span>` :
                        `<span style="font-size:11.5px; background:${pctBadgeBg}; color:${pctBadgeColor}; padding:4px 10px; border-radius:12px; font-weight:700;">${pct}% Hadir</span>`
                    }
                </td>
                <td style="text-align:center;">
                    <button onclick="window.showPincabTrainingDrilldown('${trn.id}')" style="background:#0f172a; color:white; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
                        📋 Drill-Down
                    </button>
                </td>
            `;
            liveTbody.appendChild(tr);
        });
    }

    // 2. Render Tabel Belajar Mandiri (Self-Paced LMS)
    const selfTbody = document.getElementById('pincab-self-learning-tbody');
    if (selfTbody) {
        selfTbody.innerHTML = '';
        agents.forEach(agent => {
            const lrn = agent.learning || { currentModule: "Dasar Asuransi", progressPct: 0, quizScore: 0, lastActive: "-" };
            const pct = lrn.progressPct || 0;
            let barColor = pct >= 80 ? '#10b981' : (pct >= 40 ? '#0284c7' : '#f59e0b');

            let statusPill = `<span class="badge-status-lulus">🟢 On Track</span>`;
            if (lrn.status === 'Lambat') statusPill = `<span class="badge-status-proses">🟡 Lambat</span>`;
            else if (lrn.status === 'Stagnan') statusPill = `<span class="badge-status-belum" style="background:#fee2e2; color:#991b1b;">🔴 Stagnan</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div style="font-weight:700; color:var(--primary-navy); font-size:13.5px;">${agent.name}</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">${agent.code} • ${agent.level}</div>
                </td>
                <td>
                    <div style="font-size:13px; color:#334155; font-weight:600;">${lrn.currentModule}</div>
                    <div style="font-size:11.5px; color:var(--text-muted);">${lrn.completedChapters || 0} dari ${lrn.totalChapters || 6} Bab Modul Selesai</div>
                </td>
                <td>
                    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:2px;">
                        <span style="color:var(--text-muted); font-size:11px;">Penyelesaian</span>
                        <strong style="color:var(--primary-navy);">${pct}%</strong>
                    </div>
                    <div class="pincab-progress-bar-wrap">
                        <div class="pincab-progress-bar-fill" style="width:${pct}%; background:${barColor};"></div>
                    </div>
                </td>
                <td style="text-align:center; font-weight:700; color:var(--primary-navy);">
                    ${lrn.quizScore ? lrn.quizScore + ' / 100' : '<span style="color:#94a3b8;">-</span>'}
                </td>
                <td style="text-align:center; font-size:12.5px; color:#475569;">
                    ${lrn.lastActive || '-'}
                </td>
                <td style="text-align:center;">
                    ${statusPill}
                </td>
                <td style="text-align:center;">
                    <button onclick="window.sendPincabLearningNudge('${agent.code}')" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#1e293b; padding:5px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer;">
                        ⚡ Nudge
                    </button>
                </td>
            `;
            selfTbody.appendChild(tr);
        });
    }
};

// 11. Switch Tab Aktivitas (Live Training vs Self-Paced)
window.switchPincabAktivitasTab = function(tabId) {
    const btnLive = document.getElementById('btn-pincab-tab-live');
    const btnSelf = document.getElementById('btn-pincab-tab-self');
    const secLive = document.getElementById('pincab-sec-live-training');
    const secSelf = document.getElementById('pincab-sec-self-paced');

    if (tabId === 'live') {
        if (btnLive) btnLive.classList.add('active');
        if (btnSelf) btnSelf.classList.remove('active');
        if (secLive) secLive.style.display = 'block';
        if (secSelf) secSelf.style.display = 'none';
    } else {
        if (btnLive) btnLive.classList.remove('active');
        if (btnSelf) btnSelf.classList.add('active');
        if (secLive) secLive.style.display = 'none';
        if (secSelf) secSelf.style.display = 'block';
    }
};

// 12. Modal Drill-Down Kehadiran Live Training
window.showPincabTrainingDrilldown = function(trainingId) {
    const trainings = window.getPincabBranchTrainings();
    const agents = window.getPincabBranchAgents();
    const trn = trainings.find(t => t.id === trainingId);
    if (!trn) return;

    const modal = document.getElementById('modal-pincab-training-drilldown');
    if (!modal) return;

    document.getElementById('drilldown-modal-title').innerText = `Drill-Down: ${trn.title}`;
    document.getElementById('drilldown-modal-subtitle').innerText = `Trainer: ${trn.trainer} • Jadwal: ${trn.date} (${trn.time})`;

    const metaContainer = document.getElementById('drilldown-modal-meta');
    if (metaContainer) {
        metaContainer.innerHTML = `
            <div>🏢 Wilayah: <strong>${window.getPincabActiveBranch()}</strong></div>
            <div>🔑 Token Kehadiran: <code style="background:#e2e8f0; padding:2px 6px; border-radius:4px; font-weight:700;">${trn.token || 'AUTO'}</code></div>
            <div>📡 Status: <strong>${trn.status}</strong></div>
        `;
    }

    const attendedCodes = trn.attendedAgents || [];
    const rsvpCodes = trn.rsvpAgents || [];

    const hadirAgents = agents.filter(a => attendedCodes.includes(a.code));
    const absenAgents = agents.filter(a => !attendedCodes.includes(a.code));

    document.getElementById('drilldown-hadir-count').innerText = hadirAgents.length;
    document.getElementById('drilldown-absen-count').innerText = absenAgents.length;

    const hadirList = document.getElementById('drilldown-hadir-list');
    hadirList.innerHTML = '';
    if (hadirAgents.length === 0) {
        hadirList.innerHTML = `<div style="font-size:12.5px; color:#166534; font-style:italic; padding:8px;">Belum ada agen yang terkonfirmasi hadir.</div>`;
    } else {
        hadirAgents.forEach(a => {
            const item = document.createElement('div');
            item.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:white; padding:8px 12px; border-radius:6px; border:1px solid #dcfce7; font-size:13px;";
            item.innerHTML = `
                <div>
                    <strong style="color:#166534;">${a.name}</strong>
                    <div style="font-size:11px; color:#64748b;">${a.code} • ${a.level}</div>
                </div>
                <span style="font-size:11px; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px; font-weight:700;">Hadir Terverifikasi</span>
            `;
            hadirList.appendChild(item);
        });
    }

    const absenList = document.getElementById('drilldown-absen-list');
    absenList.innerHTML = '';
    if (absenAgents.length === 0) {
        absenList.innerHTML = `<div style="font-size:12.5px; color:#15803d; font-weight:700; padding:8px;">Luar biasa! Seluruh agen cabang hadir 100%.</div>`;
    } else {
        absenAgents.forEach(a => {
            const isRsvp = rsvpCodes.includes(a.code);
            const item = document.createElement('div');
            item.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:white; padding:8px 12px; border-radius:6px; border:1px solid #fee2e2; font-size:13px;";
            item.innerHTML = `
                <div>
                    <strong style="color:#991b1b;">${a.name}</strong>
                    <div style="font-size:11px; color:#64748b;">${a.code} • ${isRsvp ? '⚠️ RSVP tapi Tidak Hadir' : '⚪ Tidak RSVP'}</div>
                </div>
                <button onclick="window.sendPincabTrainingFollowup('${a.code}', '${trn.title}')" style="background:#fee2e2; border:1px solid #fca5a5; color:#991b1b; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;">
                    💬 Tegur
                </button>
            `;
            absenList.appendChild(item);
        });
    }

    modal.classList.add('active');
};

window.closePincabTrainingDrilldown = function() {
    const modal = document.getElementById('modal-pincab-training-drilldown');
    if (modal) modal.classList.remove('active');
};

// 13. Modal Detail Profil Agen Cabang
window.showPincabAgentDetail = function(agentCode) {
    const agents = window.getPincabBranchAgents();
    const agent = agents.find(a => a.code === agentCode);
    if (!agent) return;

    const modal = document.getElementById('modal-pincab-agent-detail');
    const container = document.getElementById('pincab-agent-detail-body');
    if (!modal || !container) return;

    const cert = agent.certifications || {};
    const lrn = agent.learning || {};
    const levelColor = agent.level === 'BPP' ? '#b45309' : (agent.level === 'MC' ? '#0284c7' : '#0f766e');

    container.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px; border-bottom:1px solid #e2e8f0; padding-bottom:16px; margin-bottom:16px;">
            <div style="width:54px; height:54px; border-radius:50%; background:linear-gradient(135deg, #0ea5e9, #0284c7); color:white; font-size:20px; font-weight:800; display:flex; align-items:center; justify-content:center;">
                ${agent.avatar || 'AG'}
            </div>
            <div>
                <h3 style="margin:0; color:#0f172a; font-size:18px;">${agent.name}</h3>
                <div style="font-size:12.5px; color:#64748b; margin-top:3px;">
                    Kode: <strong>${agent.code}</strong> • Kepangkatan: <strong style="color:${levelColor};">${agent.level}</strong> • Wilayah: <strong>${agent.branch}</strong>
                </div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
            <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
                <span style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700;">Total Produksi Premi</span>
                <div style="font-size:17px; font-weight:800; color:#0f172a; margin-top:2px;">${formatCurrencyIDR(agent.production)}</div>
                <div style="font-size:11px; color:#16a34a; font-weight:600;">Peringkat #${agent.rank || 1} Cabang</div>
            </div>
            <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
                <span style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700;">Status Keaktifan</span>
                <div style="font-size:15px; font-weight:700; color:#0f172a; margin-top:4px;">🟢 ${agent.status}</div>
                <div style="font-size:11px; color:#64748b;">Aktif terakhir: ${lrn.lastActive || '-'}</div>
            </div>
        </div>

        <h4 style="margin:14px 0 8px; color:#0f172a; font-size:14px;">🎓 Status Sertifikasi Resmi LSP</h4>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; font-size:13px; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>Level 3 (Asuransi Umum):</span>
                <span>${cert.level3 && cert.level3.status === 'Lulus' ? '<strong style="color:#15803d;">✅ Lulus</strong> <span style="font-size:11.5px; color:#64748b;">(s/d ' + cert.level3.expiry + ')</span>' : (cert.level3 && cert.level3.status === 'Dalam Proses' ? '<strong style="color:#b45309;">⏳ ' + (cert.level3.date || 'Dalam Proses') + '</strong>' : '<span style="color:#94a3b8;">⚪ Belum Mengambil</span>')}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>Level 4 (Bonding):</span>
                <span>${(cert.level4_bonding && cert.level4_bonding.status === 'Lulus') || (cert.level4 && cert.level4.status === 'Lulus') ? '<strong style="color:#15803d;">✅ Lulus</strong> <span style="font-size:11.5px; color:#64748b;">(s/d ' + ((cert.level4_bonding && cert.level4_bonding.expiry) || (cert.level4 && cert.level4.expiry) || '2027') + ')</span>' : (cert.level4_bonding && cert.level4_bonding.status === 'Dalam Proses' ? '<strong style="color:#b45309;">⏳ ' + (cert.level4_bonding.date || 'Dalam Proses') + '</strong>' : '<span style="color:#94a3b8;">⚪ Belum Mengambil</span>')}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>Level 4 (PAYDI):</span>
                <span>${(cert.level4_paydi && cert.level4_paydi.status === 'Lulus') || (cert.special && cert.special.name && cert.special.name.includes("PAYDI") && cert.special.status === 'Lulus') ? '<strong style="color:#15803d;">✅ Lulus</strong> <span style="font-size:11.5px; color:#64748b;">(s/d ' + ((cert.level4_paydi && cert.level4_paydi.expiry) || '2027') + ')</span>' : (cert.level4_paydi && cert.level4_paydi.status === 'Dalam Proses' ? '<strong style="color:#b45309;">⏳ ' + (cert.level4_paydi.date || 'Dalam Proses') + '</strong>' : '<span style="color:#94a3b8;">⚪ Belum Mengambil</span>')}</span>
            </div>
        </div>

        <h4 style="margin:14px 0 8px; color:#0f172a; font-size:14px;">📖 Progres Belajar LMS</h4>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; font-size:13px;">
            <div>Modul Aktif: <strong>${lrn.currentModule || 'Dasar Asuransi'}</strong></div>
            <div style="margin-top:6px; display:flex; justify-content:space-between; font-size:12px;">
                <span>Penyelesaian: <strong>${lrn.progressPct || 0}%</strong></span>
                <span>Rata-Rata Kuis: <strong>${lrn.quizScore || 0} / 100</strong></span>
            </div>
        </div>
    `;

    modal.classList.add('active');
};

window.closePincabAgentDetail = function() {
    const modal = document.getElementById('modal-pincab-agent-detail');
    if (modal) modal.classList.remove('active');
};

// 14. Kirim Teguran Absensi Live Training
window.sendPincabTrainingFollowup = function(agentCode, trainingTitle) {
    const agents = window.getPincabBranchAgents();
    const agent = agents.find(a => a.code === agentCode);
    if (agent) {
        alert(`💬 TEGURAN KEHADIRAN TERKIRIM!\n\nPesan teguran dari Pimpinan Cabang telah dikirimkan kepada:\nNama: ${agent.name} (${agent.code})\nSesi: ${trainingTitle}\n\nPesan: "Kehadiran pada sesi live training wajib bagi seluruh agen di Cabang Fatmawati guna menjaga kualitas layanan nasabah."`);
    }
};

// 15. Kirim Nudge Belajar Mandiri
window.sendPincabLearningNudge = function(agentCode) {
    const agents = window.getPincabBranchAgents();
    const agent = agents.find(a => a.code === agentCode);
    if (agent) {
        alert(`⚡ NUDGE BELAJAR TERKIRIM!\n\nPengingat telah dikirimkan ke portal agen ${agent.name} (${agent.code}) untuk melanjutkan penyelesaian bab materi LMS.`);
    }
};

// 16. Tombol Refresh Data
window.refreshPincabData = function() {
    window.renderPincabDashboard();
    window.renderPincabSertifikasi();
    window.renderPincabAktivitas();
    alert("✅ Data monitoring cabang berhasil disinkronkan dengan pembaruan terkini!");
};

// ====================================================================================
// [MODUL BARU] SMART NOTIFICATION & ADAPTIVE LEARNING LOOP SYSTEM (PROACTIVE ASSISTANT)
// ====================================================================================

const SMART_NOTIFICATIONS_DEFAULT = [
    {
        id: "notif-cross-maju",
        type: "cross_sell", // Pemicu B
        title: "🎯 Cross-Selling: CV Maju Bersama (Kontraktor Sipil)",
        category: "Portofolio Nasabah Eksisting",
        time: "1 jam lalu",
        isRead: false,
        isBookmarked: false,
        description: "Nasabah Anda, CV Maju Bersama, saat ini baru memiliki Polis Kendaraan Operasional. Karena sedang memenangkan tender proyek konstruksi baru, mereka berpotensi besar untuk di-cross-selling paket 4 produk proteksi proyek & tenaga kerja.",
        existingPolicy: "Asuransi Kendaraan Truk & Pick-Up Operasional (4 Unit)",
        commissionLabel: "💰 +Potensi Komisi Rp 3,6 Juta / 220 BPP",
        commissionVal: 3600000,
        bppVal: 220,
        targetModuleId: "engineering-insurance",
        targetModuleName: "Asuransi Rekayasa (Engineering)",
        relatedTrainingId: "TRN-03", // Status di database adalah 'Selesai'
        sampleClient: {
            name: "CV Maju Bersama",
            pic: "Bpk. Ir. Rahmat Hidayat (Direktur Utama)",
            phone: "081234567890",
            type: "Kontraktor Sipil & Konstruksi",
            sumInsured: 1800000000,
            recommendedProduct: "ASM Home Shield & Business"
        },
        productsList: [
            { name: "Contractors' All Risks (CAR)", moduleId: "engineering-insurance", icon: "🏗️", desc: "Proteksi menyeluruh risiko fisik bangunan gedung & jembatan saat konstruksi" },
            { name: "Surety Bond Jaminan Pelaksanaan", moduleId: "dasar-asuransi", icon: "📜", desc: "Jaminan resmi pemenuhan kewajiban kontrak tender proyek tanpa agunan rumit" },
            { name: "Personal Accident Tenaga Kerja", moduleId: "personal-accident", icon: "👷", desc: "Santunan kecelakaan kerja 24 jam & santunan cacat untuk pekerja proyek" },
            { name: "Machinery Breakdown & Alat Berat", moduleId: "engineering-insurance", icon: "🚜", desc: "Perlindungan kerusakan mesin excavator, crane & genset proyek" }
        ],
        whatsappTemplates: {
            formal: "Yth. Bapak Ir. Rahmat Hidayat (CV Maju Bersama). Melanjutkan kemitraan proteksi armada kendaraan, kami telah menyusun paket proteksi komprehensif tender konstruksi Bapak: Contractors' All Risks (CAR), Surety Bond Pelaksanaan, dan PA Tenaga Kerja Lapangan dengan proses penerbitan kilat berstandar OJK. Mohon izin menyampaikan proposal penawaran resmi untuk review Bapak.",
            consultative: "Selamat siang Pak Rahmat. Semoga pengerjaan proyek sipil CV Maju Bersama berjalan lancar. Untuk mengamankan persyaratan tender dan memitigasi risiko roboh akibat cuaca ekstrem, kami sediakan simulasi paket CAR + Surety Bond + PA Pekerja langsung berstandar OJK. Boleh kami kirimkan simulasinya via WhatsApp Pak?",
            casual: "Halo Pak Rahmat! Sukses terus buat proyek barunya ya Pak. Izin info, untuk jaminan tender dan asuransi konstruksi CAR, proses di ASM sekarang sangat cepat dan premi bersahabat. Mau saya buatkan draf penawaran bundling-nya Pak?"
        }
    },
    {
        id: "notif-cross-sejahtera",
        type: "cross_sell", // Pemicu B
        title: "🎯 Cross-Selling: PT Sejahtera Abadi (Logistik & Gudang)",
        category: "Portofolio Nasabah Eksisting",
        time: "2 jam lalu",
        isRead: false,
        isBookmarked: true,
        description: "Nasabah Anda, PT Sejahtera Abadi, saat ini baru memiliki Polis Asuransi Kendaraan (Simas Mobil - 12 Unit). Berdasarkan profil usahanya (Logistik & Pergudangan), mereka berpotensi besar untuk di-cross-selling paket 4 produk proteksi kargo, gudang, dan karyawan.",
        existingPolicy: "Asuransi Kendaraan Bermotor (Simas Mobil - 12 Unit Armada)",
        commissionLabel: "💰 +Potensi Komisi Rp 4,2 Juta / 250 BPP",
        commissionVal: 4200000,
        bppVal: 250,
        targetModuleId: "marine-cargo",
        targetModuleName: "Asuransi Pengangkutan Barang (Marine Cargo)",
        alternativeModuleId: "asuransi-properti",
        relatedTrainingId: "TRN-01", // Status 'Selesai'
        sampleClient: {
            name: "PT Sejahtera Abadi",
            pic: "Bpk. Bambang Gunawan (Owner)",
            phone: "081122334455",
            type: "Logistik, Ekspedisi & Pergudangan",
            sumInsured: 2500000000,
            recommendedProduct: "ASM Auto Protection & Marine Cargo"
        },
        productsList: [
            { name: "Marine Cargo (ICC A - All Risks)", moduleId: "marine-cargo", icon: "🚢", desc: "Jaminan muatan barang kiriman klien selama di perjalanan laut & darat" },
            { name: "Property All Risks (Gudang Logistik)", moduleId: "asuransi-properti", icon: "🏭", desc: "Proteksi bangunan gudang & inventori dari kebakaran, banjir & badai" },
            { name: "Personal Accident Driver & Kurir", moduleId: "personal-accident", icon: "🛡️", desc: "Santunan kecelakaan kerja 24 jam bagi sopir armada ekspedisi" },
            { name: "Asuransi Kesehatan Karyawan", moduleId: "kesehatan-insurance", icon: "🩺", desc: "Fasilitas rawat inap cashless bagi tim operasional gudang" }
        ],
        whatsappTemplates: {
            formal: "Yth. Bapak Bambang Gunawan (PT Sejahtera Abadi). Terima kasih atas loyalitas Bapak dalam mempercayakan perlindungan 12 armada kendaraan bersama ASM. Seiring tingginya volume logistik dan pergerakan muatan kargo barang, kami telah menyusun paket proteksi terintegrasi Marine Cargo (ICC A) & Property All Risks Gudang dengan efisiensi premi optimal. Mohon izin mengirimkan lembar penawaran resmi untuk review Bapak.",
            consultative: "Selamat siang Pak Bambang. Senang melihat armada PT Sejahtera Abadi beroperasi semakin aktif! Sebagai tindak lanjut pendampingan polis armada Bapak, kami menganalisis bahwa risiko terbesar logistik adalah kerusakan muatan kargo saat transit di jalan. Kami dapat membantu simulasi proteksi Marine Cargo & Gudang agar bisnis Bapak terlindungi 360 derajat. Boleh saya kirimkan simulasinya via WA ini Pak?",
            casual: "Halo Pak Bambang! Semoga sehat selalu dan pengiriman armada PT Sejahtera Abadi lancar jaya ya. Izin info Pak, untuk muatan barang klien dan gudang logistik, ASM lagi ada paket bundling kargo hemat khusus nasabah prioritas seperti Bapak. Mau coba saya buatkan hitungan premi resminya Pak?"
        }
    },
    {
        id: "notif-ind-manufaktur",
        type: "industry", // Pemicu A
        title: "🏭 Peluang Sektor Manufaktur & Pabrik Tekstil",
        category: "Tren Industri & Okupasi",
        time: "3 jam lalu",
        isRead: false,
        isBookmarked: false,
        description: "Lonjakan investasi manufaktur dan pergudangan tekstil membuka prospek asuransi bernilai premi miliaran. Siapkan proteksi komprehensif aset pabrik, mesin operasional, dan tanggung jawab hukum produk.",
        commissionLabel: "💰 +Potensi Komisi Rp 2,5 Juta / 150 BPP",
        commissionVal: 2500000,
        bppVal: 150,
        targetModuleId: "asuransi-properti",
        targetModuleName: "Asuransi Properti & Kebakaran (PSAKBI)",
        relatedTrainingId: "TRN-01",
        sampleClient: {
            name: "PT Multi Kreasi Tekstil",
            pic: "Bpk. Irwan Santoso (Direktur Operasional)",
            phone: "081388992211",
            type: "Pabrik Tekstil & Manufaktur",
            sumInsured: 4500000000,
            recommendedProduct: "ASM Home Shield & Business"
        },
        productsList: [
            { name: "Property All Risks (Pabrik & Gudang)", moduleId: "asuransi-properti", icon: "🏭", desc: "Proteksi kebakaran pabrik, bahan baku kain & mesin tenun dari api/korsleting" },
            { name: "Machinery Breakdown (Kerusakan Mesin)", moduleId: "engineering-insurance", icon: "⚙️", desc: "Ganti rugi kerusakan internal mesin tenun, turbin & kompresor" },
            { name: "Public & Product Liability", moduleId: "liability-insurance", icon: "⚖️", desc: "Tanggung jawab hukum ganti rugi pihak ketiga & produk tekstil cacat" },
            { name: "Personal Accident Operator Shift", moduleId: "personal-accident", icon: "👷", desc: "Santunan kecelakaan kerja bagi operator mesin shift malam" }
        ],
        whatsappTemplates: {
            formal: "Selamat pagi Bapak Irwan Santoso (PT Multi Kreasi Tekstil). Mempertimbangkan ekspansi aset fasilitas pabrik & mesin produksi Bapak, ASM Academy merekomendasikan simulasi proteksi Property All Risks & Machinery Breakdown guna memitigasi risiko kerugian fisik maupun penghentian operasional. Apakah Bapak berkenan kami jadwalkan konsultasi risiko singkat pekan ini?",
            consultative: "Selamat siang Pak Irwan. Izin sharing insight terkini, industri manufaktur memiliki eksposur tinggi terhadap risiko kelistrikan dan korsleting mesin berat. Sebagai agen ASM bersertifikat OJK, saya siap membantu audit risiko gratis & menghitungkan simulasi perlindungan aset pabrik PT Multi Kreasi Tekstil. Apakah berkenan saya kirimkan proposal ringkasnya?",
            casual: "Halo Pak Irwan! Semoga operasional pabrik makin lancar ya. Izin info Pak, saat ini ASM lagi ada paket proteksi khusus aset pabrik & mesin produksi dengan rate preferensial OJK. Kalau pas ada waktu senggang, kabari ya Pak, saya buatkan simulasinya."
        }
    },
    {
        id: "notif-ind-fnb",
        type: "industry", // Pemicu A
        title: "☕ Peluang Sektor F&B, Restoran & Waralaba",
        category: "Tren Industri & Okupasi",
        time: "5 jam lalu",
        isRead: false,
        isBookmarked: false,
        description: "Ekspansi jaringan kedai kopi dan restoran membutuhkan perlindungan ruko komersial dari bahaya kebakaran dapur/gas, tanggung jawab hukum konsumen (Product & Public Liability), dan santunan kerja barista.",
        commissionLabel: "💰 +Potensi Komisi Rp 1,85 Juta / 110 BPP",
        commissionVal: 1850000,
        bppVal: 110,
        targetModuleId: "liability-insurance",
        targetModuleName: "Asuransi Tanggung Jawab Hukum (Liability)",
        relatedTrainingId: "TRN-01",
        sampleClient: {
            name: "Kopi Nusantara Prima (5 Gerai)",
            pic: "Ibu Jessica Tan (Founder)",
            phone: "081299887766",
            type: "F&B Chain & Kafe",
            sumInsured: 1200000000,
            recommendedProduct: "ASM Home Shield & Business"
        },
        productsList: [
            { name: "Asuransi Kebakaran Ruko Komersial", moduleId: "asuransi-properti", icon: "🏪", desc: "Proteksi bangunan ruko gerai kafe dari risiko kebakaran api kompor/gas" },
            { name: "Public & Product Liability Kafe", moduleId: "liability-insurance", icon: "👥", desc: "Tanggung jawab hukum atas keracunan makanan atau cedera pengunjung kafe" },
            { name: "Personal Accident Barista & Tim Staf", moduleId: "personal-accident", icon: "☕", desc: "Santunan luka bakar & kecelakaan kerja barista saat jam operasional" },
            { name: "Money Insurance (Brankas & Kasir)", moduleId: "dasar-asuransi", icon: "💰", desc: "Ganti rugi kehilangan uang tunai di kasir dan saat transit bank" }
        ],
        whatsappTemplates: {
            formal: "Selamat pagi Ibu Jessica Tan (Kopi Nusantara Prima). Mengingat pesatnya ekspansi 5 gerai kafe Ibu, kami dari ASM Academy menawarkan solusi proteksi terpadu Public & Product Liability serta Kebakaran Komersial guna melindungi reputasi bisnis dan aset ruko. Boleh kami kirimkan draft proposal penawarannya?",
            consultative: "Halo Bu Jessica. Bisnis F&B modern memiliki risiko unik seperti klaim konsumen atau insiden kebakaran area dapur. Kami siap membantu simulasi perlindungan komprehensif dengan premi terjangkau dan proses klaim kilat. Apakah Ibu berkenan saya kirimkan detail perlindungannya?",
            casual: "Pagi Bu Jessica! Sukses selalu buat Kopi Nusantara Prima ya. Izin info Bu, ada paket proteksi khusus ruko F&B + asuransi tanggung jawab pengunjung dari ASM. Kalau berkenan, saya buatkan simulasi preminya ya Bu."
        }
    },
    {
        id: "notif-live-trn04",
        type: "live_training", // Pemicu C
        title: "🎓 Live Training Zoom: Bedah Regulasi OJK & Etika Keagenan",
        category: "Jadwal Live Training",
        time: "Mendatang: 12 Okt 2026, 14:00 WIB",
        isRead: false,
        isBookmarked: false,
        description: "Sesi pembekalan wajib mengenai kepatuhan regulasi OJK terbaru (SEOJK Perlindungan Konsumen & POJK Produk). Dapatkan +50 XP Belajar dan sertifikat kehadiran!",
        trainingId: "TRN-04",
        trainer: "Siti Rahma, S.H.",
        date: "12 Okt 2026",
        timeInfo: "14:00 - 16:00 WIB",
        bonusReward: "+50 XP • 15 Koin",
        actionText: "📅 RSVP / Daftar Sekarang"
    }
];

// Selalu update default data notifikasi di LocalStorage agar data terbaru termuat
(function syncNotificationsDatabase() {
    try {
        localStorage.setItem("pa_smart_notifications", JSON.stringify(SMART_NOTIFICATIONS_DEFAULT));
    } catch(e) {}
})();

// Inisialisasi Notifikasi di LocalStorage
window.initSmartNotifications = function() {
    try {
        let stored = localStorage.getItem("pa_smart_notifications");
        if (!stored) {
            localStorage.setItem("pa_smart_notifications", JSON.stringify(SMART_NOTIFICATIONS_DEFAULT));
        }
    } catch(e) {
        console.error("Gagal inisialisasi smart notifications:", e);
    }
};

window.getSmartNotifications = function() {
    try {
        const data = localStorage.getItem("pa_smart_notifications");
        return data ? JSON.parse(data) : SMART_NOTIFICATIONS_DEFAULT;
    } catch(e) {
        return SMART_NOTIFICATIONS_DEFAULT;
    }
};

window.saveSmartNotifications = function(notifs) {
    try {
        localStorage.setItem("pa_smart_notifications", JSON.stringify(notifs));
    } catch(e) {}
};

// Cek Kompetensi Agen (Materi Belajar & Kuis)
window.checkAgentCompetency = function(moduleId) {
    if (!moduleId) return { isCompetent: true, score: 100, module: null };
    
    const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user') || localStorage.getItem('pa_active_user') || '{}');
    const agentId = activeUser.code || activeUser.id || "AGN-001";
    
    let isCompetent = false;
    let score = 0;
    
    // 1. Cek di pa_agent_progress
    try {
        const progData = JSON.parse(localStorage.getItem("pa_agent_progress") || "{}");
        const userProg = progData["progress_agen@insuremind.id"] || progData[activeUser.email] || {};
        const completedChapters = userProg.completedChapters || [];
        const quizScores = userProg.quizScores || {};
        
        if (completedChapters.includes(moduleId)) {
            isCompetent = true;
            score = quizScores[moduleId] || 85;
        } else if (quizScores[moduleId] && quizScores[moduleId] >= 70) {
            isCompetent = true;
            score = quizScores[moduleId];
        }
    } catch(e) {}
    
    // 2. Cek di pa_agent_module_progress
    try {
        const modProg = JSON.parse(localStorage.getItem("pa_agent_module_progress") || "{}");
        const key = `${agentId}_${moduleId}`;
        if (modProg[key]) {
            if (modProg[key].statusMateri === 'SELESAI' || modProg[key].statusKuis === 'Lulus' || modProg[key].currentPhase === 'completed') {
                isCompetent = true;
                score = modProg[key].score || 90;
            }
        }
    } catch(e) {}
    
    // Cari data modul
    const allMaterials = JSON.parse(localStorage.getItem("pa_materials") || "[]");
    const foundModule = allMaterials.find(m => m.id === moduleId) || (window.modules ? window.modules.find(m => m.id === moduleId) : null);
    
    return {
        isCompetent: isCompetent,
        score: score,
        module: foundModule || { id: moduleId, title: moduleId, category: "Asuransi Umum" }
    };
};

// Render Badge Notifikasi di Top Bar
window.updateSmartNotificationBadge = function() {
    const notifs = window.getSmartNotifications();
    const unreadCount = notifs.filter(n => !n.isRead).length;
    
    const badgeEl = document.getElementById("smart-notif-badge-count");
    if (badgeEl) {
        badgeEl.innerText = unreadCount;
        badgeEl.style.display = unreadCount > 0 ? "inline-block" : "none";
    }
    
    const modalBadgePill = document.getElementById("modal-notif-badge-pill");
    if (modalBadgePill) {
        modalBadgePill.innerText = `${unreadCount} Baru`;
    }
    
    // Hitung counts per kategori
    const countAll = document.getElementById("count-notif-all");
    const countBiz = document.getElementById("count-notif-business");
    const countTrn = document.getElementById("count-notif-training");
    const countSaved = document.getElementById("count-notif-saved");
    
    if (countAll) countAll.innerText = notifs.length;
    if (countBiz) countBiz.innerText = notifs.filter(n => n.type === 'industry' || n.type === 'cross_sell').length;
    if (countTrn) countTrn.innerText = notifs.filter(n => n.type === 'live_training').length;
    if (countSaved) countSaved.innerText = notifs.filter(n => n.isBookmarked).length;
};

// Toggle Modal Notifikasi
window.toggleSmartNotificationModal = function(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById("modal-smart-notifications");
    if (!modal) return;
    
    const isActive = modal.style.display === "flex" || modal.classList.contains("active");
    if (isActive) {
        window.closeSmartNotificationModal();
    } else {
        modal.style.display = "flex";
        modal.classList.add("active");
        window.renderSmartNotifications("all");
    }
};

window.closeSmartNotificationModal = function() {
    const modal = document.getElementById("modal-smart-notifications");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("active");
    }
};

window.handleNotificationModalOverlayClick = function(e) {
    if (e.target && e.target.id === "modal-smart-notifications") {
        window.closeSmartNotificationModal();
    }
};

// Filter Tab Notifikasi
window.filterSmartNotifications = function(category) {
    window.currentNotifFilter = category;
    
    // Update tab UI
    const tabs = document.querySelectorAll(".notif-filter-tab");
    tabs.forEach(t => t.classList.remove("active"));
    
    const activeTab = document.getElementById(`tab-notif-${category}`);
    if (activeTab) activeTab.classList.add("active");
    
    window.renderSmartNotifications(category);
};

// Render Daftar Notifikasi
window.renderSmartNotifications = function(filter = "all") {
    const container = document.getElementById("smart-notif-cards-container");
    if (!container) return;
    
    const notifs = window.getSmartNotifications();
    let filtered = notifs;
    
    if (filter === "business") {
        filtered = notifs.filter(n => n.type === "industry" || n.type === "cross_sell");
    } else if (filter === "training") {
        filtered = notifs.filter(n => n.type === "live_training");
    } else if (filter === "saved") {
        filtered = notifs.filter(n => n.isBookmarked);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="font-size: 40px; margin-bottom: 10px;">📭</div>
                <h4 style="margin: 0; font-size: 15px; color: #0f172a;">Tidak ada notifikasi dalam kategori ini</h4>
                <p style="margin: 4px 0 0; font-size: 12.5px;">Peluang bisnis baru akan muncul saat sistem mendeteksi tren pasar atau data portofolio.</p>
            </div>
        `;
        return;
    }
    
    let html = "";
    filtered.forEach(notif => {
        const isUnread = !notif.isRead;
        let typePillClass = "pill-industry";
        let typeLabel = "🏭 Tren Industri";
        
        if (notif.type === "cross_sell") {
            typePillClass = "pill-cross-sell";
            typeLabel = "🎯 Cross-Selling Nasabah";
        } else if (notif.type === "live_training") {
            typePillClass = "pill-live-training";
            typeLabel = "🎓 Live Training";
        }
        
        // Multi-Product Showcase Pills
        let multiProductsHtml = "";
        if (notif.productsList && notif.productsList.length > 0) {
            multiProductsHtml = `
                <div style="margin: 8px 0 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
                    <div style="font-size: 11.5px; font-weight: 700; color: #0f172a; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                        <span>📦</span> Paket Produk yang Dapat Ditawarkan:
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${notif.productsList.map(p => {
                            const comp = window.checkAgentCompetency(p.moduleId);
                            const badgeColor = comp.isCompetent ? '#dcfce7' : '#fef3c7';
                            const textColor = comp.isCompetent ? '#15803d' : '#b45309';
                            const iconComp = comp.isCompetent ? '✓' : '⚠️';
                            return `
                                <span style="background: ${badgeColor}; color: ${textColor}; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
                                    ${p.icon || '🛡️'} ${p.name} <small style="font-size: 9.5px; opacity: 0.85;">(${iconComp})</small>
                                </span>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        let clientInfoBox = "";
        if (notif.sampleClient) {
            clientInfoBox = `
                <div class="notif-target-box" style="margin-bottom: 8px;">
                    <strong>👤 Target Nasabah:</strong> ${notif.sampleClient.name} (${notif.sampleClient.type})
                    ${notif.existingPolicy ? `<br><strong>📋 Polis Eksisting:</strong> ${notif.existingPolicy}` : ''}
                </div>
            `;
        }
        
        let commissionBadgeHtml = "";
        if (notif.commissionLabel) {
            commissionBadgeHtml = `
                <div class="notif-commission-badge" title="Estimasi potensi komisi agen & poin BPP">
                    ${notif.commissionLabel}
                </div>
            `;
        } else if (notif.bonusReward) {
            commissionBadgeHtml = `
                <div class="notif-commission-badge" style="background:#faf5ff; border-color:#d8b4fe; color:#6b21a8;">
                    🎁 ${notif.bonusReward}
                </div>
            `;
        }
        
        const isBookmarked = notif.isBookmarked;
        
        html += `
            <div class="smart-notif-card type-${notif.type.replace('_', '-')} ${isUnread ? 'unread' : ''}" id="card-${notif.id}">
                <div class="notif-card-top">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span class="notif-type-pill ${typePillClass}">${typeLabel}</span>
                        <span style="font-size: 11.5px; color: #64748b;">• ${notif.time}</span>
                    </div>
                    ${commissionBadgeHtml}
                </div>
                
                <h4 style="margin: 4px 0; font-size: 15px; font-weight: 800; color: #0f172a;">
                    ${notif.title}
                </h4>
                
                <div class="notif-card-body">
                    <p style="margin-bottom: 8px;">${notif.description}</p>
                    ${clientInfoBox}
                    ${multiProductsHtml}
                </div>
                
                <div class="notif-card-actions">
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-notif-action" onclick="window.handleNotificationAction('${notif.id}')">
                            <span>🚀</span> ${notif.type === 'live_training' ? 'Daftar Training' : 'Periksa Peluang & Jalur Belajar'}
                        </button>
                    </div>
                    
                    <button class="btn-notif-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="window.toggleNotificationBookmark('${notif.id}')" title="Simpan ke To-Do List Harian">
                        <span>${isBookmarked ? '⭐' : '📌'}</span> ${isBookmarked ? 'Tersimpan di To-Do' : 'Simpan ke To-Do'}
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    window.updateSmartNotificationBadge();
};

// Tandai Semua Notifikasi Dibaca
window.markAllSmartNotificationsRead = function() {
    const notifs = window.getSmartNotifications();
    notifs.forEach(n => n.isRead = true);
    window.saveSmartNotifications(notifs);
    window.renderSmartNotifications(window.currentNotifFilter || "all");
    window.updateSmartNotificationBadge();
    
    if (typeof showFloatingToast === 'function') {
        showFloatingToast("✅ Seluruh notifikasi telah ditandai dibaca.", "success");
    }
};

// Bookmark / To-Do Toggle
window.toggleNotificationBookmark = function(notifId) {
    const notifs = window.getSmartNotifications();
    const notif = notifs.find(n => n.id === notifId);
    if (!notif) return;
    
    notif.isBookmarked = !notif.isBookmarked;
    window.saveSmartNotifications(notifs);
    
    // Sync ke To-Do List Widget
    window.renderAgentTodoListWidget();
    window.renderSmartNotifications(window.currentNotifFilter || "all");
    window.updateSmartNotificationBadge();
    
    const msg = notif.isBookmarked 
        ? "📌 Peluang berhasil disimpan ke To-Do List Harian Anda!" 
        : "Peluang dihapus dari To-Do List.";
    alert(msg);
};

// Action Trigger: Cek Kompetensi & Arahkan (Adaptive Routing)
window.handleNotificationAction = function(notifId) {
    const notifs = window.getSmartNotifications();
    const notif = notifs.find(n => n.id === notifId);
    if (!notif) return;
    
    // Tandai sudah dibaca
    notif.isRead = true;
    window.saveSmartNotifications(notifs);
    window.updateSmartNotificationBadge();
    
    // Jika Pemicu C (Live Training)
    if (notif.type === "live_training") {
        window.closeSmartNotificationModal();
        window.routeToTrainingFromNotif(notif.trainingId);
        return;
    }
    
    // Jika Pemicu A atau B -> Lakukan Pemeriksaan Kompetensi
    const compCheck = window.checkAgentCompetency(notif.targetModuleId);
    window.currentActiveNotif = notif;
    window.closeSmartNotificationModal();
    
    if (compCheck.isCompetent) {
        // SCENARIO 1: SUDAH KOMPETEN -> Buka Modal Cross-Sell Proposal + WhatsApp Persuasif
        window.openCrossSellProposalModal(notif);
    } else {
        // SCENARIO 2: BELUM KOMPETEN -> Buka Modal Panduan Belajar Adaptif
        window.openAdaptiveLearningModal(notif);
    }
};

// ==================== SCENARIO 1: SUDAH KOMPETEN (PROPOSAL & WHATSAPP) ====================
window.openCrossSellProposalModal = function(notif) {
    const modal = document.getElementById("modal-cross-sell-proposal");
    if (!modal) return;
    
    window.activeCrossSellNotif = notif;
    
    // Summary Card with Multi-Products
    const summaryCard = document.getElementById("cross-sell-summary-card");
    if (summaryCard) {
        let productsListHtml = "";
        if (notif.productsList && notif.productsList.length > 0) {
            productsListHtml = `
                <div style="margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                    <strong style="font-size: 12px; color: #0f172a; display: block; margin-bottom: 6px;">
                        📦 Rekomendasi Paket Bundling Produk (Multi-Product Cross-Selling):
                    </strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                        ${notif.productsList.map(p => `
                            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 11.5px; display: flex; align-items: center; gap: 6px;">
                                <span style="font-size: 14px;">${p.icon || '🛡️'}</span>
                                <div>
                                    <strong style="color: #0f172a; display: block;">${p.name}</strong>
                                    <span style="font-size: 10px; color: #15803d; font-weight: 600;">✓ Siap Ditawarkan</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        summaryCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                    <h4 style="margin:0; font-size:16px; font-weight:800; color:#0f172a;">${notif.sampleClient ? notif.sampleClient.name : 'Target Nasabah'}</h4>
                    <span style="font-size:12px; color:#64748b;">${notif.sampleClient ? notif.sampleClient.pic : ''}</span>
                </div>
                <div class="notif-commission-badge">
                    ${notif.commissionLabel}
                </div>
            </div>
            <div style="font-size:12px; color:#334155; line-height:1.5; background:white; padding:10px 12px; border-radius:8px; border:1px solid #e2e8f0;">
                <div><strong>📋 Profil Nasabah:</strong> ${notif.sampleClient ? notif.sampleClient.type : '-'}</div>
                ${notif.existingPolicy ? `<div style="margin-top:3px;"><strong>🚗 Polis Saat Ini:</strong> ${notif.existingPolicy}</div>` : ''}
            </div>
            ${productsListHtml}
        `;
    }
    
    // Bind Proposal Launch Button
    const launchBtn = document.getElementById("btn-cross-sell-launch-proposal");
    if (launchBtn) {
        launchBtn.onclick = function() {
            window.routeToProposalFromNotif(notif.id);
        };
    }
    
    // Set WhatsApp Tone default Formal
    window.selectWhatsAppTone("formal");
    
    modal.style.display = "flex";
    modal.classList.add("active");
};

window.closeCrossSellProposalModal = function() {
    const modal = document.getElementById("modal-cross-sell-proposal");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("active");
    }
};

window.selectWhatsAppTone = function(toneKey) {
    window.activeWhatsAppTone = toneKey;
    
    // Update pills
    const pills = document.querySelectorAll(".wa-tone-btn");
    pills.forEach(p => p.classList.remove("active"));
    
    const activePill = document.getElementById(`btn-wa-${toneKey}`);
    if (activePill) activePill.classList.add("active");
    
    const notif = window.activeCrossSellNotif;
    if (!notif || !notif.whatsappTemplates) return;
    
    const textarea = document.getElementById("wa-message-textarea");
    if (textarea) {
        textarea.value = notif.whatsappTemplates[toneKey] || notif.whatsappTemplates.formal || "";
    }
};

window.copyWhatsAppMessage = function() {
    const textarea = document.getElementById("wa-message-textarea");
    if (!textarea) return;
    
    textarea.select();
    navigator.clipboard.writeText(textarea.value).then(() => {
        const textSpan = document.getElementById("wa-copy-btn-text");
        const iconSpan = document.getElementById("wa-copy-btn-icon");
        if (textSpan) textSpan.innerText = "Tersalin! ✅";
        if (iconSpan) iconSpan.innerText = "✓";
        
        setTimeout(() => {
            if (textSpan) textSpan.innerText = "Salin Pesan WA";
            if (iconSpan) iconSpan.innerText = "📋";
        }, 2000);
    });
};

window.sendDirectWhatsApp = function() {
    const textarea = document.getElementById("wa-message-textarea");
    const notif = window.activeCrossSellNotif;
    if (!textarea) return;
    
    const message = encodeURIComponent(textarea.value);
    const phone = notif && notif.sampleClient && notif.sampleClient.phone ? notif.sampleClient.phone.replace(/[^0-9]/g, '') : '';
    
    const waUrl = phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;
    window.open(waUrl, "_blank");
};

window.routeToProposalFromNotif = function(notifId) {
    const notifs = window.getSmartNotifications();
    const notif = notifs.find(n => n.id === notifId);
    if (!notif) return;
    
    window.closeCrossSellProposalModal();
    window.navigateTo("penawaran");
    
    setTimeout(() => {
        if (notif.sampleClient) {
            const custInput = document.getElementById("prop-cust-name");
            const phoneInput = document.getElementById("prop-cust-phone");
            const valueInput = document.getElementById("prop-insured-value");
            const prodSelect = document.getElementById("prop-product-select");
            
            if (custInput) custInput.value = notif.sampleClient.name;
            if (phoneInput) phoneInput.value = notif.sampleClient.phone || '';
            if (valueInput) valueInput.value = notif.sampleClient.sumInsured || 1500000000;
            if (prodSelect && notif.sampleClient.recommendedProduct) {
                prodSelect.value = notif.sampleClient.recommendedProduct;
            }
            if (typeof syncProposalProductPrice === 'function') {
                syncProposalProductPrice();
            }
        }
        alert(`🚀 Formulir Quotation & SPPA telah otomatis terisi dengan data nasabah ${notif.sampleClient ? notif.sampleClient.name : ''}!`);
    }, 300);
};

// ==================== SCENARIO 2: BELUM KOMPETEN (ADAPTIVE LEARNING GUIDANCE) ====================
window.openAdaptiveLearningModal = function(notif) {
    const modal = document.getElementById("modal-adaptive-learning");
    if (!modal) return;
    
    window.activeAdaptiveNotif = notif;
    
    // 1. Alert Box
    const alertBox = document.getElementById("adaptive-learning-alert-box");
    if (alertBox) {
        alertBox.innerHTML = `
            <div style="font-size: 13px; color: #854d0e; line-height: 1.5;">
                <strong style="color: #9a3412; font-size: 13.5px; display: block; margin-bottom: 4px;">
                    💰 ${notif.commissionLabel || 'Peluang Bernilai Tinggi'} Terdeteksi
                </strong>
                Anda memiliki peluang cross-selling di nasabah <strong>${notif.sampleClient ? notif.sampleClient.name : 'ini'}</strong>, 
                namun modul produk utama (<strong>${notif.targetModuleName || 'Produk Terkait'}</strong>) belum Anda pelajari atau selesaikan.
                <div style="margin-top: 8px; font-size: 11.5px; color: #b45309; background: rgba(254, 240, 138, 0.6); padding: 6px 10px; border-radius: 6px;">
                    💡 <em>Sesuai regulasi OJK & kode etik AAUI, penguasaan klausul polis meningkatkan kepercayaan nasabah dan tingkat closing hingga 3.2x lipat.</em>
                </div>
            </div>
        `;
    }
    
    // 2. Render Multi-Product List Showcase
    const productsContainer = document.getElementById("adaptive-products-list");
    if (productsContainer) {
        if (notif.productsList && notif.productsList.length > 0) {
            productsContainer.innerHTML = notif.productsList.map(p => {
                const comp = window.checkAgentCompetency(p.moduleId);
                const isComp = comp.isCompetent;
                const statusBadge = isComp 
                    ? `<span style="background: #dcfce7; color: #15803d; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">✅ Siap Ditawarkan (Lulus)</span>`
                    : `<span style="background: #fef3c7; color: #b45309; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">⚠️ Perlu Dipelajari (Belum Selesai)</span>`;
                
                return `
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 16px;">${p.icon || '🛡️'}</span>
                            <div>
                                <strong style="font-size: 12.5px; color: #0f172a; display: block;">${p.name}</strong>
                                <span style="font-size: 11px; color: #64748b;">${p.desc || ''}</span>
                            </div>
                        </div>
                        <div>
                            ${statusBadge}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            productsContainer.innerHTML = `<p style="font-size: 12px; color: #64748b; margin: 0;">${notif.products ? notif.products.join(', ') : '-'}</p>`;
        }
    }
    
    // 3. Check Live Training Schedule
    let hasUpcomingTraining = false;
    let upcomingTrainingObj = null;
    
    try {
        const branchTrainings = JSON.parse(localStorage.getItem("pa_branch_trainings") || "[]");
        if (notif.relatedTrainingId) {
            const trn = branchTrainings.find(t => t.id === notif.relatedTrainingId);
            if (trn && trn.status === "Mendatang") {
                hasUpcomingTraining = true;
                upcomingTrainingObj = trn;
            }
        }
        if (!hasUpcomingTraining) {
            // Cek apakah ada training lain yang statusnya Mendatang
            const futureTrn = branchTrainings.find(t => t.status === "Mendatang");
            if (futureTrn && (futureTrn.category === notif.targetModuleName || futureTrn.category === "Regulasi")) {
                hasUpcomingTraining = true;
                upcomingTrainingObj = futureTrn;
            }
        }
    } catch(e) {}
    
    // 4. Render Dual Pathway UI (Adaptif terhadap ada/tidaknya jadwal training)
    const pathwaysContainer = document.getElementById("adaptive-pathways-container");
    if (pathwaysContainer) {
        if (hasUpcomingTraining && upcomingTrainingObj) {
            // Skenario: ADA jadwal Live Training dalam waktu dekat
            pathwaysContainer.innerHTML = `
                <!-- Pathway 1: Belajar Mandiri -->
                <div style="background: #ffffff; border: 2px solid #e0f2fe; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="font-size: 22px;">📖</span>
                            <strong style="color: #0369a1; font-size: 13.5px;">Belajar Mandiri</strong>
                        </div>
                        <p style="font-size: 11.5px; color: #475569; line-height: 1.45; margin: 0 0 8px;">
                            Baca modul resmi, pelajari klausul PSAKBI/ICC, dan selesaikan kuis pemahaman dalam 10 menit.
                        </p>
                        <div style="font-size: 10.5px; background: #f0f9ff; color: #0284c7; padding: 3px 8px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 12px;">
                            ⏱️ Instan • +40 XP Belajar
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.routeToStudyModuleFromNotif('${notif.targetModuleId}')" style="width: 100%; padding: 8px; font-size: 12.5px; font-weight: 700; background: #0284c7;">
                        Mulai Baca Modul ➔
                    </button>
                </div>

                <!-- Pathway 2: Live Training Zoom (Ada Jadwal) -->
                <div style="background: #ffffff; border: 2px solid #f3e8ff; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="font-size: 22px;">📅</span>
                            <strong style="color: #7e22ce; font-size: 13.5px;">Live Training Zoom</strong>
                        </div>
                        <p style="font-size: 11.5px; color: #475569; line-height: 1.45; margin: 0 0 8px;">
                            Sesi live webinar: <strong>${upcomingTrainingObj.title}</strong> (${upcomingTrainingObj.date}). Bedah kasus langsung bersama ${upcomingTrainingObj.trainer}.
                        </p>
                        <div style="font-size: 10.5px; background: #faf5ff; color: #9333ea; padding: 3px 8px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 12px;">
                            🎓 Live Sesi • ${upcomingTrainingObj.date}
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.routeToTrainingFromNotif('${upcomingTrainingObj.id}')" style="width: 100%; padding: 8px; font-size: 12.5px; font-weight: 700; background: #7c3aed;">
                        Daftar / RSVP Sesi ➔
                    </button>
                </div>
            `;
        } else {
            // Skenario: TIDAK ADA jadwal Live Training dalam waktu dekat -> Rekomendasikan Belajar Mandiri Dulu!
            pathwaysContainer.innerHTML = `
                <!-- Pathway 1: Belajar Mandiri (UTAMA / DIREKOMENDASIKAN) -->
                <div style="background: #ffffff; border: 2px solid #0284c7; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 6px 18px rgba(2, 132, 199, 0.18); position: relative;">
                    <div style="position: absolute; top: -10px; right: 12px; background: #0284c7; color: white; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">
                        ⭐ JALUR DIREKOMENDASIKAN
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="font-size: 24px;">📖</span>
                            <div>
                                <strong style="color: #0369a1; font-size: 14px; display: block;">Belajar Mandiri (Instan)</strong>
                                <span style="font-size: 10.5px; color: #16a34a; font-weight: 700;">✓ Langsung Buka Modul & Kuis</span>
                            </div>
                        </div>
                        <p style="font-size: 11.5px; color: #334155; line-height: 1.45; margin: 4px 0 8px;">
                            Pelajari ringkasan materi, klausul proteksi PSAKBI/CAR, dan selesaikan kuis singkat dalam 10 menit untuk langsung membuka tombol buat proposal.
                        </p>
                        <div style="font-size: 10.5px; background: #f0f9ff; color: #0284c7; padding: 3px 8px; border-radius: 6px; font-weight: 700; display: inline-block; margin-bottom: 12px;">
                            ⏱️ 10 Menit • +40 XP Belajar
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.routeToStudyModuleFromNotif('${notif.targetModuleId}')" style="width: 100%; padding: 10px; font-size: 13px; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
                        🚀 Mulai Belajar Mandiri Sekarang ➔
                    </button>
                </div>

                <!-- Pathway 2: Live Training Zoom (Informasi Belum Ada Jadwal) -->
                <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="font-size: 22px;">📅</span>
                            <div>
                                <strong style="color: #64748b; font-size: 13.5px; display: block;">Live Training Zoom</strong>
                                <span style="font-size: 10px; background: #fef3c7; color: #b45309; padding: 2px 7px; border-radius: 10px; font-weight: 700;">Belum Ada Jadwal Terdekat</span>
                            </div>
                        </div>
                        <p style="font-size: 11.5px; color: #64748b; line-height: 1.45; margin: 4px 0 8px;">
                            Belum ada jadwal Live Webinar Zoom untuk topik ini dalam 14 hari ke depan.
                        </p>
                        <div style="background: #fffbeb; border: 1px solid #fef3c7; padding: 8px 10px; border-radius: 8px; font-size: 11px; color: #92400e; margin-bottom: 10px; line-height: 1.4;">
                            💡 <strong>Saran Sistem:</strong> Sebaiknya selesaikan <strong>Belajar Mandiri</strong> sekarang agar tidak kehilangan momentum closing di nasabah ini!
                        </div>
                    </div>
                    <button class="btn-secondary" onclick="window.requestTrainingSession('${notif.targetModuleName}')" style="width: 100%; padding: 8px; font-size: 11.5px; font-weight: 600; color: #475569;">
                        🔔 Beri Tahu Saya Jika Ada Jadwal Baru
                    </button>
                </div>
            `;
        }
    }
    
    // Bind Bookmark Button
    const btnBookmark = document.getElementById("btn-adaptive-bookmark");
    if (btnBookmark) {
        btnBookmark.onclick = function() {
            window.toggleNotificationBookmark(notif.id);
            window.closeAdaptiveLearningModal();
        };
    }
    
    modal.style.display = "flex";
    modal.classList.add("active");
};

window.requestTrainingSession = function(topicName) {
    alert(`🔔 PENGINGAT DIAKTIFKAN!\n\nAnda akan otomatis menerima notifikasi ketika Trainer Cabang menjadwalkan sesi Live Training Zoom baru untuk topik "${topicName}".\n\nUntuk saat ini, silakan gunakan Belajar Mandiri agar dapat segera membuat penawaran.`);
};

window.closeAdaptiveLearningModal = function() {
    const modal = document.getElementById("modal-adaptive-learning");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("active");
    }
};

window.routeToStudyModuleFromNotif = function(moduleId) {
    window.closeAdaptiveLearningModal();
    
    if (typeof window.openMaterialDetail === 'function') {
        window.openMaterialDetail(moduleId);
    } else {
        window.navigateTo("belajar");
    }
    alert(`📖 Mengarahkan ke Modul Belajar Mandiri: ${moduleId}. Pelajari materi dan selesaikan kuis untuk membuka jalur penawaran!`);
};

window.routeToTrainingFromNotif = function(trainingId) {
    window.closeAdaptiveLearningModal();
    window.closeSmartNotificationModal();
    
    window.navigateTo("agen-training");
    
    // Otomatis RSVP training jika ada
    try {
        const trainings = JSON.parse(localStorage.getItem("pa_branch_trainings") || "[]");
        const trn = trainings.find(t => t.id === trainingId);
        if (trn) {
            const activeUser = JSON.parse(sessionStorage.getItem('pa_active_user') || '{}');
            const agentCode = activeUser.code || "AGN-001";
            if (!trn.rsvpAgents) trn.rsvpAgents = [];
            if (!trn.rsvpAgents.includes(agentCode)) {
                trn.rsvpAgents.push(agentCode);
                localStorage.setItem("pa_branch_trainings", JSON.stringify(trainings));
            }
            alert(`📅 Pendaftaran Live Training (${trn.title}) BERHASIL! Silakan cek jadwal di tab Live Training.`);
        }
    } catch(e) {}
};

// ==================== DASHBOARD PROACTIVE OPPORTUNITY BANNER ====================
window.renderDashboardProactiveOpportunity = function() {
    const container = document.getElementById("dash-proactive-opportunity-container");
    if (!container) return;
    
    const notifs = window.getSmartNotifications();
    const hotNotif = notifs.find(n => n.type === 'cross_sell' || n.type === 'industry');
    if (!hotNotif) {
        container.innerHTML = "";
        return;
    }
    
    container.innerHTML = `
        <div class="proactive-opportunity-banner">
            <div style="flex: 1; z-index: 2;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <span style="background: rgba(56, 189, 248, 0.25); color: #38bdf8; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.3px;">
                        💡 ASISTEN BISNIS PROAKTIF (AI DETECTION)
                    </span>
                    <span style="font-size: 11.5px; opacity: 0.8;">Peluang Cuan Hari Ini</span>
                </div>
                <h3 style="margin: 0 0 6px; font-size: 17px; font-weight: 800; color: white;">
                    ${hotNotif.title}
                </h3>
                <p style="margin: 0 0 10px; font-size: 13px; color: #e2e8f0; line-height: 1.45; max-width: 90%;">
                    ${hotNotif.description}
                </p>
                ${hotNotif.productsList ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                        ${hotNotif.productsList.slice(0, 3).map(p => `
                            <span style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: white; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px;">
                                ${p.icon || '🛡️'} ${p.name}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <div class="notif-commission-badge" style="box-shadow: none;">
                        ${hotNotif.commissionLabel}
                    </div>
                    <button onclick="window.handleNotificationAction('${hotNotif.id}')" style="background: #38bdf8; color: #0f172a; border: none; padding: 7px 18px; border-radius: 8px; font-weight: 800; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3);">
                        🚀 Eksekusi Peluang ➔
                    </button>
                    <button onclick="window.toggleSmartNotificationModal(event)" style="background: rgba(255,255,255,0.12); color: white; border: 1px solid rgba(255,255,255,0.25); padding: 7px 14px; border-radius: 8px; font-weight: 600; font-size: 12.5px; cursor: pointer;">
                        Lihat Semua (${notifs.length})
                    </button>
                </div>
            </div>
        </div>
    `;
};

// ==================== DASHBOARD TO-DO LIST WIDGET ====================
window.renderAgentTodoListWidget = function() {
    const container = document.getElementById("dash-todo-list-container");
    const badge = document.getElementById("dash-todo-badge");
    if (!container) return;
    
    const notifs = window.getSmartNotifications();
    const bookmarkedNotifs = notifs.filter(n => n.isBookmarked);
    
    if (badge) {
        badge.innerText = `${bookmarkedNotifs.length} Tugas`;
    }
    
    if (bookmarkedNotifs.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:20px 10px; color:var(--text-muted); font-size:12px;">
                <span style="font-size:24px; display:block; margin-bottom:4px;">📌</span>
                Belum ada peluang yang disimpan.<br>Klik tombol <strong>"Simpan ke To-Do"</strong> pada notifikasi untuk memantau tugas harian.
            </div>
        `;
        return;
    }
    
    let html = "";
    bookmarkedNotifs.forEach(item => {
        const isDone = item.isTodoDone || false;
        html += `
            <div class="todo-item-card ${isDone ? 'done' : ''}">
                <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.toggleTodoItemStatus('${item.id}')" style="margin-top: 3px; cursor: pointer; width: 16px; height: 16px;">
                <div style="flex: 1;">
                    <div class="todo-title" style="font-size: 12.5px; font-weight: 700; color: #0f172a; line-height: 1.35;">
                        ${item.title}
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                        ${item.sampleClient ? `Nasabah: <strong>${item.sampleClient.name}</strong>` : ''}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
                        <span style="font-size: 10.5px; font-weight: 700; color: #0284c7;">${item.commissionLabel || ''}</span>
                        <button onclick="window.handleNotificationAction('${item.id}')" style="background: none; border: none; color: #0284c7; font-size: 11px; font-weight: 700; cursor: pointer; text-decoration: underline;">
                            Buka ➔
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
};

window.toggleTodoItemStatus = function(notifId) {
    const notifs = window.getSmartNotifications();
    const item = notifs.find(n => n.id === notifId);
    if (!item) return;
    
    item.isTodoDone = !item.isTodoDone;
    window.saveSmartNotifications(notifs);
    window.renderAgentTodoListWidget();
    
    if (item.isTodoDone) {
        alert("🎉 Hebat! Anda telah menyelesaikan tugas follow up peluang ini (+20 XP).");
    }
};

// ====================================================================================
// [FIX & ENHANCEMENT] SIMULATOR PERHITUNGAN PREMI OJK & QUOTATION INTEGRATION
// ====================================================================================

window.switchSimulator = function(simType) {
    // 1. Update Tab Buttons
    const tabs = document.querySelectorAll(".sim-tab-btn");
    tabs.forEach(btn => {
        const onclickAttr = btn.getAttribute("onclick") || "";
        if (onclickAttr.includes(simType)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // 2. Switch Form Containers
    const forms = document.querySelectorAll(".sim-form-container");
    forms.forEach(f => f.classList.remove("active"));
    
    const targetForm = document.getElementById(`form-${simType}`);
    if (targetForm) {
        targetForm.classList.add("active");
    }
    
    window.currentSimulatorType = simType;
    window.calculatePremium();
};

window.calculatePremium = function() {
    const simType = window.currentSimulatorType || "sim-motor";
    const formatIDR = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);
    
    // Output Elements
    const elProdName = document.getElementById("res-prod-name");
    const elJaminan = document.getElementById("res-jaminan-type");
    const elSumInsured = document.getElementById("res-sum-insured");
    const elVehicleCat = document.getElementById("res-vehicle-cat");
    const elWilayah = document.getElementById("res-wilayah");
    const elRate = document.getElementById("res-rate");
    const elBasicPrem = document.getElementById("res-basic-premium");
    
    const rowLoading = document.getElementById("res-row-loading-age");
    const valLoading = document.getElementById("res-loading-age");
    const rowBanjir = document.getElementById("res-row-addon-banjir");
    const valBanjir = document.getElementById("res-addon-banjir");
    const rowGempa = document.getElementById("res-row-addon-gempa");
    const valGempa = document.getElementById("res-addon-gempa");
    const rowSrcc = document.getElementById("res-row-addon-srcc");
    const valSrcc = document.getElementById("res-addon-srcc");
    const rowTerror = document.getElementById("res-row-addon-terror");
    const valTerror = document.getElementById("res-addon-terror");
    const rowTpl = document.getElementById("res-row-tpl");
    const valTpl = document.getElementById("res-tpl-premium");
    
    const elPolicyFee = document.getElementById("res-policy-fee");
    const elStampDuty = document.getElementById("res-stamp-duty");
    const elTotal = document.getElementById("res-total-payment");
    
    let sumInsured = 0;
    let basicRatePct = 0;
    let basicPrem = 0;
    let totalAddons = 0;
    let policyFee = 50000;
    let stampDuty = 10000;
    
    if (simType === "sim-motor") {
        if (elProdName) elProdName.innerText = "InsureMind Auto Protection";
        const cat = document.getElementById("motor-category")?.value || "3";
        const val = parseFloat(document.getElementById("motor-value")?.value || "250000000") || 0;
        const jaminan = document.getElementById("motor-type")?.value || "Comprehensive";
        const region = document.getElementById("motor-region")?.value || "2";
        const year = parseInt(document.getElementById("motor-year")?.value || "2022") || 2022;
        
        sumInsured = val;
        if (elJaminan) elJaminan.innerText = jaminan;
        if (elSumInsured) elSumInsured.innerText = formatIDR(sumInsured);
        if (elVehicleCat) elVehicleCat.innerText = `Kategori ${cat}`;
        if (elWilayah) elWilayah.innerText = `Wilayah ${region === '1' ? 'I' : region === '2' ? 'II' : 'III'}`;
        
        // Rate Matriks OJK SEOJK No. 6/2017
        if (jaminan === "Comprehensive") {
            basicRatePct = (region === "2") ? 2.290 : (region === "1" ? 2.140 : 2.080);
        } else {
            basicRatePct = (region === "2") ? 0.440 : (region === "1" ? 0.470 : 0.380);
        }
        
        basicPrem = (basicRatePct / 100) * sumInsured;
        if (elRate) elRate.innerText = `${basicRatePct.toFixed(3)}%`;
        if (elBasicPrem) elBasicPrem.innerText = formatIDR(basicPrem);
        
        // Loading Usia Kendaraan (> 5 thn comp, > 10 thn tlo)
        const currentYear = 2026;
        const age = currentYear - year;
        let loadingPrem = 0;
        if (jaminan === "Comprehensive" && age > 5) {
            loadingPrem = basicPrem * 0.05 * (age - 5);
            if (rowLoading) rowLoading.style.display = "flex";
            if (valLoading) valLoading.innerText = formatIDR(loadingPrem);
        } else {
            if (rowLoading) rowLoading.style.display = "none";
        }
        
        // Addons
        const isBanjir = document.getElementById("addon-banjir")?.checked;
        const isGempa = document.getElementById("addon-gempa")?.checked;
        const isSrcc = document.getElementById("addon-srcc")?.checked;
        const isTerror = document.getElementById("addon-terror")?.checked;
        const tplExtra = parseFloat(document.getElementById("motor-tpl")?.value || "0") || 0;
        
        let premBanjir = isBanjir ? sumInsured * 0.001 : 0;
        let premGempa = isGempa ? sumInsured * 0.001 : 0;
        let premSrcc = isSrcc ? sumInsured * 0.0005 : 0;
        let premTerror = isTerror ? sumInsured * 0.0005 : 0;
        let premTpl = tplExtra > 0 ? (tplExtra * 0.01) : 0;
        
        if (rowBanjir) { rowBanjir.style.display = isBanjir ? "flex" : "none"; if (valBanjir) valBanjir.innerText = formatIDR(premBanjir); }
        if (rowGempa) { rowGempa.style.display = isGempa ? "flex" : "none"; if (valGempa) valGempa.innerText = formatIDR(premGempa); }
        if (rowSrcc) { rowSrcc.style.display = isSrcc ? "flex" : "none"; if (valSrcc) valSrcc.innerText = formatIDR(premSrcc); }
        if (rowTerror) { rowTerror.style.display = isTerror ? "flex" : "none"; if (valTerror) valTerror.innerText = formatIDR(premTerror); }
        if (rowTpl) { rowTpl.style.display = tplExtra > 0 ? "flex" : "none"; if (valTpl) valTpl.innerText = formatIDR(premTpl); }
        
        totalAddons = loadingPrem + premBanjir + premGempa + premSrcc + premTerror + premTpl;
        
    } else if (simType === "sim-property") {
        if (elProdName) elProdName.innerText = "InsureMind Property & Home Shield";
        const val = parseFloat(document.getElementById("prop-value")?.value || "500000000") || 0;
        const pClass = document.getElementById("prop-class")?.value || "Kelas 1";
        const pOcc = document.getElementById("prop-occupancy")?.value || "Rumah Tinggal";
        const isFlood = document.getElementById("prop-flood")?.value === "Ya";
        
        sumInsured = val;
        basicRatePct = (pOcc === "Rumah Tinggal") ? 0.038 : (pOcc === "Ruko / Toko" ? 0.065 : 0.120);
        if (pClass === "Kelas 2") basicRatePct *= 1.25;
        if (pClass === "Kelas 3") basicRatePct *= 1.5;
        
        basicPrem = (basicRatePct / 100) * sumInsured;
        
        if (elJaminan) elJaminan.innerText = `FLEXAS + ${pOcc}`;
        if (elSumInsured) elSumInsured.innerText = formatIDR(sumInsured);
        if (elVehicleCat) elVehicleCat.innerText = pClass;
        if (elWilayah) elWilayah.innerText = "Nasional";
        if (elRate) elRate.innerText = `${basicRatePct.toFixed(3)}%`;
        if (elBasicPrem) elBasicPrem.innerText = formatIDR(basicPrem);
        
        // Sembunyikan addon mobil
        if (rowLoading) rowLoading.style.display = "none";
        if (rowSrcc) rowSrcc.style.display = "none";
        if (rowTerror) rowTerror.style.display = "none";
        if (rowTpl) rowTpl.style.display = "none";
        
        let premBanjir = isFlood ? sumInsured * 0.00075 : 0;
        if (rowBanjir) { rowBanjir.style.display = isFlood ? "flex" : "none"; if (valBanjir) valBanjir.innerText = formatIDR(premBanjir); }
        if (rowGempa) rowGempa.style.display = "none";
        
        totalAddons = premBanjir;
        
    } else if (simType === "sim-pa") {
        if (elProdName) elProdName.innerText = "InsureMind Persona Safe (PA)";
        const val = parseFloat(document.getElementById("pa-value")?.value || "100000000") || 0;
        const paJob = document.getElementById("pa-job")?.value || "Kelas 1";
        const isMed = document.getElementById("pa-medical")?.value === "Ya";
        
        sumInsured = val;
        basicRatePct = (paJob === "Kelas 1") ? 0.150 : (paJob === "Kelas 2" ? 0.250 : 0.450);
        basicPrem = (basicRatePct / 100) * sumInsured;
        
        if (elJaminan) elJaminan.innerText = `Santunan Utama + ${paJob}`;
        if (elSumInsured) elSumInsured.innerText = formatIDR(sumInsured);
        if (elVehicleCat) elVehicleCat.innerText = paJob;
        if (elWilayah) elWilayah.innerText = "24 Jam Worldwide";
        if (elRate) elRate.innerText = `${basicRatePct.toFixed(3)}%`;
        if (elBasicPrem) elBasicPrem.innerText = formatIDR(basicPrem);
        
        // Sembunyikan addon mobil
        if (rowLoading) rowLoading.style.display = "none";
        if (rowBanjir) rowBanjir.style.display = "none";
        if (rowGempa) rowGempa.style.display = "none";
        if (rowSrcc) rowSrcc.style.display = "none";
        if (rowTerror) rowTerror.style.display = "none";
        
        let premMed = isMed ? basicPrem * 0.20 : 0;
        if (rowTpl) { rowTpl.style.display = isMed ? "flex" : "none"; if (valTpl) { rowTpl.querySelector('span').innerText = "Biaya Pengobatan Medis:"; valTpl.innerText = formatIDR(premMed); } }
        
        totalAddons = premMed;
    }
    
    const grandTotal = basicPrem + totalAddons + policyFee + stampDuty;
    if (elPolicyFee) elPolicyFee.innerText = formatIDR(policyFee);
    if (elStampDuty) elStampDuty.innerText = formatIDR(stampDuty);
    if (elTotal) elTotal.innerText = formatIDR(grandTotal);
    
    window.lastCalculatedGrandTotal = grandTotal;
    window.lastCalculatedSumInsured = sumInsured;
    window.lastCalculatedRate = basicRatePct;
};

window.convertCalculationToProposal = function() {
    window.calculatePremium();
    
    const grandTotal = window.lastCalculatedGrandTotal || 5785000;
    const sumInsured = window.lastCalculatedSumInsured || 250000000;
    const rate = window.lastCalculatedRate || 2.29;
    
    window.navigateTo("penawaran");
    
    setTimeout(() => {
        const insuredInput = document.getElementById("prop-insured-value");
        const rateInput = document.getElementById("prop-rate-calc");
        const premInput = document.getElementById("prop-calculated-premium");
        
        if (insuredInput) insuredInput.value = sumInsured;
        if (rateInput) rateInput.value = rate.toFixed(3);
        if (premInput) premInput.value = Math.round(grandTotal);
        
        alert(`✅ Data kalkulator premi berhasil ditransfer ke formulir Penawaran Quotation & PPT Builder!\nTotal Premi: Rp ${grandTotal.toLocaleString('id-ID')}`);
    }, 300);
};

// Inisialisasi awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    window.initSmartNotifications();
    window.updateSmartNotificationBadge();
    window.renderDashboardProactiveOpportunity();
    window.renderAgentTodoListWidget();
    
    // Auto attach input change listeners ke kalkulator premi
    const calcInputs = ['motor-category', 'motor-value', 'motor-type', 'motor-region', 'motor-year', 'addon-banjir', 'addon-gempa', 'addon-srcc', 'addon-terror', 'motor-tpl', 'prop-value', 'prop-class', 'prop-occupancy', 'prop-flood', 'pa-value', 'pa-job', 'pa-medical'];
    calcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => { if (typeof window.calculatePremium === 'function') window.calculatePremium(); });
            el.addEventListener('input', () => { if (typeof window.calculatePremium === 'function') window.calculatePremium(); });
        }
    });
});
