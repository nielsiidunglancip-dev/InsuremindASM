import re
import os

workspace = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace, "index.html")
app_js_path = os.path.join(workspace, "app.js")

with open(index_html_path, "r", encoding="utf-8") as f:
    html = f.read()

with open(app_js_path, "r", encoding="utf-8") as f:
    js = f.read()

nl = "\r\n"

# ============================================================
# FIX 1: Restore gamification-cockpit-container to Dashboard
# The cockpit was removed from the dashboard. It should be
# right before </section> that closes page-dashboard.
# Currently page-dashboard ends at:
#   </section>
# right after the "Target Kontes Wisata" card.
# ============================================================

# The dashboard section currently ends with the contest widget, then </section>
# We need to add back the gamification-cockpit-container PLUS the Detail Pencapaian card

dashboard_cockpit_restore = (
    f"\r\n"
    f"        <div class=\"content-card\" style=\"margin-bottom: 20px;\">\r\n"
    f"          <div class=\"card-header\" style=\"display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px;\">\r\n"
    f"            <h3 style=\"margin: 0;\">Detail Pencapaian Kontes</h3>\r\n"
    f"          </div>\r\n"
    f"          <div style=\"margin-bottom: 15px;\">\r\n"
    f"            <label for=\"manifest-dropdown\" style=\"font-size: 12px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 5px;\">Pilih Manifes / Kategori Produk:</label>\r\n"
    f"            <select id=\"manifest-dropdown\" onchange=\"window.updateManifestData()\" style=\"width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 13px;\">\r\n"
    f"              <option value=\"Semua Produk\">Semua Produk (Gabungan)</option>\r\n"
    f"              <option value=\"Non SSC\">Non SSC</option>\r\n"
    f"              <option value=\"SSC\">SSC</option>\r\n"
    f"              <option value=\"Bonding\">Bonding</option>\r\n"
    f"            </select>\r\n"
    f"          </div>\r\n"
    f"          <table style=\"width: 100%; border-collapse: collapse; font-size: 12px;\">\r\n"
    f"            <thead>\r\n"
    f"              <tr style=\"border-bottom: 1px solid var(--border-color); text-align: left;\">\r\n"
    f"                <th style=\"padding: 8px 4px; color: var(--text-muted);\">Indikator</th>\r\n"
    f"                <th style=\"padding: 8px 4px; color: var(--text-muted);\">Target</th>\r\n"
    f"                <th style=\"padding: 8px 4px; color: var(--text-muted);\">Tercapai</th>\r\n"
    f"                <th style=\"padding: 8px 4px; color: var(--text-muted);\">Kurang</th>\r\n"
    f"              </tr>\r\n"
    f"            </thead>\r\n"
    f"            <tbody>\r\n"
    f"              <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n"
    f"                <td style=\"padding: 8px 4px; font-weight: 700; color: var(--primary-navy);\">GPW</td>\r\n"
    f"                <td style=\"padding: 8px 4px;\" id=\"gpw-target\">1 Miliar</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--success-green); font-weight:600;\" id=\"gpw-tercapai\">550 Juta</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--danger-red);\" id=\"gpw-kurang\">450 Juta</td>\r\n"
    f"              </tr>\r\n"
    f"              <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n"
    f"                <td style=\"padding: 8px 4px; font-weight: 700; color: var(--primary-navy);\">NGPW</td>\r\n"
    f"                <td style=\"padding: 8px 4px;\" id=\"ngpw-target\">800 Juta</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--success-green); font-weight:600;\" id=\"ngpw-tercapai\">450 Juta</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--danger-red);\" id=\"ngpw-kurang\">350 Juta</td>\r\n"
    f"              </tr>\r\n"
    f"              <tr>\r\n"
    f"                <td style=\"padding: 8px 4px; font-weight: 700; color: var(--primary-navy);\">Profit</td>\r\n"
    f"                <td style=\"padding: 8px 4px;\" id=\"profit-target\">200 Juta</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--success-green); font-weight:600;\" id=\"profit-tercapai\">120 Juta</td>\r\n"
    f"                <td style=\"padding: 8px 4px; color: var(--danger-red);\" id=\"profit-kurang\">80 Juta</td>\r\n"
    f"              </tr>\r\n"
    f"            </tbody>\r\n"
    f"          </table>\r\n"
    f"        </div>\r\n"
    f"\r\n"
    f"        <div id=\"gamification-cockpit-container\" style=\"margin-bottom: 20px;\"></div>\r\n"
)

