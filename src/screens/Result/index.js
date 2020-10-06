/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {updateUserInfo, logout} from '../../helpers/firebase';
import {
  trueIcon,
  falseIcon,
  leaderboardIcon,
  trophyIcon,
  downIcon,
} from '../../assets/icons';
import firestore from '@react-native-firebase/firestore';
import {styles} from './styles.js';
import {colors} from '../../assets/colors';
import * as Progress from 'react-native-progress';

const Item = ({title, correct}) => (
  <View
    style={[
      styles.item,
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    updateUserInfo(total);
  }, [total]);

  const handleLeaderBoard = () => {
    setModalVisible(true);
    if (users.length === 0) {
      firestore()
        .collection('Users')
        .limit(10)
        .orderBy('score', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            setUsers((prev) => [...prev, documentSnapshot.data()]);
          });
          setLoading(false);
        });
    }
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

  const renderLeaderBoard = ({item, index}) => {
    return (
      <View style={styles.firstRow}>
        <View style={styles.cell}>
          <Text style={styles.remainingText}>{index + 1}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.remainingText}>
            {item.name ? item.name : 'player'}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.remainingText}>{item.score}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, modalVisible ? {opacity: 0.9} : '']}>
      <View style={styles.header}>
        <View style={styles.scoreView}>
          <Text style={styles.headerText}>
            {get(route, 'params.value')}, You'r Score is: {total}/
            {questions.length}
          </Text>
        </View>
      </View>
      <View style={styles.answerContainer}>
        <View style={styles.top}>
          <View style={styles.leaderBoard}>
            {downIcon}
            <Text style={styles.topText}>Correct Answers</Text>
          </View>
          <View style={styles.leaderBoard}>
            <TouchableOpacity onPress={handleLeaderBoard}>
              {leaderboardIcon}
            </TouchableOpacity>
            <Text style={styles.topText}>Leaderboard</Text>
          </View>
        </View>
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
                <View style={styles.trophy}>{trophyIcon}</View>
                <View style={styles.firstRow}>
                  <Text style={styles.firstRowText}>Rank</Text>
                  <Text style={styles.firstRowText}>Name</Text>
                  <Text style={styles.firstRowText}>Score</Text>
                </View>
                {loading ? (
                  <View style={styles.loader}>
                    <Progress.CircleSnail size={100} color={[colors.purple]} />
                  </View>
                ) : (
                  <FlatList
                    data={users}
                    renderItem={renderLeaderBoard}
                    keyExtractor={(item, index) => 'key' + index}
                  />
                )}
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
