import { images } from "./imagesData.js";

class SearchFilter {
  constructor(images, imgsContainerId) {
    this.images = images;
    this.imgsContainer = document.getElementById(imgsContainerId);

    this.init();
  }

  init() {
    this.showImages();
  }

  showImages() {
    const fragment = document.createDocumentFragment();
    this.images.forEach((img) => {
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", img.src);
      imageElement.setAttribute("alt", img.alt);
      imageElement.className = "w-full rounded-xl mb-4";
      fragment.appendChild(imageElement);
    });
    this.imgsContainer.appendChild(fragment);
  }

  filterImages(imgName) {}
}

document.addEventListener("DOMContentLoaded", () => {
  const search = new SearchFilter(images, "imgsContainer");

  document.getElementById("searchInput").addEventListener("input", (e) => {
    search.filterImages(e.target.value);
  });
});
