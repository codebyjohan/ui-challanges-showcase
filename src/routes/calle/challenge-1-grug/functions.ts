import Button from "../challenge-1/button.svelte"
import { btn, lastBtn, lastValue, currentValue } from "./opStore"
export type ButtonType = {
	text?: string
	val: string
	disabled: boolean
	area: string
}
export type TypeType = {
	val: string
	type: string
	index: number
}
export interface ButtonsType {
	[key: string]: ButtonType[] | string[] | TypeType[] | undefined
	_numbers: ButtonType[]
	_actions: ButtonType[]
	_operators: ButtonType[]
	_specialls: ButtonType[]
	all: string[]
	valid: string[]
	numbers: string[]
	actions: string[]
	operators: string[]
	specialls: string[]
	_all: ButtonType[]
	types: TypeType[]
}
const BUTTONS: ButtonsType = {
	_numbers: [
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
	],
	_specialls: [
		{ text: "(", val: "o", disabled: false, area: "ob" },
		{ text: ")", val: "c", disabled: false, area: "cb" },
		{ val: ".", disabled: false, area: "dot" },
	],
	valid: [],
	all: [],
	numbers: [],
	actions: [],
	operators: [],
	specialls: [],
	_all: [],
	types: [],
}
Object.defineProperties(String.prototype, {
	isNumber: {
		configurable: true,
		get() {
			return !isNaN(Number(this))
		},
	},
	lastIsDot: {
		configurable: true,
		get() {
			if (this.length == 1) {
				return this == "."
			} else {
				let char: string = this.split("").pop()
				return char == "."
			}
		},
	},
	hasDot: {
		configurable: true,
		get() {
			if (this.length == 1) {
				return this == "."
			} else {
				return this.isNumber && this.includes(".")
			}
		},
	},
	isOperator: {
		configurable: true,
		get() {
			return BUTTONS.operators.includes(this)
		},
	},
	isAction: {
		configurable: true,
		get() {
			return BUTTONS.actions.includes(this)
		},
	},
})
Object.defineProperties(BUTTONS, {
	all: {
		get: function () {
			return [].concat(this.numbers, this.actions, this.operators, this.specialls)
		},
	},
	valid: {
		get: function () {
			return [].concat(this.numbers, this.operators, this.specialls)
		},
	},
	numbers: {
		get: function () {
			return this._numbers.map((e: ButtonType) => e.val)
		},
	},
	actions: {
		get: function () {
			return this._actions.map((e: ButtonType) => e.val)
		},
	},
	operators: {
		get: function () {
			return this._operators.map((e: ButtonType) => e.val)
		},
	},
	specialls: {
		get: function () {
			return this._specialls.map((e: ButtonType) => e.val)
		},
	},
	_all: {
		get: function () {
			return [].concat(this._numbers, this._actions, this._operators, this._specialls)
		},
	},
	types: {
		get: function () {
			let typeArr = []
			for (let t in this) {
				for (let i = 0; i < this[t].length; i++) {
					let b: TypeType = this[t][i]
					typeArr.push({ val: b.val, type: t, index: i })
				}
			}
			return typeArr
		},
	},
})
export { BUTTONS }

