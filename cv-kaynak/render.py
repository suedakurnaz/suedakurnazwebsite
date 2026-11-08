# cv.html -> Sueda-Kurnaz-CV.pdf (A4, tek sayfa)
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

HERE = Path(__file__).resolve().parent


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 794, "height": 1123})
        await page.goto((HERE / "cv.html").as_uri())
        await page.evaluate("document.fonts.ready")
        await page.wait_for_timeout(500)
        await page.pdf(path=str(HERE / "Sueda-Kurnaz-CV.pdf"), format="A4", print_background=True, prefer_css_page_size=True)
        await browser.close()
        print("Sueda-Kurnaz-CV.pdf hazır")


asyncio.run(main())
