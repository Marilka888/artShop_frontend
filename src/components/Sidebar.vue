<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center
      px-3 mt-4 mb-1 text-muted font-weight-bold">
        <span>Администратор</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/favoursmanage">
            <i class="fas fa-shopping-cart"></i> Список услуг
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/ordersmanage">
            <i class="far fa-list-alt"></i> Список заказов
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/couponsmanage">
            <i class="fas fa-money-bill"></i> Список преложений
          </router-link>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center
      px-3 mt-4 mb-1 text-muted font-weight-bold">
        <span>Страница покупок</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-shopping-cart"></i> ART Shop
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
