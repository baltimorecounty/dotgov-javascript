/**
 * Adds class to the body of the browser if `cssgrid` is available for use.
 * https://modernizr.com/download?cssgrid_cssgridlegacy-setclasses&q=grid
 */
!(function (e, n, t) {
  function r(e, n) {
    return typeof e === n;
  }
  function o() {
    var e, n, t, o, s, i, l;
    for (var a in w)
      if (w.hasOwnProperty(a)) {
        if (
          ((e = []),
          (n = w[a]),
          n.name &&
            (e.push(n.name.toLowerCase()),
            n.options && n.options.aliases && n.options.aliases.length))
        )
          for (t = 0; t < n.options.aliases.length; t++)
            e.push(n.options.aliases[t].toLowerCase());
        for (o = r(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++)
          (i = e[s]),
            (l = i.split(".")),
            1 === l.length
              ? (Modernizr[l[0]] = o)
              : (!Modernizr[l[0]] ||
                  Modernizr[l[0]] instanceof Boolean ||
                  (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])),
                (Modernizr[l[0]][l[1]] = o)),
            C.push((o ? "" : "no-") + l.join("-"));
      }
  }
  function s(e) {
    var n = _.className,
      t = Modernizr._config.classPrefix || "";
    if ((x && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(r, "$1" + t + "js$2");
    }
    Modernizr._config.enableClasses &&
      ((n += " " + t + e.join(" " + t)),
      x ? (_.className.baseVal = n) : (_.className = n));
  }
  function i() {
    return "function" != typeof n.createElement
      ? n.createElement(arguments[0])
      : x
      ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0])
      : n.createElement.apply(n, arguments);
  }
  function l(e, n) {
    return !!~("" + e).indexOf(n);
  }
  function a(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function (e, n, t) {
        return n + t.toUpperCase();
      })
      .replace(/^-/, "");
  }
  function u(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }
  function f(e, n, t) {
    var o;
    for (var s in e)
      if (e[s] in n)
        return t === !1
          ? e[s]
          : ((o = n[e[s]]), r(o, "function") ? u(o, t || n) : o);
    return !1;
  }
  function c(e) {
    return e
      .replace(/([A-Z])/g, function (e, n) {
        return "-" + n.toLowerCase();
      })
      .replace(/^ms-/, "-ms-");
  }
  function d(n, t, r) {
    var o;
    if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, n, t);
      var s = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));
      else if (s) {
        var i = s.error ? "error" : "log";
        s[i].call(
          s,
          "getComputedStyle returning null, its possible modernizr test results are inaccurate"
        );
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];
    return o;
  }
  function p() {
    var e = n.body;
    return e || ((e = i(x ? "svg" : "body")), (e.fake = !0)), e;
  }
  function m(e, t, r, o) {
    var s,
      l,
      a,
      u,
      f = "modernizr",
      c = i("div"),
      d = p();
    if (parseInt(r, 10))
      for (; r--; )
        (a = i("div")), (a.id = o ? o[r] : f + (r + 1)), c.appendChild(a);
    return (
      (s = i("style")),
      (s.type = "text/css"),
      (s.id = "s" + f),
      (d.fake ? d : c).appendChild(s),
      d.appendChild(c),
      s.styleSheet
        ? (s.styleSheet.cssText = e)
        : s.appendChild(n.createTextNode(e)),
      (c.id = f),
      d.fake &&
        ((d.style.background = ""),
        (d.style.overflow = "hidden"),
        (u = _.style.overflow),
        (_.style.overflow = "hidden"),
        _.appendChild(d)),
      (l = t(c, e)),
      d.fake
        ? (d.parentNode.removeChild(d), (_.style.overflow = u), _.offsetHeight)
        : c.parentNode.removeChild(c),
      !!l
    );
  }
  function g(n, r) {
    var o = n.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--; ) if (e.CSS.supports(c(n[o]), r)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in e) {
      for (var s = []; o--; ) s.push("(" + c(n[o]) + ":" + r + ")");
      return (
        (s = s.join(" or ")),
        m(
          "@supports (" + s + ") { #modernizr { position: absolute; } }",
          function (e) {
            return "absolute" == d(e, null, "position");
          }
        )
      );
    }
    return t;
  }
  function y(e, n, o, s) {
    function u() {
      c && (delete N.style, delete N.modElem);
    }
    if (((s = r(s, "undefined") ? !1 : s), !r(o, "undefined"))) {
      var f = g(e, o);
      if (!r(f, "undefined")) return f;
    }
    for (
      var c, d, p, m, y, v = ["modernizr", "tspan", "samp"];
      !N.style && v.length;

    )
      (c = !0), (N.modElem = i(v.shift())), (N.style = N.modElem.style);
    for (p = e.length, d = 0; p > d; d++)
      if (
        ((m = e[d]),
        (y = N.style[m]),
        l(m, "-") && (m = a(m)),
        N.style[m] !== t)
      ) {
        if (s || r(o, "undefined")) return u(), "pfx" == n ? m : !0;
        try {
          N.style[m] = o;
        } catch (h) {}
        if (N.style[m] != y) return u(), "pfx" == n ? m : !0;
      }
    return u(), !1;
  }
  function v(e, n, t, o, s) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      l = (e + " " + P.join(i + " ") + i).split(" ");
    return r(n, "string") || r(n, "undefined")
      ? y(l, n, o, s)
      : ((l = (e + " " + z.join(i + " ") + i).split(" ")), f(l, n, t));
  }
  function h(e, n, r) {
    return v(e, t, t, n, r);
  }
  var C = [],
    w = [],
    S = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e]);
        }, 0);
      },
      addTest: function (e, n, t) {
        w.push({ name: e, fn: n, options: t });
      },
      addAsyncTest: function (e) {
        w.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = S), (Modernizr = new Modernizr());
  var _ = n.documentElement,
    x = "svg" === _.nodeName.toLowerCase(),
    b = "Moz O ms Webkit",
    P = S._config.usePrefixes ? b.split(" ") : [];
  S._cssomPrefixes = P;
  var z = S._config.usePrefixes ? b.toLowerCase().split(" ") : [];
  S._domPrefixes = z;
  var E = { elem: i("modernizr") };
  Modernizr._q.push(function () {
    delete E.elem;
  });
  var N = { style: E.elem.style };
  Modernizr._q.unshift(function () {
    delete N.style;
  }),
    (S.testAllProps = v),
    (S.testAllProps = h),
    Modernizr.addTest("cssgridlegacy", h("grid-columns", "10px", !0)),
    Modernizr.addTest("cssgrid", h("grid-template-rows", "none", !0)),
    o(),
    s(C),
    delete S.addTest,
    delete S.addAsyncTest;
  for (var T = 0; T < Modernizr._q.length; T++) Modernizr._q[T]();
  e.Modernizr = Modernizr;
})(window, document);
