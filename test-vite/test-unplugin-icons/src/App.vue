<template>
  <!-- <icon-accessibility /> -->
  <icon-account-box style="font-size: 2em; color: red" />
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
// import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'

export default defineComponent({
  name: 'App',

  components: {
    // 'icon-accessibility': IconAccessibility,
    'icon-account-box': IconAccountBox,
  },

  setup() {
    const myState = reactive({ msg: 'hello world' })

    return {
      myState,
    }
  },
})
</script>
