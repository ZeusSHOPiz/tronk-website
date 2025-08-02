// Configuration du projet TRONK
export const SITE_CONFIG = {
  name: 'TRONK',
  description: 'Le meme coin qui va révolutionner l&apos;univers crypto !',
  url: 'https://tronk.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/TRONKcoin',
    telegram: 'https://t.me/TRONKcommunity',
    discord: 'https://discord.gg/tronk',
    github: 'https://github.com/tronk-community'
  }
};

// Configuration des couleurs TRONK
export const TRONK_COLORS = {
  primary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  accent: {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f59e0b',
    red: '#ef4444',
  }
};

// Configuration des animations
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

// Configuration des données simulées
export const MOCK_DATA = {
  initialPrice: 0.00012345,
  initialMarketCap: 1234567,
  initialVolume: 987654,
  updateInterval: 3000, // 3 secondes
  priceVariation: 0.00001,
  marketCapVariation: 1000,
  volumeVariation: 100
};

// Configuration des réseaux sociaux
export const SOCIAL_LINKS = [
  {
    name: 'Telegram',
    url: 'https://t.me/TRONKcommunity',
    icon: '📱',
    color: 'bg-blue-500'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/TRONKcoin',
    icon: '🐦',
    color: 'bg-purple-500'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/tronk',
    icon: '📺',
    color: 'bg-red-500'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/tronk-community',
    icon: '💻',
    color: 'bg-gray-500'
  }
];

// Configuration des fonctionnalités
export const FEATURES = [
  {
    icon: '⚡',
    title: 'Ultra Rapide',
    description: 'Transactions en quelques secondes grâce à la blockchain de nouvelle génération'
  },
  {
    icon: '⭐',
    title: 'Communauté Fun',
    description: 'Une communauté passionnée et engagée qui croit en TRONK'
  },
  {
    icon: '🚀',
    title: 'Potentiel Infini',
    description: 'Un projet avec une vision claire et un potentiel de croissance énorme'
  }
];

// Messages et textes
export const MESSAGES = {
  hero: {
    title: '🚀 TRONK 🚀',
    subtitle: 'Le meme coin qui va révolutionner l&apos;univers crypto !',
    cta: 'TO THE MOON! 🌙'
  },
  buttons: {
    connectWallet: 'Connect Wallet',
    buyTronk: '🚀 Acheter TRONK',
    viewChart: '📊 Voir le Chart'
  },
  sections: {
    priceChart: '📈 Graphique en Temps Réel',
    features: 'Pourquoi TRONK ? 🤔',
    community: '🚀 Communauté TRONK'
  }
}; 