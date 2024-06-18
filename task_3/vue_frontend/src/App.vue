<script setup>
import { ref } from 'vue';
import FormComponent from './components/FormComponent.vue';
import TableComponent from './components/TableComponent.vue';

const tableComponent = ref(null);

const handleStudentAdded = () => {
  if (tableComponent.value) {
    tableComponent.value.fetchStudents();
  }
};
</script>

<template>
  <div class="main">
    <div class="form-container">
      <h2>FORM</h2>
      <FormComponent @studentAdded="handleStudentAdded" />
    </div>
    <div class="table-container">
      <h2>DETAILS</h2>
      <TableComponent ref="tableComponent" />
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

.form-container{
  width:350px;
  margin-top: 30px;
}
.table-container {
  width: 100%;
  margin-left: 20px;
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

/* Ensure the form and table components take the full width of their containers */
.form-container > * {
  width: 100%;
}

.table-container > * {
  width: 100%;
}
</style>
