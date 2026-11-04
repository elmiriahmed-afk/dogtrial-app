"""Adds the 10 new breeds (150 capsules) to www/capsules.js and converts their images to www/media/capsules/*.webp.
Source: the ChatGPT/Codex capsule project (storyboard.json per capsule). Run from anywhere:  python3 build_new_breeds.py
Existing capsules are kept byte-for-byte; new ones are appended after them."""
import glob, hashlib, io, json, os, re, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from info_new_breeds_a import INFO_A
from info_new_breeds_b import INFO_B
from info_new_breeds_c import INFO_C
INFO = {**INFO_A, **INFO_B, **INFO_C}
SRC = os.environ.get("CAPSULE_SRC") or os.path.expanduser("~/.codex/visualizations/2026/10/14/01a13a7e-b97c-73f2-91f3-6d3ee0dcdd8a/dogtrial-10-nouvelles-races-150-capsules/")
WWW = os.path.join(HERE, "..", "..", "www")
BREEDS = ["golden", "poodle", "rottweiler", "beagle", "dachshund", "yorkie", "shihtzu", "boxer", "cavalier", "jackrussell"]
NAMES = {1: "activite", 2: "apprentissages", 3: "repos", 4: "solitude", 5: "socialisation", 6: "vigilance", 7: "sante-a", 8: "sante-b", 9: "sante-c", 10: "sante-d", 11: "poids", 12: "enfants", 13: "cohabitation", 14: "documents", 15: "engagement"}
GENERIC = {1: ("Daily activity", "Activité au quotidien"), 2: ("Learning and thinking", "Apprendre et réfléchir"), 3: ("Rest and sleep", "Repos et sommeil"),
  4: ("Learning to be alone", "Apprendre à rester seul"), 5: ("Discovering without forcing", "Découvrir sans forcer"), 6: ("Coat, skin and ears", "Pelage, peau et oreilles"),
  11: ("Weight and feeding", "Poids et alimentation"), 12: ("Children and dog", "Enfants et chien"), 13: ("Other animals", "Autres animaux"),
  14: ("Documents before adoption", "Documents avant l’adoption"), 15: ("Preparing life together", "Préparer la vie ensemble")}
HEALTH = {  # capsule number -> breed -> (EN, FR)
 7: {"golden": ("Hips", "Hanches"), "poodle": ("Hips", "Hanches"), "rottweiler": ("Hips", "Hanches"), "beagle": ("Hips", "Hanches"), "dachshund": ("Back and discs", "Dos et disques"),
     "yorkie": ("Teeth and gums", "Dents et gencives"), "shihtzu": ("Eyes and corneas", "Yeux et cornée"), "boxer": ("Heart muscle", "Muscle cardiaque"), "cavalier": ("Heart valve", "Valve du cœur"), "jackrussell": ("Lens luxation", "Luxation du cristallin")},
 8: {"golden": ("Elbows", "Coudes"), "rottweiler": ("Elbows", "Coudes"), "poodle": ("Skin and glands", "Peau et glandes"), "beagle": ("Thyroid", "Thyroïde"), "dachshund": ("Kneecaps", "Rotules"),
     "yorkie": ("Kneecaps", "Rotules"), "shihtzu": ("Breathing", "Respiration"), "boxer": ("Heart outflow", "Sortie du cœur"), "cavalier": ("Spinal cord", "Moelle épinière"), "jackrussell": ("Ataxia (LOA)", "Ataxie (LOA)")},
 9: {"golden": ("Eyes and uveitis", "Yeux et uvéite"), "poodle": ("Eyes", "Yeux"), "rottweiler": ("Eyes", "Yeux"), "beagle": ("Eyes", "Yeux"), "dachshund": ("Eyes", "Yeux"), "yorkie": ("Eyes", "Yeux"),
     "shihtzu": ("Kneecaps", "Rotules"), "boxer": ("Joints", "Articulations"), "cavalier": ("Cataracts", "Cataracte"), "jackrussell": ("Ataxia (SCA)", "Ataxie (SCA)")},
 10: {"golden": ("Heart", "Cœur"), "poodle": ("Bloat", "Dilatation-torsion"), "rottweiler": ("Heart", "Cœur"), "beagle": ("MLS", "MLS"), "dachshund": ("Heart", "Cœur"), "yorkie": ("Liver shunt", "Shunt hépatique"),
      "shihtzu": ("Kidneys", "Reins"), "boxer": ("Thyroid", "Thyroïde"), "cavalier": ("Retina", "Rétine"), "jackrussell": ("Hearing", "Audition")}}
