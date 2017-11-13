import { NativeModules } from 'react-native';
import AWS from 'aws-sdk';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as enhancements from './src';
export * from './src';

Object.keys(enhancements).forEach(key => {
  CognitoIdentityServiceProvider[key] = enhancements[key];
});
