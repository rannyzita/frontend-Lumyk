import { useCallback, useEffect, useState } from 'react';
import api from '../../../../API';

export type Livro = {
    id: string;
    titulo: string;
    sinopse: string;
    foto: string;
    formato: string;
    preco: number;
    id_autor: string;
    autor: {
        nome: string;
        biografia: string;
        foto: string;
    };
};

export function useAuthorBooks(authorId: string) {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await api.get('/livros');
            const livrosFiltrados = response.data.filter(
                (livro: Livro) => livro.id_autor === authorId
        );
            setLivros(livrosFiltrados);
        } catch (error) {
            console.error('Erro ao buscar livros do autor:', error);
        } finally {
            setIsLoading(false);
        }
    }, [authorId]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return { livros, isLoading };
}
