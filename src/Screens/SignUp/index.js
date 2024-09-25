import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './index.style';
import {RadioButton} from 'react-native-paper';
import BackButton from '../../Components/Back Button';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {COLORS} from '../../Constants/theme';
import Toast from 'react-native-toast-message';
import CustomText from '../../Components/Text';
import InputField from '../../Components/InputFiled';
import CustomButton from '../../Components/Button';
import {Formik} from 'formik';
import {SignUpValidationSchema} from '../Utills/Validations';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import LoaderModal from '../../Components/LoaderModal';
import BasUrl from '../../BasUrl';
import {Post} from '../../axios/AxiosInterceptorFunction';
import {apiHeader} from '../../Utillity/utils';
import { SignIn } from '../../Redux/authSlice';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState('first');
  const [isLoader, setIsLoader] = useState(false);

  const loader = useSelector(state => state.authData.isLoader);

  useEffect(() => {
    TestApi()
    console.log('hel')
  }, )
  

  // const RegistorUser = async (values, { setSubmitting, setValues }) => {
  //   setIsLoader(true);
  //   let data = JSON.stringify({
  //     name: values.name,
  //     email: values.email,
  //     password: values.password,
  //     tc: true,
  //   });
  //   console.log(BasUrl+ 'Register', data,'${BasUrl}Register')
  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: 'http://ec2-107-23-251-172.compute-1.amazonaws.com/api/user/Register',
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setIsLoader(false);
  //       navigation.navigate("Login");

  //       console.log("loggggggggggggggggg", JSON.stringify(response.data));
  //       setValues({ name: "", email: "", password: "", confirmPassword: "" });
  //     })
  //     .catch((error) => {
  //       setIsLoader(false);

  //       showToast("error", error.message);
  //       console.log("erorrrrrrrrrrrrrr", error.message);
  //     });
  // };

  const RegistorUser = async values => {
    const url = 'register';
    let data = {
      name: values.name,
      email: values.email,
      password: values.password,
      c_password:values.confirmPassword 
      // tc: true,
    };
   console.log(data, '=========>dataaaa');
    setIsLoader(true)
    const response = await Post(url, data, apiHeader());
    setIsLoader(false)
     console.log('======> response',response?.data)
  
    if (response) {
      console.log(response?.data, '========>>>>>reponse');
      dispatch(SignIn(response?.data?.data?.token))

    }
  };
  const TestApi = async ()=>{
    const url = 'http://ec2-107-23-251-172.compute-1.amazonaws.com/'
    try {
      const response = await axios.get(url ,  {
        headers: {
        //  Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
      })
      console.log('here')
     return console.log(response)
    } catch (error) {
      console.log(error)
    }
  
  }

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };
  return (
    <FastImage source={images.AuthBackground} style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <View style={{height: 100}}></View>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validateOnMount={true}
          onSubmit={(values, {setSubmitting, setValues}) =>
            RegistorUser(values, {setSubmitting, setValues})
          }
          validationSchema={SignUpValidationSchema}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <View style={styles.main_container}>
              <View style={styles.container}>
                <CustomText
                  text={'Create an account'}
                  style={styles.screen_title}
                />
                <InputField
                  placeholder={'Full Name'}
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                />
                {errors.name && touched.name && (
                  <CustomText text={errors.name} />
                )}
                <InputField
                  placeholder={'Email Address'}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                />
                {errors.email && touched.email && (
                  <CustomText text={errors.email} />
                )}
                <InputField
                  placeholder={'password'}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <CustomText text={errors.password} />
                )}

                <InputField
                  placeholder={'Re-type Password'}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <CustomText text={errors.confirmPassword} />
                )}
                <View style={styles.checkView}>
                  <RadioButton
                    value="first"
                    color={COLORS.primary}
                    uncheckedColor="#949494"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                  />
                  <CustomText
                    text={'I have read and accept the '}
                    style={styles.termsText}
                  />
                  <TouchableOpacity>
                    <CustomText
                      text={'terms and conditions'}
                      style={styles.termsTxt}
                    />
                  </TouchableOpacity>
                </View>
                {isLoader ? (
                  <LoaderModal />
                ) : (
                  <CustomButton
                    onPress={() => {
                      // console.log('hello')
                      RegistorUser(values)
                      // handleSubmit(values);
                    }}
                    buttonText={'Create an account'}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default SignUp;
