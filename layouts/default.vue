<template>
        <nuxt />
</template>

<script>

export default {
}


</script>
<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  height: 100%;
}

.link {
    text-decoration: none;
    color: #1C9CF7;
    cursor: pointer;

    &:hover {
      color: #FF2B67;
      border: none;
    }
}

.link--br {
    border-bottom: 1px dashed #1C9CF7;
}
li{
  list-style-type: none;
}

#__nuxt, #__layout{
  height: 100%; 
}


</style>
