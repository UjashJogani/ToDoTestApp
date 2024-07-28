import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Modal,
    View,
} from 'react-native';
import { COLORS } from '../../constants';

const CustomSpinner = ({ isActive = false, containerStyle = {} }) => {
    return (
        <Modal
            visible={isActive}
            animationType='fade'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={[styles.centerView, containerStyle]}>
                <View style={{backgroundColor: COLORS.WHITE, padding: 20, borderRadius: 10}}>
                <ActivityIndicator color={COLORS.DARK_GOLD} size='large' />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0024'
    }
});

export default CustomSpinner;
