const { gql } = require('apollo-server-express');
module.exports = gql`
interface BaseBlock {
  hash: String
  ver: Float
  size: Float
  time: Float
  weight: Float
  fee: Float
  block_index: Float
}
type PrevOut {
  value: Float
  addr: String
}
type Inputs {
  prev_out: PrevOut 
}

type Out {
  spent: Boolean
  value: Float
  addr: String
}

type Transaction implements BaseBlock {
  hash: String
  ver: Float
  vin_sz: Float
  size: Float
  weight: Float
  fee: Float
  relayed_by: String
  lock_time: Float
  tx_index: Float
  double_spend: Boolean
  time: Float
  block_index: Float
  block_height: Float
  inputs: [Inputs]
  out: [Out]
}

type RawBlock implements BaseBlock {
  hash: String
  ver: Float
  prev_block: String
  mrkl_root: String
  time: Float
  bits: Float
  next_block: [String]
  fee: Float
  nonce: Float
  n_tx: Float
  size: Float
  block_index: Float
  main_chain: Boolean
  height: Float
  weight: Float
  tx: [Transaction]
}

type Query {
  block(hash: String): RawBlock
}
`