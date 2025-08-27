<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProfileResp } from '../types';
	import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Kofi from './Kofi.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;
	let isDark = false;

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
		// init theme
		isDark = (localStorage.getItem('theme') || '') === 'dark';
		applyTheme();
		// ensure print happens in light mode
		window.addEventListener('beforeprint', () => {
			document.documentElement.classList.remove('dark');
		});
		window.addEventListener('afterprint', () => {
			applyTheme();
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

</script>

<!-- Remove this is you does not want Kofi widget on your site -->
{#if intro.github == 'narze'}
	<Kofi name={intro.github} />
{/if}

<header class="web-only text-center p-4 sm:p-6 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 w-screen">
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

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl dark:bg-gray-900 dark:text-gray-100">
	<Intro {...intro} />

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 print:block print-cols">
		<div class="space-y-4">
			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">📋</span>Overview</h2>
					<hr />
					<ul class="text-left list-disc pl-8 space-y-3">
						{#each technologies as tech}
							<Hideable>
								<li>
									<span class="block font-semibold">{tech.section}</span>
									<span class="block mt-1 leading-relaxed">{tech.details}</span>
								</li>
							</Hideable>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">🎓</span>Education</h2>
					<hr />

					<ul class="text-left list-disc pl-8">
						{#each educations as edu}
							<Hideable>
								<li>
									<strong>{edu.head}</strong>, {edu.details}
								</li>
							</Hideable>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">⭐</span>Interests</h2>
					<hr />

					<ul class="text-left list-disc pl-8">
						{#each interests as interest}
							<Hideable>
								<li>
									{interest}
								</li>
							</Hideable>
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
			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">💼</span>Work Experience</h2>
					<hr />

					{#each workExperiences as exp}
						<Work {...exp} />
					{/each}
				</Hideable>
			</section>

			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">🚀</span>Projects</h2>
					<hr />

					<ul class="text-left list-disc pl-8">
						{#each projects as project}
							<Hideable hide={project.hide}>
								<li>
									<strong>{project.name}</strong>
									- {project.details}
									<a
										href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
										target="_blank"
										rel="noreferrer"><strong>{project.url}</strong></a>
								</li>
							</Hideable>
						{/each}
					</ul>
				</Hideable>
			</section>

			<section>
				<Hideable>
					<h2 class="text-2xl print:text-4xl uppercase text-left"><span aria-hidden="true" class="mr-2">📄</span>Documents</h2>
					<hr />
					<ul class="text-left list-disc pl-8 docs-list">
						{#each documents as doc}
							<Hideable hide={doc.hide}>
								<li>
									<a href={doc.url} target="_blank" rel="noreferrer"><strong>{doc.name}</strong></a>
								</li>
							</Hideable>
						{/each}
					</ul>
				</Hideable>
			</section>
		</div>
	</div>
</main>

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

	@media print {
		* {
			@apply text-xs;
		}

		:global(.print-only) {
			display: inherit;
		}

		:global(.web-only) {
			display: none;
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
 
	/* Print page size/margins */
	@page {
		size: letter;
		margin: 0.25in;
	}
 
</style>
