import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarAssinatura } from '../services/AssinaturaService';

export function useAssinatura() {
    const [assinatura, setAssinatura] = useState<'Básica' | 'Premium' | null>(null);

    useEffect(() => {
        async function loadAssinatura() {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        try {
            const data = await buscarAssinatura(token);
            setAssinatura(data?.[0]?.tipo_assinatura ?? null);
        } catch (error) {
            console.error('Erro ao buscar assinatura:', error);
        }
        }

        loadAssinatura();
    }, []);

    return assinatura;
}
