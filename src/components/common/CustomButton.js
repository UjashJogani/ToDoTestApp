import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CustomButtonStyles } from './styles';

const CustomButton = ({
    title = '',
    onClick = () => { },
    disabled = false,
    containerStyle = {},
    textStyle = {}
}) => {
    return (
        <TouchableOpacity style={[CustomButtonStyles.container, containerStyle]} onPress={onClick} disabled={disabled} >
            <Text style={[CustomButtonStyles.textStyle, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}   

export default CustomButton;

