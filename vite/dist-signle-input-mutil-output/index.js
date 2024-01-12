import { getToken } from "./util.js";
function getRandomToken() {
  return "".concat(getToken(), "_").concat(Math.random());
}
export {
  getRandomToken
};
