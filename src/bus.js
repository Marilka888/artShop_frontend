import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// vm.$bus.$emit('message:push', message, status); Переход на внешний слой
// message(String): Содержание сообщения
// status(String): Стиль Alert's
