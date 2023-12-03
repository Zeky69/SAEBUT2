<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div @click="
          selected = defaults;
          open = false;
          $emit('input', '');
        "> {{defaults}}</div>
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: '',
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      defaults: this.default,
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", '');
  },
};
</script>

<style scoped>



@keyframes menuSlideDown {
  0% {
    height: 0;
  }
  100% {
    height: 120px;
  }
}

.items {
  animation: menuSlideDown 0.3s ease-in-out;
}




.custom-select {
  position: relative;
  width: 10%;
  min-width: 150px;
  max-width: 200px;
  text-align: left;
  outline: none;
  height: 100%;
  line-height: 50px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.40);
}

.custom-select .selected {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0 30px 30px 0;
  color: #fff;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border-color:  rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.4) transparent rgba(255, 255, 255, 0.4);
  border-radius: 0 25px 0 0;

}

.custom-select .selected:after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 22px;
  right: 1em;
  width: .5rem;
  height: .5rem;
  border-bottom: 1px solid currentColor;
  border-left: 1px solid currentColor;
  border-bottom-left-radius: 2px;
  transform: rotate(-45deg) translate(0, -50%);
  transform-origin: center center;
  transition: transform ease-in-out 100ms
}

.custom-select .selected.open:after {
  transform: rotate(135deg) translate(50%, 50%);
}

.custom-select .items {
  color: #fff;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(50px);
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.selected{
  text-align: center;
}

.selectHide {
  display: none;

}

</style>
