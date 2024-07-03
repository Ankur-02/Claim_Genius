<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Ref } from 'vue'


interface User {
    id?: number;
    first_name: string;
    last_name: string;
    dob: string;
    mob_no: string;
    address: string;
}


const enter = ref({
  first_name: '',
  last_name: '',
  dob: '',
  mob_no: '',
  address: '',
})


const isEditing = ref(false)
const editingIndex: Ref<number | null> = ref(null); 
const allusers:Ref<User[]> = ref([])
const del = ref(true)
const searchBox = ref('')
const arrForSorting = ref(['first_name','last_name','dob','mob_no','address'])
const sortNormal = ref('asc')
const sortrev = ref('desc')
const totalUser: Ref<number> = ref(0); 
const perPage = ref(3);
const page = ref(1);
const col=ref('id');
const typeS = ref('desc')
const arrPerPage = [3,5,7,10,15,20]
const totalPage =ref(0)





// const totalPages = ()=>{
//   totalPage.value =Math.ceil(totalUser.value/perPage.value);
//   return totalPage;
// }

const fetchStudents = async () => {
  try {
    console.log('Fetch Students data ');
    
    const response = await axios.get(`/api/crud/page?pageNo=${page.value}&noOfData=${perPage.value}&dataFetch=${searchBox.value}&sortType=${typeS.value}&colName=${col.value}`);
    console.log(page.value)
    allusers.value = response.data.data; 
    totalUser.value=response.data.searchTotal;
    if(totalUser.value!=0){
      totalPage.value =Math.ceil(totalUser.value/perPage.value);
    }
    else{
      totalPage.value=0;
    }
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

defineExpose({
    fetchStudents
})

onMounted(async () => {
  await fetchStudents();
});




const delEntry = async (index:number) => {
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



const editEntry =async (index:number) => {
  enter.value = allusers.value[index];
  isEditing.value = true;
  editingIndex.value = index;
  del.value =false;
  await fetchStudents(); 
};


const saveEntry = async (index:number) => {
  try {
    const studentId = allusers.value[index].id;
    await axios.put(`/api/crud/update/${studentId}`, enter.value);
    
    await fetchStudents(); 
    isEditing.value = false;
    editingIndex.value = null;
    // resetForm();
    del.value=true;
  } catch (error) {
    console.error('Error saving student:', error);
  }
};

const searchData = async() =>{
  try {
    isEditing.value = false;
    await fetchStudents();
    if(searchBox.value && totalPage.value==0){
      page.value=0
      await fetchStudents();
    }
    else if(page.value>totalPage.value){
      page.value=1;
      await fetchStudents();
    }
    else if(page.value==0 && totalPage.value!=0){
      page.value=1;
      await fetchStudents();
    }
  } catch (error) {
    console.error('Error searching students:', error);
  }
}

const sortData = async(colName:string, sortType:string)=>{
  try {
    isEditing.value = false;
    col.value = colName;
    typeS.value = sortType;
    await fetchStudents();
  } catch (error) {
    console.error('Error searching students:', error);
  }
}

const changePerPage = async() => {
  page.value = 1;
  await fetchStudents();
}


const changePage = async(pageNum:number) => {
  isEditing.value = false;
    page.value = pageNum;
    if(col.value!="" && typeS.value!=""){
        await sortData(col.value, typeS.value);
    }
    else{
      await fetchStudents();
    }
    if(searchBox.value){
        await searchData();
    }
    else{
      await fetchStudents();
    }
}

</script>

<template>
  <div class="main">
    <div>
      <div class="nav">
        <span class="perpage">
          <label for="perpage">Entries Per Page : </label>
          <select v-model="perPage" v-on:change="changePerPage()" id="perpage">
          <option v-for="i in arrPerPage" :value="i">{{ i }}</option>
              <!-- <option value = "2">2</option>
              <option value = "3">3</option>
              <option value = "4">4</option>
              <option value = "5">5</option>
              <option value = "10">10</option>
              <option value = "15">15</option> -->
          </select>
        </span>
        <span class="search">
          <label for="search">Search : </label>
          <!-- <input @keyup.enter="searchData()" type="text" id="search" placeholder="Search here" v-model="searchBox"/> -->
          <input v-on:input="searchData()" type="text" id="search" placeholder="Search here" v-model="searchBox"/>
        </span>
      </div>
      <!--Table-->
      <table class = "center">
        <thead>
          <tr>
            <th>First Name
              <span class="sort">
                <button class="asort" @click="sortData(arrForSorting[0],sortNormal)">⏫</button>
                <button class="dsort" @click="sortData(arrForSorting[0], sortrev)">⏬</button>
              </span>
            </th>
            <th>Last Name
              <span class="sort">
                <button class="asort" @click="sortData(arrForSorting[1],sortNormal)">⏫</button>
                <button class="dsort" @click="sortData(arrForSorting[1], sortrev)">⏬</button>
              </span>
            </th>
            <th>Date of Birth
              <span class="sort">
                <button class="asort" @click="sortData(arrForSorting[2],sortNormal)">⏫</button>
                <button class="dsort" @click="sortData(arrForSorting[2], sortrev)">⏬</button>
              </span>
            </th>
            <th>Mobile Number
              <span class="sort">
                <button class="asort" @click="sortData(arrForSorting[3],sortNormal)">⏫</button>
                <button class="dsort" @click="sortData(arrForSorting[3], sortrev)">⏬</button>
              </span>
            </th>
            <th>Address
              <span class="sort">
                <button class="asort" @click="sortData(arrForSorting[4],sortNormal)">⏫</button>
                <button class="dsort" @click="sortData(arrForSorting[4], sortrev)">⏬</button>
              </span>
            </th>
            <!--Table Values-->
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="totalUser">
          <tr v-for="(item, index) in allusers" :key="index">
            <td class="forWidth">
              <span v-if="!isEditing || editingIndex !== index">{{ item.first_name }}</span>
              <input v-else type="text" v-model="enter.first_name" required/>
            </td>
            <td class="forWidth">
              <span v-if="!isEditing || editingIndex !== index">{{ item.last_name }}</span>
              <input v-else type="text" v-model="enter.last_name" required/>
            </td>
            <td class="num">
              <span v-if="!isEditing || editingIndex !== index">{{ item.dob }}</span>
              <input v-else type="date" v-model="enter.dob"/>
            </td>
            <td class="num">
              <span v-if="!isEditing || editingIndex !== index">{{ item.mob_no }}</span>
              <input v-else type="text" v-model="enter.mob_no" required/>
            </td>
            <td class="forWidth">
              <span v-if="!isEditing || editingIndex !== index">{{ item.address }}</span>
              <input v-else type="text" v-model="enter.address" required/>
            </td>
            <td class="action">
              <button class="editbtn" @click="isEditing && editingIndex === index ? saveEntry(index) : editEntry(index)" style="margin-right: 10px;">
                {{ isEditing && editingIndex === index ? 'Update' : 'Edit' }}
              </button>
              <span>
                <button class="dltbtn" @click="delEntry(index)" style="padding-right: 10px">Delete</button>
              </span>
            </td>
          </tr>
        </tbody>
        <tbody class="nrf" v-else>
          <td colspan="6">
            No Records Found
          </td>
        </tbody>
        </table>
        <!--Pagination-->
        <div class="pagination">
          <button @click="changePage(1)" :disabled="page === 1 || page===0"><<</button>
          <button @click="changePage(page - 1)" :disabled="page === 1 || page===0"><</button>
          <span>{{ page }} of {{ totalPage }}</span>
          <button @click="changePage(page + 1)" :disabled="page === totalPage">></button>
          <button @click="changePage(totalPage)" :disabled="page === totalPage">>></button>
        </div>
      </div>
  </div>
</template>

<style scoped>

h2 {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: white;
  background-color: rgb(0, 98, 179);
  padding: 10px;
  border-radius: 10px;
}

.table-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.table {
  flex: 1;
  border-collapse: collapse;
  margin-left: 20px;
  width: 500px;
}

th, td {
  border: 2px solid #000;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #dbbf8d;
}

.forWidth {
  width: 150px;
  margin: 10px;
}

.num {
  text-align: right;
  width: 150px;
  margin: 10px;
}

.action {
  text-align: center;
  width: 150px;
  margin: 10px;  
}

.dltbtn, .editbtn {
  background-color: rgb(128, 26, 26);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.editbtn {
  background-color: rgb(0, 138, 28);
}

.dltbtn:hover, .editbtn:hover {
  background-color: rgba(37, 27, 122, 0.8);
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.search {
  text-align: right;
  clear: both;
  float: right;
  margin-right: 15px;
}

.sort {
  display: flex;
  align-items: center;
}

.asort, .dsort {
  margin-right: 5px;
  font-size: 0.84rem;
  background: none;
  border: none;
  cursor: pointer;
}

.nrf {
  text-align: center;
  color: red;
}

.nav {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input{
    width:100px;
}

</style>


