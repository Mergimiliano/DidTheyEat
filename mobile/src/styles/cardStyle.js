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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.navy,
    textAlign: 'center',
    marginBottom:25,
    marginTop: -15,
  },
  content: {
    fontSize: 16,
    color: colors.navy,
    fontWeight: 600,
  },
});

export {cardStyle} ;
