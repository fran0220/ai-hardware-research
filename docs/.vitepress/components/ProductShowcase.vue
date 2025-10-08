<template>
  <div class="product-showcase">
    <div class="product-image-container">
      <img 
        :src="imageSrc" 
        :alt="productName" 
        class="product-image"
        @error="handleImageError"
      />
    </div>
    <div class="product-info">
      <h4 class="product-title">{{ productName }}</h4>
      <p class="product-subtitle">{{ productDescription }}</p>
      <div class="product-links">
        <a 
          v-if="officialWebsite" 
          :href="officialWebsite" 
          target="_blank" 
          rel="noopener noreferrer"
          class="product-link secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6V8H5V19H16V14H18V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H10ZM21 3V11H19V6.41L9.41 16L8 14.59L17.59 5H13V3H21Z"/>
          </svg>
          官网
        </a>
        <a 
          v-if="videos && videos.length > 0" 
          href="#" 
          @click.prevent="showVideos = !showVideos"
          class="product-link"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5V19L19 12L8 5Z"/>
          </svg>
          视频演示 ({{ videos.length }})
        </a>
      </div>
      <p v-if="imageSource" class="image-source">
        图片来源: <a :href="imageSourceUrl" target="_blank" rel="noopener noreferrer">{{ imageSource }}</a>
      </p>
    </div>
  </div>

  <!-- 视频列表 -->
  <div v-if="showVideos && videos && videos.length > 0" class="video-list">
    <div v-for="(video, index) in videos" :key="index" class="video-item">
      <div class="video-thumbnail" @click="playVideo(video)">
        <img :src="getVideoThumbnail(video.url)" :alt="video.title" />
        <div class="video-play-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5V19L19 12L8 5Z"/>
          </svg>
        </div>
      </div>
      <div class="video-info">
        <h5 class="video-title">{{ video.title }}</h5>
        <span v-if="video.duration" class="video-duration">{{ video.duration }}</span>
      </div>
    </div>
  </div>

  <!-- 视频播放器模态框 -->
  <div v-if="currentVideo" class="video-modal" @click="closeVideo">
    <div class="video-modal-content" @click.stop>
      <button class="video-close" @click="closeVideo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
        </svg>
      </button>
      <div class="video-container">
        <iframe 
          :src="getEmbedUrl(currentVideo.url)" 
          :title="currentVideo.title"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    default: ''
  },
  imageSrc: {
    type: String,
    required: true
  },
  imageSource: {
    type: String,
    default: ''
  },
  imageSourceUrl: {
    type: String,
    default: ''
  },
  officialWebsite: {
    type: String,
    default: ''
  },
  videos: {
    type: Array,
    default: () => []
  }
})

const showVideos = ref(false)
const currentVideo = ref(null)

const handleImageError = (event) => {
  event.target.src = '/images/placeholder.jpg'
}

const getVideoThumbnail = (url) => {
  const videoId = extractVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/images/video-placeholder.jpg'
}

const extractVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

const getEmbedUrl = (url) => {
  const videoId = extractVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

const playVideo = (video) => {
  currentVideo.value = video
}

const closeVideo = () => {
  currentVideo.value = null
}
</script>

<style scoped>
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.video-modal-content {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
}

.video-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.video-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.video-modal .video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border-radius: 12px;
  overflow: hidden;
}

.video-modal .video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .video-modal {
    padding: 1rem;
  }
  
  .video-close {
    top: -30px;
  }
}
</style>
