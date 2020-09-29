/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {updateUserInfo, logout} from '../helpers/firebase';
import {trueIcon, falseIcon, leaderboardIcon} from '../assets/icons';
import firestore from '@react-native-firebase/firestore';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    updateUserInfo(total);
  }, [total]);

  const handleLeaderBoard = () => {
    setModalVisible(true);
    firestore()
      .collection('Users')
      .limit(10)
      .orderBy('score', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          setUsers((prev) => [...prev, documentSnapshot.data()]);
        });
      });
  };
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
        <View style={styles.scoreView}>
          <Text style={styles.headerText}>
            {get(route, 'params.value')}, You'r Score is: {total}/
            {questions.length}
          </Text>
          <TouchableOpacity
            style={styles.leaderBoard}
            onPress={handleLeaderBoard}>
            {leaderboardIcon}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.answerContainer}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted]} />
          )}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.question}
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
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            setModalVisible(false);
          }}>
          <View>
            <TouchableWithoutFeedback>
              <View style={styles.leaderBoardContainer}>
                <ScrollView>
                  <View style={styles.firstRow}>
                    <Text style={styles.firstRowText}>Rank</Text>
                    <Text style={styles.firstRowText}>Name</Text>
                    <Text style={styles.firstRowText}>Score</Text>
                  </View>
                  {users.map((user, index) => (
                    <View style={styles.firstRow}>
                      <Text style={styles.firstRowText}>{index + 1}</Text>
                      <Text style={styles.firstRowText}>{user.name}</Text>
                      <Text style={styles.firstRowText}>{user.score}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
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
    backgroundColor: '#003366',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    height: 8,
    backgroundColor: '#003366',
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
    color: '#003366',
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
  leaderBoardContainer: {
    height: 550,
    marginTop: 150,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  firstRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#003366',
  },
  firstRowText: {
    color: '#003366',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
});
