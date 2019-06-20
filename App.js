/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState, useEffect, useMemo } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { exportDefaultDeclaration } from '@babel/types';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Child = React.memo(({ name, content }) => {
  console.log('child rerender');
  changeName = (name) => {
    console.log('Child');
    return name + ' is changed'
  }

  const changedName = useMemo(() => changeName(name), [name])

  return (
    <View style={{ flex:1, justifyContent: 'flex-start' }}>
      <Text>{changedName}</Text>
      <Text>{content}</Text>
    </View>
  );
})


// const App = () => {
//   const [name, setName] = useState('name');
//   const [content, setContent] = useState('content');
  
//   return (
//     <View style={styles.container}>
//       <Text style={{ marginTop: 100 }} onPress={() => setName(new Date().getTime())}>{name}</Text>
//       <Text onPress={() => setContent('qwer')}>{content}</Text>
//       <Child name={name}>{content}</Child>
//     </View>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'name',
      content: 'content',
    }

    this.handleNameClick = this.handleNameClick.bind(this)
    this.handleContentClick = this.handleContentClick.bind(this)
  }

  handleNameClick() {
    this.setState({ name: new Date().getTime() })
  }

  handleContentClick() {
    this.setState({ content: new Date().getTime() })
  }

  render() {
    const { name, content } = this.state
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 200 }} onPress={this.handleNameClick}>{name}</Text>
        <Text onPress={this.handleContentClick} >{content}</Text>
        <Child name={name} >{content}</Child>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 45,
  },
});

export default App;
