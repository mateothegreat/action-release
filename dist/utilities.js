"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticSort = exports.wait = void 0;
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(r => setTimeout(r, ms));
    });
}
exports.wait = wait;
const semanticSort = (key) => (a, b) => {
    let a1;
    let b1;
    if (key) {
        a1 = a[key].split('.');
        b1 = b[key].split('.');
    }
    else {
        a1 = a.split('.');
        b1 = b.split('.');
    }
    const len = Math.min(a1.length, b1.length);
    for (let i = 0; i < len; i++) {
        const a2 = +a1[i] || 0;
        const b2 = +b1[i] || 0;
        if (a2 !== b2) {
            return a2 > b2 ? 1 : -1;
        }
    }
    return b1.length - a1.length;
};
exports.semanticSort = semanticSort;
