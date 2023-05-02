<template>
  <div>
    <BannerSider/>

    <!-- category -->
    <ul class="row m-0 mb-4 category">
      <li class="col-lg-2 col-md-4 col-6" v-for="(category, key) in categories" :key="key"
       @click.prevent="categoryBtn(category.title)">
        <i :class="category.icon"></i>
        <ul class="ml-3">
          <li>{{category.name}}</li>
        </ul>
      </li>
    </ul>
    <CardSider/>

    <!-- cart -->
    <div class="row cart">
      <div class="col-md-6">
        <div class="mb-4 cart-img cart-img-1">
          <h3 class="mb-3">Подарки</h3>
          <h3>Для себя</h3>
        </div>
        <div class="mb-4 cart-content">
          <div class="cart-border">
            <h3 class="mb-3">Открой</h3>
            <p>Мир души и любви</p>
            <router-link to="/favourslist" class="btn btn-primary"> Каталог </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6 cart-reverse">
        <div class=" mb-4 cart-content">
          <div class="cart-border">
            <h3 class="mb-3">Новые услуги</h3>
            <p>Деревянные значки</p>
            <router-link to="/favourslist" class="btn btn-primary"> Каталог </router-link>
          </div>
        </div>
        <div class="mb-4 cart-img cart-img-2">
          <h3 class="mb-3">Подарки</h3>
          <h3>Для друзей</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSider from '@/components/BannerSider.vue';
import CardSider from '@/components/CardSider.vue';

export default {
  data() {
    return {
      categories: [
        { name: 'Все', title: 'Все', icon: 'fas fa-gift fa-2x' },
        { name: 'Одежда', title: 'Одежда', icon: 'fas fa-tshirt fa-2x' },
        { name: 'Носки', title: 'Носки', icon: 'fas fa-socks fa-2x' },
        { name: 'Обувь', title: 'Обувь', icon: 'fas fa-shoe-prints fa-2x' },
        { name: 'Аксессуары', title: 'Аксессуары', icon: 'fas fa-democrat fa-2x' },
        { name: 'Другое', title: 'Другое', icon: 'fas fa-shopping-bag fa-2x' },
      ],
    };
  },
  methods: {
    categoryBtn(categoryTitle) {
      const vm = this;
      vm.$router.push({ path: '/favourslist', query: { category: categoryTitle } });
    },
  },
  components: {
    BannerSider,
    CardSider,
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';

//category
.category {
  >li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    transition: all 0.15s ease;
    cursor: pointer;
    text-align: center;
    color: $secondary-color;
    white-space:nowrap;
    &:hover, &:active {
      background-color: $hot-color;
      color: $primary-color;
    }
  }
  >li:not(:last-child) {
    border-right: $hot-color solid 1px;
    @media(max-width: 992px) {
      border: none;
    }
  }
}

// discount
.discount {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  @media (max-width:569px) {
    flex-direction: column;
    text-align: center;
    > div {
      margin-bottom: 1rem;
    }
  }
  .btn {
    width: 20%;
    @media (max-width:569px) {
      width: 100%;
    }
  }
}

//cart
.cart {
  text-align: center;
  h3 {
    font-family: $font-family-title;
  }
  p {
    font-family: $font-family-text;
  }
}
.cart-img {
  padding: 10rem 0;
  color: $white-color;
  text-shadow: 1px 1px 1px $primary-color;
  @media (max-width: 414px) {
    padding: 5rem 0;
  }
}
.cart-img-1 {
  background: url('../../assets/image/cart-1.png') bottom center no-repeat;
  background-size: cover;
}
.cart-img-2 {
  background: url('../../assets/image/cart-2.png') bottom center no-repeat;
  background-size: cover;
}
.cart-content {
  padding: 2rem;
  background-color: $hot-color;
}
.cart-border {
  padding: 2.5rem 0;
  border: 2.5px $white-color solid;
}
@media (max-width: 767px) {
  .cart-reverse {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
