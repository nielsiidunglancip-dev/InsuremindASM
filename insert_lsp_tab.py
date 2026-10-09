import sys

with open('index.html', encoding='utf-8') as f:
    content = f.read()

LSP_TAB_CONTENT = '''
        <!-- Tab: Pendaftaran Ujian LSP -->
        <div class="trn-content" id="trn-lsp-mgmt">
          <div class="content-card">
            <div class="card-header flex-header">
              <div>
                <h3>Pendaftaran Uji Kompetensi LSP</h3>
                <p style="font-size:13px; color:var(--text-muted); margin:4px 0 0;">Daftar agen yang mendaftar ujian sertifikasi. Klik tombol aksi untuk memperbarui status.</p>
              </div>
              <button onclick="window.renderLspRegistrations()" style="padding:6px 14px; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; cursor:pointer; font-weight:600; color:#475569;">Refresh</button>
            </div>
            <div class="table-responsive" style="margin-top:16px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Kode Agen</th>
                    <th>Nama</th>
                    <th>Skema</th>
                    <th>Tgl Daftar</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="lsp-registrations-tbody">
                  <tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada data pendaftar.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
'''

MARKER = 'id="page-trainer-sertifikat"'
insert_pos = content.find(MARKER)
if insert_pos == -1:
    print("MARKER NOT FOUND"); sys.exit(1)

# find the start of that section comment/tag line
section_start = content.rfind('\n', 0, insert_pos) + 1

new_content = content[:section_start] + LSP_TAB_CONTENT + content[section_start:]
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("SUCCESS: LSP tab content inserted before page-trainer-sertifikat")
