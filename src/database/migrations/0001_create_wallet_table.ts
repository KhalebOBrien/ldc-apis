import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.wallets, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('user_id').notNullable().unsigned()
      table.decimal('amount', 15, 6).notNullable().defaultTo(0.0)
      table.timestamps(true, true)

      table.foreign('user_id').references('id').inTable('users')
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.wallets}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.wallets).then(() => {
    console.log(`# Dropped table ${ETableNames.wallets}`)
  })
}
