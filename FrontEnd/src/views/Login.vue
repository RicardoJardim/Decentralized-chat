<template>
  <div id="login">
    <form @submit.prevent="">
      <div class="row">
        <div class="col-25">
          <label for="username">Username</label>
        </div>
        <div class="col-75">
          <input
            name="username"
            type="text"
            v-model="username"
            minlength="3"
            maxlength="16"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="password">Password</label>
        </div>
        <div class="col-75">
          <input
            name="password"
            minlength="3"
            maxlength="16"
            v-model="password"
            type="password"
          />
        </div>
      </div>
      <button class="button" v-on:click="login">Login</button>
      <br />
      <button class="button" v-on:click="signup">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts">
import { user } from "@/main";
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "Home",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      user.auth(this.username, this.password, async () => {
        const alias = await user.get("alias");
        store.commit("setUsername", alias);
        /* this.$router.push({ name: "chat", params: { userId: "123" } }); */
        this.$router.push({ name: "Chat" });
      });
    },
    async signup() {
      user.create(
        this.username,
        this.password,
        (data: { ok: 0; pub: string } | { err: string }) => {
          if ("err" in data) {
            alert(data.err);
          } else {
            store.commit("setUsername", this.username);
            this.login();
          }
        }
      );
    },
  },
});
</script>

<style>
#login {
  display: block;
  background: #fff;
  margin: 10rem 5rem;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  border-radius: 20px;
  color: white;
  padding: 15px 32px;
  width: 10rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (min-width: 550px) {
  #login {
    padding: 4rem;
  }
}
#login > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#login > form {
  max-width: 100%;
}
#login h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}

input[type="text"],
input[type="password"] {
  width: 75%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25,
  .col-75 {
    width: 100%;
    margin-top: 0;
  }
}
</style>