# Insert restored elements just before </section> of page-dashboard
# We know page-dashboard closes before page-atc's comment
target_dashboard_end = (
    "\r\n"
    "\r\n"
    "      </section>\r\n"
    "\r\n"
    "      <!-- ==================== PAGE: AGENCY TOUR CONTEST (ATC) ==================== -->"
)

replacement_dashboard_end = (
    dashboard_cockpit_restore
    + "\r\n"
    + "      </section>\r\n"
    + "\r\n"
    + "      <!-- ==================== PAGE: AGENCY TOUR CONTEST (ATC) ==================== -->"
)

if target_dashboard_end in html:
    html = html.replace(target_dashboard_end, replacement_dashboard_end, 1)
    print("SUCCESS: Restored gamification cockpit + detail pencapaian to Dashboard")
else:
    print("WARNING: Could not find dashboard end marker. Manual check needed.")

# ============================================================
# FIX 2: Fix page-atc section tag
# Remove page-content class, remove inline style="display:none;"
# Add proper closing tag for sub-atc-kokpit
# ============================================================

old_atc_tag = '<section id="page-atc" class="page-section page-content" style="display:none;">'
new_atc_tag = '<section id="page-atc" class="page-section">'

if old_atc_tag in html:
    html = html.replace(old_atc_tag, new_atc_tag, 1)
    print("SUCCESS: Fixed page-atc section tag (removed page-content and inline display:none)")
else:
    print("WARNING: page-atc tag not found as expected")

# ============================================================
# FIX 3: Replace duplicate IDs inside #sub-atc-kokpit
# The ATC page has manifest-dropdown, gpw-target, ngpw-target, etc.
# that clash with Dashboard. Rename them to atc-* prefixed IDs.
# ============================================================

# Fix sub-atc-kokpit indentation and find the panel bawah section
# We target only inside page-atc to replace IDs

# The ATC "Panel Bawah" has manifest-dropdown clashing with dashboard
# Replace inside page-atc section only

# Strategy: find the sub-atc-kokpit block and do targeted replacements within it
sub_atc_start_marker = '<div id="sub-atc-kokpit">'
sub_atc_end_marker = '        </div>\r\n      </section>\r\n\r\n      <!-- ==================== PAGE: MENU BELAJAR ASURANSI ==================== -->'

start_idx = html.find(sub_atc_start_marker)
end_idx = html.find(sub_atc_end_marker)

if start_idx != -1 and end_idx != -1:
    sub_atc_block = html[start_idx:end_idx + len(sub_atc_end_marker)]
    
    # Replace IDs in the ATC block only
    fixed_block = sub_atc_block
    # IDs to rename (dashboard ones to atc- prefixed)
    id_replacements = [
        ('id="manifest-dropdown"',   'id="atc-manifest-dropdown"'),
        ('id="gpw-target"',          'id="atc-gpw-target"'),
        ('id="gpw-tercapai"',        'id="atc-gpw-tercapai"'),
        ('id="gpw-kurang"',          'id="atc-gpw-kurang"'),
        ('id="ngpw-target"',         'id="atc-ngpw-target"'),
        ('id="ngpw-tercapai"',       'id="atc-ngpw-tercapai"'),
        ('id="ngpw-kurang"',         'id="atc-ngpw-kurang"'),
        ('id="profit-target"',       'id="atc-profit-target"'),
        ('id="profit-tercapai"',     'id="atc-profit-tercapai"'),
        ('id="profit-kurang"',       'id="atc-profit-kurang"'),
        # Also fix the onchange reference
        ('onchange="window.updateManifestData()"', 'onchange="window.updateATCManifestData()"'),
        # Fix the gamification-cockpit-container id in ATC block
        ('id="gamification-cockpit-container"', 'id="atc-gamification-cockpit-container"'),
    ]
    for old_id, new_id in id_replacements:
        fixed_block = fixed_block.replace(old_id, new_id)
    
    html = html[:start_idx] + fixed_block + html[end_idx + len(sub_atc_end_marker):]
    print("SUCCESS: Renamed duplicate IDs inside #sub-atc-kokpit to atc-* prefix")
