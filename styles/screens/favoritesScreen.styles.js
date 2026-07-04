/** @import { AppColor } from '../../data/types.js' */
import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const homeStyles = (theme) => {
  const appColor =  AppColors[theme];
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColor.app.bg,
      paddingTop: 8,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      color: appColor.text.default,
      fontWeight: '600',
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 14,
      color: appColor.text.muted,
      marginTop: 4,
    },
    titleBox: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 8,
    },
  })
};

export default homeStyles;