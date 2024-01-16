<script>
	import HiddenInputs from "$utilities/HiddenInputs.svelte"
	import OrangeManImageExample from "./OrangeManImageExample.svelte"
</script>

<form>
	<HiddenInputs filterKeys={["state1"]} />
	<button name="state1" value="true">state 1 true</button>
	<button name="state1" value="false">state 1 false</button>
</form>
<form>
	<HiddenInputs filterKeys={["state2"]} />
	<button name="state2" value="true">state 2 true</button>
	<button name="state2" value="false">state 2 false</button>
</form>

<OrangeManImageExample />
