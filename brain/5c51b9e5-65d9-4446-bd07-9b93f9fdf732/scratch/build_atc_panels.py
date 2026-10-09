import os

workspace_dir = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace_dir, "index.html")
asm_style_path = os.path.join(workspace_dir, "asm-style.css")

# 1. Append custom CSS to asm-style.css
css_to_add = """
/* ==================== AGENCY TOUR CONTEST (ATC) ==================== */
.target-card {
  border: 2px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--card-bg, #ffffff);
}
.target-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.05));
  border-color: var(--primary-blue);
}
.target-card.active {
  border-color: var(--primary-blue);
  background: rgba(37, 99, 235, 0.08);
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.15);
}
"""

with open(asm_style_path, "r", encoding="utf-8") as f:
    style_content = f.read()

if "AGENCY TOUR CONTEST (ATC)" not in style_content:
    with open(asm_style_path, "a", encoding="utf-8") as f:
        f.write(css_to_add)
    print("Success: Appended ATC styles to asm-style.css")
else:
    print("Note: ATC styles already exist in asm-style.css")

# 2. Modify index.html
with open(index_html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Target dashboard elements to move (uncommented before in page-dashboard)
nl = "\r\n" if "\r\n" in html_content else "\n"

# Let's locate the Detail Pencapaian Kontes card and cockpit container in index.html
# We want to remove them from page-dashboard
target_detail_pencapaian = f"""        <div class="content-card" style="margin-bottom: 20px;">{nl}          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px;">{nl}            <h3 style="margin: 0;">Detail Pencapaian Kontes</h3>{nl}          </div>{nl}          <div style="margin-bottom: 15px;">{nl}            <label for="manifest-dropdown" style="font-size: 12px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 5px;">Pilih Manifes / Kategori Produk:</label>{nl}            <select id="manifest-dropdown" onchange="window.updateManifestData()" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 13px;">{nl}              <option value="Semua Produk">Semua Produk (Gabungan)</option>{nl}              <option value="Non SSC">Non SSC</option>{nl}              <option value="SSC">SSC</option>{nl}              <option value="Bonding">Bonding</option>{nl}            </select>{nl}          </div>{nl}          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">{nl}            <thead>{nl}              <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Indikator</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Target</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Tercapai</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Kurang</th>{nl}              </tr>{nl}            </thead>{nl}            <tbody>{nl}              <tr style="border-bottom: 1px solid var(--border-color);">{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">GPW</td>{nl}                <td style="padding: 8px 4px;" id="gpw-target">1 Miliar</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="gpw-tercapai">550 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">450 Juta</td>{nl}              </tr>{nl}              <tr style="border-bottom: 1px solid var(--border-color);">{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">NGPW</td>{nl}                <td style="padding: 8px 4px;" id="ngpw-target">800 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="ngpw-tercapai">450 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">350 Juta</td>{nl}              </tr>{nl}              <tr>{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">Profit</td>{nl}                <td style="padding: 8px 4px;" id="profit-target">200 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="profit-tercapai">120 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="profit-kurang">80 Juta</td>{nl}              </tr>{nl}            </tbody>{nl}          </table>{nl}        </div>{nl}{nl}        <div id="gamification-cockpit-container" style="margin-bottom: 20px;"></div>"""

# Check if target_detail_pencapaian exists in content
if target_detail_pencapaian in html_content:
    # Remove it from page-dashboard
    html_content = html_content.replace(target_detail_pencapaian, "", 1)
    print("Success: Removed detail pencapaian & cockpit from page-dashboard")
else:
    print("Warning: target_detail_pencapaian not found on page-dashboard!")

# HTML Structure to be added inside page-atc -> sub-atc-kokpit
atc_structure = f"""        <!-- Panel Atas: Kunci Target -->{nl}        <div class="target-row" style="display: flex; gap: 16px; margin-bottom: 20px;">{nl}          <div class="content-card target-card" onclick="selectATCTarget('malang', 2800)" style="flex: 1; cursor: pointer; text-align: center; transition: all 0.3s; padding: 15px;" id="target-card-malang">{nl}            <div style="font-size: 24px; margin-bottom: 8px;">🌋</div>{nl}            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">Malang + Bromo</h4>{nl}            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">2.800 ARP</span>{nl}          </div>{nl}          <div class="content-card target-card" onclick="selectATCTarget('japan', 6500)" style="flex: 1; cursor: pointer; text-align: center; transition: all 0.3s; padding: 15px;" id="target-card-japan">{nl}            <div style="font-size: 24px; margin-bottom: 8px;">❄️</div>{nl}            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">Japan Ski Adventure</h4>{nl}            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">6.500 ARP</span>{nl}          </div>{nl}          <div class="content-card target-card" onclick="selectATCTarget('santorini', 14500)" style="flex: 1; cursor: pointer; text-align: center; transition: all 0.3s; padding: 15px;" id="target-card-santorini">{nl}            <div style="font-size: 24px; margin-bottom: 8px;">🇬🇷</div>{nl}            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">Santorini - Yunani</h4>{nl}            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">14.500 ARP</span>{nl}          </div>{nl}        </div>{nl}{nl}        <!-- Panel Tengah: Kokpit Gamifikasi -->{nl}        <div id="gamification-cockpit-container" style="margin-bottom: 20px;"></div>{nl}{nl}        <!-- Panel Bawah: Tabel Pencapaian -->{nl}        <div class="content-card" style="margin-bottom: 20px;">{nl}          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px;">{nl}            <h3 style="margin: 0;">Detail Pencapaian Kontes</h3>{nl}          </div>{nl}          <div style="margin-bottom: 15px;">{nl}            <label for="manifest-dropdown" style="font-size: 12px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 5px;">Pilih Manifes / Kategori Produk:</label>{nl}            <select id="manifest-dropdown" onchange="window.updateManifestData()" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 13px;">{nl}              <option value="Semua Produk">Semua Produk (Gabungan)</option>{nl}              <option value="Non SSC">Non SSC</option>{nl}              <option value="SSC">SSC</option>{nl}              <option value="Bonding">Bonding</option>{nl}            </select>{nl}          </div>{nl}          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">{nl}            <thead>{nl}              <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Indikator</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Target</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Tercapai</th>{nl}                <th style="padding: 8px 4px; color: var(--text-muted);">Kurang</th>{nl}              </tr>{nl}            </thead>{nl}            <tbody>{nl}              <tr style="border-bottom: 1px solid var(--border-color);">{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">GPW</td>{nl}                <td style="padding: 8px 4px;" id="gpw-target">1 Miliar</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="gpw-tercapai">550 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">450 Juta</td>{nl}              </tr>{nl}              <tr style="border-bottom: 1px solid var(--border-color);">{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">NGPW</td>{nl}                <td style="padding: 8px 4px;" id="ngpw-target">800 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="ngpw-tercapai">450 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">350 Juta</td>{nl}              </tr>{nl}              <tr>{nl}                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">Profit</td>{nl}                <td style="padding: 8px 4px;" id="profit-target">200 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="profit-tercapai">120 Juta</td>{nl}                <td style="padding: 8px 4px; color: var(--danger-red);" id="profit-kurang">80 Juta</td>{nl}              </tr>{nl}            </tbody>{nl}          </table>{nl}        </div>"""

target_sub_atc = f"""        <div id="sub-atc-kokpit">{nl}          <!-- Kokpit ATC content will be loaded here -->{nl}        </div>"""

# Replace in index.html
if target_sub_atc in html_content:
    html_content = html_content.replace(target_sub_atc, f'<div id="sub-atc-kokpit">{nl}{atc_structure}{nl}        </div>', 1)
    print("Success: Populated #sub-atc-kokpit with 3 panels")
else:
    print("Error: #sub-atc-kokpit target not found!")

# 3. Add script block right before </body>
script_block = f"""  <script>{nl}    // ATC Target selection logic{nl}    window.selectATCTarget = function(dest, points) {{{nl}      // Remove active class from all target-cards{nl}      const cards = document.querySelectorAll('.target-card');{nl}      cards.forEach(card => card.classList.remove('active'));{nl}      {nl}      // Add active class to selected card{nl}      const activeCard = document.getElementById('target-card-' + dest);{nl}      if (activeCard) {{{nl}        activeCard.classList.add('active');{nl}      }}{nl}      {nl}      // Save to localStorage{nl}      localStorage.setItem('atc_selected_target', JSON.stringify({{ name: dest, points: points }}));{nl}      console.log("[ATC] Target dikunci: " + dest + " dengan target " + points + " ARP.");{nl}      {nl}      if (typeof window.confetti === 'function') {{{nl}        window.confetti({{ particleCount: 35, spread: 50 }});{nl}      }}{nl}      alert('Target Kunci berhasil diset ke: ' + dest.toUpperCase() + ' (' + points + ' ARP)!');{nl}    }};{nl}    {nl}    // Extend window.navigateTo to render cockpit dynamically{nl}    const originalNavigateTo = window.navigateTo;{nl}    window.navigateTo = function(pageId) {{{nl}      if (typeof originalNavigateTo === 'function') {{{nl}        originalNavigateTo(pageId);{nl}      }}{nl}      if (pageId === 'atc') {{{nl}        if (typeof window.renderGamification === 'function') {{{nl}          window.renderGamification();{nl}        }}{nl}        if (typeof window.updateManifestData === 'function') {{{nl}          window.updateManifestData();{nl}        }}{nl}      }}{nl}    }};{nl}    {nl}    // Retrieve selected target on page load{nl}    document.addEventListener('DOMContentLoaded', () => {{{nl}      const stored = localStorage.getItem('atc_selected_target');{nl}      if (stored) {{{nl}        try {{{nl}          const parsed = JSON.parse(stored);{nl}          const activeCard = document.getElementById('target-card-' + parsed.name);{nl}          if (activeCard) {{{nl}            activeCard.classList.add('active');{nl}          }}{nl}        }} catch(e) {{{nl}          console.error(e);{nl}        }}{nl}      }}{nl}    }});{nl}  </script>{nl}</body>"""

target_body_end = f"""</body>"""

if target_body_end in html_content and "selectATCTarget" not in html_content:
    # Use rsplit or replace with 1 to target the last body tag
    html_content = html_content.replace(target_body_end, script_block, 1)
    print("Success: Appended ATC script block to index.html")

with open(index_html_path, "w", encoding="utf-8") as f:
    html_content = f.write(html_content)
