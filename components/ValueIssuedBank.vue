<template>
	<div class="flex flex-col gap-4">
		<div
			class="bg-white text-black p-6 rounded-lg shadow flex items-center justify-between"
		>
			<div class="flex items-center gap-4">
				<p
					:class="[
						'cursor-pointer pb-1 font-bold transition-colors duration-400',
						activeTab === 'value_issued'
							? 'border-b-2 border-black text-black'
							: 'border-b-2 border-b-transparent text-gray-500',
					]"
					@click="activeTab = 'value_issued'"
				>
					Value of issued bank loans
				</p>

				<p
					:class="[
						'cursor-pointer pb-1 font-bold transition-colors duration-400',
						activeTab === 'value_outstanding'
							? 'border-b-2 border-black text-black'
							: 'border-b-2 border-b-transparent text-gray-500',
					]"
					@click="activeTab = 'value_outstanding'"
				>
					Value of outstanding bank loans
				</p>
			</div>
			<div class="flex items-center gap-2">
				<div
					class="flex items-center gap-2 rounded-lg border-[#E5E5EF] border p-2"
				>
					<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
					<p class="text-sm text-[#615E83]">Men</p>
				</div>
				<div
					class="flex items-center gap-2 rounded-lg border-[#E5E5EF] border p-2"
				>
					<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
					<p class="text-sm text-[#615E83]">Women</p>
				</div>
			</div>
		</div>
		<div class="flex gap-4 items-stretch">
			<div class="grid grid-cols-1 h-full w-full gap-4">
				<div class="bg-white h-full text-black p-6 rounded-lg shadow">
					<p class="text-sm text-gray-500">Statistics</p>
					<p
						class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]"
					>
						By gender
					</p>
					<VChart :option="pieOption" class="!h-[350px] mx-auto !w-[400px]" />
					<div class="text-sm mt-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
							</div>
							<p class="text-xl font-bold">
								{{ formatNumber(selectedData.men_sum) }} mln
							</p>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Women</p>
							</div>
							<p class="text-xl font-bold">
								{{ formatNumber(selectedData.women_sum) }} mln
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="h-full w-full">
				<div class="p-6 rounded-lg bg-white shadow w-full">
					<p class="text-xl font-medium border-b pb-2 border-[#E5E5EF]">
						By business type
					</p>
					<VChart
						:option="businessTypeChart"
						class="!w-[500px] !h-[150px] z-50"
					/>
				</div>

				<div class="p-6 mt-4 rounded-lg bg-white shadow w-full">
					<p class="text-xl font-medium border-b pb-2 border-[#E5E5EF]">
						By business size
					</p>
					<VChart
						:option="businessSizeChart"
						class="!w-[500px] !h-[200px] z-50"
					/>
				</div>
			</div>
		</div>
		<div class="flex gap-4">
			<div class="p-6 rounded-lg bg-white shadow">
				<p class="text-sm text-gray-500">Statistics</p>
				<p
					class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]"
				>
					Credits
				</p>
				<VChart :option="statsOption" class="!w-[550px] !h-[400px] z-50" />
			</div>
			<div class="p-6 rounded-lg bg-white shadow">
				<p class="text-xl font-medium">By sectors</p>
				<div
					class="flex items-center justify-between border-b pb-1 border-[#E5E5EF] mt-2 text-xs"
				>
					<p>Sectors</p>
					<p>MSME Credits</p>
				</div>
				<VChart :option="sectorsChart" class="!w-[400px] !h-[385px] z-50" />
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	creditLoan: {
		type: Array,
		default: () => [],
	},
})
const { generate } = useStackedChart()
const { formatNumber } = useFormatNumber()
const activeTab = ref('value_issued')

const selectedData = computed(() => {
	return activeTab.value === 'value_issued' ? props.creditLoan : props.data
})

const pieOption = computed(() => ({
	color: ['#018E20', '#4A3AFF'],
	title: {
		text: `{value|${formatNumber(
			(selectedData.value?.women_sum ?? 0) + (selectedData.value?.men_sum ?? 0)
		)}}\n{label|Billion}`,
		left: 'center',
		top: 'center',
		textStyle: {
			rich: {
				value: {
					fontSize: 20,
					fontWeight: 'bold',
					color: '#111827',
					align: 'center',
				},
				label: {
					fontSize: 14,
					color: '#6B7280',
					align: 'center',
				},
			},
		},
	},
	tooltip: {
		trigger: 'item',
		formatter: params => {
			const color = params.color
			const name = params.name
			const value = formatNumber(params.value)
			const percent = Math.round(params.percent)

			return `
			<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
				<div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
				<b>${name}</b>
			</div>
			${value} (${percent}%)
		`
		},
	},
	series: [
		{
			name: 'Business Type',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: true,
				position: 'outside',
				formatter: params => `${Math.round(params.percent)}%`,
				textStyle: {
					fontSize: 16,
					fontWeight: 'bold',
					color: '#111827',
				},
			},
			padAngle: 5,
			itemStyle: {
				borderRadius: 10,
			},
			labelLine: {
				show: true,
				smooth: 0.2,
			},
			data: [
				{
					value: Math.round(selectedData.value?.men_sum ?? 0),
					name: 'Men',
				},
				{ value: Math.round(selectedData.value?.women_sum ?? 0) ?? 0, name: 'Women' },
			],
		},
	],
}))

