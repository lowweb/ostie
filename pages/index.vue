<template>
<main>
     
 <div class="container">
 <Title />     
    <!-- <searchType /> -->
    <search />
    <!-- <smartMusic /> -->

    <resultMovie />
    
  </div> 
<resent />
  <Footer />       
</main>        
 
 
    
</template>

<script>
import searchType from '~/components/search-type.vue'
import Search from '~/components/search.vue'
import Resent from '~/components/resent.vue'
import ResultMovie from '~/components/resultMovie.vue'
import Title from '~/components/title.vue'
import Footer from '~/components/footer.vue'
// import smartMusic from '~/components/smartMusic.vue'
export default {
    async fetch ({store}) {
        await store.dispatch("resent/getResentData")
    },
    components: {
    searchType,
    Search,
    Resent,
    ResultMovie,
    Title,
    Footer
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
  padding-top: 80px;
  min-height: 100vh;
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
