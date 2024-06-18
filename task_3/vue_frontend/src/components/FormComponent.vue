<script setup>
import { ref } from 'vue';
import axios from 'axios';


const user = ref({
  first_name: '',
  last_name: '',
  dob: null,
  mob_no: null,
  address: '',
})

const emit = defineEmits(['studentAdded']);

const addItem = async () => {
  try {
    await axios.post("/api/crud/insert", user.value);
    //await fetchStudents(); 
    emit('studentAdded');
    resetForm();
  } catch (error) {
    console.error('Error adding student:', error);
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
  <div>
    <!-- <h1 class="separate">WELCOME TO MY CRUD APPLICATION</h1> -->
      <!--Form-->
        <div class="add">
            <form @submit="addItem">
                <div>
                    <label class="label" for="fname">First Name: </label>
                    <input  type="text" id="fname" placeholder="Enter your First Name" v-model="user.first_name" required/>
                </div>
                <div>
                    <label class="label" for="lname">Last Name: </label>
                    <input type="text" id="lname" placeholder="Enter your Last Name" v-model="user.last_name" required/>
                </div>
                <div>
                    <label class="label" for="dob">Date of Birth: </label>
                    <input type="date" id="dob" v-model="user.dob" required/>
                </div>
                <div>
                    <label class="label" for="mob">Mobile Number: </label>
                    <input type="text" id="mob" placeholder="Enter your Mobile No." v-model="user.mob_no" required/>
                </div>
                <div>
                    <label class="label" for="add">Address: </label>
                    <input type="text" id="add" placeholder="Write your full address" v-model="user.address" required/>
                </div>
                <div id="btn">
                    <button class = "editbtn" type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>
h1 {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 16pt;
  font-weight: bold;
  color: white;
  background-color: rgb(0, 98, 179);
  padding: 10px;
  border-radius: 10px;
}

.add {
  width: 350px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.label {
  display: block;
  width: 100%;
  margin-bottom: 5px;
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

input::placeholder {
  color: #999;
}

input[type="date"] {
  padding-right: 10px;
}

#btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.editbtn {
  width: 100%;
  padding: 10px 15px;
  background-color: rgb(0, 138, 28);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.editbtn:hover {
  background-color: rgb(0, 115, 23);
}

.separate {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  background-color: rgb(0, 98, 179);
  color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>

