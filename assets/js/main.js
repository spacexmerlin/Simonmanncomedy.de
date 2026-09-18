// Forms have no backend wired up yet — prevent navigation and
// give the visitor a lightweight confirmation instead.
document.querySelectorAll("form[data-no-backend]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) {
      note.hidden = false;
    }
    form.reset();
  });
});

// Highlight the nav link for whichever section is currently in view.
const navLinks = document.querySelectorAll("[data-nav]");
const sections = document.querySelectorAll("main section[id]");

if (navLinks.length && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("data-nav") === entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
