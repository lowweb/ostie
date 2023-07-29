<template>
    <div class="recent" v-show="isShownrecentBlock">
        
        <div class="recent__cap">{{$t('resent')}}
            <div class="recent__nav">
                <button class="recent__nav-btn recent__nav-prev" @click="stepLeft" aria-label="previous item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 7L9 12.5L14.5 18" stroke="#1C9CF7" stroke-width="3"/>
                    </svg>
                </button>
                <button class="recent__nav-btn recent__nav-next" @click="stepRight" aria-label="next item">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.5 7L9 12.5L14.5 18" stroke="#1C9CF7" stroke-width="3"/>
                     </svg>
                </button>
            </div>
        </div>

        <ul class="recent__items" ref="recentItms" @scroll.passive="scrollItm()">
            <li v-for="(item, index) of recentList" class="recent__item"   :ref="index==Math.trunc((recentList.length)/2) ? 'leftItm' : ''">
                <a class="recent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="recent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img"> 
                </a>
                <div class="recent__item-song">{{item.song}}</div>
                <div class="recent__item-artist">{{item.artist}}</div>
            </li>
            <li v-for="(item, index) of recentList" class="recent__item"  :ref="index==Math.trunc((recentList.length)/2) ? 'centrItm' : ''">
                <a class="recent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="recent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img"> 
                </a>
                <div class="recent__item-song">{{item.song}}</div>
                <div class="recent__item-artist">{{item.artist}}</div>
            </li>
            <li v-for="(item, index) of recentList" class="recent__item"   :ref="index==Math.trunc((recentList.length)/2) ? 'rightItm' : ''">
                <a class="recent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="recent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img"> 
                </a>
                <div class="recent__item-song">{{item.song}}</div>
                <div class="recent__item-artist">{{item.artist}}</div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import anime from '../node_modules/animejs/lib/anime.es.js';

export default {
    data: () => ({
        itemWidth: 0, 
        itemGap: 0,
        scroolWidth: 0,
        viewPort: 0,
        leftItemOffset: 0,
        centerItemOffset: 0,
        rightItemOffset: 0,
        recentItem: [],
    }),

    computed: {
        recentList() {
            //  return this.$store.getters['recent/recentList']
             return this.$store.state.recent.recentSearch 
        },
        isShownrecentBlock() {
            if (this.$store.state.resultmovie.data.results != undefined || this.$store.state.resultmovie.inProgress == true)
                return false
            else
                return true
    
        }
    },
    methods: {
        stepLeft(){   
              if (this.centerIndex == -1) {
                // this.centerIndex == 0  
                // this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                this.scrollFrom = this.$refs.recentItms.scrollLeft
                this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
              }      
            // this.$refs.recentItms.scrollLeft = this.$refs.recentItms.scrollLeft - this.itemWidth - this.itemGap
            this.scrollFrom = this.$refs.recentItms.scrollLeft
            this.scrollTo = this.$refs.recentItms.scrollLeft - this.itemWidth - this.itemGap
            // console.log("ll=" + (this.$refs.recentItms.scrollLeft + this.viewPort/2 ))
            // console.log('er=' + (this.leftItemOffset + this.itemWidth/2))
             if ((this.$refs.recentItms.scrollLeft + this.viewPort/2) <= (this.leftItemOffset + this.itemWidth/2)) {
                    // console.log("left to rght")
                    this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                    this.scrollFrom = this.$refs.recentItms.scrollLeft
                    this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
             }
            
            anime.timeline({loop: false})
                .add({
                    targets: '.recent__items',
                    scrollLeft: [this.scrollFrom, this.scrollTo],
                    easing: 'linear',
                    duration: 500
                })
          },
          stepRight(){
            if (this.centerIndex == -1) {
                // this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                this.scrollFrom = this.$refs.recentItms.scrollLeft
                this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
              }
            //  this.$refs.recentItms.scrollLeft = this.$refs.recentItms.scrollLeft + this.itemWidth + this.itemGap
             this.scrollFrom = this.$refs.recentItms.scrollLeft
             this.scrollTo = this.$refs.recentItms.scrollLeft + this.itemWidth + this.itemGap
            //  console.log("ll=" + (this.$refs.recentItms.scrollLeft + this.viewPort/2 ))
            // console.log('er=' + (this.rightItemOffset + this.itemWidth/2))
             if (Math.round(this.$refs.recentItms.scrollLeft + this.viewPort/2) >= (this.rightItemOffset + this.itemWidth/2)) {
                // console.log("rght to left ")
                // this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                this.scrollFrom = this.$refs.recentItms.scrollLeft
                this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2

             }
             anime.timeline({loop: false})
                .add({
                    targets: '.recent__items',
                    scrollLeft: [this.scrollFrom, this.scrollTo],
                    easing: 'linear',
                    duration: 500
                })
            
          },
          scrollItm(){
                   
            if ((this.$refs.recentItms.scrollLeft + this.viewPort/2) <= (this.leftItemOffset + this.itemWidth/2)) {
                // console.log("left to rght")
                this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                this.scrollFrom = this.$refs.recentItms.scrollLeft
                this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                anime.timeline({loop: false})
                .add({
                    targets: '.recent__items',
                    scrollLeft: [this.scrollFrom, this.scrollTo],
                    easing: 'linear',
                    duration: 500
                })
            }    
            if ((this.$refs.recentItms.scrollLeft + this.viewPort/2) >= (this.rightItemOffset + this.itemWidth/2)) {
                // console.log("rght to left ")
                this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
                this.scrollFrom = this.$refs.recentItms.scrollLeft
                this.scrollTo = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2

                anime.timeline({loop: false})
                .add({
                    targets: '.recent__items',
                    scrollLeft: [this.scrollFrom, this.scrollTo],
                    easing: 'linear',
                    duration: 500
                })

            }
            for (var i =0; i< this.recentItem.length; i++){
                if (Math.round(this.$refs.recentItms.scrollLeft + this.viewPort/2) == (this.recentItem[i].offsetLeft + this.itemWidth/2)) {
                                this.centerIndex = i 
                                break                             
                            }
                else    this.centerIndex = -1         
            } 
  
          },
          resizeViewPort () {
             this.itemWidth = this.$refs.centrItm[0].clientWidth
             this.scroolWidth = this.$refs.recentItms.scrollWidth
             this.viewPort = this.$refs.recentItms.offsetWidth //window.innerWidth
             this.itemGap = parseInt(window.getComputedStyle(this.$refs.centrItm[0],null).getPropertyValue("margin-right"))
             this.leftItemOffset = this.$refs.leftItm[0].offsetLeft
             this.centrItemOffset = this.$refs.centrItm[0].offsetLeft
             this.rightItemOffset = this.$refs.rightItm[0].offsetLeft
             this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
            
          }
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeViewPort);
    },

    mounted () {
        this.itemWidth = this.$refs.centrItm[0].clientWidth
        this.scroolWidth = this.$refs.recentItms.scrollWidth
        this.viewPort = this.$refs.recentItms.offsetWidth //window.innerWidth this.$parent.$el.clientWidth
        this.itemGap = parseInt(window.getComputedStyle(this.$refs.centrItm[0],null).getPropertyValue("margin-right"))
        this.leftItemOffset = this.$refs.leftItm[0].offsetLeft
        this.centrItemOffset = this.$refs.centrItm[0].offsetLeft
        this.rightItemOffset = this.$refs.rightItm[0].offsetLeft
        // console.log("ofwi="+ this.viewPort)
        // console.log("scrWi=" + this.scroolWidth)
        // console.log("itmWi=" + this.itemWidth)
        // console.log("itmGap=" + this.itemGap)
        // console.log("left=" + this.leftItemOffset)
        // console.log("centr=" + this.centrItemOffset)
        // console.log("right=" + this.rightItemOffset)
        this.$refs.recentItms.scrollLeft = this.centrItemOffset - this.viewPort/2 + this.itemWidth/2
        window.addEventListener("resize", this.resizeViewPort);
        this.recentItem = this.$refs.recentItms.querySelectorAll('.recent__item')

    }

}
</script>

