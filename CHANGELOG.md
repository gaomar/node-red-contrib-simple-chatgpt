
# Change Log

## [1.2.1] - 2023-03-10

### Changed

- Updated `package.json` keywords.

## [1.2.0] - 2023-03-10
 
### Added

- Included a CHANGELOG.md file to track changes to the project.
- Included support for additional OpenAI model `gpt-3.5-turbo`. Set `msg.topic` to `turbo` to select the new model.
- Included support for conversation history for new model `gpt-3.5-turbo`. 
- Included support for new message property `msg.history`, is expected to be an array of objects containing the conversation history.

### Changed

- Updated the included example to demonstrate new features, new screenshot.
- Upgrade dependencies: `"openai": "^3.2.1"`
