<script lang="ts">
	export let hide = false;
	export let showHint: boolean = false;

	const toggleHide = () => (hide = !hide);
</script>

<div class="group relative" class:web-only={hide} class:text-gray-300={hide} role="button">
	<span
		on:click|stopPropagation={toggleHide}
		class="select-none cursor-pointer"
		class:cursor-copy={hide}
		{...(showHint ? {} : {})}
		title={showHint ? (hide ? 'Omitted – click to show' : 'Click to omit from print') : undefined}
	>
		<slot />
	</span>
	{#if showHint}
		<!-- Hover hint (web only, won’t print) -->
		<span
			class="web-only pointer-events-none absolute -top-4 right-0 text-[10px] sm:text-xs bg-black/70 text-white rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
		>
			{hide ? 'Omitted – click to show' : 'Click to omit'}
		</span>
	{/if}
</div>
