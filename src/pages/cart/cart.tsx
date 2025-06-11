import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import TrashIcon from "./assets/Trash.svg";
import api from "../../../API/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LivroCarrinho {
  id: string;
  titulo: string;
  autor: string;
  tipo: string;
  preco: number;
  foto: { uri: string };
  quantidade: number;
  estoque: number;
  formato: string;
  idLivro: string;
  checked?: boolean;
}

export default function Cart() {
  const [livros, setLivros] = useState<LivroCarrinho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarItensCarrinho = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const idCarrinho = await AsyncStorage.getItem("idCarrinho");

        if (!token || !idCarrinho) return;

        const { data: itensCarrinho } = await api.get(
          `/item-carrinho/carrinho/${idCarrinho}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const livrosMap: Record<string, LivroCarrinho> = {};

        for (const item of itensCarrinho) {
          const { data: livro } = await api.get(`/livros/${item.id_livro}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const bookImage = { uri: api.defaults.baseURL + livro.foto };

          if (livrosMap[livro.id]) {
            livrosMap[livro.id].quantidade += 1;
          } else {
            livrosMap[livro.id] = {
              id: item.id,
              idLivro: livro.id,
              titulo: livro.titulo,
              autor: livro.autor.nome,
              tipo: livro.tipo,
              preco: livro.preco,
              foto: bookImage,
              formato: livro.formato,
              quantidade: 1,
              estoque: livro.estoque,
              // checked: false,
            };
          }
        }

        setLivros(Object.values(livrosMap));
      } catch (error) {
        console.error("Erro ao carregar itens do carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarItensCarrinho();
  }, []);

  const aumentarQuantidade = (id: string) => {
    setLivros((prevLivros) =>
      prevLivros.map((livro) => {
        if (livro.id === id && livro.quantidade < livro.estoque) {
          return { ...livro, quantidade: livro.quantidade + 1 };
        }
        return livro;
      })
    );
  };

  const diminuirQuantidade = (id: string) => {
    setLivros((prevLivros) =>
      prevLivros.map((livro) =>
        livro.id === id && livro.quantidade > 1
          ? { ...livro, quantidade: livro.quantidade - 1 }
          : livro
      )
    );
  };

  const deletarItemDoCarrinho = async (idLivro: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await api.delete(`/item-carrinho/${idLivro}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros((prevLivros) =>
        prevLivros.filter((livro) => livro.id !== idLivro)
      );
    } catch (error) {
      console.error("Erro ao deletar item do carrinho:", error);
    }
  };

  // const toggleCheckbox = (id: string) => {
  //   setLivros((prevLivros) =>
  //     prevLivros.map((livro) =>
  //       livro.id === id ? { ...livro, checked: !livro.checked } : livro
  //     )
  //   );
  // };

  // const subtotal = livros.reduce((total, livro) => {
  //   return livro.checked ? total + livro.preco * livro.quantidade : total;
  // }, 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Image source={item.foto} style={styles.image} />
        <View style={styles.qtdContainer}>
          <TouchableOpacity
            style={styles.qtdButton}
            onPress={() => diminuirQuantidade(item.id)}
          >
            <Text style={styles.qtdText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtdText}>{item.quantidade}</Text>
          <TouchableOpacity
            style={styles.qtdButton}
            onPress={() => aumentarQuantidade(item.id)}
          >
            <Text style={styles.qtdText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => deletarItemDoCarrinho(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <TrashIcon width={24} height={24} />
        </TouchableOpacity>

        {/* <CheckBox
          value={item.checked || false}
          onValueChange={() => toggleCheckbox(item.id)}
        /> */}

        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.author}>por {item.autor}</Text>
        <Text style={styles.type}>
          {item.tipo.toLowerCase() === "digital" ? item.formato : item.tipo}
        </Text>
        <Text style={styles.stock}>Em estoque</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARRINHO DE COMPRAS</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.separator} />
      </View>

      <View style={{ flex: 1, position: "relative" }}>
        {loading && (
          <View
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: [{ translateX: -20 }, { translateY: 75 }],
              zIndex: 10,
            }}
          >
            <ActivityIndicator size="large" color="#8000FF" />
          </View>
        )}

        <FlatList
          data={livros}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: R$ {subtotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