function cleanArray(array: string[]) {
	let index = 0
	while (index < array.length - 1) {
		let char = array[index]
		if (!BUTTONS.valid!.includes(char) && isNaN(Number(char))) {
			array.splice(index, 1)
		} else {
			index++
		}
	}
	let nCount = array.filter((e) => !isNaN(Number(e))).length
	let opCount = array.filter((e) => [...BUTTONS.operators!].includes(e)).length
	console.log(array, nCount, opCount)
	let x = 0
	if (nCount == opCount) {
		console.log("SAME", array)
	}
	while (opCount >= nCount && x < 50) {
		array.pop()
		nCount = array.filter((e) => !isNaN(Number(e))).length
		opCount = array.filter((e) => ["a", "s", "m", "d"].includes(e)).length
		x++
		if (x > 49) {
			console.log("nCount:", nCount)
			console.log("oCount:", opCount)
		}
	}
	let indexO = array.indexOf("o")
	let indexC = array.indexOf("c")
	let countO = 0
	let countC = 0

	while (indexO >= 0 || indexC >= 0) {
		if (indexO >= 0) {
			countO++
			indexO = array.indexOf("o", indexO + 1)
		}
		if (indexC >= 0) {
			countC++
			indexC = array.indexOf("o", indexC + 1)
		}
	}

	console.log("CC:", countC)
	console.log("CO:", countO)
	while (countC !== countO) {
		if (countO < countC) {
			array.unshift("o")
			countO++
		} else if (countC < countO) {
			array.push("c")
			countC++
		}
		console.log(countC, countO)
	}
	console.log("cleanEnd", array)
}

