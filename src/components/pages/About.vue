<template>
  <span>
    <p class="display-2">Basic Info</p>
    <p class="display-1">What is this site?</p>
    <p>
      I created this as an idea because I wanted to create a commit/reveal smart
      contract. I had also been interested in implementing payments through
      tokens on top of ether. This site is the result of those two lingering
      ideas that were in my head.
    </p>

    <p class="display-1">Why does it exist?</p>
    <p>
      I couldn't find any other dApps which allow making wagers in any ERC20
      token. So I thought this might be a unique feature that thsi can offer.
    </p>

    <p class="display-1">Are there any future plans?</p>
    <p>
      I will probably be making a release that uses state channels which will
      allow instant plays and rematches. Who knows when this will be out
      though...
    </p>

    <v-divider class="mt-4 mb-4" />

    <p class="display-2">Specific Guides</p>
    <v-expansion-panel v-model="panel" popout>
      <v-expansion-panel-content>
        <div slot="header">Getting Started</div>
        <v-card>
          <v-card-text
            >In order join or create a game, you are going to need to have some
            tokens. It can be any kind of ERC20 token. You then need to deposit
            some tokens in the game's bank. This can be done here</v-card-text
          >
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">How Does the Game Work?</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Creating A Game</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Joining A Game</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Playing A Game</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </span>
</template>

<script>
export default {
  data() {
    return {
      panel: null
    }
  }
}
</script>
