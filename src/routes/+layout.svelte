<script lang="ts">
	import Background from "$components/Background/Background.svelte"
	import NavigationPanel from "$components/NavigationPanel.svelte"
	import "$lib/utilities/stylesheets/stylesheets.css"
</script>

<div class="grid-stack height-100p">
	<Background />
	<NavigationPanel>
		<main>
			<slot />
		</main>
	</NavigationPanel>
</div>

<style>
	main {
		width: max-content;
		height: max-content;
		margin: auto;
	}
</style>
