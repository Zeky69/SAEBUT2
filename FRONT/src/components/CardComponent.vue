<template>
  <div class="card">
    <div class="card-header">
      <img src="../assets/fete-foraine.jpg" style="border-radius: 20px; width: 100%;height: 100%;">
    </div>
    <div class="card-text">
      <p style="font-size: 20px">{{this.title}}</p><br>
      <p>{{this.description}}</p>
    </div>
    <div class="card-bottom">
      <a class="btn">Je fonce !</a>
    </div>
  </div>
</template>

<script>
export default {
  name:'CardComponent',
  props:{
    title:String,
    description:String,
  }
}
</script>

<style>
.card {
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 40px;
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
