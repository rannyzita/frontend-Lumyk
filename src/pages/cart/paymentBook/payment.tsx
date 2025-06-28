import React from "react";
import { View, Text } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

import IconeLocal from './assets/IconeLocal.svg';
import ArrowLocal from './assets/ArrowLocal.svg';
import IconeMoney from '../../../assets/subscription/money.svg';
import IconePix from '../../../assets/subscription/pix.svg';


export default function About() {

    const Imagem1 = require('./assets/A Casa de Hades.jpg');
    const Imagem2 = require('./assets/A Dança dos Dragões.jpg');
    const Imagem3 = require('./assets/A Fúria dos Reis.jpg');
    const Imagem4 = require('./assets/A Guerra dos Tronos.jpg');
    const Imagem5 = require('./assets/A Hora da Estrela.jpg');
    const Imagem6 = require('./assets/A Marca de Atena.jpg');

    return (
        <View style={styles.container}>
            <NavigationHeader title="PAGAMENTO" iconArrow={true}/>
        </View>
    );
}
