import { useCallback, useEffect, useState } from 'react';
import api from '../../../../API/index';

export type AuthorFromAPI = {
    id: string;
    nome?: string;
    biografia?: string;
    foto?: string;
};

function embaralhar<T>(array: T[]): T[] {
    return array
        .map(item => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

export function useAuthors() {
    const [authors, setAuthors] = useState<AuthorFromAPI[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAuthors = useCallback(async () => {
        try {
            const response = await api.get('/autores');
            const dados: AuthorFromAPI[] = response.data;
            setAuthors(embaralhar(dados));
        } catch (error) {
            console.error('Erro ao buscar autores:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAuthors();
    }, [fetchAuthors]);

    return { authors, isLoading };
}
