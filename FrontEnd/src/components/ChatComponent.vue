<template>
  <div id="chat_component" :class="[checkMine ? 'mine' : 'other', 'ballon']">
    <h3 :id="textbox.id">{{ textbox.message }}</h3>
    <h3>{{ new Date(textbox.when) }}</h3>
    <h3>{{ textbox.who }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TextBox from "@/dto/TextBox.ts";
import store from "../store";

export default defineComponent({
  name: "ChatBox",

  props: {
    textbox: Object as PropType<TextBox>,
  },
  computed: {
    checkMine(): boolean {
      return this.textbox?.who == store.getters.getUsername ? true : false;
    },
  },
});
</script>

<style>
#chat_component {
  font: bold;
  font-size: 15px;
}
.mine {
  background-color: blue;
}

.other {
  background-color: red;
}
.ballon {
  border-radius: 25px;
}
</style>
