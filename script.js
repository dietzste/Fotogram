const IMAGES = [
  { title: "Amsel", src: "./assets/images/img_amsel.jpg" },
  { title: "Blaumeise", src: "./assets/images/img_blaumeise.jpg" },
  { title: "Buchfink", src: "./assets/images/img_buchfink.jpg" },
  { title: "Gartenbaumläufer", src: "./assets/images/img_gartenbaumlaeufer.jpg" },
  { title: "Gartenrotschwanz", src: "./assets/images/img_gartenrotschwanz.jpg" },
  { title: "Grünfink", src: "./assets/images/img_gruenfink.jpg" },
  { title: "Haussperling", src: "./assets/images/img_haussperling.jpg" },
  { title: "Kleiber", src: "./assets/images/img_kleiber.jpg" },
  { title: "Kohlmeise", src: "./assets/images/img_kohlmeise.jpg" },
  { title: "Mönchgrasmücke", src: "./assets/images/img_moenchgrasmuecke.jpg" },
  { title: "Nachtigall", src: "./assets/images/img_nachtigall.jpg" },
  { title: "Nebelkrähe", src: "./assets/images/img_nebelkraehe.jpg" },
  { title: "Ringeltaube", src: "./assets/images/img_ringeltaube.jpg" },
  { title: "Rotkelchen", src: "./assets/images/img_rotkelchen.jpg" },
  { title: "Schwanzmeise", src: "./assets/images/img_schwanzmeise.jpg" },
  { title: "Singdrossel", src: "./assets/images/img_singdrossel.jpg" },
  { title: "Stieglitz", src: "./assets/images/img_stieglitz.jpg" },
  { title: "Turmfalke", src: "./assets/images/img_turmfalke.jpg" },
  { title: "Zilpzalp", src: "./assets/images/img_zilpzalp.jpg" }
];


const GRID = document.getElementById("gallery-grid");
const DIRECTION_NEXT = "next";
const DIRECTION_PREV = "prev";

let currentIndex = 0;

/** Setzt den Titel im Dialog. */
function setImageTitle() {
  const dialogTitle = document.getElementById("dialog-img-title");
  dialogTitle.textContent = IMAGES[currentIndex].title;
}

/** Setzt das Bild im Dialog. */
function setDialogImage() {
  const dialogImage = document.getElementById("dialog-img");
  dialogImage.src = IMAGES[currentIndex].src;
  dialogImage.alt = `Ausgewähltes Vogelbild: ${IMAGES[currentIndex].title}`;
}

/** Setzt die Anzeige "aktuelles Bild / gesamt". */
function setStepIndicator() {
  const currentStep = document.getElementById("currentStep");
  const totalSteps = document.getElementById("totalSteps");
  currentStep.textContent = String(currentIndex + 1);
  totalSteps.textContent = String(IMAGES.length);
}

/** Aktualisiert alle dialog-Inhalte. */
function updateDialog() {
  setImageTitle();
  setDialogImage();
  setStepIndicator();
}

/** Rendert ein einzelnes Vorschaubild. */
function renderGridImage(image, index) {
  return `
    <button class="gallery-btn" data-index="${index}" type="button" aria-label="${image.title} vergrößern">
      <img
        class="grid-img"
        src="${image.src}"
        alt="${image.title}">
    </button>
  `;
}

/** Baut alle Vorschaubilder in die Galerie. */
function buildGallery() {
  IMAGES.forEach((image, index) => {
    GRID.innerHTML += renderGridImage(image, index);
  });
}

/** Öffnet den Dialog für ein bestimmtes Bild. */
function openDialog(index) {
  const dialog = document.getElementById("dialog");
  currentIndex = index;
  updateDialog();
  dialog.showModal();

  document.getElementById("dialog-btn-close").focus();
}

/** Klick-Logik für die Galerie. */
function onGridClick(event) {
  const btn = event.target.closest(".gallery-btn");
  if (!btn) return;
  const index = Number.parseInt(btn.dataset.index, 10);
  openDialog(index);
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
  updateCurrentIndex(DIRECTION_PREV);
  updateDialog();
}

/** Zeigt das nächste Bild. */
function showNextImage() {
  updateCurrentIndex(DIRECTION_NEXT);
  updateDialog();
}

/** Schließt den Dialog. */
function closeDialog() {
  const dialog = document.getElementById("dialog");
  dialog.close();
}

/** Hält den Tastaturfokus innerhalb des geöffneten Dialogs. */
function trapFocus(dialog, event) {
  if (event.key !== "Tab") return;

  const focusable = dialog.querySelectorAll("button");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/** Verknüpft alle Dialog-Buttons. */
function initDialog() {
  const buttonPrev = document.getElementById("dialog-btn-prev");
  const buttonNext = document.getElementById("dialog-btn-next");
  const buttonClose = document.getElementById("dialog-btn-close");
  buttonPrev.addEventListener("click", showPreviousImage);
  buttonNext.addEventListener("click", showNextImage);
  buttonClose.addEventListener("click", closeDialog);
  const dialog = document.getElementById("dialog");
  dialog.addEventListener("keydown", (event) => trapFocus(dialog, event));
}

/** Startet die Galerie. */
function init() {
  buildGallery();
  initDialog();
  setStepIndicator();
  GRID.addEventListener("click", onGridClick);
}

init();