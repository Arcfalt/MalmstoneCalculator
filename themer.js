function toTheme(toTheme) {
	document.documentElement.setAttribute('data-bs-theme', toTheme);
	localStorage.setItem("darkMode", toTheme);
}

window.addEventListener('DOMContentLoaded', () => {
	const useTheme = localStorage.getItem("darkMode");
	if (useTheme === 'dark') toTheme('dark');
	else if (useTheme === 'light') toTheme('light');
	else if (window.matchMedia('(prefers-color-scheme: dark)').matches) toTheme('dark');
});