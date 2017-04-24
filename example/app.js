import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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

Config.region = appConfig.region;

export default class App extends Component {

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
        console.log(Config.credentials)
      },
      onFailure: (err) => {
        alert(err);
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={ username => this.setState({ username }) }
          style={[styles.input, styles.formElement]}
          autoCapitalize={'none'}
          placeholder={'Username'}
          spellCheck={false}
          placeholderTextColor={'#aaa'}
          keyboardType={'default'}
          defaultValue=""
        />
        <TextInput
          onChangeText={ password => this.setState({ password })}
          style={[styles.input, styles.formElement]}
          placeholder={'Password'}
          placeholderTextColor={'#aaa'}
          keyboardType={'default'}
          secureTextEntry
          defaultValue=""
        />
        <TouchableOpacity style={[styles.button, styles.formElement]} onPress={() => this.login()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#777',
    color: '#333',
  },
  formElement: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff'
  },
});
