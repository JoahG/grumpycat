#grumpycat

Slack bot with some simple utilities

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Features

### Karma

   - Keeps track of a user's karma
   - Usage: `@username++` or `@username--`
   - Code: [`/modules/events/karma.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/karma.js)

### Decide

   - Decides between two (or more) things 
   - Usage: `!decide this or that`
   - Code: [`/modules/events/decide.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/decide.js)

### Info

  - Records/retrieves information
  - Usage: 
     - Record info: `!learn [key] as [value]`
     - Retrieve info: `!info [key]`
     - Forget info: `!forget [key]`
  - Code: [`/modules/events/info.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/info.js)

## Contributing

Submit an [issue](https://github.com/JoahG/grumpycat/issues) or open a [pull request](https://github.com/JoahG/grumpycat/pulls) if you want to help contribute to the project.

(MIT License) - Copyright (c) 2016 Joah Gerstenberg