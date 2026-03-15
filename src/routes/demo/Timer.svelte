<script lang="ts">
	interface Props {
		name: string;
	}
	let timerId: NodeJS.Timeout | null = null;
	let counter: number = $state(0);
	let updateDeltaInMs: number = $state(1000);
	function increaseDelay() {
		updateDeltaInMs += 1000;
	}

	function tick() {
		return (timerId = setTimeout(() => {
			$inspect.trace();
			counter++;
			tick();
		}, updateDeltaInMs));
	}
	$effect(() => {
		tick();
		return () => timerId && clearTimeout(timerId);
	});
	// const { name }: Props = $props();
</script>

{counter}
<br />
{updateDeltaInMs}
<br />
{#each Array.from(['1', '2']) as item (item)}
	<div>{item}</div>
	{#if item === '1'}
		ajaja
	{:else if item === '2'}
		ajajaj
	{/if}
{/each}
<button onclick={() => increaseDelay()}> Increase Delay by 1s </button>
<button onclick={() => (updateDeltaInMs -= 1000)} disabled={updateDeltaInMs - 1000 < 1000}
	>Decrease Delay by 1s</button
>
<!-- {#if counter}
	{counter}
{/if} -->
<!-- <h1>{name}</h1> -->
