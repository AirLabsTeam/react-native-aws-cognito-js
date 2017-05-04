## react-native-aws-cognito-js [![npm version](https://badge.fury.io/js/react-native-aws-cognito-js.svg)](http://badge.fury.io/js/react-native-aws-cognito-js)

This is an adaptation of [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/amazon-cognito-identity-js) in combination with [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js/tree/react-native) for [React Native](https://github.com/facebook/react-native/).

This project uses Native Modules to handle intensive math operations on the device using the React Native bridge.

## Installation

Install in your application directory:

```bash
npm install --save react-native-aws-cognito-js
```

or

```bash
yarn add react-native-aws-cognito-js
```

Link project:

```bash
react-native link react-native-aws-cognito-js
```

## MemoryStorage

The local MemoryStorage can handle everything on the authentication side, but the data is lost when the app is reopened. The storage sync method will grab only the MemoryStorage data from AsyncStorage and update the local MemoryStage with the values.

The new sync method can be used from either the userPool or cognitoUser:

```js
userPool.storage.sync((err, result) => {
  // MemoryStorage is now updated with AsyncStorage values
});
```

or

```js
cognitoUser.storage.sync((err, result) => {
  // MemoryStorage is now updated with AsyncStorage values
});
```

## Usage

Refer to the Amazon Cognito Identity SDK for JavaScript usage [examples](https://github.com/aws/amazon-cognito-identity-js#usage).

## Example

This is a user authentication sample:

```js
//imports
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';

const appConfig = {
  region: '',
  IdentityPoolId: '',
  UserPoolId: '',
  ClientId: '',
}

//setting config
Config.region = appConfig.region;

//component:
state = {
  username: '',
  password: '',
}

login = () => {
  const { username, password } = this.state;
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const poolData = {
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId
  };
  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId,
        Logins: {
          [`cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`]: result.getIdToken().getJwtToken()
        }
      });
      alert('Success');
      console.log(Config.credentials);
    },
    onFailure: (err) => {
      alert(err);
    },
  });
}
```

## Advanced Example

```js
//- AWS.js
//create AWS with userPool using dotenv to hold environment variables
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk/dist/aws-sdk-react-native';
import * as enhancements from 'react-native-aws-cognito-js';
import { AWS_REGION, AWS_POOL_ID, AWS_POOL_CLIENT_ID } from 'react-native-dotenv';

Object.keys(enhancements).forEach(key => (CognitoIdentityServiceProvider[key] = enhancements[key]));

AWS.config.update({ region: AWS_REGION });

export const poolData = {
  UserPoolId: AWS_POOL_ID,
  ClientId: AWS_POOL_CLIENT_ID,
};

export const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

export default AWS;
```

```js
//import AWS and userPool
import AWS, { userPool } from './AWS';

//component:
state = {
  username: '',
  password: '',
}

login = () => {
  const { username, password } = this.state;
  const authenticationData = { Username: username, Password: password };
  const authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  const userData = { Username: username, Pool: userPool };
  const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('result', result);
      console.log('access token:', result.getAccessToken().getJwtToken());
    },
    onFailure: (error) => {
      Alert.alert(error.code, error.message);
    },
  });
}
```
