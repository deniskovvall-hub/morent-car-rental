document.addEventListener("click", (event) => {
  const likeBtn = event.target.closest(".popular-card__like");
  if (!likeBtn) return;

  const isActive = likeBtn.classList.toggle("popular-card__like--active");
  likeBtn.setAttribute("aria-pressed", String(isActive));
  likeBtn.setAttribute(
    "aria-label",
    isActive ? "Remove from favorites" : "Add to favorites"
  );
});
