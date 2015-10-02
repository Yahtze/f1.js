var F1Modal = function() {
    "use strict";
    var e, t;
    return {
        show: function(n, o, i) {
            var s, a = F1Modal,
                r = {
                    closeId: "mtf1-close",
                    closeClass: "mtf1-close",
                    overlayId: "mtf1-overlay",
                    overlayClass: "mtf1-overlay",
                    containerId: "mtf1-container",
                    containerClass: "mtf1-container",
                    dataId: "mtf1-target",
                    dataClass: "mtf1-target",
                    wrapperClass: "mtf1-wrap",
                    containerCss: {
                        padding: 0,
                        width: o.width || 800,
                        height: o.height || 600
                    },
                    onShow: i || function() {}
                };
            for (s in o) o.hasOwnProperty(s) && (r[s] = o[s]);
            e = document.createElement("div"), e.id = r.overlayId, e.className = r.overlayClass, e.style.height = this.height() + "px", e.style.width = this.width() + "px", e.style.position = "fixed", e.style.left = "0px", e.style.top = "0px", e.style.zIndex = 1001, t = document.createElement("div"), t.id = r.containerId, t.className = r.containerClass, t.style.padding = r.containerCss.padding + "px", t.style.width = r.containerCss.width + "px", t.style.height = r.containerCss.height + "px", t.style.position = "fixed", t.style.zIndex = 1002, t.style.left = this.containerLeft(r.containerCss.width) + "px", t.style.top = this.containerTop(r.containerCss.height) + "px";
            var d = document.createElement("div");
            d.className = r.wrapperClass, d.setAttribute("tabindex", "-1"), d.style.height = "100%", d.style.width = "100%", d.style.outline = "0px", d.style.overflow = "hidden";
            var c = document.createElement("div");
            c.id = r.dataId, c.className = r.dataClass, document.body.appendChild(e), document.body.appendChild(t), t.appendChild(d), d.appendChild(c), c.innerHTML = n, this.addEvent(document.getElementById(r.closeId), "click", function() {
                a.close()
            }), this.addEvent(e, "click", function() {
                a.close()
            }), this.addEvent(window, "resize", function() {
                e.style.height = a.height() + "px", e.style.width = a.width() + "px", t.style.left = a.containerLeft(r.containerCss.width) + "px", t.style.top = a.containerTop(r.containerCss.height) + "px"
            }), r.onShow(document)
        },
        close: function() {
            document.body.removeChild(t), document.body.removeChild(e)
        },
        width: function() {
            return document.documentElement.clientWidth || document.body.clientWidth
        },
        height: function() {
            return document.documentElement.clientHeight || document.body.clientHeight
        },
        containerTop: function(e) {
            var t = this.height();
            return e > t ? 0 : (t - e) / 2
        },
        containerLeft: function(e) {
            var t = this.width();
            return e > t ? 0 : (t - e) / 2
        },
        addEvent: function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? (e["e" + t + n] = n, e[t + n] = function() {
                e["e" + t + n](window.event)
            }, e.attachEvent("on" + t, e[t + n])) : e["on" + t] = e["e" + t + n]
        }
    }
}();
! function() {
    "use strict";

    function e(e, n) {
        n._ = Math.floor(1e5 * Math.random());
        var o = '<div class="mtf1-dialog"><div class="mtf1-dialog-header"><span class="mtf1-close" id="mtf1-close"></span></div><div class="mtf1-dialog-content"><iframe id="mtf1-modal" name="mtf1-modal" width="100%" height="' + e.height + 'px" scrolling="no" style="border: 0pt none; background: none repeat scroll 0% 0% rgb(255, 255, 255);" backgroundColor="transparent" allowtransparency="true" frameBorder="0">Loading...</iframe></div></div>',
            i = e.onShow || function(o) {
                var i = t(e.dialog_url, n),
                    s = o.getElementById("mtf1-modal");
                s && (s.setAttribute("src", i), s.focus())
            };
        F1Modal.show(o, e, i)
    }

    function t(e, t) {
        var n, o = e,
            i = o.indexOf("?") < 0 ? "?" : "&";
        for (n in t) t.hasOwnProperty(n) && (o += i + encodeURIComponent(n) + "=" + encodeURIComponent(t[n]), i = "&");
        return o
    }

    function n(e) {
        var t = document.createElement("link");
        t.setAttribute("rel", "stylesheet"), t.setAttribute("type", "text/css"), t.setAttribute("href", s(e));
        var n = document.head;
        n || (n = document.getElementsByTagName("head")[0]), n.appendChild(t)
    }

    function o(e, t) {
        return "undefined" == typeof e ? t : e
    }

    function i(e) {
        return e.f1_host = e.f1_host || "f1." + e.host, e.dialog_url = e.dialog_url || e.scheme + "://" + e.f1_host + "/@app/f1/dialog", e
    }

    function s(e) {
        return e.replace(/^https?:/, m.scheme + ":")
    }

    function a(e) {
        var t, n = {};
        if (null !== e) {
            var o = e.split("&");
            for (t = 0; t < o.length; ++t)
                if (o[t]) {
                    var i = o[t].split("=");
                    n[decodeURIComponent(i[0])] = i.length > 1 ? decodeURIComponent(i[1]) : null
                }
        }
        return n
    }

    function r(e, t) {
        var n;
        for (n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function d(e) {
        c(e);
        var t = this;
        this === window && (t = e.srcElement);
        var n = {};
        if (1 === t.nodeType && "a" === t.tagName.toLowerCase()) {
            var o = t.getAttribute("href");
            if ("#" === o) "undefined" != typeof f.page && (n.page = f.page);
            else if ("#" === o.substr(0, 1)) try {
                n.page = parseInt(o.substr(1), 10)
            } catch (i) {
                throw new Error("invalid pageid in href value for MindTouch F1 (" + o + ")")
            } else if (/^https?:/.test(o)) {
                var s, r = f.Util.parseUrl(o),
                    d = !1;
                if ("https:" === document.location.protocol && "http" === r.protocol && null !== r.hostname.match(/\.mindtouch\.us/i)) {
                    for (s in v)
                        if (v[s] === r.hostname) {
                            d = !0;
                            break
                        }
                    if (!d) return !0
                }
                n.host = r.hostname;
                var l = a(r.query);
                "/index.php" === r.path ? (n.page = l.title, delete l.title) : n.page = r.path ? decodeURI(r.path) : "/";
                var h = l.cid;
                h && (n.pagecid = h, delete l.cid), n.page.length && "/" === n.page[0] && (n.page = n.page.substr(1)), n.queryParams = l
            } else n.page = o
        }
        f.open(n, t)
    }

    function c(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function l(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }

    function h() {
        if (!g) {
            if ("undefined" == typeof F1Modal) {
                var e = document.createElement("script");
                e.setAttribute("type", "text/javascript"), e.setAttribute("src", s(m.resource_url + "modal.js")), document.body.appendChild(e)
            }
            if (m.selector && document.querySelectorAll) {
                var t = document.querySelectorAll(m.selector);
                if (t) {
                    var n;
                    for (n = 0; n < t.length; n++) l(t[n], "click", d)
                }
            }
            g = !0
        }
    }
    var f, u = "1.0.0",
        p = !1,
        m = {},
        y = "http://cdn.mindtouch.us/f1/default/dialog.css",
        g = !1,
        v = ["help.mindtouch.us", "success.mindtouch.com"];
    switch (typeof window.F1) {
        case "string":
            f = window.F1 = {
                host: window.F1
            };
            break;
        case "object":
            f = window.F1;
            break;
        default:
            f = window.F1 = {}
    }
    f.version = u, f.Util = function() {
        var e = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/\\]*)(?::([^:@\/\\]*))?)?@)?([^:\\\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(#.*)?)/,
            t = ["original", "protocol", "authority", "userInfo", "user", "password", "hostname", "port", "relative", "path", "directory", "file", "query", "fragment"];
        return {
            parseUrl: function(n) {
                var o, i = e.exec(n),
                    s = {};
                for (o = 0; o < t.length; ++o) s[t[o]] = i[o] || null;
                return s
            }
        }
    }(), f.init = function(e) {
        (window.innerHeight && window.innerHeight < 600 || window.innerWidth && window.innerWidth <= 400) && (m.height = window.innerHeight), m = r({
            selector: o(m.selector, ".F1"),
            host: m.host || "success.mindtouch.com",
            width: m.width || 800,
            height: m.height || 600,
            scheme: m.scheme || ("https:" === document.location.protocol ? "https" : "http")
        }, e), m.resource_url = m.resource_url || "http://cdn.mindtouch.us/f1/"
    }, f.open = function(t, s) {
        var a = r(m, t);
        if (t = i(a), !p) {
            var d = o(m.stylesheet || y);
            if (d && n(d), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                m.stylesheetIE && n(m.stylesheetIE);
                var c = parseFloat(RegExp.$1);
                m.stylesheetIE9 && c >= 9 && 10 > c ? n(m.stylesheetIE9) : m.stylesheetIE8 && c >= 8 && 9 > c ? n(m.stylesheetIE8) : m.stylesheetIE7 && c >= 7 && 8 > c ? n(m.stylesheetIE7) : m.stylesheetIE6 && c >= 6 && 7 > c && n(m.stylesheetIE6)
            }
            p = !0
        }
        var l = {};
        if (t.text && ("string" == typeof t.text.open ? l["f1.text.open"] = t.text.open : null === t.text.open && (l["f1.text.noopen"] = null), "string" == typeof t.text.opentitle && (l["f1.text.opentitle"] = t.text.opentitle), "string" == typeof t.text.home ? l["f1.text.home"] = t.text.home : null === t.text.home && (l["f1.text.nohome"] = null), "string" == typeof t.text.hometitle && (l["f1.text.hometitle"] = t.text.hometitle), "string" == typeof t.text.back ? l["f1.text.back"] = t.text.back : null === t.text.back && (l["f1.text.noback"] = null), "string" == typeof t.text.backtitle && (l["f1.text.backtitle"] = t.text.backtitle), "string" == typeof t.text.forward ? l["f1.text.forward"] = t.text.forward : null === t.text.forward && (l["f1.text.noforward"] = null), "string" == typeof t.text.forwardtitle && (l["f1.text.forwardtitle"] = t.text.forwardtitle), "string" == typeof t.text.search ? l["f1.text.search"] = t.text.search : null === t.text.search && (l["f1.text.nosearch"] = null), "string" == typeof t.text.hint && (l["f1.text.hint"] = t.text.hint)), t.pagecid && (l["f1.pagecid"] = t.pagecid), t.homecid && (l["f1.homecid"] = t.homecid), t.page) {
            var h = t.page;
            "function" == typeof h && (h = h.apply(s)), "string" == typeof h ? l["f1.page"] = h : "number" == typeof h && (l["f1.pageid"] = h)
        }
        t.home && ("string" == typeof t.home ? l["f1.home"] = t.home : "number" == typeof t.page && (l["f1.homeid"] = t.home)), "undefined" != typeof t.stylesheet && (l["f1.css"] = t.stylesheet), "undefined" != typeof t.stylesheetIE && (l["f1.css.ie"] = t.stylesheetIE), "undefined" != typeof t.stylesheetIE6 && (l["f1.css.ie6"] = t.stylesheetIE6), "undefined" != typeof t.stylesheetIE7 && (l["f1.css.ie7"] = t.stylesheetIE7), "undefined" != typeof t.stylesheetIE8 && (l["f1.css.ie8"] = t.stylesheetIE8), "undefined" != typeof t.stylesheetIE9 && (l["f1.css.ie9"] = t.stylesheetIE9), "undefined" != typeof t.contentStylesheet && (l["f1.cocss"] = t.contentStylesheet), "undefined" != typeof t.contentStylesheetIE && (l["f1.cocss.ie"] = t.contentStylesheetIE), "undefined" != typeof t.contentStylesheetIE6 && (l["f1.cocss.ie6"] = t.contentStylesheetIE6), "undefined" != typeof t.contentStylesheetIE7 && (l["f1.cocss.ie7"] = t.contentStylesheetIE7), "undefined" != typeof t.contentStylesheetIE8 && (l["f1.cocss.ie8"] = t.contentStylesheetIE8), "undefined" != typeof t.contentStylesheetIE9 && (l["f1.cocss.ie9"] = t.contentStylesheetIE9), l["f1.ver"] = f.version;
        var u;
        for (u in t.queryParams) t.queryParams.hasOwnProperty(u) && (l[u] = t.queryParams[u]);
        e(t, l)
    };
    var w;
    document.addEventListener ? w = function() {
        document.removeEventListener("DOMContentLoaded", w, !1), h()
    } : document.attachEvent && (w = function() {
        "complete" === document.readyState && (document.detachEvent("onreadystatechange", w), h())
    }), "complete" === document.readyState && setTimeout(h, 1), document.addEventListener ? (document.addEventListener("DOMContentLoaded", w, !1), window.addEventListener("load", h, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", w), window.attachEvent("onload", h)), f.init(window.F1)
}();
//# sourceMappingURL=f1.js.map