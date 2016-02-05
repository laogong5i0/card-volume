var sign = require('./sign.js');

console.log(sign('sM4AOVdWfPE4DxkXGEs8VJDzCmL4LSWGVmFrJ9fjcIpSbd5YUSZX3dvUHLW2Sd2vJrsFRQVX0t0Dvyk3o894Ag', 'http://wx.gstzy.cn/coupon/?name=pat&state=1&cardstate=CASH10&openid=o0pk9uD1xoHMzV8GaXmsCTnv_n2w'));
// module.exports = sign('sM4AOVdWfPE4DxkXGEs8VJDzCmL4LSWGVmFrJ9fjcIpdUMP-amDOO7tUNSFu5bHXF9Qn7_iZEbn7b1H5wGJT4g', 'http://wx.gstzy.cn/coupon/?name=pat&state=1&cardstate=CASH10&openid=o0pk9uD1xoHMzV8GaXmsCTnv_n2w');
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
