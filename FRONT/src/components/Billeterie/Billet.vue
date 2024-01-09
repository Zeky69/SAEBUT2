<template>
<div class="billet-container">



    <h1 class="title-billet">Choisissez votre billet</h1>
    <div class="card-container">

      <div  v-for="(item, index) in items" :key="index" :class="selected!=null && selected.id === item.id ? 'active card': 'card'"  @click="selection(item)">
        <div class="header-card">
          <div class="header-title-container">
          <span class="title-card">{{item.title}}</span>
          <span class="day-card">{{item.day}} jour{{item.day>1?'s':''}} </span>
          </div>
          <div class="price-container">
          <span class="price-card">{{item.price}}€</span>
          </div>
        </div>
        <div class="dotted"></div>
        <div class="footer-card">
          <ul>
            <li v-for="(i, index2) in item.caracteristic" :key="index2" >
              <img class="li-logo" src="@/assets/icons/check.svg" alt="check">
              <span class="li-text">{{i}}</span>
            </li>
          </ul>
        </div>

      </div>

    </div>

</div>
</template>

<script >
export default {
  name: 'choice-billet',
  components: {
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    idselect:
        {
          type: String,
          required: false,
        },
  },
  data: () =>  ({
    selected: null,

  }),
  computed: {
  },
  mounted() {
    if (this.idselect !== null){
      this.selected = this.items.find((item) => item.id === this.idselect);
    }
  }
  ,
  methods: {
    selection(item){
      if (this.selected === null){
        this.selected = item;
      }
      else if (this.selected.id === item.id){
        this.selected = null;
      }
      else{
      this.selected = item;
    }
    this.$emit('selected' , this.selected);
    },


  },
};

</script>
<style scoped>

.billet-container{
  margin-bottom:60px;
}

.title-billet{
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

.card-container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}

.card{
  background: rgba(229, 228, 239, 0.35);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(25px);
  width: 25%;
  min-width: 300px;
  max-width: 350px;
  height: 350px;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer ;
  border : solid 3px rgba(255, 255, 255, 0.20);
  margin : 10px 0;


}

.title-card{

  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
  color: #E5E4EF;

}

.day-card{
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  color: #E5E4EF;
}

.header-title-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.price-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

}

.price-card{
  color: #EDD1FF;
  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}



.footer-card{
  box-sizing: content-box;
}



.footer-card ul li{
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;


}


.footer-card ul li img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}


.dotted{
  position: relative;
  left: -20px;
  width: calc(100% + 40px);

  height: 20px;
  background-image: url("../../assets/icons/dottedw.svg");
  background-repeat: repeat-x;

}

.dotted::before{
  display: block;
  content: "";
  background-image: url('@/assets/icons/triangle.svg') !important;
  height: 30px;
  width: 30px;
  position: absolute;
  transform: scale(0.5) rotate(45deg);
  right: -16px;
  top: -6px;
}

.dotted::after{
  display: block;
  content: "";
  background-image: url('@/assets/icons/triangle.svg') !important;
  height: 30px;
  width: 30px;
  position: absolute;
  transform: scale(0.5) rotate(225deg);
  left: -16px;
  bottom: -6px;
}


.active{

  border: 3px solid white;
}

.card:hover{
  background: rgba(255, 255, 255, 0.25);
}

.card:active{
  background: rgba(255, 255, 255, 0.20);
}




</style>