import React from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles'
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
export default function Book() {
    return (
        <View style={styles.container}>
            <NavigationHeader/>
        </View>
    )
}
