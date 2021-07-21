import React from 'react';
import { Database } from '@nozbe/watermelondb';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './App/model/schema';
import RootNavigation from './App/Navigation/RootNavigation';
import Blog from './App/model/Blog';
import Post from './App/model/Post';
import Comment from './App/model/Comment';
function App() {

  const adapter = new SQLiteAdapter({
    dbName: 'WatermelonDemo',
    schema,
  });
  const database = new Database({
    adapter: adapter,
    modelClasses: [Blog,Post,Comment],
    actionsEnabled: true,
  })
  return (
    <DatabaseProvider database={database}>
      <RootNavigation database={database} />
    </DatabaseProvider>
  );
};

export default App;
