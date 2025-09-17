import { images } from "./imagesData.js";

class SearchFilter {
  constructor(images, imgsContainerId) {
    this.images = images;
    this.imgsContainer = document.getElementById(imgsContainerId);
    this.showImages(images);
  }

  // Show given images
  showImages(images) {
    this.imgsContainer.innerHTML = ""; // clear before showing
    const fragment = document.createDocumentFragment();

    images.forEach((img) => {
      const imageElement = document.createElement("img");
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      imageElement.className = "w-full rounded-xl mb-4";
      fragment.appendChild(imageElement);
    });

    this.imgsContainer.appendChild(fragment);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const search = new SearchFilter(images, "imgsContainer");
  const searchInput = document.getElementById("searchInput");
  const searchesContainer = document.getElementById("searchesContainer");
  const overlay = document.getElementById("overlay");

  // Dim background on focus
  searchInput.addEventListener("focus", () => {
    searchesContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  // Restore background on blur
  searchInput.addEventListener("blur", () => {
    searchesContainer.classList.add("hidden");
    overlay.classList.add("hidden");
  });
});
