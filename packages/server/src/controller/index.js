const { version } = require('../../package.json');

module.exports = class extends think.Controller {
  indexAction() {
    this.type = 'html';
    this.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>lzc的小站 - 评论区</title>
    </head>
    <body>
      <div id="waline" style="max-width: 800px;margin: 0 auto;"></div>
      <div id="beian" style="opacity: 0.7;position: absolute;bottom: 10px;text-align: center;left: 50%;transform: translateX(-50%);width: 100%;display: flex;justify-content: center;column-gap: 10px;flex-wrap: wrap;"><img src="https://lzc2002.top//medias/icons/beian.png" title="公安备案"><a target="_blank" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011502001113"><span style="cursor: pointer;">粤公网安备44011502001113号</span></a><a target="_blank" href="https://beian.miit.gov.cn/"><span style="cursor: pointer;">粤ICP备2023073334号-1</span></a><a target="_blank" href="https://beian.miit.gov.cn/"><span style="cursor: pointer;">粤ICP备2023073334号-2A</span></a><a target="_blank" href="https://beian.miit.gov.cn/"><span style="cursor: pointer;">粤ICP备2023073334号-3K</span></a></div>
      <link href='//unpkg.com/@waline/client@v3/dist/waline.css' rel='stylesheet' />
      <style>:root{--waline-theme-color:#c2185b;--waline-active-color:#c2185c80}</style>
      <script type="module">
        import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

        console.log(
          '%c @waline/server %c v${version} ',
          'color: white; background: #0078E7; padding:5px 0;',
          'padding:4px;border:1px solid #0078E7;'
        );
        const params = new URLSearchParams(location.search.slice(1));
        const waline = init({
          el: '#waline',
          path: params.get('path') || '/',
          lang: params.get('lng') || undefined,
          serverURL: location.protocol + '//' + location.host + location.pathname.replace(/\\/+$/, ''),
          recaptchaV3Key: '${process.env.RECAPTCHA_V3_KEY || ''}',
          turnstileKey: '${process.env.TURNSTILE_KEY || ''}',
        });
      </script>
    </body>
    </html>`;
  }
};
