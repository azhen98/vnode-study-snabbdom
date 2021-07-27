import vnode from './vnode.js'
import is from '../utils/is'
/**
 * @description:
 * @param {*} sel 需要生成的dom
 * @param {*} b dom的属性
 * @param {*} c 子级节点
 * @return {*}
 */
export default function (sel, b, c) {
	let children
	let text
	let data
	// 判断是c是否为空值 如果为c存在 b肯定就存在
	if (c !== undefined) {
		// 如果b是真值 直接赋值给data
		if (b !== null) {
			data = b
		}
		if (is.array(c)) {
			children = c
		} else if (is.primitive(c)) {
			text = c
		} else if (c && c.sel) {
			children = [c]
		}
		// c没有传进来 b有可能是children 也有可能是data
	} else if (b !== undefined && b !== null) {
		
		if (is.array(b)) { // 数组类型 为children
			children = b
		} else if (is.primitive(b)) { //普通类型数据
			text = b
		} else if (b && b.sel) { 	// 如果 b为一个 对象并且 sel存在 直接当做children 证明他和vnode函数返回的数据一样
			children = [b]
		} else {  //以上都不满足的情况下 可以判定为 data属性
			console.log('b==>', b)
			data = b
		}
		// 静态文本类型 为children
	}
	// 最后开始判断是否传入了 children属性
	if (children !== undefined) {
		children.forEach((item, index) => {
			if (is.primitive(item)) {
				children[index] = vnode(undefined, undefined, undefined, item, undefined)
			}
		})
	}
	return vnode(sel, data, children, text, undefined)
}
