<script lang="ts" setup></script>

<template>
	<div class="relative flex min-h-screen w-full flex-col pb-10">
		<Header />

		<Drawer />

		<main class="flex-1">
			<slot></slot>
		</main>
	</div>
</template>
