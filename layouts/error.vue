<template>
  <div class="error">
    <h1 v-if="error.statusCode === 500 || error.statusCode === 404">oops something went wrong...</h1>
    <a href="http://ostie.org" class="link">Home page</a>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>