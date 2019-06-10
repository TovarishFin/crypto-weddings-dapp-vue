<template>
  <div class="padded-element">
    <p class="display-2">Basic Info</p>
    <p class="display-1">What is this site?</p>
    <p>
      Filler text
    </p>

    <p class="display-1">Why does it exist?</p>
    <p>
      Filler text
    </p>

    <p class="display-1">Are there any future plans?</p>
    <p>
      Filler text
    </p>

    <v-divider class="mt-4 mb-4" />

    <p class="display-2">Specific Guides</p>
    <v-expansion-panel v-model="panel" popout>
      <v-expansion-panel-content>
        <div slot="header">Getting Started</div>
        <v-card>
          <v-card-text>
            Filler text
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">How Does the Game Work?</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Creating an Account</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Creating a Wedding</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Accepting a Wedding</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Other Neat Things</div>
        <v-card>
          <v-card-text> testing and stuff that can go in there... </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
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
