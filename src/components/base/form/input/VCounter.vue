<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      :value="counter"
      @input="onInput($event.target.value)"
      name="count"
    />

    <button type="button" aria-label="Добавить один товар" @click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: "counter",
    event: "setCounter",
  },
  props: {
    counter: Number,
  },
  methods: {
    decrement() {
      if (this.counter < 2) return;
      this.$emit("setCounter", this.counter - 1);
    },
    increment() {
      this.$emit("setCounter", this.counter + 1);
    },
    onInput(value) {
      this.$emit("setCounter", value);
    },
  },
};
</script>
