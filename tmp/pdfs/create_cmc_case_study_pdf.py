from pathlib import Path
from textwrap import wrap

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "Comfort-Moving-Chicago-Case-Study.pdf"
ASSETS = ROOT / "public" / "images"

PAGE_W, PAGE_H = landscape(letter)
BG = colors.HexColor("#F5F3EE")
PAPER = colors.HexColor("#E8E4DD")
INK = colors.HexColor("#111111")
MUTED = colors.Color(17 / 255, 17 / 255, 17 / 255, alpha=0.68)
FAINT = colors.Color(17 / 255, 17 / 255, 17 / 255, alpha=0.12)
ACCENT = colors.HexColor("#E63B2E")
WHITE = colors.white

FONT_DIR = Path("C:/Windows/Fonts")
SANS = "Helvetica"
SANS_BOLD = "Helvetica-Bold"
SERIF = "Times-Italic"
MONO = "Courier"
MONO_BOLD = "Courier-Bold"

for name, file in [
    ("SpaceGrotesk", "arial.ttf"),
    ("SpaceGroteskBold", "arialbd.ttf"),
    ("DMSerifItalic", "timesi.ttf"),
]:
    p = FONT_DIR / file
    if p.exists():
        pdfmetrics.registerFont(TTFont(name, str(p)))

if "SpaceGrotesk" in pdfmetrics.getRegisteredFontNames():
    SANS = "SpaceGrotesk"
if "SpaceGroteskBold" in pdfmetrics.getRegisteredFontNames():
    SANS_BOLD = "SpaceGroteskBold"
if "DMSerifItalic" in pdfmetrics.getRegisteredFontNames():
    SERIF = "DMSerifItalic"


def hex_alpha(hex_color, alpha):
    c = colors.HexColor(hex_color)
    return colors.Color(c.red, c.green, c.blue, alpha=alpha)


def set_fill(c, color):
    c.setFillColor(color)


def set_stroke(c, color):
    c.setStrokeColor(color)


def draw_page_bg(c):
    set_fill(c, BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def image_reader(path):
    return ImageReader(str(path))


def draw_image_cover(c, path, x, y, w, h, opacity=1.0, align_x=0.5, align_y=0.5):
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    sw, sh = int(w / scale), int(h / scale)
    left = int((iw - sw) * align_x)
    top = int((ih - sh) * (1 - align_y))
    crop = im.crop((left, top, left + sw, top + sh))
    tmp = ROOT / "tmp" / "pdfs" / f"crop_{path.stem}_{abs(hash((x, y, w, h))) % 999999}.jpg"
    crop.save(tmp, quality=94)
    c.saveState()
    if opacity < 1:
        c.setFillAlpha(opacity)
        c.setStrokeAlpha(opacity)
    c.drawImage(image_reader(tmp), x, y, w, h, preserveAspectRatio=False, mask="auto")
    c.restoreState()


def overlay(c, color, x=0, y=0, w=PAGE_W, h=PAGE_H):
    c.saveState()
    set_fill(c, color)
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.restoreState()


def text(c, s, x, y, size=14, font=SANS, color=INK, leading=None, max_width=None):
    c.saveState()
    c.setFont(font, size)
    set_fill(c, color)
    if max_width:
        avg = size * 0.48
        chars = max(10, int(max_width / avg))
        line_h = leading or size * 1.28
        for i, line in enumerate(wrap(s, chars)):
            c.drawString(x, y - i * line_h, line)
        c.restoreState()
        return y - max(0, len(wrap(s, chars)) - 1) * (leading or size * 1.28)
    c.drawString(x, y, s)
    c.restoreState()
    return y


def centered_text(c, s, x, y, w, size=14, font=SANS, color=INK):
    c.saveState()
    c.setFont(font, size)
    set_fill(c, color)
    c.drawCentredString(x + w / 2, y, s)
    c.restoreState()


def heading(c, number, title, x=72, y=468):
    text(c, number, x, y, 14, MONO_BOLD, ACCENT)
    text(c, title, x + 34, y - 2, 28, SANS_BOLD, INK)


def pill(c, label, x, y, pad_x=14, pad_y=7, fill=PAPER, stroke=FAINT, color=INK):
    c.saveState()
    c.setFont(SANS_BOLD, 10)
    w = c.stringWidth(label, SANS_BOLD, 10) + pad_x * 2
    h = 22
    set_fill(c, fill)
    set_stroke(c, stroke)
    c.roundRect(x, y, w, h, h / 2, fill=1, stroke=1)
    set_fill(c, color)
    c.drawString(x + pad_x, y + pad_y, label)
    c.restoreState()
    return x + w + 8


def card(c, x, y, w, h, fill=PAPER, stroke=FAINT, radius=22):
    c.saveState()
    set_fill(c, fill)
    set_stroke(c, stroke)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1)
    c.restoreState()


