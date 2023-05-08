<template>
  <div>
    <ul class="mb-4 step">
      <li class="bg-light" :class="{'bg-dark text-light active': step === 1}">
        <strong>STEP</strong>
        <h3><strong>01</strong></h3>
        <p class="h6">Заказ</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 2}">
        <strong>STEP</strong>
        <h3><strong>02</strong></h3>
        <p class="h6">Дополнительно о заказе</p>
      </li>
      <li class="bg-light" :class="{'bg-dark text-light active': step === 3}">
        <strong>STEP</strong>
        <h3><strong>03</strong></h3>
        <p class="h6">Оплата заказа</p>
      </li>
    </ul>
    <!-- step1：Подтвердить -->
    <div class="table-responsive" v-if="step === 1">
      <table class="table mb-4">
        <thead>
        <tr>
          <th class="d-md-table-cell d-none text-center" width="20%">Фото</th>
          <th class="text-center">Название</th>
          <th class="text-center" width="15%">Цена</th>
          <th class="text-center" width="15%">Количество</th>
        </tr>
        </thead>
        <tbody>
        <td class="d-md-table-cell d-none text-center">
          <div class="thumbnail"
               :style="{backgroundImage:`url(${favour.imageUrl})`}"></div>
        </td>
        <td class="d-md-table-cell d-none text-center">
          {{ favour.title }}
        </td>
        <td class="d-md-table-cell d-none text-center">
          {{ favour.price | currency }}
        </td>
        <td class="d-md-table-cell d-none text-center">
          <select class="form-control form-control-sm" v-model="qty">
            <option value="0" disabled selected>Количество</option>
            <option :value="num" v-for="num in 15" :key="num">
              {{ num }} {{ favour.unit }}
            </option>
          </select>
        </td>
        </tbody>
        <tfoot class="bg-light table-borderless border-top">
        <tr>
          <td class="d-md-table-cell d-none"></td>
          <td class="d-sm-table-cell d-none"></td>
          <td class="text-right">
            Итого без доп.услуг:
          </td>
          <td class="text-right">
            {{ favour.price * qty | currency }}
          </td>
        </tr>
        </tfoot>
      </table>
      <div class="mb-4 stepBtn">
        <router-link to="/favourslist" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i>
          Вернуться в каталог
        </router-link>
        <a href="#" class="btn btn-danger d-inline-block" @click.prevent="confirmOrder(qty)">
          Введите информацию о заказе
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>

    <!-- step2：Заполнить информацию о заказе -->
    <div v-if="step === 2" class="mb-4">
      <div id="accordion">
        <div class="card mb-4">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" data-toggle="collapse"
                      data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Состав заказа <i class="fas fa-caret-down"></i>
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse"
               aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <table class="table mb-0">
                <thead>
                <tr>
                  <td>Услуга</td>
                  <td width="25%">Описание</td>
                  <td class="text-right">Цена</td>
                </tr>
                </thead>
                <tbody>
                <td>{{ favour.title }}</td>
                <td>{{ qty }} шт.</td>
                <td class="text-right">{{ favour.price | currency }}</td>
                </tbody>
                <tbody>
                <td>Эскиз</td>
                <td>
                  <div v-if="order.sketch">Под заказ</div>
                  <div v-else>Пользовательский</div>
                </td>
                <td class="text-right" v-if="order.sketch">
                  {{ qty * 250 | currency }}
                </td>
                <td class="text-right" v-else>
                  {{ qty * 100 | currency }}
                </td>
                </tbody>
                <tbody v-if="order.accessories">
                <td>Декоративные элементы</td>
                <td></td>
                <td class="text-right">
                  {{ qty * 250 | currency }}
                </td>
                </tbody>
                <tfoot>
                <tr>
                  <td></td>
                  <td>Сумма</td>
                  <td width="15%" class="text-right">
                    {{ sumOrder(order, qty, favour) | currency }}
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <h5 class="text-center">Дополнительно</h5>
      <form @submit.prevent="createOrder(order)">
        <h5>Размер</h5>
        <div class="form-group">
          <select class="form-control form-control-sm" v-model="order.size">
            <option :value="0" disabled selected>Размер</option>
            <option :value="1">Little</option>
            <option :value="2">Small</option>
            <option :value="3">Big</option>
            <option :value="4">Large</option>
          </select>
        </div>

        <h5>Декоративка</h5>
        <div class="form-group">
          <select class="form-control form-control-sm" v-model="order.accessories">
            <option :value="false" selected>Без декоративных элементов</option>
            <option :value="true">
              С декоративныи элементами
            </option>
          </select>
        </div>

        <h5>Эскиз</h5>
        <div class="form-group">
          <select class="form-control form-control-sm" v-model="order.sketch">
            <option :value="true" selected>Под заказ</option>
            <option :value="false">
              Эскиз клиента
            </option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="description">Комментарий к заказу</label>
          <textarea name="description" id="description" class="form-control"
                    cols="20" rows="5" v-model="order.description"></textarea>
        </div>
        <div class="stepBtn">
          <a href="#" class="btn btn-success" @click.prevent="step = 1">
            <i class="fas fa-arrow-left"></i>
            Назад
          </a>
          <button class="btn btn-danger float-right">
            Подтвердить заказ
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>

    <!-- step3：Оплата заказа -->
    <div v-if="step === 3" class="mb-4">
      <form @submit.prevent="payOrder">
        <table class="table mb-3">
          <thead>
          <tr>
            <th>Услуга</th>
            <th width="25%">Количество</th>
            <td class="text-right">Цена</td>
          </tr>
          </thead>
          <tbody>
          <td>{{ favour.title }}</td>
          <td>{{ orderResponse.qty }} шт.</td>
          <td class="text-right">{{ orderResponse.sum | currency }}</td>
          </tbody>
          <tfoot>
          <tr class="text-success">
            <td></td>
            <td>Сумма</td>
            <td class="text-right">{{ orderResponse.sum | currency }}</td>
          </tr>
          </tfoot>
        </table>
        <table class="table mb-3">
          <tr>
            <th width="150">Email</th>
            <td>{{ orderResponse.user.email }}</td>
          </tr>
          <tr>
            <th>Имя получателя</th>
            <td>{{ orderResponse.user.firstname }} {{ orderResponse.user.lastname }}</td>
          </tr>
          <tr>
            <th>Телефон получателя</th>
            <td>{{ orderResponse.user.phone }}</td>
          </tr>
          <tr>
            <th>Комментарий к заказу</th>
            <td>{{ orderResponse.description }}</td>
          </tr>
          <tr>
            <th>Оплата</th>
            <td v-if="!order.is_paid">Не оплачено</td>
            <td class="text-success" v-else>Успешный платеж</td>
          </tr>
        </table>
        <div class="text-right" v-if="!order.is_paid">
          <button class="btn btn-danger">Подтвердить оплату</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sumOrder from '../../filters/sumOrder';

