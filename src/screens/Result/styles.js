import {StyleSheet} from 'react-native';
import {convertHeight as ch, convertWidth as cw} from '../../helpers/style';
import {colors} from '../../assets/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scoreView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerText: {
    flex: 0.8,
    color: colors.white,
    fontSize: cw('6%'),
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
  leaderBoard: {
    height: ch('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  footer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.white,
    fontSize: cw('5%'),
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  answerContainer: {
    flex: 1,
    padding: cw('5'),
  },
  top: {
    flexDirection: 'row',
    height: ch('10%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topText: {
    color: colors.white,
    fontSize: cw('4%'),
    fontWeight: '400',
    fontFamily: 'AvenirNext-Italic',
  },
  separator: {
    height: ch('1%'),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: cw('4'),
    backgroundColor: colors.white,
  },
  answerView: {
    flex: 1,
  },
  title: {
    color: colors.darkBlue,
    fontSize: cw('5%'),
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
  leaderBoardContainer: {
    marginTop: ch('15%'),
    marginHorizontal: cw('5%'),
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  trophy: {
    padding: cw('5%'),
    alignItems: 'center',
  },
  firstRow: {
    marginVertical: ch('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.purple,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  firstRowText: {
    color: colors.darkBlue,
    fontSize: cw('6'),
    fontWeight: '500',
    fontFamily: 'AvenirNext-Italic',
  },
  remainingText: {
    color: colors.purple,
    fontSize: cw('5'),
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
  },
  loader: {
    height: ch('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