def footer(c, page_num):
    c.saveState()
    set_stroke(c, hex_alpha("#111111", 0.12))
    c.line(72, 42, PAGE_W - 72, 42)
    text(c, "Obskura Digital Marketing", 72, 24, 8.5, MONO, hex_alpha("#111111", 0.56))
    centered_text(c, f"{page_num:02d}", PAGE_W - 96, 24, 24, 8.5, MONO, hex_alpha("#111111", 0.56))
    c.restoreState()


def brand(c, x=72, y=545, dark=True):
    # Small mark approximation inspired by the site SVG, plus wordmark.
    c.saveState()
    for i, col in enumerate(["#3B7DB8", "#F15B26", "#F8EE68"]):
        set_fill(c, colors.HexColor(col))
        c.circle(x + i * 8, y + 2, 3, fill=1, stroke=0)
    text(c, "Obskura", x + 34, y - 2, 16, SANS_BOLD, INK if dark else WHITE)
    c.restoreState()


def bullets(c, items, x, y, width, size=14, gap=28, color=MUTED):
    cy = y
    for item in items:
        set_fill(c, ACCENT)
        c.circle(x, cy + 5, 3.2, fill=1, stroke=0)
        cy = text(c, item, x + 14, cy, size, SANS, color, leading=size * 1.28, max_width=width - 14) - gap
    return cy


def cover(c):
    draw_page_bg(c)
    draw_image_cover(c, ASSETS / "ChicagoSkylineNorthside.png", 0, 0, PAGE_W, PAGE_H, opacity=0.9, align_y=0.54)
    overlay(c, colors.Color(245 / 255, 243 / 255, 238 / 255, alpha=0.38))
    overlay(c, colors.Color(245 / 255, 243 / 255, 238 / 255, alpha=0.22), 0, 0, PAGE_W * 0.52, PAGE_H)
    brand(c, 72, 548)
    pill(c, "CASE STUDY // LOCAL SERVICES", 72, 438, fill=WHITE, color=ACCENT)
    text(c, "Comfort Moving", 72, 372, 54, SERIF, INK)
    text(c, "Chicago", 72, 314, 54, SERIF, INK)
    text(
        c,
        "Ad creative, Meta ads, influencer partnerships, custom CRM infrastructure, and SEO working as one direct-response growth system.",
        72,
        258,
        18,
        SANS_BOLD,
        hex_alpha("#111111", 0.78),
        leading=25,
        max_width=420,
    )
    card(c, 548, 78, 192, 118, fill=WHITE, radius=24)
    text(c, "EARLY RESULT", 572, 156, 8.5, MONO, hex_alpha("#111111", 0.5))
    text(c, "16x ROAS", 572, 126, 28, SANS_BOLD, INK)
    text(c, "in the first two months", 572, 100, 11, SANS, MUTED)
    footer(c, 1)


def challenge(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "01", "The Growth Problem", 72, 468)
    text(
        c,
        "Comfort Moving needed more than a prettier website. The company needed a dependable inbound system in one of Chicago's most competitive local service categories.",
        72,
        412,
        19,
        SANS_BOLD,
        INK,
        leading=28,
        max_width=430,
    )
    bullets(
        c,
        [
            "Word-of-mouth and flyers created some momentum, but they were inconsistent and hard to forecast.",
            "Local search visibility needed to match how quote-ready Chicago customers actually search.",
            "Leads needed a faster path from inquiry to quote, contract, payment, review request, and booked move.",
        ],
        86,
        290,
        410,
        13.5,
    )
    card(c, 514, 142, 218, 248, fill=PAPER, radius=26)
    text(c, "Core shift", 546, 338, 12, MONO_BOLD, ACCENT)
    text(c, "From scattered demand", 546, 298, 22, SANS_BOLD, INK, max_width=158)
    text(c, "to owned acquisition.", 546, 206, 22, SANS_BOLD, INK, max_width=158)
    footer(c, 2)


