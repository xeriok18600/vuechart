<template>
  <div id="app" class="flex h-screen">
    <aside class="w-64 border-r-2 py-4">
      <div class="flex justify-center mb-4">
        <router-link :to="{ name: 'Home' }">首頁</router-link>
      </div>
      <div class="flex justify-center mb-4">
        <router-link :to="{ name: 'About' }">分析</router-link>
      </div>
    </aside>
    <div class="container mx-auto p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
