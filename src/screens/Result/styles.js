import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    marginTop: 15,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
  },
  answerContainer: {
    flex: 1,
    padding: 30,
  },
  separator: {
    height: 8,
    backgroundColor: '#003366',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  answerView: {
    flex: 1,
  },
  title: {
    color: '#003366',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
  boxWithShadow: {
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  leaderBoardContainer: {
    height: 550,
    marginTop: 150,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  firstRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: '#003366',
  },
  firstRowText: {
    color: '#003366',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  },
});
