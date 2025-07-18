<template>
	<div class="f-container my-32 px-4 mx-auto">
		<p class="text-2xl font-bold mb-6 text-center">
			Regional overview of key financial inclusion <br />
			indicators for WSME
		</p>
		<div class="w-full justify-between flex items-start gap-16">
			<VChart :option="option" class="!w-[915px] !h-[600px]" />
			<div class="flex flex-col max-w-[400px] w-full gap-4">
				<div class="rounded-lg shadow-lg p-4">
					<p class="text-[#013F21] text-xl">Republic of Uzbekistan</p>
					<div class="flex items-center justify-between">
						<p class="text-[#013F21] text-sm">Population</p>
						<p class="text-primary font-bold text-xl">
							{{ formatNumber(37657647) }}
						</p>
					</div>
				</div>

				<div class="rounded-lg flex flex-col gap-2 shadow-lg p-4">
					<div
						class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
					>
						<div class="flex items-center gap-4">
							<img src="@/assets/icons/regions-num.svg" alt="" />
							<p class="font-bold text-sm">Number of Regions</p>
						</div>
						<p class="text-primary font-bold text-2xl">14</p>
					</div>

					<div
						class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
					>
						<div class="flex items-center gap-4">
							<img src="@/assets/icons/districts-num.svg" alt="" />
							<p class="font-bold text-sm">Number of Districts</p>
						</div>
						<p class="text-primary font-bold text-2xl">208</p>
					</div>

					<div
						class="flex items-center justify-between bg-[#EDF8EE] p-3 rounded-lg"
					>
						<div class="flex items-center gap-4">
							<img src="@/assets/icons/communities-num.svg" alt="" />
							<p class="font-bold text-sm">Number of communities</p>
						</div>
						<p class="text-primary font-bold text-2xl">
							{{ formatNumber(9453) }}
						</p>
					</div>
				</div>

				<div class="p-4 rounded-lg shadow-lg flex flex-col gap-4">
					<p class="text-primary text-xl">MSME</p>
					<div class="flex items-center justify-between">
						<p>W MSME</p>
						<p class="text-primary font-bold text-xl">
							{{ formatNumber(msme.women_total_asum?.toFixed(0)) }}
						</p>
					</div>
					<div class="flex items-center justify-between">
						<p>Credit</p>
						<p class="text-primary font-bold text-xl">
							{{ formatNumber(678) }} mln
						</p>
					</div>
					<div class="flex items-center justify-between">
						<p>Deposit</p>
						<p class="text-primary font-bold text-xl">
							{{ formatNumber(105) }}
						</p>
					</div>
					<div class="flex items-center justify-between">
						<p>NPL</p>
						<p class="text-primary font-bold text-xl">
							{{ formatNumber(105) }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full mt-4">
			<p class="text-sm text-gray-600 mb-2">Number of entrepreneurs by the gods</p>
			<div class="relative w-full h-4 overflow-hidden bg-gray-200">
				<div
					class="absolute inset-0"
					style="
						background: linear-gradient(
							to right,
							#a90000 0%,
							#915006 10%,
							#ffbb00 30%,
							#35c20a 50%,
							#0dc900 70%,
							#009e0a 90%,
							#008029 100%
						);
					"
				></div>
				<div class="absolute inset-0 flex justify-between">
					<span
						v-for="i in 11"
						:key="i"
						class="w-[1px] h-full bg-white opacity-60"
					></span>
				</div>
			</div>
			<div class="flex justify-between text-xs text-gray-500 mt-1">
				<span v-for="i in 11" :key="i">{{ (i - 1) * 10 }}%</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts'
import uzGeo from '../assets/data/uzbekistan.json'
const { formatNumber } = useFormatNumber()

const props = defineProps({
	orgRegion: {
		type: Array,
		default: () => [],
	},
	msme: {
		type: Array,
		default: () => [],
	},
})

const option = ref({})

watch(
	() => props.orgRegion,
	newVal => {
		if (!option.value.series) return

		option.value.series[0].data = newVal.map(region => ({
			name: region.name,
			value: region.cc,
		}))
	},
	{ immediate: true }
)

onMounted(() => {
	echarts.registerMap('uzbekistan', uzGeo)

	const regions = props.orgRegion.map(region => ({
		name: region.name,
		value: region.cc,
	}))

	option.value = {
		tooltip: { trigger: 'item', formatter: '{b}: {c}' },
		toolbox: {
			show: true,
			orient: 'vertical',
			left: 'right',
			top: 'top',
			feature: {
				dataView: { readOnly: true },
				restore: {},
				saveAsImage: {},
			},
		},
		visualMap: {
			show: false,
			min: 0,
			max: 10000,
			text: ['Number of entrepreneurs by the gods'],
			orient: 'horizontal',
			left: 80,
			bottom: 20,
			calculable: true,
			inRange: {
				color: [
					'#A90000',
					'#915006',
					'#FFBB00',
					'#35C20A',
					'#0DC900',
					'#009E0A',
					'#008029',
				],
			},
		},
		series: [
			{
				name: 'Uzbekistan',
				type: 'map',
				map: 'uzbekistan',
				roam: false,
				emphasis: { label: { show: true } },
				data: regions,
			},
		],
	}
})
</script>
