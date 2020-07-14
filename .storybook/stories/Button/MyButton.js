export default {
  name: 'my-button',

  data() {
    return {
      buttonStyles: {
        border: '1px solid #eee',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        fontSize: 15,
        padding: '3px 10px',
        margin: 10,
      },
    };
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  template: `
    <button :style="buttonStyles" @click="onClick" :disabled="isDisabled">
      <slot></slot>
    </button>
  `,

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};