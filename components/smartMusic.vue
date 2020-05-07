<template>
  <div class="smart-music">
    <ul class="smart-music__artist">
        <div class="smart-music__back"></div>
    <li class="smart-music__itm" @click="selectItem(index)" v-for="(itm, index) in smartMusicData" :key="index" :value="index" :tabindex="index">
        <!-- <div class="smart-music__itm-touch" @click="selectItem(index)"> -->
            <div v-if="!getByArtist" class="smart-music__itm-img"><img :src="itm.artworkUrl100" alt=""></div>
            
            <div class="smart-music__itm-text">
                <span class="smart-music__itm-artist" v-html="itm.artistName"></span>
                <span v-if="!getByArtist"> - </span>
                <span v-if="!getByArtist" class="smart-music__itm-song" v-html="itm.trackName"></span>
            </div>
        <!-- </div> -->
        
        <div v-if="!getByArtist" class="smart-music__itm-audio audio" :class="{'audio--play':selectedAudio!=index,'audio--pause': index == selectedAudio}" @click.stop="clickAudioBtn($event.target,index)"><audio :src="itm.previewUrl"></audio></div>
        <div class="smart-music__itunes-ln"><a  @click.stop="" class="link" :href="(getByArtist) ? itm.artistLinkUrl : itm.artistViewUrl" target="_blank"></a></div>
        <a class="link" v-if="getByArtist" @click.stop="selectSong(itm.artistId, $event)" >></a>
    </li>
 </ul>
 <ul class="smart-music__artist-song">
    <li class="smart-music__itm"  @click="selectItemArtistSong(index)" v-for="(itm, index) in songByArtist" :key="index" :value="index" :tabindex="index">
        
        <div class="smart-music__itm-text">
            <a class="link" v-if="index==0" @click.stop="backToArtist($event)" ><</a>
                <!-- <span class="smart-music__itm-artist" v-html="itm.artistName"></span>
                <span > - </span> -->
                <span  class="smart-music__itm-song" v-html="itm.trackName"></span>
            </div>
    </li> 
 </ul>
</div>

</template>

<script>

import {mapGetters } from 'vuex';

export default {
    data:()=> ({
        selectedAudio: undefined,
        previosAudioEl: undefined,
        previosAudioIndex: undefined,
        isAudioPlay: false,
        songByArtist: []
    }),
computed: {
    ...mapGetters({
      getItemByIndex: 'smartmusic/getItemByIndex',
      getByArtist: 'smartmusic/getByArtist'
    }),
    smartMusicData() {
        // highlight(this.$store.state.smartmusic.searchResult,this.$store.state.search.whatSearch)
        this.$store.commit('smartmusic/highlightData',this.$store.state.search.inputText)
        return this.$store.state.smartmusic.searchResultHighLigth
        // return this.$store.commit('smartmusic/highlightData',this.$store.state.search.inputText)
    }
},
methods: {
    selectItem(index) {
        let selectItemName = this.getItemByIndex(index)['artistName']
        let selectItemSong = this.getItemByIndex(index)['trackName']
        console.log ('wht='+ this.getItemByIndex(index))
        //переназначили input на исполнителя, песня
        if(selectItemSong == undefined) {
            selectItemSong = ''
            this.$store.commit('search/change',selectItemName)
        }
        else    
            this.$store.commit('search/change',selectItemName + ' - ' + selectItemSong)


        //очистить предыдущий результат выдачи
        this.$store.commit('resultmovie/emptyData')
        //убрали видимость смартпоиска
        this.$store.commit('smartmusic/changeVisible',false)
        //заполнили выбранного исполнителя в обьект
        this.$store.commit('search/changeSearch',{'artist': selectItemName, 'song': selectItemSong})

        //передаем обьект с артистом и песней в запрос и активируем состояния поиска
        this.$store.dispatch('resultmovie/makeRequest',this.$store.state.search.whatSearch)
        this.$store.commit('resultmovie/changeProgress', true)


        //статус о том что был сделан запрос, необходим для того чтобы после повторного щелчка очистить input
        this.$store.commit('search/statusResults',true)
        

        

    },
    selectItemArtistSong(index) {
        
         let selectItemName = this.songByArtist[index]['artistName']
        let selectItemSong = this.songByArtist[index]['trackName']
       
        //переназначили input на исполнителя, песня
        if(selectItemSong == undefined) {
            selectItemSong = ''
            this.$store.commit('search/change',selectItemName)
        }
        else    
            this.$store.commit('search/change',selectItemName + ' - ' + selectItemSong)


        //очистить предыдущий результат выдачи
        this.$store.commit('resultmovie/emptyData')
        //убрали видимость смартпоиска
        this.$store.commit('smartmusic/changeVisible',false)
        //заполнили выбранного исполнителя в обьект
        this.$store.commit('search/changeSearch',{'artist': selectItemName, 'song': selectItemSong})

        //передаем обьект с артистом и песней в запрос и активируем состояния поиска
        this.$store.dispatch('resultmovie/makeRequest',this.$store.state.search.whatSearch)
        this.$store.commit('resultmovie/changeProgress', true)


        //статус о том что был сделан запрос, необходим для того чтобы после повторного щелчка очистить input
        this.$store.commit('search/statusResults',true)
        
    },
    backToArtist(event){
        event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.smart-music__artist').classList.toggle("smart-music__artist--hide")
    },
    selectSong (artistId, event) {
        event.target.parentElement.parentElement.classList.toggle("smart-music__artist--hide")
        console.log (event.target.parentElement)
        this.$axios.get('https://itunes.apple.com/lookup?', {
        params: {
            'id' : artistId,
            'entity': 'song',
            'limit': 50
            }
         }
        
        )
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.results) 
            // res.data.results = {'byArtist': payload.byArtist,'data': res.data.results}
            this.songByArtist = res.data.results
          }
        })
        .catch(e => {
            console.log(e)
        })
    },
    clickAudioBtn(el,index){
        //если аудио не играет
        if (this.isAudioPlay == false)
            {   
                //переключим иконку на паузу   
                this.selectedAudio = index
                //включим аудио    
                 el.firstChild.play()
                //запомним индекс как предыдущий при последуещем клике
                this.previosAudioEl = el
                //статус песни играет
                this.isAudioPlay = true
            }
           else {
               //если играет и кликнули на не играющую песню
               if (index != this.selectedAudio) {               
                //ставим на паузу предыдущий элемент
                this.previosAudioEl.firstChild.pause()
                //переключим иконку на паузу   
                this.selectedAudio = index
                //включим аудио    
                 el.firstChild.play()
                //запомним индекс как предыдущий при последуещем клике
                this.previosAudioEl = el
               }
               //если  кликнули на тот же трек что играет
               else{
                   this.selectedAudio = undefined
                  this.previosAudioEl.firstChild.pause()
                  this.isAudioPlay = false 
               }   
           }    
    }

}

}
</script>

