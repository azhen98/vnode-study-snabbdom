export default function createElement(vnode) {
	const node = document.createElement(vnode.sel, vnode.data)
	// 判断是否含有子节点 只有一个文本节点的情况
	if (vnode.text && (vnode.children == undefined || vnode.children.length == 0)) {
		node.innerText = vnode.text
	} else if (vnode.children && vnode.children.length > 0) {
		vnode.children.forEach((element) => {
			if (element.sel) {
        console.log('含有字节点==>',element.sel);
				const subNode = createElement(element)
				node.appendChild(subNode)
			} else {
				node.appendChild(document.createTextNode(element.text))
			}
		})
	}
	// 把真实的dom节点对象挂载到这个虚拟dom上
	vnode.elm = node
	return node
}
