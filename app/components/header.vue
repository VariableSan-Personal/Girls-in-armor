<script setup lang="ts">
	const links = useLinks()
	const { changeLocale, toggleDrawer, toggleDark } = useAction()
	const route = useRoute()
	const headerRef = useTemplateRef('header')

	const { height } = useWindowSize()
	const { y: currentScrollY } = useWindowScroll()

	const lastScroll = ref(0)

	const isHome = computed(() => route.name === 'index')
	const scrollBreakPoint = computed(() => height.value / 2)

	const collapsibleHeader = useDebounceFn(() => {
		if (!isHome.value) {
			return
		}
		const nav = headerRef.value
		const scrollDownClass = 'scroll-down'
		const breakPoint = scrollBreakPoint.value
		const innerLastScroll = lastScroll.value

		if (currentScrollY.value > breakPoint - 100) {
			if (currentScrollY.value > innerLastScroll && !nav?.classList.contains(scrollDownClass)) {
				// down
				nav?.classList.add(scrollDownClass)
			} else if (
				currentScrollY.value < innerLastScroll &&
				nav?.classList.contains(scrollDownClass)
			) {
				// up
				nav?.classList.remove(scrollDownClass)
			}

			lastScroll.value = currentScrollY.value
		} else {
			nav?.classList.remove(scrollDownClass)
		}
	}, 100)

	onMounted(() => {
		window.addEventListener('scroll', collapsibleHeader)
	})

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', collapsibleHeader)
	})
</script>

<template>
	<div>
		<header
			ref="header"
			class="header fixed top-0 left-0 z-[100] flex min-h-[52px] w-[100%] items-center"
			:class="{
				'transition-all duration-200': isHome,
				'bg-transparent! text-white!': isHome && currentScrollY < scrollBreakPoint,
			}"
		>
			<UContainer>
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-x-4">
						<UButton
							v-if="$route.meta.showBack"
							class="p-2 hover:bg-inherit"
							variant="ghost"
							@click="$router.back()"
						>
							<Icon size="24" name="uil:angle-left-b" />
						</UButton>

						<UButton variant="link" class="focus:outline-none sm:hidden" @click="toggleDrawer">
							<Icon name="lucide:align-justify" />
						</UButton>

						<Logo />
					</div>

					<div class="flex items-center gap-4">
						<nav class="hidden sm:block">
							<ul class="flex items-center gap-4">
								<template v-for="(link, index) in links" :key="index">
									<li v-if="link.condition">
										<NuxtLink
											v-if="link.routeName"
											:to="{ name: link.routeName }"
											exact-active-class="exact-link"
											class="link"
										>
											<Icon :name="link.icon" />
											{{ link.title }}
										</NuxtLink>
										<button v-else variant="link" class="link" @click="link.onClick">
											<Icon :name="link.icon" />
											{{ link.title }}
										</button>
									</li>
								</template>
							</ul>
						</nav>

						<div class="flex gap-2">
							<UButton
								variant="ghost"
								class="cursor-pointer text-inherit"
								size="sm"
								icon="mdi-translate"
								@click="changeLocale"
							/>
							<UButton
								variant="ghost"
								class="cursor-pointer text-inherit"
								icon="mdi-theme-light-dark"
								size="sm"
								@click="toggleDark"
							/>
						</div>
					</div>
				</div>
			</UContainer>
		</header>

		<div
			:class="{
				'mb-6 min-h-[52px]': true,
				hidden: isHome,
			}"
		></div>
	</div>
</template>

<style>
	@reference "@/assets/css/main.css";

	.header {
		background-color: var(--ui-bg);
	}

	.link {
		@apply relative flex cursor-pointer items-center gap-2 py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full;
	}

	.exact-link {
		@apply after:w-full;
	}

	.scroll-down {
		@apply top-[-100px];
	}
</style>
