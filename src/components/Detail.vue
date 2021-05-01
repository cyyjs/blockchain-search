<template>
  <div class="detail">
    <div v-for="(v, key) in info" :key="key">
      <label>{{key}}</label>
      <span :title="v">{{v}}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import dayjs from 'dayjs'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 千分位格式化
    const formatNum = (num = 0) => {
      return num.toLocaleString()
    }
    const info = computed(() => {
      const block = props.data
      return {
        Hash: block.hash,
        Timestamp: dayjs.unix(block.time).format('YYYY-MM-DD HH:mm'),
        Height: block.height,
        Height: block.height,
        'Number of Transactions': block.n_tx,
        'Merkle root': block.mrkl_root,
        Bits: formatNum(block.bits),
        Weight: formatNum(block.weight),
        Size: formatNum(block.size),
        Nonce: formatNum(block.nonce),
        'Fee Reward': block.fee
      }
    })
    return {
      info
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  &>div {
    border-bottom: 1px solid #eee;
    line-height: 40px;
    display: flex;
    &>label {
      display: inline-block;
      width: 40%;
      flex-shrink: 0;
      color: #999;
    }
    &>span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>