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
  }
};
