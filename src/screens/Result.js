import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

const trueIcon = <Icon name="checkmark" size={30} color="#fff" />;
const falseIcon = <Icon2 name="cross" size={30} color="#fff" />;

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
  console.log('##answers', answers, total);
  const renderItem = ({item, index}) => {
    // console.log('##index', index, get(answers[index], 'answer'));
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
        <Text style={styles.headerText}>You Scored!</Text>
        <Text style={styles.headerText}>
          {total}/{questions.length}
        </Text>
      </View>
      <View style={styles.answerContainer}>
        <FlatList
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted]}>
              {/* <Text>rv</Text> */}
            </View>
            // <View style={styles.separator}>
            //   <Text>rv</Text>
            // </View>
          )}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.playagainButton}
          onPress={() => {
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#556AF4',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
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
    // backgroundColor: 'lightgreen',
  },
  separator: {
    // flex: 1,
    height: 10,
    backgroundColor: '#003396',
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
    // backgroundColor: 'red',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
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
