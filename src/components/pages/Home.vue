<template>
  <span>
    <div class="landing-screen">
      <vue-particles
        v-if="showParticles"
        class="full-height"
        color="#ee44aa"
        lines-color="#82B1FF"
      />
      <div v-if="!showParticles" class="full-height grid-background">
        <div class="grid-sky" />
        <div class="grid-surface" />
      </div>
      <div class="landing-text">
        <p class="display-3 primary-neon">Crypto Weddings</p>
        <p class="headline accent-neon">
          Get Married on the Blockchain
        </p>
        <v-container>
          <v-layout align-items-center>
            <v-flex xs-6>
              <v-btn class="primary-neon-button" flat to="/get-married">
                get married
              </v-btn>
            </v-flex>

            <v-flex xs-6>
              <v-btn
                class="accent-neon-button"
                flat
                v-scroll-to="'#weddings'"
                color="accent"
              >
                view weddings
              </v-btn>
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Weddings
  },
  computed: {
    ...mapGetters(['showParticles'])
  }
}
</script>
<style lang="styl" scoped>
@import '~vuetify/src/stylus/settings/_variables'

grid-purple=#7B1FA2

.full-height
  height: "calc(100vh - %s)" % ($toolbar-height)

.grid-background
  position: relative
  overflow: hidden

.grid-sky
  height: 100%
  width: 100%
  position: absolute
  left: 0
  top: 0
  box-shadow:
    0 0 100px 100px grid-purple,
    inset 0 0 50px 50px grid-purple
  background-position: center center
  background-image:
    linear-gradient(
      transparent 0px,
      transparentify(lighten(grid-purple, 15%), .5) 14px,
      transparent 14px 15px,
      lighten(grid-purple, 40%) 15px 20px,
      transparent 20px 21px,
      transparentify(lighten(grid-purple, 15%), .5) 21px,
      transparent 35px
    ),
    linear-gradient(
      90deg,
      transparent 0px,
      transparentify(lighten(grid-purple, 15%), .5) 14px,
      transparent 14px 15px,
      lighten(grid-purple, 40%) 15px 20px,
      transparent 20px 21px,
      transparentify(lighten(grid-purple, 15%), .5) 21px,
      transparent 35px
    )
  background-size: 100px 100px
  background-repeat: repeat
  transform:
    perspective(600px) rotateX(90deg) translateZ(300px)

.grid-surface
  height: 100%
  width: 100%
  position: absolute
  left: 0
  top: 0
  box-shadow:
    0 0 100px 100px grid-purple,
    inset 0 0 50px 50px grid-purple
  background-position: center center
  background-image:
    linear-gradient(
      transparent 0px,
      transparentify(lighten(grid-purple, 15%), .5) 14px,
      transparent 14px 15px,
      lighten(grid-purple, 40%) 15px 20px,
      transparent 20px 21px,
      transparentify(lighten(grid-purple, 15%), .5) 21px,
      transparent 35px
    ),
    linear-gradient(
      90deg,
      transparent 0px,
      transparentify(lighten(grid-purple, 15%), .5) 14px,
      transparent 14px 15px,
      lighten(grid-purple, 40%) 15px 20px,
      transparent 20px 21px,
      transparentify(lighten(grid-purple, 15%), .5) 21px,
      transparent 35px
    )
  background-size: 100px 100px
  background-repeat: repeat
  transform:
    perspective(600px) rotateX(90deg) translateZ(-300px)

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
