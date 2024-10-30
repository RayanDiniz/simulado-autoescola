import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { AdMobBanner } from "expo";

export default function App() {
  return (
    

      <WebView
        style={styles.container}
        source={{ uri: 'https://simuladosautoescola.netlify.app/' }}
      />
  );
}

const styles = StyleSheet.create({
  topBanner: {
  position: "absolute",
  top: 0
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: "100%"
  }
});
