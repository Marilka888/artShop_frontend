<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-light">
        <li class="breadcrumb-item">
          <router-link to="/">Главная</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/favourslist">Список услуг</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{path: '/favoursList', query: {category: favour.category}}"
                       class="text-primary">{{ favour.category }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ favour.title }}
        </li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-4 mb-3">
        <div class="sticky-top clearfix" style="top: 10px">
          <h1 class="h3"> {{ favour.title }} </h1>
          <div class="d-flex align-items-baseline" v-if="favour.origin_price !== favour.price">
            <del class="text-muted">Цена：{{ favour.origin_price | currency }}</del>
            <div class="ml-auto mb-0 h5 text-danger">
              <small>Со скидкой：</small>
              <strong>{{ favour.price | currency }}</strong>
            </div>
          </div>
          <div class="d-flex align-items-baseline" v-if="favour.origin_price == favour.price">
            <div class="ml-auto mb-0 h5">
              <small>Цена：</small>
              <strong>{{ favour.price | currency }}</strong>
            </div>
          </div>
          <hr>
          <ul class="favour-summary">
            <li>
              <button type="button" class="btn btn-link p-0"
                      data-toggle="modal" data-target="#tryonModalCenter">
                <i class="fas fa-sliders-h"></i> Дополнительно
              </button>
            </li>
            <li>
              <a href="#" class="btn btn-link p-0" :class="{'d-none': isFavorite}"
                 @click.prevent="addFavorite(favour)">
                <i class="fas fa-heart"></i> Добавить в избранное
              </a>
              <a href="#" class="btn btn-link p-0" :class="{'d-none': !isFavorite}"
                 @click.prevent="removeFavorite(favour, false)">
                <i class="fas fa-heart-broken"></i> Удалить из избанного
              </a>
            </li>
          </ul>
          <hr>

          <div class="input-group order">
            <router-link :to="`/createorder/${favour.id}`" class="btn btn-primary d-block mb-2">
              <i class="fas fa-cart-arrow-down"></i> Заказать
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-8 favour-content">
        <img class="img-fluid" :src="favour.imageUrl">
        <h3>{{ favour.title }}</h3>
        <p>{{ favour.description }}</p>
      </div>
    </div>

    <!-- tryonModal -->
    <div class="modal fade" id="tryonModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="tryonModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header pb-0 border-0">
            <button type="button" class="close p-2" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0 text-center">
            <h5 class="mb-5">Попробуй больше</h5>
            <div class="row">
              <div class="col-lg-8 col-12">
                <div class="table-responsive">
                  <div class="table d-table">
                    <thead>
                    <tr>
                      <th>Размер</th>
                      <th>Декоративка</th>
                      <th>Эскиз&nbsp;заказчика</th>
                      <th>Эскиз&nbsp;под&nbsp;заказ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th>Little</th>
                      <td>165&#8381</td>
                      <td>100&#8381</td>
                      <td>250&#8381</td>
                    </tr>
                    <tr>
                      <th>Small</th>
                      <td>250&#8381</td>
                      <td>150&#8381</td>
                      <td>300&#8381</td>
                    </tr>
                    <tr>
                      <th>Big</th>
                      <td>450&#8381</td>
                      <td>200&#8381</td>
                      <td>500&#8381</td>
                    </tr>
                    <tr>
                      <th>Large</th>
                      <td>600&#8381</td>
                      <td>250&#8381</td>
                      <td>500&#8381</td>
                    </tr>
                    </tbody>
                  </div>
                </div>
                <p>*Данные приблизительные (сообщим цену после согласования с мастером)</p>
              </div>
              <div class="col-lg-4 col-12">
                <img src="../../assets/image/another.png" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      favourId: '',
      favour: [],
      isFavorite: false,
    };
  },
  computed: {
    ...mapGetters('favoriteModules', ['favorites']),
  },
  methods: {
    getFavour() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/favours/${vm.favourId}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url)
        .then((response) => {
          if (response.data.success) {
            vm.favour = response.data.favour;
            vm.favorites.forEach((item) => {
              if (vm.favour.id === item.id) {
                vm.isFavorite = true;
              }
            });
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Не удалось найти данную услугу',
              status: 'danger',
            });
          }
          vm.$store.dispatch('updateLoading', false);
        });
    },
    addFavorite(favour) {
      this.$store.dispatch('favoriteModules/addToFavorite', favour);
      this.isFavorite = true;
    },
    removeFavorite(favourItem, delall) {
      this.$store.dispatch('favoriteModules/removeFavorite', {
        favoriteItem: favourItem,
        delall,
      });
      this.isFavorite = false;
    },
  },
  watch: {
    $route() {
      this.favourId = this.$route.params.favourId;
      this.getFavour();
    },
  },
  created() {
    this.favourId = this.$route.params.favourId;
    this.getFavour();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_custom.scss';

.favour-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1rem;
  @media (max-width: 991px) {
    flex-direction: column;
    li {
      padding: 0.5rem;
    }
  }
  @media (max-width: 767px) {
    flex-direction: row;
    li {
      padding: 0rem;
    }
  }
}

.order {
  display: flex;
  margin-bottom: 0.5rem;

  button {
    margin-left: 0.5rem;
  }

  @media (max-width: 991px) {
    display: block;
    select {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    button {
      width: 100%;
      margin-left: 0;
    }
  }
  @media (max-width: 767px) {
    display: flex;
    select {
      width: auto;
      margin-bottom: 0;
    }
    button {
      width: auto;
      margin-left: 0.5rem;
    }
  }
}

.favour-content {
  text-align: center;

  img, p {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.25rem;
  }
}
</style>
