export default {

  // Применение функции ко всем элементам набора
  applyAll(payload, callback) {
    let nodeList;
    if (typeof payload === `string`) {
      nodeList = document.querySelectorAll(payload);
    } else {
      nodeList = payload;
    }

    for (let i = 0; i < nodeList.length; i++) {
      callback(nodeList[i], i, nodeList);
    }
  },

  hide(node) {
    node.classList.add(`hidden`);
  },

  unhide(node) {
    node.classList.remove(`hidden`);
  },

  disableElem(elem, cond) {
    if (cond) {
      elem.setAttribute(`disabled`, true);
    } else {
      elem.removeAttribute(`disabled`);
    }
  }
};
