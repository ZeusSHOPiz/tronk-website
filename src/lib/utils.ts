import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Fonction utilitaire pour combiner les classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonction pour formater les nombres avec des séparateurs
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

// Fonction pour formater les prix crypto
export function formatPrice(price: number, decimals: number = 8): string {
  return `$${price.toFixed(decimals)}`;
}

// Fonction pour formater les pourcentages
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// Fonction pour générer des couleurs aléatoires
export function getRandomColor(): string {
  const colors = [
    'text-yellow-400',
    'text-green-400',
    'text-blue-400',
    'text-purple-400',
    'text-pink-400',
    'text-red-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Fonction pour simuler des données de prix
export function generateMockPriceData(basePrice: number = 0.00012345): number[] {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 0.00001;
    data.push(Math.max(0.0001, price));
  }
  
  return data;
}

// Fonction pour calculer le changement de prix
export function calculatePriceChange(currentPrice: number, previousPrice: number): number {
  return ((currentPrice - previousPrice) / previousPrice) * 100;
}

// Fonction pour valider une adresse Ethereum (basique)
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Fonction pour tronquer une adresse Ethereum
export function truncateAddress(address: string, chars: number = 6): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Fonction pour formater les dates
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Fonction pour créer un délai
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 