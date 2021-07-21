import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import PostListItem from './PostListItem';

const PostList = ({ blogs}: any) => {
    let navigation = useNavigation();
    let route = useRoute();
    const database = useDatabase();
    let blog = route.params.blog;
    let post = route.params.post;
    const [dataList, setDataList] = useState(post);
   
    useEffect(() => {
         const data = getContactInfo().then(response => {
            setDataList(response);
        })
    }, [post])

    const getContactInfo = async () => {
        let contact_info = database.collections.get('posts').query(Q.where('blog_id', blog._raw.id)).fetch();
        return contact_info;
    }

    /*const onEditContactInfo = (user, student) => {
        navigation.navigate("AddContactInfo", { user, contactInfo });
    }*/


    const onDeletePost = async(postfrompress) => {
        await postfrompress.deletePost();
        console.log(postfrompress)
        getContactInfo().then(response => {
            setDataList(response);
        })
    }
    const onEditPost = (blog, post) => {
        navigation.navigate("AddPost", { blog, post });
    }
    return (
        <View>
            <View style={{marginTop:10,width:300,alignSelf:'center',borderRadius:100}}>
            <TouchableOpacity  onPress={() => navigation.navigate("AddPost", {blog})}>
                <Text style={{fontSize:30,backgroundColor:'green',color:'white',textAlign:'center'}} >ADD POST</Text>
            </TouchableOpacity>
            </View>
            <View style={{height:620,marginTop:5}}>
            <FlatList
                data={dataList}
                renderItem={({ item, index }) => (
                <PostListItem  
                blog={blog}
                post={item} 
                onEdit={(blog,post) => onEditPost(blog, post)}
                onDelete={(student) => onDeletePost(student)}  
                database={database} />
                )}
                keyExtractor={item => item.id}
            />
            </View>
        </View>
    )
}

export default PostList;