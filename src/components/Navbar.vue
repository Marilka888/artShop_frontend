<template>
  <div class="navbar-wrap">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Art Company</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <router-link class="text-muted" to="/login"> Выход</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  data() {
    return {};
  },
};
</script>
