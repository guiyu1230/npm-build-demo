import { getToken } from './util';
export function getRandomToken() {
    return "".concat(getToken(), "_").concat(Math.random());
}
