<template>

  <div class="root">
    <div class="navbar-height"></div>

    <step-panier :items="['Panier','Informations','Récapitulatif','Paiement']" :step=1 ></step-panier>

    <div class="all-conatiner">

  <div class="panier-container">
    <h1 class="title">Mon Panier</h1>

    <div class="panier-body">

   <ligne-panier v-for="(item, index) in elements" :key="index"  :items="item.donnees" @delete-item="deleteItem"></ligne-panier>

    </div>
  </div>

    <div class="mini-panier">
      <mini-panier :items="items"></mini-panier>
    </div>
    </div>
  </div>


</template>

<script>

  import lignePanier from "@/components/lignePanier.vue";
  import MiniPanier from "@/components/panier.vue";
  import StepPanier from "@/components/Step.vue";

  export default {
    components: {
      StepPanier,
      MiniPanier,
      lignePanier,
    },

    data: () => ({
      elements: [],
      items: [
          {
        id: '1',
        quantity: 2,
        price: 19.99,
        expiration: '9/11/2024',
        creation: '10/11/2023',
        header: {
          title: 'BelforPass Entire Day',
          age : 'Adulte',
          description: 'Profitez de la magie de Belforaine toute une journée.',
          link: 'panier',
          path: require('@/assets/Panier/image-pass.png'),
          type: "billet"
        }
      },{
          id: '1',
          quantity: 2,
          price: 29.99,
          expiration: '9/11/2024',
          creation: '10/11/2023',
          header: {
            title: 'BelforPass Entire Day',
            age : 'Enfant',
            description: 'Profitez de la magie de Belforaine toute une journée.',
            link: 'panier',
            path: require('@/assets/Panier/image-pass.png'),
            type: "billet"
          }
        },
        {
          id: '2',
          quantity: 2,
          price: 29.99,
          expiration: '9/11/2024',
          creation: '10/11/2023',
          header: {
            title: 'BelforPass Entire Day',
            age : 'Adulte',
            description: 'Profitez de la magie de Belforaine toute une journée.',
            link: 'panier',
            path: require('@/assets/Panier/image-pass.png'),
            type: "billet"
          }
        },{
          id: '3',
          quantity: 2,
          price: 29.99,
          expiration: '9/11/2024',
          creation: '10/11/2023',
          header: {
            title: 'BelforPass Entire Day',
            age : 'Adulte',
            description: 'Profitez de la magie de Belforaine toute une journée.',
            link: 'panier',
            path: require('@/assets/Panier/image-pass.png'),
            type: "billet"
          }
        }
      ]
    }),
    methods: {
      deleteItem(id) {
        console.log("deleteItem");
        console.log(id);
      },
    },

    created() {
      //fair une liste de liste des element avec le meme id

      this.elements = this.items.reduce((acc, item) => {
        const index = acc.findIndex((element) => element.id === item.id);
        if (index === -1) {
          acc.push({
            id: item.id,
            donnees: [item],
          });
        } else {
          acc[index].donnees.push(item);
        }
        return acc;
      }, []);

    }
  }


</script>

<style scoped>



.root{
  background-image: url("@/assets/Panier/background-blur.png"); ;
  background-repeat: no-repeat;
  background-size: cover;
}

.navbar-height{
  height: 180px;
  width: 100%;
}



.all-conatiner{

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 50px;
}


.title{
  color: #FFF;
  text-shadow: 0 4px 21px rgba(255, 255, 255, 0.65);
  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal; }


.panier-body{
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

}

.mini-panier{
  margin-top : 100px;
}





</style>