import React from 'react';
import {Dimensions, PermissionsAndroid} from 'react-native';
import { PERMISSIONS , check, request} from 'react-native-permissions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestLocationPermissionIOS = async () => {
  try {
    const permissionStatus = await check(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );

    console.log(permissionStatus);
    if (permissionStatus === 'granted') {
      console.log('Location permission already granted');
      return true;
    } else if (
      permissionStatus === 'blocked' ||
      permissionStatus === 'denied'
    ) {
      const permissionRequest = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      if (permissionRequest === 'granted') {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied sfsdfdfdfs');
        return false;
      }
    } else {
      console.log('Unknown permission status');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'Breakaway App needs access to your camera ' +
          'so you can take awesome pictures.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Access Required',
        message: 'This App needs to Access your Storage',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ContainsHTML = str => {
  return /<[a-z][\s\S]*>/i.test(str);
};

export {
  requestLocationPermission,
  requestCameraPermission,
  requestWritePermission,
  apiHeader,
  sleep,
  wait,
  ContainsHTML,
  windowWidth,
  windowHeight,
  requestLocationPermissionIOS
};
