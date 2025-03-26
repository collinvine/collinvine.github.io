// --- Image Switcher for Landing Page ---

document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements to avoid repeated lookups
  const mainImage = document.getElementById('mainImage');
  const meTrigger = document.getElementById('meTrigger');
  const handstandTrigger = document.getElementById('handstandTrigger');
  const familyTrigger = document.getElementById('familyTrigger');
  const sourdoughTrigger = document.getElementById('sourdoughTrigger');

  // Check if the main image element exists
  if (!mainImage) {
    console.error('Main image element (#mainImage) not found.');
    return; // Stop execution if the image isn't found
  }

  // Store the original image source and alt text
  const originalSrc = mainImage.src;
  const originalAlt = mainImage.alt;

  // Define the alternative images and their alt text
  const imageMap = {
    meTrigger: { src: 'img/me.jpg', alt: "Collin Vine speaking on stage at a 'Proof of Work Champion' event for Colony." },
    handstandTrigger: { src: 'img/handstand.jpg', alt: 'Collin Vine doing a handstand overlooking the city of Dubrovnik, Croatia.' },
    familyTrigger: { src: 'img/family.jpg', alt: 'Collin Vine with his wife and young child, smiling.' },
    sourdoughTrigger: { src: 'img/sourdough.jpg', alt: 'A sliced loaf of homemade sourdough bread on a wooden cutting board.' }
  };

  // Function to change the image
  const changeImage = (triggerId) => {
    if (imageMap[triggerId]) {
      mainImage.src = imageMap[triggerId].src;
      mainImage.alt = imageMap[triggerId].alt; // Update alt text
    }
  };

  // Function to reset the image to the original
  const resetImage = () => {
    mainImage.src = originalSrc;
    mainImage.alt = originalAlt; // Reset alt text
  };

  // Helper function to add event listeners if the trigger element exists
  const addImageTriggerListeners = (triggerElement, triggerId) => {
    if (triggerElement) {
      triggerElement.addEventListener('mouseover', () => changeImage(triggerId));
      triggerElement.addEventListener('mouseout', resetImage);
      // Add focus/blur for keyboard accessibility (optional, depends on desired interaction)
      // triggerElement.addEventListener('focus', () => changeImage(triggerId));
      // triggerElement.addEventListener('blur', resetImage);
    } else {
      console.warn(`Trigger element (#${triggerId}) not found.`);
    }
  };

  // Add listeners for each trigger
  addImageTriggerListeners(meTrigger, 'meTrigger');
  addImageTriggerListeners(handstandTrigger, 'handstandTrigger');
  addImageTriggerListeners(familyTrigger, 'familyTrigger');
  addImageTriggerListeners(sourdoughTrigger, 'sourdoughTrigger');

}); // End DOMContentLoaded