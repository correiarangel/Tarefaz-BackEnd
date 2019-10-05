module.exports = {
        client:'postgresql',
        connection:{
            database:'dbTasks',
            user:'rangel',
            password:'AMX@54321'
        },
        pool:{
            min:2,
            max:10
        },
        migrations:{
            tableName:'knex_migrations'
        }
}