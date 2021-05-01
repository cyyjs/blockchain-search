<template>
  <div class="transactions">
    <div v-if="!data.length"> no data</div>
    <transactions-item v-for="item in pageData" :key="item.hash" :data="item"/>
    <pagination :total="total" :pageNo="pageNo" :pageSize="pageSize" @changePageNo="(i) => pageNo = i"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import TransactionsItem from './TransactionsItem.vue';
import Pagination from './Pagination.vue';
export default {
  components: { TransactionsItem, Pagination },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    // 每页默认展示5条
    const pageSize = 5
    const pageNo = ref(1)
    // 总记录数
    const total = computed(() => props.data.length)
    // 获取当前分页数据
    const pageData = computed(() => {
      const start = (pageNo.value - 1) * 5
      return props.data.slice(start, start + pageSize)
    })
    return {
      total,
      pageNo,
      pageSize,
      pageData
    }
  }
}
</script>
