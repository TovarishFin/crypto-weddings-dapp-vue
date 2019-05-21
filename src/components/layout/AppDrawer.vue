<template>
  <v-navigation-drawer
    persistent
    v-model="drawerStatus"
    enable-resize-watcher
    fixed
    app
  >
    <v-list>
      <v-list-tile
        value="true"
        v-for="(item, i) in items"
        :to="item.to"
        :key="`item-${i}`"
      >
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-information',
          title: 'About',
          to: '/about'
        },
        {
          icon: 'mdi-wallet',
          title: 'Wallet',
          to: '/wallet'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setDrawer'])
  },
  computed: {
    ...mapGetters(['drawerOpen', 'coinbase']),
    drawerStatus: {
      get() {
        return this.drawerOpen
      },
      set(status) {
        this.setDrawer(status)
      }
    }
  }
}
</script>
