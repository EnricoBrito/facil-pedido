export interface SalesData {
  totalSales: number;
  averageTicket: number;
  salesByType: { cliente: number; empresa: number };
  recentOrders: {
    id: string;
    product: string;
    type: "cliente" | "empresa";
    total: number;
    date: string;
  }[];
}

export interface ConnectedAccount {
  type: "cliente" | "empresa" | "admin";
  username: string;
  email: string;
  lastLogin: string;
}

export function getMockSalesData(): SalesData {
  return {
    totalSales: 47890,
    averageTicket: 2394.5,
    salesByType: { cliente: 12, empresa: 8 },
    recentOrders: [
      { id: "ORD-001", product: "Poltrona Oslo Premium", type: "cliente", total: 2890, date: "2026-03-02" },
      { id: "ORD-002", product: "Mesa de Jantar Nórdica", type: "empresa", total: 38250, date: "2026-03-01" },
      { id: "ORD-003", product: "Rack TV Essencial", type: "cliente", total: 1890, date: "2026-02-28" },
      { id: "ORD-004", product: "Escrivaninha Studio", type: "empresa", total: 4380, date: "2026-02-27" },
    ],
  };
}

export function getConnectedAccounts(): ConnectedAccount[] {
  return [
    { type: "admin", username: "adm", email: "enricodealmeidabrito@gmail.com", lastLogin: "2026-03-03" },
    { type: "empresa", username: "empresa", email: "enricodealmeidabrito@gmail.com", lastLogin: "2026-03-02" },
    { type: "cliente", username: "cliente", email: "enricodealmeidabrito@gmail.com", lastLogin: "2026-03-01" },
  ];
}