else:
    print(f"WARNING: sub-atc-kokpit block not found (start={start_idx}, end={end_idx})")

# ============================================================
# FIX 4: Fix sub-atc-kokpit closing tag (was missing proper indent)
# ============================================================
old_sub_open = '\r\n<div id="sub-atc-kokpit">'
new_sub_open = '\r\n        <div id="sub-atc-kokpit">'
if old_sub_open in html:
    html = html.replace(old_sub_open, new_sub_open, 1)
    print("SUCCESS: Fixed sub-atc-kokpit indentation")

# Write updated HTML
with open(index_html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("SUCCESS: index.html saved")

# ============================================================
# FIX 5: Patch app.js - navigateTo to handle 'atc'
# ============================================================

# Add 'atc' handler in navigateTo's render section
old_navigate_end = """    // Render dinamis untuk halaman Progress
    if (pageId === 'progress' && typeof window.renderAgentProgressPage === 'function') {
        window.renderAgentProgressPage();
    }
};"""

new_navigate_end = """    // Render dinamis untuk halaman Progress
    if (pageId === 'progress' && typeof window.renderAgentProgressPage === 'function') {
        window.renderAgentProgressPage();
    }
    
    // Render ATC page cockpit
    if (pageId === 'atc') {
        if (typeof window.renderGamification === 'function') window.renderGamification();
        if (typeof window.renderATCGamification === 'function') window.renderATCGamification();
        if (typeof window.updateATCManifestData === 'function') window.updateATCManifestData();
    }
};"""

if old_navigate_end in js:
    js = js.replace(old_navigate_end, new_navigate_end, 1)
    print("SUCCESS: Patched navigateTo in app.js to handle 'atc' page")
else:
    print("WARNING: navigateTo end marker not found in app.js")

# ============================================================
# FIX 6: Add renderATCGamification and updateATCManifestData
# These are clones of renderGamification / updateManifestData
# but targeting atc-* prefixed element IDs
# ============================================================

atc_js_functions = """

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

window.updateATCAircraftPosition = function() {
    // Read from Dashboard's data elements (single source of truth)
    const gpwTargetEl = document.getElementById('gpw-target');
    if (!gpwTargetEl) return;
    
    let gpwTarget = parseFloat(gpwTargetEl.innerText) || 1;
    let gpwTercapai = parseFloat((document.getElementById('gpw-tercapai') || {}).innerText) || 0;
    let ngpwTarget = parseFloat((document.getElementById('ngpw-target') || {}).innerText) || 1;
    let ngpwTercapai = parseFloat((document.getElementById('ngpw-tercapai') || {}).innerText) || 0;
    let profitTarget = parseFloat((document.getElementById('profit-target') || {}).innerText) || 1;
    let profitTercapai = parseFloat((document.getElementById('profit-tercapai') || {}).innerText) || 0;
    
    let gpwPct = (gpwTercapai / gpwTarget) * 100;
    let ngpwPct = (ngpwTercapai / ngpwTarget) * 100;
    let profitPct = (profitTercapai / profitTarget) * 100;
    let flightPct = Math.max(gpwPct, ngpwPct);
    let flightRenderPct = Math.min(flightPct, 100);
    let profitRenderPct = Math.min(profitPct, 100);

    const planeAvatar = document.getElementById('atc-plane-avatar');
    const flightPathFill = document.getElementById('atc-flight-path-fill');
    if (planeAvatar) planeAvatar.style.bottom = flightRenderPct + '%';
    if (flightPathFill) flightPathFill.style.height = flightRenderPct + '%';
    
    if (document.getElementById('atc-cockpit-gpw-pct')) document.getElementById('atc-cockpit-gpw-pct').innerText = Math.round(gpwPct) + '%';
    if (document.getElementById('atc-cockpit-ngpw-pct')) document.getElementById('atc-cockpit-ngpw-pct').innerText = Math.round(ngpwPct) + '%';
    if (document.getElementById('atc-cockpit-profit-pct')) document.getElementById('atc-cockpit-profit-pct').innerText = Math.round(profitPct) + '%';
    
    const statusText = document.getElementById('atc-cockpit-status-text');
    if (statusText) {
        let dest = "Malang";
        if (flightPct >= 33 && flightPct < 66) dest = "Jepang";
        else if (flightPct >= 66) dest = "Santorini";
        const activeUser = sessionStorage.getItem('pa_active_user') ? JSON.parse(sessionStorage.getItem('pa_active_user')) : { name: "Agen" };
        statusText.innerText = `Kapten ${activeUser.name.split(' ')[0]} — Penerbangan menuju ${dest} (${Math.round(flightPct)}% Jarak Tempuh)`;
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
    const selected = dropdown ? dropdown.value : "Semua Produk";
    const data = window.manifestData[selected] || window.manifestData["Semua Produk"];
    
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('atc-gpw-target',     data.gpw.target + ' Juta');
    set('atc-gpw-tercapai',   data.gpw.tercapai + ' Juta');
    set('atc-gpw-kurang',     Math.max(0, data.gpw.target - data.gpw.tercapai) + ' Juta');
    set('atc-ngpw-target',    data.ngpw.target + ' Juta');
    set('atc-ngpw-tercapai',  data.ngpw.tercapai + ' Juta');
    set('atc-ngpw-kurang',    Math.max(0, data.ngpw.target - data.ngpw.tercapai) + ' Juta');
    set('atc-profit-target',  data.profit.target + ' Juta');
    set('atc-profit-tercapai',data.profit.tercapai + ' Juta');
    set('atc-profit-kurang',  Math.max(0, data.profit.target - data.profit.tercapai) + ' Juta');
};

window.selectATCTarget = function(dest, points) {
    const cards = document.querySelectorAll('.target-card');
    cards.forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById('target-card-' + dest);
    if (activeCard) activeCard.classList.add('active');
    localStorage.setItem('atc_selected_target', JSON.stringify({ name: dest, points: points }));
    alert('\\u2708\\uFE0F Target Kunci berhasil diset ke: ' + dest.toUpperCase() + ' (' + points.toLocaleString('id-ID') + ' ARP)!');
};

// Restore selected ATC target card on DOMContentLoaded
(function() {
    function restoreATCTarget() {
        const stored = localStorage.getItem('atc_selected_target');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const activeCard = document.getElementById('target-card-' + parsed.name);
                if (activeCard) activeCard.classList.add('active');
            } catch(e) {}
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreATCTarget);
    } else {
        restoreATCTarget();
    }
})();
"""

# Append to end of app.js (before last line or just at the end)
if "renderATCGamification" not in js:
    js = js + atc_js_functions
    print("SUCCESS: Appended ATC JS functions to app.js")
else:
    print("NOTE: ATC JS functions already exist in app.js, skipping")

# ============================================================
# FIX 7: Remove duplicate inline script tag from index.html that
# was added in previous session (the navigateTo interceptor)
# ============================================================

with open(index_html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove the old inline script block that was appended
old_inline_script = """  <script>
    // ATC Target selection logic
    window.selectATCTarget = function(dest, points) {"""

if old_inline_script in html:
    # Find and remove the entire script block
    script_start = html.rfind('<script>')
    # Only remove if it's the inline ATC script we added
    snippet = html[script_start:script_start+80]
    if 'ATC Target selection logic' in html[script_start:script_start+200]:
        script_end = html.find('</script>', script_start) + len('</script>')
        html = html[:script_start].rstrip() + '\n</body>'
        print("SUCCESS: Removed old inline script from index.html")
    else:
        print("NOTE: Last <script> tag is not the ATC inline script, leaving it")
else:
    print("NOTE: Old inline ATC script not found, skipping removal")

with open(index_html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("SUCCESS: index.html final save complete")

with open(app_js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("SUCCESS: app.js saved")

print("\n=== ALL FIXES APPLIED ===")
