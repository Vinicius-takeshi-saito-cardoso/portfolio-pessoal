const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const currentYear = document.querySelector("#current-year");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contact-form");

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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !message) {
    return;
  }

  const subject = encodeURIComponent(`Contato pelo portfólio - ${name}`);
  const body = encodeURIComponent(`${message}\n\nEmail para retorno: ${email}`);

  window.location.href = `mailto:viniciustsc2005@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});
