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
const core = __importStar(require("@actions/core"));
const Inputs_1 = require("./Types/Inputs");
const rest_1 = require("@octokit/rest");
const semver_1 = require("semver");
const utilities_1 = require("./utilities");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const runningInJest = process.env.JEST_WORKER_ID !== undefined;
        try {
            const inputs = new Inputs_1.Inputs(process.env);
            console.log(inputs);
            const octokit = new rest_1.Octokit({
                auth: inputs.github_token
            });
            const results = yield octokit.paginate(octokit.repos.listTags, {
                per_page: 100,
                owner: inputs.owner,
                repo: inputs.repo
            });
            //     //(response) => response.data.map(tag => tag.name)
            const tags = results.filter(tag => semver_1.valid(tag.name)).sort(utilities_1.semanticSort('name')).map(tag => tag.name);
            const currentVersion = tags[tags.length - 1];
            const nextVersion = semver_1.inc(currentVersion, 'patch') || inputs.default;
            console.log(`currentVersion: ${currentVersion}`);
            console.log(`nextVersion: ${nextVersion}`);
            const branch = yield octokit.rest.repos.getBranch({
                owner: inputs.owner,
                repo: inputs.repo,
                branch: 'main'
            });
            const createdTag = yield octokit.rest.git.createTag({
                owner: inputs.owner,
                repo: inputs.repo,
                tag: nextVersion,
                message: inputs.release_notes,
                object: branch.data.commit.sha,
                type: 'commit',
                tagger: {
                    name: inputs.committer_name,
                    email: inputs.committer_email
                }
            });
            const ref = yield octokit.rest.git.createRef({
                owner: inputs.owner,
                repo: inputs.repo,
                ref: `refs/tags/${nextVersion}`,
                sha: branch.data.commit.sha
            });
            const release = yield octokit.rest.repos.createRelease({
                owner: inputs.owner,
                repo: inputs.repo,
                tag_name: nextVersion,
                name: inputs.release_name || nextVersion,
                body: inputs.release_body,
                generate_release_notes: true
            });
            core.setOutput('current_version', currentVersion);
            core.setOutput('next_version', nextVersion);
        }
        catch (error) {
            console.log(error);
            if (runningInJest) {
                core.error(error);
            }
            else {
                core.setFailed(error);
            }
        }
    });
}
run();
