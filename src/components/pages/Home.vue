<template>
  <span>
    <div class="landing-screen">
      <vue-particles
        class="full-height"
        color="#ee44aa"
        lines-color="#82B1FF"
      />
      <div class="landing-text">
        <p class="display-3 primary--text">Crypto Weddings</p>
        <p class="headline accent--text">
          Get Married on the Blockchain
        </p>
        <v-container>
          <v-layout align-items-center>
            <v-flex xs-6>
              <v-btn to="/get-married" color="primary">
                get married
              </v-btn>
            </v-flex>

            <v-flex xs-6>
              <v-btn v-scroll-to="'#weddings'" color="accent">
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

    <v-sheet class="full-height wedding-container">
      <weddings id="weddings" />
    </v-sheet>
  </span>
</template>
<script>
import Weddings from '@/components/Weddings'

export default {
  components: {
    Weddings
  }
}
</script>
<style lang="styl" scoped>
@import '~vuetify/src/stylus/settings/_variables'
.full-height
  height: "calc(100vh - %s)" % ($toolbar-height + $footer-height)

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
