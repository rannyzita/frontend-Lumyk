import React from "react";
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.svg';
import Kariny from "../../assets/photos.us/Kariny.png";
import Laura from "../../assets/photos.us/Laura.png";
import Ranny from "../../assets/photos.us/Ranny.png";
import Yarlla from "../../assets/photos.us/Yarlla.png";

interface TeamMember {
    name: string;
    role: 'Front-End' | 'Back-End';
    photo: any;
}

const team: TeamMember[] = [
    { name: 'Kariny Leandro da Silva', role: 'Back-End', photo: Kariny },
    { name: 'Laura de Matos Lima', role: 'Front-End', photo: Laura },
    { name: 'Maria Vitória Ferreira Soares', role: 'Front-End', photo: Ranny },
    { name: 'Yarlla Sales de Moura', role: 'Back-End', photo: Yarlla },
];

export default function About() {
    return (
        <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
            <View style={styles.headerBox}>
                <Text style={styles.title}>SOBRE NÓS</Text>
            </View>

            <Logo width={150} height={150} style={styles.logo} />

        {team.map((member, index) => (
            <View key={index} style={styles.card}>
                <Image source={member.photo} style={styles.image} />
                <View>
                    <Text style={styles.name}>{member.name}</Text>
                    <Text style={styles.role}>{member.role}</Text>
                </View>
            </View>
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
