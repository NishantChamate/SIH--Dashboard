!(function () {
  var t,
    e,
    n = this || self,
    r = function (t, e) {
      t = t.split(".");
      var r,
        a = n;
      t[0] in a || void 0 === a.execScript || a.execScript("var " + t[0]);
      for (; t.length && (r = t.shift()); )
        t.length || void 0 === e
          ? (a = a[r] && a[r] !== Object.prototype[r] ? a[r] : (a[r] = {}))
          : (a[r] = e);
    };
  function a() {
    for (var e = t, n = {}, r = 0; r < e.length; ++r) n[e[r]] = r;
    return n;
  }
  function i() {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return (t += t.toLowerCase() + "0123456789-_") + ".";
  }
  function o(n) {
    function r(t) {
      for (; s < n.length; ) {
        var r = n.charAt(s++),
          a = e[r];
        if (null != a) return a;
        if (!/^[\s\xa0]*$/.test(r))
          throw Error("Unknown base64 encoding at char: " + r);
      }
      return t;
    }
    (t = t || i()), (e = e || a());
    for (var o = "", s = 0; ; ) {
      var c = r(-1),
        u = r(0),
        l = r(64),
        g = r(64);
      if (64 === g && -1 === c) return o;
      (o += String.fromCharCode((c << 2) | (u >> 4))),
        64 != l &&
          ((o += String.fromCharCode(((u << 4) & 240) | (l >> 2))),
          64 != g && (o += String.fromCharCode(((l << 6) & 192) | g)));
    }
  }
  var s = {},
    c = function (t) {
      (s.TAGGING = s.TAGGING || []), (s.TAGGING[t] = !0);
    },
    u = Array.isArray,
    l = function (t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    },
    g = function (t) {
      for (var e in t) if (t.hasOwnProperty(e)) return !0;
      return !1;
    },
    f = function (t) {
      this.j = t;
    };
  f.prototype.toString = function () {
    return this.j.toString();
  };
  var h = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  new f("about:invalid#zClosurez"), new f("about:blank");
  var d = function () {
    this.i = "";
  };
  (d.prototype.toString = function () {
    return this.i.toString();
  }),
    new d();
  var p = function () {
    this.h = "";
  };
  (p.prototype.toString = function () {
    return this.h.toString();
  }),
    new p();
  var v = function () {
    this.g = (n.trustedTypes && n.trustedTypes.emptyHTML) || "";
  };
  (v.prototype.toString = function () {
    return this.g.toString();
  }),
    new v();
  var m,
    w = window,
    _ = window.history,
    b = document,
    y = navigator,
    k = function () {
      var t = w.google_tag_data;
      return (w.google_tag_data = void 0 === t ? {} : t), w.google_tag_data;
    },
    x = function (t, e) {
      b.addEventListener
        ? b.addEventListener(t, e, !1)
        : b.attachEvent && b.attachEvent("on" + t, e);
    },
    T = function (t) {
      var e = S();
      e.pending || (e.pending = []),
        (function (t, e) {
          if (t && u(t))
            for (var n = 0; n < t.length; n++) if (t[n] && e(t[n])) return t[n];
        })(e.pending, function (e) {
          return (
            e.target.ctid === t.ctid &&
            e.target.isDestination === t.isDestination
          );
        }) || e.pending.push({ target: t, onLoad: void 0 });
    },
    O = function () {
      (this.container = {}),
        (this.destination = {}),
        (this.canonical = {}),
        (this.pending = []);
    },
    S = function () {
      var t = k(),
        e = t.tidr;
      return e || ((e = new O()), (t.tidr = e)), e;
    },
    C = /:[0-9]+$/,
    A = function (t, e) {
      return (
        e && (e = String(e).toLowerCase()),
        ("protocol" !== e && "port" !== e) ||
          (t.protocol = N(t.protocol) || N(w.location.protocol)),
        "port" === e
          ? (t.port = String(
              Number(t.hostname ? t.port : w.location.port) ||
                ("http" === t.protocol ? 80 : "https" === t.protocol ? 443 : "")
            ))
          : "host" === e &&
            (t.hostname = (t.hostname || w.location.hostname)
              .replace(C, "")
              .toLowerCase()),
        E(t, e)
      );
    },
    E = function (t, e, n) {
      var r = N(t.protocol);
      switch ((e && (e = String(e).toLowerCase()), e)) {
        case "url_no_fragment":
          (n = ""),
            t &&
              t.href &&
              (n =
                0 > (n = t.href.indexOf("#")) ? t.href : t.href.substr(0, n)),
            (t = n);
          break;
        case "protocol":
          t = r;
          break;
        case "host":
          (t = t.hostname.replace(C, "").toLowerCase()),
            n &&
              (n = /^www\d*\./.exec(t)) &&
              n[0] &&
              (t = t.substr(n[0].length));
          break;
        case "port":
          t = String(
            Number(t.port) || ("http" === r ? 80 : "https" === r ? 443 : "")
          );
          break;
        case "path":
          t.pathname || t.hostname || c(1),
            (t = (t =
              "/" === t.pathname.substr(0, 1)
                ? t.pathname
                : "/" + t.pathname).split("/")),
            0 <= [].indexOf(t[t.length - 1]) && (t[t.length - 1] = ""),
            (t = t.join("/"));
          break;
        case "query":
          t = t.search.replace("?", "");
          break;
        case "extension":
          t = (t =
            1 < (t = t.pathname.split(".")).length
              ? t[t.length - 1]
              : "").split("/")[0];
          break;
        case "fragment":
          t = t.hash.replace("#", "");
          break;
        default:
          t = t && t.href;
      }
      return t;
    },
    N = function (t) {
      return t ? t.replace(":", "").toLowerCase() : "";
    },
    j = function (t) {
      var e = b.createElement("a");
      t && (e.href = t);
      var n = e.pathname;
      return (
        "/" !== n[0] && (t || c(1), (n = "/" + n)),
        (t = e.hostname.replace(C, "")),
        {
          href: e.href,
          protocol: e.protocol,
          host: e.host,
          hostname: t,
          pathname: n,
          search: e.search,
          hash: e.hash,
          port: e.port,
        }
      );
    },
    R = function () {
      var t = W,
        e = Y,
        n = P(),
        r = function (e) {
          t(e.target || e.srcElement || {});
        };
      if (!n.init) {
        x("mousedown", r),
          x("keyup", r),
          x("submit", function (t) {
            e(t.target || t.srcElement || {});
          });
        var a = HTMLFormElement.prototype.submit;
        (HTMLFormElement.prototype.submit = function () {
          e(this), a.call(this);
        }),
          (n.init = !0);
      }
    },
    I = function (t, e, n, r, a) {
      (t = {
        callback: t,
        domains: e,
        fragment: 2 === n,
        placement: n,
        forms: r,
        sameHost: a,
      }),
        P().decorators.push(t);
    },
    L = function (t, e, n) {
      for (var r = P().decorators, a = {}, i = 0; i < r.length; ++i) {
        var o,
          s = r[i];
        if ((o = !n || s.forms))
          t: {
            o = s.domains;
            var c = t,
              u = !!s.sameHost;
            if (o && (u || c !== b.location.hostname))
              for (var g = 0; g < o.length; g++)
                if (o[g] instanceof RegExp) {
                  if (o[g].test(c)) {
                    o = !0;
                    break t;
                  }
                } else if (
                  0 <= c.indexOf(o[g]) ||
                  (u && 0 <= o[g].indexOf(c))
                ) {
                  o = !0;
                  break t;
                }
            o = !1;
          }
        o &&
          (null == (o = s.placement) && (o = s.fragment ? 2 : 1),
          o === e && l(a, s.callback()));
      }
      return a;
    };
  function P() {
    var t = k(),
      e = t.gl;
    return (e && e.decorators) || ((e = { decorators: [] }), (t.gl = e)), e;
  }
  var D = /(.*?)\*(.*?)\*(.*)/,
    M = /([^?#]+)(\?[^#]*)?(#.*)?/;
  function U(t) {
    return new RegExp("(.*?)(^|&)" + t + "=([^&]*)&?(.*)");
  }
  var $ = function (n) {
    var r,
      o = [];
    for (r in n)
      if (n.hasOwnProperty(r)) {
        var s = n[r];
        if (
          void 0 !== s &&
          s == s &&
          null !== s &&
          "[object Object]" !== s.toString()
        ) {
          o.push(r);
          var c = o,
            u = c.push;
          (s = String(s)), (t = t || i()), (e = e || a());
          for (var l = [], g = 0; g < s.length; g += 3) {
            var f = g + 1 < s.length,
              h = g + 2 < s.length,
              d = s.charCodeAt(g),
              p = f ? s.charCodeAt(g + 1) : 0,
              v = h ? s.charCodeAt(g + 2) : 0,
              m = d >> 2;
            (d = ((3 & d) << 4) | (p >> 4)),
              (p = ((15 & p) << 2) | (v >> 6)),
              (v &= 63),
              h || ((v = 64), f || (p = 64)),
              l.push(t[m], t[d], t[p], t[v]);
          }
          u.call(c, l.join(""));
        }
      }
    return ["1", q((n = o.join("*"))), n].join("*");
  };
  function q(t, e) {
    if (
      ((t = [
        y.userAgent,
        new Date().getTimezoneOffset(),
        y.userLanguage || y.language,
        Math.floor(new Date(Date.now()).getTime() / 60 / 1e3) -
          (void 0 === e ? 0 : e),
        t,
      ].join("*")),
      !(e = m))
    ) {
      e = Array(256);
      for (var n = 0; 256 > n; n++) {
        for (var r = n, a = 0; 8 > a; a++)
          r = 1 & r ? (r >>> 1) ^ 3988292384 : r >>> 1;
        e[n] = r;
      }
    }
    for (m = e, e = 4294967295, n = 0; n < t.length; n++)
      e = (e >>> 8) ^ m[255 & (e ^ t.charCodeAt(n))];
    return ((-1 ^ e) >>> 0).toString(36);
  }
  function G(t) {
    return function (e) {
      var n = j(w.location.href),
        r = n.search.replace("?", "");
      t: {
        for (var a = r.split("&"), i = 0; i < a.length; i++) {
          var o = a[i].split("=");
          if ("_gl" === decodeURIComponent(o[0]).replace(/\+/g, " ")) {
            a = o.slice(1).join("=");
            break t;
          }
        }
        a = void 0;
      }
      (e.query = H(a || "") || {}),
        (i = (a = A(n, "fragment")).match(U("_gl"))),
        (e.fragment = H((i && i[3]) || "") || {}),
        t &&
          (function (t, e, n) {
            function r(t, e) {
              return (t = F("_gl", t)).length && (t = e + t), t;
            }
            if (_ && _.replaceState) {
              var a = U("_gl");
              (a.test(e) || a.test(n)) &&
                ((t = A(t, "path")),
                (e = r(e, "?")),
                (n = r(n, "#")),
                _.replaceState({}, void 0, "" + t + e + n));
            }
          })(n, r, a);
    };
  }
  function F(t, e) {
    if ((t = U(t).exec(e))) {
      var n = t[2],
        r = t[4];
      (e = t[1]), r && (e = e + n + r);
    }
    return e;
  }
  var H = function (t) {
    try {
      t: {
        if (t) {
          e: {
            for (var e = 0; 3 > e; ++e) {
              var n = D.exec(t);
              if (n) {
                var r = n;
                break e;
              }
              t = decodeURIComponent(t);
            }
            r = void 0;
          }
          if (r && "1" === r[1]) {
            var a = r[2],
              i = r[3];
            e: {
              for (r = 0; 3 > r; ++r)
                if (a === q(i, r)) {
                  var s = !0;
                  break e;
                }
              s = !1;
            }
            if (s) {
              var u = i;
              break t;
            }
            c(7);
          }
        }
        u = void 0;
      }
      if (void 0 !== (a = u)) {
        u = {};
        var l = a ? a.split("*") : [];
        for (a = 0; a + 1 < l.length; a += 2) {
          var g = l[a],
            f = o(l[a + 1]);
          u[g] = f;
        }
        return c(6), u;
      }
    } catch (t) {
      c(8);
    }
  };
  function V(t, e, n, r) {
    function a(e) {
      var n = (e = F(t, e)).charAt(e.length - 1);
      return e && "&" !== n && (e += "&"), e + s;
    }
    r = void 0 !== r && r;
    var i = M.exec(n);
    if (!i) return "";
    n = i[1];
    var o = i[2] || "";
    i = i[3] || "";
    var s = t + "=" + e;
    return (
      r ? (i = "#" + a(i.substring(1))) : (o = "?" + a(o.substring(1))),
      "" + n + o + i
    );
  }
  function B(t, e) {
    var n = "FORM" === (t.tagName || "").toUpperCase(),
      r = L(e, 1, n),
      a = L(e, 2, n);
    for (var i in ((e = L(e, 3, n)),
    g(r) && ((r = $(r)), n ? X("_gl", r, t) : K("_gl", r, t, !1)),
    !n && g(a) && K("_gl", (n = $(a)), t, !0),
    e))
      e.hasOwnProperty(i) && z(i, e[i], t);
  }
  function z(t, e, n, r) {
    if (n.tagName) {
      if ("a" === n.tagName.toLowerCase()) return K(t, e, n, r);
      if ("form" === n.tagName.toLowerCase()) return X(t, e, n);
    }
    if ("string" == typeof n) return V(t, e, n, r);
  }
  function K(t, e, n, r) {
    n.href &&
      ((t = V(t, e, n.href, void 0 !== r && r)), h.test(t) && (n.href = t));
  }
  function X(t, e, n) {
    if (n && n.action) {
      var r = (n.method || "").toLowerCase();
      if ("get" === r) {
        r = n.childNodes || [];
        for (var a = !1, i = 0; i < r.length; i++) {
          var o = r[i];
          if (o.name === t) {
            o.setAttribute("value", e), (a = !0);
            break;
          }
        }
        a ||
          ((r = b.createElement("input")).setAttribute("type", "hidden"),
          r.setAttribute("name", t),
          r.setAttribute("value", e),
          n.appendChild(r));
      } else
        "post" === r && ((t = V(t, e, n.action)), h.test(t) && (n.action = t));
    }
  }
  function W(t) {
    try {
      t: {
        for (var e = 100; t && 0 < e; ) {
          if (t.href && t.nodeName.match(/^a(?:rea)?$/i)) {
            var n = t;
            break t;
          }
          (t = t.parentNode), e--;
        }
        n = null;
      }
      if (n) {
        var r = n.protocol;
        ("http:" !== r && "https:" !== r) || B(n, n.hostname);
      }
    } catch (t) {}
  }
  function Y(t) {
    try {
      if (t.action) B(t, A(j(t.action), "host"));
    } catch (t) {}
  }
  r("google_tag_data.glBridge.auto", function (t, e, n, r) {
    R(), I(t, e, "fragment" === n ? 2 : 1, !!r, !1);
  }),
    r("google_tag_data.glBridge.passthrough", function (t, e, n) {
      R(), I(t, [E(w.location, "host", !0)], e, !!n, !0);
    }),
    r("google_tag_data.glBridge.decorate", function (t, e, n) {
      return z("_gl", (t = $(t)), e, !!n);
    }),
    r("google_tag_data.glBridge.generate", $),
    r("google_tag_data.glBridge.get", function (t, e) {
      var n = G(!!e);
      return (
        (e = P()).data || ((e.data = { query: {}, fragment: {} }), n(e.data)),
        (n = {}),
        (e = e.data) && (l(n, e.query), t && l(n, e.fragment)),
        n
      );
    }),
    r("google_tag_data.tcBridge.registerUa", function (t, e) {
      t = t + "_" + e;
      var n = S(),
        r = n.destination[t];
      r
        ? ((r.state = 2), (r.containers = []), (r.destinations = [e]))
        : (n.destination[t] = { state: 2, containers: [], destinations: [e] });
    }),
    r("google_tag_data.tcBridge.setSideload", function (t, e, n) {
      (t = { ctid: t + "_" + n, isDestination: !0 }),
        (S().container[e] = {
          state: 1,
          context: { source: 5, fromContainerExecution: !0 },
          parent: t,
        }),
        T({ ctid: e, isDestination: !1 });
    });
})(window),
  (function () {
    function t(t) {
      var e,
        n = 1;
      if (t)
        for (n = 0, e = t.length - 1; 0 <= e; e--) {
          var r = t.charCodeAt(e);
          n =
            0 != (r = 266338304 & (n = ((n << 6) & 268435455) + r + (r << 14)))
              ? n ^ (r >> 21)
              : n;
        }
      return n;
    }
    var e = function (t) {
      this.C = t || [];
    };
    (e.prototype.set = function (t) {
      this.C[t] = !0;
    }),
      (e.prototype.get = function (t) {
        return this.C[t];
      }),
      (e.prototype.encode = function () {
        for (var t = [], e = 0; e < this.C.length; e++)
          this.C[e] && (t[Math.floor(e / 6)] ^= 1 << e % 6);
        for (e = 0; e < t.length; e++)
          t[e] =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(
              t[e] || 0
            );
        return t.join("") + "~";
      });
    var n,
      r,
      a = window.GoogleAnalyticsObject;
    if (
      ((n = null != a) && (n = -1 < (a.constructor + "").indexOf("String")),
      (r = n))
    ) {
      var i = window.GoogleAnalyticsObject;
      r = i ? i.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : "";
    }
    var o = r || "ga",
      s = /^(?:utma\.)?\d+\.\d+$/,
      c = /^amp-[\w.-]{22,64}$/,
      u = !1,
      l = new e();
    function g(t) {
      l.set(t);
    }
    var f = function (t) {
        (t = h(t)), (t = new e(t));
        for (var n = l.C.slice(), r = 0; r < t.C.length; r++)
          n[r] = n[r] || t.C[r];
        return new e(n).encode();
      },
      h = function (t) {
        return (t = t.get(Je)), p(t) || (t = []), t;
      },
      d = function (t) {
        return "function" == typeof t;
      },
      p = function (t) {
        return "[object Array]" == Object.prototype.toString.call(Object(t));
      },
      v = function (t) {
        return null != t && -1 < (t.constructor + "").indexOf("String");
      },
      m = function (t, e) {
        return 0 == t.indexOf(e);
      },
      w = function () {
        for (
          var e =
              L.navigator.userAgent +
              (P.cookie ? P.cookie : "") +
              (P.referrer ? P.referrer : ""),
            n = e.length,
            r = L.history.length;
          0 < r;

        )
          e += r-- ^ n++;
        return [
          It() ^ (2147483647 & t(e)),
          Math.round(new Date().getTime() / 1e3),
        ].join(".");
      },
      _ = function () {},
      b = function (t) {
        return encodeURIComponent instanceof Function
          ? encodeURIComponent(t)
          : (g(28), t);
      },
      y = function (t, e, n, r) {
        try {
          t.addEventListener
            ? t.addEventListener(e, n, !!r)
            : t.attachEvent && t.attachEvent("on" + e, n);
        } catch (t) {
          g(27);
        }
      },
      k = /^[\w\-:/.?=&%!\[\]]+$/,
      x = /^[\w+/_-]+[=]{0,2}$/,
      T = null,
      O = function (t, e, n, r, a) {
        if (!T) {
          T = {
            createScriptURL: function (t) {
              return t;
            },
            createHTML: function (t) {
              return t;
            },
          };
          try {
            T = window.trustedTypes.createPolicy("google-analytics", T);
          } catch (t) {}
        }
        if (t) {
          var i = (P.querySelector && P.querySelector("script[nonce]")) || null;
          (i =
            (i && (i.nonce || (i.getAttribute && i.getAttribute("nonce")))) ||
            ""),
            n
              ? ((a = r = ""),
                e && k.test(e) && (r = ' id="' + e + '"'),
                i && x.test(i) && (a = ' nonce="' + i + '"'),
                k.test(t) &&
                  P.write(
                    T.createHTML(
                      "<script" + r + a + ' src="' + t + '"></script>'
                    )
                  ))
              : (((n = P.createElement("script")).type = "text/javascript"),
                (n.async = !0),
                (n.src = T.createScriptURL(t)),
                r && (n.onload = r),
                a && (n.onerror = a),
                e && (n.id = e),
                i && n.setAttribute("nonce", i),
                (t =
                  P.getElementsByTagName("script")[0]).parentNode.insertBefore(
                  n,
                  t
                ));
        }
      },
      S = function (t, e) {
        return C(P.location[e ? "href" : "search"], t);
      },
      C = function (t, e) {
        return (t = t.match(
          "(?:&|#|\\?)" +
            b(e).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") +
            "=([^&#]*)"
        )) && 2 == t.length
          ? t[1]
          : "";
      },
      A = function () {
        var t = "" + P.location.hostname;
        return 0 == t.indexOf("www.") ? t.substring(4) : t;
      },
      E = function (t, e) {
        var n = t.indexOf(e);
        return (
          (5 == n || 6 == n) &&
          ("/" == (t = t.charAt(n + e.length)) ||
            "?" == t ||
            "" == t ||
            ":" == t)
        );
      },
      N = function (t, e) {
        var n = P.referrer;
        if (/^(https?|android-app):\/\//i.test(n)) {
          if (t) return n;
          if (((t = "//" + P.location.hostname), !E(n, t)))
            return e &&
              ((e = t.replace(/\./g, "-") + ".cdn.ampproject.org"), E(n, e))
              ? void 0
              : n;
        }
      },
      j = function (t, e) {
        if (1 == e.length && null != e[0] && "object" == typeof e[0])
          return e[0];
        for (
          var n = {}, r = Math.min(t.length + 1, e.length), a = 0;
          a < r;
          a++
        ) {
          if ("object" == typeof e[a]) {
            for (var i in e[a]) e[a].hasOwnProperty(i) && (n[i] = e[a][i]);
            break;
          }
          a < t.length && (n[t[a]] = e[a]);
        }
        return n;
      },
      R = function (t, e) {
        for (var n = 0; n < t.length; n++) if (e == t[n]) return !0;
        return !1;
      },
      I = function () {
        (this.oa = []), (this.ea = {}), (this.m = {});
      };
    (I.prototype.set = function (t, e, n) {
      this.oa.push(t), n ? (this.m[":" + t] = e) : (this.ea[":" + t] = e);
    }),
      (I.prototype.get = function (t) {
        return this.m.hasOwnProperty(":" + t)
          ? this.m[":" + t]
          : this.ea[":" + t];
      }),
      (I.prototype.map = function (t) {
        for (var e = 0; e < this.oa.length; e++) {
          var n = this.oa[e],
            r = this.get(n);
          r && t(n, r);
        }
      });
    var L = window,
      P = document,
      D = document.currentScript ? document.currentScript.src : "",
      M = function (t, e) {
        return setTimeout(t, e);
      },
      U = window,
      $ = document,
      q = function (t) {
        var e = U._gaUserPrefs;
        if (
          (e && e.ioo && e.ioo()) ||
          $.documentElement.hasAttribute("data-google-analytics-opt-out") ||
          (t && !0 === U["ga-disable-" + t])
        )
          return !0;
        try {
          var n = U.external;
          if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs) return !0;
        } catch (t) {}
        for (
          t = [], e = String($.cookie).split(";"), n = 0;
          n < e.length;
          n++
        ) {
          var r = e[n].split("="),
            a = r[0].replace(/^\s*|\s*$/g, "");
          a &&
            "AMP_TOKEN" == a &&
            ((r = r
              .slice(1)
              .join("=")
              .replace(/^\s*|\s*$/g, "")) && (r = decodeURIComponent(r)),
            t.push(r));
        }
        for (e = 0; e < t.length; e++) if ("$OPT_OUT" == t[e]) return !0;
        return !!$.getElementById("__gaOptOutExtension");
      },
      G = function (t) {
        var e = [],
          n = P.cookie.split(";");
        t = new RegExp("^\\s*" + t + "=\\s*(.*?)\\s*$");
        for (var r = 0; r < n.length; r++) {
          var a = n[r].match(t);
          a && e.push(a[1]);
        }
        return e;
      },
      F = function (t, e, n, r, a, i, o) {
        if (
          !(a =
            !q(a) && !(B.test(P.location.hostname) || ("/" == n && V.test(r))))
        )
          return !1;
        if (
          (e && 1200 < e.length && (e = e.substring(0, 1200)),
          (n = t + "=" + e + "; path=" + n + "; "),
          i &&
            (n +=
              "expires=" +
              new Date(new Date().getTime() + i).toGMTString() +
              "; "),
          r && "none" !== r && (n += "domain=" + r + ";"),
          o && (n += o + ";"),
          (r = P.cookie),
          (P.cookie = n),
          !(r = r != P.cookie))
        )
          t: {
            for (t = G(t), r = 0; r < t.length; r++)
              if (e == t[r]) {
                r = !0;
                break t;
              }
            r = !1;
          }
        return r;
      },
      H = function (t) {
        return encodeURIComponent
          ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29")
          : t;
      },
      V = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
      B = /(^|\.)doubleclick\.net$/i;
    function z(t, e, n) {
      e = (function (t) {
        var e = [],
          n = P.cookie.split(";");
        t = new RegExp(
          "^\\s*" + (t || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$"
        );
        for (var r = 0; r < n.length; r++) {
          var a = n[r].match(t);
          a &&
            e.push({
              ja: a[1],
              value: a[2],
              timestamp: Number(a[2].split(".")[1]) || 0,
            });
        }
        return (
          e.sort(function (t, e) {
            return e.timestamp - t.timestamp;
          }),
          e
        );
      })(e);
      var r = {};
      if (!e || !e.length) return r;
      for (var a = 0; a < e.length; a++) {
        var i = e[a].value.split(".");
        if ("1" !== i[0] || (n && 3 > i.length) || (!n && 3 !== i.length))
          t && (t.na = !0);
        else if (Number(i[1])) {
          r[e[a].ja] ? t && (t.pa = !0) : (r[e[a].ja] = []);
          var o = { version: i[0], timestamp: 1e3 * Number(i[1]), qa: i[2] };
          n && 3 < i.length && (o.labels = i.slice(3)), r[e[a].ja].push(o);
        }
      }
      return r;
    }
    var K,
      X,
      W,
      Y,
      Z = /^https?:\/\/[^/]*cdn\.ampproject\.org\//,
      J = /^(?:www\.|m\.|amp\.)+/,
      Q = [],
      tt = function (t) {
        if (st(t[Gn])) {
          var e;
          if (void 0 === Y)
            (e = ((e = Dr.get()) && e._ga) || void 0) && ((Y = e), g(81));
          if (void 0 !== Y) return t[bn] || (t[bn] = Y), !1;
        }
        if (t[Gn]) {
          if ((g(67), t[In] && "cookie" != t[In])) return !1;
          if (void 0 !== Y) t[bn] || (t[bn] = Y);
          else {
            t: {
              e = String(t[Sn] || A());
              var n = String(t[Cn] || "/"),
                r = G(String(t[On] || "_ga"));
              if (!(e = Or(r, e, n)) || s.test(e)) e = !0;
              else if (0 == (e = G("AMP_TOKEN")).length) e = !0;
              else {
                if (
                  1 == e.length &&
                  ("$RETRIEVING" == (e = decodeURIComponent(e[0])) ||
                    "$OPT_OUT" == e ||
                    "$ERROR" == e ||
                    "$NOT_FOUND" == e)
                ) {
                  e = !0;
                  break t;
                }
                e = !1;
              }
            }
            if (e && nt(et, String(t[Tn]))) return !0;
          }
        }
        return !1;
      },
      et = function () {
        Ra.D([_]);
      },
      nt = function (t, e) {
        var n = G("AMP_TOKEN");
        return 1 < n.length
          ? (g(55), !1)
          : "$OPT_OUT" == (n = decodeURIComponent(n[0] || "")) ||
            "$ERROR" == n ||
            q(e)
          ? (g(62), !1)
          : Z.test(P.referrer) || "$NOT_FOUND" != n
          ? void 0 !== Y
            ? (g(56),
              M(function () {
                t(Y);
              }, 0),
              !0)
            : K
            ? (Q.push(t), !0)
            : "$RETRIEVING" == n
            ? (g(57),
              M(function () {
                nt(t, e);
              }, 1e4),
              !0)
            : ((K = !0),
              (n && "$" != n[0]) ||
                (it("$RETRIEVING", 3e4), setTimeout(at, 3e4), (n = "")),
              !!rt(n, e) && (Q.push(t), !0))
          : (g(68), !1);
      },
      rt = function (t, e, n) {
        if (!window.JSON) return g(58), !1;
        var r = L.XMLHttpRequest;
        if (!r) return g(59), !1;
        var a = new r();
        return "withCredentials" in a
          ? (a.open(
              "POST",
              (n || "https://ampcid.google.com/v1/publisher:getClientId") +
                "?key=AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM",
              !0
            ),
            (a.withCredentials = !0),
            a.setRequestHeader("Content-Type", "text/plain"),
            (a.onload = function () {
              if (((K = !1), 4 == a.readyState)) {
                try {
                  200 != a.status && (g(61), ot("", "$ERROR", 3e4));
                  var r = JSON.parse(a.responseText);
                  r.optOut
                    ? (g(63), ot("", "$OPT_OUT", 31536e6))
                    : r.clientId
                    ? ot(r.clientId, r.securityToken, 31536e6)
                    : !n && r.alternateUrl
                    ? (X && clearTimeout(X), (K = !0), rt(t, e, r.alternateUrl))
                    : (g(64), ot("", "$NOT_FOUND", 36e5));
                } catch (t) {
                  g(65), ot("", "$ERROR", 3e4);
                }
                a = null;
              }
            }),
            (r = { originScope: "AMP_ECID_GOOGLE" }),
            t && (r.securityToken = t),
            a.send(JSON.stringify(r)),
            (X = M(function () {
              g(66), ot("", "$ERROR", 3e4);
            }, 1e4)),
            !0)
          : (g(60), !1);
      },
      at = function () {
        K = !1;
      },
      it = function (t, e) {
        if (void 0 === W) {
          W = "";
          for (var n = Ar(), r = 0; r < n.length; r++) {
            var a = n[r];
            if (F("AMP_TOKEN", encodeURIComponent(t), "/", a, "", e))
              return void (W = a);
          }
        }
        F("AMP_TOKEN", encodeURIComponent(t), "/", W, "", e);
      },
      ot = function (t, e, n) {
        for (
          X && clearTimeout(X), e && it(e, n), Y = t, e = Q, Q = [], n = 0;
          n < e.length;
          n++
        )
          e[n](t);
      },
      st = function (t) {
        t: {
          if (Z.test(P.referrer)) {
            var e = P.location.hostname.replace(J, "");
            e: {
              var n = P.referrer,
                r = (n = n.replace(/^https?:\/\//, ""))
                  .replace(/^[^/]+/, "")
                  .split("/"),
                a = r[2];
              if (
                !(r = (r = "s" == a ? r[3] : a) ? decodeURIComponent(r) : r)
              ) {
                if (0 == n.indexOf("xn--")) {
                  n = "";
                  break e;
                }
                (n = n.match(/(.*)\.cdn\.ampproject\.org\/?$/)) &&
                  2 == n.length &&
                  (r = n[1].replace(/-/g, ".").replace(/\.\./g, "-"));
              }
              n = r ? r.replace(J, "") : "";
            }
            if (
              ((r = e === n) ||
                ((n = "." + n),
                (r = e.substring(e.length - n.length, e.length) === n)),
              r)
            ) {
              e = !0;
              break t;
            }
            g(78);
          }
          e = !1;
        }
        return e && !1 !== t;
      },
      ct = function (t) {
        return (
          (t || u || "https:" == P.location.protocol ? "https:" : "http:") +
          "//www.google-analytics.com"
        );
      },
      ut = function (t) {
        switch (t) {
          default:
          case 1:
            return "https://www.google-analytics.com/gtm/js?id=";
          case 2:
            return "https://www.googletagmanager.com/gtag/js?id=";
        }
      },
      lt = function (t) {
        (this.name = "len"), (this.message = t + "-8192");
      },
      gt = function (t, e, n) {
        if (((n = n || _), 2036 >= e.length)) ht(t, e, n);
        else {
          if (!(8192 >= e.length))
            throw (wt("len", e.length), new lt(e.length));
          mt(t, e, n) || dt(t, e, n) || ht(t, e, n);
        }
      },
      ft = function (t, e, n, r) {
        dt(t + "?" + e, "", (r = r || _), n);
      },
      ht = function (t, e, n) {
        var r = (function (t) {
          var e = P.createElement("img");
          return (e.width = 1), (e.height = 1), (e.src = t), e;
        })(t + "?" + e);
        r.onload = r.onerror = function () {
          (r.onload = null), (r.onerror = null), n();
        };
      },
      dt = function (t, e, n, r) {
        var a = L.XMLHttpRequest;
        if (!a) return !1;
        var i = new a();
        return (
          "withCredentials" in i &&
          ((t = t.replace(/^http:/, "https:")),
          i.open("POST", t, !0),
          (i.withCredentials = !0),
          i.setRequestHeader("Content-Type", "text/plain"),
          (i.onreadystatechange = function () {
            if (4 == i.readyState) {
              if (r && "text/plain" === i.getResponseHeader("Content-Type"))
                try {
                  pt(r, i.responseText, n);
                } catch (t) {
                  wt("xhr", "rsp"), n();
                }
              else n();
              i = null;
            }
          }),
          i.send(e),
          !0)
        );
      },
      pt = function (t, e, n) {
        if (1 > e.length) wt("xhr", "ver", "0"), n();
        else if (3 < t.count++) wt("xhr", "tmr", "" + t.count), n();
        else {
          var r = e.charAt(0);
          if ("1" === r) vt(t, e.substring(1), n);
          else if (t.V && "2" === r) {
            var a = e.substring(1).split(","),
              i = 0;
            for (
              e = function () {
                ++i === a.length && n();
              },
                r = 0;
              r < a.length;
              r++
            )
              vt(t, a[r], e);
          } else wt("xhr", "ver", String(e.length)), n();
        }
      },
      vt = function (t, e, n) {
        if (0 === e.length) n();
        else {
          var r = e.charAt(0);
          switch (r) {
            case "d":
              ft("https://stats.g.doubleclick.net/j/collect", t.U, t, n);
              break;
            case "g":
              ht("https://www.google.com/ads/ga-audiences", t.google, n),
                (e = e.substring(1)) &&
                  (/^[a-z.]{1,6}$/.test(e)
                    ? ht(
                        "https://www.google.%/ads/ga-audiences".replace("%", e),
                        t.google,
                        _
                      )
                    : wt("tld", "bcc", e));
              break;
            case "G":
              if (t.V) {
                t.V("G-" + e.substring(1)), n();
                break;
              }
            case "x":
              if (t.V) {
                t.V(), n();
                break;
              }
            case "c":
              if (t.V) {
                t.V(e.substring(1)), n();
                break;
              }
            default:
              wt("xhr", "brc", r), n();
          }
        }
      },
      mt = function (t, e, n) {
        return (
          !!L.navigator.sendBeacon &&
          !!L.navigator.sendBeacon(t, e) &&
          (n(), !0)
        );
      },
      wt = function (t, e, n) {
        1 <= 100 * Math.random() ||
          q("?") ||
          ((t = ["t=error", "_e=" + t, "_v=j101", "sr=1"]),
          e && t.push("_f=" + e),
          n && t.push("_m=" + b(n.substring(0, 100))),
          t.push("aip=1"),
          t.push("z=" + It()),
          ht(ct(!0) + "/u/d", t.join("&"), _));
      },
      _t = function () {
        return (L.gaData = L.gaData || {});
      },
      bt = function (t) {
        var e = _t();
        return (e[t] = e[t] || {});
      },
      yt = function () {
        this.M = [];
      };
    function kt(e) {
      if (100 != e.get(Dn) && t(Mt(e, bn)) % 1e4 >= 100 * Ut(e, Dn))
        throw "abort";
    }
    function xt(t) {
      if (q(Mt(t, Tn))) throw "abort";
    }
    function Tt() {
      var t = P.location.protocol;
      if ("http:" != t && "https:" != t) throw "abort";
    }
    function Ot(t) {
      try {
        L.navigator.sendBeacon
          ? g(42)
          : L.XMLHttpRequest &&
            "withCredentials" in new L.XMLHttpRequest() &&
            g(40);
      } catch (t) {}
      t.set(Ze, f(t), !0), t.set(ie, Ut(t, ie) + 1);
      var e = [];
      Ht.map(function (n, r) {
        r.F &&
          null != (n = t.get(n)) &&
          n != r.defaultValue &&
          ("boolean" == typeof n && (n *= 1), e.push(r.F + "=" + b("" + n)));
      }),
        !1 === t.get(cr) && e.push("npa=1"),
        e.push("z=" + Lt()),
        (function (t) {
          var e = !1,
            n = !1;
          if (l.get(89)) {
            n = !0;
            var r = t.get(se),
              a = P.location;
            if (a) {
              var i = a.pathname || "";
              "/" != i.charAt(0) && (i = "/" + i),
                (a = a.protocol + "//" + a.hostname + i + a.search),
                (r && 0 === r.indexOf(a)) || (e = !0);
            }
          }
          return (
            !n &&
              l.get(90) &&
              ((n = !0),
              (r = t.get(ce)) !== (a = N(!!t.get(Un), !!t.get(Gn))) &&
                (e = !0)),
            !n && l.get(91) && ((n = !0), t.get(fe) !== P.title && (e = !0)),
            n && !e
          );
        })(t) && g(109),
        t.set(ne, e.join("&"), !0);
    }
    function St(t) {
      var e = Mt(t, ae);
      !e && t.get(re) && (e = "beacon");
      var n = Mt(t, nr),
        r = Mt(t, Kn),
        a = n || (r || ct(!1) + "") + "/collect",
        i = t.Z(ee),
        o = Mt(t, ne),
        s = Mt(t, Tn);
      switch (Mt(t, or)) {
        case "d":
          (a = n || (r || ct(!1) + "") + "/j/collect"),
            (e = t.get(ir) || void 0),
            ft(a, o, e, i);
          break;
        default:
          e
            ? ((i = i || _),
              "image" == e
                ? ht(a, o, i)
                : ("xhr" == e && dt(a, o, i)) ||
                  ("beacon" == e && mt(a, o, i)) ||
                  gt(a, o, i))
            : gt(a, o, i);
      }
      if (
        ((i = (o = bt(s)).hitcount),
        (o.hitcount = i ? i + 1 : 1),
        o.first_hit || (o.first_hit = new Date().getTime()),
        delete bt(s).pending_experiments,
        t.set(ee, _, !0),
        Ua(t))
      )
        if (((o = Mt(t, Tn)), (s = La[o])))
          for (o = 0; o < s.length; ++o)
            (i = Da(s[o]).q) && 30 > i.length && i.push && i.push(Ma(t));
        else (Pa[o] = Pa[o] || []), 30 > Pa[o].length && Pa[o].push(Ma(t));
    }
    function Ct(t) {
      _t().expId && t.set(Ge, _t().expId),
        _t().expVar && t.set(Fe, _t().expVar);
      var e = Mt(t, Tn);
      if ((e = bt(e).pending_experiments)) {
        var n = [];
        for (r in e)
          e.hasOwnProperty(r) &&
            e[r] &&
            n.push(encodeURIComponent(r) + "." + encodeURIComponent(e[r]));
        var r = n.join("!");
      } else r = void 0;
      r && ((e = t.get(He)) && (r = e + "!" + r), t.set(He, r, !0));
    }
    function At() {
      if (L.navigator && "preview" == L.navigator.loadPurpose) throw "abort";
    }
    function Et(t) {
      var e = L.gaDevIds || [];
      if (p(e)) {
        var n = t.get("&did");
        v(n) && 0 < n.length && (e = e.concat(n.split(","))), (n = []);
        for (var r = 0; r < e.length; r++) R(n, e[r]) || n.push(e[r]);
        0 != n.length && t.set("&did", n.join(","), !0);
      }
    }
    function Nt(t) {
      if (!t.get(Tn)) throw "abort";
    }
    function jt(t) {
      try {
        if (!t.get(Jn) && (t.set(Jn, !0), !t.get("&gtm"))) {
          var e = void 0;
          if (
            (Rt(S("gtm_debug")) && (e = 2),
            !e && m(P.referrer, "https://tagassistant.google.com/") && (e = 3),
            !e && R(P.cookie.split("; "), "__TAG_ASSISTANT=x") && (e = 4),
            e ||
              (Rt(
                P.documentElement.getAttribute("data-tag-assistant-present")
              ) &&
                (e = 5)),
            e)
          ) {
            L["google.tagmanager.debugui2.queue"] ||
              ((L["google.tagmanager.debugui2.queue"] = []),
              O(
                "https://www.google-analytics.com/debug/bootstrap?id=" +
                  t.get(Tn) +
                  "&src=LEGACY&cond=" +
                  e
              ));
            var n = P.currentScript;
            L["google.tagmanager.debugui2.queue"].push({
              messageType: "LEGACY_CONTAINER_STARTING",
              data: { id: t.get(Tn), scriptSource: (n && n.src) || "" },
            });
          }
        }
      } catch (t) {}
    }
    function Rt(t) {
      if (null == t || 0 === t.length) return !1;
      t = Number(t);
      var e = Date.now();
      return t < e + 3e5 && t > e - 9e5;
    }
    (yt.prototype.add = function (t) {
      this.M.push(t);
    }),
      (yt.prototype.D = function (t) {
        try {
          for (var e = 0; e < this.M.length; e++) {
            var n = t.get(this.M[e]);
            n && d(n) && n.call(L, t);
          }
        } catch (t) {}
        (e = t.get(ee)) != _ && d(e) && (t.set(ee, _, !0), setTimeout(e, 10));
      });
    var It = function () {
        return Math.round(2147483647 * Math.random());
      },
      Lt = function () {
        try {
          var t = new Uint32Array(1);
          return L.crypto.getRandomValues(t), 2147483647 & t[0];
        } catch (t) {
          return It();
        }
      };
    function Pt(t) {
      var e = Ut(t, Ke);
      500 <= e && g(15);
      var n = Mt(t, te);
      if ("transaction" != n && "item" != n) {
        n = Ut(t, We);
        var r = new Date().getTime(),
          a = Ut(t, Xe);
        if (
          (0 == a && t.set(Xe, r),
          0 < (a = Math.round((2 * (r - a)) / 1e3)) &&
            ((n = Math.min(n + a, 20)), t.set(Xe, r)),
          0 >= n)
        )
          throw "abort";
        t.set(We, --n);
      }
      t.set(Ke, ++e);
    }
    var Dt = function () {
      this.data = new I();
    };
    Dt.prototype.get = function (t) {
      var e = zt(t),
        n = this.data.get(t);
      return (
        e &&
          null == n &&
          (n = d(e.defaultValue) ? e.defaultValue() : e.defaultValue),
        e && e.Z ? e.Z(this, t, n) : n
      );
    };
    var Mt = function (t, e) {
        return null == (t = t.get(e)) ? "" : "" + t;
      },
      Ut = function (t, e) {
        return null == (t = t.get(e)) || "" === t ? 0 : Number(t);
      };
    (Dt.prototype.Z = function (t) {
      return (t = this.get(t)) && d(t) ? t : _;
    }),
      (Dt.prototype.set = function (t, e, n) {
        if (t)
          if ("object" == typeof t)
            for (var r in t) t.hasOwnProperty(r) && $t(this, r, t[r], n);
          else $t(this, t, e, n);
      });
    var $t = function (t, e, n, r) {
        if (null != n)
          switch (e) {
            case Tn:
              ga.test(n);
          }
        var a = zt(e);
        a && a.o ? a.o(t, e, n, r) : t.data.set(e, n, r);
      },
      qt = {
        hitPayload: 88,
        location: 89,
        referrer: 90,
        title: 91,
        buildHitTask: 93,
        sendHitTask: 94,
        displayFeaturesTask: 95,
        customTask: 97,
        cookieName: 98,
        cookieDomain: 99,
        cookiePath: 100,
        cookieExpires: 101,
        cookieUpdate: 102,
        cookieFlags: 103,
        storage: 104,
        _x_19: 105,
        transportUrl: 106,
        allowAdFeatures: 107,
        sampleRate: 108,
      };
    function Gt(t, e) {
      var n = qt[t];
      n && g(n),
        "displayFeaturesTask" === t && null == e && g(96),
        /.*Task$/.test(t) && g(92);
    }
    function Ft(t, e) {
      if (t)
        if ("object" == typeof t)
          for (var n in t) t.hasOwnProperty(n) && Gt(n, e);
        else Gt(t, e);
    }
    var Ht = new I(),
      Vt = [],
      Bt = function (t, e, n, r, a) {
        (this.name = t),
          (this.F = e),
          (this.Z = r),
          (this.o = a),
          (this.defaultValue = n);
      };
    function zt(t) {
      var e = Ht.get(t);
      if (!e)
        for (var n = 0; n < Vt.length; n++) {
          var r = Vt[n],
            a = r[0].exec(t);
          if (a) {
            (e = r[1](a)), Ht.set(e.name, e);
            break;
          }
        }
      return e;
    }
    function Kt(t, e, n, r, a) {
      return (t = new Bt(t, e, n, r, a)), Ht.set(t.name, t), t.name;
    }
    function Xt(t, e) {
      Vt.push([new RegExp("^" + t + "$"), e]);
    }
    function Wt(t, e, n) {
      return Kt(t, e, n, void 0, Yt);
    }
    function Yt() {}
    var Zt = Wt("apiVersion", "v"),
      Jt = Wt("clientVersion", "_v");
    Kt("anonymizeIp", "aip");
    var Qt = Kt("adSenseId", "a"),
      te = Kt("hitType", "t"),
      ee = Kt("hitCallback"),
      ne = Kt("hitPayload");
    Kt("nonInteraction", "ni"),
      Kt("currencyCode", "cu"),
      Kt("dataSource", "ds");
    var re = Kt("useBeacon", void 0, !1),
      ae = Kt("transport");
    Kt("sessionControl", "sc", ""),
      Kt("sessionGroup", "sg"),
      Kt("queueTime", "qt");
    var ie = Kt("_s", "_s"),
      oe = Kt("_no_slc");
    Kt("screenName", "cd");
    var se = Kt("location", "dl", ""),
      ce = Kt("referrer", "dr"),
      ue = Kt("page", "dp", "");
    Kt("hostname", "dh");
    var le = Kt("language", "ul"),
      ge = Kt("encoding", "de"),
      fe = Kt("title", "dt", function () {
        return P.title || void 0;
      });
    Xt("contentGroup([0-9]+)", function (t) {
      return new Bt(t[0], "cg" + t[1]);
    });
    var he = Kt("screenColors", "sd"),
      de = Kt("screenResolution", "sr"),
      pe = Kt("viewportSize", "vp"),
      ve = Kt("javaEnabled", "je"),
      me = Kt("flashVersion", "fl");
    Kt("campaignId", "ci"),
      Kt("campaignName", "cn"),
      Kt("campaignSource", "cs"),
      Kt("campaignMedium", "cm"),
      Kt("campaignKeyword", "ck"),
      Kt("campaignContent", "cc");
    var we = Kt("eventCategory", "ec"),
      _e = Kt("eventAction", "ea"),
      be = Kt("eventLabel", "el"),
      ye = Kt("eventValue", "ev"),
      ke = Kt("socialNetwork", "sn"),
      xe = Kt("socialAction", "sa"),
      Te = Kt("socialTarget", "st"),
      Oe = Kt("l1", "plt"),
      Se = Kt("l2", "pdt"),
      Ce = Kt("l3", "dns"),
      Ae = Kt("l4", "rrt"),
      Ee = Kt("l5", "srt"),
      Ne = Kt("l6", "tcp"),
      je = Kt("l7", "dit"),
      Re = Kt("l8", "clt"),
      Ie = Kt("l9", "_gst"),
      Le = Kt("l10", "_gbt"),
      Pe = Kt("l11", "_cst"),
      De = Kt("l12", "_cbt"),
      Me = Kt("timingCategory", "utc"),
      Ue = Kt("timingVar", "utv"),
      $e = Kt("timingLabel", "utl"),
      qe = Kt("timingValue", "utt");
    Kt("appName", "an"),
      Kt("appVersion", "av", ""),
      Kt("appId", "aid", ""),
      Kt("appInstallerId", "aiid", ""),
      Kt("exDescription", "exd"),
      Kt("exFatal", "exf");
    var Ge = Kt("expId", "xid"),
      Fe = Kt("expVar", "xvar"),
      He = Kt("exp", "exp"),
      Ve = Kt("_utma", "_utma"),
      Be = Kt("_utmz", "_utmz"),
      ze = Kt("_utmht", "_utmht"),
      Ke = Kt("_hc", void 0, 0),
      Xe = Kt("_ti", void 0, 0),
      We = Kt("_to", void 0, 20);
    Xt("dimension([0-9]+)", function (t) {
      return new Bt(t[0], "cd" + t[1]);
    }),
      Xt("metric([0-9]+)", function (t) {
        return new Bt(t[0], "cm" + t[1]);
      }),
      Kt(
        "linkerParam",
        void 0,
        void 0,
        function (t) {
          if (t.get(Ye)) return g(35), Dr.generate(zr(t));
          var e = Mt(t, bn),
            n = Mt(t, $n) || "";
          return (
            (e = "_ga=2." + b(qr(n + e, 0) + "." + n + "-" + e)),
            (t = Kr(t))
              ? (g(44),
                (t =
                  "&_gac=1." + b([qr(t.qa, 0), t.timestamp, t.qa].join("."))))
              : (t = ""),
            e + t
          );
        },
        Yt
      );
    var Ye = Wt("_cd2l", void 0, !1),
      Ze = Kt("usage", "_u"),
      Je = Kt("_um");
    Kt(
      "forceSSL",
      void 0,
      void 0,
      function () {
        return u;
      },
      function (t, e, n) {
        g(34), (u = !!n);
      }
    );
    var Qe = Kt("_j1", "jid"),
      tn = Kt("_j2", "gjid");
    Xt("\\&(.*)", function (t) {
      var e = new Bt(t[0], t[1]),
        n = (function (t) {
          var e;
          return (
            Ht.map(function (n, r) {
              r.F == t && (e = r);
            }),
            e && e.name
          );
        })(t[0].substring(1));
      return (
        n &&
          ((e.Z = function (t) {
            return t.get(n);
          }),
          (e.o = function (t, e, r, a) {
            t.set(n, r, a);
          }),
          (e.F = void 0)),
        e
      );
    });
    var en = Wt("_oot"),
      nn = Kt("previewTask"),
      rn = Kt("checkProtocolTask"),
      an = Kt("validationTask"),
      on = Kt("checkStorageTask"),
      sn = Kt("historyImportTask"),
      cn = Kt("samplerTask"),
      un = Kt("_rlt"),
      ln = Kt("buildHitTask"),
      gn = Kt("sendHitTask"),
      fn = Kt("ceTask"),
      hn = Kt("devIdTask"),
      dn = Kt("timingTask"),
      pn = Kt("displayFeaturesTask"),
      vn = Kt("customTask"),
      mn = Kt("fpsCrossDomainTask"),
      wn = Wt("_cta"),
      _n = Wt("name"),
      bn = Wt("clientId", "cid"),
      yn = Wt("clientIdTime"),
      kn = Wt("storedClientId"),
      xn = Kt("userId", "uid"),
      Tn = Wt("trackingId", "tid"),
      On = Wt("cookieName", void 0, "_ga"),
      Sn = Wt("cookieDomain"),
      Cn = Wt("cookiePath", void 0, "/"),
      An = Wt("cookieExpires", void 0, 63072e3),
      En = Wt("cookieUpdate", void 0, !0),
      Nn = Wt("cookieFlags", void 0, ""),
      jn = Wt("legacyCookieDomain"),
      Rn = Wt("legacyHistoryImport", void 0, !0),
      In = Wt("storage", void 0, "cookie"),
      Ln = Wt("allowLinker", void 0, !1),
      Pn = Wt("allowAnchor", void 0, !0),
      Dn = Wt("sampleRate", "sf", 100),
      Mn = Wt("siteSpeedSampleRate", void 0, 1),
      Un = Wt("alwaysSendReferrer", void 0, !1),
      $n = Wt("_gid", "_gid"),
      qn = Wt("_gcn"),
      Gn = Wt("useAmpClientId"),
      Fn = Wt("_gclid"),
      Hn = Wt("_gt"),
      Vn = Wt("_ge", void 0, 7776e6),
      Bn = Wt("_gclsrc"),
      zn = Wt("storeGac", void 0, !0),
      Kn = Kt("_x_19"),
      Xn = Kt("_fplc", "_fplc"),
      Wn = Wt("_cs"),
      Yn = Wt("_useUp", void 0, !1),
      Zn = Kt("up", "up"),
      Jn = Kt("_tac", void 0, !1),
      Qn = Wt("_gbraid"),
      tr = Wt("_gbt"),
      er = Wt("_gbe", void 0, 7776e6),
      nr = Kt("transportUrl"),
      rr = Kt("_r", "_r"),
      ar = Kt("_slc", "_slc"),
      ir = Kt("_dp"),
      or = Kt("_jt", void 0, "n"),
      sr = Kt("allowAdFeatures", void 0, !0),
      cr = Kt("allowAdPersonalizationSignals", void 0, !0);
    function ur(t, e, n, r) {
      e[t] = function () {
        try {
          return r && g(r), n.apply(this, arguments);
        } catch (e) {
          throw (wt("exc", t, e && e.name), e);
        }
      };
    }
    var lr = function (t) {
        if ("cookie" == t.get(In))
          return 0 < (t = G("FPLC")).length ? t[0] : void 0;
      },
      gr = function (t) {
        var e;
        (e = Mt(t, Kn) && t.get(Ye)) &&
          (e = !((e = Dr.get(t.get(Pn))) && e._fplc)),
          e && !lr(t) && t.set(Xn, "0");
      },
      fr = function (t) {
        var e = {};
        if (hr(e) || dr(e)) {
          var n = e[Oe];
          null == n ||
            1 / 0 == n ||
            isNaN(n) ||
            (0 < n
              ? (pr(e, Ce),
                pr(e, Ne),
                pr(e, Ee),
                pr(e, Se),
                pr(e, Ae),
                pr(e, je),
                pr(e, Re),
                pr(e, Ie),
                pr(e, Le),
                pr(e, Pe),
                pr(e, De),
                M(function () {
                  t(e);
                }, 10))
              : y(
                  L,
                  "load",
                  function () {
                    fr(t);
                  },
                  !1
                ));
        }
      },
      hr = function (t) {
        var e = L.performance || L.webkitPerformance;
        if (!(e = e && e.timing)) return !1;
        var n = e.navigationStart;
        return (
          0 != n &&
          ((t[Oe] = e.loadEventStart - n),
          (t[Ce] = e.domainLookupEnd - e.domainLookupStart),
          (t[Ne] = e.connectEnd - e.connectStart),
          (t[Ee] = e.responseStart - e.requestStart),
          (t[Se] = e.responseEnd - e.responseStart),
          (t[Ae] = e.fetchStart - n),
          (t[je] = e.domInteractive - n),
          (t[Re] = e.domContentLoadedEventStart - n),
          (t[Ie] = $a.L - n),
          (t[Le] = $a.ya - n),
          L.google_tag_manager &&
            L.google_tag_manager._li &&
            ((e = L.google_tag_manager._li), (t[Pe] = e.cst), (t[De] = e.cbt)),
          !0)
        );
      },
      dr = function (t) {
        if (L.top != L) return !1;
        var e = L.external,
          n = e && e.onloadT;
        return (
          e && !e.isValidLoadTime && (n = void 0),
          2147483648 < n && (n = void 0),
          0 < n && e.setPageReadyTime(),
          null != n && ((t[Oe] = n), !0)
        );
      },
      pr = function (t, e) {
        var n = t[e];
        (isNaN(n) || 1 / 0 == n || 0 > n) && (t[e] = void 0);
      },
      vr = function (e) {
        return function (n) {
          if ("pageview" == n.get(te) && !e.I) {
            e.I = !0;
            var r = (function (e) {
                var n = Math.min(Ut(e, Mn), 100);
                return !(t(Mt(e, bn)) % 100 >= n);
              })(n),
              a = 0 < C(Mt(n, se), "gclid").length,
              i = 0 < C(Mt(n, se), "wbraid").length;
            (r || a || i) &&
              fr(function (t) {
                r && e.send("timing", t), (a || i) && e.send("adtiming", t);
              });
          }
        };
      },
      mr = !1,
      wr = function (t) {
        if ("cookie" == Mt(t, In)) {
          if (t.get(En) || Mt(t, kn) != Mt(t, bn)) {
            var e = 1e3 * Ut(t, An);
            _r(t, bn, On, e), t.data.set(kn, Mt(t, bn));
          }
          if (
            ((t.get(En) || br(t) != Mt(t, $n)) && _r(t, $n, qn, 864e5),
            t.get(zn))
          ) {
            if ((e = Mt(t, Fn))) {
              var n = Math.min(Ut(t, Vn), 1e3 * Ut(t, An));
              (n =
                0 === n
                  ? 0
                  : Math.min(n, 1e3 * Ut(t, Hn) + n - new Date().getTime())),
                t.data.set(Vn, n);
              var r = {},
                a = Mt(t, Hn),
                i = Mt(t, Bn),
                o = Er(Mt(t, Cn)),
                s = Cr(Mt(t, Sn)),
                c = Mt(t, Tn),
                u = Mt(t, Nn);
              i && "aw.ds" != i
                ? r && (r.ua = !0)
                : ((e = ["1", a, H(e)].join(".")),
                  0 <= n &&
                    (r && (r.ta = !0), F("_gac_" + H(c), e, o, s, c, n, u))),
                jr(r);
            }
          } else g(75);
          t.get(zn) &&
            (e = Mt(t, Qn)) &&
            ((n =
              0 === (n = Math.min(Ut(t, er), 1e3 * Ut(t, An)))
                ? 0
                : Math.min(n, 1e3 * Ut(t, tr) + n - new Date().getTime())),
            t.data.set(er, n),
            (r = {}),
            (u = Mt(t, tr)),
            (o = Er(Mt(t, Cn))),
            (s = Cr(Mt(t, Sn))),
            (c = Mt(t, Tn)),
            (t = Mt(t, Nn)),
            (e = ["1", u, H(e)].join(".")),
            0 <= n &&
              (r && (r.ta = !0), F("_gac_gb_" + H(c), e, o, s, c, n, t)),
            Rr(r));
        }
      },
      _r = function (t, e, n, r) {
        var a = xr(t, e);
        if (a) {
          n = Mt(t, n);
          var i = Er(Mt(t, Cn)),
            o = Cr(Mt(t, Sn)),
            s = Mt(t, Nn),
            c = Mt(t, Tn);
          if ("auto" != o) F(n, a, i, o, c, r, s) && (mr = !0);
          else {
            g(32);
            for (var u = Ar(), l = 0; l < u.length; l++)
              if (
                ((o = u[l]),
                t.data.set(Sn, o),
                (a = xr(t, e)),
                F(n, a, i, o, c, r, s))
              )
                return void (mr = !0);
            t.data.set(Sn, "auto");
          }
        }
      },
      br = function (t) {
        var e = G(Mt(t, qn));
        return Tr(t, e);
      },
      yr = function (t) {
        if ("cookie" == Mt(t, In) && !mr && (wr(t), !mr)) throw "abort";
      },
      kr = function (t) {
        if (t.get(Rn)) {
          var e = Mt(t, Sn),
            n = Mt(t, jn) || A(),
            r = Ir("__utma", n, e);
          r &&
            (g(19),
            t.set(ze, new Date().getTime(), !0),
            t.set(Ve, r.R),
            (e = Ir("__utmz", n, e)) && r.hash == e.hash && t.set(Be, e.R));
        }
      },
      xr = function (t, e) {
        e = H(Mt(t, e));
        var n = Cr(Mt(t, Sn)).split(".").length;
        return (
          1 < (t = Nr(Mt(t, Cn))) && (n += "-" + t),
          e ? ["GA1", n, e].join(".") : ""
        );
      },
      Tr = function (t, e) {
        return Or(e, Mt(t, Sn), Mt(t, Cn));
      },
      Or = function (t, e, n) {
        if (!t || 1 > t.length) g(12);
        else {
          for (var r = [], a = 0; a < t.length; a++) {
            var i = t[a],
              o = i.split("."),
              s = o.shift();
            ("GA1" == s || "1" == s) && 1 < o.length
              ? (1 == (i = o.shift().split("-")).length && (i[1] = "1"),
                (i[0] *= 1),
                (i[1] *= 1),
                (o = { H: i, s: o.join(".") }))
              : (o = c.test(i) ? { H: [0, 0], s: i } : void 0),
              o && r.push(o);
          }
          if (1 == r.length) return g(13), r[0].s;
          if (0 != r.length)
            return (
              g(14),
              1 == (r = Sr(r, Cr(e).split(".").length, 0)).length
                ? r[0].s
                : (1 < (r = Sr(r, Nr(n), 1)).length && g(41), r[0] && r[0].s)
            );
          g(12);
        }
      },
      Sr = function (t, e, n) {
        for (var r, a = [], i = [], o = 0; o < t.length; o++) {
          var s = t[o];
          s.H[n] == e
            ? a.push(s)
            : null == r || s.H[n] < r
            ? ((i = [s]), (r = s.H[n]))
            : s.H[n] == r && i.push(s);
        }
        return 0 < a.length ? a : i;
      },
      Cr = function (t) {
        return 0 == t.indexOf(".") ? t.substr(1) : t;
      },
      Ar = function () {
        var t = [],
          e = A().split(".");
        if (4 == e.length) {
          var n = e[e.length - 1];
          if (parseInt(n, 10) == n) return ["none"];
        }
        for (n = e.length - 2; 0 <= n; n--) t.push(e.slice(n).join("."));
        return (
          (e = P.location.hostname), B.test(e) || V.test(e) || t.push("none"), t
        );
      },
      Er = function (t) {
        return t
          ? (1 < t.length &&
              t.lastIndexOf("/") == t.length - 1 &&
              (t = t.substr(0, t.length - 1)),
            0 != t.indexOf("/") && (t = "/" + t),
            t)
          : "/";
      },
      Nr = function (t) {
        return "/" == (t = Er(t)) ? 1 : t.split("/").length;
      },
      jr = function (t) {
        t.ta && g(77), t.na && g(74), t.pa && g(73), t.ua && g(69);
      },
      Rr = function (t) {
        t.ta && g(85), t.na && g(86), t.pa && g(87);
      };
    function Ir(t, e, n) {
      "none" == e && (e = "");
      var r = [],
        a = G(t);
      t = "__utma" == t ? 6 : 2;
      for (var i = 0; i < a.length; i++) {
        var o = ("" + a[i]).split(".");
        o.length >= t && r.push({ hash: o[0], R: a[i], O: o });
      }
      if (0 != r.length)
        return 1 == r.length
          ? r[0]
          : Lr(e, r) || Lr(n, r) || Lr(null, r) || r[0];
    }
    function Lr(e, n) {
      if (null == e) var r = (e = 1);
      else (r = t(e)), (e = t(m(e, ".") ? e.substring(1) : "." + e));
      for (var a = 0; a < n.length; a++)
        if (n[a].hash == r || n[a].hash == e) return n[a];
    }
    var Pr = new RegExp(/^https?:\/\/([^\/:]+)/),
      Dr = L.google_tag_data.glBridge,
      Mr = RegExp("(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)"),
      Ur = RegExp("(.*)([?&#])(?:_gac=[^&#]*)(?:&?)(.*)");
    function $r(e, n) {
      var r = new Date(),
        a = L.navigator,
        i = a.plugins || [];
      for (
        e = [
          e,
          a.userAgent,
          r.getTimezoneOffset(),
          r.getYear(),
          r.getDate(),
          r.getHours(),
          r.getMinutes() + n,
        ],
          n = 0;
        n < i.length;
        ++n
      )
        e.push(i[n].description);
      return t(e.join("."));
    }
    function qr(e, n) {
      var r = new Date(),
        a = L.navigator,
        i = r.getHours() + Math.floor((r.getMinutes() + n) / 60);
      return t(
        [
          e,
          a.userAgent,
          a.language || "",
          r.getTimezoneOffset(),
          r.getYear(),
          r.getDate() + Math.floor(i / 24),
          (24 + i) % 24,
          (60 + r.getMinutes() + n) % 60,
        ].join(".")
      );
    }
    var Gr = function (t) {
      g(48), (this.target = t), (this.T = !1);
    };
    Gr.prototype.ca = function (t, e) {
      if (t) {
        if (this.target.get(Ye)) return Dr.decorate(zr(this.target), t, e);
        if (t.tagName) {
          if ("a" == t.tagName.toLowerCase())
            return void (t.href && (t.href = Fr(this, t.href, e)));
          if ("form" == t.tagName.toLowerCase()) return Hr(this, t);
        }
        if ("string" == typeof t) return Fr(this, t, e);
      }
    };
    var Fr = function (t, e, n) {
        var r = Mr.exec(e);
        r && 3 <= r.length && (e = r[1] + (r[3] ? r[2] + r[3] : "")),
          (r = Ur.exec(e)) &&
            3 <= r.length &&
            (e = r[1] + (r[3] ? r[2] + r[3] : "")),
          (t = t.target.get("linkerParam")),
          (r = e.indexOf("?"));
        var a = e.indexOf("#");
        return (e = (e = n
          ? e + (-1 == a ? "#" : "&") + t
          : -1 == a
          ? e + (-1 === r ? "?" : "&") + t
          : e.substring(0, a) +
            (-1 === r || r > a ? "?" : "&") +
            t +
            e.substring(a)).replace(/&+_ga=/, "&_ga=")).replace(
          RegExp("&+_gac="),
          "&_gac="
        );
      },
      Hr = function (t, e) {
        if (e && e.action)
          if ("get" == e.method.toLowerCase()) {
            t = t.target.get("linkerParam").split("&");
            for (var n = 0; n < t.length; n++) {
              var r = t[n].split("="),
                a = r[1];
              r = r[0];
              for (var i = e.childNodes || [], o = !1, s = 0; s < i.length; s++)
                if (i[s].name == r) {
                  i[s].setAttribute("value", a), (o = !0);
                  break;
                }
              o ||
                ((i = P.createElement("input")).setAttribute("type", "hidden"),
                i.setAttribute("name", r),
                i.setAttribute("value", a),
                e.appendChild(i));
            }
          } else
            "post" == e.method.toLowerCase() && (e.action = Fr(t, e.action));
      };
    function Vr(t, e) {
      if (e == P.location.hostname) return !1;
      for (var n = 0; n < t.length; n++)
        if (t[n] instanceof RegExp) {
          if (t[n].test(e)) return !0;
        } else if (0 <= e.indexOf(t[n])) return !0;
      return !1;
    }
    function Br(t, e) {
      return (
        e != $r(t, 0) &&
        e != $r(t, -1) &&
        e != $r(t, -2) &&
        e != qr(t, 0) &&
        e != qr(t, -1) &&
        e != qr(t, -2)
      );
    }
    function zr(t) {
      var e = Kr(t),
        n = {};
      return (
        (n._ga = t.get(bn)),
        (n._gid = t.get($n) || void 0),
        (n._gac = e ? [e.qa, e.timestamp].join(".") : void 0),
        (e = t.get(Xn)),
        (t = lr(t)),
        (n._fplc = e && "0" !== e ? e : t),
        n
      );
    }
    function Kr(t) {
      function e(t) {
        return null == t || "" === t ? 0 : Number(t);
      }
      var n = t.get(Fn);
      if (n && t.get(zn)) {
        var r = e(t.get(Hn));
        if (!(1e3 * r + e(t.get(Vn)) <= new Date().getTime()))
          return { timestamp: r, qa: n };
        g(76);
      }
    }
    (Gr.prototype.S = function (t, e, n) {
      function r(n) {
        try {
          n = n || L.event;
          t: {
            var r = n.target || n.srcElement;
            for (n = 100; r && 0 < n; ) {
              if (r.href && r.nodeName.match(/^a(?:rea)?$/i)) {
                var i = r;
                break t;
              }
              (r = r.parentNode), n--;
            }
            i = {};
          }
          ("http:" == i.protocol || "https:" == i.protocol) &&
            Vr(t, i.hostname || "") &&
            i.href &&
            (i.href = Fr(a, i.href, e));
        } catch (t) {
          g(26);
        }
      }
      var a = this;
      this.target.get(Ye)
        ? Dr.auto(
            function () {
              return zr(a.target);
            },
            t,
            e ? "fragment" : "",
            n
          )
        : (this.T ||
            ((this.T = !0), y(P, "mousedown", r, !1), y(P, "keyup", r, !1)),
          n &&
            y(P, "submit", function (e) {
              if ((e = (e = e || L.event).target || e.srcElement) && e.action) {
                var n = e.action.match(Pr);
                n && Vr(t, n[1]) && Hr(a, e);
              }
            }));
    }),
      (Gr.prototype.$ = function (t) {
        if (t) {
          var e = this,
            n = e.target.get(Wn);
          void 0 !== n &&
            Dr.passthrough(
              function () {
                if (n("analytics_storage")) return {};
                var t = {};
                return (t._ga = e.target.get(bn)), (t._up = "1"), t;
              },
              1,
              !0
            );
        }
      });
    var Xr = /^(GTM|OPT)-[A-Z0-9]+$/,
      Wr = /;_gaexp=[^;]*/g,
      Yr = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,
      Zr =
        /^https?:\/\/[\w\-.]+\.google.com(:\d+)?\/optimize\/opt-launch\.html\?.*$/,
      Jr = 0,
      Qr = {},
      ta = function (t, e, n, r) {
        n = n || {};
        var a = L.google_tag_data.tcBridge;
        if (Xr.test(e)) var i = 1;
        else {
          var o = e.split("-");
          1 < o.length && "GTM" !== o[0] && "UA" !== o[0] && (i = 2);
        }
        if (i) {
          o = { id: e, type: i, B: n.dataLayer || "dataLayer", G: !1 };
          var s = void 0;
          switch ((t.get("&gtm") == e && (o.G = !0), i)) {
            case 1:
              (o.ia = !!t.get("anonymizeIp")),
                (o.sync = r),
                "t0" != (e = String(t.get("name"))) && (o.target = e),
                q(String(t.get("trackingId"))) ||
                  ((o.clientId = String(t.get(bn))),
                  (o.ka = Number(t.get(yn))),
                  (e = n.palindrome ? Yr : Wr),
                  (e = (e = P.cookie.replace(/^|(; +)/g, ";").match(e))
                    ? e.sort().join("").substring(1)
                    : void 0),
                  (o.la = e),
                  (o.qa = C(Mt(t, se), "gclid")));
              break;
            case 2:
              if (20 <= Jr) return;
              Jr++,
                (o.context = "c"),
                ((s = {}).is_legacy_loaded = !0),
                (s = s),
                (o.sa = !0),
                a.registerUa(t.get("name"), t.get("trackingId")),
                a.setSideload(t.get("name"), e, t.get("trackingId"));
          }
          return (
            (function (t, e) {
              var n = new Date().getTime();
              (L[t.B] = L[t.B] || []),
                Qr[t.B] ||
                  ((Qr[t.B] = !0),
                  (n = { "gtm.start": n }),
                  t.sync || (n.event = "gtm.js"),
                  L[t.B].push(n)),
                2 === t.type &&
                  (function (e, n, r) {
                    L[t.B].push(arguments);
                  })("config", t.id, e);
            })(o, s),
            (function (t) {
              function e(t, e) {
                e && (n += "&" + t + "=" + b(e));
              }
              var n = ut(t.type) + b(t.id);
              return (
                "dataLayer" != t.B && e("l", t.B),
                e("cx", t.context),
                e("t", t.target),
                e("cid", t.clientId),
                e("cidt", t.ka),
                e("gac", t.la),
                e("aip", t.ia),
                t.sa && e("_slc", "1"),
                t.sync && e("m", "sync"),
                e("cycle", t.G),
                t.qa && e("gclid", t.qa),
                Zr.test(P.referrer) && e("cb", String(It())),
                n
              );
            })(o)
          );
        }
      },
      ea = function (t, e) {
        e ||
          (e =
            (e = Mt(t, _n)) && "t0" != e
              ? ca.test(e)
                ? "_gat_" + H(Mt(t, Tn))
                : "_gat_" + H(e)
              : "_gat"),
          (this.Y = e);
      },
      na = function (t, e, n) {
        !1 === e.get(sr) ||
          e.get(n) ||
          ("1" == G(t.Y)[0] ? e.set(n, "", !0) : e.set(n, "" + It(), !0));
      },
      ra = function (t, e) {
        aa(e) && F(t.Y, "1", Mt(e, Cn), Mt(e, Sn), Mt(e, Tn), 6e4, Mt(e, Nn));
      },
      aa = function (t) {
        return !!t.get(Qe) && !1 !== t.get(sr);
      },
      ia = function (t) {
        return !Ia[Mt(t, Tn)] && Ua(t);
      },
      oa = function (t, e) {
        var n = new I(),
          r = function (e) {
            zt(e).F && n.set(zt(e).F, t.get(e));
          };
        r(Zt),
          r(Jt),
          r(Tn),
          r(bn),
          r(Qe),
          1 == e && (r(xn), r(tn), r($n)),
          !1 === t.get(cr) && n.set("npa", "1"),
          n.set(zt(Ze).F, f(t));
        var a = "";
        return (
          n.map(function (t, e) {
            (a += b(t) + "="), (a += b("" + e) + "&");
          }),
          (a += "z=" + It()),
          1 == e
            ? (a = "t=dc&aip=1&_r=3&" + a)
            : 2 == e && (a = "t=sr&aip=1&_r=4&slf_rd=1&" + a),
          a
        );
      },
      sa = function (t) {
        if (ia(t)) {
          var e = Mt(t, Tn);
          return (
            (Ia[e] = !0),
            function (n) {
              if (n && !Ia[n]) {
                var r = ta(t, n);
                if (r) {
                  var a = 0 < r.indexOf("&_slc=1");
                  (Ia[n] = !0),
                    La[e] || (La[e] = []),
                    a && (La[e].push(n), Da(n, Pa[e])),
                    O(r);
                }
              }
            }
          );
        }
      },
      ca = /^gtm\d+$/,
      ua = function (t, n) {
        if (!(t = t.model).get("dcLoaded")) {
          var r,
            a = new e(h(t));
          a.set(29),
            t.set(Je, a.C),
            (n = n || {})[On] && (r = H(n[On])),
            (function (t, e) {
              var n = e.get(ln);
              e.set(ln, function (e) {
                na(t, e, Qe), na(t, e, tn);
                var r = n(e);
                return ra(t, e), r;
              });
              var r = e.get(gn);
              e.set(gn, function (t) {
                var e = r(t);
                if (aa(t)) {
                  g(80);
                  var n = { U: oa(t, 1), google: oa(t, 2), count: 0 };
                  ft("https://stats.g.doubleclick.net/j/collect", n.U, n),
                    t.set(Qe, "", !0);
                }
                return e;
              });
            })((n = new ea(t, r)), t),
            t.set("dcLoaded", !0);
        }
      },
      la = function (t) {
        var e = "cookie" == t.get(In);
        if (e) {
          e = new ea(t);
          var n = t.get("dcLoaded");
          n || (na(e, t, Qe), na(e, t, tn), ra(e, t)),
            (e = !n && aa(t)),
            (n = ia(t)),
            e && t.set(rr, 1, !0),
            n && t.set(ar, 1, !0),
            (e || n) &&
              (t.set(or, "d", !0),
              g(79),
              t.set(
                ir,
                { U: oa(t, 1), google: oa(t, 2), V: sa(t), count: 0 },
                !0
              ));
        }
      },
      ga = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
      fa = function (t) {
        function e(e, n) {
          r.model.data.set(e, n), t.hasOwnProperty(e) && Gt(e, n);
        }
        function n(t, e) {
          r.model.data.set(t, e), r.filters.add(t);
        }
        var r = this;
        (this.model = new Dt()),
          (this.filters = new yt()),
          e(_n, t[_n]),
          e(
            Tn,
            (function (t) {
              return t ? t.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : "";
            })(t[Tn])
          ),
          e(On, t[On]),
          e(Sn, t[Sn] || A()),
          e(Cn, t[Cn]),
          e(An, t[An]),
          e(En, t[En]),
          e(Nn, t[Nn]),
          e(jn, t[jn]),
          e(Rn, t[Rn]),
          e(Ln, t[Ln]),
          e(Pn, t[Pn]),
          e(Dn, t[Dn]),
          e(Mn, t[Mn]),
          e(Un, t[Un]),
          e(In, t[In]),
          e(xn, t[xn]),
          e(yn, t[yn]),
          e(Gn, t[Gn]),
          e(zn, t[zn]),
          e(Ye, t[Ye]),
          e(Kn, t[Kn]),
          e(Yn, t[Yn]),
          e(Wn, t[Wn]),
          e(Zt, 1),
          e(Jt, "j101"),
          n(wn, jt),
          n(en, xt),
          n(vn, _),
          n(nn, At),
          n(rn, Tt),
          n(an, Nt),
          n(on, yr),
          n(sn, kr),
          n(cn, kt),
          n(un, Pt),
          n(fn, Ct),
          n(hn, Et),
          n(pn, la),
          n(mn, gr),
          n(ln, Ot),
          n(gn, St),
          n(dn, vr(this)),
          (function (t) {
            var e = L.navigator,
              n = L.screen,
              r = P.location;
            if ((t.set(ce, N(!!t.get(Un), !!t.get(Gn))), r)) {
              var a = r.pathname || "";
              "/" != a.charAt(0) && (g(31), (a = "/" + a)),
                t.set(se, r.protocol + "//" + r.hostname + a + r.search);
            }
            n && t.set(de, n.width + "x" + n.height),
              n && t.set(he, n.colorDepth + "-bit"),
              (n = P.documentElement);
            var i,
              o = (a = P.body) && a.clientWidth && a.clientHeight,
              s = [];
            if (
              (n &&
              n.clientWidth &&
              n.clientHeight &&
              ("CSS1Compat" === P.compatMode || !o)
                ? (s = [n.clientWidth, n.clientHeight])
                : o && (s = [a.clientWidth, a.clientHeight]),
              (n = 0 >= s[0] || 0 >= s[1] ? "" : s.join("x")),
              t.set(pe, n),
              (n = t.set),
              (a = (a = L.navigator) ? a.plugins : null) && a.length)
            )
              for (o = 0; o < a.length && !i; o++)
                -1 < (s = a[o]).name.indexOf("Shockwave Flash") &&
                  (i = s.description);
            if (!i)
              try {
                var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                i = c.GetVariable("$version");
              } catch (t) {}
            if (!i)
              try {
                (c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")),
                  (i = "WIN 6,0,21,0"),
                  (c.AllowScriptAccess = "always"),
                  (i = c.GetVariable("$version"));
              } catch (t) {}
            if (!i)
              try {
                i = (c = new ActiveXObject(
                  "ShockwaveFlash.ShockwaveFlash"
                )).GetVariable("$version");
              } catch (t) {}
            if (
              (i &&
                (c = i.match(/[\d]+/g)) &&
                3 <= c.length &&
                (i = c[0] + "." + c[1] + " r" + c[2]),
              n.call(t, me, i || void 0),
              t.set(ge, P.characterSet || P.charset),
              t.set(
                ve,
                (e && "function" == typeof e.javaEnabled && e.javaEnabled()) ||
                  !1
              ),
              t.set(
                le,
                ((e && (e.language || e.browserLanguage)) || "").toLowerCase()
              ),
              t.data.set(Fn, S("gclid", !0)),
              t.data.set(Bn, S("gclsrc", !0)),
              t.data.set(Hn, Math.round(new Date().getTime() / 1e3)),
              t.get(Fn) ||
                (t.data.set(Qn, S("wbraid", !0)),
                t.data.set(tr, Math.round(new Date().getTime() / 1e3))),
              r && t.get(Pn) && (e = P.location.hash))
            ) {
              for (e = e.split(/[?&#]+/), r = [], i = 0; i < e.length; ++i)
                (m(e[i], "utm_id") ||
                  m(e[i], "utm_campaign") ||
                  m(e[i], "utm_source") ||
                  m(e[i], "utm_medium") ||
                  m(e[i], "utm_term") ||
                  m(e[i], "utm_content") ||
                  m(e[i], "gclid") ||
                  m(e[i], "dclid") ||
                  m(e[i], "gclsrc") ||
                  m(e[i], "wbraid")) &&
                  r.push(e[i]);
              0 < r.length &&
                ((e = "#" + r.join("&")), t.set(se, t.get(se) + e));
            }
          })(this.model),
          (function (t, e) {
            var n = Mt(t, On);
            if (
              (t.data.set(qn, "_ga" == n ? "_gid" : n + "_gid"),
              "cookie" == Mt(t, In))
            ) {
              if (((mr = !1), (n = G(Mt(t, On))), !(n = Tr(t, n)))) {
                n = Mt(t, Sn);
                var r = Mt(t, jn) || A();
                null != (n = Ir("__utma", r, n))
                  ? (g(10), (n = n.O[1] + "." + n.O[2]))
                  : (n = void 0);
              }
              if ((n && (mr = !0), (r = n && !t.get(En))))
                if (2 != (r = n.split(".")).length) r = !1;
                else if ((r = Number(r[1]))) {
                  var a = Ut(t, An);
                  r = r + a < new Date().getTime() / 1e3;
                } else r = !1;
              r && (n = void 0),
                n &&
                  (t.data.set(kn, n),
                  t.data.set(bn, n),
                  (n = br(t)) && t.data.set($n, n)),
                t.get(zn) &&
                  ((n = t.get(Fn)),
                  (r = t.get(Bn)),
                  !n || (r && "aw.ds" != r)) &&
                  ((n = {}),
                  (r = (P ? z(n) : {})[Mt(t, Tn)]),
                  jr(n),
                  r &&
                    0 != r.length &&
                    ((n = r[0]),
                    t.data.set(Hn, n.timestamp / 1e3),
                    t.data.set(Fn, n.qa))),
                t.get(zn) &&
                  ((n = t.get(Qn)),
                  (r = {}),
                  (a = (P ? z(r, "_gac_gb", !0) : {})[Mt(t, Tn)]),
                  Rr(r),
                  a &&
                    0 != a.length &&
                    ((a = (r = a[0]).qa),
                    (n && n !== a) ||
                      (r.labels &&
                        r.labels.length &&
                        (a += "." + r.labels.join(".")),
                      t.data.set(tr, r.timestamp / 1e3),
                      t.data.set(Qn, a))));
            }
            if (t.get(En)) {
              n = S("_ga", !!t.get(Pn));
              var i = S("_gl", !!t.get(Pn));
              if (
                ((a = (r = Dr.get(t.get(Pn)))._ga),
                i && 0 < i.indexOf("_ga*") && !a && g(30),
                e || !t.get(Yn))
              )
                i = !1;
              else if (void 0 === (i = t.get(Wn)) || i("analytics_storage"))
                i = !1;
              else {
                if ((g(84), t.data.set(Zn, 1), (i = r._up)))
                  if ((i = Pr.exec(P.referrer))) {
                    i = i[1];
                    var o = P.location.hostname;
                    i =
                      o === i ||
                      0 <= o.indexOf("." + i) ||
                      0 <= i.indexOf("." + o);
                  } else i = !1;
                i = !!i;
              }
              o = r.gclid;
              var c = r._gac;
              if (n || a || o || c)
                if ((n && a && g(36), t.get(Ln) || st(t.get(Gn)) || i)) {
                  if (
                    (a &&
                      (g(38),
                      t.data.set(bn, a),
                      r._gid && (g(51), t.data.set($n, r._gid))),
                    o
                      ? (g(82),
                        t.data.set(Fn, o),
                        r.gclsrc && t.data.set(Bn, r.gclsrc))
                      : c &&
                        (a = c.split(".")) &&
                        2 === a.length &&
                        (g(37), t.data.set(Fn, a[0]), t.data.set(Hn, a[1])),
                    (r = r._fplc) && Mt(t, Kn) && (g(83), t.data.set(Xn, r)),
                    n)
                  )
                    t: if (((r = n.indexOf(".")), -1 == r)) g(22);
                    else {
                      if (
                        ((a = n.substring(0, r)),
                        (r = (i = n.substring(r + 1)).indexOf(".")),
                        (n = i.substring(0, r)),
                        (i = i.substring(r + 1)),
                        "1" == a)
                      ) {
                        if (Br((r = i), n)) {
                          g(23);
                          break t;
                        }
                      } else {
                        if ("2" != a) {
                          g(22);
                          break t;
                        }
                        if (
                          ((a = ""),
                          0 < (r = i.indexOf("-"))
                            ? ((a = i.substring(0, r)),
                              (r = i.substring(r + 1)))
                            : (r = i.substring(1)),
                          Br(a + r, n))
                        ) {
                          g(53);
                          break t;
                        }
                        a && (g(2), t.data.set($n, a));
                      }
                      g(11),
                        t.data.set(bn, r),
                        (n = S("_gac", !!t.get(Pn))) &&
                          ("1" != (n = n.split("."))[0] || 4 != n.length
                            ? g(72)
                            : Br(n[3], n[1])
                            ? g(71)
                            : (t.data.set(Fn, n[3]),
                              t.data.set(Hn, n[2]),
                              g(70)));
                    }
                } else g(21);
            }
            e && (g(9), t.data.set(bn, b(e))),
              t.get(bn) ||
                ((e =
                  (e = L.gaGlobal) && e.from_cookie && "cookie" !== Mt(t, In)
                    ? void 0
                    : (e = e && e.vid) && -1 !== e.search(s)
                    ? e
                    : void 0)
                  ? (g(17), t.data.set(bn, e))
                  : (g(8), t.data.set(bn, w()))),
              t.get($n) || (g(3), t.data.set($n, w())),
              wr(t),
              (e = L.gaGlobal = L.gaGlobal || {}),
              (n = Mt(t, bn)),
              (t = n === Mt(t, kn)),
              (null == e.vid || (t && !e.from_cookie)) &&
                ((e.vid = n), (e.from_cookie = t));
          })(this.model, t[bn]),
          this.model.set(
            Qt,
            (function () {
              var t = (L.gaGlobal = L.gaGlobal || {});
              return (t.hid = t.hid || It());
            })()
          );
      };
    (fa.prototype.get = function (t) {
      return this.model.get(t);
    }),
      (fa.prototype.set = function (t, e) {
        this.model.set(t, e), Ft(t, e);
      }),
      (fa.prototype.send = function (t) {
        if (!(1 > arguments.length)) {
          if ("string" == typeof arguments[0])
            var e = arguments[0],
              n = [].slice.call(arguments, 1);
          else (e = arguments[0] && arguments[0][te]), (n = arguments);
          e &&
            (((n = j(ma[e] || [], n))[te] = e),
            Ft(n),
            this.model.set(n, void 0, !0),
            this.filters.D(this.model),
            (this.model.data.m = {}));
        }
      }),
      (fa.prototype.ma = function (t, e) {
        var n = this;
        xa(t, n, e) ||
          (Oa(t, function () {
            xa(t, n, e);
          }),
          Ta(String(n.get(_n)), t, void 0, e, !0));
      });
    var ha,
      da,
      pa,
      va,
      ma = {
        pageview: [ue],
        event: [we, _e, be, ye],
        social: [ke, xe, Te],
        timing: [Me, Ue, qe, $e],
      },
      wa = function (t) {
        return "prerender" != P.visibilityState && (t(), !0);
      },
      _a = function (t) {
        if (!wa(t)) {
          g(16);
          var e = !1,
            n = function () {
              if (!e && wa(t)) {
                e = !0;
                var r = P;
                r.removeEventListener
                  ? r.removeEventListener("visibilitychange", n, !1)
                  : r.detachEvent && r.detachEvent("onvisibilitychange", n);
              }
            };
          y(P, "visibilitychange", n);
        }
      },
      ba = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
      ya = function (t) {
        if (d(t[0])) this.u = t[0];
        else {
          var e = ba.exec(t[0]);
          if (
            (null != e &&
              4 == e.length &&
              ((this.da = e[1] || "t0"),
              (this.K = e[2] || ""),
              (this.methodName = e[3]),
              (this.aa = [].slice.call(t, 1)),
              this.K ||
                ((this.A = "create" == this.methodName),
                (this.i = "require" == this.methodName),
                (this.g = "provide" == this.methodName),
                (this.ba = "remove" == this.methodName)),
              this.i &&
                (3 <= this.aa.length
                  ? ((this.X = this.aa[1]), (this.W = this.aa[2]))
                  : this.aa[1] &&
                    (v(this.aa[1])
                      ? (this.X = this.aa[1])
                      : (this.W = this.aa[1])))),
            (e = t[1]),
            (t = t[2]),
            !this.methodName)
          )
            throw "abort";
          if (this.i && (!v(e) || "" == e)) throw "abort";
          if (this.g && (!v(e) || "" == e || !d(t))) throw "abort";
          if (ka(this.da) || ka(this.K)) throw "abort";
          if (this.g && "t0" != this.da) throw "abort";
        }
      };
    function ka(t) {
      return 0 <= t.indexOf(".") || 0 <= t.indexOf(":");
    }
    (ha = new I()),
      (pa = new I()),
      (va = new I()),
      (da = { ec: 45, ecommerce: 46, linkid: 47 });
    var xa = function (t, e, n) {
        e == $a || e.get(_n);
        var r = ha.get(t);
        return (
          !!d(r) &&
          ((e.plugins_ = e.plugins_ || new I()),
          e.plugins_.get(t) || e.plugins_.set(t, new r(e, n || {})),
          !0)
        );
      },
      Ta = function (t, e, n, r, a) {
        if (!d(ha.get(e)) && !pa.get(e)) {
          da.hasOwnProperty(e) && g(da[e]);
          var i,
            o = void 0;
          if (Xr.test(e)) {
            if ((g(52), !(t = $a.j(t)))) return !0;
            (n = ta(t.model, e, r, a)),
              (o = function () {
                Ra.D(["provide", e, function () {}]);
                var t = L[(r && r.dataLayer) || "dataLayer"];
                t &&
                  t.hide &&
                  d(t.hide.end) &&
                  t.hide[e] &&
                  (t.hide.end(), (t.hide.end = void 0));
              });
          }
          if (
            (!n && da.hasOwnProperty(e) ? (g(39), (n = e + ".js")) : g(43), n)
          )
            r && (i = r[Kn]),
              v(i) || (i = void 0),
              (t = Na(ja(n, i))),
              !i || (Aa(t.protocol) && Ca(t)) || (t = Na(ja(n))),
              Aa(t.protocol) &&
                Ca(t) &&
                (O(t.url, void 0, a, void 0, o), pa.set(e, !0));
        }
      },
      Oa = function (t, e) {
        var n = va.get(t) || [];
        n.push(e), va.set(t, n);
      },
      Sa = function (t, e) {
        ha.set(t, e), (e = va.get(t) || []);
        for (var n = 0; n < e.length; n++) e[n]();
        va.set(t, []);
      },
      Ca = function (t) {
        var e = Na(P.location.href);
        return (
          !(!m(t.url, ut(1)) && !m(t.url, ut(2))) ||
          (!(
            t.query ||
            0 <= t.url.indexOf("?") ||
            0 <= t.path.indexOf("://")
          ) &&
            (!!(
              (t.host == e.host && t.port == e.port) ||
              (D &&
                (((e = P.createElement("a")).href = D),
                (e = Ea(e)),
                t.host === e[0] && t.port === e[1]))
            ) ||
              ((e = "http:" == t.protocol ? 80 : 443),
              !(
                "www.google-analytics.com" != t.host ||
                (t.port || e) != e ||
                !m(t.path, "/plugins/")
              ))))
        );
      },
      Aa = function (t) {
        var e = P.location.protocol;
        return "https:" == t || t == e || ("http:" == t && "http:" == e);
      },
      Ea = function (t) {
        var e = t.hostname || "",
          n = 0 <= e.indexOf("]");
        return (
          (e = e.split(n ? "]" : ":")[0].toLowerCase()),
          n && (e += "]"),
          (n = (t.protocol || "").toLowerCase()),
          (n = 1 * t.port || ("http:" == n ? 80 : "https:" == n ? 443 : "")),
          (t = t.pathname || ""),
          m(t, "/") || (t = "/" + t),
          [e, "" + n, t]
        );
      },
      Na = function (t) {
        var e = P.createElement("a");
        e.href = P.location.href;
        var n = (e.protocol || "").toLowerCase(),
          r = Ea(e),
          a = e.search || "",
          i = n + "//" + r[0] + (r[1] ? ":" + r[1] : "");
        return (
          m(t, "//")
            ? (t = n + t)
            : m(t, "/")
            ? (t = i + t)
            : !t || m(t, "?")
            ? (t = i + r[2] + (t || a))
            : 0 > t.split("/")[0].indexOf(":") &&
              (t = i + r[2].substring(0, r[2].lastIndexOf("/")) + "/" + t),
          (e.href = t),
          (n = Ea(e)),
          {
            protocol: (e.protocol || "").toLowerCase(),
            host: n[0],
            port: n[1],
            path: n[2],
            query: e.search || "",
            url: t || "",
          }
        );
      },
      ja = function (t, e) {
        return t && 0 <= t.indexOf("/")
          ? t
          : (e || ct(!1)) + "/plugins/ua/" + t;
      },
      Ra = {
        ga: function () {
          Ra.fa = [];
        },
      };
    Ra.ga(),
      (Ra.D = function (t) {
        var e = Ra.J.apply(Ra, arguments);
        for (
          e = Ra.fa.concat(e), Ra.fa = [];
          0 < e.length && !Ra.v(e[0]) && (e.shift(), !(0 < Ra.fa.length));

        );
        Ra.fa = Ra.fa.concat(e);
      }),
      (Ra.ra = function (t) {
        $a.q && (300 === $a.q.length && ($a.q.shift(), $a.qd++), $a.q.push(t));
      }),
      (Ra.J = function (t) {
        for (var e = [], n = 0; n < arguments.length; n++) {
          var r = void 0;
          try {
            (r = new ya(arguments[n])).g
              ? Sa(r.aa[0], r.aa[1])
              : (r.i && (r.ha = Ta(r.da, r.aa[0], r.X, r.W)), e.push(r)),
              Ra.ra(arguments[n]);
          } catch (t) {}
        }
        return e;
      }),
      (Ra.v = function (t) {
        try {
          if (t.u) t.u.call(L, $a.j("t0"));
          else {
            var e = t.da == o ? $a : $a.j(t.da);
            if (t.A) {
              if ("t0" == t.da && null === (e = $a.create.apply($a, t.aa)))
                return !0;
            } else if (t.ba) $a.remove(t.da);
            else if (e)
              if (t.i) {
                if (
                  (t.ha && (t.ha = Ta(t.da, t.aa[0], t.X, t.W)),
                  !xa(t.aa[0], e, t.W))
                )
                  return !0;
              } else if (t.K) {
                var n = t.methodName,
                  r = t.aa,
                  a = e.plugins_.get(t.K);
                a[n].apply(a, r);
              } else e[t.methodName].apply(e, t.aa);
          }
        } catch (t) {}
      });
    var Ia = {},
      La = {},
      Pa = {};
    function Da(t, e) {
      var n = L.google_tag_data;
      n || (n = L.google_tag_data = {});
      var r = n.slq;
      return (
        r || (r = n.slq = {}),
        (n = r[t]) || ((n = {}), (n = r[t] = ((n.q = e ? e.slice() : []), n))),
        n
      );
    }
    function Ma(t) {
      return {
        allowAdFeatures: t.get(sr),
        allowAdPersonalizationSignals: t.get(cr),
        cookieDomain: Mt(t, Sn),
        cookieExpires: t.get(An),
        cookieFlags: Mt(t, Nn),
        cookieName: Mt(t, On),
        cookiePath: Mt(t, Cn),
        cookieUpdate: t.get(En),
        hitPayload: Mt(t, ne),
      };
    }
    function Ua(t) {
      return (
        void 0 === t.get(oe) &&
        void 0 === t.get(ae) &&
        void 0 === t.get(nr) &&
        void 0 === t.get(Kn)
      );
    }
    var $a = function (t) {
      g(1), Ra.D.apply(Ra, [arguments]);
    };
    ($a.h = {}), ($a.P = []), ($a.L = 0), ($a.ya = 0), ($a.answer = 42);
    var qa = [Tn, Sn, _n];
    ($a.create = function (t) {
      var e = j(qa, [].slice.call(arguments));
      e[_n] || (e[_n] = "t0");
      var n = "" + e[_n];
      if ($a.h[n]) return $a.h[n];
      if (tt(e)) return null;
      if (
        ((e = new fa(e)),
        ($a.h[n] = e),
        $a.P.push(e),
        (n = _t().tracker_created),
        d(n))
      )
        try {
          n(e);
        } catch (t) {}
      return e;
    }),
      ($a.remove = function (t) {
        for (var e = 0; e < $a.P.length; e++)
          if ($a.P[e].get(_n) == t) {
            $a.P.splice(e, 1), ($a.h[t] = null);
            break;
          }
      }),
      ($a.j = function (t) {
        return $a.h[t];
      }),
      ($a.getAll = function () {
        return $a.P.slice(0);
      }),
      ($a.N = function () {
        "ga" != o && g(49);
        var t = L[o];
        if (!t || 42 != t.answer) {
          ($a.L = t && t.l), ($a.ya = 1 * new Date()), ($a.loaded = !0);
          var e = t && t.q,
            n = p(e);
          if (
            ((t = []),
            n ? (t = e.slice(0)) : g(50),
            ($a.q = n ? e : []),
            $a.q.splice(0),
            ($a.qd = 0),
            ur("create", (e = L[o] = $a), e.create),
            ur("remove", e, e.remove),
            ur("getByName", e, e.j, 5),
            ur("getAll", e, e.getAll, 6),
            ur("get", (e = fa.prototype), e.get, 7),
            ur("set", e, e.set, 4),
            ur("send", e, e.send),
            ur("requireSync", e, e.ma),
            ur("get", (e = Dt.prototype), e.get),
            ur("set", e, e.set),
            "https:" != P.location.protocol && !u)
          ) {
            t: {
              for (
                e = P.getElementsByTagName("script"), n = 0;
                n < e.length && 100 > n;
                n++
              ) {
                var r = e[n].src;
                if (r && 0 == r.indexOf(ct(!0) + "/analytics")) {
                  e = !0;
                  break t;
                }
              }
              e = !1;
            }
            e && (u = !0);
          }
          ((L.gaplugins = L.gaplugins || {}).Linker = Gr),
            (e = Gr.prototype),
            Sa("linker", Gr),
            ur("decorate", e, e.ca, 20),
            ur("autoLink", e, e.S, 25),
            ur("passthrough", e, e.$, 25),
            Sa("displayfeatures", ua),
            Sa("adfeatures", ua),
            Ra.D.apply($a, t);
        }
      });
    var Ga = $a.N,
      Fa = L[o];
    Fa && Fa.r ? Ga() : _a(Ga),
      _a(function () {
        Ra.D(["provide", "render", _]);
      });
  })(window);
