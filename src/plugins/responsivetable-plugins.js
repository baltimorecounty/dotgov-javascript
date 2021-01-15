/*!
   Copyright 2008-2020 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 DataTables 1.10.22
 ©2008-2020 SpryMedia Ltd - datatables.net/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (k, y, z) {
  k instanceof String && (k = String(k));
  for (var q = k.length, G = 0; G < q; G++) {
    var O = k[G];
    if (y.call(z, O, G, k)) return { i: G, v: O };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (k, y, z) {
        if (k == Array.prototype || k == Object.prototype) return k;
        k[y] = z.value;
        return k;
      };
$jscomp.getGlobal = function (k) {
  k = [
    "object" == typeof globalThis && globalThis,
    k,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var y = 0; y < k.length; ++y) {
    var z = k[y];
    if (z && z.Math == Math) return z;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (k, y) {
  var z = $jscomp.propertyToPolyfillSymbol[y];
  if (null == z) return k[y];
  z = k[z];
  return void 0 !== z ? z : k[y];
};
$jscomp.polyfill = function (k, y, z, q) {
  y &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(k, y, z, q)
      : $jscomp.polyfillUnisolated(k, y, z, q));
};
$jscomp.polyfillUnisolated = function (k, y, z, q) {
  z = $jscomp.global;
  k = k.split(".");
  for (q = 0; q < k.length - 1; q++) {
    var G = k[q];
    if (!(G in z)) return;
    z = z[G];
  }
  k = k[k.length - 1];
  q = z[k];
  y = y(q);
  y != q &&
    null != y &&
    $jscomp.defineProperty(z, k, { configurable: !0, writable: !0, value: y });
};
$jscomp.polyfillIsolated = function (k, y, z, q) {
  var G = k.split(".");
  k = 1 === G.length;
  q = G[0];
  q = !k && q in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var O = 0; O < G.length - 1; O++) {
    var ma = G[O];
    if (!(ma in q)) return;
    q = q[ma];
  }
  G = G[G.length - 1];
  z = $jscomp.IS_SYMBOL_NATIVE && "es6" === z ? q[G] : null;
  y = y(z);
  null != y &&
    (k
      ? $jscomp.defineProperty($jscomp.polyfills, G, {
          configurable: !0,
          writable: !0,
          value: y,
        })
      : y !== z &&
        (($jscomp.propertyToPolyfillSymbol[G] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(G)
          : $jscomp.POLYFILL_PREFIX + G),
        (G = $jscomp.propertyToPolyfillSymbol[G]),
        $jscomp.defineProperty(q, G, {
          configurable: !0,
          writable: !0,
          value: y,
        })));
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (k) {
    return k
      ? k
      : function (y, z) {
          return $jscomp.findInternal(this, y, z).v;
        };
  },
  "es6",
  "es3"
);
(function (k) {
  "function" === typeof define && define.amd
    ? define(["jquery"], function (y) {
        return k(y, window, document);
      })
    : "object" === typeof exports
    ? (module.exports = function (y, z) {
        y || (y = window);
        z ||
          (z =
            "undefined" !== typeof window
              ? require("jquery")
              : require("jquery")(y));
        return k(z, y, y.document);
      })
    : k(jQuery, window, document);
})(function (k, y, z, q) {
  function G(a) {
    var b,
      c,
      d = {};
    k.each(a, function (f, e) {
      (b = f.match(/^([^A-Z]+?)([A-Z])/)) &&
        -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ") &&
        ((c = f.replace(b[0], b[2].toLowerCase())),
        (d[c] = f),
        "o" === b[1] && G(a[f]));
    });
    a._hungarianMap = d;
  }
  function O(a, b, c) {
    a._hungarianMap || G(a);
    var d;
    k.each(b, function (f, e) {
      d = a._hungarianMap[f];
      d === q ||
        (!c && b[d] !== q) ||
        ("o" === d.charAt(0)
          ? (b[d] || (b[d] = {}), k.extend(!0, b[d], b[f]), O(a[d], b[d], c))
          : (b[d] = b[f]));
    });
  }
  function ma(a) {
    var b = u.defaults.oLanguage,
      c = b.sDecimal;
    c && Va(c);
    if (a) {
      var d = a.sZeroRecords;
      !a.sEmptyTable &&
        d &&
        "No data available in table" === b.sEmptyTable &&
        V(a, a, "sZeroRecords", "sEmptyTable");
      !a.sLoadingRecords &&
        d &&
        "Loading..." === b.sLoadingRecords &&
        V(a, a, "sZeroRecords", "sLoadingRecords");
      a.sInfoThousands && (a.sThousands = a.sInfoThousands);
      (a = a.sDecimal) && c !== a && Va(a);
    }
  }
  function yb(a) {
    R(a, "ordering", "bSort");
    R(a, "orderMulti", "bSortMulti");
    R(a, "orderClasses", "bSortClasses");
    R(a, "orderCellsTop", "bSortCellsTop");
    R(a, "order", "aaSorting");
    R(a, "orderFixed", "aaSortingFixed");
    R(a, "paging", "bPaginate");
    R(a, "pagingType", "sPaginationType");
    R(a, "pageLength", "iDisplayLength");
    R(a, "searching", "bFilter");
    "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");
    "boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");
    if ((a = a.aoSearchCols))
      for (var b = 0, c = a.length; b < c; b++)
        a[b] && O(u.models.oSearch, a[b]);
  }
  function zb(a) {
    R(a, "orderable", "bSortable");
    R(a, "orderData", "aDataSort");
    R(a, "orderSequence", "asSorting");
    R(a, "orderDataType", "sortDataType");
    var b = a.aDataSort;
    "number" !== typeof b || Array.isArray(b) || (a.aDataSort = [b]);
  }
  function Ab(a) {
    if (!u.__browser) {
      var b = {};
      u.__browser = b;
      var c = k("<div/>")
          .css({
            position: "fixed",
            top: 0,
            left: -1 * k(y).scrollLeft(),
            height: 1,
            width: 1,
            overflow: "hidden",
          })
          .append(
            k("<div/>")
              .css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll",
              })
              .append(k("<div/>").css({ width: "100%", height: 10 }))
          )
          .appendTo("body"),
        d = c.children(),
        f = d.children();
      b.barWidth = d[0].offsetWidth - d[0].clientWidth;
      b.bScrollOversize = 100 === f[0].offsetWidth && 100 !== d[0].clientWidth;
      b.bScrollbarLeft = 1 !== Math.round(f.offset().left);
      b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
      c.remove();
    }
    k.extend(a.oBrowser, u.__browser);
    a.oScroll.iBarWidth = u.__browser.barWidth;
  }
  function Bb(a, b, c, d, f, e) {
    var g = !1;
    if (c !== q) {
      var h = c;
      g = !0;
    }
    for (; d !== f; )
      a.hasOwnProperty(d) &&
        ((h = g ? b(h, a[d], d, a) : a[d]), (g = !0), (d += e));
    return h;
  }
  function Wa(a, b) {
    var c = u.defaults.column,
      d = a.aoColumns.length;
    c = k.extend({}, u.models.oColumn, c, {
      nTh: b ? b : z.createElement("th"),
      sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
      aDataSort: c.aDataSort ? c.aDataSort : [d],
      mData: c.mData ? c.mData : d,
      idx: d,
    });
    a.aoColumns.push(c);
    c = a.aoPreSearchCols;
    c[d] = k.extend({}, u.models.oSearch, c[d]);
    Da(a, d, k(b).data());
  }
  function Da(a, b, c) {
    b = a.aoColumns[b];
    var d = a.oClasses,
      f = k(b.nTh);
    if (!b.sWidthOrig) {
      b.sWidthOrig = f.attr("width") || null;
      var e = (f.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
      e && (b.sWidthOrig = e[1]);
    }
    c !== q &&
      null !== c &&
      (zb(c),
      O(u.defaults.column, c, !0),
      c.mDataProp === q || c.mData || (c.mData = c.mDataProp),
      c.sType && (b._sManualType = c.sType),
      c.className && !c.sClass && (c.sClass = c.className),
      c.sClass && f.addClass(c.sClass),
      k.extend(b, c),
      V(b, c, "sWidth", "sWidthOrig"),
      c.iDataSort !== q && (b.aDataSort = [c.iDataSort]),
      V(b, c, "aDataSort"));
    var g = b.mData,
      h = ia(g),
      l = b.mRender ? ia(b.mRender) : null;
    c = function (n) {
      return "string" === typeof n && -1 !== n.indexOf("@");
    };
    b._bAttrSrc = k.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
    b._setter = null;
    b.fnGetData = function (n, m, p) {
      var t = h(n, m, q, p);
      return l && m ? l(t, m, n, p) : t;
    };
    b.fnSetData = function (n, m, p) {
      return da(g)(n, m, p);
    };
    "number" !== typeof g && (a._rowReadObject = !0);
    a.oFeatures.bSort || ((b.bSortable = !1), f.addClass(d.sSortableNone));
    a = -1 !== k.inArray("asc", b.asSorting);
    c = -1 !== k.inArray("desc", b.asSorting);
    b.bSortable && (a || c)
      ? a && !c
        ? ((b.sSortingClass = d.sSortableAsc),
          (b.sSortingClassJUI = d.sSortJUIAscAllowed))
        : !a && c
        ? ((b.sSortingClass = d.sSortableDesc),
          (b.sSortingClassJUI = d.sSortJUIDescAllowed))
        : ((b.sSortingClass = d.sSortable), (b.sSortingClassJUI = d.sSortJUI))
      : ((b.sSortingClass = d.sSortableNone), (b.sSortingClassJUI = ""));
  }
  function ra(a) {
    if (!1 !== a.oFeatures.bAutoWidth) {
      var b = a.aoColumns;
      Xa(a);
      for (var c = 0, d = b.length; c < d; c++)
        b[c].nTh.style.width = b[c].sWidth;
    }
    b = a.oScroll;
    ("" === b.sY && "" === b.sX) || Ea(a);
    I(a, null, "column-sizing", [a]);
  }
  function sa(a, b) {
    a = Fa(a, "bVisible");
    return "number" === typeof a[b] ? a[b] : null;
  }
  function ta(a, b) {
    a = Fa(a, "bVisible");
    b = k.inArray(b, a);
    return -1 !== b ? b : null;
  }
  function na(a) {
    var b = 0;
    k.each(a.aoColumns, function (c, d) {
      d.bVisible && "none" !== k(d.nTh).css("display") && b++;
    });
    return b;
  }
  function Fa(a, b) {
    var c = [];
    k.map(a.aoColumns, function (d, f) {
      d[b] && c.push(f);
    });
    return c;
  }
  function Ya(a) {
    var b = a.aoColumns,
      c = a.aoData,
      d = u.ext.type.detect,
      f,
      e,
      g;
    var h = 0;
    for (f = b.length; h < f; h++) {
      var l = b[h];
      var n = [];
      if (!l.sType && l._sManualType) l.sType = l._sManualType;
      else if (!l.sType) {
        var m = 0;
        for (e = d.length; m < e; m++) {
          var p = 0;
          for (g = c.length; p < g; p++) {
            n[p] === q && (n[p] = S(a, p, h, "type"));
            var t = d[m](n[p], a);
            if (!t && m !== d.length - 1) break;
            if ("html" === t) break;
          }
          if (t) {
            l.sType = t;
            break;
          }
        }
        l.sType || (l.sType = "string");
      }
    }
  }
  function Cb(a, b, c, d) {
    var f,
      e,
      g,
      h = a.aoColumns;
    if (b)
      for (f = b.length - 1; 0 <= f; f--) {
        var l = b[f];
        var n = l.targets !== q ? l.targets : l.aTargets;
        Array.isArray(n) || (n = [n]);
        var m = 0;
        for (e = n.length; m < e; m++)
          if ("number" === typeof n[m] && 0 <= n[m]) {
            for (; h.length <= n[m]; ) Wa(a);
            d(n[m], l);
          } else if ("number" === typeof n[m] && 0 > n[m])
            d(h.length + n[m], l);
          else if ("string" === typeof n[m]) {
            var p = 0;
            for (g = h.length; p < g; p++)
              ("_all" == n[m] || k(h[p].nTh).hasClass(n[m])) && d(p, l);
          }
      }
    if (c) for (f = 0, a = c.length; f < a; f++) d(f, c[f]);
  }
  function ea(a, b, c, d) {
    var f = a.aoData.length,
      e = k.extend(!0, {}, u.models.oRow, { src: c ? "dom" : "data", idx: f });
    e._aData = b;
    a.aoData.push(e);
    for (var g = a.aoColumns, h = 0, l = g.length; h < l; h++)
      g[h].sType = null;
    a.aiDisplayMaster.push(f);
    b = a.rowIdFn(b);
    b !== q && (a.aIds[b] = e);
    (!c && a.oFeatures.bDeferRender) || Za(a, f, c, d);
    return f;
  }
  function Ga(a, b) {
    var c;
    b instanceof k || (b = k(b));
    return b.map(function (d, f) {
      c = $a(a, f);
      return ea(a, c.data, f, c.cells);
    });
  }
  function S(a, b, c, d) {
    var f = a.iDraw,
      e = a.aoColumns[c],
      g = a.aoData[b]._aData,
      h = e.sDefaultContent,
      l = e.fnGetData(g, d, { settings: a, row: b, col: c });
    if (l === q)
      return (
        a.iDrawError != f &&
          null === h &&
          (aa(
            a,
            0,
            "Requested unknown parameter " +
              ("function" == typeof e.mData
                ? "{function}"
                : "'" + e.mData + "'") +
              " for row " +
              b +
              ", column " +
              c,
            4
          ),
          (a.iDrawError = f)),
        h
      );
    if ((l === g || null === l) && null !== h && d !== q) l = h;
    else if ("function" === typeof l) return l.call(g);
    return null === l && "display" == d ? "" : l;
  }
  function Db(a, b, c, d) {
    a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
      settings: a,
      row: b,
      col: c,
    });
  }
  function ab(a) {
    return k.map(a.match(/(\\.|[^\.])+/g) || [""], function (b) {
      return b.replace(/\\\./g, ".");
    });
  }
  function ia(a) {
    if (k.isPlainObject(a)) {
      var b = {};
      k.each(a, function (d, f) {
        f && (b[d] = ia(f));
      });
      return function (d, f, e, g) {
        var h = b[f] || b._;
        return h !== q ? h(d, f, e, g) : d;
      };
    }
    if (null === a)
      return function (d) {
        return d;
      };
    if ("function" === typeof a)
      return function (d, f, e, g) {
        return a(d, f, e, g);
      };
    if (
      "string" !== typeof a ||
      (-1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("("))
    )
      return function (d, f) {
        return d[a];
      };
    var c = function (d, f, e) {
      if ("" !== e) {
        var g = ab(e);
        for (var h = 0, l = g.length; h < l; h++) {
          e = g[h].match(ua);
          var n = g[h].match(oa);
          if (e) {
            g[h] = g[h].replace(ua, "");
            "" !== g[h] && (d = d[g[h]]);
            n = [];
            g.splice(0, h + 1);
            g = g.join(".");
            if (Array.isArray(d))
              for (h = 0, l = d.length; h < l; h++) n.push(c(d[h], f, g));
            d = e[0].substring(1, e[0].length - 1);
            d = "" === d ? n : n.join(d);
            break;
          } else if (n) {
            g[h] = g[h].replace(oa, "");
            d = d[g[h]]();
            continue;
          }
          if (null === d || d[g[h]] === q) return q;
          d = d[g[h]];
        }
      }
      return d;
    };
    return function (d, f) {
      return c(d, f, a);
    };
  }
  function da(a) {
    if (k.isPlainObject(a)) return da(a._);
    if (null === a) return function () {};
    if ("function" === typeof a)
      return function (c, d, f) {
        a(c, "set", d, f);
      };
    if (
      "string" !== typeof a ||
      (-1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("("))
    )
      return function (c, d) {
        c[a] = d;
      };
    var b = function (c, d, f) {
      f = ab(f);
      var e = f[f.length - 1];
      for (var g, h, l = 0, n = f.length - 1; l < n; l++) {
        if ("__proto__" === f[l]) throw Error("Cannot set prototype values");
        g = f[l].match(ua);
        h = f[l].match(oa);
        if (g) {
          f[l] = f[l].replace(ua, "");
          c[f[l]] = [];
          e = f.slice();
          e.splice(0, l + 1);
          g = e.join(".");
          if (Array.isArray(d))
            for (h = 0, n = d.length; h < n; h++)
              (e = {}), b(e, d[h], g), c[f[l]].push(e);
          else c[f[l]] = d;
          return;
        }
        h && ((f[l] = f[l].replace(oa, "")), (c = c[f[l]](d)));
        if (null === c[f[l]] || c[f[l]] === q) c[f[l]] = {};
        c = c[f[l]];
      }
      if (e.match(oa)) c[e.replace(oa, "")](d);
      else c[e.replace(ua, "")] = d;
    };
    return function (c, d) {
      return b(c, d, a);
    };
  }
  function bb(a) {
    return T(a.aoData, "_aData");
  }
  function Ha(a) {
    a.aoData.length = 0;
    a.aiDisplayMaster.length = 0;
    a.aiDisplay.length = 0;
    a.aIds = {};
  }
  function Ia(a, b, c) {
    for (var d = -1, f = 0, e = a.length; f < e; f++)
      a[f] == b ? (d = f) : a[f] > b && a[f]--;
    -1 != d && c === q && a.splice(d, 1);
  }
  function va(a, b, c, d) {
    var f = a.aoData[b],
      e,
      g = function (l, n) {
        for (; l.childNodes.length; ) l.removeChild(l.firstChild);
        l.innerHTML = S(a, b, n, "display");
      };
    if ("dom" !== c && ((c && "auto" !== c) || "dom" !== f.src)) {
      var h = f.anCells;
      if (h)
        if (d !== q) g(h[d], d);
        else for (c = 0, e = h.length; c < e; c++) g(h[c], c);
    } else f._aData = $a(a, f, d, d === q ? q : f._aData).data;
    f._aSortData = null;
    f._aFilterData = null;
    g = a.aoColumns;
    if (d !== q) g[d].sType = null;
    else {
      c = 0;
      for (e = g.length; c < e; c++) g[c].sType = null;
      cb(a, f);
    }
  }
  function $a(a, b, c, d) {
    var f = [],
      e = b.firstChild,
      g,
      h = 0,
      l,
      n = a.aoColumns,
      m = a._rowReadObject;
    d = d !== q ? d : m ? {} : [];
    var p = function (x, r) {
        if ("string" === typeof x) {
          var A = x.indexOf("@");
          -1 !== A && ((A = x.substring(A + 1)), da(x)(d, r.getAttribute(A)));
        }
      },
      t = function (x) {
        if (c === q || c === h)
          (g = n[h]),
            (l = x.innerHTML.trim()),
            g && g._bAttrSrc
              ? (da(g.mData._)(d, l),
                p(g.mData.sort, x),
                p(g.mData.type, x),
                p(g.mData.filter, x))
              : m
              ? (g._setter || (g._setter = da(g.mData)), g._setter(d, l))
              : (d[h] = l);
        h++;
      };
    if (e)
      for (; e; ) {
        var v = e.nodeName.toUpperCase();
        if ("TD" == v || "TH" == v) t(e), f.push(e);
        e = e.nextSibling;
      }
    else for (f = b.anCells, e = 0, v = f.length; e < v; e++) t(f[e]);
    (b = b.firstChild ? b : b.nTr) &&
      (b = b.getAttribute("id")) &&
      da(a.rowId)(d, b);
    return { data: d, cells: f };
  }
  function Za(a, b, c, d) {
    var f = a.aoData[b],
      e = f._aData,
      g = [],
      h,
      l;
    if (null === f.nTr) {
      var n = c || z.createElement("tr");
      f.nTr = n;
      f.anCells = g;
      n._DT_RowIndex = b;
      cb(a, f);
      var m = 0;
      for (h = a.aoColumns.length; m < h; m++) {
        var p = a.aoColumns[m];
        var t = (l = c ? !1 : !0) ? z.createElement(p.sCellType) : d[m];
        t._DT_CellIndex = { row: b, column: m };
        g.push(t);
        if (
          l ||
          !(
            (c && !p.mRender && p.mData === m) ||
            (k.isPlainObject(p.mData) && p.mData._ === m + ".display")
          )
        )
          t.innerHTML = S(a, b, m, "display");
        p.sClass && (t.className += " " + p.sClass);
        p.bVisible && !c
          ? n.appendChild(t)
          : !p.bVisible && c && t.parentNode.removeChild(t);
        p.fnCreatedCell &&
          p.fnCreatedCell.call(a.oInstance, t, S(a, b, m), e, b, m);
      }
      I(a, "aoRowCreatedCallback", null, [n, e, b, g]);
    }
    f.nTr.setAttribute("role", "row");
  }
  function cb(a, b) {
    var c = b.nTr,
      d = b._aData;
    if (c) {
      if ((a = a.rowIdFn(d))) c.id = a;
      d.DT_RowClass &&
        ((a = d.DT_RowClass.split(" ")),
        (b.__rowc = b.__rowc ? Ja(b.__rowc.concat(a)) : a),
        k(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
      d.DT_RowAttr && k(c).attr(d.DT_RowAttr);
      d.DT_RowData && k(c).data(d.DT_RowData);
    }
  }
  function Eb(a) {
    var b,
      c,
      d = a.nTHead,
      f = a.nTFoot,
      e = 0 === k("th, td", d).length,
      g = a.oClasses,
      h = a.aoColumns;
    e && (c = k("<tr/>").appendTo(d));
    var l = 0;
    for (b = h.length; l < b; l++) {
      var n = h[l];
      var m = k(n.nTh).addClass(n.sClass);
      e && m.appendTo(c);
      a.oFeatures.bSort &&
        (m.addClass(n.sSortingClass),
        !1 !== n.bSortable &&
          (m.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId),
          db(a, n.nTh, l)));
      n.sTitle != m[0].innerHTML && m.html(n.sTitle);
      eb(a, "header")(a, m, n, g);
    }
    e && wa(a.aoHeader, d);
    k(d).children("tr").attr("role", "row");
    k(d).children("tr").children("th, td").addClass(g.sHeaderTH);
    k(f).children("tr").children("th, td").addClass(g.sFooterTH);
    if (null !== f)
      for (a = a.aoFooter[0], l = 0, b = a.length; l < b; l++)
        (n = h[l]),
          (n.nTf = a[l].cell),
          n.sClass && k(n.nTf).addClass(n.sClass);
  }
  function xa(a, b, c) {
    var d,
      f,
      e = [],
      g = [],
      h = a.aoColumns.length;
    if (b) {
      c === q && (c = !1);
      var l = 0;
      for (d = b.length; l < d; l++) {
        e[l] = b[l].slice();
        e[l].nTr = b[l].nTr;
        for (f = h - 1; 0 <= f; f--)
          a.aoColumns[f].bVisible || c || e[l].splice(f, 1);
        g.push([]);
      }
      l = 0;
      for (d = e.length; l < d; l++) {
        if ((a = e[l].nTr)) for (; (f = a.firstChild); ) a.removeChild(f);
        f = 0;
        for (b = e[l].length; f < b; f++) {
          var n = (h = 1);
          if (g[l][f] === q) {
            a.appendChild(e[l][f].cell);
            for (
              g[l][f] = 1;
              e[l + h] !== q && e[l][f].cell == e[l + h][f].cell;

            )
              (g[l + h][f] = 1), h++;
            for (; e[l][f + n] !== q && e[l][f].cell == e[l][f + n].cell; ) {
              for (c = 0; c < h; c++) g[l + c][f + n] = 1;
              n++;
            }
            k(e[l][f].cell).attr("rowspan", h).attr("colspan", n);
          }
        }
      }
    }
  }
  function fa(a) {
    var b = I(a, "aoPreDrawCallback", "preDraw", [a]);
    if (-1 !== k.inArray(!1, b)) U(a, !1);
    else {
      b = [];
      var c = 0,
        d = a.asStripeClasses,
        f = d.length,
        e = a.oLanguage,
        g = a.iInitDisplayStart,
        h = "ssp" == P(a),
        l = a.aiDisplay;
      a.bDrawing = !0;
      g !== q &&
        -1 !== g &&
        ((a._iDisplayStart = h ? g : g >= a.fnRecordsDisplay() ? 0 : g),
        (a.iInitDisplayStart = -1));
      g = a._iDisplayStart;
      var n = a.fnDisplayEnd();
      if (a.bDeferLoading) (a.bDeferLoading = !1), a.iDraw++, U(a, !1);
      else if (!h) a.iDraw++;
      else if (!a.bDestroying && !Fb(a)) return;
      if (0 !== l.length)
        for (e = h ? a.aoData.length : n, h = h ? 0 : g; h < e; h++) {
          var m = l[h],
            p = a.aoData[m];
          null === p.nTr && Za(a, m);
          var t = p.nTr;
          if (0 !== f) {
            var v = d[c % f];
            p._sRowStripe != v &&
              (k(t).removeClass(p._sRowStripe).addClass(v),
              (p._sRowStripe = v));
          }
          I(a, "aoRowCallback", null, [t, p._aData, c, h, m]);
          b.push(t);
          c++;
        }
      else
        (c = e.sZeroRecords),
          1 == a.iDraw && "ajax" == P(a)
            ? (c = e.sLoadingRecords)
            : e.sEmptyTable && 0 === a.fnRecordsTotal() && (c = e.sEmptyTable),
          (b[0] = k("<tr/>", { class: f ? d[0] : "" }).append(
            k("<td />", {
              valign: "top",
              colSpan: na(a),
              class: a.oClasses.sRowEmpty,
            }).html(c)
          )[0]);
      I(a, "aoHeaderCallback", "header", [
        k(a.nTHead).children("tr")[0],
        bb(a),
        g,
        n,
        l,
      ]);
      I(a, "aoFooterCallback", "footer", [
        k(a.nTFoot).children("tr")[0],
        bb(a),
        g,
        n,
        l,
      ]);
      d = k(a.nTBody);
      d.children().detach();
      d.append(k(b));
      I(a, "aoDrawCallback", "draw", [a]);
      a.bSorted = !1;
      a.bFiltered = !1;
      a.bDrawing = !1;
    }
  }
  function ja(a, b) {
    var c = a.oFeatures,
      d = c.bFilter;
    c.bSort && Gb(a);
    d ? ya(a, a.oPreviousSearch) : (a.aiDisplay = a.aiDisplayMaster.slice());
    !0 !== b && (a._iDisplayStart = 0);
    a._drawHold = b;
    fa(a);
    a._drawHold = !1;
  }
  function Hb(a) {
    var b = a.oClasses,
      c = k(a.nTable);
    c = k("<div/>").insertBefore(c);
    var d = a.oFeatures,
      f = k("<div/>", {
        id: a.sTableId + "_wrapper",
        class: b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter),
      });
    a.nHolding = c[0];
    a.nTableWrapper = f[0];
    a.nTableReinsertBefore = a.nTable.nextSibling;
    for (var e = a.sDom.split(""), g, h, l, n, m, p, t = 0; t < e.length; t++) {
      g = null;
      h = e[t];
      if ("<" == h) {
        l = k("<div/>")[0];
        n = e[t + 1];
        if ("'" == n || '"' == n) {
          m = "";
          for (p = 2; e[t + p] != n; ) (m += e[t + p]), p++;
          "H" == m ? (m = b.sJUIHeader) : "F" == m && (m = b.sJUIFooter);
          -1 != m.indexOf(".")
            ? ((n = m.split(".")),
              (l.id = n[0].substr(1, n[0].length - 1)),
              (l.className = n[1]))
            : "#" == m.charAt(0)
            ? (l.id = m.substr(1, m.length - 1))
            : (l.className = m);
          t += p;
        }
        f.append(l);
        f = k(l);
      } else if (">" == h) f = f.parent();
      else if ("l" == h && d.bPaginate && d.bLengthChange) g = Ib(a);
      else if ("f" == h && d.bFilter) g = Jb(a);
      else if ("r" == h && d.bProcessing) g = Kb(a);
      else if ("t" == h) g = Lb(a);
      else if ("i" == h && d.bInfo) g = Mb(a);
      else if ("p" == h && d.bPaginate) g = Nb(a);
      else if (0 !== u.ext.feature.length)
        for (l = u.ext.feature, p = 0, n = l.length; p < n; p++)
          if (h == l[p].cFeature) {
            g = l[p].fnInit(a);
            break;
          }
      g &&
        ((l = a.aanFeatures), l[h] || (l[h] = []), l[h].push(g), f.append(g));
    }
    c.replaceWith(f);
    a.nHolding = null;
  }
  function wa(a, b) {
    b = k(b).children("tr");
    var c, d, f;
    a.splice(0, a.length);
    var e = 0;
    for (f = b.length; e < f; e++) a.push([]);
    e = 0;
    for (f = b.length; e < f; e++) {
      var g = b[e];
      for (c = g.firstChild; c; ) {
        if (
          "TD" == c.nodeName.toUpperCase() ||
          "TH" == c.nodeName.toUpperCase()
        ) {
          var h = 1 * c.getAttribute("colspan");
          var l = 1 * c.getAttribute("rowspan");
          h = h && 0 !== h && 1 !== h ? h : 1;
          l = l && 0 !== l && 1 !== l ? l : 1;
          var n = 0;
          for (d = a[e]; d[n]; ) n++;
          var m = n;
          var p = 1 === h ? !0 : !1;
          for (d = 0; d < h; d++)
            for (n = 0; n < l; n++)
              (a[e + n][m + d] = { cell: c, unique: p }), (a[e + n].nTr = g);
        }
        c = c.nextSibling;
      }
    }
  }
  function Ka(a, b, c) {
    var d = [];
    c || ((c = a.aoHeader), b && ((c = []), wa(c, b)));
    b = 0;
    for (var f = c.length; b < f; b++)
      for (var e = 0, g = c[b].length; e < g; e++)
        !c[b][e].unique || (d[e] && a.bSortCellsTop) || (d[e] = c[b][e].cell);
    return d;
  }
  function La(a, b, c) {
    I(a, "aoServerParams", "serverParams", [b]);
    if (b && Array.isArray(b)) {
      var d = {},
        f = /(.*?)\[\]$/;
      k.each(b, function (m, p) {
        (m = p.name.match(f))
          ? ((m = m[0]), d[m] || (d[m] = []), d[m].push(p.value))
          : (d[p.name] = p.value);
      });
      b = d;
    }
    var e = a.ajax,
      g = a.oInstance,
      h = function (m) {
        I(a, null, "xhr", [a, m, a.jqXHR]);
        c(m);
      };
    if (k.isPlainObject(e) && e.data) {
      var l = e.data;
      var n = "function" === typeof l ? l(b, a) : l;
      b = "function" === typeof l && n ? n : k.extend(!0, b, n);
      delete e.data;
    }
    n = {
      data: b,
      success: function (m) {
        var p = m.error || m.sError;
        p && aa(a, 0, p);
        a.json = m;
        h(m);
      },
      dataType: "json",
      cache: !1,
      type: a.sServerMethod,
      error: function (m, p, t) {
        t = I(a, null, "xhr", [a, null, a.jqXHR]);
        -1 === k.inArray(!0, t) &&
          ("parsererror" == p
            ? aa(a, 0, "Invalid JSON response", 1)
            : 4 === m.readyState && aa(a, 0, "Ajax error", 7));
        U(a, !1);
      },
    };
    a.oAjaxData = b;
    I(a, null, "preXhr", [a, b]);
    a.fnServerData
      ? a.fnServerData.call(
          g,
          a.sAjaxSource,
          k.map(b, function (m, p) {
            return { name: p, value: m };
          }),
          h,
          a
        )
      : a.sAjaxSource || "string" === typeof e
      ? (a.jqXHR = k.ajax(k.extend(n, { url: e || a.sAjaxSource })))
      : "function" === typeof e
      ? (a.jqXHR = e.call(g, b, h, a))
      : ((a.jqXHR = k.ajax(k.extend(n, e))), (e.data = l));
  }
  function Fb(a) {
    return a.bAjaxDataGet
      ? (a.iDraw++,
        U(a, !0),
        La(a, Ob(a), function (b) {
          Pb(a, b);
        }),
        !1)
      : !0;
  }
  function Ob(a) {
    var b = a.aoColumns,
      c = b.length,
      d = a.oFeatures,
      f = a.oPreviousSearch,
      e = a.aoPreSearchCols,
      g = [],
      h = pa(a);
    var l = a._iDisplayStart;
    var n = !1 !== d.bPaginate ? a._iDisplayLength : -1;
    var m = function (x, r) {
      g.push({ name: x, value: r });
    };
    m("sEcho", a.iDraw);
    m("iColumns", c);
    m("sColumns", T(b, "sName").join(","));
    m("iDisplayStart", l);
    m("iDisplayLength", n);
    var p = {
      draw: a.iDraw,
      columns: [],
      order: [],
      start: l,
      length: n,
      search: { value: f.sSearch, regex: f.bRegex },
    };
    for (l = 0; l < c; l++) {
      var t = b[l];
      var v = e[l];
      n = "function" == typeof t.mData ? "function" : t.mData;
      p.columns.push({
        data: n,
        name: t.sName,
        searchable: t.bSearchable,
        orderable: t.bSortable,
        search: { value: v.sSearch, regex: v.bRegex },
      });
      m("mDataProp_" + l, n);
      d.bFilter &&
        (m("sSearch_" + l, v.sSearch),
        m("bRegex_" + l, v.bRegex),
        m("bSearchable_" + l, t.bSearchable));
      d.bSort && m("bSortable_" + l, t.bSortable);
    }
    d.bFilter && (m("sSearch", f.sSearch), m("bRegex", f.bRegex));
    d.bSort &&
      (k.each(h, function (x, r) {
        p.order.push({ column: r.col, dir: r.dir });
        m("iSortCol_" + x, r.col);
        m("sSortDir_" + x, r.dir);
      }),
      m("iSortingCols", h.length));
    b = u.ext.legacy.ajax;
    return null === b ? (a.sAjaxSource ? g : p) : b ? g : p;
  }
  function Pb(a, b) {
    var c = function (g, h) {
        return b[g] !== q ? b[g] : b[h];
      },
      d = Ma(a, b),
      f = c("sEcho", "draw"),
      e = c("iTotalRecords", "recordsTotal");
    c = c("iTotalDisplayRecords", "recordsFiltered");
    if (f !== q) {
      if (1 * f < a.iDraw) return;
      a.iDraw = 1 * f;
    }
    Ha(a);
    a._iRecordsTotal = parseInt(e, 10);
    a._iRecordsDisplay = parseInt(c, 10);
    f = 0;
    for (e = d.length; f < e; f++) ea(a, d[f]);
    a.aiDisplay = a.aiDisplayMaster.slice();
    a.bAjaxDataGet = !1;
    fa(a);
    a._bInitComplete || Na(a, b);
    a.bAjaxDataGet = !0;
    U(a, !1);
  }
  function Ma(a, b) {
    a =
      k.isPlainObject(a.ajax) && a.ajax.dataSrc !== q
        ? a.ajax.dataSrc
        : a.sAjaxDataProp;
    return "data" === a ? b.aaData || b[a] : "" !== a ? ia(a)(b) : b;
  }
  function Jb(a) {
    var b = a.oClasses,
      c = a.sTableId,
      d = a.oLanguage,
      f = a.oPreviousSearch,
      e = a.aanFeatures,
      g = '<input type="search" class="' + b.sFilterInput + '"/>',
      h = d.sSearch;
    h = h.match(/_INPUT_/) ? h.replace("_INPUT_", g) : h + g;
    b = k("<div/>", {
      id: e.f ? null : c + "_filter",
      class: b.sFilter,
    }).append(k("<label/>").append(h));
    var l = function () {
      var m = this.value ? this.value : "";
      m != f.sSearch &&
        (ya(a, {
          sSearch: m,
          bRegex: f.bRegex,
          bSmart: f.bSmart,
          bCaseInsensitive: f.bCaseInsensitive,
        }),
        (a._iDisplayStart = 0),
        fa(a));
    };
    e = null !== a.searchDelay ? a.searchDelay : "ssp" === P(a) ? 400 : 0;
    var n = k("input", b)
      .val(f.sSearch)
      .attr("placeholder", d.sSearchPlaceholder)
      .on("keyup.DT search.DT input.DT paste.DT cut.DT", e ? fb(l, e) : l)
      .on("mouseup", function (m) {
        setTimeout(function () {
          l.call(n[0]);
        }, 10);
      })
      .on("keypress.DT", function (m) {
        if (13 == m.keyCode) return !1;
      })
      .attr("aria-controls", c);
    k(a.nTable).on("search.dt.DT", function (m, p) {
      if (a === p)
        try {
          n[0] !== z.activeElement && n.val(f.sSearch);
        } catch (t) {}
    });
    return b[0];
  }
  function ya(a, b, c) {
    var d = a.oPreviousSearch,
      f = a.aoPreSearchCols,
      e = function (h) {
        d.sSearch = h.sSearch;
        d.bRegex = h.bRegex;
        d.bSmart = h.bSmart;
        d.bCaseInsensitive = h.bCaseInsensitive;
      },
      g = function (h) {
        return h.bEscapeRegex !== q ? !h.bEscapeRegex : h.bRegex;
      };
    Ya(a);
    if ("ssp" != P(a)) {
      Qb(a, b.sSearch, c, g(b), b.bSmart, b.bCaseInsensitive);
      e(b);
      for (b = 0; b < f.length; b++)
        Rb(a, f[b].sSearch, b, g(f[b]), f[b].bSmart, f[b].bCaseInsensitive);
      Sb(a);
    } else e(b);
    a.bFiltered = !0;
    I(a, null, "search", [a]);
  }
  function Sb(a) {
    for (
      var b = u.ext.search, c = a.aiDisplay, d, f, e = 0, g = b.length;
      e < g;
      e++
    ) {
      for (var h = [], l = 0, n = c.length; l < n; l++)
        (f = c[l]),
          (d = a.aoData[f]),
          b[e](a, d._aFilterData, f, d._aData, l) && h.push(f);
      c.length = 0;
      k.merge(c, h);
    }
  }
  function Rb(a, b, c, d, f, e) {
    if ("" !== b) {
      var g = [],
        h = a.aiDisplay;
      d = gb(b, d, f, e);
      for (f = 0; f < h.length; f++)
        (b = a.aoData[h[f]]._aFilterData[c]), d.test(b) && g.push(h[f]);
      a.aiDisplay = g;
    }
  }
  function Qb(a, b, c, d, f, e) {
    f = gb(b, d, f, e);
    var g = a.oPreviousSearch.sSearch,
      h = a.aiDisplayMaster;
    e = [];
    0 !== u.ext.search.length && (c = !0);
    var l = Tb(a);
    if (0 >= b.length) a.aiDisplay = h.slice();
    else {
      if (l || c || d || g.length > b.length || 0 !== b.indexOf(g) || a.bSorted)
        a.aiDisplay = h.slice();
      b = a.aiDisplay;
      for (c = 0; c < b.length; c++)
        f.test(a.aoData[b[c]]._sFilterRow) && e.push(b[c]);
      a.aiDisplay = e;
    }
  }
  function gb(a, b, c, d) {
    a = b ? a : hb(a);
    c &&
      (a =
        "^(?=.*?" +
        k
          .map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (f) {
            if ('"' === f.charAt(0)) {
              var e = f.match(/^"(.*)"$/);
              f = e ? e[1] : f;
            }
            return f.replace('"', "");
          })
          .join(")(?=.*?") +
        ").*$");
    return new RegExp(a, d ? "i" : "");
  }
  function Tb(a) {
    var b = a.aoColumns,
      c,
      d,
      f = u.ext.type.search;
    var e = !1;
    var g = 0;
    for (c = a.aoData.length; g < c; g++) {
      var h = a.aoData[g];
      if (!h._aFilterData) {
        var l = [];
        var n = 0;
        for (d = b.length; n < d; n++) {
          e = b[n];
          if (e.bSearchable) {
            var m = S(a, g, n, "filter");
            f[e.sType] && (m = f[e.sType](m));
            null === m && (m = "");
            "string" !== typeof m && m.toString && (m = m.toString());
          } else m = "";
          m.indexOf &&
            -1 !== m.indexOf("&") &&
            ((Oa.innerHTML = m), (m = rc ? Oa.textContent : Oa.innerText));
          m.replace && (m = m.replace(/[\r\n\u2028]/g, ""));
          l.push(m);
        }
        h._aFilterData = l;
        h._sFilterRow = l.join("  ");
        e = !0;
      }
    }
    return e;
  }
  function Ub(a) {
    return {
      search: a.sSearch,
      smart: a.bSmart,
      regex: a.bRegex,
      caseInsensitive: a.bCaseInsensitive,
    };
  }
  function Vb(a) {
    return {
      sSearch: a.search,
      bSmart: a.smart,
      bRegex: a.regex,
      bCaseInsensitive: a.caseInsensitive,
    };
  }
  function Mb(a) {
    var b = a.sTableId,
      c = a.aanFeatures.i,
      d = k("<div/>", { class: a.oClasses.sInfo, id: c ? null : b + "_info" });
    c ||
      (a.aoDrawCallback.push({ fn: Wb, sName: "information" }),
      d.attr("role", "status").attr("aria-live", "polite"),
      k(a.nTable).attr("aria-describedby", b + "_info"));
    return d[0];
  }
  function Wb(a) {
    var b = a.aanFeatures.i;
    if (0 !== b.length) {
      var c = a.oLanguage,
        d = a._iDisplayStart + 1,
        f = a.fnDisplayEnd(),
        e = a.fnRecordsTotal(),
        g = a.fnRecordsDisplay(),
        h = g ? c.sInfo : c.sInfoEmpty;
      g !== e && (h += " " + c.sInfoFiltered);
      h += c.sInfoPostFix;
      h = Xb(a, h);
      c = c.fnInfoCallback;
      null !== c && (h = c.call(a.oInstance, a, d, f, e, g, h));
      k(b).html(h);
    }
  }
  function Xb(a, b) {
    var c = a.fnFormatNumber,
      d = a._iDisplayStart + 1,
      f = a._iDisplayLength,
      e = a.fnRecordsDisplay(),
      g = -1 === f;
    return b
      .replace(/_START_/g, c.call(a, d))
      .replace(/_END_/g, c.call(a, a.fnDisplayEnd()))
      .replace(/_MAX_/g, c.call(a, a.fnRecordsTotal()))
      .replace(/_TOTAL_/g, c.call(a, e))
      .replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / f)))
      .replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(e / f)));
  }
  function za(a) {
    var b = a.iInitDisplayStart,
      c = a.aoColumns;
    var d = a.oFeatures;
    var f = a.bDeferLoading;
    if (a.bInitialised) {
      Hb(a);
      Eb(a);
      xa(a, a.aoHeader);
      xa(a, a.aoFooter);
      U(a, !0);
      d.bAutoWidth && Xa(a);
      var e = 0;
      for (d = c.length; e < d; e++) {
        var g = c[e];
        g.sWidth && (g.nTh.style.width = K(g.sWidth));
      }
      I(a, null, "preInit", [a]);
      ja(a);
      c = P(a);
      if ("ssp" != c || f)
        "ajax" == c
          ? La(
              a,
              [],
              function (h) {
                var l = Ma(a, h);
                for (e = 0; e < l.length; e++) ea(a, l[e]);
                a.iInitDisplayStart = b;
                ja(a);
                U(a, !1);
                Na(a, h);
              },
              a
            )
          : (U(a, !1), Na(a));
    } else
      setTimeout(function () {
        za(a);
      }, 200);
  }
  function Na(a, b) {
    a._bInitComplete = !0;
    (b || a.oInit.aaData) && ra(a);
    I(a, null, "plugin-init", [a, b]);
    I(a, "aoInitComplete", "init", [a, b]);
  }
  function ib(a, b) {
    b = parseInt(b, 10);
    a._iDisplayLength = b;
    jb(a);
    I(a, null, "length", [a, b]);
  }
  function Ib(a) {
    var b = a.oClasses,
      c = a.sTableId,
      d = a.aLengthMenu,
      f = Array.isArray(d[0]),
      e = f ? d[0] : d;
    d = f ? d[1] : d;
    f = k("<select/>", {
      name: c + "_length",
      "aria-controls": c,
      class: b.sLengthSelect,
    });
    for (var g = 0, h = e.length; g < h; g++)
      f[0][g] = new Option(
        "number" === typeof d[g] ? a.fnFormatNumber(d[g]) : d[g],
        e[g]
      );
    var l = k("<div><label/></div>").addClass(b.sLength);
    a.aanFeatures.l || (l[0].id = c + "_length");
    l.children().append(
      a.oLanguage.sLengthMenu.replace("_MENU_", f[0].outerHTML)
    );
    k("select", l)
      .val(a._iDisplayLength)
      .on("change.DT", function (n) {
        ib(a, k(this).val());
        fa(a);
      });
    k(a.nTable).on("length.dt.DT", function (n, m, p) {
      a === m && k("select", l).val(p);
    });
    return l[0];
  }
  function Nb(a) {
    var b = a.sPaginationType,
      c = u.ext.pager[b],
      d = "function" === typeof c,
      f = function (g) {
        fa(g);
      };
    b = k("<div/>").addClass(a.oClasses.sPaging + b)[0];
    var e = a.aanFeatures;
    d || c.fnInit(a, b, f);
    e.p ||
      ((b.id = a.sTableId + "_paginate"),
      a.aoDrawCallback.push({
        fn: function (g) {
          if (d) {
            var h = g._iDisplayStart,
              l = g._iDisplayLength,
              n = g.fnRecordsDisplay(),
              m = -1 === l;
            h = m ? 0 : Math.ceil(h / l);
            l = m ? 1 : Math.ceil(n / l);
            n = c(h, l);
            var p;
            m = 0;
            for (p = e.p.length; m < p; m++)
              eb(g, "pageButton")(g, e.p[m], m, n, h, l);
          } else c.fnUpdate(g, f);
        },
        sName: "pagination",
      }));
    return b;
  }
  function kb(a, b, c) {
    var d = a._iDisplayStart,
      f = a._iDisplayLength,
      e = a.fnRecordsDisplay();
    0 === e || -1 === f
      ? (d = 0)
      : "number" === typeof b
      ? ((d = b * f), d > e && (d = 0))
      : "first" == b
      ? (d = 0)
      : "previous" == b
      ? ((d = 0 <= f ? d - f : 0), 0 > d && (d = 0))
      : "next" == b
      ? d + f < e && (d += f)
      : "last" == b
      ? (d = Math.floor((e - 1) / f) * f)
      : aa(a, 0, "Unknown paging action: " + b, 5);
    b = a._iDisplayStart !== d;
    a._iDisplayStart = d;
    b && (I(a, null, "page", [a]), c && fa(a));
    return b;
  }
  function Kb(a) {
    return k("<div/>", {
      id: a.aanFeatures.r ? null : a.sTableId + "_processing",
      class: a.oClasses.sProcessing,
    })
      .html(a.oLanguage.sProcessing)
      .insertBefore(a.nTable)[0];
  }
  function U(a, b) {
    a.oFeatures.bProcessing &&
      k(a.aanFeatures.r).css("display", b ? "block" : "none");
    I(a, null, "processing", [a, b]);
  }
  function Lb(a) {
    var b = k(a.nTable);
    b.attr("role", "grid");
    var c = a.oScroll;
    if ("" === c.sX && "" === c.sY) return a.nTable;
    var d = c.sX,
      f = c.sY,
      e = a.oClasses,
      g = b.children("caption"),
      h = g.length ? g[0]._captionSide : null,
      l = k(b[0].cloneNode(!1)),
      n = k(b[0].cloneNode(!1)),
      m = b.children("tfoot");
    m.length || (m = null);
    l = k("<div/>", { class: e.sScrollWrapper })
      .append(
        k("<div/>", { class: e.sScrollHead })
          .css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: d ? (d ? K(d) : null) : "100%",
          })
          .append(
            k("<div/>", { class: e.sScrollHeadInner })
              .css({ "box-sizing": "content-box", width: c.sXInner || "100%" })
              .append(
                l
                  .removeAttr("id")
                  .css("margin-left", 0)
                  .append("top" === h ? g : null)
                  .append(b.children("thead"))
              )
          )
      )
      .append(
        k("<div/>", { class: e.sScrollBody })
          .css({
            position: "relative",
            overflow: "auto",
            width: d ? K(d) : null,
          })
          .append(b)
      );
    m &&
      l.append(
        k("<div/>", { class: e.sScrollFoot })
          .css({
            overflow: "hidden",
            border: 0,
            width: d ? (d ? K(d) : null) : "100%",
          })
          .append(
            k("<div/>", { class: e.sScrollFootInner }).append(
              n
                .removeAttr("id")
                .css("margin-left", 0)
                .append("bottom" === h ? g : null)
                .append(b.children("tfoot"))
            )
          )
      );
    b = l.children();
    var p = b[0];
    e = b[1];
    var t = m ? b[2] : null;
    if (d)
      k(e).on("scroll.DT", function (v) {
        v = this.scrollLeft;
        p.scrollLeft = v;
        m && (t.scrollLeft = v);
      });
    k(e).css("max-height", f);
    c.bCollapse || k(e).css("height", f);
    a.nScrollHead = p;
    a.nScrollBody = e;
    a.nScrollFoot = t;
    a.aoDrawCallback.push({ fn: Ea, sName: "scrolling" });
    return l[0];
  }
  function Ea(a) {
    var b = a.oScroll,
      c = b.sX,
      d = b.sXInner,
      f = b.sY;
    b = b.iBarWidth;
    var e = k(a.nScrollHead),
      g = e[0].style,
      h = e.children("div"),
      l = h[0].style,
      n = h.children("table");
    h = a.nScrollBody;
    var m = k(h),
      p = h.style,
      t = k(a.nScrollFoot).children("div"),
      v = t.children("table"),
      x = k(a.nTHead),
      r = k(a.nTable),
      A = r[0],
      E = A.style,
      H = a.nTFoot ? k(a.nTFoot) : null,
      W = a.oBrowser,
      M = W.bScrollOversize,
      C = T(a.aoColumns, "nTh"),
      B = [],
      ba = [],
      X = [],
      lb = [],
      Aa,
      Yb = function (F) {
        F = F.style;
        F.paddingTop = "0";
        F.paddingBottom = "0";
        F.borderTopWidth = "0";
        F.borderBottomWidth = "0";
        F.height = 0;
      };
    var ha = h.scrollHeight > h.clientHeight;
    if (a.scrollBarVis !== ha && a.scrollBarVis !== q)
      (a.scrollBarVis = ha), ra(a);
    else {
      a.scrollBarVis = ha;
      r.children("thead, tfoot").remove();
      if (H) {
        var ka = H.clone().prependTo(r);
        var la = H.find("tr");
        ka = ka.find("tr");
      }
      var mb = x.clone().prependTo(r);
      x = x.find("tr");
      ha = mb.find("tr");
      mb.find("th, td").removeAttr("tabindex");
      c || ((p.width = "100%"), (e[0].style.width = "100%"));
      k.each(Ka(a, mb), function (F, Y) {
        Aa = sa(a, F);
        Y.style.width = a.aoColumns[Aa].sWidth;
      });
      H &&
        Z(function (F) {
          F.style.width = "";
        }, ka);
      e = r.outerWidth();
      "" === c
        ? ((E.width = "100%"),
          M &&
            (r.find("tbody").height() > h.offsetHeight ||
              "scroll" == m.css("overflow-y")) &&
            (E.width = K(r.outerWidth() - b)),
          (e = r.outerWidth()))
        : "" !== d && ((E.width = K(d)), (e = r.outerWidth()));
      Z(Yb, ha);
      Z(function (F) {
        X.push(F.innerHTML);
        B.push(K(k(F).css("width")));
      }, ha);
      Z(function (F, Y) {
        -1 !== k.inArray(F, C) && (F.style.width = B[Y]);
      }, x);
      k(ha).height(0);
      H &&
        (Z(Yb, ka),
        Z(function (F) {
          lb.push(F.innerHTML);
          ba.push(K(k(F).css("width")));
        }, ka),
        Z(function (F, Y) {
          F.style.width = ba[Y];
        }, la),
        k(ka).height(0));
      Z(function (F, Y) {
        F.innerHTML = '<div class="dataTables_sizing">' + X[Y] + "</div>";
        F.childNodes[0].style.height = "0";
        F.childNodes[0].style.overflow = "hidden";
        F.style.width = B[Y];
      }, ha);
      H &&
        Z(function (F, Y) {
          F.innerHTML = '<div class="dataTables_sizing">' + lb[Y] + "</div>";
          F.childNodes[0].style.height = "0";
          F.childNodes[0].style.overflow = "hidden";
          F.style.width = ba[Y];
        }, ka);
      r.outerWidth() < e
        ? ((la =
            h.scrollHeight > h.offsetHeight || "scroll" == m.css("overflow-y")
              ? e + b
              : e),
          M &&
            (h.scrollHeight > h.offsetHeight ||
              "scroll" == m.css("overflow-y")) &&
            (E.width = K(la - b)),
          ("" !== c && "" === d) || aa(a, 1, "Possible column misalignment", 6))
        : (la = "100%");
      p.width = K(la);
      g.width = K(la);
      H && (a.nScrollFoot.style.width = K(la));
      !f && M && (p.height = K(A.offsetHeight + b));
      c = r.outerWidth();
      n[0].style.width = K(c);
      l.width = K(c);
      d = r.height() > h.clientHeight || "scroll" == m.css("overflow-y");
      f = "padding" + (W.bScrollbarLeft ? "Left" : "Right");
      l[f] = d ? b + "px" : "0px";
      H &&
        ((v[0].style.width = K(c)),
        (t[0].style.width = K(c)),
        (t[0].style[f] = d ? b + "px" : "0px"));
      r.children("colgroup").insertBefore(r.children("thead"));
      m.trigger("scroll");
      (!a.bSorted && !a.bFiltered) || a._drawHold || (h.scrollTop = 0);
    }
  }
  function Z(a, b, c) {
    for (var d = 0, f = 0, e = b.length, g, h; f < e; ) {
      g = b[f].firstChild;
      for (h = c ? c[f].firstChild : null; g; )
        1 === g.nodeType && (c ? a(g, h, d) : a(g, d), d++),
          (g = g.nextSibling),
          (h = c ? h.nextSibling : null);
      f++;
    }
  }
  function Xa(a) {
    var b = a.nTable,
      c = a.aoColumns,
      d = a.oScroll,
      f = d.sY,
      e = d.sX,
      g = d.sXInner,
      h = c.length,
      l = Fa(a, "bVisible"),
      n = k("th", a.nTHead),
      m = b.getAttribute("width"),
      p = b.parentNode,
      t = !1,
      v,
      x = a.oBrowser;
    d = x.bScrollOversize;
    (v = b.style.width) && -1 !== v.indexOf("%") && (m = v);
    for (v = 0; v < l.length; v++) {
      var r = c[l[v]];
      null !== r.sWidth && ((r.sWidth = Zb(r.sWidthOrig, p)), (t = !0));
    }
    if (d || (!t && !e && !f && h == na(a) && h == n.length))
      for (v = 0; v < h; v++)
        (l = sa(a, v)), null !== l && (c[l].sWidth = K(n.eq(v).width()));
    else {
      h = k(b).clone().css("visibility", "hidden").removeAttr("id");
      h.find("tbody tr").remove();
      var A = k("<tr/>").appendTo(h.find("tbody"));
      h.find("thead, tfoot").remove();
      h.append(k(a.nTHead).clone()).append(k(a.nTFoot).clone());
      h.find("tfoot th, tfoot td").css("width", "");
      n = Ka(a, h.find("thead")[0]);
      for (v = 0; v < l.length; v++)
        (r = c[l[v]]),
          (n[v].style.width =
            null !== r.sWidthOrig && "" !== r.sWidthOrig
              ? K(r.sWidthOrig)
              : ""),
          r.sWidthOrig &&
            e &&
            k(n[v]).append(
              k("<div/>").css({
                width: r.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1,
              })
            );
      if (a.aoData.length)
        for (v = 0; v < l.length; v++)
          (t = l[v]),
            (r = c[t]),
            k($b(a, t)).clone(!1).append(r.sContentPadding).appendTo(A);
      k("[name]", h).removeAttr("name");
      r = k("<div/>")
        .css(
          e || f
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden",
              }
            : {}
        )
        .append(h)
        .appendTo(p);
      e && g
        ? h.width(g)
        : e
        ? (h.css("width", "auto"),
          h.removeAttr("width"),
          h.width() < p.clientWidth && m && h.width(p.clientWidth))
        : f
        ? h.width(p.clientWidth)
        : m && h.width(m);
      for (v = f = 0; v < l.length; v++)
        (p = k(n[v])),
          (g = p.outerWidth() - p.width()),
          (p = x.bBounding
            ? Math.ceil(n[v].getBoundingClientRect().width)
            : p.outerWidth()),
          (f += p),
          (c[l[v]].sWidth = K(p - g));
      b.style.width = K(f);
      r.remove();
    }
    m && (b.style.width = K(m));
    (!m && !e) ||
      a._reszEvt ||
      ((b = function () {
        k(y).on(
          "resize.DT-" + a.sInstance,
          fb(function () {
            ra(a);
          })
        );
      }),
      d ? setTimeout(b, 1e3) : b(),
      (a._reszEvt = !0));
  }
  function Zb(a, b) {
    if (!a) return 0;
    a = k("<div/>")
      .css("width", K(a))
      .appendTo(b || z.body);
    b = a[0].offsetWidth;
    a.remove();
    return b;
  }
  function $b(a, b) {
    var c = ac(a, b);
    if (0 > c) return null;
    var d = a.aoData[c];
    return d.nTr ? d.anCells[b] : k("<td/>").html(S(a, c, b, "display"))[0];
  }
  function ac(a, b) {
    for (var c, d = -1, f = -1, e = 0, g = a.aoData.length; e < g; e++)
      (c = S(a, e, b, "display") + ""),
        (c = c.replace(sc, "")),
        (c = c.replace(/&nbsp;/g, " ")),
        c.length > d && ((d = c.length), (f = e));
    return f;
  }
  function K(a) {
    return null === a
      ? "0px"
      : "number" == typeof a
      ? 0 > a
        ? "0px"
        : a + "px"
      : a.match(/\d$/)
      ? a + "px"
      : a;
  }
  function pa(a) {
    var b = [],
      c = a.aoColumns;
    var d = a.aaSortingFixed;
    var f = k.isPlainObject(d);
    var e = [];
    var g = function (m) {
      m.length && !Array.isArray(m[0]) ? e.push(m) : k.merge(e, m);
    };
    Array.isArray(d) && g(d);
    f && d.pre && g(d.pre);
    g(a.aaSorting);
    f && d.post && g(d.post);
    for (a = 0; a < e.length; a++) {
      var h = e[a][0];
      g = c[h].aDataSort;
      d = 0;
      for (f = g.length; d < f; d++) {
        var l = g[d];
        var n = c[l].sType || "string";
        e[a]._idx === q && (e[a]._idx = k.inArray(e[a][1], c[l].asSorting));
        b.push({
          src: h,
          col: l,
          dir: e[a][1],
          index: e[a]._idx,
          type: n,
          formatter: u.ext.type.order[n + "-pre"],
        });
      }
    }
    return b;
  }
  function Gb(a) {
    var b,
      c = [],
      d = u.ext.type.order,
      f = a.aoData,
      e = 0,
      g = a.aiDisplayMaster;
    Ya(a);
    var h = pa(a);
    var l = 0;
    for (b = h.length; l < b; l++) {
      var n = h[l];
      n.formatter && e++;
      bc(a, n.col);
    }
    if ("ssp" != P(a) && 0 !== h.length) {
      l = 0;
      for (b = g.length; l < b; l++) c[g[l]] = l;
      e === h.length
        ? g.sort(function (m, p) {
            var t,
              v = h.length,
              x = f[m]._aSortData,
              r = f[p]._aSortData;
            for (t = 0; t < v; t++) {
              var A = h[t];
              var E = x[A.col];
              var H = r[A.col];
              E = E < H ? -1 : E > H ? 1 : 0;
              if (0 !== E) return "asc" === A.dir ? E : -E;
            }
            E = c[m];
            H = c[p];
            return E < H ? -1 : E > H ? 1 : 0;
          })
        : g.sort(function (m, p) {
            var t,
              v = h.length,
              x = f[m]._aSortData,
              r = f[p]._aSortData;
            for (t = 0; t < v; t++) {
              var A = h[t];
              var E = x[A.col];
              var H = r[A.col];
              A = d[A.type + "-" + A.dir] || d["string-" + A.dir];
              E = A(E, H);
              if (0 !== E) return E;
            }
            E = c[m];
            H = c[p];
            return E < H ? -1 : E > H ? 1 : 0;
          });
    }
    a.bSorted = !0;
  }
  function cc(a) {
    var b = a.aoColumns,
      c = pa(a);
    a = a.oLanguage.oAria;
    for (var d = 0, f = b.length; d < f; d++) {
      var e = b[d];
      var g = e.asSorting;
      var h = e.sTitle.replace(/<.*?>/g, "");
      var l = e.nTh;
      l.removeAttribute("aria-sort");
      e.bSortable &&
        (0 < c.length && c[0].col == d
          ? (l.setAttribute(
              "aria-sort",
              "asc" == c[0].dir ? "ascending" : "descending"
            ),
            (e = g[c[0].index + 1] || g[0]))
          : (e = g[0]),
        (h += "asc" === e ? a.sSortAscending : a.sSortDescending));
      l.setAttribute("aria-label", h);
    }
  }
  function nb(a, b, c, d) {
    var f = a.aaSorting,
      e = a.aoColumns[b].asSorting,
      g = function (h, l) {
        var n = h._idx;
        n === q && (n = k.inArray(h[1], e));
        return n + 1 < e.length ? n + 1 : l ? null : 0;
      };
    "number" === typeof f[0] && (f = a.aaSorting = [f]);
    c && a.oFeatures.bSortMulti
      ? ((c = k.inArray(b, T(f, "0"))),
        -1 !== c
          ? ((b = g(f[c], !0)),
            null === b && 1 === f.length && (b = 0),
            null === b ? f.splice(c, 1) : ((f[c][1] = e[b]), (f[c]._idx = b)))
          : (f.push([b, e[0], 0]), (f[f.length - 1]._idx = 0)))
      : f.length && f[0][0] == b
      ? ((b = g(f[0])), (f.length = 1), (f[0][1] = e[b]), (f[0]._idx = b))
      : ((f.length = 0), f.push([b, e[0]]), (f[0]._idx = 0));
    ja(a);
    "function" == typeof d && d(a);
  }
  function db(a, b, c, d) {
    var f = a.aoColumns[c];
    ob(b, {}, function (e) {
      !1 !== f.bSortable &&
        (a.oFeatures.bProcessing
          ? (U(a, !0),
            setTimeout(function () {
              nb(a, c, e.shiftKey, d);
              "ssp" !== P(a) && U(a, !1);
            }, 0))
          : nb(a, c, e.shiftKey, d));
    });
  }
  function Pa(a) {
    var b = a.aLastSort,
      c = a.oClasses.sSortColumn,
      d = pa(a),
      f = a.oFeatures,
      e;
    if (f.bSort && f.bSortClasses) {
      f = 0;
      for (e = b.length; f < e; f++) {
        var g = b[f].src;
        k(T(a.aoData, "anCells", g)).removeClass(c + (2 > f ? f + 1 : 3));
      }
      f = 0;
      for (e = d.length; f < e; f++)
        (g = d[f].src),
          k(T(a.aoData, "anCells", g)).addClass(c + (2 > f ? f + 1 : 3));
    }
    a.aLastSort = d;
  }
  function bc(a, b) {
    var c = a.aoColumns[b],
      d = u.ext.order[c.sSortDataType],
      f;
    d && (f = d.call(a.oInstance, a, b, ta(a, b)));
    for (
      var e, g = u.ext.type.order[c.sType + "-pre"], h = 0, l = a.aoData.length;
      h < l;
      h++
    )
      if (
        ((c = a.aoData[h]),
        c._aSortData || (c._aSortData = []),
        !c._aSortData[b] || d)
      )
        (e = d ? f[h] : S(a, h, b, "sort")), (c._aSortData[b] = g ? g(e) : e);
  }
  function Qa(a) {
    if (a.oFeatures.bStateSave && !a.bDestroying) {
      var b = {
        time: +new Date(),
        start: a._iDisplayStart,
        length: a._iDisplayLength,
        order: k.extend(!0, [], a.aaSorting),
        search: Ub(a.oPreviousSearch),
        columns: k.map(a.aoColumns, function (c, d) {
          return { visible: c.bVisible, search: Ub(a.aoPreSearchCols[d]) };
        }),
      };
      I(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
      a.oSavedState = b;
      a.fnStateSaveCallback.call(a.oInstance, a, b);
    }
  }
  function dc(a, b, c) {
    var d,
      f,
      e = a.aoColumns;
    b = function (h) {
      if (h && h.time) {
        var l = I(a, "aoStateLoadParams", "stateLoadParams", [a, h]);
        if (
          -1 === k.inArray(!1, l) &&
          ((l = a.iStateDuration),
          !(
            (0 < l && h.time < +new Date() - 1e3 * l) ||
            (h.columns && e.length !== h.columns.length)
          ))
        ) {
          a.oLoadedState = k.extend(!0, {}, h);
          h.start !== q &&
            ((a._iDisplayStart = h.start), (a.iInitDisplayStart = h.start));
          h.length !== q && (a._iDisplayLength = h.length);
          h.order !== q &&
            ((a.aaSorting = []),
            k.each(h.order, function (n, m) {
              a.aaSorting.push(m[0] >= e.length ? [0, m[1]] : m);
            }));
          h.search !== q && k.extend(a.oPreviousSearch, Vb(h.search));
          if (h.columns)
            for (d = 0, f = h.columns.length; d < f; d++)
              (l = h.columns[d]),
                l.visible !== q && (e[d].bVisible = l.visible),
                l.search !== q && k.extend(a.aoPreSearchCols[d], Vb(l.search));
          I(a, "aoStateLoaded", "stateLoaded", [a, h]);
        }
      }
      c();
    };
    if (a.oFeatures.bStateSave) {
      var g = a.fnStateLoadCallback.call(a.oInstance, a, b);
      g !== q && b(g);
    } else c();
  }
  function Ra(a) {
    var b = u.settings;
    a = k.inArray(a, T(b, "nTable"));
    return -1 !== a ? b[a] : null;
  }
  function aa(a, b, c, d) {
    c =
      "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;
    d &&
      (c +=
        ". For more information about this error, please see http://datatables.net/tn/" +
        d);
    if (b) y.console && console.log && console.log(c);
    else if (
      ((b = u.ext),
      (b = b.sErrMode || b.errMode),
      a && I(a, null, "error", [a, d, c]),
      "alert" == b)
    )
      alert(c);
    else {
      if ("throw" == b) throw Error(c);
      "function" == typeof b && b(a, d, c);
    }
  }
  function V(a, b, c, d) {
    Array.isArray(c)
      ? k.each(c, function (f, e) {
          Array.isArray(e) ? V(a, b, e[0], e[1]) : V(a, b, e);
        })
      : (d === q && (d = c), b[c] !== q && (a[d] = b[c]));
  }
  function pb(a, b, c) {
    var d;
    for (d in b)
      if (b.hasOwnProperty(d)) {
        var f = b[d];
        k.isPlainObject(f)
          ? (k.isPlainObject(a[d]) || (a[d] = {}), k.extend(!0, a[d], f))
          : c && "data" !== d && "aaData" !== d && Array.isArray(f)
          ? (a[d] = f.slice())
          : (a[d] = f);
      }
    return a;
  }
  function ob(a, b, c) {
    k(a)
      .on("click.DT", b, function (d) {
        k(a).trigger("blur");
        c(d);
      })
      .on("keypress.DT", b, function (d) {
        13 === d.which && (d.preventDefault(), c(d));
      })
      .on("selectstart.DT", function () {
        return !1;
      });
  }
  function Q(a, b, c, d) {
    c && a[b].push({ fn: c, sName: d });
  }
  function I(a, b, c, d) {
    var f = [];
    b &&
      (f = k.map(a[b].slice().reverse(), function (e, g) {
        return e.fn.apply(a.oInstance, d);
      }));
    null !== c &&
      ((b = k.Event(c + ".dt")), k(a.nTable).trigger(b, d), f.push(b.result));
    return f;
  }
  function jb(a) {
    var b = a._iDisplayStart,
      c = a.fnDisplayEnd(),
      d = a._iDisplayLength;
    b >= c && (b = c - d);
    b -= b % d;
    if (-1 === d || 0 > b) b = 0;
    a._iDisplayStart = b;
  }
  function eb(a, b) {
    a = a.renderer;
    var c = u.ext.renderer[b];
    return k.isPlainObject(a) && a[b]
      ? c[a[b]] || c._
      : "string" === typeof a
      ? c[a] || c._
      : c._;
  }
  function P(a) {
    return a.oFeatures.bServerSide
      ? "ssp"
      : a.ajax || a.sAjaxSource
      ? "ajax"
      : "dom";
  }
  function Ba(a, b) {
    var c = ec.numbers_length,
      d = Math.floor(c / 2);
    b <= c
      ? (a = qa(0, b))
      : a <= d
      ? ((a = qa(0, c - 2)), a.push("ellipsis"), a.push(b - 1))
      : (a >= b - 1 - d
          ? (a = qa(b - (c - 2), b))
          : ((a = qa(a - d + 2, a + d - 1)), a.push("ellipsis"), a.push(b - 1)),
        a.splice(0, 0, "ellipsis"),
        a.splice(0, 0, 0));
    a.DT_el = "span";
    return a;
  }
  function Va(a) {
    k.each(
      {
        num: function (b) {
          return Sa(b, a);
        },
        "num-fmt": function (b) {
          return Sa(b, a, qb);
        },
        "html-num": function (b) {
          return Sa(b, a, Ta);
        },
        "html-num-fmt": function (b) {
          return Sa(b, a, Ta, qb);
        },
      },
      function (b, c) {
        L.type.order[b + a + "-pre"] = c;
        b.match(/^html\-/) && (L.type.search[b + a] = L.type.search.html);
      }
    );
  }
  function fc(a) {
    return function () {
      var b = [Ra(this[u.ext.iApiIndex])].concat(
        Array.prototype.slice.call(arguments)
      );
      return u.ext.internal[a].apply(this, b);
    };
  }
  var u = function (a) {
      this.$ = function (e, g) {
        return this.api(!0).$(e, g);
      };
      this._ = function (e, g) {
        return this.api(!0).rows(e, g).data();
      };
      this.api = function (e) {
        return e ? new D(Ra(this[L.iApiIndex])) : new D(this);
      };
      this.fnAddData = function (e, g) {
        var h = this.api(!0);
        e =
          Array.isArray(e) && (Array.isArray(e[0]) || k.isPlainObject(e[0]))
            ? h.rows.add(e)
            : h.row.add(e);
        (g === q || g) && h.draw();
        return e.flatten().toArray();
      };
      this.fnAdjustColumnSizing = function (e) {
        var g = this.api(!0).columns.adjust(),
          h = g.settings()[0],
          l = h.oScroll;
        e === q || e ? g.draw(!1) : ("" !== l.sX || "" !== l.sY) && Ea(h);
      };
      this.fnClearTable = function (e) {
        var g = this.api(!0).clear();
        (e === q || e) && g.draw();
      };
      this.fnClose = function (e) {
        this.api(!0).row(e).child.hide();
      };
      this.fnDeleteRow = function (e, g, h) {
        var l = this.api(!0);
        e = l.rows(e);
        var n = e.settings()[0],
          m = n.aoData[e[0][0]];
        e.remove();
        g && g.call(this, n, m);
        (h === q || h) && l.draw();
        return m;
      };
      this.fnDestroy = function (e) {
        this.api(!0).destroy(e);
      };
      this.fnDraw = function (e) {
        this.api(!0).draw(e);
      };
      this.fnFilter = function (e, g, h, l, n, m) {
        n = this.api(!0);
        null === g || g === q
          ? n.search(e, h, l, m)
          : n.column(g).search(e, h, l, m);
        n.draw();
      };
      this.fnGetData = function (e, g) {
        var h = this.api(!0);
        if (e !== q) {
          var l = e.nodeName ? e.nodeName.toLowerCase() : "";
          return g !== q || "td" == l || "th" == l
            ? h.cell(e, g).data()
            : h.row(e).data() || null;
        }
        return h.data().toArray();
      };
      this.fnGetNodes = function (e) {
        var g = this.api(!0);
        return e !== q ? g.row(e).node() : g.rows().nodes().flatten().toArray();
      };
      this.fnGetPosition = function (e) {
        var g = this.api(!0),
          h = e.nodeName.toUpperCase();
        return "TR" == h
          ? g.row(e).index()
          : "TD" == h || "TH" == h
          ? ((e = g.cell(e).index()), [e.row, e.columnVisible, e.column])
          : null;
      };
      this.fnIsOpen = function (e) {
        return this.api(!0).row(e).child.isShown();
      };
      this.fnOpen = function (e, g, h) {
        return this.api(!0).row(e).child(g, h).show().child()[0];
      };
      this.fnPageChange = function (e, g) {
        e = this.api(!0).page(e);
        (g === q || g) && e.draw(!1);
      };
      this.fnSetColumnVis = function (e, g, h) {
        e = this.api(!0).column(e).visible(g);
        (h === q || h) && e.columns.adjust().draw();
      };
      this.fnSettings = function () {
        return Ra(this[L.iApiIndex]);
      };
      this.fnSort = function (e) {
        this.api(!0).order(e).draw();
      };
      this.fnSortListener = function (e, g, h) {
        this.api(!0).order.listener(e, g, h);
      };
      this.fnUpdate = function (e, g, h, l, n) {
        var m = this.api(!0);
        h === q || null === h ? m.row(g).data(e) : m.cell(g, h).data(e);
        (n === q || n) && m.columns.adjust();
        (l === q || l) && m.draw();
        return 0;
      };
      this.fnVersionCheck = L.fnVersionCheck;
      var b = this,
        c = a === q,
        d = this.length;
      c && (a = {});
      this.oApi = this.internal = L.internal;
      for (var f in u.ext.internal) f && (this[f] = fc(f));
      this.each(function () {
        var e = {},
          g = 1 < d ? pb(e, a, !0) : a,
          h = 0,
          l;
        e = this.getAttribute("id");
        var n = !1,
          m = u.defaults,
          p = k(this);
        if ("table" != this.nodeName.toLowerCase())
          aa(
            null,
            0,
            "Non-table node initialisation (" + this.nodeName + ")",
            2
          );
        else {
          yb(m);
          zb(m.column);
          O(m, m, !0);
          O(m.column, m.column, !0);
          O(m, k.extend(g, p.data()), !0);
          var t = u.settings;
          h = 0;
          for (l = t.length; h < l; h++) {
            var v = t[h];
            if (
              v.nTable == this ||
              (v.nTHead && v.nTHead.parentNode == this) ||
              (v.nTFoot && v.nTFoot.parentNode == this)
            ) {
              var x = g.bRetrieve !== q ? g.bRetrieve : m.bRetrieve;
              if (c || x) return v.oInstance;
              if (g.bDestroy !== q ? g.bDestroy : m.bDestroy) {
                v.oInstance.fnDestroy();
                break;
              } else {
                aa(v, 0, "Cannot reinitialise DataTable", 3);
                return;
              }
            }
            if (v.sTableId == this.id) {
              t.splice(h, 1);
              break;
            }
          }
          if (null === e || "" === e)
            this.id = e = "DataTables_Table_" + u.ext._unique++;
          var r = k.extend(!0, {}, u.models.oSettings, {
            sDestroyWidth: p[0].style.width,
            sInstance: e,
            sTableId: e,
          });
          r.nTable = this;
          r.oApi = b.internal;
          r.oInit = g;
          t.push(r);
          r.oInstance = 1 === b.length ? b : p.dataTable();
          yb(g);
          ma(g.oLanguage);
          g.aLengthMenu &&
            !g.iDisplayLength &&
            (g.iDisplayLength = Array.isArray(g.aLengthMenu[0])
              ? g.aLengthMenu[0][0]
              : g.aLengthMenu[0]);
          g = pb(k.extend(!0, {}, m), g);
          V(
            r.oFeatures,
            g,
            "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(
              " "
            )
          );
          V(r, g, [
            "asStripeClasses",
            "ajax",
            "fnServerData",
            "fnFormatNumber",
            "sServerMethod",
            "aaSorting",
            "aaSortingFixed",
            "aLengthMenu",
            "sPaginationType",
            "sAjaxSource",
            "sAjaxDataProp",
            "iStateDuration",
            "sDom",
            "bSortCellsTop",
            "iTabIndex",
            "fnStateLoadCallback",
            "fnStateSaveCallback",
            "renderer",
            "searchDelay",
            "rowId",
            ["iCookieDuration", "iStateDuration"],
            ["oSearch", "oPreviousSearch"],
            ["aoSearchCols", "aoPreSearchCols"],
            ["iDisplayLength", "_iDisplayLength"],
          ]);
          V(r.oScroll, g, [
            ["sScrollX", "sX"],
            ["sScrollXInner", "sXInner"],
            ["sScrollY", "sY"],
            ["bScrollCollapse", "bCollapse"],
          ]);
          V(r.oLanguage, g, "fnInfoCallback");
          Q(r, "aoDrawCallback", g.fnDrawCallback, "user");
          Q(r, "aoServerParams", g.fnServerParams, "user");
          Q(r, "aoStateSaveParams", g.fnStateSaveParams, "user");
          Q(r, "aoStateLoadParams", g.fnStateLoadParams, "user");
          Q(r, "aoStateLoaded", g.fnStateLoaded, "user");
          Q(r, "aoRowCallback", g.fnRowCallback, "user");
          Q(r, "aoRowCreatedCallback", g.fnCreatedRow, "user");
          Q(r, "aoHeaderCallback", g.fnHeaderCallback, "user");
          Q(r, "aoFooterCallback", g.fnFooterCallback, "user");
          Q(r, "aoInitComplete", g.fnInitComplete, "user");
          Q(r, "aoPreDrawCallback", g.fnPreDrawCallback, "user");
          r.rowIdFn = ia(g.rowId);
          Ab(r);
          var A = r.oClasses;
          k.extend(A, u.ext.classes, g.oClasses);
          p.addClass(A.sTable);
          r.iInitDisplayStart === q &&
            ((r.iInitDisplayStart = g.iDisplayStart),
            (r._iDisplayStart = g.iDisplayStart));
          null !== g.iDeferLoading &&
            ((r.bDeferLoading = !0),
            (e = Array.isArray(g.iDeferLoading)),
            (r._iRecordsDisplay = e ? g.iDeferLoading[0] : g.iDeferLoading),
            (r._iRecordsTotal = e ? g.iDeferLoading[1] : g.iDeferLoading));
          var E = r.oLanguage;
          k.extend(!0, E, g.oLanguage);
          E.sUrl &&
            (k.ajax({
              dataType: "json",
              url: E.sUrl,
              success: function (C) {
                ma(C);
                O(m.oLanguage, C);
                k.extend(!0, E, C);
                za(r);
              },
              error: function () {
                za(r);
              },
            }),
            (n = !0));
          null === g.asStripeClasses &&
            (r.asStripeClasses = [A.sStripeOdd, A.sStripeEven]);
          e = r.asStripeClasses;
          var H = p.children("tbody").find("tr").eq(0);
          -1 !==
            k.inArray(
              !0,
              k.map(e, function (C, B) {
                return H.hasClass(C);
              })
            ) &&
            (k("tbody tr", this).removeClass(e.join(" ")),
            (r.asDestroyStripes = e.slice()));
          e = [];
          t = this.getElementsByTagName("thead");
          0 !== t.length && (wa(r.aoHeader, t[0]), (e = Ka(r)));
          if (null === g.aoColumns)
            for (t = [], h = 0, l = e.length; h < l; h++) t.push(null);
          else t = g.aoColumns;
          h = 0;
          for (l = t.length; h < l; h++) Wa(r, e ? e[h] : null);
          Cb(r, g.aoColumnDefs, t, function (C, B) {
            Da(r, C, B);
          });
          if (H.length) {
            var W = function (C, B) {
              return null !== C.getAttribute("data-" + B) ? B : null;
            };
            k(H[0])
              .children("th, td")
              .each(function (C, B) {
                var ba = r.aoColumns[C];
                if (ba.mData === C) {
                  var X = W(B, "sort") || W(B, "order");
                  B = W(B, "filter") || W(B, "search");
                  if (null !== X || null !== B)
                    (ba.mData = {
                      _: C + ".display",
                      sort: null !== X ? C + ".@data-" + X : q,
                      type: null !== X ? C + ".@data-" + X : q,
                      filter: null !== B ? C + ".@data-" + B : q,
                    }),
                      Da(r, C);
                }
              });
          }
          var M = r.oFeatures;
          e = function () {
            if (g.aaSorting === q) {
              var C = r.aaSorting;
              h = 0;
              for (l = C.length; h < l; h++)
                C[h][1] = r.aoColumns[h].asSorting[0];
            }
            Pa(r);
            M.bSort &&
              Q(r, "aoDrawCallback", function () {
                if (r.bSorted) {
                  var ba = pa(r),
                    X = {};
                  k.each(ba, function (lb, Aa) {
                    X[Aa.src] = Aa.dir;
                  });
                  I(r, null, "order", [r, ba, X]);
                  cc(r);
                }
              });
            Q(
              r,
              "aoDrawCallback",
              function () {
                (r.bSorted || "ssp" === P(r) || M.bDeferRender) && Pa(r);
              },
              "sc"
            );
            C = p.children("caption").each(function () {
              this._captionSide = k(this).css("caption-side");
            });
            var B = p.children("thead");
            0 === B.length && (B = k("<thead/>").appendTo(p));
            r.nTHead = B[0];
            B = p.children("tbody");
            0 === B.length && (B = k("<tbody/>").appendTo(p));
            r.nTBody = B[0];
            B = p.children("tfoot");
            0 === B.length &&
              0 < C.length &&
              ("" !== r.oScroll.sX || "" !== r.oScroll.sY) &&
              (B = k("<tfoot/>").appendTo(p));
            0 === B.length || 0 === B.children().length
              ? p.addClass(A.sNoFooter)
              : 0 < B.length && ((r.nTFoot = B[0]), wa(r.aoFooter, r.nTFoot));
            if (g.aaData)
              for (h = 0; h < g.aaData.length; h++) ea(r, g.aaData[h]);
            else
              (r.bDeferLoading || "dom" == P(r)) &&
                Ga(r, k(r.nTBody).children("tr"));
            r.aiDisplay = r.aiDisplayMaster.slice();
            r.bInitialised = !0;
            !1 === n && za(r);
          };
          g.bStateSave
            ? ((M.bStateSave = !0),
              Q(r, "aoDrawCallback", Qa, "state_save"),
              dc(r, g, e))
            : e();
        }
      });
      b = null;
      return this;
    },
    L,
    w,
    J,
    rb = {},
    gc = /[\r\n\u2028]/g,
    Ta = /<.*?>/g,
    tc = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
    uc = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^|\-)/g,
    qb = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
    ca = function (a) {
      return a && !0 !== a && "-" !== a ? !1 : !0;
    },
    hc = function (a) {
      var b = parseInt(a, 10);
      return !isNaN(b) && isFinite(a) ? b : null;
    },
    ic = function (a, b) {
      rb[b] || (rb[b] = new RegExp(hb(b), "g"));
      return "string" === typeof a && "." !== b
        ? a.replace(/\./g, "").replace(rb[b], ".")
        : a;
    },
    sb = function (a, b, c) {
      var d = "string" === typeof a;
      if (ca(a)) return !0;
      b && d && (a = ic(a, b));
      c && d && (a = a.replace(qb, ""));
      return !isNaN(parseFloat(a)) && isFinite(a);
    },
    jc = function (a, b, c) {
      return ca(a)
        ? !0
        : ca(a) || "string" === typeof a
        ? sb(a.replace(Ta, ""), b, c)
          ? !0
          : null
        : null;
    },
    T = function (a, b, c) {
      var d = [],
        f = 0,
        e = a.length;
      if (c !== q) for (; f < e; f++) a[f] && a[f][b] && d.push(a[f][b][c]);
      else for (; f < e; f++) a[f] && d.push(a[f][b]);
      return d;
    },
    Ca = function (a, b, c, d) {
      var f = [],
        e = 0,
        g = b.length;
      if (d !== q) for (; e < g; e++) a[b[e]][c] && f.push(a[b[e]][c][d]);
      else for (; e < g; e++) f.push(a[b[e]][c]);
      return f;
    },
    qa = function (a, b) {
      var c = [];
      if (b === q) {
        b = 0;
        var d = a;
      } else (d = b), (b = a);
      for (a = b; a < d; a++) c.push(a);
      return c;
    },
    kc = function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]);
      return b;
    },
    Ja = function (a) {
      a: {
        if (!(2 > a.length)) {
          var b = a.slice().sort();
          for (var c = b[0], d = 1, f = b.length; d < f; d++) {
            if (b[d] === c) {
              b = !1;
              break a;
            }
            c = b[d];
          }
        }
        b = !0;
      }
      if (b) return a.slice();
      b = [];
      f = a.length;
      var e,
        g = 0;
      d = 0;
      a: for (; d < f; d++) {
        c = a[d];
        for (e = 0; e < g; e++) if (b[e] === c) continue a;
        b.push(c);
        g++;
      }
      return b;
    },
    lc = function (a, b) {
      if (Array.isArray(b)) for (var c = 0; c < b.length; c++) lc(a, b[c]);
      else a.push(b);
      return a;
    };
  Array.isArray ||
    (Array.isArray = function (a) {
      return "[object Array]" === Object.prototype.toString.call(a);
    });
  String.prototype.trim ||
    (String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    });
  u.util = {
    throttle: function (a, b) {
      var c = b !== q ? b : 200,
        d,
        f;
      return function () {
        var e = this,
          g = +new Date(),
          h = arguments;
        d && g < d + c
          ? (clearTimeout(f),
            (f = setTimeout(function () {
              d = q;
              a.apply(e, h);
            }, c)))
          : ((d = g), a.apply(e, h));
      };
    },
    escapeRegex: function (a) {
      return a.replace(uc, "\\$1");
    },
  };
  var R = function (a, b, c) {
      a[b] !== q && (a[c] = a[b]);
    },
    ua = /\[.*?\]$/,
    oa = /\(\)$/,
    hb = u.util.escapeRegex,
    Oa = k("<div>")[0],
    rc = Oa.textContent !== q,
    sc = /<.*?>/g,
    fb = u.util.throttle,
    mc = [],
    N = Array.prototype,
    vc = function (a) {
      var b,
        c = u.settings,
        d = k.map(c, function (e, g) {
          return e.nTable;
        });
      if (a) {
        if (a.nTable && a.oApi) return [a];
        if (a.nodeName && "table" === a.nodeName.toLowerCase()) {
          var f = k.inArray(a, d);
          return -1 !== f ? [c[f]] : null;
        }
        if (a && "function" === typeof a.settings)
          return a.settings().toArray();
        "string" === typeof a ? (b = k(a)) : a instanceof k && (b = a);
      } else return [];
      if (b)
        return b
          .map(function (e) {
            f = k.inArray(this, d);
            return -1 !== f ? c[f] : null;
          })
          .toArray();
    };
  var D = function (a, b) {
    if (!(this instanceof D)) return new D(a, b);
    var c = [],
      d = function (g) {
        (g = vc(g)) && c.push.apply(c, g);
      };
    if (Array.isArray(a)) for (var f = 0, e = a.length; f < e; f++) d(a[f]);
    else d(a);
    this.context = Ja(c);
    b && k.merge(this, b);
    this.selector = { rows: null, cols: null, opts: null };
    D.extend(this, this, mc);
  };
  u.Api = D;
  k.extend(D.prototype, {
    any: function () {
      return 0 !== this.count();
    },
    concat: N.concat,
    context: [],
    count: function () {
      return this.flatten().length;
    },
    each: function (a) {
      for (var b = 0, c = this.length; b < c; b++)
        a.call(this, this[b], b, this);
      return this;
    },
    eq: function (a) {
      var b = this.context;
      return b.length > a ? new D(b[a], this[a]) : null;
    },
    filter: function (a) {
      var b = [];
      if (N.filter) b = N.filter.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          a.call(this, this[c], c, this) && b.push(this[c]);
      return new D(this.context, b);
    },
    flatten: function () {
      var a = [];
      return new D(this.context, a.concat.apply(a, this.toArray()));
    },
    join: N.join,
    indexOf:
      N.indexOf ||
      function (a, b) {
        b = b || 0;
        for (var c = this.length; b < c; b++) if (this[b] === a) return b;
        return -1;
      },
    iterator: function (a, b, c, d) {
      var f = [],
        e,
        g,
        h = this.context,
        l,
        n = this.selector;
      "string" === typeof a && ((d = c), (c = b), (b = a), (a = !1));
      var m = 0;
      for (e = h.length; m < e; m++) {
        var p = new D(h[m]);
        if ("table" === b) {
          var t = c.call(p, h[m], m);
          t !== q && f.push(t);
        } else if ("columns" === b || "rows" === b)
          (t = c.call(p, h[m], this[m], m)), t !== q && f.push(t);
        else if (
          "column" === b ||
          "column-rows" === b ||
          "row" === b ||
          "cell" === b
        ) {
          var v = this[m];
          "column-rows" === b && (l = Ua(h[m], n.opts));
          var x = 0;
          for (g = v.length; x < g; x++)
            (t = v[x]),
              (t =
                "cell" === b
                  ? c.call(p, h[m], t.row, t.column, m, x)
                  : c.call(p, h[m], t, m, x, l)),
              t !== q && f.push(t);
        }
      }
      return f.length || d
        ? ((a = new D(h, a ? f.concat.apply([], f) : f)),
          (b = a.selector),
          (b.rows = n.rows),
          (b.cols = n.cols),
          (b.opts = n.opts),
          a)
        : this;
    },
    lastIndexOf:
      N.lastIndexOf ||
      function (a, b) {
        return this.indexOf.apply(this.toArray.reverse(), arguments);
      },
    length: 0,
    map: function (a) {
      var b = [];
      if (N.map) b = N.map.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          b.push(a.call(this, this[c], c));
      return new D(this.context, b);
    },
    pluck: function (a) {
      return this.map(function (b) {
        return b[a];
      });
    },
    pop: N.pop,
    push: N.push,
    reduce:
      N.reduce ||
      function (a, b) {
        return Bb(this, a, b, 0, this.length, 1);
      },
    reduceRight:
      N.reduceRight ||
      function (a, b) {
        return Bb(this, a, b, this.length - 1, -1, -1);
      },
    reverse: N.reverse,
    selector: null,
    shift: N.shift,
    slice: function () {
      return new D(this.context, this);
    },
    sort: N.sort,
    splice: N.splice,
    toArray: function () {
      return N.slice.call(this);
    },
    to$: function () {
      return k(this);
    },
    toJQuery: function () {
      return k(this);
    },
    unique: function () {
      return new D(this.context, Ja(this));
    },
    unshift: N.unshift,
  });
  D.extend = function (a, b, c) {
    if (c.length && b && (b instanceof D || b.__dt_wrapper)) {
      var d,
        f = function (h, l, n) {
          return function () {
            var m = l.apply(h, arguments);
            D.extend(m, m, n.methodExt);
            return m;
          };
        };
      var e = 0;
      for (d = c.length; e < d; e++) {
        var g = c[e];
        b[g.name] =
          "function" === g.type
            ? f(a, g.val, g)
            : "object" === g.type
            ? {}
            : g.val;
        b[g.name].__dt_wrapper = !0;
        D.extend(a, b[g.name], g.propExt);
      }
    }
  };
  D.register = w = function (a, b) {
    if (Array.isArray(a))
      for (var c = 0, d = a.length; c < d; c++) D.register(a[c], b);
    else {
      d = a.split(".");
      var f = mc,
        e;
      a = 0;
      for (c = d.length; a < c; a++) {
        var g = (e = -1 !== d[a].indexOf("()")) ? d[a].replace("()", "") : d[a];
        a: {
          var h = 0;
          for (var l = f.length; h < l; h++)
            if (f[h].name === g) {
              h = f[h];
              break a;
            }
          h = null;
        }
        h ||
          ((h = {
            name: g,
            val: {},
            methodExt: [],
            propExt: [],
            type: "object",
          }),
          f.push(h));
        a === c - 1
          ? ((h.val = b),
            (h.type =
              "function" === typeof b
                ? "function"
                : k.isPlainObject(b)
                ? "object"
                : "other"))
          : (f = e ? h.methodExt : h.propExt);
      }
    }
  };
  D.registerPlural = J = function (a, b, c) {
    D.register(a, c);
    D.register(b, function () {
      var d = c.apply(this, arguments);
      return d === this
        ? this
        : d instanceof D
        ? d.length
          ? Array.isArray(d[0])
            ? new D(d.context, d[0])
            : d[0]
          : q
        : d;
    });
  };
  var nc = function (a, b) {
    if (Array.isArray(a))
      return k.map(a, function (d) {
        return nc(d, b);
      });
    if ("number" === typeof a) return [b[a]];
    var c = k.map(b, function (d, f) {
      return d.nTable;
    });
    return k(c)
      .filter(a)
      .map(function (d) {
        d = k.inArray(this, c);
        return b[d];
      })
      .toArray();
  };
  w("tables()", function (a) {
    return a !== q && null !== a ? new D(nc(a, this.context)) : this;
  });
  w("table()", function (a) {
    a = this.tables(a);
    var b = a.context;
    return b.length ? new D(b[0]) : a;
  });
  J("tables().nodes()", "table().node()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTable;
      },
      1
    );
  });
  J("tables().body()", "table().body()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTBody;
      },
      1
    );
  });
  J("tables().header()", "table().header()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTHead;
      },
      1
    );
  });
  J("tables().footer()", "table().footer()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTFoot;
      },
      1
    );
  });
  J("tables().containers()", "table().container()", function () {
    return this.iterator(
      "table",
      function (a) {
        return a.nTableWrapper;
      },
      1
    );
  });
  w("draw()", function (a) {
    return this.iterator("table", function (b) {
      "page" === a
        ? fa(b)
        : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0),
          ja(b, !1 === a));
    });
  });
  w("page()", function (a) {
    return a === q
      ? this.page.info().page
      : this.iterator("table", function (b) {
          kb(b, a);
        });
  });
  w("page.info()", function (a) {
    if (0 === this.context.length) return q;
    a = this.context[0];
    var b = a._iDisplayStart,
      c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
      d = a.fnRecordsDisplay(),
      f = -1 === c;
    return {
      page: f ? 0 : Math.floor(b / c),
      pages: f ? 1 : Math.ceil(d / c),
      start: b,
      end: a.fnDisplayEnd(),
      length: c,
      recordsTotal: a.fnRecordsTotal(),
      recordsDisplay: d,
      serverSide: "ssp" === P(a),
    };
  });
  w("page.len()", function (a) {
    return a === q
      ? 0 !== this.context.length
        ? this.context[0]._iDisplayLength
        : q
      : this.iterator("table", function (b) {
          ib(b, a);
        });
  });
  var oc = function (a, b, c) {
    if (c) {
      var d = new D(a);
      d.one("draw", function () {
        c(d.ajax.json());
      });
    }
    if ("ssp" == P(a)) ja(a, b);
    else {
      U(a, !0);
      var f = a.jqXHR;
      f && 4 !== f.readyState && f.abort();
      La(a, [], function (e) {
        Ha(a);
        e = Ma(a, e);
        for (var g = 0, h = e.length; g < h; g++) ea(a, e[g]);
        ja(a, b);
        U(a, !1);
      });
    }
  };
  w("ajax.json()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].json;
  });
  w("ajax.params()", function () {
    var a = this.context;
    if (0 < a.length) return a[0].oAjaxData;
  });
  w("ajax.reload()", function (a, b) {
    return this.iterator("table", function (c) {
      oc(c, !1 === b, a);
    });
  });
  w("ajax.url()", function (a) {
    var b = this.context;
    if (a === q) {
      if (0 === b.length) return q;
      b = b[0];
      return b.ajax
        ? k.isPlainObject(b.ajax)
          ? b.ajax.url
          : b.ajax
        : b.sAjaxSource;
    }
    return this.iterator("table", function (c) {
      k.isPlainObject(c.ajax) ? (c.ajax.url = a) : (c.ajax = a);
    });
  });
  w("ajax.url().load()", function (a, b) {
    return this.iterator("table", function (c) {
      oc(c, !1 === b, a);
    });
  });
  var tb = function (a, b, c, d, f) {
      var e = [],
        g,
        h,
        l;
      var n = typeof b;
      (b && "string" !== n && "function" !== n && b.length !== q) || (b = [b]);
      n = 0;
      for (h = b.length; n < h; n++) {
        var m =
          b[n] && b[n].split && !b[n].match(/[\[\(:]/)
            ? b[n].split(",")
            : [b[n]];
        var p = 0;
        for (l = m.length; p < l; p++)
          (g = c("string" === typeof m[p] ? m[p].trim() : m[p])) &&
            g.length &&
            (e = e.concat(g));
      }
      a = L.selector[a];
      if (a.length) for (n = 0, h = a.length; n < h; n++) e = a[n](d, f, e);
      return Ja(e);
    },
    ub = function (a) {
      a || (a = {});
      a.filter && a.search === q && (a.search = a.filter);
      return k.extend({ search: "none", order: "current", page: "all" }, a);
    },
    vb = function (a) {
      for (var b = 0, c = a.length; b < c; b++)
        if (0 < a[b].length)
          return (
            (a[0] = a[b]),
            (a[0].length = 1),
            (a.length = 1),
            (a.context = [a.context[b]]),
            a
          );
      a.length = 0;
      return a;
    },
    Ua = function (a, b) {
      var c = [],
        d = a.aiDisplay;
      var f = a.aiDisplayMaster;
      var e = b.search;
      var g = b.order;
      b = b.page;
      if ("ssp" == P(a)) return "removed" === e ? [] : qa(0, f.length);
      if ("current" == b)
        for (g = a._iDisplayStart, a = a.fnDisplayEnd(); g < a; g++)
          c.push(d[g]);
      else if ("current" == g || "applied" == g)
        if ("none" == e) c = f.slice();
        else if ("applied" == e) c = d.slice();
        else {
          if ("removed" == e) {
            var h = {};
            g = 0;
            for (a = d.length; g < a; g++) h[d[g]] = null;
            c = k.map(f, function (l) {
              return h.hasOwnProperty(l) ? null : l;
            });
          }
        }
      else if ("index" == g || "original" == g)
        for (g = 0, a = a.aoData.length; g < a; g++)
          "none" == e
            ? c.push(g)
            : ((f = k.inArray(g, d)),
              ((-1 === f && "removed" == e) || (0 <= f && "applied" == e)) &&
                c.push(g));
      return c;
    },
    wc = function (a, b, c) {
      var d;
      return tb(
        "row",
        b,
        function (f) {
          var e = hc(f),
            g = a.aoData;
          if (null !== e && !c) return [e];
          d || (d = Ua(a, c));
          if (null !== e && -1 !== k.inArray(e, d)) return [e];
          if (null === f || f === q || "" === f) return d;
          if ("function" === typeof f)
            return k.map(d, function (l) {
              var n = g[l];
              return f(l, n._aData, n.nTr) ? l : null;
            });
          if (f.nodeName) {
            e = f._DT_RowIndex;
            var h = f._DT_CellIndex;
            if (e !== q) return g[e] && g[e].nTr === f ? [e] : [];
            if (h)
              return g[h.row] && g[h.row].nTr === f.parentNode ? [h.row] : [];
            e = k(f).closest("*[data-dt-row]");
            return e.length ? [e.data("dt-row")] : [];
          }
          if (
            "string" === typeof f &&
            "#" === f.charAt(0) &&
            ((e = a.aIds[f.replace(/^#/, "")]), e !== q)
          )
            return [e.idx];
          e = kc(Ca(a.aoData, d, "nTr"));
          return k(e)
            .filter(f)
            .map(function () {
              return this._DT_RowIndex;
            })
            .toArray();
        },
        a,
        c
      );
    };
  w("rows()", function (a, b) {
    a === q ? (a = "") : k.isPlainObject(a) && ((b = a), (a = ""));
    b = ub(b);
    var c = this.iterator(
      "table",
      function (d) {
        return wc(d, a, b);
      },
      1
    );
    c.selector.rows = a;
    c.selector.opts = b;
    return c;
  });
  w("rows().nodes()", function () {
    return this.iterator(
      "row",
      function (a, b) {
        return a.aoData[b].nTr || q;
      },
      1
    );
  });
  w("rows().data()", function () {
    return this.iterator(
      !0,
      "rows",
      function (a, b) {
        return Ca(a.aoData, b, "_aData");
      },
      1
    );
  });
  J("rows().cache()", "row().cache()", function (a) {
    return this.iterator(
      "row",
      function (b, c) {
        b = b.aoData[c];
        return "search" === a ? b._aFilterData : b._aSortData;
      },
      1
    );
  });
  J("rows().invalidate()", "row().invalidate()", function (a) {
    return this.iterator("row", function (b, c) {
      va(b, c, a);
    });
  });
  J("rows().indexes()", "row().index()", function () {
    return this.iterator(
      "row",
      function (a, b) {
        return b;
      },
      1
    );
  });
  J("rows().ids()", "row().id()", function (a) {
    for (var b = [], c = this.context, d = 0, f = c.length; d < f; d++)
      for (var e = 0, g = this[d].length; e < g; e++) {
        var h = c[d].rowIdFn(c[d].aoData[this[d][e]]._aData);
        b.push((!0 === a ? "#" : "") + h);
      }
    return new D(c, b);
  });
  J("rows().remove()", "row().remove()", function () {
    var a = this;
    this.iterator("row", function (b, c, d) {
      var f = b.aoData,
        e = f[c],
        g,
        h;
      f.splice(c, 1);
      var l = 0;
      for (g = f.length; l < g; l++) {
        var n = f[l];
        var m = n.anCells;
        null !== n.nTr && (n.nTr._DT_RowIndex = l);
        if (null !== m)
          for (n = 0, h = m.length; n < h; n++) m[n]._DT_CellIndex.row = l;
      }
      Ia(b.aiDisplayMaster, c);
      Ia(b.aiDisplay, c);
      Ia(a[d], c, !1);
      0 < b._iRecordsDisplay && b._iRecordsDisplay--;
      jb(b);
      c = b.rowIdFn(e._aData);
      c !== q && delete b.aIds[c];
    });
    this.iterator("table", function (b) {
      for (var c = 0, d = b.aoData.length; c < d; c++) b.aoData[c].idx = c;
    });
    return this;
  });
  w("rows.add()", function (a) {
    var b = this.iterator(
        "table",
        function (d) {
          var f,
            e = [];
          var g = 0;
          for (f = a.length; g < f; g++) {
            var h = a[g];
            h.nodeName && "TR" === h.nodeName.toUpperCase()
              ? e.push(Ga(d, h)[0])
              : e.push(ea(d, h));
          }
          return e;
        },
        1
      ),
      c = this.rows(-1);
    c.pop();
    k.merge(c, b);
    return c;
  });
  w("row()", function (a, b) {
    return vb(this.rows(a, b));
  });
  w("row().data()", function (a) {
    var b = this.context;
    if (a === q)
      return b.length && this.length ? b[0].aoData[this[0]]._aData : q;
    var c = b[0].aoData[this[0]];
    c._aData = a;
    Array.isArray(a) && c.nTr && c.nTr.id && da(b[0].rowId)(a, c.nTr.id);
    va(b[0], this[0], "data");
    return this;
  });
  w("row().node()", function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null;
  });
  w("row.add()", function (a) {
    a instanceof k && a.length && (a = a[0]);
    var b = this.iterator("table", function (c) {
      return a.nodeName && "TR" === a.nodeName.toUpperCase()
        ? Ga(c, a)[0]
        : ea(c, a);
    });
    return this.row(b[0]);
  });
  var xc = function (a, b, c, d) {
      var f = [],
        e = function (g, h) {
          if (Array.isArray(g) || g instanceof k)
            for (var l = 0, n = g.length; l < n; l++) e(g[l], h);
          else
            g.nodeName && "tr" === g.nodeName.toLowerCase()
              ? f.push(g)
              : ((l = k("<tr><td></td></tr>").addClass(h)),
                (k("td", l).addClass(h).html(g)[0].colSpan = na(a)),
                f.push(l[0]));
        };
      e(c, d);
      b._details && b._details.detach();
      b._details = k(f);
      b._detailsShow && b._details.insertAfter(b.nTr);
    },
    wb = function (a, b) {
      var c = a.context;
      c.length &&
        (a = c[0].aoData[b !== q ? b : a[0]]) &&
        a._details &&
        (a._details.remove(), (a._detailsShow = q), (a._details = q));
    },
    pc = function (a, b) {
      var c = a.context;
      c.length &&
        a.length &&
        ((a = c[0].aoData[a[0]]),
        a._details &&
          ((a._detailsShow = b)
            ? a._details.insertAfter(a.nTr)
            : a._details.detach(),
          yc(c[0])));
    },
    yc = function (a) {
      var b = new D(a),
        c = a.aoData;
      b.off(
        "draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"
      );
      0 < T(c, "_details").length &&
        (b.on("draw.dt.DT_details", function (d, f) {
          a === f &&
            b
              .rows({ page: "current" })
              .eq(0)
              .each(function (e) {
                e = c[e];
                e._detailsShow && e._details.insertAfter(e.nTr);
              });
        }),
        b.on("column-visibility.dt.DT_details", function (d, f, e, g) {
          if (a === f)
            for (f = na(f), e = 0, g = c.length; e < g; e++)
              (d = c[e]),
                d._details &&
                  d._details.children("td[colspan]").attr("colspan", f);
        }),
        b.on("destroy.dt.DT_details", function (d, f) {
          if (a === f)
            for (d = 0, f = c.length; d < f; d++) c[d]._details && wb(b, d);
        }));
    };
  w("row().child()", function (a, b) {
    var c = this.context;
    if (a === q)
      return c.length && this.length ? c[0].aoData[this[0]]._details : q;
    !0 === a
      ? this.child.show()
      : !1 === a
      ? wb(this)
      : c.length && this.length && xc(c[0], c[0].aoData[this[0]], a, b);
    return this;
  });
  w(["row().child.show()", "row().child().show()"], function (a) {
    pc(this, !0);
    return this;
  });
  w(["row().child.hide()", "row().child().hide()"], function () {
    pc(this, !1);
    return this;
  });
  w(["row().child.remove()", "row().child().remove()"], function () {
    wb(this);
    return this;
  });
  w("row().child.isShown()", function () {
    var a = this.context;
    return a.length && this.length
      ? a[0].aoData[this[0]]._detailsShow || !1
      : !1;
  });
  var zc = /^([^:]+):(name|visIdx|visible)$/,
    qc = function (a, b, c, d, f) {
      c = [];
      d = 0;
      for (var e = f.length; d < e; d++) c.push(S(a, f[d], b));
      return c;
    },
    Ac = function (a, b, c) {
      var d = a.aoColumns,
        f = T(d, "sName"),
        e = T(d, "nTh");
      return tb(
        "column",
        b,
        function (g) {
          var h = hc(g);
          if ("" === g) return qa(d.length);
          if (null !== h) return [0 <= h ? h : d.length + h];
          if ("function" === typeof g) {
            var l = Ua(a, c);
            return k.map(d, function (p, t) {
              return g(t, qc(a, t, 0, 0, l), e[t]) ? t : null;
            });
          }
          var n = "string" === typeof g ? g.match(zc) : "";
          if (n)
            switch (n[2]) {
              case "visIdx":
              case "visible":
                h = parseInt(n[1], 10);
                if (0 > h) {
                  var m = k.map(d, function (p, t) {
                    return p.bVisible ? t : null;
                  });
                  return [m[m.length + h]];
                }
                return [sa(a, h)];
              case "name":
                return k.map(f, function (p, t) {
                  return p === n[1] ? t : null;
                });
              default:
                return [];
            }
          if (g.nodeName && g._DT_CellIndex) return [g._DT_CellIndex.column];
          h = k(e)
            .filter(g)
            .map(function () {
              return k.inArray(this, e);
            })
            .toArray();
          if (h.length || !g.nodeName) return h;
          h = k(g).closest("*[data-dt-column]");
          return h.length ? [h.data("dt-column")] : [];
        },
        a,
        c
      );
    };
  w("columns()", function (a, b) {
    a === q ? (a = "") : k.isPlainObject(a) && ((b = a), (a = ""));
    b = ub(b);
    var c = this.iterator(
      "table",
      function (d) {
        return Ac(d, a, b);
      },
      1
    );
    c.selector.cols = a;
    c.selector.opts = b;
    return c;
  });
  J("columns().header()", "column().header()", function (a, b) {
    return this.iterator(
      "column",
      function (c, d) {
        return c.aoColumns[d].nTh;
      },
      1
    );
  });
  J("columns().footer()", "column().footer()", function (a, b) {
    return this.iterator(
      "column",
      function (c, d) {
        return c.aoColumns[d].nTf;
      },
      1
    );
  });
  J("columns().data()", "column().data()", function () {
    return this.iterator("column-rows", qc, 1);
  });
  J("columns().dataSrc()", "column().dataSrc()", function () {
    return this.iterator(
      "column",
      function (a, b) {
        return a.aoColumns[b].mData;
      },
      1
    );
  });
  J("columns().cache()", "column().cache()", function (a) {
    return this.iterator(
      "column-rows",
      function (b, c, d, f, e) {
        return Ca(
          b.aoData,
          e,
          "search" === a ? "_aFilterData" : "_aSortData",
          c
        );
      },
      1
    );
  });
  J("columns().nodes()", "column().nodes()", function () {
    return this.iterator(
      "column-rows",
      function (a, b, c, d, f) {
        return Ca(a.aoData, f, "anCells", b);
      },
      1
    );
  });
  J("columns().visible()", "column().visible()", function (a, b) {
    var c = this,
      d = this.iterator("column", function (f, e) {
        if (a === q) return f.aoColumns[e].bVisible;
        var g = f.aoColumns,
          h = g[e],
          l = f.aoData,
          n;
        if (a !== q && h.bVisible !== a) {
          if (a) {
            var m = k.inArray(!0, T(g, "bVisible"), e + 1);
            g = 0;
            for (n = l.length; g < n; g++) {
              var p = l[g].nTr;
              f = l[g].anCells;
              p && p.insertBefore(f[e], f[m] || null);
            }
          } else k(T(f.aoData, "anCells", e)).detach();
          h.bVisible = a;
        }
      });
    a !== q &&
      this.iterator("table", function (f) {
        xa(f, f.aoHeader);
        xa(f, f.aoFooter);
        f.aiDisplay.length ||
          k(f.nTBody).find("td[colspan]").attr("colspan", na(f));
        Qa(f);
        c.iterator("column", function (e, g) {
          I(e, null, "column-visibility", [e, g, a, b]);
        });
        (b === q || b) && c.columns.adjust();
      });
    return d;
  });
  J("columns().indexes()", "column().index()", function (a) {
    return this.iterator(
      "column",
      function (b, c) {
        return "visible" === a ? ta(b, c) : c;
      },
      1
    );
  });
  w("columns.adjust()", function () {
    return this.iterator(
      "table",
      function (a) {
        ra(a);
      },
      1
    );
  });
  w("column.index()", function (a, b) {
    if (0 !== this.context.length) {
      var c = this.context[0];
      if ("fromVisible" === a || "toData" === a) return sa(c, b);
      if ("fromData" === a || "toVisible" === a) return ta(c, b);
    }
  });
  w("column()", function (a, b) {
    return vb(this.columns(a, b));
  });
  var Bc = function (a, b, c) {
    var d = a.aoData,
      f = Ua(a, c),
      e = kc(Ca(d, f, "anCells")),
      g = k(lc([], e)),
      h,
      l = a.aoColumns.length,
      n,
      m,
      p,
      t,
      v,
      x;
    return tb(
      "cell",
      b,
      function (r) {
        var A = "function" === typeof r;
        if (null === r || r === q || A) {
          n = [];
          m = 0;
          for (p = f.length; m < p; m++)
            for (h = f[m], t = 0; t < l; t++)
              (v = { row: h, column: t }),
                A
                  ? ((x = d[h]),
                    r(v, S(a, h, t), x.anCells ? x.anCells[t] : null) &&
                      n.push(v))
                  : n.push(v);
          return n;
        }
        if (k.isPlainObject(r))
          return r.column !== q && r.row !== q && -1 !== k.inArray(r.row, f)
            ? [r]
            : [];
        A = g
          .filter(r)
          .map(function (E, H) {
            return { row: H._DT_CellIndex.row, column: H._DT_CellIndex.column };
          })
          .toArray();
        if (A.length || !r.nodeName) return A;
        x = k(r).closest("*[data-dt-row]");
        return x.length
          ? [{ row: x.data("dt-row"), column: x.data("dt-column") }]
          : [];
      },
      a,
      c
    );
  };
  w("cells()", function (a, b, c) {
    k.isPlainObject(a) &&
      (a.row === q ? ((c = a), (a = null)) : ((c = b), (b = null)));
    k.isPlainObject(b) && ((c = b), (b = null));
    if (null === b || b === q)
      return this.iterator("table", function (m) {
        return Bc(m, a, ub(c));
      });
    var d = c ? { page: c.page, order: c.order, search: c.search } : {},
      f = this.columns(b, d),
      e = this.rows(a, d),
      g,
      h,
      l,
      n;
    d = this.iterator(
      "table",
      function (m, p) {
        m = [];
        g = 0;
        for (h = e[p].length; g < h; g++)
          for (l = 0, n = f[p].length; l < n; l++)
            m.push({ row: e[p][g], column: f[p][l] });
        return m;
      },
      1
    );
    d = c && c.selected ? this.cells(d, c) : d;
    k.extend(d.selector, { cols: b, rows: a, opts: c });
    return d;
  });
  J("cells().nodes()", "cell().node()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : q;
      },
      1
    );
  });
  w("cells().data()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return S(a, b, c);
      },
      1
    );
  });
  J("cells().cache()", "cell().cache()", function (a) {
    a = "search" === a ? "_aFilterData" : "_aSortData";
    return this.iterator(
      "cell",
      function (b, c, d) {
        return b.aoData[c][a][d];
      },
      1
    );
  });
  J("cells().render()", "cell().render()", function (a) {
    return this.iterator(
      "cell",
      function (b, c, d) {
        return S(b, c, d, a);
      },
      1
    );
  });
  J("cells().indexes()", "cell().index()", function () {
    return this.iterator(
      "cell",
      function (a, b, c) {
        return { row: b, column: c, columnVisible: ta(a, c) };
      },
      1
    );
  });
  J("cells().invalidate()", "cell().invalidate()", function (a) {
    return this.iterator("cell", function (b, c, d) {
      va(b, c, a, d);
    });
  });
  w("cell()", function (a, b, c) {
    return vb(this.cells(a, b, c));
  });
  w("cell().data()", function (a) {
    var b = this.context,
      c = this[0];
    if (a === q)
      return b.length && c.length ? S(b[0], c[0].row, c[0].column) : q;
    Db(b[0], c[0].row, c[0].column, a);
    va(b[0], c[0].row, "data", c[0].column);
    return this;
  });
  w("order()", function (a, b) {
    var c = this.context;
    if (a === q) return 0 !== c.length ? c[0].aaSorting : q;
    "number" === typeof a
      ? (a = [[a, b]])
      : a.length &&
        !Array.isArray(a[0]) &&
        (a = Array.prototype.slice.call(arguments));
    return this.iterator("table", function (d) {
      d.aaSorting = a.slice();
    });
  });
  w("order.listener()", function (a, b, c) {
    return this.iterator("table", function (d) {
      db(d, a, b, c);
    });
  });
  w("order.fixed()", function (a) {
    if (!a) {
      var b = this.context;
      b = b.length ? b[0].aaSortingFixed : q;
      return Array.isArray(b) ? { pre: b } : b;
    }
    return this.iterator("table", function (c) {
      c.aaSortingFixed = k.extend(!0, {}, a);
    });
  });
  w(["columns().order()", "column().order()"], function (a) {
    var b = this;
    return this.iterator("table", function (c, d) {
      var f = [];
      k.each(b[d], function (e, g) {
        f.push([g, a]);
      });
      c.aaSorting = f;
    });
  });
  w("search()", function (a, b, c, d) {
    var f = this.context;
    return a === q
      ? 0 !== f.length
        ? f[0].oPreviousSearch.sSearch
        : q
      : this.iterator("table", function (e) {
          e.oFeatures.bFilter &&
            ya(
              e,
              k.extend({}, e.oPreviousSearch, {
                sSearch: a + "",
                bRegex: null === b ? !1 : b,
                bSmart: null === c ? !0 : c,
                bCaseInsensitive: null === d ? !0 : d,
              }),
              1
            );
        });
  });
  J("columns().search()", "column().search()", function (a, b, c, d) {
    return this.iterator("column", function (f, e) {
      var g = f.aoPreSearchCols;
      if (a === q) return g[e].sSearch;
      f.oFeatures.bFilter &&
        (k.extend(g[e], {
          sSearch: a + "",
          bRegex: null === b ? !1 : b,
          bSmart: null === c ? !0 : c,
          bCaseInsensitive: null === d ? !0 : d,
        }),
        ya(f, f.oPreviousSearch, 1));
    });
  });
  w("state()", function () {
    return this.context.length ? this.context[0].oSavedState : null;
  });
  w("state.clear()", function () {
    return this.iterator("table", function (a) {
      a.fnStateSaveCallback.call(a.oInstance, a, {});
    });
  });
  w("state.loaded()", function () {
    return this.context.length ? this.context[0].oLoadedState : null;
  });
  w("state.save()", function () {
    return this.iterator("table", function (a) {
      Qa(a);
    });
  });
  u.versionCheck = u.fnVersionCheck = function (a) {
    var b = u.version.split(".");
    a = a.split(".");
    for (var c, d, f = 0, e = a.length; f < e; f++)
      if (
        ((c = parseInt(b[f], 10) || 0), (d = parseInt(a[f], 10) || 0), c !== d)
      )
        return c > d;
    return !0;
  };
  u.isDataTable = u.fnIsDataTable = function (a) {
    var b = k(a).get(0),
      c = !1;
    if (a instanceof u.Api) return !0;
    k.each(u.settings, function (d, f) {
      d = f.nScrollHead ? k("table", f.nScrollHead)[0] : null;
      var e = f.nScrollFoot ? k("table", f.nScrollFoot)[0] : null;
      if (f.nTable === b || d === b || e === b) c = !0;
    });
    return c;
  };
  u.tables = u.fnTables = function (a) {
    var b = !1;
    k.isPlainObject(a) && ((b = a.api), (a = a.visible));
    var c = k.map(u.settings, function (d) {
      if (!a || (a && k(d.nTable).is(":visible"))) return d.nTable;
    });
    return b ? new D(c) : c;
  };
  u.camelToHungarian = O;
  w("$()", function (a, b) {
    b = this.rows(b).nodes();
    b = k(b);
    return k([].concat(b.filter(a).toArray(), b.find(a).toArray()));
  });
  k.each(["on", "one", "off"], function (a, b) {
    w(b + "()", function () {
      var c = Array.prototype.slice.call(arguments);
      c[0] = k
        .map(c[0].split(/\s/), function (f) {
          return f.match(/\.dt\b/) ? f : f + ".dt";
        })
        .join(" ");
      var d = k(this.tables().nodes());
      d[b].apply(d, c);
      return this;
    });
  });
  w("clear()", function () {
    return this.iterator("table", function (a) {
      Ha(a);
    });
  });
  w("settings()", function () {
    return new D(this.context, this.context);
  });
  w("init()", function () {
    var a = this.context;
    return a.length ? a[0].oInit : null;
  });
  w("data()", function () {
    return this.iterator("table", function (a) {
      return T(a.aoData, "_aData");
    }).flatten();
  });
  w("destroy()", function (a) {
    a = a || !1;
    return this.iterator("table", function (b) {
      var c = b.nTableWrapper.parentNode,
        d = b.oClasses,
        f = b.nTable,
        e = b.nTBody,
        g = b.nTHead,
        h = b.nTFoot,
        l = k(f);
      e = k(e);
      var n = k(b.nTableWrapper),
        m = k.map(b.aoData, function (t) {
          return t.nTr;
        }),
        p;
      b.bDestroying = !0;
      I(b, "aoDestroyCallback", "destroy", [b]);
      a || new D(b).columns().visible(!0);
      n.off(".DT").find(":not(tbody *)").off(".DT");
      k(y).off(".DT-" + b.sInstance);
      f != g.parentNode && (l.children("thead").detach(), l.append(g));
      h && f != h.parentNode && (l.children("tfoot").detach(), l.append(h));
      b.aaSorting = [];
      b.aaSortingFixed = [];
      Pa(b);
      k(m).removeClass(b.asStripeClasses.join(" "));
      k("th, td", g).removeClass(
        d.sSortable +
          " " +
          d.sSortableAsc +
          " " +
          d.sSortableDesc +
          " " +
          d.sSortableNone
      );
      e.children().detach();
      e.append(m);
      g = a ? "remove" : "detach";
      l[g]();
      n[g]();
      !a &&
        c &&
        (c.insertBefore(f, b.nTableReinsertBefore),
        l.css("width", b.sDestroyWidth).removeClass(d.sTable),
        (p = b.asDestroyStripes.length) &&
          e.children().each(function (t) {
            k(this).addClass(b.asDestroyStripes[t % p]);
          }));
      c = k.inArray(b, u.settings);
      -1 !== c && u.settings.splice(c, 1);
    });
  });
  k.each(["column", "row", "cell"], function (a, b) {
    w(b + "s().every()", function (c) {
      var d = this.selector.opts,
        f = this;
      return this.iterator(b, function (e, g, h, l, n) {
        c.call(f[b](g, "cell" === b ? h : d, "cell" === b ? d : q), g, h, l, n);
      });
    });
  });
  w("i18n()", function (a, b, c) {
    var d = this.context[0];
    a = ia(a)(d.oLanguage);
    a === q && (a = b);
    c !== q && k.isPlainObject(a) && (a = a[c] !== q ? a[c] : a._);
    return a.replace("%d", c);
  });
  u.version = "1.10.22";
  u.settings = [];
  u.models = {};
  u.models.oSearch = {
    bCaseInsensitive: !0,
    sSearch: "",
    bRegex: !1,
    bSmart: !0,
  };
  u.models.oRow = {
    nTr: null,
    anCells: null,
    _aData: [],
    _aSortData: null,
    _aFilterData: null,
    _sFilterRow: null,
    _sRowStripe: "",
    src: null,
    idx: -1,
  };
  u.models.oColumn = {
    idx: null,
    aDataSort: null,
    asSorting: null,
    bSearchable: null,
    bSortable: null,
    bVisible: null,
    _sManualType: null,
    _bAttrSrc: !1,
    fnCreatedCell: null,
    fnGetData: null,
    fnSetData: null,
    mData: null,
    mRender: null,
    nTh: null,
    nTf: null,
    sClass: null,
    sContentPadding: null,
    sDefaultContent: null,
    sName: null,
    sSortDataType: "std",
    sSortingClass: null,
    sSortingClassJUI: null,
    sTitle: null,
    sType: null,
    sWidth: null,
    sWidthOrig: null,
  };
  u.defaults = {
    aaData: null,
    aaSorting: [[0, "asc"]],
    aaSortingFixed: [],
    ajax: null,
    aLengthMenu: [10, 25, 50, 100],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: null,
    bAutoWidth: !0,
    bDeferRender: !1,
    bDestroy: !1,
    bFilter: !0,
    bInfo: !0,
    bLengthChange: !0,
    bPaginate: !0,
    bProcessing: !1,
    bRetrieve: !1,
    bScrollCollapse: !1,
    bServerSide: !1,
    bSort: !0,
    bSortMulti: !0,
    bSortCellsTop: !1,
    bSortClasses: !0,
    bStateSave: !1,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber: function (a) {
      return a
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
    },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: null,
    fnServerParams: null,
    fnStateLoadCallback: function (a) {
      try {
        return JSON.parse(
          (-1 === a.iStateDuration ? sessionStorage : localStorage).getItem(
            "DataTables_" + a.sInstance + "_" + location.pathname
          )
        );
      } catch (b) {
        return {};
      }
    },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSaveCallback: function (a, b) {
      try {
        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem(
          "DataTables_" + a.sInstance + "_" + location.pathname,
          JSON.stringify(b)
        );
      } catch (c) {}
    },
    fnStateSaveParams: null,
    iStateDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iTabIndex: 0,
    oClasses: {},
    oLanguage: {
      oAria: {
        sSortAscending: ": activate to sort column ascending",
        sSortDescending: ": activate to sort column descending",
      },
      oPaginate: {
        sFirst: "First",
        sLast: "Last",
        sNext: "Next",
        sPrevious: "Previous",
      },
      sEmptyTable: "No data available in table",
      sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
      sInfoEmpty: "Showing 0 to 0 of 0 entries",
      sInfoFiltered: "(filtered from _MAX_ total entries)",
      sInfoPostFix: "",
      sDecimal: "",
      sThousands: ",",
      sLengthMenu: "Show _MENU_ entries",
      sLoadingRecords: "Loading...",
      sProcessing: "Processing...",
      sSearch: "Search:",
      sSearchPlaceholder: "",
      sUrl: "",
      sZeroRecords: "No matching records found",
    },
    oSearch: k.extend({}, u.models.oSearch),
    sAjaxDataProp: "data",
    sAjaxSource: null,
    sDom: "lfrtip",
    searchDelay: null,
    sPaginationType: "simple_numbers",
    sScrollX: "",
    sScrollXInner: "",
    sScrollY: "",
    sServerMethod: "GET",
    renderer: null,
    rowId: "DT_RowId",
  };
  G(u.defaults);
  u.defaults.column = {
    aDataSort: null,
    iDataSort: -1,
    asSorting: ["asc", "desc"],
    bSearchable: !0,
    bSortable: !0,
    bVisible: !0,
    fnCreatedCell: null,
    mData: null,
    mRender: null,
    sCellType: "td",
    sClass: "",
    sContentPadding: "",
    sDefaultContent: null,
    sName: "",
    sSortDataType: "std",
    sTitle: null,
    sType: null,
    sWidth: null,
  };
  G(u.defaults.column);
  u.models.oSettings = {
    oFeatures: {
      bAutoWidth: null,
      bDeferRender: null,
      bFilter: null,
      bInfo: null,
      bLengthChange: null,
      bPaginate: null,
      bProcessing: null,
      bServerSide: null,
      bSort: null,
      bSortMulti: null,
      bSortClasses: null,
      bStateSave: null,
    },
    oScroll: {
      bCollapse: null,
      iBarWidth: 0,
      sX: null,
      sXInner: null,
      sY: null,
    },
    oLanguage: { fnInfoCallback: null },
    oBrowser: {
      bScrollOversize: !1,
      bScrollbarLeft: !1,
      bBounding: !1,
      barWidth: 0,
    },
    ajax: null,
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aIds: {},
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: [],
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: "",
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: !1,
    bInitialised: !1,
    aoOpenRows: [],
    sDom: null,
    searchDelay: null,
    sPaginationType: "two_button",
    iStateDuration: 0,
    aoStateSave: [],
    aoStateLoad: [],
    oSavedState: null,
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    bAjaxDataGet: !0,
    jqXHR: null,
    json: q,
    oAjaxData: q,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: !1,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    oClasses: {},
    bFiltered: !1,
    bSorted: !1,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal: function () {
      return "ssp" == P(this)
        ? 1 * this._iRecordsTotal
        : this.aiDisplayMaster.length;
    },
    fnRecordsDisplay: function () {
      return "ssp" == P(this)
        ? 1 * this._iRecordsDisplay
        : this.aiDisplay.length;
    },
    fnDisplayEnd: function () {
      var a = this._iDisplayLength,
        b = this._iDisplayStart,
        c = b + a,
        d = this.aiDisplay.length,
        f = this.oFeatures,
        e = f.bPaginate;
      return f.bServerSide
        ? !1 === e || -1 === a
          ? b + d
          : Math.min(b + a, this._iRecordsDisplay)
        : !e || c > d || -1 === a
        ? d
        : c;
    },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0,
    nScrollHead: null,
    nScrollFoot: null,
    aLastSort: [],
    oPlugins: {},
    rowIdFn: null,
    rowId: null,
  };
  u.ext = L = {
    buttons: {},
    classes: {},
    builder: "-source-",
    errMode: "alert",
    feature: [],
    search: [],
    selector: { cell: [], column: [], row: [] },
    internal: {},
    legacy: { ajax: null },
    pager: {},
    renderer: { pageButton: {}, header: {} },
    order: {},
    type: { detect: [], search: {}, order: {} },
    _unique: 0,
    fnVersionCheck: u.fnVersionCheck,
    iApiIndex: 0,
    oJUIClasses: {},
    sVersion: u.version,
  };
  k.extend(L, {
    afnFiltering: L.search,
    aTypes: L.type.detect,
    ofnSearch: L.type.search,
    oSort: L.type.order,
    afnSortData: L.order,
    aoFeatures: L.feature,
    oApi: L.internal,
    oStdClasses: L.classes,
    oPagination: L.pager,
  });
  k.extend(u.ext.classes, {
    sTable: "dataTable",
    sNoFooter: "no-footer",
    sPageButton: "paginate_button",
    sPageButtonActive: "current",
    sPageButtonDisabled: "disabled",
    sStripeOdd: "odd",
    sStripeEven: "even",
    sRowEmpty: "dataTables_empty",
    sWrapper: "dataTables_wrapper",
    sFilter: "dataTables_filter",
    sInfo: "dataTables_info",
    sPaging: "dataTables_paginate paging_",
    sLength: "dataTables_length",
    sProcessing: "dataTables_processing",
    sSortAsc: "sorting_asc",
    sSortDesc: "sorting_desc",
    sSortable: "sorting",
    sSortableAsc: "sorting_asc_disabled",
    sSortableDesc: "sorting_desc_disabled",
    sSortableNone: "sorting_disabled",
    sSortColumn: "sorting_",
    sFilterInput: "",
    sLengthSelect: "",
    sScrollWrapper: "dataTables_scroll",
    sScrollHead: "dataTables_scrollHead",
    sScrollHeadInner: "dataTables_scrollHeadInner",
    sScrollBody: "dataTables_scrollBody",
    sScrollFoot: "dataTables_scrollFoot",
    sScrollFootInner: "dataTables_scrollFootInner",
    sHeaderTH: "",
    sFooterTH: "",
    sSortJUIAsc: "",
    sSortJUIDesc: "",
    sSortJUI: "",
    sSortJUIAscAllowed: "",
    sSortJUIDescAllowed: "",
    sSortJUIWrapper: "",
    sSortIcon: "",
    sJUIHeader: "",
    sJUIFooter: "",
  });
  var ec = u.ext.pager;
  k.extend(ec, {
    simple: function (a, b) {
      return ["previous", "next"];
    },
    full: function (a, b) {
      return ["first", "previous", "next", "last"];
    },
    numbers: function (a, b) {
      return [Ba(a, b)];
    },
    simple_numbers: function (a, b) {
      return ["previous", Ba(a, b), "next"];
    },
    full_numbers: function (a, b) {
      return ["first", "previous", Ba(a, b), "next", "last"];
    },
    first_last_numbers: function (a, b) {
      return ["first", Ba(a, b), "last"];
    },
    _numbers: Ba,
    numbers_length: 7,
  });
  k.extend(!0, u.ext.renderer, {
    pageButton: {
      _: function (a, b, c, d, f, e) {
        var g = a.oClasses,
          h = a.oLanguage.oPaginate,
          l = a.oLanguage.oAria.paginate || {},
          n,
          m,
          p = 0,
          t = function (x, r) {
            var A,
              E = g.sPageButtonDisabled,
              H = function (B) {
                kb(a, B.data.action, !0);
              };
            var W = 0;
            for (A = r.length; W < A; W++) {
              var M = r[W];
              if (Array.isArray(M)) {
                var C = k("<" + (M.DT_el || "div") + "/>").appendTo(x);
                t(C, M);
              } else {
                n = null;
                m = M;
                C = a.iTabIndex;
                switch (M) {
                  case "ellipsis":
                    x.append('<span class="ellipsis">&#x2026;</span>');
                    break;
                  case "first":
                    n = h.sFirst;
                    0 === f && ((C = -1), (m += " " + E));
                    break;
                  case "previous":
                    n = h.sPrevious;
                    0 === f && ((C = -1), (m += " " + E));
                    break;
                  case "next":
                    n = h.sNext;
                    if (0 === e || f === e - 1) (C = -1), (m += " " + E);
                    break;
                  case "last":
                    n = h.sLast;
                    if (0 === e || f === e - 1) (C = -1), (m += " " + E);
                    break;
                  default:
                    (n = a.fnFormatNumber(M + 1)),
                      (m = f === M ? g.sPageButtonActive : "");
                }
                null !== n &&
                  ((C = k("<a>", {
                    class: g.sPageButton + " " + m,
                    "aria-controls": a.sTableId,
                    "aria-label": l[M],
                    "data-dt-idx": p,
                    tabindex: C,
                    id:
                      0 === c && "string" === typeof M
                        ? a.sTableId + "_" + M
                        : null,
                  })
                    .html(n)
                    .appendTo(x)),
                  ob(C, { action: M }, H),
                  p++);
              }
            }
          };
        try {
          var v = k(b).find(z.activeElement).data("dt-idx");
        } catch (x) {}
        t(k(b).empty(), d);
        v !== q &&
          k(b)
            .find("[data-dt-idx=" + v + "]")
            .trigger("focus");
      },
    },
  });
  k.extend(u.ext.type.detect, [
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return sb(a, b) ? "num" + b : null;
    },
    function (a, b) {
      if (a && !(a instanceof Date) && !tc.test(a)) return null;
      b = Date.parse(a);
      return (null !== b && !isNaN(b)) || ca(a) ? "date" : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return sb(a, b, !0) ? "num-fmt" + b : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return jc(a, b) ? "html-num" + b : null;
    },
    function (a, b) {
      b = b.oLanguage.sDecimal;
      return jc(a, b, !0) ? "html-num-fmt" + b : null;
    },
    function (a, b) {
      return ca(a) || ("string" === typeof a && -1 !== a.indexOf("<"))
        ? "html"
        : null;
    },
  ]);
  k.extend(u.ext.type.search, {
    html: function (a) {
      return ca(a)
        ? a
        : "string" === typeof a
        ? a.replace(gc, " ").replace(Ta, "")
        : "";
    },
    string: function (a) {
      return ca(a) ? a : "string" === typeof a ? a.replace(gc, " ") : a;
    },
  });
  var Sa = function (a, b, c, d) {
    if (0 !== a && (!a || "-" === a)) return -Infinity;
    b && (a = ic(a, b));
    a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
    return 1 * a;
  };
  k.extend(L.type.order, {
    "date-pre": function (a) {
      a = Date.parse(a);
      return isNaN(a) ? -Infinity : a;
    },
    "html-pre": function (a) {
      return ca(a)
        ? ""
        : a.replace
        ? a.replace(/<.*?>/g, "").toLowerCase()
        : a + "";
    },
    "string-pre": function (a) {
      return ca(a)
        ? ""
        : "string" === typeof a
        ? a.toLowerCase()
        : a.toString
        ? a.toString()
        : "";
    },
    "string-asc": function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    },
    "string-desc": function (a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    },
  });
  Va("");
  k.extend(!0, u.ext.renderer, {
    header: {
      _: function (a, b, c, d) {
        k(a.nTable).on("order.dt.DT", function (f, e, g, h) {
          a === e &&
            ((f = c.idx),
            b
              .removeClass(
                c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc
              )
              .addClass(
                "asc" == h[f]
                  ? d.sSortAsc
                  : "desc" == h[f]
                  ? d.sSortDesc
                  : c.sSortingClass
              ));
        });
      },
      jqueryui: function (a, b, c, d) {
        k("<div/>")
          .addClass(d.sSortJUIWrapper)
          .append(b.contents())
          .append(k("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI))
          .appendTo(b);
        k(a.nTable).on("order.dt.DT", function (f, e, g, h) {
          a === e &&
            ((f = c.idx),
            b
              .removeClass(d.sSortAsc + " " + d.sSortDesc)
              .addClass(
                "asc" == h[f]
                  ? d.sSortAsc
                  : "desc" == h[f]
                  ? d.sSortDesc
                  : c.sSortingClass
              ),
            b
              .find("span." + d.sSortIcon)
              .removeClass(
                d.sSortJUIAsc +
                  " " +
                  d.sSortJUIDesc +
                  " " +
                  d.sSortJUI +
                  " " +
                  d.sSortJUIAscAllowed +
                  " " +
                  d.sSortJUIDescAllowed
              )
              .addClass(
                "asc" == h[f]
                  ? d.sSortJUIAsc
                  : "desc" == h[f]
                  ? d.sSortJUIDesc
                  : c.sSortingClassJUI
              ));
        });
      },
    },
  });
  var xb = function (a) {
    return "string" === typeof a
      ? a
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
      : a;
  };
  u.render = {
    number: function (a, b, c, d, f) {
      return {
        display: function (e) {
          if ("number" !== typeof e && "string" !== typeof e) return e;
          var g = 0 > e ? "-" : "",
            h = parseFloat(e);
          if (isNaN(h)) return xb(e);
          h = h.toFixed(c);
          e = Math.abs(h);
          h = parseInt(e, 10);
          e = c ? b + (e - h).toFixed(c).substring(2) : "";
          return (
            g +
            (d || "") +
            h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) +
            e +
            (f || "")
          );
        },
      };
    },
    text: function () {
      return { display: xb, filter: xb };
    },
  };
  k.extend(u.ext.internal, {
    _fnExternApiFunc: fc,
    _fnBuildAjax: La,
    _fnAjaxUpdate: Fb,
    _fnAjaxParameters: Ob,
    _fnAjaxUpdateDraw: Pb,
    _fnAjaxDataSrc: Ma,
    _fnAddColumn: Wa,
    _fnColumnOptions: Da,
    _fnAdjustColumnSizing: ra,
    _fnVisibleToColumnIndex: sa,
    _fnColumnIndexToVisible: ta,
    _fnVisbleColumns: na,
    _fnGetColumns: Fa,
    _fnColumnTypes: Ya,
    _fnApplyColumnDefs: Cb,
    _fnHungarianMap: G,
    _fnCamelToHungarian: O,
    _fnLanguageCompat: ma,
    _fnBrowserDetect: Ab,
    _fnAddData: ea,
    _fnAddTr: Ga,
    _fnNodeToDataIndex: function (a, b) {
      return b._DT_RowIndex !== q ? b._DT_RowIndex : null;
    },
    _fnNodeToColumnIndex: function (a, b, c) {
      return k.inArray(c, a.aoData[b].anCells);
    },
    _fnGetCellData: S,
    _fnSetCellData: Db,
    _fnSplitObjNotation: ab,
    _fnGetObjectDataFn: ia,
    _fnSetObjectDataFn: da,
    _fnGetDataMaster: bb,
    _fnClearTable: Ha,
    _fnDeleteIndex: Ia,
    _fnInvalidate: va,
    _fnGetRowElements: $a,
    _fnCreateTr: Za,
    _fnBuildHead: Eb,
    _fnDrawHead: xa,
    _fnDraw: fa,
    _fnReDraw: ja,
    _fnAddOptionsHtml: Hb,
    _fnDetectHeader: wa,
    _fnGetUniqueThs: Ka,
    _fnFeatureHtmlFilter: Jb,
    _fnFilterComplete: ya,
    _fnFilterCustom: Sb,
    _fnFilterColumn: Rb,
    _fnFilter: Qb,
    _fnFilterCreateSearch: gb,
    _fnEscapeRegex: hb,
    _fnFilterData: Tb,
    _fnFeatureHtmlInfo: Mb,
    _fnUpdateInfo: Wb,
    _fnInfoMacros: Xb,
    _fnInitialise: za,
    _fnInitComplete: Na,
    _fnLengthChange: ib,
    _fnFeatureHtmlLength: Ib,
    _fnFeatureHtmlPaginate: Nb,
    _fnPageChange: kb,
    _fnFeatureHtmlProcessing: Kb,
    _fnProcessingDisplay: U,
    _fnFeatureHtmlTable: Lb,
    _fnScrollDraw: Ea,
    _fnApplyToChildren: Z,
    _fnCalculateColumnWidths: Xa,
    _fnThrottle: fb,
    _fnConvertToWidth: Zb,
    _fnGetWidestNode: $b,
    _fnGetMaxLenString: ac,
    _fnStringToCss: K,
    _fnSortFlatten: pa,
    _fnSort: Gb,
    _fnSortAria: cc,
    _fnSortListener: nb,
    _fnSortAttachListener: db,
    _fnSortingClasses: Pa,
    _fnSortData: bc,
    _fnSaveState: Qa,
    _fnLoadState: dc,
    _fnSettingsFromNode: Ra,
    _fnLog: aa,
    _fnMap: V,
    _fnBindAction: ob,
    _fnCallbackReg: Q,
    _fnCallbackFire: I,
    _fnLengthOverflow: jb,
    _fnRenderer: eb,
    _fnDataSource: P,
    _fnRowAttributes: cb,
    _fnExtend: pb,
    _fnCalculateEnd: function () {},
  });
  k.fn.dataTable = u;
  u.$ = k;
  k.fn.dataTableSettings = u.settings;
  k.fn.dataTableExt = u.ext;
  k.fn.DataTable = function (a) {
    return k(this).dataTable(a).api();
  };
  k.each(u, function (a, b) {
    k.fn.DataTable[a] = b;
  });
  return k.fn.dataTable;
});

//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return zb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){tb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return m(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){qc[a]||(e(b),qc[a]=!0)}function h(a,b){return function(c){return p(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(){}function k(a,b){b!==!1&&F(a),n(this,a),this._d=new Date(+a._d)}function l(a){var b=y(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=tb.localeData(),this._bubble()}function m(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function n(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Ib.length>0)for(c in Ib)d=Ib[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function o(a){return 0>a?Math.ceil(a):Math.floor(a)}function p(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function q(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function r(a,b){var c;return b=K(b,a),a.isBefore(b)?c=q(a,b):(c=q(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function s(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=tb.duration(c,d),t(this,e,a),this}}function t(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&nb(a,"Date",mb(a,"Date")+f*c),g&&lb(a,mb(a,"Month")+g*c),d&&tb.updateOffset(a,f||g)}function u(a){return"[object Array]"===Object.prototype.toString.call(a)}function v(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function w(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&A(a[d])!==A(b[d]))&&g++;return g+f}function x(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=jc[a]||kc[b]||b}return a}function y(a){var b,d,e={};for(d in a)c(a,d)&&(b=x(d),b&&(e[b]=a[d]));return e}function z(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}tb[b]=function(e,f){var g,h,i=tb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=tb().utc().set(d,a);return i.call(tb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function A(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function B(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function C(a,b,c){return hb(tb([a,11,31+b-c]),b,c).week}function D(a){return E(a)?366:365}function E(a){return a%4===0&&a%100!==0||a%400===0}function F(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Bb]<0||a._a[Bb]>11?Bb:a._a[Cb]<1||a._a[Cb]>B(a._a[Ab],a._a[Bb])?Cb:a._a[Db]<0||a._a[Db]>24||24===a._a[Db]&&(0!==a._a[Eb]||0!==a._a[Fb]||0!==a._a[Gb])?Db:a._a[Eb]<0||a._a[Eb]>59?Eb:a._a[Fb]<0||a._a[Fb]>59?Fb:a._a[Gb]<0||a._a[Gb]>999?Gb:-1,a._pf._overflowDayOfYear&&(Ab>b||b>Cb)&&(b=Cb),a._pf.overflow=b)}function G(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function H(a){return a?a.toLowerCase().replace("_","-"):a}function I(a){for(var b,c,d,e,f=0;f<a.length;){for(e=H(a[f]).split("-"),b=e.length,c=H(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=J(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&w(e,c,!0)>=b-1)break;b--}f++}return null}function J(a){var b=null;if(!Hb[a]&&Jb)try{b=tb.locale(),require("./locale/"+a),tb.locale(b)}catch(c){}return Hb[a]}function K(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(tb.isMoment(a)||v(a)?+a:+tb(a))-+c,c._d.setTime(+c._d+d),tb.updateOffset(c,!1),c):tb(a).local()}function L(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function M(a){var b,c,d=a.match(Nb);for(b=0,c=d.length;c>b;b++)d[b]=pc[d[b]]?pc[d[b]]:L(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function N(a,b){return a.isValid()?(b=O(b,a.localeData()),lc[b]||(lc[b]=M(b)),lc[b](a)):a.localeData().invalidDate()}function O(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Ob.lastIndex=0;d>=0&&Ob.test(a);)a=a.replace(Ob,c),Ob.lastIndex=0,d-=1;return a}function P(a,b){var c,d=b._strict;switch(a){case"Q":return Zb;case"DDDD":return _b;case"YYYY":case"GGGG":case"gggg":return d?ac:Rb;case"Y":case"G":case"g":return cc;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?bc:Sb;case"S":if(d)return Zb;case"SS":if(d)return $b;case"SSS":if(d)return _b;case"DDD":return Qb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ub;case"a":case"A":return b._locale._meridiemParse;case"x":return Xb;case"X":return Yb;case"Z":case"ZZ":return Vb;case"T":return Wb;case"SSSS":return Tb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?$b:Pb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Pb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp(Y(X(a.replace("\\","")),"i"))}}function Q(a){a=a||"";var b=a.match(Vb)||[],c=b[b.length-1]||[],d=(c+"").match(hc)||["-",0,0],e=+(60*d[1])+A(d[2]);return"+"===d[0]?-e:e}function R(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Bb]=3*(A(b)-1));break;case"M":case"MM":null!=b&&(e[Bb]=A(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Bb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Cb]=A(b));break;case"Do":null!=b&&(e[Cb]=A(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=A(b));break;case"YY":e[Ab]=tb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Ab]=A(b);break;case"a":case"A":c._isPm=c._locale.isPM(b);break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Db]=A(b);break;case"m":case"mm":e[Eb]=A(b);break;case"s":case"ss":e[Fb]=A(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Gb]=A(1e3*("0."+b));break;case"x":c._d=new Date(A(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=Q(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=A(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=tb.parseTwoDigitYear(b)}}function S(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Ab],hb(tb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Ab],hb(tb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=ib(d,e,f,h,g),a._a[Ab]=i.year,a._dayOfYear=i.dayOfYear}function T(a){var c,d,e,f,g=[];if(!a._d){for(e=V(a),a._w&&null==a._a[Cb]&&null==a._a[Bb]&&S(a),a._dayOfYear&&(f=b(a._a[Ab],e[Ab]),a._dayOfYear>D(f)&&(a._pf._overflowDayOfYear=!0),d=db(f,0,a._dayOfYear),a._a[Bb]=d.getUTCMonth(),a._a[Cb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Db]&&0===a._a[Eb]&&0===a._a[Fb]&&0===a._a[Gb]&&(a._nextDay=!0,a._a[Db]=0),a._d=(a._useUTC?db:cb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()+a._tzm),a._nextDay&&(a._a[Db]=24)}}function U(a){var b;a._d||(b=y(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],T(a))}function V(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function W(b){if(b._f===tb.ISO_8601)return void $(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=O(b._f,b._locale).match(Nb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(P(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),pc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),R(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Db]<=12&&(b._pf.bigHour=a),b._isPm&&b._a[Db]<12&&(b._a[Db]+=12),b._isPm===!1&&12===b._a[Db]&&(b._a[Db]=0),T(b),F(b)}function X(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function Y(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Z(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],W(b),G(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));m(a,c||b)}function $(a){var b,c,d=a._i,e=dc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=fc.length;c>b;b++)if(fc[b][1].exec(d)){a._f=fc[b][0]+(e[6]||" ");break}for(b=0,c=gc.length;c>b;b++)if(gc[b][1].exec(d)){a._f+=gc[b][0];break}d.match(Vb)&&(a._f+="Z"),W(a)}else a._isValid=!1}function _(a){$(a),a._isValid===!1&&(delete a._isValid,tb.createFromInputFallback(a))}function ab(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function bb(b){var c,d=b._i;d===a?b._d=new Date:v(d)?b._d=new Date(+d):null!==(c=Kb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?_(b):u(d)?(b._a=ab(d.slice(0),function(a){return parseInt(a,10)}),T(b)):"object"==typeof d?U(b):"number"==typeof d?b._d=new Date(d):tb.createFromInputFallback(b)}function cb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function db(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function eb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function fb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function gb(a,b,c){var d=tb.duration(a).abs(),e=yb(d.as("s")),f=yb(d.as("m")),g=yb(d.as("h")),h=yb(d.as("d")),i=yb(d.as("M")),j=yb(d.as("y")),k=e<mc.s&&["s",e]||1===f&&["m"]||f<mc.m&&["mm",f]||1===g&&["h"]||g<mc.h&&["hh",g]||1===h&&["d"]||h<mc.d&&["dd",h]||1===i&&["M"]||i<mc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,fb.apply({},k)}function hb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=tb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ib(a,b,c,d,e){var f,g,h=db(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:D(a-1)+g}}function jb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||tb.localeData(b._l),null===d||e===a&&""===d?tb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),tb.isMoment(d)?new k(d,!0):(e?u(e)?Z(b):W(b):bb(b),c=new k(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function kb(a,b){var c,d;if(1===b.length&&u(b[0])&&(b=b[0]),!b.length)return tb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function lb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),B(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function mb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function nb(a,b,c){return"Month"===b?lb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function ob(a,b){return function(c){return null!=c?(nb(this,a,c),tb.updateOffset(this,b),this):mb(this,a)}}function pb(a){return 400*a/146097}function qb(a){return 146097*a/400}function rb(a){tb.duration.fn[a]=function(){return this._data[a]}}function sb(a){"undefined"==typeof ender&&(ub=xb.moment,xb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",tb):tb)}for(var tb,ub,vb,wb="2.8.4",xb="undefined"!=typeof global?global:this,yb=Math.round,zb=Object.prototype.hasOwnProperty,Ab=0,Bb=1,Cb=2,Db=3,Eb=4,Fb=5,Gb=6,Hb={},Ib=[],Jb="undefined"!=typeof module&&module&&module.exports,Kb=/^\/?Date\((\-?\d+)/i,Lb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Mb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Nb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Ob=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Pb=/\d\d?/,Qb=/\d{1,3}/,Rb=/\d{1,4}/,Sb=/[+\-]?\d{1,6}/,Tb=/\d+/,Ub=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Vb=/Z|[\+\-]\d\d:?\d\d/gi,Wb=/T/i,Xb=/[\+\-]?\d+/,Yb=/[\+\-]?\d+(\.\d{1,3})?/,Zb=/\d/,$b=/\d\d/,_b=/\d{3}/,ac=/\d{4}/,bc=/[+-]?\d{6}/,cc=/[+-]?\d+/,dc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ec="YYYY-MM-DDTHH:mm:ssZ",fc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],gc=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],hc=/([\+\-]|\d\d)/gi,ic=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),jc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},kc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},lc={},mc={s:45,m:45,h:22,d:26,M:11},nc="DDD w W M D d".split(" "),oc="M D H h m s w W".split(" "),pc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return p(this.year()%100,2)},YYYY:function(){return p(this.year(),4)},YYYYY:function(){return p(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+p(Math.abs(a),6)},gg:function(){return p(this.weekYear()%100,2)},gggg:function(){return p(this.weekYear(),4)},ggggg:function(){return p(this.weekYear(),5)},GG:function(){return p(this.isoWeekYear()%100,2)},GGGG:function(){return p(this.isoWeekYear(),4)},GGGGG:function(){return p(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return A(this.milliseconds()/100)},SS:function(){return p(A(this.milliseconds()/10),2)},SSS:function(){return p(this.milliseconds(),3)},SSSS:function(){return p(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+":"+p(A(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+p(A(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},qc={},rc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];nc.length;)vb=nc.pop(),pc[vb+"o"]=i(pc[vb],vb);for(;oc.length;)vb=oc.pop(),pc[vb+vb]=h(pc[vb],2);pc.DDDD=h(pc.DDD,3),m(j.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=tb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=tb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return hb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),tb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),jb(g)},tb.suppressDeprecationWarnings=!1,tb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),tb.min=function(){var a=[].slice.call(arguments,0);return kb("isBefore",a)},tb.max=function(){var a=[].slice.call(arguments,0);return kb("isAfter",a)},tb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),jb(g).utc()},tb.unix=function(a){return tb(1e3*a)},tb.duration=function(a,b){var d,e,f,g,h=a,i=null;return tb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Lb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:A(i[Cb])*d,h:A(i[Db])*d,m:A(i[Eb])*d,s:A(i[Fb])*d,ms:A(i[Gb])*d}):(i=Mb.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):"object"==typeof h&&("from"in h||"to"in h)&&(g=r(tb(h.from),tb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new l(h),tb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},tb.version=wb,tb.defaultFormat=ec,tb.ISO_8601=function(){},tb.momentProperties=Ib,tb.updateOffset=function(){},tb.relativeTimeThreshold=function(b,c){return mc[b]===a?!1:c===a?mc[b]:(mc[b]=c,!0)},tb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return tb.locale(a,b)}),tb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?tb.defineLocale(a,b):tb.localeData(a),c&&(tb.duration._locale=tb._locale=c)),tb._locale._abbr},tb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Hb[a]||(Hb[a]=new j),Hb[a].set(b),tb.locale(a),Hb[a]):(delete Hb[a],null)},tb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return tb.localeData(a)}),tb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return tb._locale;if(!u(a)){if(b=J(a))return b;a=[a]}return I(a)},tb.isMoment=function(a){return a instanceof k||null!=a&&c(a,"_isAMomentObject")},tb.isDuration=function(a){return a instanceof l};for(vb=rc.length-1;vb>=0;--vb)z(rc[vb]);tb.normalizeUnits=function(a){return x(a)},tb.invalid=function(a){var b=tb.utc(0/0);return null!=a?m(b._pf,a):b._pf.userInvalidated=!0,b},tb.parseZone=function(){return tb.apply(null,arguments).parseZone()},tb.parseTwoDigitYear=function(a){return A(a)+(A(a)>68?1900:2e3)},m(tb.fn=k.prototype,{clone:function(){return tb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=tb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():N(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):N(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return G(this)},isDSTShifted:function(){return this._a?this.isValid()&&w(this._a,(this._isUTC?tb.utc(this._a):tb(this._a)).toArray())>0:!1},parsingFlags:function(){return m({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.zone(0,a)},local:function(a){return this._isUTC&&(this.zone(0,a),this._isUTC=!1,a&&this.add(this._dateTzOffset(),"m")),this},format:function(a){var b=N(this,a||tb.defaultFormat);return this.localeData().postformat(b)},add:s(1,"add"),subtract:s(-1,"subtract"),diff:function(a,b,c){var d,e,f,g=K(a,this),h=6e4*(this.zone()-g.zone());return b=x(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+g.daysInMonth()),e=12*(this.year()-g.year())+(this.month()-g.month()),f=this-tb(this).startOf("month")-(g-tb(g).startOf("month")),f-=6e4*(this.zone()-tb(this).startOf("month").zone()-(g.zone()-tb(g).startOf("month").zone())),e+=f/d,"year"===b&&(e/=12)):(d=this-g,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-h)/864e5:"week"===b?(d-h)/6048e5:d),c?e:o(e)},from:function(a,b){return tb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(tb(),a)},calendar:function(a){var b=a||tb(),c=K(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,tb(b)))},isLeapYear:function(){return E(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=eb(a,this.localeData()),this.add(a-b,"d")):b},month:ob("Month",!0),startOf:function(a){switch(a=x(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=x(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this>+a):(c=tb.isMoment(a)?+a:+tb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+a>+this):(c=tb.isMoment(a)?+a:+tb(a),+this.clone().endOf(b)<c)},isSame:function(a,b){var c;return b=x(b||"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this===+a):(c=+tb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),a>this?this:a}),zone:function(a,b){var c,d=this._offset||0;return null==a?this._isUTC?d:this._dateTzOffset():("string"==typeof a&&(a=Q(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateTzOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.subtract(c,"m"),d!==a&&(!b||this._changeInProgress?t(this,tb.duration(d-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,tb.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?tb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return B(this.year(),this.month())},dayOfYear:function(a){var b=yb((tb(this).startOf("day")-tb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=hb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=hb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=hb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return C(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return C(this.year(),a.dow,a.doy)},get:function(a){return a=x(a),this[a]()},set:function(a,b){return a=x(a),"function"==typeof this[a]&&this[a](b),this},locale:function(b){var c;return b===a?this._locale._abbr:(c=tb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateTzOffset:function(){return 15*Math.round(this._d.getTimezoneOffset()/15)}}),tb.fn.millisecond=tb.fn.milliseconds=ob("Milliseconds",!1),tb.fn.second=tb.fn.seconds=ob("Seconds",!1),tb.fn.minute=tb.fn.minutes=ob("Minutes",!1),tb.fn.hour=tb.fn.hours=ob("Hours",!0),tb.fn.date=ob("Date",!0),tb.fn.dates=f("dates accessor is deprecated. Use date instead.",ob("Date",!0)),tb.fn.year=ob("FullYear",!0),tb.fn.years=f("years accessor is deprecated. Use year instead.",ob("FullYear",!0)),tb.fn.days=tb.fn.day,tb.fn.months=tb.fn.month,tb.fn.weeks=tb.fn.week,tb.fn.isoWeeks=tb.fn.isoWeek,tb.fn.quarters=tb.fn.quarter,tb.fn.toJSON=tb.fn.toISOString,m(tb.duration.fn=l.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=o(d/1e3),g.seconds=a%60,b=o(a/60),g.minutes=b%60,c=o(b/60),g.hours=c%24,e+=o(c/24),h=o(pb(e)),e-=o(qb(h)),f+=o(e/30),e%=30,h+=o(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*A(this._months/12)},humanize:function(a){var b=gb(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=tb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=tb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=x(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=x(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*pb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(qb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;
case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:tb.fn.lang,locale:tb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale}}),tb.duration.fn.toString=tb.duration.fn.toISOString;for(vb in ic)c(ic,vb)&&rb(vb.toLowerCase());tb.duration.fn.asMilliseconds=function(){return this.as("ms")},tb.duration.fn.asSeconds=function(){return this.as("s")},tb.duration.fn.asMinutes=function(){return this.as("m")},tb.duration.fn.asHours=function(){return this.as("h")},tb.duration.fn.asDays=function(){return this.as("d")},tb.duration.fn.asWeeks=function(){return this.as("weeks")},tb.duration.fn.asMonths=function(){return this.as("M")},tb.duration.fn.asYears=function(){return this.as("y")},tb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===A(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Jb?module.exports=tb:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(xb.moment=ub),tb}),sb(!0)):sb()}).call(this);

/*!
   Copyright 2014-2020 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 Responsive 2.2.6
 2014-2020 SpryMedia Ltd - datatables.net/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (b, k, m) {
  b instanceof String && (b = String(b));
  for (var n = b.length, p = 0; p < n; p++) {
    var y = b[p];
    if (k.call(m, y, p, b)) return { i: p, v: y };
  }
  return { i: -1, v: void 0 };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (b, k, m) {
        if (b == Array.prototype || b == Object.prototype) return b;
        b[k] = m.value;
        return b;
      };
$jscomp.getGlobal = function (b) {
  b = [
    "object" == typeof globalThis && globalThis,
    b,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var k = 0; k < b.length; ++k) {
    var m = b[k];
    if (m && m.Math == Math) return m;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (b, k) {
  var m = $jscomp.propertyToPolyfillSymbol[k];
  if (null == m) return b[k];
  m = b[m];
  return void 0 !== m ? m : b[k];
};
$jscomp.polyfill = function (b, k, m, n) {
  k &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(b, k, m, n)
      : $jscomp.polyfillUnisolated(b, k, m, n));
};
$jscomp.polyfillUnisolated = function (b, k, m, n) {
  m = $jscomp.global;
  b = b.split(".");
  for (n = 0; n < b.length - 1; n++) {
    var p = b[n];
    if (!(p in m)) return;
    m = m[p];
  }
  b = b[b.length - 1];
  n = m[b];
  k = k(n);
  k != n &&
    null != k &&
    $jscomp.defineProperty(m, b, { configurable: !0, writable: !0, value: k });
};
$jscomp.polyfillIsolated = function (b, k, m, n) {
  var p = b.split(".");
  b = 1 === p.length;
  n = p[0];
  n = !b && n in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var y = 0; y < p.length - 1; y++) {
    var z = p[y];
    if (!(z in n)) return;
    n = n[z];
  }
  p = p[p.length - 1];
  m = $jscomp.IS_SYMBOL_NATIVE && "es6" === m ? n[p] : null;
  k = k(m);
  null != k &&
    (b
      ? $jscomp.defineProperty($jscomp.polyfills, p, {
          configurable: !0,
          writable: !0,
          value: k,
        })
      : k !== m &&
        (($jscomp.propertyToPolyfillSymbol[p] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(p)
          : $jscomp.POLYFILL_PREFIX + p),
        (p = $jscomp.propertyToPolyfillSymbol[p]),
        $jscomp.defineProperty(n, p, {
          configurable: !0,
          writable: !0,
          value: k,
        })));
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (b) {
    return b
      ? b
      : function (k, m) {
          return $jscomp.findInternal(this, k, m).v;
        };
  },
  "es6",
  "es3"
);
(function (b) {
  "function" === typeof define && define.amd
    ? define(["jquery", "datatables.net"], function (k) {
        return b(k, window, document);
      })
    : "object" === typeof exports
    ? (module.exports = function (k, m) {
        k || (k = window);
        (m && m.fn.dataTable) || (m = require("datatables.net")(k, m).$);
        return b(m, k, k.document);
      })
    : b(jQuery, window, document);
})(function (b, k, m, n) {
  function p(a, c, d) {
    var f = c + "-" + d;
    if (A[f]) return A[f];
    var g = [];
    a = a.cell(c, d).node().childNodes;
    c = 0;
    for (d = a.length; c < d; c++) g.push(a[c]);
    return (A[f] = g);
  }
  function y(a, c, d) {
    var f = c + "-" + d;
    if (A[f]) {
      a = a.cell(c, d).node();
      d = A[f][0].parentNode.childNodes;
      c = [];
      for (var g = 0, l = d.length; g < l; g++) c.push(d[g]);
      d = 0;
      for (g = c.length; d < g; d++) a.appendChild(c[d]);
      A[f] = n;
    }
  }
  var z = b.fn.dataTable,
    u = function (a, c) {
      if (!z.versionCheck || !z.versionCheck("1.10.10"))
        throw "DataTables Responsive requires DataTables 1.10.10 or newer";
      this.s = { dt: new z.Api(a), columns: [], current: [] };
      this.s.dt.settings()[0].responsive ||
        (c && "string" === typeof c.details
          ? (c.details = { type: c.details })
          : c && !1 === c.details
          ? (c.details = { type: !1 })
          : c && !0 === c.details && (c.details = { type: "inline" }),
        (this.c = b.extend(!0, {}, u.defaults, z.defaults.responsive, c)),
        (a.responsive = this),
        this._constructor());
    };
  b.extend(u.prototype, {
    _constructor: function () {
      var a = this,
        c = this.s.dt,
        d = c.settings()[0],
        f = b(k).innerWidth();
      c.settings()[0]._responsive = this;
      b(k).on(
        "resize.dtr orientationchange.dtr",
        z.util.throttle(function () {
          var g = b(k).innerWidth();
          g !== f && (a._resize(), (f = g));
        })
      );
      d.oApi._fnCallbackReg(d, "aoRowCreatedCallback", function (g, l, h) {
        -1 !== b.inArray(!1, a.s.current) &&
          b(">td, >th", g).each(function (e) {
            e = c.column.index("toData", e);
            !1 === a.s.current[e] && b(this).css("display", "none");
          });
      });
      c.on("destroy.dtr", function () {
        c.off(".dtr");
        b(c.table().body()).off(".dtr");
        b(k).off("resize.dtr orientationchange.dtr");
        c.cells(".dtr-control").nodes().to$().removeClass("dtr-control");
        b.each(a.s.current, function (g, l) {
          !1 === l && a._setColumnVis(g, !0);
        });
      });
      this.c.breakpoints.sort(function (g, l) {
        return g.width < l.width ? 1 : g.width > l.width ? -1 : 0;
      });
      this._classLogic();
      this._resizeAuto();
      d = this.c.details;
      !1 !== d.type &&
        (a._detailsInit(),
        c.on("column-visibility.dtr", function () {
          a._timer && clearTimeout(a._timer);
          a._timer = setTimeout(function () {
            a._timer = null;
            a._classLogic();
            a._resizeAuto();
            a._resize(!0);
            a._redrawChildren();
          }, 100);
        }),
        c.on("draw.dtr", function () {
          a._redrawChildren();
        }),
        b(c.table().node()).addClass("dtr-" + d.type));
      c.on("column-reorder.dtr", function (g, l, h) {
        a._classLogic();
        a._resizeAuto();
        a._resize(!0);
      });
      c.on("column-sizing.dtr", function () {
        a._resizeAuto();
        a._resize();
      });
      c.on("preXhr.dtr", function () {
        var g = [];
        c.rows().every(function () {
          this.child.isShown() && g.push(this.id(!0));
        });
        c.one("draw.dtr", function () {
          a._resizeAuto();
          a._resize();
          c.rows(g).every(function () {
            a._detailsDisplay(this, !1);
          });
        });
      });
      c.on("draw.dtr", function () {
        a._controlClass();
      }).on("init.dtr", function (g, l, h) {
        "dt" === g.namespace &&
          (a._resizeAuto(),
          a._resize(),
          b.inArray(!1, a.s.current) && c.columns.adjust());
      });
      this._resize();
    },
    _columnsVisiblity: function (a) {
      var c = this.s.dt,
        d = this.s.columns,
        f,
        g = d
          .map(function (t, v) {
            return { columnIdx: v, priority: t.priority };
          })
          .sort(function (t, v) {
            return t.priority !== v.priority
              ? t.priority - v.priority
              : t.columnIdx - v.columnIdx;
          }),
        l = b.map(d, function (t, v) {
          return !1 === c.column(v).visible()
            ? "not-visible"
            : t.auto && null === t.minWidth
            ? !1
            : !0 === t.auto
            ? "-"
            : -1 !== b.inArray(a, t.includeIn);
        }),
        h = 0;
      var e = 0;
      for (f = l.length; e < f; e++) !0 === l[e] && (h += d[e].minWidth);
      e = c.settings()[0].oScroll;
      e = e.sY || e.sX ? e.iBarWidth : 0;
      h = c.table().container().offsetWidth - e - h;
      e = 0;
      for (f = l.length; e < f; e++) d[e].control && (h -= d[e].minWidth);
      var r = !1;
      e = 0;
      for (f = g.length; e < f; e++) {
        var q = g[e].columnIdx;
        "-" === l[q] &&
          !d[q].control &&
          d[q].minWidth &&
          (r || 0 > h - d[q].minWidth ? ((r = !0), (l[q] = !1)) : (l[q] = !0),
          (h -= d[q].minWidth));
      }
      g = !1;
      e = 0;
      for (f = d.length; e < f; e++)
        if (!d[e].control && !d[e].never && !1 === l[e]) {
          g = !0;
          break;
        }
      e = 0;
      for (f = d.length; e < f; e++)
        d[e].control && (l[e] = g), "not-visible" === l[e] && (l[e] = !1);
      -1 === b.inArray(!0, l) && (l[0] = !0);
      return l;
    },
    _classLogic: function () {
      var a = this,
        c = this.c.breakpoints,
        d = this.s.dt,
        f = d
          .columns()
          .eq(0)
          .map(function (h) {
            var e = this.column(h),
              r = e.header().className;
            h = d.settings()[0].aoColumns[h].responsivePriority;
            e = e.header().getAttribute("data-priority");
            h === n && (h = e === n || null === e ? 1e4 : 1 * e);
            return {
              className: r,
              includeIn: [],
              auto: !1,
              control: !1,
              never: r.match(/\bnever\b/) ? !0 : !1,
              priority: h,
            };
          }),
        g = function (h, e) {
          h = f[h].includeIn;
          -1 === b.inArray(e, h) && h.push(e);
        },
        l = function (h, e, r, q) {
          if (!r) f[h].includeIn.push(e);
          else if ("max-" === r)
            for (q = a._find(e).width, e = 0, r = c.length; e < r; e++)
              c[e].width <= q && g(h, c[e].name);
          else if ("min-" === r)
            for (q = a._find(e).width, e = 0, r = c.length; e < r; e++)
              c[e].width >= q && g(h, c[e].name);
          else if ("not-" === r)
            for (e = 0, r = c.length; e < r; e++)
              -1 === c[e].name.indexOf(q) && g(h, c[e].name);
        };
      f.each(function (h, e) {
        for (
          var r = h.className.split(" "), q = !1, t = 0, v = r.length;
          t < v;
          t++
        ) {
          var B = r[t].trim();
          if ("all" === B) {
            q = !0;
            h.includeIn = b.map(c, function (w) {
              return w.name;
            });
            return;
          }
          if ("none" === B || h.never) {
            q = !0;
            return;
          }
          if ("control" === B || "dtr-control" === B) {
            q = !0;
            h.control = !0;
            return;
          }
          b.each(c, function (w, D) {
            w = D.name.split("-");
            var x = B.match(
              new RegExp(
                "(min\\-|max\\-|not\\-)?(" + w[0] + ")(\\-[_a-zA-Z0-9])?"
              )
            );
            x &&
              ((q = !0),
              x[2] === w[0] && x[3] === "-" + w[1]
                ? l(e, D.name, x[1], x[2] + x[3])
                : x[2] !== w[0] || x[3] || l(e, D.name, x[1], x[2]));
          });
        }
        q || (h.auto = !0);
      });
      this.s.columns = f;
    },
    _controlClass: function () {
      if ("inline" === this.c.details.type) {
        var a = this.s.dt,
          c = b.inArray(!0, this.s.current);
        a.cells(
          null,
          function (d) {
            return d !== c;
          },
          { page: "current" }
        )
          .nodes()
          .to$()
          .filter(".dtr-control")
          .removeClass("dtr-control");
        a.cells(null, c, { page: "current" })
          .nodes()
          .to$()
          .addClass("dtr-control");
      }
    },
    _detailsDisplay: function (a, c) {
      var d = this,
        f = this.s.dt,
        g = this.c.details;
      if (g && !1 !== g.type) {
        var l = g.display(a, c, function () {
          return g.renderer(f, a[0], d._detailsObj(a[0]));
        });
        (!0 !== l && !1 !== l) ||
          b(f.table().node()).triggerHandler("responsive-display.dt", [
            f,
            a,
            l,
            c,
          ]);
      }
    },
    _detailsInit: function () {
      var a = this,
        c = this.s.dt,
        d = this.c.details;
      "inline" === d.type && (d.target = "td.dtr-control, th.dtr-control");
      c.on("draw.dtr", function () {
        a._tabIndexes();
      });
      a._tabIndexes();
      b(c.table().body()).on("keyup.dtr", "td, th", function (g) {
        13 === g.keyCode && b(this).data("dtr-keyboard") && b(this).click();
      });
      var f = d.target;
      d = "string" === typeof f ? f : "td, th";
      if (f !== n || null !== f)
        b(c.table().body()).on(
          "click.dtr mousedown.dtr mouseup.dtr",
          d,
          function (g) {
            if (
              b(c.table().node()).hasClass("collapsed") &&
              -1 !==
                b.inArray(
                  b(this).closest("tr").get(0),
                  c.rows().nodes().toArray()
                )
            ) {
              if ("number" === typeof f) {
                var l = 0 > f ? c.columns().eq(0).length + f : f;
                if (c.cell(this).index().column !== l) return;
              }
              l = c.row(b(this).closest("tr"));
              "click" === g.type
                ? a._detailsDisplay(l, !1)
                : "mousedown" === g.type
                ? b(this).css("outline", "none")
                : "mouseup" === g.type &&
                  b(this).trigger("blur").css("outline", "");
            }
          }
        );
    },
    _detailsObj: function (a) {
      var c = this,
        d = this.s.dt;
      return b.map(this.s.columns, function (f, g) {
        if (!f.never && !f.control)
          return (
            (f = d.settings()[0].aoColumns[g]),
            {
              className: f.sClass,
              columnIndex: g,
              data: d.cell(a, g).render(c.c.orthogonal),
              hidden: d.column(g).visible() && !c.s.current[g],
              rowIndex: a,
              title:
                null !== f.sTitle ? f.sTitle : b(d.column(g).header()).text(),
            }
          );
      });
    },
    _find: function (a) {
      for (var c = this.c.breakpoints, d = 0, f = c.length; d < f; d++)
        if (c[d].name === a) return c[d];
    },
    _redrawChildren: function () {
      var a = this,
        c = this.s.dt;
      c.rows({ page: "current" }).iterator("row", function (d, f) {
        c.row(f);
        a._detailsDisplay(c.row(f), !0);
      });
    },
    _resize: function (a) {
      var c = this,
        d = this.s.dt,
        f = b(k).innerWidth(),
        g = this.c.breakpoints,
        l = g[0].name,
        h = this.s.columns,
        e,
        r = this.s.current.slice();
      for (e = g.length - 1; 0 <= e; e--)
        if (f <= g[e].width) {
          l = g[e].name;
          break;
        }
      var q = this._columnsVisiblity(l);
      this.s.current = q;
      g = !1;
      e = 0;
      for (f = h.length; e < f; e++)
        if (
          !1 === q[e] &&
          !h[e].never &&
          !h[e].control &&
          !1 === !d.column(e).visible()
        ) {
          g = !0;
          break;
        }
      b(d.table().node()).toggleClass("collapsed", g);
      var t = !1,
        v = 0;
      d.columns()
        .eq(0)
        .each(function (B, w) {
          !0 === q[w] && v++;
          if (a || q[w] !== r[w]) (t = !0), c._setColumnVis(B, q[w]);
        });
      t &&
        (this._redrawChildren(),
        b(d.table().node()).trigger("responsive-resize.dt", [
          d,
          this.s.current,
        ]),
        0 === d.page.info().recordsDisplay &&
          b("td", d.table().body()).eq(0).attr("colspan", v));
      c._controlClass();
    },
    _resizeAuto: function () {
      var a = this.s.dt,
        c = this.s.columns;
      if (
        this.c.auto &&
        -1 !==
          b.inArray(
            !0,
            b.map(c, function (e) {
              return e.auto;
            })
          )
      ) {
        b.isEmptyObject(A) ||
          b.each(A, function (e) {
            e = e.split("-");
            y(a, 1 * e[0], 1 * e[1]);
          });
        a.table().node();
        var d = a.table().node().cloneNode(!1),
          f = b(a.table().header().cloneNode(!1)).appendTo(d),
          g = b(a.table().body()).clone(!1, !1).empty().appendTo(d);
        d.style.width = "auto";
        var l = a
          .columns()
          .header()
          .filter(function (e) {
            return a.column(e).visible();
          })
          .to$()
          .clone(!1)
          .css("display", "table-cell")
          .css("width", "auto")
          .css("min-width", 0);
        b(g)
          .append(b(a.rows({ page: "current" }).nodes()).clone(!1))
          .find("th, td")
          .css("display", "");
        if ((g = a.table().footer())) {
          g = b(g.cloneNode(!1)).appendTo(d);
          var h = a
            .columns()
            .footer()
            .filter(function (e) {
              return a.column(e).visible();
            })
            .to$()
            .clone(!1)
            .css("display", "table-cell");
          b("<tr/>").append(h).appendTo(g);
        }
        b("<tr/>").append(l).appendTo(f);
        "inline" === this.c.details.type &&
          b(d).addClass("dtr-inline collapsed");
        b(d).find("[name]").removeAttr("name");
        b(d).css("position", "relative");
        d = b("<div/>")
          .css({ width: 1, height: 1, overflow: "hidden", clear: "both" })
          .append(d);
        d.insertBefore(a.table().node());
        l.each(function (e) {
          e = a.column.index("fromVisible", e);
          c[e].minWidth = this.offsetWidth || 0;
        });
        d.remove();
      }
    },
    _responsiveOnlyHidden: function () {
      var a = this.s.dt;
      return b.map(this.s.current, function (c, d) {
        return !1 === a.column(d).visible() ? !0 : c;
      });
    },
    _setColumnVis: function (a, c) {
      var d = this.s.dt;
      c = c ? "" : "none";
      b(d.column(a).header()).css("display", c);
      b(d.column(a).footer()).css("display", c);
      d.column(a).nodes().to$().css("display", c);
      b.isEmptyObject(A) ||
        d
          .cells(null, a)
          .indexes()
          .each(function (f) {
            y(d, f.row, f.column);
          });
    },
    _tabIndexes: function () {
      var a = this.s.dt,
        c = a.cells({ page: "current" }).nodes().to$(),
        d = a.settings()[0],
        f = this.c.details.target;
      c.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
      "number" === typeof f
        ? a
            .cells(null, f, { page: "current" })
            .nodes()
            .to$()
            .attr("tabIndex", d.iTabIndex)
            .data("dtr-keyboard", 1)
        : ("td:first-child, th:first-child" === f &&
            (f = ">td:first-child, >th:first-child"),
          b(f, a.rows({ page: "current" }).nodes())
            .attr("tabIndex", d.iTabIndex)
            .data("dtr-keyboard", 1));
    },
  });
  u.breakpoints = [
    { name: "desktop", width: Infinity },
    { name: "tablet-l", width: 1024 },
    { name: "tablet-p", width: 768 },
    { name: "mobile-l", width: 480 },
    { name: "mobile-p", width: 320 },
  ];
  u.display = {
    childRow: function (a, c, d) {
      if (c) {
        if (b(a.node()).hasClass("parent"))
          return a.child(d(), "child").show(), !0;
      } else {
        if (a.child.isShown())
          return a.child(!1), b(a.node()).removeClass("parent"), !1;
        a.child(d(), "child").show();
        b(a.node()).addClass("parent");
        return !0;
      }
    },
    childRowImmediate: function (a, c, d) {
      if ((!c && a.child.isShown()) || !a.responsive.hasHidden())
        return a.child(!1), b(a.node()).removeClass("parent"), !1;
      a.child(d(), "child").show();
      b(a.node()).addClass("parent");
      return !0;
    },
    modal: function (a) {
      return function (c, d, f) {
        if (d) b("div.dtr-modal-content").empty().append(f());
        else {
          var g = function () {
              l.remove();
              b(m).off("keypress.dtr");
            },
            l = b('<div class="dtr-modal"/>')
              .append(
                b('<div class="dtr-modal-display"/>')
                  .append(b('<div class="dtr-modal-content"/>').append(f()))
                  .append(
                    b('<div class="dtr-modal-close">&times;</div>').click(
                      function () {
                        g();
                      }
                    )
                  )
              )
              .append(
                b('<div class="dtr-modal-background"/>').click(function () {
                  g();
                })
              )
              .appendTo("body");
          b(m).on("keyup.dtr", function (h) {
            27 === h.keyCode && (h.stopPropagation(), g());
          });
        }
        a &&
          a.header &&
          b("div.dtr-modal-content").prepend("<h2>" + a.header(c) + "</h2>");
      };
    },
  };
  var A = {};
  u.renderer = {
    listHiddenNodes: function () {
      return function (a, c, d) {
        var f = b('<ul data-dtr-index="' + c + '" class="dtr-details"/>'),
          g = !1;
        b.each(d, function (l, h) {
          h.hidden &&
            (b(
              "<li " +
                (h.className ? 'class="' + h.className + '"' : "") +
                ' data-dtr-index="' +
                h.columnIndex +
                '" data-dt-row="' +
                h.rowIndex +
                '" data-dt-column="' +
                h.columnIndex +
                '"><span class="dtr-title">' +
                h.title +
                "</span> </li>"
            )
              .append(
                b('<span class="dtr-data"/>').append(
                  p(a, h.rowIndex, h.columnIndex)
                )
              )
              .appendTo(f),
            (g = !0));
        });
        return g ? f : !1;
      };
    },
    listHidden: function () {
      return function (a, c, d) {
        return (a = b
          .map(d, function (f) {
            var g = f.className ? 'class="' + f.className + '"' : "";
            return f.hidden
              ? "<li " +
                  g +
                  ' data-dtr-index="' +
                  f.columnIndex +
                  '" data-dt-row="' +
                  f.rowIndex +
                  '" data-dt-column="' +
                  f.columnIndex +
                  '"><span class="dtr-title">' +
                  f.title +
                  '</span> <span class="dtr-data">' +
                  f.data +
                  "</span></li>"
              : "";
          })
          .join(""))
          ? b('<ul data-dtr-index="' + c + '" class="dtr-details"/>').append(a)
          : !1;
      };
    },
    tableAll: function (a) {
      a = b.extend({ tableClass: "" }, a);
      return function (c, d, f) {
        c = b
          .map(f, function (g) {
            return (
              "<tr " +
              (g.className ? 'class="' + g.className + '"' : "") +
              ' data-dt-row="' +
              g.rowIndex +
              '" data-dt-column="' +
              g.columnIndex +
              '"><td>' +
              g.title +
              ":</td> <td>" +
              g.data +
              "</td></tr>"
            );
          })
          .join("");
        return b(
          '<table class="' + a.tableClass + ' dtr-details" width="100%"/>'
        ).append(c);
      };
    },
  };
  u.defaults = {
    breakpoints: u.breakpoints,
    auto: !0,
    details: {
      display: u.display.childRow,
      renderer: u.renderer.listHidden(),
      target: 0,
      type: "inline",
    },
    orthogonal: "display",
  };
  var C = b.fn.dataTable.Api;
  C.register("responsive()", function () {
    return this;
  });
  C.register("responsive.index()", function (a) {
    a = b(a);
    return { column: a.data("dtr-index"), row: a.parent().data("dtr-index") };
  });
  C.register("responsive.rebuild()", function () {
    return this.iterator("table", function (a) {
      a._responsive && a._responsive._classLogic();
    });
  });
  C.register("responsive.recalc()", function () {
    return this.iterator("table", function (a) {
      a._responsive && (a._responsive._resizeAuto(), a._responsive._resize());
    });
  });
  C.register("responsive.hasHidden()", function () {
    var a = this.context[0];
    return a._responsive
      ? -1 !== b.inArray(!1, a._responsive._responsiveOnlyHidden())
      : !1;
  });
  C.registerPlural(
    "columns().responsiveHidden()",
    "column().responsiveHidden()",
    function () {
      return this.iterator(
        "column",
        function (a, c) {
          return a._responsive ? a._responsive._responsiveOnlyHidden()[c] : !1;
        },
        1
      );
    }
  );
  u.version = "2.2.6";
  b.fn.dataTable.Responsive = u;
  b.fn.DataTable.Responsive = u;
  b(m).on("preInit.dt.dtr", function (a, c, d) {
    "dt" === a.namespace &&
      (b(c.nTable).hasClass("responsive") ||
        b(c.nTable).hasClass("dt-responsive") ||
        c.oInit.responsive ||
        z.defaults.responsive) &&
      ((a = c.oInit.responsive),
      !1 !== a && new u(c, b.isPlainObject(a) ? a : {}));
  });
  return u;
});

/**
 * This plug-in for DataTables represents the ultimate option in extensibility
 * for sorting date / time strings correctly. It uses
 * [Moment.js](http://momentjs.com) to create automatic type detection and
 * sorting plug-ins for DataTables based on a given format. This way, DataTables
 * will automatically detect your temporal information and sort it correctly.
 *
 * For usage instructions, please see the DataTables blog
 * post that [introduces it](//datatables.net/blog/2014-12-18).
 *
 * @name Ultimate Date / Time sorting
 * @summary Sort date and time in any format using Moment.js
 * @author [Allan Jardine](//datatables.net)
 * @depends DataTables 1.10+, Moment.js 1.7+
 *
 * @example
 *    $.fn.dataTable.moment( 'HH:mm MMM D, YY' );
 *    $.fn.dataTable.moment( 'dddd, MMMM Do, YYYY' );
 *
 *    $('#example').DataTable();
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["jquery", "moment", "datatables.net"], factory);
    } else {
      factory(jQuery, moment);
    }
  })(function ($, moment) {
    $.fn.dataTable.moment = function (format, locale, reverseEmpties) {
      var types = $.fn.dataTable.ext.type;
  
      // Add type detection
      types.detect.unshift(function (d) {
        if (d) {
          // Strip HTML tags and newline characters if possible
          if (d.replace) {
            d = d.replace(/(<.*?>)|(\r?\n|\r)/g, "");
          }
  
          // Strip out surrounding white space
          d = d.trim();
        }
  
        // Null and empty values are acceptable
        if (d === "" || d === null) {
          return "moment-" + format;
        }
  
        return moment(d, format, locale, true).isValid()
          ? "moment-" + format
          : null;
      });
  
      // Add sorting method - use an integer for the sorting
      types.order["moment-" + format + "-pre"] = function (d) {
        if (d) {
          // Strip HTML tags and newline characters if possible
          if (d.replace) {
            d = d.replace(/(<.*?>)|(\r?\n|\r)/g, "");
          }
  
          // Strip out surrounding white space
          d = d.trim();
        }
  
        return !moment(d, format, locale, true).isValid()
          ? reverseEmpties
            ? -Infinity
            : Infinity
          : parseInt(moment(d, format, locale, true).format("x"), 10);
      };
    };
  });
  