import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './stylesDeleted';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { themes } from "../../global/themes";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function AccountDeleted() {
    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.components}>
            <View style={styles.logoContainer}>
                <Logo width={150} height={150} />
            </View>

            <Text style={styles.text}>
                Conta excluída com sucesso.{"\n"}Sentiremos sua falta!
            </Text>

            <ActivityIndicator 
                size="large" 
                color={themes.colors.primary} 
                style={styles.loadingSpinner} 
            />
        </View>
    );
}
