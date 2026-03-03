import { UserRole } from "@/contexts/AuthContext";

export interface PricingResult {
  basePrice: number;
  finalPrice: number;
  discount: number;
  discountPercent: number;
  marginPercent?: number;
  empresaPrice?: number;
}

const VOLUME_DISCOUNTS = [
  { min: 100, percent: 15 },
  { min: 30, percent: 10 },
  { min: 10, percent: 5 },
  { min: 1, percent: 0 },
];

export function getVolumeDiscount(quantity: number): number {
  const tier = VOLUME_DISCOUNTS.find((t) => quantity >= t.min);
  return tier ? tier.percent : 0;
}

export function calculatePrice(
  basePrice: number,
  quantity: number,
  role: UserRole | null
): PricingResult {
  if (role === "empresa") {
    const discountPercent = getVolumeDiscount(quantity);
    const discount = basePrice * (discountPercent / 100);
    const finalPrice = basePrice - discount;
    return { basePrice, finalPrice, discount, discountPercent };
  }

  if (role === "admin") {
    const empresaDiscount = getVolumeDiscount(quantity);
    const empresaPrice = basePrice * (1 - empresaDiscount / 100);
    return {
      basePrice,
      finalPrice: basePrice,
      discount: 0,
      discountPercent: 0,
      marginPercent: 35,
      empresaPrice,
    };
  }

  return { basePrice, finalPrice: basePrice, discount: 0, discountPercent: 0 };
}
