'use strict';

function getToken() {
  return 'xjskak8999';
}
function getRandomToken() {
  return "".concat(getToken(), "_").concat(Math.random());
}
exports.getRandomToken = getRandomToken;
