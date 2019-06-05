<template>
  <div id="app">
    <transition name="bounce">
      <router-view/>
    </transition>
  </div>
</template>

<style>
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    1% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>