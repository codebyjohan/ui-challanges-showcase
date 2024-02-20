<script lang="ts">
	import Window from "./window.svelte"
	import ButtonGrid from "./buttonGrid.svelte"
	import { op } from "./opStore"
	import { page } from "$app/stores"
	function findErrorStack(object: any) {
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
	}
	let START: number | undefined
	let stop = false
	let timeOut
	let calcValue: string | null = $page.url.searchParams.get("calc") || "0"
	$op = $page.url.searchParams.get("op")
	$: $op = $page.url.searchParams.get("op")
	function time(name?: string) {
		if (!START) {
			START = Date.now()
		}
		let now = Date.now()
		if (now - START > 1500) {
			START = undefined
			//@ts-ignore
			throw { message: name + " timeout!" }
		}
	}
	function checkString(str: string) {
		const validation = ["a", "s", "m", "d", "o", "c", "x", "."]
		let newString: string[] = []
		let last: string = ""

		// check each charater against valid characters, and push intp new string

		for (let e of str.split("x")) {
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
		}

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
	function toPostfix(string: string | null) {
		if (!string) return []
		//@ts-ignore
		//timeOut = setTimeout(() => new Error("TimeOUT error"), 1000)
		let postfix
		try {
			let infix = "ox" + checkString(string) + "xc"
			console.log("\n-----\n", "infix", infix, "\n", "string", string, "\n-------\n")
			postfix = loopThroughString(infix, [], [])
			//clearTimeout(timeOut)
		} catch (e: any) {
			let errorObj = { message: "Postfix Error", error: e }
			//console.log(errorObj)
			throw errorObj
		}
		return postfix
	}
	function loopThroughString(infix: string | string[], stack: string[], postfix: string[]) {
		try {
			time("loopTrou")
			let isString = false
			if (typeof infix === "string") {
				isString = true
				infix = infix.split("x")
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

			if (isString) {
				infix = infix.join("x")
			}

			if (infix.length > 0) {
				console.log("infix", infix)
				return loopThroughString(infix, stack, postfix)
			} else {
				console.log("pre - postfix", postfix)
				START = undefined
				let nCount = postfix.filter((e) => !isNaN(Number(e))).length
				let opCount = postfix.filter((e) => ["a", "s", "m", "d"].includes(e)).length
				console.log(nCount, opCount)
				while (opCount >= nCount) {
					postfix.pop()
					nCount = postfix.filter((e) => !isNaN(Number(e))).length
					opCount = postfix.filter((e) => ["a", "s", "m", "d"].includes(e)).length
				}
				console.log("post - postfix", postfix)
				return postfix
			}
		} catch (e) {
			START = undefined
			let errorObj = { message: "LoopThrough Error", error: e }
			//console.log(errorObj)
			throw errorObj
		}
	}
	function getPriority(op: string) {
		switch (op) {
			case "a":
			case "s":
				return 1
			case "m":
			case "d":
				return 2
			default:
				//@ts-ignore
				throw { message: "PriorityError" }
		}
	}
	function closeParent(stack: string[], postfix: string[]) {
		try {
			let x = stack.pop()
			if (x && x !== "o") {
				postfix.push(x)
				return closeParent(stack, postfix)
			}
			return
		} catch (e) {
			let errorObj = { message: "closePArent Error", error: e }
			//console.log(errorObj)
			throw errorObj
		}
	}
	function addToStack(x: string, stack: string[], postfix: string[]) {
		try {
			time("addToStack")
			let op = stack[stack.length - 1]
			if (op) {
				if (op == "o" || getPriority(op) < getPriority(x)) {
					stack.push(x)
				} else {
					let n = stack.pop()
					postfix.push(n!)
					return addToStack(x, stack, postfix)
				}
			}
			START = undefined
		} catch (e) {
			START = undefined
			let errorObj = { message: "addToStack Error", error: e }
			//console.log(errorObj)
			throw errorObj
		}
	}
	function calc(arr: string[], newArr: String[]) {
		try {
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
				}
				newArr.push(sum!)
			}
			if (arr.length > 0) {
				return calc(arr, newArr)
			} else {
				return Number(newArr.toString())
			}
		} catch (e) {
			let errorObj = { message: "calc error", error: e }
			//console.log(errorObj)
			throw errorObj
		}
	}

	$: calcValue = $page.url.searchParams.get("calc") || "0"
	$: calcValue = $op == "sum" ? $page.url.searchParams.get("current") : calcValue
	function handleOpperation(string: string | null) {
		try {
			let retVal = ""
			if (!string) return (string = $page.url.searchParams.get("calc"))
			let op = $page.url.searchParams.get("op")

			switch (op) {
				case "sum":
					current = $page.url.searchParams.get("current")
					retVal = calc(toPostfix(current)!, []).toString()
					$page.url.searchParams.set("calc", retVal)
					break
				case "neg":
					current = "xsxmxox" + $page.url.searchParams.get("current") + "xc"
					retVal = calc(toPostfix(current)!, []).toString()
					$page.url.searchParams.set("calc", "ox" + retVal)
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

	let current = $page.url.searchParams.get("current")
	/* 	$: {
		op = $page.url.searchParams.get("op")

		console.log(winValue)
		function test(operation: string | null) {
			let string = $page.url.searchParams.get("calc")
			if (!string || !operation) return ""
			switch (operation) {
				case "sum":
					return calc(toPostfix(string)!, []).toString()
					break
				case "clear":
					return ""
					break
				case "backs":
					return string.substring(0, string.length - 2)
					break
				case "calc":
					return string
					break
				default:
					return string
					break
			}
		}
		winValue = test(op)
	} */
</script>

<form id="calculator">
	<input type="hidden" name="current" value={calcValue} />
	<Window value={handleOpperation(calcValue)} />
	<ButtonGrid />
</form>

<style>
	#calculator {
		display: grid;
		grid-template-rows: 2fr 5fr;
		background-color: lightblue;
		padding: 20px;
		height: 80vh;
		gap: 2vh;
		aspect-ratio: 11/16;
	}
</style>
