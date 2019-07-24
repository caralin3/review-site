import config from '../config';
import lokiDB from './loki';
export * from './loki';

const db = lokiDB;

// if (config.database === 'loki') {
// db =
// } else {
// db =
// }

export default db;
