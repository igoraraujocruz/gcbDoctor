module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gcb',
  database: 'gcbdoctor',
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  cli: {
    "migrationsDir": "./src/typeorm/migrations"
  }
}
