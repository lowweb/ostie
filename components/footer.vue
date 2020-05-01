<template>
    <footer class="foo">
        <div class="foo__copyr">Ostie © 2015–2020</div>
        <a href="" class="foo__about link">О проекте</a> 
        <a href="" class="foo__social link">Ostie в Telegram</a>
    </footer>
</template>
<style lang="scss">
.foo {
    height: 72px;
    background: #F0F1F2;
    flex: 0 0 72px;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;

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

@media screen and (max-width: 820px) {
.foo {
    padding: 24px 0;
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
}
}
</style>