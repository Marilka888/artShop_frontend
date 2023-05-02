<template>
  <div class="mt-5">
    <Alert/>
    <form class="form-signup" @submit.prevent="signup">
      <h1 class="h3 mb-3 font-weight-normal text-center">Пожалуйста введите данные для входа</h1>
      <label for="inputFirstname" class="sr-only">Firstname</label>
      <input type="firstname" id="inputFirstname" class="form-control mb-3"
             v-model="user.firstname" placeholder="Firstname" required>
      <label for="inputLastname" class="sr-only">Lastname</label>
      <input type="lastname" id="inputLastname" class="form-control mb-3"
             v-model="user.lastname" placeholder="Lastname" required>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control mb-3"
             v-model="user.email" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mb-3"
             v-model="user.password" placeholder="Password" required>
      <label for="inputAge" class="sr-only">Age</label>
      <input type="age" id="inputAge" class="form-control mb-3"
             v-model="user.age" placeholder="Age" required>
      <label for="inputPhone" class="sr-only">Phone</label>
      <input type="phone" id="inputPhone" class="form-control mb-3"
             v-model="user.phone" placeholder="Phone" required>
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Зарегистрироваться
      </button>
      <router-link class="text-muted" to="/"> &larr; Назад в магазин</router-link>
    </form>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue';

export default {
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        age: '',
        phone: '',
      },
    };
  },
  methods: {
    signup() {
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/register`;
      const vm = this;
      vm.$http.post(api, vm.user)
        .then((response) => {
          if (response.data.success) {
            vm.$router.push('/admin/favoursmanage');
            vm.$store.dispatch('alertMessageModules/updateMessage', {
              message: response.data.message,
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
    Alert,
  },
};
</script>

<style scoped>
.form-signup {
  width: 100%;
  max-width: 330px;
  padding: 20px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
