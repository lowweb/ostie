<template>
  <div class="result" v-show="isShownResBlock">
    <!-- <div v-show="inProgress" class="result__loader loader"><img src="~assets/bars.svg" />пытаемся найти</div>        -->
    <div class="result__count-art">Найдено артистов: {{resultMovieData.resultsCount}}</div>
    <div class="result__block" v-for="resRow in resultMovieData.results">
        <div v-if="!searchByArtist">{{songName}}</div>
        <div v-if="resRow.artistData.length > 0" class="result__block-artist">{{resRow.artist}} можно услышать в этих фильмах<span></span></div>
        <div class="result__block-info" v-if="resRow.artistData.length == 0">У {{resRow.artist}} нет саундтрека по выбранной композиции. 
            <div>Попробуйте <a class="link link--brd" @click.prevent="searchAll(resRow.artist,'')">найти фильмы по данному исполнителю</a></div>
        </div>

        <ol class="result__list" :class="[Object.keys(resRow.artistData).length > 10 ? 'result__list--wspoiler' : '']">
        <li  class="result__list-itm" v-for="(artRow,index) in resRow.artistData" @key="index">
            <!-- <img class="movie__poster" :src="artRow.mPoster"> -->
            <span class="result__list-index">{{index + 1}}</span>
           <a class="link" :href="rootSite + artRow.mLink" target="_blank">{{artRow.mName}} ({{artRow.mYear}})</a>
        </li>
        </ol>
        <div @click="showSpoiler" class="result__spoiler link link-brd">Показать больше результатов</div>
        <!-- <div class="movieName">{{itm.mName}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
data: () => ({
    rootSite: 'https://www.imdb.com'
    
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
    }
}
}
</script>

<style scoped lang="scss">
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
            height: 560px;
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
        width: 48px;
        position: absolute;
        left: 16px;
    }
    &__list-itm {
        display: flex;
        height: 56px;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        position: relative;
        border-bottom: 1px solid #F0F1F2;

        

        // &:nth-child(2n) {
        //     background-color: #F0F1F2;
        // }

        &:hover, &:focus {
            background-color: #E4F3FE;
            color: #FF2B67;
            &:before {
                content: "";
                position: absolute;
                right: 16px;
                background-image: url('~assets/img-film-link.svg');
                width: 24px;
                height: 24px;
            }
        }

        & a {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 64px;
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
            margin-bottom: 200px;
        }

        &-artist{
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 32px;
            line-height: 40px;
            margin-bottom: 20px;
            
            & > span {
                // font-weight: 600;
                // background-color: #ffda28;
                padding: 0px 5px;
            }
        }
        &-info {
            font-size: 32px;
            line-height: 40px;
        }
    }
}

@media screen and (max-width: 600px) {
 .result {
    &__block {
        padding: 20px 15px; 
    }
 }
}
</style>