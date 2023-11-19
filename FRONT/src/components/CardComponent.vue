<template>
  <div class="card">
    <card>
      <div class="card-wrapper">
        <figure>
          <img src="../assets/fete-foraine.jpg" alt="" />
        </figure>
        <div class="card-body">
          <h2>{{ title }}</h2>
          <p>
            {{description}}
          </p>
          <a href="#" class="read-more">
            Je fonce ! <span class="sr-only">about this is some title</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </card>
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

<style scoped>
*{
  margin: 0;
  padding: 0;
}

card {
  --img-scale: 1.001;
  --title-color:#FEB42D; ;
  --link-icon-translate: -20px;
  --link-icon-opacity: 0;
  border-radius: 16px;
  box-shadow: none;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
 }

card a::after {
  inset-block: 0;
  inset-inline: 0;
  cursor: pointer;
  content: "";
}

/* basic card elements styling */
card h2 {
  margin: 0 0 18px 0;
  font-family: "Bebas Neue", cursive;
  font-size: 1.9rem;
  letter-spacing: 0.06em;
  color: var(--title-color);
  transition: color 0.3s ease-out;
}

card img {
  max-width: 100%;
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.4s ease-in-out;
}

.card-body {
  padding: 24px;
  color: #2c3e50;
}

.card-body h2{
  font-family: 'Syne';
  justify-content: space-between;
}


card a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #FEB42D;
}

card a:focus {
  outline: 1px dotted #FEB42D;
}

card a .icon {
  min-width: 24px;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  transform: translateX(var(--link-icon-translate));
  opacity: var(--link-icon-opacity);
  transition: all 0.3s;
}

/* using the has() relational pseudo selector to update our custom properties */
card:has(:hover, :focus) {
  --img-scale: 1.1;
  --title-color: #28666e;
  --link-icon-translate: 0;
  --link-icon-opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}


/************************
Generic layout (demo looks)
**************************/

*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  display: grid;
  max-width: 1200px;
  gap: 24px;
  gap: 24px;
}

@media screen and (max-width: 960px) {
  card {
    container: card/inline-size;
  }
  .card-body p {
    display: none;
  }
}

@container card (min-width: 380px) {
  .card-wrapper {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 16px;
  }
  .card-body {
    padding-left: 0;
  }
  figure {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  figure img {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
}
</style>