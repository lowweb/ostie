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
  scroll-behavior: smooth;
}
body {
  // height: 100%;

}
  
.link {
    text-decoration: none;
    color: #1C9CF7;
    cursor: pointer;

    &:hover {
      color: #FF2B67;
      border: none;

      & svg path {
        stroke: #FF2B67;
        // fill: #FF2B67;
      }
    }

    &--disable {
      color: #051923;
      cursor: not-allowed;
      &:hover {
        color: #051923;
      }
    }
}

.link--br {
    border-bottom: 1px dashed #1C9CF7;
}
li{
  list-style-type: none;
}

#__nuxt, #__layout{
  // height: 100%; 
}


</style>
