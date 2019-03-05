/*
* @Author: Marte
* @Date:   2019-03-04 17:26:12
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-05 10:21:29
*/
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const Handlebars = require('handlebars');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir)
const conf = require('../config/defaultConfig.js');

const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString())

module.exports = async function (req,res,filePath) {
     try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            const dir = path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : ``,
                files
            }
            res.end(template(data));
        }
    } catch(ex) {
        console.log(ex)
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not a directory or file`);
        return
    }
}