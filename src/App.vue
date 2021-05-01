<template>
  <loading v-show="loading"/>
  <div class="search">
    <input type="text" ref="hashInput" v-model="hash" @keyup.enter="blockQuery" placeholder="Search your transaction, an address or a block">
    <button @click="blockQuery">Search</button>
  </div>
  <div class="error" v-if="errorMsg">{{errorMsg}}</div>
  <div class="main" v-else>
    <h3>BLOCK: {{blockData.height}}</h3>
    <detail :data="blockData" />
    <h3>Block Transactions</h3>
    <transactions-list :data="blockData.tx"/>
  </div>
</template>

<script>

import { onMounted, ref } from "vue";
import apolloClient from './apolloClient';
import { gql } from "@apollo/client/core";
import Detail from "./components/Detail.vue";
import TransactionsList from "./components/TransactionsList.vue";
import Loading from './components/Loading.vue';
export default {
  components: { Loading, Detail, TransactionsList },
  setup() {
    const hash = ref('0000000000000000000c9129f5a064d82c01682fc84819257f10ea1eccdb2b25')
    const hashInput = ref(null)
    // 加载状态
    const loading = ref(false)
    const errorMsg = ref('')
    const blockData = ref({})
    // 查询数据
    const blockQuery = async () => {
      if (!hash.value) {
        hashInput.value.focus()
        return
      }
      try {
        loading.value = true
        const { data } = await apolloClient.query({
          // 查询语句
          query: gql`
            query block($hash: String!){
              block(hash: $hash) {
                hash
                ver
                mrkl_root
                time
                bits
                fee
                nonce
                n_tx
                size
                height
                weight,
                tx {
                  hash
                  time
                  fee
                  size
                  inputs{
                    prev_out {
                      value
                      addr
                    }
                  }
                  out {
                    spent
                    value
                    addr
                  }
                }
              }
            }
          `,
          variables: {
            hash: hash.value
          }
        })
        errorMsg.value = ''
        blockData.value = data && data.block || {}
        loading.value = false
      } catch (e) {
        errorMsg.value = e.message
        loading.value = false
      }
    }
    onMounted(() => {
      blockQuery()
    })
    return {
      loading,
      hashInput,
      hash,
      blockData,
      errorMsg,
      blockQuery
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: rgb(18, 29, 51);
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  input {
    padding: 10px 14px;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #eee;
    width: 60%;
    outline: none;
    &:focus {
      background-color: #fff;
    }
  }
  button {
    background-color: rgba(12, 108, 242, 0.8);
    color: #fff;
    padding: 10px 14px;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    &:hover {
      background-color: rgba(12, 108, 242, 1);
    }
  }
}
.main {
  padding: 20px;
  width: 75%;
  margin: auto;
}
.error {
  background: #ff5050;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 20px;
}
</style>
