<template>
    <div class="search" @click.stop>
            <div class="search__input" :class="{'search__input--pink': !kindSearchByArtist}">
            
            <smartMusic v-if="popupVisible" class="search__input-smart" ref="smart"/>
            <div v-if="lazyLoadingStatus" class="search__smart-loader"><img :src="loaderImg" /></div>
            <input type="text" :placeholder="placeholderText"  @focus="isInputFocused=true" @blur="isInputFocused=false" v-model="textInput" @click="showPopup" @keyup.down="setFocus">
            
            <svg class="search__input-enter"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 6H20.5V16H4.5" :style="{'stroke': enterImgColor}" stroke="#C4C4C4" stroke-width="2"/>
                <path d="M6.5 19.5L3 16L6.5 12.5" :style="{'stroke': enterImgColor}" stroke="#C4C4C4" stroke-width="2"/>
            </svg>
        </div>
         
        <div class="search__foo"> 
            <div class="search__like">{{$t('search.eg')}} <a class="link link--br" href="#" @click="sampleRequest(sampleRequestArtist,sampleRequestSong)">{{sampleRequestText}}</a></div>
            <div class="search__params">
                
                <span class="search__params-text" :class="{'search__params-text--active': kindSearchByArtist }">
                    <checkmark class="search__checkmark" :class="{'search__checkmark--active': kindSearchByArtist }"/>
                    {{$t('search.toogle.byArtist')}}
                </span>
                <toogleSwitch class="search__params-toogle" @changeSearchType="toogleSearchType"></toogleSwitch>
                
                <span class="search__params-text" :class="{'search__params-text--active': !kindSearchByArtist }">
                    <checkmark class="search__checkmark" :class="{'search__checkmark--active': !kindSearchByArtist }"/>
                    {{$t('search.toogle.bySong')}}
                </span>
            </div>
            
        </div>
        <div v-show="inProgress" class="search__loader"><img :src="loaderImg" /></div>
    </div>
</template>
<script>
import smartMusic from '~/components/smartMusic.vue'
import toogleSwitch from '~/components/toogleSwitch.vue'
import checkmark from '~/components/checkmark.vue'
//функция для срабатывания на предмет ввода input
function throttle (callback, limit) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(function () {
                //дабы вывести последние изменение
                wait = false;
                callback.call();
            }, limit);
        }
    }
}

