import os

workspace_dir = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace_dir, "index.html")

with open(index_html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Determine line endings
nl = "\r\n" if "\r\n" in content else "\n"

# 1. Target and replacement for the Sidebar Menu
target_sidebar = f"""              Coaching Agen{nl}            </button>{nl}          </div>{nl}        </div> <!-- End of agen-menu-group -->"""

replacement_sidebar = f"""              Coaching Agen{nl}            </button>{nl}          </div>{nl}{nl}          <button class="sidebar-link" id="nav-atc" onclick="navigateTo('atc')">{nl}            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"{nl}              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{nl}              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5S19 4 17.5 5.5L14 9 5.8 7.2c-.8-.2-1.6.3-1.8 1.1l-.5 2 7.7 3.3-3 3-4.6-.9c-.7-.1-1.4.3-1.6 1l-.3.9 4.3 2.1 2.1 4.3.9-.3c.7-.2 1.1-.9 1-1.6l-.9-4.6 3-3 3.3 7.7 2-.5c.8-.2 1.3-1 1.1-1.8z"/>{nl}            </svg>{nl}            Agency Tour Contest (ATC){nl}          </button>{nl}        </div> <!-- End of agen-menu-group -->"""

# 2. Target and replacement for the Page Container
target_page = f"""        <div id="gamification-cockpit-container" style="margin-bottom: 20px;"></div>{nl}      </section>{nl}{nl}      <!-- ==================== PAGE: MENU BELAJAR ASURANSI ==================== -->"""

replacement_page = f"""        <div id="gamification-cockpit-container" style="margin-bottom: 20px;"></div>{nl}      </section>{nl}{nl}      <!-- ==================== PAGE: AGENCY TOUR CONTEST (ATC) ==================== -->{nl}      <section id="page-atc" class="page-section page-content" style="display:none;">{nl}        <div class="page-heading">{nl}          <h2>Agency Tour Contest (ATC)</h2>{nl}          <p>Pantau status kelayakan penerbangan Anda menuju destinasi impian.</p>{nl}        </div>{nl}        <div id="sub-atc-kokpit">{nl}          <!-- Kokpit ATC content will be loaded here -->{nl}        </div>{nl}      </section>{nl}{nl}      <!-- ==================== PAGE: MENU BELAJAR ASURANSI ==================== -->"""

# Perform replacements
if target_sidebar in content and target_page in content:
    content = content.replace(target_sidebar, replacement_sidebar, 1)
    content = content.replace(target_page, replacement_page, 1)
    with open(index_html_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Success: Sidebar and Page updated successfully!")
else:
    if target_sidebar not in content:
        print("Error: target_sidebar not found!")
    if target_page not in content:
        print("Error: target_page not found!")
