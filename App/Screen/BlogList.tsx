import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';
import BlogListItem from './BlogListItem';
const BlogList = ({ blogs }: any) => {

    let navigation = useNavigation();
    const database = useDatabase();
    const [dataList, setDataList] = useState(blogs);
    useEffect(() => {
        const data = getData().then(response => {
            // console.log("branchData: ---", response)
            setDataList(response);
        });
    }, [blogs])
    const getData = async () => {
        const list = await database.collections.get('blogs');
        const blogArray = await list.query().fetch();
        return blogArray;
    }
    const onEditblog=async(item)=>{
        navigation.navigate('AddBlog',{blogDetail:item})
    }
    return (
        <View style={{flex:1,height:500}}>
            <View>
                <Button title='ADD BLOG' onPress={()=>navigation.navigate('AddBlog')} color='maroon'/>
            </View>
            <View>
                <FlatList
                    data={dataList}
                    renderItem={({ item, index }) => (
                        <BlogListItem 
                         blog={item} 
                         index={index} 
                         onEdit={(blog) => onEditblog(blog)} 
                         database={database} />
                    )}
                    keyExtractor={item => item.id}     

                />
            </View>
        </View>
    );
}
const enhance = withObservables(['blog'], ({ database }: any) => (
    {
        blogs: database.collections.get('blogs').query() // shortcut syntax for `comment: comment.observe()`
    }));

export default enhance(BlogList);