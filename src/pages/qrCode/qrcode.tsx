import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import iconCopy from './assets/iconCopy.svg';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

export default function QrCode() {
    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true}/>
        </View>
    )
};
