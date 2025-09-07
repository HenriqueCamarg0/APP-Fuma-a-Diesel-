import React, { useState, useCallback } from "react";
import {   View,   Text,   FlatList,   Pressable,   StyleSheet,   ViewStyle,  ListRenderItem, } from "react-native";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import ServiceModal from '../../components/ServiceModal';


import Colors from "../../constants/Colors";
import { Servico } from "../../types/servico";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Props
interface ServiceHistoryProps {
  servicos: Servico[];
  listHeaderComponent: React.ReactNode;
}

// Função utilitária
const formatarData = (data: string) => {
  try {
    return format(new Date(data), "dd/MM/yyyy");
  } catch {
    return data;
  }
};

export default function ServiceHistory({ servicos, listHeaderComponent }: ServiceHistoryProps) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpansion = useCallback((id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

const [selectedService, setSelectedService] = useState<Servico | null>(null);
const [modalVisible, setModalVisible] = useState(false);

const handleOpenModal = (servico: Servico) => {
  setSelectedService(servico);
  setModalVisible(true);
};

const handleCloseModal = () => {
  setModalVisible(false);
};

  const renderStatusBadge = (
    status: "Concluído" | "Em andamento" | "Pendente" | "Agendado"
  ) => {
    const statusStyles: Record<
      "Concluído" | "Em andamento" | "Pendente" | "Agendado",
      { color: string; backgroundColor: string }
    > = {
      Concluído: styles.statusConcluido,
      "Em andamento": styles.statusAndamento,
      Pendente: styles.statusPendente,
      Agendado: styles.statusAgendado,
    };

    return (
      <Text style={[styles.statusBadge, statusStyles[status]]}>
        {status}
      </Text>
    );
  };

  const renderItem: ListRenderItem<Servico> = ({ item }) => {
    const isExpanded = expandedItems.has(item.id);

    return (
      <View style={styles.itemContainer}>
        <Pressable
          onPress={() => toggleExpansion(item.id)}
          style={({ pressed }) => [
            styles.item,
            pressed && styles.pressedItem,
            isExpanded && styles.expandedItem,
          ]}
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.text}>
                <Text style={styles.bold}>OS Nº:</Text> XXXXX
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Data:</Text> {formatarData(item.data)}
              </Text>
              <Text style={[styles.text, styles.statusText]}>
                <Text style={styles.bold}>Status:</Text>{" "}
                {renderStatusBadge(
                  item.status === "Concluído" ||
                  item.status === "Em andamento" ||
                  item.status === "Pendente" ||
                  item.status === "Agendado"
                    ? item.status
                    : "Pendente"
                )}
              </Text>
            </View>
            <Text style={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</Text>
          </View>

          {/* Descrição */}
          <Text
            style={[styles.text, styles.descricaoResumo]}
            numberOfLines={isExpanded ? undefined : 2}
          >
            <Text style={styles.bold}>Serviço:</Text> {item.descricao}
          </Text>

          {/* Conteúdo Expandido */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.divider} />

              <Text style={styles.text}>
                <Text style={styles.bold}>Valor:</Text>{" "}
                <Text style={styles.valorText}>
                  R$ {item.valor.toFixed(2).replace(".", ",")}
                </Text>
              </Text>

              <Text style={styles.text}>
                <Text style={styles.bold}>Mecânico Responsável:</Text>{" "}
                {item.mecanico}
              </Text>

              <View style={styles.observacoesContainer}>
                <Text style={styles.bold}>Observações Técnicas:</Text>
                <Text style={styles.observacoesText}>{item.observacoes}</Text>
              </View>

              <Pressable onPress={() => handleOpenModal(item)} style={styles.detailsButton}>
  <Text style={styles.detailsButtonText}>Ver Detalhes Completos</Text>
</Pressable>
            </View>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.historyContainer}>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // O ListHeaderComponent renderiza o conteúdo que rolará junto com a lista
        ListHeaderComponent={
          <>
            {listHeaderComponent}
            <Text style={styles.title}>Histórico de Serviços</Text>
            <Text style={styles.subtitle}>Toque nos cards para expandir informações</Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📋</Text>
            <Text style={styles.emptyText}>Nenhum serviço registrado</Text>
            <Text style={styles.emptySubtext}>
              Os serviços realizados aparecerão aqui
            </Text>
          </View>
        }
      />
      <ServiceModal
  visible={modalVisible}
  onClose={handleCloseModal}
  service={selectedService}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.laranjaDiesel,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.cinzaMecanico,
    marginBottom: 12,
    fontStyle: "italic",
  },
  listContainer: {
    gap: 12,
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 4,
  },
  item: {
    backgroundColor: Colors.brancoFumaca,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.laranjaDiesel,
    shadowColor: Colors.pretoPotencia,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  expandedItem: {
    borderLeftWidth: 6,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  pressedItem: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  expandIcon: {
    fontSize: 16,
    color: Colors.laranjaDiesel,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: Colors.cinzaMecanico,
    marginBottom: 4,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "600",
    color: Colors.pretoPotencia,
  },
  statusText: {
    alignItems: "center",
  },
  statusBadge: {
    fontWeight: "600",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusConcluido: {
    color: "#22c55e",
    backgroundColor: "#dcfce7",
  },
  statusAndamento: {
    color: "#3b82f6",
    backgroundColor: "#dbeafe",
  },
  statusPendente: {
    color: "#f59e0b",
    backgroundColor: "#fef3c7",
  },
  statusAgendado: {
    color: "#8b5cf6",
    backgroundColor: "#f3e8ff",
  },
  descricaoResumo: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.pretoPotencia,
    marginBottom: 8,
  },
  expandedContent: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.cinzaMecanico + "30",
    marginVertical: 12,
  },
  valorText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.laranjaDiesel,
  },
  observacoesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.brancoFumaca + "80",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.laranjaDiesel + "50",
  },
  observacoesText: {
    fontSize: 15,
    color: Colors.cinzaMecanico,
    marginTop: 6,
    lineHeight: 22,
    fontStyle: "italic",
  },
  detailsButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.laranjaDiesel,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.cinzaMecanico,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.cinzaMecanico,
    opacity: 0.7,
    textAlign: "center",
  },
});