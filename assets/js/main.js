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

// Spotify TV: render the embed at its native 496x279 and scale it down to fit the
// screen, so the player UI keeps its proportions instead of reflowing bigger on phones.
const tvDisplay = document.querySelector(".tv-display");

if (tvDisplay) {
  const NATIVE_WIDTH = 496;
  const fitTv = () => {
    const scale = Math.min(1, tvDisplay.clientWidth / NATIVE_WIDTH);
    tvDisplay.style.setProperty("--tv-scale", scale);
  };

  tvDisplay.classList.add("is-scaled");
  fitTv();

  if ("ResizeObserver" in window) {
    new ResizeObserver(fitTv).observe(tvDisplay);
  } else {
    window.addEventListener("resize", fitTv);
  }
}
