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
     - Search info: `!find [key]`
        - Does a search on the keys in the database for the queried key.
  - Code: [`/modules/events/info.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/info.js)

### Permissions/Admin tools

  - The permissions modifiers are `isBanned` and `isAdmin`
  - Banned users cannot perform any Karma operations (`@username++` or `@username--`).
  - Admin users have access to the following commands:
    - `!admin ban @username` - bans a user
    - `!admin unban @username` - unbans a user
    - `!admin promote @username` - promotes a user to Admin
    - `!admin demote @username` - demotes a user from Admin
    - `!admin setKarma @username [karmaAmount]` - sets karma value on user
  - The initial (and permanent) Admin users should be set in a comma-delimited list in the `ADMIN_USERS` environment variable.
  - You can also optionally set permanently banned users in a comma-delimited list in the `BANNED_USERS` environment variable.
  - Code: [`/modules/events/admin.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/admin.js)

### Task tracker

  - Add new completed tasks with `!done [task]`
  - Retrieve all completed tasks from today with `!done`
  - Code: [`/modules/events/done.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/done.js)

### Eightball

  - Ask grumpycat questions with `@grumpycat [your question here]?`, and he will respond
  - Code: [`/modules/events/eightball.js`](https://github.com/JoahG/grumpycat/blob/master/modules/events/eightball.js)

## Contributing

Submit an [issue](https://github.com/JoahG/grumpycat/issues) or open a [pull request](https://github.com/JoahG/grumpycat/pulls) if you want to help contribute to the project.

(MIT License) - Copyright (c) 2016 Joah Gerstenberg