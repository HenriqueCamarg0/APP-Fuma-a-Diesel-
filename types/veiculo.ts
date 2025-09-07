import { Servico } from './servico';

export type Veiculo = {
  placa: string;
  marca: string;
  modelo: string;
  categoria: string;
  ano: number;
  motor: string;
  potencia: string;
  combustivel: string;
  kilometragem: number;
  proprietario: string;
  motorista: string;
  servicos: Servico[];
};
