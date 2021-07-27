import vnode from './vnode'
import is from '../utils/is'
import createElement from './createElement'
import h from './h'
export default function (oldVnode, newVnode) {
	// 判断oldVnode 是否为虚拟dom
	if (is.isVnode(oldVnode)) {
		oldVnode = vnode(oldVnode.tagName, {}, undefined, [], oldVnode)
	}
	// 判断是否为同一个节点
	if (is.sameNode(oldVnode, newVnode)) {
		console.log(oldVnode, newVnode)
		// 同一个节点 进行精细化比较
		if (oldVnode === newVnode) {
			console.log('这是同一个节点')
			return
		}
		// 判断节点的文本内容 h 函数限制了 text文本存在就不会出现 children 对象
		if (newVnode.text && (!newVnode.children || newVnode.children.length == 0)) {
			console.log('存在文本内容')
			// 存在文本内容 清空子节点导入文本内容
			if (newVnode.text != oldVnode.text) {
				oldVnode.elm.innerText = newVnode.text
			}
		}
	} else {
		// 不是同一个节点 直接包暴力删除 插入新的元素
		const vNode = createElement(newVnode)
		oldVnode.elm.parentNode.insertBefore(vNode, oldVnode.elm)
		oldVnode.elm.parentNode.removeChild(oldVnode.elm)
	}
}
