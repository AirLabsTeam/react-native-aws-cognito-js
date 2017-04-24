import { NativeModules } from 'react-native';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk/dist/aws-sdk-react-native';
import * as enhancements from './src';
export * from './src';

Object.keys(enhancements).forEach(key => {
  CognitoIdentityServiceProvider[key] = enhancements[key];
});
