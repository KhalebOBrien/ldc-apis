import { Knex } from 'knex'

import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.transactions, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('sender_id').notNullable().unsigned()
      table.bigInteger('receiver_id').notNullable().unsigned()
      table.decimal('amount', 15, 6).notNullable().defaultTo(0.0)
      table.text('description').notNullable().checkLength('>=', 3)
      table.string('type', 2).notNullable().checkLength('=', 2)
      table.timestamps(true, true)

      table.foreign('sender_id').references('id').inTable('users')
      table.foreign('receiver_id').references('id').inTable('users')
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.transactions}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.transactions).then(() => {
    console.log(`# Dropped table ${ETableNames.transactions}`)
  })
}
