<script>
  import { TweenLite, CSSPlugin, Expo } from "gsap/all";
  const _activate = CSSPlugin;
  import { Carousel, Slide } from 'vue-carousel';
  import { mapState } from 'vuex';
  import ListItem from './ListItem.vue'
  import Filters from './Filters.vue'
  import Events from './Events.vue'
  export default {
    data: () => ({
      nearRestaurants: false,
      party: false,
      step: 1,
      mapConst: '',

    }),
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$parent.mapInit();
        console.log(vm);
        console.log('главная')
      });

    },
    watch: {
      step(newVal) {

        if ( newVal !== 3 )  {
          this.$refs.main.style.overflowY = 'scroll';
          this.$refs.main.style.overflowX = 'hidden';
          TweenLite.to('.g-mini-info', .6, {
            y: '130%',
            ease: Expo.easeInOut,

          });

        } else if (newVal === 3) {
          this.$refs.main.style.overflow = 'hidden';
          this.$parent.mapInit();
        }
      }
    },
    computed: {
      goTo() {
        if ( this.miniInfoObject.goTo >= 1000 ) {
          return `${this.miniInfoObject.goTo.toFixed(0) / 1000} км`
        } else {
          return `${this.miniInfoObject.goTo.toFixed(0)} м`
        }
      },
      ...mapState([
        'places',
        'miniInfo',
        'miniInfoObject'
      ])
    },
    methods: {
      slider(dir) {
        this.$refs.carousel.advancePage(dir)
      },
      openModalTaxi() {
        this.$store.commit('SET_MODAL', {
          active: true,
          blackBg: true,
          head: 'Выберите один из вариантов',
          body: 'taxi'
        })
      },

      goToPage(obj) {
        this.step = 1;
        this.$store.commit('SET_MINI_INFO', false);
        console.log(this.miniInfo);
        console.log('хуй');
        localStorage.setItem('place', JSON.stringify(obj));
        this.$router.push({
          name: 'RestPage',
          params: {
            id: obj.id
          }
        })
      }
    },
    components: {
      Carousel,
      Slide,
      ListItem,
      Filters,
      Events
    },
    mounted() {

    }
  };
</script>

