export default {
	primitive(b) {
		return typeof b === 'string' || typeof b === 'number'
	},
	array(b) {
		return Array.isArray(b)
	},
	isVnode(b) {
		return b.sel === '' || b.sel === undefined
	},
	sameNode(node, node2) {
		return node.sel === node2.sel && node.key === node2.key
	},
}
