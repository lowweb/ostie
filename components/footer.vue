<template>
    <footer class="foo">
            <div class="foo__copyr">Ostie © 2015–{{currentYear}}</div>
            <a href="" class="foo__about link" :class="isShowInfo==true ? 'link--disable': ''" @click.prevent="showInfo">О проекте</a> 
            <a href="https://telegram.im/@ostie_org" rel="noopener noreferrer" target="_blank" class="foo__social link">Ostie в Telegram</a>
        <div class="foo__about-info" :class="isShowInfo ? 'foo__about-info--show' : ''">
            <svg @click.prevent="hideInfo" class="foo__about-info-arr" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M9.5 7L15 12.5L9.5 18" stroke="#C4C4C4" stroke-width="3"/>
            </svg>

            <div class="foo__about-cap">Где играла эта песня? 🤔</div>
            <div class="foo__about-text">В хорошем кино – хороший саундтрек. Ostie помогает найти фильмы и сериалы по имени артиста или названию композиции. Если вам хочется узнать, в каком фильме звучала та самая песня или в создании саундтрека к какому сериалу принимала участие ваша любимая группа – Ostie поможет.</div>
        </div>
        
       
    </footer>
</template>
<script>
export default {
    data: () => ({
        isShowInfo: false,
        currentYear: new Date().getFullYear()
    }),
    methods: {
        showInfo (el) {
            this.isShowInfo = true
            setTimeout(function(){
                window.scrollTo({
                    top: document.body.scrollHeight,
                     behavior: "smooth"
                })
                
            }, 150);
            
        },
        hideInfo () {
            this.isShowInfo = false
        }
    }
   

    
}
</script>
<style lang="scss">
.foo {
    // height: 72px;
    scroll-behavior: smooth;
    background: #F0F1F2;
    flex: 0 0 auto;
    min-height: 72px;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    align-items: center;
    padding: 24px 0;
    &__link-group{
        display: flex;
    }
    // transition: max-height .5s, padding .5s;
    &__about-info {
        padding: 0;
        margin: 0 auto;
        width: 100%;
        overflow: auto;
        display: flex;
        overflow: hidden;
        opacity: 0;
        height: 0;
        flex-direction: column;
        justify-content: center;
        font-family: 'Roboto', sans-serif;;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #403F4C;
        transform: translate(0,-10%);
        
        &--show {
            display: flex;
            height: 100%;
            padding: 24px 0 16px 0;
            opacity: 1;
            transform: translate(0, 0);
            transition: opacity 1s, transform .5s;
            
        }

        &-arr{
            align-self: center;
            margin-bottom: 24px;
            transform: rotate(-90deg); 
            &:hover path{
                stroke: #FF2B67;

            }
        }

        &--show &-arr{
            transform: rotate(90deg); 
            transition: transform .8s;
        }

    }

    &__about-cap {
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 32px;
            line-height: 40px;
            color: #403F4C;
            width: 744px;
            margin: 0 auto 16px auto;
    }

    &__about-text{
        width: 744px;
        margin: 0 auto;
    }

    &__copyr{
        margin-left: auto;
        font-family: 'Roboto Condensed', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #828C91;
        margin-right: 372px;
    }
    &__about {
        margin-right: 40px;
    }
    &__social{
        margin-right: auto;
        display: flex;
        align-items: center;

        &:before {
            content: url('~assets/icn-telegram.svg');
            widows: 24px;
            height: 24px;
            margin-right: 8px;

        }

    }
}

// .showninfo-enter-active {
// //   transition: opacity .5s;
// transition: height .2s, padding .5s, opacity .8s;
 
// }
// .showninfo-enter/* .fade-leave-active до версии 2.1.8 */ {
//     opacity: 0;
//     padding: 0;
//     height: 0;
// }

@media screen and (max-width: 792px) {
.foo {
    flex-direction: column;
    // flex: 0 0 100%; 
    // height: 100%;
    &__copyr{
        margin-left: 0;
        margin-right: 0;
        order: 4;
    }
    &__about {
        margin-right: 0;
        order: 1;
        margin-bottom: 16px;
    }
    &__social{
        margin-right: 0;
        order: 3;
        margin-bottom: 24px;
    }
    &__about-info {
        order: 2;
        font-size: 16px;
        line-height: 24px;
        padding: 0;
        &-arr{
            margin-bottom: 16px;
        }

        &--show {
            padding: 0px 24px 56px 24px;
        }
        
    }
    &__about-cap {
            font-size: 20px;
            line-height: 24px;
            width: auto;
            margin: 0 0 16px 0;
        }
    &__about-text{
        width: auto;
    }    
}
}

</style>