import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuthStorage() {
    const getTokenAndUserId = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');

            return { token, userId };
        } catch (error) {
            console.error('Erro ao recuperar token e ID do usuário:', error);
            return { token: null, userId: null };
        }
    }, []);

    return { getTokenAndUserId };
}
