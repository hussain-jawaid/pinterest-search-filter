import { images } from "./imagesData.js";

class SearchFilter {
  constructor(images, imgsContainerId, searchesContainerId) {
    this.images = images;
    this.imgsContainer = document.getElementById(imgsContainerId);
    this.searchesContainer = document.getElementById(searchesContainerId);

    this.showImages(images);
  }

  // Show given images
  showImages(images) {
    this.imgsContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();

    images.forEach(({ src, alt }) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.className = "w-full rounded-xl mb-4";
      fragment.appendChild(img);
    });

    this.imgsContainer.appendChild(fragment);
  }

  // Render search suggestions
  showSuggestions(filtered) {
    this.searchesContainer.innerHTML = "";

    if (filtered.length === 0) {
      this.searchesContainer.innerHTML = `
        <div class="p-2 text-gray-500 italic">No searches match</div>
      `;
      this.searchesContainer.classList.remove("hidden");
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(({ name }) => {
      const div = document.createElement("div");
      div.className =
        "flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded";
      div.innerHTML = `
        <i class="fa-solid fa-magnifying-glass text-gray-500"></i>
        <span class="font-bold">${name}</span>
      `;

      // When user clicks a suggestion, fill input + show filtered images
      div.addEventListener("click", () => {
        document.getElementById("searchInput").value = name;
        this.showImages(
          this.images.filter((img) =>
            img.name.toLowerCase().includes(name.toLowerCase())
          )
        );
        this.searchesContainer.classList.add("hidden");
      });

      fragment.appendChild(div);
    });

    this.searchesContainer.appendChild(fragment);
    this.searchesContainer.classList.remove("hidden");
  }

  // Handle input typing
  handleSearch(query) {
    query = query.toLowerCase().trim();

    if (query === "") {
      this.showSuggestions([]); // hide suggestions
      return;
    }

    const filtered = this.images.filter((img) =>
      img.name.toLowerCase().includes(query)
    );

    this.showSuggestions(filtered);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const search = new SearchFilter(images, "imgsContainer", "searchesContainer");
  const searchInput = document.getElementById("searchInput");
  const overlay = document.getElementById("overlay");

  // Input typing → filter
  searchInput.addEventListener("input", (e) => {
    search.handleSearch(e.target.value);
  });

  // Dim background on focus
  searchInput.addEventListener("focus", (e) => {
    search.handleSearch(e.target.value);
    search.searchesContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

  // Restore background on blur (delay to allow click)
  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      search.searchesContainer.classList.add("hidden");
      overlay.classList.add("hidden");
    }, 200);
  });
});
