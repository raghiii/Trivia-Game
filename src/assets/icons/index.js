/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/Feather';
import Icon6 from 'react-native-vector-icons/EvilIcons';
import {colors} from '../colors';

export const natureIcon = (
  <Icon2 name="nature-people" size={70} color={colors.orange} />
);
export const computerIcon = (
  <Icon1 name="computer" size={70} color={colors.brown} />
);
export const brainIcon = <Icon2 name="brain" size={70} color={colors.grey} />;
export const geographyIcon = (
  <Icon1 name="place" size={70} color={colors.green} />
);
export const rightIcon = (
  <Icon1 name="chevron-right" size={30} color={colors.darkBlue} />
);

export const trueIcon = (
  <Icon3 name="checkmark" size={30} color={colors.black} />
);
export const falseIcon = <Icon4 name="cross" size={30} color={colors.black} />;

export const userIcon = <Icon5 name="user" size={30} color={colors.white} />;
export const GameIcon = (
  <Icon3 name="game-controller-outline" size={30} color={colors.white} />
);
export const leaderboardIcon = (
  <Icon1 name="leaderboard" size={25} color={colors.white} />
);
export const trophyIcon = (
  <Icon6 name="trophy" size={60} color={colors.purple} />
);
export const downIcon = (
  <Icon1 name="trending-down" size={30} color={colors.white} />
);
