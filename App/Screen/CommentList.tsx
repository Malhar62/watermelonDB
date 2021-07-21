import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Q } from '@nozbe/watermelondb';
import Entypo from 'react-native-vector-icons/Entypo'
import CommentListItem from './CommentListItem';
import moment from 'moment';

const CommentList = ({ }: any) => {
    let navigation = useNavigation();
    let route = useRoute();
    const database = useDatabase();
    let blog = route.params.blog;
    let post = route.params.post;
    let comment = route.params.comment;
    const [dataList, setDataList] = useState(comment);
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [flag, setFlag] = useState(false);
    const [other, setOther] = useState(false)
    const [obj, setObj] = useState({})
    var RealTime = moment().calendar();
    useEffect(() => {
        const data = getContactInfo().then(response => {
            setDataList(response);
        })
    }, [comment])

    const getContactInfo = async () => {
        let contact_info = database.collections.get('comments').query(Q.where('post_id', post._raw.id)).fetch();
        return contact_info;
    }

    /*const onEditContactInfo = (user, student) => {
        navigation.navigate("AddContactInfo", { user, contactInfo });
    }*/

    async function AddComment() {
        if (other == false) {
            let obj = { name, body: moment().calendar(), image: false }
            await database.action(async () => {
                post.addComment(obj)
            })
            navigation.navigate('PostList')
        } else {
            let open = { name, body: moment().calendar(), image: false }
            await database.action(async () => {
                obj.updateComment(open, post);
            });
            setFlag(true)
        }
        getContactInfo().then(response => {
            setDataList(response);
        })
        setName('');
        setOther(false)
    }

    const deleting = async (obj) => {
        await obj.deleteComment();
        getContactInfo().then(response => {
            setDataList(response);
        })
    }
    const delSelected = async (comment, obj) => {
        setObj(obj)
        await database.action(async () => {
            comment.updateComment(obj, post);
        });
        getContactInfo().then(response => {
            setDataList(response);
        })
    }
    const updating = async (obj) => {
        setName(obj.name)
        setOther(true);
        setObj(obj)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 50, width: '100%' }}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }}>Total : {dataList.length}</Text>

            </View>
            <View style={{ height: 570 }}>
                <FlatList
                    data={dataList}
                    renderItem={({ item, index }) => (
                        <CommentListItem
                            comment={item}
                            index={index}
                            database={database}
                            deleting={(obj) => deleting(obj)}
                            updating={(obj) => updating(obj)}
                            delSelected={(comment, obj) => delSelected(comment, obj)}
                            flag={flag}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{ flexDirection: 'row', bottom: 0, marginBottom: 5, marginLeft: 10 }}>
                <TextInput
                    placeholder='ADD COMMENTS'
                    style={{ width: 320, height: 50, borderWidth: 2, borderRadius: 30 }}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                {other ?

                    <Entypo name='edit' color='blue' size={50} style={{ marginLeft: 10 }}
                        onPress={() => AddComment()} /> :
                    <MaterialCommunityIcons name='send-circle' color='blue' size={50} style={{ marginLeft: 10 }}
                        onPress={() => AddComment()} />}
            </View>
        </View>
    )
}

export default CommentList;