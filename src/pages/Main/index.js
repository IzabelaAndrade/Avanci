import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import OrderCard from '../../components/OrderCard';

const { width, height } = Dimensions.get('window');

const orderList = [
  {
    id: '1',
    number: '372',
    createat: '2019-12-06',
    finalDate: '2019-12-13',
    author: 'Autor',
    place: 'Tribunal de Justiça',
    status: 'Aguardando Cotação',
    tags: 'Elétrica, Alvenaria',
    itens: [
      {
        id: '1',
        description: 'Luminária Redonda Ônix 127V 35cm x 100cm',
        unidade: 'Un',
        qtde: '03',
      },
      { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
      { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
      { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
    ],
  },
  {
    id: '2',
    number: '356',
    createat: '2019-12-03',
    finalDate: '2019-12-11',
    author: 'Marcos de Andrade',
    place: 'Santa Casa da Misericórdia',
    status: 'Em Cotação',
    tags: 'Elétrica, Alvenaria',
    itens: [
      {
        id: '1',
        description: 'Luminária Redonda Ônix 127V 35cm x 100cm',
        unidade: 'Un',
        qtde: '03',
      },
      { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
      { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
      { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
    ],
  },
];

const stylesMain = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  btn: {
    height: 60,
    width: 60,
    backgroundColor: '#f48024',
    borderRadius: 30,
    position: 'absolute',
    top: height - 150,
    left: width - 85,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Main({ navigation }) {
  function seeOrder(item) {
    navigation.navigate('Order', {
      data: item,
    });
  }

  return (
    <>
      <SafeAreaView style={stylesMain.container}>
        <FlatList
          data={orderList}
          renderItem={({ item }) => {
            return (
              <OrderCard
                id={item.id}
                number={item.number}
                createat={item.createat}
                place={item.place}
                author={item.author}
                finalDate={item.finalDate}
                tags={item.tags}
                status={item.status}
                itens={item.itens}
                onPressCard={() => seeOrder(item)}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={stylesMain.btn}
        onPress={() => {
          navigation.navigate('CreateOrder');
        }}
      >
        <AntDesign name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </>
  );
}
