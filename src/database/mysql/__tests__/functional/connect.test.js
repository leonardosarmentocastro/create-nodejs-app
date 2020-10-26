const test = require('ava');

const { connect } = require('../../connect');

// Necessary
test.before('loading environment variables', t => require('dotenv').config());

test.only('(database:mysql) connection can be stablished', async t => {
  t.notThrows(async () => await connect());
});

test.only('(database:mysql) dummy queries can be executed', async t => {
  const tableName = 'test-table';
  const mysql = await connect();

  // dropping table
  await mysql.schema.dropTableIfExists(tableName);
  t.falsy(await mysql.schema.hasTable(tableName));

  // creating table
  await mysql.schema.createTable(tableName, table => {
    table.increments();
    table.string('name');
  });
  t.truthy(await mysql.schema.hasTable(tableName));

  // inserting values
  await mysql(tableName).insert({ name: 'test' });
  const [ result ] = await mysql.select().from(tableName);
  t.like(result, { id: 1, name: 'test' });
});
