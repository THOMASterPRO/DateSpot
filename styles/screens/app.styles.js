/** @import { AppColor } from '../../data/types.js' */
import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const appStyles = (theme) => {
  const appColor =  AppColors[theme];
  
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: appColor.surface.default,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      color: appColor.text.default,
      fontWeight: '600',
      marginVertical: 20,
      textAlign: 'center',
    },
    settings: {
      display: 'flex',
      alignSelf: 'flex-end',
      margin: 0,
      marginRight: 30,
      padding: 10,
      borderRadius: 50,
      backgroundColor: appColor.surface.add
    },
    titleBox: {
      top: 30,
      padding: 20,
    },
    contentBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '30%',
      height: 52,
      backgroundColor: appColor.brand.primary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 16,
    }
  })
};

export default appStyles;