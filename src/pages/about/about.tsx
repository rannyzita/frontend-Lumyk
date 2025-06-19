import React from "react";
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.svg';
import { team } from './data/team';
import { TeamCard } from './components/teamCard';

export default function About() {
    return (
        <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
            <View style={styles.headerBox}>
                <Text style={styles.title}>SOBRE NÓS</Text>
            </View>

            <Logo width={150} height={150} style={styles.logo} />

            {team.map((member, index) => (
                <TeamCard key={index} member={member} />
            ))}

            <View style={styles.footerContainer}>
                <Text style={styles.footer}>
                    © 2025 Lumyk. Versão 1.0. Todos os direitos reservados.{"\n"}
                    Prado, Alameda José Quintino, sem número/CE{"\n"}
                    CEP 63400-000
                </Text>
            </View>
        </ScrollView>
    );
}
