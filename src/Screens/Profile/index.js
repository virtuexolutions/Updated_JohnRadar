import {View, Text, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {styles} from './index.style';
import BackButton from '../../Components/Back Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/authSlice';
import CustomText from '../../Components/Text';
import CustomButton from '../../Components/Button';

const Profile = ({navigation}) => {
  // const userData = useSelector((state) => state.data.user);
  console.log('userrrrrrrrrrrrrrrrrrrrrr',userData.user)


const dispatch = useDispatch();

  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <View style={styles.main_container}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <View style={{marginHorizontal: 20, marginTop:30}}>
            <Image source={images.logo} style={{height:70, width:70, alignSelf:'center'}}/>
          <CustomText text={'Profile'} style={styles.title} />
          <View style={styles.name_view}>
            <CustomText text={userData.name} />
          </View>
          <View style={styles.name_view}>
            <CustomText text={userData.email} />
          </View>
        <CustomButton buttonText={'Edit Profile'} onPress={()=> navigation.navigate('EditProfile')}/>
        {/* <CustomButton buttonText={'LogOut'} onPress={()=> dispatch(logOut())}/> */}
 
        </View>
      </View>
    </FastImage>
  );
};

export default Profile;
