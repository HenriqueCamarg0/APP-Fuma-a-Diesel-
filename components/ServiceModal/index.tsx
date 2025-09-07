import React from 'react';
import {  Modal,  View,  Text,  StyleSheet,  ScrollView,  TouchableOpacity,} from 'react-native';
import { Servico } from '../../types/servico';
import Colors from '../../constants/Colors';
import { format } from 'date-fns';

interface ServiceModalProps {
  visible: boolean;
  onClose: () => void;
  service: Servico | null;
}

export default function ServiceModal({ visible, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'dd/MM/yyyy');
    } catch {
      return date;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Detalhes do Serviço</Text>

            <Text style={styles.text}><Text style={styles.bold}>ID:</Text> {service.id}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Data:</Text> {formatDate(service.data)}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Descrição:</Text> {service.descricao}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Valor:</Text> R$ {service.valor.toFixed(2)}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Status:</Text> {service.status}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Mecânico:</Text> {service.mecanico}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Observações:</Text> {service.observacoes}</Text>

            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.laranjaDiesel,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.cinzaMecanico,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: Colors.pretoPotencia,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.laranjaDiesel,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
