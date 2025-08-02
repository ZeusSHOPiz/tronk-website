// Types pour les données de prix
export interface PriceData {
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  timestamp: number;
}

// Types pour les statistiques de la communauté
export interface CommunityStats {
  holders: number;
  telegram: number;
  twitter: number;
  discord: number;
  growth: number;
}

// Types pour les fonctionnalités
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Types pour les réseaux sociaux
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// Types pour les boutons
export type ButtonVariant = 'primary' | 'secondary' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Types pour les cartes de prix
export interface PriceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  color: string;
  delay?: number;
}

// Types pour les cartes de fonctionnalités
export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

// Types pour les boutons animés
export interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} 