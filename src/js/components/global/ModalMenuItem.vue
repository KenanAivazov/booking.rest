<template>
  <div class="g-modal-dish" ref="modal" @click="closeModal">
    <div class="g-modal-dish__body">
      <div class="g-modal__line"></div>
      <h2>{{ modalDish.infoItem.name }}</h2>
      <p>{{ modalDish.infoItem.text }}</p>
    </div>
  </div>
</template>

<script>

  import { TweenLite, CSSPlugin, Back } from "gsap/all";
  const _activate = CSSPlugin;
  import { mapState } from 'vuex'
  export default {
    data: () => ({
      animation: ''
    }),
    computed: {
      ...mapState([
        'modalDish'
      ])
    },
    methods: {
      closeModal(e) {
        if ( e.target === this.$refs.modal ) {
          this.animation.reverse();
          setTimeout(() => {
            this.$store.commit('SET_MODAL_DISH', {
              active: false
            })
          }, 300)
        }
      }
    },
    mounted() {
      console.log(this.modalDish);
      setTimeout(() => {
        this.animation = TweenLite.to('.g-modal-dish__body', .3,
          {
            y: 0,
            opacity: 1,
            ease: Back.easeOut.config(2)
          })
      }, 300)
    }
  }
</script>