import postgres from 'postgres';

// Create the connection
const sql = postgres({
    "host": process.env.TRADER_HOST,
    "database": process.env.TRADER_DB,
    "username": process.env.TRADER_USER,
    "password": process.env.TRADER_PW,
    "port": 5432
});

// Example function
async function main() {
  try {
    const result = await sql`SELECT now()`;
    console.log('Result:', result);
  } catch (error) {
    console.error('DB Error:', error);
  } finally {
    await sql.end();
    console.log('Connection closed.');
  }
}

main();