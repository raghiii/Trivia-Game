import {Dimensions, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get('window');
const HEIGHT = height;
const WIDTH = width;

if (console.groupCollapsed) {
  console.groupCollapsed('*** Dimensions ***');
  console.log('WIDTH', WIDTH);
  console.log('HEIGHT', HEIGHT);
  console.groupEnd();
}

export const convertHeight = (heightPercent) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((HEIGHT * elemHeight) / 100);
};

export const convertWidth = (widthPercent) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((WIDTH * elemWidth) / 100);
};
