import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import withObservables from '@nozbe/with-observables';
import { useNavigation } from '@react-navigation/native';
import { Q } from '@nozbe/watermelondb';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import moment from 'moment';

const CommentListItem = ({ comment, delSelected, index, flag, deleting, updating }) => {
    const [com, setCom] = useState(comment);
    const [active, setActive] = useState(null);
    const database = useDatabase();
    let navigation = useNavigation();
    const longines = useRef(new Animated.Value(0)).current;
    const longines1 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setCom(comment)
    }, [comment])


    const delhi = async ({ comment, index, frag }) => {
        if (frag == false) {
            setActive(index);
            Animated.timing(longines, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
            //delSelected(comment)
            let over = {
                name: comment.name,
                body: comment.body,
                image: true
            }
            delSelected(comment, over)
        } else {
            setActive(index);
            Animated.timing(longines, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start();
            //delSelected(comment)
            let over1 = {
                name: comment.name,
                body: comment.body,
                image: false
            }
            delSelected(comment, over1)
        }
    }
    return (
        <View>
            {active == index &&
                <Animated.View style={{
                    transform: [{
                        scaleY: longines.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.5],
                            extrapolate: 'clamp'
                        })
                    }],
                    flexDirection: 'row',
                    borderWidth: 0, marginTop: 30, width: 350, height: 50, alignSelf: 'center'
                }} elevation={5}>
                    <View style={{ flexDirection: 'row' }}>
                        {com.image && <Entypo name='trash' size={20} onPress={() => deleting(com)} color='red' style={{ marginTop: 10 }} />}

                        <TouchableOpacity style={{ position: 'absolute', width: 200, marginLeft: 70 }} onPress={() => delhi({ comment: com, index, frag: com.image })}>
                            <Animated.Text style={{
                                fontSize: 30, alignSelf: 'center'
                            }}> {com.name}</Animated.Text>
                        </TouchableOpacity>

                        {com.image && <Entypo name='edit' size={20} style={{ marginLeft: 300, marginTop: 10 }} onPress={() => updating(com)} />}
                    </View>
                </Animated.View>
            }
            {active != index &&
                <View style={{ borderWidth: 0, marginTop: 20, width: 350, alignSelf: 'center' }} elevation={5}>
                    <TouchableOpacity onPress={() => delhi({ comment: com, index, frag: com.image })}>
                        <Text style={{ fontSize: 30, alignSelf: 'center' }}> {com.name}</Text>
                        <Text style={{ marginLeft: 5 }}>{com.body}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const enhance = withObservables(['comment'], ({ comment }) => (
    {
        comment: comment.observe(),
    }));
export default enhance(CommentListItem);