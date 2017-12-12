export default typeof window !== 'undefined' ? window.fetch : function (url, options) {
    var stream = weex.requireModule('stream');
    return new Promise((resolve, reject) => {
        var params = JSON.parse(JSON.stringify(options || {}));
        params.url = url;
        params.type = 'text';  // response type
        stream.fetch(params, function(res) {
                var resp = res.statusText || res.toString();
                try {
                    resp = JSON.parse(res.data);
                }
                catch (ex) {
                    reject(resp + ex.toString());
                }
                resolve({
                    ok: res.ok,
                    json: function () { return Promise.resolve(resp); }
                });
            });
    });
};
