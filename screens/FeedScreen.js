import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';



const FeedScreen = ({navigation, route}) => {

    const [uId, setUserId] = React.useState('');
    const [uEmail, setUserEmail] = React.useState('');
    const [profileImg, setProfileImg] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [todayImageList, setTodayImageList] = useState([]);


  useEffect(() => {
      if (route.params && route.params.userId && route.params.userEmail) {
          setUserId(route.params.userId);
          setUserEmail(route.params.userEmail);
      }

      
      getUserDetail(2);
      getFeedImages();
      

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

  const getFeedImages = async () => {
      const backEndUrl = `http://107.21.143.177:8080/user/today-images`;

    try {
      const tempImage = [];
      const response = await fetch(backEndUrl);
        if(response.ok){
          const responseData = await response.json();
          
          for (let index = 0; index < 3; index++) {
            const element = {
              'id' : responseData.body[index].id,
              'title' : responseData.body[index].title,
              'description' : responseData.body[index].description,
              'image' : responseData.body[index].picture
            }
            tempImage.push(element);
            console.log(responseData.body[index].id)
          }
          setTodayImageList(tempImage);
                              
      } else {
        throw new Error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    
  }

    const openSearchView = () =>{
      //getFeedImages();
    }

    const openSaveList = () =>{
      alert("Open search")
    }


    

    return(
        <View style={styles.body}>
            <View style={styles.titleBar}>

            <TouchableOpacity 
            onPress={openSearchView}>
              <Image source={require('./../assets/search.png')} style={styles.iconOne} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnTwo}>
              <Image source={require('./../assets/cart.png')} style={styles.iconTwo} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnThree}>
              <Image source={require('./../assets/addMan.png')} style={styles.iconTwo} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnFour}>
              <Image source={require('./../assets/update.png')} style={styles.iconTwo} />
            </TouchableOpacity>



            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <Text>Loading...</Text>
            )}

            </View>

            <ScrollView>
              <View style={styles.feedView}>
                {todayImageList.map((pic, id) => (
                <Image
                key={id}
                source={{ uri: pic.image }}
                style={styles.todayImages}
                onError={(error) => console.error('Image Error:', error)}
                />
                ))}
              </View>
            </ScrollView>



            

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
        height:'7%',
        marginTop:'12%',
        borderRadius:3
      },
      image: {
        position: 'absolute',
        width: '0.1%',
        height: '95%',
        marginLeft: '80%',
        marginTop:'0.5%',
        borderRadius:35
      },
      iconOne:{
        width: 40, 
        height: 40,
        borderRadius: 45,
        marginTop:'2.5%',
        marginLeft: '5%'
      },
      btnTwo:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '20%'
      },
      iconTwo:{
        width: 40, 
        height: 40,
        borderRadius: 15,
        marginTop:'2.5%',
        marginLeft: '5%'
      },
      btnThree:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '35%'
      },
      btnFour:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '50%'
      },
      feedView: {
        flexDirection: 'row', // or 'column' based on your layout
        flexWrap: 'wrap', // ensures images wrap to the next line if they don't fit
        justifyContent: 'space-between', // or 'flex-start' or 'center' based on your layout
      },
      todayImages: {
        width: 500,
        height: 500,
        borderRadius: 35,
        marginTop: '5%', // Adjust this value based on your layout
      },
    })