<style lang="scss" scoped>
.smart-music{
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    background-color: #ffffff;
    width: 100%;
    overflow-y: scroll;
    color: #828C91;
    display: flex;
     &__artist{
         width: 100%;
        animation-duration: 800ms;
        animation-timing-function: ease;
        // animation-name: showBlock;
        &--hide {
            display: none;
            & + .smart-music__artist-song {
                display: block;
            }
        }
    }
    &__artist-song{
        width: 100%;
        display: none;
        animation-duration: 800ms;
        animation-timing-function: ease;
        // animation-name: showBlock;
    }
    &__back {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 3;
    }
    &__itm {
        display: flex;
        align-items: center;
        min-height: 60px;
        position: relative;
        cursor: pointer;
        padding: 16px;
        flex: 1 1 auto;

    }
    &__itm:hover {
        background-color: #E4F3FE;
    }
    &__itm-touch {
        // display:flex;
        // align-items: center;;
        // flex: 1 1 auto;
        // cursor: pointer;
        // padding: 16px;
    }
    &__itm-text {
        // display: flex;
        // flex-direction: column;
        margin: auto 0;
        flex: 1 1 auto;
        // cursor: pointer;
        margin-right: 10px;

        &:hover .smart-music__itm-song {
            // text-decoration: underline;
            // text-decoration-style: dashed;
            // text-decoration-color: #ffcf1e;
        }
    }
    &__itm-img {
        margin-right: 20px;
        float: left;
        width: 44px;
        height: 44px;
        flex: 0 0 44px;
        // align-self: center;
        & img {
            object-fit: cover;
            width: 44px;
            height: 44px;
        }
    }
    &__itm-artist {
        // font-weight: 600;   
        // position: relative;    
    } 

    &__itm-song {
        // font-weight: 300;
        // position: relative;

    }
    &__itunes-ln{
        display: flex;
        margin-right: 24px;
        flex: 0 0 112px;
        & > a {
            content: url('~assets/icn-itunes.svg');
            width: 112px;
            height: 32px;
            
        }
    }
    &__itm-audio {
        right: 40px;
        cursor: pointer;
        flex: 0 0 24px;
        align-self: center;
        margin-right: 40px;
    }

}


.audio {
    width: 24px;
    height: 24px;

    &--play{
       background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 459 459' style='enable-background:new 0 0 459 459;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath style='fill:%231C9CF7;' d='M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651 l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416 c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151 C315.662,233.564,313.652,237.364,310.292,239.651z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); 
    }

    &--pause {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 39.989 39.989' style='enable-background:new 0 0 39.989 39.989;' xml:space='preserve'%3E%3Cpath style='fill:%231C9CF7;' d='M19.995,0C8.952,0,0,8.952,0,19.994c0,11.043,8.952,19.995,19.995,19.995s19.995-8.952,19.995-19.995 C39.989,8.952,31.037,0,19.995,0z M18.328,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5 s1.5,0.671,1.5,1.5V26.057z M24.661,26.057c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.724c0-0.829,0.671-1.5,1.5-1.5 s1.5,0.671,1.5,1.5V26.057z'/%3E%3C/svg%3E%0A");
    }
}


@media screen and (max-width: 680px) {
.smart-music{

    &__itm {
       flex-wrap: wrap;
       padding: 8px 24px 6px 16px;
    }

    // &__itm-touch {
    //     padding: 8px 8px 6px 16px;
    // }
    &__itm-text {
        margin-right: 8px;
        flex: 1;

    }
    &__itm-img {
        margin-right: 8px;
        align-self: flex-start;

    }


    &__itunes-ln{
            width: 100%;
            flex: 1 0 auto;
            padding-left: 52px;
            margin-top: 8px;
        & > a {
            content: url('~assets/icn-itunes-m.svg');
            width: 76px;
            height: 14px;
        }


    }
    &__itm-audio {
        margin-right: 0px;
        margin-top: 18px;


    }

}

}

@keyframes showBlock {
  0% {
    
    width: 0;
    // opacity: 1;
  }
  20% {
    
    width: 20%;
    opacity: 1;
  }
  40% {
    
    width: 40%;
    opacity: 1;
  }
   50% { 
    width: 50%;
  }
     60% { 
    width: 60%;
  }
     70% { 
    width: 70%;
  }
     80% { 
    width: 80%;
  }
  100% {
    
    width: 100%;
    opacity: 1;
  }
}
</style>