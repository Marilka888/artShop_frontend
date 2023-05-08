<template>
  <div>
    <div class="table-responsive-xl">
      <table class="table nowrap">
        <thead>
        <tr>
          <th class="text-center">Время заказа</th>
          <th class="d-sm-table-cell d-none text-left" width="100">Услуга</th>
          <th class="d-sm-table-cell d-none text-left">Оплата</th>
          <th class="d-sm-table-cell d-none text-center">Подробнее</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="text-center">{{ order.dateOfCreated }}</td>
          <td class="text-left" width="100" v-if="order.favour">{{ order.favour.title }}</td>
          <td class="text-left">
            <strong class="text-success" v-if="order.stage!=='CREATED'">Оплаченный</strong>
            <span class="text-muted" v-else>Не оплачен</span>
          </td>
          <td class="text-center">
            <div id="accordion">
              <div class="card mb-3">
                <button class="btn btn-link" data-toggle="collapse"
                        data-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne" v-if="order.stage==='COMPLETED'"
                        style="background: #28a745">{{ order.stage }}
                </button>
                <button class="btn btn-link" data-toggle="collapse"
                        data-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne" v-else style="background: #ff6ffb">
                  {{ order.stage }}
                </button>
                <div id="collapseOne" class="collapse"
                     aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="table-responsive">
                      <div class="table d-table">
                        <tbody>
                        <tr>
                          <th class="text-left">Заказчик:</th>
                          <td class="text-left" v-if="order.user">
                            {{ order.user.firstname }} {{ order.user.lastname }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left">Телефон:</th>
                          <td class="text-left" v-if="order.user">{{
                              order.user.phone
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left">Комментарий:</th>
                          <td class="text-left">{{ order.description }}</td>
                        </tr>
                        <tr>
                          <th class="text-left">Сумма:</th>
                          <td class="text-left">{{ order.sum }} ₽</td>
                        </tr>
                        <tr>
                          <th class="text-left">Статус заказа:</th>
                          <td class="text-left" v-if="order.stage!=='COMPLETED'">
                            <button type="button" @click="doneOrder(order.id)">
                              {{ order.stage }}
                            </button>
                          </td>
                          <td class="text-left" v-else>
                            <strong class="text-success">Выполнен</strong>
                          </td>
                        </tr>
                        </tbody>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @getPage="getOrders" v-if="pagination"/>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/orders/admin/all`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          if (response.data.success) {
            // eslint-disable-next-line no-param-reassign
            response.data.orders.forEach(ord => ord.dateOfCreated = ord.dateOfCreated.split('T')[0]);
            vm.orders = response.data.orders;
          } else {
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: response.data.message,
              status: 'danger',
            });
          }
          vm.$store.dispatch('updateLoading', false);
        });
    },
    doneOrder(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/orders/admin/completed/${id}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.post(url, 1, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          if (response.data) {
            vm.getOrders();
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: 'Услуга была успешно оказана',
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
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}
</style>
