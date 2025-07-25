// src/registerServiceWorker.ts
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        registration => {
          console.log('SW registered: ', registration);
        },
        err => {
          console.error('SW registration failed: ', err);
        }
      );
    });
  }
}

