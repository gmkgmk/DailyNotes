!(function(i, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd ? define(t) : (i.Push = t());
})(this, function() {
  "use strict";
  function i(t) {
    return (i =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(i) {
            return typeof i;
          }
        : function(i) {
            return i &&
              "function" == typeof Symbol &&
              i.constructor === Symbol &&
              i !== Symbol.prototype
              ? "symbol"
              : typeof i;
          })(t);
  }
  function t(i, t) {
    if (!(i instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(i, t) {
    for (var n = 0; n < t.length; n++) {
      var e = t[n];
      (e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        "value" in e && (e.writable = !0),
        Object.defineProperty(i, e.key, e);
    }
  }
  function e(i, t, e) {
    return t && n(i.prototype, t), e && n(i, e), i;
  }
  function o(i, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (i.prototype = Object.create(t && t.prototype, {
      constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 }
    })),
      t &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(i, t)
          : (i.__proto__ = t));
  }
  function r(i, t) {
    if (t && ("object" == typeof t || "function" == typeof t)) return t;
    if (!i)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return i;
  }
  var s = {
      errors: {
        incompatible: "".concat(
          "PushError:",
          " Push.js is incompatible with browser."
        ),
        invalid_plugin: "".concat(
          "PushError:",
          " plugin class missing from plugin manifest (invalid plugin). Please check the documentation."
        ),
        invalid_title: "".concat(
          "PushError:",
          " title of notification must be a string"
        ),
        permission_denied: "".concat(
          "PushError:",
          " permission request declined"
        ),
        sw_notification_error: "".concat(
          "PushError:",
          " could not show a ServiceWorker notification due to the following reason: "
        ),
        sw_registration_error: "".concat(
          "PushError:",
          " could not register the ServiceWorker due to the following reason: "
        ),
        unknown_interface: "".concat(
          "PushError:",
          " unable to create notification: unknown interface"
        )
      }
    },
    c = (function() {
      function i(n) {
        t(this, i),
          (this._win = n),
          (this.GRANTED = "granted"),
          (this.DEFAULT = "default"),
          (this.DENIED = "denied"),
          (this._permissions = [this.GRANTED, this.DEFAULT, this.DENIED]);
      }
      return (
        e(i, [
          {
            key: "request",
            value: function(i, t) {
              return arguments.length > 0
                ? this._requestWithCallback.apply(this, arguments)
                : this._requestAsPromise();
            }
          },
          {
            key: "_requestWithCallback",
            value: function(i, t) {
              var n = this,
                e = this.get(),
                o = function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : n._win.Notification.permission;
                  void 0 === e &&
                    n._win.webkitNotifications &&
                    (e = n._win.webkitNotifications.checkPermission()),
                    e === n.GRANTED || 0 === e ? i && i() : t && t();
                };
              e !== this.DEFAULT
                ? o(e)
                : this._win.webkitNotifications &&
                  this._win.webkitNotifications.checkPermission
                  ? this._win.webkitNotifications.requestPermission(o)
                  : this._win.Notification &&
                    this._win.Notification.requestPermission
                    ? this._win.Notification.requestPermission()
                        .then(o)
                        .catch(function() {
                          t && t();
                        })
                    : i && i();
            }
          },
          {
            key: "_requestAsPromise",
            value: function() {
              var i = this,
                t = this.get(),
                n = function(t) {
                  return t === i.GRANTED || 0 === t;
                },
                e = t !== this.DEFAULT,
                o =
                  this._win.Notification &&
                  this._win.Notification.requestPermission,
                r =
                  this._win.webkitNotifications &&
                  this._win.webkitNotifications.checkPermission;
              return new Promise(function(s, c) {
                var a = function(i) {
                  return n(i) ? s() : c();
                };
                e
                  ? a(t)
                  : r
                    ? i._win.webkitNotifications.requestPermission(function(i) {
                        a(i);
                      })
                    : o
                      ? i._win.Notification.requestPermission()
                          .then(function(i) {
                            a(i);
                          })
                          .catch(c)
                      : s();
              });
            }
          },
          {
            key: "has",
            value: function() {
              return this.get() === this.GRANTED;
            }
          },
          {
            key: "get",
            value: function() {
              return this._win.Notification && this._win.Notification.permission
                ? this._win.Notification.permission
                : this._win.webkitNotifications &&
                  this._win.webkitNotifications.checkPermission
                  ? this._permissions[
                      this._win.webkitNotifications.checkPermission()
                    ]
                  : navigator.mozNotification
                    ? this.GRANTED
                    : this._win.external && this._win.external.msIsSiteMode
                      ? this._win.external.msIsSiteMode()
                        ? this.GRANTED
                        : this.DEFAULT
                      : this.GRANTED;
            }
          }
        ]),
        i
      );
    })(),
    a = (function() {
      function n() {
        t(this, n);
      }
      return (
        e(n, null, [
          {
            key: "isUndefined",
            value: function(i) {
              return void 0 === i;
            }
          },
          {
            key: "isString",
            value: function(i) {
              return "string" == typeof i;
            }
          },
          {
            key: "isFunction",
            value: function(i) {
              return i && "[object Function]" === {}.toString.call(i);
            }
          },
          {
            key: "isObject",
            value: function(t) {
              return "object" === i(t);
            }
          },
          {
            key: "objectMerge",
            value: function(i, t) {
              for (var n in t)
                i.hasOwnProperty(n) &&
                this.isObject(i[n]) &&
                this.isObject(t[n])
                  ? this.objectMerge(i[n], t[n])
                  : (i[n] = t[n]);
            }
          }
        ]),
        n
      );
    })(),
    u = function i(n) {
      t(this, i), (this._win = n);
    },
    f = (function(i) {
      function n() {
        return (
          t(this, n),
          r(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
          )
        );
      }
      return (
        o(n, u),
        e(n, [
          {
            key: "isSupported",
            value: function() {
              return void 0 !== this._win.Notification;
            }
          },
          {
            key: "create",
            value: function(i, t) {
              return new this._win.Notification(i, {
                icon:
                  a.isString(t.icon) || a.isUndefined(t.icon)
                    ? t.icon
                    : t.icon.x32,
                body: t.body,
                tag: t.tag,
                requireInteraction: t.requireInteraction
              });
            }
          },
          {
            key: "close",
            value: function(i) {
              i.close();
            }
          }
        ]),
        n
      );
    })(),
    h = (function(i) {
      function n() {
        return (
          t(this, n),
          r(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
          )
        );
      }
      return (
        o(n, u),
        e(n, [
          {
            key: "isSupported",
            value: function() {
              return (
                void 0 !== this._win.navigator &&
                void 0 !== this._win.navigator.serviceWorker
              );
            }
          },
          {
            key: "getFunctionBody",
            value: function(i) {
              var t = i.toString().match(/function[^{]+{([\s\S]*)}$/);
              return void 0 !== t && null !== t && t.length > 1 ? t[1] : null;
            }
          },
          {
            key: "create",
            value: function(i, t, n, e, o) {
              var r = this;
              this._win.navigator.serviceWorker.register(e),
                this._win.navigator.serviceWorker.ready
                  .then(function(e) {
                    var c = {
                      id: i,
                      link: n.link,
                      origin: document.location.href,
                      onClick: a.isFunction(n.onClick)
                        ? r.getFunctionBody(n.onClick)
                        : "",
                      onClose: a.isFunction(n.onClose)
                        ? r.getFunctionBody(n.onClose)
                        : ""
                    };
                    void 0 !== n.data &&
                      null !== n.data &&
                      (c = Object.assign(c, n.data)),
                      e
                        .showNotification(t, {
                          icon: n.icon,
                          body: n.body,
                          vibrate: n.vibrate,
                          tag: n.tag,
                          data: c,
                          requireInteraction: n.requireInteraction,
                          silent: n.silent
                        })
                        .then(function() {
                          e.getNotifications().then(function(i) {
                            e.active.postMessage(""), o(i);
                          });
                        })
                        .catch(function(i) {
                          throw new Error(
                            s.errors.sw_notification_error + i.message
                          );
                        });
                  })
                  .catch(function(i) {
                    throw new Error(s.errors.sw_registration_error + i.message);
                  });
            }
          },
          { key: "close", value: function() {} }
        ]),
        n
      );
    })(),
    l = (function(i) {
      function n() {
        return (
          t(this, n),
          r(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
          )
        );
      }
      return (
        o(n, u),
        e(n, [
          {
            key: "isSupported",
            value: function() {
              return void 0 !== this._win.navigator.mozNotification;
            }
          },
          {
            key: "create",
            value: function(i, t) {
              var n = this._win.navigator.mozNotification.createNotification(
                i,
                t.body,
                t.icon
              );
              return n.show(), n;
            }
          }
        ]),
        n
      );
    })(),
    _ = (function(i) {
      function n() {
        return (
          t(this, n),
          r(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
          )
        );
      }
      return (
        o(n, u),
        e(n, [
          {
            key: "isSupported",
            value: function() {
              return (
                void 0 !== this._win.external &&
                void 0 !== this._win.external.msIsSiteMode
              );
            }
          },
          {
            key: "create",
            value: function(i, t) {
              return (
                this._win.external.msSiteModeClearIconOverlay(),
                this._win.external.msSiteModeSetIconOverlay(
                  a.isString(t.icon) || a.isUndefined(t.icon)
                    ? t.icon
                    : t.icon.x16,
                  i
                ),
                this._win.external.msSiteModeActivate(),
                null
              );
            }
          },
          {
            key: "close",
            value: function() {
              this._win.external.msSiteModeClearIconOverlay();
            }
          }
        ]),
        n
      );
    })(),
    v = (function(i) {
      function n() {
        return (
          t(this, n),
          r(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
          )
        );
      }
      return (
        o(n, u),
        e(n, [
          {
            key: "isSupported",
            value: function() {
              return void 0 !== this._win.webkitNotifications;
            }
          },
          {
            key: "create",
            value: function(i, t) {
              var n = this._win.webkitNotifications.createNotification(
                t.icon,
                i,
                t.body
              );
              return n.show(), n;
            }
          },
          {
            key: "close",
            value: function(i) {
              i.cancel();
            }
          }
        ]),
        n
      );
    })();
  return new ((function() {
    function i(n) {
      t(this, i),
        (this._currentId = 0),
        (this._notifications = {}),
        (this._win = n),
        (this.Permission = new c(n)),
        (this._agents = {
          desktop: new f(n),
          chrome: new h(n),
          firefox: new l(n),
          ms: new _(n),
          webkit: new v(n)
        }),
        (this._configuration = {
          serviceWorker: "/serviceWorker.min.js",
          fallback: function(i) {}
        });
    }
    return (
      e(i, [
        {
          key: "_closeNotification",
          value: function(i) {
            var t = !0,
              n = this._notifications[i];
            if (void 0 !== n) {
              if (
                ((t = this._removeNotification(i)),
                this._agents.desktop.isSupported())
              )
                this._agents.desktop.close(n);
              else if (this._agents.webkit.isSupported())
                this._agents.webkit.close(n);
              else {
                if (!this._agents.ms.isSupported())
                  throw ((t = !1), new Error(s.errors.unknown_interface));
                this._agents.ms.close();
              }
              return t;
            }
            return !1;
          }
        },
        {
          key: "_addNotification",
          value: function(i) {
            var t = this._currentId;
            return (this._notifications[t] = i), this._currentId++, t;
          }
        },
        {
          key: "_removeNotification",
          value: function(i) {
            var t = !1;
            return (
              this._notifications.hasOwnProperty(i) &&
                (delete this._notifications[i], (t = !0)),
              t
            );
          }
        },
        {
          key: "_prepareNotification",
          value: function(i, t) {
            var n,
              e = this;
            return (
              (n = {
                get: function() {
                  return e._notifications[i];
                },
                close: function() {
                  e._closeNotification(i);
                }
              }),
              t.timeout &&
                setTimeout(function() {
                  n.close();
                }, t.timeout),
              n
            );
          }
        },
        {
          key: "_serviceWorkerCallback",
          value: function(i, t, n) {
            var e = this,
              o = this._addNotification(i[i.length - 1]);
            navigator &&
              navigator.serviceWorker &&
              (navigator.serviceWorker.addEventListener("message", function(i) {
                var t = JSON.parse(i.data);
                "close" === t.action &&
                  Number.isInteger(t.id) &&
                  e._removeNotification(t.id);
              }),
              n(this._prepareNotification(o, t))),
              n(null);
          }
        },
        {
          key: "_createCallback",
          value: function(i, t, n) {
            var e,
              o = this,
              r = null;
            if (
              ((t = t || {}),
              (e = function(i) {
                o._removeNotification(i),
                  a.isFunction(t.onClose) && t.onClose.call(o, r);
              }),
              this._agents.desktop.isSupported())
            )
              try {
                r = this._agents.desktop.create(i, t);
              } catch (e) {
                var s = this._currentId,
                  c = this.config().serviceWorker,
                  u = function(i) {
                    return o._serviceWorkerCallback(i, t, n);
                  };
                this._agents.chrome.isSupported() &&
                  this._agents.chrome.create(s, i, t, c, u);
              }
            else
              this._agents.webkit.isSupported()
                ? (r = this._agents.webkit.create(i, t))
                : this._agents.firefox.isSupported()
                  ? this._agents.firefox.create(i, t)
                  : this._agents.ms.isSupported()
                    ? (r = this._agents.ms.create(i, t))
                    : ((t.title = i), this.config().fallback(t));
            if (null !== r) {
              var f = this._addNotification(r),
                h = this._prepareNotification(f, t);
              a.isFunction(t.onShow) && r.addEventListener("show", t.onShow),
                a.isFunction(t.onError) &&
                  r.addEventListener("error", t.onError),
                a.isFunction(t.onClick) &&
                  r.addEventListener("click", t.onClick),
                r.addEventListener("close", function() {
                  e(f);
                }),
                r.addEventListener("cancel", function() {
                  e(f);
                }),
                n(h);
            }
            n(null);
          }
        },
        {
          key: "create",
          value: function(i, t) {
            var n,
              e = this;
            if (!a.isString(i)) throw new Error(s.errors.invalid_title);
            return (
              (n = this.Permission.has()
                ? function(n, o) {
                    try {
                      e._createCallback(i, t, n);
                    } catch (i) {
                      o(i);
                    }
                  }
                : function(n, o) {
                    e.Permission.request()
                      .then(function() {
                        e._createCallback(i, t, n);
                      })
                      .catch(function() {
                        o(s.errors.permission_denied);
                      });
                  }),
              new Promise(n)
            );
          }
        },
        {
          key: "count",
          value: function() {
            var i,
              t = 0;
            for (i in this._notifications)
              this._notifications.hasOwnProperty(i) && t++;
            return t;
          }
        },
        {
          key: "close",
          value: function(i) {
            var t;
            for (t in this._notifications)
              if (
                this._notifications.hasOwnProperty(t) &&
                this._notifications[t].tag === i
              )
                return this._closeNotification(t);
          }
        },
        {
          key: "clear",
          value: function() {
            var i,
              t = !0;
            for (i in this._notifications)
              this._notifications.hasOwnProperty(i) &&
                (t = t && this._closeNotification(i));
            return t;
          }
        },
        {
          key: "supported",
          value: function() {
            var i = !1;
            for (var t in this._agents)
              this._agents.hasOwnProperty(t) &&
                (i = i || this._agents[t].isSupported());
            return i;
          }
        },
        {
          key: "config",
          value: function(i) {
            return (
              (void 0 !== i || (null !== i && a.isObject(i))) &&
                a.objectMerge(this._configuration, i),
              this._configuration
            );
          }
        },
        {
          key: "extend",
          value: function(i) {
            var t,
              n = {}.hasOwnProperty;
            if (!n.call(i, "plugin")) throw new Error(s.errors.invalid_plugin);
            n.call(i, "config") &&
              a.isObject(i.config) &&
              null !== i.config &&
              this.config(i.config),
              (t = new (0, i.plugin)(this.config()));
            for (var e in t)
              n.call(t, e) && a.isFunction(t[e]) && (this[e] = t[e]);
          }
        }
      ]),
      i
    );
  })())("undefined" != typeof window ? window : global);
});
