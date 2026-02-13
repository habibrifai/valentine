<template>
  <div class="valentine-container">
    <div class="floating-hearts">
      <div v-for="n in 15" :key="n" class="heart" :style="getHeartStyle()"></div>
    </div>
    
    <!-- Card awal -->
    <div class="card" v-if="!isOpened">
      <div class="card-front" @click="openCard">
        <div class="envelope">
          <div class="envelope-flap"></div>
          <div class="heart-icon">❤️</div>
          <p class="tap-text">Klik untuk membuka</p>
        </div>
      </div>
    </div>
    
    <!-- Fullscreen content -->
    <div class="fullscreen-content" v-if="isOpened">
      <button class="close-btn" @click="closeCard">✕</button>
      
      <!-- Music Control Button -->
      <button class="music-btn" @click="toggleMusic" :class="{ playing: isMusicPlaying }">
        {{ isMusicPlaying ? '🎵' : '🎶' }}
      </button>
      
      <div class="content">
        <h1 class="title">Selamat Hari Valentine Regita Cahyani Cantik</h1>
        
        <div class="message">
          <p class="love-text">Untuk orang terkasihku,</p>
          <p class="main-message">
            Di hari Valentine ini, aku ingin mengucapkan betapa berartinya kamu dalam hidupku. 
            Setiap saat bersamamu adalah hadiah yang tak ternilai.
          </p>
          <p class="main-message">
            Kamu adalah cahaya dalam hariku, senyum yang membuatku bahagia, 
            dan cinta yang mengisi hatiku dengan kehangatan.
          </p>
          <p class="main-message">
            Terima kasih sudah menjadi bagian dari hidupku. 
            Aku mencintaimu lebih dari kata-kata bisa ungkapkan.
          </p>
          
          <!-- Kalimat romantis tambahan untuk fullscreen -->
          <div class="extra-messages">
            <!-- <p class="romantic-quote">"Cinta adalah ketika kamu bahagia melihatnya bahagia, bahkan jika bukan bersamamu."</p> -->
            <p class="romantic-quote">"Dalam setiap detik bersamamu, aku menemukan alasan untuk tersenyum."</p>
            <p class="romantic-quote">"Kamu adalah impian yang tidak pernah aku pikir akan menjadi nyata."</p>
            <p class="romantic-quote">"Hari Valentine hanyalah tanggal, tapi cintaku untukmu abadi selamanya."</p>
          </div>
          
          <!-- Foto Carousel -->
          <div class="photo-carousel">
            <h3 class="carousel-title">Momen-momen Indah Kita 💕</h3>
            
            <!-- Floating Hearts di Carousel -->
            <div class="carousel-hearts">
              <div v-for="n in 8" :key="n" class="carousel-heart" :style="getCarouselHeartStyle()"></div>
            </div>
            
            <div class="carousel-container">
              <button class="carousel-btn prev-btn" @click="prevPhoto">‹</button>
              <div class="carousel-viewport" 
                 @mouseenter="stopAutoSlide"
                 @mouseleave="startAutoSlide">
                <div class="carousel-track" :style="carouselStyle">
                  <div v-for="(photo, index) in photos" :key="index" class="carousel-slide" :class="{ active: currentPhotoIndex === index }">
                    <div class="photo-frame">
                      <img :src="photo" :alt="`photo (${index + 1})`" class="carousel-image" />
                      <div class="photo-overlay">
                        <span class="photo-number">❤️ ❤️ ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-btn next-btn" @click="nextPhoto">›</button>
            </div>
            
            <!-- Love Quote untuk foto aktif -->
            <div class="photo-love-quote">
              <p class="love-quote-text">{{ getCurrentLoveQuote() }}</p>
            </div>
            
            <div class="carousel-indicators">
              <span 
                v-for="(photo, index) in photos" 
                :key="index" 
                class="indicator"
                :class="{ active: currentPhotoIndex === index }"
                @click="goToPhoto(index)"
              ></span>
            </div>
          </div>
          
          <div class="love-question">
            <p class="question-text">Kamu pasti sayang banget kan sama aku? 😊</p>
            <div class="answer-buttons">
              <button class="btn-yes" @click="sayYes">Ya ❤️</button>
              <button class="btn-no" @click="moveNo" @mouseenter="moveNo">Enggak</button>
            </div>
          </div>
          
          <!-- <p class="signature">Aku juga sayang sama kamu ❤️</p> -->
        </div>
        
        <div v-if="loveMessage" class="love-response">
          <p>{{ loveMessage }}</p>
        </div>
      </div>
    </div>
    
    <div class="background-animation">
      <div class="sparkle" v-for="n in 20" :key="n" :style="getSparkleStyle()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValentineCard',
  data() {
    return {
      isOpened: false,
      loveMessage: '',
      loveMessages: [
        'Aku juga mencintaimu! ❤️',
        'Kamu adalah segalanya untukku!',
        'Senyummu adalah surga untukku!',
        'Bersamamu, setiap hari adalah Valentine!',
        'Cintaku untukmu takkan pernah pudar!'
      ],
      noButtonPosition: { x: 0, y: 0 },
      yesAnswered: false,
      whooshSound: null,
      // Background music
      backgroundMusic: null,
      isMusicPlaying: false,
      musicVolume: 0.3,
      // Auto-slide carousel
      autoSlideInterval: null,
      autoSlideDelay: 3000, // 1 detik
      // Carousel data
      currentPhotoIndex: 0,
      photoLoveQuotes: [
        "Setiap foto bersamamu adalah kenangan indah yang tak terlupakan 💕",
        "Senyummu adalah alasan aku bahagia dalam setiap momen ini 😊",
        "Bersamamu, setiap detak jantungku berbunyi namamu ❤️",
        "Kamu adalah foto terindah dalam album hidupku 📸",
        "Cinta kita seperti foto ini - abadi dan selalu indah ✨",
        "Setiap glance ke foto ini membuatku jatuh cinta lagi 💝",
        "Kamu adalah lukisan terindah yang Tuhan berikan untukku 🎨",
        "Dalam setiap foto, aku menemukan cinta yang tulus 💖",
        "Bersamamu, setiap momen adalah Valentine yang sempurna 🌹",
        "Foto ini adalah bukti bahwa cinta kita nyata dan nyata 💑"
      ],
      photos: [
        '/img/photo (1).jpg',
        '/img/photo (2).jpg',
        '/img/photo (3).jpg',
        '/img/photo (4).jpg',
        '/img/photo (5).jpg',
        '/img/photo (6).jpg',
        '/img/photo (7).jpg',
        '/img/photo (8).jpg',
        '/img/photo (9).jpg',
        '/img/photo (10).jpg',
        '/img/photo (11).jpg',
        '/img/photo (12).jpg',
        '/img/photo (13).jpg',
        '/img/photo (14).jpg',
        '/img/photo (15).jpg',
        '/img/photo (16).jpg',
        '/img/photo (17).jpg',
        '/img/photo (18).jpg',
        '/img/photo (19).jpg',
        '/img/photo (20).jpg',
        '/img/photo (21).jpg',
        '/img/photo (22).jpg',
        '/img/photo (23).jpg',
        '/img/photo (24).jpg',
        '/img/photo (25).jpg',
        '/img/photo (26).jpg',
        '/img/photo (27).jpg',
        '/img/photo (28).jpg',
        '/img/photo (29).jpg',
        '/img/photo (30).jpg',
        '/img/photo (31).jpg',
        '/img/photo (32).jpg',
        '/img/photo (33).jpg',
        '/img/photo (34).jpg',
        '/img/photo (35).jpg',
        '/img/photo (36).jpg',
        '/img/photo (37).jpg',
        '/img/photo (38).jpg',
        '/img/photo (39).jpg',
        '/img/photo (40).jpg',
        '/img/photo (41).jpg',
        '/img/photo (42).jpg',
        '/img/photo (43).jpg',
        '/img/photo (44).jpg',
        '/img/photo (45).jpg',
        '/img/photo (46).jpg',
        '/img/photo (47).jpg',
        '/img/photo (48).jpg',
        '/img/photo (49).jpg',
        '/img/photo (50).jpg',
        '/img/photo (51).jpg',
        '/img/photo (52).jpg',
        '/img/photo (53).jpg',
        '/img/photo (54).jpg',
        '/img/photo (55).jpg',
        '/img/photo (56).jpg',
        '/img/photo (57).jpg',
        '/img/photo (58).jpg',
        '/img/photo (59).jpg',
        '/img/photo (60).jpg',
        '/img/photo (61).jpg',
        '/img/photo (62).jpg',
        '/img/photo (63).jpg',
        '/img/photo (64).jpg',
        '/img/photo (65).jpg',
        '/img/photo (66).jpg',
        '/img/photo (67).jpg',
        '/img/photo (68).jpg',
        '/img/photo (69).jpg',
        '/img/photo (70).jpg',
        '/img/photo (71).jpg',
        '/img/photo (72).jpg',
        '/img/photo (73).jpg',
        '/img/photo (74).jpg',
        '/img/photo (75).jpg',
        '/img/photo (76).jpg',
        '/img/photo (77).jpg',
        '/img/photo (78).jpg',
        '/img/photo (79).jpg',
        '/img/photo (80).jpg',
        '/img/photo (81).jpg',
        '/img/photo (82).jpg',
        '/img/photo (83).jpg',
        '/img/photo (84).jpg',
        '/img/photo (85).jpg',
        '/img/photo (86).jpg',
        '/img/photo (87).jpg',
        '/img/photo (88).jpg',
        '/img/photo (89).jpg',
        '/img/photo (90).jpg',
        '/img/photo (91).jpg',
        '/img/photo (92).jpg',
        '/img/photo (93).jpg',
        '/img/photo (94).jpg',
        '/img/photo (95).jpg',
        '/img/photo (96).jpg',
        '/img/photo (97).jpg',
        '/img/photo (98).jpg',
        '/img/photo (99).jpg',
        '/img/photo (100).jpg',
        '/img/photo (101).jpg',
        '/img/photo (102).jpg',
        '/img/photo (103).jpg',
        '/img/photo (104).jpg',
        '/img/photo (105).jpg',
        '/img/photo (106).jpg',
        '/img/photo (107).jpg',
        '/img/photo (108).jpg',
        '/img/photo (109).jpg',
        '/img/photo (110).jpg',
        '/img/photo (111).jpg',
        '/img/photo (112).jpg'
      ]
    }
  },
  computed: {
    carouselStyle() {
      const slideWidth = 295; // 280px + 15px gap
      const viewportWidth = window.innerWidth || 1200; // Full viewport width
      const centerOffset = viewportWidth / 2 - slideWidth / 2
      const offset = -(this.currentPhotoIndex * slideWidth) + centerOffset
      
      return {
        transform: `translateX(${offset}px)`,
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  mounted() {
    // Create audio element for "eitss" sound effect - menggunakan audio sederhana
    this.whooshSound = new Audio()
    this.whooshSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Gy/DaizsKGGS57OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
    this.whooshSound.volume = 0.5
    this.whooshSound.preload = 'auto'
    
    // Add window resize listener
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // Remove window resize listener
    window.removeEventListener('resize', this.handleResize)
    
    // Cleanup music
    if (this.backgroundMusic) {
      this.backgroundMusic.pause()
      this.backgroundMusic = null
    }
    
    // Cleanup auto-slide
    this.stopAutoSlide()
  },
  methods: {
    openCard() {
      this.isOpened = true
      // Start music when card opens
      this.initBackgroundMusic()
      // Start auto-slide carousel
      this.startAutoSlide()
    },
    closeCard() {
      this.isOpened = false
      // Stop auto-slide when card closes
      this.stopAutoSlide()
    },
    // Carousel methods
    nextPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length
    },
    prevPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length
    },
    goToPhoto(index) {
      this.currentPhotoIndex = index
    },
    // Auto-slide methods
    startAutoSlide() {
      // Clear existing interval
      this.stopAutoSlide()
      
      // Start new interval
      this.autoSlideInterval = setInterval(() => {
        this.nextPhoto()
      }, this.autoSlideDelay)
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval)
        this.autoSlideInterval = null
      }
    },
    handleResize() {
      // Force recompute of carouselStyle by updating a reactive property
      this.$forceUpdate()
    },
    // Carousel romantic methods
    getCurrentLoveQuote() {
      const quoteIndex = this.currentPhotoIndex % this.photoLoveQuotes.length
      return this.photoLoveQuotes[quoteIndex]
    },
    getCarouselHeartStyle() {
      return {
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 2 + 2) + 's',
        fontSize: (Math.random() * 10 + 15) + 'px'
      }
    },
    // Music control methods
    initBackgroundMusic() {
      // Beautiful in White by Westlife
      // Note: You need to add the actual audio file to public/music/beautiful-in-white.mp3
      if (this.backgroundMusic) {
        // Already initialized, just try to play
        this.backgroundMusic.play().then(() => {
          this.isMusicPlaying = true
        }).catch(error => {
          console.log('Auto-play blocked, user needs to click play button:', error)
        })
        return
      }
      
      this.backgroundMusic = new Audio()
      this.backgroundMusic.src = '/music/beautiful-in-white.mp3'
      this.backgroundMusic.volume = this.musicVolume
      this.backgroundMusic.loop = true
      this.backgroundMusic.preload = 'auto'
      
      // Try to auto-play when card opens
      this.backgroundMusic.play().then(() => {
        this.isMusicPlaying = true
        console.log('Music started automatically')
      }).catch(error => {
        console.log('Auto-play blocked, user needs to click play button:', error)
        // Don't show alert immediately, let user click the button
      })
    },
    toggleMusic() {
      if (!this.backgroundMusic) {
        this.initBackgroundMusic()
        return
      }
      
      if (this.isMusicPlaying) {
        this.backgroundMusic.pause()
        this.isMusicPlaying = false
      } else {
        this.backgroundMusic.play().then(() => {
          this.isMusicPlaying = true
        }).catch(error => {
          console.log('Music play failed:', error)
          alert('Please add the music file "beautiful-in-white.mp3" to the public/music folder')
        })
      }
    },
    // showLove() {
    //   const randomIndex = Math.floor(Math.random() * this.loveMessages.length)
    //   this.loveMessage = this.loveMessages[randomIndex]
      
    //   setTimeout(() => {
    //     this.loveMessage = ''
    //   }, 3000)
    // },
    sayYes() {
      this.yesAnswered = true
      this.loveMessage = 'Aku juga sayang kamu! ❤️❤️❤️'
      
      setTimeout(() => {
        this.loveMessage = ''
      }, 5000)
    },
    moveNo(event) {
      event.preventDefault()
      event.stopPropagation()
      
      // Play "eitss" sound effect
      if (this.whooshSound) {
        // Reset dan play audio
        this.whooshSound.currentTime = 0
        
        // Coba mainkan audio
        const playPromise = this.whooshSound.play()
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Audio played successfully')
          }).catch(error => {
            console.log('Audio play failed, trying lucu sound...')
            // Buat efek suara lucu sebagai fallback
            this.createBeepSound()
          })
        }
      }
      
      const button = event.target
      const container = button.closest('.answer-buttons')
      const containerRect = container.getBoundingClientRect()
      
      // Generate random position di luar container
      const maxX = window.innerWidth - 150
      const maxY = window.innerHeight - 100
      
      let randomX = Math.floor(Math.random() * maxX)
      let randomY = Math.floor(Math.random() * maxY)
      
      // Pastikan tombol pindah ke posisi yang jauh dari kursor
      const mouseX = event.clientX
      const mouseY = event.clientY
      
      // Jika posisi random dekat dengan mouse, pindahkan ke sisi berlawanan
      if (Math.abs(randomX - mouseX) < 200) {
        randomX = randomX < mouseX ? mouseX - 300 : mouseX + 300
      }
      if (Math.abs(randomY - mouseY) < 200) {
        randomY = randomY < mouseY ? mouseY - 200 : mouseY + 200
      }
      
      // Pastikan tetap dalam layar
      randomX = Math.max(50, Math.min(randomX, window.innerWidth - 100))
      randomY = Math.max(50, Math.min(randomY, window.innerHeight - 50))
      
      // Apply transformation dengan fixed positioning
      button.style.position = 'fixed'
      button.style.left = randomX + 'px'
      button.style.top = randomY + 'px'
      button.style.transform = 'none'
      button.style.transition = 'all 0.1s ease'
      button.style.zIndex = '9999'
    },
    createBeepSound() {
      // Buat efek suara lucu menggunakan Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        
        // Buat efek "boing" yang lucu
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Efek boing dengan perubahan frekuensi
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2)
        
        oscillator.type = 'triangle'
        
        // Volume dengan fade out
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        
        console.log('Lucu sound played')
      } catch (e) {
        console.log('Web Audio API not supported:', e)
      }
    },
    getHeartStyle() {
      return {
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 5 + 's',
        animationDuration: (Math.random() * 3 + 2) + 's'
      }
    },
    getSparkleStyle() {
      return {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's'
      }
    }
  }
}
</script>

