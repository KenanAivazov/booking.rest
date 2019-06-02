<template>
  <section :class="[ 'g-table-layout', { 'g-table-layout_blur': openModalBlur } ]" >
    <div :class="[ 'g-table-layout-nav' ]">
      <carousel :paginationPadding="0" ref="carousel" :centerMode="true"  :perPage="1" :paginationEnabled="false" @pageChange="changeLayout">
        <slide v-for="( lays, i ) in layouts" :data-index="i" :class="[ { 'VueCarousel-slide-active': layoutIndex === i }, { 'VueCarousel-slide-prev': layoutIndex === i + 1 } ]" :key="i">
          <div class="g-table-layout-nav__item">
            {{ lays.name }}
          </div>
        </slide>
      </carousel>
    </div>
    <div class="g-table-layout-content">
      <transition name="fade-clear" mode="out-in">
        <div class="g-table-layout-content__item" v-if="layoutIndex === 0">
          <div class="loader loader4" v-if="false">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="[ 'g-layout', { 'g-layout_filled': item.selected } ]" :style="`transform: translateX(${item.x}px) translateY(${item.y}px)`" v-for="( item, index ) in sits1" :key="index">

            <template v-if="item.isSmall">
              <div :class="[ 'g-layout-item', { 'g-layout-item_small': item.isSmall } ]" @click="openModal(index, item)">
                <div class="g-layout-item__chair"></div>
                <div :class="[ 'g-layout-item__stole', { 'g-layout-item__stole_small': item.isSmall }, { 'g-layout-item__stole_free': item.isFree }, { 'g-layout-item__stole_sold': item.isSold } ]">
                  {{ item.name }}
                </div>
                <div class="g-layout-item__chair g-layout-item__chair_right"></div>
              </div>
            </template>

            <template v-else-if="item.isBig">
              <div :class="[ 'g-layout-item', { 'g-layout-item_big': item.isBig } ]" @click="openModal(index, item)">
                <div :class="[ 'g-layout-item__up', { 'g-layout-item__line_small': !item.isLeftChair }, { 'g-layout-item__line_medium': item.chairs === 2 && item.isLeftChair } ]">
                  <div :class="[ 'g-layout-item__chair', { 'g-layout-item__chair_center': item.chairs === 1 } ]" v-for="( chair, index ) in item.chairs" :key="index"></div>
                </div>
                <div class="g-layout-item__center g-layout-item__center_chairs">
                  <div class="g-layout-item__chair" v-if="item.isLeftChair"></div>
                  <div :class="[ 'g-layout-item__stole', { 'g-layout-item__stole_big': item.isBig }, { 'g-layout-item__stole_free': item.isFree }, { 'g-layout-item__stole_sold': item.isSold } ]">
                    {{ item.name }}
                  </div>
                  <div class="g-layout-item__chair g-layout-item__chair_right" v-if="item.isRightChair"></div>
                </div>
                <div :class="['g-layout-item__bottom', { 'g-layout-item__line_small': !item.isLeftChair }, { 'g-layout-item__line_medium': item.chairs === 2 && item.isLeftChair } ]">
                  <div :class="[ 'g-layout-item__chair', { 'g-layout-item__chair_center': item.chairs === 1 } ]" v-for="( chair, index ) in item.chairs" :key="index"></div>
                </div>
              </div>
            </template>

            <template v-else-if="item.staircase">
              <div :class="[ 'g-layout-item g-layout-item__spec g-layout-item__spec_staircase' ]" @click="roadTo">
                <span>
                  {{ item.name }}
                </span>
              </div>
            </template>

            <template v-else-if="item.input">
              <div :class="[ 'g-layout-item g-layout-item__spec g-layout-item__spec_exit g-layout-item__spec_date' ]">
                <label for="date">
                  {{ normalDate || dateLabel }}
                </label>
                <input id="date" class="g-hide-input" v-model="dateInput" type="date">
              </div>
            </template>

            <template v-else>
              <div :class="[ 'g-layout-item g-layout-item__spec' , { 'g-layout-item__spec_exit': item.exit }, { 'g-layout-item__spec_bar': item.bar } ]" :style="`transform: translateX('${item.x}px') translateY('${item.y}px')`">
                {{ item.name }}
              </div>
            </template>

          </div>
        </div>
      </transition>
      <transition name="fade-clear" mode="out-in">
        <div class="g-table-layout-content__item" v-if="layoutIndex === 1">
          <div class="loader loader4">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade-clear" mode="out-in">
        <div class="g-table-layout-content__item" v-if="layoutIndex === 2">
          <div class="loader loader4">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade-clear" mode="out-in">
        <div class="g-table-layout-content__item" v-if="layoutIndex === 3">
          <div class="loader loader4">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
  import dayjs from 'dayjs'
  import 'dayjs/locale/ru'
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    data: () => ({
      layoutIndex: 0,
      openModalBlur: false,
      dateLabel: 'Выберите день',
      dateInput: '',
      // dayjs(new Date).locale('ru').format('DD MMM')
      layouts: [
        {
          name: 'Первый этаж',
          first: true
        },
        {
          name: 'Второй этаж'
        },
        {
          name: 'Банкетный зал'
        },
        {
          name: 'VIP зал'
        }
      ],
      sits1: [
        {
          exit: true,
          x: 0,
          y: 0,
          name: 'Вход'
        },
        {
          name: '',
          x: 180,
          y: 0,
          input: true
        },
        {
          name: '2 этаж',
          x: 0,
          y: 100,
          staircase: true,
        },
        {
          name: '2 этаж',
          x: 243,
          y: 100,
          staircase: true,
        },
        {
          name: '1',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          isRightChair: false,
          isLeftChair: true,
          chairs: 2,
          x: 0,
          y: 200
        },
        {
          name: '2',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          isLeftChair: true,
          isRightChair: true,
          chairs: 2,
          x: 0,
          y: 320
        },
        {
          name: '3',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isRightChair: true,
          isLeftChair: true,
          x: 0,
          y: 440
        },

        {
          name: '4',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          isLeftChair: true,
          isRightChair: true,
          chairs: 2,
          x: 0,
          y: 560
        },

        {
          name: '5',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 0,
          y: 680
        },

        {
          name: '6',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 0,
          y: 800
        },

        // вторая линия

        {
          name: 'H1',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 200
        },
        {
          name: 'H2',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 320
        },
        {
          name: 'H3',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 440
        },

        {
          name: 'H4',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 560
        },

        {
          name: 'H5',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 680
        },

        {
          name: 'H6',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 800
        },

        {
          name: 'H7',
          isFree: true,
          isSold: false,
          isSmall: false,
          isBig: true,
          horizontal: false,
          vertical: true,
          selected: false,
          chairs: 2,
          isLeftChair: true,
          isRightChair: true,
          x: 180,
          y: 920
        },

      ],
      sits2: [],
      sits3: []
    }),
    components: {
      Carousel,
      Slide
    },
    computed: {
      normalDate() {
        return this.dateInput && dayjs(this.dateInput).locale('ru').format('DD MMM')
      }
    },
    methods: {
      changeLayout(i) {
        console.log(i);
        this.layoutIndex = i;
      },
      roadTo() {
        this.layoutIndex = 2;
        this.$refs.carousel.advancePage(2)
      },
      openModal(i, item) {
        console.log(this.normalDate);
        let chairs = ( item.chairs * 2 ) + +item.isLeftChair + +item.isRightChair;
        this.openModalBlur = !this.openModalBlur;
        this.sits1[i].selected = !this.sits1[i].selected;
        let that = this;
        this.$store.commit('SET_MODAL', {
          active: this.openModalBlur,
          head: `Бронирование столика "${item.name}"`,
          blackBg: false,
          text: '',
          body: 'booking',
          chairs: chairs,
          info: item,
          pickDate: this.normalDate,
          isCloseFunc() {
            that.openModalBlur = !that.openModalBlur;
            that.sits1[i].selected = !that.sits1[i].selected;
          }
        })
      },
    },
    created() {
    },
    mounted() {
      document.querySelector('.g-rest').style.paddingBottom = '520px';
    },
    destroyed() {
      document.querySelector('.g-rest').style.paddingBottom = '';
    }
  }
</script>