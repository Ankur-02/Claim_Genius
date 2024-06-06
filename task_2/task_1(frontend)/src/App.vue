<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
  first_name: '',
  last_name: '',
  dob: null,
  mob_no: null,
  address: '',
})
const enter = ref({
  first_name: '',
  last_name: '',
  dob: null,
  mob_no: null,
  address: '',
})

const isEditing = ref(false)
const editingIndex = ref(null)
const allusers = ref([])
//const API_URL = "/api";
const del = ref(true)


const fetchStudents = async () => {
  try {
    const response = await axios.get("/api/crud/getall");
    allusers.value = response.data.data; 
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};


onMounted(fetchStudents);


const addItem = async () => {
  try {
    await axios.post("/api/crud/insert", user.value);
    await fetchStudents(); 
    resetForm();
  } catch (error) {
    console.error('Error adding student:', error);
  }
};


const delEntry = async (index) => {
  try {
    isEditing.value = true;
    editingIndex.value = index;
    const studentId = allusers.value[index].id; 
    await axios.delete(`/api/crud/delete/${studentId}`);
    isEditing.value = false;
    editingIndex.value = null;
    await fetchStudents(); 
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};



const editEntry =async (index) => {
  enter.value = allusers.value[index];
  isEditing.value = true;
  editingIndex.value = index;
  del.value =false;
};


const saveEntry = async (index) => {
  try {
    //console.log(enter.value);
    const studentId = allusers.value[index].id; 
    await axios.put(`/api/crud/update/${studentId}`, enter.value);
    
    await fetchStudents(); 
    isEditing.value = false;
    editingIndex.value = null;
    resetForm();
    del.value=true;
  } catch (error) {
    console.error('Error saving student:', error);
  }
};


const resetForm = () => {
  user.value = {
    first_name: '',
    last_name: '',
    dob: null,
    mob_no: null,
    address: '',
  };
};
</script>

<template>
  <div class="main">
    
      <h1 class="separate">ADMISSION FORM</h1>
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
          <button class = "editbtn" type="submit">Add</button>
        </div>
      </form>
    </div>
    <div class="show" v-if="allusers.length">
      <div class = "separate"><h2>DETAILS</h2></div>
      <table class = "center">
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
            <input v-else v-model="enter.first_name" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.last_name }}</span>
            <input v-else v-model="enter.last_name" required/>
          </td>
          <td class="num">
            <span v-if="!isEditing || editingIndex !== index">{{ item.dob }}</span>
            <input v-else type="date" v-model="enter.dob" required/>
          </td>
          <td class="num">
            <span v-if="!isEditing || editingIndex !== index">{{ item.mob_no }}</span>
            <input v-else type="number" v-model="enter.mob_no" required/>
          </td>
          <td class="forWidth">
            <span v-if="!isEditing || editingIndex !== index">{{ item.address }}</span>
            <input v-else v-model="enter.address" required/>
          </td>
          <td class="action">
            <button class="editbtn" @click="isEditing && editingIndex === index ? saveEntry(index) : editEntry(index)" style="margin-right: 10px;">
              {{ isEditing && editingIndex === index ? 'Update' : 'Edit' }}
            </button>
            <span v-if="del">
            <button class="dltbtn" @click="delEntry(index)" style="padding-right: 10px">Delete</button>
          </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>


h1{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 20pt;
  font-weight: bold;
}

h2{
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.add {
  width: 350px;
  border: 5px solid;
  border-radius: 20px;
  padding: 10px;
  background-color: #d5d5d5;
  margin-block-start: 30px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}


#btn{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
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
.center {
  margin-left: auto;
  margin-right: auto;
}

.separate{
  background-color: rgb(0, 98, 179);
  color:white;
  
}

.addbtn{
  background-color: rgb(118, 234, 118);
  border: none;
  border-radius: 5px;
}


.dltbtn{
  background-color: rgb(128, 26, 26);
  color: white;
  border: none;
  border-radius: 5px;
}

.editbtn{
  background-color: rgb(0, 138, 28);
  color: white;
  border: none;
  border-radius: 5px;
}


.num{
  text-align: right;
  width: 150px;
  margin: 10px;
}

.action{
  text-align: center;
  width: 150px;
  margin: 10px;  
}
</style>
