const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
	const track = carousel.querySelector(".carousel__track");
	const prev = carousel.querySelector("[data-dir='prev']");
	const next = carousel.querySelector("[data-dir='next']");

	if (!track || !prev || !next) {
		return;
	}

	const scrollAmount = () => Math.max(240, track.clientWidth * 0.7);
	const maxScrollLeft = () => Math.max(0, track.scrollWidth - track.clientWidth);

	const updateControls = () => {
		const max = maxScrollLeft();
		if (max <= 4) {
			prev.disabled = true;
			next.disabled = true;
			return;
		}

		prev.disabled = track.scrollLeft <= 4;
		next.disabled = track.scrollLeft >= max - 4;
	};

	prev.addEventListener("click", () => {
		track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
	});

	next.addEventListener("click", () => {
		track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
	});

	track.addEventListener("scroll", updateControls, { passive: true });
	window.addEventListener("resize", updateControls);
	updateControls();
});

const revealItems = document.querySelectorAll(".reveal-up");
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				revealObserver.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.17,
	}
);

revealItems.forEach((item, index) => {
	item.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
	revealObserver.observe(item);
});
