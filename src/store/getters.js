
export default {
  foodsSelected (state) {
    let list = state.countList
    let res = []
    for(let i = 0; i<list.length; i++){
      for(let j = 0;j<list[i].length;j++){
        if(list[i][j]){
          res.push({
            i: i,
            j: j,
            count: list[i][j]
          })
        }
      }
    }
    return res
  }
}
