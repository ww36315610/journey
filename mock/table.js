const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    isEdit:false,
    name:'@cname',
    address:'@county(prefix)',
    date: '@date'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
