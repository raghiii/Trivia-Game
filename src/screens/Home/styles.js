import {StyleSheet, Dimensions} from 'react-native';
import {convertHeight as ch, convertWidth as cw} from '../../helpers/style';
import {colors} from '../../assets/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  header: {
    marginTop: ch('3%'),
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: cw('6%'),
    fontWeight: '500',
    color: colors.white,
    fontFamily: 'AvenirNext-Regular',
  },
  title2: {
    marginTop: ch('5%'),
  },
  title3: {
    fontSize: cw('5%'),
    fontWeight: '400',
    color: colors.white,
  },
  title4: {
    fontSize: cw('8%'),
    color: colors.white,
    fontFamily: 'AvenirNext-Regular',
    fontWeight: '600',
  },
  body: {
    flex: 1.2,
    flexDirection: 'row',
    padding: cw('5%'),
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
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: ch('10%'),
  },
  categoryBackground: {
    backgroundColor: colors.white,
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    padding: cw('4%'),
  },
  button4: {
    bottom: 0,
    left: 20,
  },
  text: {
    color: colors.white,
    fontSize: cw('4%'),
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    marginTop: ch('2%'),
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: cw('3%'),
    flexDirection: 'row',
  },
  footerTitle: {
    fontSize: cw('5%'),
    fontWeight: '400',
    color: colors.darkBlue,
    fontFamily: 'AvenirNext-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: cw('6%'),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    marginTop: ch('2%'),
    width: cw('40%'),
    height: ch('6%'),
    borderWidth: 1,
    borderColor: colors.darkBlue,
    justifyContent: 'center',
  },
  startText: {
    fontSize: cw('7%'),
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    color: colors.darkBlue,
    textAlign: 'center',
  },
  placeholderText: {
    borderWidth: 1,
    borderColor: colors.darkBlue,
    fontSize: cw('6%'),
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    color: colors.darkBlue,
    marginBottom: 20,
    marginTop: 10,
    width: cw('40%'),
    height: ch('6%'),
    textAlign: 'center',
  },
  modalText: {
    fontSize: cw('7%'),
    fontWeight: '400',
    color: colors.darkBlue,
    fontFamily: 'AvenirNext-Regular',
  },
  levelButton: {
    paddingVertical: 2,
  },
  levelName: {
    fontSize: cw('6%'),
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    padding: 6,
    textAlign: 'center',
  },
  contentContainer: {
    height: ch('17%'),
  },
});
