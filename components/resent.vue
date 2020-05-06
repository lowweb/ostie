<template>
    <div class="resent" v-show="isShownResentBlock">
        <div class="resent__cap">Недавно искали</div>
        <ul class="resent__items">
            <li v-for="item of resentList" :key="item.id" class="resent__item">
                <a class="resent__item-img" href=""><img :src="item.picUrl" alt="poster-img"></a>
                <div class="resent__item-film">{{item.film}}</div>
                <div class="resent__item-song">{{item.song}}</div>
                <div class="resent__item-artist">{{item.artist}}</div>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    data: () => ({
        
    }),
    computed: {
        resentList() {
             return this.$store.getters['resent/resentList']

        },
        isShownResentBlock() {
            if (this.$store.state.resultmovie.data.results != undefined || this.$store.state.resultmovie.inProgress == true)
                return false
            else
                return true
    
        }
    },

}
</script>

<style lang="scss">
.resent {
    margin-bottom: 146px;
    display: flex;
    flex-direction: column;
    width: 100%;
    // overflow-x: scroll;

    &__items {
        display: flex;
        overflow-x: scroll;
        margin: 0 auto;
        width: 100%;
        -ms-overflow-style: none;

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
            top: 176px;
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
}

@media screen and (max-width: 800px) {
.resent {
    // padding: 0px 24px; 
    &__cap {
        margin-left: 24px;
        width: auto;
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
        margin-left: 24px;
    }
    &__item {
        margin-right: 16px;

        &-img {
            width: 312px;
            height: 184px;


            // & img {
            //     position: absolute;
            //     top: 50%;
            //     transform: translate(0, -50%);
            //     height: 135%;
            //     width: auto;
            //     transition: height 1s, width 1s;
                
            // }
            // &:hover {
            //     box-shadow: 2px 10px 16px rgba(0, 114, 194, 0.4);
            // }
            // &:hover img {
            //     height: 165%;
            //     transition: height 1s, width 1s;
            // }

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
            left: 16px;
            top: 144px;
        }
        &-song {
            font-size: 18px;
            line-height: 24px;
        }

    }

}
}


</style>