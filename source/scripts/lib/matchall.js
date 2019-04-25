import matchAll from 'string.prototype.matchall';

// matchAll対応できないブラウザーの対策polyfill
// https://developers.google.com/web/updates/2019/02/string-matchall
matchAll.shim();
