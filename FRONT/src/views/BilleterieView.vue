<template>
  <p>Hello</p>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'BilleterieView',

})
</script>

<style>
.card {
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  border: solid 1px black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2%;
  width: 30%;
}

.card-header {
}

.card-text {
}

.card-bottom {
}

.btn {
  background-color: #FEB42D;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 4%;
  padding-top: 4%;
}

.btn:hover{
  background-color: white;
  color: #FEB42D;
  border: #FEB42D solid 2px;
}
</style>
