import { StyleSheet } from "react-native"
import { colors } from "./style";

const cardStyle = StyleSheet.create({
card: {
    height: 150,
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
  },
cardCreate: {
    height: 150,
    flexDirection: 'column',
    padding: 15,
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    borderWidth: 2,
    borderColor: colors.navy,
    borderRadius: 10,
    padding: 15,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'satoshi',
    color: colors.navy,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
    color: colors.offWhite,
  },
  contentRow: {
    marginTop: 5,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  content: {
    fontSize: 16,
    color: colors.navy,
    fontWeight: 600,
    marginRight: 10,
  },
});

export {cardStyle} ;
