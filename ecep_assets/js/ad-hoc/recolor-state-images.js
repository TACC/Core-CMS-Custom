const imgs = document.querySelectorAll('img[src*="ecep_states_"][src$=".jpg"]');

const targetR = 77, targetG = 0, targetB = 140; // #4D008C

function recolor(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (r > 200 && g > 200 && b > 200) continue;
    if (a < 200) continue;
    data[i]   = targetR;
    data[i+1] = targetG;
    data[i+2] = targetB;
  }

  ctx.putImageData(imageData, 0, 0);

  canvas.style.cssText = img.style.cssText;
  if (!canvas.style.width && !canvas.style.height) {
    canvas.style.width = img.offsetWidth + 'px';
    canvas.style.height = img.offsetHeight + 'px';
  }

  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity 0.4s ease';

  img.replaceWith(canvas);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });
  });
}

imgs.forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    recolor(img);
  } else {
    img.addEventListener('load', () => recolor(img));
  }
});
