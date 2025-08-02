'use client';

import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';


export default function Home() {
  // Textes pour les interactions - déclarés en premier !
  const trollTexts = [
    "WE PROMISED NOTHING. AND DELIVERED EVEN LESS.",
    "404 BRAIN NOT FOUND",
    "WTF?",
    "NOPE",
    "ERROR: SANITY NOT FOUND",
    "THIS IS FINE",
    "WHY ARE YOU HERE?",
    "GO AWAY",
    "STOP CLICKING",
    "I SAID STOP!"
  ];

  const interactiveTexts = [
    "404 BRAIN NOT FOUND",
    "WTF?",
    "NOPE",
    "ERROR: SANITY NOT FOUND",
    "THIS IS FINE",
    "WHY ARE YOU HERE?",
    "GO AWAY",
    "STOP CLICKING",
    "I SAID STOP!"
  ];

  const clickTexts = [
    "OUCH!",
    "STOP IT!",
    "WHY?",
    "NO MORE!",
    "ENOUGH!",
    "I'M ANGRY!",
    "GRRR!",
    "STOP TOUCHING ME!"
  ];

  const dragTexts = [
    "LET GO!",
    "STOP DRAGGING!",
    "I'M NOT A TOY!",
    "PUT ME DOWN!",
    "ENOUGH!",
    "STOP IT!",
    "I SAID STOP!"
  ];

  const throwTexts = [
    "WHEEE!",
    "FLYING!",
    "AGAIN!",
    "MORE!",
    "HIGHER!",
    "FASTER!",
    "WOOO!"
  ];

  // States
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [randomTexts, setRandomTexts] = useState<Array<{id: number, text: string, x: number, y: number, isHovered: boolean}>>([]);
  const [showError, setShowError] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 200, y: 150 });
  const [logoReaction, setLogoReaction] = useState('normal');
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [logoVisible, setLogoVisible] = useState(true);
  const [logoMode, setLogoMode] = useState('normal');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [logoVelocity, setLogoVelocity] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [throwMode, setThrowMode] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.1); // Volume de base à 10%
  const [audioMuted, setAudioMuted] = useState(false);
  const [throwCount, setThrowCount] = useState(0); // Compteur de lancers
  const [nukeMode, setNukeMode] = useState(false); // Mode bombardement nucléaire
  const [nukeAudioRef] = useState(() => {
    if (typeof window !== 'undefined') {
      return new Audio('/sounds/Nuke.mp3');
    }
    return null;
  }); // Audio nucléaire

  // Refs pour le drag
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastMouseTime = useRef(Date.now());
  const gunshotAudioRef = useRef<HTMLAudioElement | null>(null);

  // Motion values pour le drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Centrer l'image au montage
  useEffect(() => {
    const centerImage = () => {
      if (logoRef.current) {
        const centerX = window.innerWidth / 2 - logoRef.current.offsetWidth / 2;
        const centerY = window.innerHeight / 2 - logoRef.current.offsetHeight / 2;
        setLogoPosition({ x: centerX, y: centerY });
        x.set(centerX);
        y.set(centerY);
      }
    };

    // Centrer immédiatement
    centerImage();

    // Centrer aussi au redimensionnement
    const handleResize = () => {
      if (!isDraggingRef.current) {
        centerImage();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialiser l'audio dans un useEffect séparé
  useEffect(() => {
    try {
              gunshotAudioRef.current = new Audio('/sounds/gunshot.mp3');
        gunshotAudioRef.current.volume = audioMuted ? 0 : audioVolume; // Volume dynamique
        gunshotAudioRef.current.preload = 'auto'; // Précharger l'audio
      
      // Ajouter des event listeners pour debug
      gunshotAudioRef.current.addEventListener('loadstart', () => console.log('Audio: loadstart'));
      gunshotAudioRef.current.addEventListener('canplay', () => console.log('Audio: canplay'));
      gunshotAudioRef.current.addEventListener('error', (e) => console.log('Audio error:', e));
      
      console.log('Audio initialisé avec succès');
    } catch (error) {
      console.log('Erreur initialisation audio:', error);
    }
  }, []);

  // Fonction pour débloquer l'audio au premier clic
  const unlockAudio = useCallback(async () => {
    if (gunshotAudioRef.current && !audioUnlocked) {
      try {
        // Essayer de jouer un son très court pour débloquer l'audio
        gunshotAudioRef.current.volume = 0.01; // Volume très bas
        await gunshotAudioRef.current.play();
        gunshotAudioRef.current.pause();
        gunshotAudioRef.current.currentTime = 0;
        gunshotAudioRef.current.volume = audioMuted ? 0 : audioVolume; // Remettre le volume normal
        setAudioUnlocked(true);
        console.log('Audio débloqué !');
      } catch (error) {
        console.log('Erreur déblocage audio:', error);
      }
    }
  }, [audioUnlocked]);

  // Fonction pour mettre à jour le volume
  const updateAudioVolume = useCallback((newVolume: number) => {
    setAudioVolume(newVolume);
    if (gunshotAudioRef.current) {
      gunshotAudioRef.current.volume = audioMuted ? 0 : newVolume;
    }
  }, [audioMuted]);

  // Fonction pour basculer le mute
  const toggleAudioMute = useCallback(() => {
    const newMuted = !audioMuted;
    setAudioMuted(newMuted);
    if (gunshotAudioRef.current) {
      gunshotAudioRef.current.volume = newMuted ? 0 : audioVolume;
    }
  }, [audioMuted, audioVolume]);

  // Fonction pour déclencher le bombardement nucléaire
  const triggerNukeMode = useCallback(async () => {
    if (nukeMode) return; // Éviter les déclenchements multiples
    
    setNukeMode(true);
    console.log('🚀 BOMBARDEMENT NUCLÉAIRE ACTIVÉ ! 🚀');
    
    // Jouer le son nucléaire
    if (!audioMuted && nukeAudioRef) {
      try {
        nukeAudioRef.volume = audioVolume;
        await nukeAudioRef.play();
      } catch (error) {
        console.log('Erreur audio nucléaire:', error);
      }
    }
    
    // Arrêter le mode après 10 secondes
    setTimeout(() => {
      setNukeMode(false);
      console.log('💥 BOMBARDEMENT TERMINÉ ! 💥');
    }, 10000);
  }, [nukeMode, audioMuted, audioVolume, nukeAudioRef]);

  // Fonction pour obtenir les effets visuels selon le nombre de lancers
  const getThrowCountEffects = useCallback(() => {
    if (throwCount >= 1000) {
      return {
        text: `${throwCount}`,
        color: 'text-red-600',
        animation: {
          scale: [1, 2, 0.1, 3, 0.5, 2.5, 1],
          rotate: [0, 720, -720, 1440, -1440, 0],
          filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)', 'hue-rotate(720deg)'],
          x: [0, 50, -50, 100, -100, 0],
          y: [0, -30, 30, -60, 60, 0],
        },
        duration: 0.2,
        repeat: Infinity
      };
    } else if (throwCount >= 100) {
      return {
        text: `${throwCount}`,
        color: 'text-purple-600',
        animation: {
          scale: [1, 1.8, 0.2, 2.2, 0.5, 1.5, 0.8, 2, 1],
          rotate: [0, 180, -180, 360, -360, 720, -720, 0],
          filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', 'hue-rotate(360deg)'],
          x: [0, 80, -80, 150, -150, 200, -200, 100, -100, 0],
          y: [0, -50, 50, -100, 100, -150, 150, -80, 80, 0],
        },
        duration: 0.1,
        repeat: Infinity
      };
    } else if (throwCount >= 10) {
      return {
        text: `${throwCount}`,
        color: 'text-orange-600',
        animation: {
          scale: [1, 1.05, 0.98, 1.03, 0.99, 1.02, 1],
          rotate: [0, 1, -1, 2, -2, 1, -1, 0],
          x: [0, 2, -2, 1, -1, 3, -3, 0],
          y: [0, -1, 1, -2, 2, -1, 1, 0],
        },
        duration: 0.1,
        repeat: Infinity
      };
    } else {
      return {
        text: `${throwCount}`,
        color: 'text-blue-600',
        animation: {
          scale: [1, 1.1, 0.95, 1.05, 1],
          rotate: [0, 2, -2, 0],
        },
        duration: 0.8,
        repeat: Infinity
      };
    }
  }, [throwCount]);

  // Fonction pour jouer le son de fusil
  const playGunshotSound = useCallback(async () => {
    if (gunshotAudioRef.current && audioUnlocked) {
      try {
        gunshotAudioRef.current.currentTime = 0; // Remettre au début
        await gunshotAudioRef.current.play();
        console.log('Son de fusil joué ! 🔫');
      } catch (error) {
        console.log('Erreur lecture audio:', error);
        // Essayer de recharger l'audio
        try {
          gunshotAudioRef.current.load();
          await gunshotAudioRef.current.play();
        } catch (retryError) {
          console.log('Échec de la relecture:', retryError);
        }
      }
    } else {
      console.log('Audio non initialisé ou non débloqué');
    }
  }, [audioUnlocked]);

  // Gestionnaires d'événements pour le drag avec Framer Motion
  const handleDragStart = useCallback((event: any, info: PanInfo) => {
    setIsDragging(true);
    setLogoReaction('angry');
    
    // Calculer l'offset correct avec getBoundingClientRect
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      dragOffsetRef.current = { x: offsetX, y: offsetY };
    }
    
    // Ajouter un texte de drag dans l'écran
    const newText = {
      id: Date.now(),
      text: dragTexts[Math.floor(Math.random() * dragTexts.length)],
      x: Math.max(50, Math.min(windowSize.width - 200, logoPosition.x + Math.random() * 100 - 50)),
      y: Math.max(50, Math.min(windowSize.height - 100, logoPosition.y - 50)),
      isHovered: false
    };
    setRandomTexts(prev => [...prev.slice(-5), newText]);
  }, [dragTexts, logoPosition.x, logoPosition.y, windowSize.width, windowSize.height]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    
    // Calculer la vélocité du lancer
    const velocity = Math.sqrt(info.velocity.x * info.velocity.x + info.velocity.y * info.velocity.y);
    
    // Mettre à jour la position finale
    const finalX = x.get();
    const finalY = y.get();
    setLogoPosition({ x: finalX, y: finalY });
    
    // Seulement lancer si la vélocité est suffisante
    if (velocity > 500) {
      setThrowMode(true);
      setLogoReaction('scared');
      
      // Incrémenter le compteur de lancers
      setThrowCount(prev => {
        const newCount = prev + 1;
        
        // Déclencher le bombardement nucléaire à 25 lancers
        if (newCount === 25) {
          triggerNukeMode();
        }
        
        return newCount;
      });
      
      // Jouer le son de fusil ! 🔫
      playGunshotSound();
      
      const throwVelocity = {
        x: info.velocity.x * 0.1,
        y: info.velocity.y * 0.1
      };
      
      setLogoVelocity(throwVelocity);
      
      // Ajouter un texte de lancer dans l'écran
      const newText = {
        id: Date.now(),
        text: throwTexts[Math.floor(Math.random() * throwTexts.length)],
        x: Math.max(50, Math.min(windowSize.width - 200, finalX + Math.random() * 100 - 50)),
        y: Math.max(50, Math.min(windowSize.height - 100, finalY - 50)),
        isHovered: false
      };
      setRandomTexts(prev => [...prev.slice(-5), newText]);
      
      // Arrêter le mode lancer après un délai
      setTimeout(() => {
        setThrowMode(false);
        setLogoReaction('normal');
      }, 2000);
    } else {
      setLogoReaction('normal');
    }
  }, [throwTexts, windowSize.width, windowSize.height]);

  // Fonction de drag personnalisée pour un meilleur contrôle
  const handleDrag = useCallback((event: any, info: PanInfo) => {
    if (isDragging) {
      // Utiliser l'offset pour maintenir la position relative
      const newX = event.clientX - dragOffsetRef.current.x;
      const newY = event.clientY - dragOffsetRef.current.y;
      
      // Mettre à jour les motion values directement
      x.set(newX);
      y.set(newY);
    }
  }, [isDragging]);

  // Stabiliser les fonctions avec useCallback
  const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
    if (isDragging) return; // Ne pas bouger si on drag
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastMouseTime.current;
    
    // Calculer la vitesse de la souris
    const distance = Math.sqrt(
      Math.pow(e.clientX - lastMousePosition.current.x, 2) + 
      Math.pow(e.clientY - lastMousePosition.current.y, 2)
    );
    const speed = distance / timeDiff;
    setMouseSpeed(speed);

    setMousePosition({ x: e.clientX, y: e.clientY });

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    lastMouseTime.current = currentTime;
  }, [isDragging]);

  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleScroll = useCallback(() => {
    const newScrollY = window.scrollY;
    setScrollY(newScrollY);
  }, []);

  useEffect(() => {
    // Set window size on mount
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    // Initialiser le logo au centre de l'écran
    const centerX = window.innerWidth / 2 - 128;
    const centerY = window.innerHeight / 2 - 128;
    setLogoPosition({ x: centerX, y: centerY });
    x.set(centerX);
    y.set(centerY);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleMouseMoveGlobal, handleScroll]);

  // Effet séparé pour centrer le logo quand la fenêtre change de taille
  useEffect(() => {
    const handleWindowResize = () => {
      const centerX = window.innerWidth / 2 - 128;
      const centerY = window.innerHeight / 2 - 128;
      
      // Seulement centrer si le logo n'est pas en train d'être manipulé
      if (!isDragging && !throwMode) {
        setLogoPosition({ x: centerX, y: centerY });
        x.set(centerX);
        y.set(centerY);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [isDragging, throwMode]);

  // Animation du logo séparée - seulement si pas en train de drag
  useEffect(() => {
    if (isDragging || throwMode) return;
    
    const logoAnimation = setInterval(() => {
      setLogoPosition(prev => {
        // Calculer la distance entre la souris et le logo
        const distanceX = mousePosition.x - prev.x;
        const distanceY = mousePosition.y - prev.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Si la souris est trop proche, faire fuir le logo
        if (distance < 200) {
          const escapeSpeed = 3;
          const escapeX = distanceX > 0 ? -escapeSpeed : escapeSpeed;
          const escapeY = distanceY > 0 ? -escapeSpeed : escapeSpeed;
          
          // Ajouter un peu d'aléatoire pour que ce soit plus naturel
          const randomX = (Math.random() - 0.5) * 2;
          const randomY = (Math.random() - 0.5) * 2;
          
          const newX = prev.x + escapeX + randomX;
          const newY = prev.y + escapeY + randomY;
          
          // Garder le logo dans les limites de l'écran
          const finalX = Math.max(-100, Math.min(windowSize.width - 100, newX));
          const finalY = Math.max(-100, Math.min(windowSize.height - 100, newY));
          
          // Mettre à jour les motion values aussi
          x.set(finalX);
          y.set(finalY);
          
          return { x: finalX, y: finalY };
        } else {
          // Si la souris est loin, le logo peut se rapprocher légèrement
          const approachSpeed = 1;
          const approachX = distanceX > 0 ? approachSpeed : -approachSpeed;
          const approachY = distanceY > 0 ? approachSpeed : -approachSpeed;
          
          const newX = prev.x + approachX * 0.1;
          const newY = prev.y + approachY * 0.1;
          
          const finalX = Math.max(-100, Math.min(windowSize.width - 100, newX));
          const finalY = Math.max(-100, Math.min(windowSize.height - 100, newY));
          
          // Mettre à jour les motion values aussi
          x.set(finalX);
          y.set(finalY);
          
          return { x: finalX, y: finalY };
        }
      });
    }, 50);

    return () => clearInterval(logoAnimation);
  }, [mousePosition.x, mousePosition.y, windowSize.width, windowSize.height, isDragging, throwMode]);

  // Animation du lancer
  useEffect(() => {
    if (!throwMode) return;

    const throwAnimation = setInterval(() => {
      setLogoPosition(prev => {
        const newX = prev.x + logoVelocity.x;
        const newY = prev.y + logoVelocity.y;

        // Rebondir sur les bords pendant le lancer
        let newVelX = logoVelocity.x;
        let newVelY = logoVelocity.y;

        if (newX <= -100 || newX >= windowSize.width - 100) {
          newVelX = -newVelX * 0.8; // Perdre de l'énergie
        }
        if (newY <= -100 || newY >= windowSize.height - 100) {
          newVelY = -newVelY * 0.8; // Perdre de l'énergie
        }

        // Ralentir progressivement
        newVelX *= 0.98;
        newVelY *= 0.98;

        setLogoVelocity({ x: newVelX, y: newVelY });

        const finalX = Math.max(-100, Math.min(windowSize.width - 100, newX));
        const finalY = Math.max(-100, Math.min(windowSize.height - 100, newY));

        // Mettre à jour les motion values aussi
        x.set(finalX);
        y.set(finalY);

        return { x: finalX, y: finalY };
      });
    }, 16); // 60 FPS pour un lancer fluide

    return () => clearInterval(throwAnimation);
  }, [logoVelocity.x, logoVelocity.y, windowSize.width, windowSize.height, throwMode]);

  // Jeu de cache-cache avec le logo
  useEffect(() => {
    if (isDragging || throwMode) return;
    
    const logoGameInterval = setInterval(() => {
      const modes = ['bounce', 'hide', 'chase', 'run'];
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      setLogoMode(randomMode);
      
      if (randomMode === 'hide') {
        setLogoVisible(false);
        setTimeout(() => setLogoVisible(true), Math.random() * 3000 + 1000);
      }
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(logoGameInterval);
  }, [isDragging, throwMode]);

  // Generate random floating text
  useEffect(() => {
    const interval = setInterval(() => {
      const newText = {
        id: Date.now(),
        text: trollTexts[Math.floor(Math.random() * trollTexts.length)],
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        isHovered: false
      };
      setRandomTexts(prev => [...prev.slice(-5), newText]);
    }, 3000);

    return () => clearInterval(interval);
  }, [trollTexts, windowSize.width, windowSize.height]);

  // Show random error messages
  useEffect(() => {
    const errorInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    }, 5000);

    return () => clearInterval(errorInterval);
  }, []);

  const handleButtonHover = useCallback((e: React.MouseEvent) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculer les nouvelles positions en gardant le bouton dans l'écran avec une marge
    const margin = 20;
    const maxX = windowSize.width - rect.width - margin;
    const maxY = windowSize.height - rect.height - margin;
    
    const newX = Math.max(margin, Math.min(maxX, Math.random() * maxX));
    const newY = Math.max(margin, Math.min(maxY, Math.random() * maxY));
    
    setButtonPosition({ x: newX, y: newY });
  }, [windowSize.width, windowSize.height]);

  const handleTextHover = useCallback((textId: number) => {
    setRandomTexts(prev => 
      prev.map(text => 
        text.id === textId 
          ? { ...text, isHovered: true, text: interactiveTexts[Math.floor(Math.random() * interactiveTexts.length)] }
          : text
      )
    );
  }, [interactiveTexts]);

  const handleTextLeave = useCallback((textId: number) => {
    setRandomTexts(prev => 
      prev.map(text => 
        text.id === textId 
          ? { ...text, isHovered: false, text: trollTexts[Math.floor(Math.random() * trollTexts.length)] }
          : text
      )
    );
  }, [trollTexts]);

  const handleLogoClick = useCallback(() => {
    if (isDragging) return; // Ne pas réagir au clic si on drag
    
    setLogoReaction('angry');
    setTimeout(() => setLogoReaction('normal'), 1000);
    
    // Ajouter des textes de clic TRÈS près du logo et dans l'écran
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const newText = {
          id: Date.now() + i,
          text: clickTexts[Math.floor(Math.random() * clickTexts.length)],
          x: Math.max(50, Math.min(windowSize.width - 200, logoPosition.x + Math.random() * 60 - 30)), // Très près du logo et dans l'écran
          y: Math.max(50, Math.min(windowSize.height - 100, logoPosition.y - 50 - (i * 20))), // Juste au-dessus, plus proche et dans l'écran
          isHovered: false
        };
        setRandomTexts(prev => [...prev.slice(-5), newText]);
      }, i * 200);
    }
  }, [clickTexts, logoPosition.x, logoPosition.y, isDragging, windowSize.width, windowSize.height]);

  const handleLogoHover = useCallback(() => {
    if (isDragging) return;
    setLogoReaction('excited');
  }, [isDragging]);

  const handleLogoLeave = useCallback(() => {
    setLogoReaction('normal');
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 overflow-hidden relative">
      {/* Random floating texts */}
      {randomTexts.map((textObj) => (
        <motion.div
          key={textObj.id}
          className="troll-random-text cursor-pointer z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: textObj.isHovered ? 1.5 : 1,
            x: textObj.x,
            y: textObj.y,
            color: textObj.isHovered ? '#ff0000' : '#000',
            filter: textObj.isHovered ? 'hue-rotate(180deg)' : 'none'
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            left: textObj.x,
            top: textObj.y,
          }}
          onMouseEnter={() => handleTextHover(textObj.id)}
          onMouseLeave={() => handleTextLeave(textObj.id)}
          whileHover={{ 
            scale: 1.2,
            rotate: [0, -10, 10, 0],
            filter: 'brightness(1.5)'
          }}
        >
          {textObj.text}
        </motion.div>
      ))}

      {/* Random error messages */}
      {showError && (
        <motion.div
          className="troll-error"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
        >
          ERROR 404: SANITY NOT FOUND
        </motion.div>
      )}

      {/* Main TRONK Logo - avec Framer Motion drag ! */}
      <motion.div
        ref={logoRef}
        className="absolute cursor-grab active:cursor-grabbing z-40"
        style={{
          x,
          y,
          opacity: logoVisible ? 1 : 0,
          scale: logoReaction === 'angry' ? 1.3 : isDragging ? 0.8 : 1,
          filter: logoReaction === 'angry' ? 'hue-rotate(180deg) brightness(1.5)' : 
                 isDragging ? 'brightness(1.2) saturate(1.5)' :
                 throwMode ? 'hue-rotate(90deg) brightness(1.3)' : 'none'
        }}
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          left: -100,
          right: windowSize.width - 100,
          top: -100,
          bottom: windowSize.height - 100
        }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: isDragging ? 0.8 : 1.2 }}
        animate={{ 
          rotate: logoReaction === 'excited' || throwMode ? [0, 360] : [0, 0],
          y: isDragging ? [0, -10, 0] : [0, 0, 0]
        }}
        transition={{ 
          duration: 0.5,
          repeat: logoReaction === 'excited' || throwMode ? Infinity : 0,
          ease: "easeInOut"
        }}
        onClick={handleLogoClick}
        onMouseEnter={handleLogoHover}
        onMouseLeave={handleLogoLeave}
        onMouseDown={unlockAudio}
      >
        <div className="w-64 h-64 relative">
          <img 
            src="/tronk.png" 
            alt="TRONK" 
            className="w-full h-full object-contain troll-hover"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
      </motion.div>

      {/* Troll Title */}
      <motion.h1
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-6xl font-bold text-black troll-text"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        TRONK
      </motion.h1>

      {/* Troll Subtitle */}
      <motion.p
        className="absolute top-32 left-1/2 transform -translate-x-1/2 text-2xl text-black font-bold"
        animate={{ 
          x: [0, 10, -10, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        THE MOST USELESS MEMECOIN EVER
      </motion.p>

      {/* Troll Buttons - bouton buy sans rotation */}
      <motion.button
        className="absolute bg-red-500 text-white px-8 py-4 rounded-full text-xl font-bold troll-button z-30"
        style={{
          x: buttonPosition.x,
          y: buttonPosition.y,
        }}
        onMouseEnter={handleButtonHover}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        BUY TRONK (DON'T)
      </motion.button>

      <motion.button
        className="absolute bottom-20 right-1/4 bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold troll-button"
        whileHover={{ 
          scale: 1.1,
          rotate: 180,
          filter: "hue-rotate(180deg)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        VIEW CHART (WHY?)
      </motion.button>

      {/* Troll Stats */}
      <motion.div
        className="absolute top-1/2 right-10 bg-white p-6 rounded-lg border-4 border-black"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <h3 className="text-2xl font-bold text-black mb-4">"STATS"</h3>
        <p className="text-lg text-red-500">Price: $0.00000001</p>
        <p className="text-lg text-red-500">Market Cap: $1.50</p>
        <p className="text-lg text-red-500">Holders: 3 (probably)</p>
        <p className="text-lg text-red-500">Usefulness: 0%</p>
      </motion.div>

      {/* Troll Disclaimer */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ 
          opacity: [1, 0.3, 1],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <p className="text-lg text-black font-bold">
          ⚠️ DISCLAIMER: THIS IS A JOKE. DON'T INVEST REAL MONEY. ⚠️
        </p>
        <p className="text-sm text-gray-600 mt-2">
          (Unless you want to lose it all, then go ahead)
        </p>
      </motion.div>

      {/* Compteur de lancers en haut à droite */}
      {throwCount > 0 && (
        <motion.div
          className="fixed top-5 right-5 z-50"
          animate={{ 
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span
            className={`text-8xl font-black ${getThrowCountEffects().color}`}
            animate={getThrowCountEffects().animation}
            transition={{ 
              duration: getThrowCountEffects().duration,
              repeat: getThrowCountEffects().repeat,
              ease: "easeInOut"
            }}
            style={{
              textShadow: throwCount >= 100 ? '0 0 20px currentColor, 0 0 40px currentColor' : 'none',
              filter: throwCount >= 1000 ? 'drop-shadow(0 0 30px currentColor) drop-shadow(0 0 60px currentColor)' : 'none'
            }}
          >
            {getThrowCountEffects().text}
          </motion.span>
        </motion.div>
      )}

      {/* Instructions de drag */}
      <motion.div
        className="fixed top-5 left-5 text-lg font-bold text-black z-50 bg-yellow-300 p-3 rounded-lg border-2 border-black"
        animate={{ 
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎮 CLICK & DRAG TRONK TO THROW HIM!
        <br />
        

        <button 
          onClick={() => {
            if (!audioUnlocked) {
              unlockAudio();
            } else {
              playGunshotSound();
            }
          }}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          🔫 {audioUnlocked ? 'TEST SOUND' : 'UNLOCK AUDIO'}
        </button>
        
        {/* Contrôles audio */}
        {audioUnlocked && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleAudioMute}
                className={`px-2 py-1 rounded text-xs ${audioMuted ? 'bg-gray-500' : 'bg-green-500'} text-white hover:opacity-80`}
              >
                {audioMuted ? '🔇' : '🔊'}
              </button>
              <span className="text-xs text-black">Volume: {Math.round(audioVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={audioVolume}
              onChange={(e) => updateAudioVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4ade80 0%, #4ade80 ${audioVolume * 100}%, #e5e7eb ${audioVolume * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Effet de bombardement nucléaire */}
      {nukeMode && (
        <>
          {/* Overlay de glitch d'écran */}
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            animate={{
              opacity: [0, 0.4, 0, 0.6, 0, 0.3, 0, 0.5, 0, 0.2, 0, 0.7, 0],
              filter: [
                'hue-rotate(0deg) brightness(1) contrast(1)',
                'hue-rotate(180deg) brightness(2) contrast(3) saturate(4)',
                'hue-rotate(90deg) brightness(0.3) contrast(4) invert(0.5)',
                'hue-rotate(270deg) brightness(1.8) contrast(2) sepia(0.8)',
                'hue-rotate(0deg) brightness(0.5) contrast(5) saturate(2)',
                'hue-rotate(180deg) brightness(2.5) contrast(1.5) invert(1)',
                'hue-rotate(90deg) brightness(0.8) contrast(3) sepia(1)',
                'hue-rotate(270deg) brightness(1.2) contrast(4) saturate(3)',
                'hue-rotate(0deg) brightness(0.2) contrast(6) invert(0.8)',
                'hue-rotate(180deg) brightness(3) contrast(2) sepia(0.5)',
                'hue-rotate(90deg) brightness(0.6) contrast(5) saturate(4)',
                'hue-rotate(270deg) brightness(1.5) contrast(3) invert(0.3)',
                'hue-rotate(0deg) brightness(1) contrast(1)'
              ],
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(255,0,0,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,165,0,0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255,255,0,0.2) 0%, transparent 70%),
                linear-gradient(45deg, rgba(255,0,0,0.1) 0%, rgba(255,165,0,0.1) 50%, rgba(255,255,0,0.1) 100%)
              `,
            }}
          />
          
          {/* Tremblement de l'écran */}
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            animate={{
              x: [0, -10, 10, -5, 5, -15, 15, -8, 8, 0],
              y: [0, 5, -5, 10, -10, 3, -3, 7, -7, 0],
              rotate: [0, 0.5, -0.5, 1, -1, 0.3, -0.3, 0.8, -0.8, 0],
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Flash nucléaire */}
          <motion.div
            className="fixed inset-0 z-[9997] pointer-events-none bg-white"
            animate={{
              opacity: [0, 0.8, 0, 0.3, 0, 0.6, 0, 0.2, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Lignes de glitch */}
          <motion.div
            className="fixed inset-0 z-[9996] pointer-events-none"
            animate={{
              opacity: [0, 1, 0, 0.5, 0, 0.8, 0, 0.3, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div 
              className="w-full h-1 bg-red-500 absolute top-1/4"
              style={{
                boxShadow: '0 0 20px #ff0000, 0 0 40px #ff0000',
                filter: 'blur(1px)'
              }}
            />
            <div 
              className="w-full h-1 bg-orange-500 absolute top-1/2"
              style={{
                boxShadow: '0 0 20px #ff6600, 0 0 40px #ff6600',
                filter: 'blur(1px)'
              }}
            />
            <div 
              className="w-full h-1 bg-yellow-500 absolute top-3/4"
              style={{
                boxShadow: '0 0 20px #ffff00, 0 0 40px #ffff00',
                filter: 'blur(1px)'
              }}
            />
          </motion.div>
          
          {/* Message d'alerte nucléaire */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] text-center"
            animate={{
              scale: [1, 1.1, 0.9, 1.05, 1],
              rotate: [0, 2, -2, 1, -1, 0],
              x: [0, 3, -3, 2, -2, 0],
              y: [0, -2, 2, -1, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="text-white text-center">
              <h1 
                className="text-6xl font-black mb-4"
                style={{
                  textShadow: '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000',
                  filter: 'drop-shadow(0 0 10px #ff0000)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em'
                }}
              >
                NUKE MODE
              </h1>
              <p 
                className="text-2xl font-bold"
                style={{
                  textShadow: '0 0 15px #ff6600, 0 0 30px #ff6600',
                  filter: 'drop-shadow(0 0 8px #ff6600)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em'
                }}
              >
                NUCLEAR BOMBARDMENT IN PROGRESS
              </p>
              <p 
                className="text-xl mt-3"
                style={{
                  textShadow: '0 0 10px #ffff00, 0 0 20px #ffff00',
                  filter: 'drop-shadow(0 0 5px #ffff00)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}
              >
                TRONK HAS TRIGGERED THE APOCALYPSE
              </p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
