<template>
  <section class="g-menu">
    <div class="g-menu__head">
      <form class="g-search">
        <button></button>
        <label>
          <input type="text" placeholder="Что вы ищете?" v-model="search">
        </label>
      </form>
    </div>
    <div class="g-menu-body" @click="closeSet">
      <transition name="fade-clear" mode="out-in">
        <div v-if="isLoad">
          <div class="g-menu-body__wrapper" v-for="(m, index) in menu" :key="`loader_${index}`">
            <div class="g-content-loader__row">
              <div class="g-content-loader__row-item"></div>
            </div>
            <div class="g-menu-body__items">
              <div class="g-menu-body__item" v-for="( item, index ) in m.items" :key="`item-loader_${index}`">
                <div class="g-content-loader__row-img"></div>
               <div class="g-content-loader__row">
                 <div class="g-content-loader__row-item"></div>
                 <div class="g-content-loader__row-item"></div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade-clear" mode="in-out">
        <div v-if="!isLoad">
          <div class="g-menu-body__wrapper" v-for="(m, index) in menu" :key="`menu_${index}`">
            <h2>{{ m.name }}</h2>
            <div class="g-menu-body__items" ref="items">
              <div class="g-menu-body__item" v-for="( item, index ) in m.items" :key="`item_${index}`" @click="openDishModal(item)">
                <img src="@/menu/1.png" class="g-menu-body__photo" :alt="item.name">
                <div class="g-menu-body__content">
                  <p>{{ item.name }}</p>
                  <p>
                    {{ item.text }}
                  </p>
                </div>
                <div class="g-menu-body__price">
                  <p>{{ item.price }} ₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- small menu -->
    <!--
    <transition name="fade-clear" mode="out-in">
      <div class="g-menu-settings" v-show="settings" @click="openSettings">
        <transition name="fade-clear" mode="out-in">
          <span v-show="setIcon"></span>
        </transition>
        <transition name="fade-clear" mode="out-in">
          <div class="g-menu-settings__content" v-show="!setIcon">
            <div class="g-menu-settings__body">
              <div :class="[ 'g-menu-settings__item', { 'g-menu-settings__item_active': fItem.active } ]" v-for="( fItem, index ) in filterItems"  :key="index" @click="clickSettingsItem(fItem.name)">
                <div class="g-menu-settings__head"></div>
                <h3>{{ fItem.name }}</h3>
              </div>
            </div>
          </div>

        </transition>
      </div>
    </transition>
    -->
  </section>
</template>

<script>
  import { TweenLite, CSSPlugin, Expo } from "gsap/all";
  const _activate = CSSPlugin;
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    data: () => ({
      search: '',
      settings: false,
      isLoad: true,
      setIcon: true,
      filterItems: [
        {
          name: 'Хол. закуски',
          icon: '',
          active: false,
        },
        {
          name: 'Тёплые салаты',
          icon: '',
          active: false,
        },
        {
          name: 'Салаты',
          icon: '',
          active: false,
        },
        {
          name: 'Супы',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Соусы',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Вторые блюда',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Гарниры',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Гриль-меню',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Блюда на углях',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Чай',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Кофе',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Десерты',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Молочные коктейли',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Пиво бут.',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Безалк. напитки',
          amount: 20,
          icon: '',
          active: false,
        },
        {
          name: 'Пиво разл.',
          amount: 20,
          icon: '',
          active: false,
        },
      ],
      menu: [
        {
          name: 'Холодные закуски',
          items: [
            {
              name: 'Суп из курицы',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deleniti dolore, ducimus eum harum, ipsa ipsum maiores mollitia quia repellendus repudiandae, saepe. Aspernatur blanditiis est ipsam perspiciatis tenetur vero voluptate.',
              composition: ['курица', 'петрушка', 'укроп', 'зелёный лук', 'куринный бульон'],
              image: '1.png',
              price: '250'
            },
            {
              name: 'Суп из курицы',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deleniti dolore, ducimus eum harum, ipsa ipsum maiores mollitia quia repellendus repudiandae, saepe. Aspernatur blanditiis est ipsam perspiciatis tenetur vero voluptate.',
              composition: ['курица', 'петрушка', 'укроп', 'зелёный лук', 'куринный бульон'],
              image: '1.png',
              price: '129'
            },
            {
              name: 'Суп из курицы',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deleniti dolore, ducimus eum harum, ipsa ipsum maiores mollitia quia repellendus repudiandae, saepe. Aspernatur blanditiis est ipsam perspiciatis tenetur vero voluptate.',
              composition: ['курица', 'петрушка', 'укроп', 'зелёный лук', 'куринный бульон'],
              image: '1.png',
              price: '1241'
            },
            {
              name: 'Суп из курицы',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deleniti dolore, ducimus eum harum, ipsa ipsum maiores mollitia quia repellendus repudiandae, saepe. Aspernatur blanditiis est ipsam perspiciatis tenetur vero voluptate.',
              composition: ['курица', 'петрушка', 'укроп', 'зелёный лук', 'куринный бульон'],
              image: '1.png',
              price: '15 234'
            },
            {
              name: 'Суп из курицы',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deleniti dolore, ducimus eum harum, ipsa ipsum maiores mollitia quia repellendus repudiandae, saepe. Aspernatur blanditiis est ipsam perspiciatis tenetur vero voluptate.',
              composition: ['курица', 'петрушка', 'укроп', 'зелёный лук', 'куринный бульон'],
              image: '1.png',
              price: 0
            },

          ]
        },
        {
          name: 'Тёплые салаты',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Салаты',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Супы',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Соусы',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Вторые блюда',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Гарниры',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Гриль-меню',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Блюда на углях',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Чай',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Кофе',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Десерты',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]

        },
        {
          name: 'Молочные коктейли',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
        {
          name: 'Пиво бут.',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]

        },
        {
          name: 'Безалк. напитки',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]

        },
        {
          name: 'Пиво разл.',
          items: [
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },
            {
              name: 'Название блюда',
              composition: [''],
              price: 0
            },

          ]
        },
      ]
    }),
    methods: {
      openDishModal(item) {
        // TODO: при клике на item открываем новую страницу с блюдом
      },
      clickSettingsItem(name) {
        console.log(name);
        this.closeSet()
      },
      closeSet() {
        let that = this;
        setTimeout(() => {
          TweenLite.to('.g-menu-settings', .3, {
            ease: Expo.easeOut,
            y: -80,
            x: -20,
            'border-radius': '100%',
            width: '50px',
            height: '50px',
            onComplete() {
              that.setIcon = true
            }
          })
        }, 300);
        this.setIcon = true;
      },
      openSettings() {
        let that = this;
        TweenLite.to('.g-menu-settings', .3, {
          ease: Expo.easeOut,
          x: 0,
          y: 0,
          'border-top-right-radius': '15px',
          'border-top-left-radius': '15px',
          'border-bottom-right-radius': '0',
          'border-bottom-left-radius': '0',
          width: '100%',
          height: '300px',
          onComplete() {
            that.setIcon = false
          }
        });
      }
    },
    components: {
      Carousel,
      Slide
    },
    mounted() {
      this.settings = true;
      setTimeout(() => {
        this.isLoad = false;
      }, 2000);
    },
    destroyed() {
    }
  }
</script>