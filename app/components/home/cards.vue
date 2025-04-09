<script lang="ts" setup>
	import { reactive } from 'vue'
	import { CHARACTERS } from '~/constants'

	const activeStates = reactive<{ [key: string]: 'none' | 'image' | 'quote' }>(
		Object.fromEntries(CHARACTERS.map((character) => [character.name, 'none']))
	)

	const toggle = (cardName: string, part: 'image' | 'quote') => {
		activeStates[cardName] = activeStates[cardName] === part ? 'none' : part
	}

	const imageClipClass = (active: 'none' | 'image' | 'quote'): string => {
		if (active === 'image') return 'card-image-active'
		else if (active === 'quote') return 'card-image-hidden'
		return 'card-image-default'
	}

	const quoteClipClass = (active: 'none' | 'image' | 'quote'): string => {
		if (active === 'quote') return 'card-quote-active'
		else if (active === 'image') return 'card-quote-hidden'
		return 'card-quote-default'
	}
</script>

<template>
	<section>
		<UContainer>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="character in CHARACTERS"
					:key="character.name"
					class="relative h-[400px] cursor-pointer overflow-hidden border"
				>
					<div
						class="absolute inset-0 transition-[clip-path] duration-400"
						:class="imageClipClass(activeStates[character.name]!)"
						:style="{
							backgroundImage: `url(${character.image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}"
						@click="toggle(character.name, 'image')"
					></div>

					<div
						class="quote absolute inset-0 flex flex-col justify-center p-4 transition-[clip-path] duration-400"
						:class="quoteClipClass(activeStates[character.name]!)"
						@click="toggle(character.name, 'quote')"
					>
						<h4 class="mb-2 border-b text-xl font-bold">
							{{ character.name }}
						</h4>
						<p class="italic">
							{{ character.quote }}
						</p>
					</div>
				</div>
			</div>
		</UContainer>
	</section>
</template>

<style scoped>
	.quote {
		background-color: var(--ui-bg);
	}

	.card-image-default {
		clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
	}

	.card-image-active {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}

	/* .card-image-hidden {
		clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
	} */

	.card-quote-default {
		clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
	}

	.card-quote-active {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}

	.card-quote-hidden {
		clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
	}
</style>
