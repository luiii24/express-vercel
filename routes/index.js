const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const demo = require('./demo.route');
//const cloudscraper = require('cloudscraper')
const r = Router();

r.use('/demo', demo);

r.get('/api/ig', (req, res) => {
let cloudscraper = require('cloudscraper')
if (!req.query.url) return res.send('url nya ?')
url_dl = [];
let headers = {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Referer': 'https://saveig.app/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Requested-With': 'XMLHttpRequest'
   }
let options = {
method: 'POST',
uri: 'https://saveig.app/api/ajaxSearch',
headers: headers,
formData: {
q: req.query.url
}
}
try {
ch = require('cheerio').load(JSON.parse(await cloudscraper(options)).data);
ch('.download-items__btn').each(function(a,b) { url_dl.push(ch(b).find('a').attr('href'))})
return res.json(url_dl);
//return res.send(JSON.stringify(await cloudscraper(options)))
} catch { return res.send('terjadi kesalahan, harap ulangi beberapa saat lagi...')}
})
r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

module.exports = r;
