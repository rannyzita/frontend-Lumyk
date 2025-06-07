import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles'
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import Laura from "../../assets/photos.us/Laura.png";
import Kariny from "../../assets/photos.us/Kariny.png";
import Ranny from "../../assets/photos.us/Ranny.png";
import Yarlla from "../../assets/photos.us/Yarlla.png";

export default function About() {
    return (
        <View style={styles.container}>
            <Text>Tela de Sobre Nós</Text>
        </View>
    )
}
