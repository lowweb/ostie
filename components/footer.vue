<template>
    <footer class="foo">
        <div class="foo__copyr">Ostie © 2015–2020</div>
        <a href="" class="foo__about link" @click.prevent="showInfo">О проекте</a> 
        <a href="" class="foo__social link">Ostie в Telegram</a>
        <transition name="showninfo">
        <div class="foo__about-text" v-if="isShowInfo">
            <div class="foo__about-text-cap">Краткая информация о проекте</div>
            <div>Ostie.org помогает найти фильм по его саундтреку.
Если вам хочется узнать, в каком фильме звучала та самая песня или в создании саундтрека к какому фильму принимала участие ваша любимая группа или исполнитель – Ostie легко и просто ответит на эти вопросы.</div>
        </div>
        </transition>
    </footer>
</template>
<script>
export default {
    data: () => ({
        isShowInfo: false
    }),
    methods: {
        showInfo () {
            
            this.isShowInfo=!this.isShowInfo
            setTimeout(function(){
                window.scrollTo({
                    top: document.body.scrollHeight,
                     behavior: "smooth"
                })
                
            }, 350);
            
        }
    }
   

    
}
</script>
<style lang="scss">
.foo {
    // height: 72px;
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
    align-items: center;
    padding: 24px 0;

    // transition: max-height .5s, padding .5s;
    &__about-text {
        padding: 48px 0 40px 0;
        margin: 0 auto;
        max-width: 744px;
        // height: 0;
        overflow: auto;
        // padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: 'Roboto', sans-serif;;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #403F4C;
        // transition: height .2s, padding .8s;

        &-cap {
            font-family: 'Roboto Condensed', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 32px;
            line-height: 40px;
            color: #403F4C;
            margin-bottom: 16px;
        }

        &--shown{
            padding: 48px 0 40px 0;
            height: 100%;
            transition: height .5s, padding .8s;
        }

    }
    // &__about--act ~ &__about-text  {
    //     padding: 48px 0 40px 0;
    //     max-height: auto;

    // }
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
        cursor: pointer;
    }
    &__social{
        margin-right: auto;
        cursor: pointer;
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

.showninfo-enter-active {
//   transition: opacity .5s;
transition: height .2s, padding .5s, opacity .8s;
 
}
.showninfo-enter/* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
padding: 0;
  height: 0;
}

@media screen and (max-width: 820px) {
.foo {
    
    flex-direction: column;
    flex: 0 0 100%; 
    height: 100%;
    
    &__copyr{
        margin-left: 0;
        margin-right: 0;
        order: 3;
    }
    &__about {
        margin-right: 0;
        order: 1;
        margin-bottom: 16px;
    }
    &__social{
        margin-right: 0;
        order: 2;
        margin-bottom: 24px;
    }
    &__about-text {
        order: 4;
        margin-left: 24px;
        margin-right: 24px;
    }
}
}
</style>