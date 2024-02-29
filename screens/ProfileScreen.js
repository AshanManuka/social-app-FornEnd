import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native';


const ProfileScreen = ({navigation, route}) => {

    const [profileDetail, setProfileDetail] = useState(null);
    const [uId, setUserId] = React.useState('');
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        if (route.params && route.params.userId) {
            setUserId(route.params.userId);
        }

        console.log(uId);
        fetchData(`http://107.21.143.177:8080/user/my-profile?userId=${2}`)
        


      },[route.params]);

    const fetchData = async (backEndUrl) => {
        try {
            const data = await fetchTodayImages(backEndUrl);
            const element = {
                'id' : data.id,
                'name' : data.name,
                'profileImage' : data.profileImage,
                'email' : data.email,
                }
            setImageUri(data.profileImage);
            setProfileDetail(element);
        } catch (error) {
            // Handle error
        }
    };

    const fetchTodayImages = async (backEndUrl) => {
        try {
          const response = await fetch(backEndUrl);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching today images', error);
          throw error;
        }
      };

    return(
        <View style={styles.body}>
            <Text style={styles.textOne}>Profile</Text>

            <Text style={styles.detailText}>Name : {profileDetail.name}</Text>
            <Text style={styles.detailText}>Email : {profileDetail.email}</Text>

            
            
            <View style={styles.proPicView}>
            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <Text>Loading..</Text>
            )}

            </View>

           


        </View>
    );




}
export default ProfileScreen;

const styles= StyleSheet.create({
    body : {
        backgroundColor: '#1e272e',
        flex:1
      },
      textOne:{
        color: '#dfe4ea',
        marginTop: '18%',
        marginBottom:'8%',
        marginLeft:'3%',
        fontSize: 30,
        fontWeight: 'bold',
      },
      proPicView:{
        backgroundColor :'#fff',
        width : 100,
        height : 100,
        marginTop : '-25%',
        marginLeft :'67%',
        borderRadius: 100
      },
      image: {
        position: 'absolute',
        width: '0.1%',
        height: '95%',
        marginLeft: '80%',
        marginTop:'5%',
        borderRadius:35
      },
      detailText:{
        color : '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        left: '5%'
      }

})