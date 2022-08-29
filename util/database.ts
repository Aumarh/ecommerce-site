// import fs from 'node:fs';
import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// // don't forget yarn dev pg-connection-string
// setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getAllFabrics() {
  const fabrics = await sql`
    SELECT * FROM fabrics
  `;
  return fabrics.map((fabric) => camelcaseKeys(fabric));
}

export async function getFabricById(id: number) {
  const [fabric] = await sql`
    SELECT * FROM fabrics
    WHERE id = ${id}
  `;
  return camelcaseKeys(fabric);
}

// const fabricDatabase = [
//   {
//     id: '1',
//     slug: 'cotton-fabric',
//     name: 'Cotton fabric',
//     category: 'Cotton',
//     price: 60,
//     // rating: 4.1,
//     quantity: 20,
//     description: 'Egyptian cotton fabric',
//   },
//   {
//     id: '2',
//     slug: 'ankara-fabric',
//     name: 'Ankara Fabric',
//     category: 'Ankara',
//     price: 80,
//     // rating: 3.5,
//     quantity: 20,
//     description: 'A hollandise Anakara fabric',
//   },
//   {
//     id: '3',
//     slug: 'silk-fabric',
//     name: 'Silk Fabric',
//     category: 'Silk',
//     price: 67,
//     // rating: 4.4,
//     quantity: 20,
//     description: 'A silk fabric',
//   },
//   {
//     id: '4',
//     slug: 'lace-fabric',
//     name: 'Lace Fabric',
//     category: 'Lace',
//     price: 75,
//     // rating: 3.2,
//     quantity: 0,
//     description: 'A swiss lace fabric',
//   },
//   {
//     id: '5',
//     slug: 'adire-fabric',
//     name: 'Adire Fabric',
//     category: 'Adire',
//     price: 98,
//     // rating: 4.8,
//     quantity: 20,
//     description: 'A tye and dye Adire fabric',
//   },
//   {
//     id: '6',
//     slug: 'wool-fabric',
//     name: 'Wool Fabric',
//     category: 'Wool',
//     price: 60,
//     // rating: 2.8,
//     quantity: 20,
//     description: 'A wool fabric',
//   },
// ];

// export default fabricDatabase;

// export async function getFabricDatabase() {
//   const fabrics = await fabricDatabase;
//   return fabrics.map((fabric) => fabric);
// }
