import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { encode } from 'base-64';



const FeedScreen = ({navigation, route}) => {

    const [uId, setUserId] = React.useState('');
    const [uEmail, setUserEmail] = React.useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        if (route.params && route.params.userId && route.params.userEmail) {
            setUserId(route.params.userId);
            setUserEmail(route.params.userEmail);
        }

        
        getUserDetail(2);

      }, [route.params]);

      const getUserDetail = async (userId) => {
        const imageId = 1;
        const backEndUrl = `http://107.21.143.177:8080/user/my-single-image?userId=${userId}&imageId=${imageId}`;

        fetch(backEndUrl)
        .then(response => {
        if (response.ok) {
          return response.url;
        } else {
          throw new Error('Failed to fetch image');
        }
      })
      .then(url => setImageUri(url))
      .catch(error => console.error('Error fetching image:', error));
    
      };


    

    return(
        <View style={styles.body}>
            <View style={styles.titleBar}>
            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <Text>Loading...</Text>
            )}

            </View>

            

        </View>
    );

}
export default FeedScreen;

const styles= StyleSheet.create({
    body : {
        backgroundColor: '#1e272e',
        alignItems: 'center',
        flex:1
      },
      textOne:{
        color: '#dfe4ea',
        marginTop: '18%',
        marginBottom:'8%',
        fontSize: 30,
        fontWeight: 'bold',
      },
      titleBar:{
        backgroundColor: '#2f3640',
        width: '98%',
        height:'9%',
        marginTop:'20%',
        borderRadius:3
      },
      image: {
        position: 'absolute',
        width: 65,
        height: 65,
        marginLeft: '80%',
        marginTop:'1.5%',
        borderRadius:35
        
      },
    })