<template>
  <div id="app">
    <ValentineCard />
  </div>
</template>

<script>
import ValentineCard from './components/ValentineCard.vue'

export default {
  name: 'App',
  components: {
    ValentineCard
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
