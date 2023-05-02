<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item active">
          Список услуг
        </li>
        <li class="breadcrumb-item active">
          {{ select }}
        </li>
        <li class="breadcrumb-item active" v-if="filterText">
          搜尋 {{ filterText }}
        </li>
      </ol>
    </nav>

    <div class="row mb-2">
      <div class="col-lg-2 col-md-3 mb-3">
        <div class="sticky-top">
          <ul class="list-group mb-3 category">
            <li class="list-group-item list-group-item-action h6"
                v-for="(category, index) in categories" :key="index"
                :class="{'active': select == category.title}"
                @click="getCategory(category.title)">
              <i :class="category.icon"></i>
              {{ category.title }}
            </li>
          </ul>
          <form class="input-group mb-3" @submit.prevent="search">
            <input type="search" class="form-control" placeholder="search" v-model="searchText">
            <div class="input-group-append">
              <button class="input-group-text bg-light">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-10 col-md-9">
        <div class="mb-2 text-left text-muted" v-if="filterText">
          we found {{ filterFavours.length }} result for "{{ filterText }}"
        </div>

        <div class="card-columns">
          <div class="card text-primary favour-card"
           v-for="favour in filterFavours" :key="favour.id">
            <div :style="{background: `url(${favour.imageUrl}) center center no-repeat`,
            backgroundSize: 'cover', height:'200px'}">
            </div>
            <div class="favorite">
              <a class="text-danger" v-if="favour.is_favorite"
               @click.prevent="removeFavorite(favour, false)">
                <i class="fas fa-heart fa-lg"></i>
              </a>
              <a class="text-danger" v-else
               @click.prevent="addFavorite(favour)">
                <i class="far fa-heart fa-lg"></i>
              </a>
            </div>
            <div class="card-body py-2">
              <h5 class="card-title mb-0">{{ favour.title }}</h5>
              <div class="d-flex align-items-baseline">
                <p class="card-text text-secondary mb-0"
                  v-if="favour.origin_price !== favour.price">
                  <del> {{ favour.origin_price | currency }} </del>
                </p>
                <p class="card-text ml-auto h5"
                  :class="{'text-danger': favour.origin_price !== favour.price}">
                   {{ favour.price | currency }}
                </p>
              </div>
            </div>
            <div class="favour-more">
              <router-link :to="`/favourslist/${favour.id}`">Узнать больше</router-link>
              <a href="#" @click.prevent="addToCart(favour.id)">
                Добавить в корзину
              </a>
            </div>
            <div class="favour-soldout" v-if="!favour.is_enabled">
              <button class="btn btn-danger border" disabled>Sold Out</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>-

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      select: 'Все',
      filterText: '',
      searchText: '',
      categories: [
        { title: 'Все', icon: 'fas fa-gift' },
        { title: 'Одежда', icon: 'fas fa-tshirt' },
        { title: 'Носки', icon: 'fas fa-socks' },
        { title: 'Обувь', icon: 'fas fa-shoe-prints' },
        { title: 'Аксессуары', icon: 'fas fa-democrat' },
        { title: 'Другое', icon: 'fas fa-shopping-bag' },
      ],
    };
  },
  computed: {
    filterFavours() {
      const vm = this;
      if (vm.filterText) {
        vm.select = 'Все';
        return vm.favours.filter(item => item.title.indexOf(vm.filterText) !== -1);
      }
      if (vm.select !== 'Все') {
        return vm.favours.filter(item => item.category === vm.select);
      }
      return vm.favours;
    },
    ...mapGetters('favoursModules', ['favours']),
  },
  methods: {
    addFavorite(favour) {
      this.$store.dispatch('favoriteModules/addToFavorite', favour);
    },
    removeFavorite(favourItem, delall) {
      this.$store.dispatch('favoriteModules/removeFavorite', { favoriteItem: favourItem, delall });
    },
    getParams() {
      if (this.$route.query.category) {
        this.select = this.$route.query.category;
      }
    },
    getCategory(category) {
      const vm = this;
      vm.select = category;
      if (vm.filterText) {
        vm.filterText = '';
      }
      if (this.$route.query.category) {
        vm.$router.push('/favourslist');
      }
    },
    getFavours() {
      this.$store.dispatch('favoursModules/getFavours', { isPagination: false });
    },
    addToCart(favourId) {
      this.$store.dispatch('cartModules/addToCart', { id: favourId, qty: 1 });
    },
    search() {
      const vm = this;
      vm.filterText = vm.searchText;
      vm.searchText = '';
    },
  },
  created() {
    this.getParams();
    this.getFavours();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/_custom.scss';

// category
.category {
  cursor: pointer;
}

// favorite
.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  a {
    cursor: pointer;
    font-size: 1rem;
  }
}

.favour-more {
  display: flex;
  padding-top: 0.2rem;
  text-align: center;
  a {
    flex: 1;
    padding: 0.5rem 0;
    border-top: 1px solid $hot-color;
    &:first-child {
      border-right: 1px solid $hot-color;
    }
    &:hover {
      background: $hot-color;
    }
  }
}
.favour-soldout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $font-family-title;
  background-color: rgba($secondary-color, .3);
}
@media (max-width: 991px) {
  .card-columns {
    column-count: 2;
  }
}
@media (max-width: 767px) {
  .card-columns {
    column-count: 1;
  }
}
</style>
