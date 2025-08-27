<script lang="ts">
	export let name: string = 'Foo';
	export let nickname: string = '';
	export let phone: string = '';
	export let email: string = '';
	export let github: string = '';
	export let linkedin: string = '';
	export let location: string = '';
	export let website: string = '';
	export let availability: string = '';
	$: hasRight = Boolean(github || website || linkedin || availability);
</script>

<div class="flex flex-wrap flex-col sm:flex-row print:flex-row text-sm sm:text-base">
	<div class="flex-1 text-left sm:py-4 w-48">
		<p class="flex items-center gap-2">
			<svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.15a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92z"/>
			</svg>
			<a href={`tel:${phone}`} class="font-semibold">{phone}</a>
		</p>
		<p class="flex items-center gap-2">
			<svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 4h16v16H4z" fill="none"/>
				<path d="m22 6-10 7L2 6"/>
			</svg>
			<a href={`mailto:${email}`}>{email}</a>
		</p>
		<p class="flex items-center gap-2">
			<svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 10c0 5-9 13-9 13S3 15 3 10a9 9 0 1 1 18 0z"/>
				<circle cx="12" cy="10" r="3"/>
			</svg>
			<span>{location}</span>
		</p>
	</div>

	<h2
		class="flex-none order-first sm:order-none print:order-none text-4xl sm:text-2xl md:text-3xl lg:text-6xl text-center p-4 print:pt-0"
	>
		{name}
		<span class="block -mt-1 text-base lg:text-lg">({nickname})</span>
	</h2>

	{#if hasRight}
	<div class="flex-1 text-left sm:text-right print:text-right sm:py-4 w-48 text-sm sm:text-base">
		{#if github}
		<p>
			<a href={`https://github.com/${github}`} target="_blank" rel="noreferrer"
				>github.com/{github}</a
			>
		</p>
		{/if}
		{#if website}
		<p>
			<a href={`https://${website}`} target="_blank" rel="noreferrer">{website}</a>
		</p>
		{/if}
		{#if linkedin}
		<p>
			<a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">Linkedin</a>
		</p>
		{/if}
		{#if availability}
		<p class="mt-1 flex items-center gap-2">
			<svg aria-hidden="true" class="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="10"/>
				<path d="M12 6v6l4 2"/>
			</svg>
			<strong>Availability:</strong> {availability}
		</p>
		{/if}
	</div>
	{/if}
</div>

<style lang="postcss">
	a {
		text-decoration: underline;
	}
</style>
