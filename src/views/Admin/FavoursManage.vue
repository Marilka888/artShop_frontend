<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">Создание новых продуктов</button>
    </div>
    <div class="table-responsive mt-4">
      <table class="table">
        <thead>
        <tr>
          <th class="d-md-table-cell d-none">Категории</th>
          <th class="d-lg-table-cell d-none">Миниатюры</th>
          <th>Имя</th>
          <th class="d-lg-table-cell d-none">Первоначальная цена</th>
          <th class="d-sm-table-cell d-none">Продажная цена</th>
          <th>Редактирование</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in favours" :key="item.id">
          <td class="d-md-table-cell d-none align-middle">{{ item.category }}</td>
          <td class="d-lg-table-cell d-none align-middle">
            <img :src="item.imageUrl" class="thumbnail">
          </td>
          <td class="align-middle nowrap">{{ item.title }}</td>
          <td class="d-lg-table-cell d-none align-middle">{{ item.origin_price | currency }}</td>
          <td class="d-sm-table-cell d-none align-middle">{{ item.price | currency }}</td>
          <td class="align-middle">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                Редактирование
              </button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelFavourModal(item)">
                Удалить
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @getPage="getFavours" v-if="pagination"/>

    <!-- favourModal -->
    <div class="modal fade" id="favourModal" tabindex="-1" role="dialog"
         aria-labelledby="favourModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="favourModalLabel">Новинки</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">Введите URL-адрес изображения</label>
                  <input type="text" class="form-control" id="image" placeholder="Укажите ссылку"
                         v-model="tempFavour.imageUrl">
                </div>
                <img class="img-fluid" :src="tempFavour.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">Название</label>
                  <input type="text" id="title" class="form-control" placeholder="Введите название"
                         v-model="tempFavour.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">Категории</label>
                    <input type="text" id="category" class="form-control"
                           placeholder="Пожалуйста, введите классификацию"
                           v-model="tempFavour.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">Количество на складе</label>
                    <input type="text" id="unit" class="form-control"
                           placeholder="Пожалуйста, укажите количество (в штуках)"
                           v-model="tempFavour.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">Первоначальная цена</label>
                    <input type="text" id="origin_price" class="form-control"
                           placeholder="Пожалуйста, введите первоначальную цену"
                           v-model="tempFavour.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Цена</label>
                    <input type="text" id="price" class="form-control"
                           placeholder="Пожалуйста, введите цену"
                           v-model="tempFavour.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">Описание продукта</label>
                  <textarea id="description" class="form-control"
                            placeholder="Пожалуйста, введите описание продукта"
                            v-model="tempFavour.description"></textarea>
                </div>
                <div class="form-group form-check">
                  <input type="checkbox" id="is_enabled" class="form-check-input"
                         :true-value="1" :false-value="0" v-model="tempFavour.is_enabled">
                  <label for="is_enabled">Есть в наличии</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Отмена
            </button>
            <button type="button" class="btn btn-primary" @click="updateFavour">Подтверждение
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delFavourModal -->
    <div class="modal fade" id="delFavourModal" tabindex="-1" role="dialog"
         aria-labelledby="delFavourModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delFavourModalLabel">Удаление продуктов</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Удалить или нет <strong class="text-danger">{{ tempFavour.title }}</strong> Продукция
            (Невозможно ответить после удаления)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              Отмена
            </button>
            <button type="button" class="btn btn-outline-danger" @click="delFavour">
              Подтвердить удаление
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      tempFavour: {},
      isNew: false,
    };
  },
  computed: {
    ...mapGetters(['pagination']),
    ...mapGetters('favoursModules', ['favours']),
  },
  methods: {
    getFavours(page = 1) {
      this.$store.dispatch('favoursModules/getFavours', {
        isPagination: true,
        page,
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempFavour = {};
        this.isNew = true;
      } else {
        this.tempFavour = { ...item };
        this.isNew = false;
      }
      $('#favourModal')
        .modal('show');
    },
    updateFavour() {
      let api = `${process.env.VUE_APP_APIPATH}/api/favours`;
      const vm = this;
      if (vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/favours/create`;
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/favours/update`;
      }
      vm.$http.post(api, vm.tempFavour, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          if (response.data) {
            $('#favourModal')
              .modal('hide');
            vm.getFavours();
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Услуга была успешно обновлена',
              status: 'success',
            });
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: response.data.message,
              status: 'danger',
            });
          }
        });
    },
    openDelFavourModal(item) {
      this.tempFavour = { ...item };
      $('#delFavourModal')
        .modal('show');
    },
    delFavour() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/favours/delete/${vm.tempFavour.id}`;
      vm.$http.delete(api, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          if (response.data) {
            $('#delFavourModal')
              .modal('hide');
            vm.getFavours();
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Услуга была успешно удалена',
              status: 'success',
            });
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: response.data.message,
              status: 'danger',
            });
          }
        });
    },
  },
  components: {
    Pagination,
  },
  created() {
    this.getFavours();
  },
};
</script>

<style lang="scss" scoped>
.thumbnail {
  height: 80px;
  width: 80px;
}

.nowrap {
  white-space: nowrap;
}
</style>
