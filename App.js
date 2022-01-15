import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import AuthNavigation from './AuthNavigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreAllLogs();



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthNavigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
  },
})

