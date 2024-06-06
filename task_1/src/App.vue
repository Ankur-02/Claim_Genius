<script setup>
import { ref } from 'vue'

const user = ref({
  first_name: '',
  last_name: '',
  dob: null,
  mob_no: null,
  address: '',
})
const isEditing = ref(false)
const editingIndex = ref(null)
const allusers = ref([])

function addItem(event) {
  event.preventDefault()
  allusers.value.push({ ...user.value })
  resetForm()
}

function resetForm() {
  user.value = {
    first_name: '',
    last_name: '',
    dob: null,
    mob_no: null,
    address: '',
  }
}

function delEntry(index) {
  allusers.value.splice(index, 1);
  isEditing.value = false;
}

function editEntry(index) {
  isEditing.value = true;
  editingIndex.value = index;
}

function saveEntry(index) {
  isEditing.value = false;
  editingIndex.value = null;
}
</script>

<template>
  <div class="main">
    
      <h1>ADMISSION FORM</h1><br><br>
      <div class="add">
      <form @submit.prevent="addItem">
        <div>
          <label for="fname">First Name: </label>
          <input type="text" id="fname" placeholder="Enter your First Name" v-model="user.first_name" required/>
        </div>
        <div>
          <label for="lname">Last Name: </label>
          <input type="text" id="lname" placeholder="Enter your Last Name" v-model="user.last_name" required/>
        </div>
        <div>
          <label for="dob">Date of Birth: </label>
          <input type="date" id="dob" v-model="user.dob" required/>
        </div>
        <div>
          <label for="mob">Mobile Number: </label>
          <input type="number" id="mob" placeholder="Enter your Mobile No." v-model="user.mob_no" required/>
        </div>
        <div>
          <label for="add">Address: </label>
          <input type="text" id="add" placeholder="Write your full address" v-model="user.address" required/>
        </div>
        <div id="btn">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
    <div class="show" v-if="allusers.length">
      <h2>Details</h2>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Mobile Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
        <tr v-for="(item, index) in allusers" :key="index">
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.first_name }}</span>
            <input v-else v-model="item.first_name" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.last_name }}</span>
            <input v-else v-model="item.last_name" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.dob }}</span>
            <input v-else type="date" v-model="item.dob" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.mob_no }}</span>
            <input v-else type="number" v-model="item.mob_no" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.address }}</span>
            <input v-else v-model="item.address" required/>
          </td>
          <td class="forWidth">
            <button @click="isEditing && editingIndex === index ? saveEntry(index) : editEntry(index)" style="margin-right: 10px;">
              {{ isEditing && editingIndex === index ? 'Update' : 'Edit' }}
            </button>
            <button @click="delEntry(index)" style="padding-right: 10px">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>


h1{
  margin-block-start: 30px;
  margin-left: 70px;
}
.add {
  width: 400px;
  border: 5px solid;
  padding: 10px;
  background-color: #d5d5d5;
  margin-block-start: 30px;
  margin-top: 5px;
}

#btn{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /*color: #c2b3b3*/
}


input{
  margin: 10px;
  width: 150px;
}


.forWidth{
  width: 150px;
  margin: 10px;
}

th{
  background-color: #dbbf8d
}
table, th, td {
  border: 1px solid black;
  color: black;
}
</style>
