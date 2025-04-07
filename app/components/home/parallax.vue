<script lang="ts" setup>
	import { useWindowSize } from '@vueuse/core'

	const { width } = useWindowSize()

	// Computed styles for responsive animations
	const cloudsStyle = computed(() =>
		width.value > 1200 ? 'animation: clouds 10s ease-in-out alternate infinite;' : ''
	)

	const moonStyle = computed(() =>
		width.value > 1200 ? 'animation: moon 10s ease-in-out alternate infinite;' : ''
	)

	const skyStyle = computed(() =>
		width.value > 1200 ? 'animation: sky 15s ease-in-out alternate infinite;' : ''
	)
</script>

<template>
	<section
		class="min-h-none relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:z-50 before:h-[25%] before:w-[100%] before:bg-gradient-to-t before:from-black before:to-transparent before:content-[''] sm:min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh] xl:min-h-[100vh]"
	>
		<!-- Sky image -->
		<img
			class="absolute top-[-5px] left-0 z-0 w-full sm:hidden"
			:style="skyStyle"
			src="@/assets/images/sky-min.png"
		/>

		<!-- Moon image -->
		<img
			class="absolute top-[-90px] left-0 z-10 w-full sm:top-0 sm:hidden md:top-0 lg:top-0 xl:top-[-90px]"
			:style="moonStyle"
			src="@/assets/images/moon-min.png"
		/>

		<!-- Clouds image -->
		<img
			class="absolute top-[-30%] left-[-10%] z-20 w-full scale-125 sm:hidden md:top-0 md:left-0 md:scale-100 lg:top-0 lg:left-0 lg:scale-100 xl:top-[-30%] xl:left-[-10%] xl:scale-125"
			:style="cloudsStyle"
			src="@/assets/images/clouds2-min.png"
		/>

		<!-- Road image -->
		<img
			class="absolute top-0 left-0 z-30 w-full scale-105 sm:hidden"
			src="@/assets/images/road-min.png"
		/>

		<!-- Jeanne image -->
		<img
			class="absolute top-0 left-0 z-40 w-full sm:hidden"
			src="@/assets/images/Jeanne darc-min.png"
		/>

		<!-- Mobile background (only shown on small screens) -->
		<img class="hidden sm:block" src="@/assets/images/mobile-bg.jpg" />
	</section>
</template>

<style scoped>
	@reference "@/assets/css/main.css";

	@keyframes sky {
		0% {
			top: -5px;
		}
		100% {
			top: -100px;
		}
	}

	@keyframes clouds {
		0% {
			left: -10%;
		}
		100% {
			left: 10%;
		}
	}

	@keyframes moon {
		0% {
			top: -90px;
		}
		100% {
			top: 0;
		}
	}
</style>
