import React, { useEffect } from "react";
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import { themes } from '../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Loading() {
    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('userToken');

            setTimeout(() => {
                if (token) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }]
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                    });
                }
            }, 5000);
        };

        checkLogin();
    }, [navigation]);

    return (
        <View style={styles.components}>
            <View style={styles.logoContainer}>
                <Logo />
            </View>

            <View style={styles.loadingContainer}>
                <ActivityIndicator size={70} color={themes.colors.primary} />
            </View>
        </View>
    );
}