export default {
  data() {
    return {
      id: '',
      favour: [],
      qty: 0,
      step: 1,
      orderId: 0,
      orderResponse: [],
      order: {
        is_paid: false,
        favourId: this.id,
        size: 1,
        accessories: false,
        sketch: true,
        qty: this.qty,
        description: '',
        favour: [],
        user: {
          phone: '',
          firstname: '',
          lastname: '',
          email: '',
        },
        sum: 0,
      },
    };
  },
  computed: {
    ...mapGetters('favoursModules', ['favours']),
  },
  methods: {
    sumOrder,
    getInfoForOrder() {
      const url = `${process.env.VUE_APP_APIPATH}/api/favours/${this.id}`;
      this.$store.dispatch('updateLoading', true);
      this.$http.get(url)
        .then((response) => {
          if (response.data.success) {
            this.favour = response.data.favour;
            this.favorites.forEach((item) => {
              if (this.favour.id === item.id) {
                this.isFavorite = true;
              }
            });
          } else {
            this.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Не удалось найти данную услугу',
              status: 'danger',
            });
          }
          this.$store.dispatch('updateLoading', false);
        });
    },
    confirmOrder(qty) {
      if (qty === 0) {
        this.$store.dispatch('alertMessageModules/updateMessage', {
          message: 'Пожалуйста, выберите количество',
          status: 'danger',
        });
      } else {
        this.step = 2;
      }
    },
    createOrder(addOrder) {
      const url = `${process.env.VUE_APP_APIPATH}/api/orders/create`;
      const order = {
        favourId: this.id,
        size: addOrder.size,
        accessories: addOrder.accessories,
        sketch: addOrder.sketch,
        qty: this.qty,
        description: addOrder.description,
      };
      this.$http.post(url, order, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          this.orderId = response.data;
          this.getOrder();
          this.step = 3;
        });
    },
    getOrder() {
      const url = `${process.env.VUE_APP_APIPATH}/api/orders/${this.orderId}`;
      this.$http.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          this.orderResponse = response.data;
        });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/orders/pay/${vm.orderId}`;
      vm.$http.post(url, { num: false }, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          if (response.data) {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Оплата прошла, спасибо!',
              status: 'success',
            },
            this.order.is_paid = true);
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Произошла ошибка, попробуйте авторизоваться',
              status: 'danger',
            });
          }
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getInfoForOrder();
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';

.step {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;

  li {
    padding: 0.25rem 3rem;
    @media (max-width: 767px) {
      display: none;
    }

    &:not(:last-child) {
      margin-right: 0.25rem;
    }
  }

  @media (max-width: 767px) {
    .active {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}

.thumbnail {
  margin: auto;
  background-size: cover;
  width: 80px;
  height: 80px;
}

.stepBtn {
  display: flex;
  justify-content: space-between;
  @media (max-width: 414px) {
    flex-direction: column;
    a:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
