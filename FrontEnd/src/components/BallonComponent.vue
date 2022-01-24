<template>
  <div :id="textbox.id" :class="[checkMine ? 'mine' : 'others', 'chatBallon']">
    <span class="title">{{ textbox.who }}</span>

    <span class="text">{{ textbox.message }}</span>
    <span class="title when">{{ getFormatedDate }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TextBox from "@/dto/TextBox";
import store from "../store";

export default defineComponent({
  name: "BallonComponent",

  props: {
    textbox: Object as PropType<TextBox>,
  },
  computed: {
    checkMine(): boolean {
      return this.textbox?.who == store.getters.getUsername ? true : false;
    },
    getFormatedDate(): string {
      if (this.textbox) {
        const date = new Date(this.textbox.when);
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()
        );
      } else {
        return "";
      }
    },
  },
});
</script>

<style>
.chatBallon {
  width: fit-content;
  max-width: 70%;
  min-width: 30%;
  padding: 0.7rem 0.8rem;
  border-radius: 25px;
  margin-top: 0.6rem;
  font-size: 14px;
  display: flex;
  flex-flow: column;
}

.chatBallon.mine {
  background-color: #42b983;
  color: black;
  margin-left: auto;
  margin-right: 0;
}

.chatBallon.others {
  background-color: green;
  color: white;
}

.chatBallon.newuser {
  background-color: white;
  color: rgb(59, 59, 59);
}
.title {
  text-align: right;
  font-weight: 600;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
}
.text {
  padding: 0.4rem 0.3rem;
  text-align: left;
  word-wrap: break-word;
  text-transform: capitalize;
  white-space: pre-wrap;
  overflow: hidden;
}
.when {
  font-size: 0.7rem;
  font-weight: 400;
}
</style>
