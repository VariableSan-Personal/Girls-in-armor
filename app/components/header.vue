<script setup lang="ts">
	const links = useLinks()
	const { changeLocale, toggleDrawer, toggleDark } = useAction()
</script>

<template>
	<header class="fixed top-0 left-0 z-[100] flex min-h-[52px] w-[100%] items-center">
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

					<NuxtLink
						class="flex items-center gap-2 transition hover:opacity-60"
						:to="{ name: 'index' }"
					>
						<Icon class="text-3xl sm:text-4xl" name="custom:shield-and-sword" />
						Girls in Armor
					</NuxtLink>
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
						<UButton variant="ghost" size="sm" icon="mdi-translate" @click="changeLocale" />
						<UButton variant="ghost" icon="mdi-theme-light-dark" size="sm" @click="toggleDark" />
					</div>
				</div>
			</div>
		</UContainer>
	</header>
</template>

<style scoped>
	@reference "@/assets/css/main.css";

	.link {
		@apply relative flex cursor-pointer items-center gap-2 py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full;
	}

	.exact-link {
		@apply after:w-full;
	}
</style>
