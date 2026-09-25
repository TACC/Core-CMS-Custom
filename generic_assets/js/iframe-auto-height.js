const BUFFER_TO_AVOID_SCROLLBAR = 1;
const LOG_PREFIX = 'iframe-auto-height:';

function setIframeHeight(iframe, height) {
  const parsed = Number(height);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return;
  }
  iframe.style.height = parsed + BUFFER_TO_AVOID_SCROLLBAR + 'px';
}

function resizeIframe(iframe) {
  try {
    const scrollHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    setIframeHeight(iframe, scrollHeight);
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
const knownIframes = allIframes.length > 1
  ? allIframes.filter((iframe) => iframe.classList.contains('js-iframe-auto-height'))
  : allIframes;

const debouncedResizers = knownIframes.map(autoHeight);

function resizeAll() {
  debouncedResizers.forEach((fn) => fn());
}

function isPostMessageFromKnownIframe(messageSource) {
  return knownIframes.some((iframe) => iframe.contentWindow === messageSource);
}

// Catching local events to trigger iframe resize.
window.addEventListener('resize', resizeAll);
window.addEventListener('load', resizeAll);
//window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

// Events bubbling up from Dash app to trigger iframe resize.
window.addEventListener('IFrameInit', resizeAll);
window.addEventListener('IFrameLoaded', resizeAll);

// To let cross-domain origins trigger resize.
/**
 * @param {MessageEvent<{ type: 'IFrameInit' | 'IFrameLoaded', height?: number }>} event
 */
function handleIframePostMessage(event) {
  if (!isPostMessageFromKnownIframe(event.source)) {
    return;
  }

  const data = event.data;
  if (!data || typeof data !== 'object') {
    console.warn(`${LOG_PREFIX} postMessage data missing or not an object`, data);
    return;
  }

  const type = data.type;
  if (type !== 'IFrameInit' && type !== 'IFrameLoaded') {
    console.warn(`${LOG_PREFIX} unfamiliar postMessage type`, type);
    return;
  }

  for (const iframe of knownIframes) {
    if (iframe.contentWindow !== event.source) {
      continue;
    }

    if (data.height != null) {
      setIframeHeight(iframe, data.height);
    } else {
      resizeIframe(iframe);
    }
    return;
  }
}
window.addEventListener('message', handleIframePostMessage);
