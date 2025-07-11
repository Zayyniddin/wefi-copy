<template>
	<div class="flex items-stretch h-full gap-4">
		<!-- Total MSMEs -->
		<div class="flex flex-col min-h-full max-w-[456px] gap-4 w-full">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<p class="text-2xl font-medium">MSME deposits</p>
					<p class="text-3xl font-medium">410</p>
				</div>
				<div class="mt-8">
					<div class="w-full bg-gray-200 h-4 rounded mt-1">
						<div class="h-4 rounded gradient-bar" style="width: 27%"></div>
					</div>
					<div class="flex items-center justify-between mt-4">
						<p class="text-3xl text-[#1E1B39] font-bold">27%</p>
						<p class="text-3xl text-[#1E1B39] font-bold">3,348 mlrd</p>
					</div>
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">By gender</p>
						</div>
						<VChart
							:option="businessSizeChart"
							class="!w-[450px] !h-[110px] z-50"
						/>
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-xl text-[#615E83]">38%</p>
							</div>

							<div
								class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-xl text-[#615E83]">38%</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Donut Chart -->
			<div class="bg-white h-full text-black p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">Statistics</p>
				<p class="font-medium text-black text-lg">Deposit by Business type</p>
				<div>
					<div class="flex items-center justify-between mt-4 -mb-4">
						<p class="text-gray-400">Individual entrepreneurs</p>
						<p class="text-gray-400 text-xl">
							<span class="text-black">410</span>/740
						</p>
					</div>
					<VChart
						:option="businessSizeChart"
						class="!w-[450px] !h-[110px] z-50"
					/>
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Women</p>
							</div>
							<p class="text-xl text-[#615E83]">38%</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
							</div>
							<p class="text-xl text-[#615E83]">38%</p>
						</div>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between mt-4 -mb-4">
						<p class="text-gray-400">Legal entities</p>
						<p class="text-gray-400 text-xl">
							<span class="text-black">410</span>/740
						</p>
					</div>
					<VChart
						:option="businessSizeChart"
						class="!w-[450px] !h-[110px] z-50"
					/>
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Women</p>
							</div>
							<p class="text-xl text-[#615E83]">38%</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
							</div>
							<p class="text-xl text-[#615E83]">38%</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-1 h-full gap-4">
			<!-- Line Chart -->
			<div class="bg-white rounded-lg shadow">
				<div class="flex items-start p-6 pb-0 justify-between">
					<div>
						<p class="text-sm text-gray-500">Statistics</p>
						<p class="font-bold text-black text-lg border-[#E5E5EF]">Deposit</p>
					</div>
					<div class="flex items-center gap-2">
						<el-select
							v-model="value"
							placeholder="Region"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
						<el-select
							v-model="value"
							placeholder="Micro"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
						<el-select
							v-model="value"
							placeholder="2025"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</div>
				</div>
				<VChart :option="statsOption" class="!h-[400px] z-50" />
			</div>

			<div class="flex items-center gap-4 w-full">
				<!-- Micro / Small / Medium business -->
				<div class="flex items-center w-full gap-4">
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">Micro business</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">Amount</p>
							<p class="text-2xl font-bold mt-1">1,230</p>
						</div>
						<VChart :option="gaugeOption(48, 12)" class="!h-[300px]" />
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">Small business</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">Amount</p>
							<p class="text-2xl font-bold mt-1">1,230</p>
						</div>
						<VChart :option="gaugeOption(40, 23)" class="!h-[300px]" />
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">Medium business</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">Amount</p>
							<p class="text-2xl font-bold mt-1">1,230</p>
						</div>
						<VChart :option="gaugeOption(50, 30)" class="!h-[300px]" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import 'echarts'
const { generate } = useStackedChart()

const value = ref('')

const options = [
	{
		value: 'Option1',
		label: 'Option1',
	},
	{
		value: 'Option2',
		label: 'Option2',
	},
	{
		value: 'Option3',
		label: 'Option3',
	},
	{
		value: 'Option4',
		label: 'Option4',
	},
	{
		value: 'Option5',
		label: 'Option5',
	},
]

const pieOption = {
	color: ['#4A3AFF', '#018E20'],
	title: {
		text: '1,390\nTotal',
		left: 'center',
		top: 'center',
		textStyle: {
			fontSize: 18,
			fontWeight: 'bold',
			color: '#111827',
			align: 'center',
		},
	},
	tooltip: {
		trigger: 'item',
		formatter: '{b}: {c}',
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
				{ value: 410, name: 'Individual entrepreneurs' },
				{ value: 142, name: 'Legal entities' },
			],
		},
	],
}

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
		left: 90,
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

const gaugeOption = (menValue, womenValue) => {
	let total = menValue + womenValue

	if (total > 100) {
		const scale = 100 / total
		menValue = menValue * scale
		womenValue = womenValue * scale
		total = 100
	}

	return {
		tooltip: {
			trigger: 'item',
			formatter: params => {
				const emoji = params.seriesName === 'Men' ? '👨' : '👩'
				return `${emoji} ${params.seriesName}: ${params.value.toFixed(1)}%`
			},
		},
		series: [
			{
				type: 'gauge',
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				progress: { show: false },
				axisLine: {
					lineStyle: {
						width: 18,
						color: [[1, '#E5EAFC']],
					},
				},
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				pointer: { show: false },
				anchor: { show: false },
				title: { show: false },
				detail: { show: false },
				z: 1,
			},
			{
				name: 'Men',
				type: 'gauge',
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				progress: {
					show: true,
					width: 18,
					roundCap: true,
					itemStyle: { color: '#018E20' },
				},
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				pointer: { show: false },
				anchor: { show: false },
				title: { show: false },
				detail: { show: false },
				data: [{ value: menValue }],
				z: 2,
			},
			{
				name: 'Women',
				type: 'gauge',
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				progress: {
					show: true,
					width: 18,
					roundCap: true,
					itemStyle: { color: '#4A3AFF' },
				},
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				pointer: { show: false },
				anchor: { show: false },
				title: { show: false },
				detail: {
					valueAnimation: true,
					formatter: () =>
						`{value|${(menValue + womenValue).toFixed(
							1
						)}%}\n{label|Total Participants}`,
					offsetCenter: [0, '-20%'],
					rich: {
						value: {
							fontSize: 24,
							fontWeight: 'bold',
							color: '#111827',
							lineHeight: 30,
						},
						label: {
							fontSize: 14,
							color: '#6B7280',
						},
					},
				},
				data: [{ value: womenValue }],
				z: 3,
			},
		],
	}
}

// BUSINES SIZE CHART
const menData = [{ value: 65.3, name: 'Micro' }]

const womenData = [{ value: 20.3, name: 'Micro' }]

const businessSizeChart = generate({
	seriesData: [
		{
			name: 'Men',
			data: menData,
			style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
		},
		{ name: 'Women', data: womenData, style: { color: '#018E20' } },
	],
	barWidth: 40,
	addGraphic: false,
	hideYAxisLabels: true,
	addRemaining: false,
})
</script>

<style scoped>
.gradient-bar {
	background: linear-gradient(90deg, #018e20 0%, #007219 100%);
}
</style>
