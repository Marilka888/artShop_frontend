<template>
  <div class="mb-4 silder-wrap">
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="sider sider-1">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">ART Shop</h3>
            <p class="mb-0">Магазин изделий мастера Jew Marilka</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sider sider-left sider-2">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">Изделия на Ваш вкус</h3>
            <p class="mb-0">Заполняйте дополнительные поля при оформлении заказа</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sider sider-3">
          <div class="sider-rect"></div>
          <div class="sider-content">
            <h3 class="h5 mb-3">Вы достойны лучшего</h3>
            <p class="mb-0">Магазин ручных изделий, сделанных с любовью</p>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
// eslint-disable-next-line
import 'swiper/dist/css/swiper.css';
// eslint-disable-next-line import/no-unresolved
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 4500,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_custom.scss';

.silder-wrap {
  position: relative;
}
.swiper-container {
  width: 100%;
  height: 500px;
  @media (max-width: 767px) {
    height: 400px;
  }
}
.sider {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
.sider-left {
  flex-direction: row-reverse;
  @media (max-width: 767px) {
    flex-direction: column;
  }
}
.sider-1 {
  background-image: url('../assets/image/banner-1.png');
}
.sider-2 {
  background-image: url('../assets/image/banner-2.png');
}
.sider-3 {
  background-image: url('../assets/image/banner-3.png');
}
.sider-rect {
  flex: 1.5;
  margin: 2.5rem;
  border: solid $hot-color 3px;
}
.sider-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba($hot-color, .9);
  text-align: center;
}
</style>
