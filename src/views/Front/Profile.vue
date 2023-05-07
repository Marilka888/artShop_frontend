<template>
  <div>
    <main>
      <div class="py-5 text-center">
        <h2>Добрый день, {{ profile.firstname }}</h2>
      </div>

      <div class="row g-5">
        <div class="col-md-7 col-lg-8">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Ваши заказы</span>
          </h4>
          <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm"
                  v-for="order in profile.orders" :key="order.id" style="background: #c6faff">
                <div style="color:#1ca904;" v-if="order.status">
                  <h6 class="my-0">{{ order.favour.title }} (Готово)</h6>
                  <small class="text-muted">{{ order.dateOfCreated }}</small>
                </div>
                <div style="color:#ff2257;" v-else>
                  <h6 class="my-0">{{ order.favour.title }} (В работе)</h6>
                  <small class="text-muted">{{ order.dateOfCreated }}</small>
                </div>
                <span class="text-muted" style="font-weight: 500; font-style: italic">{{
                    order.sum
                  }}&nbsp;₽</span>
                <div id="collapse" class="accordion-collapse collapse">
                </div>
              </li>
          </ul>
        </div>

        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="mb-3">Ваши данные</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <h6>Имя: {{ profile.firstname }}</h6>
              </div>
              <div class="col-sm-6">
                <h6>Фамилия: {{ profile.lastname }}</h6>
              </div>

              <div class="col-12">
                <h6>Телефон: {{ profile.phone }}</h6>
              </div>
              <div class="col-12">
                <h6>Почта: {{ profile.email }}</h6>
              </div>
            </div>
            <hr class="my-4">
            <router-link to="/favourslist" class="w-100 btn btn-primary btn-lg" type="submit">
              Порадовать себя
            </router-link>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  data() {
    return {
      profile: {
        role: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        age: '',
        dateOfCreated: '',
        orders: [],
      },
    };
  },
  methods: {
    getProfile() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/users/profile`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.user}`,
        },
      })
        .then((response) => {
          vm.profile.role = response.data.role;
          vm.profile.firstname = response.data.firstname;
          vm.profile.lastname = response.data.lastname;
          vm.profile.phone = response.data.phone;
          vm.profile.email = response.data.email;
          vm.profile.age = response.data.age;
          vm.profile.dateOfCreated = response.data.dateOfCreated;
          // eslint-disable-next-line max-len
          response.data.orders.forEach(order => order.dateOfCreated = order.dateOfCreated.split('T')[0]);
          vm.profile.orders = response.data.orders;
          vm.$store.dispatch('updateLoading', false);
        });
    },
    categoryBtn(categoryTitle) {
      const vm = this;
      vm.$router.push({
        path: '/favourslist',
        query: { category: categoryTitle },
      });
    },
  },
  watch: {
    $route() {
      this.getProfile();
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/_custom.scss';
</style>
