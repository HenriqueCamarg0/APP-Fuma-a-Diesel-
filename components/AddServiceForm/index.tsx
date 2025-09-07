import React, { useState } from 'react';
import {  Modal,  View,  Text,  TextInput,  StyleSheet,  TouchableOpacity,  Platform,  Button,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';  

interface AddServiceModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (
    descricao: string,
    valor: number,
    mecanico: string,
    dataAgendada: string,
    status: "Concluído" | "Em andamento" | "Pendente" | "Agendado"
  ) => void;
}

export default function AddServiceModal({ visible, onClose, onSubmit }: AddServiceModalProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [mecanico, setMecanico] = useState('');
  const [status, setStatus] = useState<"Concluído" | "Em andamento" | "Pendente" | "Agendado">("Pendente");

  const [dataAgendada, setDataAgendada] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDataAgendada(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (!descricao || !valor || !mecanico) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    onSubmit(descricao, Number(valor), mecanico, dataAgendada.toISOString(), status);
    setDescricao('');
    setValor('');
    setMecanico('');
    setDataAgendada(new Date());
    setStatus("Pendente");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Adicionar Novo Serviço</Text>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição do serviço"
          />

          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            placeholder="Valor do serviço"
          />

          <Text style={styles.label}>Funcionário</Text>
          <TextInput
            style={styles.input}
            value={mecanico}
            onChangeText={setMecanico}
            placeholder="Nome do funcionário"
          />

          <Text style={styles.label}>Data Agendada</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text>{dataAgendada.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dataAgendada}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date(2100, 12, 31)}
              minimumDate={new Date(2000, 0, 1)}
            />
          )}

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue: string) =>
                setStatus(itemValue as "Concluído" | "Em andamento" | "Pendente" | "Agendado")
              }
            >
              <Picker.Item label="Pendente" value="Pendente" />
              <Picker.Item label="Em andamento" value="Em andamento" />
              <Picker.Item label="Agendado" value="Agendado" />
              <Picker.Item label="Concluído" value="Concluído" />
            </Picker>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCancel: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
  },
  buttonSave: {
    backgroundColor: '#f97316', // laranja diesel
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
