import is from '../utils/is'
import createElement from './createElement'
import updateChildren from './updateChildren'
export default function patchVnode(oldVnode, newVnode) {
  if (newVnode.key === 'B') {
    {
      console.log('newVnode', newVnode, oldVnode);
    }
  }
  // 判断节点的文本内容 h 函数限制了 text文本存在就不会出现 children 对象
  if (newVnode.text && (!newVnode.children || newVnode.children.length == 0)) {

    // debugger
    // 存在文本内容 清空子节点导入文本内容
    if (newVnode.text != oldVnode.text) {

      console.log('文本内容不同');
      oldVnode.elm.innerText = newVnode.text
    }
  }

  // 存在children

  if (newVnode.children && newVnode.children.length > 0) {
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
  } else if (!newVnode.children && !newVnode.text) {
    // 如果不存在children并且不存在文本内容 直接将旧节点的子节点置空
    oldVnode.elm.innerText = ''
  }
}