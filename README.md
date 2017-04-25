## react-native-aws-cognito-js [![npm version](https://badge.fury.io/js/react-native-aws-cognito-js.svg)](http://badge.fury.io/js/react-native-aws-cognito-js)

This is an adaptation of [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws/amazon-cognito-identity-js) in combination with [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js/tree/react-native) for [React Native](https://github.com/facebook/react-native/).

This project uses Native Modules to handle intensive math operations on the device using the React Native bridge.

### Todo

- [x] Add example application
- [x] Add ios compatibility
- [ ] Add android compatibility
- [ ] Make sure podspec works
- [ ] Add advanced example

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
