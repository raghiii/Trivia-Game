/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {updateUserInfo, logout} from '../helpers/firebase';
import {trueIcon, falseIcon} from '../assets/icons';

const Item = ({title, correct}) => (
  <View
    style={[
      styles.item,
      styles.boxWithShadow,
      {backgroundColor: correct ? 'lightgreen' : 'lightcoral'},
    ]}>
    <View style={styles.answerView}>
      <Text style={[styles.title]}>{title}</Text>
    </View>
    <Text>{correct ? trueIcon : falseIcon}</Text>
  </View>
);

const Result = ({route, navigation, questions, total, answers}) => {
  useEffect(() => {
    updateUserInfo(total);
  }, [total]);

  const renderItem = ({item, index}) => {
    return (
      <Item
        title={item.question.replace(/(&quot\;)/g, '"')}
        correct={
          item.correct_answer.toLowerCase() === get(answers[index], 'answer')
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {route.params.value}, You'r Score is:
        </Text>
        <Text style={styles.headerText}>
          {total}/{questions.length}
        </Text>
      </View>
      <View style={styles.answerContainer}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted]} />
          )}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.index}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.playagainButton}
          onPress={() => {
            logout();
            navigation.navigate('Home');
          }}>
          <Text style={styles.footerText}>Play Again?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.total,
    questions: state.questions,
    answers: state.submittedAnswers,
  };
};

export default connect(mapStateToProps, null)(Result);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#556AF4',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    marginTop: 15,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  answerContainer: {
    flex: 1,
    padding: 30,
  },
  separator: {
    height: 10,
    backgroundColor: '#556AF4',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  answerView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
  boxWithShadow: {
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
});
