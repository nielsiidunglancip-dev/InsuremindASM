import os

workspace_dir = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace_dir, "index.html")

with open(index_html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Target section to replace
target = """        </div>

      </section>"""

# We need to handle both \n and \r\n
if "\r\n" in content:
    target = target.replace("\n", "\r\n")

replacement = """        </div>

        <!-- ELEMEN PENJUALAN -->
        <div class="content-card" style="margin-bottom: 20px;">
          <div class="card-header">
            <h3>Grafik Tren Produksi & Komisi</h3>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom: 16px;">
            <div>
              <div style="font-size:11px; color:var(--text-muted);">Total GPW (YTD)</div>
              <div style="font-size:18px; font-weight:800; color:var(--primary-navy);" id="chart-total-gpw">Rp 0</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; color:var(--text-muted);">Total Komisi</div>
              <div style="font-size:18px; font-weight:800; color:var(--success-green);" id="chart-total-komisi">Rp 0</div>
            </div>
          </div>
          <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:4px; height:150px; padding-bottom:20px; border-bottom:1px solid var(--border-color); position:relative;" id="production-chart-container"></div>
        </div>
        
        <div class="content-card" style="margin-bottom: 20px;">
          <div class="card-header">
            <h3 id="contest-title">Target Kontes Wisata</h3>
          </div>
          <div style="text-align:center; padding: 10px 0;">
            <div style="position:relative; width:120px; height:120px; margin:0 auto 16px;">
              <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform: rotate(-90deg);">
                <path style="fill:none; stroke:var(--border-color); stroke-width:3;" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="contest-progress-path" style="fill:none; stroke:var(--primary-blue); stroke-width:3; stroke-dasharray:0, 100; transition: stroke-dasharray 1s ease-out;" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <span id="contest-pct-text" style="font-size:20px; font-weight:800; color:var(--primary-navy);">0%</span>
              </div>
            </div>
            <h4 style="font-size:14px; font-weight:700; margin-bottom:4px;" id="contest-name">Nama Kontes</h4>
            <p style="font-size:12px; color:var(--text-muted);" id="contest-desc">Target: Rp 0 / Rp 0</p>
          </div>
        </div>

        <div class="content-card" style="margin-bottom: 20px;">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px;">
            <h3 style="margin: 0;">Detail Pencapaian Kontes</h3>
          </div>
          <div style="margin-bottom: 15px;">
            <label for="manifest-dropdown" style="font-size: 12px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 5px;">Pilih Manifes / Kategori Produk:</label>
            <select id="manifest-dropdown" onchange="window.updateManifestData()" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-family: inherit; font-size: 13px;">
              <option value="Semua Produk">Semua Produk (Gabungan)</option>
              <option value="Non SSC">Non SSC</option>
              <option value="SSC">SSC</option>
              <option value="Bonding">Bonding</option>
            </select>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                <th style="padding: 8px 4px; color: var(--text-muted);">Indikator</th>
                <th style="padding: 8px 4px; color: var(--text-muted);">Target</th>
                <th style="padding: 8px 4px; color: var(--text-muted);">Tercapai</th>
                <th style="padding: 8px 4px; color: var(--text-muted);">Kurang</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">GPW</td>
                <td style="padding: 8px 4px;" id="gpw-target">1 Miliar</td>
                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="gpw-tercapai">550 Juta</td>
                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">450 Juta</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">NGPW</td>
                <td style="padding: 8px 4px;" id="ngpw-target">800 Juta</td>
                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="ngpw-tercapai">450 Juta</td>
                <td style="padding: 8px 4px; color: var(--danger-red);" id="gpw-kurang">350 Juta</td>
              </tr>
              <tr>
                <td style="padding: 8px 4px; font-weight: 700; color: var(--primary-navy);">Profit</td>
                <td style="padding: 8px 4px;" id="profit-target">200 Juta</td>
                <td style="padding: 8px 4px; color: var(--success-green); font-weight:600;" id="profit-tercapai">120 Juta</td>
                <td style="padding: 8px 4px; color: var(--danger-red);" id="profit-kurang">80 Juta</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="gamification-cockpit-container" style="margin-bottom: 20px;"></div>
      </section>"""

if "\r\n" in content:
    replacement = replacement.replace("\n", "\r\n")

if target in content:
    new_content = content.replace(target, replacement, 1)
    with open(index_html_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Success: Replaced the target section successfully!")
else:
    print("Error: Target section not found in index.html!")
