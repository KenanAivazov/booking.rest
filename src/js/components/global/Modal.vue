<script>
  import dayjs from 'dayjs'
  import 'dayjs/locale/ru'
  import { TweenLite, CSSPlugin, Back } from "gsap/all";
  const _activate = CSSPlugin;
  import { mapState } from 'vuex';
  // сделать отдельным модулем
  const io = () => import('socket.io-client');
  export default {
    data: () => ({
      animation: '',
      date: '',
      howMuchPeople: 0,
      step: 1,
      moreStole: false,
      userPhone: '',
      userComment: '',
      data: {}
    }),
    watch: {
      howMuchPeople() {
        if ( this.howMuchPeople > 20 ) {
          alert('Вы ввели слишком больше количество людей. Максимум - 20 человек');
          this.howMuchPeople = 20
        }
      }
    },
    computed: {
      ...mapState([
        'modal'
      ]),
      getNormalDate() {
        return this.date && dayjs(this.date).locale('ru').format('DD MMM HH:mm')
      },
      getLabelDate() {
        if ( this.modal.modalPickDate ) {
          return this.date || 'Время'
        } else {
          return this.getNormalDate || 'Дата и время'
        }
      }

    },
    methods: {
      validInputs() {
        this.step++;
        let terDate = this.modal.modalPickDate ? `${this.modal.modalPickDate} ${this.date}` : dayjs(this.date).locale('ru').format('DD MMM HH:mm');
        this.data = {
          date: terDate,
          people: this.howMuchPeople,
          name: this.modal.modalSitsInfo.name,
          phone: this.userPhone,
          comment: this.userComment,
          confirm: false
        };

      },
      sendStole() {


        const socket = io.connect('ws://api-back.glitch.me');

        socket.emit('booking', data);

        socket.on('connect_error', err => {
          alert(`Произошла ошибка ${err}`)
        });

        socket.on('connect_timeout', err => {
          alert(`Время запроса истекло: ${err}`)
        });
      },
      closeModal(e) {
        console.log(e.target === this.$refs.modal && this.modal.body !== 'geo');
        if ( e.target === this.$refs.modal && this.modal.body !== 'geo' ) {
          if ( Boolean(this.modal.isCloseFunc) ) {
            this.modal.isCloseFunc();
          }
          this.animation.reverse();
          setTimeout(() => {
            this.$store.commit('SET_MODAL', {
              active: false
            })
          }, 300)
        }
      },
      getYandex() {
        if ( localStorage.getItem('geoUser') ) {
          let userPos = JSON.parse(localStorage.getItem('geoUser'));
          window.location.href = `https://3.redirect.appmetrica.yandex.com/route?start-lat=${userPos.lat}&start-lon=${userPos.long}&end-lat=51.689816&end-lon=39.125447&level=50&ref=kenanagency&appmetrica_tracking_id=1178268795219780156`
        } else {
          alert('Извините, но для заказа такси нужно предоставить доступ к геоданным')
        }
      },
      getUber() {
        alert('В данный момент заказ через Uber недоступен')
      },

    },
    mounted() {
      setTimeout(() => {
        this.animation = TweenLite.to('.g-modal__body', .3,
          {
            y: 0,
            opacity: 1,
            ease: Back.easeOut.config(2)
          })
      }, 300)
    }
  }
</script>

<template>
  <div :class="[ 'g-modal', { 'g-modal_black': modal.blackBg }, { 'g-modal_blur': !modal.blackBg } ]" ref="modal" @click="[ closeModal($event) ]">
    <div class="g-modal__body">
      <h2 v-if="modal.head" ref="modalHead">
        {{ modal.head }}
      </h2>
      <p v-if="modal.modalText">{{ modal.modalText }}</p>
      <transition name="fade" mode="out-in">
        <div v-if="step === 1" :class="[ 'g-modal__content', { 'g-modal__content_booking': modal.body === 'booking' } ]" ref="modalBody">
          <template v-if="modal.body === 'taxi'">
            <button class="g-modal__yandex" @click="getYandex">Яндекс.Такси</button>
            <button class="g-modal__uber g-disabled-item" @click="getUber">Uber</button>
          </template>
          <template v-if="modal.body === 'geo'">
            <button class="g-modal__geo" name="Предоставить доступ к геоданным" @click="modal.isTrue">Предоставить</button>
            <button class="g-modal__geo g-disabled" name="Не предоставлять доступ к геоданным" @click="modal.isFalse">Не предоставлять</button>
          </template>
          <template v-if="modal.body === 'booking'">
            <label for="timeDate" class="g-modal__item_half">
              {{ getLabelDate }}
              <input id="timeDate" v-model="date" class="g-hide-input" :type="modal.pickDate ? 'time' : 'datetime-local'">
            </label>
            <label :disabled="!date" class="g-modal__item_half" for="selectGuest">
              {{ howMuchPeople || 'Количество гостей' }}
              <input id="selectGuest" class="g-hide-input" type="number" v-model.number="howMuchPeople">
            </label>
            <button :class="[ 'g-modal__item' ]" :disabled="!howMuchPeople" @click="validInputs">
              Далее
            </button>
          </template>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div :class="[ 'g-modal__content g-modal__content_booking']" v-if="step === 2">
          <input :disabled="!howMuchPeople" id="number" class="g-modal__input g-modal__item" placeholder="+7 (###) ###-##-##" type="text" v-mask="'+7 (###) ###-##-##'" v-model="userPhone">
          <textarea :disabled="!userPhone" class="g-modal__input g-modal__item" v-model="userComment" placeholder="Комментарий (необязательно)"></textarea>
          <button :class="[ 'g-modal__item' ]" :disabled="!userPhone" @click="sendStole">
            Заказать столик
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>