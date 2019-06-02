<template>
  <section class="g-rest-page">
    <transition name="fade-clear" mode="out-in">
      <div class="g-rest-page__content">
        <div class="g-rest-page__img">
          <router-link to="/" class="g-rest-page__back">
            <span></span>
          </router-link>
          <div class="g-mini-info">
            <div class="g-mini-info__wrapper">
              <div class="g-mini-info__head">
                <div class="g-mini-info__left">
                <span>
                  {{ place.name }}
                </span>
                  <span>
                  ул. Антонова-Овсеенко, 5а
                </span>
                </div>
                <div class="g-mini-info__right">
                  <div class="g-rest-page__logo"></div>
                </div>
              </div>
              <div class="g-mini-info__body">
                <div class="g-mini-info__item">
                  <span :style="place.opening_hours.open_now ? { color: '#72bf44' } : { color: '#D6000D' }">
                    {{ place.opening_hours.open_now ? 'Открыто' : 'Закрыто' }}
                  </span>
                  <span>
                    13:00 - 01:00
                  </span>
                </div>

                <div class="g-mini-info__item g-mini-info__item_goTo">
                  <div class="g-mini-info__icon g-mini-info__icon_goTo"></div>
                  <span>
                  {{ goTo }}
                </span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="g-rest-page-body">
          <div class="g-rest-page-body__item">
            <a href="tel: +79601178888">
              <div class="g-rest-page-body__icon g-rest-page-body__icon_phone"></div>
              <span>
                +7 (960) 117-88-88
              </span>
            </a>
          </div>
          <div class="g-rest-page-body__item">
            <a href="https://mh36.ru" target="_blank">
              <div class="g-rest-page-body__icon g-rest-page-body__icon_site"></div>
              <span>
                mh36.ru
              </span>
            </a>
          </div>
          <div class="g-rest-page-body__item">
            <a href="mailto: 117888@mail.ru">
              <div class="g-rest-page-body__icon g-rest-page-body__icon_mail"></div>
              <span>
                117888@mail.ru
              </span>
            </a>
          </div>
          <div class="g-rest-page-body__item">
            <a href="javascript:void(0)" @click="madeRoute">
              Проложить маршрут
            </a>
          </div>
          <div class="g-rest-page-body__item">
            <div class="g-rest-page-body__head">
              <h3>
                Описание
              </h3>
            </div>
            <p>
              Мангал-Хаус - это уникальный в своем роде ресторан, кафе, банкетный зал - назвать можно как угодно.
              Формат заведения таков, что в Мангал-Хаусе будет одинаково комфортно как избалованным любителям ресторанной кухни и высокого уровня обслуживания, так и посетителям, не избалованным высоким сервисом и предпочитающим заведения без излишнего пафоса.
              Уникальность Мангал-Хауса состоит в подаче блюд и идее совместить процесс приготовления пищи и само застолье.
            </p>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    data: () => ({
      place: {},
    }),
    watch: {
    },
    computed: {
      goTo() {
        if ( this.place.goTo >= 1000 ) {
          return `${this.place.goTo.toFixed(0) / 1000} км`
        } else {
          return `${this.place.goTo.toFixed(0)} м`
        }
      },
    },
    methods: {
      madeRoute() {
        if ( localStorage.getItem('geoUser') ) {
          let geo = JSON.parse(localStorage.getItem('geoUser'));
          let geoPlace = this.place.geometry.location;
          window.open(`https://yandex.ru/maps/193/voronezh/?ll=39.197743%2C51.698436&mode=routes&rtext=${geo.lat}%2C${geo.long}~${geoPlace.lat}%2C${geoPlace.lng}&rtt=auto&z=18`, '_blank')
        } else {
          alert('Извините, но для построения маршрута нужно предоставить доступ к геоданным')
        }
      }
    },
    beforeMount() {
      this.place = JSON.parse(localStorage.getItem('place'));


    }
  }
</script>