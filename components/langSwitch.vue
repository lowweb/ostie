<template>
  <div class="lang-switch">

    <div class="lang-switch__el" :class="{'lang-switch__el--active': $i18n.locale=='ru'}">
      <nuxt-link :to="switchLocalePath('ru')" :class="{'link--disable': $i18n.locale=='ru', 'link link--br': $i18n.locale!='ru'}">Rus</nuxt-link>
    </div>
    <div class="lang-switch__el" :class="{'lang-switch__el--active': $i18n.locale=='en'}">
      <nuxt-link :to="switchLocalePath('en')" :class="{'link--disable': $i18n.locale=='en', 'link link--br': $i18n.locale!='en'}">Eng</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeTo(val) {
      this.$i18n.setLocale(val);
    }
  }
}
</script>

<style lang="scss">
.lang-switch {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
  gap: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  color: #403F4C;

  @media screen and (max-width: 680px) {
    margin-bottom: 8px;
  }

  &__el {
    width: 44px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
      position: relative;
      color: #403F4C;
      background-color: #F0F1F2;
      border-radius: 6px;
      // animation: makeactive .2s linear;
      
    }
  }


}

@keyframes makeactive {
  0% {scale: 1.5;}
  100% {scale: 1;}
  
}
</style>