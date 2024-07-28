import { StyleSheet } from 'react-native';
import { COLORS, FS } from '../../../constants';

const CustomTextInputStyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        width: '100%'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: FS.FS16
    }
})

export default CustomTextInputStyles;
