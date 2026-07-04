import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const settingsScreenStyles = (theme) => {
    const appColor = AppColors[theme];

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 24,
            backgroundColor: appColor.app.bg,
        },
        content: {
            gap: 14,
        },
        option: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderRadius: 8,
            backgroundColor: appColor.li.bg,
            borderWidth: 1,
            borderColor: appColor.li.border,
        },
        optionText: {
            color: appColor.text.default,
            fontSize: 16,
            fontWeight: '600',
        },
        themeBlock: {
            minWidth: 72,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: appColor.settings.item,
            alignItems: 'center',
            justifyContent: 'center',
        },
        themeText: {
            color: appColor.text.default,
            fontSize: 14,
            fontWeight: '400',
            textTransform: 'capitalize',
        },
    })
};

export default settingsScreenStyles;