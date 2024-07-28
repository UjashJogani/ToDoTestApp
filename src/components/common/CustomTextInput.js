import React from 'react';
import { TextInput, View } from 'react-native';
import { CustomTextInputStyles } from './styles';

const CustomTextInput = ({
    placeholder = '',
    value = '',
    setValue = () => { },
    mainStyle = {},
    textInputStyle = {},
    secureText = false
}) => {
    return (
        <View style={[CustomTextInputStyles.container, mainStyle]}>
            <TextInput
                placeholder={placeholder}
                value={value}
                style={[CustomTextInputStyles.textInput, textInputStyle]}
                onChangeText={(val) => setValue(val)}
                secureTextEntry={secureText}
            />
        </View>
    )
}

export default CustomTextInput;
