import vnode from './vnode'
import is from '../utils/is'
import createElement from './createElement'
import PatchVnode from './patchVnode'
import h from './h'
export default function (oldVnode, newVnode) {
	// 判断oldVnode 是否为虚拟dom
	if (is.isVnode(oldVnode)) {
		oldVnode = vnode(oldVnode.tagName, {}, undefined, [], oldVnode)
	}
	// 判断是否为同一个节点
	if (is.sameNode(oldVnode, newVnode)) {
		// 同一个节点 进行精细化比较
		if (oldVnode === newVnode) {
			console.log('这是同一个节点')
			return
		}
		PatchVnode(oldVnode, newVnode)
	} else {
    // 不是同一个节点 直接包暴力删除 插入新的元素
		const vNode = createElement(newVnode)
    console.log('vNode',vNode);
		oldVnode.elm.parentNode.insertBefore(vNode, oldVnode.elm)
		oldVnode.elm.parentNode.removeChild(oldVnode.elm)
	}
}
