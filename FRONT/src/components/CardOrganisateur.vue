<template>
  <div class="container">
    
  <div class="box">
    <span></span>
    <div class="content">
      <img class="img" :src="profileImage" alt="Profile Image" />
      <h2>{{ name }}</h2>
      <p>{{ message }}</p>
      <a :href='"mailto:" + email' @click="contactPerson">Contacter</a>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'CardOrganisateur',
  props: {
    profileImage: String,
    name: String,
    message: String,
    email: String,
  },
  data() {

  },
  methods: {
    contactPerson() {
      console.log('Personne contactée !', this.email);
    },
  },
  mounted() {
    console.log('Profile Image:', this.profileImage);
    console.log('Name:', this.name);
  },
};
</script>

<style scoped>
*
{

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: DM Sans;
}

body
{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1d061a
}

.container
{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.container .box
{
  position: relative;
  width: 320px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}

.container .box::before
{
  content:' ';
  position: absolute;
  top: 0;
  left: 30px;
  width: 40%;
  height: 100%;
  text-decoration: none;
  background: #fff;
  border-radius: 60px;
  transform: skewX(-15deg);
  transition: 0.5s;
}


.container .box:hover:before,
.container .box:hover:after
{
  transform: skewX(0deg);
  left: 20px;
  width: calc(100% - 90px);
  transition: 0.5s;
}

.container .box:nth-child(1):before,
.container .box:nth-child(1):after
{
  background: linear-gradient(315deg, #411a40, #4d5063);

}
.container .box span
{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
  transition: 0.5s;

}

.container .box span::before
{
  content:'';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: 0.1s;  
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);

}

.container .box:hover span:after
{
  bottom: -50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
  transition: 0.5s;
}

.img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: 75%;
  transform: translateX(-50%);
  z-index: 10;
  border: 5px solid #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: 0.5s;
  animation: animate 5s ease-in-out infinite;
  pointer-events: none;

}

@keyframes animate
{
  0%, 100%
  {
    transform: translateY(10px);
  }
  
  50%
  {
    transform: translate(-10px);
  }
}

.container .box .content
{
  position: relative;
  left: 0;
  padding: 20px 40px;
  background: rgba(56, 45, 56, 0.211);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transform: 0.5s;
  color: #fff;
}

.container .box:hover .content
{
  left: -25px;
  padding: 60px 40px;
  transition: 0.5s;

}

.container .box .content h2
{
  font-size: 2em;
  color: #fff;
  margin-bottom: 10px;
}

.container .box .content p
{
  font-size: 1.1em;
  margin-bottom: 10px;
  line-height: 1.4em;
  
}

.container .box .content a
{
  display: block;
  font-size: 1.1em;
  color: #ffffff;
  background: #ffffff1b;
  padding: 10px;
  border-radius: 60px;
  margin:5%;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  margin-top: 5px;

}

.container .box .content a:hover
{
  background: #ff4d4d;
  box-shadow: 0 1px 15px rgba(1, 1, 1, 0.2);
  transition: 0.5s;
  cursor: pointer;
}

</style>