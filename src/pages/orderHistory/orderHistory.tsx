import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import LogoPacote from './assets/Pacote.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const pedidosFicticios = [
  {
    mesAno: 'Fevereiro de 2025',
    pedidos: [
      {
        id: '1',
        titulo: 'Box O Povo do Ar - Holly Black',
        data: '23/02/2025',
        preco: 89.9,
      },
      {
        id: '2',
        titulo: 'Verity - Colleen Hoover',
        data: '14/02/2025',
        preco: 39.9,
      },
      {
        id: '3',
        titulo: 'Até o verão terminar - Colleen Hoover',
        data: '05/02/2025',
        preco: 42.5,
      },
    ],
  },
  {
    mesAno: 'Dezembro de 2024',
    pedidos: [
      {
        id: '4',
        titulo: 'Box O Povo do Ar - Holly Black',
        data: '23/12/2024',
        preco: 89.9,
      },
      {
        id: '5',
        titulo: 'Verity - Colleen Hoover',
        data: '14/12/2024',
        preco: 39.9,
      },
      {
        id: '6',
        titulo: 'Até o verão terminar - Colleen Hoover',
        data: '05/12/2024',
        preco: 42.5,
      },
    ],
  },
  {
    mesAno: 'Novembro de 2024',
    pedidos: [
      {
        id: '7',
        titulo: 'Box O Povo do Ar - Holly Black',
        data: '23/11/2024',
        preco: 89.9,
      },
    ],
  },
];

export default function OrderHistory() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HISTÓRICO DE PEDIDOS</Text>
      <View style={styles.line} />

      {pedidosFicticios.map((grupo, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{grupo.mesAno}</Text>
          <View style={styles.cardContainer}>
            {grupo.pedidos.map((pedido, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() =>
                  navigation.navigate('DetailsHistory', { orderId: pedido.id })
                }
              >
                <View style={styles.card}>
                  <View style={styles.row}>
                    <LogoPacote width={30} height={30} />
                    <View style={styles.textContainer}>
                      <Text style={styles.bookTitle}>{pedido.titulo}</Text>
                      <Text style={styles.dateText}>Data: {pedido.data}</Text>
                      <Text style={styles.priceText}>
                        Preço: R${' '}
                        {pedido.preco.toFixed(2).replace('.', ',')}
                      </Text>
                    </View>
                    <Text style={styles.status}>
                      Status:{' '}
                      <Text style={styles.entregue}>Entregue</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Total do mês */}
            <Text style={styles.totalMes}>
                Total do mês: R${' '}
                {grupo.pedidos
                .reduce((soma, pedido) => soma + pedido.preco, 0)
                .toFixed(2)
                .replace('.', ',')}
            </Text>
          </View>
          <View style={{marginTop:30}}></View>
        </View>
      ))}
    </ScrollView>
  );
}
