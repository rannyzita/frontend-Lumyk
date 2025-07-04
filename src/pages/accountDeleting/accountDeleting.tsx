import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from './components/progressBar';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Loading() {
    const navigation = useNavigation<NavigationProps>();
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: false,
        }).start();

        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('userToken');

            setTimeout(() => {
                if (token) {
                    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
                } else {
                    navigation.reset({ index: 0, routes: [{ name: 'AccountDeleted' }] });
                }
            }, 5000);
        };

        checkLogin();
    }, [navigation]);

    return (
        <View style={styles.components}>
            <View style={styles.logoContainer}>
                <Logo width={150} height={150} />
            </View>

            <Text style={styles.text}>
                Estamos processando a exclusão da sua conta.{"\n"}Isso pode levar alguns instantes...
            </Text>

            <ProgressBar
                progress={progress}
                containerStyle={styles.progressBarBackground}
                fillStyle={styles.progressBarFill}
            />
        </View>
    );
}
