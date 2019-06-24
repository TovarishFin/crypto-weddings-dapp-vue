<template>
  <span>
    <h2 class="title mb-2" ma-2>
      Most Recent Weddings
    </h2>
    <v-list v-if="$vuetify.breakpoint.xs" two-line ripple>
      <template v-for="wedding in weddingList">
        <v-list-tile :key="`${wedding.partner1} + ${wedding.partner2}`">
          <v-list-tile-content>
            <v-list-tile-title>
              status: {{ stageText[wedding.stage] }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              partner 1: {{ wedding.p1Name }}
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              partner 2: {{ wedding.p2Name }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              flat
              color="primary"
              @click="goToWedding(wedding.address)"
            >
              <v-icon>
                mdi-play
              </v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>

    <v-data-table
      v-if="$vuetify.breakpoint.smAndUp"
      :headers="headers"
      :items="weddingList"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.p1Name }}</span>
            </template>
            <span>
              {{ shortenAddress(props.item.partner1) }}
            </span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.item.p2Name }}</span>
            </template>
            <span>
              {{ shortenAddress(props.item.partner2) }}
            </span>
          </v-tooltip>
        </td>
        <td>{{ stageText[props.item.stage] }}</td>
        <td>
          <v-btn color="primary" @click="goToWedding(props.item.address)">
            go to wedding
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Parter 1',
          value: 'p1Name'
        },
        {
          text: 'Parter 2',
          value: 'p2Name'
        },
        {
          text: 'Stage',
          value: 'stage'
        },
        {
          text: '',
          value: 'address'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['weddingList'])
  },
  methods: {
    goToWedding(address) {
      this.$router.push({ name: 'Wedding', params: { address } })
    }
  }
}
</script>
