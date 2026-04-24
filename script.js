const IMAGES = [
  { title: "grid_img_1", src: "./assets/images/grid_img_1.jpg" },
  { title: "grid_img_2", src: "./assets/images/grid_img_2.jpg" },
  { title: "grid_img_3", src: "./assets/images/grid_img_3.jpg" },
  { title: "grid_img_4", src: "./assets/images/grid_img_4.jpg" },
  { title: "grid_img_5", src: "./assets/images/grid_img_5.jpg" },
  { title: "grid_img_6", src: "./assets/images/grid_img_6.jpg" },
  { title: "grid_img_7", src: "./assets/images/grid_img_7.jpg" },
  { title: "grid_img_8", src: "./assets/images/grid_img_8.jpg" },
  { title: "grid_img_9", src: "./assets/images/grid_img_9.jpg" },
  { title: "grid_img_10", src: "./assets/images/grid_img_10.jpg" },
  { title: "grid_img_11", src: "./assets/images/grid_img_11.jpg" },
  { title: "grid_img_12", src: "./assets/images/grid_img_12.jpg" }
];


const GRID = document.getElementById("gallery-grid");
let currentIndex = 0;

/** Setzt den Titel in der Lightbox. */
function setImageTitle() {
  const lightboxTitle = document.getElementById("lightbox-img-title");
  lightboxTitle.textContent = IMAGES[currentIndex].title;
}

/** Setzt das Bild in der Lightbox. */
function setLightboxImage() {
  const lightboxImage = document.getElementById("lightbox-img");
  lightboxImage.src = IMAGES[currentIndex].src.replace("_small", "");
  lightboxImage.alt = IMAGES[currentIndex].title;
}

/** Setzt die Anzeige "aktuelles Bild / gesamt". */
function setStepIndicator() {
  const currentStep = document.getElementById("currentStep");
  const totalSteps = document.getElementById("totalSteps");
  currentStep.textContent = String(currentIndex + 1);
  totalSteps.textContent = String(IMAGES.length);
}

/** Aktualisiert alle Lightbox-Inhalte. */
function updateLightbox() {
  setImageTitle();
  setLightboxImage();
  setStepIndicator();
}

/** Rendert ein einzelnes Vorschaubild. */
function renderGridImage(image, index) {
  return `
        <img
            class="grid-img"
            src="${image.src}"
            data-index="${index}"
            alt="${image.title}">
    `;
}

/** Baut alle Vorschaubilder in die Galerie. */
function buildGallery() {
  IMAGES.forEach((image, index) => {
    GRID.innerHTML += renderGridImage(image, index);
  });
}

/** Oeffnet die Lightbox fuer ein bestimmtes Bild. */
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  currentIndex = index;
  updateLightbox();
  lightbox.showModal();
}

/** Klick-Logik für die Galerie. */
function onGridClick(event) {
  if (event.target.tagName !== "IMG") {
    return;
  }

  const index = Number.parseInt(event.target.dataset.index, 10);
  openLightbox(index);
}

/** Aktualisiert den aktuellen Index basierend auf der Richtung. */
function updateCurrentIndex(direction) {
  if (direction === "next") {
    if (currentIndex === IMAGES.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  } else if (direction === "prev") {
    if (currentIndex === 0) {
      currentIndex = IMAGES.length - 1;
    } else {
      currentIndex--;
    }
  }
}

/** Zeigt das vorherige Bild. */
function showPreviousImage() {
  updateCurrentIndex("prev");
  updateLightbox();
}

/** Zeigt das naechste Bild. */
function showNextImage() {
  updateCurrentIndex("next");
  updateLightbox();
}

/** Schliesst die Lightbox. */
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.close();
}

/** Verknuepft alle Lightbox-Buttons. */
function initLightbox() {
  const buttonPrev = document.getElementById("lightbox-btn-prev");
  const buttonNext = document.getElementById("lightbox-btn-next");
  const buttonClose = document.getElementById("lightbox-btn-close");
  buttonPrev.addEventListener("click", showPreviousImage);
  buttonNext.addEventListener("click", showNextImage);
  buttonClose.addEventListener("click", closeLightbox);
}

/** Startet die Galerie. */
function init() {
  buildGallery();
  initLightbox();
  setStepIndicator();
  GRID.addEventListener("click", onGridClick);
}

init();