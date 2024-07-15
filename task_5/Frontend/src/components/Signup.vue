<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const login_user = ref({
  name: "",
  email: "",
  password: "",
});

const register_user = async () => {
  try {
    console.log("Register user called", login_user.value);

    const data = await axios.post("/api/user/signup", login_user.value);
    if (data.status){
      alert('User Registered Successfully')
    }
    else{
      alert(`Account already exist with email : ${login_user.value.email}`)
    }
    reset();
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

const reset = () => {
  login_user.value = ({
    name: "",
    email: "",
    password: "",
  });
};
</script>

<template>
  <div class="main">
    <h1>CRUD APPLICATION</h1>
    <div class="body">
      <div class="img">
        <img
          src="C:\Users\manis\Desktop\My_Projects\task_5\Frontend\signup.jpg"
          alt="Couldn't load iamge"
          width="95%"
          height="95%"
        />
      </div>
      <div class="signup-container">
        <h3>CREATE ACCOUNT</h3>
        <div class="formm">
          <form v-on:submit.prevent="register_user">
            <div class="entries">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                v-model="login_user.name"
                required
              />
            </div>
            <div class="entries">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your Email Id"
                v-model="login_user.email"
                required
              />
            </div>
            <div class="entries">
              <label for="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder="Enter Password"
                v-model="login_user.password"
                required
              />
            </div>
            <div>
              <button class="btn">Register</button>
            </div>
          </form>
        </div>
        <div class="login-link">
          <router-link to="/" class="link">Click here to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
}

.main {
  background-color: aquamarine;
  width: 100%;
  height: 675px;
}
.body {
  border: 1px solid black;
  display: flex;
  margin: 50px;
  background-color: #fff7f7;
  border-radius: 15px;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 500px;
  /* border:1px solid black; */
}
.signup-container {
  /* border: 1px solid black; */
  margin: 20px;
  width: 30%;
  border-radius: 10px;
  background-color: #f5f5f5;
}

h3 {
  margin: 20px;
  font-weight: bold;
}

label {
  display: block;
  width: 100%;
  font-weight: bold;
  color: #333;
}

.login-link {
  margin-top: 20px;
  margin-left: 200px;
  color: black;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn {
  width: calc(100% - 20px);
  margin-left: 10px;
  padding: 10px 15px;
  background-color: rgb(16, 0, 138);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.entries {
  margin: 20px;
}

.link {
  color: #0d00ff;
}
</style>
