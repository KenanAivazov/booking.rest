<template>
  <div class="g-list">
    <div class="g-list__head-wrapper" ref="listWrapper">
      <div class="g-list__content">
        <h1>Рестораны</h1>
        <h4>
          {{ howMuch }} рядом с вами
        </h4>
      </div>
    </div>
    <div class="g-search" ref="search">
      <label>
        <input type="text" placeholder="Что вы ищете?" v-model="search">
      </label>
      <button></button>
    </div>
    <div class="g-list__wrapper">
      <transition name="fade-clear" mode="out-in">
        <div class="g-content-loader" v-if="contentLoader">
          <div class="g-content-loader__row-img"></div>
        </div>
      </transition>
      <transition name="fade-clear" mode="out-in">
        <div class="g-list__container" v-if="!contentLoader">
          <transition-group name="fade" tag="div">
            <div class="g-list__item" v-for="( item, index ) in searchPlace" :ref="`item_${index}`" :key="index">
              <div class="g-list-type">
                <div class="g-list-type__item">кафе</div>
                <div class="g-list-type__item">ресторан</div>
              </div>
              <div class="g-list__photo" :style="`background-image: url('${item.photos[0].getUrl()}')`">
                <div class="g-list__info">
                  <div class="g-list__head">
                    <div class="g-list__left">
                      <h1>
                        {{ item.name }}
                      </h1>
                      <span>
                    {{ item.vicinity.replace(', Воронеж', '').replace('улица', 'ул.') }}
                    </span>
                    </div>
                    <div class="g-list__right">
                      <div class="g-list__taxi" @click="openModalTaxi">
                        <span></span>
                      </div>
                      <div class="g-list__open" @click="goToPage(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="m40.4 121.3c-0.8 0.8-1.8 1.2-2.9 1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"/></svg>
                      </div>

                    </div>
                  </div>
                  <div class="g-list__body">
                    <div class="g-mini-info__item">
                      <div class="g-mini-info__icon g-mini-info__icon_star"></div>
                      <span>
                    {{ item.rating }}
                  </span>
                    </div>
                    <div class="g-mini-info__item g-mini-info__item_goTo">
                      <div class="g-mini-info__icon g-mini-info__icon_goTo"></div>
                      <span>
                      {{ item.goTo >= 1000 ? `${item.goTo.toFixed(0) / 1000} км` : `${item.goTo.toFixed(0)} м` }}
                    </span>
                    </div>
                    <div class="g-mini-info__item">
                      <div class="g-mini-info__icon g-mini-info__icon_time"></div>
                      <span :style="item.opening_hours.open_now ? { color: '#72bf44' } : { color: '#D6000D' }">
                      {{ item.opening_hours.open_now ? 'Открыто' : 'Закрыто' }}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
  import { TweenLite, CSSPlugin, Expo } from "gsap/all";
  const _activate = CSSPlugin;
  export default {
    props: [
      'listItems'
    ],
    data: () => ({
      search: ''
    }),
    computed: {
      contentLoader() {
        return this.$store.state.contentLoaderList
      },
      searchPlace() {
        return this.listItems.filter(item => {
          return item.name.includes(this.search)
        })
      },
      howMuch() {
        return this.searchPlace.length <= 0 ? `Найдено ${this.searchPlace.length} ресторанов` : `Найден ${this.searchPlace.length} ресторан`
      }
    },
    watch: {
      listItems() {
        if ( this.listItems.length > 0 ) {
          this.$store.commit('SET_LIST_LOADER', false);
        } else {
          this.$store.commit('SET_LIST_LOADER', true);
        }
      }
    },
    methods: {
      openModalTaxi() {
        this.$store.commit('SET_MODAL', {
          active: true,
          blackBg: true,
          head: 'Выберите один из вариантов',
          body: 'taxi'
        })
      },
      goToPage(obj) {
        console.log(obj);
        localStorage.setItem('place', JSON.stringify(obj));
        this.$router.push({
          name: 'RestPage',
          params: {
            id: obj.place_id
          }
        })
      }
    },
    mounted() {
      if ( this.listItems.length > 0 ) {
        this.$store.commit('SET_LIST_LOADER', false);
      } else {
        this.$store.commit('SET_LIST_LOADER', true);
      }
    },
    destroyed() {
    }
  }
</script>