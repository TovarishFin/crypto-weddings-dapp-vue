<template>
  <span>
    <v-data-table :headers="headers" :items="weddingList" class="elevation-1">
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
          <v-btn @click="goToWedding(props.item.address)">
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
