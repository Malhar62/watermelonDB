import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button,Animated } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useNavigation, useRoute,useFocusEffect } from '@react-navigation/native';
import withObservables from '@nozbe/with-observables'
type ParamsProps = {
    params: {
        blogDetail: {
            _raw: {
                id: string,
                user_id: number,
                title: string,
                image:string,
                code: string,
                tag:number
            },
        },
    }
}
const AddBlog = () => {
    const[id,setId]=useState('');
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [img,setImg]=useState('')
    const[tag,setTag]=useState(0)
    const[count,setCount]=useState(1)
    const database = useDatabase();
    let navigation = useNavigation();
    let route = useRoute();
    const longines=React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do somethinga
          setCount(count+1)
        });
    
        return unsubscribe;
      }, []);
    
    useEffect(()=>{
        let params=route.params;
        if(params){
            let blogDetail=params.blogDetail;
            setId(blogDetail._raw.id);
            setTitle(blogDetail._raw.title);
            setCode(blogDetail._raw.code);
            setTag(blogDetail._raw.tag)
        }
        
    },[])
    const onsubmit = async() => {
        Animated.timing(longines, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
        let obj={id,title,code,img,tag}
        var URL=`https://picsum.photos/id/${count}/200/300`;
        const blogCollection = await database.collections.get('blogs');
        if(id!==''){
            let blogDetail=route.params.blogDetail;
            await database.action(async()=>{
                blogDetail.updateBlog(obj);
            })
        }else{
            await database.action(async()=>{
                const newBlog=await blogCollection.create(blog=>{
                    blog.title=title
                    blog.code=code
                    blog.image=URL
                    blog.tag=count
                })
            })
            
        }
        setTimeout(()=>{
            navigation.navigate('BlogList')
            setTitle('');
            setCode('');
            setImg('');    
        },2000)
    }
    return (
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Animated.View style={{transform:[{rotate:longines.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','360deg'],
                extrapolate:'clamp'
            })}]}}>
            <TextInput
                placeholder='ENTER TITLE FOR THE BLOG'
                value={title}
                onChangeText={text => setTitle(text)}
                style={{width:200,height:50,borderWidth:2,
                }}
            />
            </Animated.View> 
            <Animated.View style={{transform:[{rotate:longines.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','360deg'],
                extrapolate:'clamp'
            })}]}}>
            <TextInput
                placeholder='ENTER CODE FOR THE BLOG'
                value={code}
                onChangeText={text => setCode(text)}
                style={{width:200,height:50,borderWidth:2,marginVertical:20,}}
            />
            </Animated.View>
            <Animated.View style={{transform:[{rotate:longines.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','360deg'],
                extrapolate:'clamp'
            })}]}}>
            <Button title="ADD" onPress={onsubmit} />
            </Animated.View>
            </View>
    );
}
export default AddBlog;