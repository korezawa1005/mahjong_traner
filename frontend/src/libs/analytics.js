let isInitialized = false;
let measurementIdCache;

const loadScript = (id) => {
  const existingScript = document.querySelector(`script[data-ga-id="${id}"]`);
  if (existingScript) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.setAttribute('data-ga-id', id);
  document.head.appendChild(script);
};

export const initAnalytics = (measurementId) => {
  if (!measurementId || typeof window === 'undefined' || isInitialized) {
    return;
  }

  loadScript(measurementId);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  measurementIdCache = measurementId;
  isInitialized = true;
};

export const trackPageView = (path) => {
  if (!isInitialized || !window.gtag || !measurementIdCache) return;
  window.gtag('event', 'page_view', { page_path: path });
};
