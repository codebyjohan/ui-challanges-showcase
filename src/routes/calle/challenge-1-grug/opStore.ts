import { page } from "$app/stores"
import { derived, writable } from "svelte/store"
import { calc, toPostfix } from "./functions"
import type { ButtonType, ButtonsType, TypeType } from "./functions"
import Button from "./button.svelte"

export const btn = writable<string>("")
export const lastBtn = writable<string>("")
export const lastValue = writable<string>("")
export const currentValue = writable<string>("")
export const getBtn = derived([btn, page], ([$btn, $page]) => {
	const getBtn = () => {
		let b = $page.url.searchParams.get("btn") || ""
		return
	}
	return {
		btn: $btn,
		page: $page,
		getBtn,
	}
})

/* const BtnConfig = function () {
	let BTNS: ButtonsType = {
		_numbers: [
			{ val: ".", disabled: false, area: "dot" },
			{ val: "1", disabled: false, area: "b1" },
			{ val: "0", disabled: false, area: "b0" },
			{ val: "2", disabled: false, area: "b2" },
			{ val: "3", disabled: false, area: "b3" },
			{ val: "4", disabled: false, area: "b4" },
			{ val: "5", disabled: false, area: "b5" },
			{ val: "6", disabled: false, area: "b6" },
			{ val: "7", disabled: false, area: "b7" },
			{ val: "8", disabled: false, area: "b8" },
			{ val: "9", disabled: false, area: "b9" },
		],
		_actions: [
			{ text: "C", val: "clear", disabled: false, area: "clr" },
			{ text: "=", val: "sum", disabled: false, area: "eq" },
			{ text: "<", val: "del", disabled: false, area: "del" },
			{ text: "-/+", val: "neg", disabled: false, area: "neg" },
		],
		_operators: [
			{ text: "-", val: "s", disabled: false, area: "sub" },
			{ text: "+", val: "a", disabled: false, area: "add" },
			{ text: "*", val: "m", disabled: false, area: "mult" },
			{ text: "/", val: "d", disabled: false, area: "div" },
			{ text: "^", val: "p", disabled: false, area: "pow" },
			{ text: "(", val: "o", disabled: false, area: "ob" },
			{ text: ")", val: "c", disabled: false, area: "cb" },
		],
	}
	Object.defineProperties(BTNS, {
		all: {
			get: function () {
				return [].concat(this.numbers, this.actions, this.operators)
			},
		},
		numbers: {
			get: function () {
				return this._numbers.map((e: Button) => e.val)
			},
		},
		actions: {
			get: function () {
				return this._actions.map((e: Button) => e.val)
			},
		},
		operators: {
			get: function () {
				return this._operators.map((e: Button) => e.val)
			},
		},
		_all: {
			get: function () {
				return [].concat(this._numbers, this._actions, this._operators)
			},
		},
		types: {
			get: function () {
				let typeArr = []
				for (let t in this) {
					for (let i = 0; i < this[t].length; i++) {
						let b = this[t][i]
						typeArr.push({ val: b.val, type: t, index: i })
					}
				}
				return typeArr
			},
		},
	})
	const { subscribe, update, set } = writable(BTNS)
	const disable = (val: string) => {
		let btn = BTNS.types!.find((b) => b.val == val)
		if (!btn) return
		//@ts-ignore
		BTNS[btn.type][btn.index].disabled = true
		set(BTNS)
	}
	const enable = (val: string) => {
		let btn = BTNS.types!.find((b) => b.val == val)
		if (!btn) return
		//@ts-ignore
		BTNS[btn.type][btn.index].disabled = false
		set(BTNS)
	}
	const enableAll = () => {
		for (let t in BTNS) {
			for (let b in BTNS[t]!) {
				let btn = BTNS[t]![b]! as ButtonType
				btn.disabled = false
				BTNS[t]![b] = { ...btn }
			}
		}
	}
	return {
		subscribe,
		update,
		set,
		disable,
		enable,
		enableAll,
	}
} */
