<template>
<main @click="hideSmartSearch">
     
 <div class="container">
 <LangSwitch />  
 <Title />     
    <search />
    <resultMovie />
  </div> 
<recent />
  <Footer />       
</main>        
 
 
    
</template>

<script>
import Search from '~/components/search.vue'
import Recent from '~/components/recent.vue'
import ResultMovie from '~/components/resultMovie.vue'
import Title from '~/components/title.vue'
import Footer from '~/components/footer.vue'
import LangSwitch from '~/components/langSwitch.vue'
import anime from '../node_modules/animejs/lib/anime.es.js';
export default {
    async fetch ({store}) {
        await store.dispatch("recent/getRecentData")
    },
    methods: {
      hideSmartSearch() {
        this.$store.commit('smartmusic/changeVisible',false)
      }
    },
    components: {
    Search,
    Recent,
    ResultMovie,
    Title,
    Footer,
    LangSwitch
    // smartMusic
  },

  mounted() {
    
    const containerWidth = document.querySelector('.container').offsetWidth;
    const svgWidth = document.querySelector('.header__start a').offsetWidth;

    // console.log(containerWidth)
    // console.log(svgWidth)
    let positionCenter = containerWidth/2 - svgWidth/2;
    if (containerWidth < 792) {
      positionCenter = positionCenter - 24;
    }
    
    anime.timeline({loop: false})
        .add({
          targets: '.header__start .header__logo',
          translateX: positionCenter
        })
        .add({
          targets: '.header__start .header__logo',
          opacity: [0, 1],
          easing: 'linear',
          duration: 10
        })
        .add({
            targets: '.header__start .logo__lines path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1300,
            delay: function(el, i) { return i * 250 },
            direction: 'alternate',
        },'-=300')
        .add({
            targets: '.header__start .header__logo',
            translateX: [positionCenter, 0],
            left: 'auto',
            easing: 'spring(1, 80, 10, 0)',
            duration: 300,
        },'-=900')
        .add({
          targets: '.header .logo__fill',
          opacity: [0, 1],
          easing: 'linear',
          duration: 500
        },'-=1000')
        .add({
          targets: '.header__start',        
          opacity: [1, 0],
          duration: 550,
          easing: 'easeInOutQuad',
          complete: function() {
            document.querySelector('.header__start').style.display = 'none';
          }
        },'-=800')
        .add({
          targets: '.recent__item',
          opacity: [0, 1],
          translateX: [100, 0],
          duration: 650,
          delay: anime.stagger(150)
        },'-=2500')
        .add({
          targets: '.lang-switch__el',
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 850,
          delay: anime.stagger(200)
        },'-=2500')
        
  }
}


</script>

<style lang="scss">
main{
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  min-height: 100vh;
}
.main--noscroll{
    overflow: hidden;
    height: 100vh;
    position: relative;
  }
.container {
  max-width: 744px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;
}


@media screen and (max-width: 792px) {
 .container{
   padding: 0px 24px; 
   max-width: none;
}
}

@media screen and (max-width: 680px) {
  main{
    padding-top: 24px;
  }

}

</style>
