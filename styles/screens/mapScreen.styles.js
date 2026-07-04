import { StyleSheet } from "react-native";
import AppColors from "../theme/colors.js";


const mapSceenStyles = (theme) => {
    const appColor = AppColors[theme];

    return StyleSheet.create({
        container: {
            flex: 1,
            position: 'relative',
        },
        map: {
            width: '100%',
            height: '100%',
        },
        legend: {
            position: 'absolute',
            left: 16,
            top: 16,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: appColor.app.bg,
            borderWidth: 1,
            borderColor: appColor.li.border,
            gap: 8,
            maxWidth: 180,
            elevation: 6,
        },
        legendTitle: {
            color: appColor.text.default,
            fontSize: 14,
            fontWeight: '700',
            marginBottom: 2,
        },
        legendRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        legendDot: {
            width: 10,
            height: 10,
            borderRadius: 999,
        },
        legendText: {
            color: appColor.text.default,
            fontSize: 12,
            flexShrink: 1,
        },
        locateButton: {
            position: 'absolute',
            right: 30,
            bottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: appColor.app.bg,
            elevation: 6,
        },
        settingsButton: {
            position: 'absolute',
            right: 30,
            bottom: 85,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: appColor.app.bg,
            elevation: 6,
        },
    })
};

export default mapSceenStyles;