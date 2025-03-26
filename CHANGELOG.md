# Changelog

All notable changes to the library will be documented in this file.

## vX.X.X (Month DD, YYYY)

- Change `FormDataEntry` and `FormDataInfo` from type to interface
- Fix potential prototype pollution by ignoring certain keys

## v0.8.0 (August 20, 2024)

- Add support for array bracket notation (pull request #15)

## v0.7.5 (June 01, 2024)

- Republish previous version because build step was forgotten

## v0.7.4 (June 01, 2024)

- Remove unnecessary log statement in `decode` function

## v0.7.3 (May 29, 2024)

- Fix bug in regex of `decode` for template name creation (issue #208)

## v0.7.2 (April 30, 2024)

- Republish previous version because build step was forgotten

## v0.7.1 (April 30, 2024)

- Fix bug in template of path when decoding direct array items

## v0.7.0 (April 30, 2024)

- Add optional `transform` argument to `decode` function

## v0.6.0 (February 11, 2024)

- Change output for empty strings, `'null'` and `'undefined'` (issue #9)

## v0.5.0 (December 14, 2023)

- Add `FormDataInfo` type to global exports
- Add support for non-indexed array fields (issue #8)

## v0.4.0 (November 12, 2023)

- Add support for millisecond dates to `getFieldDate` util (pull request #7)
- Improve performance and security of regular expressions

## v0.3.0 (October 12, 2023)

- Change output of empty string dates to `null` (issue #3)

## v0.2.0 (October 11, 2023)

- Add support for `false` booleans to `getFieldValue` util (issue #1)

## v0.1.1 (October 09, 2023)

- Improve text and change example in README.md

## v0.1.0 (October 05, 2023)

- Initial release
