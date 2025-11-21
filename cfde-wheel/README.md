# CFDE Navigation Wheel Bundle

This package builds a browser-ready bundle of the CFDE Navigation Wheel component that can be embedded in any website via HTML.

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

This creates a bundled JavaScript file at `cfde-wheel/dist/cfde-wheel.iife.js` that includes React, React DOM, and the CFDE Wheel component.

## Usage

### Basic HTML Embedding

Add this to your HTML page:

```html
<div id="cfde-nav-wheel"></div>
<script src="https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@main/cfde-wheel/dist/cfde-wheel.iife.js"></script>
```

The script will automatically initialize the wheel in the element with ID `cfde-nav-wheel`.

### Manual Initialization

If you want to initialize the wheel manually or use a different container:

```html
<div id="my-custom-container"></div>
<script src="https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@main/cfde-wheel/dist/cfde-wheel.iife.js"></script>
<script>
  // Initialize in a custom container
  window.CFDEWheel.init('my-custom-container');
  
  // Or pass the element directly
  const container = document.getElementById('my-custom-container');
  window.CFDEWheel.init(container);
</script>
```

### For Django CMS (Snippet)

Create a snippet with this HTML:

```html
<div id="cfde-nav-wheel" class="js-cfde-nav-wheel"></div>
<script src="https://cdn.jsdelivr.net/gh/TACC/Core-CMS-Custom@main/cfde-wheel/dist/cfde-wheel.iife.js"></script>
```

## Development

To preview locally:

```bash
npm run preview
```

## Notes

- The bundle includes React and React DOM, so you don't need to load them separately
- The bundle is self-contained and works in any browser that supports ES5+
- The default container ID is `cfde-nav-wheel`, but you can use any ID and initialize manually

