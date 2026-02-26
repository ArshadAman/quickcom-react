import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure()?.errorText || ''));
    
    try {
        await page.goto('http://localhost:5174/product/1', {waitUntil: 'networkidle2'});
    } catch (e) {
        console.error('Nav err', e);
    }
    await browser.close();
})();
