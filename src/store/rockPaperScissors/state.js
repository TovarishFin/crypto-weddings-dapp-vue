import { addressZero } from '@/utils/data'

export default {
  rockPaperScissors: null,
  rockPaperScissorsWs: null,
  paused: false,
  minBet: 0,
  timeoutInSeconds: 0,
  referralFeePerMille: 0,
  feePerMille: 0,
  games: null,
  openGameIds: [],
  selectedGameId: 0,
  choiceCommits: {},
  coinbaseActiveGameIds: [],
  coinbaseReferrer: addressZero
}
