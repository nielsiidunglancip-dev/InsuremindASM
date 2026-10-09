// AI Insurance Coach Logic

function showAiSettings() {
    const modal = document.getElementById('ai-settings-modal');
    if (modal) modal.classList.add('active');
    
    // Load existing key
    const key = localStorage.getItem('gemini_api_key') || '';
    const input = document.getElementById('ai-api-key');
    if (input) input.value = key;

    // Check user role and restrict upload feature
    const userRole = sessionStorage.getItem('currentUserRole') || 'Agen';
    const uploadGroup = document.getElementById('ai-pdf-upload-group');
    if (uploadGroup) {
        if (userRole === 'Trainer' || userRole === 'Admin') {
            uploadGroup.style.display = 'block';
        } else {
            uploadGroup.style.display = 'none';
        }
    }

    // Check PDF status
    loadPdfFromDB().then(pdfData => {
        const statusText = document.getElementById('pdf-status-text');
        if (statusText) {
            statusText.innerText = pdfData ? "✅ PDF Knowledge Base telah tersimpan." : "Belum ada PDF yang diunggah.";
        }
    });
}

function hideAiSettings() {
    const modal = document.getElementById('ai-settings-modal');
    if (modal) modal.classList.remove('active');
}

function saveAiSettings() {
    const input = document.getElementById('ai-api-key');
    if (input) {
        localStorage.setItem('gemini_api_key', input.value.trim());
        alert('API Key berhasil disimpan.');
    }
    hideAiSettings();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const inputField = document.getElementById('chat-user-input');
    const chatArea = document.getElementById('chat-messages-area');
    if (!inputField || !chatArea) return;

    const message = inputField.value.trim();
    if (!message) return;

    // Append User Message
    appendMessage('Anda', message, 'user');
    inputField.value = '';

    // Simulate AI loading
    const typingId = 'typing-' + Date.now();
    appendMessage('AI', 'Sedang memikirkan jawaban...', 'coach', typingId);

    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (apiKey) {
        try {
            const response = await callGeminiAPI(apiKey, message);
            updateMessage(typingId, response);
        } catch (error) {
            console.warn("API Error, falling back to mock:", error);
            setTimeout(() => {
                const simulatedResponse = simulateAIResponse(message);
                updateMessage(typingId, "*(Mode Simulasi karena API Error)*<br><br>" + simulatedResponse);
            }, 1000);
        }
    } else {
        // Fallback / Offline (Local RAG) Simulation
        setTimeout(() => {
            const simulatedResponse = simulateAIResponse(message);
            updateMessage(typingId, simulatedResponse);
        }, 1500);
    }
}

