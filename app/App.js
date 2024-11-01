import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { AdMobBanner } from "expo";

export default function App() {
  return (
    <View style={styles.main} >
      <AdMobBanner
        style={styles.topBanner}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-4249431492821525/9379750934"
        // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
        didFailToReceiveAdWithError={this.bannerError}
      />
      <WebView
        style={styles.container}
        source={{ uri: 'https://simuladosautoescola.netlify.app/' }}
      />
    </View >
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
