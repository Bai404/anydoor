/*
* @Author: Marte
* @Date:   2019-03-06 11:28:53
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-06 12:03:35
*/
const {cache} = require('../config/defaultConfig.js');

function refreshRes(stast,req){
    const {maxAge,expires,cacheControl,lastModified,etag}
    if(expires){
        res.setHeader('Expires', (new Date(Date.now()+maxAge *1000)).toUTCString())
    }

    if(cacheControl){
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }

    if(lastModified) {
        res.setHeader('Last-Modified', stast.mtime.toUTCString());
    }

    if(etag) {
        res.setHeader('ETag',`${stast.size}-${stast.mtime}`);
    }
}

module.exports = function isFresh(stast,req,res) {
    refreshRes(stast,res);

    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];

    if (!lastModified && !etag) {
        return false;
    }

    if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false;
    }

    if(etag && etag !== res.getHeader('ETag')) {
        return false;
    }
    return true;
}