

<template>
<div class="all-container">
  <div class="header-container">
    <img class="img-header" :src=items[0].header.path alt="logo">
    <div class="info-container">
      <h1 class="title">{{items[0].header.title}}</h1>
      <span class="description">{{items[0].header.description}}</span>
      <div class="info-footer">
        <span v-if="haveDate" class="validity-container" >
          <svg id="calendar" width="800px" height="800px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    <title>calendar [#1196]</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="white" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -2799.000000)" fill="white">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M262,2656 C262,2656.552 261.552,2657 261,2657 L247,2657 C246.448,2657 246,2656.552 246,2656 L246,2646 C246,2645.448 246.448,2645 247,2645 L261,2645 C261.552,2645 262,2645.448 262,2646 L262,2656 Z M262,2641 L262,2640 C262,2639.448 261.552,2639 261,2639 C260.448,2639 260,2639.448 260,2640 L260,2641 L255,2641 L255,2640 C255,2639.448 254.552,2639 254,2639 C253.448,2639 253,2639.448 253,2640 L253,2641 L248,2641 L248,2640 C248,2639.448 247.552,2639 247,2639 C246.448,2639 246,2639.448 246,2640 L246,2641 C244.895,2641 244,2641.895 244,2643 L244,2657 C244,2658.104 244.895,2659 246,2659 L262,2659 C263.105,2659 264,2658.104 264,2657 L264,2643 C264,2641.895 263.105,2641 262,2641 L262,2641 Z" id="calendar-[#1196]">

</path>
            </g>
        </g>
    </g>
</svg>
          {{ $t('choice_ticket.validThe') }} {{getDate}}</span>
      </div>
    </div>
    <div class="action" v-if="trash">
      <button class="delete" @click="deleteItem(items[0])"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z" fill="#1C274C"/>
        <path d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z" fill="#1C274C"/>
        <path d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z" fill="#1C274C"/>
        <path d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z" fill="#1C274C"/>
        <path d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z" fill="#1C274C"/>
      </svg></button>
    </div>
  </div>
  <div class="body-container" >
    <div class="list-container" v-for="(item ,index) in items" :key="index ">
      <svg class="human grid-1" fill="#000000" height="800px" width="800px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="-69 0 117 256" xml:space="preserve">
      path d="M-10.9,4.9c11.3,0,20.5,9.2,20.5,20.5S0.4,45.9-10.9,45.9s-20.5-9.2-20.5-20.5S-22.2,4.9-10.9,4.9z M14.9,51.2h-51.2)"
<path d="M-10.9,4.9c11.3,0,20.5,9.2,20.5,20.5S0.4,45.9-10.9,45.9s-20.5-9.2-20.5-20.5S-22.2,4.9-10.9,4.9z M14.9,51.2h-51.2
	c-14.2,0-25.6,11.4-25.6,25.6v62.6c0,4.9,3.9,9,9,9s9-3.9,9-9V81.9c0-1.4,1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6v155.2
	c0,7.7,5.7,14,12.8,14s12.8-6.3,12.8-14v-88.5c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6v88.5c0,7.7,5.7,14,12.8,14
	c7.1,0,12.8-6.3,12.8-14V81.9c0-1.4,1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6v57.6c0,4.9,3.9,9,9,9s9-3.9,9-9V76.8
	C40.5,62.6,28.8,51.2,14.9,51.2z"/>
</svg>
      <span class="grid-2 name">{{item.header.subtitle}}</span>
      <span class="grid-3 price">({{item.price}} €)</span>
      <span class="grid-4 quantity">x{{item.quantity}}</span>
      <span class="grid-5 total-price">{{item.price * item.quantity}} €</span>
    </div>

    <div class="line"></div>
    <div class="total-container">
      <span class=" grid-2 total-text">{{ $t('choice_ticket.Subtotal') }}</span>
      <span class="grid-5 total-price">{{total}}€</span>
    </div>
  </div>


</div>
</template>


<script >

export default {
  name: 'lignePanier',
  components: {
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    trash : {
      type: Boolean,
      required: false,
      default: true,
    },
    haveDate : {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data: () =>  ({
    total: 0,
  }),
  computed: {
    getDate(){
      let text = ''
      for (let i = 0; i < this.items[0].date.length; i++) {
        if(i === this.items[0].date.length -1)
          text += new Date(this.items[0].date[i]).toLocaleDateString()

        else if(i === this.items[0].date.length -2)
          text += new Date(this.items[0].date[i]).toLocaleDateString() + ' et '
        else
          text += new Date(this.items[0].date[i]).toLocaleDateString() + ','

      }
      return text
    },
  },
  methods: {
    deleteItem(item) {
      this.$emit('delete-item' , item);
    },
  },
  watch: {
    items: {
      handler() {
        this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
      },
      deep: true,
    },
  },
  mounted() {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  },
};

</script>
<style scoped>



.all-container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
}

.header-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.img-header{
  width: 150px;
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.info-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.title{
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background-clip: text;
  background:  linear-gradient(180deg, #1B8BC7 0%, #A349BB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description{
  color: #776085;
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.more-btn{
  color: #5A6CC1;
  text-align: center;
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  border: none;
  background-color: white;
  padding: 5px 50px;
  border-radius: 30px ;
  margin-right: 10px ;

}


.validity-container{
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 10px;
  background: #A361BF;
  color: white;
  font-family: "DM Sans" , Syne , Helvetica , sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 5px;

  width: fit-content;
}

.info-footer{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
margin: 10px 0;
  box-sizing: border-box;
}

#calendar{
  width: 20px;
  height: 20px;
  margin: 0 6px;
}

.action{
  padding: 0 20px;
}

.delete svg {
  width: 40px;
  height: 40px;
}

.delete {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.delete svg path {
  fill: #8697A4;
}

.body-container{
  border-radius: 10px;
  background: rgba(43, 66, 86, 0.8);
  backdrop-filter: blur(7px);
  width: 100%;
  color : white;

  margin-top : 20px;
}



.grid-1{
  grid-column: 1;
}

.grid-2{
  grid-column: 2;
}

.grid-3{
  grid-column: 3;
}

.grid-4{
  grid-column: 4;
}

.grid-5{
  grid-column: 5;
}


.human{
  width: 30px;
  height: 30px;
  fill: white;
}

.list-container{
  display: grid;
  grid-template-columns: 0.1fr 5fr 1fr 1fr 1fr;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}

.line{
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #FFF 53.12%, rgba(255, 255, 255, 0.00) 100%);
}
.total-container{
  display: grid;
  grid-template-columns: 0.1fr 5fr 1fr 1fr 1fr;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}





</style>