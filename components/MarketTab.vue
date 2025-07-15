<template>
	<div class="flex items-stretch h-full gap-4">
		<!-- Total MSMEs -->
		<div class="flex flex-col min-h-full max-w-[456px] gap-4 w-full">
			<div class="bg-white p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">
					Total number of registered active MSMEs
				</p>
				<p class="text-3xl font-bold mt-2">
					{{ formatNumber(customers_total) }}
				</p>
				<div class="mt-8">
					<div class="w-full bg-gray-200 h-4 rounded mt-1">
						<div
							class="h-4 rounded gradient-bar"
							:style="`width: ${customers?.women_percent || 0}%`"
						></div>
					</div>
					<p class="text-sm flex items-center gap-2 text-gray-400 mt-5">
						<span class="text-3xl text-[#1E1B39] font-bold"
							>{{ customers?.women_percent || 0 }}%</span
						>
						Women owned / led MSMEs
					</p>
				</div>
			</div>

			<!-- Donut Chart -->
			<div class="bg-white h-full w-full text-black p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">Statistics</p>
				<p class="font-medium text-black text-lg">Business type</p>
				<VChart :option="pieOption" class="!h-[320px] mx-auto !w-[370px]" />
				<div class="text-sm mt-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class="w-4 h-4 bg-[#3B8FF3] rounded-full"></div>
							<p class="text-sm text-[#615E83]">Individual entrepreneurs</p>
						</div>
						<p class="text-xl font-bold">
							{{ formatNumber(customers?.individual_count) || 0 }}
						</p>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class="w-4 h-4 bg-[#F29F67] rounded-full"></div>
							<p class="text-sm text-[#615E83]">Legal entities</p>
						</div>
						<p class="text-xl font-bold">
							{{ formatNumber(customers?.legal_count) || 0 }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-1 h-full gap-4">
			<!-- Line Chart -->
			<div class="bg-white rounded-lg shadow">
				<div class="flex items-start p-6 pb-0 justify-between">
					<div>
						<p class="text-gray-400 text-sm">Sales 2025</p>
						<p class="text-xl font-bold">
							$12.7k <span class="text-green-500 text-sm">▲ 1.3%</span>
						</p>
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
				<VChart
					v-if="orgMonthly.length > 0"
					:option="lineOption"
					class="!h-[334px] !w-[1000px]"
				/>
				<div v-else class="min-h-[334px] flex items-center justify-center">
					Loading...
				</div>
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
							<p class="text-xl font-bold mt-1">
								{{ formatNumber(customers.micro) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									Math.round((customers.micro / customers_total) * 100) || 0,
									'Micro'
								)
							"
							class="!h-[300px]"
						/>
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">Small business</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">Amount</p>
							<p class="text-xl font-bold mt-1">
								{{ formatNumber(customers.small) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									Math.round((customers.small / customers_total) * 100) || 0,
									'Small'
								)
							"
							class="!h-[300px]"
						/>
					</div>
					<div
						class="bg-white p-6 max-w-[335px] h-[310px] w-full rounded-lg shadow text-center"
					>
						<p class="text-left text-xl font-bold">Medium business</p>
						<div
							class="flex items-center mt-2 justify-between border-b border-[#E5E5EF]"
						>
							<p class="text-gray-400 text-sm">Amount</p>
							<p class="text-xl font-bold mt-1">
								{{ formatNumber(customers.medium) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									Math.round((customers.medium / customers_total) * 100) || 0,
									'Medium'
								)
							"
							class="!h-[300px]"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import 'echarts'
const { formatNumber } = useFormatNumber()
const props = defineProps({
	customers: {
		type: Array,
		default: () => [],
	},
	orgMonthly: {
		type: Array,
		default: () => [],
	},
})

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

const value = ref('')

const customers_total = computed(() => {
	return props.customers?.individual_count + props.customers?.legal_count
})
const pieOption = computed(() => ({
	color: ['#3B8FF3', '#F29F67'],
	title: {
		text: `{value|${formatNumber(
			(props.customers?.individual_count ?? 0) +
				(props.customers?.legal_count ?? 0)
		)}}\n{label|Total}`,
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
				{
					value: props.customers?.individual_count ?? 0,
					name: 'Individual entrepreneurs',
				},
				{ value: props.customers?.legal_count ?? 0, name: 'Legal entities' },
			],
		},
	],
}))

const lineOption = computed(() => {
	const data = Array.isArray(props.orgMonthly) ? props.orgMonthly : []

	const months = data.map(item => item.name)
	const values = data.map(item => item.cc)

	return {
		tooltip: { trigger: 'axis' },
		grid: {
			left: '3%',
			right: '6%',
			bottom: '3%',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: months,
		},
		yAxis: {
			type: 'value',
			position: 'right',
			axisLabel: { formatter: '${value}' },
		},
		series: [
			{
				data: values,
				type: 'line',
				smooth: true,
				lineStyle: { color: '#22c55e', width: 3 },
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{ offset: 0, color: '#bbf7d0' },
							{ offset: 1, color: '#ffffff' },
						],
					},
				},
			},
		],
	}
})

const gaugeOption = (value, label) => ({
	series: [
		{
			type: 'gauge',
			startAngle: 180,
			endAngle: 0,
			min: 0,
			max: 100,
			progress: {
				show: true,
				width: 18,
				roundCap: true,
				itemStyle: { color: '#3B8FF3' },
			},
			tooltip: {
				show: true,
				formatter: () => `${value}%<br/>Sales: $24,400`,
			},
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
			detail: {
				valueAnimation: true,
				formatter: () => `{value|${value}%}\n`,
				offsetCenter: ['5%', '-5%'],
				rich: {
					value: {
						fontSize: 34,
						fontWeight: 'bold',
						color: '#111827',
						lineHeight: 30,
					},
				},
			},
			data: [{ value }],
		},
	],
})
</script>

<style scoped>
.gradient-bar {
	background: linear-gradient(90deg, #018E20 0%, #007219 100%);
}
</style>
