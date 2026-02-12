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
      
      <div class="content">
        <h1 class="title">Selamat Hari Valentine</h1>
        
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
      whooshSound: null
    }
  },
  mounted() {
    // Create audio element for "eitss" sound effect - menggunakan audio sederhana
    this.whooshSound = new Audio()
    this.whooshSound.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Gy/DaizsKGGS57OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
    this.whooshSound.volume = 0.5
    this.whooshSound.preload = 'auto'
  },
  methods: {
    openCard() {
      this.isOpened = true
    },
    closeCard() {
      this.isOpened = false
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
  align-items: center;
  justify-content: center;
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

.content {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
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
}
</style>
