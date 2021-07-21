import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlogList from '../Screen/BlogList';
import AddBlog from '../Screen/AddBlog';
import PostList from '../Screen/PostList';
import AddPost from '../Screen/AddPost';
import CommentList from '../Screen/CommentList';

function RootNavigation({database}: any) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BlogList">
        <Stack.Screen name='BlogList' component={()=>(
        <BlogList 
        database={database}
        />)}/>
        <Stack.Screen name='AddBlog' component={()=>(
        <AddBlog 
        database={database}
        />)}/>
        <Stack.Screen name='PostList' component={()=>(
        <PostList
         database={database}
        />)}/>
        <Stack.Screen name='AddPost' component={()=>(
        <AddPost 
        database={database}
        />)}/>
        <Stack.Screen name='CommentList' component={()=>(
        <CommentList
         database={database}
        />)}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;