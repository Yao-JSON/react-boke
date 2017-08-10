module.exports = {
  getOffsetLeft(node){
    if(!node){return}
    let left = node.offsetLeft;
    while (true){
      node = node.offsetParent;
      if(!node){
        break;
      }
      left += node.offsetLeft;
    }
    return left;
  },
  getOffsetTop(node){
    if(!node){return}
    let Top = node.offsetTop;
    while (true){
      node = node.offsetParent;
      if(!node){
        break;
      }
      Top += node.offsetTop;
    }
    return Top;
  },
  $(sel){
    if(!sel){return}
    return document.querySelectorAll(sel);
  },
  /*
	 * 获取区间内的一个随机值
	 */
  getRangeRandom(low,high){
    return Math.ceil(Math.random() * (high - low) + low);
  },
  /*
	 * 获取 0~30° 之间的一个任意正负值
	 */
  get30DegRandom() {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
  },
  randomColor(){
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return `rgb(${r},${g},${b})`;
  },
  randomFontSize(){
    return Math.random() * 2 + 0.6+'rem';
  }
};
