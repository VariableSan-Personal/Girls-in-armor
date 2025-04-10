<script lang="ts" setup>
	import LoginBg from '@/assets/images/auth/register-bg.jpg'
	import { z } from 'zod'

	definePageMeta({
		layout: 'auth',
	})

	const toast = useToast()
	const { t } = useI18n()

	type Schema = z.infer<typeof schema>
	const schema = z
		.object({
			username: z.string().min(1, t('errors.username-required')),
			email: z.string().email(t('errors.valid-email-required')),
			password: z.string().min(6, t('errors.password-min-length')),
			confirmPassword: z.string().min(6, t('errors.confirm-password-required')),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword'],
		})

	const form = reactive<Schema>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const errors = ref<Record<string, string>>({})

	const handleSubmit = async () => {
		clearValidationErrors()

		try {
			const validatedData = schema.parse(form)
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.errors.forEach((error) => {
					toast.add({
						color: 'error',
						description: error.message,
					})
				})
			}
		}
	}

	const clearValidationErrors = () => {
		errors.value = {}
	}
</script>

<template>
	<section class="relative h-screen w-full overflow-hidden">
		<div
			class="absolute inset-0 h-full w-full bg-cover bg-[70%] bg-no-repeat sm:bg-center"
			:style="{ backgroundImage: `url(${LoginBg})` }"
		>
			<div class="absolute inset-0 bg-black/20"></div>
		</div>

		<div class="relative z-10 flex h-full w-full items-center justify-center px-4">
			<UCard
				class="bg-main/30 w-full max-w-md space-y-6 overflow-hidden shadow-xl backdrop-blur-sm"
			>
				<div class="mb-4 space-y-1 text-center">
					<h1 class="text-2xl font-bold">
						{{ $t('create_account') }}
					</h1>
					<p class="text-neutral-400">{{ $t('sign_up_to_get_started') }}</p>
				</div>

				<UForm :schema="schema" :state="form" class="space-y-6" @submit="handleSubmit">
					<UFormField :label="$t('username')" name="username">
						<UInput
							v-model="form.username"
							:placeholder="$t('enter_your_username')"
							icon="i-heroicons-user"
							size="lg"
							class="w-full"
						/>
					</UFormField>

					<UFormField :label="$t('email')" name="email">
						<UInput
							v-model="form.email"
							type="email"
							:placeholder="$t('enter_your_email')"
							icon="i-heroicons-envelope"
							size="lg"
							class="w-full"
						/>
					</UFormField>

					<UFormField :label="$t('password')" name="password">
						<UInput
							v-model="form.password"
							type="password"
							:placeholder="$t('enter_your_password')"
							icon="i-heroicons-lock-closed"
							size="lg"
							class="w-full"
						/>
					</UFormField>

					<UFormField :label="$t('confirm_password')" name="confirmPassword">
						<UInput
							v-model="form.confirmPassword"
							type="password"
							:placeholder="$t('confirm_your_password')"
							icon="i-heroicons-lock-closed"
							size="lg"
							class="w-full"
						/>
					</UFormField>

					<UButton type="submit" block size="lg">
						{{ $t('sign_up') }}
					</UButton>

					<div class="space-x-2 text-center text-sm">
						<span class="text-neutral-400">{{ $t('already_have_account') }}</span>
						<NuxtLink :to="{ name: 'login' }" class="text-primary font-medium">
							{{ $t('sign_in') }}
						</NuxtLink>
					</div>
				</UForm>
			</UCard>
		</div>
	</section>
</template>
