// Conversion rate: USD to COP (demo/static). Adjust as needed.
export const USD_TO_COP = 4000;

// Simple currency formatter for Colombian Pesos
export const formatCOP = (amount) => {
  try {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  } catch {
    // Fallback
    const rounded = Math.round(amount);
    return `COP ${rounded.toLocaleString('es-CO')}`;
  }
};

// Convenience: take an amount in USD, convert to COP, then format
export const formatCOPFromUSD = (amountUsd) => {
  const amountCop = amountUsd * USD_TO_COP;
  return formatCOP(amountCop);
};


