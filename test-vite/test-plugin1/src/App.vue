<template>
  <div v-if="myState.isShow">
    指令v-if="myState.isShow", myState.isShow值为true
  </div>
  <div v-else>指令v-else, myState.isShow值为false</div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
export default defineComponent({
  name: 'App',

  setup() {
    const myState = reactive({ isShow: true, text: 'hello world' })

    setTimeout(() => {
      myState.isShow = false
    }, 3000)

    return {
      myState,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
