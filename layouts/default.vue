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
    display: inline-block;

    &:hover {
      color: #FF2B67;

      & svg path {
        stroke: #FF2B67;
        // fill: #FF2B67;
      }
    }

    &--disable {
      color: #051923;
      cursor: default;
      &:hover {
        color: #051923;
      }
    }

    &--br {
    border-bottom: 1px dashed #1C9CF7;

    &:hover {
      border-bottom: 1px dashed transparent;
    }
}
}


li{
  list-style-type: none;
}

#__nuxt, #__layout{
  // height: 100%; 
}

a {
  text-decoration: none;
}

</style>
