<script lang="ts">
	import Button from "./button.svelte"
	const symbols = [
		{ text: "C", val: "clear", name: "op", area: "clr" },
		{ text: "=", val: "sum", name: "op", area: "eq" },
		{ text: "<", val: "", name: "calc", area: "del" },
		{ text: "-/+", val: "neg", name: "op", area: "neg" },
		{ text: "-", val: "s", name: "calc", area: "sub" },
		{ text: "+", val: "a", name: "calc", area: "add" },
		{ text: "*", val: "m", name: "calc", area: "mult" },
		{ text: "/", val: "d", name: "calc", area: "div" },
		{ text: "(", val: "o", name: "calc", area: "ob" },
		{ text: ")", val: "c", name: "calc", area: "cb" },
		{ val: ".", name: "calc", area: "dot" },
		{ val: "1", name: "calc", area: "b1" },
		{ val: "0", name: "calc", area: "b0" },
		{ val: "2", name: "calc", area: "b2" },
		{ val: "3", name: "calc", area: "b3" },
		{ val: "4", name: "calc", area: "b4" },
		{ val: "5", name: "calc", area: "b5" },
		{ val: "6", name: "calc", area: "b6" },
		{ val: "7", name: "calc", area: "b7" },
		{ val: "8", name: "calc", area: "b8" },
		{ val: "9", name: "calc", area: "b9" },
	]
	const grid = new Array(5).fill(new Array(4).fill(1))
</script>

<div id="btn-grid-container">
	{#each symbols as btn}
		<Button area={btn.area} name={btn.name} val={btn.val} text={btn.text ? btn.text : btn.val} />
	{/each}
</div>

<style>
	#btn-grid-container {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(4, 1fr);
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
			"ob cb clr del"
			"neg mult div sub "
			"b7 b8 b9 add"
			"b4 b5 b6 add"
			"b1 b2 b3 eq"
			"b0 b0 dot eq ";
		gap: 1vh;
	}
</style>
