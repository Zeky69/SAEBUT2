<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected.libelle }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div @click="
          selected = {value: '', libelle: $t('map2D.allCategories')};
          open = false;
          $emit('input', {value: '', libelle: $t('map2D.allCategories')});
        "> {{ $t('map2D.allCategories') }}</div>
      <div
          v-for="(option, i) of options"
          :key="i"
          @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.libelle }}
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
      type: Object,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : {value: '', libelle: this.$t('map2D.allCategories')},
      open: false,
    };
  },
  watch: {
    '$i18n.locale': function() {
      this.selected = this.default
          ? this.default
          : this.options.length > 0
              ? this.options[0]
              : {value: '', libelle: this.$t('map2D.allCategories')};
    }
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
  width: 80%;
  text-align: left;
  outline: none;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.40);
}

.custom-select .selected {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  border: 1px solid #666666;
  color: #fff;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid;
  border-color:  rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.4) transparent rgba(255, 255, 255, 0.4);
  border-radius: 6px 6px 0 0;
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
  transform: rotate(-45deg) translate(0, -100%);
  transform-origin: center center;
  transition: transform ease-in-out 100ms
}

.custom-select .selected.open:after {
  transform: rotate(135deg) translate(50%, 100%);
}

.custom-select .items {
  color: #fff;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  border: 1px solid;
  border-color: transparent rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.4)  rgba(255, 255, 255, 0.4);
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
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
