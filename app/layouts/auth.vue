<template>
	<div class="relative">
		<div class="absolute top-0 left-0 flex w-full items-center bg-transparent">
			<div class="container mx-auto">
				<NuxtLink to="/" class="mr-4 transition-colors duration-200 hover:text-gray-400">
					<Icon size="24" name="uil:angle-left-b" />
				</NuxtLink>
			</div>
		</div>

		<slot></slot>
	</div>
</template>