<style scoped>
.valentine-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.6s ease;
}

.valentine-container.fullscreen {
  padding: 0;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.card {
  position: relative;
  width: 400px;
  height: 600px;
  max-width: 90vw;
  transform-style: preserve-3d;
  transition: all 0.6s ease;
}

.card.hidden {
  opacity: 0;
  transform: scale(0.8) rotateY(180deg);
  pointer-events: none;
}

.card.opened {
  transform: rotateY(180deg);
}

.card-front,
.card-inside {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-front {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card-inside {
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
  transform: rotateY(180deg);
  padding: 30px;
  overflow-y: auto;
  display: none;
}

.fullscreen-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  animation: fadeIn 0.6s ease;
}

.envelope {
  text-align: center;
  color: white;
}

.envelope-flap {
  width: 200px;
  height: 120px;
  background: #ff5252;
  margin: 0 auto 20px;
  border-radius: 10px 10px 0 0;
  position: relative;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

.envelope-flap::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-top: 20px solid #ff6b6b;
}

.heart-icon {
  font-size: 60px;
  margin: 20px 0;
  animation: heartbeat 1.5s ease-in-out infinite;
}

.tap-text {
  font-size: 18px;
  margin-top: 20px;
  opacity: 0.9;
}

.card-inside {
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
  transform: rotateY(180deg);
  padding: 30px;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: rotate(90deg);
}

.music-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.music-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.music-btn.playing {
  background: rgba(214, 48, 49, 0.3);
  animation: musicPulse 2s ease-in-out infinite;
}

@keyframes musicPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(214, 48, 49, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(214, 48, 49, 0);
  }
}

.content {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 60px 20px;
}

.card-inside.fullscreen-content .content {
  justify-content: flex-start;
  height: auto;
  min-height: 100vh;
  padding: 100px 20px 60px 20px;
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 36px;
  color: #d63031;
  margin-bottom: 30px;
  margin-top: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
}

.love-text {
  font-size: 20px;
  color: #d63031;
  margin-bottom: 20px;
  font-weight: 600;
}

.main-message {
  font-size: 16px;
  line-height: 1.6;
  color: #2d3436;
  margin-bottom: 25px;
  font-weight: 300;
}

.signature {
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  color: #d63031;
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: 700;
}

.extra-messages {
  margin: 40px 0;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(5px);
}

.romantic-quote {
  font-size: 16px;
  font-style: italic;
  color: #2d3436;
  margin-bottom: 20px;
  line-height: 1.6;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.romantic-quote:nth-child(1) { animation-delay: 0.2s; }
.romantic-quote:nth-child(2) { animation-delay: 0.4s; }
.romantic-quote:nth-child(3) { animation-delay: 0.6s; }
.romantic-quote:nth-child(4) { animation-delay: 0.8s; }

/* Photo Carousel Styles */
.photo-carousel {
  margin: 40px 0;
  padding: 30px 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  overflow: visible;
}

/* Floating Hearts di Carousel */
.carousel-hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.carousel-heart {
  position: absolute;
  color: rgba(255, 107, 107, 0.7);
  animation: carouselFloatUp 3s linear infinite;
  font-weight: bold;
}

@keyframes carouselFloatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

.carousel-title {
  font-family: 'Dancing Script', cursive;
  font-size: 28px;
  color: #d63031;
  margin-bottom: 25px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: none;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  width: 100%;
  margin: 0;
  position: relative;
}

.carousel-viewport::before {
  content: 'Auto-playing';
  position: absolute;
  top: 5px;
  right: 10px;
  background: rgba(214, 48, 49, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  z-index: 10;
  opacity: 0;
  animation: fadeInOut 3s ease-in-out;
}

.carousel-viewport:hover::before {
  content: 'Paused';
  background: rgba(0, 0, 0, 0.7);
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  20%, 80% { opacity: 1; }
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 15px;
  padding: 0 50px;
  width: fit-content;
}

.carousel-slide {
  flex: 0 0 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  opacity: 0.4;
  transform: scale(0.85);
}

.carousel-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

.photo-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.carousel-slide.active .photo-frame {
  box-shadow: 0 15px 40px rgba(214, 48, 49, 0.4);
  border: 3px solid rgba(214, 48, 49, 0.3);
}

.carousel-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(214, 48, 49, 0.8), transparent);
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.carousel-slide.active .photo-overlay {
  transform: translateY(0);
}

.photo-number {
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  display: block;
  text-align: center;
}

.photo-love-quote {
  margin: 20px 0;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.love-quote-text {
  font-family: 'Dancing Script', cursive;
  font-size: 18px;
  color: #d63031;
  font-style: italic;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  color: #d63031;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.prev-btn {
  left: -20px;
}

.next-btn {
  right: -20px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.indicator.active {
  background: #d63031;
  transform: scale(1.3);
}

.love-question {
  margin: 40px 0;
  padding: 25px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  text-align: center;
}

.question-text {
  font-size: 18px;
  color: #d63031;
  margin-bottom: 20px;
  font-weight: 600;
}

.answer-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.btn-yes {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.btn-yes:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 184, 148, 0.4);
}

.btn-no {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  font-weight: 600;
  position: relative;
  user-select: none;
}

.btn-no:hover {
  transform: scale(0.95);
  background: linear-gradient(135deg, #ff5252, #ff7979);
}

.actions {
  margin-top: 30px;
}

.love-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.love-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}

.heart-animation {
  display: inline-block;
  margin-left: 10px;
  animation: heartbeat 1s ease-in-out infinite;
}

.love-response {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  text-align: center;
  font-size: 24px;
  color: #d63031;
  font-weight: 600;
  z-index: 10000;
  animation: bounceIn 0.5s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.floating-hearts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.heart {
  position: absolute;
  color: rgba(255, 107, 107, 0.6);
  font-size: 20px;
  animation: floatUp 4s linear infinite;
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: sparkle 3s linear infinite;
}

@keyframes bounceIn {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .card {
    width: 350px;
    height: 550px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .main-message {
    font-size: 14px;
  }
  
  .content {
    padding: 20px;
  }
  
  /* Carousel responsive */
  .carousel-title {
    font-size: 22px;
  }
  
  .carousel-container {
    width: 100%;
    max-width: none;
  }
  
  .carousel-viewport {
    width: 100%;
  }
  
  .carousel-slide {
    flex: 0 0 200px;
  }
  
  .carousel-image {
    height: 250px;
  }
  
  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  
  .prev-btn {
    left: 5px;
  }
  
  .next-btn {
    right: 5px;
  }
  
  .photo-carousel {
    padding: 20px;
    margin: 30px 0;
  }
}
</style>
