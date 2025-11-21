import React from 'react';
import { createRoot } from 'react-dom/client';
import CFDEWheel from 'cfde-wheel';

/**
 * Initialize the CFDE Navigation Wheel
 * @param {string|HTMLElement} containerIdOrElement - ID of the container element or the element itself
 */
function initCFDEWheel(containerIdOrElement) {
  const container = typeof containerIdOrElement === 'string'
    ? document.getElementById(containerIdOrElement)
    : containerIdOrElement;

  if (!container) {
    console.error('CFDE Wheel: Container element not found');
    return;
  }

  const root = createRoot(container);
  root.render(React.createElement(CFDEWheel));
}

// Auto-initialize if container with default ID exists
function autoInit() {
  const defaultContainer = document.getElementById('cfde-wheel');
  if (defaultContainer) {
    initCFDEWheel(defaultContainer);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

// Export for manual initialization
if (typeof window !== 'undefined') {
  window.CFDEWheel = {
    init: initCFDEWheel,
  };
}

