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
// Carousel setup
const track = document.querySelector(".carousel-track") as HTMLElement;
const slides = Array.from(track.children) as HTMLElement[];
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const nextBtn = document.querySelector(".next") as HTMLButtonElement;
const decreaseBtn = document.querySelector(".decrease-btn") as HTMLButtonElement;
const increaseBtn = document.querySelector(".increase-btn") as HTMLButtonElement;
const quantityDisplay = document.querySelector(".quantity") as HTMLElement;
const addToCartBtn = document.querySelector(".add-to-cart-btn") as HTMLButtonElement;

let currentIndex = 0;
let quantity = 0;

function setSlideWidth() {
  const slideWidth = track.clientWidth;
  slides.forEach((slide) => {
    slide.style.minWidth = `${slideWidth}px`;
  });
  updateCarousel();
}

function updateCarousel() {
  const slideWidth = track.clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Carousel navigation
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

// Quantity buttons
decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity.toString();
  }
});

increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity.toString();
});

// Add to cart
// Cart count element
const cartCount = document.querySelector(".cart-count") as HTMLElement;

addToCartBtn.addEventListener("click", () => {
  if (quantity > 0) {
    // get current count
    let currentCount = parseInt(cartCount.textContent || "0");

    // update count
    currentCount += quantity;
    cartCount.textContent = currentCount.toString();

    // reset quantity display
    quantity = 0;
    quantityDisplay.textContent = quantity.toString();
  } else {
    alert("Please select at least 1 item");
  }
});

function enableThumbnailSwap() {
  const mainImage = document.querySelector(".product-image img") as HTMLImageElement;
  const thumbnails = document.querySelectorAll<HTMLImageElement>(".thumbnail-images img");


  if (!mainImage || thumbnails.length === 0) return;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // store current sources
      const mainSrc = mainImage.src;
      const thumbSrc = thumb.src;

      // swap images
      mainImage.src = thumbSrc.replace("-thumbnail", "");
      thumb.src = mainSrc.includes("-thumbnail")
        ? mainSrc
        : mainSrc.replace(".jpg", "-thumbnail.jpg");

      // update highlight
      thumbnails.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}


// Init
setSlideWidth();
window.addEventListener("resize", setSlideWidth);
enableThumbnailSwap();
