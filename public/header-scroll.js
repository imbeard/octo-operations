(function () {
  "use strict";

  function initHeaderScroll() {
    const header = document.querySelector("header");
    const title = document.querySelector(".bigtitle");
    if (!header) {
      setTimeout(initHeaderScroll, 500);
      return;
    }

    function handleScroll(scrollTop) {
      if (scrollTop > 50) {
        header.classList.add("header-faded");
        title.classList.add("header-faded");
      } else {
        header.classList.remove("header-faded");
        title.classList.remove("header-faded");
      }
    }

    // Listen to window scroll (for pages with window scrolling)
    function handleWindowScroll() {
      handleScroll(window.scrollY);
    }

    // Listen to element scroll (for overflow containers)
    function handleElementScroll(event) {
      handleScroll(event.target.scrollTop);
    }

    // Add window scroll listener
    window.addEventListener("scroll", handleWindowScroll);

    // Find and add listeners to scrollable containers
    function addScrollListeners() {
      const scrollableElements = document.querySelectorAll(
        '.overflow-y-scroll, .overflow-auto, [class*="overflow-y-scroll"]',
      );

      scrollableElements.forEach((element) => {
        element.addEventListener("scroll", handleElementScroll);
      });

      // Also listen to main content containers
      const mainContainers = document.querySelectorAll(
        "main, .h-full.md\\:overflow-y-scroll",
      );
      mainContainers.forEach((element) => {
        element.addEventListener("scroll", handleElementScroll);
      });
    }

    // Add listeners immediately
    addScrollListeners();

    // Re-add listeners after a delay to catch dynamically created elements
    setTimeout(addScrollListeners, 1000);

    // Initialize header state
    handleScroll(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderScroll);
  } else {
    initHeaderScroll();
  }
})();
