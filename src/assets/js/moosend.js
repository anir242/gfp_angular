!function (t, n, e, o, a) {
  function d(t) {
    var n = ~~(Date.now() / 3e5), o = document.createElement(e);
    o.async = !0, o.src = t + "?ts=" + n;
    var a = document.getElementsByTagName(e)[0];
    a.parentNode.insertBefore(o, a)
  } t.MooTrackerObject = a, t[a] = t[a] || function () {
    return t[a].q ? void t[a].q.push(arguments) : void (t[a].q = [arguments])
  }, window.attachEvent ? window.attachEvent("onload", d.bind(this, o)) : window.addEventListener("load", d.bind(this, o), !1)
}(window, document, "script", "//cdn.stat-track.com/statics/moosend-tracking.min.js", "mootrack");
mootrack('init', '58d25701-eee0-4592-9409-059b39c9e5aa');
mootrack('trackPageView');
