import React from 'react';
import { View, Text, Image } from 'react-native';
import { TeamMember } from '../data/team';
import styles from '../styles';

interface Props {
    member: TeamMember;
}

export function TeamCard({ member }: Props) {
    return (
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <Image source={member.photo} style={styles.image} />
                <View>
                    <Text style={styles.name}>{member.name}</Text>
                    <Text style={styles.role}>{member.role}</Text>
                </View>
            </View>
            <View style={styles.divider} />
        </View>
    );
}
