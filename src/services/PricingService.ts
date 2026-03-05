import { UserRole } from "@/contexts/AuthContext";

export interface PricingResult {
  basePrice: number;
  finalPrice: number;
  discount: number;
  discountPercent: number;
  marginPercent?: number;
  empresaPrice?: number;
}

const DESCONTO_BASE_EMPRESA = 3;

const VOLUME_DISCOUNTS = [
  { min: 100, percent: 18 },
  { min: 50, percent: 12 },
  { min: 20, percent: 8 },
  { min: 10, percent: 5 },
  { min: 5, percent: 3 },
  { min: 1, percent: DESCONTO_BASE_EMPRESA },
];

export function getVolumeDiscount(quantity: number): number {
  const tier = VOLUME_DISCOUNTS.find((t) => quantity >= t.min);
  return tier ? tier.percent : DESCONTO_BASE_EMPRESA;
}

export function calculatePrice(
  basePrice: number,
  quantity: number,
  role: UserRole | null
): PricingResult {
  if (role === "empresa") {
    const discountPercent = getVolumeDiscount(quantity);
    const discount = basePrice * (discountPercent / 100);
    let finalPrice = basePrice - discount;

    // Proteção: empresa NUNCA pode pagar mais que cliente
    if (finalPrice >= basePrice) {
      finalPrice = basePrice * (1 - DESCONTO_BASE_EMPRESA / 100);
    }

    return { basePrice, finalPrice, discount: basePrice - finalPrice, discountPercent };
  }

  if (role === "admin") {
    const empresaDiscount = getVolumeDiscount(quantity);
    const empresaPrice = basePrice * (1 - empresaDiscount / 100);

    // Proteção admin
    const safeEmpresaPrice = empresaPrice >= basePrice ? basePrice * 0.97 : empresaPrice;

    return {
      basePrice,
      finalPrice: basePrice,
      discount: 0,
      discountPercent: 0,
      marginPercent: 35,
      empresaPrice: safeEmpresaPrice,
    };
  }

  // Cliente e visitante: preço base
  return { basePrice, finalPrice: basePrice, discount: 0, discountPercent: 0 };
}
