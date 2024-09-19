import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TextToSpeech from './components/TextToSpeech';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <TextToSpeech />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