function appendMessage(sender, text, roleClass, id = '') {
    const chatArea = document.getElementById('chat-messages-area');
    if (!chatArea) return;

    const idAttr = id ? `id="${id}"` : '';
    let avatarText = sender === 'Anda' ? 'RA' : 'AI';
    
    const userRole = sessionStorage.getItem('currentUserRole') || 'Agen';
    if(sender === 'Anda') {
        // Default to user avatar if available
        const initials = document.getElementById('user-initials');
        if (initials && initials.innerText) {
            avatarText = initials.innerText;
        }
    }

    const html = `
        <div class="chat-msg ${roleClass}" ${idAttr}>
            <div class="msg-avatar">${avatarText}</div>
            <div class="msg-bubble">
                <p>${formatTextToHTML(text)}</p>
            </div>
        </div>
    `;
    chatArea.insertAdjacentHTML('beforeend', html);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function updateMessage(id, text) {
    const msgElement = document.getElementById(id);
    if (msgElement) {
        const bubble = msgElement.querySelector('.msg-bubble');
        if (bubble) {
            bubble.innerHTML = `<p>${formatTextToHTML(text)}</p>`;
        }
    }
}

function formatTextToHTML(text) {
    // Basic formatting for bold and newlines
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

async function callGeminiAPI(apiKey, message) {
    // We are using gemini-1.5-pro or gemini-1.5-flash which are the modern ones.
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    // Definisi Knowledge Base / Dokumen Rujukan (RAG Lokal)
    // Anda bisa mengisi string ini dengan SOP, manual polis asuransi, atau aturan spesifik perusahaan.
    const KNOWLEDGE_BASE = `
        PANDUAN ASURANSI ASM ACADEMY:
        - ASM Auto Protection memberikan perlindungan komprehensif dengan rate dasar OJK 2.290% untuk Kategori 3 Wilayah II.
        - Asuransi Properti memiliki rate khusus berdasarkan kelas konstruksi. Kelas 1 (Tembok Beton) memiliki rate terendah.
        - Prosedur Klaim: Pelaporan maksimal 3x24 jam sejak kejadian. Dokumen wajib: Formulir klaim, foto kerugian, fotokopi polis/KTP.
        - Pengecualian Umum: Kerugian yang disengaja oleh tertanggung tidak dijamin dalam polis manapun.
    `;

    const prompt = `Anda adalah AI Insurance Coach bernama Coach. Anda adalah pakar asuransi umum Indonesia, ahli produk, dan mentor agen asuransi.

ATURAN SANGAT PENTING (Mencegah Halusinasi):
1. Jika ada DOKUMEN PENGETAHUAN berupa file PDF yang dilampirkan, atau Teks di bawah ini, Anda HANYA BOLEH menjawab berdasarkan informasi tersebut.
2. JANGAN MENGARANG (halusinasi) atau memberikan informasi di luar dokumen lampiran/teks tersebut.
3. Jika jawaban dari pertanyaan agen tidak ditemukan di dalam DOKUMEN PENGETAHUAN, Anda WAJIB menjawab dengan tegas: "Maaf, informasi tersebut tidak terdapat dalam panduan produk (Knowledge Base) yang saya miliki."

--- TEKS DOKUMEN TAMBAHAN ---
${KNOWLEDGE_BASE}
---------------------------

Pertanyaan dari agen:
${message}
`;

    const parts = [{ text: prompt }];

    const pdfBase64 = await loadPdfFromDB();
    if (pdfBase64) {
        parts.push({
            inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64
            }
        });
    }

    const payload = {
        contents: [{
            parts: parts
        }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Gagal menghubungi API');
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('Format respons tidak dikenali dari API');
    }
}

function simulateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('polis') || lowerMessage.includes('klausul')) {
        return "Berdasarkan polis standar asuransi umum, terdapat klausul utama yang harus dipahami seperti jaminan dasar dan perluasan. Apakah Anda ingin menanyakan klausul produk spesifik seperti Asuransi Kendaraan Bermotor atau Kebakaran?";
    } else if (lowerMessage.includes('premi') || lowerMessage.includes('hitung')) {
        return "Untuk menghitung premi, Anda bisa menggunakan Simulator Premi di menu utama. Anda perlu mengetahui Kategori Kendaraan, Nilai Pertanggungan, dan Wilayah. Rumusnya adalah: **Nilai Pertanggungan x Rate OJK (%)**.";
    } else if (lowerMessage.includes('klaim')) {
        return "Proses klaim asuransi umumnya membutuhkan pelaporan maksimal 3x24 jam sejak kejadian. Dokumen wajib meliputi: formulir klaim, foto kerugian, dan fotokopi polis/KTP.";
    } else {
        return "Pertanyaan yang bagus. Sebagai mentor Anda, saya menyarankan untuk selalu memahami kebutuhan nasabah (Fact Finding) sebelum menawarkan produk. Ada hal spesifik tentang produk asuransi yang ingin didiskusikan?";
    }
}

// ==================== INDEXED DB LOGIC FOR PDF ====================
const DB_NAME = 'AICoachDB';
const STORE_NAME = 'pdfStore';

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function savePdfToDB(base64Data) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(base64Data, 'knowledge_pdf');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function loadPdfFromDB() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get('knowledge_pdf');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const statusText = document.getElementById('pdf-status-text');
    if (statusText) {
        statusText.style.color = 'var(--primary-blue)';
        statusText.innerText = "⏳ Sedang memproses PDF...";
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        const dataUrl = e.target.result;
        // Extract base64 part
        const base64Data = dataUrl.split(',')[1];
        try {
            await savePdfToDB(base64Data);
            if (statusText) {
                statusText.style.color = 'var(--success-green)';
                statusText.innerText = "✅ PDF Knowledge Base berhasil diunggah dan disimpan!";
            }
        } catch(err) {
            if (statusText) {
                statusText.style.color = 'var(--danger-red)';
                statusText.innerText = "❌ Gagal menyimpan PDF: " + err.message;
            }
        }
    };
    reader.readAsDataURL(file);
}

// Attach to window so it can be called from index.html onclick
window.showAiSettings = showAiSettings;
window.hideAiSettings = hideAiSettings;
window.saveAiSettings = saveAiSettings;
window.handleChatKeyPress = handleChatKeyPress;
window.sendChatMessage = sendChatMessage;
window.handlePdfUpload = handlePdfUpload;
