<template>
    <div class="checkmark draw"></div>
</template>
<style lang="scss" scoped>
// Define vars we'll be using
$brand-success: #19BE65;
$loader-size: 1.2em;
$check-height: $loader-size/1.5;
$check-width: $check-height/1.5;
$check-left: ($loader-size/6 + $loader-size/12);
$check-thickness: 4px;
$check-color: $brand-success;


.checkmark {

  
  &.draw:after {
    animation-duration: 800ms;
    animation-timing-function: ease;
    animation-name: checkmark;
    transform: scaleX(-1) rotate(135deg) translate(-50%, 0%);
  }
  
  &:after {
    opacity: 1;
    height: $check-height;
    width: $check-width;
    transform-origin: left top;
    border-right: $check-thickness solid $check-color;
    border-top: $check-thickness solid $check-color;
    content: '';
    left: 0;
    top: 50%;
    position: absolute;
  }
}



@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: $check-width;
    opacity: 1;
  }
  40% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
  100% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
}
</style>