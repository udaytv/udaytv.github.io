define(["lodash"], function (_) {
    
    var pathUtil = {
        stripBasePath: function (basePath, path) {
            var queryStr = pathUtil.queryString(path);
            basePath = pathUtil.pathname(basePath);
            path = pathUtil.pathname(path);
            
            var baseTokens = pathUtil.tokenize(basePath)
              , tokens = pathUtil.tokenize(path)
              , i = 0;
            while (baseTokens[i] && (baseTokens[i] === tokens[i])) {
                i++;
            }
            while (i--) {
                tokens.shift();
            }
            
            return tokens.join("/") + queryStr;
        },
        isAbsolute: function (url) {
            return url.indexOf("//") > -1;
        },
        pathname: function (href) {
            var exec = /^https?:\/\/[^\/]+(.*)(?:\?.*)$/.exec(href);
            
            return (exec && exec.length > 1 ? exec[1] : href);
        },
        queryString: function (path) {
            var execResult = /\?.*/.exec(path)
              , result = execResult && execResult.length ? execResult[0] : "";

            return result;
        },
        stripAll: function (path) {
            return pathUtil.stripQueryString(pathUtil.stripMatrixVars(path));
        },
        stripMatrixVars: function (path) {
            return path.replace(/;[^\/]*/g, "");
        },
        stripQueryString: function (path) {
            return path.replace(/\?.*$/, "");
        },
        tokenize: function (path) {
            var strippedPath = pathUtil.stripAll(path)
              , splits = strippedPath.split("/")
              , tokens = _.compact(splits); // empty strings removed

            return tokens;
        },
        firstPart: function (path) {
            var tokens = pathUtil.tokenize(path);
            
            return tokens && tokens.length ? tokens[0] : null;
        },
        lastPart: function (path) {
            var tokens = pathUtil.tokenize(path);
            
            return tokens && tokens.length ? tokens[tokens.length - 1] : null;
        }
    };
    
    return pathUtil;
    
});