import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ScrollView, TouchableHighlight, Image, Animated } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';
import Entypo from 'react-native-vector-icons/Entypo'
type Props = {
    index: number
    blog: {
        _raw: {
            id: string,
            title: string,
            code: string,
            image: string,
            tag: number
        },
        deleteBlog: () => void;
    },
    onEdit: (arg) => void
}

const BlogListItem = ({ blog, onEdit, post, index }) => {
    const [post1, setPost1] = useState(null);
    const database = useDatabase();
    let navigation = useNavigation();
    const length = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        setPost1(post && post)
    }, [post]);
    const onDeleteBlog = async (bag) => {
        bag.deleteBlog();
    }

    return (


        <ScrollView
            horizontal={true}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: length } } },

            ], )}
        >
            <Animated.View elevation={5} style={{
                flexDirection: 'row', borderBottomWidth: 0, height: 100, width: 480, marginTop: 20,
                backgroundColor: length.interpolate({
                    inputRange: [0, 50],
                    outputRange: ['#fff', 'pink'],
                    extrapolate: 'clamp',
                })
            }}>
                <TouchableHighlight
                    onPress={() => {
                        navigation.navigate('PostList', { blog, post: post1, index })
                    }}
                >
                    <Image source={{ uri: blog._raw.image }} style={{ marginTop: 10, width: 80, height: 80, borderRadius: 40 }} />
                </TouchableHighlight>
                <Text style={{ fontSize: 20, marginLeft: 20, marginTop: 30 }}>{blog._raw.title}</Text>
                <Animated.View style={{
                    position: 'absolute', marginLeft: 410, marginTop: 13, width: 60, height: 80,
                    backgroundColor: length.interpolate({
                        inputRange: [0, 50],
                        outputRange: ['#fff', 'pink'],
                        extrapolate: 'clamp',
                    }), marginBottom: 20
                }}>

                </Animated.View>
                <View style={{ position: 'absolute', marginLeft: 430 }}>
                    <TouchableOpacity onPress={()=>onDeleteBlog(blog)} style={{ marginTop: 30 }}>
                        <Entypo name='trash' size={30} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
        /*<View style={{ flexDirection: 'row' }}>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('PostList',{blog,post:post1})}>
                    <Text>{blog._raw.code}</Text>
                    
                    <Text>{blog._raw.title}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity  onPress={onDeleteBlog}><Text>X</Text></TouchableOpacity>
            <TouchableOpacity onPress={onEdit(blog)}><Text>E</Text></TouchableOpacity>
           

    </View>*/
    );
}
const enhance = withObservables(['blog'], ({ blog }) => (
    {
        blog: blog.observe(), // shortcut syntax for `comment: comment.observe()`
        post: blog.post.observe(),
    }));

export default enhance(BlogListItem);