<script lang="ts">

	export let position: string = '';
	export let company: string = '';
	export let url: string = '';
	export let years: string[] = [];
	export let details: string[] = [];

	$: isBartender = /bartender/i.test(position);

	function getIconFor(text: string): string {
		const first = (text || '').trim().split(/\s+/)[0]?.toLowerCase() || '';
		switch (first) {
		case 'oversee':
		case 'oversaw':
		return '🧭';
		case 'maintain':
		case 'maintained':
		return '📦';
		case 'prepare':
		case 'prepared':
		case 'serve':
		case 'served':
		return '🍸';
		case 'organize':
		case 'organized':
		return '🗃️';
		case 'document':
		case 'documented':
		case 'report':
		case 'reported':
		return '📝';
		case 'excel':
		return '⚡';
		case 'collaborate':
		case 'collaborated':
		return '🤝';
		case 'managed':
		case 'manage':
		return '📋';
		case 'promoted':
		return '🎯';
		case 'hiring':
		case 'hire':
		return '👥';
		case 'developed':
		case 'develop':
		return '🤝';
		case 'designed':
		case 'design':
		return '🛠️';
		case 'researched':
		case 'research':
		return '🔎';
		case 'integrated':
		case 'integrate':
		return '🔗';
		case 'fostered':
		case 'foster':
		return '💬';
		case 'provided':
		case 'provide':
		return '🛎️';
		case 'cleaned':
		case 'clean':
		  return '🧼';
			default:
				return '🔹';
		}
	}
</script>

<div class="work-experience">
		<div class="flex font-bold mb-2 print:mb-1">
			<div class="flex-1 text-left">
				{#if isBartender}
					<svg aria-hidden="true" class="mr-1 inline-block w-4 h-4 text-gray-500 dark:text-gray-400 opacity-60 print:opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M2 3h20" />
						<path d="M22 3l-10 9L2 3" />
						<path d="M12 12v7" />
						<path d="M8 21h8" />
					</svg>
				{/if}
				{position}
			</div>
			<div class="flex-0">
				<a href={url} target="_blank" rel="noreferrer">{company}</a>
			</div>
			<div class="flex-1 text-right">{years.join('-')}</div>
		</div>
		<ul class="text-left pl-8 print:pl-6">
			{#each details as detail}
				<li>
					<span class="mr-2" aria-hidden="true">{getIconFor(detail)}</span>{detail}
				</li>
			{/each}
		</ul>
</div>

<style lang="postcss">
	.work-experience {
		@apply my-4;
	}

	a {
		text-decoration: underline;
	}

	@media print {
		.work-experience {
			@apply my-1;
		}
	}
</style>
