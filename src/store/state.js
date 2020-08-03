// let defaultCountList = []
/*try {
  if (localStorage.countList) {
    defaultCountList = localStorage.countList
  }
} catch (e) {}*/

export default {
  initializedCountList:[],
  countList: [],
  currentIndex: 0,
  clickIndex: 0,
  goods: null,
  seller: null,
  ratings: null,
  showShopcartDetail: false,
  totalPrice: 0,
  elementClicked:[],
  foodClickedIndex:{}
}
