<template>
    <div id="vue-test">
        <h1>VueTest Component</h1>
        <p>Value is: {{ value }}</p>
        <button @click="increment">Click to Increment</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 0
        }
    },
    methods: {
        increment() {
            this.value++;
        }
    }
}
</script>