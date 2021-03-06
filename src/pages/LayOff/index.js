import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

// import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import Date from '../../utils/Date';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import FullLoading from '../../components/FullLoading';

export default function LayOff({ navigation }) {
  const { uuid } = navigation.state.params;
  const user = useSelector(state => state.auth);

  const [date, setDate] = React.useState(null);
  const [reason, setReason] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  async function onpressDelete() {
    setLoading(true);
    let response = null;
    try {
      response = await api.delete(
        `/workcontract?user=${uuid}&canceldate=${date}&reason=${reason}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar desligar colaborador, tente novamente mais tarde.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return error;
    }

    if (check) {
      await updatePerson();
    }

    Alert.alert(
      '',
      'Colaborador desligado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  }

  const updatePerson = async () => {
    try {
      await api.put(
        `/person`,
        {
          uuid,
          statusAvanci: 'rm',
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao salvar os dados, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  function confirmation() {
    if (!date || !reason) {
      Alert.alert(
        '',
        'Os campos data de desligamento e motivo são obrigatórios.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    if (!moment(date, 'DD/MM/YYYY').isValid() || date.length < 10) {
      Alert.alert('', 'A data informada é inválida.', [{ text: 'OK' }], {
        cancelable: false,
      });
      return;
    }
    Alert.alert(
      'Atenção!',
      'Deseja mesmo desligar este colaborador da Avanci Construtora?',
      [{ text: 'Cancelar' }, { text: 'OK', onPress: () => onpressDelete() }],
      { cancelable: false }
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight="cancel"
        onPress={() => navigation.goBack()}
        onPressBack={() => navigation.goBack()}
      />
      <FildInputForm
        lable="Data de Desligamento"
        keyboardType="numeric"
        maxLength={10}
        placeholder="Informe a data de desligamento"
        onChangeText={text => setDate(text)}
        value={Date.format(date)}
      />
      <FildInputForm
        lable="Motivo de Desligamento"
        placeholder="Informe o motivo de desligamento"
        onChangeText={text => setReason(text)}
        value={reason}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCheck(!check)}
        >
          <AntDesign
            name={check ? 'checkcircle' : 'checkcircleo'}
            size={25}
            color={check ? '#f48024' : '#ececec'}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '500', flex: 1 }}>
          Desligar colaborador permanentemente.
        </Text>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          paddingHorizontal: 20,
          height: 50,
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => confirmation()}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>
          Desligar
        </Text>
      </TouchableOpacity>
      <FullLoading loading={loading} />
    </View>
  );
}
