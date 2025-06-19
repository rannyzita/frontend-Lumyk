import { useEffect, useState } from "react";
import api from "../../../../API";

type PhysicalOption = {
    type: string;
    price: string;
};

export type BookData = {
    id: string;
    titulo: string;
    autor: {
        id: string;
        nome: string;
        fotoAutor: { uri: string };
    };
    sinopse: string;
    estoque: number;
    foto: { uri: string };
    preco: string;
    formato: string;
    physicalOptions: PhysicalOption[];
};

export const useBookData = (bookId: string) => {
    const [bookData, setBookData] = useState<BookData | null>(null);

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await api.get(`/livros/${bookId}`);
                const book = response.data;

                setBookData({
                    id: book.id,
                    titulo: book.titulo,
                    autor: {
                        id: book.autor?.id ?? '',
                        nome: book.autor?.nome ?? 'Autor desconhecido',
                        fotoAutor: { uri: api.defaults.baseURL + book.autor?.foto },
                    },
                    sinopse: book.sinopse,
                    estoque: book.estoque,
                    foto: { uri: api.defaults.baseURL + book.foto },
                    preco: book.preco,
                    formato: book.formato,
                    physicalOptions: book.physicalOptions,
                });
            } catch (error) {
                console.error('Erro ao buscar livro:', error);
            }
        }
        fetchBook();
    }, [bookId]);

    return { bookData };
};
