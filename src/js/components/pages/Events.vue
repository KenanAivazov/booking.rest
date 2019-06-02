<template>
  <section class="g-events">
    <div class="g-events__head-wrapper">
      <div class="g-events__content">
        <h1>События</h1>
        <h4>
          Найдено {{ howMuchEvents }}
        </h4>
      </div>
    </div>
    <div class="g-search">
      <input type="text" placeholder="Что вы ищите?" v-model="search">
      <button></button>
    </div>
    <div class="g-events__near">
      <div :class="[ 'g-events__near-item', { 'g-events__near-item_active': selectDate === 1 } ]" @click="selectNearDate('today')">
        Сегодня
      </div>
      <div :class="[ 'g-events__near-item', { 'g-events__near-item_active': selectDate === 2 } ]" @click="selectNearDate('tomorrow')">
        Завтра
      </div>
      <div :class="[ 'g-events__near-item', { 'g-events__near-item_active': datePick } ]">
        <label for="date">{{ datePick ? filterDateInput : 'Выбрать дату' }}</label>
        <input id="date" type="date" v-model="datePick" @change="pickDate" style="opacity: 0; width: 0; height: 0;">
      </div>
      <transition name="fade" mode="out-in">
        <div class="g-events__near-item g-events__near-item_close g-events__near-item_active" v-if="selectDate !== 0" @click="resetFilter">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7095 1.57908L13.3095 0.179077L7.70947 5.77908L2.10947 0.179077L0.709473 1.57908L6.30947 7.17908L0.709473 12.7791L2.10947 14.1791L7.70947 8.57908L13.3095 14.1791L14.7095 12.7791L9.10947 7.17908L14.7095 1.57908Z" fill="#fff"/>
          </svg>
        </div>
      </transition>
    </div>

    <div class="g-events__wrapper">
      <div class="g-events__container">
        <transition-group name="fade-clear" tag="div">
          <div class="g-events-item" v-for="( event, index ) in searchPlace" :key="index">
            <div class="g-events-item__img" :style="`background: url('${event.img}') no-repeat center / cover`">
              <div class="g-events-item__content">
                {{ event.name }} / {{ event.date }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
  import dayjs from 'dayjs'
  import { TweenLite, CSSPlugin, Expo } from "gsap/all";
  const _activate = CSSPlugin;
  export default {
    data: () => ({
      search: '',
      datePick: '',
      events: [
        {
          name: 'Радужный понедельник',
          img: './dist/imgs/events/1.jpg',
          date: '01.05.2019'
        },
        {
          name: 'Рахат Лукум Пати',
          img: './dist/imgs/events/2.jpg',
          date: '02.05.2019'
        },
        {
          name: 'Рахат 2',
          img: './dist/imgs/events/2.jpg',
          date: '02.05.2019'
        },
        {
          name: 'Рахат Пукум',
          img: './dist/imgs/events/2.jpg',
          date: '02.05.2019'
        },
        {
          name: 'Рахат Лукум Пати',
          img: './dist/imgs/events/2.jpg',
          date: '02.05.2019'
        },
        {
          name: 'Рахат Лукум Пати',
          img: './dist/imgs/events/2.jpg',
          date: '03.05.2019'
        },
        {
          name: 'Радужный понедельник',
          img: './dist/imgs/events/1.jpg',
          date: '01.05.2019'
        },
        {
          name: 'Радужный понедельник',
          img: './dist/imgs/events/1.jpg',
          date: '01.05.2019'
        },
        {
          name: 'Радужный понедельник',
          img: './dist/imgs/events/1.jpg',
          date: '01.05.2019'
        },
        {
          name: 'Радужный понедельник',
          img: './dist/imgs/events/1.jpg',
          date: '01.05.2019'
        },
        {
          name: 'Рахат Лукум Пати',
          img: './dist/imgs/events/2.jpg',
          date: '17.05.2019'
        },
      ],
      selectDate: 0,
      filterDate: '',
      filterDateInput: '',
      today: dayjs(new Date).format('DD.MM.YYYY')
    }),
    watch: {
      searchPlace(newVal) {
        console.log(newVal)
      }
    },
    methods: {
      pickDate() {
        this.selectDate = 3;
        this.filterDate = '';
        this.filterDateInput = dayjs(this.datePick).format('DD.MM.YYYY')
        console.log(this.datePick)
      },
      selectNearDate(day) {
        this.datePick = '';
        switch (day) {
          case 'today':
            this.filterDate = this.today;
            this.selectDate = 1;
            break;
          case 'tomorrow':
            this.filterDate = dayjs(new Date).add(1, 'day').format('DD.MM.YYYY');
            this.selectDate = 2;
            break
        }
      },
      resetFilter() {
        this.search = '';
        this.filterDate = '';
        this.filterDateInput = '';
        this.datePick = '';
        this.selectDate = 0;
      }
    },

    computed: {

      searchPlace() {
        return this.events.filter(item => {
          return item.name.includes(this.search) && item.date.includes(this.filterDate || this.filterDateInput)
        })
      },
      howMuchEvents() {
        if ( this.searchPlace.length <= 0 ) {
          return `${this.searchPlace.length} мероприятий`
        } else if ( this.searchPlace.length >= 5 ) {
          return `${this.searchPlace.length} мероприятий`
        } else {
          return `${this.searchPlace.length} мероприятия`
        }
      }
    },
    mounted() {
      console.log(this.today);
    }
  }
</script>