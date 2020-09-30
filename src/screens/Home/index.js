/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {
  natureIcon,
  computerIcon,
  brainIcon,
  geographyIcon,
  rightIcon,
} from '../../assets/icons/index.js';
import {styles} from './styles.js';
import {anonymousSignIn, loginStatus} from '../../helpers/firebase';

const HomeScreen = ({navigation, saveCategory, saveLevel}) => {
  const [value, onChangeText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    anonymousSignIn();
  }, [isFocused]);

  const handleSubmit = (category) => {
    setModalVisible(true);
    switch (category) {
      case 'nature':
        saveCategory(17);
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
    loginStatus(value);
    saveLevel(get(selectedLevel, 'name'));
    setModalVisible(!modalVisible);
    navigation.navigate('QuizScreen', {value: value});
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
              index === get(selectedLevel, 'id') ? '#003366' : '#fff', //556AF4
          },
        ]}
        onPress={() => handleLevels(item)}>
        <Text
          style={[
            styles.levelName,
            {color: index === get(selectedLevel, 'id') ? '#fff' : '#003366'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView
        style={[styles.container, modalVisible ? {opacity: 0.8} : '']}>
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
                onPress={() => handleSubmit('nature')}>
                <View style={styles.button1}>{natureIcon}</View>
              </TouchableOpacity>
              <Text style={styles.text}>Science & Nature</Text>
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

          <View style={styles.secondColumn}>
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
            <Text style={styles.footerTitle}>Select All Categories</Text>
            {rightIcon}
          </TouchableOpacity>
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter your name.</Text>
              <TextInput
                style={styles.placeholderText}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Name"
                placeholderTextColor="#003396"
              />
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
