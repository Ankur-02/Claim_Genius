<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from '../routes' 

const login_user = ref({
  email: "",
  password: "",
});

const redirect_to_dashboard = async() =>{
  console.log("Register user called", login_user.value);
  const resp = await axios.post("/api/user/login", login_user.value);
  const check = resp.data.success;
  console.log(resp)
  if(!check){
    alert("Incorrect Username or Password!")
  }
  else{
    alert("User Logged In")
    reset();
    router.push('/dashboard')
  }
}

const reset = () => {
  login_user.value = ({
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
        <h3>LOGIN</h3>
        <div class="formm">
          <form v-on:submit.prevent="redirect_to_dashboard">
            <div class="entries">
              <label for="email">Email</label>
              <input type="text" 
                id="email"
                placeholder="Enter your Name"
                v-model="login_user.email"
                required />
            </div>
            <div class="entries">
              <label for="password">Password</label>
              <input type="text" 
                id="password"
                placeholder="Enter your Name"
                v-model="login_user.password"
                required/>
            </div>
            <div>
              <button class="btn" >Login</button><!--:disabled="login_user.email === '' || login_user.password === ''"-->
            </div>
          </form>
        </div>
        <div class="link-to-register">
          Don't Have an Account?
          <router-link to="/signup" class="link">Register</router-link>
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
  margin-top: 60px;
}

label {
  display: block;
  width: 100%;
  font-weight: bold;
  color: #333;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.link-to-register {
  margin-top: 50px;
  margin-left: 100px;
  color: black;
}

.btn {
  width: calc(100% - 40px);
  margin-left: 20px;
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
