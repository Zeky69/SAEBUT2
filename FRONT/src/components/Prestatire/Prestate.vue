
<template>
  <div class="prestate-all-container">
  <div class="editor-container" v-if="mode === '1'" >
    <div class="action-container">
    <button @click="valide" class="btn-click">Valide</button>
      <button @click="changeMode" class="btn-click">Change Mode</button>

    </div>
    <div v-if="sousMode === '1'">
    <editor v-model="donnee" ref="myEditor"
            :init="{
         height: 500,
         menubar: false,
         plugins: ['image'],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help | image'
       }"
    />
    </div>
    <div v-else v-html="donnee"></div>

  </div>
    <div class="" v-else  v-html="donnee" >
    </div>




    </div>

</template>


<script>
import Editor from '@tinymce/tinymce-vue'

export default {

  name: 'Prestate-Component',
  components: {
    Editor
  },
  props: {
    mode : {
      type: String,
      required: true,
      default: '1'
    },
    prestate : {
      type: Object,
      required: false,
    },
  },
  data: () =>  ({
    donnee : null,
    sousMode:'1',


  }),

  computed: {

  },
  mounted() {
    if (this.prestate !== null){
      this.donnee = this.prestate.page_info;
    }


    console.log(this.prestate);

  }
  ,watch: {
    prestate: function () {
      this.donnee = this.prestate.page_info;
    },
  },


  methods: {
    changeMode(){
      if (this.sousMode === '1'){
        this.sousMode = '2';
      }
      else{
        this.sousMode = '1';
      }
    },
    valide(){
      this.$emit('valide', this.donnee);
  },

}
}

</script>

<style scoped>

.prestate-all-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

}
.btn-click{
  width: 100px;
  height: 50px;
  background-color: #2E2E2E;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.btn-click:hover{
  background-color: #4D4D4D;
}

.btn-click:active{
  background-color: #212121;
}

.editor-container{
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
}

.action-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}


</style>