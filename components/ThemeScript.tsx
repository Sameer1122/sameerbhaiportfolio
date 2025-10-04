// Injects a small inline script before hydration to set `data-theme`
// based on localStorage preference, avoiding a flash of the wrong theme.
export default function ThemeScript() {
  const code = `
    try {
      var t = localStorage.getItem('theme');
      var root = document.documentElement;
      if (t === 'light' || t === 'dark') {
        root.setAttribute('data-theme', t);
      } else {
        root.removeAttribute('data-theme');
      }
    } catch (_) {}
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
