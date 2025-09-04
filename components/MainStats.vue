<template>
	<div class="flex items-center justify-center gap-24 my-32">
		<div class="flex items-center gap-4">
			<Vue3AutoCounter
				:startAmount="0"
				:endAmount="347492"
				:duration="2.5"
				prefix=""
				suffix=""
				separator=","
				:autoinit="true"
				class="text-5xl font-bold !w-[180px]"
			/>
			<p class="text-gray-400 text-sm max-w-[180px] w-full">
				Number of outstanding MSME loans
			</p>
		</div>

		<div class="flex items-center gap-4">
			<Vue3AutoCounter
				:startAmount="0"
				:endAmount="11"
				:duration="2.5"
				prefix=""
				suffix=" %"
				separator=","
				:autoinit="true"
				class="text-5xl font-bold !w-[120px]"
			/>
			<p class="text-gray-400 text-sm max-w-[180px] w-full">
				Outstanding share of women in MSME
			</p>
		</div>

		<div class="flex items-center gap-4">
			<Vue3AutoCounter
				:startAmount="0"
				:endAmount="203"
				:duration="2.5"
				prefix=""
				suffix=" trln"
				separator=","
				:autoinit="true"
				class="text-5xl font-bold !w-[180px]"
			/>
			<p class="text-gray-400 text-sm max-w-[150px] w-full">
				Value of outstanding MSME loans
			</p>
		</div>
	</div>
</template>

<script setup>
import Vue3AutoCounter from 'vue3-autocounter'

const { data } = defineProps(['data'])
</script>
