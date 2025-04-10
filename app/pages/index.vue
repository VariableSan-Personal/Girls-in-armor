<template>
	<div class="flex flex-col gap-y-16">
		<HomeParallax />

		<UContainer>
			<div class="text-block">
				<h2 class="headline">Confrontation</h2>
				<p class="subtitle">Engage with visuals that challenge and inspire.</p>
			</div>
		</UContainer>
		<HomeConfrontation />

		<UContainer>
			<div class="text-block">
				<h2 class="headline">Gallery of Cards</h2>
				<p class="subtitle">Discover stunning designs and narratives on display.</p>
			</div>
		</UContainer>
		<HomeCards />

		<UContainer>
			<div class="text-block">
				<h2 class="headline">Interactive Slider</h2>
				<p class="subtitle">Slide through memorable moments frozen in time.</p>
			</div>
		</UContainer>
		<HomeSlider />
	</div>
</template>

<style scoped>
	@reference "@/assets/css/main.css";

	.text-block {
		@apply text-center leading-none;
	}

	.headline {
		@apply relative text-3xl font-bold;
	}

	.headline:before,
	.headline:after {
		@apply absolute top-1/2 h-0.5 w-4 bg-neutral-500 content-[""] sm:w-8;
	}

	.headline:before {
		@apply left-0 sm:left-8;
	}

	.headline:after {
		@apply right-0 sm:right-8;
	}

	.subtitle {
		@apply text-xl text-neutral-600;
	}
</style>
