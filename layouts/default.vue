<template>
  <div>
    <nuxt/>
  </div>
</template>
<script>
export default {
  middleware: 'auth'
}
</script>

<style>
html {
  font-family: system-ui;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
