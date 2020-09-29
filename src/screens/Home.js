/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {
  sportsIcon,
  computerIcon,
  brainIcon,
  geographyIcon,
  rightIcon,
} from '../assets/icons/index.js';
import LevelModal from '../components/modal.js';

const HomeScreen = ({navigation, saveCategory, saveLevel}) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (category) => {
    setModalVisible(true);
    switch (category) {
      case 'sports':
        saveCategory(21);
        break;
      case 'general-knowledge':
        saveCategory(9);
        break;
      case 'computers':
        saveCategory(18);
        break;
      case 'geography':
        saveCategory(22);
        break;
      case 'all':
        saveCategory(null);
        break;
      default:
        saveCategory(null);
        break;
    }
  };

  const handleLevels = (levelName) => {
    setSelectedLevel(levelName);
  };

  const handleModal = () => {
    saveLevel(get(selectedLevel, 'name'));
    setModalVisible(!modalVisible);
    navigation.navigate('QuizScreen');
  };

  const level = [
    {
      id: 0,
      name: 'easy',
    },
    {
      id: 1,
      name: 'medium',
    },
    {
      id: 2,
      name: 'hard',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.levelButton,
          {
            backgroundColor:
              index === get(selectedLevel, 'id') ? '#556AF4' : '#fff',
          },
        ]}
        onPress={() => handleLevels(item)}>
        <Text
          style={[
            styles.levelName,
            {color: index === get(selectedLevel, 'id') ? '#fff' : '#556AF4'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={[styles.container, modalVisible ? {opacity: 0.9} : '']}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to the Trivia Challenge!</Text>
          <View style={styles.title2}>
            <Text style={styles.title4}>Let's Play</Text>
            <Text style={styles.title3}>
              Choose a category to start playing
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.columns}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBackground}
                onPress={() => handleSubmit('sports')}>
                <View style={styles.button1}>{sportsIcon}</View>
              </TouchableOpacity>
              <Text style={styles.text}>Sports</Text>
            </View>

            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBackground}
                onPress={() => handleSubmit('general-knowledge')}>
                <View>{brainIcon}</View>
              </TouchableOpacity>
              <Text style={styles.text}>General {'\n'} Knowledge</Text>
            </View>
          </View>

          <View style={[styles.columns, styles.secondColumn]}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBackground}
                onPress={() => handleSubmit('computers')}>
                <View>{computerIcon}</View>
              </TouchableOpacity>
              <Text style={styles.text}>Computers</Text>
            </View>

            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBackground}
                onPress={() => handleSubmit('geography')}>
                <View style={styles.button4}>{geographyIcon}</View>
              </TouchableOpacity>
              <Text style={styles.text}>Geography</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.defaultButton}
            onPress={() => handleSubmit('all')}>
            <Text style={styles.footerTitle}>Play with All Categories</Text>
            {rightIcon}
          </TouchableOpacity>
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose difficulty!</Text>
              <View style={styles.contentContainer}>
                <FlatList
                  keyExtractor={(item) => item.name}
                  data={level}
                  renderItem={renderItem}
                  extraData={level}
                  scrollEnabled={false}
                />
              </View>

              <TouchableHighlight
                style={styles.startButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleModal();
                }}>
                <Text style={styles.startText}>Start...</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategory: (payload) =>
      dispatch({
        type: 'CATEGORY',
        payload: payload,
      }),
    saveLevel: (payload) =>
      dispatch({
        type: 'LEVEL',
        payload: payload,
      }),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#556AF4',
  },
  header: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    fontFamily: 'AvenirNext-Regular',
  },
  title2: {
    marginTop: 35,
  },
  title3: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  title4: {
    fontSize: 34,
    color: '#fff',
    fontFamily: 'AvenirNext-Regular',
    fontWeight: '600',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
  },
  columns: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
  },
  secondColumn: {
    paddingTop: 80,
  },
  categoryBackground: {
    backgroundColor: '#fff',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    padding: 15,
  },
  button1: {
    bottom: 20,
    right: 30,
  },
  button4: {
    bottom: 0,
    left: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    flex: 0.2,
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#556AF4',
    fontFamily: 'AvenirNext-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    marginTop: 20,
    paddingHorizontal: 60,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#003396',
  },
  startText: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    color: '#003396',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '400',
    color: '#556AF4',
    fontFamily: 'AvenirNext-Regular',
  },
  levelButton: {
    marginVertical: 10,
  },
  levelName: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    padding: 5,
    textAlign: 'center',
  },
  contentContainer: {
    height: 200,
  },
});
