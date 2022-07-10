import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {

    process.env[ 'INPUT_GITHUB_TOKEN' ] = process.env.GITHUB_TOKEN;
    process.env[ 'INPUT_OWNER' ] = 'mateothegreat';
    process.env[ 'INPUT_REPO' ] = 'action-release-test';
    process.env[ 'INPUT_INCREMENT' ] = 'patch';
    process.env[ 'INPUT_RELEASE_NAME' ] = 'test 1';
    process.env[ 'INPUT_RELEASE_BODY' ] = 'some body';
    process.env[ 'INPUT_RELEASE_NOTES' ] = 'some notes';
    process.env[ 'INPUT_COMMITTER_NAME' ] = 'mateo';
    process.env[ 'INPUT_COMMITTER_EMAIL' ] = 'matthew@matthewdavis.io';

    const result = cp.execFileSync(process.execPath, [ path.join(__dirname, '..', 'dist', 'main.js') ], {

        env: process.env

    }).toString();

    console.log(result);

    expect(result).not.toContain('error');

});