import { mapState, mapGetters } from 'vuex'
export default {
    data: () => ({
        // kindSearchByArtist: true,
        isInputFocused: false
    }),
  computed: {
    kindSearchByArtist: {
        get() {
            return this.$store.state.search.kindSearchByArtist
        },
        set(value){   
            this.$store.commit('search/changeKindSearchByArtist',value)
        }
    }, 
    loaderImg(){
        // return this.$store.state.search.loaderIcn
        if (this.$store.state.search.kindSearchByArtist) 
            return require(`../assets/bars.svg`) 
        else
            return require(`../assets/bars--pink.svg`) 
    }, 
    enterImgColor() {
        if (this.isInputFocused) 
            if (this.kindSearchByArtist) 
                return '#1C9CF7'
            else 
                return '#FF2B67'  
        else
            return '#C4C4C4'
    },
    placeholderText: {
        get() {
            if (this.isInputFocused) {
                return ''
            }
            else {
                return (!this.kindSearchByArtist) ? this.$t('search.placeholder.bySong') : this.$t('search.placeholder.byArtist')
            }
        },
        set() {

        }
    }, 
    sampleRequestArtist() {
        return (!this.kindSearchByArtist) ? 'The Killers' : 'David Bowie'
    },
    sampleRequestText() {
        return (!this.kindSearchByArtist) ? 'Read My Mind' : 'David Bowie'
    },
    sampleRequestSong() {
        return (!this.kindSearchByArtist) ? 'Read My Mind' : ''
    },
    throttledGet() {
            let DELAY = 1000;
            return throttle(this.getMusicData, DELAY);      
        },
    //model для input     
    textInput: {
        get() {
            return this.$store.state.search.inputText
        },
        set(value) {
            // console.log(value.length)
            this.$store.commit('search/change',value)
            if (value.length > 1) {
                this.popupVisible = true
                this.throttledGet()
                this.$store.commit('search/rememberInputText') 
            }
            if (value.length == 0) {
                this.popupVisible = false
            }
        }
    },
    //вычесляемое поля для видимости смарт поиска
    popupVisible: {
        get() {
            return this.$store.state.smartmusic.visible
        },
        set(value){    
            this.$store.commit('smartmusic/changeVisible',value)
        }
          
      },

    inProgress() {
       return this.$store.state.resultmovie.inProgress
    },
    lazyLoadingStatus() {
        return this.$store.state.smartmusic.lazyLoadingStatus
    } 
    }, 
    
  methods: {

    toogleSearchType () {
        this.kindSearchByArtist=!this.kindSearchByArtist
        this.$store.commit('search/changeLoaderIcn')
        this.$store.commit('smartmusic/changeByArtist',this.kindSearchByArtist)
        this.placeholderText=""
        if ((this.popupVisible && this.textInput.length > 0) || this.$store.state.search.isReturnResults == true || this.textInput.length > 0) {
            this.textInput = ''
            this.$store.commit('search/statusResults', false)
            this.$store.commit('smartmusic/clearResult')
            //очистить предыдущий результат выдачи
        this.$store.commit('resultmovie/emptyData')
            // this.$store.commit('resultmovie/emptyData')
        }
    }, 
    getMusicData() {
        // console.log(this.kindSearchByArtist)
        this.$store.dispatch('smartmusic/makeRequest',{ 'searchStr': this.textInput, 'byArtist': this.kindSearchByArtist})
        // this.$store.dispatch('smartmusic/makeFakeReq',this.textInput)   
    },
    //при клике на input
    showPopup(el){
        this.placeholderText=''
        if (!this.popupVisible && this.textInput.length > 0)
        //новый варик не чистить поле поиска
            // this.$store.commit('smartmusic/clearResult')
            // this.throttledGet()
            // this.popupVisible = true
        //чекаем state было ли нажатие на item и был ли вызван поиск по фильму
            if (this.$store.state.search.isReturnResults == true) {
                this.textInput = ''
                //был ли возвращен рещультат
                this.$store.commit('search/statusResults', false)
                this.$store.commit('smartmusic/clearResult')
                // this.$store.commit('resultmovie/emptyData')
            }
            // в противном слуаи прсто показываем опять выдачу что нашли в прошлый набор input при условии чтокликнули вне поля
            else {
                this.popupVisible = true
            }
      
    },
    searchMovie() {
        this.$axios.get('https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=50&offset=50', {
                header: {
                    'Authorization': 'Bearer BQBBuAp5min7j9ldKfiE9-BmT6t1z0aMwJQGAkQxDK_ikihvZ7O2pqY_labJMfrIjOQUxNHncoawEJrHTl_yOgH2espVlfZxLqUcGng6EJwEry6LSQ_lPReYWVdv4qFqPJ6iBNkTWYN6WkOwiw0J5rNkeaWpsTbsLneujOCmJzHc99_ertmKlOXEZycunDZ08Q',
                    // 'Authorization': 'Bearer BQBBuAp5min7j9ldKfiE9-BmT6t1z0aMwJQGAkQxDK_ikihvZ7O2pqY_labJMfrIjOQUxNHncoawEJrHTl_yOgH2espVlfZxLqUcGng6EJwEry6LSQ_lPReYWVdv4qFqPJ6iBNkTWYN6WkOwiw0J5rNkeaWpsTbsLneujOCmJzHc99_ertmKlOXEZycunDZ08Q', 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                 }).then(response => {
                    //  console.log (response.data.artists);
                this.dataSearch = response;
                console.log(this.dataSearch);
                }).catch(e => {
                    console.log(e)
                })
        
    },
    sampleRequest(artist,song) {
        if (!this.kindSearchByArtist)
            this.$store.commit('search/change',artist + ' - ' + song)
        else
            this.$store.commit('search/change',artist)    
        //очистить предыдущий результат выдачи
        this.$store.commit('resultmovie/emptyData')
        //заполнили выбранного исполнителя в обьект
        this.$store.commit('search/changeSearch',{'artist': artist, 'song': song})
         //передаем обьект с артистом и песней в запрос и активируем состояния поиска
        this.$store.dispatch('resultmovie/makeRequest',this.$store.state.search.whatSearch)
        this.$store.commit('resultmovie/changeProgress', true)
        //статус о том что был сделан запрос, необходим для того чтобы после повторного щелчка очистить input
        this.$store.commit('search/statusResults',true)
    },
    setFocus () {
        if (this.popupVisible) {
         this.$refs.smart.$el.firstChild.firstElementChild.focus()
         this.$store.commit('smartmusic/setCurentIndex',0)  
         this.$store.commit('search/change',this.$store.state.smartmusic.searchResult[0]['artistName'])

        }
    }
  },
  components: {
    smartMusic,
    toogleSwitch,
    checkmark
  }
}
</script>




<style lang="scss">
    .search {
        display: flex;
        flex-direction: column;
        margin-bottom: 80px;
        position: relative;
        &__input {
            flex: 1 0 auto;
            position: relative;

            &-smart {
                position: absolute;
                top:72px;
                box-shadow: 0px 8px 20px rgba(64, 63, 76, 0.24);
                background-color: #ffffff;
                z-index: 3;
                border-radius: 4px;
                height: 280px;
            }
           
            & > input{
                -webkit-appearance: none;
                border: none;
                border-bottom: 1px solid #1C9CF7;
                width: 100%;
                padding: 16px 50px 16px 16px;
                transition: border-bottom-color .9s ease;
                font-family: 'Roboto', sans-serif;
                font-style: normal;
                font-weight: 300;
                font-size: 24px;
                line-height: 32px;
                color: #051923;
                overflow: hidden;
                text-overflow: ellipsis;
                border-radius: 0;
                
                &::placeholder {
                    color: #999999;
                }

                &:focus {
                    outline: none;
                }

            }

             &--pink {
                 & > input{
                     border-bottom: 1px solid #FF2B67;
                 }
             }

            &-enter {
                position: absolute;
                top: 50%;
                transform: translate(0%,-50%);
                right: 16px;

                & path {
                    transition: stroke .9s ease;
                }

            }

        }

        &__foo {
            display: flex;
            align-items: center;
            margin-top: 24px;
            justify-content: space-between;
            padding: 0 16px;
            flex: 0 0 auto;
        }
        &__params {
            display: flex;
            align-items: center;
            
        }

        &__params-text {
            display: block;
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #828C91;
            position: relative;
            padding-left: 23px;
            &--active {
                color: #403F4C;
            }
        }

        &__params-toogle {
            margin-left: 16px;
            margin-right: 20px;
        }

        &__checkmark{
            display: none;
            &--active {
                display: block;
            }
        }

        &__like{
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 23px;
            color: #403F4C;
        }

        &__loader {
        position: absolute;
        top: 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        height: 100%;
        opacity: 0.9;

        & img {
        margin-top: 15px;
           height: 30px;
           width: auto;
        }
    }
      
    &__smart-loader {
        height: 280px;
        width: 100%;
        top: 72px;
        display: flex;
        position: absolute;
        z-index: 5;
        &:before {
            content:'';
            background-color: #ffffff;
            opacity: 0.3;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        &:after {
            content:'';
            background-color: #ffffff;
            position: absolute;
            width: 100%;
            height: 60px;
            bottom: 0;
            z-index: 2;
        }
        & img {
            margin: 0 auto 15px auto;
            font-size: 3px;
            align-self: flex-end;
            position: relative;
            z-index: 3;
            height: 30px;
            width: auto;
        }
    }
   
    }

@media screen and (max-width: 680px) {
        .search {
        margin-bottom: 40px;

        &__input {
           
            & > input{
                padding: 20px 42px 20px 8px;
                font-size: 18px;
                line-height: 24px;
            }

            &-enter {
                right: 8px;
            }

        }
        &__foo {
            align-items: flex-start;
            flex-direction: column;
            margin-top: 16px;
            padding: 0 8px;
        }
        &__params {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            
        }

        &__params-text {
            display: none;

            &--active {
                display: block;
            }
        }

        &__params-toogle {
            margin-left: 0;
            margin-right: 0;
            order: 2
         
        }

        &__checkmark{
            display: none;
            &--active {
                display: block;
            }
        }

        &__like{
            margin-bottom: 24px;
        }

        &__loader {
        position: absolute;
        top: 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        height: 100%;
        opacity: 0.9;

        & img {
        margin-top: 15px;
           height: 30px;
           width: auto;
        }
    }
    }
}

</style>