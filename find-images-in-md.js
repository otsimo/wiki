const fs = require('fs');
const toml = require('toml');
const tomlify = require('tomlify-j0.4');

const langs = ['tr', 'en']

/**
 * 
 * 
 * @param {tring} lang 
 * @param {Error} err 
 * @param {string[]} items 
 */
function langdir(lang, err, items) {
    for (let item of items) {
        const fullpath = `${lang}/${item}`;
        const data = fs.readFileSync(fullpath, 'utf8')
        const start = data.indexOf('+++')
        const end = data.indexOf('+++', start + 3)
        const tml = data.substring(start + 3, end)
        const doc = toml.parse(tml);
        const weburl = `https://otsimo.com/${lang}/${doc.slug}/`
        doc.params['web'] = weburl;
        const text = tomlify(doc, null, 0);
        const nt = '+++\n' + text + '\n+++\n' + data.substring(end + 3);
        fs.writeFileSync(fullpath, nt, 'utf8');
        //console.log(doc.params.thumb);
    }
}

langs.forEach(lang => fs.readdir(lang, (err, items) => { langdir(lang, err, items) }))