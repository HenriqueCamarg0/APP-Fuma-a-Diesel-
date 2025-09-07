import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import Colors from '../constants/Colors';
import mockData from '../mocks/mockData';
import { Veiculo } from '../types/veiculo';

// Componentes
import SearchForm from '../components/SearchForm';
import TruckDetails from '../components/TruckDetails';
import ServiceHistory from '../components/ServiceHistory';
import CustomButton from '../components/CustomButton';
import AddServiceModal from '../components/AddServiceForm'; 

export default function HomeScreen() {
  const router = useRouter();

  const [placa, setPlaca] = useState('');
  const [caminhaoEncontrado, setCaminhaoEncontrado] = useState<Veiculo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [servicos, setServicos] = useState<any[]>([]);     

  const buscarCaminhao = () => {
    if (!placa.trim()) {
      Alert.alert('Atenção', 'Por favor, digite a placa do caminhão.');
      return;
    }

    setIsLoading(true);
    setCaminhaoEncontrado(null);

    setTimeout(() => {
      const placaFormatada = placa.trim().toUpperCase();
      const dadosCaminhao = mockData[placaFormatada];

      if (dadosCaminhao) {
        setCaminhaoEncontrado(dadosCaminhao);
        setServicos(dadosCaminhao.servicos || []);
      } else {
        Alert.alert('Erro', 'Caminhão não encontrado. Por favor, tente novamente.');
      }

      setIsLoading(false);
    }, 1500);
  };

  const limparBusca = () => {
    setPlaca('');
    setCaminhaoEncontrado(null);
    setServicos([]);
  };

  const adicionarServico = () => {
    setModalVisible(true);
  };

  const salvarServico = (descricao: string, valor: number, mecanico: string) => {
    if (!caminhaoEncontrado) return;

    const novoServico = {
      id: Date.now(),
      data: new Date().toISOString(),
      descricao,
      valor,
      mecanico,
      status: 'Pendente',
      observacoes: '',
    };

    const servicosAtualizados = [...servicos, novoServico];

    setServicos(servicosAtualizados);

    mockData[caminhaoEncontrado.placa].servicos = servicosAtualizados;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.laranjaDiesel}
          style={styles.loadingIndicator}
        />
      );
    }

    if (caminhaoEncontrado) {
      const listHeader = (
        <View>
          <TruckDetails veiculo={caminhaoEncontrado} />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Limpar Busca"
              onPress={limparBusca}
              color={Colors.cinzaMecanico}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Adicionar Novo Serviço"
              onPress={adicionarServico}
              color={Colors.laranjaDiesel}
            />
          </View>
        </View>
      );

      return (
        <>
          <ServiceHistory servicos={servicos} listHeaderComponent={listHeader} />
          <AddServiceModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={salvarServico}
          />
        </>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oficina do Fumaça</Text>

      <SearchForm
        placa={placa}
        setPlaca={setPlaca}
        onSearch={buscarCaminhao}
        isLoading={isLoading}
      />

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.brancoFumaca,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.laranjaDiesel,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
});
