/**
 * E2E 测试
 */

describe('test app', () => {
  before(() => {
    cy.visit('http://localhost:4000/')
  })

  it('test home page visit', () => {
    cy.contains('button', 'Search')
  })

  it('test search hash is error', () => {
    // 更改搜索条件
    cy.get('.search>input').clear().type('aaa')
    cy.get('.search>button').click()
    // 是否返回失败
    cy.contains('.error', 'Item not found or argument invalid')
  })

  it('test search hash is ok', () => {
    // 使用有效hash, 检测是否返回成功
    cy.get('.search>input').clear().type('0000000000000000000c9129f5a064d82c01682fc84819257f10ea1eccdb2b25')
    cy.get('.search>button').click()
    cy.contains('.main>h3', '662462')
  })

  it('test change page number is ok', () => {
    // 点击第二页
    cy.get('.pagination>li:eq(3)').click()
    // 判断第二页的hash
    cy.contains('.transactions>.item:first>div:first span', 'acc6fcbbdb9385b55c9325da259f7969509a7b74e27573d0a195bf6f26732911')
  })
})
