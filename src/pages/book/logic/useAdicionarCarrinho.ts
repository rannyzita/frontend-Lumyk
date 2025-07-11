import { useAuthStorage } from '../../../hooks/useAuthStorage';
import { buscarAssinatura } from '../../../services/AssinaturaService';
import { criarCarrinho, buscarCarrinho } from '../../../services/CarrinhoService';
import {
    adicionarItemCarrinho,
    buscarItensCarrinho,
    atualizarItemCarrinho
} from '../../../services/ItemCarrinhoService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAdicionarCarrinho() {
    const { getTokenAndUserId } = useAuthStorage();

    const adicionarAoCarrinho = async ({
        bookId,
        bookPreco,
        selectedFormat,
        selectedCover,
        setShowModal,
    }: {
        bookId: string;
        bookPreco: number;
        selectedFormat: 'digital' | 'fisico';
        selectedCover: string | null;
        setShowModal: (val: boolean) => void;
    }) => {
        try {
            const { token } = await getTokenAndUserId();
            if (!token) return;

            let idCarrinho = await AsyncStorage.getItem('idCarrinho');

            if (!idCarrinho) {
                await criarCarrinho(token);
                const carrinho = await buscarCarrinho(token);
                idCarrinho = carrinho?.id;
                if (!idCarrinho) return;
                await AsyncStorage.setItem('idCarrinho', idCarrinho);
            }

            const assinaturaData = await buscarAssinatura(token);
            const assinatura = assinaturaData?.[0]?.tipo_assinatura ?? null;

            let preco_unitario = bookPreco;

            if (selectedFormat === 'fisico') {
                if (selectedCover === 'Capa Dura') preco_unitario *= 1.3;
                else if (selectedCover === 'Capa Comum') preco_unitario *= 1.15;
            }

            if (assinatura === 'Premium') preco_unitario *= 0.8;

            const itensCarrinho = await buscarItensCarrinho(token, idCarrinho);

            const itemExistente = itensCarrinho.find((item: any) => {
                const mesmoLivro = item.id_livro === bookId;
                const mesmoFormato = item.formato === selectedFormat;
                const mesmoTipo =
                selectedFormat === 'digital' || item.tipo === selectedCover;
                return mesmoLivro && mesmoFormato && mesmoTipo;
            });

            if (itemExistente) {
                const novaQuantidade = itemExistente.quantidade + 1;
                await atualizarItemCarrinho(token, itemExistente.id, {
                quantidade: novaQuantidade,
                });
            } else {
                await adicionarItemCarrinho(token, {
                id_carrinho: idCarrinho,
                id_livro: bookId,
                quantidade: 1,
                preco_unitario: +preco_unitario.toFixed(2),
                formato: selectedFormat,
                tipo: selectedFormat === 'fisico' ? selectedCover : null,
                });
            }

            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    return adicionarAoCarrinho;
}
