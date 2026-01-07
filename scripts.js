const LoadingManager = (() => {
  const loadingScreen = document.getElementById('loadingScreen');
  const bgVideo = document.getElementById('bgVideo');
  let videoReady = false;
  let fontsReady = false;

  const checkAndRemoveLoading = () => {
    if (videoReady && fontsReady) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 300);
    }
  };

  const init = () => {
    bgVideo.addEventListener('canplay', () => {
      videoReady = true;
      checkAndRemoveLoading();
    }, { once: true });

    setTimeout(() => {
      if (!videoReady) {
        videoReady = true;
        checkAndRemoveLoading();
      }
    }, 5000);

    document.fonts.ready.then(() => {
      fontsReady = true;
      checkAndRemoveLoading();
    });
  };

  return { init };
})();

const MenuPositionConfig = {
  desktopPositions: {
    h07: 210,
    h08: 240,
    h09: 270,
    h10: 300,
    h11: 330
  },

  mobileLayouts: [
    { home: 0, personal: 30, stack: 60 },
    { home: 330, personal: 0, stack: 30 },
    { home: 300, personal: 330, stack: 0 }
  ],

  layout: [
    ["h09", "h10", "h11"],
    ["h08", "h09", "h10"],
    ["h07", "h08", "h09"]
  ]
};

const CircleMenuManager = (() => {
  const icons = [
    document.getElementById("icon0"),
    document.getElementById("icon1"),
    document.getElementById("icon2")
  ];
  const circleMenu = document.getElementById('circleMenu');
  let scrollTimeout;

  const isMobileDevice = () => window.innerWidth <= 768;

  const getCurrentSection = () => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    return Math.min(2, Math.round(scrollY / sectionHeight));
  };

  const getIconAngle = (icon, currentSection) => {
    if (isMobileDevice()) {
      const iconType = icon.id === "icon2" ? "home" : icon.id === "icon1" ? "personal" : "stack";
      return MenuPositionConfig.mobileLayouts[currentSection][iconType];
    }
    const iconIndex = icons.indexOf(icon);
    return MenuPositionConfig.desktopPositions[MenuPositionConfig.layout[currentSection][iconIndex]];
  };

  const calculateIconPosition = (angleDeg) => {
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    const radius = (circleMenu.offsetWidth / 2) * (isMobileDevice() ? 0.7 : 0.78);
    const center = circleMenu.offsetWidth / 2;
    
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad)
    };
  };

  const updateIconPosition = (icon, currentSection) => {
    const angleDeg = getIconAngle(icon, currentSection);
    const position = calculateIconPosition(angleDeg);
    
    icon.style.left = `${position.x}px`;
    icon.style.top = `${position.y}px`;
  };

  const updateIconAppearance = (icon, currentSection) => {
    const img = icon.querySelector("img");
    const iconSection = parseInt(icon.getAttribute("data-section"));
    
    if (iconSection === currentSection) {
      img.style.opacity = "1";
      img.style.transform = "scale(1.2)";
    } else {
      img.style.opacity = "0.45";
      img.style.transform = "scale(1)";
    }
  };

  const showMenuTemporarily = () => {
    circleMenu.classList.add('visible');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      circleMenu.classList.remove('visible');
    }, 1500);
  };

  const updateMenu = () => {
    const currentSection = getCurrentSection();
    showMenuTemporarily();
    
    icons.forEach(icon => {
      updateIconPosition(icon, currentSection);
      updateIconAppearance(icon, currentSection);
    });
  };

  const init = () => {
    window.addEventListener("scroll", updateMenu);
    window.addEventListener("resize", updateMenu);
    updateMenu();
  };

  return { init };
})();

const ImageTransitionManager = (() => {
  const updateImageTransition = () => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    const section1Top = sectionHeight;
    const section2Top = sectionHeight * 2;
    
    if (scrollY >= section1Top && scrollY < section2Top) {
      const progress = Math.min(1, (scrollY - section1Top) / (sectionHeight * 0.3));
      const coverAdult = document.getElementById('coverAdult');
      const coverKid = document.getElementById('coverKid');
      
      if (coverAdult && coverKid) {
        const kidClip = 100 - (progress * 100);
        coverKid.style.clipPath = `inset(0 ${kidClip}% 0 0)`;
      }
    }
  };

  const init = () => {
    window.addEventListener("scroll", updateImageTransition);
  };

  return { init };
})();

const TechCardsManager = (() => {
  const init = () => {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  };

  return { init };
})();

const FooterManager = (() => {
  const init = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  return { init };
})();

const App = (() => {
  const init = () => {
    LoadingManager.init();
    CircleMenuManager.init();
    ImageTransitionManager.init();
    TechCardsManager.init();
    FooterManager.init();
  };

  return { init };
})();

App.init();