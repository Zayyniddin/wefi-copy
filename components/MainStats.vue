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
				{{ $t('numberOfOutstandingMsmeLoans') }}
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
				{{ $t('outstandingShareOfWomenInMsme') }}
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
				{{ $t('valueOfOutstandingMsmeLoans') }}
			</p>
		</div>
	</div>
</template>

<script setup>
import Vue3AutoCounter from 'vue3-autocounter'

const { data } = defineProps(['data'])
</script>
