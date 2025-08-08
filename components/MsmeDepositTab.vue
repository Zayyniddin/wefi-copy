<template>
	<div class="flex items-stretch h-full gap-4">
		<!-- Total MSMEs -->
		<div class="flex flex-col min-h-full max-w-[456px] gap-4 w-full">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<p class="text-2xl font-medium">MSME deposits</p>
					<p class="text-3xl font-medium">
						{{ formatNumber(deposit.total_count) }}
					</p>
				</div>
				<div class="mt-8">
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">By gender</p>
						</div>
						<VChart :option="genderChart" class="!w-[450px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-xl text-[#615E83]">
									{{ deposit.women_percent || 0 }}%
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-xl text-[#615E83]">
									{{ deposit.men_percent || 0 }}%
								</p>
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
							<!-- <span class="text-black">410</span>/740 -->
						</p>
					</div>
					<VChart
						:option="individualChart"
						class="!w-[450px] !h-[110px] z-50"
					/>
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Women</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.individual_women_pct || 0 }}%
							</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.individual_men_pct || 0 }}%
							</p>
						</div>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between mt-10 -mb-4">
						<p class="text-gray-400">Legal entities</p>
						<p class="text-gray-400 text-xl">
							<!-- <span class="text-black">410</span>/740 -->
						</p>
					</div>
					<VChart :option="legalChart" class="!w-[450px] !h-[110px] z-50" />
					<div class="flex items-center gap-2 -mt-8">
						<div
							class="flex items-center w-full justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Women</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.legal_women_pct || 0 }}%
							</p>
						</div>

						<div
							class="flex items-center gap-2 w-full justify-between rounded-lg border-[#E5E5EF] border p-2"
						>
							<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
							</div>
							<p class="text-xl text-[#615E83]">
								{{ deposit.legal_men_pct || 0 }}%
							</p>
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
							clearable
							@change="setFilter"
							v-model="selectedRegion"
							placeholder="Region"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in regions"
								:key="item.id"
								:label="item.full_name"
								:value="item.id"
							/>
						</el-select>
						<el-select
							clearable
							@change="setFilter"
							v-model="selectedBusiness"
							placeholder="Size"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in microOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>

						<el-select
							clearable
							@change="setFilter"
							v-model="selectedMonth"
							placeholder="Month"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in months"
								:key="item.id"
								:label="item.name"
								:value="item.id"
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
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.micro_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.micro_men_pct ?? 0,
									deposit.micro_women_pct ?? 0,
									deposit.micro_sum_pct ?? 0,
									deposit.micro_women_sum ?? 0,
									deposit.micro_men_sum ?? 0
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
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.small_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.small_men_pct ?? 0,
									deposit.small_women_pct ?? 0,
									deposit.small_sum_pct ?? 0,
									deposit.small_women_sum ?? 0,
									deposit.small_men_sum ?? 0,
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
							<p class="text-2xl font-bold mt-1">
								{{ formatNumber(deposit.medium_count) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									deposit.medium_men_pct ?? 0,
									deposit.medium_women_pct ?? 0,
									deposit.medium_sum_pct ?? 0,
									deposit.medium_women_sum ?? 0,
									deposit.medium_men_sum ?? 0,
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
const { generate } = useStackedChart()
const { formatNumber } = useFormatNumber()
const props = defineProps({
	months: {
		type: Array,
		default: () => [],
	},
})
const $axios = useAxios()
const deposit = ref([])
const depositGraph = ref([])
const selectedRegion = ref(null)
const regions = ref([])
const selectedMonth = ref(null)
const selectedBusiness = ref(null)
const microOptions = [
	{ value: 1, label: 'MICRO' },
	{ value: 2, label: 'SMALL' },
	{ value: 3, label: 'MEDIUM' },
	{ value: 4, label: 'LARGE' },
	{ value: 5, label: 'SOLO' },
]

onMounted(() => {
	getDeposit()
	getDepositGraph()
	getRegions()
})

function setFilter() {
	getDepositGraph({
		month: selectedMonth.value,
		region_id: selectedRegion.value,
		business_type: selectedBusiness.value,
	})
}

function getDeposit() {
	$axios
		.get('api/v1/wefi/dashboard/deposit')
		.then(res => {
			deposit.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getDepositGraph(params = {}) {
	$axios
		.get('api/v1/wefi/dashboard/deposite_graph', { params })
		.then(res => {
			depositGraph.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getRegions() {
	$axios
		.get('api/v1/resp/regions_lists', {
			headers: {
				Authorization: 'Basic YXV0aF9hcGlfdXNlcjpGQVJFQ21uS3VXTDB4QW8',
			},
		})
		.then(res => {
			regions.value = res.data.data.region
		})
		.catch(error => {
			console.error(error)
		})
}

const statsOption = computed(() => {
	const filtered = Array.isArray(depositGraph.value)
		? depositGraph.value.filter(
				item => item?.month !== null && item?.month !== undefined
		  )
		: []

	const months = filtered.map(item => item.month?.toString?.() ?? '')
	const womenData = filtered.map(item => item?.women_asum ?? 0)
	const menData = filtered.map(item => item?.men_asum ?? 0)

	return {
		tooltip: {
			trigger: 'axis',
			formatter: params => {
				const lines = params
					.map(p => {
						const color = p.color // возьмёт цвет из `itemStyle`
						return `
					<div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
						<div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
						<span>${
							p.seriesName
						}: <span style="font-weight: bold;">${p.value.toLocaleString()} sum</span></span>
					</div>
				`
					})
					.join('')

				return `
			<div style="padding: 4px 6px; font-size: 13px;">
				<div style="font-weight: bold; margin-bottom: 8px;">Month: ${params[0].axisValue}</div>
				${lines}
			</div>
		`
			},
			backgroundColor: '#fff', // белый фон
			borderColor: '#E5E7EB',
			borderWidth: 1,
			borderRadius: 6,
			padding: 10,
			textStyle: {
				color: '#111827', // почти черный
				fontSize: 13,
			},
		},
		xAxis: {
			type: 'category',
			data: months,
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
				formatter: value => {
					if (value >= 1e12) return `${(value / 1e12).toFixed(0)} T`
					if (value >= 1e9) return `${(value / 1e9).toFixed(0)} B`
					if (value >= 1e6) return `${(value / 1e6).toFixed(0)} M`
					if (value >= 1e3) return `${(value / 1e3).toFixed(0)} K`
					return value
				},
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: '#E5E7EB',
				},
			},
		},

		grid: {
			left: 60,
			right: 30,
			top: 60,
			bottom: 40,
		},
		series: [
			{
				name: 'Women',
				type: 'line',
				data: womenData,
				smooth: true,
				lineStyle: {
					color: '#F29F67',
					width: 3,
					type: 'dashed',
				},
				itemStyle: {
					color: '#F29F67',
				},
				symbol: 'circle',
				symbolSize: 6,
				emphasis: {
					scale: true,
				},
			},
			{
				name: 'Men',
				type: 'line',
				data: menData,
				smooth: true,
				lineStyle: {
					color: '#3B8FF3',
					width: 3,
					type: 'dashed',
				},
				itemStyle: {
					color: '#3B8FF3',
				},
				symbol: 'circle',
				symbolSize: 6,
				emphasis: {
					scale: true,
				},
			},
		],
	}
})

const gaugeOption = (menPct, womenPct, sumPct, womenSum, menSum) => {
	let totalShare = menPct + womenPct
	if (totalShare === 0) totalShare = 1

	const menValue = (menPct / totalShare) * sumPct
	const womenValue = (womenPct / totalShare) * sumPct

	return {
		animationDuration: 1000,
		animationEasing: 'cubicOut',
		tooltip: {
			trigger: 'item',
			formatter: params => {
				const isMen = params.seriesName === 'Men'
				const originalPct = isMen ? menPct : womenPct
				const sumAmount = params.data?.sumAmount ?? null
				const color = isMen ? '#3B8FF3' : '#F29F67'

				return `
				<div style="font-size: 13px; line-height: 1.6; color: #000;">
					<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
						<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span>
						<b>${params.seriesName}</b>
					</div>
					<div style="display: flex; gap: 4px; margin-bottom: 2px;">
						<span>• Percentage:</span>
						<span style="font-weight: bold;">${originalPct.toFixed(1)}%</span>
					</div>
					${
						sumAmount !== null
							? `<div style="display: flex; gap:4px;">
									<span>• Sum:</span>
									<span style="font-weight: bold;">${sumAmount.toLocaleString()}</span>
								</div>`
							: ''
					}
				</div>
			`
			},
		},
		series: [
			{
				// background
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
					itemStyle: { color: '#3B8FF3' },
				},
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				pointer: { show: false },
				anchor: { show: false },
				title: { show: false },
				detail: { show: false },
				data: [{ value: menValue, sumAmount: menSum }],
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
					itemStyle: { color: '#F29F67' },
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
						`{value|${sumPct?.toFixed(1) ?? 0}%}\n{label|Total Participants}`,
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
				data: [{ value: womenValue, sumAmount: womenSum }],
				z: 3,
			},
		],
	}
}

// BUSINES SIZE CHART

const genderChart = computed(() =>
	generate({
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: deposit.value.women_percent ?? 0,
						count: deposit.value.women_count ?? 0,
						sum: deposit.value.women_sum ?? 0,
						name: 'women',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: deposit.value.men_percent ?? 0,
						count: deposit.value.men_count ?? 0,
						sum: deposit.value.men_sum ?? 0,
						name: 'men',
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)

const individualChart = computed(() =>
	generate({
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: deposit.value.individual_women_pct ?? 0,
						count: deposit.value.individual_women_count ?? 0,
						sum: deposit.value.individual_women_sum ?? 0,
						name: 'women',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: deposit.value.individual_men_pct ?? 0,
						count: deposit.value.individual_men_count ?? 0,
						sum: deposit.value.individual_men_sum ?? 0,
						name: 'men',
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)

const legalChart = computed(() =>
	generate({
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: deposit.value.legal_women_pct ?? 0,
						count: deposit.value.legal_women_count ?? 0,
						sum: deposit.value.legal_women_sum ?? 0,
						name: 'women',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: deposit.value.legal_men_pct ?? 0,
						count: deposit.value.legal_men_count ?? 0,
						sum: deposit.value.legal_men_sum ?? 0,
						name: 'men',
					},
				],
				style: { color: '#3B8FF3' },
			},
		],
		barWidth: 40,
		addGraphic: false,
		hideYAxisLabels: true,
	})
)
</script>

<style scoped>
.gradient-bar {
	background: linear-gradient(90deg, #018e20 0%, #007219 100%);
}
</style>