export function checkString(str: string) {
	let validation = BUTTONS.all!
	let newString: string[] = []
	let last: string

	// check each charater against valid characters, and push intp new string
	str.split("x").forEach((e, i) => {
		if (e == "o" && (last == "c" || !isNaN(Number(last)))) {
			newString.push("m")
		}
		if (!isNaN(Number(e))) {
			newString.push(e)
		} else if (validation.includes(e)) {
			newString.push(e)
		} else {
			throw { message: "invalid Character in calcstring" }
		}
		last = e
	})

	//Make sure there are as many open as closed brackets
	let indexO = newString.indexOf("o")
	let indexC = newString.indexOf("c")
	let countO = 0
	let countC = 0
	while (indexO >= 0 || indexC >= 0) {
		if (indexO >= 0) {
			countO++
			indexO = newString.indexOf("o", indexO + 1)
		}
		if (indexC >= 0) {
			countC++
			indexC = newString.indexOf("o", indexC + 1)
		}
	}
	if (countC !== countO) {
		if (countO > countC) {
			while (countO < countC) {
				newString.unshift("o")
				countO++
			}
		}
		if (countC < countO) {
			while (countC > countO) {
				newString.push("c")
				countC++
			}
		}
	}

	return newString.filter((e) => e.length > 0).join("x")
}
export function toPostfix(array: string[]): string[] {
	if (!array) return [""]
	//@ts-ignore
	try {
		cleanArray(array)
		array.unshift("o")
		array.push("c")
		return loopThroughString(array, [], [])
	} catch (e: any) {
		let errorObj = { message: "Postfix Error", error: e }
		//console.log(errorObj)
		throw errorObj
	}
}
export function loopThroughString(infix: string[], stack: string[], postfix: string[], start = 0) {
	try {
		if (start == 0) {
			start = Date.now()
		}
		if (Date.now() - start > 1500) {
			throw { msg: "timeout" }
		}
		let n = infix.shift()
		if (!isNaN(Number(n))) {
			postfix.push(n!)
		} else {
			switch (n) {
				case "o":
					stack.push(n)
					break
				case "c":
					closeParent(stack, postfix)
					break
				default:
					addToStack(n!, stack, postfix)
			}
		}

		if (infix.length > 0) {
			return loopThroughString(infix, stack, postfix, start)
		} else {
			return postfix
		}
	} catch (e) {
		let errorObj = { message: "LoopThrough Error", error: e }
		//console.log(errorObj)
		throw errorObj
	}
}
export function getPriority(op: string) {
	switch (op) {
		case "a":
		case "s":
			return 1
		case "m":
		case "d":
			return 2
		case "p":
			return 3
		default:
			//@ts-ignore
			throw { message: "PriorityError" }
	}
}
export function closeParent(stack: string[], postfix: string[], start = 0) {
	try {
		if (start == 0) {
			start = Date.now()
		}
		if (Date.now() - start > 1500) {
			throw { msg: "timeout" }
		}
		let x = stack.pop()
		if (x && x !== "o") {
			postfix.push(x)
			return closeParent(stack, postfix, start)
		}
		return
	} catch (e) {
		let errorObj = { message: "closePArent Error", error: e }
		//console.log(errorObj)
		throw errorObj
	}
}
export function addToStack(x: string, stack: string[], postfix: string[], start = 0) {
	try {
		if (start == 0) {
			start = Date.now()
		}
		if (Date.now() - start > 1500) {
			throw { msg: "timeout" }
		}
		let op = stack[stack.length - 1]
		if (op) {
			if (op == "o" || getPriority(op) < getPriority(x)) {
				stack.push(x)
			} else {
				let n = stack.pop()
				postfix.push(n!)
				return addToStack(x, stack, postfix, start)
			}
		}
	} catch (e) {
		let errorObj = { message: "addToStack Error", error: e }
		//console.log(errorObj)
		throw errorObj
	}
}
export function calc(arr: string[], newArr: String[], start = 0) {
	try {
		if (start == 0) {
			start = Date.now()
		}
		if (Date.now() - start > 1500) {
			throw { msg: "timeout" }
		}
		//debugger
		let x = arr.shift()
		if (!isNaN(Number(x))) {
			newArr.push(x!)
		} else {
			let b = newArr.pop()
			let a = newArr.pop()
			let sum
			switch (x) {
				case "a":
					sum = (Number(a) + Number(b)).toString()
					break
				case "s":
					sum = (Number(a) - Number(b)).toString()
					break
				case "m":
					sum = (Number(a) * Number(b)).toString()
					break
				case "d":
					sum = (Number(a) / Number(b)).toString()
					break
				case "p":
					sum = Math.pow(Number(a), Number(b)).toString()
					break
			}
			newArr.push(sum!)
		}
		if (arr.length > 0) {
			return calc(arr, newArr, start)
		} else {
			return Number(newArr.toString())
		}
	} catch (e) {
		let errorObj = { message: "calc error", error: e }
		//console.log(errorObj)
		throw errorObj
	}
}
/* export function handleOpperation(value:string) {
    let b = $btn
    try {
        let retVal = ""
        if (!value) return
        switch ($btn) {
            case "sum":
                retVal = calc(toPostfix(value)!, []).toString()
                console.log("SETVAL", retVal)
                break
            case "clear":
                retVal = ""
                break
            case "del":
                current = $page.url.searchParams.get("current") || "0"
                retVal = current.length > 1 ? current.substring(0, current.length - 1) : "0"
                break
            case "calc":
                retVal = string
                break
            default:
                retVal = string
                break
        }
        return retVal
    } catch (e) {
        let errorObj = { message: "handle error", error: e }
        console.log(errorObj)
        console.log(findErrorStack(e))
        //throw errorObj
        return errorObj
    }
}
export function findErrorStack(object: any) {
    if (object.hasOwnProperty("error")) {
        return findErrorStack(object.error)
    } else {
        console.log("ERROR OBJECT", object.stack)
        return object
        if (object.hasOwnProperty("message")) {
            return object.message
        } else {
            return "no message or stack"
        }
    }
} */
export function validateInput(str: string | null, val: any) {
	if (!str) return val
	if (val === "." && str.substring(0, str.length - 1).includes(".")) {
		console.log("heh", str, str.includes("."))
		return str.substring(0, str.length - 1)
	}
	let arr = str.split("x")
	if (arr.length < 2) return str
	let last = arr.pop()
	let secLast = arr.pop()
	if (["s", "a", "m", "d"].includes(secLast!) && ["s", "a", "m", "d", "c"].includes(last!)) {
		arr.push(last!)
		return arr.join("x")
	}
	if (last == "o" && val == "o" && (secLast == "c" || !isNaN(Number(secLast)))) {
		arr.push(secLast as string)
		arr.push("m")
		arr.push(last)
		return arr.join("x")
	}

	return str
}
