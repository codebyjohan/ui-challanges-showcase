<script lang="ts">
	import { page } from "$app/stores"
	import { beforeUpdate } from "svelte"
	import { get } from "svelte/store"
	export let value: string | null | any

	function getSymbol(x: string) {
		switch (x) {
			case "s":
				return "-"
			case "a":
				return "+"
			case "m":
				return "*"
			case "d":
				return "/"
			case "o":
				return "("
			case "c":
				return ")"
			case "p":
				return "^"
			default:
				if (!isNaN(Number(x))) {
					return x
				} else return ""
		}
	}
	function getString(string: string | null) {
		if (typeof string == "object") {
			console.log(string)
			return "ERROR!!!!!!!!"
		}
		if (!string) return "0"
		let arr = string.split("x")

		let str = arr.map((e) => getSymbol(e)).join("")
		str = str.length > 0 ? str : string.length > 0 && !isNaN(Number(str)) ? string : "0"
		return str
	}
</script>

<div class="calcWindow">
	{getString(value)}
</div>

<style>
	div {
		user-select: none;
		font-size: 3em;
		font-family: "courier new";
		font-weight: bold;
		text-align: end;
		background: white;
		padding: 5px;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: end;
	}
</style>
