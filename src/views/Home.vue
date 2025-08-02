<template>
  <div class="home">
    <h1>Photo Gallery Slider</h1>
    <p>Click on any image to zoom in, use arrow keys or buttons to navigate</p>
    <PhotoSlider />
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoSlider from '@/components/PhotoSlider.vue'

export default {
  name: 'Home',
  components: {
    PhotoSlider
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 16px;
}
</style>
