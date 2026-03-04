import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Product } from "@/data/products";
import { UserRole } from "@/contexts/AuthContext";

export interface ItemPedido {
  produto: Product;
  quantidade: number;
  precoUnitario: number;
  desconto: number;
}

export interface Pedido {
  id: string;
  idUsuario: string;
  nomeUsuario: string;
  tipoConta: UserRole;
  itens: ItemPedido[];
  valorTotal: number;
  descontoTotal: number;
  data: string;
  status: "Pago" | "Processando" | "Cancelado";
  metodoPagamento: string;
}

interface ContextoPedidosType {
  pedidos: Pedido[];
  criarPedido: (pedido: Omit<Pedido, "id" | "data" | "status">) => Pedido;
  pedidosDoUsuario: (idUsuario: string) => Pedido[];
  todosPedidos: () => Pedido[];
  totalVendido: () => number;
  totalPorTipo: () => { cliente: number; empresa: number };
  ticketMedio: () => number;
}

const ContextoPedidos = createContext<ContextoPedidosType | undefined>(undefined);

let contadorPedido = 1;

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const criarPedido = useCallback(
    (dados: Omit<Pedido, "id" | "data" | "status">): Pedido => {
      const novoPedido: Pedido = {
        ...dados,
        id: `PED-${String(contadorPedido++).padStart(4, "0")}`,
        data: new Date().toISOString(),
        status: "Pago",
      };
      setPedidos((prev) => [novoPedido, ...prev]);
      return novoPedido;
    },
    []
  );

  const pedidosDoUsuario = useCallback(
    (idUsuario: string) => pedidos.filter((p) => p.idUsuario === idUsuario),
    [pedidos]
  );

  const todosPedidos = useCallback(() => pedidos, [pedidos]);

  const totalVendido = useCallback(
    () => pedidos.reduce((sum, p) => sum + p.valorTotal, 0),
    [pedidos]
  );

  const totalPorTipo = useCallback(() => {
    const result = { cliente: 0, empresa: 0 };
    pedidos.forEach((p) => {
      if (p.tipoConta === "cliente") result.cliente++;
      else if (p.tipoConta === "empresa") result.empresa++;
    });
    return result;
  }, [pedidos]);

  const ticketMedio = useCallback(() => {
    if (pedidos.length === 0) return 0;
    return totalVendido() / pedidos.length;
  }, [pedidos, totalVendido]);

  return (
    <ContextoPedidos.Provider
      value={{ pedidos, criarPedido, pedidosDoUsuario, todosPedidos, totalVendido, totalPorTipo, ticketMedio }}
    >
      {children}
    </ContextoPedidos.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(ContextoPedidos);
  if (!context) throw new Error("usePedidos deve ser usado dentro de PedidosProvider");
  return context;
};