<template>
  <section class="g-main" ref="main">
    <!-- Mini info -->
    <div class="g-mini-info" v-if="miniInfo">
      <div class="g-mini-info__wrapper">
        <div class="g-mini-info__head">
          <div class="g-mini-info__left">
            <span>
              {{ miniInfoObject.name }}
            </span>
            <span>
              {{ miniInfoObject.vicinity.replace(', Воронеж', '').replace('улица', 'ул.') }}
            </span>
          </div>
          <div class="g-mini-info__right">
            <div class="g-list__taxi" @click="openModalTaxi">
              <span></span>
            </div>
            <div class="g-list__open" @click="goToPage(miniInfoObject)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="m40.4 121.3c-0.8 0.8-1.8 1.2-2.9 1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"/></svg>
            </div>
          </div>
        </div>
        <div class="g-mini-info__body">
          <div class="g-mini-info__item">
            <div class="g-mini-info__icon g-mini-info__icon_star"></div>
            <span>
              {{ miniInfoObject.rating }}
            </span>
          </div>
          <div class="g-mini-info__item g-mini-info__item_goTo">
            <div class="g-mini-info__icon g-mini-info__icon_goTo"></div>
            <span>
              {{ goTo }}
            </span>
          </div>
          <div class="g-mini-info__item">
            <div class="g-mini-info__icon g-mini-info__icon_time"></div>
            <span :style="miniInfoObject.opening_hours.open_now ? { color: '#72bf44' } : { color: '#D6000D' }">
              {{ miniInfoObject.opening_hours.open_now ? 'Открыто' : 'Закрыто' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Список ресторанов -->
    <transition name="fade" mode="out-in">
      <list-item :list-items="places" v-if="step == 1" />
    </transition>
    <!-- Фильтры -->
    <transition name="fade" mode="out-in">
      <filters v-if="step == 2" />
    </transition>


    <!-- Карта -->
    <transition name="fade" mode="out-in">
      <div id="map" v-show="step == 3" @click="nearRestaurants = false">
      </div>
    </transition>

    <!-- Заведения по близости -->
    <transition name="hide" mode="out-in">
      <div v-show="step == 3 && !miniInfo" :class="[ 'g-main__near', { 'g-main__near_open': nearRestaurants } ]">
        <div class="g-main__near-head">
          <h1>Заведения поблизости</h1>
          <div class="g-main__near-open" @click="nearRestaurants = !nearRestaurants"></div>
        </div>
        <div class="g-main__restaurants">
          <carousel ref="carousel" :centerMode="true" :per-page="1" :scrollPerPage="true" :paginationEnabled="false">
            <slide class="g-main__restaurants-item" v-for="( item, index) in places" :key="index">
              <div class="g-main__restaurants-wrapper">
                <div class="g-main__restaurants-img" :style="`background-image: url('${item.photos ? item.photos[0].getUrl() : 'Нету фото'}')`"></div>
                <div class="g-main__restaurants-content">
                  <div class="g-main__restaurants-head">
                    <span>{{ item.name }}</span>
                    <span>{{ item.vicinity.replace(', Воронеж', '').replace('улица', 'ул.') }} </span>
                  </div>
                  <span class="g-main__restaurants-rating">
                  {{ item.rating }}
                </span>
                </div>
                <button @click="goToPage(item)">
                  Перейти к заведению
                </button>
              </div>
            </slide>
          </carousel>
          <button class="g-main__restaurants-arrow g-main__restaurants-arrow_left" @click="slider('backward')">
            <span></span>
          </button>
          <button class="g-main__restaurants-arrow g-main__restaurants-arrow_right" @click="slider('forward')">
            <span></span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Мероприятия -->
    <transition name="fade" mode="out-in">
      <events v-if="step == 4" />
    </transition>

    <div class="g-main__switcher">
      <div :class="[ 'g-main__button-toggle', { 'g-main__button-toggle_active': step == 1 } ]" @click="step = 1">
        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" viewBox="0 0 489.7 489.7"><path d="M52.7 134.8c29.1 0 52.7-23.7 52.7-52.7s-23.6-52.8-52.7-52.8S0 53 0 82 23.7 134.8 52.7 134.8zM52.7 53.8c15.6 0 28.2 12.7 28.2 28.2s-12.7 28.2-28.2 28.2 -28.2-12.7-28.2-28.2S37.2 53.8 52.7 53.8z"/><path d="M52.7 297.6c29.1 0 52.7-23.7 52.7-52.7s-23.6-52.7-52.7-52.7S0 215.8 0 244.9 23.7 297.6 52.7 297.6zM52.7 216.7c15.6 0 28.2 12.7 28.2 28.2s-12.7 28.2-28.2 28.2 -28.2-12.6-28.2-28.2S37.2 216.7 52.7 216.7z"/><path d="M52.7 460.5c29.1 0 52.7-23.7 52.7-52.7 0-29.1-23.7-52.7-52.7-52.7S0 378.8 0 407.8C0 436.8 23.7 460.5 52.7 460.5zM52.7 379.5c15.6 0 28.2 12.7 28.2 28.2 0 15.6-12.7 28.2-28.2 28.2s-28.2-12.7-28.2-28.2C24.5 392.2 37.2 379.5 52.7 379.5z"/><path d="M175.9 94.3h301.5c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H175.9c-6.8 0-12.3 5.5-12.3 12.3S169.1 94.3 175.9 94.3z"/><path d="M175.9 257.2h301.5c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H175.9c-6.8 0-12.3 5.5-12.3 12.3S169.1 257.2 175.9 257.2z"/><path d="M175.9 420h301.5c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3H175.9c-6.8 0-12.3 5.5-12.3 12.3S169.1 420 175.9 420z"/></svg>
        <span>
          Список заведений
        </span>
      </div>

      <div :class="[ 'g-main__button-toggle', { 'g-main__button-toggle_active': step == 3 } ]" @click="step = 3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297"><path d="M141.9 185.8c1.9 1.7 4.2 2.5 6.6 2.5 2.4 0 4.7-0.8 6.6-2.5 2.4-2.1 58.4-52 58.4-103.8 0-35.8-29.1-65-65-65 -35.8 0-65 29.2-65 65C83.5 133.8 139.5 183.7 141.9 185.8zM148.5 65c9.3 0 16.8 7.6 16.8 17 0 9.4-7.5 17-16.8 17 -9.3 0-16.8-7.6-16.8-17C131.7 72.6 139.2 65 148.5 65z"/><path d="M273.4 185.8l-7.5-26.4c-1.2-4.3-5.1-7.2-9.6-7.2h-53.7c-1.9 2.9-4 5.8-6.2 8.7 -15.1 20.2-30.4 33.9-32.1 35.4 -4.4 3.8-10 6-15.8 6 -5.8 0-11.4-2.1-15.8-6 -1.7-1.5-17-15.2-32.1-35.4 -2.2-2.9-4.2-5.8-6.2-8.7h-53.7c-4.4 0-8.4 3-9.6 7.2l-9 31.4 200.5 36.7L273.4 185.8z"/><path d="M296.6 267.3l-19.2-67.4 -95.4 80.1h105.1c3.1 0 6.1-1.5 8-4C296.9 273.5 297.5 270.3 296.6 267.3z"/><path d="M48.8 209.9l-30.4-5.6L0.4 267.3c-0.9 3-0.3 6.2 1.6 8.7 1.9 2.5 4.8 4 8 4h38.8V209.9z"/><polygon points="62.7 212.4 62.7 280 160.3 280 208.9 239.2 "/></svg>
        <span>
          Карта заведений
        </span>
      </div>
      <div :class="[ 'g-main__button-toggle', { 'g-main__button-toggle_active': step == 4 } ]" @click="step = 4">
        <svg xmlns="http://www.w3.org/2000/svg" width="380" height="380" viewBox="0 0 380 380"><path d="M148.9 194.1c-1.5 1.1-2.3 2.9-2 4.8 0.3 1.9 1.6 3.4 3.4 3.9l20.5 6.4 6.4 20.5c0.2 0.8 0.7 1.5 1.2 2 0.7 0.7 1.7 1.2 2.7 1.4 1.9 0.3 3.7-0.5 4.8-2l12.4-17.5 21.5 0.3c1.9 0 3.6-1 4.5-2.7 0.9-1.7 0.7-3.7-0.4-5.2l-12.9-17.2 6.9-20.4c0.6-1.8 0.1-3.7-1.2-5.1 -1.3-1.3-3.3-1.8-5.1-1.2l-20.4 6.9 -17.2-12.9c-1.5-1.1-3.5-1.3-5.2-0.4 -1.7 0.9-2.7 2.6-2.7 4.5l0.3 21.5L148.9 194.1z"/><path d="M377.4 272.7c-5.4-5.4-8.3-12.5-8.3-20.1 0-7.6 3-14.7 8.3-20 3.5-3.5 3.5-9.2 0-12.8L160.1 2.6C158.5 1 156.2 0 153.8 0c-2.4 0-4.7 1-6.4 2.6 -5.4 5.4-12.5 8.3-20 8.3 -7.6 0-14.7-2.9-20.1-8.3 -3.5-3.5-9.2-3.5-12.8 0L69.8 27.4c-3.5 3.5-3.5 9.2 0 12.8 8.2 8.2 8.2 21.4 0 29.6 -4 4-9.2 6.1-14.8 6.1 -5.6 0-10.9-2.2-14.8-6.1 -3.5-3.5-9.2-3.5-12.8 0L2.6 94.5c-3.5 3.5-3.5 9.2 0 12.8 5.4 5.4 8.3 12.5 8.3 20.1 0 7.6-3 14.7-8.3 20C0.9 149.1 0 151.4 0 153.8s0.9 4.7 2.6 6.4L219.9 377.4c3.5 3.5 9.2 3.5 12.8 0 5.4-5.4 12.5-8.3 20-8.3 7.6 0 14.7 2.9 20.1 8.3 1.8 1.8 4.1 2.6 6.4 2.6 2.3 0 4.6-0.9 6.4-2.6l24.7-24.7c3.5-3.5 3.5-9.2 0-12.8 -8.2-8.2-8.2-21.4 0-29.6 4-4 9.2-6.1 14.8-6.1 5.6 0 10.9 2.2 14.8 6.1 3.5 3.5 9.2 3.5 12.8 0l24.7-24.7c1.7-1.7 2.6-4 2.6-6.4C380 276.7 379.1 274.4 377.4 272.7zM217.8 294.2L85.8 162.2l76.4-76.4 132 132L217.8 294.2z"/></svg>
        <span>
          Мероприятия
        </span>
      </div>
    </div>

  </section>
</template>
