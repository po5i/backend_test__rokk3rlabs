# Installation

NodeJS version 8.6.0
NPM version 5.6.0

`npm install -g grunt-cli`

`npm install`

For database usage, this module uses `node-pre-gyp`.

# Run the server

`grunt`

Now you can browse the server at `http://localhost:3000`. Enter the search query and hit the search button.

## Database

There is a database provided at `mydb.db` file. But you can recreate it to the default state by `http://localhost:3000/init`.

The code to achieve this (and the SQL source) could be found at `app/controllers/home.js`. Section `init` from express router.