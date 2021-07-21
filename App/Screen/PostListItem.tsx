import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import withObservables from '@nozbe/with-observables';
import { useNavigation } from '@react-navigation/native';
import { Q } from '@nozbe/watermelondb';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo'
type ContactInfoListItemProps = {
    blog: {
        _raw: {
            id: string,
            // user_id: number,
            name: string,
            body: string,
            image: string,
        },
    },
    onEdit: (arg1, arg2) => void,
    onDelete: (arg) => void,
}

const PostListItem = ({ blog, onEdit, post, comment, onDelete }) => {
    const [postArray, setPostArray] = useState(post);
    const [com, setCom] = useState(comment);
    const database = useDatabase();
    let navigation = useNavigation();
    const [array, setArray] = useState()
    useEffect(() => {
        setPostArray(post)
    }, [post])
    useEffect(() => {
        setCom(comment)
    }, [comment])
    console.log(post)
    return (
        <View style={{ marginTop: 20, borderBottomWidth: 0, height: 310 }} elevation={5}>
            <View style={{ flexDirection: 'row', height: 50, marginTop: 15, marginLeft: 10 }}>
                <Image source={{ uri: blog.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                <Text style={{ fontSize: 20, marginTop: 4, marginLeft: 10 }}>{blog.title}</Text>
                <MenuProvider style={{ marginLeft: 220 }}>
                    <Menu>
                        <MenuTrigger>
                            <Entypo name='dots-three-vertical' size={25} />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => onDelete(post)} >
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </MenuProvider>
            </View>
            <TouchableHighlight>
                <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: 370, height: 200, marginLeft: 10 }} />
            </TouchableHighlight>
            <View style={{ marginTop: 5, marginLeft: 10, flexDirection: 'row' }}>
                <TouchableHighlight
                    onPress={() => navigation.navigate('CommentList', { blog, post: postArray, comment: com })}>
                    <Image source={{ uri: 'data:image/png;base64,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' }}
                        style={{ width: 30, height: 30 }} />
                </TouchableHighlight>
                <Text style={{ fontSize: 20, marginLeft: 20 }}> {postArray._raw.name}</Text>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>{postArray._raw.body}</Text>
            </View>
        </View>
        /*<View >
            <View style={{ borderWidth: 1, backgroundColor: '#f1f1f1', marginTop: 20 }}>
                <TouchableOpacity onPress={()=>navigation.navigate('CommentList',{blog,post:postArray,comment:com})}>
                <Text style={{ fontSize: 20 }}> {postArray._raw.name}</Text>
                <Text style={{ fontSize: 20 }}>{postArray._raw.body}</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => onDelete(post)}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', backgroundColor: 'red' }}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onEdit(blog, postArray)}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', backgroundColor: 'blue' }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>*/
    )
}

const enhance = withObservables(['post'], ({ post }) => (
    {
        post: post.observe(),
        comment: post.comment.observe(),
    }));

export default enhance(PostListItem);