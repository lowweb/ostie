<template>
  <div class="result" v-show="isShownResBlock">
    <div class="result__count-art">{{$t('result.countArtist')}} {{resultMovieData.resultsCount}}</div>
    <div class="result__block" v-if="resultMovieData.resultsCount == 0 && searchByArtist">
        <div class="result__block-info">
            {{$t('result.byArtist.nullResult')}} <a class="link link--br" @click.prevent="switchTosong">{{$t('result.byArtist.nullResultLinkText')}}</a>
        </div>
    </div>
    <div class="result__block" v-if="resultMovieData.resultsCount == 0 && !searchByArtist">
        <div class="result__block-info">
            {{$t('result.bySong.nullResult')}} <a class="link link--br" @click.prevent="newSongSearch">{{$t('result.bySong.nullResultLinkText')}}</a>
        </div>
    </div>
    
    <div class="result__block" v-for="resRow in resultMovieData.results">
        
        <div v-if="resRow.artistData.length > 0 && searchByArtist" class="result__block-artist">{{$t('result.cap', {what: resRow.artist})}}<span></span></div>
        <div v-if="resRow.artistData.length > 0 && !searchByArtist" class="result__block-artist">{{$t('result.cap', {what: resRow.artist + ' - ' + songName})}}<span></span></div>

        <!-- <div v-if="resRow.artistData.length > 0" class="result__block-artist">{{resRow.artist}} можно услышать в этих фильмах<span></span></div> -->
        <div class="result__block-info" v-if="resRow.artistData.length == 0">{{$t('result.bySong.nullResultForSong', {artistName: resRow.artist})}} 
            <a class="link link--br" @click.prevent="searchAll(resRow.artist,'')">{{$t('result.bySong.nullResultForSongLinkText')}}</a>
        </div>

        <ol class="result__list" :class="[Object.keys(resRow.artistData).length > 10 ? 'result__list--wspoiler' : '']">
        <li  class="result__list-itm" :class="index >= 10 ? 'result__list-itm--hide' : ''" v-for="(artRow,index) in resRow.artistData" @key="index">
            <img class="result__list-itm-img" :src="artRow.mPoster=='null' ? nopicImgPath : artRow.mPoster">
            <!-- <span class="result__list-index">{{index + 1}}</span> -->
           <a @click="saveToRecent(artRow.mName,artRow.mYear,artRow.mLink)" class="link result__list-itm-lnk" :href="rootSite + artRow.mLink" :class="{'result__list-itm-lnk--mp': searchByArtist}" target="_blank" rel="noopener noreferrer">{{artRow.mName}} ({{artRow.mYear}})</a>
           <div class="result__episodes" v-if="Object.keys(artRow.mEpisodes).length > 0">
               {{$t('result.episodes')}}
               <span v-for="(epItm, index) in artRow.mEpisodes" class="result__episodes-itm">{{epItm.epName}}{{index==artRow.mEpisodes.length-1 ? '' : ', '}}</span>
           </div>
           <div class="result__songs" v-if="artRow.mSongs != undefined">
               {{$t('result.songs')}}
               <span v-for="(song,index) in artRow.mSongs" class="result__songs-itm">{{song}}{{index==artRow.mSongs.length-1 ? '' : ', '}}</span>
           </div>
        </li>
        </ol>
        <div @click="showSpoiler" class="result__spoiler link link--br">{{$t('result.spoiler')}}</div>
        
    </div>
  </div>
</template>

<script>
export default {
data: () => ({
    rootSite: 'https://www.imdb.com',
    postRecentData: undefined,
    nopicImgPath: require('@/assets/img-nopic.png')
    
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
    }
},
methods: {
    newSongSearch() {
        this.$store.commit('search/change','')
        
    },
    switchTosong() {
        this.$store.commit('search/changeLoaderIcn')
        this.$store.commit('search/changeKindSearchByArtist',false)
        this.$store.commit('search/statusResults', false)
        this.$store.commit('smartmusic/clearResult')
        this.$store.commit('resultmovie/emptyData')
        this.$store.commit('search/change','')   
        //переключаем toogle в положение артиста
        this.$store.commit('toogleswitch/change', true)
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
        var listItm = el.target.parentElement.querySelectorAll('.result__list-itm')
        listItm .forEach(function(el) {
            el.classList.remove('result__list-itm--hide')
        });

    },
    saveToRecent(film,year,link){
     this.postRecentData = {
        artist: this.$store.state.search.whatSearch['artist'], 
        song: this.$store.state.search.whatSearch['song'] ,
        film: film,
        year: year,
        link: link,
        locale: this.$i18n.locale
      }
    this.$axios.post('/recent', this.postRecentData)
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
            // height: 570px;
            // overflow: hidden;
            margin-bottom: 24px;

            & ~ .result__spoiler {
                display: flex;
                justify-content: center;
            }
        }
    }

    &__spoiler {
        display: none;
        width: max-content;
        margin: 0 auto;
        
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
        // display: flex;
        // flex-wrap: wrap;
        // align-items: center;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        position: relative;
        border-bottom: 1px solid #F0F1F2;
        padding: 10px 64px 10px 0px;
        display: grid;
        grid-template-areas: "image name"
                              "image songs";
        grid-template-columns: max-content 1fr;
        grid-template-rows: max-content 1fr;
        // grid-auto-rows: 20px;
        grid-column-gap: 25px;

        &:last-child {
            border-bottom: none;
        }

        &--hide {
            height: 0px;
            overflow: hidden;
            border-bottom: none;
            display: none;
        }

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
                align-self: center;
            }
        }

        &-img {
            grid-area: image;
            height: auto;
            width: 60px;
            // background-image: url('~assets/img-nopic.png');
        }

        &-lnk {
            grid-area: name;
            height: 100%;
            width: 100%;
            ///padding: 16px 64px;
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
        grid-area: songs;
        font-family: 'Roboto Condensed', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color:#828C91;
        /// padding: 0 64px 8px 64px;
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
        padding: 10px 40px 10px 0px;
        &:hover, &:focus {
            &:before {
                right: 8px;
                top: 16px;
            }
        }
        &-lnk {
            // padding: 16px 40px 16px 40px;
            &--mp {
            //    padding: 16px 40px 0px 40px;
            padding-bottom: 2px;
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
        //  padding: 0 40px 8px 40px;
     }
     &__episodes {
         padding: 0 40px 8px 40px;
     }
}
}
</style>