
<template>
  <div class="choice-date-container">
    <h1>{{ $t('choice_ticket.dateSelection.title') }}</h1>
    <div class="date-container">
      <div :class="dateSelected.includes(date)? 'date-card selected':'date-card'" v-for="(date, index) in dateParse" @click="selectedDate(date)" :key="index">
        <span class="date-day">{{ $t(`choice_ticket.dateSelection.days.${jours[date.getDay()]}`) }}</span>
        <span class="date-number">{{ date.getDate() }}</span>
        <span class="date-month">{{ $t(`choice_ticket.dateSelection.months.${Mois[date.getMonth()]}`) }}</span>
        <span class="date-year">{{ date.getFullYear() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'choice-date',
  components: {
  },
  props: {
    dates: {
      type: Array,
      required: true,
    },
    day : {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      dateParse: [],
      dateSelected: [],
      jours: Object.keys(this.$t('choice_ticket.dateSelection.days')),
      Mois: Object.keys(this.$t('choice_ticket.dateSelection.months')),
    };
  },
  computed: {
  },
  methods: {
    selectedDate(date){
      if (this.dateSelected.includes(date)){
        this.dateSelected.splice(this.dateSelected.indexOf(date), 1);
      }
      else if (this.dateSelected.length < this.day){
        this.dateSelected.push(date);
      }
      if (this.dateSelected.length === this.day){
        this.$emit('selected', this.dateSelected);
      }
    },


  },
  created() {
    this.dateParse = this.dates.map((date) => {
      return new Date(date);
    });
  },



  }

</script>
<style scoped>

.choice-date-container h1 {
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

.date-card{
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.30);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border : solid 3px rgba(255, 255, 255, 0.10);
  margin : 10px 0;
}

.date-day{
  color: #E5E4EF;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.date-number{
  color: #EDD1FF;
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 70px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.date-month{
  color: #E5E4EF;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.date-container{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
}

.date-card:hover{
  background: rgba(255, 255, 255, 0.25);
}

.date-card:active{
  background: rgba(255, 255, 255, 0.15);
}

.date-card.selected{
  border: solid 3px white;
}

</style>