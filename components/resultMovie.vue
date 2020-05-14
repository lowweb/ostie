<template>
  <div class="result" v-show="isShownResBlock">
    <!-- <div v-show="inProgress" class="result__loader loader"><img src="~assets/bars.svg" />пытаемся найти</div>        -->
    <div class="result__count-art">Найдено артистов: {{resultMovieData.resultsCount}}</div>
    <div class="result__block" v-if="resultMovieData.resultsCount == 0 && searchByArtist">
        <div class="result__block-info">
            Кажется, нет ни одного фильма с таким саундтреком... Попробуйте <a class="link link--brd" @click.prevent="switchTosong">поискать по названию трека</a>
        </div>
    </div>
    <div class="result__block" v-if="resultMovieData.resultsCount == 0 && !searchByArtist">
        <div class="result__block-info">
            Не удалось найти ни одного саундтрека к фильму... Попробуйте <a class="link link--brd" @click.prevent="newSongSearch">поискать по другому треку</a>
        </div>
    </div>
    
    <div class="result__block" v-for="resRow in resultMovieData.results">
        
        <div v-if="resRow.artistData.length > 0 && searchByArtist" class="result__block-artist">{{resRow.artist}} можно услышать в этих фильмах<span></span></div>
        <div v-if="resRow.artistData.length > 0 && !searchByArtist" class="result__block-artist">{{resRow.artist}} {{songName}} можно услышать в этих фильмах<span></span></div>

        <!-- <div v-if="resRow.artistData.length > 0" class="result__block-artist">{{resRow.artist}} можно услышать в этих фильмах<span></span></div> -->
        <div class="result__block-info" v-if="resRow.artistData.length == 0">У {{resRow.artist}} нет саундтрека по выбранной композиции. 
            <div>Попробуйте найти фильмы <a class="link link--brd" @click.prevent="searchAll(resRow.artist,'')">по исполнителю</a></div>
        </div>

        <ol class="result__list" :class="[Object.keys(resRow.artistData).length > 10 & !isMobile ? 'result__list--wspoiler' : '']">
        <li  class="result__list-itm" v-for="(artRow,index) in resRow.artistData" @key="index">
            <!-- <img class="movie__poster" :src="artRow.mPoster"> -->
            <span class="result__list-index">{{index + 1}}</span>
           <a @click="saveToResent(artRow.mName,artRow.mYear,artRow.mLink)" class="link result__list-itm-lnk" :href="rootSite + artRow.mLink" :class="{'result__list-itm-lnk--mp': searchByArtist}" target="_blank">{{artRow.mName}} ({{artRow.mYear}})</a>
           <div class="result__episodes" v-if="Object.keys(artRow.mEpisodes).length > 0">
               В эпизодах:
               <span v-for="(epItm, index) in artRow.mEpisodes" class="result__episodes-itm">{{epItm.epName}}{{index==artRow.mEpisodes.length-1 ? '' : ', '}}</span>
           </div>
           <div class="result__songs" v-if="artRow.mSongs != undefined">
               Звучит:
               <span v-for="(song,index) in artRow.mSongs" class="result__songs-itm">{{song}}{{index==artRow.mSongs.length-1 ? '' : ', '}}</span>
           </div>
        </li>
        </ol>
        <div @click="showSpoiler" class="result__spoiler link link-brd">Показать больше результатов</div>
        
    </div>
  </div>
</template>

