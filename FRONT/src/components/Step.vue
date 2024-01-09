
<template>
  <div class="all-container">
    <div class="container">
      <ul class="progressbar">
        <li :class="index+1<step ?'valid': index+1 === step ? 'active' : '' " v-for="(i,index) in items" :key="index+1" > <span> {{index+1}}</span> <h1>{{i}}</h1></li>
      </ul>
    </div>
  </div>

</template>
<script >

export default {
  name: 'step-panier',
  components: {
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    step : {
      type: Number,
      required: true,
    }
  },
  data: () =>  ({
    total: 0,
  }),
  computed: {
  },
  methods: {
  },
};

</script>


<style scoped>
.all-container{
  width: 100%;
  box-sizing: border-box;
}
.container{

  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
}
.progressbar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;

}

.progressbar li{
  list-style-type: none;
  width: 70px;
  height: 70px;
  margin-right: 200px;
  background-color: white;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;


  color: #232731;
  text-align: center;
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}



.progressbar li:after{
  content:'';
  position: absolute;
  width: 200px;
  height: 7px;
  overflow: visible;
  top: 230px;
  transform: translateX(-135px);
  background: white;
}

.progressbar li:first-child:after{
  content:none;
}

.progressbar li:first-child{
  margin-left: 200px;
}

.progressbar li.test:first-child span{
  position: initial;
}

.progressbar li.active{
  background: linear-gradient(230deg, #A361BF 4.03%, #4980B0 125.29%);
  filter: drop-shadow(0px 4px 24px rgba(255, 255, 255, 0.25));
  color: white;
}

.progressbar li.valid{
  background: linear-gradient(230deg, #A361BF 4.03%, #4980B0 125.29%);
  color: white;
}

.progressbar li.valid:after{
  position: absolute;
  width: 200px;
  height: 7px;
  overflow: visible;
  background: linear-gradient(230deg, #A361BF 4.03%, #4980B0 125.29%);
}



.progressbar li.active:after{
  position: absolute;
  width: 200px;
  height: 7px;
  top: 30px;
  transform: translateX(-135px);
  background: linear-gradient(230deg, #A361BF 4.03%, #4980B0 125.29%);
}

h1{
  position: absolute;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  top: 270px;
}

.progressbar li.active h1{
  top: 70px;

}

</style>