def system(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "02", "The Connected System", 72, 468)
    text(c, "A connected growth system converted attention into booked work.", 72, 414, 15, SANS, MUTED, leading=22, max_width=650)
    blocks = [
        ("SEO", "Capture high-intent Chicago moving searches through service and neighborhood structure."),
        ("Ad Creative", "Produce photo and video assets that make the company credible before the first call."),
        ("Meta Ads", "Turn creative into measurable inbound demand with campaign management and testing."),
        ("Influencers", "Multiply reach with partner content that gives paid distribution more trust to amplify."),
        ("Custom CRM", "Centralize intake, contracts, payments, analytics, and follow-up in one operating layer."),
        ("Automation", "Trigger review requests and reduce lead leakage after inquiries and completed jobs."),
    ]
    x0, y0 = 72, 286
    for i, (title, body) in enumerate(blocks):
        col = i % 3
        row = i // 3
        x = x0 + col * 222
        y = y0 - row * 128
        card(c, x, y, 196, 112, fill=WHITE if i == 4 else PAPER, radius=20)
        text(c, title, x + 18, y + 74, 15, SANS_BOLD, INK)
        text(c, body, x + 18, y + 48, 9.3, SANS, MUTED, leading=12.2, max_width=154)
    footer(c, 3)


def creative(c):
    draw_page_bg(c)
    draw_image_cover(c, ASSETS / "ComfortMovingChicago.webp", 462, 84, 260, 370, opacity=1, align_x=0.44, align_y=0.5)
    overlay(c, colors.Color(245 / 255, 243 / 255, 238 / 255, alpha=0.08), 462, 84, 260, 370)
    brand(c)
    heading(c, "03", "Creative + Reach Multipliers", 72, 468)
    text(
        c,
        "Paid social performance needed more than media buying. Comfort Moving needed assets that looked real, local, useful, and trustworthy.",
        72,
        412,
        17,
        SANS_BOLD,
        INK,
        leading=25,
        max_width=330,
    )
    bullets(
        c,
        [
            "Photo and video assets were created for response, not vanity.",
            "Influencer partnerships helped multiply reach and added third-party trust.",
            "Meta campaigns used creative testing to find messages that converted attention into quote-ready leads.",
        ],
        86,
        284,
        326,
        13.5,
    )
    footer(c, 4)


