<script lang="ts">
	import { page } from "$app/stores"
	import { op } from "./opStore"
	export let area: string
	export let name: string
	export let val: string
	export let text: string
	let calcString =
		$page.url.searchParams.get("calc") && $page.url.searchParams.get("calc") !== "null"
			? $page.url.searchParams.get("calc")
			: ""
	function validateInput(str: string | null) {
		console.log("validateInp", str)
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

		if ($op == "sum" && !isNaN(Number(val))) {
			return val
		}
		return str
	}
	$: {
		if ($page.url.searchParams.get("calc") && $page.url.searchParams.get("calc") !== "null") {
			let last = $page.url.searchParams.get("calc")![$page.url.searchParams.get("calc")!.length - 1]
			calcString =
				$page.url.searchParams.get("calc")! +
				((!isNaN(Number(last)) || last === ".") && (!isNaN(Number(val)) || val === ".") ? "" : "x") +
				val
			if (area == "del") {
				calcString = calcString
			}
		}

		if ($op === "clear") {
			calcString = "x" + val
		}
		if ($op === "sum" && !isNaN(Number(val))) {
			calcString = $page.url.searchParams.get("current") + "x" + val
		}
	}
	$: {
		calcString = $page.url.searchParams.get("calc")
		let add = ""
		let last = ""

		switch ($op) {
			case null:
			case "":
				if (calcString && calcString !== "null") {
					last = calcString![calcString!.length - 1]
					add = ((!isNaN(Number(last)) || last === ".") && (!isNaN(Number(val)) || val === ".") ? "" : "x") + val

					if (val == "del") {
						let arr = calcString.split("x")
						arr.pop()
						calcString = arr.join("x")
						calcString.length > 1
						add = ""
					}
					calcString = calcString + add
				}

				break
			case "clear":
				calcString = "x" + val
				break
			case "sum":
				calcString = !isNaN(Number(val)) ? $page.url.searchParams.get("current") + "x" + val : calcString
				break
			case "del":
				calcString = $page.url.searchParams.get("current")
				break
			default:
				calcString = $page.url.searchParams.get("calc")
				add = ""
				break
		}

		if ($op === "clear") {
		}
		if ($op === "sum" && !isNaN(Number(val))) {
			calcString = $page.url.searchParams.get("current") + "x" + val
		}
	}
</script>

<button
	{name}
	value={name == "op" ? val : validateInput(calcString)}
	style="grid-area:{area};"
	class="btn color"
	class:green={!isNaN(Number(val)) || val == "."}
	class:red={val === "sum"}
	class:blue={!(!isNaN(Number(val)) || val == ".") && val !== "sum"}>
	<p class="btn-text">{text}</p>
</button>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap");
	*,
	*::before {
		--c1: hsl(calc(var(--h) * 1deg) calc(var(--s1) * 1%) calc(var(--l1) * 1%));
		--c2: hsl(calc(var(--h) * 1deg) calc(var(--s2) * 1%) calc(var(--l2) * 1%));
		--c3: hsl(calc(var(--h) * 1deg) calc(var(--s3) * 1%) calc(var(--l3) * 1%));
		--c4: hsl(calc(var(--h) * 1deg) calc(var(--s4) * 1%) calc(var(--l4) * 1%));
	}
	.btn {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		transform: scale(1);
		color: hsla(0deg, 0%, 100%, 0.8);
		user-select: none;
		position: relative;
		border-radius: 5px;
		font-size: 20pt;
		font-family: "josefin sans";
		font-weight: 500;
		transition: 0.15s;
		left: 0px;
		top: 0px;
	}
	.btn-text {
		transform: scale(1);
		transition: 0.1s;
	}
	.blue {
		--h: 224;
	}
	.green {
		--h: 100;
	}
	.red {
		--h: 358;
	}
	.yellow {
		--h: 50;
	}

	.color {
		--s1: 40;
		--l1: 50;
		--s2: calc(var(--s1) - 5);
		--l2: calc(var(--l1) - 5);
		background-image: linear-gradient(10deg, var(--c1), var(--c2) 60%);
	}
	.color:hover {
		--h3: var(--h2);
		--s3: var(--s2);
		--l3: calc(var(--l2) + 5);

		--h4: var(--h1);
		--s4: calc(var(--s1) + 10);
		--l4: calc(var(--l1) + 5);

		background-image: linear-gradient(10deg, var(--c4), var(--c3) 60%);
		box-shadow: inset 0 0 10px 0px var(--c4);
	}
	.color:hover:active {
		--h3: var(--h2);
		--s3: var(--s2);
		--l3: calc(var(--l2) + 2);

		--h4: var(--h1);
		--s4: calc(var(--s1) + 2);
		--l4: calc(var(--l1) + 2);

		background-image: linear-gradient(10deg, var(--c4), var(--c3) 60%);
		box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
	}
	.color:hover:active > .btn-text {
		transform: scale(0.9);
	}
</style>
