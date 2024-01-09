

<template>
  <div class="choice-quantity">
    <h1>Choisissez votre nombre de billets</h1>
    <div class="quantity-container">
    <div >
      <h2>Adulte (15+)</h2>
      <div class="line-quantity">
        <div  v-for="(item, index) in quantity" :key="index" @click="selectedQuantity(item-1,0)" :class="selected[0]===item-1? 'quantity-card selected':'quantity-card'">
          <span class="quantity-number">{{item-1}}</span>
        </div>
      </div>
    </div>
      <div>
      <h2>Enfant (0-15)</h2>
        <div class="line-quantity">

        <div :class="selected[1]===item-1? 'quantity-card selected':'quantity-card'" v-for="(item, index) in quantity" :key="index" @click="selectedQuantity(item-1,1)">
        <span class="quantity-number">{{item-1}}</span>
        </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'choice-quantity',
  components: {},
  props: {
    quantity: {
      type: Number,
      required: true,

    },
  },
  data: () => ({
      selected: [0,0]
    }),
    methods: {
      selectedQuantity(item , index){
        this.selected.splice (index, 1, item);
        this.$emit('selected', this.selected);
    },
  },
}
</script>

<style scoped>

.choice-quantity h1{
  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  color: #E5E4EF;
  text-align: center;
  margin: 50px 0;
}

.line-quantity{
  background: rgba(255, 255, 255, 0.30);
  border-radius:10px ;
  display: flex;
  flex-direction: row;
  width: fit-content;

}

.quantity-card{
  border-radius: 10px;
  width: 50px;
  height: 50px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.selected{
  background: rgba(40, 10, 170, 0.40);
}
.quantity-container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 30px 0;
}


.quantity-card:hover{
  background: rgba(255,255, 255, 0.10);
}
.quantity-card:active{
  background: rgba(255,255, 255, 0.20);
}

.selected:hover{
  background: rgba(40, 10, 170, 0.50);
}

h2{
  margin: 10px 0;
}



</style>