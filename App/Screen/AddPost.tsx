import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Button } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables';

const AddPost = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('')
    const database = useDatabase();
    let navigation = useNavigation();
    let route = useRoute();
    let blog = route.params.blog;//beacuse user has action addStudent
    const longines = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        let post = route.params.post;
        if (post) {
            setId(post._raw.id);
            setName(post._raw.name);
            setBody(post._raw.tag)
            setImage(post._raw.image)
        }
    }, [])
    const onSubmit = async () => {
        Animated.timing(longines, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
        setImage('https://picsum.photos/200')
        let data = {
            id, name, body, image
        }
        if (id !== '') {
            let post = route.params.post;
            await database.action(async () => {
                post.updatePost(data, blog);
            });
            navigation.navigate("BlogList");

        } else {
            await database.action(async () => {
                blog.addPost({ name, body, image })
            })
            navigation.navigate("BlogList");
        }
        setName('');
        setBody('');
        setImage('');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={{
                transform: [{
                    rotate: longines.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                        extrapolate: 'clamp'
                    })
                }]
            }}>
                <TextInput
                    placeholder='ENTER TITLE FOR THE BLOG'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{
                        width: 200, height: 50, borderWidth: 2,
                    }}
                />
            </Animated.View>
            <Animated.View style={{
                transform: [{
                    rotate: longines.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                        extrapolate: 'clamp'
                    })
                }]
            }}>
                <TextInput
                    placeholder='ENTER CODE FOR THE BLOG'
                    value={body}
                    onChangeText={text => setBody(text)}
                    style={{ width: 200, height: 50, borderWidth: 2, marginVertical: 20, }}
                />
            </Animated.View>
            <Animated.View style={{
                transform: [{
                    rotate: longines.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                        extrapolate: 'clamp'
                    })
                }]
            }}>
                <Button title="ADD" onPress={onSubmit} />
            </Animated.View>
        </View>
    );
}

export default AddPost;