<template>
  <div class="mb-4">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in newFavours" :key="item.id">
        <ul class="sider" :style='{backgroundImage: `url(${item.imageUrl})`}'
          @click.prevent="favourBtn(item.id)">
          <li class="sider-tag">
            <div class="sider-triangle"></div>
            <span class="sider-title"> {{item.category}} </span>
          </li>
          <li class="sider-rect">{{ item.title }}</li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'cardCarousel',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 15,
        autoplay: {
          delay: 4500,
        },
        breakpoints: {
          991: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  computed: {
    newFavours() {
      return this.favours.filter((item) => item.is_enabled === 1).slice(0, 12);
    },
    ...mapGetters('favoursModules', ['favours']),
  },
  methods: {
    getFavours() {
      this.$store.dispatch('favoursModules/getFavours', { isPagination: false });
    },
    favourBtn(favourId) {
      const vm = this;
      vm.$router.push({ path: `/favourslist/${favourId}` });
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.getFavours();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_custom.scss';

.sider {
  position: relative;
  min-height: 250px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border-radius: 0.25rem;
  border: 1px solid $hot-color;
  cursor: pointer;
}
.sider-title {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.25rem;
  background-color: darken($hot-color, 10);
  color: #fff;
  text-shadow: 1px 1px 1px #ccc;
}
.sider-rect {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($primary-color,0.5);
  opacity: 0;
  transition: all 0.3s ease;
  color: $white-color;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  &:hover, &:active {
    opacity: 1;
  }
}
</style>
