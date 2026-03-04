export type TipoConta = "admin" | "empresa" | "cliente";

export type Permissao =
  | "VER_DASHBOARD"
  | "VER_TODOS_PEDIDOS"
  | "VER_TODOS_USUARIOS"
  | "EDITAR_WEBHOOK"
  | "SIMULAR_COMPRA"
  | "VER_PRECO_INTERNO"
  | "VER_ESTOQUE_COMPLETO"
  | "VER_PROPRIOS_PEDIDOS"
  | "VER_ESTOQUE"
  | "RECEBER_DESCONTO";

const PERMISSOES_POR_TIPO: Record<TipoConta, Permissao[]> = {
  admin: [
    "VER_DASHBOARD",
    "VER_TODOS_PEDIDOS",
    "VER_TODOS_USUARIOS",
    "EDITAR_WEBHOOK",
    "SIMULAR_COMPRA",
    "VER_PRECO_INTERNO",
    "VER_ESTOQUE_COMPLETO",
    "VER_PROPRIOS_PEDIDOS",
    "VER_ESTOQUE",
    "RECEBER_DESCONTO",
  ],
  empresa: [
    "VER_PROPRIOS_PEDIDOS",
    "VER_ESTOQUE",
    "RECEBER_DESCONTO",
  ],
  cliente: [
    "VER_PROPRIOS_PEDIDOS",
  ],
};

export function obterPermissoes(tipo: TipoConta): Permissao[] {
  return PERMISSOES_POR_TIPO[tipo] ?? [];
}

export function temPermissao(tipo: TipoConta | null, permissao: Permissao): boolean {
  if (!tipo) return false;
  return PERMISSOES_POR_TIPO[tipo]?.includes(permissao) ?? false;
}
