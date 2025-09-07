import ServiceHistory from "@/components/ServiceHistory";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import mockData from "../../mocks/mockData";

export default function ServicesScreen() {
  const veiculo = Object.values(mockData)[0];

  if (!veiculo) {
    return (
      <View style={styles.container}>
        <Text>Nenhum veículo encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ServiceHistory
        servicos={veiculo.servicos}
        listHeaderComponent={
          <>
            <Text style={styles.header}>Serviços do Veículo: {veiculo.placa}</Text>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});