<script lang="ts">
	import Window from "./window.svelte"
	import Button from "./button.svelte"
	import { btn, lastBtn, lastValue, currentValue } from "./opStore"
	import { page } from "$app/stores"
	import { BUTTONS as btns, calc, toPostfix } from "./functions"
	import type { ButtonType, ButtonsType, TypeType } from "./functions"
	const BUTTONS = btns as ButtonsType
	let currentButtons = BUTTONS._all as ButtonType[]

	let START: number | undefined
	let stop = false
	let timeOut
	function changeLastCharacter(char: string, array: string[]) {
		array.pop()
		array.push(char)
	}

	function handleNummber(btn: string, array: string[]) {
		console.log("handleNumber")
		if ($lastBtn === "sum") {
			while (array.length) {
				array.pop()
			}
			array.push(btn)
			return
		}
		if (!array.length) return
		let lastChar = array.pop() as string
		if (lastChar == "c") {
			return
		}
		console.log(lastChar, lastChar.isNumber)
		if (lastChar.isNumber || lastChar.lastIsDot) {
			console.log(lastChar, btn)
			array.push(lastChar + btn)
		} else if (lastChar.hasDot) {
			array.push(lastChar + btn)
		} else {
			array.push(lastChar)
			array.push(btn)
		}
	}
	function handleAction(btn: string, array: string[]) {
		console.log("Handle Action")
		let val: any
		switch (btn) {
			case "neg":
				array.unshift("o", "0", "s", "1", "c", "m", "o")
				array.push("c")
			case "sum":
				val = calc(toPostfix(array), []).toString()
				let x = 0
				while (array.length > 0 && x < 20) {
					if (array.length) {
						array.pop()
					}
					x++
					if (x > 10) {
						console.log(x)
					}
				}
				console.log(val, array)
				array.push(val)
				break
			case "clear":
				while (array.length) {
					array.pop()
				}
				break
			case "del":
				array.pop()
				break

			default:
				array = ["ERROR"]
				break
		}
	}
	function handleOperator(btn: string, array: string[]) {
		console.log("Handle Opp")
		if (!array.length) return
		let lastChar = array.pop() as string
		if (lastChar.isOperator || lastChar.lastIsDot || lastChar == "o") {
			if (lastChar == "o") {
				return
				//TODO: DISABLE INUPUT
			}
			array.push(btn)
		} else {
			array.push(lastChar, btn)
		}
	}
	function handleSpecial(btn: string, array: string[]) {
		console.log("Handle Special")
		let lastChar = array.pop() as string
		if (btn == "o") {
			if (lastChar.lastIsDot) {
				lastChar = lastChar.substring(0, lastChar.length - 1)
			}
			array.push(lastChar)
			if (lastChar.isNumber || lastChar == "c") {
				array.push("m")
			}
			array.push(btn)
			return
		}
		if (btn == "c") {
			if (lastChar.lastIsDot) {
				lastChar = lastChar.substring(0, lastChar.length - 1)
			}
			if (!lastChar.isOperator) {
				array.push(lastChar)
			}
			array.push(btn)
			return
		}
		if (btn == ".") {
			console.log(array, lastChar)
			if (lastChar.isNumber && !lastChar.hasDot) {
				let n = lastChar + btn
				array.push(n)
			} else {
				array.push(lastChar)
			}
		}
		if (btn == "c") {
			if (lastChar.lastIsDot || lastChar.isOperator) {
				if (lastChar.lastIsDot) {
					lastChar = lastChar.substring(0, lastChar.length - 1)
					array.push(lastChar)
				}
			}
			array.push(btn)
		}
	}
	function disableButtons() {}

	$: {
		let currentBtn = $page.url.searchParams.get("btn") || ""
		$lastBtn = $btn
		$btn = currentBtn
		console.log("button is pushed")
		if (!$currentValue || $currentValue.length < 1) {
			$currentValue = currentBtn
		} else {
			let currentArr = $currentValue.split("x")
			if (BUTTONS.numbers.includes(currentBtn)) {
				handleNummber(currentBtn, currentArr)
			}

			if (BUTTONS.actions.includes(currentBtn)) {
				handleAction(currentBtn, currentArr)
			}

			if (BUTTONS.operators.includes(currentBtn)) {
				handleOperator(currentBtn, currentArr)
			}

			if (BUTTONS.specialls.includes(currentBtn)) {
				handleSpecial(currentBtn, currentArr)
			}
			$lastValue = $currentValue
			$currentValue = currentArr.join("x")
			console.log("click")
		}
	}
</script>

<form id="calculator">
	<input type="hidden" name="last-btn" value={$lastBtn} />
	<input type="hidden" name="current" value={$currentValue} />
	<input type="hidden" name="oldValue" value={$lastValue} />
	<Window value={$currentValue} />
	<div id="btn-grid-container">
		{#each currentButtons as btn}
			<Button area={btn.area} name={"btn"} val={btn.val} text={btn.text ? btn.text : btn.val} disabled={btn.disabled} />
		{/each}
	</div>
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
	#btn-grid-container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(6, 1fr);
		grid-template-areas:
			"del div mult sub"
			"b7 b8 b9 add"
			"b4 b5 b6 ob"
			"b3 b2 b1 cb"
			"dot b0 bs eq";
		grid-template-areas:
			"ob ob cb cb clr clr del del"
			"ob ob cb cb clr clr del del"
			"neg neg mult mult div div sub sub"
			"neg neg mult mult div div sub sub"
			"b7 b7 b8 b8 b9 b9 add add"
			"b7 b7 b8 b8 b9 b9 add add"
			"b7 b7 b8 b8 b9 b9 add add"
			"b4 b4 b5 b5 b6 b6 add add"
			"b4 b4 b5 b5 b6 b6 add add"
			"b4 b4 b5 b5 b6 b6 add add"
			"b3 b3 b2 b2 b1 b1 eq eq"
			"b3 b3 b2 b2 b1 b1 eq eq"
			"b3 b3 b2 b2 b1 b1 eq eq"
			"b0 b0 b0 b0 dot dot eq eq "
			"b0 b0 b0 b0 dot dot eq eq "
			"b0 b0 b0 b0 dot dot eq eq ";
		grid-template-areas:
			"ob cb clr clr del del pow pow"
			"neg neg mult mult div div sub sub "
			"b7 b7 b8 b8 b9 b9 add add"
			"b4 b4 b5 b5 b6 b6 add add"
			"b1 b1 b2 b2 b3 b3 eq eq"
			"b0 b0 b0 b0 dot dot eq eq ";
		gap: 1vh;
	}
</style>
