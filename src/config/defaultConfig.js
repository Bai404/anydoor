/*
* @Author: Marte
* @Date:   2019-03-04 15:40:13
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-06 12:03:36
*/

module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 8004,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
};