<template>
  <div class="item">
    <div>
      <div>
        <label>Hash</label> <span :title="data.hash">{{data.hash}}</span>
      </div>
      <div>{{formatTime}}</div>
    </div>
    <div>
      <div>
        <label></label>
        <div v-for="input in data.inputs" :key="input.addr" class="input-item">
          <div v-if="!input.prev_out" style="color:rgb(0, 135, 90);">COINBASE (Newly Generated Coins)</div>
          <template v-else>
            <div>{{input.addr}}</div>
            <div>{{input.value}}</div>
          </template>
        </div>
      </div>
      <div class="out-right">
        <i class="arrow">
          <svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px"><g id="background"><rect fill="none" height="32" width="32"></rect></g><g id="arrow_x5F_full_x5F_right"><polygon points="16,2.001 16,10 2,10 2,22 16,22 16,30 30,16  "></polygon></g></svg>
        </i>
        <div>
          <div class="out-item" v-for="(out, index) in data.out" :key="index">
            <div>{{out.addr || 'OP_RETURN'}}</div>
            <div>{{out.value}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
          <label>Fee</label> <span>{{data.fee}}</span> <span style="margin-left:20px;">({{data.size}}bytes)</span>
      </div>
      <div><span class="tag">{{amount}}</span></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import dayjs from 'dayjs';
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const transaction = props.data
    const formatTime = computed(() => dayjs.unix(transaction.time).format('YYYY-MM-DD HH:mm'))
    const amount = computed(() => {
      return transaction.out.reduce((a, b) => {
        const value = (a.value || 0) + (b.value || 0)
        return { value }
      }, { value: 0}).value
    })
    return {
      formatTime,
      amount
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 5px 10px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  line-height: 30px;
  &:hover {
    background-color: rgb(240, 242, 247);
  }
  &>div {
    display: flex;
    &>div {
      width: 50%;
      &:first-child {
        display: flex;
        &>label {
          display: inline-block;
          width: 100px;
          flex-shrink: 0;
          color: #666;
        }
        &>span {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
.tag {
  padding: 0 0.25rem;
  color: rgb(0, 135, 90);
  background: rgb(209, 240, 219);
  border: 1px solid rgb(209, 240, 219);
  border-radius: 0.25rem;
  cursor: pointer;
}
.input-item {
  display: flex;
}
.out-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .arrow {
    width: 24px;
    height: 24px;
    fill: rgb(51, 159, 123);
    width: 80px;
    flex-shrink: 0;
    text-align: center;
  }
  &>div{
    width: 100%;
  }
  .out-item {
    display: flex;
    justify-content: space-between;
    &>div{
      &:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
@media (max-width: 375px) {
  .item>div {
    display: block;
    &>div {
      width: 100%;
    }
  }
  .arrow {
    display: none;
  }
}
</style>