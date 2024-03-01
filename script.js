const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const toggleSearchBtn = document.querySelector(".toggle-search");
const searchBox = document.querySelector(".search-box");
const searchArea = document.querySelector(".search-area");
const productList = Array.from(document.querySelectorAll(".product-item"));
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const closeSearchBtn = document.querySelector(".close-search-btn");
const leftSlideBtn = document.getElementById("prev-slide-btn");
const rightSlideBtn = document.getElementById("next-slide-btn");
const moreInfoBtns = document.querySelectorAll(".more-info");
const productsItems = document.querySelector(".products-list");
///////////////////////////////////////////////////////////////

document.querySelector(".copyrights").innerHTML =
  "&copy; " + new Date().getFullYear() + " .planty";
///////////////////////////////////////////////////////////////

const removeSearchResults = () => {
  const searchResults = document.querySelector(".search-results");
  if (searchResults) {
    searchResults.remove();
  }
};

const showsuggestedProducts = (suggestedProducts) => {
  const searchResultsDiv = document.createElement("div");
  searchResultsDiv.classList.add("search-results");
  if (suggestedProducts.length == 0) {
    const productDiv = document.createElement("div");
    // productDiv.classList.add("search-result");

    productDiv.innerHTML = `
        <p>No products found</p>
        `;
    searchResultsDiv.appendChild(productDiv);
  }
  suggestedProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("search-result");

    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <img src="${product.image}" alt="${product.name}" />
        `;
    searchResultsDiv.appendChild(productDiv);
  });
  searchBox.appendChild(searchResultsDiv);
};

const searchSuggestions = () => {
  const searchValue = searchInput.value;

  let suggestedProducts = [];
  suggestedNames = productList.forEach((product) => {
    productName = product.querySelector(".product-name");
    productPrice = product.querySelector(".product-price");
    productImage = product.querySelector(".product-img");

    if (
      productName.textContent.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      productItem = {
        name: productName.textContent,
        price: productPrice.textContent,
        image: productImage.getAttribute("src"),
      };

      suggestedProducts.push(productItem);
    }
  });

  searchBox.classList.add("show-suggestion");
  showsuggestedProducts(suggestedProducts);
  // console.log(suggestedProducts);
};

///////////////////////////////////////////////////////////////
moreInfoBtns.forEach((moreInfoBtn) => {
  moreInfoBtn.addEventListener("click", () => {
    productItem = moreInfoBtn.parentElement;
    productInfo = productItem.querySelector(".product-info");
    productInfo.classList.toggle("show");
  });
});

closeSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  removeSearchResults();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

toggleSearchBtn.addEventListener("click", () => {
  searchArea.classList.toggle("show");
});

searchBtn.addEventListener("click", () => {
  removeSearchResults();
  if (searchInput.value === "") return;
  searchSuggestions();
});

searchInput.addEventListener("keyup", (e) => {
  removeSearchResults();
  if (e.key === "Enter") {
    if (searchInput.value === "") return;
    searchSuggestions();
  }
});

leftSlideBtn.addEventListener("click", () => {
  const productsItems = document.querySelector(".products-list");
  const scrollAmount = productsItems.clientWidth * -1;
  productsItems.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

rightSlideBtn.addEventListener("click", () => {
  const productsItems = document.querySelector(".products-list");
  const scrollAmount = productsItems.clientWidth;
  productsItems.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

productsItems.addEventListener("scroll", () => {
  const maxScrollLeft = productsItems.scrollWidth - productsItems.clientWidth;
  leftSlideBtn.style.display = productsItems.scrollLeft <= 0 ? "none" : "block";
  rightSlideBtn.style.display =
    Math.ceil(productsItems.scrollLeft) >= maxScrollLeft ? "none" : "block";
  // console.log(productsItems.scrollLeft, maxScrollLeft);
});
