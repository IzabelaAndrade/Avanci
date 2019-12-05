import React from 'react';
import {
  View, TextInput, TouchableOpacity,
  Text
} from 'react-native';

import {
  AntDesign,
  Feather,
} from '@expo/vector-icons';


import Date from '../../utils/Date'

import HeaderOrderTable from '../../components/HeaderOrderTable'
import InsertTable from '../../components/InsertTable'
import OrderTable from '../../components/OrderTable'
// import { Container } from './styles';

const testorderList = [
  {
    id: '1', description: 'Luminária Redonda Ônix 127V 35cm x 100cm', unidade:
      'Un', qtde: '03'
  },
  { id: '2', description: 'Interruptor', unidade: 'Un', qtde: '06' },
  { id: '3', description: 'Tomada', unidade: 'Un', qtde: '08' },
  { id: '4', description: 'Cabo Flex', unidade: 'M', qtde: '200' },
]

const serverList = [
  { id: '1', description: 'Luminária Redonda Ônix 127V 35cm x 100cm', unidade: 'Un' },
  { id: '2', description: 'Interruptor', unidade: 'Un' },
  { id: '3', description: 'Tomada', unidade: 'Un' },
  { id: '4', description: 'Cabo Flex', unidade: 'M' },
]

const serverListPlaces = [
  { id: '1', name: 'Tribunal de Justiça' },
  { id: '2', name: 'Secretaria de Saúde' },
  { id: '3', name: 'Santa Casa da Misericórdia' },
  { id: '4', name: 'Detran' },
]

export default function CreateOrder() {

  const [qtde, setQtde] = React.useState('');
  const [finalDate, setFinalDate] = React.useState('');
  const [visible, setModalVisible] = React.useState(false);
  const [visiblePlaces, setVisiblePlaces] = React.useState(false);
  const [choiceItem, setChoiceItem] = React.useState('');
  const [choicePlace, setChoicePlace] = React.useState('');

  const [orderList, setOrderList] = React.useState(testorderList);
  var moment = require('moment');

  getItem = (item) => {
    if (item) {
      console.log(item)
      setChoiceItem(item.description)
    }
    setModalVisible(!visible);
  }

  getPlaces = (item) => {
    if (item) {
      console.log(item)
      setChoicePlace(item.name)
    }
    console.log('item')
    setVisiblePlaces(!visiblePlaces);
  }

  function getFinalDate(date) {
    console.log(date)
    let d = Date.format(date)
    setFinalDate(d)
  }

  function validadteDate() {
    // moment().isValid()
    let minDate = false
    let valide = moment(finalDate, 'DD/MM/YYYY').isValid();
    if (valide) {
      minDate = moment().isSameOrBefore(moment(finalDate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
    }
    let size = finalDate.length == 10 ? true : false;
    if (valide && size && minDate) {
      console.log(true)
      return
    }
    console.log(false)
  }

  function handleAddTable() {
    if (!choiceItem || !qtde) return
    setOrderList([
      {
        id: Math.random() + '',
        description: choiceItem,
        unidade: 'Un',
        qtde: qtde < 10 ? '0' + qtde.toString() : qtde.toString()
      }, ...orderList
    ]);
    setChoiceItem('');
    setQtde('');
  }

  function handleRemoveTable(item) {
    let orderListUpdate = orderList.filter((element) => {
      if (element.id === item.id)
        return false
      return true
    })
    setOrderList(orderListUpdate)
    // return { ...state, favorites: rmUpdate }
  }

  return (
    <View style={{ flex: 1 }}>

      <HeaderOrderTable
        value={finalDate}
        onChangeText={(text) => getFinalDate(text)}
        onEndEditing={() => validadteDate()}
        data={serverListPlaces}
        visible={visiblePlaces}
        onPress={() => getPlaces('')}
        onSelectPlace={(item) => getPlaces(item)}
        choicePlace={choicePlace}
      />

      <View
        style={{
          marginTop: 10,
          borderTopWidth: .5,
          flex: 1,
          borderColor: '#bcbcbc'
        }}
      >

        <InsertTable
          onPress={() => getItem('')}
          visible={visible}
          data={serverList}
          onSelect={(item) => getItem(item)}
          choiceItem={choiceItem}
          onChangeText={text => setQtde(text)}
          qtde={qtde}
          onInsert={handleAddTable}
        />

        <OrderTable
          data={orderList}
          enabled
          onDelete={(item) => handleRemoveTable(item)}
        />

      </View>
    </View>
  );
}
