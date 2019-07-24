import loki from 'lokijs';
import schema from './schema.json';

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

export type Content = GetElementType<typeof schema.content>;
export type Review = GetElementType<typeof schema.reviews>;
export type Episode = GetElementType<typeof schema.episodes>;
export type User = GetElementType<typeof schema.users>;

const lokiDB = new loki('src/server/database/loki/database.json', {
  autoloadCallback,
  autosave: true,
  autoload: true
});

function autoloadCallback() {
  loadCollection<Content>('content');
  loadCollection<Episode>('episodes');
  loadCollection<Review>('reviews');
  loadCollection<User>('users');
}

function loadCollection<T extends Content | Episode | Review | User>(
  label: string
) {
  if (!lokiDB.getCollection(label)) {
    const coll = lokiDB.addCollection<T>(label);
    if (schema) {
      coll.insert(schema[label]);
    }
  }
}

export default lokiDB;
