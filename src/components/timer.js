import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTimer} from 'react-compound-timer';
import Timer from 'react-compound-timer';

const Timerr = ({q, time, over}) => {
  console.log('##time', time);
  return (
    <View style={styles.container}>
      <Timer
        initialTime={time * 1000}
        startImmediately={true}
        direction="backward"
        timeToUpdate={10}
        checkpoints={[
          {
            time: 0,
            callback: () => over(),
          },
        ]}>
        <Text style={{fontFamily: 'Helvetica Neue'}}>
          <Text style={{fontSize: 32}}>
            <Timer.Seconds />
          </Text>
          <Text style={{fontSize: 12}}>
            <Timer.Milliseconds />
          </Text>
        </Text>
      </Timer>
    </View>
  );
};

export default Timerr;

const styles = StyleSheet.create({
  timeee: {
    color: '#fff',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
