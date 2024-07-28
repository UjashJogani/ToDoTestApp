import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FS, IMAGES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title = '', isbackIcon = false }) => {
    const Navigation = useNavigation();
    return (
        <View style={{ height: 60, backgroundColor: COLORS.BG_GREY, padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {isbackIcon &&
                <TouchableOpacity style={{ alignSelf: 'center', paddingHorizontal: 10 }} onPress={() => { Navigation.goBack() }}>
                    <Image source={IMAGES.BACK_ARROW} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                </TouchableOpacity>}
            <Text style={{ fontSize: FS.FS20, fontWeight: '600', marginLeft: 10, flex: 1, color: COLORS.BLACK, right: isbackIcon ? 22 : 0, textAlign: isbackIcon ? 'center' : 'center' }}>{title}</Text>
        </View>
    )
}

export default CustomHeader;