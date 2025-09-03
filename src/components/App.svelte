<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Kofi from './Kofi.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;
	let isDark = false;
	let showBackToTop = false;

	$: dataLink = `${sourceLink}/blob/main/static/data/profile.json`;
	$: ({
		intro = {} as IProfileResp['intro'],
		projects = [],
		technologies = [],
		workExperiences = [],
		educations = [],
		interests = [],
		documents = [],
		media = [],
		resumeUrl: { sourceLink = '', fullVersionLink = '' } = {}
	} = profile || {});

	onMount(async () => {
	profile = await fetchResumeProfile();
	// init theme (default to dark when not set)
	const stored = localStorage.getItem('theme');
	isDark = (stored ? stored : 'dark') === 'dark';
	applyTheme();
	// ensure print happens in light mode
	window.addEventListener('beforeprint', () => {
		document.documentElement.classList.remove('dark');
	});
	window.addEventListener('afterprint', () => {
		applyTheme();
	});
	// back-to-top toggle
	const onScroll = () => (showBackToTop = window.scrollY > 200);
	window.addEventListener('scroll', onScroll);
	onScroll();
	// cleanup
	onDestroy(() => {
		window.removeEventListener('scroll', onScroll);
	});
});

	function applyTheme() {
		if (isDark) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		applyTheme();
	}

	async function fetchResumeProfile() {
		const resp = await fetch('/data/profile.json');
		return await resp.json();
	}


	function getInterestIcon(text: string): string {
		const first = (text || '').trim().split(/\s+/)[0]?.toLowerCase() || '';
		if (first === 'golf') return '🏌️';
		if (first === 'disc') return '🥏';
		if (first === 'writing' || first === 'code' || first === 'programming') return '💻';
		return '•';
	}

	type TechLike = { section?: string; details: string };
	function getTechIcon(tech: TechLike): string {
		const section = (tech.section || '').toLowerCase();
		if (section.includes('skill')) return '🛠️';
		if (section.includes('objective')) return '🎯';
		if (section.includes('summary')) return '⭐';
		if (section.includes('schedule')) return '🗓️';
		return getOverviewIcon(tech.details);
	}

	function getOverviewIcon(details: string): string {
		const text = (details || '').toLowerCase();
		// Schedule keywords anywhere in the string
		if (/monday|tuesday|wednesday|thursday|friday|saturday|sunday/.test(text)) return '🗓️';
		// Other common cues from first word
		const first = text.trim().split(/\s+/)[0]?.replace(/[^a-z]/g, '') || '';
		if (first === 'seasoned' || first === 'experienced') return '🎯';
		if (first === 'inventory') return '📦';
		if (first === 'proactive') return '⭐';
		return '🔹';
	}
</script>

