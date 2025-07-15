import React from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.svg';
import { team } from './data/team';
import { TeamCard } from './components/teamCard';

import HeaderSection from '../../components/HeaderSection/headerSection';

export default function About() {
    return (
        <View style={{ ...styles.container, flexGrow: 1 }}>
            <HeaderSection title="SOBRE NÓS" />

            <Logo width={150} height={150} style={styles.logo} />

            <View style={styles.madeByContainer}>
                <Text style={styles.madeBy}>FEITO POR:</Text>
                <View style={styles.line} />
            </View>

            {team.map((member, index) => (
                <TeamCard key={index} member={member} />
                
            ))}

            <View style={styles.footerContainer}>
                <Text style={styles.footer}>
                    © 2025 Lumyk. Versão 1.0. Todos os direitos reservados.{'\n'}
                    Prado, Alameda José Quintino, sem número/CE{'\n'}
                    CEP 63400-000
                </Text>
            </View>
        </View>
    );
}
