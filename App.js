/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState, useEffect, useMemo } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// const Child = React.memo(({ name, children }) => {
//   console.log('child rerender');
//   changeName = (name) => {
//     console.log('Child');
//     return name + ' is changed'
//   }

//   const changedName = useMemo(() => changeName(name), [name])

//   return (
//     <View style={{ flex:1, justifyContent: 'flex-start' }}>
//       <Text>{changedName}</Text>
//       <Text>{children}</Text>
//     </View>
//   );
// })

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.name !== this.props.name || nextProps.children !== this.props.children
    // return true
  }

  render() {
    const { name, children } = this.props
    console.log('child rendering')
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Text>{name}</Text>
        <Text>{children}</Text>
      </View>
    );
  }
}

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
    this.setState({ name: 'new Date().getTime()' })
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
