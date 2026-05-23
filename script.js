const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const currentYear = document.querySelector("#current-year");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  root.classList.add("dark");
}

currentYear.textContent = new Date().getFullYear();

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  const nextTheme = root.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = selectedFilter === "todos" || categories.includes(selectedFilter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});
