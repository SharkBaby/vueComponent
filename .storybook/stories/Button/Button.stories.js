import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { withKnobs, text, boolean, object, number } from '@storybook/addon-knobs';

import Button from './Button.md';
import intro from './intro.md';
import design from './design.md';

import MyButton from './MyButton';

export default {
  title: 'Button',
  component: MyButton,
  parameters: {
    // notes: 'some documentation here',
    // notes: { Button },
    notes: { Introduction: intro, 'Design Notes': design },
  },
  decorators: [withKnobs]
};

export const TextTestWithAction = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked Hello Button in Text component') },
});
TextTestWithAction.story = {
  parameters: {
    notes: { Button },
  }
};

export const TextWithLinkTo = () => ({
  components: { MyButton },
  template: '<my-button @click="linkTo">Hello Button</my-button>',
  methods: { linkTo: linkTo('Button', 'second') },
});

export const Jsx = () => ({
  components: { MyButton },
  render(h) {
    return <my-button onClick={this.action}>With JSX</my-button>;
  },
  methods: { action: linkTo('clicked With JSX in Jsx component') },
});

export const Emoji = () => ({
  components: { MyButton },
  template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  methods: { action: action('clicked Emoji in Emoji component') },
});

// Assign `props` to the story's component, calling
// knob methods within the `default` property of each prop,
// then pass the story's prop data to the component’s prop in
// the template with `v-bind:` or by placing the prop within
// the component’s slot.
export const exampleWithKnobs = () => ({
  components: { MyButton },
  props: {
    isDisabled: {
      default: boolean('Disabled', false),
    },
    text: {
      default: text('Text', 'Hello Storybook'),
    },
    object: {
      default: object('defineObject', {boolValue: true, numberValue: 1, stringValue: 'hello Perry', objectValue: {key1: 'value', key2: 123}}),
    },
  },
  template: `<MyButton :isDisabled="isDisabled">{{ text }} {{object}}</MyButton>`
});
