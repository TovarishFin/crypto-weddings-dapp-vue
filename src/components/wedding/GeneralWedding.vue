<template>
  <span>
    <p class="display-4">
      Happily Married on:
    </p>
    <p class="display-1">{{ selectedWedding.dateMarried }}</p>
    <v-img :src="selectedWedding.weddingPhoto" contain max-height="300">
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate />
        </v-layout>
      </template>
    </v-img>

    <v-list two-line subheader>
      <v-subheader>{{ selectedWedding.p1Name }}</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p1Answer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p1Vows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list two-line subheader>
      <v-subheader>{{ selectedWedding.p2Name }}</v-subheader>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Has Accepted?</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p2Answer }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Vows</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ selectedWedding.p2Vows }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['selectedWedding'])
  }
}
</script>
