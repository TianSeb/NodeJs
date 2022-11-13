module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://user:pass@localhost:5432/websocket',
        searchPath:  ['knex', 'public'],
        pool: { min: 0, max: 7 },
    },
    production: {
        client: 'pg',
        connection: 'postgres://user:pass@localhost:5432/websocket',
        searchPath:  ['knex', 'public'],
        pool: { min: 0, max: 7 },
    },
  }

  