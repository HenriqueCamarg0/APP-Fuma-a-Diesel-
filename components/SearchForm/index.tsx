import React, { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

interface SearchFormProps {
  placa: string;
  setPlaca: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
  isLoading: boolean;
}

export default function SearchForm({
  placa,
  setPlaca,
  onSearch,
  isLoading,
}: SearchFormProps) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.subtitle}>Pesquise por placa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a placa (Ex: ABC1234)"
        value={placa}
        onChangeText={setPlaca}
        autoCapitalize="characters"
      />
      <Button
        title="Buscar Caminhão"
        onPress={onSearch}
        color={Colors.laranjaDiesel}
        disabled={isLoading}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={Colors.laranjaDiesel}
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 15,
    backgroundColor: Colors.brancoFumaca,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.pretoPotencia,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10, 
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 0, 
    color: Colors.cinzaMecanico,
  },
  input: {
    height: 50,
    borderColor: Colors.cinzaMecanico,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10, 
    backgroundColor: "#FAFAFA",
  },
  loadingIndicator: {
    marginVertical: 0,
  },
});
