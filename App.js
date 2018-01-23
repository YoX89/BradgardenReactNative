import React from 'react';
import { StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Tabs } from './Router/Router'

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
          />
        </View>
        <Tabs />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: (Platform.OS === 'ios' ? 0 :  StatusBar.currentHeight),
  },
});
