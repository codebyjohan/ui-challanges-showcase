<script lang="ts">
	import { page } from "$app/stores"
	import { validateInput } from "./functions"
	export let area: string
	export let name: string
	export let val: string
	export let text: string
	export let disabled: boolean
</script>

<button
	{name}
	value={val}
	style="grid-area:{area};"
	class="btn color"
	class:green={!isNaN(Number(val)) || val == "."}
	class:red={val === "sum"}
	class:blue={!(!isNaN(Number(val)) || val == ".") && val !== "sum"}
	{disabled}>
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
	.btn,
	btn:disabled {
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
