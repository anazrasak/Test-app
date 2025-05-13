/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Background from '../../utils/Background';

const Coursescreen = () => {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={{paddingBottom: 100}}></View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default Coursescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
});
