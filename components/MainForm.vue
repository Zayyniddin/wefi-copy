<template>
	<div class="relative py-32 my-32">
		<img
			class="absolute top-0 left-0 w-full h-full object-cover z-10"
			src="@/assets/images/form-bg.png"
			alt="Background"
		/>

		<div
			class="relative z-20 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-40"
		>
			<div class="flex flex-col gap-4 max-w-xl">
				<div
					class="bg-white/20 p-7 rounded-full w-fit flex items-center justify-center"
				>
					<img src="@/assets/icons/message.svg" alt="icon" />
				</div>
				<p class="text-white font-medium text-4xl leading-snug">
					Let’s Connect — Your <br />
					Thoughts Matter
				</p>
				<p class="text-gray-300 text-xl">
					Suggestions and inquires can be sent here.
				</p>
			</div>

			<el-form
				class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
				label-position="top"
				:model="form"
			>
				<el-form-item label="Name">
					<el-input v-model="form.name" placeholder="i.e. John Doe" />
				</el-form-item>

				<el-form-item label="Email">
					<el-input v-model="form.email" placeholder="i.e. john@mail.com" />
				</el-form-item>

				<el-form-item label="Phone">
					<el-input v-model="form.phone" placeholder="i.e. 123-456-7890" />
				</el-form-item>

				<el-form-item label="Write your inquiry">
					<el-input
						type="textarea"
						:rows="3"
						v-model="form.message"
						placeholder="Enter your message"
					/>
				</el-form-item>

				<el-form-item>
					<button class="w-full text-white py-4 rounded-lg bg-primary text-lg">
						Contact Us
					</button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup>
const form = ref({
	name: '',
	email: '',
	phone: '',
	message: '',
})
</script>
