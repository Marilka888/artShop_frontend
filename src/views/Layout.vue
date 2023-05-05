<template>
  <div class="container">
    <Loading v-model:active="isLoading"></Loading>
    <Alert/>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent px-0">
      <router-link class="navbar-brand logo" to="/">ART Shop</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse toggle-menu" id="navbarSupportedContent">
        <ul class="navbar-nav align-items-center w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favourslist"
                         :class="{'active': $route.name === 'FavoursList' && 'router-link-active'}">
              Каталог
            </router-link>
          </li>
          <li class="nav-item ml-lg-auto pt-1">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-user-circle fa-lg"></i>
            </router-link>
          </li>
        </ul>

        <div class="btn-group favorite">
          <button type="button" class="btn favorite-btn" data-toggle="dropdown">
            <i class="fas fa-heart fa-lg"></i>
            <span class="badge badge-pill badge-danger">{{ favoritesLength }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="pt-2 px-3">
              <h5 class="text-center">Избранное</h5>
              <table class="table mb-2" style="min-width:200px">
                <tbody>
                <tr class="favorite-list"
                    v-for="favorite in favorites" :key="favorite.id">
                  <td class="py-2" width="30">
                    <a href="#" class="text-danger favorite-list-delbtn"
                       @click.prevent="removeFavorite(favorite, false)">
                      <i class="fas fa-times"></i>
                    </a>
                  </td>
                  <td class="py-2">
                    <router-link :to="`/favourslist/${favorite.id}`" class="d-block">
                      {{ favorite.title }}
                    </router-link>
                  </td>
                </tr>
                <tr :class="{'d-none': favorites.length}">
                  <td class="text-center">Список любимых пуст</td>
                </tr>
                </tbody>
              </table>
              <button class="btn btn-outline-danger btn-block"
                      :class="{'d-none': !favorites.length}"
                      data-toggle="modal" data-target="#delFavoriteModal">
                Удалить все
              </button>
            </div>
          </div>
        </div>

      </div>
    </nav>

    <router-view></router-view>

    <!-- footer -->
    <div class="bg-light">
      <ul class="d-md-flex footer">
        <li class="px-4">
          <h5 class="footer-title">ART Shop</h5>
          <p class="text-muted">
            Магазин ручных изделий, сделанных с душой и любовью для Вас
          </p>
        </li>
        <li>
          <h5 class="footer-title">Контакты</h5>
          <ul>
            <li>
              <a href="tel:+1234567890" class="text-muted">TEL： 12345678910</a>
            </li>
            <li>
              <a href="mailto:art-shop@mail.com" class="text-muted">
                Mail： art-shop@mail.com
              </a>
            </li>
            <li class="text-muted">
              Адрес: Палатка №1 на пл. Мытищи
            </li>
          </ul>
        </li>
        <li>
          <h5 class="footer-title">Подписывайтесь</h5>
          <ul>
            <li>
              <a href="https://memchik.ru/show/cfa872bd512c65333da413ac5d408d7f02b19df7"
                 target="_ blank" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                </span>
              </a>
              <a href="https://memchik.ru/show/27e6ff4e2eb9e5011fed64d06be4c8c7adae0f78"
                 target="_ blank" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="https://memchik.ru/show/4dc6f1a3de39e74fbac12126f1dc9da516f73fe1"
                 target="_ blank" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                </span>
              </a>
              <a href="https://memchik.ru/show/5dad2d576eb375bea733b562aeb8df672553bff8"
                 target="_ blank" class="text-primary">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-line fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="copyright">
        ⓒ 2023 ART Shop by Jew Maria
      </div>
    </div>

    <!-- delFavoriteModal -->
    <div class="modal fade" id="delFavoriteModal" tabindex="-1" role="dialog"
         aria-labelledby="delFavoriteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delFavoriteModalLabel">Очистить</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Удалить все избранные?
            <strong class="text-danger">(отменить будет невозможно)</strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Отмена
            </button>
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal"
                    @click.prevent="removeFavorite('', true)">
              Подтвердить удаление
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Alert from '@/components/AlertMessage.vue';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('alertMessageModules', ['messages']),
    ...mapGetters('ordersModules', ['orders']),
    ...mapGetters('favoriteModules', ['favorites', 'favoritesLength']),
  },
  methods: {
    removeFavorite(favorite, delall) {
      this.$store.dispatch('favoriteModules/removeFavorite', {
        favoriteItem: favorite,
        delall,
      });
    },
    ...mapActions('ordersModules', ['getOrder']),
    ...mapActions('favoriteModules', ['getFavorite']),
  },
  components: {
    Alert,
  },
  created() {
    this.$store.dispatch('ordersModules/getOrder');
    this.$store.dispatch('favoriteModules/getFavorite');
  },
};
</script>

<style scoped lang="scss">
@import '../assets/_custom.scss';

// navbar
.logo {
  background-color: transparent;
  box-shadow: none;
  font-size: 1.25rem;
  font-weight: bold;
}

.dropdown-menu {
  z-index: 9999;
}

.cart, .favorite {
  float: right;
  margin-left: 0.25rem;
}

.cart-btn, .favorite-btn {
  float: right;
  position: relative;
  background-color: transparent;
  text-align: right;
  font-size: inherit;

  .badge {
    position: absolute;
    top: auto;
    bottom: 2px;
    right: -1px;
  }
}

.favorite-list {
  &:hover, &:active {
    background-color: $muted-color;
    text-decoration: underline;
  }

  .favorite-list-delbtn:hover, .favorite-list-delbtn:active {
    i {
      font-size: 1.25rem;
    }
  }
}

// footer
.footer {
  margin: 0;
  padding: 2rem 2rem 0;
  line-height: 1.5rem;

  > li {
    flex: 1 1 0;
    margin-bottom: 2rem;
    text-align: center;
  }
}

.footer-title {
  margin-bottom: 1.25rem;
  font-weight: bold;
}

.copyright {
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  text-align: center;
}
</style>