LABEL = {"akc.org": "AKC", "cdn.akc.org": "AKC", "aaha.org": "AAHA", "dogstrust.org.uk": "Dogs Trust", "royalkennelclub.com": "The Kennel Club", "grca.org": "GRCA", "amrottclub.org": "American Rottweiler Club",
  "thecavalierclub.co.uk": "The Cavalier Club", "poodleclubofamerica.org": "Poodle Club of America", "americanboxerclub.org": "American Boxer Club", "nationalbeagleclub.org": "National Beagle Club",
  "wmytc.org": "Yorkshire Terrier Club of America", "acvs.org": "ACVS", "rvc.ac.uk": "Royal Veterinary College", "vet.cornell.edu": "Cornell Vet", "ofa.org": "OFA",
  "dachshundhealth.org.uk": "Dachshund Health UK", "therealjackrussell.com": "The Real Jack Russell", "s3.amazonaws.com": "American Shih Tzu Club", "pmc.ncbi.nlm.nih.gov": "PubMed Central",
  "vgl.ucdavis.edu": "UC Davis VGL", "akcchf.org": "AKC CHF"}
DISC = ("General information, not a substitute for veterinary advice.", "Information générale, ne remplace pas l’avis d’un vétérinaire.")

def source_labels(path):
    out = []
    for x in json.load(open(path, encoding="utf-8")):
        u = x if isinstance(x, str) else x["url"]
        dom = re.sub(r"^https?://(www\.)?", "", u).split("/")[0]
        if dom not in LABEL: raise SystemExit("unknown source domain: " + dom)
        lab = LABEL[dom]
        if lab not in out: out.append(lab)
    return out[:3]

def frames_of(path):
    sb = json.load(open(path, encoding="utf-8"))
    if isinstance(sb, dict):
        return [dict(image=f["image"], en=f["textEn"], fr=f["textFr"]) for f in sb["frames"]]
    return [dict(image=f["image"], en=f["captionEn"], fr=f["captionFr"]) for f in sb]

def webp_name(png):
    im = Image.open(png).convert("RGB").resize((720, 1280), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "WEBP", quality=74, method=6); data = buf.getvalue()
    name = hashlib.sha1(data).hexdigest()[:10] + ".webp"
    p = os.path.join(WWW, "media", "capsules", name)
    if not os.path.exists(p): open(p, "wb").write(data)
    return "media/capsules/" + name, len(data)

def build():
    cap_js = os.path.join(WWW, "capsules.js")
    s = open(cap_js, encoding="utf-8").read()
    head = s[:s.index("var DT_CAPSULES")]
    arr = json.loads(s[s.index("["):s.rindex("]") + 1])
    arr = [c for c in arr if c["breeds"] not in BREEDS]          # idempotent re-run
    n = max(c["n"] for c in arr); total_bytes = 0; made = 0
    for b in BREEDS:
        for num in range(1, 16):
            folder = os.path.join(SRC, b, f"{num:02d}-{NAMES[num]}")
            fr = frames_of(os.path.join(folder, "storyboard.json")); assert len(fr) == 6, folder
            labs = source_labels(os.path.join(folder, "sources.json"))
            imgs = []
            for i, f in enumerate(fr):
                src, size = webp_name(os.path.join(folder, f["image"])); total_bytes += size
                imgs.append({"src": src, "start": i * 5, "end": i * 5 + 5, "s0": 1, "s1": 1.03, "p0": 0, "p1": 0, "ox": 0.5, "oy": 0.5})
            texts = []
            for i, f in enumerate(fr[:5]):
                body = INFO[f["en"]]
                texts.append({"id": f"t{i+1}", "start": round(i * 5 + 0.2, 1), "end": round(i * 5 + 4.8, 1), "persist": False,
                              "lines": [{"en": f["en"], "fr": f["fr"], "kind": "title"}, {"en": body[0], "fr": body[1], "kind": "body"}]})
            last = fr[5]
            texts.append({"id": "t6", "start": 25, "end": 30, "persist": True, "fastIn": 0.4,
                          "lines": [{"en": last["en"], "fr": last["fr"], "kind": "title"}, {"en": DISC[0], "fr": DISC[1], "kind": "small"},
                                    {"en": "Sources: " + ", ".join(labs), "fr": "Sources : " + ", ".join(labs), "kind": "source"}]})
            t = HEALTH[num][b] if num in HEALTH else GENERIC[num]
            n += 1
            arr.append({"id": f"{b}-{num:02d}-{NAMES[num]}", "n": n, "breeds": b, "title": {"en": t[0], "fr": t[1]}, "duration": 30,
                        "xf": 0.4, "textIn": 0.4, "textOut": 0.3, "fadeInFirst": 0.5, "images": imgs, "texts": texts})
            made += 1
    head = head.replace("Generated from the capsule builds on 2026-10-15.", "Generated from the capsule builds on 2026-10-15; the 10 added breeds (golden … jackrussell) on 2026-11-04.")
    open(cap_js, "w", encoding="utf-8").write(head + "var DT_CAPSULES = " + json.dumps(arr, ensure_ascii=False, indent=1) + ";\n")
    print("capsules added:", made, "| total:", len(arr), "| new images:", made * 6, "| size:", round(total_bytes / 1e6, 1), "MB")
if __name__ == "__main__":
    build()
