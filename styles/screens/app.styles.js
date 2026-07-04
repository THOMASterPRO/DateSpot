import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const appStyles = (theme) => {
  const appColor =  AppColors[theme];
  
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: appColor.app.bg,
    },
    content: {
      flex: 1,
    },
    bar: {
      backgroundColor: appColor.app.menuBar,
      height: 90
    }
  })
};

export default appStyles;