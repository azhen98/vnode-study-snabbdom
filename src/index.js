// import { init, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom'

// const patch = init([
// 	// Init patch function with chosen modules
// 	classModule, // makes it easy to toggle classes
// 	propsModule, // for setting properties on DOM elements
// 	styleModule, // handles styling on elements with support for animations
// 	eventListenersModule, // attaches event listeners
// ])

// const container = document.getElementById('container')
// const vnode = h('ul', [h('li', 'a'), h('li', 'a'), h('li', 'a'), h('li', 'a')])

// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode)

// const newVnode = h(
// 	'div#container.two.classes',
// 	{
// 		on: {
// 			click: () => {
// 				console.log(24234)
// 			},
// 		},
// 	},
// 	[
// 		h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
// 		' and this is still just normal text',
// 		h('a', { props: { href: '/bar' } }, "I'll take you places!"),
// 	]
// )
// // // Second `patch` invocation
// patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
// // import h from './core/h'
// // const vnode = h('div', '', [h('h', {}, [h('p', {}, 'sdfaf'), 'sdfdsf', { sel: 'div' }])])
// // console.log(vnode)

import h from './core/h'
import patch from './core/patch'
const container = document.getElementById('container')
const vnode = h('ul', [
  h('li', { key: 'A', }, 'A'),
  h('li', { key: 'B', }, 'B'),
  h('li', { key: 'C', }, 'C'),
  h('li', { key: 'D', }, 'D'),
])
const newVnode = h('ul', [
  h('li', { key: 'C', }, 'C'),
  h('li', { key: 'B', }, [h('div','etrst')]),
  h('li', { key: 'A', }, 'A'),
  h('li', { key: 'D', }, 'D'),
  h('li', { key: 'E', }, 'E'),
])
console.log(newVnode);
patch(container, vnode)
document.getElementById('btn').onclick = function () {
  patch(vnode, newVnode)
}