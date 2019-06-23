<template>
  <div class="padded-element">
    <v-tabs grow v-model="tabsIndex">
      <v-tab ripple>Network</v-tab>
      <v-tab ripple>Display</v-tab>
      <v-tab ripple>Wedding</v-tab>
      <v-tab-item> <network-settings /> </v-tab-item>
      <v-tab-item> <display-settings /> </v-tab-item>
      <v-tab-item> <wedding-settings /> </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import NetworkSettings from '@/components/settings/NetworkSettings'
import DisplaySettings from '@/components/settings/DisplaySettings'
import WeddingSettings from '@/components/settings/WeddingSettings'

export default {
  components: {
    NetworkSettings,
    DisplaySettings,
    WeddingSettings
  },
  computed: {
    ...mapGetters(['settingsTabs']),
    tabsIndex: {
      get() {
        return this.settingsTabs
      },
      set(index) {
        return this.setSettingsTabs(index)
      }
    }
  },
  methods: {
    ...mapMutations(['setSettingsTabs'])
  }
}
</script>
