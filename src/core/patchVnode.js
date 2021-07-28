import is from '../utils/is'
import createElement from './createElement'
export default function patchVnode(oldVnode, newVnode) {
	// 判断节点的文本内容 h 函数限制了 text文本存在就不会出现 children 对象
	if (newVnode.text && (!newVnode.children || newVnode.children.length == 0)) {
		console.log('存在文本内容')
		// 存在文本内容 清空子节点导入文本内容
		if (newVnode.text != oldVnode.text) {
			oldVnode.elm.innerText = newVnode.text
		}
	}

	// 存在children
	if (newVnode.children && newVnode.children.length > 0) {
		let suIndex = 0 //这个变量是为了 让dom按照匹配顺序插入dom树
		newVnode.children.forEach((newItem, newIndex) => {
			let isExist
			oldVnode.children.forEach((oldItem, oldIndex) => {
				if (is.sameNode(oldItem, newItem)) {
					isExist = true
				}
			})

			if (isExist) {
				// 是通过一个节点
				suIndex++
			} else {
				// 不是同一个节点 就要生成新的dom插入树
				const element = createElement(newItem)
				const oldVlength = oldVnode.children.length - 1
				if (suIndex >= oldVlength) {
					oldVnode.elm.appendChild(element)
				} else {
					oldVnode.elm.insertBefore(element, oldVnode.children[suIndex].elm)
				}
			}
		})
	}
}
