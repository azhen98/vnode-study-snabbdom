import is from '../utils/is'
import patchVnode from './patchVnode';
import createElement from './createElement';
export default function updateChildren(parentElm, oldCh = [], newCh = []) {
  oldCh ? oldCh : []
  oldCh ? oldCh : []
  console.log('开始匹配子节点 diff');
  let newStartIndex = 0 // 新前(下标)
  let oldStartIndex = 0 // 旧前
  let newEndIndex = newCh.length - 1 // 新后
  let oldEndIndex = oldCh.length - 1 //旧后
  const indexMap = new Map() // 储存数组下标的map对象
  // 判断条件
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    // 开始判断 新前对旧前
    let newStartDom = newCh[newStartIndex]
    let oldStartDom = oldCh[oldStartIndex]
    let newEndDom = newCh[newEndIndex]
    let oldEndDom = oldCh[oldEndIndex]
    console.log(newStartDom, oldStartDom, newEndDom, oldEndDom);
    // 如果不存在证明 有可能是已经被匹配过
    if (!newStartDom) {
      console.log(2342);
      newStartIndex++
    } else if (!oldStartDom) {
      oldStartIndex++
    } else if (!newEndDom) {
      newEndIndex--
    } else if (!oldEndDom) {
      oldEndIndex--
    } else if (is.sameNode(newStartDom, oldStartDom)) {
      console.log('命中新前+旧前', newStartDom, oldStartDom);
      patchVnode(oldStartDom, newStartDom)
      newStartIndex++
      oldStartIndex++
    } else if (is.sameNode(newEndDom, oldEndDom)) {
      console.log('命中新后+旧后');
      patchVnode(oldEndDom, newEndDom)
      newEndIndex--
      oldEndIndex--
    } else if (is.sameNode(newEndDom, oldStartDom)) {
      console.log('命中新后+旧前');
      // 此处旧后由下标来决定 下标是动态的 如果命中就会改变 刚开始理解有点绕
      // 将新前移动到当前旧后的后面
      patchVnode(oldStartDom, newEndDom)
      parentElm.insertBefore(oldStartDom.elm, oldEndDom.elm.nextSibling)
      newEndIndex--
      oldStartIndex++
    } else if (is.sameNode(newStartDom, oldEndDom)) {
      console.log('命中新前+旧后');
      // 移动到旧前的前面
      patchVnode(oldEndDom, newStartDom)
      parentElm.insertBefore(oldEndDom.elm, oldStartDom.elm)
      oldEndIndex--
      newStartIndex++
    } else {
      console.log('没有命中');
      // 如果以上算法没有命中 将数组的key和下标形成对应关系 放进map集合
      if (!indexMap.size) {
        for (let index = 0; index < oldCh.length; index++) {
          indexMap.set(oldCh[index].key, index)
        }
      }
      // 循环匹配新节点
      for (let index = newStartIndex; index < newCh.length; index++) {
        //尝试获取和新前key相同的旧节点
        const targetIndex = indexMap.get(newCh[index].key)
        // 不等于null 因为0也是false
        if (targetIndex != null) {
          // 找到之后直接 patch
          patchVnode(oldCh[targetIndex], newCh[index])
          parentElm.insertBefore(oldCh[targetIndex].elm, oldStartDom.elm)
          oldCh[targetIndex] = undefined
          // 找到匹配节点之后才能 移动下标
          newStartIndex++
          console.log(newStartIndex, targetIndex, newCh[index]);
        } else {

          // 没有找到就要生成新的dom节点并且 插入到index对应的位置
          parentElm.insertBefore(createElement(newCh[index]), oldStartDom.elm)
        }
      }

    }

  }
  // 可能会有的情况是 比如 newCh有子节点 但是oldCh没有子节点 新前仍然小于新后 证明含有节点没有插入 (条件等于的原因是因为 命中之后 会加加下标,或者 从一开始 所有下标都没有改变 ,自然就会等于)
  if (newStartIndex <= newEndIndex) {
    console.log('新前小于新后===>', newCh, oldCh);
    const mark = !oldCh[oldStartIndex] ? null : oldCh[oldStartIndex].elm
    for (let index = newStartIndex; index <= newEndIndex; index++) {
      // 如果标杆节点为空 就会把新节点当做最后一个节点插入
      console.log('mark===>', createElement(newCh[index]));
      parentElm.insertBefore(createElement(newCh[index]), mark);
    }
  } else if (oldStartIndex <= oldEndIndex) {
    console.log('旧前小于旧后');
    // 如果旧前小于旧后 证明有节点需要删除
    for (let index = oldStartIndex; index <= oldEndIndex; index++) {
      if (oldCh[index]) {
        parentElm.removeChild(oldCh[index].elm)
      }
    }
  }

}