const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const homeLogo = document.getElementById("homeLogo");
const viewButtons = document.querySelectorAll(".view-product");
const productModal = document.getElementById("productModal");
const productModalBackdrop = document.getElementById("productModalBackdrop");
const productModalClose = document.getElementById("productModalClose");
const productModalKicker = document.getElementById("productModalKicker");
const productModalTitle = document.getElementById("productModalTitle");
const productModalPrice = document.getElementById("productModalPrice");
const productModalCopy = document.getElementById("productModalCopy");
const productModalFeatures = document.getElementById("productModalFeatures");
const faqQuestions = document.querySelectorAll(".faq-question");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const yearEl = document.getElementById("year");

const productsInfo = {
	"Poster Street Trap Edition": {
		kicker: "Top Seller",
		price: "$1.0099",
		description:
			"Poster urbano en alta calidad para decorar tu estudio, cuarto o setup musical.",
		features: [
			"Impresion premium en color",
			"Tamano ideal para pared",
			"Diseno street exclusivo",
		],
	},
	"Oversize Hoodie 808 Edition": {
		kicker: "Nuevo",
		price: "$65",
		description:
			"Hoodie premium con corte oversize, textura suave y estampado 808 reflectivo.",
		features: ["Algodon pesado premium", "Diseno unisex", "Estilo trap nocturno"],
	},
};

if (menuToggle && navLinks) {
	menuToggle.addEventListener("click", () => {
		const isOpen = navLinks.classList.toggle("show");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});

	navLinks.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("show");
			menuToggle.setAttribute("aria-expanded", "false");
		});
	});
}

if (homeLogo) {
	homeLogo.addEventListener("click", (event) => {
		event.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (navLinks && menuToggle) {
			navLinks.classList.remove("show");
			menuToggle.setAttribute("aria-expanded", "false");
		}
	});
}

const closeProductModal = () => {
	if (!productModal) {
		return;
	}

	productModal.classList.remove("is-open");
	productModal.setAttribute("aria-hidden", "true");
	document.body.classList.remove("modal-open");
};

const openProductModal = (name) => {
	if (
		!productModal ||
		!productModalKicker ||
		!productModalTitle ||
		!productModalPrice ||
		!productModalCopy ||
		!productModalFeatures
	) {
		return;
	}

	const selectedProduct = productsInfo[name];
	if (!selectedProduct) {
		return;
	}

	productModalKicker.textContent = selectedProduct.kicker;
	productModalTitle.textContent = name;
	productModalPrice.textContent = selectedProduct.price;
	productModalCopy.textContent = selectedProduct.description;
	productModalFeatures.innerHTML = selectedProduct.features
		.map((feature) => `<li>${feature}</li>`)
		.join("");

	productModal.classList.add("is-open");
	productModal.setAttribute("aria-hidden", "false");
	document.body.classList.add("modal-open");
};

viewButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const productName = button.dataset.product;
		if (!productName) {
			return;
		}

		openProductModal(productName);
	});
});

if (productModalClose) {
	productModalClose.addEventListener("click", closeProductModal);
}

if (productModalBackdrop) {
	productModalBackdrop.addEventListener("click", closeProductModal);
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeProductModal();
	}
});

faqQuestions.forEach((question) => {
	question.addEventListener("click", () => {
		const item = question.closest(".faq-item");
		if (!item) {
			return;
		}

		const isOpen = item.classList.toggle("open");
		question.setAttribute("aria-expanded", String(isOpen));
	});
});

if (contactForm) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		formMessage.textContent = "Mensaje enviado. Te respondemos en breve.";
		contactForm.reset();

		setTimeout(() => {
			formMessage.textContent = "";
		}, 2800);
	});
}

if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}
