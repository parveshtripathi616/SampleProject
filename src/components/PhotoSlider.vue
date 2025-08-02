<template>
  <div class="photo-slider">
    <!-- Main slider container -->
    <div class="slider-container">
      <div class="image-container" @click="openZoom(currentIndex)">
        <img 
          :src="photos[currentIndex]" 
          :alt="`Photo ${currentIndex + 1}`"
          class="main-image"
          @load="handleImageLoad"
        />
      </div>
      
      <!-- Navigation arrows -->
      <button 
        class="nav-btn nav-btn-left" 
        @click="previousImage"
        :disabled="photos.length <= 1"
      >
        ❮
      </button>
      <button 
        class="nav-btn nav-btn-right" 
        @click="nextImage"
        :disabled="photos.length <= 1"
      >
        ❯
      </button>
      
      <!-- Dots indicator -->
      <div class="dots-container" v-if="photos.length > 1">
        <span 
          v-for="(photo, index) in photos" 
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToImage(index)"
        ></span>
      </div>
      
      <!-- Image counter -->
      <div class="image-counter">
        {{ currentIndex + 1 }} / {{ photos.length }}
      </div>
    </div>

    <!-- Zoom Modal -->
    <div v-if="isZoomed" class="zoom-modal" @click="closeZoom">
      <div class="zoom-container">
        <img 
          :src="photos[zoomedIndex]" 
          :alt="`Photo ${zoomedIndex + 1}`"
          class="zoomed-image"
          @click.stop
          @wheel="handleZoom"
          :style="{ transform: `scale(${zoomLevel})` }"
          ref="zoomedImg"
        />
        
        <!-- Zoom navigation -->
        <button 
          class="zoom-nav zoom-nav-left" 
          @click.stop="previousZoomedImage"
          v-if="photos.length > 1"
        >
          ❮
        </button>
        <button 
          class="zoom-nav zoom-nav-right" 
          @click.stop="nextZoomedImage"
          v-if="photos.length > 1"
        >
          ❯
        </button>
        
        <!-- Close button -->
        <button class="close-btn" @click="closeZoom">✕</button>
        
        <!-- Zoom controls -->
        <div class="zoom-controls">
          <button @click="zoomIn">+</button>
          <span>{{ Math.round(zoomLevel * 100) }}%</span>
          <button @click="zoomOut">-</button>
          <button @click="resetZoom">Reset</button>
        </div>
        
        <!-- Zoom counter -->
        <div class="zoom-counter">
          {{ zoomedIndex + 1 }} / {{ photos.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoSlider',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0,
      isZoomed: false,
      zoomedIndex: 0,
      zoomLevel: 1,
      photos: [
        // Sample placeholder images - replace with your actual images
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=6',
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=8',
      ]
    }
  },
  mounted() {
    // Use provided images if available, otherwise use default
    if (this.images && this.images.length > 0) {
      this.photos = this.images
    }
    
    // Add keyboard event listeners
    window.addEventListener('keydown', this.handleKeypress)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeypress)
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length
    },
    previousImage() {
      this.currentIndex = this.currentIndex === 0 ? this.photos.length - 1 : this.currentIndex - 1
    },
    goToImage(index) {
      this.currentIndex = index
    },
    openZoom(index) {
      this.isZoomed = true
      this.zoomedIndex = index
      this.zoomLevel = 1
      document.body.style.overflow = 'hidden'
    },
    closeZoom() {
      this.isZoomed = false
      this.zoomLevel = 1
      document.body.style.overflow = 'auto'
    },
    nextZoomedImage() {
      this.zoomedIndex = (this.zoomedIndex + 1) % this.photos.length
      this.zoomLevel = 1
    },
    previousZoomedImage() {
      this.zoomedIndex = this.zoomedIndex === 0 ? this.photos.length - 1 : this.zoomedIndex - 1
      this.zoomLevel = 1
    },
    handleZoom(event) {
      event.preventDefault()
      const delta = event.deltaY
      if (delta < 0) {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    },
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 0.2, 3)
    },
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.5)
    },
    resetZoom() {
      this.zoomLevel = 1
    },
    handleImageLoad() {
      // Image loaded successfully
    },
    handleKeypress(event) {
      if (this.isZoomed) {
        switch(event.key) {
          case 'Escape':
            this.closeZoom()
            break
          case 'ArrowLeft':
            this.previousZoomedImage()
            break
          case 'ArrowRight':
            this.nextZoomedImage()
            break
          case '+':
          case '=':
            this.zoomIn()
            break
          case '-':
            this.zoomOut()
            break
          case '0':
            this.resetZoom()
            break
        }
      } else {
        switch(event.key) {
          case 'ArrowLeft':
            this.previousImage()
            break
          case 'ArrowRight':
            this.nextImage()
            break
        }
      }
    }
  }
}
</script>

<style scoped>
.photo-slider {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.slider-container {
  position: relative;
  width: 100%;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.main-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

/* Navigation Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn-left {
  left: 15px;
}

.nav-btn-right {
  right: 15px;
}

/* Dots Indicator */
.dots-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Image Counter */
.image-counter {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

/* Zoom Modal */
.zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.zoom-container {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoomed-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: grab;
  transition: transform 0.3s ease;
}

.zoomed-image:active {
  cursor: grabbing;
}

/* Zoom Navigation */
.zoom-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.zoom-nav:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.zoom-nav-left {
  left: 20px;
}

.zoom-nav-right {
  right: 20px;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: white;
  transform: scale(1.1);
}

/* Zoom Controls */
.zoom-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 25px;
}

.zoom-controls button {
  background: #333;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.zoom-controls button:hover {
  background: #555;
  transform: scale(1.1);
}

.zoom-controls span {
  color: #333;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
}

/* Zoom Counter */
.zoom-counter {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .image-container {
    height: 300px;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .zoom-nav {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .zoom-nav-left {
    left: 10px;
  }
  
  .zoom-nav-right {
    right: 10px;
  }
  
  .zoom-controls {
    bottom: 10px;
    padding: 8px 12px;
  }
  
  .zoom-controls button {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .image-container {
    height: 250px;
  }
  
  .dots-container {
    bottom: 10px;
  }
  
  .dot {
    width: 10px;
    height: 10px;
  }
}
</style>