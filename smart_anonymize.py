import os
import glob
import pandas as pd
import numpy as np
import re

source_dir = r"C:\Proge_(laptop)\RStudio\ProSystem OÜ\prosystem-andmed"
dest_dir = r"C:\Proge_(laptop)\Python\arianaluutika-grupitoo\Grupikaaslastele\andmed"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

person_map = {}
client_map = {}
project_map = {}
counter_person = 1
counter_client = 1
counter_proj = 1

def clean_kirjeldus(val):
    val_str = str(val).lower()
    if "valgusti" in val_str: return "Valgustid ja tarvikud"
    if "kaabel" in val_str or "kaabli" in val_str: return "Kaabel ja paigaldusmaterjal"
    if "materjal" in val_str: return "Abimaterjalid"
    if "kinniti" in val_str or "kruvi" in val_str or "tüübel" in val_str: return "Kinnitusvahendid"
    if "remont" in val_str: return "Remonditööd"
    if "akt" in val_str: return "Teostatud tööd (akt)"
    if "pakkumis" in val_str or "hinnapakkum" in val_str: return "Tööd vastavalt hinnapakkumisele"
    if "projekt" in val_str: return "Projekteerimistööd"
    if "kinnad" in val_str or "kindad" in val_str: return "Töökindad"
    if "tagatis" in val_str: return "Ehitusaegne tagatis"
    
    if str(val).isupper():
        words = str(val).split()
        if words:
            return words[0].capitalize()
            
    words = str(val).split()
    if len(words) > 3:
        return " ".join(words[:2]) + "..."
    return val

def normalize_name(n):
    n = str(n).strip()
    if ',' in n:
        parts = n.split(',')
        return f"{parts[1].strip()} {parts[0].strip()}".upper()
    return n.upper()

def anonymize_cell(col_name, val):
    global counter_person, counter_client, counter_proj
    if pd.isnull(val):
        return val
        
    val_str = str(val).strip()
    if not val_str:
        return val
        
    if val_str.lower() in ["isik", "projekt", "projekti kood", "nimetus", "konto nimetus", "klient/tarnija", "töötaja nimi", "tööaeg"]:
        return val_str
        
    col_lower = str(col_name).lower()
    
    if "isik" in col_lower or re.match(r'^[A-ZŠŽÜÕÖÄ]+\s*,\s*[A-ZŠŽÜÕÖÄa-zšžüõöä]+$', val_str) or normalize_name(val_str) in person_map:
        norm_val = normalize_name(val_str)
        if norm_val not in person_map:
            import random
            if not hasattr(anonymize_cell, 'names_pool'):
                firsts = ["Marek", "Kristo", "Martin", "Andres", "Jaanus", "Tarmo", "Peeter", "Margus", "Raido", "Kaspar", "Marko", "Oliver", "Rasmus", "Sander", "Toomas", "Lauri", "Siim", "Taavi", "Rene", "Tõnis", "Laura", "Kadri", "Kati", "Anna"]
                lasts = ["Tamm", "Mägi", "Kask", "Kukk", "Ilves", "Karu", "Pärn", "Lepp", "Lepik", "Oja", "Raud", "Koppel", "Kuusk", "Luik", "Rebane", "Sepp", "Põder", "Saar"]
                anonymize_cell.names_pool = [f"{f} {l}" for f in firsts for l in lasts]
                random.seed(42)
                random.shuffle(anonymize_cell.names_pool)
            
            if anonymize_cell.names_pool:
                person_map[norm_val] = anonymize_cell.names_pool.pop()
            else:
                person_map[norm_val] = f"Töötaja {counter_person}"
            counter_person += 1
        return person_map[norm_val]
        
    if "klient" in col_lower or "tarnija" in col_lower:
        if val_str not in client_map:
            client_map[val_str] = f"Partner {counter_client}"
            counter_client += 1
        return client_map[val_str]
        
    if "projekt" in col_lower or "nimetus" in col_lower:
        if val_str == "Projekt" or val_str == "projekt": return val_str
        if val_str not in project_map:
            match = re.match(r'^([A-Za-z0-9]+)', val_str)
            if match:
                project_map[val_str] = f"{match.group(1)} Projekt {counter_proj}"
            else:
                project_map[val_str] = f"Projekt {counter_proj}"
            counter_proj += 1
        return project_map[val_str]
        
    if "kirjeldus" in col_lower or "märkmed" in col_lower:
        return clean_kirjeldus(val_str)
        
    if "konto nimetus" in col_lower:
        v = val_str.replace("Veiko", "").replace("Asko", "").strip()
        return v
        
    if isinstance(val, str):
        v = val.replace("ProSystem", "DataCorp").replace("PROSYSTEM", "DATACORP")
        v = v.replace("Elektrilabor", "TestLab").replace("ELEKTRILABOR", "TESTLAB")
        return v

    return val

for filepath in glob.glob(os.path.join(source_dir, "*.xlsx")):
    filename = os.path.basename(filepath)
    new_filename = filename.replace("ProSystem", "DataCorp").replace("PROSYSTEM", "DATACORP").replace("Elektrilabor", "TestLab")
    dest_path = os.path.join(dest_dir, new_filename)
    print(f"Processing {filename} -> {new_filename}")
    
    try:
        xls = pd.ExcelFile(filepath)
        with pd.ExcelWriter(dest_path) as writer:
            for sheet_name in xls.sheet_names:
                df = pd.read_excel(xls, sheet_name=sheet_name)
                
                new_cols = []
                for col in df.columns:
                    c = str(col).replace("ProSystem", "DataCorp").replace("Elektrilabor", "TestLab")
                    new_cols.append(c)
                df.columns = new_cols
                
                for col in df.columns:
                    col_lower = str(col).lower()
                    if pd.api.types.is_numeric_dtype(df[col]) and not any(k in col_lower for k in ['kuu', 'aasta', 'arvestus']):
                        scale_factor = np.random.uniform(0.7, 1.3)
                        df[col] = df[col].apply(lambda x: x * scale_factor if pd.notnull(x) else x)
                    elif pd.api.types.is_string_dtype(df[col]) or pd.api.types.is_object_dtype(df[col]):
                        df[col] = df[col].apply(lambda x: anonymize_cell(col, x))
                        
                df.to_excel(writer, sheet_name=sheet_name, index=False)
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Done processing Excel files.")
