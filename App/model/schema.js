import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'blogs',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'tag', type: 'number' }
      ],
    }),
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'blog_id', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'comments',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'image', type: 'boolean' },
        { name: 'post_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
});
