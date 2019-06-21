<script>
  import Loader from './components/global/Loader.vue'
  import Modal from './components/global/Modal.vue'
  import { mapMutations } from 'vuex';
  export default {
    data: () => ({
      animMiniInfo: '',
      mapConst: ''
    }),
    components: {
      Loader,
      'v-modal': Modal
    },
    computed: {
      active() {
        return this.$store.state.modal.active
      },
    },
    watch: {
    },
    methods: {
      ...mapMutations({
        places: 'SET_PLACES',
        miniInfo: 'SET_MINI_INFO',
        miniInfoObject: 'SET_OBJECT_MINI_INFO',
        restClick: 'SET_REST_CLICK',
        setMap: 'SET_MAP',
        createModal: 'SET_MODAL',
        setBg: 'SET_MINI_INFO_BG'
      }),
      mapInfo(lat = 51.685456, long = 39.1994535) {
        let map;
        let that = this;
        let marker;
        // инициализируем карту
        const initMap = () => {

          this.mapConst = map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
              lat: lat,
              lng: long
            },
            disableDefaultUI: true
          });
          let service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: {
              lat: lat,
              lng: long
            },
            radius: 30000,
            name: 'Мангал House',
            type: [ 'restaurant', 'cafe' ]
          }, callback);
          function callback(results, status) {
            that.$store.commit('SET_PLACES', results);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < results.length; i++) {
                // ставим расстояние до каждой точки
                let center = map.getCenter();
                let markerLatLng = results[i].geometry.location;
                let distance = google.maps.geometry.spherical.computeDistanceBetween(center, markerLatLng);
                results[i].goTo = +distance;
                createMarker(results[i]);
              }
            }
          }
        };


        // создаём маркер
        const createMarker = place => {
          marker = new google.maps.Marker({
            map : map,
            position : place.geometry.location,
            icon: './src/imgs/pin-map.svg'
          });
          // берём данные
          google.maps.event.addListener(marker, 'click', e => {
            that.miniInfo(true);
            that.restClick(false);
            that.miniInfoObject(place);
            that.setBg(true);
            console.log(that.$store.state.miniInfoBackground, 'bg');
            setTimeout(() => {
              this.animMiniInfo = TweenLite.to('.g-mini-info', .6, {
                y: -20,
                ease: Expo.easeInOut
              });
            }, 100);
            map.panTo({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          });
          // При dragstart убираем поле с мини инфой и показываем "Заведения по близости"
          map.addListener('dragstart', e => {
            that.restClick(true);
            if ( that.animMiniInfo != '' ) {
              that.animMiniInfo.reverse();
            }
            setTimeout(() => {
              that.miniInfo(false);
            }, 600);

          });
        };
        initMap();

      },
      geoPos(position) {
        let lat = Number(position.coords.latitude);
        let long = Number(position.coords.longitude);
        this.mapInfo(lat, long);
        console.log('есть доступ к геоданным');
        localStorage.setItem('geoUser', JSON.stringify({lat: Number(position.coords.latitude), long: Number(position.coords.longitude) }));
        this.createModal({
          active: false
        });
      },
      geoError() {
        console.log('нету доступа к геоданным, отрендерим по тем, которые дал прогер');
        localStorage.setItem('geolocation', 'false')
        setTimeout(() => {
          this.mapInfo();
          this.createModal({
            active: false
          })
        }, 300);
      },
      mapInit() {

        if ( !Boolean(localStorage.getItem('geolocation')) ) {
          this.createModal({
            active: true,
            head: 'Доступ к геоданным',
            body: 'geo',
            blackBg: true,
            modalText: 'Для нахождения ресторанов по близости приложению нужно знать ваши геоданные ( ширина и долгота )',
            isTrue: () => {
              localStorage.setItem('geolocation', 'true');
              if ( 'geolocation' in navigator ) {
                navigator.geolocation.getCurrentPosition(this.geoPos, this.geoError);
              }
            },
            isFalse: () => {
              localStorage.setItem('geolocation', 'false');
              if ( 'geolocation' in navigator ) {
                navigator.geolocation.getCurrentPosition(this.geoPos, this.geoError);
              }
              this.geoError()
            }
          });
        } else {

          if ( 'geolocation' in navigator ) {
            navigator.geolocation.getCurrentPosition(this.geoPos, this.geoError);

          }
        }
      },
    },
    created() {

    },
    mounted() {
    }
  };
</script>
<template>
  <div class="g-wrapper">
    <transition name="fade-clear" mode="out-in">
      <v-modal v-if="active" />
    </transition>
    <main>
      <transition name="fade-clear" mode="out-in">
        <router-view :key="$route.params.id"/>
      </transition>
    </main>
    <loader />
  </div>
</template>