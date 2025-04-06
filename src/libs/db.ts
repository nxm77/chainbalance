import postgres from 'postgres';

export const db = postgres({
    "host": process.env.TRADER_HOST,
    "database": process.env.TRADER_DB,
    "username": process.env.TRADER_USER,
    "password": process.env.TRADER_PW,
    "port": 5432
});
