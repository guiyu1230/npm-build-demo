var o = Object.defineProperty;
var k = Object.getOwnPropertyDescriptor;
var a = Object.getOwnPropertyNames;
var f = Object.prototype.hasOwnProperty;
var i = (e, t) => {
    for (var r in t) o(e, r, { get: t[r], enumerable: !0 });
  },
  m = (e, t, r, u) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of a(t))
        !f.call(e, n) &&
          n !== r &&
          o(e, n, {
            get: () => t[n],
            enumerable: !(u = k(t, n)) || u.enumerable,
          });
    return e;
  };
var p = (e) => m(o({}, "__esModule", { value: !0 }), e);
var c = {};
i(c, { getRandomToken: () => x });
module.exports = p(c);
function g() {
  return "xjskak8999";
}
function x() {
  return `${g()}_${Math.random()}`;
}
0 && (module.exports = { getRandomToken });
