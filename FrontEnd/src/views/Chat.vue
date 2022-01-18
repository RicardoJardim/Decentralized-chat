<template>
  <div id="wrapper">
    <div id="chat">
      <ChatComponent :textbox="el" v-for="el in messages" :key="el.id" />
    </div>

    <div id="box">
      <input name="text" minlength="1" v-model="text" />
      <button v-on:click="sendMessage">send message</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ChatComponent from "@/components/ChatComponent.vue";
import { user, db } from "@/main";
import { SEA } from "gun";

import store from "../store";
import TextBox from "@/dto/TextBox.ts";
const key = "#123";
export default defineComponent({
  name: "Home",
  components: { ChatComponent },
  data(): { text: string; messages: TextBox[] } {
    return {
      text: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      const secret = await SEA.encrypt(this.text, key);
      const secret2 = await SEA.encrypt(store.getters.getUsername, key);
      const message = user
        .get("all")
        .set({ who: secret2, message: secret, when: new Date().getTime() });
      const index = new Date().toISOString();
      db.get("chat").get(index).put(message);
      this.updateMessages({
        id: index,
        who: store.getters.getUsername,
        message: this.text + "",
        when: new Date().getTime(),
      });
      this.text = "";
    },
    updateMessages(data: TextBox) {
      if (data.message) {
        this.messages = [...this.messages.slice(-100), data].sort(
          (a: TextBox, b: TextBox) => a.when - b.when
        );
        let el = document.getElementById("chat");
        el?.scrollTo(0, el?.scrollHeight);
      }
    },
  },
  created() {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      ".": {
        // property selector
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      "-": 1, // filter in reverse
    };

    db.get("chat")
      .map()
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          var message: TextBox = {
            // transform the data
            id: id,
            who: (await SEA.decrypt(data.who, key)) + "", // a user might lie who they are! So let the user system detect whose data it is.
            message: (await SEA.decrypt(data.message, key)) + "", // force decrypt as text.
            when: data.when, // get the internal timestamp for the what property.
          };
          this.updateMessages(message);
        }
      });
  },
});
</script>

<style>
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
#chat {
  height: 80vh;
  width: 60vw;
  overflow: auto;
}

#box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
</style>
