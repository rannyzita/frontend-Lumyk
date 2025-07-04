import api from '../../API/index'; 

export async function adicionarItemCarrinho(token: string, item: {
    id_carrinho: string;
    id_livro: string;
    quantidade: number;
    preco_unitario: number;
    formato: string;
    tipo: string | null;
}) {
    return await api.post('/item-carrinho/', item, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
