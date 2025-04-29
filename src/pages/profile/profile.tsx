import React from "react";
import { View} from 'react-native';
import styles from './styles';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

export default function Profile() {

    return (
        <View style={styles.container}>
            <NavigationHeader/>
        </View>
    )
};

