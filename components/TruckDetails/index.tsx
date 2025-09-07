import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Veiculo } from "@/types/veiculo";

interface TruckDetailsProps {
  veiculo: Veiculo;
}

export default function TruckDetails({ veiculo }: TruckDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.detailsContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.card}>
        <Text style={styles.detailTitle}>Informações do Caminhão</Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Proprietário:</Text> {veiculo.proprietario}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Motorista:</Text> {veiculo.motorista}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Categoria:</Text> {veiculo.categoria}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Placa:</Text> {veiculo.placa}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.bold}>Modelo:</Text> {veiculo.modelo}
        </Text>
        {/* Expansão */}
        {isExpanded && (
          <View>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Marca:</Text> {veiculo.marca}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Ano:</Text> {veiculo.ano}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Motor:</Text> {veiculo.motor}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Potência:</Text> {veiculo.potencia}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Combustível:</Text> {veiculo.combustivel}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Quilometragem:</Text> {veiculo.kilometragem} km
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.brancoFumaca,
    padding: 25,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.pretoPotencia,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.pretoPotencia,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.cinzaMecanico,
  },
  bold: {
    fontWeight: "bold",
    color: Colors.pretoPotencia,
  },
});