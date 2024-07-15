<script setup lang="ts">
import { ref } from "vue";
import FormComponent from "./FormComponent.vue";
import TableComponent from "./TableComponent.vue";
import router from '../routes';
import axios from 'axios'

const tableComponent = ref();

const handleStudentAdded = async () => {
  if (tableComponent.value) {
    await tableComponent.value.fetchStudents();
  }
};

async function setCookie() {

  await axios.post(`/api/user/logout`)
  document.cookie = "authorization=; expires= 02 01 2002 00:00:00 GMT";

}

function logout(){
  setCookie()
  router.push('/');
  
}
</script>

<template>
  <div class="real-main">
    <div class="main">
      <div class="form-container">
        <h2>FORM</h2>
        <FormComponent @studentAdded="handleStudentAdded" />
      </div>
      <div class="table-container">
        <div class="logout">
          <button @click="logout" class="logout-button">Logout</button>
        </div>
        <h2>DETAILS</h2>
        <TableComponent ref="tableComponent" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.form-container {
  width: 350px;
  margin-top: 65px;
}

.table-container {
  width: 100%;
  margin-left: 50px;
  margin-top: 30px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: rgb(0, 98, 179);
  padding: 10px;
  border-radius: 10px;
}
.logout{
  text-align: right;
  margin-bottom: 10px;
}

.logout-button{
  background-color: green;
  color: white;
}
</style>
