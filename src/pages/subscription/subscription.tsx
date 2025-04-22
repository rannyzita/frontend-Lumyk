import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles'
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

export default function Subscription() {
    return (
        <View style={styles.container}>
            <Text>Tela de Subscription</Text>
        </View>
    )
}
