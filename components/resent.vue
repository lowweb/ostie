<template>
    <div class="resent" v-show="isShownResentBlock" >
        
        <div class="resent__cap">Недавно искали
            <div class="resent__nav">
                <button class="resent__nav-btn resent__nav-prev" @click="scrollLeft">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 7L9 12.5L14.5 18" stroke="#1C9CF7" stroke-width="3"/>
                    </svg>
                </button>
                <button class="resent__nav-btn resent__nav-next" @click="scrollRight">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M14.5 7L9 12.5L14.5 18" stroke="#1C9CF7" stroke-width="3"/>
                     </svg>
                </button>
            </div>

        </div>
        
        <!-- <div>{{viewPort}}</div>
        <div>{{res}}</div>
    <div>{{first}}</div>
    <div>{{clone}}</div> -->
        <ul class="resent__items" ref="resentItms" @scroll="scrollItm($event)">
            <li v-for="(item, index) of resentList" :key="index" class="resent__item" :ref="index==0 ? 'leftItm' : ''">
                <a class="resent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="resent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img">
                </a>
                
                <div class="resent__item-song">{{item.song}}</div>
                <div class="resent__item-artist">{{item.artist}}</div>
            </li>
            <li v-for="(item, index)  of resentList" :key="item.id" class="resent__item" :ref="index==0 ? 'centerItm' : ''">
                <a class="resent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="resent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img">
                </a>
                
                <div class="resent__item-song">{{item.song}}</div>
                <div class="resent__item-artist">{{item.artist}}</div>
            </li>
            <li v-for="(item, index)  of resentList" :key="item.id" class="resent__item" :ref="index==0 ? 'rightItm' : ''">
                <a class="resent__item-img" :href="'https://www.imdb.com'+item.movieurl" target="_blank" rel="noopener noreferrer">
                    <div class="resent__item-film">{{item.film}}</div>
                    <img :src="item.imgurl" alt="poster-img">
                </a>
                
                <div class="resent__item-song">{{item.song}}</div>
                <div class="resent__item-artist">{{item.artist}}</div>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    data: () => ({
        viewPort: 0,
        itemWidth: 0,
        itemGap: 0,
        scroolWidth: 0,
        curScrollPos:0,
    }),

    computed: {
        resentList() {
            //  return this.$store.getters['resent/resentList']
             return this.$store.state.resent.resentSearch
        },
        isShownResentBlock() {
            if (this.$store.state.resultmovie.data.results != undefined || this.$store.state.resultmovie.inProgress == true)
                return false
            else
                return true
    
        }
    },
    methods: {
        scrollLeft() {
           
            this.$refs.resentItms.scrollLeft = this.$refs.resentItms.scrollLeft - this.itemWidth - this.itemGap
            console.log(this.$refs.resentItms.scrollLeft)
            if ( this.$refs.resentItms.scrollLeft + this.viewPort/2 == this.$refs.leftItm[0].offsetLeft + this.itemWidth/2) {
                console.log("смешаем")
            }
        //    if (this.$refs.resentItms.scrollLeft == 0) {
        //            console.log("ушли на центр1")
               
        //            this.$refs.resentItms.scrollLeft= this.$refs.cloneItm[0].offsetLeft - this.viewPort/2 + this.itemWidth/2//чтоб не сработало правило ниже 
        //            console.log(this.$refs.resentItms.scrollLeft)    
        //        }
                 
        },
        scrollRight() {
            // this.$refs.resentItms.scrollLeft = this.$refs.resentItms.scrollLeft + this.itemWidth + this.itemGap
            // if( this.$refs.cloneItm[0].offsetLeft <= this.$refs.resentItms.scrollLeft) {
            //     console.log("ушли на lf")
            //       this.$refs.resentItms.scrollLeft = 1 + this.itemWidth - this.itemGap
            //    }
        },
        scrollItm(e){
         
            // console.log(this.$refs.resentItms.scrollLeft)
            // if (this.$refs.resentItms.scrollLeft > this.curScrollPos) {
            //     console.log ('rht')
            //     this.$refs.resentItms.scrollLeft = this.$refs.resentItms.scrollLeft + this.itemWidth

            // }
                
            // else {
            //     console.log('lft') 
            //     // this.$refs.resentItms.scrollLeft = this.$refs.resentItms.scrollLeft - this.itemWidth
            // }
                   
            // this.res = this.$refs.resentItms.scrollLeft
            // this.first = this.$refs.firstItm[0].offsetLeft
            // this.clone = this.$refs.cloneItm[0].offsetLeft
            // if (this.$refs.resentItms.scrollLeft == 0) {
               
            //        this.$refs.resentItms.scrollLeft= this.$refs.cloneItm[0].offsetLeft - 1 //чтоб не сработало правило ниже
                    
            //    }
            // if( this.$refs.cloneItm[0].offsetLeft <= this.$refs.resentItms.scrollLeft) {
            //     this.$refs.resentItms.scrollLeft=1             
            // }
            // this.curScrollPos = this.$refs.resentItms.scrollLeft
        },
        resizeViewPort () {
            this.itemWidth = this.$refs.centerItm[0].clientWidth
            this.scroolWidth = this.$refs.resentItms.scrollWidth
            this.viewPort = this.$parent.$el.clientWidth
            this.itemGap=parseInt(window.getComputedStyle(this.$refs.centerItm[0],null).getPropertyValue("margin-right"))
            //сместили по центру
            this.$refs.resentItms.scrollLeft = this.$refs.centerItm[0].offsetLeft + this.itemWidth/2 - this.viewPort/2

            //  this.$refs.resentItms.scrollLeft = ((this.scroolWidth + this.itemGap)/2 - this.viewPort)/2 - (this.itemWidth/2 + this.itemGap)
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeViewPort);
    },
    created(){
    },
    mounted () {
        this.itemWidth = this.$refs.centerItm[0].clientWidth
        this.scroolWidth = this.$refs.resentItms.scrollWidth
        this.viewPort = this.$parent.$el.clientWidth
        this.itemGap=parseInt(window.getComputedStyle(this.$refs.centerItm[0],null).getPropertyValue("margin-right"))

        // console.log("ofwi="+ this.viewPort)
        // console.log("scrWi=" + this.scroolWidth)
        // console.log("itmWi=" + this.itemWidth)
        // console.log("gap=" + this.itemGap)

        window.addEventListener("resize", this.resizeViewPort);

        //сместили по центру
        this.$refs.resentItms.scrollLeft = this.$refs.centerItm[0].offsetLeft + this.itemWidth/2 - this.viewPort/2
        // this.$refs.resentItms.scrollLeft = ((this.scroolWidth + this.itemGap)/2 - this.viewPort)/2 - (this.itemWidth/2 + this.itemGap)
        // this.curScrollPos = this.$refs.resentItms.scrollLeft
        // console.log(this.curScrollPos)

    }

}
</script>

<style lang="scss">
.resent {
    margin-bottom: 146px;
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
        //-webkit-overflow-scrolling: touch;
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
                height: 135%;
                width: auto;
                transition: height 0.3s, width 0.3s;
                
            }
            &:hover {
                box-shadow: 2px 10px 16px rgba(0, 114, 194, 0.4);
            }
            &:hover img {
                height: 165%;
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
            transform: scaleX(-1);
        }
    }
}

@media screen and (max-width: 800px) {
.resent {
    &__cap {
        padding: 0 24px;
    }

}
}

@media screen and (max-width: 680px) {
.resent {
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