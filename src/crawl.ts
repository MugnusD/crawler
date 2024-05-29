import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 在这里修改你需要爬取的动态网页，格式应为 'https://space.bilibili.com/[uid]/dynamic'
    await page.goto('https://space.bilibili.com/79157636/dynamic');
    await page.waitForSelector('.bili-rich-text__content');

    // 爬取的结果是一个数组
    const contents = await page.evaluate(() => {
        const posts = document.querySelectorAll('.bili-rich-text__content');
        const contents: string[] = [];
        posts.forEach(post => {
            const content = (post as HTMLElement).innerText.trim();
            contents.push(content);
        });
        return contents;
    });

    // 最后输出结果打印在了这个 txt 中
    fs.writeFileSync('posts.txt', contents.join('\n\n=================================\n\n'), 'utf-8');

    await browser.close();
})();
