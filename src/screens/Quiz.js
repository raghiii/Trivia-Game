import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {get} from 'lodash';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

const trueIcon = <Icon name="checkmark" size={30} color="#000" />;
const falseIcon = <Icon2 name="cross" size={30} color="#000" />;

const QuizScreen = () => {
  const ref = useRef();
  const [questions, setQuestions] = useState([]);
  const [bgColor, setbgColor] = useState('#003366');
  const x = new Animated.Value(0);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      let response = await fetch(
        'https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean',
      );
      let resp = await response.json();
      setQuestions(get(resp, 'results'));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item, index}) => {
    var bgcolor = x.interpolate({
      inputRange: [0, 1],
      outputRange: ['#003366', 'green'],
    });
    return (
      <Animated.View
        style={[
          styles.slide,
          {
            backgroundColor: bgcolor,
          },
        ]}>
        <View style={styles.questionContainer}>
          <View style={styles.questionCategory}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
          </View>
          <View style={styles.questionTitle}>
            <Text style={styles.title}>{item.question}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.falseButton}
            onPress={() => {
              setbgColor('lightcoral');
              Animated.timing(x, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(({finished}) => {
                if (finished) {
                  ref.current.snapToNext();
                }
              });
            }}>
            {falseIcon}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trueButton}
            onPress={() => {
              setbgColor('lightgreen');
              Animated.timing(x, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(({finished}) => {
                if (finished) {
                  ref.current.snapToNext();
                }
              });
            }}>
            {trueIcon}
          </TouchableOpacity>
        </View>
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
        // onSnapToItem={(index) => abcdFunc(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  questionTitle: {
    flex: 0.8,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'AvenirNext-UltraLightItalic',
  },
  buttons: {
    flex: 0.5,
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

export default QuizScreen;
