import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {get, isequal} from 'lodash';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {trueIcon, falseIcon} from '../assets/icons';
import Timerr from '../components/timer';

const QuizScreen = ({
  navigation,
  category,
  level,
  saveQuestions,
  saveResult,
  saveSubmittedAnswer,
}) => {
  const ref = useRef();
  const [questions, setQuestions] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [total, setTotal] = useState(0);
  const [bgColor, setbgColor] = useState('#003366');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [time, setTime] = useState(10);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      let url = category
        ? `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${level}&type=boolean`
        : `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=boolean`;

      let response = await fetch(url);
      let resp = await response.json();
      setQuestions(get(resp, 'results'));
      saveQuestions(get(resp, 'results'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    saveResult(total);
  }, [total]);

  useEffect(() => {
    saveSubmittedAnswer(submittedAnswers);
    // ref.current.snapToNext();
  }, [submittedAnswers]);

  const validateAnswer = (answer, index) => {
    setSubmittedAnswers([...submittedAnswers, {index, answer}]);
    if (answer === questions[index].correct_answer.toLowerCase()) {
      setTotal(total + 1);
    }
    if (index + 1 === questions.length) {
      navigation.navigate('ResultScreen');
    }
  };

  const abcd = (index) => {
    setCurrentIndex(index);
    setTime(10);
  };

  const handleAnimation = (color) => {
    setbgColor(color);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
    }).start(() => {
      ref.current.snapToNext();
      animation.setValue(0);
      // Animated.timing(animation, {
      //   toValue: 0,
      //   duration: 1000,
      // }).start(() => {
      //   ref.current.snapToNext();
      // });
    });
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#003366', bgColor],
  });

  console.log('##test', currentIndex, get(ref, 'current.currentIndex'));
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  const handleTimerOver = () => {
    console.log('##handleTimerOver');
    ref.current.snapToNext();
    setTime(20);
  };
  const renderItem = ({item, index}) => {
    return (
      <Animated.View style={{...styles.slide, ...animatedStyle}}>
        <View style={styles.questionContainer}>
          <View style={styles.questionCategory}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <Text style={styles.categoryTitle}>{item.correct_answer}</Text>
            <Text style={styles.categoryTitle}>{item.difficulty}</Text>
          </View>
          <View style={styles.questionTitle}>
            <Text style={styles.title}>
              {unescape(item.question.replace(/(&quot\;)/g, '"'))}
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.falseButton}
            onPress={() => {
              handleAnimation('lightcoral');
              validateAnswer('false', index);
            }}>
            {falseIcon}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trueButton}
            onPress={() => {
              handleAnimation('lightgreen');
              validateAnswer('true', index);
            }}>
            {trueIcon}
          </TouchableOpacity>
        </View>
        {/* <View>
          <Timerr
            question={item}
            index={index}
            q={questions[currentIndex]}
            time={time}
            over={handleTimerOver}
          />
        </View> */}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        scrollEnabled={false}
        data={questions}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        onSnapToItem={(index) => abcd(index)}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.total,
    questions: state.questions,
    answers: state.submittedAnswers,
    category: state.category,
    level: state.level,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuestions: (payload) =>
      dispatch({
        type: 'QUESTION',
        payload: payload,
      }),
    saveSubmittedAnswer: (payload) =>
      dispatch({
        type: 'ANSWER',
        payload: payload,
      }),
    saveResult: (payload) =>
      dispatch({
        type: 'RESULT',
        payload: payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#5AD2F4',
  },
  container: {
    flex: 1,
    backgroundColor: '#003396',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    marginTop: 100,
    backgroundColor: '#003366',
    borderRadius: 5,
    height: 500,
    padding: 30,
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCategory: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  questionTitle: {
    flex: 0.8,
    // backgroundColor: 'red',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'AvenirNext-UltraLightItalic',
  },
  buttons: {
    // backgroundColor: 'pink',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  falseButton: {
    backgroundColor: 'lightcoral',
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trueButton: {
    backgroundColor: 'lightgreen',
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
