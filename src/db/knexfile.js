module.exports =  {
    development: {
        client: 'pg',
        connection: 'postgres://user:pass@localhost:5432/coderhouse',
        searchPath:  ['knex', 'public'],
        pool: { min: 0, max: 3 },
    },
    production: {
        client: 'pg',
        connection: 'postgres://user:pass@localhost:5432/coderhouse',
        searchPath:  ['knex', 'public'],
        pool: { min: 0, max: 3 },
    },
}