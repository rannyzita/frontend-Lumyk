import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './paymentStyles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';

import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

export default function Cart() {
    return (
        <View style={styles.container}>
            <NavigationHeader 
                iconArrow={true}
                title="PAGAMENTO"
            />

        </View>
    );
};
