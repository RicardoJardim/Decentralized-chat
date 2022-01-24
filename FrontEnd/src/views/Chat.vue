<template>
  <div class="chatComp">
    <div id="wrapper">
      <div id="chat">
        <BallonComponent :textbox="el" v-for="el in messages" :key="el.id" />
      </div>

      <div class="container">
        <textarea
          id="text"
          name="text"
          minlength="1"
          placeholder="Aa"
          v-model="text"
          rows="3"
          cols="40"
        />
        <button v-on:click="sendMessage" id="send">
          <img src="../assets/send.png" alt="send" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BallonComponent from "@/components/BallonComponent.vue";
import { user, db } from "@/main";
import { SEA } from "gun";

import store from "../store";
import TextBox from "@/dto/TextBox.ts";

const key = "#123";
export default defineComponent({
  name: "Home",
  components: { BallonComponent },
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
    scrollDown(): void {
      let container = document.getElementById("chat");
      if (container) container.scrollTop = container.scrollHeight;
    },
    updateMessages(data: TextBox) {
      if (data.message) {
        this.messages = [...this.messages.slice(-100), data].sort(
          (a: TextBox, b: TextBox) => a.when - b.when
        );
      }
    },
  },
  updated() {
    this.scrollDown();
  },
  created() {
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
  mounted() {
    this.scrollDown();
    console.log("mounterd");
  },
});
</script>

<style>
.chatComp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 3vh;
  height: 90vh;
  width: 65vw;
}
#chat {
  padding: 1vw;
  width: 100%;
  min-height: 70vh;
  overflow: auto;
  background-color: #d9d9d9;
}

#box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.container {
  display: flex;
  padding: 1vw;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-flow: row wrap;
  gap: 10px;
  width: 100%;
  background-color: #42b983;
  box-shadow: 2px -5px 7px 0px grey;
  border-radius: 0px 00px 10px 10px;
}

.container > textarea {
  padding: 12px 40px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 25px;
  width: 80%;
  resize: none;
}

#send {
  color: white;
  border: none;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 25px;
  background-color: green;
}
#send:focus {
  border-color: blue;
}

#send > img {
  width: 24px;
  height: auto;
  align-items: center;
  align-self: center;
  align-content: center;
  -webkit-filter: invert(1);
  filter: invert(1);
  padding: 0px 10px;
}

#send:hover {
  opacity: 0.8;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media screen and (max-width: 600px) {
  #wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin-top: 3vh;
    height: 93vh;
    width: 90vw;
  }

  .container > textarea {
    padding: 12px 40px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 25px;
    width: 70%;
  }

  #send {
    color: white;
    border: none;
    cursor: pointer;
    padding: 12px 15px;
    border-radius: 25px;
    background-color: green;
  }

  #send > img {
    width: 20px;
    height: auto;
    align-items: center;
    align-self: center;
    align-content: center;
    -webkit-filter: invert(1);
    filter: invert(1);
    padding: 0px 5px;
  }
}
</style>
