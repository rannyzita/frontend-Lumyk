import api from '../../API/index';

export async function adicionarItemCarrinho(
  token: string,
  item: {
    id_carrinho: string;
    id_livro: string;
    quantidade: number;
    preco_unitario: number;
    formato: string;
    tipo: string | null;
  }
) {
  return await api.post('/item-carrinho/', item, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function buscarItensCarrinho(token: string, idCarrinho: string) {
  const response = await api.get(`/item-carrinho/carrinho/${idCarrinho}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function atualizarItemCarrinho(
  token: string,
  idItem: string,
  dados: {
    quantidade: number;
  }
) {
  return await api.put(`/item-carrinho/${idItem}`, dados, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
