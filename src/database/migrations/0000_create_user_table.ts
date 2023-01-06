import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.users, (table) => {
      table.bigIncrements('id').primary()
      table.string('last_name', 225).notNullable().checkLength('>=', 3)
      table.string('other_name', 225).notNullable().checkLength('>=', 3)
      table.string('email', 100).unique().notNullable().checkLength('>=', 5)
      table.string('phone_number', 20).notNullable().checkLength('>=', 6)
      table.timestamps(true, true)
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.users}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.users).then(() => {
    console.log(`# Dropped table ${ETableNames.users}`)
  })
}
