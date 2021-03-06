import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';

import {
  modifyLastJob,
  modifyTimeJob,
  modifyTypeJob,
  modifyDescriptionJob,
} from '../../store/modules/register/actions';

import FullLoading from '../../components/FullLoading';
import HeaderForm from '../../components/HeaderForm';
import FildInputForm from '../../components/FildInputForm';
import SelectPiker from '../../components/SelectPiker';
import BtnCancel from '../../components/BtnCancel';

import { typeJobList } from '../../utils/List';

export default function EditReferenceData({ navigation }) {
  const { edit } = navigation.state.params;
  const [visible, setvisible] = React.useState('');

  const dispatch = useDispatch();

  const [loading, setloading] = React.useState(false);
  const register = useSelector(state => state.register);
  const user = useSelector(state => state.auth);

  const [lastJob, setlastJob] = React.useState(register.lastJob);
  const [timeJob, settimeJob] = React.useState(register.timeJob);
  const [descriptionJob, setdescriptionJob] = React.useState(
    register.descriptionJob
  );
  const [typeJob, settypeJob] = React.useState(register.typeJob);

  const onPressSave = async () => {
    setloading(true);
    let response = null;
    try {
      response = await api.put(
        '/person',
        {
          uuid: register.uuid,
          lastJob,
          timeJob,
          descriptionJob,
          typeJob,
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

    dispatch(
      modifyLastJob(response.data.person.professional_experience.lastJob)
    );
    dispatch(
      modifyTimeJob(response.data.person.professional_experience.timeJob)
    );
    dispatch(
      modifyDescriptionJob(
        response.data.person.professional_experience.descriptionJob
      )
    );
    dispatch(
      modifyTypeJob(response.data.person.professional_experience.typeJob)
    );

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
        screen="Main"
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
            Experiência Profissional
          </Text>
          <FildInputForm
            disabled={!edit}
            lable="Último emprego"
            placeholder="Informe o nome da empresa"
            onChangeText={text => setlastJob(text)}
            value={lastJob}
          />
          <FildInputForm
            disabled={!edit}
            lable="Tempo de Permanência"
            placeholder="Informe o periodo de tempo"
            onChangeText={text => settimeJob(text)}
            value={timeJob}
          />
          <FildInputForm
            disabled={!edit}
            lable="Função que atuava"
            placeholder="Descrição da função"
            onChangeText={text => setdescriptionJob(text)}
            value={descriptionJob}
          />
          <FildInputForm
            disabled={!edit}
            lable="Regime de Trabalho"
            placeholder="Selecione uma opção"
            list
            androidList={typeJobList}
            onValueChange={value => {
              settypeJob(value);
              setvisible(false);
            }}
            onPress={() => setvisible(true)}
            value={typeJob}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {edit ? <BtnCancel onPress={() => navigation.goBack()} /> : null}
      <SelectPiker
        visible={visible}
        list={typeJobList}
        onPress={value => {
          settypeJob(value);
          setvisible(false);
        }}
      />
      <FullLoading loading={loading} />
    </View>
  );
}
