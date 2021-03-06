import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import Cpf from '../../utils/Cpf';

import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import BtnCancel from '../../components/BtnCancel';
import FullLoading from '../../components/FullLoading';

import {
  modifyBank,
  modifyAccountType,
  modifyAgency,
  modifyOperation,
  modifyAccountNumber,
  modifyHolder,
  modifyHolderCPF,
} from '../../store/modules/register/actions';
import { listbank, listAccount } from '../../utils/List';

export default function EditFinancesData({ navigation }) {
  const { edit } = navigation.state.params;
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const [visible, setvisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [list, setlist] = React.useState([]);
  const [pikerType, setpikerType] = React.useState('');
  const [bank, setbank] = React.useState(register.bank);
  const [account, setaccount] = React.useState(register.accountType);
  const [agency, setagency] = React.useState(register.agency);
  const [operation, setoperation] = React.useState(register.operation);
  const [accountNumber, setaccountNumber] = React.useState(
    register.accountNumber
  );
  const [holder, setholder] = React.useState(register.holder);
  const [holderCPF, setholderCPF] = React.useState(register.holderCPF || '');

  const onPressDone = (type, value) => {
    switch (type) {
      case 'account':
        setaccount(value);
        break;

      case 'bank':
        setbank(value);
        break;

      default:
        break;
    }
    setvisible(false);
  };

  const onPressSave = async () => {
    setloading(true);
    let response = null;
    try {
      response = await api.put(
        '/person',
        {
          uuid: register.uuid,
          bank,
          accountType: account,
          agency,
          operation,
          accountNumber,
          holder,
          holderCPF,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Alert.alert(
        'Ops!',
        'Houve um erro ao tentar realizar o cadastro, verifique sua conexão com a internet e tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      throw error;
    }

    dispatch(modifyAccountType(response.data.bank.type));
    dispatch(modifyBank(response.data.bank.bank));
    dispatch(modifyAgency(response.data.bank.agency));
    dispatch(modifyOperation(response.data.bank.operation));
    dispatch(modifyAccountNumber(response.data.bank.account));
    dispatch(modifyHolder(response.data.bank.name));
    dispatch(modifyHolderCPF(response.data.bank.cpf));

    Alert.alert(
      '',
      'Os dados foram alterados com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setloading(false);
            navigation.goBack();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderForm
        navigation={navigation}
        screen="ReferenceForm"
        back
        iconRight={edit ? 'save' : null}
        disabled={!edit}
        onPress={onPressSave}
        onPressBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 25,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          >
            Dados Bancários
          </Text>
          <FildInputForm
            disabled={!edit}
            lable="Banco"
            placeholder="Selecione uma opção"
            list
            androidList={listbank}
            onValueChange={value => onPressDone('bank', value)}
            onPress={() => {
              setlist(listbank);
              setpikerType('bank');
              setvisible(true);
            }}
            value={bank}
          />
          <FildInputForm
            disabled={!edit}
            lable="Tipo de Conta"
            placeholder="Selecione uma opção"
            list
            androidList={listAccount}
            onValueChange={value => onPressDone('account', value)}
            onPress={() => {
              setlist(listAccount);
              setpikerType('account');
              setvisible(true);
            }}
            value={account}
          />
          <FildInputForm
            disabled={!edit}
            lable="Agência"
            placeholder="Informe o Nº da agência"
            onChangeText={text => setagency(text)}
            value={agency}
          />
          <FildInputForm
            disabled={!edit}
            lable="Operação"
            placeholder="Informe a operação"
            onChangeText={text => setoperation(text)}
            value={operation}
          />
          <FildInputForm
            disabled={!edit}
            lable="Conta"
            placeholder="Informe o Nº da conta"
            onChangeText={text => setaccountNumber(text)}
            value={accountNumber}
          />
          <FildInputForm
            disabled={!edit}
            lable="Nome do Titular"
            placeholder="Informe o nome do titular"
            onChangeText={text => setholder(text)}
            value={holder}
          />
          <FildInputForm
            disabled={!edit}
            lable="CPF do Titular"
            placeholder="Informe o Nº do CPF do titular"
            keyboardType="numeric"
            maxLength={14}
            onChangeText={text => setholderCPF(text)}
            value={Cpf.format(holderCPF)}
          />
          {edit ? <BtnCancel onPress={() => navigation.goBack()} /> : null}
        </ScrollView>
      </KeyboardAvoidingView>
      <SelectPiker
        visible={visible}
        list={list}
        onPress={value => {
          onPressDone(pikerType, value);
        }}
      />
      <FullLoading loading={loading} />
    </View>
  );
}
