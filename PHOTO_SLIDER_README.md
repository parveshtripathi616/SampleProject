# Photo Slider Component

A fully featured Vue.js photo slider with zoom functionality, unlimited scrolling, and responsive design.

## Features

### 🖼️ Main Slider
- **Unlimited Photos**: Add as many photos as you want
- **Smooth Navigation**: Left/right arrow buttons for easy navigation
- **Circular Navigation**: Seamlessly loops from last to first image and vice versa
- **Click to Zoom**: Click any image to open zoom view
- **Dot Indicators**: Visual indicators showing current position
- **Image Counter**: Shows current image number (e.g., "3 / 8")
- **Hover Effects**: Subtle scaling effect on hover

### 🔍 Zoom Modal
- **Full-Screen Zoom**: Click any image to open in full-screen zoom mode
- **Mouse Wheel Zoom**: Use mouse wheel to zoom in/out (50% to 300%)
- **Zoom Controls**: +/- buttons and reset button
- **Zoom Percentage**: Shows current zoom level
- **Navigation in Zoom**: Navigate between images while zoomed
- **Keyboard Support**: Full keyboard navigation support

### ⌨️ Keyboard Controls

#### Main Slider
- `←` / `→` Arrow keys: Navigate between images

#### Zoom Mode
- `Escape`: Close zoom view
- `←` / `→` Arrow keys: Navigate between images
- `+` / `=`: Zoom in
- `-`: Zoom out
- `0`: Reset zoom to 100%

### 📱 Mobile Responsive
- Optimized for mobile devices
- Touch-friendly controls
- Responsive image sizing
- Adjusted button sizes for mobile

## Usage

### Basic Implementation

```vue
<template>
  <div>
    <PhotoSlider />
  </div>
</template>

<script>
import PhotoSlider from '@/components/PhotoSlider.vue'

export default {
  components: {
    PhotoSlider
  }
}
</script>
```

### Custom Images

You can pass your own images using the `images` prop:

```vue
<template>
  <div>
    <PhotoSlider :images="myImages" />
  </div>
</template>

<script>
import PhotoSlider from '@/components/PhotoSlider.vue'

export default {
  components: {
    PhotoSlider
  },
  data() {
    return {
      myImages: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
        // Add more images...
      ]
    }
  }
}
</script>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array | `[]` | Array of image URLs. If not provided, uses sample images from Picsum |

## Default Images

If no images are provided, the component uses sample images from [Picsum Photos](https://picsum.photos/) for demonstration purposes. In production, replace these with your actual images.

## Customization

### Styling

The component uses scoped CSS with CSS custom properties for easy customization. You can override styles by targeting the component classes:

```css
/* Custom slider height */
.photo-slider .image-container {
  height: 400px;
}

/* Custom navigation button styling */
.photo-slider .nav-btn {
  background: rgba(255, 255, 255, 0.8);
  color: #333;
}

/* Custom zoom controls */
.photo-slider .zoom-controls {
  background: rgba(0, 0, 0, 0.8);
}
```

### Component Structure

```
PhotoSlider.vue
├── Main Slider Container
│   ├── Image Container (clickable)
│   ├── Navigation Buttons (left/right)
│   ├── Dot Indicators
│   └── Image Counter
└── Zoom Modal (conditional)
    ├── Zoomed Image
    ├── Zoom Navigation Buttons
    ├── Close Button
    ├── Zoom Controls (+/- buttons)
    └── Zoom Counter
```

## Browser Support

- Modern browsers with ES6+ support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- Images are loaded on-demand
- Smooth transitions using CSS transforms
- Optimized for mobile devices
- Minimal re-renders using Vue 3 reactive system

## Installation and Setup

1. Copy `PhotoSlider.vue` to your components directory
2. Import and use in any Vue component
3. Optionally provide custom images via the `images` prop
4. Enjoy your photo slider!

## Example Implementation

The component is already integrated into the Home view (`src/views/Home.vue`) and ready to use. Visit the home page to see it in action!