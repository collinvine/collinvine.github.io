
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const mainImage = document.getElementById('mainImage');
  const triggers = document.querySelectorAll('.trigger');

  if (!mainImage) {
    console.error('Main image element (#mainImage) not found.');
    return;
  }

  // Store original state
  const originalState = {
    src: mainImage.src,
    alt: mainImage.alt
  };

  // Track which trigger is "locked" via click
  let lockedTrigger = null;
  let resetTimeout = null;

  // Image Data Map
  const imageMap = {
    meTrigger: {
      src: 'img/me.webp',
      alt: "Collin Vine speaking on stage at a 'Proof of Work Champion' event for Colony."
    },
    runTrigger: {
      src: 'img/run.jpg',
      alt: 'Collin Vine in the midst of a 25km trail run.'
    },
    halloweenTrigger: {
      src: 'img/halloween.jpg',
      alt: 'Collin Vine hanging with his family in Halloween garb.'
    },
    breadTrigger: {
      src: 'img/sourdough.webp',
      alt: 'Collin Vine with a loaf of homemade sourdough bread.'
    }
  };

  // Function to update the image display
  const updateImage = (data) => {
    mainImage.style.opacity = '0.8';
    setTimeout(() => {
      mainImage.src = data.src;
      mainImage.alt = data.alt;
      mainImage.style.opacity = '1';
    }, 50);
  };

  // Function to update active styling on triggers
  const updateActiveClass = (activeTrigger) => {
    triggers.forEach(t => t.classList.remove('active'));
    if (activeTrigger) {
      activeTrigger.classList.add('active');
    }
  };

  // Function to activate a trigger (for hover/focus)
  const activateTrigger = (trigger) => {
    clearTimeout(resetTimeout);
    const id = trigger.id;
    const data = imageMap[id];

    updateActiveClass(trigger);

    if (data) {
      updateImage(data);
    }
  };

  // Function to reset to locked state (or original if nothing locked)
  const resetToLockedState = () => {
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      if (lockedTrigger) {
        const data = imageMap[lockedTrigger.id];
        updateActiveClass(lockedTrigger);
        if (data) {
          updateImage(data);
        }
      } else {
        updateActiveClass(null);
        mainImage.src = originalState.src;
        mainImage.alt = originalState.alt;
      }
    }, 120);
  };

  // Function to lock a trigger via click
  const lockTrigger = (trigger) => {
    lockedTrigger = trigger;
    activateTrigger(trigger);
  };

  // Add Event Listeners
  triggers.forEach(trigger => {
    // Mouse Interaction - hover shows the image
    trigger.addEventListener('mouseover', () => activateTrigger(trigger));
    // Mouse out - return to locked state (or original)
    trigger.addEventListener('mouseout', resetToLockedState);

    // Click Interaction - locks the trigger
    trigger.addEventListener('click', () => {
      lockTrigger(trigger);
    });

    // Keyboard Accessibility
    trigger.addEventListener('focus', () => activateTrigger(trigger));
    trigger.addEventListener('blur', resetToLockedState);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lockTrigger(trigger);
      }
    });
  });

  // Preload Images
  const preloadImages = () => {
    Object.values(imageMap).forEach(data => {
      const img = new Image();
      img.src = data.src;
    });
  };
  preloadImages();

});