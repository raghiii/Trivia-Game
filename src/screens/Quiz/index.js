import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {trueIcon, falseIcon, userIcon, GameIcon} from '../../assets/icons';
import * as Progress from 'react-native-progress';
import {styles} from './styles.js';

const QuizScreen = ({
  route,
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
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      setQuestions(get(resp, 'results'));
      saveQuestions(get(resp, 'results'));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    saveResult(total);
  }, [total]);

  useEffect(() => {
    saveSubmittedAnswer(submittedAnswers);
  }, [submittedAnswers]);

  const validateAnswer = (answer, index) => {
    setSubmittedAnswers([...submittedAnswers, {index, answer}]);
    if (answer === questions[index].correct_answer.toLowerCase()) {
      setTotal(total + 1);
    }
    if (index + 1 === questions.length) {
      navigation.navigate('ResultScreen', {value: route.params.value});
    }
  };

  const onSnap = (index) => {
    setCurrentIndex(index);
    setTime(10);
  };

  const handleAnimation = (color) => {
    setbgColor(color);
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      ref.current.snapToNext();
      animation.setValue(0);
    });
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#003366', bgColor],
  });

  const handleTimerOver = () => {
    ref.current.snapToNext();
    setTime(10);
  };
  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={{
          ...styles.slide,
          backgroundColor: index === currentIndex ? boxInterpolation : '',
        }}>
        <View style={styles.questionContainer}>
          <View style={styles.questionCategory}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
          </View>
          <View style={styles.questionTitle}>
            <Text style={styles.title}>
              {unescape(item.question.replace(/(&quot\;)/g, '"'))}
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableWithoutFeedback
            onPress={() => {
              handleAnimation('lightcoral');
              validateAnswer('false', index);
            }}>
            <View style={styles.falseButton}>{falseIcon}</View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              handleAnimation('lightgreen');
              validateAnswer('true', index);
            }}>
            <View style={styles.trueButton}>{trueIcon}</View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.name}>
          {userIcon}
          <Text style={styles.nameText}>{route.params.value}</Text>
        </View>
        <View style={styles.level}>
          {GameIcon}
          <Text style={styles.nameText}>{level}</Text>
        </View>
      </View>
      {loading ? (
        <View style={styles.loader}>
          <Progress.CircleSnail size={100} color={['white']} />
        </View>
      ) : (
        <>
          <Carousel
            ref={ref}
            scrollEnabled={false}
            data={questions}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            onSnapToItem={(index) => onSnap(index)}
            initialNumToRender={1}
            windowSize={1}
          />
          <Pagination
            dotsLength={questions.length}
            activeDotIndex={currentIndex}
            containerStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.total,
    questions: state.questions,
    answers: state.submittedAnswers,
    category: state.category,
    level: get(state, 'level', 'easy'),
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
