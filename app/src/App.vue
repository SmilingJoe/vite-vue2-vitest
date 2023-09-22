<template>
  <div id="app">
    {{ greeting }}
    <VueTest />
  </div>
</template>

<script>
import VueTest from './components/VueTest.vue';

export default {
    components: {
      VueTest
    },
    data() {
        return {
            greeting: 'Hello world.'
        };
    }
};
</script>