// BUSINESS TYPE CHART
const businessTypeChart = computed(() =>
  generate({
    seriesData: [
      {
        name: 'Women',
        data: [
          {
            value: selectedData.value?.legal_women_percent ?? 0,
            name: 'Legal en.',
          },
          {
            value: selectedData.value?.individual_women_percent ?? 0,
            name: 'Individual',
          },
        ],
        style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
      },
      {
        name: 'Men',
        data: [
          {
            value: selectedData.value?.legal_men_percent ?? 0,
            name: 'Legal en.',
          },
          {
            value: selectedData.value?.individual_men_percent ?? 0,
            name: 'Individual',
          },
        ],
        style: { color: '#018E20' },
      },
    ],
    totalsPercent: [
      selectedData.value?.individual_percent ?? 0,
      selectedData.value?.legal_percent ?? 0,
    ],
  })
)


// BY SECTOR CHART
const sectorMenData = [
	{ value: 10.3, name: 'Other' },
	{ value: 11.3, name: 'Trade' },
	{ value: 10.1, name: 'Services' },
	{ value: 10.1, name: 'Manufacturing' },
	{ value: 10.1, name: 'Construction' },
	{ value: 11.3, name: 'Agriculture' },
	{ value: 65.3, name: 'All sectors' },
]

const sectorWomenData = [
	{ value: 65.3, name: 'Other' },
	{ value: 11.3, name: 'Trade' },
	{ value: 10.1, name: 'Services' },
	{ value: 10.1, name: 'Manufacturing' },
	{ value: 25.6, name: 'Construction' },
	{ value: 45.2, name: 'Agriculture' },
	{ value: 20.3, name: 'All sectors' },
]

const sectorsChart = generate({
	seriesData: [
		{
			name: 'All sectors',
			data: sectorMenData,
			style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
		},
		{ name: 'Agriculture', data: sectorWomenData, style: { color: '#018E20' } },
	],
})

// BUSINESS SIZE CHART
const businessSizeChart = computed(() =>
  generate({
    seriesData: [
      {
        name: 'Women',
        data: [
          { value: selectedData.value?.micro_women_percent ?? 0, name: 'Micro' },
          { value: selectedData.value?.small_women_percent ?? 0, name: 'Small' },
          { value: selectedData.value?.medium_women_percent ?? 0, name: 'Medium' },
        ],
        style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
      },
      {
        name: 'Men',
        data: [
          { value: selectedData.value?.micro_men_percent ?? 0, name: 'Micro' },
          { value: selectedData.value?.small_men_percent ?? 0, name: 'Small' },
          { value: selectedData.value?.medium_men_percent ?? 0, name: 'Medium' },
        ],
        style: { color: '#018E20' },
      },
    ],
    totalsPercent: [
      selectedData.value?.medium_percent ?? 0,
      selectedData.value?.small_percent ?? 0,
      selectedData.value?.micro_percent ?? 0,
    ],
  })
)


//CREDIT STATISTICS
const statsOption = {
	tooltip: {
		trigger: 'axis',
		formatter: params => {
			const point = params[0]
			return `${point.axisValue}<br/>$${point.value.toLocaleString()}`
		},
		backgroundColor: '#2D2E54',
		borderRadius: 6,
		padding: 10,
		textStyle: {
			color: '#fff',
			fontSize: 12,
		},
	},
	xAxis: {
		type: 'category',
		data: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
		axisLine: { show: false },
		axisTick: { show: false },
		axisLabel: {
			color: '#6B7280',
			fontWeight: 500,
		},
	},
	yAxis: {
		type: 'log',
		logBase: 10,
		axisLine: { show: false },
		axisTick: { show: false },
		axisLabel: {
			color: '#6B7280',
		},
		splitLine: {
			lineStyle: {
				type: 'dashed',
				color: '#E5E7EB',
			},
		},
	},
	grid: {
		left: 40,
		right: 30,
		top: 60,
		bottom: 40,
	},
	series: [
		{
			name: 'Series A',
			type: 'line',
			data: [120000, 540000, 200000, 100000, 80000, 130000, 500000],
			smooth: true,
			lineStyle: {
				color: '#10B981', // зелёный
				width: 3,
				type: 'dashed',
			},
			itemStyle: {
				color: '#10B981',
			},
			symbol: 'circle',
			symbolSize: 6,
			emphasis: {
				scale: true,
			},
		},
		{
			name: 'Series B',
			type: 'line',
			data: [300000, 11000000, 1000000, 600000, 1200000, 800000, 2000000],
			smooth: true,
			lineStyle: {
				color: '#6366F1', // синий
				width: 3,
				type: 'dashed',
			},
			itemStyle: {
				color: '#6366F1',
			},
			symbol: 'none',
		},
	],
}
</script>
