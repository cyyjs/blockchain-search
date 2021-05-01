<template>
  <ul class="pagination">
    <li @click="$emit('changePageNo', 1)">First</li>
    <li @click="prev">&lt;</li>
    <li v-for="num in pageNumList" :key="num" @click="$emit('changePageNo', num)" :class="{active: pageNo === num}">{{num}}</li>
    <li @click="next">&gt;</li>
    <li @click="$emit('changePageNo', pageCount)">Last</li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    total: { // 总记录数
      type: Number,
      default: 0
    },
    pageNo: { // 当前页码
      type: Number,
      default: 0
    },
    pageSize: { // 每页展示条数
      type: Number,
      default: 5
    },
  },
  setup(props, ctx) {
    const halfPageNumCount = Math.ceil(props.pageSize / 2)
    // 总页数
    const pageCount = computed(() => {
      if (!props.total) return 0
      return Math.ceil(props.total / props.pageSize)
    })
    // 计算页码列表
    const pageNumList = computed(() => {
      const pageNumCount = pageCount.value <= props.pageSize ? pageCount.value : 5
      if (pageCount.value <= props.pageSize || props.pageNo <= halfPageNumCount) {
        return new Array(pageNumCount).fill(1).map((item, index) => index + 1)
      }
      if (props.pageNo + halfPageNumCount >= pageCount.value) {
        return new Array(pageNumCount).fill(pageCount.value - props.pageSize + 1).map((item, index) => item + index)
      }
      return new Array(pageNumCount).fill(props.pageNo - halfPageNumCount + 1).map((item, index) => item + index)
    })
    // 上一页
    const prev = () => {
      if (props.pageNo > 1) {
        ctx.emit('changePageNo', props.pageNo - 1)
      }
    }
    // 下一页
    const next = () => {
      if (props.pageNo < pageCount.value) {
        ctx.emit('changePageNo', props.pageNo + 1)
      }
    }
    return {
      pageCount,
      pageNumList,
      prev,
      next
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 10px 0;
  padding: 0;
  &>li {
    display: inline-block;
    margin: 5px;
    padding: 0 3px;
    text-align: center;
    border-radius: 15px;
    border: 1px solid #ccc;
    cursor: pointer;
    min-width: 18px;
    font-size: 14px;
    &:hover {
      background-color: #eee;
    }
  }
  .active {
    background-color: rgb(75, 98, 175);
    color: #fff;
    border: none;
  }
}
</style>