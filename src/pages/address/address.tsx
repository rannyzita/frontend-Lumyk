import React from "react";
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

export default function Address() {
    return (
        <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
            <NavigationHeader title="MEU ENDEREÇO E ESTADO" iconArrow={true} />
        </ScrollView>
    );
}
