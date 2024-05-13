"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localData = void 0;
function localData(req, res, next) {
    console.log(req.session);
    res.locals.connected = req.session.connected;
    res.locals.user = req.session.user;
    next();
}
exports.localData = localData;
//# sourceMappingURL=localsData.js.map