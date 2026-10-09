import os
import json
import re
from pypdf import PdfReader

def clean_text(text):
    # Remove excessive newlines and spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_pdfs():
    pdf_dir = r"d:\AI\Antigravity\materi_pdf"
    output_file = r"d:\AI\Antigravity\materi_pdf_text.json"
    
    if not os.path.exists(pdf_dir):
        print(f"Error: Directory {pdf_dir} does not exist.")
        return
        
    chunks = []
    
    for filename in os.listdir(pdf_dir):
        if filename.lower().endswith('.pdf'):
            file_path = os.path.join(pdf_dir, filename)
            print(f"Extracting: {filename}")
            try:
                reader = PdfReader(file_path)
                for page_idx, page in enumerate(reader.pages):
                    text = page.extract_text()
                    if text:
                        cleaned = clean_text(text)
                        if len(cleaned) > 50:  # skip pages with very little text
                            chunks.append({
                                "source": filename,
                                "page": page_idx + 1,
                                "text": cleaned
                            })
            except Exception as e:
                print(f"Error reading {filename}: {e}")
                
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully extracted {len(chunks)} pages/chunks to {output_file}")

if __name__ == '__main__':
    extract_pdfs()