<!-- Remove this is you does not want Kofi widget on your site -->
{#if intro.github == 'narze'}
	<Kofi name={intro.github} />
{/if}

<header class="web-only text-center p-4 sm:p-6 bg-gray-100 text-gray-900 dark:bg-black dark:text-white w-screen">
	<div class="flex items-center justify-between max-w-screen-xl mx-auto">
		<h1 class="text-3xl sm:text-4xl">Resume</h1>
		<div class="flex items-center gap-4">
			<button on:click={() => window.print()} class="underline text-sm sm:text-lg">Print</button>
			<button
				on:click={toggleTheme}
				class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-sm"
				aria-label="Toggle dark mode"
			>
				{isDark ? 'Light mode' : 'Dark mode'}
			</button>
		</div>
	</div>
</header>

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl dark:bg-black dark:text-white">
	<Intro {...intro} />

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 print:block print-cols">
		<div class="space-y-4">
			<section>
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">📋</span>Overview</h2>
					<hr />
					<ul class="text-left pl-8 space-y-3">
						{#each technologies as tech}
							<li class="border border-gray-300/70 dark:border-gray-600/60 rounded-md p-3 sm:p-4 bg-white/70 dark:bg-white/5">
								<div class="flex items-start gap-2">
									<span class="mt-0.5" aria-hidden="true">{getTechIcon(tech)}</span>
									<span class="font-semibold">{tech.section}</span>
								</div>
								<span class="block mt-1 leading-relaxed">{tech.details}</span>
							</li>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">🎓</span>Education</h2>
					<hr />

					<ul class="text-left pl-8 icon-list icon-education">
						{#each educations as edu}
							<li>
								<strong>{edu.head}</strong>, {edu.details}
							</li>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">⭐</span>Interests</h2>
					<hr />

					<ul class="text-left pl-8">
						{#each interests as interest}
							<li>
								<span class="mr-2" aria-hidden="true">{getInterestIcon(interest)}</span>{interest}
							</li>
						{/each}
					</ul>

					{#if media.length}
						<div class="mt-4 space-y-2">
							{#each media as m}
								<Hideable hide={m.hide}>
									<div class="text-left">
										<strong class="block mb-1">{m.name}</strong>
										<div class="web-only">
											<video
												src={m.url}
												autoplay
												muted
												playsinline
												controls
												class="mx-auto w-full max-w-xs sm:max-w-sm">
												<track kind="captions" label="No captions" />
												Sorry, your browser doesn't support embedded videos.
											</video>
										</div>
									</div>
								</Hideable>
							{/each}
						</div>
					{/if}
				</Hideable>
			</section>
		</div>

		<div class="space-y-4">
			<section class="work-section">
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">💼</span>Work Experience</h2>
					<hr />

					{#each workExperiences as exp}
						<Work {...exp} />
					{/each}
				</Hideable>
			</section>

			<section class="projects-section">
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">🚀</span>Projects</h2>
					<hr />

					<ul class="text-left pl-8 icon-list icon-projects">
						{#each projects as project}
							<li>
								<strong>{project.name}</strong>
								- {project.details}
								<a
									href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
									target="_blank"
									rel="noreferrer"><strong>{project.url}</strong></a>
							</li>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable showHint>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">📄</span>Documents</h2>
					<hr />
					<ul class="text-left pl-8 docs-list icon-list icon-docs">
						{#each documents as doc}
							<li>
								<a href={doc.url} target="_blank" rel="noreferrer"><strong>{doc.name}</strong></a>
							</li>
						{/each}
					</ul>
				</Hideable>
			</section>
		</div>
	</div>
</main>

{#if showBackToTop}
<button
		class="web-only fixed bottom-4 right-4 md:bottom-6 md:right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Back to top"
	>
		↑
	</button>
{/if}


<style lang="postcss">
	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-6;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
	}

	:global(.print-only) {
		display: none;
	}

	:global(html.dark) {
		background: #000;
	}

	@media print {
		* {
			@apply text-xs;
		}

		/* Move footer inward to respect page margins */
		.print-footer {
			left: 0.25in;
			right: 0.25in;
			bottom: 0.25in;
		}

		:global(.print-only) {
			display: inherit;
		}


		:global(.web-only) {
			display: none;
		}

		/* Hide empty sections when their content is omitted */
		section:has(> :global(.web-only)) {
			display: none;
			margin: 0 !important;
			padding: 0 !important;
		}

		/* Use full page width and reduce outer constraints */
		main {
			margin: 0;
			padding: 0.25in;
			max-width: 100% !important;
			width: 100% !important;
		}

		/* Two printed columns with balancing */
		.print-cols {
			columns: 2;
			column-gap: 1.5rem;
		}

		ul {
			@apply pl-6;
		}

		/* Avoid splitting list items across pages */
		.work-experience li,
		.icon-list li {
			break-inside: avoid;
		}

		/* Projects: allow natural flow to reduce blank space when sections are omitted */
		.projects-section {
			break-before: auto;
			page-break-before: auto; /* legacy */
			margin-top: 0.2in;
		}

		/* Work: allow natural column flow to avoid empty leading columns */
		.work-section {
			break-before: auto;
			margin-top: 0.2in;
		}

		/* Add a page break after specific bullet in Red Tracton’s, to separate nicely */
		.work-experience[data-company^="Red Tracton"] li[data-index="6"] {
			break-after: page;
			page-break-after: always; /* legacy */
		}

		section {
			margin: 0.2in 0;
			padding-top: 0.08in;
			padding-bottom: 0.14in;
			/* allow sections to break across columns to reduce wasted space */
			break-inside: auto;
		}

		section hr {
		@apply mt-0 mb-3;
		}
		/* Append link URLs for documents when printing */
		.docs-list a::after {
			content: " (" attr(href) ")";
			font-weight: normal;
			font-size: 90%;
			color: inherit;
		}
	}
 
	/* Icon bullets */
	:global(.icon-list li) {
		list-style: none;
		position: relative;
		padding-left: 1.25em;
	}
	:global(.icon-list li)::before {
		position: absolute;
		left: 0;
		top: 0.1em;
	}
	:global(.icon-overview li)::before { content: '🔹'; }
	:global(.icon-education li)::before { content: '🎓'; }
	:global(.icon-projects li)::before { content: '🚀'; }
	:global(.icon-interests li)::before { content: '⭐'; }
	:global(.icon-docs li)::before { content: '📄'; }
	:global(.icon-work li)::before { content: '✅'; }

	/* Print page size/margins */
	@page {
		size: letter;
		margin: 0.25in;
	}
 
</style>
