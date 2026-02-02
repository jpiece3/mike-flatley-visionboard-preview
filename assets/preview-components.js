/**
 * Preview Components JavaScript
 * Accordion interactions, scroll-to-top, and global controls
 */

(function() {
  'use strict';

  // ========================================
  // ACCORDION FUNCTIONALITY
  // ========================================

  function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-section');

    accordions.forEach(function(accordion) {
      const header = accordion.querySelector('.accordion-header');

      if (!header) return;

      // Add click handler
      header.addEventListener('click', function() {
        const isOpen = accordion.classList.contains('open');

        // Check if this is part of an exclusive group
        const exclusiveGroup = accordion.dataset.exclusiveGroup;

        if (exclusiveGroup && !isOpen) {
          // Close all other accordions in the same exclusive group
          const groupAccordions = document.querySelectorAll(
            `.accordion-section[data-exclusive-group="${exclusiveGroup}"]`
          );
          groupAccordions.forEach(function(otherAccordion) {
            if (otherAccordion !== accordion) {
              otherAccordion.classList.remove('open');
            }
          });
        }

        // Toggle current accordion
        accordion.classList.toggle('open');
      });

      // Add keyboard support
      header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  // ========================================
  // EXPAND/COLLAPSE ALL CONTROLS
  // ========================================

  function initGlobalControls() {
    const controlsBar = document.querySelector('.controls-bar');
    if (!controlsBar) return;

    const expandAllBtn = controlsBar.querySelector('[data-action="expand-all"]');
    const collapseAllBtn = controlsBar.querySelector('[data-action="collapse-all"]');

    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', function() {
        const accordions = document.querySelectorAll('.accordion-section');
        accordions.forEach(function(accordion) {
          accordion.classList.add('open');
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', function() {
        const accordions = document.querySelectorAll('.accordion-section');
        accordions.forEach(function(accordion) {
          accordion.classList.remove('open');
        });
      });
    }
  }

  // ========================================
  // SCROLL TO TOP
  // ========================================

  function initScrollToTop() {
    // Create scroll-to-top button if it doesn't exist
    let scrollBtn = document.querySelector('.scroll-top');

    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.className = 'scroll-top';
      scrollBtn.setAttribute('aria-label', 'Scroll to top');
      scrollBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      document.body.appendChild(scrollBtn);
    }

    // Show/hide on scroll
    function toggleScrollBtn() {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn(); // Check initial state

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========================================
  // ACCESSIBLE FOCUS STYLES
  // ========================================

  function initAccessibility() {
    // Add keyboard-user class to body when tab is used
    function handleFirstTab(e) {
      if (e.keyCode === 9) {
        document.body.classList.add('keyboard-user');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    }

    function handleMouseDownOnce() {
      document.body.classList.remove('keyboard-user');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
    }

    window.addEventListener('keydown', handleFirstTab);
  }

  // ========================================
  // INITIALIZE ALL
  // ========================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initAccordions();
        initGlobalControls();
        initScrollToTop();
        initSmoothScroll();
        initAccessibility();
      });
    } else {
      // DOM already loaded
      initAccordions();
      initGlobalControls();
      initScrollToTop();
      initSmoothScroll();
      initAccessibility();
    }
  }

  init();

  // ========================================
  // PUBLIC API (if needed)
  // ========================================

  window.PreviewComponents = {
    refreshAccordions: initAccordions,
    scrollToTop: function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

})();
