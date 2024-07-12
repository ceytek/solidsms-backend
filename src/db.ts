import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Cey@tek85',
  database: 'test',
});

export default pool;
