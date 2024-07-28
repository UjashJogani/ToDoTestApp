import { StyleSheet } from 'react-native';
import { COLORS, FS } from '../../../constants';

const CustomButtonStyles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        justifyContent:'center',
        backgroundColor: COLORS.DARK_GOLD
    },
    textStyle: {
        color: COLORS.WHITE,
        fontSize: FS.FS20,
        fontWeight: '500',
    }
})

export default CustomButtonStyles;
