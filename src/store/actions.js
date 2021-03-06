import axios from "axios"
export default {
  fetchData({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      axios({
          method: 'GET',
          baseURL: 'http://127.0.0.1:9002/api/data.json',
        })
        .then(res => {
          if (res) {
            commit('setData',res.data)
            commit('initCountList')
            resolve(res.data)
          } else {
            reject('no data')
          }
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  handleEvent(context, action) {
    if (context.getters.foodsSelected.length)
      context.commit('setShowShopcartDetail', action)
  },
  getTotalPrice(context) {
    context.state.totalPrice = 0
    let len = context.getters.foodsSelected.length
    if (len) {
      for (let k = 0; k < len; k++) {
        let item = context.getters.foodsSelected[k]
        let i = item.i
        let j = item.j
        let count = item.count
        let unit_price = context.state.goods[i].foods[j].price
        context.state.totalPrice += unit_price * count
      }
    }
  }
}
