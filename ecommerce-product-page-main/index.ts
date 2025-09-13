// Selecting the navlinks and nav elements
const desktopLink = document.querySelector(".nav-links") as HTMLElement | null;
const navBar = document.querySelector("nav");

if (!desktopLink || !navBar) throw new Error("Navbar or nav-links missing");

// Hamburger setup
const hamburgerImages = ["./images/icon-menu.svg", "./images/icon-close.svg"];
const hamburgerMenu = document.createElement("div");
hamburgerMenu.classList.add("hamburger");
hamburgerMenu.innerHTML = `<img src="${hamburgerImages[0]}" alt="Menu Icon" />`;
navBar.insertBefore(hamburgerMenu, navBar.firstChild);

// Sidebar state
let isOpen = false;

function applySidebarStyles() {
  if (!desktopLink) return;
  desktopLink.style.flexDirection = "column";
  desktopLink.style.position = "fixed";
  desktopLink.style.padding = "20px";
  desktopLink.style.paddingTop = "60px";
  desktopLink.style.top = "0";
  desktopLink.style.left = "0";
  desktopLink.style.width = "200px";
  desktopLink.style.height = "100%";
  desktopLink.style.backgroundColor = "#fff";
  desktopLink.style.boxShadow = "2px 0 5px rgba(0,0,0,0.5)";
  desktopLink.style.transition = "transform 0.3s ease-in-out";
  desktopLink.style.transform = "translateX(-100%)";
   
}

function resetDesktopStyles() {
  if (!desktopLink) return;
  desktopLink.removeAttribute("style"); // let CSS handle desktop look
}

// Toggle sidebar
function toggleSidebar() {
  if (!desktopLink) return;
  isOpen = !isOpen;
  hamburgerMenu.innerHTML = `<img src="${
    isOpen ? hamburgerImages[1] : hamburgerImages[0]
  }" alt="${isOpen ? "Close" : "Menu"} Icon" />`;
  desktopLink.style.transform = isOpen ? "translateX(0)" : "translateX(-100%)";
}
// appending a close icon image to the nav-links in mobile view
function appendCloseIcon() { 
  if (window.innerWidth > 768) return; // Only add close icon in mobile view
  if (!desktopLink) return;

  // Prevent duplicates
  if (desktopLink.querySelector(".close-icon")) return;

  const closeIcon = document.createElement("div");
  closeIcon.classList.add("close-icon");
  closeIcon.innerHTML = `<img src="${hamburgerImages[1]}" alt="Close Icon" />`;
  closeIcon.style.position = "absolute";
  closeIcon.style.top = "20px";
  closeIcon.style.left = "40px";
  closeIcon.style.cursor = "pointer";
  closeIcon.addEventListener("click", toggleSidebar);
  desktopLink.appendChild(closeIcon);
};

// Responsive behavior
function updateLayout() {
  if (!desktopLink) return;

  if (window.innerWidth <= 768) {
    hamburgerMenu.style.display = "block";
    appendCloseIcon();
    applySidebarStyles();
    // Putting a close icon image into the mobile navlinks if sidebar is open
    
  } else {
    hamburgerMenu.style.display = "none";
    resetDesktopStyles();
  }
}

hamburgerMenu.addEventListener("click", toggleSidebar);
window.addEventListener("resize", updateLayout);
desktopLink.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    isOpen = false;
    desktopLink.style.transform = "translateX(-100%)";
    hamburgerMenu.innerHTML = `<img src="${hamburgerImages[0]}" alt="Menu Icon" />`;
  })
);

// Init
updateLayout();
// Displaying the product images like a carousel in mobile view
// Carousel
const track = document.querySelector(".carousel-track") as HTMLElement;
const slides = Array.from(track.querySelectorAll("img")) as HTMLElement[];
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const nextBtn = document.querySelector(".next") as HTMLButtonElement;

let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

