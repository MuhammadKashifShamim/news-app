;(function initTheme() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-color-mode', 'dark')
} else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-color-mode', 'light')
}
  })()