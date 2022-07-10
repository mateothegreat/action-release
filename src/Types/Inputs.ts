import { Increment } from './Increment';
import * as core from '@actions/core';

export class Inputs {

    public github_token: string;
    public owner: string;
    public repo: string;
    public increment: Increment;
    public default: string = '0.0.0';
    public release_name: string;
    public release_body: string;
    public release_notes: string;
    public committer_name: string;
    public committer_email: string;

    public constructor(env: { [ key: string ]: string }) {

        console.log(core.getInput('github_token', { required: true }).length);
        if (core.getInput('github_token', { required: true }).trim()) {

            this.github_token = env.INPUT_GITHUB_TOKEN.trim();

        } else {

            throw new Error(`github_token is not a valid GitHub personal access token: ${ env.INPUT_GITHUB_TOKEN }`);

        }

        if (core.getInput('owner', { required: true }).trim().match(/^[a-z\d-_]{1,50}$/i)) {

            this.owner = env.INPUT_OWNER.trim();

        } else {

            throw new Error(`owner is not a valid GitHub organization or user name: ${ env.INPUT_OWNER.trim() }`);

        }

        if (core.getInput('repo', { required: true }).trim().match(/^[a-z0-9_-]{1,50}$/i)) {

            this.repo = env.INPUT_REPO.trim();

        } else {

            throw new Error(`repo is not a valid GitHub repository name: ${ env.INPUT_REPO.trim() }`);

        }

        if (core.getInput('increment', { required: true }).trim().toLowerCase() in Increment) {

            this.increment = Increment[ env.INPUT_INCREMENT.trim() as Increment ];

        } else {

            throw new Error(`increment is not a valid increment: ${ env.INPUT_INCREMENT.trim() } (must be one of: ${ Object.keys(Increment).join(', ') })`);

        }

        if (core.getInput('default')?.trim()) {

            if (core.getInput('default').trim()?.match(/^\d+\.\d+\.\d+/)) {

                this.default = env.INPUT_DEFAULT.trim();

            } else {

                throw new Error(`default is not a valid tag: ${ env.INPUT_DEFAULT?.trim() || 'not set' }`);

            }

        }

        this.release_name = env.INPUT_RELEASE_NAME?.trim();
        this.release_body = env.INPUT_RELEASE_BODY.trim();
        this.release_notes = env.INPUT_RELEASE_NOTES.trim();
        this.committer_name = env.INPUT_COMMITTER_NAME.trim();
        this.committer_email = env.INPUT_COMMITTER_EMAIL.trim();

    }

}
