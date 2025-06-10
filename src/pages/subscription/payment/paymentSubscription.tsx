import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './paymentStyles';
import Logo from '../../assets/logo.svg';
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';

import PlanCard from "../../../components/CardSubscription/cardSubscription";
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    id: string
}
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

export default function PaymentSubscription() {

    const route = useRoute();
    const { id } = route.params as RouteParams;
    return (
        <View style={styles.container}>
            <NavigationHeader 
                iconArrow={true}
                title="PAGAMENTO"
            />

            <View>
                <PlanCard 
                    id={id}
                    planSelected={id}
                />
            </View>
            

        </View>
    );
};