<style lang="scss">
.recent {
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1 0 auto;
    // overflow-x: scroll;

    &__items {
        display: flex;
        overflow-x: scroll;
        margin: 0 auto;
        width: 100%;
        -ms-overflow-style: none;
        // -webkit-overflow-scrolling: touch;
    	&::-webkit-scrollbar{
     		display: none;  
		}
        
    }

    &__cap {
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 40px;
        color: #403F4C;
        // align-self: center;

        // margin: 0 auto;
        max-width: 744px;
        margin: 0 auto;
        width: 100%;
        margin-bottom: 40px;
        display: flex;
    }

    &__item {
        display: flex;
        flex-direction: column;
        position: relative;
        margin-right: 24px;
        &:first-child{
            margin-left: auto;
        }
        &:last-child{
                margin-right: auto;

            }

        
        &-img {
            width: 360px;
            height: 224px;
            box-shadow: 2px 10px 16px rgba(38, 64, 82, 0.3);
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background-color: #000000;
            position: relative;

            & img {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                height: auto;
                width: 115%;
                transition: height 0.3s, width 0.3s;
                
            }
            &:hover {
                box-shadow: 2px 10px 16px rgba(0, 114, 194, 0.4);
            }
            &:hover img {
                width: 120%;
                transition: height 0.3s, width 0.3s;
            }

            &:after {
                content: '';
                background: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), #ffffff00;
                min-width: 360px;
                min-height: 224px;
                position: absolute;
            }

            
        }

        &-film {
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 32px;
            color: #FFFFFF;
            position: absolute;
            left: 16px;
            bottom: 16px;
            z-index: 3;
        }
        &-song {
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: 300;
            font-size: 24px;
            line-height: 32px;
            color: #000000;
            margin-bottom: 8PX;
        }
        &-artist {
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #403F4C;
        }
    }

    &__nav {
        margin-left: auto;
        display: flex;

        &-btn {
            border: none;
            background-color: #ffffff;
            outline: none;
            display: flex;
            width: 24px;
            height: 24px;

            &:hover > svg > path {
                stroke: #FF2A68;
            }
        }

        &-next {
            margin-left: 20px;
            transform: scaleX(-1);
        }
    }
}

@media screen and (max-width: 800px) {
.recent {
    &__cap {
        padding: 0 24px;
    }

}
}

@media screen and (max-width: 680px) {
.recent {
    margin-bottom: 80px;
    &__cap {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 32px;
        padding: 0 24px;
    }
    &__item {
        margin-right: 16px;

        &-img {
            width: 312px;
            height: 184px;

            &:after {
                content: '';
                background: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), #ffffff00;
                min-width: 312px;
                min-height: 184px;
                position: absolute;
            }

            
        }

        &-film {
            font-size: 20px;
            line-height: 24px;
        }
        &-song {
            font-size: 18px;
            line-height: 24px;
        }

    }

}
}


</style>