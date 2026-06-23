// -------------- Media load fade --------------- //
// Progressive enhancement: content media (portfolio imagery, cover slideshow,
// profile photo) starts transparent and fades in once it has loaded AND decoded,
// so large images don't paint half-drawn. The hiding is gated on JS — CSS only
// makes media transparent when this class is present, so no-JS / JS-error users
// still see everything. Scoped to content media only, not UI icons or dividers.

(function () {
	function init() {
		document.documentElement.classList.add('media-fade-enabled');

		const reveal = el => el.classList.add('is-media-loaded');
		const fail = el => el.classList.add('is-media-error'); // reveal broken media instead of leaving it invisible

		function settleImage(img) {
			const show = () => {
				// decode() does the pixel work off the main thread for a jank-free fade.
				// It can reject (some formats) — reveal anyway so nothing stays hidden.
				if (img.decode) img.decode().then(() => reveal(img), () => reveal(img));
				else reveal(img);
			};
			if (img.complete && img.naturalWidth > 0) { show(); return; } // already cached: no load event fires
			if (img.complete) { fail(img); return; } // complete but no pixels = errored
			img.addEventListener('load', show, { once: true });
			img.addEventListener('error', () => fail(img), { once: true });
		}

		function settleVideo(video) {
			if (video.readyState >= 2) { reveal(video); return; } // HAVE_CURRENT_DATA or better
			video.addEventListener('loadeddata', () => reveal(video), { once: true });
			video.addEventListener('error', () => fail(video), { once: true });
		}

		// Content media only: cover slideshow, about profile photo, section photos,
		// and individual project gallery images. Excludes nav/theme/language/divider/
		// software icons and the signature mark (all use the icon toggle mechanism).
		const media = document.querySelectorAll(
			'.coverImage img, #imgContainer img, .sectionItem.image img, .projectImg'
		);
		media.forEach(el => (el.tagName === 'VIDEO' ? settleVideo : settleImage)(el));
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
	else init();
})();


// -------------- Lightmode & Darkmode --------------- //


const toggleDarkButtons = document.querySelectorAll('.darkModeToggle');

toggleDarkButtons.forEach(button => {
	button.addEventListener('click', () => {
		if (document.body.classList.contains('darkmode')) {
			document.body.classList.remove('darkmode');
			document.body.classList.add('lightmode');
			localStorage.setItem('theme', 'light');
		} else if (document.body.classList.contains('lightmode')) {
			document.body.classList.remove('lightmode');
			document.body.classList.add('darkmode');
			localStorage.setItem('theme', 'dark');
		} else {
			document.body.classList.add('darkmode'); // Default to darkmode
			localStorage.setItem('theme', 'dark');
		}
	});
});

const toggleLightButtons = document.querySelectorAll('.lightModeToggle');

toggleLightButtons.forEach(button => {
	button.addEventListener('click', () => {
		if (document.body.classList.contains('darkmode')) {
			document.body.classList.remove('darkmode');
			document.body.classList.add('lightmode');
			localStorage.setItem('theme', 'light');
		} else if (document.body.classList.contains('lightmode')) {
			document.body.classList.remove('lightmode');
			document.body.classList.add('darkmode');
			localStorage.setItem('theme', 'dark');
		} else {
			document.body.classList.add('lightmode'); // Default to lightmode
			localStorage.setItem('theme', 'light');
		}
	});
});

const savedTheme = localStorage.getItem('theme');
document.body.classList.remove('darkmode', 'lightmode');

if (savedTheme === 'dark') {
	document.body.classList.add('darkmode');
} else if (savedTheme === 'light') {
	document.body.classList.add('lightmode');
}


// -------- STICKY NAVBAR ----------- //


const mainNav = document.querySelector('.mainNav');
const hamIcon = document.querySelector('.hamIcon');
const hamburger = document.querySelector('.hamburger');
const threshold = window.innerHeight / 6;
console.log(threshold);

if (mainNav || hamIcon) {
	function handleScrolldown() {
		if (window.scrollY > threshold) {
			[mainNav, hamIcon, hamburger].forEach(el => el.classList.add('hidden'));
		}
		else {
			[mainNav, hamIcon, hamburger].forEach(el => el.classList.remove('hidden'));
		}
	}

	window.addEventListener('scroll', handleScrolldown);
	handleScrolldown();
}

// -------- rotating asterisks ----------- //


const asterisks = document.querySelectorAll('.asterisk');

asterisks.forEach(asterisk => {
	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;
		const angle = scrollY / 3; // 1 degree per 3 pixels scrolled
		asterisk.style.transform = `rotate(${angle}deg)`;
	});
});


// -------- dynamic headers ----------- //


function getNumberOfLines(element) {
	element.offsetHeight;
	const range = document.createRange();
	range.selectNodeContents(element); // Selects all content inside the .header element
	const rects = range.getClientRects(); // Gets rectangles for each line
	return rects.length; // Number of rectangles = number of lines
}

const headers = document.querySelectorAll('.header');

// Store original text content for each header to avoid cumulative errors
headers.forEach(header => {
	header.dataset.originalText = header.textContent.trim(); // Save original text
});

function logRects() {
	headers.forEach(header => {
		console.log(getNumberOfLines(header));
	})
};

function bracketManager() {
	headers.forEach(header => {
		const originalText = header.dataset.originalText;

		// Measure the braced string we actually intend to show, not the bare
		// word. The braces add width, so a word that fits on one line on its
		// own can still wrap once "{ ... }" is added (e.g. GASSICOURT on a
		// narrow mobile header squeezed between the two dividers). Testing the
		// braced text keeps the decoration only when "{ WORD }" truly fits on
		// one line, and falls back to the bare word otherwise — the same rule
		// multi-word headers already follow.
		header.textContent = `{ ${originalText} }`;

		if (getNumberOfLines(header) > 1) {
			header.textContent = originalText;
		}
	})
};

window.addEventListener('load', () => {
	bracketManager();
});

let resizeTimeout;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		bracketManager();
	}, 100);
});


// -------- .siContainer flip ----------- //


document.querySelectorAll('.siContainer').forEach(container => {
	container.addEventListener('click', () => {
		container.querySelector('.flipper').classList.toggle('flipped');
		container.classList.add('flipping');

		// Remove flipping class after transition ends
		setTimeout(() => {
			container.classList.remove('flipping');
		}, 1000);
	});
});