/*
* @Author: Marte
* @Date:   2019-03-04 15:40:29
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-05 10:23:47
*/
const http = require('http');
const chalk = require('chalk');
const conf = require('./config/defaultConfig.js');
const path = require('path');
const router = require('./helper/router.js')
const server = http.createServer((req,res) => {
    const filePath = path.join(conf.root, req.url);
    router(req,res,filePath);
});

server.listen(conf.port,conf.hostname);