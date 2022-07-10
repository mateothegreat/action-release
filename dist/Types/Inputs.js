"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inputs = void 0;
const Increment_1 = require("./Increment");
const core = __importStar(require("@actions/core"));
class Inputs {
    constructor(env) {
        var _a, _b, _c, _d;
        this.default = '0.0.0';
        if (core.getInput('github_token', { required: true }).trim().match(/^ghp_[a-z\d]{36}$/i)) {
            this.github_token = env.INPUT_GITHUB_TOKEN.trim();
        }
        else {
            throw new Error(`github_token is not a valid GitHub personal access token: ${env.INPUT_GITHUB_TOKEN}`);
        }
        if (core.getInput('owner', { required: true }).trim().match(/^[a-z\d-_]{1,50}$/i)) {
            this.owner = env.INPUT_OWNER.trim();
        }
        else {
            throw new Error(`owner is not a valid GitHub organization or user name: ${env.INPUT_OWNER.trim()}`);
        }
        if (core.getInput('repo', { required: true }).trim().match(/^[a-z0-9_-]{1,50}$/i)) {
            this.repo = env.INPUT_REPO.trim();
        }
        else {
            throw new Error(`repo is not a valid GitHub repository name: ${env.INPUT_REPO.trim()}`);
        }
        if (core.getInput('increment', { required: true }).trim().toLowerCase() in Increment_1.Increment) {
            this.increment = Increment_1.Increment[env.INPUT_INCREMENT.trim()];
        }
        else {
            throw new Error(`increment is not a valid increment: ${env.INPUT_INCREMENT.trim()} (must be one of: ${Object.keys(Increment_1.Increment).join(', ')})`);
        }
        if ((_a = core.getInput('default')) === null || _a === void 0 ? void 0 : _a.trim()) {
            if ((_b = core.getInput('default').trim()) === null || _b === void 0 ? void 0 : _b.match(/^\d+\.\d+\.\d+/)) {
                this.default = env.INPUT_DEFAULT.trim();
            }
            else {
                throw new Error(`default is not a valid tag: ${((_c = env.INPUT_DEFAULT) === null || _c === void 0 ? void 0 : _c.trim()) || 'not set'}`);
            }
        }
        this.release_name = (_d = env.INPUT_RELEASE_NAME) === null || _d === void 0 ? void 0 : _d.trim();
        this.release_body = env.INPUT_RELEASE_BODY.trim();
        this.release_notes = env.INPUT_RELEASE_NOTES.trim();
        this.committer_name = env.INPUT_COMMITTER_NAME.trim();
        this.committer_email = env.INPUT_COMMITTER_EMAIL.trim();
    }
}
exports.Inputs = Inputs;
