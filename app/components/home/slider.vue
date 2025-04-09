<script lang="ts" setup>
	import type Parallax from 'parallax-js'
	import { CHARACTERS } from '~/constants'

	const BREAKPOINT = 1023

	const { width } = useWindowSize()
	const { $parallax } = useNuxtApp()

	const lightbox = reactive({
		visible: false,
		imgs: CHARACTERS.map((character) => character.sliderImage),
		index: 0,
	})

	const parallax = ref<Parallax[]>([])
	const scene = ref<HTMLElement[]>([])

	const onCharacterSelect = (index: number) => {
		lightbox.index = index
		lightbox.visible = true
	}

	const enableParallax = () => {
		parallax.value.forEach((element) => {
			element.enable()
		})
	}

	const disableParallax = () => {
		parallax.value.forEach((element) => {
			element.disable()
		})
	}

	const onResize = useDebounceFn(() => {
		if (width.value > BREAKPOINT) {
			enableParallax()
		} else {
			disableParallax()
		}
	}, 300)

	onMounted(() => {
		scene.value.forEach((element) => {
			const parallaxInstance = new $parallax(element)
			if (width.value < BREAKPOINT) {
				parallaxInstance.disable()
			}
			parallax.value.push(parallaxInstance)
		})
	})

	watch(() => width.value, onResize)
</script>

<template>
	<section>
		<UContainer>
			<div class="flex h-screen flex-col lg:h-auto lg:flex-row">
				<div
					v-for="(character, index) in CHARACTERS"
					:key="character.name"
					:class="[
						'group flex h-[650px] basis-[calc(100%/6)] cursor-pointer items-center justify-center overflow-hidden transition-[flex-basis] duration-1000 ease-in-out hover:basis-full',
						index !== CHARACTERS.length - 1 ? 'border-white lg:border-r-[3px]' : '',
					]"
					@click="onCharacterSelect(index)"
				>
					<div ref="scene" class="relative h-full w-full" data-hover-only="true">
						<div
							class="absolute inset-0 h-full w-full scale-110 transform bg-cover bg-center bg-no-repeat transition-[filter] duration-500 ease-linear group-hover:blur-[2px]"
							:style="{
								backgroundImage: `url(${character.sliderImage})`,
								backgroundPositionX: character.backdropPosition.bgX,
								backgroundPositionY: character.backdropPosition.bgY,
							}"
							data-depth="0.21"
						></div>
						<div
							class="absolute inset-0 h-full w-full scale-[0.9] transform bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-linear group-hover:opacity-100"
							:style="{ backgroundImage: `url(${character.dollImage})` }"
							data-calibrate-x="data-calibrate-x"
							data-depth="1"
						></div>
					</div>
				</div>
			</div>
		</UContainer>

		<VueEasyLightbox
			:visible="lightbox.visible"
			:imgs="lightbox.imgs"
			:index="lightbox.index"
			@hide="lightbox.visible = false"
		/>
	</section>
</template>
