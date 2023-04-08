<template>
  <div>{{ myState.msg }}</div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    const myState = reactive({ msg: 'hello world' })

    return {
      myState,
    }
  },
})
</script>

<style>
#app {
  @apply dark:(bg-[#000000] text-[#ffffff]);
}
</style>
