import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import get from 'lodash/get';

const LevelModal = ({navigation}) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleLevels = (levelName) => {
    setSelectedLevel(levelName);
  };

  const handleModal = () => {
    // saveLevel(get(selectedLevel, 'name'));
    // setModalVisible(!modalVisible);
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
  );
};

export default LevelModal;

const styles = StyleSheet.create({});
