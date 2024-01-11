<template>
  <div class="card">
    <div class="card-header">
      <img src="@/assets/logoWF.png" class="header-logo" />
    </div>
    <div class="card-middle">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <p>Stock: {{ stock }}</p>
    </div>
    <div class="card-bottom">
      <h3>{{ price }}</h3>
      <button class="button-shop">Payer</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'CardShop',
  props: {
    logo: String,
    title: String,
    description: String,
    stock: Number,
    price: String,
  },
};
</script>

<style scoped>
.card {
  width: 360px;
  height: 310px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.card-header {
  padding: 1%;
  position: relative;
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #6a6a6a;
}

.header-logo {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
}

.card-middle {
  position: relative;
  padding: 2% 5%;
  flex: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-middle::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #6a6a6a;
}

.card-middle h3 {
  color: #ffffff;
  font-weight: 600;
  font-family: "DM Sans";
  font-size: 23px;
}

.card-middle p {
  font-size: 15px;
  color: #a5a5a5;
}

.card-bottom {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2% 5%;
  justify-content: space-between;
}

.card-bottom h3 {
  color: #ffffff;
  font-family: Syne;
  font-weight: 600;
}

.button-shop {
  background-color: rgb(18, 139, 22);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(116, 116, 116, 0.43);
  border-color: rgb(65, 147, 65);
  color: #ffffff;
  padding: 0.5rem 4rem;
}

.button-shop:hover {
  background: rgba(255, 255, 255, 0.23);
  color: rgb(67, 152, 70);
}
</style>
