<template>
<div>
<label class="switch">
  <input type="checkbox" @click="toogle" v-model="checked">
  <span class="slider">
    <svg class="slider__btn" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="white"/>
    <path d="M9 5L6 8L9 11" stroke="#1C9CF7" stroke-width="2"/>
    </svg>
  </span>
</label>
</div>
</template>

<script>

export default {
  computed: {
     checked: {
        get() {
            return this.$store.state.toogleswitch.checked
        },
        set(value){   
            this.$store.commit('toogleswitch/change',value)
        }
          
      },
  },
  methods: {
    toogle() {
      this.$emit('changeSearchType')
    }
  }
}
</script>

<style lang="scss" scoped>

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  
  
  & input { 
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
        background-color: #FF2B67;
    }

    &:checked + .slider:before {
      transform: translateX(20px);
      box-shadow: 0px 2px 3px #D31C50;
    }

    &:checked + .slider > .slider__btn{
      transform: translateX(20px) rotate(180deg);

      & path {
        stroke: #D31C50;
      }
    } 
  }


}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  background-color: #1C9CF7;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 24px;
  
  &__btn {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    transition: .4s;
    border-radius: 50%;
    // box-shadow: 0px 2px 3px #0072C2;
  }

    &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0px 2px 3px #0072C2;
  }




}


@media screen and (max-width: 680px) {

 .switch {
  & input { 
    &:checked + .slider > .slider__btn{
      & path {
        stroke: #ffffff;
      }
    } 
  }


} 
.slider__btn  path{
  stroke: #ffffff;

  }
}

</style>