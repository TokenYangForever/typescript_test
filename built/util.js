"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("lodash/filter");
// 可以像这样引用lodash里的特定方法，不用引入整个库
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        var last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout)
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
function lazyLoadImg(dataAttr) {
    if (dataAttr === void 0) { dataAttr = 'data-img'; }
    function helper(item) {
        var offsetTop = item.offsetTop;
        var winHeight = window.innerHeight;
        var bodyHeight = document.documentElement.scrollTop;
        if (offsetTop < winHeight + bodyHeight) {
            item.src = item.getAttribute(dataAttr);
            item.removeAttribute(dataAttr);
        }
    }
    var fn = throttle(function () {
        var lzImg = document.querySelectorAll("[" + dataAttr + "]");
        if (lzImg.length) {
            for (var i in lzImg) {
                helper(lzImg[i]);
            }
        }
        else {
            document.body.onscroll = null;
        }
    }, 300);
    document.body.onscroll = fn;
    fn();
}
// 判断某个元素是否在当前视窗之内
function elementIsVisibleInViewport(el, partiallyVisible) {
    if (partiallyVisible === void 0) { partiallyVisible = false; }
    var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
// 非http链接强行改成https
function httpsRedirect() {
    if (location.protocol !== 'https:')
        location.replace('https://' + location.href.split('//')[1]);
}
// 动画滚到到顶部，requestAnimationFrame添加动画
function scrollToTop() {
    var c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame && window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}
function ubtSend(msg) {
    var img = new Image();
    img.src = "http://localhost:8081/ubt/t.gif?msg=" + msg;
}
// 将一个字符串，复制到剪切板
var copyToClipboard = function (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};
/**
 * 根据传入key，对传入对象的属性进行过滤
 * @param {String} obj - 原对象
 * @param {String} keys - 需要过滤的key值，数组形式，或者以空格间断的字符串形式
 * @example
 * only({a: 1, b: 1}, 'a') // return {a: 1}
 * @return {Object} 过滤后的Object对象.
 */
function only(obj, keys) {
    obj = obj || {};
    if ('string' === typeof keys)
        keys = keys.split(/ +/);
    return keys.reduce(function (ret, key) {
        if (null != obj[key])
            ret[key] = obj[key];
        return ret;
    }, {});
}
/**
 * 返回一个与传入对象键值相反的结果对象
 * @param {Object} obj - 原对象
 * @return {Object} 键值相反的结果对象
 * @example
 * invert({a: 'b'}) // return {b: 'a'}
 */
function invert(obj) {
    obj = obj || {};
    return Object.keys(obj).reduce(function (cur, item) {
        cur[obj[item]] = item;
        return cur;
    }, {});
}
var setFontSize = function () {
    // 根据屏幕大小设置font-size，然后移动端再使用rem
    var html = document.querySelector('html');
    var fontSize, bodyWidth;
    if (html.getBoundingClientRect) {
        bodyWidth = html.getBoundingClientRect().width;
    }
    else {
        bodyWidth = document.documentElement.clientWidth;
    }
    fontSize = Math.min(bodyWidth, 540) * 100 / 375;
    document.documentElement.style.fontSize = fontSize.toFixed(3) + "px";
};
var isObject = function (obj) { return Object.prototype.toString.call(obj) === '[object Object]'; };
/**
 * 扁平化数组/对象，返回一个对象
 * @param {Array/Object} map 原对象/数组
 */
// From: https://github.com/redux-utilities/redux-actions/blob/master/src/utils/flattenWhenNode.js
var flatten = function (map, partialFlatMap, partialFlatActionType) {
    if (partialFlatMap === void 0) { partialFlatMap = {}; }
    if (partialFlatActionType === void 0) { partialFlatActionType = ''; }
    var connectNamespace = function (type) {
        return partialFlatActionType
            ? partialFlatActionType + "." + type
            : type;
    };
    Object.keys(map).forEach(function (type) {
        var nextNamespace = connectNamespace(type);
        var mapValue = map[type];
        if (isObject(mapValue)) {
            flatten(mapValue, partialFlatMap, nextNamespace);
        }
        else {
            partialFlatMap[nextNamespace] = mapValue;
        }
    });
    return partialFlatMap;
};
exports.default = {
    httpsRedirect: httpsRedirect,
    scrollToTop: scrollToTop,
    debounce: debounce,
    throttle: throttle,
    lazyLoadImg: lazyLoadImg,
    filter: filter_1.default,
    elementIsVisibleInViewport: elementIsVisibleInViewport,
    ubtSend: ubtSend,
    copyToClipboard: copyToClipboard,
    setFontSize: setFontSize,
    only: only,
    invert: invert,
    flatten: flatten
};
