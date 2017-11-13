import { NativeModules } from 'react-native';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk/global';
import * as enhancements from './src';
export * from './src';

Object.keys(enhancements).forEach(key => {
  CognitoIdentityServiceProvider[key] = enhancements[key];
});
