function setTheme(theme) {
	document.documentElement.setAttribute('data-bs-theme', theme);
	localStorage.setItem("darkMode", theme);
}
