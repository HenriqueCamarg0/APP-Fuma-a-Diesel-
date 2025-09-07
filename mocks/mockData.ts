import { Veiculo } from '../types/veiculo';
import { Servico } from '../types/servico';

const mockData: Record<string, Veiculo> = {
  // Iveco Tector 240E30 - Caminhão Rígido para Bebidas
  IVE2403: {
    placa: 'IVE2403',
    marca: 'Iveco',
    modelo: 'Tector 240E30',
    proprietario: 'Distribuidora Alpha Bebidas',
    motorista: 'Carlos Eduardo',
    categoria: 'Caminhão de Carga',
    ano: 2020,
    motor: 'Cursor 9',
    potencia: '300 cv',
    combustivel: 'Diesel S10',
    kilometragem: 156890,
    servicos: [
      { 
        id: 11, 
        data: '2024-01-22', 
        descricao: 'Reparo no sistema hidráulico da carroceria', 
        status: 'Concluído', 
        valor: 1100,
        mecanico: 'João Pereira',
        observacoes: 'Substituição de vedações e cilindros hidráulicos'
      },
      { 
        id: 12, 
        data: '2024-02-10', 
        descricao: 'Troca das lonas de freio', 
        status: 'Concluído', 
        valor: 890,
        mecanico: 'Roberto Santos',
        observacoes: 'Lonas Fras-le para eixo dianteiro e traseiro'
      },
      { 
        id: 13, 
        data: '2024-03-18', 
        descricao: 'Revisão do ar-condicionado', 
        status: 'Pendente', 
        valor: 420,
        mecanico: 'Carlos Silva',
        observacoes: 'Limpeza do sistema e recarga de gás R134a'
      },
      { 
        id: 14, 
        data: '2024-04-08', 
        descricao: 'Alinhamento da direção', 
        status: 'Agendado', 
        valor: 280,
        mecanico: 'Roberto Santos',
        observacoes: 'Verificação do desgaste irregular dos pneus'
      }
    ],
  },

  // Ford Cargo 2429 - Caminhão Rígido para Construção
  FOR2429: {
    placa: 'FOR2429',
    marca: 'Ford',
    modelo: 'Cargo 2429 E',
    proprietario: 'Construtora Pedra Angular Ltda',
    motorista: 'Marcos Vinícius',
    categoria: 'Caminhão de Carga',
    ano: 2019,
    motor: 'Cummins ISL',
    potencia: '290 cv',
    combustivel: 'Diesel S10',
    kilometragem: 278450,
    servicos: [
      { 
        id: 15, 
        data: '2024-01-05', 
        descricao: 'Overhaul do motor', 
        status: 'Concluído', 
        valor: 15500,
        mecanico: 'João Pereira',
        observacoes: 'Revisão geral com 270.000 km - motor Cummins ISL'
      },
      { 
        id: 16, 
        data: '2024-02-25', 
        descricao: 'Instalação de pneus novos', 
        status: 'Concluído', 
        valor: 3200,
        mecanico: 'Carlos Silva',
        observacoes: '6 pneus Pirelli FR85 295/80 R22.5'
      },
      { 
        id: 17, 
        data: '2024-03-12', 
        descricao: 'Reparo na bomba hidráulica da caçamba', 
        status: 'Em andamento', 
        valor: 1850,
        mecanico: 'Roberto Santos',
        observacoes: 'Bomba Bosch - problema no sistema de elevação'
      },
      { 
        id: 18, 
        data: '2024-04-01', 
        descricao: 'Revisão da suspensão traseira', 
        status: 'Agendado', 
        valor: 950,
        mecanico: 'João Pereira',
        observacoes: 'Verificação de molas parabólicas e amortecedores'
      }
    ],
  },

  // Mercedes-Benz Atego 2426 - Caminhão de Carga Geral
  MER2426: {
    placa: 'MER2426',
    marca: 'Mercedes-Benz',
    modelo: 'Atego 2426',
    proprietario: 'Transportes Mercúrio Ltda',
    motorista: 'Henrique Camargo',
    categoria: 'Caminhão de Carga',
    ano: 2021,
    motor: 'OM 926 LA',
    potencia: '260 cv',
    combustivel: 'Diesel S10',
    kilometragem: 134520,
    servicos: [
      { 
        id: 19, 
        data: '2024-01-18', 
        descricao: 'Troca de óleo do motor e filtros', 
        status: 'Concluído', 
        valor: 650,
        mecanico: 'Carlos Silva',
        observacoes: 'Óleo Shell Rimula R4 X 15W-40 - 18 litros'
      },
      { 
        id: 20, 
        data: '2024-02-22', 
        descricao: 'Reparo no sistema elétrico', 
        status: 'Concluído', 
        valor: 480,
        mecanico: 'Roberto Santos',
        observacoes: 'Substituição do alternador e regulador de voltagem'
      },
      { 
        id: 21, 
        data: '2024-03-08', 
        descricao: 'Manutenção da caixa de mudanças', 
        status: 'Pendente', 
        valor: 1200,
        mecanico: 'João Pereira',
        observacoes: 'Troca do óleo e sincronizadores da caixa G85-6'
      },
      { 
        id: 22, 
        data: '2024-04-05', 
        descricao: 'Revisão do sistema de freios', 
        status: 'Agendado', 
        valor: 850,
        mecanico: 'Carlos Silva',
        observacoes: 'Troca de pastilhas e verificação do ABS'
      }
    ],
  },

  // Volkswagen Delivery 11.180 - Caminhão Urbano de Carga
  VWG1118: {
    placa: 'VWG1118',
    marca: 'Volkswagen',
    modelo: 'Delivery 11.180',
    proprietario: 'Distribuidora Alimentos Frescos',
    motorista: 'Victoria Camargo',
    categoria: 'Caminhão de Carga',
    ano: 2022,
    motor: 'Cummins ISF 2.8',
    potencia: '180 cv',
    combustivel: 'Diesel S10',
    kilometragem: 89340,
    servicos: [
      { 
        id: 23, 
        data: '2024-02-05', 
        descricao: 'Revisão do sistema de refrigeração', 
        status: 'Concluído', 
        valor: 750,
        mecanico: 'Roberto Santos',
        observacoes: 'Manutenção do equipamento de frio para alimentos'
      },
      { 
        id: 24, 
        data: '2024-02-18', 
        descricao: 'Troca de pneus dianteiros', 
        status: 'Concluído', 
        valor: 980,
        mecanico: 'Carlos Silva',
        observacoes: '2 pneus Bridgestone R268 225/75 R16'
      },
      { 
        id: 25, 
        data: '2024-03-20', 
        descricao: 'Calibração da balança integrada', 
        status: 'Em andamento', 
        valor: 320,
        mecanico: 'João Pereira',
        observacoes: 'Ajuste da balança para controle de peso de carga'
      }
    ],
  },

  // Scania P 280 - Caminhão de Carga Pesada
  SCA2801: {
    placa: 'SCA2801',
    marca: 'Scania',
    modelo: 'P 280 DB4x2',
    proprietario: 'Transportadora Carga Pesada S.A.',
    motorista: 'Felipe Souza',
    categoria: 'Caminhão de Carga',
    ano: 2020,
    motor: 'DC09 143',
    potencia: '280 cv',
    combustivel: 'Diesel S10',
    kilometragem: 205670,
    servicos: [
      { 
        id: 26, 
        data: '2024-01-12', 
        descricao: 'Reparo na suspensão dianteira', 
        status: 'Concluído', 
        valor: 1350,
        mecanico: 'João Pereira',
        observacoes: 'Substituição de amortecedores e buchas da suspensão'
      },
      { 
        id: 27, 
        data: '2024-02-08', 
        descricao: 'Troca do filtro DPF', 
        status: 'Concluído', 
        valor: 2800,
        mecanico: 'Roberto Santos',
        observacoes: 'Filtro de partículas Scania original'
      },
      { 
        id: 28, 
        data: '2024-03-14', 
        descricao: 'Manutenção da carroceria basculante', 
        status: 'Pendente', 
        valor: 650,
        mecanico: 'Carlos Silva',
        observacoes: 'Lubrificação e ajuste do sistema de basculamento'
      },
      { 
        id: 29, 
        data: '2024-04-10', 
        descricao: 'Revisão geral dos 200.000 km', 
        status: 'Agendado', 
        valor: 2200,
        mecanico: 'João Pereira',
        observacoes: 'Revisão completa conforme cronograma Scania'
      }
    ],
  },

  // Volvo VM 270 - Caminhão de Distribuição
  VOL2701: {
    placa: 'VOL2701',
    marca: 'Volvo',
    modelo: 'VM 270 4x2R',
    proprietario: 'Logística Urbana Express',
    motorista: 'Ana Beatriz',
    categoria: 'Caminhão de Carga',
    ano: 2021,
    motor: 'D8K270',
    potencia: '270 cv',
    combustivel: 'Diesel S10',
    kilometragem: 167890,
    servicos: [
      { 
        id: 30, 
        data: '2024-01-25', 
        descricao: 'Troca do óleo da direção hidráulica', 
        status: 'Concluído', 
        valor: 180,
        mecanico: 'Carlos Silva',
        observacoes: 'Óleo ATF Volvo para sistema de direção'
      },
      { 
        id: 31, 
        data: '2024-02-15', 
        descricao: 'Reparo no sistema pneumático', 
        status: 'Concluído', 
        valor: 920,
        mecanico: 'Roberto Santos',
        observacoes: 'Substituição de válvulas e mangueiras do ar comprimido'
      },
      { 
        id: 32, 
        data: '2024-03-22', 
        descricao: 'Instalação de plataforma elevatória', 
        status: 'Em andamento', 
        valor: 3500,
        mecanico: 'João Pereira',
        observacoes: 'Plataforma Anteo para facilitar carga/descarga'
      }
    ],
  },
};

export default mockData;