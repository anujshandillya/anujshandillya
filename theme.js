(function () {
    const storageKey = 'preferred-theme';
    const root = document.documentElement;
    let savedTheme;

    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (_) {}

    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : (systemPrefersDark ? 'dark' : 'light');

    function updateButton(button) {
        const isDark = root.dataset.theme === 'dark';
        button.setAttribute('aria-pressed', String(isDark));
        button.textContent = isDark ? 'Light mode' : 'Dark mode';
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        updateButton(button);
        button.addEventListener('click', function () {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            updateButton(button);
            try {
                localStorage.setItem(storageKey, root.dataset.theme);
            } catch (_) {}
        });
    });
})();
