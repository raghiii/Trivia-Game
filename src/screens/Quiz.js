import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import Carousel from 'react-native-snap-carousel';
import {trueIcon, falseIcon, userIcon, GameIcon} from '../assets/icons';
import ContentLoader, {Rect} from 'react-content-loader/native';

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
      duration: 500,
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

  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  const handleTimerOver = () => {
    ref.current.snapToNext();
    setTime(10);
  };
  const renderItem = ({item, index}) => {
    return (
      <Animated.View style={{...styles.slide, ...animatedStyle}}>
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
      {loading ? (
        <ContentLoader backgroundColor="#fff" foregroundColor="grey" speed={2}>
          <Rect x="50" y="300" rx="3" ry="3" width="300" height="3" />
          <Rect x="50" y="340" rx="3" ry="3" width="240" height="3" />
          <Rect x="50" y="380" rx="3" ry="3" width="180" height="3" />
          <Rect x="50" y="420" rx="3" ry="3" width="130" height="3" />
          <Rect x="50" y="460" rx="3" ry="3" width="80" height="3" />
        </ContentLoader>
      ) : (
        <View>
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
          <Carousel
            ref={ref}
            scrollEnabled={true}
            data={questions}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            onSnapToItem={(index) => onSnap(index)}
          />
        </View>
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
  info: {
    backgroundColor: '#003366',
    marginTop: 70,
    flexDirection: 'row',
    marginHorizontal: 50,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#003366',
  },
  name: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    marginLeft: 10,
  },
  level: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    backgroundColor: '#556AF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    marginTop: 70,
    backgroundColor: '#003366',
    borderRadius: 5,
    height: 550,
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
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  questionTitle: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '300',
    fontFamily: 'AvenirNext-UltraLightItalic',
  },
  buttons: {
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
