function resizeIframe(iframe) {
  try {
    const scrollHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    const bufferToAvoidScrollbar = 1;
    iframe.style.height = scrollHeight + bufferToAvoidScrollbar + 'px';
  } catch (e) {
    // Cross-origin iframe; height can't be read, so leave it alone.
  }
}

/* to avoid both flicker effect and excessive calls when resizing iframe */
function debounce(fn, delay = 50) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function setupResizeObserver(iframe, debouncedResizeIframe) {
  try {
    const iframeContent = iframe.contentWindow.document;
    const resizeObserver = new ResizeObserver(debouncedResizeIframe);

    resizeObserver.observe(iframeContent.body);
    resizeIframe(iframe);
  } catch (e) {
    // Cross-origin iframe; nothing we can observe.
  }
}

function autoHeight(iframe) {
  const debouncedResizeIframe = debounce(() => resizeIframe(iframe));

  let isIframeLoaded = false;
  try {
    isIframeLoaded = (iframe.contentWindow.document.readyState === 'complete');
  } catch (e) {
    // Cross-origin iframe; fall back to the 'load' event below.
  }

  if (isIframeLoaded) {
    setupResizeObserver(iframe, debouncedResizeIframe);
  } else {
    iframe.addEventListener('load', () => setupResizeObserver(iframe, debouncedResizeIframe));
  }

  return debouncedResizeIframe;
}

/* Single iframe on the page: act on it automatically.
   Multiple iframes: only act on ones opted in via `js-iframe-auto-height`,
   so unrelated iframes/content on the page are left alone. */
const allIframes = Array.from(document.getElementsByTagName('iframe'));
const targetIframes = allIframes.length > 1
  ? allIframes.filter((iframe) => iframe.classList.contains('js-iframe-auto-height'))
  : allIframes;

const debouncedResizers = targetIframes.map(autoHeight);

function resizeAll() {
  debouncedResizers.forEach((fn) => fn());
}

// Catching local events to trigger iframe resize.
window.addEventListener('resize', resizeAll);
window.addEventListener('load', resizeAll);
//window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

// Events bubbling up from Dash app to trigger iframe resize.
window.addEventListener('IFrameInit', resizeAll);
window.addEventListener('IFrameLoaded', resizeAll);