<script>
export default {
data: () => ({
    rootSite: 'https://www.imdb.com',
    postResentData: undefined
    
}),
computed: {
    
    resultMovieData() {
        return this.$store.state.resultmovie.data
    },
    searchByArtist () {
        return this.$store.state.search.kindSearchByArtist
    },
    songName() {
       return this.$store.state.search.whatSearch['song']
    },
    // inProgress() {
    //    return this.$store.state.resultmovie.inProgress
    // },
    //блок показываем если есть данные или идет поиск
    isShownResBlock(){
        // console.log ('isempty=' + this.$store.state.resultmovie.data.result)
        if (this.$store.state.resultmovie.data.results != undefined )
        // || this.$store.state.resultmovie.inProgress == true) пока убрали тк видно  слово найденно
            return true
        else
            return false
    },
    isMobile() {
         if( screen.width <= 680 ) {
                    return true;
                }
    }
},
methods: {
    newSongSearch() {
        this.$store.commit('search/change','')
        
    },
    switchTosong() {
        this.$store.commit('search/change','')   
        this.$store.commit('resultmovie/emptyData')
        //переключаем toogle в положение артиста
        this.$store.commit('toogleswitch/change', true)
        this.$store.commit('search/changeKindSearchByArtist',false)
        //loader меняем
        this.$store.commit('search/changeLoaderIcn')

        //смарт поиск vuex поиск по артисту в true
        this.$store.commit('smartmusic/changeByArtist',false)
    
    },
    searchAll(artist,song) {   
        this.$store.commit('search/change',artist)    
        //очистить предыдущий результат выдачи
        this.$store.commit('resultmovie/emptyData')
        //заполнили выбранного исполнителя в обьект
        this.$store.commit('search/changeSearch',{'artist': artist, 'song': song})
        
        //переключаем toogle в положение артиста
        this.$store.commit('toogleswitch/change', false)
        this.$store.commit('search/changeKindSearchByArtist',true)
        //loader меняем
        this.$store.commit('search/changeLoaderIcn')

        //смарт поиск vuex поиск по артисту в true
        this.$store.commit('smartmusic/changeByArtist',true)
        //передаем обьект с артистом и песней в запрос и активируем состояния поиска
        this.$store.dispatch('resultmovie/makeRequest',this.$store.state.search.whatSearch)
        this.$store.commit('resultmovie/changeProgress', true)
        //статус о том что был сделан запрос, необходим для того чтобы после повторного щелчка очистить input
        this.$store.commit('search/statusResults',true)
    },
    showSpoiler(el) {
        //убираем споилер
        el.target.parentElement.querySelector(".result__list--wspoiler").classList.toggle("result__list--wspoiler")
    },
    saveToResent(film,year,link){
     this.postResentData = {
        artist: this.$store.state.search.whatSearch['artist'], 
        song: this.$store.state.search.whatSearch['song'] ,
        film: film,
        year: year,
        link: link
      }
    this.$axios.post('/resent', this.postResentData)
        .then(function (response) {
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
}
</script>

<style lang="scss">
.result {
    position: relative;
    min-height: 30px;
    // background-color: yellow;
    &__loader {
        position: absolute;
        top: 0px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        height: 50px;
        color: #c5c5c5;
        font-size: 15px;

        & img {
           height: 30px;
           width: auto;
        }
    }
    &__list {
        

        &--wspoiler {
            height: 570px;
            overflow: hidden;
            margin-bottom: 24px;

            & ~ .result__spoiler {
                display: flex;
                justify-content: center;
            }
        }
    }

    &__spoiler {
        display: none;
        
    }

    &__list-index{
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #051923;
        width: 32px;
        position: absolute;
        left: 16px;
        align-self: flex-start;
        margin-top: 16px;
    }
    &__list-itm {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        position: relative;
        border-bottom: 1px solid #F0F1F2;

        &:hover, &:focus {
            background-color: #E4F3FE;
            // color: #FF2B67;
            &:before {
                content: "";
                position: absolute;
                right: 16px;
                background-image: url('~assets/img-film-link.svg');
                width: 24px;
                height: 24px;
            }
        }

        &-lnk {
            height: 100%;
            width: 100%;
            padding: 16px 64px;
            display: flex;
            align-items: center;
            &--mp {
                padding-bottom: 6px;
            }
        }
    }
    &__count-art {
        font-family: 'Roboto Condensed', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #828C91;
        margin-bottom: 8px;
    }
    &__block {
            margin-bottom: 56px;
        &:last-child{
            margin-bottom: 128px;
        }

        &-artist{
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 32px;
            line-height: 40px;
            margin-bottom: 20px;

        }
        &-info {
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;    
            font-size: 32px;
            line-height: 40px;
            color: #403F4C;
        }
    }

    &__songs {
        font-family: 'Roboto Condensed', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color:#828C91;
        padding: 0 64px 8px 64px;
        width: 100%;
        &-itm {
            color: #051923;
        }
    }
    &__episodes{
    font-size: 16px;
    line-height: 24px;
    color: #828C91;;
    padding: 0 64px 8px 64px;
    width: 100%;
     &-itm{
         color: #051923;
     }
    }   
}

@media screen and (max-width: 680px) {
.result {

    &__list {
        // &--wspoiler {
        //     height: 560px;
        //     margin-bottom: 24px;
        // }
    }
    &__list-index {
        left: 8px;
        top: 16px;
        margin-top: 0;
    }
    &__list-itm {
        &:hover, &:focus {
            &:before {
                right: 8px;
                top: 16px;
            }
        }
        &-lnk {
            padding: 16px 40px 16px 40px;
            &--mp {
               padding: 16px 40px 0px 40px; 
            }
        }
    }

    &__block {
            margin-bottom: 36px;
        &:last-child{
            margin-bottom: 66px;

        }

        &-artist{
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 8px;
        }
        &-info {
            font-size: 20px;
            line-height: 24px;
        }
    }
     &__songs {
         padding: 0 40px 8px 40px;
     }
     &__episodes {
         padding: 0 40px 8px 40px;
     }
}
}
</style>