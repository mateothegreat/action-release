import * as core from '@actions/core';
import { Inputs } from './Types/Inputs';
import { Octokit } from '@octokit/rest';
import { valid, inc } from 'semver';
import { semanticSort } from './utilities';

async function run(): Promise<void> {

    const runningInJest = process.env.JEST_WORKER_ID !== undefined;

    try {

        const inputs = new Inputs(process.env);

        console.log(inputs);

        const octokit = new Octokit({

            auth: inputs.github_token

        });

        const results = await octokit.paginate(octokit.repos.listTags, {

            per_page: 100,
            owner: inputs.owner,
            repo: inputs.repo

        });

//     //(response) => response.data.map(tag => tag.name)

        const tags = results.filter(tag => valid(tag.name)).sort(semanticSort('name')).map(tag => tag.name);

        const currentVersion = tags[ tags.length - 1 ];
        const nextVersion = inc(currentVersion, 'patch') || inputs.default;

        console.log(`currentVersion: ${ currentVersion }`);
        console.log(`nextVersion: ${ nextVersion }`);

        const branch = await octokit.rest.repos.getBranch({

            owner: inputs.owner,
            repo: inputs.repo,
            branch: 'main'

        });

        const createdTag = await octokit.rest.git.createTag({
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

        const ref = await octokit.rest.git.createRef({

            owner: inputs.owner,
            repo: inputs.repo,
            ref: `refs/tags/${ nextVersion }`,
            sha: branch.data.commit.sha

        });

        const release = await octokit.rest.repos.createRelease({

            owner: inputs.owner,
            repo: inputs.repo,
            tag_name: nextVersion,
            name: inputs.release_name || nextVersion,
            body: inputs.release_body,
            generate_release_notes: true

        });

        core.setOutput('current_version', currentVersion);
        core.setOutput('next_version', nextVersion);

    } catch (error) {

        console.log(error);

        if (runningInJest) {

            core.error(error);

        } else {

            core.setFailed(error);

        }

    }

}

run();