def crm(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "04", "CRM Built To Scale", 72, 468)
    text(
        c,
        "The CRM was built as an operating layer for the business: flexible enough for current workflows and structured enough to scale as lead volume, crews, and service areas expanded.",
        72,
        412,
        16,
        SANS,
        MUTED,
        leading=23,
        max_width=650,
    )
    draw_image_cover(c, ASSETS / "Gallery" / "Comfort Moving CRM.png", 72, 92, 320, 230, opacity=1, align_x=0.52)
    features = [
        ("Lead + Web Intake", "Forms, quote requests, and Meta leads routed into one pipeline."),
        ("Payments + Contracts", "Payment and contract steps connected to each record."),
        ("Review Follow-Ups", "Post-job requests created more trust signals."),
        ("Visualized Analytics", "Pipeline and source data made easier to act on."),
    ]
    for i, (title, body) in enumerate(features):
        x = 420 + (i % 2) * 168
        y = 250 - (i // 2) * 112
        card(c, x, y, 154, 94, fill=PAPER, radius=18)
        text(c, title, x + 14, y + 60, 10.5, SANS_BOLD, INK, max_width=124)
        text(c, body, x + 14, y + 36, 8.4, SANS, MUTED, leading=10.8, max_width=122)
    footer(c, 5)


def seo_web(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "05", "SEO And Conversion Path", 72, 468)
    draw_image_cover(c, ASSETS / "Gallery" / "Comfort Moving - Hero Web Design.png", 394, 126, 330, 280, opacity=1, align_x=0.5, align_y=0.72)
    bullets(
        c,
        [
            "Service and location pages were reorganized around local search intent.",
            "Internal linking and page structure created clearer paths for quote-ready visitors.",
            "Website, ads, and CRM intake worked together so demand was easier to capture and follow up with.",
        ],
        86,
        370,
        286,
        15,
        gap=34,
    )
    footer(c, 6)


def timeline(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "06", "Execution Timeline", 72, 468)
    x_line = PAGE_W / 2
    set_stroke(c, hex_alpha("#111111", 0.18))
    c.setLineWidth(1)
    c.line(x_line, 108, x_line, 404)
    phases = [
        ("Phase 1", "Reframed acquisition", "Moved beyond inconsistent referrals and flyers."),
        ("Phase 2", "Rebuilt around intent", "Structured pages around local SEO and quote paths."),
        ("Phase 3", "Connected operations", "CRM workflows for forms, quotes, and follow-up."),
        ("Phase 4", "Scaled demand", "Creative, influencers, and Meta ads fed the pipeline."),
    ]
    y_positions = [368, 286, 204, 122]
    for i, (phase, title, body) in enumerate(phases):
        y = y_positions[i]
        set_fill(c, WHITE)
        set_stroke(c, ACCENT if i in (0, 3) else hex_alpha("#111111", 0.25))
        c.circle(x_line, y + 12, 9, fill=1, stroke=1)
        set_fill(c, ACCENT if i in (0, 3) else hex_alpha("#111111", 0.18))
        c.circle(x_line, y + 12, 3, fill=1, stroke=0)
        x = 74 if i % 2 == 0 else 424
        card(c, x, y - 22, 250, 78, fill=PAPER, radius=16)
        text(c, phase, x + 16, y + 32, 8.5, MONO, hex_alpha("#111111", 0.48))
        text(c, title, x + 16, y + 12, 13.5, SANS_BOLD, INK)
        text(c, body, x + 16, y - 8, 8.8, SANS, MUTED, leading=11.5, max_width=210)
    footer(c, 7)


def outcomes(c):
    draw_page_bg(c)
    brand(c)
    heading(c, "07", "Outcomes", 72, 468)
    cards = [
        ("Paid Media Performance", "16x ROAS", "Meta ads produced 16x ROAS within the first two months."),
        ("Expanded Reach", "Influencer lift", "Influencer partnerships multiplied creative reach and created more trust-building content to amplify."),
        ("Qualified Inbound", "Cleaner pipeline", "SEO, web forms, and Meta leads were easier to capture, organize, and follow up with."),
        ("Conversion Infrastructure", "Centralized backend", "A smoother path from inquiry to quote, contract, payment, review request, and booked move."),
    ]
    for i, (kicker, title, body) in enumerate(cards):
        x = 72 + (i % 2) * 330
        y = 282 - (i // 2) * 132
        fill = INK if i == 0 else PAPER
        color = WHITE if i == 0 else INK
        muted = colors.Color(1, 1, 1, alpha=0.75) if i == 0 else MUTED
        card(c, x, y, 300, 104, fill=fill, radius=24)
        text(c, kicker.upper(), x + 24, y + 68, 8.2, MONO, colors.Color(1, 1, 1, alpha=0.46) if i == 0 else hex_alpha("#111111", 0.45))
        text(c, title, x + 24, y + 44, 20, SANS_BOLD, color)
        text(c, body, x + 24, y + 20, 9.5, SANS, muted, leading=12.8, max_width=248)
    footer(c, 8)


def synthesis(c):
    draw_page_bg(c)
    draw_image_cover(c, ASSETS / "ChicagoSkylineNorthside.png", 0, 0, PAGE_W, PAGE_H, opacity=0.68, align_y=0.54)
    overlay(c, colors.Color(17 / 255, 17 / 255, 17 / 255, alpha=0.58))
    brand(c, 72, 548, dark=False)
    pill(c, "SYSTEM SYNTHESIS", 72, 418, fill=ACCENT, stroke=ACCENT, color=WHITE)
    text(
        c,
        "A stronger local search presence, better creative, wider reach, Meta ads management, and a scalable CRM worked together to make demand easier to generate, capture, track, and convert.",
        72,
        354,
        28,
        SANS_BOLD,
        WHITE,
        leading=38,
        max_width=610,
    )
    text(c, "Prepared for Comfort Moving Chicago", 72, 122, 13, SANS, colors.Color(1, 1, 1, alpha=0.72))
    text(c, "Obskura Digital Marketing", 72, 96, 13, SANS_BOLD, WHITE)
    footer(c, 9)


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=landscape(letter))
    for page in [cover, challenge, system, creative, crm, seo_web, timeline, outcomes, synthesis]:
        page(c)
        c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    main()
