<template>
  <span>
    <div class="landing-screen">
      <vue-particles
        v-if="showParticles"
        class="full-height"
        color="#ee44aa"
        lines-color="#82B1FF"
      />
      <div v-if="!showParticles" class="full-height" />
      <div class="landing-text">
        <p class="display-3 primary-neon">Crypto Weddings</p>
        <p class="headline accent-neon">
          Get Married on the Blockchain
        </p>
        <v-container>
          <v-layout align-items-center>
            <v-flex xs-6>
              <neon-primary-button to="/get-married">
                get married
              </neon-primary-button>
            </v-flex>

            <v-flex xs-6>
              <neon-accent-button v-scroll-to="'#weddings'" color="accent">
                view weddings
              </neon-accent-button>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <v-icon color="primary" size="100" class="landing-down-arrow">
        mdi-chevron-down
      </v-icon>
    </div>

    <v-sheet
      color="synthwaveLight"
      id="weddings"
      class="full-height wedding-container"
    >
      <weddings />
    </v-sheet>
  </span>
</template>
<script>
import Weddings from '@/components/Weddings'
import NeonPrimaryButton from '@/components/common/NeonPrimaryButton'
import NeonAccentButton from '@/components/common/NeonAccentButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    Weddings,
    NeonPrimaryButton,
    NeonAccentButton
  },
  computed: {
    ...mapGetters(['showParticles'])
  }
}
</script>
<style lang="styl" scoped>
@import '~vuetify/src/stylus/settings/_variables'
.full-height
  height: "calc(100vh - %s)" % ($toolbar-height)

.landing-screen
  position: relative
  background-image: url("/img/logo-background.svg")
  background-repeat:no-repeat
  background-position: center
  background-size: 100% auto

  .landing-text
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center

  .landing-down-arrow
    position: absolute
    bottom: 10%
    left: 50%
    transform: translate(-50%, 0%)
    animation: arrow-down 3s linear infinite

.wedding-container
  padding: $spacer

@keyframes arrow-down
  to
    opacity: 0
    transform: translate(-50%, 100%)
</style>
