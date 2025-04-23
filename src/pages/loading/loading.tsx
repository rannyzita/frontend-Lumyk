import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Loading() {
    const navigation = useNavigation<NavigationProps>();

    useEffect(()=> {
        const timer = setTimeout(()=> {
            navigation.navigate("Login")
        }, 3000)

        return () => clearTimeout(timer);
    }, [navigation])

    return (
        <View style={styles.components}>
            <View style={styles.logoContainer}>
                <Logo/>
            </View>

            <View style={styles.loadingContainer}>
                <ActivityIndicator size={70} color={themes.colors.primary} />
            </View>
        </View>
    )
};