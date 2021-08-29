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
