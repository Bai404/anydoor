/*
* @Author: Marte
* @Date:   2019-03-05 18:10:52
* @Last Modified by:   Marte
* @Last Modified time: 2019-03-05 20:11:02
*/

const {createGzip, createDeflate} = require ('zlib');

module.exports = (rs,req,res) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs;
    } else if(acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if(acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }
}