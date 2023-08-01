'use strict'
;(self.webpackChunkstandalone_elements =
  self.webpackChunkstandalone_elements || []).push([
  [429],
  {
    435: (ie, Ee, de) => {
      de(583)
    },
    583: () => {
      !(function (e) {
        const n = e.performance
        function i(M) {
          n && n.mark && n.mark(M)
        }
        function o(M, E) {
          n && n.measure && n.measure(M, E)
        }
        i('Zone')
        const c = e.__Zone_symbol_prefix || '__zone_symbol__'
        function a(M) {
          return c + M
        }
        const y = !0 === e[a('forceDuplicateZoneCheck')]
        if (e.Zone) {
          if (y || 'function' != typeof e.Zone.__symbol__)
            throw new Error('Zone already loaded.')
          return e.Zone
        }
        let d = (() => {
          class M {
            constructor(t, r) {
              ;(this._parent = t),
                (this._name = r ? r.name || 'unnamed' : '<root>'),
                (this._properties = (r && r.properties) || {}),
                (this._zoneDelegate = new v(
                  this,
                  this._parent && this._parent._zoneDelegate,
                  r
                ))
            }
            static assertZonePatched() {
              if (e.Promise !== oe.ZoneAwarePromise)
                throw new Error(
                  'Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)'
                )
            }
            static get root() {
              let t = M.current
              for (; t.parent; ) t = t.parent
              return t
            }
            static get current() {
              return U.zone
            }
            static get currentTask() {
              return re
            }
            static __load_patch(t, r, k = !1) {
              if (oe.hasOwnProperty(t)) {
                if (!k && y) throw Error('Already loaded patch: ' + t)
              } else if (!e['__Zone_disable_' + t]) {
                const C = 'Zone:' + t
                i(C), (oe[t] = r(e, M, z)), o(C, C)
              }
            }
            get parent() {
              return this._parent
            }
            get name() {
              return this._name
            }
            get(t) {
              const r = this.getZoneWith(t)
              if (r) return r._properties[t]
            }
            getZoneWith(t) {
              let r = this
              for (; r; ) {
                if (r._properties.hasOwnProperty(t)) return r
                r = r._parent
              }
              return null
            }
            fork(t) {
              if (!t) throw new Error('ZoneSpec required!')
              return this._zoneDelegate.fork(this, t)
            }
            wrap(t, r) {
              if ('function' != typeof t)
                throw new Error('Expecting function got: ' + t)
              const k = this._zoneDelegate.intercept(this, t, r),
                C = this
              return function () {
                return C.runGuarded(k, this, arguments, r)
              }
            }
            run(t, r, k, C) {
              U = { parent: U, zone: this }
              try {
                return this._zoneDelegate.invoke(this, t, r, k, C)
              } finally {
                U = U.parent
              }
            }
            runGuarded(t, r = null, k, C) {
              U = { parent: U, zone: this }
              try {
                try {
                  return this._zoneDelegate.invoke(this, t, r, k, C)
                } catch ($) {
                  if (this._zoneDelegate.handleError(this, $)) throw $
                }
              } finally {
                U = U.parent
              }
            }
            runTask(t, r, k) {
              if (t.zone != this)
                throw new Error(
                  'A task can only be run in the zone of creation! (Creation: ' +
                    (t.zone || K).name +
                    '; Execution: ' +
                    this.name +
                    ')'
                )
              if (t.state === x && (t.type === Q || t.type === w)) return
              const C = t.state != p
              C && t._transitionTo(p, j), t.runCount++
              const $ = re
              ;(re = t), (U = { parent: U, zone: this })
              try {
                t.type == w &&
                  t.data &&
                  !t.data.isPeriodic &&
                  (t.cancelFn = void 0)
                try {
                  return this._zoneDelegate.invokeTask(this, t, r, k)
                } catch (l) {
                  if (this._zoneDelegate.handleError(this, l)) throw l
                }
              } finally {
                t.state !== x &&
                  t.state !== h &&
                  (t.type == Q || (t.data && t.data.isPeriodic)
                    ? C && t._transitionTo(j, p)
                    : ((t.runCount = 0),
                      this._updateTaskCount(t, -1),
                      C && t._transitionTo(x, p, x))),
                  (U = U.parent),
                  (re = $)
              }
            }
            scheduleTask(t) {
              if (t.zone && t.zone !== this) {
                let k = this
                for (; k; ) {
                  if (k === t.zone)
                    throw Error(
                      `can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`
                    )
                  k = k.parent
                }
              }
              t._transitionTo(X, x)
              const r = []
              ;(t._zoneDelegates = r), (t._zone = this)
              try {
                t = this._zoneDelegate.scheduleTask(this, t)
              } catch (k) {
                throw (
                  (t._transitionTo(h, X, x),
                  this._zoneDelegate.handleError(this, k),
                  k)
                )
              }
              return (
                t._zoneDelegates === r && this._updateTaskCount(t, 1),
                t.state == X && t._transitionTo(j, X),
                t
              )
            }
            scheduleMicroTask(t, r, k, C) {
              return this.scheduleTask(new m(I, t, r, k, C, void 0))
            }
            scheduleMacroTask(t, r, k, C, $) {
              return this.scheduleTask(new m(w, t, r, k, C, $))
            }
            scheduleEventTask(t, r, k, C, $) {
              return this.scheduleTask(new m(Q, t, r, k, C, $))
            }
            cancelTask(t) {
              if (t.zone != this)
                throw new Error(
                  'A task can only be cancelled in the zone of creation! (Creation: ' +
                    (t.zone || K).name +
                    '; Execution: ' +
                    this.name +
                    ')'
                )
              t._transitionTo(G, j, p)
              try {
                this._zoneDelegate.cancelTask(this, t)
              } catch (r) {
                throw (
                  (t._transitionTo(h, G),
                  this._zoneDelegate.handleError(this, r),
                  r)
                )
              }
              return (
                this._updateTaskCount(t, -1),
                t._transitionTo(x, G),
                (t.runCount = 0),
                t
              )
            }
            _updateTaskCount(t, r) {
              const k = t._zoneDelegates
              ;-1 == r && (t._zoneDelegates = null)
              for (let C = 0; C < k.length; C++)
                k[C]._updateTaskCount(t.type, r)
            }
          }
          return (M.__symbol__ = a), M
        })()
        const P = {
          name: '',
          onHasTask: (M, E, t, r) => M.hasTask(t, r),
          onScheduleTask: (M, E, t, r) => M.scheduleTask(t, r),
          onInvokeTask: (M, E, t, r, k, C) => M.invokeTask(t, r, k, C),
          onCancelTask: (M, E, t, r) => M.cancelTask(t, r),
        }
        class v {
          constructor(E, t, r) {
            ;(this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
              (this.zone = E),
              (this._parentDelegate = t),
              (this._forkZS = r && (r && r.onFork ? r : t._forkZS)),
              (this._forkDlgt = r && (r.onFork ? t : t._forkDlgt)),
              (this._forkCurrZone =
                r && (r.onFork ? this.zone : t._forkCurrZone)),
              (this._interceptZS = r && (r.onIntercept ? r : t._interceptZS)),
              (this._interceptDlgt =
                r && (r.onIntercept ? t : t._interceptDlgt)),
              (this._interceptCurrZone =
                r && (r.onIntercept ? this.zone : t._interceptCurrZone)),
              (this._invokeZS = r && (r.onInvoke ? r : t._invokeZS)),
              (this._invokeDlgt = r && (r.onInvoke ? t : t._invokeDlgt)),
              (this._invokeCurrZone =
                r && (r.onInvoke ? this.zone : t._invokeCurrZone)),
              (this._handleErrorZS =
                r && (r.onHandleError ? r : t._handleErrorZS)),
              (this._handleErrorDlgt =
                r && (r.onHandleError ? t : t._handleErrorDlgt)),
              (this._handleErrorCurrZone =
                r && (r.onHandleError ? this.zone : t._handleErrorCurrZone)),
              (this._scheduleTaskZS =
                r && (r.onScheduleTask ? r : t._scheduleTaskZS)),
              (this._scheduleTaskDlgt =
                r && (r.onScheduleTask ? t : t._scheduleTaskDlgt)),
              (this._scheduleTaskCurrZone =
                r && (r.onScheduleTask ? this.zone : t._scheduleTaskCurrZone)),
              (this._invokeTaskZS =
                r && (r.onInvokeTask ? r : t._invokeTaskZS)),
              (this._invokeTaskDlgt =
                r && (r.onInvokeTask ? t : t._invokeTaskDlgt)),
              (this._invokeTaskCurrZone =
                r && (r.onInvokeTask ? this.zone : t._invokeTaskCurrZone)),
              (this._cancelTaskZS =
                r && (r.onCancelTask ? r : t._cancelTaskZS)),
              (this._cancelTaskDlgt =
                r && (r.onCancelTask ? t : t._cancelTaskDlgt)),
              (this._cancelTaskCurrZone =
                r && (r.onCancelTask ? this.zone : t._cancelTaskCurrZone)),
              (this._hasTaskZS = null),
              (this._hasTaskDlgt = null),
              (this._hasTaskDlgtOwner = null),
              (this._hasTaskCurrZone = null)
            const k = r && r.onHasTask
            ;(k || (t && t._hasTaskZS)) &&
              ((this._hasTaskZS = k ? r : P),
              (this._hasTaskDlgt = t),
              (this._hasTaskDlgtOwner = this),
              (this._hasTaskCurrZone = E),
              r.onScheduleTask ||
                ((this._scheduleTaskZS = P),
                (this._scheduleTaskDlgt = t),
                (this._scheduleTaskCurrZone = this.zone)),
              r.onInvokeTask ||
                ((this._invokeTaskZS = P),
                (this._invokeTaskDlgt = t),
                (this._invokeTaskCurrZone = this.zone)),
              r.onCancelTask ||
                ((this._cancelTaskZS = P),
                (this._cancelTaskDlgt = t),
                (this._cancelTaskCurrZone = this.zone)))
          }
          fork(E, t) {
            return this._forkZS
              ? this._forkZS.onFork(this._forkDlgt, this.zone, E, t)
              : new d(E, t)
          }
          intercept(E, t, r) {
            return this._interceptZS
              ? this._interceptZS.onIntercept(
                  this._interceptDlgt,
                  this._interceptCurrZone,
                  E,
                  t,
                  r
                )
              : t
          }
          invoke(E, t, r, k, C) {
            return this._invokeZS
              ? this._invokeZS.onInvoke(
                  this._invokeDlgt,
                  this._invokeCurrZone,
                  E,
                  t,
                  r,
                  k,
                  C
                )
              : t.apply(r, k)
          }
          handleError(E, t) {
            return (
              !this._handleErrorZS ||
              this._handleErrorZS.onHandleError(
                this._handleErrorDlgt,
                this._handleErrorCurrZone,
                E,
                t
              )
            )
          }
          scheduleTask(E, t) {
            let r = t
            if (this._scheduleTaskZS)
              this._hasTaskZS && r._zoneDelegates.push(this._hasTaskDlgtOwner),
                (r = this._scheduleTaskZS.onScheduleTask(
                  this._scheduleTaskDlgt,
                  this._scheduleTaskCurrZone,
                  E,
                  t
                )),
                r || (r = t)
            else if (t.scheduleFn) t.scheduleFn(t)
            else {
              if (t.type != I) throw new Error('Task is missing scheduleFn.')
              R(t)
            }
            return r
          }
          invokeTask(E, t, r, k) {
            return this._invokeTaskZS
              ? this._invokeTaskZS.onInvokeTask(
                  this._invokeTaskDlgt,
                  this._invokeTaskCurrZone,
                  E,
                  t,
                  r,
                  k
                )
              : t.callback.apply(r, k)
          }
          cancelTask(E, t) {
            let r
            if (this._cancelTaskZS)
              r = this._cancelTaskZS.onCancelTask(
                this._cancelTaskDlgt,
                this._cancelTaskCurrZone,
                E,
                t
              )
            else {
              if (!t.cancelFn) throw Error('Task is not cancelable')
              r = t.cancelFn(t)
            }
            return r
          }
          hasTask(E, t) {
            try {
              this._hasTaskZS &&
                this._hasTaskZS.onHasTask(
                  this._hasTaskDlgt,
                  this._hasTaskCurrZone,
                  E,
                  t
                )
            } catch (r) {
              this.handleError(E, r)
            }
          }
          _updateTaskCount(E, t) {
            const r = this._taskCounts,
              k = r[E],
              C = (r[E] = k + t)
            if (C < 0)
              throw new Error('More tasks executed then were scheduled.')
            ;(0 != k && 0 != C) ||
              this.hasTask(this.zone, {
                microTask: r.microTask > 0,
                macroTask: r.macroTask > 0,
                eventTask: r.eventTask > 0,
                change: E,
              })
          }
        }
        class m {
          constructor(E, t, r, k, C, $) {
            if (
              ((this._zone = null),
              (this.runCount = 0),
              (this._zoneDelegates = null),
              (this._state = 'notScheduled'),
              (this.type = E),
              (this.source = t),
              (this.data = k),
              (this.scheduleFn = C),
              (this.cancelFn = $),
              !r)
            )
              throw new Error('callback is not defined')
            this.callback = r
            const l = this
            this.invoke =
              E === Q && k && k.useG
                ? m.invokeTask
                : function () {
                    return m.invokeTask.call(e, l, this, arguments)
                  }
          }
          static invokeTask(E, t, r) {
            E || (E = this), ee++
            try {
              return E.runCount++, E.zone.runTask(E, t, r)
            } finally {
              1 == ee && _(), ee--
            }
          }
          get zone() {
            return this._zone
          }
          get state() {
            return this._state
          }
          cancelScheduleRequest() {
            this._transitionTo(x, X)
          }
          _transitionTo(E, t, r) {
            if (this._state !== t && this._state !== r)
              throw new Error(
                `${this.type} '${
                  this.source
                }': can not transition to '${E}', expecting state '${t}'${
                  r ? " or '" + r + "'" : ''
                }, was '${this._state}'.`
              )
            ;(this._state = E), E == x && (this._zoneDelegates = null)
          }
          toString() {
            return this.data && typeof this.data.handleId < 'u'
              ? this.data.handleId.toString()
              : Object.prototype.toString.call(this)
          }
          toJSON() {
            return {
              type: this.type,
              state: this.state,
              source: this.source,
              zone: this.zone.name,
              runCount: this.runCount,
            }
          }
        }
        const L = a('setTimeout'),
          Z = a('Promise'),
          N = a('then')
        let J,
          B = [],
          H = !1
        function q(M) {
          if ((J || (e[Z] && (J = e[Z].resolve(0))), J)) {
            let E = J[N]
            E || (E = J.then), E.call(J, M)
          } else e[L](M, 0)
        }
        function R(M) {
          0 === ee && 0 === B.length && q(_), M && B.push(M)
        }
        function _() {
          if (!H) {
            for (H = !0; B.length; ) {
              const M = B
              B = []
              for (let E = 0; E < M.length; E++) {
                const t = M[E]
                try {
                  t.zone.runTask(t, null, null)
                } catch (r) {
                  z.onUnhandledError(r)
                }
              }
            }
            z.microtaskDrainDone(), (H = !1)
          }
        }
        const K = { name: 'NO ZONE' },
          x = 'notScheduled',
          X = 'scheduling',
          j = 'scheduled',
          p = 'running',
          G = 'canceling',
          h = 'unknown',
          I = 'microTask',
          w = 'macroTask',
          Q = 'eventTask',
          oe = {},
          z = {
            symbol: a,
            currentZoneFrame: () => U,
            onUnhandledError: W,
            microtaskDrainDone: W,
            scheduleMicroTask: R,
            showUncaughtError: () => !d[a('ignoreConsoleErrorUncaughtError')],
            patchEventTarget: () => [],
            patchOnProperties: W,
            patchMethod: () => W,
            bindArguments: () => [],
            patchThen: () => W,
            patchMacroTask: () => W,
            patchEventPrototype: () => W,
            isIEOrEdge: () => !1,
            getGlobalObjects: () => {},
            ObjectDefineProperty: () => W,
            ObjectGetOwnPropertyDescriptor: () => {},
            ObjectCreate: () => {},
            ArraySlice: () => [],
            patchClass: () => W,
            wrapWithCurrentZone: () => W,
            filterProperties: () => [],
            attachOriginToPatched: () => W,
            _redefineProperty: () => W,
            patchCallbacks: () => W,
            nativeScheduleMicroTask: q,
          }
        let U = { parent: null, zone: new d(null, null) },
          re = null,
          ee = 0
        function W() {}
        o('Zone', 'Zone'), (e.Zone = d)
      })(
        (typeof window < 'u' && window) || (typeof self < 'u' && self) || global
      )
      const ie = Object.getOwnPropertyDescriptor,
        Ee = Object.defineProperty,
        de = Object.getPrototypeOf,
        ge = Object.create,
        Ve = Array.prototype.slice,
        Oe = 'addEventListener',
        Se = 'removeEventListener',
        Ze = Zone.__symbol__(Oe),
        Ne = Zone.__symbol__(Se),
        ce = 'true',
        ae = 'false',
        ke = Zone.__symbol__('')
      function Ie(e, n) {
        return Zone.current.wrap(e, n)
      }
      function Me(e, n, i, o, c) {
        return Zone.current.scheduleMacroTask(e, n, i, o, c)
      }
      const A = Zone.__symbol__,
        Pe = typeof window < 'u',
        Te = Pe ? window : void 0,
        Y = (Pe && Te) || ('object' == typeof self && self) || global
      function Le(e, n) {
        for (let i = e.length - 1; i >= 0; i--)
          'function' == typeof e[i] && (e[i] = Ie(e[i], n + '_' + i))
        return e
      }
      function Fe(e) {
        return (
          !e ||
          (!1 !== e.writable &&
            !('function' == typeof e.get && typeof e.set > 'u'))
        )
      }
      const Be =
          typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope,
        we =
          !('nw' in Y) &&
          typeof Y.process < 'u' &&
          '[object process]' === {}.toString.call(Y.process),
        je = !we && !Be && !(!Pe || !Te.HTMLElement),
        Ue =
          typeof Y.process < 'u' &&
          '[object process]' === {}.toString.call(Y.process) &&
          !Be &&
          !(!Pe || !Te.HTMLElement),
        Re = {},
        We = function (e) {
          if (!(e = e || Y.event)) return
          let n = Re[e.type]
          n || (n = Re[e.type] = A('ON_PROPERTY' + e.type))
          const i = this || e.target || Y,
            o = i[n]
          let c
          if (je && i === Te && 'error' === e.type) {
            const a = e
            ;(c =
              o &&
              o.call(this, a.message, a.filename, a.lineno, a.colno, a.error)),
              !0 === c && e.preventDefault()
          } else
            (c = o && o.apply(this, arguments)),
              null != c && !c && e.preventDefault()
          return c
        }
      function qe(e, n, i) {
        let o = ie(e, n)
        if (
          (!o && i && ie(i, n) && (o = { enumerable: !0, configurable: !0 }),
          !o || !o.configurable)
        )
          return
        const c = A('on' + n + 'patched')
        if (e.hasOwnProperty(c) && e[c]) return
        delete o.writable, delete o.value
        const a = o.get,
          y = o.set,
          d = n.slice(2)
        let P = Re[d]
        P || (P = Re[d] = A('ON_PROPERTY' + d)),
          (o.set = function (v) {
            let m = this
            !m && e === Y && (m = Y),
              m &&
                ('function' == typeof m[P] && m.removeEventListener(d, We),
                y && y.call(m, null),
                (m[P] = v),
                'function' == typeof v && m.addEventListener(d, We, !1))
          }),
          (o.get = function () {
            let v = this
            if ((!v && e === Y && (v = Y), !v)) return null
            const m = v[P]
            if (m) return m
            if (a) {
              let L = a.call(this)
              if (L)
                return (
                  o.set.call(this, L),
                  'function' == typeof v.removeAttribute &&
                    v.removeAttribute(n),
                  L
                )
            }
            return null
          }),
          Ee(e, n, o),
          (e[c] = !0)
      }
      function Xe(e, n, i) {
        if (n) for (let o = 0; o < n.length; o++) qe(e, 'on' + n[o], i)
        else {
          const o = []
          for (const c in e) 'on' == c.slice(0, 2) && o.push(c)
          for (let c = 0; c < o.length; c++) qe(e, o[c], i)
        }
      }
      const ne = A('originalInstance')
      function ve(e) {
        const n = Y[e]
        if (!n) return
        ;(Y[A(e)] = n),
          (Y[e] = function () {
            const c = Le(arguments, e)
            switch (c.length) {
              case 0:
                this[ne] = new n()
                break
              case 1:
                this[ne] = new n(c[0])
                break
              case 2:
                this[ne] = new n(c[0], c[1])
                break
              case 3:
                this[ne] = new n(c[0], c[1], c[2])
                break
              case 4:
                this[ne] = new n(c[0], c[1], c[2], c[3])
                break
              default:
                throw new Error('Arg list too long.')
            }
          }),
          ue(Y[e], n)
        const i = new n(function () {})
        let o
        for (o in i)
          ('XMLHttpRequest' === e && 'responseBlob' === o) ||
            (function (c) {
              'function' == typeof i[c]
                ? (Y[e].prototype[c] = function () {
                    return this[ne][c].apply(this[ne], arguments)
                  })
                : Ee(Y[e].prototype, c, {
                    set: function (a) {
                      'function' == typeof a
                        ? ((this[ne][c] = Ie(a, e + '.' + c)),
                          ue(this[ne][c], a))
                        : (this[ne][c] = a)
                    },
                    get: function () {
                      return this[ne][c]
                    },
                  })
            })(o)
        for (o in n)
          'prototype' !== o && n.hasOwnProperty(o) && (Y[e][o] = n[o])
      }
      function le(e, n, i) {
        let o = e
        for (; o && !o.hasOwnProperty(n); ) o = de(o)
        !o && e[n] && (o = e)
        const c = A(n)
        let a = null
        if (
          o &&
          (!(a = o[c]) || !o.hasOwnProperty(c)) &&
          ((a = o[c] = o[n]), Fe(o && ie(o, n)))
        ) {
          const d = i(a, c, n)
          ;(o[n] = function () {
            return d(this, arguments)
          }),
            ue(o[n], a)
        }
        return a
      }
      function lt(e, n, i) {
        let o = null
        function c(a) {
          const y = a.data
          return (
            (y.args[y.cbIdx] = function () {
              a.invoke.apply(this, arguments)
            }),
            o.apply(y.target, y.args),
            a
          )
        }
        o = le(
          e,
          n,
          (a) =>
            function (y, d) {
              const P = i(y, d)
              return P.cbIdx >= 0 && 'function' == typeof d[P.cbIdx]
                ? Me(P.name, d[P.cbIdx], P, c)
                : a.apply(y, d)
            }
        )
      }
      function ue(e, n) {
        e[A('OriginalDelegate')] = n
      }
      let ze = !1,
        Ae = !1
      function ft() {
        if (ze) return Ae
        ze = !0
        try {
          const e = Te.navigator.userAgent
          ;(-1 !== e.indexOf('MSIE ') ||
            -1 !== e.indexOf('Trident/') ||
            -1 !== e.indexOf('Edge/')) &&
            (Ae = !0)
        } catch {}
        return Ae
      }
      Zone.__load_patch('ZoneAwarePromise', (e, n, i) => {
        const o = Object.getOwnPropertyDescriptor,
          c = Object.defineProperty,
          y = i.symbol,
          d = [],
          P = !0 === e[y('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')],
          v = y('Promise'),
          m = y('then')
        ;(i.onUnhandledError = (l) => {
          if (i.showUncaughtError()) {
            const u = l && l.rejection
            u
              ? console.error(
                  'Unhandled Promise rejection:',
                  u instanceof Error ? u.message : u,
                  '; Zone:',
                  l.zone.name,
                  '; Task:',
                  l.task && l.task.source,
                  '; Value:',
                  u,
                  u instanceof Error ? u.stack : void 0
                )
              : console.error(l)
          }
        }),
          (i.microtaskDrainDone = () => {
            for (; d.length; ) {
              const l = d.shift()
              try {
                l.zone.runGuarded(() => {
                  throw l.throwOriginal ? l.rejection : l
                })
              } catch (u) {
                N(u)
              }
            }
          })
        const Z = y('unhandledPromiseRejectionHandler')
        function N(l) {
          i.onUnhandledError(l)
          try {
            const u = n[Z]
            'function' == typeof u && u.call(this, l)
          } catch {}
        }
        function B(l) {
          return l && l.then
        }
        function H(l) {
          return l
        }
        function J(l) {
          return t.reject(l)
        }
        const q = y('state'),
          R = y('value'),
          _ = y('finally'),
          K = y('parentPromiseValue'),
          x = y('parentPromiseState'),
          j = null,
          p = !0,
          G = !1
        function I(l, u) {
          return (s) => {
            try {
              z(l, u, s)
            } catch (f) {
              z(l, !1, f)
            }
          }
        }
        const w = function () {
            let l = !1
            return function (s) {
              return function () {
                l || ((l = !0), s.apply(null, arguments))
              }
            }
          },
          oe = y('currentTaskTrace')
        function z(l, u, s) {
          const f = w()
          if (l === s) throw new TypeError('Promise resolved with itself')
          if (l[q] === j) {
            let g = null
            try {
              ;('object' == typeof s || 'function' == typeof s) &&
                (g = s && s.then)
            } catch (b) {
              return (
                f(() => {
                  z(l, !1, b)
                })(),
                l
              )
            }
            if (
              u !== G &&
              s instanceof t &&
              s.hasOwnProperty(q) &&
              s.hasOwnProperty(R) &&
              s[q] !== j
            )
              re(s), z(l, s[q], s[R])
            else if (u !== G && 'function' == typeof g)
              try {
                g.call(s, f(I(l, u)), f(I(l, !1)))
              } catch (b) {
                f(() => {
                  z(l, !1, b)
                })()
              }
            else {
              l[q] = u
              const b = l[R]
              if (
                ((l[R] = s),
                l[_] === _ && u === p && ((l[q] = l[x]), (l[R] = l[K])),
                u === G && s instanceof Error)
              ) {
                const T =
                  n.currentTask &&
                  n.currentTask.data &&
                  n.currentTask.data.__creationTrace__
                T &&
                  c(s, oe, {
                    configurable: !0,
                    enumerable: !1,
                    writable: !0,
                    value: T,
                  })
              }
              for (let T = 0; T < b.length; )
                ee(l, b[T++], b[T++], b[T++], b[T++])
              if (0 == b.length && u == G) {
                l[q] = 0
                let T = s
                try {
                  throw new Error(
                    'Uncaught (in promise): ' +
                      (function a(l) {
                        return l && l.toString === Object.prototype.toString
                          ? ((l.constructor && l.constructor.name) || '') +
                              ': ' +
                              JSON.stringify(l)
                          : l
                          ? l.toString()
                          : Object.prototype.toString.call(l)
                      })(s) +
                      (s && s.stack ? '\n' + s.stack : '')
                  )
                } catch (D) {
                  T = D
                }
                P && (T.throwOriginal = !0),
                  (T.rejection = s),
                  (T.promise = l),
                  (T.zone = n.current),
                  (T.task = n.currentTask),
                  d.push(T),
                  i.scheduleMicroTask()
              }
            }
          }
          return l
        }
        const U = y('rejectionHandledHandler')
        function re(l) {
          if (0 === l[q]) {
            try {
              const u = n[U]
              u &&
                'function' == typeof u &&
                u.call(this, { rejection: l[R], promise: l })
            } catch {}
            l[q] = G
            for (let u = 0; u < d.length; u++)
              l === d[u].promise && d.splice(u, 1)
          }
        }
        function ee(l, u, s, f, g) {
          re(l)
          const b = l[q],
            T = b
              ? 'function' == typeof f
                ? f
                : H
              : 'function' == typeof g
              ? g
              : J
          u.scheduleMicroTask(
            'Promise.then',
            () => {
              try {
                const D = l[R],
                  O = !!s && _ === s[_]
                O && ((s[K] = D), (s[x] = b))
                const S = u.run(T, void 0, O && T !== J && T !== H ? [] : [D])
                z(s, !0, S)
              } catch (D) {
                z(s, !1, D)
              }
            },
            s
          )
        }
        const M = function () {},
          E = e.AggregateError
        class t {
          static toString() {
            return 'function ZoneAwarePromise() { [native code] }'
          }
          static resolve(u) {
            return z(new this(null), p, u)
          }
          static reject(u) {
            return z(new this(null), G, u)
          }
          static any(u) {
            if (!u || 'function' != typeof u[Symbol.iterator])
              return Promise.reject(new E([], 'All promises were rejected'))
            const s = []
            let f = 0
            try {
              for (let T of u) f++, s.push(t.resolve(T))
            } catch {
              return Promise.reject(new E([], 'All promises were rejected'))
            }
            if (0 === f)
              return Promise.reject(new E([], 'All promises were rejected'))
            let g = !1
            const b = []
            return new t((T, D) => {
              for (let O = 0; O < s.length; O++)
                s[O].then(
                  (S) => {
                    g || ((g = !0), T(S))
                  },
                  (S) => {
                    b.push(S),
                      f--,
                      0 === f &&
                        ((g = !0), D(new E(b, 'All promises were rejected')))
                  }
                )
            })
          }
          static race(u) {
            let s,
              f,
              g = new this((D, O) => {
                ;(s = D), (f = O)
              })
            function b(D) {
              s(D)
            }
            function T(D) {
              f(D)
            }
            for (let D of u) B(D) || (D = this.resolve(D)), D.then(b, T)
            return g
          }
          static all(u) {
            return t.allWithCallback(u)
          }
          static allSettled(u) {
            return (
              this && this.prototype instanceof t ? this : t
            ).allWithCallback(u, {
              thenCallback: (f) => ({ status: 'fulfilled', value: f }),
              errorCallback: (f) => ({ status: 'rejected', reason: f }),
            })
          }
          static allWithCallback(u, s) {
            let f,
              g,
              b = new this((S, V) => {
                ;(f = S), (g = V)
              }),
              T = 2,
              D = 0
            const O = []
            for (let S of u) {
              B(S) || (S = this.resolve(S))
              const V = D
              try {
                S.then(
                  (F) => {
                    ;(O[V] = s ? s.thenCallback(F) : F), T--, 0 === T && f(O)
                  },
                  (F) => {
                    s
                      ? ((O[V] = s.errorCallback(F)), T--, 0 === T && f(O))
                      : g(F)
                  }
                )
              } catch (F) {
                g(F)
              }
              T++, D++
            }
            return (T -= 2), 0 === T && f(O), b
          }
          constructor(u) {
            const s = this
            if (!(s instanceof t))
              throw new Error('Must be an instanceof Promise.')
            ;(s[q] = j), (s[R] = [])
            try {
              const f = w()
              u && u(f(I(s, p)), f(I(s, G)))
            } catch (f) {
              z(s, !1, f)
            }
          }
          get [Symbol.toStringTag]() {
            return 'Promise'
          }
          get [Symbol.species]() {
            return t
          }
          then(u, s) {
            var f
            let g =
              null === (f = this.constructor) || void 0 === f
                ? void 0
                : f[Symbol.species]
            ;(!g || 'function' != typeof g) && (g = this.constructor || t)
            const b = new g(M),
              T = n.current
            return (
              this[q] == j ? this[R].push(T, b, u, s) : ee(this, T, b, u, s), b
            )
          }
          catch(u) {
            return this.then(null, u)
          }
          finally(u) {
            var s
            let f =
              null === (s = this.constructor) || void 0 === s
                ? void 0
                : s[Symbol.species]
            ;(!f || 'function' != typeof f) && (f = t)
            const g = new f(M)
            g[_] = _
            const b = n.current
            return (
              this[q] == j ? this[R].push(b, g, u, u) : ee(this, b, g, u, u), g
            )
          }
        }
        ;(t.resolve = t.resolve),
          (t.reject = t.reject),
          (t.race = t.race),
          (t.all = t.all)
        const r = (e[v] = e.Promise)
        e.Promise = t
        const k = y('thenPatched')
        function C(l) {
          const u = l.prototype,
            s = o(u, 'then')
          if (s && (!1 === s.writable || !s.configurable)) return
          const f = u.then
          ;(u[m] = f),
            (l.prototype.then = function (g, b) {
              return new t((D, O) => {
                f.call(this, D, O)
              }).then(g, b)
            }),
            (l[k] = !0)
        }
        return (
          (i.patchThen = C),
          r &&
            (C(r),
            le(e, 'fetch', (l) =>
              (function $(l) {
                return function (u, s) {
                  let f = l.apply(u, s)
                  if (f instanceof t) return f
                  let g = f.constructor
                  return g[k] || C(g), f
                }
              })(l)
            )),
          (Promise[n.__symbol__('uncaughtPromiseErrors')] = d),
          t
        )
      }),
        Zone.__load_patch('toString', (e) => {
          const n = Function.prototype.toString,
            i = A('OriginalDelegate'),
            o = A('Promise'),
            c = A('Error'),
            a = function () {
              if ('function' == typeof this) {
                const v = this[i]
                if (v)
                  return 'function' == typeof v
                    ? n.call(v)
                    : Object.prototype.toString.call(v)
                if (this === Promise) {
                  const m = e[o]
                  if (m) return n.call(m)
                }
                if (this === Error) {
                  const m = e[c]
                  if (m) return n.call(m)
                }
              }
              return n.call(this)
            }
          ;(a[i] = n), (Function.prototype.toString = a)
          const y = Object.prototype.toString
          Object.prototype.toString = function () {
            return 'function' == typeof Promise && this instanceof Promise
              ? '[object Promise]'
              : y.call(this)
          }
        })
      let ye = !1
      if (typeof window < 'u')
        try {
          const e = Object.defineProperty({}, 'passive', {
            get: function () {
              ye = !0
            },
          })
          window.addEventListener('test', e, e),
            window.removeEventListener('test', e, e)
        } catch {
          ye = !1
        }
      const ht = { useG: !0 },
        te = {},
        Ye = {},
        $e = new RegExp('^' + ke + '(\\w+)(true|false)$'),
        Ke = A('propagationStopped')
      function Je(e, n) {
        const i = (n ? n(e) : e) + ae,
          o = (n ? n(e) : e) + ce,
          c = ke + i,
          a = ke + o
        ;(te[e] = {}), (te[e][ae] = c), (te[e][ce] = a)
      }
      function dt(e, n, i, o) {
        const c = (o && o.add) || Oe,
          a = (o && o.rm) || Se,
          y = (o && o.listeners) || 'eventListeners',
          d = (o && o.rmAll) || 'removeAllListeners',
          P = A(c),
          v = '.' + c + ':',
          Z = function (R, _, K) {
            if (R.isRemoved) return
            const x = R.callback
            let X
            'object' == typeof x &&
              x.handleEvent &&
              ((R.callback = (p) => x.handleEvent(p)), (R.originalDelegate = x))
            try {
              R.invoke(R, _, [K])
            } catch (p) {
              X = p
            }
            const j = R.options
            return (
              j &&
                'object' == typeof j &&
                j.once &&
                _[a].call(
                  _,
                  K.type,
                  R.originalDelegate ? R.originalDelegate : R.callback,
                  j
                ),
              X
            )
          }
        function N(R, _, K) {
          if (!(_ = _ || e.event)) return
          const x = R || _.target || e,
            X = x[te[_.type][K ? ce : ae]]
          if (X) {
            const j = []
            if (1 === X.length) {
              const p = Z(X[0], x, _)
              p && j.push(p)
            } else {
              const p = X.slice()
              for (let G = 0; G < p.length && (!_ || !0 !== _[Ke]); G++) {
                const h = Z(p[G], x, _)
                h && j.push(h)
              }
            }
            if (1 === j.length) throw j[0]
            for (let p = 0; p < j.length; p++) {
              const G = j[p]
              n.nativeScheduleMicroTask(() => {
                throw G
              })
            }
          }
        }
        const B = function (R) {
            return N(this, R, !1)
          },
          H = function (R) {
            return N(this, R, !0)
          }
        function J(R, _) {
          if (!R) return !1
          let K = !0
          _ && void 0 !== _.useG && (K = _.useG)
          const x = _ && _.vh
          let X = !0
          _ && void 0 !== _.chkDup && (X = _.chkDup)
          let j = !1
          _ && void 0 !== _.rt && (j = _.rt)
          let p = R
          for (; p && !p.hasOwnProperty(c); ) p = de(p)
          if ((!p && R[c] && (p = R), !p || p[P])) return !1
          const G = _ && _.eventNameToString,
            h = {},
            I = (p[P] = p[c]),
            w = (p[A(a)] = p[a]),
            Q = (p[A(y)] = p[y]),
            oe = (p[A(d)] = p[d])
          let z
          function U(s, f) {
            return !ye && 'object' == typeof s && s
              ? !!s.capture
              : ye && f
              ? 'boolean' == typeof s
                ? { capture: s, passive: !0 }
                : s
                ? 'object' == typeof s && !1 !== s.passive
                  ? Object.assign(Object.assign({}, s), { passive: !0 })
                  : s
                : { passive: !0 }
              : s
          }
          _ && _.prepend && (z = p[A(_.prepend)] = p[_.prepend])
          const t = K
              ? function (s) {
                  if (!h.isExisting)
                    return I.call(
                      h.target,
                      h.eventName,
                      h.capture ? H : B,
                      h.options
                    )
                }
              : function (s) {
                  return I.call(h.target, h.eventName, s.invoke, h.options)
                },
            r = K
              ? function (s) {
                  if (!s.isRemoved) {
                    const f = te[s.eventName]
                    let g
                    f && (g = f[s.capture ? ce : ae])
                    const b = g && s.target[g]
                    if (b)
                      for (let T = 0; T < b.length; T++)
                        if (b[T] === s) {
                          b.splice(T, 1),
                            (s.isRemoved = !0),
                            0 === b.length &&
                              ((s.allRemoved = !0), (s.target[g] = null))
                          break
                        }
                  }
                  if (s.allRemoved)
                    return w.call(
                      s.target,
                      s.eventName,
                      s.capture ? H : B,
                      s.options
                    )
                }
              : function (s) {
                  return w.call(s.target, s.eventName, s.invoke, s.options)
                },
            C =
              _ && _.diff
                ? _.diff
                : function (s, f) {
                    const g = typeof f
                    return (
                      ('function' === g && s.callback === f) ||
                      ('object' === g && s.originalDelegate === f)
                    )
                  },
            $ = Zone[A('UNPATCHED_EVENTS')],
            l = e[A('PASSIVE_EVENTS')],
            u = function (s, f, g, b, T = !1, D = !1) {
              return function () {
                const O = this || e
                let S = arguments[0]
                _ && _.transferEventName && (S = _.transferEventName(S))
                let V = arguments[1]
                if (!V) return s.apply(this, arguments)
                if (we && 'uncaughtException' === S)
                  return s.apply(this, arguments)
                let F = !1
                if ('function' != typeof V) {
                  if (!V.handleEvent) return s.apply(this, arguments)
                  F = !0
                }
                if (x && !x(s, V, O, arguments)) return
                const fe = ye && !!l && -1 !== l.indexOf(S),
                  se = U(arguments[2], fe)
                if ($)
                  for (let _e = 0; _e < $.length; _e++)
                    if (S === $[_e])
                      return fe ? s.call(O, S, V, se) : s.apply(this, arguments)
                const xe = !!se && ('boolean' == typeof se || se.capture),
                  nt = !(!se || 'object' != typeof se) && se.once,
                  gt = Zone.current
                let Ge = te[S]
                Ge || (Je(S, G), (Ge = te[S]))
                const rt = Ge[xe ? ce : ae]
                let De,
                  me = O[rt],
                  ot = !1
                if (me) {
                  if (((ot = !0), X))
                    for (let _e = 0; _e < me.length; _e++)
                      if (C(me[_e], V)) return
                } else me = O[rt] = []
                const st = O.constructor.name,
                  it = Ye[st]
                it && (De = it[S]),
                  De || (De = st + f + (G ? G(S) : S)),
                  (h.options = se),
                  nt && (h.options.once = !1),
                  (h.target = O),
                  (h.capture = xe),
                  (h.eventName = S),
                  (h.isExisting = ot)
                const be = K ? ht : void 0
                be && (be.taskData = h)
                const he = gt.scheduleEventTask(De, V, be, g, b)
                return (
                  (h.target = null),
                  be && (be.taskData = null),
                  nt && (se.once = !0),
                  (!ye && 'boolean' == typeof he.options) || (he.options = se),
                  (he.target = O),
                  (he.capture = xe),
                  (he.eventName = S),
                  F && (he.originalDelegate = V),
                  D ? me.unshift(he) : me.push(he),
                  T ? O : void 0
                )
              }
            }
          return (
            (p[c] = u(I, v, t, r, j)),
            z &&
              (p.prependListener = u(
                z,
                '.prependListener:',
                function (s) {
                  return z.call(h.target, h.eventName, s.invoke, h.options)
                },
                r,
                j,
                !0
              )),
            (p[a] = function () {
              const s = this || e
              let f = arguments[0]
              _ && _.transferEventName && (f = _.transferEventName(f))
              const g = arguments[2],
                b = !!g && ('boolean' == typeof g || g.capture),
                T = arguments[1]
              if (!T) return w.apply(this, arguments)
              if (x && !x(w, T, s, arguments)) return
              const D = te[f]
              let O
              D && (O = D[b ? ce : ae])
              const S = O && s[O]
              if (S)
                for (let V = 0; V < S.length; V++) {
                  const F = S[V]
                  if (C(F, T))
                    return (
                      S.splice(V, 1),
                      (F.isRemoved = !0),
                      0 === S.length &&
                        ((F.allRemoved = !0),
                        (s[O] = null),
                        'string' == typeof f) &&
                        (s[ke + 'ON_PROPERTY' + f] = null),
                      F.zone.cancelTask(F),
                      j ? s : void 0
                    )
                }
              return w.apply(this, arguments)
            }),
            (p[y] = function () {
              const s = this || e
              let f = arguments[0]
              _ && _.transferEventName && (f = _.transferEventName(f))
              const g = [],
                b = Qe(s, G ? G(f) : f)
              for (let T = 0; T < b.length; T++) {
                const D = b[T]
                g.push(D.originalDelegate ? D.originalDelegate : D.callback)
              }
              return g
            }),
            (p[d] = function () {
              const s = this || e
              let f = arguments[0]
              if (f) {
                _ && _.transferEventName && (f = _.transferEventName(f))
                const g = te[f]
                if (g) {
                  const D = s[g[ae]],
                    O = s[g[ce]]
                  if (D) {
                    const S = D.slice()
                    for (let V = 0; V < S.length; V++) {
                      const F = S[V]
                      this[a].call(
                        this,
                        f,
                        F.originalDelegate ? F.originalDelegate : F.callback,
                        F.options
                      )
                    }
                  }
                  if (O) {
                    const S = O.slice()
                    for (let V = 0; V < S.length; V++) {
                      const F = S[V]
                      this[a].call(
                        this,
                        f,
                        F.originalDelegate ? F.originalDelegate : F.callback,
                        F.options
                      )
                    }
                  }
                }
              } else {
                const g = Object.keys(s)
                for (let b = 0; b < g.length; b++) {
                  const D = $e.exec(g[b])
                  let O = D && D[1]
                  O && 'removeListener' !== O && this[d].call(this, O)
                }
                this[d].call(this, 'removeListener')
              }
              if (j) return this
            }),
            ue(p[c], I),
            ue(p[a], w),
            oe && ue(p[d], oe),
            Q && ue(p[y], Q),
            !0
          )
        }
        let q = []
        for (let R = 0; R < i.length; R++) q[R] = J(i[R], o)
        return q
      }
      function Qe(e, n) {
        if (!n) {
          const a = []
          for (let y in e) {
            const d = $e.exec(y)
            let P = d && d[1]
            if (P && (!n || P === n)) {
              const v = e[y]
              if (v) for (let m = 0; m < v.length; m++) a.push(v[m])
            }
          }
          return a
        }
        let i = te[n]
        i || (Je(n), (i = te[n]))
        const o = e[i[ae]],
          c = e[i[ce]]
        return o ? (c ? o.concat(c) : o.slice()) : c ? c.slice() : []
      }
      function _t(e, n) {
        const i = e.Event
        i &&
          i.prototype &&
          n.patchMethod(
            i.prototype,
            'stopImmediatePropagation',
            (o) =>
              function (c, a) {
                ;(c[Ke] = !0), o && o.apply(c, a)
              }
          )
      }
      function Et(e, n, i, o, c) {
        const a = Zone.__symbol__(o)
        if (n[a]) return
        const y = (n[a] = n[o])
        ;(n[o] = function (d, P, v) {
          return (
            P &&
              P.prototype &&
              c.forEach(function (m) {
                const L = `${i}.${o}::` + m,
                  Z = P.prototype
                try {
                  if (Z.hasOwnProperty(m)) {
                    const N = e.ObjectGetOwnPropertyDescriptor(Z, m)
                    N && N.value
                      ? ((N.value = e.wrapWithCurrentZone(N.value, L)),
                        e._redefineProperty(P.prototype, m, N))
                      : Z[m] && (Z[m] = e.wrapWithCurrentZone(Z[m], L))
                  } else Z[m] && (Z[m] = e.wrapWithCurrentZone(Z[m], L))
                } catch {}
              }),
            y.call(n, d, P, v)
          )
        }),
          e.attachOriginToPatched(n[o], y)
      }
      function et(e, n, i) {
        if (!i || 0 === i.length) return n
        const o = i.filter((a) => a.target === e)
        if (!o || 0 === o.length) return n
        const c = o[0].ignoreProperties
        return n.filter((a) => -1 === c.indexOf(a))
      }
      function tt(e, n, i, o) {
        e && Xe(e, et(e, n, i), o)
      }
      function He(e) {
        return Object.getOwnPropertyNames(e)
          .filter((n) => n.startsWith('on') && n.length > 2)
          .map((n) => n.substring(2))
      }
      Zone.__load_patch('util', (e, n, i) => {
        const o = He(e)
        ;(i.patchOnProperties = Xe),
          (i.patchMethod = le),
          (i.bindArguments = Le),
          (i.patchMacroTask = lt)
        const c = n.__symbol__('BLACK_LISTED_EVENTS'),
          a = n.__symbol__('UNPATCHED_EVENTS')
        e[a] && (e[c] = e[a]),
          e[c] && (n[c] = n[a] = e[c]),
          (i.patchEventPrototype = _t),
          (i.patchEventTarget = dt),
          (i.isIEOrEdge = ft),
          (i.ObjectDefineProperty = Ee),
          (i.ObjectGetOwnPropertyDescriptor = ie),
          (i.ObjectCreate = ge),
          (i.ArraySlice = Ve),
          (i.patchClass = ve),
          (i.wrapWithCurrentZone = Ie),
          (i.filterProperties = et),
          (i.attachOriginToPatched = ue),
          (i._redefineProperty = Object.defineProperty),
          (i.patchCallbacks = Et),
          (i.getGlobalObjects = () => ({
            globalSources: Ye,
            zoneSymbolEventNames: te,
            eventNames: o,
            isBrowser: je,
            isMix: Ue,
            isNode: we,
            TRUE_STR: ce,
            FALSE_STR: ae,
            ZONE_SYMBOL_PREFIX: ke,
            ADD_EVENT_LISTENER_STR: Oe,
            REMOVE_EVENT_LISTENER_STR: Se,
          }))
      })
      const Ce = A('zoneTask')
      function pe(e, n, i, o) {
        let c = null,
          a = null
        i += o
        const y = {}
        function d(v) {
          const m = v.data
          return (
            (m.args[0] = function () {
              return v.invoke.apply(this, arguments)
            }),
            (m.handleId = c.apply(e, m.args)),
            v
          )
        }
        function P(v) {
          return a.call(e, v.data.handleId)
        }
        ;(c = le(
          e,
          (n += o),
          (v) =>
            function (m, L) {
              if ('function' == typeof L[0]) {
                const Z = {
                    isPeriodic: 'Interval' === o,
                    delay:
                      'Timeout' === o || 'Interval' === o ? L[1] || 0 : void 0,
                    args: L,
                  },
                  N = L[0]
                L[0] = function () {
                  try {
                    return N.apply(this, arguments)
                  } finally {
                    Z.isPeriodic ||
                      ('number' == typeof Z.handleId
                        ? delete y[Z.handleId]
                        : Z.handleId && (Z.handleId[Ce] = null))
                  }
                }
                const B = Me(n, L[0], Z, d, P)
                if (!B) return B
                const H = B.data.handleId
                return (
                  'number' == typeof H ? (y[H] = B) : H && (H[Ce] = B),
                  H &&
                    H.ref &&
                    H.unref &&
                    'function' == typeof H.ref &&
                    'function' == typeof H.unref &&
                    ((B.ref = H.ref.bind(H)), (B.unref = H.unref.bind(H))),
                  'number' == typeof H || H ? H : B
                )
              }
              return v.apply(e, L)
            }
        )),
          (a = le(
            e,
            i,
            (v) =>
              function (m, L) {
                const Z = L[0]
                let N
                'number' == typeof Z
                  ? (N = y[Z])
                  : ((N = Z && Z[Ce]), N || (N = Z)),
                  N && 'string' == typeof N.type
                    ? 'notScheduled' !== N.state &&
                      ((N.cancelFn && N.data.isPeriodic) || 0 === N.runCount) &&
                      ('number' == typeof Z ? delete y[Z] : Z && (Z[Ce] = null),
                      N.zone.cancelTask(N))
                    : v.apply(e, L)
              }
          ))
      }
      Zone.__load_patch('legacy', (e) => {
        const n = e[Zone.__symbol__('legacyPatch')]
        n && n()
      }),
        Zone.__load_patch('queueMicrotask', (e, n, i) => {
          i.patchMethod(
            e,
            'queueMicrotask',
            (o) =>
              function (c, a) {
                n.current.scheduleMicroTask('queueMicrotask', a[0])
              }
          )
        }),
        Zone.__load_patch('timers', (e) => {
          const n = 'set',
            i = 'clear'
          pe(e, n, i, 'Timeout'),
            pe(e, n, i, 'Interval'),
            pe(e, n, i, 'Immediate')
        }),
        Zone.__load_patch('requestAnimationFrame', (e) => {
          pe(e, 'request', 'cancel', 'AnimationFrame'),
            pe(e, 'mozRequest', 'mozCancel', 'AnimationFrame'),
            pe(e, 'webkitRequest', 'webkitCancel', 'AnimationFrame')
        }),
        Zone.__load_patch('blocking', (e, n) => {
          const i = ['alert', 'prompt', 'confirm']
          for (let o = 0; o < i.length; o++)
            le(
              e,
              i[o],
              (a, y, d) =>
                function (P, v) {
                  return n.current.run(a, e, v, d)
                }
            )
        }),
        Zone.__load_patch('EventTarget', (e, n, i) => {
          ;(function mt(e, n) {
            n.patchEventPrototype(e, n)
          })(e, i),
            (function pt(e, n) {
              if (Zone[n.symbol('patchEventTarget')]) return
              const {
                eventNames: i,
                zoneSymbolEventNames: o,
                TRUE_STR: c,
                FALSE_STR: a,
                ZONE_SYMBOL_PREFIX: y,
              } = n.getGlobalObjects()
              for (let P = 0; P < i.length; P++) {
                const v = i[P],
                  Z = y + (v + a),
                  N = y + (v + c)
                ;(o[v] = {}), (o[v][a] = Z), (o[v][c] = N)
              }
              const d = e.EventTarget
              d && d.prototype && n.patchEventTarget(e, n, [d && d.prototype])
            })(e, i)
          const o = e.XMLHttpRequestEventTarget
          o && o.prototype && i.patchEventTarget(e, i, [o.prototype])
        }),
        Zone.__load_patch('MutationObserver', (e, n, i) => {
          ve('MutationObserver'), ve('WebKitMutationObserver')
        }),
        Zone.__load_patch('IntersectionObserver', (e, n, i) => {
          ve('IntersectionObserver')
        }),
        Zone.__load_patch('FileReader', (e, n, i) => {
          ve('FileReader')
        }),
        Zone.__load_patch('on_property', (e, n, i) => {
          !(function Tt(e, n) {
            if ((we && !Ue) || Zone[e.symbol('patchEvents')]) return
            const i = n.__Zone_ignore_on_properties
            let o = []
            if (je) {
              const c = window
              o = o.concat([
                'Document',
                'SVGElement',
                'Element',
                'HTMLElement',
                'HTMLBodyElement',
                'HTMLMediaElement',
                'HTMLFrameSetElement',
                'HTMLFrameElement',
                'HTMLIFrameElement',
                'HTMLMarqueeElement',
                'Worker',
              ])
              const a = (function ut() {
                try {
                  const e = Te.navigator.userAgent
                  if (-1 !== e.indexOf('MSIE ') || -1 !== e.indexOf('Trident/'))
                    return !0
                } catch {}
                return !1
              })()
                ? [{ target: c, ignoreProperties: ['error'] }]
                : []
              tt(c, He(c), i && i.concat(a), de(c))
            }
            o = o.concat([
              'XMLHttpRequest',
              'XMLHttpRequestEventTarget',
              'IDBIndex',
              'IDBRequest',
              'IDBOpenDBRequest',
              'IDBDatabase',
              'IDBTransaction',
              'IDBCursor',
              'WebSocket',
            ])
            for (let c = 0; c < o.length; c++) {
              const a = n[o[c]]
              a && a.prototype && tt(a.prototype, He(a.prototype), i)
            }
          })(i, e)
        }),
        Zone.__load_patch('customElements', (e, n, i) => {
          !(function yt(e, n) {
            const { isBrowser: i, isMix: o } = n.getGlobalObjects()
            ;(i || o) &&
              e.customElements &&
              'customElements' in e &&
              n.patchCallbacks(
                n,
                e.customElements,
                'customElements',
                'define',
                [
                  'connectedCallback',
                  'disconnectedCallback',
                  'adoptedCallback',
                  'attributeChangedCallback',
                ]
              )
          })(e, i)
        }),
        Zone.__load_patch('XHR', (e, n) => {
          !(function P(v) {
            const m = v.XMLHttpRequest
            if (!m) return
            const L = m.prototype
            let N = L[Ze],
              B = L[Ne]
            if (!N) {
              const h = v.XMLHttpRequestEventTarget
              if (h) {
                const I = h.prototype
                ;(N = I[Ze]), (B = I[Ne])
              }
            }
            const H = 'readystatechange',
              J = 'scheduled'
            function q(h) {
              const I = h.data,
                w = I.target
              ;(w[a] = !1), (w[d] = !1)
              const Q = w[c]
              N || ((N = w[Ze]), (B = w[Ne])), Q && B.call(w, H, Q)
              const oe = (w[c] = () => {
                if (w.readyState === w.DONE)
                  if (!I.aborted && w[a] && h.state === J) {
                    const U = w[n.__symbol__('loadfalse')]
                    if (0 !== w.status && U && U.length > 0) {
                      const re = h.invoke
                      ;(h.invoke = function () {
                        const ee = w[n.__symbol__('loadfalse')]
                        for (let W = 0; W < ee.length; W++)
                          ee[W] === h && ee.splice(W, 1)
                        !I.aborted && h.state === J && re.call(h)
                      }),
                        U.push(h)
                    } else h.invoke()
                  } else !I.aborted && !1 === w[a] && (w[d] = !0)
              })
              return (
                N.call(w, H, oe),
                w[i] || (w[i] = h),
                p.apply(w, I.args),
                (w[a] = !0),
                h
              )
            }
            function R() {}
            function _(h) {
              const I = h.data
              return (I.aborted = !0), G.apply(I.target, I.args)
            }
            const K = le(
                L,
                'open',
                () =>
                  function (h, I) {
                    return (h[o] = 0 == I[2]), (h[y] = I[1]), K.apply(h, I)
                  }
              ),
              X = A('fetchTaskAborting'),
              j = A('fetchTaskScheduling'),
              p = le(
                L,
                'send',
                () =>
                  function (h, I) {
                    if (!0 === n.current[j] || h[o]) return p.apply(h, I)
                    {
                      const w = {
                          target: h,
                          url: h[y],
                          isPeriodic: !1,
                          args: I,
                          aborted: !1,
                        },
                        Q = Me('XMLHttpRequest.send', R, w, q, _)
                      h &&
                        !0 === h[d] &&
                        !w.aborted &&
                        Q.state === J &&
                        Q.invoke()
                    }
                  }
              ),
              G = le(
                L,
                'abort',
                () =>
                  function (h, I) {
                    const w = (function Z(h) {
                      return h[i]
                    })(h)
                    if (w && 'string' == typeof w.type) {
                      if (null == w.cancelFn || (w.data && w.data.aborted))
                        return
                      w.zone.cancelTask(w)
                    } else if (!0 === n.current[X]) return G.apply(h, I)
                  }
              )
          })(e)
          const i = A('xhrTask'),
            o = A('xhrSync'),
            c = A('xhrListener'),
            a = A('xhrScheduled'),
            y = A('xhrURL'),
            d = A('xhrErrorBeforeScheduled')
        }),
        Zone.__load_patch('geolocation', (e) => {
          e.navigator &&
            e.navigator.geolocation &&
            (function at(e, n) {
              const i = e.constructor.name
              for (let o = 0; o < n.length; o++) {
                const c = n[o],
                  a = e[c]
                if (a) {
                  if (!Fe(ie(e, c))) continue
                  e[c] = ((d) => {
                    const P = function () {
                      return d.apply(this, Le(arguments, i + '.' + c))
                    }
                    return ue(P, d), P
                  })(a)
                }
              }
            })(e.navigator.geolocation, ['getCurrentPosition', 'watchPosition'])
        }),
        Zone.__load_patch('PromiseRejectionEvent', (e, n) => {
          function i(o) {
            return function (c) {
              Qe(e, o).forEach((y) => {
                const d = e.PromiseRejectionEvent
                if (d) {
                  const P = new d(o, {
                    promise: c.promise,
                    reason: c.rejection,
                  })
                  y.invoke(P)
                }
              })
            }
          }
          e.PromiseRejectionEvent &&
            ((n[A('unhandledPromiseRejectionHandler')] =
              i('unhandledrejection')),
            (n[A('rejectionHandledHandler')] = i('rejectionhandled')))
        })
    },
  },
  (ie) => {
    ie((ie.s = 435))
  },
])
;(() => {
  'use strict'
  var e,
    _ = {},
    d = {}
  function n(e) {
    var a = d[e]
    if (void 0 !== a) return a.exports
    var r = (d[e] = { exports: {} })
    return _[e](r, r.exports, n), r.exports
  }
  ;(n.m = _),
    (e = []),
    (n.O = (a, r, s, t) => {
      if (!r) {
        var o = 1 / 0
        for (l = 0; l < e.length; l++) {
          for (var [r, s, t] = e[l], c = !0, f = 0; f < r.length; f++)
            (!1 & t || o >= t) && Object.keys(n.O).every((i) => n.O[i](r[f]))
              ? r.splice(f--, 1)
              : ((c = !1), t < o && (o = t))
          if (c) {
            e.splice(l--, 1)
            var u = s()
            void 0 !== u && (a = u)
          }
        }
        return a
      }
      t = t || 0
      for (var l = e.length; l > 0 && e[l - 1][2] > t; l--) e[l] = e[l - 1]
      e[l] = [r, s, t]
    }),
    (n.n = (e) => {
      var a = e && e.__esModule ? () => e.default : () => e
      return n.d(a, { a }), a
    }),
    (n.d = (e, a) => {
      for (var r in a)
        n.o(a, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: a[r] })
    }),
    (n.o = (e, a) => Object.prototype.hasOwnProperty.call(e, a)),
    (() => {
      var e = { 666: 0 }
      n.O.j = (s) => 0 === e[s]
      var a = (s, t) => {
          var f,
            u,
            [l, o, c] = t,
            v = 0
          if (l.some((h) => 0 !== e[h])) {
            for (f in o) n.o(o, f) && (n.m[f] = o[f])
            if (c) var b = c(n)
          }
          for (s && s(t); v < l.length; v++)
            n.o(e, (u = l[v])) && e[u] && e[u][0](), (e[u] = 0)
          return n.O(b)
        },
        r = (self.webpackChunkstandalone_elements =
          self.webpackChunkstandalone_elements || [])
      r.forEach(a.bind(null, 0)), (r.push = a.bind(null, r.push.bind(r)))
    })()
})()
;('use strict')
;(self.webpackChunkstandalone_elements =
  self.webpackChunkstandalone_elements || []).push([
  [179],
  {
    846: () => {
      function re(e) {
        return 'function' == typeof e
      }
      function To(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack)
        })
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        )
      }
      const No = To(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n)
          }
      )
      function xr(e, t) {
        if (e) {
          const n = e.indexOf(t)
          0 <= n && e.splice(n, 1)
        }
      }
      class It {
        constructor(t) {
          ;(this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null)
        }
        unsubscribe() {
          let t
          if (!this.closed) {
            this.closed = !0
            const { _parentage: n } = this
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this)
              else n.remove(this)
            const { initialTeardown: r } = this
            if (re(r))
              try {
                r()
              } catch (i) {
                t = i instanceof No ? i.errors : [i]
              }
            const { _finalizers: o } = this
            if (o) {
              this._finalizers = null
              for (const i of o)
                try {
                  Cc(i)
                } catch (s) {
                  ;(t = t ?? []),
                    s instanceof No ? (t = [...t, ...s.errors]) : t.push(s)
                }
            }
            if (t) throw new No(t)
          }
        }
        add(t) {
          var n
          if (t && t !== this)
            if (this.closed) Cc(t)
            else {
              if (t instanceof It) {
                if (t.closed || t._hasParent(this)) return
                t._addParent(this)
              }
              ;(this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              )
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this
          return n === t || (Array.isArray(n) && n.includes(t))
        }
        _addParent(t) {
          const { _parentage: n } = this
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
        }
        _removeParent(t) {
          const { _parentage: n } = this
          n === t ? (this._parentage = null) : Array.isArray(n) && xr(n, t)
        }
        remove(t) {
          const { _finalizers: n } = this
          n && xr(n, t), t instanceof It && t._removeParent(this)
        }
      }
      It.EMPTY = (() => {
        const e = new It()
        return (e.closed = !0), e
      })()
      const vc = It.EMPTY
      function Dc(e) {
        return (
          e instanceof It ||
          (e && 'closed' in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        )
      }
      function Cc(e) {
        re(e) ? e() : e.unsubscribe()
      }
      const vn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        xo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = xo
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n)
          },
          clearTimeout(e) {
            const { delegate: t } = xo
            return (t?.clearTimeout || clearTimeout)(e)
          },
          delegate: void 0,
        }
      function wc(e) {
        xo.setTimeout(() => {
          const { onUnhandledError: t } = vn
          if (!t) throw e
          t(e)
        })
      }
      function Ec() {}
      const U_ = Ds('C', void 0, void 0)
      function Ds(e, t, n) {
        return { kind: e, value: t, error: n }
      }
      let Dn = null
      function Fo(e) {
        if (vn.useDeprecatedSynchronousErrorHandling) {
          const t = !Dn
          if ((t && (Dn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Dn
            if (((Dn = null), n)) throw r
          }
        } else e()
      }
      class Cs extends It {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Dc(t) && t.add(this))
              : (this.destination = Q_)
        }
        static create(t, n, r) {
          return new Fr(t, n, r)
        }
        next(t) {
          this.isStopped
            ? Es(
                (function z_(e) {
                  return Ds('N', e, void 0)
                })(t),
                this
              )
            : this._next(t)
        }
        error(t) {
          this.isStopped
            ? Es(
                (function G_(e) {
                  return Ds('E', void 0, e)
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t))
        }
        complete() {
          this.isStopped
            ? Es(U_, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          try {
            this.destination.error(t)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const q_ = Function.prototype.bind
      function ws(e, t) {
        return q_.call(e, t)
      }
      class Z_ {
        constructor(t) {
          this.partialObserver = t
        }
        next(t) {
          const { partialObserver: n } = this
          if (n.next)
            try {
              n.next(t)
            } catch (r) {
              Oo(r)
            }
        }
        error(t) {
          const { partialObserver: n } = this
          if (n.error)
            try {
              n.error(t)
            } catch (r) {
              Oo(r)
            }
          else Oo(t)
        }
        complete() {
          const { partialObserver: t } = this
          if (t.complete)
            try {
              t.complete()
            } catch (n) {
              Oo(n)
            }
        }
      }
      class Fr extends Cs {
        constructor(t, n, r) {
          let o
          if ((super(), re(t) || !t))
            o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 }
          else {
            let i
            this && vn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ws(t.next, i),
                  error: t.error && ws(t.error, i),
                  complete: t.complete && ws(t.complete, i),
                }))
              : (o = t)
          }
          this.destination = new Z_(o)
        }
      }
      function Oo(e) {
        vn.useDeprecatedSynchronousErrorHandling
          ? (function W_(e) {
              vn.useDeprecatedSynchronousErrorHandling &&
                Dn &&
                ((Dn.errorThrown = !0), (Dn.error = e))
            })(e)
          : wc(e)
      }
      function Es(e, t) {
        const { onStoppedNotification: n } = vn
        n && xo.setTimeout(() => n(e, t))
      }
      const Q_ = {
          closed: !0,
          next: Ec,
          error: function K_(e) {
            throw e
          },
          complete: Ec,
        },
        bs =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function bc(e) {
        return e
      }
      let Ce = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n)
          }
          lift(n) {
            const r = new e()
            return (r.source = this), (r.operator = n), r
          }
          subscribe(n, r, o) {
            const i = (function J_(e) {
              return (
                (e && e instanceof Cs) ||
                ((function Y_(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete)
                })(e) &&
                  Dc(e))
              )
            })(n)
              ? n
              : new Fr(n, r, o)
            return (
              Fo(() => {
                const { operator: s, source: a } = this
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                )
              }),
              i
            )
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n)
            } catch (r) {
              n.error(r)
            }
          }
          forEach(n, r) {
            return new (r = Ic(r))((o, i) => {
              const s = new Fr({
                next: (a) => {
                  try {
                    n(a)
                  } catch (u) {
                    i(u), s.unsubscribe()
                  }
                },
                error: i,
                complete: o,
              })
              this.subscribe(s)
            })
          }
          _subscribe(n) {
            var r
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n)
          }
          [bs]() {
            return this
          }
          pipe(...n) {
            return (function Mc(e) {
              return 0 === e.length
                ? bc
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n)
                  }
            })(n)(this)
          }
          toPromise(n) {
            return new (n = Ic(n))((r, o) => {
              let i
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              )
            })
          }
        }
        return (e.create = (t) => new e(t)), e
      })()
      function Ic(e) {
        var t
        return null !== (t = e ?? vn.Promise) && void 0 !== t ? t : Promise
      }
      const X_ = To(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let Po = (() => {
        class e extends Ce {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift(n) {
            const r = new Sc(this, this)
            return (r.operator = n), r
          }
          _throwIfClosed() {
            if (this.closed) throw new X_()
          }
          next(n) {
            Fo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers))
                for (const r of this.currentObservers) r.next(n)
              }
            })
          }
          error(n) {
            Fo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = n)
                const { observers: r } = this
                for (; r.length; ) r.shift().error(n)
              }
            })
          }
          complete() {
            Fo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const { observers: n } = this
                for (; n.length; ) n.shift().complete()
              }
            })
          }
          unsubscribe() {
            ;(this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null)
          }
          get observed() {
            var n
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            )
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n)
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            )
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this
            return r || o
              ? vc
              : ((this.currentObservers = null),
                i.push(n),
                new It(() => {
                  ;(this.currentObservers = null), xr(i, n)
                }))
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this
            r ? n.error(o) : i && n.complete()
          }
          asObservable() {
            const n = new Ce()
            return (n.source = this), n
          }
        }
        return (e.create = (t, n) => new Sc(t, n)), e
      })()
      class Sc extends Po {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n)
        }
        next(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t)
        }
        error(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t)
        }
        complete() {
          var t, n
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t)
        }
        _subscribe(t) {
          var n, r
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : vc
        }
      }
      function Cn(e) {
        return (t) => {
          if (
            (function ev(e) {
              return re(e?.lift)
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this)
              } catch (r) {
                this.error(r)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function nn(e, t, n, r, o) {
        return new tv(e, t, n, r, o)
      }
      class tv extends Cs {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a)
                  } catch (u) {
                    t.error(u)
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a)
                  } catch (u) {
                    t.error(u)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r()
                  } catch (a) {
                    t.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe() {
          var t
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) || void 0 === t || t.call(this))
          }
        }
      }
      function rn(e, t) {
        return Cn((n, r) => {
          let o = 0
          n.subscribe(
            nn(r, (i) => {
              r.next(e.call(t, i, o++))
            })
          )
        })
      }
      function wn(e) {
        return this instanceof wn ? ((this.v = e), this) : new wn(e)
      }
      function ov(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var o,
          r = n.apply(e, t || []),
          i = []
        return (
          (o = {}),
          s('next'),
          s('throw'),
          s('return'),
          (o[Symbol.asyncIterator] = function () {
            return this
          }),
          o
        )
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, g) {
                i.push([f, h, p, g]) > 1 || a(f, h)
              })
            })
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof wn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f)
            })(r[f](h))
          } catch (p) {
            d(i[0][3], p)
          }
        }
        function l(f) {
          a('next', f)
        }
        function c(f) {
          a('throw', f)
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1])
        }
      }
      function iv(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var n,
          t = e[Symbol.asyncIterator]
        return t
          ? t.call(e)
          : ((e = (function Nc(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0
              if (n) return n.call(e)
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    )
                  },
                }
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n)
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a })
                  }, s)
                })(a, u, (s = e[i](s)).done, s.value)
              })
            }
        }
      }
      const xc = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e
      function Fc(e) {
        return re(e?.then)
      }
      function Oc(e) {
        return re(e[bs])
      }
      function Pc(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator])
      }
      function Rc(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const Vc = (function av() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function kc(e) {
        return re(e?.[Vc])
      }
      function Lc(e) {
        return ov(this, arguments, function* () {
          const n = e.getReader()
          try {
            for (;;) {
              const { value: r, done: o } = yield wn(n.read())
              if (o) return yield wn(void 0)
              yield yield wn(r)
            }
          } finally {
            n.releaseLock()
          }
        })
      }
      function Bc(e) {
        return re(e?.getReader)
      }
      function Bt(e) {
        if (e instanceof Ce) return e
        if (null != e) {
          if (Oc(e))
            return (function uv(e) {
              return new Ce((t) => {
                const n = e[bs]()
                if (re(n.subscribe)) return n.subscribe(t)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(e)
          if (xc(e))
            return (function lv(e) {
              return new Ce((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n])
                t.complete()
              })
            })(e)
          if (Fc(e))
            return (function cv(e) {
              return new Ce((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete())
                  },
                  (n) => t.error(n)
                ).then(null, wc)
              })
            })(e)
          if (Pc(e)) return jc(e)
          if (kc(e))
            return (function dv(e) {
              return new Ce((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return
                t.complete()
              })
            })(e)
          if (Bc(e))
            return (function fv(e) {
              return jc(Lc(e))
            })(e)
        }
        throw Rc(e)
      }
      function jc(e) {
        return new Ce((t) => {
          ;(function hv(e, t) {
            var n, r, o, i
            return (function nv(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i)
                            })
                      })(c.value).then(a, u)
                }
                l((r = r.apply(e, t || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (n = iv(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return
              } catch (s) {
                o = { error: s }
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n))
                } finally {
                  if (o) throw o.error
                }
              }
              t.complete()
            })
          })(e, t).catch((n) => t.error(n))
        })
      }
      function on(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
        }, r)
        if ((e.add(i), !o)) return i
      }
      function Ro(e, t, n = 1 / 0) {
        return re(t)
          ? Ro((r, o) => rn((i, s) => t(r, i, o, s))(Bt(e(r, o))), n)
          : ('number' == typeof t && (n = t),
            Cn((r, o) =>
              (function pv(e, t, n, r, o, i, s, a) {
                const u = []
                let l = 0,
                  c = 0,
                  d = !1
                const f = () => {
                    d && !u.length && !l && t.complete()
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++
                    let v = !1
                    Bt(n(g, c++)).subscribe(
                      nn(
                        t,
                        (_) => {
                          o?.(_), i ? h(_) : t.next(_)
                        },
                        () => {
                          v = !0
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const _ = u.shift()
                                s ? on(t, s, () => p(_)) : p(_)
                              }
                              f()
                            } catch (_) {
                              t.error(_)
                            }
                        }
                      )
                    )
                  }
                return (
                  e.subscribe(
                    nn(t, h, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    a?.()
                  }
                )
              })(r, o, e, n)
            ))
      }
      const Hc = new Ce((e) => e.complete())
      function Is(e) {
        return e[e.length - 1]
      }
      function $c(e) {
        return (function yv(e) {
          return e && re(e.schedule)
        })(Is(e))
          ? e.pop()
          : void 0
      }
      function Uc(e, t = 0) {
        return Cn((n, r) => {
          n.subscribe(
            nn(
              r,
              (o) => on(r, e, () => r.next(o), t),
              () => on(r, e, () => r.complete(), t),
              (o) => on(r, e, () => r.error(o), t)
            )
          )
        })
      }
      function Gc(e, t = 0) {
        return Cn((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t))
        })
      }
      function zc(e, t) {
        if (!e) throw new Error('Iterable cannot be null')
        return new Ce((n) => {
          on(n, t, () => {
            const r = e[Symbol.asyncIterator]()
            on(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function Ss(e, t) {
        return t
          ? (function Mv(e, t) {
              if (null != e) {
                if (Oc(e))
                  return (function Dv(e, t) {
                    return Bt(e).pipe(Gc(t), Uc(t))
                  })(e, t)
                if (xc(e))
                  return (function wv(e, t) {
                    return new Ce((n) => {
                      let r = 0
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule())
                      })
                    })
                  })(e, t)
                if (Fc(e))
                  return (function Cv(e, t) {
                    return Bt(e).pipe(Gc(t), Uc(t))
                  })(e, t)
                if (Pc(e)) return zc(e, t)
                if (kc(e))
                  return (function Ev(e, t) {
                    return new Ce((n) => {
                      let r
                      return (
                        on(n, t, () => {
                          ;(r = e[Vc]()),
                            on(
                              n,
                              t,
                              () => {
                                let o, i
                                try {
                                  ;({ value: o, done: i } = r.next())
                                } catch (s) {
                                  return void n.error(s)
                                }
                                i ? n.complete() : n.next(o)
                              },
                              0,
                              !0
                            )
                        }),
                        () => re(r?.return) && r.return()
                      )
                    })
                  })(e, t)
                if (Bc(e))
                  return (function bv(e, t) {
                    return zc(Lc(e), t)
                  })(e, t)
              }
              throw Rc(e)
            })(e, t)
          : Bt(e)
      }
      function Wc(...e) {
        const t = $c(e),
          n = (function vv(e, t) {
            return 'number' == typeof Is(e) ? e.pop() : t
          })(e, 1 / 0),
          r = e
        return r.length
          ? 1 === r.length
            ? Bt(r[0])
            : (function gv(e = 1 / 0) {
                return Ro(bc, e)
              })(n)(Ss(r, t))
          : Hc
      }
      function As(e, t, ...n) {
        if (!0 === t) return void e()
        if (!1 === t) return
        const r = new Fr({
          next: () => {
            r.unsubscribe(), e()
          },
        })
        return t(...n).subscribe(r)
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t
        throw Error('Could not find renamed property on target object.')
      }
      function K(e) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) return '[' + e.map(K).join(', ') + ']'
        if (null == e) return '' + e
        if (e.overriddenName) return `${e.overriddenName}`
        if (e.name) return `${e.name}`
        const t = e.toString()
        if (null == t) return '' + t
        const n = t.indexOf('\n')
        return -1 === n ? t : t.substring(0, n)
      }
      function Ns(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t
      }
      const Sv = Z({ __forward_ref__: Z })
      function Y(e) {
        return (
          (e.__forward_ref__ = Y),
          (e.toString = function () {
            return K(this())
          }),
          e
        )
      }
      function A(e) {
        return (function xs(e) {
          return (
            'function' == typeof e &&
            e.hasOwnProperty(Sv) &&
            e.__forward_ref__ === Y
          )
        })(e)
          ? e()
          : e
      }
      class b extends Error {
        constructor(t, n) {
          super(
            (function Vo(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t.trim() : ''}`
            })(t, n)
          ),
            (this.code = t)
        }
      }
      function F(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e)
      }
      function ko(e, t) {
        throw new b(-201, !1)
      }
      function ze(e, t) {
        null == e &&
          (function z(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            )
          })(t, e, null, '!=')
      }
      function H(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        }
      }
      function Ht(e) {
        return { providers: e.providers || [], imports: e.imports || [] }
      }
      function Lo(e) {
        return qc(e, Bo) || qc(e, Kc)
      }
      function qc(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null
      }
      function Zc(e) {
        return e && (e.hasOwnProperty(Fs) || e.hasOwnProperty(Rv))
          ? e[Fs]
          : null
      }
      const Bo = Z({ ɵprov: Z }),
        Fs = Z({ ɵinj: Z }),
        Kc = Z({ ngInjectableDef: Z }),
        Rv = Z({ ngInjectorDef: Z })
      var T = (() => (
        ((T = T || {})[(T.Default = 0)] = 'Default'),
        (T[(T.Host = 1)] = 'Host'),
        (T[(T.Self = 2)] = 'Self'),
        (T[(T.SkipSelf = 4)] = 'SkipSelf'),
        (T[(T.Optional = 8)] = 'Optional'),
        T
      ))()
      let Os
      function et(e) {
        const t = Os
        return (Os = e), t
      }
      function Qc(e, t, n) {
        const r = Lo(e)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & T.Optional
          ? null
          : void 0 !== t
          ? t
          : void ko(K(e))
      }
      function sn(e) {
        return { toString: e }.toString()
      }
      var dt = (() => (
          ((dt = dt || {})[(dt.OnPush = 0)] = 'OnPush'),
          (dt[(dt.Default = 1)] = 'Default'),
          dt
        ))(),
        St = (() => {
          return (
            ((e = St || (St = {}))[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            St
          )
          var e
        })()
      const Q = (() =>
          (typeof globalThis < 'u' && globalThis) ||
          (typeof global < 'u' && global) ||
          (typeof window < 'u' && window) ||
          (typeof self < 'u' &&
            typeof WorkerGlobalScope < 'u' &&
            self instanceof WorkerGlobalScope &&
            self))(),
        jn = {},
        G = [],
        jo = Z({ ɵcmp: Z }),
        Ps = Z({ ɵdir: Z }),
        Rs = Z({ ɵpipe: Z }),
        $t = Z({ ɵfac: Z }),
        Or = Z({ __NG_ELEMENT_ID__: Z })
      let kv = 0
      function Vs(e) {
        return sn(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === dt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || G,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || St.Emulated,
              id: 'c' + kv++,
              styles: e.styles || G,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features
          return (
            (o.inputs = ed(e.inputs, r)),
            (o.outputs = ed(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ('function' == typeof i ? i() : i).map(Jc).filter(Xc)
              : null),
            (o.pipeDefs = i
              ? () => ('function' == typeof i ? i() : i).map(xe).filter(Xc)
              : null),
            o
          )
        })
      }
      function Jc(e) {
        return W(e) || Ne(e)
      }
      function Xc(e) {
        return null !== e
      }
      function an(e) {
        return sn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || G,
          declarations: e.declarations || G,
          imports: e.imports || G,
          exports: e.exports || G,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }))
      }
      function ed(e, t) {
        if (null == e) return jn
        const n = {}
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i)
          }
        return n
      }
      const O = Vs
      function W(e) {
        return e[jo] || null
      }
      function Ne(e) {
        return e[Ps] || null
      }
      function xe(e) {
        return e[Rs] || null
      }
      const L = 11,
        J = 22
      function je(e) {
        return Array.isArray(e) && 'object' == typeof e[1]
      }
      function ht(e) {
        return Array.isArray(e) && !0 === e[1]
      }
      function Bs(e) {
        return 0 != (8 & e.flags)
      }
      function Go(e) {
        return 2 == (2 & e.flags)
      }
      function zo(e) {
        return 1 == (1 & e.flags)
      }
      function pt(e) {
        return null !== e.template
      }
      function Uv(e) {
        return 0 != (256 & e[2])
      }
      function Sn(e, t) {
        return e.hasOwnProperty($t) ? e[$t] : null
      }
      class rd {
        constructor(t, n, r) {
          ;(this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function od(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = qv), Wv
      }
      function Wv() {
        const e = sd(this),
          t = e?.current
        if (t) {
          const n = e.previous
          if (n === jn) e.previous = t
          else for (let r in t) n[r] = t[r]
          ;(e.current = null), this.ngOnChanges(t)
        }
      }
      function qv(e, t, n, r) {
        const o =
            sd(e) ||
            (function Zv(e, t) {
              return (e[id] = t)
            })(e, { previous: jn, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a]
        ;(i[a] = new rd(u && u.currentValue, t, s === jn)), (e[r] = t)
      }
      const id = '__ngSimpleChanges__'
      function sd(e) {
        return e[id] || null
      }
      function de(e) {
        for (; Array.isArray(e); ) e = e[0]
        return e
      }
      function rt(e, t) {
        return de(t[e.index])
      }
      function Gs(e, t) {
        return e.data[t]
      }
      function Ze(e, t) {
        const n = t[e]
        return je(n) ? n : n[0]
      }
      function ad(e) {
        return 4 == (4 & e[2])
      }
      function qo(e) {
        return 64 == (64 & e[2])
      }
      function un(e, t) {
        return null == t ? null : e[t]
      }
      function ud(e) {
        e[18] = 0
      }
      function zs(e, t) {
        e[5] += t
        let n = e,
          r = e[3]
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3])
      }
      const N = { lFrame: yd(null), bindingsEnabled: !0 }
      function cd() {
        return N.bindingsEnabled
      }
      function y() {
        return N.lFrame.lView
      }
      function $() {
        return N.lFrame.tView
      }
      function ge() {
        let e = dd()
        for (; null !== e && 64 === e.type; ) e = e.parent
        return e
      }
      function dd() {
        return N.lFrame.currentTNode
      }
      function At(e, t) {
        const n = N.lFrame
        ;(n.currentTNode = e), (n.isParent = t)
      }
      function Ws() {
        return N.lFrame.isParent
      }
      function Wn() {
        return N.lFrame.bindingIndex++
      }
      function cD(e, t) {
        const n = N.lFrame
        ;(n.bindingIndex = n.bindingRootIndex = e), Zs(t)
      }
      function Zs(e) {
        N.lFrame.currentDirectiveIndex = e
      }
      function pd() {
        return N.lFrame.currentQueryIndex
      }
      function Qs(e) {
        N.lFrame.currentQueryIndex = e
      }
      function fD(e) {
        const t = e[1]
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null
      }
      function gd(e, t, n) {
        if (n & T.SkipSelf) {
          let o = t,
            i = e
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & T.Host ||
              ((o = fD(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1
          ;(t = o), (e = i)
        }
        const r = (N.lFrame = md())
        return (r.currentTNode = t), (r.lView = e), !0
      }
      function Ys(e) {
        const t = md(),
          n = e[1]
        ;(N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1)
      }
      function md() {
        const e = N.lFrame,
          t = null === e ? null : e.child
        return null === t ? yd(e) : t
      }
      function yd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        }
        return null !== e && (e.child = t), t
      }
      function _d() {
        const e = N.lFrame
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        )
      }
      const vd = _d
      function Js() {
        const e = _d()
        ;(e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0)
      }
      function Oe() {
        return N.lFrame.selectedIndex
      }
      function ln(e) {
        N.lFrame.selectedIndex = e
      }
      function Tt() {
        N.lFrame.currentNamespace = 'svg'
      }
      function Ko(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c)
        }
      }
      function Qo(e, t, n) {
        Dd(e, t, 3, n)
      }
      function Yo(e, t, n, r) {
        ;(3 & e[2]) === n && Dd(e, t, n, r)
      }
      function Xs(e, t) {
        let n = e[2]
        ;(3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n))
      }
      function Dd(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1
        let a = 0
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ('number' == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (DD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++
      }
      function DD(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]]
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048
            try {
              i.call(a)
            } finally {
            }
          }
        } else
          try {
            i.call(a)
          } finally {
          }
      }
      class Br {
        constructor(t, n, r) {
          ;(this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r)
        }
      }
      function Jo(e, t, n) {
        let r = 0
        for (; r < n.length; ) {
          const o = n[r]
          if ('number' == typeof o) {
            if (0 !== o) break
            r++
            const i = n[r++],
              s = n[r++],
              a = n[r++]
            e.setAttribute(t, s, a, i)
          } else {
            const i = o,
              s = n[++r]
            wd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
          }
        }
        return r
      }
      function Cd(e) {
        return 3 === e || 4 === e || 6 === e
      }
      function wd(e) {
        return 64 === e.charCodeAt(0)
      }
      function Xo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice()
          else {
            let n = -1
            for (let r = 0; r < t.length; r++) {
              const o = t[r]
              'number' == typeof o
                ? (n = o)
                : 0 === n ||
                  Ed(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
            }
          }
        return e
      }
      function Ed(e, t, n, r, o) {
        let i = 0,
          s = e.length
        if (-1 === t) s = -1
        else
          for (; i < e.length; ) {
            const a = e[i++]
            if ('number' == typeof a) {
              if (a === t) {
                s = -1
                break
              }
              if (a > t) {
                s = i - 1
                break
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i]
          if ('number' == typeof a) break
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o))
            if (r === e[i + 1]) return void (e[i + 2] = o)
          }
          i++, null !== r && i++, null !== o && i++
        }
        ;-1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o)
      }
      function bd(e) {
        return -1 !== e
      }
      function qn(e) {
        return 32767 & e
      }
      function Zn(e, t) {
        let n = (function MD(e) {
            return e >> 16
          })(e),
          r = t
        for (; n > 0; ) (r = r[15]), n--
        return r
      }
      let ta = !0
      function ei(e) {
        const t = ta
        return (ta = e), t
      }
      let ID = 0
      const Nt = {}
      function Hr(e, t) {
        const n = ra(e, t)
        if (-1 !== n) return n
        const r = t[1]
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          na(r.data, e),
          na(t, null),
          na(r.blueprint, null))
        const o = ti(e, t),
          i = e.injectorIndex
        if (bd(o)) {
          const s = qn(o),
            a = Zn(o, t),
            u = a[1].data
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l]
        }
        return (t[i + 8] = o), i
      }
      function na(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
      }
      function ra(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex
      }
      function ti(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex
        let n = 0,
          r = null,
          o = t
        for (; null !== o; ) {
          if (((r = Od(o)), null === r)) return -1
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16)
        }
        return -1
      }
      function ni(e, t, n) {
        !(function SD(e, t, n) {
          let r
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Or) && (r = n[Or]),
            null == r && (r = n[Or] = ID++)
          const o = 255 & r
          t.data[e + (o >> 5)] |= 1 << o
        })(e, t, n)
      }
      function Sd(e, t, n) {
        if (n & T.Optional) return e
        ko()
      }
      function Ad(e, t, n, r) {
        if (
          (n & T.Optional && void 0 === r && (r = null),
          0 == (n & (T.Self | T.Host)))
        ) {
          const o = e[9],
            i = et(void 0)
          try {
            return o ? o.get(t, r, n & T.Optional) : Qc(t, r, n & T.Optional)
          } finally {
            et(i)
          }
        }
        return Sd(r, 0, n)
      }
      function Td(e, t, n, r = T.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function FD(e, t, n, r, o) {
              let i = e,
                s = t
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Nd(i, s, n, r | T.Self, Nt)
                if (a !== Nt) return a
                let u = i.parent
                if (!u) {
                  const l = s[21]
                  if (l) {
                    const c = l.get(n, Nt, r)
                    if (c !== Nt) return c
                  }
                  ;(u = Od(s)), (s = s[15])
                }
                i = u
              }
              return o
            })(e, t, n, r, Nt)
            if (s !== Nt) return s
          }
          const i = Nd(e, t, n, r, Nt)
          if (i !== Nt) return i
        }
        return Ad(t, n, r, o)
      }
      function Nd(e, t, n, r, o) {
        const i = (function ND(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0
          const t = e.hasOwnProperty(Or) ? e[Or] : void 0
          return 'number' == typeof t ? (t >= 0 ? 255 & t : xD) : t
        })(n)
        if ('function' == typeof i) {
          if (!gd(t, e, r)) return r & T.Host ? Sd(o, 0, r) : Ad(t, n, r, o)
          try {
            const s = i(r)
            if (null != s || r & T.Optional) return s
            ko()
          } finally {
            vd()
          }
        } else if ('number' == typeof i) {
          let s = null,
            a = ra(e, t),
            u = -1,
            l = r & T.Host ? t[16][6] : null
          for (
            (-1 === a || r & T.SkipSelf) &&
            ((u = -1 === a ? ti(e, t) : t[a + 8]),
            -1 !== u && Fd(r, !1)
              ? ((s = t[1]), (a = qn(u)), (t = Zn(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1]
            if (xd(i, a, c.data)) {
              const d = TD(a, t, n, s, r, l)
              if (d !== Nt) return d
            }
            ;(u = t[a + 8]),
              -1 !== u && Fd(r, t[1].data[a + 8] === l) && xd(i, a, t)
                ? ((s = c), (a = qn(u)), (t = Zn(u, t)))
                : (a = -1)
          }
        }
        return o
      }
      function TD(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = ri(
            a,
            s,
            n,
            null == r ? Go(a) && ta : r != s && 0 != (3 & a.type),
            o & T.Host && i === a
          )
        return null !== c ? $r(t, s, c, a) : Nt
      }
      function ri(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h]
          if ((h < u && n === p) || (h >= u && p.type === n)) return h
        }
        if (o) {
          const h = s[u]
          if (h && pt(h) && h.type === n) return u
        }
        return null
      }
      function $r(e, t, n, r) {
        let o = e[n]
        const i = t.data
        if (
          (function CD(e) {
            return e instanceof Br
          })(o)
        ) {
          const s = o
          s.resolving &&
            (function Av(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : ''
              throw new b(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              )
            })(
              (function U(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                    null != e &&
                    'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : F(e)
              })(i[n])
            )
          const a = ei(s.canSeeViewProviders)
          s.resolving = !0
          const u = s.injectImpl ? et(s.injectImpl) : null
          gd(e, r, T.Default)
          try {
            ;(o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function vD(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype
                  if (r) {
                    const s = od(t)
                    ;(n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s)
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i))
                })(n, i[n], t)
          } finally {
            null !== u && et(u), ei(a), (s.resolving = !1), vd()
          }
        }
        return o
      }
      function xd(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e))
      }
      function Fd(e, t) {
        return !(e & T.Self || (e & T.Host && t))
      }
      class Kn {
        constructor(t, n) {
          ;(this._tNode = t), (this._lView = n)
        }
        get(t, n, r) {
          return Td(this._tNode, this._lView, t, r, n)
        }
      }
      function xD() {
        return new Kn(ge(), y())
      }
      function Od(e) {
        const t = e[1],
          n = t.type
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null
      }
      class x {
        constructor(t, n) {
          ;(this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = H({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }))
        }
        get multi() {
          return this
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      function Ke(e, t) {
        void 0 === t && (t = e)
        for (let n = 0; n < e.length; n++) {
          let r = e[n]
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), Ke(r, t))
            : t !== e && t.push(r)
        }
        return t
      }
      function Wt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Wt(n, t) : t(n)))
      }
      function Rd(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n)
      }
      function oi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
      }
      function Qe(e, t, n) {
        let r = er(e, t)
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function VD(e, t, n, r) {
                let o = e.length
                if (o == t) e.push(n, r)
                else if (1 === o) e.push(r, e[0]), (e[0] = n)
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--
                  ;(e[t] = n), (e[t + 1] = r)
                }
              })(e, r, t, n)),
          r
        )
      }
      function ua(e, t) {
        const n = er(e, t)
        if (n >= 0) return e[1 | n]
      }
      function er(e, t) {
        return (function Ld(e, t, n) {
          let r = 0,
            o = e.length >> n
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n]
            if (t === s) return i << n
            s > t ? (o = i) : (r = i + 1)
          }
          return ~(o << n)
        })(e, t, 1)
      }
      const Wr = {},
        si = 'ngTempTokenPath',
        GD = /\n/gm,
        Bd = '__source'
      let qr, ha, di, fi
      function tr(e) {
        const t = qr
        return (qr = e), t
      }
      function WD(e, t = T.Default) {
        if (void 0 === qr) throw new b(-203, !1)
        return null === qr
          ? Qc(e, void 0, t)
          : qr.get(e, t & T.Optional ? null : void 0, t)
      }
      function V(e, t = T.Default) {
        return (
          (function Vv() {
            return Os
          })() || WD
        )(A(e), t)
      }
      function da(e) {
        const t = []
        for (let n = 0; n < e.length; n++) {
          const r = A(e[n])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new b(900, !1)
            let o,
              i = T.Default
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = ZD(a)
              'number' == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a)
            }
            t.push(V(o, i))
          } else t.push(V(r))
        }
        return t
      }
      function ZD(e) {
        return e.__NG_DI_FLAG__
      }
      function rr(e) {
        return (
          (function pa() {
            if (void 0 === di && ((di = null), Q.trustedTypes))
              try {
                di = Q.trustedTypes.createPolicy('angular', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return di
          })()?.createHTML(e) || e
        )
      }
      function Yd(e) {
        return (
          (function ga() {
            if (void 0 === fi && ((fi = null), Q.trustedTypes))
              try {
                fi = Q.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return fi
          })()?.createScriptURL(e) || e
        )
      }
      class An {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
        }
      }
      class lC extends An {
        getTypeName() {
          return 'HTML'
        }
      }
      class cC extends An {
        getTypeName() {
          return 'Style'
        }
      }
      class dC extends An {
        getTypeName() {
          return 'Script'
        }
      }
      class fC extends An {
        getTypeName() {
          return 'URL'
        }
      }
      class hC extends An {
        getTypeName() {
          return 'ResourceURL'
        }
      }
      function Ye(e) {
        return e instanceof An ? e.changingThisBreaksApplicationSecurity : e
      }
      function xt(e, t) {
        const n = (function pC(e) {
          return (e instanceof An && e.getTypeName()) || null
        })(e)
        if (null != n && n !== t) {
          if ('ResourceURL' === n && 'URL' === t) return !0
          throw new Error(
            `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
          )
        }
        return n === t
      }
      class DC {
        constructor(t) {
          this.inertDocumentHelper = t
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t
          try {
            const n = new window.DOMParser().parseFromString(
              rr(t),
              'text/html'
            ).body
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n)
          } catch {
            return null
          }
        }
      }
      class CC {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                'sanitization-inert'
              )),
            null == this.inertDocument.body)
          ) {
            const n = this.inertDocument.createElement('html')
            this.inertDocument.appendChild(n)
            const r = this.inertDocument.createElement('body')
            n.appendChild(r)
          }
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement('template')
          if ('content' in n) return (n.innerHTML = rr(t)), n
          const r = this.inertDocument.createElement('body')
          return (
            (r.innerHTML = rr(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(r),
            r
          )
        }
        stripCustomNsAttrs(t) {
          const n = t.attributes
          for (let o = n.length - 1; 0 < o; o--) {
            const s = n.item(o).name
            ;('xmlns:ns1' === s || 0 === s.indexOf('ns1:')) &&
              t.removeAttribute(s)
          }
          let r = t.firstChild
          for (; r; )
            r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r),
              (r = r.nextSibling)
        }
      }
      const EC =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi
      function Yr(e) {
        return (e = String(e)).match(EC) ? e : 'unsafe:' + e
      }
      function Ft(e) {
        const t = {}
        for (const n of e.split(',')) t[n] = !0
        return t
      }
      function Jr(...e) {
        const t = {}
        for (const n of e) for (const r in n) n.hasOwnProperty(r) && (t[r] = !0)
        return t
      }
      const ef = Ft('area,br,col,hr,img,wbr'),
        tf = Ft('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        nf = Ft('rp,rt'),
        ma = Jr(
          ef,
          Jr(
            tf,
            Ft(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Jr(
            nf,
            Ft(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Jr(nf, tf)
        ),
        ya = Ft('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        _a = Ft('srcset'),
        rf = Jr(
          ya,
          _a,
          Ft(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          Ft(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        bC = Ft('script,style,template')
      class MC {
        constructor() {
          ;(this.sanitizedSomething = !1), (this.buf = [])
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n)
                let o = this.checkClobberedElement(n, n.nextSibling)
                if (o) {
                  n = o
                  break
                }
                n = this.checkClobberedElement(n, n.parentNode)
              }
          return this.buf.join('')
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase()
          if (!ma.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !bC.hasOwnProperty(n)
          this.buf.push('<'), this.buf.push(n)
          const r = t.attributes
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              s = i.name,
              a = s.toLowerCase()
            if (!rf.hasOwnProperty(a)) {
              this.sanitizedSomething = !0
              continue
            }
            let u = i.value
            ya[a] && (u = Yr(u)),
              _a[a] &&
                ((e = u),
                (u = (e = String(e))
                  .split(',')
                  .map((t) => Yr(t.trim()))
                  .join(', '))),
              this.buf.push(' ', s, '="', of(u), '"')
          }
          var e
          return this.buf.push('>'), !0
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase()
          ma.hasOwnProperty(n) &&
            !ef.hasOwnProperty(n) &&
            (this.buf.push('</'), this.buf.push(n), this.buf.push('>'))
        }
        chars(t) {
          this.buf.push(of(t))
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            )
          return n
        }
      }
      const IC = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        SC = /([^\#-~ |!])/g
      function of(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(IC, function (t) {
            return (
              '&#' +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ';'
            )
          })
          .replace(SC, function (t) {
            return '&#' + t.charCodeAt(0) + ';'
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }
      let hi
      function sf(e, t) {
        let n = null
        try {
          hi =
            hi ||
            (function Jd(e) {
              const t = new CC(e)
              return (function wC() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    rr(''),
                    'text/html'
                  )
                } catch {
                  return !1
                }
              })()
                ? new DC(t)
                : t
            })(e)
          let r = t ? String(t) : ''
          n = hi.getInertBodyElement(r)
          let o = 5,
            i = r
          do {
            if (0 === o)
              throw new Error(
                'Failed to sanitize html because the input is unstable'
              )
            o--, (r = i), (i = n.innerHTML), (n = hi.getInertBodyElement(r))
          } while (r !== i)
          return rr(new MC().sanitizeChildren(va(n) || n))
        } finally {
          if (n) {
            const r = va(n) || n
            for (; r.firstChild; ) r.removeChild(r.firstChild)
          }
        }
      }
      function va(e) {
        return 'content' in e &&
          (function AC(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
          })(e)
          ? e.content
          : null
      }
      var X = (() => (
        ((X = X || {})[(X.NONE = 0)] = 'NONE'),
        (X[(X.HTML = 1)] = 'HTML'),
        (X[(X.STYLE = 2)] = 'STYLE'),
        (X[(X.SCRIPT = 3)] = 'SCRIPT'),
        (X[(X.URL = 4)] = 'URL'),
        (X[(X.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        X
      ))()
      function Da(e) {
        const t = (function Xr() {
          const e = y()
          return e && e[12]
        })()
        if (t) return Yd(t.sanitize(X.RESOURCE_URL, e) || '')
        if (xt(e, 'ResourceURL')) return Yd(Ye(e))
        throw new b(904, !1)
      }
      const uf = new x('ENVIRONMENT_INITIALIZER'),
        lf = new x('INJECTOR', -1),
        cf = new x('INJECTOR_DEF_TYPES')
      class df {
        get(t, n = Wr) {
          if (n === Wr) {
            const r = new Error(`NullInjectorError: No provider for ${K(t)}!`)
            throw ((r.name = 'NullInjectorError'), r)
          }
          return n
        }
      }
      function VC(...e) {
        return { ɵproviders: ff(0, e) }
      }
      function ff(e, ...t) {
        const n = [],
          r = new Set()
        let o
        return (
          Wt(t, (i) => {
            const s = i
            Ca(s, n, [], r) && (o || (o = []), o.push(s))
          }),
          void 0 !== o && hf(o, n),
          n
        )
      }
      function hf(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n]
          Wt(o, (i) => {
            t.push(i)
          })
        }
      }
      function Ca(e, t, n, r) {
        if (!(e = A(e))) return !1
        let o = null,
          i = Zc(e)
        const s = !i && W(e)
        if (i || s) {
          if (s && !s.standalone) return !1
          o = e
        } else {
          const u = e.ngModule
          if (((i = Zc(u)), !i)) return !1
          o = u
        }
        const a = r.has(o)
        if (s) {
          if (a) return !1
          if ((r.add(o), s.dependencies)) {
            const u =
              'function' == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies
            for (const l of u) Ca(l, t, n, r)
          }
        } else {
          if (!i) return !1
          {
            if (null != i.imports && !a) {
              let l
              r.add(o)
              try {
                Wt(i.imports, (c) => {
                  Ca(c, t, n, r) && (l || (l = []), l.push(c))
                })
              } finally {
              }
              void 0 !== l && hf(l, t)
            }
            if (!a) {
              const l = Sn(o) || (() => new o())
              t.push(
                { provide: o, useFactory: l, deps: G },
                { provide: cf, useValue: o, multi: !0 },
                { provide: uf, useValue: () => V(o), multi: !0 }
              )
            }
            const u = i.providers
            null == u ||
              a ||
              Wt(u, (c) => {
                t.push(c)
              })
          }
        }
        return o !== e && void 0 !== e.providers
      }
      const kC = Z({ provide: String, useValue: Z })
      function wa(e) {
        return null !== e && 'object' == typeof e && kC in e
      }
      function Tn(e) {
        return 'function' == typeof e
      }
      const Ea = new x('Set Injector scope.'),
        pi = {},
        BC = {}
      let ba
      function gi() {
        return void 0 === ba && (ba = new df()), ba
      }
      class or {}
      class mf extends or {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Ia(t, (s) => this.processProvider(s)),
            this.records.set(lf, ir(void 0, this)),
            o.has('environment') && this.records.set(or, ir(void 0, this))
          const i = this.records.get(Ea)
          null != i && 'string' == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(cf.multi, G, T.Self)))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy()
            for (const t of this._onDestroyHooks) t()
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0)
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t)
        }
        runInContext(t) {
          this.assertNotDestroyed()
          const n = tr(this),
            r = et(void 0)
          try {
            return t()
          } finally {
            tr(n), et(r)
          }
        }
        get(t, n = Wr, r = T.Default) {
          this.assertNotDestroyed()
          const o = tr(this),
            i = et(void 0)
          try {
            if (!(r & T.SkipSelf)) {
              let a = this.records.get(t)
              if (void 0 === a) {
                const u =
                  (function GC(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof x)
                    )
                  })(t) && Lo(t)
                ;(a = u && this.injectableDefInScope(u) ? ir(Ma(t), pi) : null),
                  this.records.set(t, a)
              }
              if (null != a) return this.hydrate(t, a)
            }
            return (r & T.Self ? gi() : this.parent).get(
              t,
              (n = r & T.Optional && n === Wr ? null : n)
            )
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[si] = s[si] || []).unshift(K(t)), o)) throw s
              return (function KD(e, t, n, r) {
                const o = e[si]
                throw (
                  (t[Bd] && o.unshift(t[Bd]),
                  (e.message = (function QD(e, t, n, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e
                    let o = K(t)
                    if (Array.isArray(t)) o = t.map(K).join(' -> ')
                    else if ('object' == typeof t) {
                      let i = []
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s]
                          i.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : K(a))
                          )
                        }
                      o = `{${i.join(', ')}}`
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
                      GD,
                      '\n  '
                    )}`
                  })('\n' + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[si] = null),
                  e)
                )
              })(s, t, 'R3InjectorError', this.source)
            }
            throw s
          } finally {
            et(i), tr(o)
          }
        }
        resolveInjectorInitializers() {
          const t = tr(this),
            n = et(void 0)
          try {
            const r = this.get(uf.multi, G, T.Self)
            for (const o of r) o()
          } finally {
            tr(t), et(n)
          }
        }
        toString() {
          const t = [],
            n = this.records
          for (const r of n.keys()) t.push(K(r))
          return `R3Injector[${t.join(', ')}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new b(205, !1)
        }
        processProvider(t) {
          let n = Tn((t = A(t))) ? t : A(t && t.provide)
          const r = (function HC(e) {
            return wa(e) ? ir(void 0, e.useValue) : ir(yf(e), pi)
          })(t)
          if (Tn(t) || !0 !== t.multi) this.records.get(n)
          else {
            let o = this.records.get(n)
            o ||
              ((o = ir(void 0, pi, !0)),
              (o.factory = () => da(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t)
          }
          this.records.set(n, r)
        }
        hydrate(t, n) {
          return (
            n.value === pi && ((n.value = BC), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function UC(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                )
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          )
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1
          const n = A(t.providedIn)
          return 'string' == typeof n
            ? 'any' === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n)
        }
      }
      function Ma(e) {
        const t = Lo(e),
          n = null !== t ? t.factory : Sn(e)
        if (null !== n) return n
        if (e instanceof x) throw new b(204, !1)
        if (e instanceof Function)
          return (function jC(e) {
            const t = e.length
            if (t > 0)
              throw (
                ((function zr(e, t) {
                  const n = []
                  for (let r = 0; r < e; r++) n.push(t)
                  return n
                })(t, '?'),
                new b(204, !1))
              )
            const n = (function Ov(e) {
              const t = e && (e[Bo] || e[Kc])
              if (t) {
                const n = (function Pv(e) {
                  if (e.hasOwnProperty('name')) return e.name
                  const t = ('' + e).match(/^function\s*([^\s(]+)/)
                  return null === t ? '' : t[1]
                })(e)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                )
              }
              return null
            })(e)
            return null !== n ? () => n.factory(e) : () => new e()
          })(e)
        throw new b(204, !1)
      }
      function yf(e, t, n) {
        let r
        if (Tn(e)) {
          const o = A(e)
          return Sn(o) || Ma(o)
        }
        if (wa(e)) r = () => A(e.useValue)
        else if (
          (function gf(e) {
            return !(!e || !e.useFactory)
          })(e)
        )
          r = () => e.useFactory(...da(e.deps || []))
        else if (
          (function pf(e) {
            return !(!e || !e.useExisting)
          })(e)
        )
          r = () => V(A(e.useExisting))
        else {
          const o = A(e && (e.useClass || e.provide))
          if (
            !(function $C(e) {
              return !!e.deps
            })(e)
          )
            return Sn(o) || Ma(o)
          r = () => new o(...da(e.deps))
        }
        return r
      }
      function ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 }
      }
      function zC(e) {
        return !!e.ɵproviders
      }
      function Ia(e, t) {
        for (const n of e)
          Array.isArray(n) ? Ia(n, t) : zC(n) ? Ia(n.ɵproviders, t) : t(n)
      }
      class _f {}
      class ZC {
        resolveComponentFactory(t) {
          throw (function qC(e) {
            const t = Error(
              `No component factory found for ${K(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            )
            return (t.ngComponent = e), t
          })(t)
        }
      }
      let sr = (() => {
        class e {}
        return (e.NULL = new ZC()), e
      })()
      function KC() {
        return ar(ge(), y())
      }
      function ar(e, t) {
        return new ot(rt(e, t))
      }
      let ot = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n
          }
        }
        return (e.__NG_ELEMENT_ID__ = KC), e
      })()
      function QC(e) {
        return e instanceof ot ? e.nativeElement : e
      }
      class Df {}
      let JC = (() => {
        class e {}
        return (
          (e.ɵprov = H({ token: e, providedIn: 'root', factory: () => null })),
          e
        )
      })()
      class eo {
        constructor(t) {
          ;(this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'))
        }
      }
      const XC = new eo('14.2.0'),
        Sa = {}
      function Fa(e) {
        return e.ngOriginalError
      }
      class ur {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const n = this._findOriginalError(t)
          this._console.error('ERROR', t),
            n && this._console.error('ORIGINAL ERROR', n)
        }
        _findOriginalError(t) {
          let n = t && Fa(t)
          for (; n && Fa(n); ) n = Fa(n)
          return n || null
        }
      }
      const Oa = new Map()
      let dw = 0
      const Ra = '__ngContext__'
      function Me(e, t) {
        je(t)
          ? ((e[Ra] = t[20]),
            (function hw(e) {
              Oa.set(e[20], e)
            })(t))
          : (e[Ra] = t)
      }
      function to(e) {
        const t = e[Ra]
        return 'number' == typeof t
          ? (function If(e) {
              return Oa.get(e) || null
            })(t)
          : t || null
      }
      function Va(e) {
        const t = to(e)
        return t ? (je(t) ? t : t.lView) : null
      }
      var He = (() => (
        ((He = He || {})[(He.Important = 1)] = 'Important'),
        (He[(He.DashCase = 2)] = 'DashCase'),
        He
      ))()
      function La(e, t) {
        return undefined(e, t)
      }
      function no(e) {
        const t = e[3]
        return ht(t) ? t[3] : t
      }
      function Ba(e) {
        return Of(e[13])
      }
      function ja(e) {
        return Of(e[4])
      }
      function Of(e) {
        for (; null !== e && !ht(e); ) e = e[4]
        return e
      }
      function cr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1
          ht(r) ? (i = r) : je(r) && ((s = !0), (r = r[0]))
          const a = de(r)
          0 === e && null !== n
            ? null == o
              ? Bf(t, n, a)
              : xn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? xn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Wf(e, t, n) {
                const r = mi(e, t)
                r &&
                  (function jw(e, t, n, r) {
                    e.removeChild(t, n, r)
                  })(e, r, t, n)
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Uw(e, t, n, r, o) {
                const i = n[7]
                i !== de(n) && cr(t, e, r, i, o)
                for (let a = 10; a < n.length; a++) {
                  const u = n[a]
                  ro(u[1], u, e, t, r, i)
                }
              })(t, e, i, n, o)
        }
      }
      function $a(e, t, n) {
        return e.createElement(t, n)
      }
      function Rf(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3]
        512 & t[2] && ((t[2] &= -513), zs(o, -1)), n.splice(r, 1)
      }
      function Ua(e, t) {
        if (e.length <= 10) return
        const n = 10 + t,
          r = e[n]
        if (r) {
          const o = r[17]
          null !== o && o !== e && Rf(o, r), t > 0 && (e[n - 1][4] = r[4])
          const i = oi(e, 10 + t)
          !(function Fw(e, t) {
            ro(e, t, t[L], 2, null, null), (t[0] = null), (t[6] = null)
          })(r[1], r)
          const s = i[19]
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65)
        }
        return r
      }
      function Vf(e, t) {
        if (!(128 & t[2])) {
          const n = t[L]
          n.destroyNode && ro(e, t, n, 3, null, null),
            (function Rw(e) {
              let t = e[13]
              if (!t) return Ga(e[1], e)
              for (; t; ) {
                let n = null
                if (je(t)) n = t[13]
                else {
                  const r = t[10]
                  r && (n = r)
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    je(t) && Ga(t[1], t), (t = t[3])
                  null === t && (t = e), je(t) && Ga(t[1], t), (n = t && t[4])
                }
                t = n
              }
            })(t)
        }
      }
      function Ga(e, t) {
        if (!(128 & t[2])) {
          ;(t[2] &= -65),
            (t[2] |= 128),
            (function Bw(e, t) {
              let n
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]]
                  if (!(o instanceof Br)) {
                    const i = n[r + 1]
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1]
                        try {
                          u.call(a)
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o)
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Lw(e, t) {
              const n = e.cleanup,
                r = t[7]
              let o = -1
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const s = n[i + 1],
                      a = 'function' == typeof s ? s(t) : de(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3]
                    'boolean' == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2)
                  } else {
                    const s = r[(o = n[i + 1])]
                    n[i].call(s)
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])()
                t[7] = null
              }
            })(e, t),
            1 === t[1].type && t[L].destroy()
          const n = t[17]
          if (null !== n && ht(t[3])) {
            n !== t[3] && Rf(n, t)
            const r = t[19]
            null !== r && r.detachView(e)
          }
          !(function pw(e) {
            Oa.delete(e[20])
          })(t)
        }
      }
      function kf(e, t, n) {
        return (function Lf(e, t, n) {
          let r = t
          for (; null !== r && 40 & r.type; ) r = (t = r).parent
          if (null === r) return n[0]
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation
            if (o === St.None || o === St.Emulated) return null
          }
          return rt(r, n)
        })(e, t.parent, n)
      }
      function xn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o)
      }
      function Bf(e, t, n) {
        e.appendChild(t, n)
      }
      function jf(e, t, n, r, o) {
        null !== r ? xn(e, t, n, r, o) : Bf(e, t, n)
      }
      function mi(e, t) {
        return e.parentNode(t)
      }
      let Uf = function $f(e, t, n) {
        return 40 & e.type ? rt(e, n) : null
      }
      function yi(e, t, n, r) {
        const o = kf(e, r, t),
          i = t[L],
          a = (function Hf(e, t, n) {
            return Uf(e, t, n)
          })(r.parent || t[6], r, t)
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) jf(i, o, n[u], a, !1)
          else jf(i, o, n, a, !1)
      }
      function _i(e, t) {
        if (null !== t) {
          const n = t.type
          if (3 & n) return rt(t, e)
          if (4 & n) return Wa(-1, e[t.index])
          if (8 & n) {
            const r = t.child
            if (null !== r) return _i(e, r)
            {
              const o = e[t.index]
              return ht(o) ? Wa(-1, o) : de(o)
            }
          }
          if (32 & n) return La(t, e)() || de(e[t.index])
          {
            const r = zf(e, t)
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : _i(no(e[16]), r)
              : _i(e, t.next)
          }
        }
        return null
      }
      function zf(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null
      }
      function Wa(e, t) {
        const n = 10 + e + 1
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild
          if (null !== o) return _i(r, o)
        }
        return t[7]
      }
      function qa(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type
          if (
            (s && 0 === t && (a && Me(de(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) qa(e, t, n.child, r, o, i, !1), cr(t, e, o, a, i)
            else if (32 & u) {
              const l = La(n, r)
              let c
              for (; (c = l()); ) cr(t, e, o, c, i)
              cr(t, e, o, a, i)
            } else 16 & u ? qf(e, t, r, n, o, i) : cr(t, e, o, a, i)
          n = s ? n.projectionNext : n.next
        }
      }
      function ro(e, t, n, r, o, i) {
        qa(n, r, e.firstChild, t, o, i, !1)
      }
      function qf(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection]
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) cr(t, e, o, u[l], i)
        else qa(e, t, u, s[3], o, i, !0)
      }
      function Zf(e, t, n) {
        e.setAttribute(t, 'style', n)
      }
      function Za(e, t, n) {
        '' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n)
      }
      function Kf(e, t, n) {
        let r = e.length
        for (;;) {
          const o = e.indexOf(t, n)
          if (-1 === o) return o
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
          }
          n = o + 1
        }
      }
      const Qf = 'ng-template'
      function zw(e, t, n) {
        let r = 0
        for (; r < e.length; ) {
          let o = e[r++]
          if (n && 'class' === o) {
            if (((o = e[r]), -1 !== Kf(o.toLowerCase(), t, 0))) return !0
          } else if (1 === o) {
            for (; r < e.length && 'string' == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0
            return !1
          }
        }
        return !1
      }
      function Yf(e) {
        return 4 === e.type && e.value !== Qf
      }
      function Ww(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Qf)
      }
      function qw(e, t, n) {
        let r = 4
        const o = e.attrs || [],
          i = (function Qw(e) {
            for (let t = 0; t < e.length; t++) if (Cd(e[t])) return t
            return e.length
          })(o)
        let s = !1
        for (let a = 0; a < t.length; a++) {
          const u = t[a]
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !Ww(e, u, n)) || ('' === u && 1 === t.length))
                ) {
                  if (gt(r)) return !1
                  s = !0
                }
              } else {
                const l = 8 & r ? u : t[++a]
                if (8 & r && null !== e.attrs) {
                  if (!zw(e.attrs, l, n)) {
                    if (gt(r)) return !1
                    s = !0
                  }
                  continue
                }
                const d = Zw(8 & r ? 'class' : u, o, Yf(e), n)
                if (-1 === d) {
                  if (gt(r)) return !1
                  s = !0
                  continue
                }
                if ('' !== l) {
                  let f
                  f = d > i ? '' : o[d + 1].toLowerCase()
                  const h = 8 & r ? f : null
                  if ((h && -1 !== Kf(h, l, 0)) || (2 & r && l !== f)) {
                    if (gt(r)) return !1
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !gt(r) && !gt(u)) return !1
            if (s && gt(u)) continue
            ;(s = !1), (r = u | (1 & r))
          }
        }
        return gt(r) || s
      }
      function gt(e) {
        return 0 == (1 & e)
      }
      function Zw(e, t, n, r) {
        if (null === t) return -1
        let o = 0
        if (r || !n) {
          let i = !1
          for (; o < t.length; ) {
            const s = t[o]
            if (s === e) return o
            if (3 === s || 6 === s) i = !0
            else {
              if (1 === s || 2 === s) {
                let a = t[++o]
                for (; 'string' == typeof a; ) a = t[++o]
                continue
              }
              if (4 === s) break
              if (0 === s) {
                o += 4
                continue
              }
            }
            o += i ? 1 : 2
          }
          return -1
        }
        return (function Yw(e, t) {
          let n = e.indexOf(4)
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n]
              if ('number' == typeof r) return -1
              if (r === t) return n
              n++
            }
          return -1
        })(t, e)
      }
      function Jf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (qw(e, t[r], n)) return !0
        return !1
      }
      function Xf(e, t) {
        return e ? ':not(' + t.trim() + ')' : t
      }
      function Xw(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = '',
          i = !1
        for (; n < e.length; ) {
          let s = e[n]
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++n]
              o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s)
          else
            '' !== o && !gt(s) && ((t += Xf(i, o)), (o = '')),
              (r = s),
              (i = i || !gt(r))
          n++
        }
        return '' !== o && (t += Xf(i, o)), t
      }
      const P = {}
      function $e(e) {
        eh($(), y(), Oe() + e, !1)
      }
      function eh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks
            null !== i && Qo(t, i, n)
          } else {
            const i = e.preOrderHooks
            null !== i && Yo(t, i, 0, n)
          }
        ln(n)
      }
      function oh(e, t = null, n = null, r) {
        const o = (function ih(e, t = null, n = null, r, o = new Set()) {
          const i = [n || G, VC(e)]
          return (
            (r = r || ('object' == typeof e ? void 0 : K(e))),
            new mf(i, t || gi(), r || null, o)
          )
        })(e, t, n, r)
        return o.resolveInjectorInitializers(), o
      }
      let mt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return oh({ name: '' }, r, n, '')
            {
              const o = n.name ?? ''
              return oh({ name: o }, n.parent, n.providers, o)
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Wr),
          (e.NULL = new df()),
          (e.ɵprov = H({ token: e, providedIn: 'any', factory: () => V(lf) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        )
      })()
      function D(e, t = T.Default) {
        const n = y()
        return null === n ? V(e, t) : Td(ge(), n, A(e), t)
      }
      function Di(e, t) {
        return (e << 17) | (t << 2)
      }
      function yt(e) {
        return (e >> 17) & 32767
      }
      function Xa(e) {
        return 2 | e
      }
      function Zt(e) {
        return (131068 & e) >> 2
      }
      function eu(e, t) {
        return (-131069 & e) | (t << 2)
      }
      function tu(e) {
        return 1 | e
      }
      function wh(e, t) {
        const n = e.contentQueries
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1]
            if (-1 !== i) {
              const s = e.data[i]
              Qs(o), s.contentQueries(2, t[i], i)
            }
          }
      }
      function Ei(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice()
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          ud(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[L] = a || (e && e[L])),
          (d[12] = u || (e && e[12]) || null),
          (d[9] = l || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function fw() {
            return dw++
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        )
      }
      function fr(e, t, n, r, o) {
        let i = e.data[t]
        if (null === i)
          (i = (function lu(e, t, n, r, o) {
            const i = dd(),
              s = Ws(),
              u = (e.data[t] = (function kE(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                }
              })(0, s ? i : i && i.parent, n, t, r, o))
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            )
          })(e, t, n, r, o)),
            (function lD() {
              return N.lFrame.inI18n
            })() && (i.flags |= 64)
        else if (64 & i.type) {
          ;(i.type = n), (i.value = r), (i.attrs = o)
          const s = (function Lr() {
            const e = N.lFrame,
              t = e.currentTNode
            return e.isParent ? t : t.parent
          })()
          i.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return At(i, !0), i
      }
      function hr(e, t, n, r) {
        if (0 === n) return -1
        const o = t.length
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null)
        return o
      }
      function bi(e, t, n) {
        Ys(t)
        try {
          const r = e.viewQuery
          null !== r && _u(1, r, n)
          const o = e.template
          null !== o && Eh(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && wh(e, t),
            e.staticViewQueries && _u(2, e.viewQuery, n)
          const i = e.components
          null !== i &&
            (function OE(e, t) {
              for (let n = 0; n < t.length; n++) XE(e, t[n])
            })(t, i)
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          )
        } finally {
          ;(t[2] &= -5), Js()
        }
      }
      function oo(e, t, n, r) {
        const o = t[2]
        if (128 != (128 & o)) {
          Ys(t)
          try {
            ud(t),
              (function fd(e) {
                return (N.lFrame.bindingIndex = e)
              })(e.bindingStartIndex),
              null !== n && Eh(e, t, n, 2, r)
            const s = 3 == (3 & o)
            if (s) {
              const l = e.preOrderCheckHooks
              null !== l && Qo(t, l, null)
            } else {
              const l = e.preOrderHooks
              null !== l && Yo(t, l, 0, null), Xs(t, 0)
            }
            if (
              ((function YE(e) {
                for (let t = Ba(e); null !== t; t = ja(t)) {
                  if (!t[2]) continue
                  const n = t[9]
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3]
                    0 == (512 & o[2]) && zs(i, 1), (o[2] |= 512)
                  }
                }
              })(t),
              (function QE(e) {
                for (let t = Ba(e); null !== t; t = ja(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1]
                    qo(r) && oo(o, r, o.template, r[8])
                  }
              })(t),
              null !== e.contentQueries && wh(e, t),
              s)
            ) {
              const l = e.contentCheckHooks
              null !== l && Qo(t, l)
            } else {
              const l = e.contentHooks
              null !== l && Yo(t, l, 1), Xs(t, 1)
            }
            !(function xE(e, t) {
              const n = e.hostBindingOpCodes
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r]
                    if (o < 0) ln(~o)
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r]
                      cD(s, i), a(2, t[i])
                    }
                  }
                } finally {
                  ln(-1)
                }
            })(e, t)
            const a = e.components
            null !== a &&
              (function FE(e, t) {
                for (let n = 0; n < t.length; n++) JE(e, t[n])
              })(t, a)
            const u = e.viewQuery
            if ((null !== u && _u(2, u, r), s)) {
              const l = e.viewCheckHooks
              null !== l && Qo(t, l)
            } else {
              const l = e.viewHooks
              null !== l && Yo(t, l, 2), Xs(t, 2)
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), zs(t[3], -1))
          } finally {
            Js()
          }
        }
      }
      function PE(e, t, n, r) {
        const o = t[10],
          s = ad(t)
        try {
          !s && o.begin && o.begin(), s && bi(e, t, r), oo(e, t, n, r)
        } finally {
          !s && o.end && o.end()
        }
      }
      function Eh(e, t, n, r, o) {
        const i = Oe(),
          s = 2 & r
        try {
          ln(-1), s && t.length > J && eh(e, t, J, !1), n(r, o)
        } finally {
          ln(i)
        }
      }
      function cu(e, t, n) {
        !cd() ||
          ((function $E(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd
            e.firstCreatePass || Hr(n, t), Me(r, t)
            const s = n.initialInputs
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = pt(u)
              l && qE(t, n, u)
              const c = $r(t, e, a, n)
              Me(c, t),
                null !== s && ZE(0, a - o, c, u, 0, s),
                l && (Ze(n.index, t)[8] = c)
            }
          })(e, t, n, rt(n, t)),
          128 == (128 & n.flags) &&
            (function UE(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function dD() {
                  return N.lFrame.currentDirectiveIndex
                })()
              try {
                ln(i)
                for (let a = r; a < o; a++) {
                  const u = e.data[a],
                    l = t[a]
                  Zs(a),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      xh(u, l)
                }
              } finally {
                ln(-1), Zs(s)
              }
            })(e, t, n))
      }
      function du(e, t, n = rt) {
        const r = t.localNames
        if (null !== r) {
          let o = t.index + 1
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s]
            e[o++] = a
          }
        }
      }
      function Mh(e) {
        const t = e.tView
        return null === t || t.incompleteFirstPass
          ? (e.tView = fu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t
      }
      function fu(e, t, n, r, o, i, s, a, u, l) {
        const c = J + r,
          d = c + o,
          f = (function RE(e, t) {
            const n = []
            for (let r = 0; r < t; r++) n.push(r < e ? null : P)
            return n
          })(c, d),
          h = 'function' == typeof l ? l() : l
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        })
      }
      function Ih(e, t, n, r) {
        const o = kh(t)
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && Lh(e).push(r, o.length - 1))
      }
      function Sh(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r]
            ;(n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o])
          }
        return n
      }
      function Ah(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = []
        let a = null,
          u = null
        for (let l = t.directiveStart; l < r; l++) {
          const c = o[l],
            d = c.inputs,
            f = null === i || Yf(t) ? null : KE(d, i)
          s.push(f), (a = Sh(d, l, a)), (u = Sh(c.outputs, l, u))
        }
        null !== a &&
          (a.hasOwnProperty('class') && (t.flags |= 16),
          a.hasOwnProperty('style') && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = u)
      }
      function Th(e, t) {
        const n = Ze(t, e)
        16 & n[2] || (n[2] |= 32)
      }
      function hu(e, t, n, r) {
        let o = !1
        if (cd()) {
          const i = (function GE(e, t, n) {
              const r = e.directiveRegistry
              let o = null
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i]
                  Jf(n, s.selectors, !1) &&
                    (o || (o = []),
                    ni(Hr(n, t), e, s.type),
                    pt(s) ? (Fh(e, n), o.unshift(s)) : o.push(s))
                }
              return o
            })(e, t, n),
            s = null === r ? null : { '': -1 }
          if (null !== i) {
            ;(o = !0), Oh(n, e.data.length, i.length)
            for (let c = 0; c < i.length; c++) {
              const d = i[c]
              d.providersResolver && d.providersResolver(d)
            }
            let a = !1,
              u = !1,
              l = hr(e, t, i.length, null)
            for (let c = 0; c < i.length; c++) {
              const d = i[c]
              ;(n.mergedAttrs = Xo(n.mergedAttrs, d.hostAttrs)),
                Ph(e, n, t, l, d),
                WE(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128)
              const f = d.type.prototype
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++
            }
            Ah(e, n)
          }
          s &&
            (function zE(e, t, n) {
              if (t) {
                const r = (e.localNames = [])
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]]
                  if (null == i) throw new b(-301, !1)
                  r.push(t[o], i)
                }
              }
            })(n, r, s)
        }
        return (n.mergedAttrs = Xo(n.mergedAttrs, n.attrs)), o
      }
      function Nh(e, t, n, r, o, i) {
        const s = i.hostBindings
        if (s) {
          let a = e.hostBindingOpCodes
          null === a && (a = e.hostBindingOpCodes = [])
          const u = ~t.index
          ;(function HE(e) {
            let t = e.length
            for (; t > 0; ) {
              const n = e[--t]
              if ('number' == typeof n && n < 0) return n
            }
            return 0
          })(a) != u && a.push(u),
            a.push(r, o, s)
        }
      }
      function xh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t)
      }
      function Fh(e, t) {
        ;(t.flags |= 2), (e.components || (e.components = [])).push(t.index)
      }
      function WE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e
          pt(t) && (n[''] = e)
        }
      }
      function Oh(e, t, n) {
        ;(e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t)
      }
      function Ph(e, t, n, r, o) {
        e.data[r] = o
        const i = o.factory || (o.factory = Sn(o.type)),
          s = new Br(i, pt(o), D)
        ;(e.blueprint[r] = s),
          (n[r] = s),
          Nh(e, t, 0, r, hr(e, n, o.hostVars, P), o)
      }
      function qE(e, t, n) {
        const r = rt(t, e),
          o = Mh(n),
          i = e[10],
          s = Mi(
            e,
            Ei(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          )
        e[t.index] = s
      }
      function ZE(e, t, n, r, o, i) {
        const s = i[t]
        if (null !== s) {
          const a = r.setInput
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++]
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d)
          }
        }
      }
      function KE(e, t) {
        let n = null,
          r = 0
        for (; r < t.length; ) {
          const o = t[r]
          if (0 !== o)
            if (5 !== o) {
              if ('number' == typeof o) break
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2)
            } else r += 2
          else r += 4
        }
        return n
      }
      function Rh(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null)
      }
      function JE(e, t) {
        const n = Ze(t, e)
        if (qo(n)) {
          const r = n[1]
          48 & n[2] ? oo(r, n, r.template, n[8]) : n[5] > 0 && gu(n)
        }
      }
      function gu(e) {
        for (let r = Ba(e); null !== r; r = ja(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o]
            if (qo(i))
              if (512 & i[2]) {
                const s = i[1]
                oo(s, i, s.template, i[8])
              } else i[5] > 0 && gu(i)
          }
        const n = e[1].components
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ze(n[r], e)
            qo(o) && o[5] > 0 && gu(o)
          }
      }
      function XE(e, t) {
        const n = Ze(t, e),
          r = n[1]
        ;(function eb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n])
        })(r, n),
          bi(r, n, n[8])
      }
      function Mi(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t
      }
      function mu(e) {
        for (; e; ) {
          e[2] |= 32
          const t = no(e)
          if (Uv(e) && !t) return e
          e = t
        }
        return null
      }
      function _u(e, t, n) {
        Qs(0), t(e, n)
      }
      function kh(e) {
        return e[7] || (e[7] = [])
      }
      function Lh(e) {
        return e.cleanup || (e.cleanup = [])
      }
      function jh(e, t) {
        const n = e[9],
          r = n ? n.get(ur, null) : null
        r && r.handleError(t)
      }
      function vu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s]
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o)
        }
      }
      function Ii(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s]
            'number' == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ns(o, a))
              : 2 == i && (r = Ns(r, a + ': ' + t[++s] + ';'))
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o)
      }
      function Si(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index]
          if ((null !== i && r.push(de(i)), ht(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild
              null !== l && Si(u[1], u, l, r)
            }
          const s = n.type
          if (8 & s) Si(e, t, n.child, r)
          else if (32 & s) {
            const a = La(n, t)
            let u
            for (; (u = a()); ) r.push(u)
          } else if (16 & s) {
            const a = zf(t, n)
            if (Array.isArray(a)) r.push(...a)
            else {
              const u = no(t[16])
              Si(u[1], u, a, r, !0)
            }
          }
          n = o ? n.projectionNext : n.next
        }
        return r
      }
      class io {
        constructor(t, n) {
          ;(this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1]
          return Si(n, t, n.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(t) {
          this._lView[8] = t
        }
        get destroyed() {
          return 128 == (128 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const t = this._lView[3]
            if (ht(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1
              r > -1 && (Ua(t, r), oi(n, r))
            }
            this._attachedToViewContainer = !1
          }
          Vf(this._lView[1], this._lView)
        }
        onDestroy(t) {
          Ih(this._lView[1], this._lView, null, t)
        }
        markForCheck() {
          mu(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -65
        }
        reattach() {
          this._lView[2] |= 64
        }
        detectChanges() {
          !(function yu(e, t, n) {
            const r = t[10]
            r.begin && r.begin()
            try {
              oo(e, t, e.template, n)
            } catch (o) {
              throw (jh(t, o), o)
            } finally {
              r.end && r.end()
            }
          })(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new b(902, !1)
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          ;(this._appRef = null),
            (function Pw(e, t) {
              ro(e, t, t[L], 2, null, null)
            })(this._lView[1], this._lView)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new b(902, !1)
          this._appRef = t
        }
      }
      class nb extends io {
        constructor(t) {
          super(t), (this._view = t)
        }
        detectChanges() {
          !(function Vh(e) {
            !(function tb(e) {
              for (let t = 0; t < e.components.length; t++) {
                const n = e.components[t],
                  r = Va(n)
                if (null !== r) {
                  const o = r[1]
                  PE(o, r, o.template, n)
                }
              }
            })(e[8])
          })(this._view)
        }
        checkNoChanges() {}
        get context() {
          return null
        }
      }
      class Du extends sr {
        constructor(t) {
          super(), (this.ngModule = t)
        }
        resolveComponentFactory(t) {
          const n = W(t)
          return new so(n, this.ngModule)
        }
      }
      function Hh(e) {
        const t = []
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n })
        return t
      }
      class ob {
        constructor(t, n) {
          ;(this.injector = t), (this.parentInjector = n)
        }
        get(t, n, r) {
          const o = this.injector.get(t, Sa, r)
          return o !== Sa || n === Sa ? o : this.parentInjector.get(t, n, r)
        }
      }
      class so extends _f {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function eE(e) {
              return e.map(Xw).join(',')
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n)
        }
        get inputs() {
          return Hh(this.componentDef.inputs)
        }
        get outputs() {
          return Hh(this.componentDef.outputs)
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof or ? o : o?.injector
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i)
          const s = i ? new ob(t, i) : t,
            a = s.get(Df, null)
          if (null === a) throw new b(407, !1)
          const u = s.get(JC, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || 'div',
            d = r
              ? (function VE(e, t, n) {
                  return e.selectRootElement(t, n === St.ShadowDom)
                })(l, r, this.componentDef.encapsulation)
              : $a(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function rb(e) {
                    const t = e.toLowerCase()
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = { components: [] },
            p = fu(0, null, null, 1, 0, null, null, null, null, null),
            g = Ei(null, p, h, f, null, null, a, l, u, s, null)
          let v, _
          Ys(g)
          try {
            const E = (function ab(e, t, n, r, o, i) {
              const s = n[1]
              n[22] = e
              const u = fr(s, 22, 2, '#host', null),
                l = (u.mergedAttrs = t.hostAttrs)
              null !== l &&
                (Ii(u, l, !0),
                null !== e &&
                  (Jo(o, e, l),
                  null !== u.classes && Za(o, e, u.classes),
                  null !== u.styles && Zf(o, e, u.styles)))
              const c = r.createRenderer(e, t),
                d = Ei(
                  n,
                  Mh(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  u,
                  r,
                  c,
                  i || null,
                  null,
                  null
                )
              return (
                s.firstCreatePass &&
                  (ni(Hr(u, n), s, t.type), Fh(s, u), Oh(u, n.length, 1)),
                Mi(n, d),
                (n[22] = d)
              )
            })(d, this.componentDef, g, a, l)
            if (d)
              if (r) Jo(l, d, ['ng-version', XC.full])
              else {
                const { attrs: m, classes: M } = (function tE(e) {
                  const t = [],
                    n = []
                  let r = 1,
                    o = 2
                  for (; r < e.length; ) {
                    let i = e[r]
                    if ('string' == typeof i)
                      2 === o
                        ? '' !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i)
                    else {
                      if (!gt(o)) break
                      o = i
                    }
                    r++
                  }
                  return { attrs: t, classes: n }
                })(this.componentDef.selectors[0])
                m && Jo(l, d, m), M && M.length > 0 && Za(l, d, M.join(' '))
              }
            if (((_ = Gs(p, J)), void 0 !== n)) {
              const m = (_.projection = [])
              for (let M = 0; M < this.ngContentSelectors.length; M++) {
                const B = n[M]
                m.push(null != B ? Array.from(B) : null)
              }
            }
            ;(v = (function ub(e, t, n, r, o) {
              const i = n[1],
                s = (function jE(e, t, n) {
                  const r = ge()
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Ph(e, r, t, hr(e, t, 1, null), n),
                    Ah(e, r))
                  const o = $r(t, e, r.directiveStart, r)
                  Me(o, t)
                  const i = rt(r, t)
                  return i && Me(i, t), o
                })(i, n, t)
              if ((r.components.push(s), (e[8] = s), null !== o))
                for (const u of o) u(s, t)
              if (t.contentQueries) {
                const u = ge()
                t.contentQueries(1, s, u.directiveStart)
              }
              const a = ge()
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (ln(a.index),
                  Nh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  xh(t, s)),
                s
              )
            })(E, this.componentDef, g, h, [cb])),
              bi(p, g, null)
          } finally {
            Js()
          }
          return new sb(this.componentType, v, ar(_, g), g, _)
        }
      }
      class sb extends class WC {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new nb(o)),
            (this.componentType = t)
        }
        setInput(t, n) {
          const r = this._tNode.inputs
          let o
          if (null !== r && (o = r[t])) {
            const i = this._rootLView
            vu(i[1], i, o, t, n), Th(i, this._tNode.index)
          }
        }
        get injector() {
          return new Kn(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      function cb() {
        const e = ge()
        Ko(y()[1], e)
      }
      let Ai = null
      function Fn() {
        if (!Ai) {
          const e = Q.Symbol
          if (e && e.iterator) Ai = e.iterator
          else {
            const t = Object.getOwnPropertyNames(Map.prototype)
            for (let n = 0; n < t.length; ++n) {
              const r = t[n]
              'entries' !== r &&
                'size' !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Ai = r)
            }
          }
        }
        return Ai
      }
      function Ie(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0)
      }
      function gr(e, t, n, r) {
        return Ie(e, Wn(), n) ? t + F(n) + r : P
      }
      function _t(e, t, n, r, o, i, s, a) {
        const u = y(),
          l = $(),
          c = e + J,
          d = l.firstCreatePass
            ? (function wb(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = fr(t, e, 4, s || null, un(l, a))
                hu(t, n, c, un(l, u)), Ko(t, c)
                const d = (c.tViews = fu(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ))
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                )
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c]
        At(d, !1)
        const f = u[L].createComment('')
        yi(l, u, f, d),
          Me(f, u),
          Mi(u, (u[c] = Rh(f, u, f, d))),
          zo(d) && cu(l, u, d),
          null != s && du(u, d, a)
      }
      function Xe(e, t, n) {
        const r = y()
        return (
          Ie(r, Wn(), t) &&
            (function Je(e, t, n, r, o, i, s, a) {
              const u = rt(t, n)
              let c,
                l = t.inputs
              !a && null != l && (c = l[r])
                ? (vu(e, n, c, r, o), Go(t) && Th(n, t.index))
                : 3 & t.type &&
                  ((r = (function LE(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e
                  })(r)),
                  (o = null != s ? s(o, t.value || '', r) : o),
                  i.setProperty(u, r, o))
            })(
              $(),
              (function ae() {
                const e = N.lFrame
                return Gs(e.tView, e.selectedIndex)
              })(),
              r,
              e,
              t,
              r[L],
              n,
              !1
            ),
          Xe
        )
      }
      function Eu(e, t, n, r, o) {
        const s = o ? 'class' : 'style'
        vu(e, n, t.inputs[s], s, r)
      }
      function ie(e, t, n, r) {
        const o = y(),
          i = $(),
          s = J + e,
          a = o[L],
          u = (o[s] = $a(
            a,
            t,
            (function _D() {
              return N.lFrame.currentNamespace
            })()
          )),
          l = i.firstCreatePass
            ? (function Mb(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = fr(t, e, 2, o, un(a, i))
                return (
                  hu(t, n, l, un(a, s)),
                  null !== l.attrs && Ii(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ii(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                )
              })(s, i, o, 0, t, n, r)
            : i.data[s]
        At(l, !0)
        const c = l.mergedAttrs
        null !== c && Jo(a, u, c)
        const d = l.classes
        null !== d && Za(a, u, d)
        const f = l.styles
        return (
          null !== f && Zf(a, u, f),
          64 != (64 & l.flags) && yi(i, o, u, l),
          0 ===
            (function tD() {
              return N.lFrame.elementDepthCount
            })() && Me(u, o),
          (function nD() {
            N.lFrame.elementDepthCount++
          })(),
          zo(l) &&
            (cu(i, o, l),
            (function bh(e, t, n) {
              if (Bs(t)) {
                const o = t.directiveEnd
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i]
                  s.contentQueries && s.contentQueries(1, n[i], i)
                }
              }
            })(i, l, o)),
          null !== r && du(o, l),
          ie
        )
      }
      function Re() {
        let e = ge()
        Ws()
          ? (function qs() {
              N.lFrame.isParent = !1
            })()
          : ((e = e.parent), At(e, !1))
        const t = e
        !(function rD() {
          N.lFrame.elementDepthCount--
        })()
        const n = $()
        return (
          n.firstCreatePass && (Ko(n, e), Bs(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function ED(e) {
              return 0 != (16 & e.flags)
            })(t) &&
            Eu(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function bD(e) {
              return 0 != (32 & e.flags)
            })(t) &&
            Eu(n, t, y(), t.stylesWithoutHost, !1),
          Re
        )
      }
      function st(e, t, n, r) {
        return ie(e, t, n, r), Re(), st
      }
      function Ni(e) {
        return !!e && 'function' == typeof e.then
      }
      const ep = function Xh(e) {
        return !!e && 'function' == typeof e.subscribe
      }
      function at(e, t, n, r) {
        const o = y(),
          i = $(),
          s = ge()
        return (
          (function np(e, t, n, r, o, i, s, a) {
            const u = zo(r),
              c = e.firstCreatePass && Lh(e),
              d = t[8],
              f = kh(t)
            let h = !0
            if (3 & r.type || a) {
              const v = rt(r, t),
                _ = a ? a(v) : v,
                E = f.length,
                m = a ? (B) => a(de(B[r.index])) : r.index
              let M = null
              if (
                (!a &&
                  u &&
                  (M = (function Ab(e, t, n, r) {
                    const o = e.cleanup
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i]
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            u = o[i + 2]
                          return a.length > u ? a[u] : null
                        }
                        'string' == typeof s && (i += 2)
                      }
                    return null
                  })(e, t, o, r.index)),
                null !== M)
              )
                ((M.__ngLastListenerFn__ || M).__ngNextListenerFn__ = i),
                  (M.__ngLastListenerFn__ = i),
                  (h = !1)
              else {
                i = op(r, t, d, i, !1)
                const B = n.listen(_, o, i)
                f.push(i, B), c && c.push(o, m, E, E + 1)
              }
            } else i = op(r, t, d, i, !1)
            const p = r.outputs
            let g
            if (h && null !== p && (g = p[o])) {
              const v = g.length
              if (v)
                for (let _ = 0; _ < v; _ += 2) {
                  const ne = t[g[_]][g[_ + 1]].subscribe(i),
                    Bn = f.length
                  f.push(i, ne), c && c.push(o, r.index, Bn, -(Bn + 1))
                }
            }
          })(i, o, o[L], s, e, t, 0, r),
          at
        )
      }
      function rp(e, t, n, r) {
        try {
          return !1 !== n(r)
        } catch (o) {
          return jh(e, o), !1
        }
      }
      function op(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r
          mu(2 & e.flags ? Ze(e.index, t) : t)
          let u = rp(t, 0, r, s),
            l = i.__ngNextListenerFn__
          for (; l; ) (u = rp(t, 0, l, s) && u), (l = l.__ngNextListenerFn__)
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u
        }
      }
      function vt(e = 1) {
        return (function hD(e) {
          return (N.lFrame.contextLView = (function pD(e, t) {
            for (; e > 0; ) (t = t[15]), e--
            return t
          })(e, N.lFrame.contextLView))[8]
        })(e)
      }
      function pp(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t
        let a = r ? yt(i) : Zt(i),
          u = !1
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1]
          Pb(e[a], t) && ((u = !0), (e[a + 1] = r ? tu(c) : Xa(c))),
            (a = r ? yt(c) : Zt(c))
        }
        u && (e[n + 1] = r ? Xa(i) : tu(i))
      }
      function Pb(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || 'string' != typeof t) && er(e, t) >= 0)
        )
      }
      const ye = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 }
      function gp(e) {
        return e.substring(ye.key, ye.keyEnd)
      }
      function Rb(e) {
        return e.substring(ye.value, ye.valueEnd)
      }
      function mp(e, t) {
        const n = ye.textEnd
        return n === t
          ? -1
          : ((t = ye.keyEnd =
              (function Lb(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++
                return t
              })(e, (ye.key = t), n)),
            Er(e, t, n))
      }
      function yp(e, t) {
        const n = ye.textEnd
        let r = (ye.key = Er(e, t, n))
        return n === r
          ? -1
          : ((r = ye.keyEnd =
              (function Bb(e, t, n) {
                let r
                for (
                  ;
                  t < n &&
                  (45 === (r = e.charCodeAt(t)) ||
                    95 === r ||
                    ((-33 & r) >= 65 && (-33 & r) <= 90) ||
                    (r >= 48 && r <= 57));

                )
                  t++
                return t
              })(e, r, n)),
            (r = vp(e, r, n)),
            (r = ye.value = Er(e, r, n)),
            (r = ye.valueEnd =
              (function jb(e, t, n) {
                let r = -1,
                  o = -1,
                  i = -1,
                  s = t,
                  a = s
                for (; s < n; ) {
                  const u = e.charCodeAt(s++)
                  if (59 === u) return a
                  34 === u || 39 === u
                    ? (a = s = Dp(e, u, s, n))
                    : t === s - 4 &&
                      85 === i &&
                      82 === o &&
                      76 === r &&
                      40 === u
                    ? (a = s = Dp(e, 41, s, n))
                    : u > 32 && (a = s),
                    (i = o),
                    (o = r),
                    (r = -33 & u)
                }
                return a
              })(e, r, n)),
            vp(e, r, n))
      }
      function _p(e) {
        ;(ye.key = 0),
          (ye.keyEnd = 0),
          (ye.value = 0),
          (ye.valueEnd = 0),
          (ye.textEnd = e.length)
      }
      function Er(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++
        return t
      }
      function vp(e, t, n, r) {
        return (t = Er(e, t, n)) < n && t++, t
      }
      function Dp(e, t, n, r) {
        let o = -1,
          i = n
        for (; i < r; ) {
          const s = e.charCodeAt(i++)
          if (s == t && 92 !== o) return i
          o = 92 == s && 92 === o ? 0 : s
        }
        throw new Error()
      }
      function Hb(e, t) {
        for (
          let n = (function kb(e) {
            return _p(e), yp(e, Er(e, 0, ye.textEnd))
          })(t);
          n >= 0;
          n = yp(t, n)
        )
          bp(e, gp(t), Rb(t))
      }
      function Vt(e, t) {
        for (
          let n = (function Vb(e) {
            return _p(e), mp(e, Er(e, 0, ye.textEnd))
          })(t);
          n >= 0;
          n = mp(t, n)
        )
          Qe(e, gp(t), !0)
      }
      function Ct(e, t, n, r) {
        const o = $(),
          i = (function zt(e) {
            const t = N.lFrame,
              n = t.bindingIndex
            return (t.bindingIndex = t.bindingIndex + e), n
          })(2)
        o.firstUpdatePass &&
          (function Ep(e, t, n, r) {
            const o = e.data
            if (null === o[n + 1]) {
              const i = o[Oe()],
                s = wp(e, n)
              Sp(i, r) && null === t && !s && (t = !1),
                (t = (function Ub(e, t, n, r) {
                  const o = (function Ks(e) {
                    const t = N.lFrame.currentDirectiveIndex
                    return -1 === t ? null : e[t]
                  })(e)
                  let i = r ? t.residualClasses : t.residualStyles
                  if (null === o)
                    0 === (r ? t.classBindings : t.styleBindings) &&
                      ((n = lo((n = Su(null, e, t, n, r)), t.attrs, r)),
                      (i = null))
                  else {
                    const s = t.directiveStylingLast
                    if (-1 === s || e[s] !== o)
                      if (((n = Su(o, e, t, n, r)), null === i)) {
                        let u = (function Gb(e, t, n) {
                          const r = n ? t.classBindings : t.styleBindings
                          if (0 !== Zt(r)) return e[yt(r)]
                        })(e, t, r)
                        void 0 !== u &&
                          Array.isArray(u) &&
                          ((u = Su(null, e, t, u[1], r)),
                          (u = lo(u, t.attrs, r)),
                          (function zb(e, t, n, r) {
                            e[yt(n ? t.classBindings : t.styleBindings)] = r
                          })(e, t, r, u))
                      } else
                        i = (function Wb(e, t, n) {
                          let r
                          const o = t.directiveEnd
                          for (let i = 1 + t.directiveStylingLast; i < o; i++)
                            r = lo(r, e[i].hostAttrs, n)
                          return lo(r, t.attrs, n)
                        })(e, t, r)
                  }
                  return (
                    void 0 !== i &&
                      (r ? (t.residualClasses = i) : (t.residualStyles = i)),
                    n
                  )
                })(o, i, t, r)),
                (function Fb(e, t, n, r, o, i) {
                  let s = i ? t.classBindings : t.styleBindings,
                    a = yt(s),
                    u = Zt(s)
                  e[r] = n
                  let c,
                    l = !1
                  if (Array.isArray(n)) {
                    const d = n
                    ;(c = d[1]), (null === c || er(d, c) > 0) && (l = !0)
                  } else c = n
                  if (o)
                    if (0 !== u) {
                      const f = yt(e[a + 1])
                      ;(e[r + 1] = Di(f, a)),
                        0 !== f && (e[f + 1] = eu(e[f + 1], r)),
                        (e[a + 1] = (function CE(e, t) {
                          return (131071 & e) | (t << 17)
                        })(e[a + 1], r))
                    } else
                      (e[r + 1] = Di(a, 0)),
                        0 !== a && (e[a + 1] = eu(e[a + 1], r)),
                        (a = r)
                  else
                    (e[r + 1] = Di(u, 0)),
                      0 === a ? (a = r) : (e[u + 1] = eu(e[u + 1], r)),
                      (u = r)
                  l && (e[r + 1] = Xa(e[r + 1])),
                    pp(e, c, r, !0),
                    pp(e, c, r, !1),
                    (function Ob(e, t, n, r, o) {
                      const i = o ? e.residualClasses : e.residualStyles
                      null != i &&
                        'string' == typeof t &&
                        er(i, t) >= 0 &&
                        (n[r + 1] = tu(n[r + 1]))
                    })(t, c, e, r, i),
                    (s = Di(a, u)),
                    i ? (t.classBindings = s) : (t.styleBindings = s)
                })(o, i, t, n, s, r)
            }
          })(o, null, i, r)
        const s = y()
        if (n !== P && Ie(s, i, n)) {
          const a = o.data[Oe()]
          if (Sp(a, r) && !wp(o, i)) {
            let u = r ? a.classesWithoutHost : a.stylesWithoutHost
            null !== u && (n = Ns(u, n || '')), Eu(o, a, s, n, r)
          } else
            !(function Zb(e, t, n, r, o, i, s, a) {
              o === P && (o = G)
              let u = 0,
                l = 0,
                c = 0 < o.length ? o[0] : null,
                d = 0 < i.length ? i[0] : null
              for (; null !== c || null !== d; ) {
                const f = u < o.length ? o[u + 1] : void 0,
                  h = l < i.length ? i[l + 1] : void 0
                let g,
                  p = null
                c === d
                  ? ((u += 2), (l += 2), f !== h && ((p = d), (g = h)))
                  : null === d || (null !== c && c < d)
                  ? ((u += 2), (p = c))
                  : ((l += 2), (p = d), (g = h)),
                  null !== p && Mp(e, t, n, r, p, g, s, a),
                  (c = u < o.length ? o[u] : null),
                  (d = l < i.length ? i[l] : null)
              }
            })(
              o,
              a,
              s,
              s[L],
              s[i + 1],
              (s[i + 1] = (function qb(e, t, n) {
                if (null == n || '' === n) return G
                const r = [],
                  o = Ye(n)
                if (Array.isArray(o))
                  for (let i = 0; i < o.length; i++) e(r, o[i], !0)
                else if ('object' == typeof o)
                  for (const i in o) o.hasOwnProperty(i) && e(r, i, o[i])
                else 'string' == typeof o && t(r, o)
                return r
              })(e, t, n)),
              r,
              i
            )
        }
      }
      function wp(e, t) {
        return t >= e.expandoStartIndex
      }
      function Su(e, t, n, r, o) {
        let i = null
        const s = n.directiveEnd
        let a = n.directiveStylingLast
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = lo(r, i.hostAttrs, o)), i !== e);

        )
          a++
        return null !== e && (n.directiveStylingLast = a), r
      }
      function lo(e, t, n) {
        const r = n ? 1 : 2
        let o = -1
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i]
            'number' == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]),
                Qe(e, s, !!n || t[++i]))
          }
        return void 0 === e ? null : e
      }
      function bp(e, t, n) {
        Qe(e, t, Ye(n))
      }
      function Mp(e, t, n, r, o, i, s, a) {
        if (!(3 & t.type)) return
        const u = e.data,
          l = u[a + 1]
        Fi(
          (function ph(e) {
            return 1 == (1 & e)
          })(l)
            ? Ip(u, t, n, o, Zt(l), s)
            : void 0
        ) ||
          (Fi(i) ||
            ((function hh(e) {
              return 2 == (2 & e)
            })(l) &&
              (i = Ip(u, null, n, o, a, s))),
          (function Gw(e, t, n, r, o) {
            if (t) o ? e.addClass(n, r) : e.removeClass(n, r)
            else {
              let i = -1 === r.indexOf('-') ? void 0 : He.DashCase
              null == o
                ? e.removeStyle(n, r, i)
                : ('string' == typeof o &&
                    o.endsWith('!important') &&
                    ((o = o.slice(0, -10)), (i |= He.Important)),
                  e.setStyle(n, r, o, i))
            }
          })(
            r,
            s,
            (function Wo(e, t) {
              return de(t[e])
            })(Oe(), n),
            o,
            i
          ))
      }
      function Ip(e, t, n, r, o, i) {
        const s = null === t
        let a
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c
          let f = n[o + 1]
          f === P && (f = d ? G : void 0)
          let h = d ? ua(f, r) : c === r ? f : void 0
          if ((l && !Fi(h) && (h = ua(u, r)), Fi(h) && ((a = h), s))) return a
          const p = e[o + 1]
          o = s ? yt(p) : Zt(p)
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles
          null != u && (a = ua(u, r))
        }
        return a
      }
      function Fi(e) {
        return void 0 !== e
      }
      function Sp(e, t) {
        return 0 != (e.flags & (t ? 16 : 32))
      }
      function wt(e, t, n) {
        !(function Rt(e) {
          Ct(bp, Hb, e, !1)
        })(gr(y(), e, t, n))
      }
      const Mr = 'en-US'
      let Yp = Mr
      function xu(e, t, n, r, o) {
        if (((e = A(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) xu(e[i], t, n, r, o)
        else {
          const i = $(),
            s = y()
          let a = Tn(e) ? e : A(e.provide),
            u = yf(e)
          const l = ge(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20
          if (Tn(e) || !e.multi) {
            const h = new Br(u, o, D),
              p = Ou(a, t, o ? c : c + f, d)
            ;-1 === p
              ? (ni(Hr(l, s), i, a),
                Fu(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h))
          } else {
            const h = Ou(a, t, c + f, d),
              p = Ou(a, t, c, c + f),
              g = h >= 0 && n[h],
              v = p >= 0 && n[p]
            if ((o && !v) || (!o && !g)) {
              ni(Hr(l, s), i, a)
              const _ = (function hM(e, t, n, r, o) {
                const i = new Br(e, n, D)
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  wg(i, o, r && !n),
                  i
                )
              })(o ? fM : dM, n.length, o, r, u)
              !o && v && (n[p].providerFactory = _),
                Fu(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(_),
                s.push(_)
            } else Fu(i, e, h > -1 ? h : p, wg(n[o ? p : h], u, !o && r))
            !o && r && v && n[p].componentProviders++
          }
        }
      }
      function Fu(e, t, n, r) {
        const o = Tn(t),
          i = (function LC(e) {
            return !!e.useClass
          })(t)
        if (o || i) {
          const u = (i ? A(t.useClass) : t).prototype.ngOnDestroy
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = [])
            if (!o && t.multi) {
              const c = l.indexOf(n)
              ;-1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u)
            } else l.push(n, u)
          }
        }
      }
      function wg(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1
      }
      function Ou(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o
        return -1
      }
      function dM(e, t, n, r) {
        return Pu(this.multi, [])
      }
      function fM(e, t, n, r) {
        const o = this.multi
        let i
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = $r(n, n[1], this.providerFactory.index, r)
          ;(i = a.slice(0, s)), Pu(o, i)
          for (let u = s; u < a.length; u++) i.push(a[u])
        } else (i = []), Pu(o, i)
        return i
      }
      function Pu(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])())
        return t
      }
      function te(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function cM(e, t, n) {
              const r = $()
              if (r.firstCreatePass) {
                const o = pt(e)
                xu(n, r.data, r.blueprint, o, !0),
                  xu(t, r.data, r.blueprint, o, !1)
              }
            })(r, o ? o(e) : e, t)
        }
      }
      class Sr {}
      class mM extends Sr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Du(this)),
            (this.instance = null)
          const o = new mf(
            [
              ...t,
              { provide: Sr, useValue: this },
              { provide: sr, useValue: this.componentFactoryResolver },
            ],
            n || gi(),
            r,
            new Set(['environment'])
          )
          ;(this.injector = o), o.resolveInjectorInitializers()
        }
        destroy() {
          this.injector.destroy()
        }
        onDestroy(t) {
          this.injector.onDestroy(t)
        }
      }
      function bg(e, t, n = null) {
        return new mM(e, t, n).injector
      }
      let yM = (() => {
        class e {
          constructor(n) {
            ;(this._injector = n), (this.cachedInjectors = new Map())
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null
            if (!this.cachedInjectors.has(n.id)) {
              const r = ff(0, n.type),
                o =
                  r.length > 0
                    ? bg([r], this._injector, `Standalone[${n.type.name}]`)
                    : null
              this.cachedInjectors.set(n.id, o)
            }
            return this.cachedInjectors.get(n.id)
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy()
            } finally {
              this.cachedInjectors.clear()
            }
          }
        }
        return (
          (e.ɵprov = H({
            token: e,
            providedIn: 'environment',
            factory: () => new e(V(or)),
          })),
          e
        )
      })()
      function Mg(e) {
        e.getStandaloneInjector = (t) =>
          t.get(yM).getOrCreateStandaloneInjector(e)
      }
      function ku(e) {
        return (t) => {
          setTimeout(e, void 0, t)
        }
      }
      const Se = class UM extends Po {
        constructor(t = !1) {
          super(), (this.__isAsync = t)
        }
        emit(t) {
          super.next(t)
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r
          if (t && 'object' == typeof t) {
            const u = t
            ;(o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u))
          }
          this.__isAsync && ((i = ku(i)), o && (o = ku(o)), s && (s = ku(s)))
          const a = super.subscribe({ next: o, error: i, complete: s })
          return t instanceof It && t.add(a), a
        }
      }
      function GM() {
        return this._results[Fn()]()
      }
      class Lu {
        constructor(t = !1) {
          ;(this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0)
          const n = Fn(),
            r = Lu.prototype
          r[n] || (r[n] = GM)
        }
        get changes() {
          return this._changes || (this._changes = new Se())
        }
        get(t) {
          return this._results[t]
        }
        map(t) {
          return this._results.map(t)
        }
        filter(t) {
          return this._results.filter(t)
        }
        find(t) {
          return this._results.find(t)
        }
        reduce(t, n) {
          return this._results.reduce(t, n)
        }
        forEach(t) {
          this._results.forEach(t)
        }
        some(t) {
          return this._results.some(t)
        }
        toArray() {
          return this._results.slice()
        }
        toString() {
          return this._results.toString()
        }
        reset(t, n) {
          const r = this
          r.dirty = !1
          const o = Ke(t)
          ;(this._changesDetected = !(function PD(e, t, n) {
            if (e.length !== t.length) return !1
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r]
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1
            }
            return !0
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]))
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this)
        }
        setDirty() {
          this.dirty = !0
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      let Yt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = qM), e
      })()
      const zM = Yt,
        WM = class extends zM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r)
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Ei(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              )
            o[17] = this._declarationLView[this._declarationTContainer.index]
            const s = this._declarationLView[19]
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              bi(r, o, t),
              new io(o)
            )
          }
        }
      function qM() {
        return ki(ge(), y())
      }
      function ki(e, t) {
        return 4 & e.type ? new WM(t, e, ar(e, t)) : null
      }
      let kt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ZM), e
      })()
      function ZM() {
        return Bg(ge(), y())
      }
      const KM = kt,
        kg = class extends KM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r)
          }
          get element() {
            return ar(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new Kn(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = ti(this._hostTNode, this._hostLView)
            if (bd(t)) {
              const n = Zn(t, this._hostLView),
                r = qn(t)
              return new Kn(n[1].data[r + 8], n)
            }
            return new Kn(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(t) {
            const n = Lg(this._lContainer)
            return (null !== n && n[t]) || null
          }
          get length() {
            return this._lContainer.length - 10
          }
          createEmbeddedView(t, n, r) {
            let o, i
            'number' == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector))
            const s = t.createEmbeddedView(n || {}, i)
            return this.insert(s, o), s
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Gr(e) {
                return 'function' == typeof e
              })(t)
            let a
            if (s) a = n
            else {
              const d = n || {}
              ;(a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef)
            }
            const u = s ? t : new so(W(t)),
              l = r || this.parentInjector
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(or, null)
              f && (i = f)
            }
            const c = u.create(l, o, void 0, i)
            return this.insert(c.hostView, a), c
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1]
            if (
              (function eD(e) {
                return ht(e[3])
              })(r)
            ) {
              const c = this.indexOf(t)
              if (-1 !== c) this.detach(c)
              else {
                const d = r[3],
                  f = new kg(d, d[6], d[3])
                f.detach(f.indexOf(t))
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer
            !(function Vw(e, t, n, r) {
              const o = 10 + r,
                i = n.length
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Rd(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n)
              const s = t[17]
              null !== s &&
                n !== s &&
                (function kw(e, t) {
                  const n = e[9]
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t)
                })(s, t)
              const a = t[19]
              null !== a && a.insertView(e), (t[2] |= 64)
            })(o, r, s, i)
            const a = Wa(i, s),
              u = r[L],
              l = mi(u, s[7])
            return (
              null !== l &&
                (function Ow(e, t, n, r, o, i) {
                  ;(r[0] = o), (r[6] = t), ro(e, r, n, 1, o, i)
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Rd(Bu(s), i, t),
              t
            )
          }
          move(t, n) {
            return this.insert(t, n)
          }
          indexOf(t) {
            const n = Lg(this._lContainer)
            return null !== n ? n.indexOf(t) : -1
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ua(this._lContainer, n)
            r && (oi(Bu(this._lContainer), n), Vf(r[1], r))
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ua(this._lContainer, n)
            return r && null != oi(Bu(this._lContainer), n) ? new io(r) : null
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n
          }
        }
      function Lg(e) {
        return e[8]
      }
      function Bu(e) {
        return e[8] || (e[8] = [])
      }
      function Bg(e, t) {
        let n
        const r = t[e.index]
        if (ht(r)) n = r
        else {
          let o
          if (8 & e.type) o = de(r)
          else {
            const i = t[L]
            o = i.createComment('')
            const s = rt(e, t)
            xn(
              i,
              mi(i, s),
              o,
              (function Hw(e, t) {
                return e.nextSibling(t)
              })(i, s),
              !1
            )
          }
          ;(t[e.index] = n = Rh(r, t, o, e)), Mi(t, n)
        }
        return new kg(n, e, t)
      }
      class ju {
        constructor(t) {
          ;(this.queryList = t), (this.matches = null)
        }
        clone() {
          return new ju(this.queryList)
        }
        setDirty() {
          this.queryList.setDirty()
        }
      }
      class Hu {
        constructor(t = []) {
          this.queries = t
        }
        createEmbeddedView(t) {
          const n = t.queries
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = []
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i)
              o.push(this.queries[s.indexInDeclarationView].clone())
            }
            return new Hu(o)
          }
          return null
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== Gg(t, n).matches && this.queries[n].setDirty()
        }
      }
      class jg {
        constructor(t, n, r = null) {
          ;(this.predicate = t), (this.flags = n), (this.read = r)
        }
      }
      class $u {
        constructor(t = []) {
          this.queries = t
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n)
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t)
        }
        embeddedTView(t) {
          let n = null
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o)
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]))
          }
          return null !== n ? new $u(n) : null
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n)
        }
        getByIndex(t) {
          return this.queries[t]
        }
        get length() {
          return this.queries.length
        }
        track(t) {
          this.queries.push(t)
        }
      }
      class Uu {
        constructor(t, n = -1) {
          ;(this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n)
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n)
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1)
        }
        template(t, n) {
          this.elementStart(t, n)
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Uu(this.metadata))
            : null
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex
            let r = t.parent
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent
            return n === (null !== r ? r.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o]
              this.matchTNodeWithReadOption(t, n, JM(n, i)),
                this.matchTNodeWithReadOption(t, n, ri(n, t, i, !1, !1))
            }
          else
            r === Yt
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, ri(n, t, r, !1, !1))
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read
            if (null !== o)
              if (o === ot || o === kt || (o === Yt && 4 & n.type))
                this.addMatch(n.index, -2)
              else {
                const i = ri(n, t, o, !1, !1)
                null !== i && this.addMatch(n.index, i)
              }
            else this.addMatch(n.index, r)
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n)
        }
      }
      function JM(e, t) {
        const n = e.localNames
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1]
        return null
      }
      function eI(e, t, n, r) {
        return -1 === n
          ? (function XM(e, t) {
              return 11 & e.type ? ar(e, t) : 4 & e.type ? ki(e, t) : null
            })(t, e)
          : -2 === n
          ? (function tI(e, t, n) {
              return n === ot
                ? ar(t, e)
                : n === Yt
                ? ki(t, e)
                : n === kt
                ? Bg(t, e)
                : void 0
            })(e, t, r)
          : $r(e, e[1], n, t)
      }
      function Hg(e, t, n, r) {
        const o = t[19].queries[r]
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = []
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u]
            a.push(l < 0 ? null : eI(t, i[l], s[u + 1], n.metadata.read))
          }
          o.matches = a
        }
        return o.matches
      }
      function Gu(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches
        if (null !== i) {
          const s = Hg(e, t, o, n)
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a]
            if (u > 0) r.push(s[a / 2])
            else {
              const l = i[a + 1],
                c = t[-u]
              for (let d = 10; d < c.length; d++) {
                const f = c[d]
                f[17] === f[3] && Gu(f[1], f, l, r)
              }
              if (null !== c[9]) {
                const d = c[9]
                for (let f = 0; f < d.length; f++) {
                  const h = d[f]
                  Gu(h[1], h, l, r)
                }
              }
            }
          }
        }
        return r
      }
      function zu(e) {
        const t = y(),
          n = $(),
          r = pd()
        Qs(r + 1)
        const o = Gg(n, r)
        if (e.dirty && ad(t) === (2 == (2 & o.metadata.flags))) {
          if (null === o.matches) e.reset([])
          else {
            const i = o.crossesNgTemplate ? Gu(n, t, r, []) : Hg(n, t, o, r)
            e.reset(i, QC), e.notifyOnChanges()
          }
          return !0
        }
        return !1
      }
      function Wu(e, t, n) {
        const r = $()
        r.firstCreatePass &&
          ((function Ug(e, t, n) {
            null === e.queries && (e.queries = new $u()),
              e.queries.track(new Uu(t, n))
          })(r, new jg(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function $g(e, t, n) {
            const r = new Lu(4 == (4 & n))
            Ih(e, t, r, r.destroy),
              null === t[19] && (t[19] = new Hu()),
              t[19].queries.push(new ju(r))
          })(r, y(), t)
      }
      function qu() {
        return (function rI(e, t) {
          return e[19].queries[t].queryList
        })(y(), pd())
      }
      function Gg(e, t) {
        return e.queries.getByIndex(t)
      }
      function Bi(...e) {}
      const lm = new x('Application Initializer')
      let ji = (() => {
        class e {
          constructor(n) {
            ;(this.appInits = n),
              (this.resolve = Bi),
              (this.reject = Bi),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                ;(this.resolve = r), (this.reject = o)
              }))
          }
          runInitializers() {
            if (this.initialized) return
            const n = [],
              r = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]()
                if (Ni(i)) n.push(i)
                else if (ep(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u })
                  })
                  n.push(s)
                }
              }
            Promise.all(n)
              .then(() => {
                r()
              })
              .catch((o) => {
                this.reject(o)
              }),
              0 === n.length && r(),
              (this.initialized = !0)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(lm, 8))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        )
      })()
      const Ju = new x('AppId', {
        providedIn: 'root',
        factory: function cm() {
          return `${Xu()}${Xu()}${Xu()}`
        },
      })
      function Xu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const dm = new x('Platform Initializer'),
        el = new x('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        MI = new x('appBootstrapListener'),
        Jt = new x('LocaleId', {
          providedIn: 'root',
          factory: () =>
            (function qD(e, t = T.Default) {
              return (
                'number' != typeof t &&
                  (t =
                    0 |
                    (t.optional && 8) |
                    (t.host && 1) |
                    (t.self && 2) |
                    (t.skipSelf && 4)),
                V(e, t)
              )
            })(Jt, T.Optional | T.SkipSelf) ||
            (function II() {
              return (typeof $localize < 'u' && $localize.locale) || Mr
            })(),
        }),
        xI = (() => Promise.resolve(0))()
      class De {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se(!1)),
            (this.onMicrotaskEmpty = new Se(!1)),
            (this.onStable = new Se(!1)),
            (this.onError = new Se(!1)),
            typeof Zone > 'u')
          )
            throw new b(908, !1)
          Zone.assertZonePatched()
          const o = this
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec
            o._inner = o._inner.fork(new i('Angular'))
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function FI() {
              let e = Q.requestAnimationFrame,
                t = Q.cancelAnimationFrame
              if (typeof Zone < 'u' && e && t) {
                const n = e[Zone.__symbol__('OriginalDelegate')]
                n && (e = n)
                const r = t[Zone.__symbol__('OriginalDelegate')]
                r && (t = r)
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              }
            })().nativeRequestAnimationFrame),
            (function RI(e) {
              const t = () => {
                !(function PI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Q, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(e.lastRequestAnimationFrameId = -1),
                                rl(e),
                                (e.isCheckStableRunning = !0),
                                nl(e),
                                (e.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke()
                      })),
                    rl(e))
                })(e)
              }
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return pm(e), n.invokeTask(o, i, s, a)
                  } finally {
                    ;((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      gm(e)
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return pm(e), n.invoke(o, i, s, a, u)
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), gm(e)
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          rl(e),
                          nl(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask))
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              })
            })(o)
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone')
        }
        static assertInAngularZone() {
          if (!De.isInAngularZone()) throw new b(909, !1)
        }
        static assertNotInAngularZone() {
          if (De.isInAngularZone()) throw new b(909, !1)
        }
        run(t, n, r) {
          return this._inner.run(t, n, r)
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask('NgZoneEvent: ' + o, t, OI, Bi, Bi)
          try {
            return i.runTask(s, n, r)
          } finally {
            i.cancelTask(s)
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const OI = {}
      function nl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null)
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null))
              } finally {
                e.isStable = !0
              }
          }
      }
      function rl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        )
      }
      function pm(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
      }
      function gm(e) {
        e._nesting--, nl(e)
      }
      class VI {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se()),
            (this.onMicrotaskEmpty = new Se()),
            (this.onStable = new Se()),
            (this.onError = new Se())
        }
        run(t, n, r) {
          return t.apply(n, r)
        }
        runGuarded(t, n, r) {
          return t.apply(n, r)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, n, r, o) {
          return t.apply(n, r)
        }
      }
      const mm = new x('')
      let hn = null
      const al = new x('PlatformDestroyListeners')
      function $I(e) {
        const { rootComponent: t, appProviders: n, platformProviders: r } = e,
          o = (function HI(e = []) {
            if (hn) return hn
            const t = (function vm(e = [], t) {
              return mt.create({
                name: t,
                providers: [
                  { provide: Ea, useValue: 'platform' },
                  { provide: al, useValue: new Set([() => (hn = null)]) },
                  ...e,
                ],
              })
            })(e)
            return (
              (hn = t),
              (function _m(e) {
                const t = e.get(dm, null)
                t && t.forEach((n) => n())
              })(t),
              t
            )
          })(r),
          i = (function wm(e, t) {
            let n
            return (
              (n =
                'noop' === e
                  ? new VI()
                  : ('zone.js' === e ? void 0 : e) || new De(t)),
              n
            )
          })(
            'zone.js',
            (function Cm(e) {
              return {
                enableLongStackTrace: !1,
                shouldCoalesceEventChangeDetection:
                  !(!e || !e.ngZoneEventCoalescing) || !1,
                shouldCoalesceRunChangeDetection:
                  !(!e || !e.ngZoneRunCoalescing) || !1,
              }
            })()
          )
        return i.run(() => {
          const a = bg(
              [{ provide: De, useValue: i }, ...(n || [])],
              o,
              'Environment Injector'
            ),
            u = a.get(ur, null)
          let l
          i.runOutsideAngular(() => {
            l = i.onError.subscribe({
              next: (f) => {
                u.handleError(f)
              },
            })
          })
          const c = () => a.destroy(),
            d = o.get(al)
          return (
            d.add(c),
            a.onDestroy(() => {
              l.unsubscribe(), d.delete(c)
            }),
            (function Em(e, t, n) {
              try {
                const r = n()
                return Ni(r)
                  ? r.catch((o) => {
                      throw (t.runOutsideAngular(() => e.handleError(o)), o)
                    })
                  : r
              } catch (r) {
                throw (t.runOutsideAngular(() => e.handleError(r)), r)
              }
            })(u, i, () => {
              const f = a.get(ji)
              return (
                f.runInitializers(),
                f.donePromise.then(() => {
                  !(function Jp(e) {
                    ze(e, 'Expected localeId to be defined'),
                      'string' == typeof e &&
                        (Yp = e.toLowerCase().replace(/_/g, '-'))
                  })(a.get(Jt, Mr) || Mr)
                  const p = a.get($i)
                  return void 0 !== t && p.bootstrap(t), p
                })
              )
            })
          )
        })
      }
      let $i = (() => {
        class e {
          constructor(n, r, o) {
            ;(this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick()
                    })
                  },
                }))
            const i = new Ce((a) => {
                ;(this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete()
                  })
              }),
              s = new Ce((a) => {
                let u
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    De.assertNotInAngularZone(),
                      (function tl(e) {
                        typeof Zone > 'u'
                          ? xI.then(() => {
                              e && e.apply(null, null)
                            })
                          : Zone.current.scheduleMicroTask(
                              'scheduleMicrotask',
                              e
                            )
                      })(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0))
                      })
                  })
                })
                const l = this._zone.onUnstable.subscribe(() => {
                  De.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1)
                      }))
                })
                return () => {
                  u.unsubscribe(), l.unsubscribe()
                }
              })
            this.isStable = Wc(
              i,
              s.pipe(
                (function Iv(e = {}) {
                  const {
                    connector: t = () => new Po(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1
                    const f = () => {
                        a?.unsubscribe(), (a = void 0)
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1)
                      },
                      p = () => {
                        const g = s
                        h(), g?.unsubscribe()
                      }
                    return Cn((g, v) => {
                      l++, !d && !c && f()
                      const _ = (u = u ?? t())
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = As(p, o))
                      }),
                        _.subscribe(v),
                        !s &&
                          l > 0 &&
                          ((s = new Fr({
                            next: (E) => _.next(E),
                            error: (E) => {
                              ;(d = !0), f(), (a = As(h, n, E)), _.error(E)
                            },
                            complete: () => {
                              ;(c = !0), f(), (a = As(h, r)), _.complete()
                            },
                          })),
                          Bt(g).subscribe(s))
                    })(i)
                  }
                })()
              )
            )
          }
          get destroyed() {
            return this._destroyed
          }
          get injector() {
            return this._injector
          }
          bootstrap(n, r) {
            const o = n instanceof _f
            if (!this._injector.get(ji).done)
              throw (
                (!o &&
                  (function Pr(e) {
                    const t = W(e) || Ne(e) || xe(e)
                    return null !== t && t.standalone
                  })(n),
                new b(405, false))
              )
            let s
            ;(s = o ? n : this._injector.get(sr).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType)
            const a = (function BI(e) {
                return e.isBoundToModule
              })(s)
                ? void 0
                : this._injector.get(Sr),
              l = s.create(mt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(mm, null)
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Ui(this.components, l),
                  d?.unregisterApplication(c)
              }),
              this._loadComponent(l),
              l
            )
          }
          tick() {
            if (this._runningTick) throw new b(101, !1)
            try {
              this._runningTick = !0
              for (let n of this._views) n.detectChanges()
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              )
            } finally {
              this._runningTick = !1
            }
          }
          attachView(n) {
            const r = n
            this._views.push(r), r.attachToAppRef(this)
          }
          detachView(n) {
            const r = n
            Ui(this._views, r), r.detachFromAppRef()
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(MI, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n))
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe()
              } finally {
                ;(this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = [])
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ui(this._destroyListeners, n)
            )
          }
          destroy() {
            if (this._destroyed) throw new b(406, !1)
            const n = this._injector
            n.destroy && !n.destroyed && n.destroy()
          }
          get viewCount() {
            return this._views.length
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(De), V(or), V(ur))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac, providedIn: 'root' })),
          e
        )
      })()
      function Ui(e, t) {
        const n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
      }
      let Im = !0,
        ll = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = WI), e
        })()
      function WI(e) {
        return (function qI(e, t, n) {
          if (Go(e) && !n) {
            const r = Ze(e.index, t)
            return new io(r, r)
          }
          return 47 & e.type ? new io(t[16], t) : null
        })(ge(), y(), 16 == (16 & e))
      }
      const km = { now: () => (km.delegate || Date).now(), delegate: void 0 }
      class aS extends Po {
        constructor(t = 1 / 0, n = 1 / 0, r = km) {
          super(),
            (this._bufferSize = t),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, t)),
            (this._windowTime = Math.max(1, n))
        }
        next(t) {
          const {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this
          n || (r.push(t), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(t)
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer()
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice()
          for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2)
            t.next(i[s])
          return this._checkFinalizedStatuses(t), n
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * t
          if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = n.now()
            let a = 0
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u
            a && r.splice(0, a + 1)
          }
        }
      }
      const qi = {
        schedule(e, t) {
          const n = setTimeout(e, t)
          return () => clearTimeout(n)
        },
        scheduleBeforeRender(e) {
          if (typeof window > 'u') return qi.schedule(e, 0)
          if (typeof window.requestAnimationFrame > 'u')
            return qi.schedule(e, 16)
          const t = window.requestAnimationFrame(e)
          return () => window.cancelAnimationFrame(t)
        },
      }
      let gl
      function yS(e, t, n) {
        let r = n
        return (
          (function cS(e) {
            return !!e && e.nodeType === Node.ELEMENT_NODE
          })(e) &&
            t.some(
              (o, i) =>
                !(
                  '*' === o ||
                  !(function fS(e, t) {
                    if (!gl) {
                      const n = Element.prototype
                      gl =
                        n.matches ||
                        n.matchesSelector ||
                        n.mozMatchesSelector ||
                        n.msMatchesSelector ||
                        n.oMatchesSelector ||
                        n.webkitMatchesSelector
                    }
                    return e.nodeType === Node.ELEMENT_NODE && gl.call(e, t)
                  })(e, o) ||
                  ((r = i), 0)
                )
            ),
          r
        )
      }
      class vS {
        constructor(t, n) {
          this.componentFactory = n.get(sr).resolveComponentFactory(t)
        }
        create(t) {
          return new DS(this.componentFactory, t)
        }
      }
      class DS {
        constructor(t, n) {
          ;(this.componentFactory = t),
            (this.injector = n),
            (this.eventEmitters = new aS(1)),
            (this.events = this.eventEmitters.pipe(
              (function uS(e, t) {
                return Cn((n, r) => {
                  let o = null,
                    i = 0,
                    s = !1
                  const a = () => s && !o && r.complete()
                  n.subscribe(
                    nn(
                      r,
                      (u) => {
                        o?.unsubscribe()
                        let l = 0
                        const c = i++
                        Bt(e(u, c)).subscribe(
                          (o = nn(
                            r,
                            (d) => r.next(t ? t(u, d, c, l++) : d),
                            () => {
                              ;(o = null), a()
                            }
                          ))
                        )
                      },
                      () => {
                        ;(s = !0), a()
                      }
                    )
                  )
                })
              })((r) => Wc(...r))
            )),
            (this.componentRef = null),
            (this.viewChangeDetectorRef = null),
            (this.inputChanges = null),
            (this.hasInputChanges = !1),
            (this.implementsOnChanges = !1),
            (this.scheduledChangeDetectionFn = null),
            (this.scheduledDestroyFn = null),
            (this.initialInputValues = new Map()),
            (this.unchangedInputs = new Set(
              this.componentFactory.inputs.map(({ propName: r }) => r)
            )),
            (this.ngZone = this.injector.get(De)),
            (this.elementZone =
              typeof Zone > 'u' ? null : this.ngZone.run(() => Zone.current))
        }
        connect(t) {
          this.runInZone(() => {
            if (null !== this.scheduledDestroyFn)
              return (
                this.scheduledDestroyFn(), void (this.scheduledDestroyFn = null)
              )
            null === this.componentRef && this.initializeComponent(t)
          })
        }
        disconnect() {
          this.runInZone(() => {
            null === this.componentRef ||
              null !== this.scheduledDestroyFn ||
              (this.scheduledDestroyFn = qi.schedule(() => {
                null !== this.componentRef &&
                  (this.componentRef.destroy(),
                  (this.componentRef = null),
                  (this.viewChangeDetectorRef = null))
              }, 10))
          })
        }
        getInputValue(t) {
          return this.runInZone(() =>
            null === this.componentRef
              ? this.initialInputValues.get(t)
              : this.componentRef.instance[t]
          )
        }
        setInputValue(t, n) {
          this.runInZone(() => {
            null !== this.componentRef
              ? ((function hS(e, t) {
                  return e === t || (e != e && t != t)
                })(n, this.getInputValue(t)) &&
                  (void 0 !== n || !this.unchangedInputs.has(t))) ||
                (this.recordInputChange(t, n),
                this.unchangedInputs.delete(t),
                (this.hasInputChanges = !0),
                (this.componentRef.instance[t] = n),
                this.scheduleDetectChanges())
              : this.initialInputValues.set(t, n)
          })
        }
        initializeComponent(t) {
          const n = mt.create({ providers: [], parent: this.injector }),
            r = (function mS(e, t) {
              const n = e.childNodes,
                r = t.map(() => [])
              let o = -1
              t.some((i, s) => '*' === i && ((o = s), !0))
              for (let i = 0, s = n.length; i < s; ++i) {
                const a = n[i],
                  u = yS(a, t, o)
                ;-1 !== u && r[u].push(a)
              }
              return r
            })(t, this.componentFactory.ngContentSelectors)
          ;(this.componentRef = this.componentFactory.create(n, r, t)),
            (this.viewChangeDetectorRef = this.componentRef.injector.get(ll)),
            (this.implementsOnChanges = (function dS(e) {
              return 'function' == typeof e
            })(this.componentRef.instance.ngOnChanges)),
            this.initializeInputs(),
            this.initializeOutputs(this.componentRef),
            this.detectChanges(),
            this.injector.get($i).attachView(this.componentRef.hostView)
        }
        initializeInputs() {
          this.componentFactory.inputs.forEach(({ propName: t }) => {
            this.initialInputValues.has(t) &&
              this.setInputValue(t, this.initialInputValues.get(t))
          }),
            this.initialInputValues.clear()
        }
        initializeOutputs(t) {
          const n = this.componentFactory.outputs.map(
            ({ propName: r, templateName: o }) =>
              t.instance[r].pipe(rn((s) => ({ name: o, value: s })))
          )
          this.eventEmitters.next(n)
        }
        callNgOnChanges(t) {
          if (!this.implementsOnChanges || null === this.inputChanges) return
          const n = this.inputChanges
          ;(this.inputChanges = null), t.instance.ngOnChanges(n)
        }
        markViewForCheck(t) {
          this.hasInputChanges &&
            ((this.hasInputChanges = !1), t.markForCheck())
        }
        scheduleDetectChanges() {
          this.scheduledChangeDetectionFn ||
            (this.scheduledChangeDetectionFn = qi.scheduleBeforeRender(() => {
              ;(this.scheduledChangeDetectionFn = null), this.detectChanges()
            }))
        }
        recordInputChange(t, n) {
          if (!this.implementsOnChanges) return
          null === this.inputChanges && (this.inputChanges = {})
          const r = this.inputChanges[t]
          if (r) return void (r.currentValue = n)
          const o = this.unchangedInputs.has(t),
            i = o ? void 0 : this.getInputValue(t)
          this.inputChanges[t] = new rd(i, n, o)
        }
        detectChanges() {
          null !== this.componentRef &&
            (this.callNgOnChanges(this.componentRef),
            this.markViewForCheck(this.viewChangeDetectorRef),
            this.componentRef.changeDetectorRef.detectChanges())
        }
        runInZone(t) {
          return this.elementZone && Zone.current !== this.elementZone
            ? this.ngZone.run(t)
            : t()
        }
      }
      class CS extends HTMLElement {
        constructor() {
          super(...arguments), (this.ngElementEventsSubscription = null)
        }
      }
      let Zi = null
      function Vn() {
        return Zi
      }
      const ut = new x('DocumentToken')
      function qm(e, t) {
        t = encodeURIComponent(t)
        for (const n of e.split(';')) {
          const r = n.indexOf('='),
            [o, i] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)]
          if (o.trim() === t) return decodeURIComponent(i)
        }
        return null
      }
      let Ym = (() => {
        class e {
          constructor(n, r) {
            ;(this._viewContainer = n),
              (this._context = new pA()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r)
          }
          set ngIf(n) {
            ;(this._context.$implicit = this._context.ngIf = n),
              this._updateView()
          }
          set ngIfThen(n) {
            Jm('ngIfThen', n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView()
          }
          set ngIfElse(n) {
            Jm('ngIfElse', n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView()
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )))
          }
          static ngTemplateContextGuard(n, r) {
            return !0
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(kt), D(Yt))
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          })),
          e
        )
      })()
      class pA {
        constructor() {
          ;(this.$implicit = null), (this.ngIf = null)
        }
      }
      function Jm(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(`${e} must be a TemplateRef, but received '${K(t)}'.`)
      }
      let HA = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵmod = an({ type: e })),
          (e.ɵinj = Ht({})),
          e
        )
      })()
      class ry {}
      class xl extends class lT extends class bS {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      } {
        static makeCurrent() {
          !(function ES(e) {
            Zi || (Zi = e)
          })(new xl())
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1)
            }
          )
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n)
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null
        }
        getBaseHref(t) {
          const n = (function cT() {
            return (
              (wo = wo || document.querySelector('base')),
              wo ? wo.getAttribute('href') : null
            )
          })()
          return null == n
            ? null
            : (function dT(e) {
                ;(is = is || document.createElement('a')),
                  is.setAttribute('href', e)
                const t = is.pathname
                return '/' === t.charAt(0) ? t : `/${t}`
              })(n)
        }
        resetBaseElement() {
          wo = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(t) {
          return qm(document.cookie, t)
        }
      }
      let is,
        wo = null,
        gT = (() => {
          class e {
            build() {
              return new XMLHttpRequest()
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })()
      const ss = new x('EventManagerPlugins')
      let as = (() => {
        class e {
          constructor(n, r) {
            ;(this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse())
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o)
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n)
            if (r) return r
            const o = this._plugins
            for (let i = 0; i < o.length; i++) {
              const s = o[i]
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s
            }
            throw new Error(`No event manager plugin found for event ${n}`)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(ss), V(De))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      class ay {
        constructor(t) {
          this._doc = t
        }
        addGlobalEventListener(t, n, r) {
          const o = Vn().getGlobalEventTarget(this._doc, t)
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`)
          return this.addEventListener(o, n, r)
        }
      }
      let uy = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set()
            }
            addStyles(n) {
              const r = new Set()
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o))
              }),
                this.onStylesAdded(r)
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        Eo = (() => {
          class e extends uy {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, [])
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement('style')
                ;(s.textContent = i), o.push(r.appendChild(s))
              })
            }
            addHost(n) {
              const r = []
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r)
            }
            removeHost(n) {
              const r = this._hostNodes.get(n)
              r && r.forEach(ly), this._hostNodes.delete(n)
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(ly))
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(ut))
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })()
      function ly(e) {
        Vn().remove(e)
      }
      const Fl = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Ol = /%COMP%/g
      function us(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r]
          Array.isArray(o) ? us(e, o, n) : ((o = o.replace(Ol, e)), n.push(o))
        }
        return n
      }
      function fy(e) {
        return (t) => {
          if ('__ngUnwrap__' === t) return e
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1))
        }
      }
      let Pl = (() => {
        class e {
          constructor(n, r, o) {
            ;(this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Rl(n))
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer
            switch (r.encapsulation) {
              case St.Emulated: {
                let o = this.rendererByCompId.get(r.id)
                return (
                  o ||
                    ((o = new CT(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                )
              }
              case 1:
              case St.ShadowDom:
                return new wT(this.eventManager, this.sharedStylesHost, n, r)
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = us(r.id, r.styles, [])
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(as), V(Eo), V(Ju))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      class Rl {
        constructor(t) {
          ;(this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Fl[n] || n, t)
            : document.createElement(t)
        }
        createComment(t) {
          return document.createComment(t)
        }
        createText(t) {
          return document.createTextNode(t)
        }
        appendChild(t, n) {
          ;(py(t) ? t.content : t).appendChild(n)
        }
        insertBefore(t, n, r) {
          t && (py(t) ? t.content : t).insertBefore(n, r)
        }
        removeChild(t, n) {
          t && t.removeChild(n)
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? document.querySelector(t) : t
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`)
          return n || (r.textContent = ''), r
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ':' + n
            const i = Fl[o]
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
          } else t.setAttribute(n, r)
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Fl[r]
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
          } else t.removeAttribute(n)
        }
        addClass(t, n) {
          t.classList.add(n)
        }
        removeClass(t, n) {
          t.classList.remove(n)
        }
        setStyle(t, n, r, o) {
          o & (He.DashCase | He.Important)
            ? t.style.setProperty(n, r, o & He.Important ? 'important' : '')
            : (t.style[n] = r)
        }
        removeStyle(t, n, r) {
          r & He.DashCase ? t.style.removeProperty(n) : (t.style[n] = '')
        }
        setProperty(t, n, r) {
          t[n] = r
        }
        setValue(t, n) {
          t.nodeValue = n
        }
        listen(t, n, r) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, fy(r))
            : this.eventManager.addEventListener(t, n, fy(r))
        }
      }
      function py(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content
      }
      class CT extends Rl {
        constructor(t, n, r, o) {
          super(t), (this.component = r)
          const i = us(o + '-' + r.id, r.styles, [])
          n.addStyles(i),
            (this.contentAttr = (function _T(e) {
              return '_ngcontent-%COMP%'.replace(Ol, e)
            })(o + '-' + r.id)),
            (this.hostAttr = (function vT(e) {
              return '_nghost-%COMP%'.replace(Ol, e)
            })(o + '-' + r.id))
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '')
        }
        createElement(t, n) {
          const r = super.createElement(t, n)
          return super.setAttribute(r, this.contentAttr, ''), r
        }
      }
      class wT extends Rl {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const i = us(o.id, o.styles, [])
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement('style')
            ;(a.textContent = i[s]), this.shadowRoot.appendChild(a)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n)
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          )
        }
      }
      const gy = ['alt', 'control', 'meta', 'shift'],
        bT = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        MT = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        }
      const xT = [
          { provide: el, useValue: 'browser' },
          {
            provide: dm,
            useValue: function AT() {
              xl.makeCurrent()
            },
            multi: !0,
          },
          {
            provide: ut,
            useFactory: function NT() {
              return (
                (function sC(e) {
                  ha = e
                })(document),
                document
              )
            },
            deps: [],
          },
        ],
        PT = [
          { provide: Ea, useValue: 'root' },
          {
            provide: ur,
            useFactory: function TT() {
              return new ur()
            },
            deps: [],
          },
          {
            provide: ss,
            useClass: (() => {
              class e extends ay {
                constructor(n) {
                  super(n)
                }
                supports(n) {
                  return !0
                }
                addEventListener(n, r, o) {
                  return (
                    n.addEventListener(r, o, !1),
                    () => this.removeEventListener(n, r, o)
                  )
                }
                removeEventListener(n, r, o) {
                  return n.removeEventListener(r, o)
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(V(ut))
                }),
                (e.ɵprov = H({ token: e, factory: e.ɵfac })),
                e
              )
            })(),
            multi: !0,
            deps: [ut, De, el],
          },
          {
            provide: ss,
            useClass: (() => {
              class e extends ay {
                constructor(n) {
                  super(n)
                }
                supports(n) {
                  return null != e.parseEventName(n)
                }
                addEventListener(n, r, o) {
                  const i = e.parseEventName(r),
                    s = e.eventCallback(i.fullKey, o, this.manager.getZone())
                  return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                      Vn().onAndCancel(n, i.domEventName, s)
                    )
                }
                static parseEventName(n) {
                  const r = n.toLowerCase().split('.'),
                    o = r.shift()
                  if (0 === r.length || ('keydown' !== o && 'keyup' !== o))
                    return null
                  const i = e._normalizeKey(r.pop())
                  let s = '',
                    a = r.indexOf('code')
                  if (
                    (a > -1 && (r.splice(a, 1), (s = 'code.')),
                    gy.forEach((l) => {
                      const c = r.indexOf(l)
                      c > -1 && (r.splice(c, 1), (s += l + '.'))
                    }),
                    (s += i),
                    0 != r.length || 0 === i.length)
                  )
                    return null
                  const u = {}
                  return (u.domEventName = o), (u.fullKey = s), u
                }
                static matchEventFullKeyCode(n, r) {
                  let o = bT[n.key] || n.key,
                    i = ''
                  return (
                    r.indexOf('code.') > -1 && ((o = n.code), (i = 'code.')),
                    !(null == o || !o) &&
                      ((o = o.toLowerCase()),
                      ' ' === o ? (o = 'space') : '.' === o && (o = 'dot'),
                      gy.forEach((s) => {
                        s !== o && (0, MT[s])(n) && (i += s + '.')
                      }),
                      (i += o),
                      i === r)
                  )
                }
                static eventCallback(n, r, o) {
                  return (i) => {
                    e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
                  }
                }
                static _normalizeKey(n) {
                  return 'esc' === n ? 'escape' : n
                }
              }
              return (
                (e.ɵfac = function (n) {
                  return new (n || e)(V(ut))
                }),
                (e.ɵprov = H({ token: e, factory: e.ɵfac })),
                e
              )
            })(),
            multi: !0,
            deps: [ut],
          },
          { provide: Pl, useClass: Pl, deps: [as, Eo, Ju] },
          { provide: Df, useExisting: Pl },
          { provide: uy, useExisting: Eo },
          { provide: Eo, useClass: Eo, deps: [ut] },
          { provide: as, useClass: as, deps: [ss, De] },
          { provide: ry, useClass: gT, deps: [] },
          [],
        ]
      typeof window < 'u' && window
      let Dy = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵprov = H({
              token: e,
              factory: function (n) {
                let r = null
                return (r = n ? new (n || e)() : V(Cy)), r
              },
              providedIn: 'root',
            })),
            e
          )
        })(),
        Cy = (() => {
          class e extends Dy {
            constructor(n) {
              super(), (this._doc = n)
            }
            sanitize(n, r) {
              if (null == r) return null
              switch (n) {
                case X.NONE:
                  return r
                case X.HTML:
                  return xt(r, 'HTML')
                    ? Ye(r)
                    : sf(this._doc, String(r)).toString()
                case X.STYLE:
                  return xt(r, 'Style') ? Ye(r) : r
                case X.SCRIPT:
                  if (xt(r, 'Script')) return Ye(r)
                  throw new Error('unsafe value used in a script context')
                case X.URL:
                  return xt(r, 'URL') ? Ye(r) : Yr(String(r))
                case X.RESOURCE_URL:
                  if (xt(r, 'ResourceURL')) return Ye(r)
                  throw new Error(
                    'unsafe value used in a resource URL context (see https://g.co/ng/security#xss)'
                  )
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${n} (see https://g.co/ng/security#xss)`
                  )
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function gC(e) {
                return new lC(e)
              })(n)
            }
            bypassSecurityTrustStyle(n) {
              return (function mC(e) {
                return new cC(e)
              })(n)
            }
            bypassSecurityTrustScript(n) {
              return (function yC(e) {
                return new dC(e)
              })(n)
            }
            bypassSecurityTrustUrl(n) {
              return (function _C(e) {
                return new fC(e)
              })(n)
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function vC(e) {
                return new hC(e)
              })(n)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(ut))
            }),
            (e.ɵprov = H({
              token: e,
              factory: function (n) {
                let r = null
                return (
                  (r = n
                    ? new n()
                    : (function UT(e) {
                        return new Cy(e.get(ut))
                      })(V(mt))),
                  r
                )
              },
              providedIn: 'root',
            })),
            e
          )
        })()
      class wy {}
      class Ey {}
      class tn {
        constructor(t) {
          ;(this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  'string' == typeof t
                    ? () => {
                        ;(this.headers = new Map()),
                          t.split('\n').forEach((n) => {
                            const r = n.indexOf(':')
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim()
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s])
                            }
                          })
                      }
                    : () => {
                        ;(this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n]
                            const o = n.toLowerCase()
                            'string' == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o))
                          })
                      })
              : (this.headers = new Map())
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase())
        }
        get(t) {
          this.init()
          const n = this.headers.get(t.toLowerCase())
          return n && n.length > 0 ? n[0] : null
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: 'a' })
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: 's' })
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: 'd' })
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t)
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof tn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)))
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n))
            })
        }
        clone(t) {
          const n = new tn()
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof tn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          )
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase()
          switch (t.op) {
            case 'a':
            case 's':
              let r = t.value
              if (('string' == typeof r && (r = [r]), 0 === r.length)) return
              this.maybeSetNormalizedName(t.name, n)
              const o = ('a' === t.op ? this.headers.get(n) : void 0) || []
              o.push(...r), this.headers.set(n, o)
              break
            case 'd':
              const i = t.value
              if (i) {
                let s = this.headers.get(n)
                if (!s) return
                ;(s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s)
              } else this.headers.delete(n), this.normalizedNames.delete(n)
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            )
        }
      }
      class qT {
        encodeKey(t) {
          return by(t)
        }
        encodeValue(t) {
          return by(t)
        }
        decodeKey(t) {
          return decodeURIComponent(t)
        }
        decodeValue(t) {
          return decodeURIComponent(t)
        }
      }
      const KT = /%(\d[a-f0-9])/gi,
        QT = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '3D': '=',
          '3F': '?',
          '2F': '/',
        }
      function by(e) {
        return encodeURIComponent(e).replace(KT, (t, n) => QT[n] ?? t)
      }
      function ls(e) {
        return `${e}`
      }
      class gn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new qT()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.')
            this.map = (function ZT(e, t) {
              const n = new Map()
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((o) => {
                      const i = o.indexOf('='),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), '']
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || []
                      u.push(a), n.set(s, u)
                    }),
                n
              )
            })(t.fromString, this.encoder)
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(ls) : [ls(r)]
                  this.map.set(n, o)
                }))
              : (this.map = null)
        }
        has(t) {
          return this.init(), this.map.has(t)
        }
        get(t) {
          this.init()
          const n = this.map.get(t)
          return n ? n[0] : null
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null
        }
        keys() {
          return this.init(), Array.from(this.map.keys())
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: 'a' })
        }
        appendAll(t) {
          const n = []
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r]
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: 'a' })
                  })
                : n.push({ param: r, value: o, op: 'a' })
            }),
            this.clone(n)
          )
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: 's' })
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: 'd' })
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t)
                return this.map
                  .get(t)
                  .map((r) => n + '=' + this.encoder.encodeValue(r))
                  .join('&')
              })
              .filter((t) => '' !== t)
              .join('&')
          )
        }
        clone(t) {
          const n = new gn({ encoder: this.encoder })
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          )
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case 'a':
                  case 's':
                    const n =
                      ('a' === t.op ? this.map.get(t.param) : void 0) || []
                    n.push(ls(t.value)), this.map.set(t.param, n)
                    break
                  case 'd':
                    if (void 0 === t.value) {
                      this.map.delete(t.param)
                      break
                    }
                    {
                      let r = this.map.get(t.param) || []
                      const o = r.indexOf(ls(t.value))
                      ;-1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param)
                    }
                }
              }),
              (this.cloneFrom = this.updates = null))
        }
      }
      class YT {
        constructor() {
          this.map = new Map()
        }
        set(t, n) {
          return this.map.set(t, n), this
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          )
        }
        delete(t) {
          return this.map.delete(t), this
        }
        has(t) {
          return this.map.has(t)
        }
        keys() {
          return this.map.keys()
        }
      }
      function My(e) {
        return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer
      }
      function Iy(e) {
        return typeof Blob < 'u' && e instanceof Blob
      }
      function Sy(e) {
        return typeof FormData < 'u' && e instanceof FormData
      }
      class bo {
        constructor(t, n, r, o) {
          let i
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = t.toUpperCase()),
            (function JT(e) {
              switch (e) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1
                default:
                  return !0
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new tn()),
            this.context || (this.context = new YT()),
            this.params)
          ) {
            const s = this.params.toString()
            if (0 === s.length) this.urlWithParams = n
            else {
              const a = n.indexOf('?')
              this.urlWithParams =
                n + (-1 === a ? '?' : a < n.length - 1 ? '&' : '') + s
            }
          } else (this.params = new gn()), (this.urlWithParams = n)
        }
        serializeBody() {
          return null === this.body
            ? null
            : My(this.body) ||
              Iy(this.body) ||
              Sy(this.body) ||
              (function XT(e) {
                return (
                  typeof URLSearchParams < 'u' && e instanceof URLSearchParams
                )
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof gn
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString()
        }
        detectContentTypeHeader() {
          return null === this.body || Sy(this.body)
            ? null
            : Iy(this.body)
            ? this.body.type || null
            : My(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof gn
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress
          let u = t.headers || this.headers,
            l = t.params || this.params
          const c = t.context ?? this.context
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                l
              )),
            new bo(n, r, i, {
              params: l,
              headers: u,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          )
        }
      }
      var pe = (() => (
        ((pe = pe || {})[(pe.Sent = 0)] = 'Sent'),
        (pe[(pe.UploadProgress = 1)] = 'UploadProgress'),
        (pe[(pe.ResponseHeader = 2)] = 'ResponseHeader'),
        (pe[(pe.DownloadProgress = 3)] = 'DownloadProgress'),
        (pe[(pe.Response = 4)] = 'Response'),
        (pe[(pe.User = 5)] = 'User'),
        pe
      ))()
      class kl {
        constructor(t, n = 200, r = 'OK') {
          ;(this.headers = t.headers || new tn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300)
        }
      }
      class Ll extends kl {
        constructor(t = {}) {
          super(t), (this.type = pe.ResponseHeader)
        }
        clone(t = {}) {
          return new Ll({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          })
        }
      }
      class cs extends kl {
        constructor(t = {}) {
          super(t),
            (this.type = pe.Response),
            (this.body = void 0 !== t.body ? t.body : null)
        }
        clone(t = {}) {
          return new cs({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          })
        }
      }
      class Ay extends kl {
        constructor(t) {
          super(t, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || '(unknown url)'}`
                : `Http failure response for ${t.url || '(unknown url)'}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null)
        }
      }
      function Bl(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        }
      }
      let Ty = (() => {
        class e {
          constructor(n) {
            this.handler = n
          }
          request(n, r, o = {}) {
            let i
            if (n instanceof bo) i = n
            else {
              let u, l
              ;(u = o.headers instanceof tn ? o.headers : new tn(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof gn
                      ? o.params
                      : new gn({ fromObject: o.params })),
                (i = new bo(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || 'json',
                  withCredentials: o.withCredentials,
                }))
            }
            const s = (function GT(...e) {
              return Ss(e, $c(e))
            })(i).pipe(
              (function zT(e, t) {
                return re(t) ? Ro(e, t, 1) : Ro(e, 1)
              })((u) => this.handler.handle(u))
            )
            if (n instanceof bo || 'events' === o.observe) return s
            const a = s.pipe(
              (function WT(e, t) {
                return Cn((n, r) => {
                  let o = 0
                  n.subscribe(nn(r, (i) => e.call(t, i, o++) && r.next(i)))
                })
              })((u) => u instanceof cs)
            )
            switch (o.observe || 'body') {
              case 'body':
                switch (i.responseType) {
                  case 'arraybuffer':
                    return a.pipe(
                      rn((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.')
                        return u.body
                      })
                    )
                  case 'blob':
                    return a.pipe(
                      rn((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error('Response is not a Blob.')
                        return u.body
                      })
                    )
                  case 'text':
                    return a.pipe(
                      rn((u) => {
                        if (null !== u.body && 'string' != typeof u.body)
                          throw new Error('Response is not a string.')
                        return u.body
                      })
                    )
                  default:
                    return a.pipe(rn((u) => u.body))
                }
              case 'response':
                return a
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                )
            }
          }
          delete(n, r = {}) {
            return this.request('DELETE', n, r)
          }
          get(n, r = {}) {
            return this.request('GET', n, r)
          }
          head(n, r = {}) {
            return this.request('HEAD', n, r)
          }
          jsonp(n, r) {
            return this.request('JSONP', n, {
              params: new gn().append(r, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            })
          }
          options(n, r = {}) {
            return this.request('OPTIONS', n, r)
          }
          patch(n, r, o = {}) {
            return this.request('PATCH', n, Bl(o, r))
          }
          post(n, r, o = {}) {
            return this.request('POST', n, Bl(o, r))
          }
          put(n, r, o = {}) {
            return this.request('PUT', n, Bl(o, r))
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(wy))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      class Ny {
        constructor(t, n) {
          ;(this.next = t), (this.interceptor = n)
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next)
        }
      }
      const xy = new x('HTTP_INTERCEPTORS')
      let e1 = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n)
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)()
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const t1 = /^\)\]\}',?\n/
      let Fy = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n
          }
          handle(n) {
            if ('JSONP' === n.method)
              throw new Error(
                'Attempted to construct Jsonp request without HttpClientJsonpModule installed.'
              )
            return new Ce((r) => {
              const o = this.xhrFactory.build()
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(','))),
                n.headers.has('Accept') ||
                  o.setRequestHeader(
                    'Accept',
                    'application/json, text/plain, */*'
                  ),
                !n.headers.has('Content-Type'))
              ) {
                const h = n.detectContentTypeHeader()
                null !== h && o.setRequestHeader('Content-Type', h)
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase()
                o.responseType = 'json' !== h ? h : 'text'
              }
              const i = n.serializeBody()
              let s = null
              const a = () => {
                  if (null !== s) return s
                  const h = o.statusText || 'OK',
                    p = new tn(o.getAllResponseHeaders()),
                    g =
                      (function n1(e) {
                        return 'responseURL' in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader('X-Request-URL')
                          : null
                      })(o) || n.url
                  return (
                    (s = new Ll({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  )
                },
                u = () => {
                  let { headers: h, status: p, statusText: g, url: v } = a(),
                    _ = null
                  204 !== p &&
                    (_ = typeof o.response > 'u' ? o.responseText : o.response),
                    0 === p && (p = _ ? 200 : 0)
                  let E = p >= 200 && p < 300
                  if ('json' === n.responseType && 'string' == typeof _) {
                    const m = _
                    _ = _.replace(t1, '')
                    try {
                      _ = '' !== _ ? JSON.parse(_) : null
                    } catch (M) {
                      ;(_ = m), E && ((E = !1), (_ = { error: M, text: _ }))
                    }
                  }
                  E
                    ? (r.next(
                        new cs({
                          body: _,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: v || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Ay({
                          error: _,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: v || void 0,
                        })
                      )
                },
                l = (h) => {
                  const { url: p } = a(),
                    g = new Ay({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || 'Unknown Error',
                      url: p || void 0,
                    })
                  r.error(g)
                }
              let c = !1
              const d = (h) => {
                  c || (r.next(a()), (c = !0))
                  let p = { type: pe.DownloadProgress, loaded: h.loaded }
                  h.lengthComputable && (p.total = h.total),
                    'text' === n.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p)
                },
                f = (h) => {
                  let p = { type: pe.UploadProgress, loaded: h.loaded }
                  h.lengthComputable && (p.total = h.total), r.next(p)
                }
              return (
                o.addEventListener('load', u),
                o.addEventListener('error', l),
                o.addEventListener('timeout', l),
                o.addEventListener('abort', l),
                n.reportProgress &&
                  (o.addEventListener('progress', d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener('progress', f)),
                o.send(i),
                r.next({ type: pe.Sent }),
                () => {
                  o.removeEventListener('error', l),
                    o.removeEventListener('abort', l),
                    o.removeEventListener('load', u),
                    o.removeEventListener('timeout', l),
                    n.reportProgress &&
                      (o.removeEventListener('progress', d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener('progress', f)),
                    o.readyState !== o.DONE && o.abort()
                }
              )
            })
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(V(ry))
          }),
          (e.ɵprov = H({ token: e, factory: e.ɵfac })),
          e
        )
      })()
      const jl = new x('XSRF_COOKIE_NAME'),
        Hl = new x('XSRF_HEADER_NAME')
      class Oy {}
      let r1 = (() => {
          class e {
            constructor(n, r, o) {
              ;(this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0)
            }
            getToken() {
              if ('server' === this.platform) return null
              const n = this.doc.cookie || ''
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = qm(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              )
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(ut), V(el), V(jl))
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        $l = (() => {
          class e {
            constructor(n, r) {
              ;(this.tokenService = n), (this.headerName = r)
            }
            intercept(n, r) {
              const o = n.url.toLowerCase()
              if (
                'GET' === n.method ||
                'HEAD' === n.method ||
                o.startsWith('http://') ||
                o.startsWith('https://')
              )
                return r.handle(n)
              const i = this.tokenService.getToken()
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              )
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(Oy), V(Hl))
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        o1 = (() => {
          class e {
            constructor(n, r) {
              ;(this.backend = n), (this.injector = r), (this.chain = null)
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(xy, [])
                this.chain = r.reduceRight((o, i) => new Ny(o, i), this.backend)
              }
              return this.chain.handle(n)
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(Ey), V(mt))
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac })),
            e
          )
        })(),
        i1 = (() => {
          class e {
            static disable() {
              return { ngModule: e, providers: [{ provide: $l, useClass: e1 }] }
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: jl, useValue: n.cookieName } : [],
                  n.headerName ? { provide: Hl, useValue: n.headerName } : [],
                ],
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = an({ type: e })),
            (e.ɵinj = Ht({
              providers: [
                $l,
                { provide: xy, useExisting: $l, multi: !0 },
                { provide: Oy, useClass: r1 },
                { provide: jl, useValue: 'XSRF-TOKEN' },
                { provide: Hl, useValue: 'X-XSRF-TOKEN' },
              ],
            })),
            e
          )
        })(),
        Py = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = an({ type: e })),
            (e.ɵinj = Ht({
              providers: [
                Ty,
                { provide: wy, useClass: o1 },
                Fy,
                { provide: Ey, useExisting: Fy },
              ],
              imports: [
                i1.withOptions({
                  cookieName: 'XSRF-TOKEN',
                  headerName: 'X-XSRF-TOKEN',
                }),
              ],
            })),
            e
          )
        })(),
        Ry = (() => {
          class e {
            constructor(n) {
              ;(this.http = n),
                (this.apiUrl = 'http://localhost:5002'),
                (this.chatWindowStyles = {})
            }
            fetchResponse(n) {
              console.log('fetchResponse() called: ' + n)
              const r = 'https://api.knibble.ai/api/embed_settings',
                o = { embed_uuid: n }
              return (
                console.log('fetchResponse() called: ' + r),
                this.http.post(r, o)
              )
            }
            fetchChatWindowStyles() {
              return new Promise((n, r) => {
                setTimeout(() => {
                  const o = { backgroundColor: '#f2f2f2', borderRadius: '5px' }
                  ;(this.chatWindowStyles = o), n(o)
                }, 2e3)
              })
            }
            getChatWindowStyles() {
              return this.chatWindowStyles
            }
            getItems() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(V(Ty))
            }),
            (e.ɵprov = H({ token: e, factory: e.ɵfac, providedIn: 'root' })),
            e
          )
        })()
      let M_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = an({ type: e })),
            (e.ɵinj = Ht({})),
            e
          )
        })(),
        gN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = an({ type: e })),
            (e.ɵinj = Ht({ imports: [M_] })),
            e
          )
        })(),
        mN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)()
            }),
            (e.ɵmod = an({ type: e })),
            (e.ɵinj = Ht({ imports: [gN] })),
            e
          )
        })()
      const _N = ['chatWindow'],
        vN = ['iframeRef']
      function DN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 5)(1, 'div', 6),
            Tt(),
            ie(2, 'svg', 7),
            st(3, 'path', 8),
            Re()()()),
          2 & e)
        ) {
          const n = vt()
          $e(1),
            wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function CN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 11),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function wN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 12),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function EN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 13),
            st(2, 'path', 14),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function bN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 13),
            st(2, 'path', 15),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function MN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 16),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function IN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 17),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function SN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 18),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function AN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 6),
            Tt(),
            ie(1, 'svg', 10),
            st(2, 'path', 19),
            Re()()),
          2 & e)
        ) {
          const n = vt(2)
          wt('color:', null == n.embed ? null : n.embed.bubble_text_color, '')
        }
      }
      function TN(e, t) {
        if (
          (1 & e &&
            (ie(0, 'div', 5),
            _t(1, CN, 3, 3, 'div', 9),
            _t(2, wN, 3, 3, 'div', 9),
            _t(3, EN, 3, 3, 'div', 9),
            _t(4, bN, 3, 3, 'div', 9),
            _t(5, MN, 3, 3, 'div', 9),
            _t(6, IN, 3, 3, 'div', 9),
            _t(7, SN, 3, 3, 'div', 9),
            _t(8, AN, 3, 3, 'div', 9),
            Re()),
          2 & e)
        ) {
          const n = vt()
          $e(1),
            Xe(
              'ngIf',
              'fa-solid fa-message' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-regular fa-message' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-solid fa-messages' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-regular fa-messages' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-solid fa-message-quote' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-regular fa-message-quote' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-solid fa-circle-info' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            ),
            $e(1),
            Xe(
              'ngIf',
              'fa-regular fa-circle-info' ==
                (null == n.embed ? null : n.embed.bubble_icon)
            )
        }
      }
      let NN = (() => {
        class e {
          constructor(n, r, o) {
            ;(this.dataService = n),
              (this.elRef = r),
              (this.domS = o),
              (this.showChatWindow = !1),
              (this.chatWindowStyles = {}),
              (this.chatMessages = []),
              (this.inputMessage = ''),
              (this.chatbot_id = ''),
              (this.style = ''),
              (this.iframe_class = 'iframe_hidden')
          }
          ngOnInit() {
            console.log(this.elRef.nativeElement),
              (this.url = this.domS.bypassSecurityTrustResourceUrl(
                'https://knibble.ai/chat/' +
                  this.elRef.nativeElement.attributes[0].nodeValue
              )),
              this.dataService
                .fetchResponse(this.elRef.nativeElement.attributes[0].nodeValue)
                .subscribe((r) => {
                  console.log(r),
                    (this.embed = r.embed),
                    console.log(this.embed)
                })
          }
          ngAfterViewInit() {}
          toggleChatWindow() {
            this.iframe_class =
              'iframe_hidden' == this.iframe_class
                ? 'chat-window'
                : 'iframe_hidden'
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(Ry), D(ot), D(Dy))
          }),
          (e.ɵcmp = Vs({
            type: e,
            selectors: [['app-root']],
            viewQuery: function (n, r) {
              if ((1 & n && (Wu(_N, 5), Wu(vN, 5)), 2 & n)) {
                let o
                zu((o = qu())) && (r.chatWindowRef = o.first),
                  zu((o = qu())) && (r.iframeRef = o.first)
              }
            },
            inputs: { chatbot_id: 'chatbot_id', style: 'style' },
            standalone: !0,
            features: [te([Ry, Py]), Mg],
            decls: 7,
            vars: 9,
            consts: [
              [
                1,
                'chat-icon',
                'flex',
                'justify-center',
                'items-center',
                3,
                'click',
              ],
              ['class', 'logo-wrapper', 4, 'ngIf'],
              ['chatWindow', ''],
              [
                'frameborder',
                '0',
                'width',
                '100%',
                'height',
                '100%',
                2,
                'border',
                '0 !important',
                3,
                'src',
              ],
              ['iframeRef', ''],
              [1, 'logo-wrapper'],
              [1, 'actual_icon'],
              [
                'xmlns',
                'http://www.w3.org/2000/svg',
                'height',
                '1.3em',
                'viewBox',
                '0 0 384 512',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z',
              ],
              ['class', 'actual_icon', 3, 'style', 4, 'ngIf'],
              [
                'xmlns',
                'http://www.w3.org/2000/svg',
                'height',
                '1.3em',
                'viewBox',
                '0 0 512 512',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z',
              ],
              [
                'xmlns',
                'http://www.w3.org/2000/svg',
                'height',
                '1.3em',
                'viewBox',
                '0 0 640 512',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M64 0C28.7 0 0 28.7 0 64V256c0 35.3 28.7 64 64 64H96v48c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L202.7 320H352c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM352 352H256v32c0 35.3 28.7 64 64 64H437.3l81.1 60.8c4.8 3.6 11.3 4.2 16.8 1.5s8.8-8.2 8.8-14.3V448h32c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H448V256c0 53-43 96-96 96z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M48 72c0-13.3 10.7-24 24-24H344c13.3 0 24 10.7 24 24V248c0 13.3-10.7 24-24 24H216c-4.7 0-9.4 1.4-13.3 4L144 315.2V296c0-13.3-10.7-24-24-24H72c-13.3 0-24-10.7-24-24V72zM72 0C32.2 0 0 32.2 0 72V248c0 39.8 32.2 72 72 72H96v40c0 8.9 4.9 17 12.7 21.2s17.3 3.7 24.6-1.2l90-60H344c39.8 0 72-32.2 72-72V72c0-39.8-32.2-72-72-72H72zM256 376c0 39.8 32.2 72 72 72h88.7l90 60c7.4 4.9 16.8 5.4 24.6 1.2S544 496.9 544 488V448h24c39.8 0 72-32.2 72-72V200c0-39.8-32.2-72-72-72H448v48H568c13.3 0 24 10.7 24 24V376c0 13.3-10.7 24-24 24H520c-13.3 0-24 10.7-24 24v19.2L437.3 404c-3.9-2.6-8.6-4-13.3-4H328c-13.3 0-24-10.7-24-24V352H256v24z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M0 64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V416H64c-35.3 0-64-28.7-64-64V64zm160 48c-17.7 0-32 14.3-32 32v48c0 17.7 14.3 32 32 32h32v7.3c0 11.7-8.5 21.7-20.1 23.7l-7.9 1.3c-13.1 2.2-21.9 14.5-19.7 27.6s14.5 21.9 27.6 19.7l7.9-1.3c34.7-5.8 60.2-35.8 60.2-71V192 168 144c0-17.7-14.3-32-32-32H160zm224 80V168 144c0-17.7-14.3-32-32-32H304c-17.7 0-32 14.3-32 32v48c0 17.7 14.3 32 32 32h32v7.3c0 11.7-8.5 21.7-20.1 23.7l-7.9 1.3c-13.1 2.2-21.9 14.5-19.7 27.6s14.5 21.9 27.6 19.7l7.9-1.3c34.7-5.8 60.2-35.8 60.2-71V192z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M192 416c0-17.7-14.3-32-32-32H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H309.3c-6.9 0-13.7 2.2-19.2 6.4L192 464V416zM64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h64 32v32 48c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM208 144v24 24H160V144h48zm-48 80h48c-.9 21.2-15.6 39.4-36.3 44.6l-15.5 3.9c-8.6 2.1-13.8 10.8-11.6 19.4s10.8 13.8 19.4 11.6l15.5-3.9C215 290.7 240 258.7 240 222V192 168 144c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32v48c0 17.7 14.3 32 32 32zm144-80h48v24 24H304V144zm48 80c-.9 21.2-15.6 39.4-36.3 44.6l-15.5 3.9c-8.6 2.1-13.8 10.8-11.6 19.4s10.8 13.8 19.4 11.6l15.5-3.9C359 290.7 384 258.7 384 222V192 168 144c0-17.7-14.3-32-32-32H304c-17.7 0-32 14.3-32 32v48c0 17.7 14.3 32 32 32h48z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
              ],
              [
                'fill',
                'currentcolor',
                'd',
                'M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z',
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (ie(0, 'div', 0),
                at('click', function () {
                  return r.toggleChatWindow()
                }),
                _t(1, DN, 4, 3, 'div', 1),
                _t(2, TN, 9, 8, 'div', 1),
                Re(),
                ie(3, 'div', null, 2),
                st(5, 'iframe', 3, 4),
                Re()),
                2 & n &&
                  (wt(
                    'background: ',
                    null == r.embed ? null : r.embed.bubble_bg_color,
                    ';'
                  ),
                  $e(1),
                  Xe('ngIf', 'chat-window' == r.iframe_class),
                  $e(1),
                  Xe('ngIf', 'iframe_hidden' == r.iframe_class),
                  $e(1),
                  (function kp(e, t, n) {
                    Ct(Qe, Vt, gr(y(), e, t, n), !0)
                  })(' ', r.iframe_class, ''),
                  $e(2),
                  Xe('src', r.url, Da))
            },
            dependencies: [HA, Ym, mN, Py],
            styles: [
              '.chat-icon[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px;color:#fff;width:50px;height:50px;display:flex;align-items:center;justify-content:center;cursor:pointer;background-color:#007bff;border-radius:50%;z-index:99999999!important}.chat-window[_ngcontent-%COMP%]{position:fixed;bottom:80px;right:40px;width:400px;height:600px;background:transparent!important;border:0px solid #ccc;flex-direction:column;z-index:99999999!important;animation:expand .5s}.message-container[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:10px}.message[_ngcontent-%COMP%]{margin-bottom:10px}.input-container[_ngcontent-%COMP%]{display:flex;padding:10px}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;padding:5px;margin-right:10px}.input-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:5px 10px}.iframe_show[_ngcontent-%COMP%]{width:100%;height:100%;border:0px}.iframe_hidden[_ngcontent-%COMP%]{width:0px;height:0px}.actual_icon[_ngcontent-%COMP%]{margin:0;padding:0;font-size:19px;display:flex!important}',
            ],
          })),
          e
        )
      })()
      !(function zI() {
        Im = !1
      })()
      const lc = 'knibble-bot'
      ;(function ST(e) {
        return $I(
          (function yy(e) {
            return {
              appProviders: [...PT, ...(e?.providers ?? [])],
              platformProviders: xT,
            }
          })(e)
        )
      })().then((e) => {
        const t = (function wS(e, t) {
          const n = (function gS(e, t) {
              return t.get(sr).resolveComponentFactory(e).inputs
            })(e, t.injector),
            r = t.strategyFactory || new vS(e, t.injector),
            o = (function pS(e) {
              const t = {}
              return (
                e.forEach(({ propName: n, templateName: r }) => {
                  t[
                    (function lS(e) {
                      return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`)
                    })(r)
                  ] = n
                }),
                t
              )
            })(n)
          class i extends CS {
            constructor(a) {
              super(), (this.injector = a)
            }
            get ngElementStrategy() {
              if (!this._ngElementStrategy) {
                const a = (this._ngElementStrategy = r.create(
                  this.injector || t.injector
                ))
                n.forEach(({ propName: u }) => {
                  if (!this.hasOwnProperty(u)) return
                  const l = this[u]
                  delete this[u], a.setInputValue(u, l)
                })
              }
              return this._ngElementStrategy
            }
            attributeChangedCallback(a, u, l, c) {
              this.ngElementStrategy.setInputValue(o[a], l)
            }
            connectedCallback() {
              let a = !1
              this.ngElementStrategy.events &&
                (this.subscribeToEvents(), (a = !0)),
                this.ngElementStrategy.connect(this),
                a || this.subscribeToEvents()
            }
            disconnectedCallback() {
              this._ngElementStrategy && this._ngElementStrategy.disconnect(),
                this.ngElementEventsSubscription &&
                  (this.ngElementEventsSubscription.unsubscribe(),
                  (this.ngElementEventsSubscription = null))
            }
            subscribeToEvents() {
              this.ngElementEventsSubscription =
                this.ngElementStrategy.events.subscribe((a) => {
                  const u = new CustomEvent(a.name, { detail: a.value })
                  this.dispatchEvent(u)
                })
            }
          }
          return (
            (i.observedAttributes = Object.keys(o)),
            n.forEach(({ propName: s }) => {
              Object.defineProperty(i.prototype, s, {
                get() {
                  return this.ngElementStrategy.getInputValue(s)
                },
                set(a) {
                  this.ngElementStrategy.setInputValue(s, a)
                },
                configurable: !0,
                enumerable: !0,
              })
            }),
            i
          )
        })(NN, { injector: e.injector })
        customElements.get(lc) ||
          (customElements.define(lc, t), console.log(`${lc} created`))
      })
    },
  },
  (re) => {
    re((re.s = 846))
  },
])
