# action-release

GitHub action to auto-magically perform semantic version bumps and create releases.

[![Build Status](https://github.com/mateothegreat/action-release/workflows/Bump%20version/badge.svg)](https://github.com/mateothegreat/action-release/workflows/release/badge.svg)
[![Stable Version](https://img.shields.io/github/v/tag/mateothegreat/action-release)](https://img.shields.io/github/v/tag/mateothegreat/action-release)
[![Latest Release](https://img.shields.io/github/v/release/mateothegreat/action-release?color=%233D9970)](https://img.shields.io/github/v/release/mateothegreat/action-release?color=%233D9970)

## Inputs

* `owner` __(required)__ - string - The owner of your repository (username or organization name).
* `repo` __(required)__ - string - The name of your repository.
* `increment` __(required)__ - string - Increment based on major, minor, or release.
* `default` (optional) - string - The default tag if there are no tags (defaults to 0.0.0).
* `release_name` (optional) - string - Name of the release (defaults to the new version).
* `release_body` (optional) - string - Body of the release.
* `release_notes` (optional) - boolean - Automatically generate release notes for the release (it will be appended to
* `committer_name` (optional) - string - Name of the committer.
* `committer_email` (optional) - string - Email of the committer.

## Outputs

* `current_version` - string - Current (previous) version (i.e.: 0.0.1).
* `next_version` - string - Next (applied) version (i.e.: 0.0.2).
