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
							:style="`width: ${data?.women_percent || 0}%`"
						></div>
					</div>
					<p class="text-sm flex items-center gap-2 text-gray-400 mt-5">
						<span class="text-3xl text-[#1E1B39] font-bold"
							>{{ data?.women_percent || 0 }}%</span
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
							{{ formatNumber(data?.individual_count) || 0 }}
						</p>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class="w-4 h-4 bg-[#F29F67] rounded-full"></div>
							<p class="text-sm text-[#615E83]">Legal entities</p>
						</div>
						<p class="text-xl font-bold">
							{{ formatNumber(data?.legal_count) || 0 }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col flex-1 h-full gap-4">
			<!-- Line Chart -->
			<div class="bg-white rounded-lg shadow">
				<div class="flex items-start p-6 pb-0 justify-end">
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
							v-model="selectedYear"
							placeholder="Year"
							size="small"
							style="width: 160px"
						>
							<el-option
								v-for="item in yearOptions"
								:key="item"
								:label="item"
								:value="item"
							/>
						</el-select>
					</div>
				</div>
				<VChart
					v-if="lineData && lineData.length > 0"
					:option="lineOption"
					class="!h-[334px] !w-[1000px]"
				/>
				<div
					v-else
					class="min-h-[334px] flex items-center justify-center text-[#615E83] text-sm"
				>
					{{ lineData === null ? 'Loading...' : 'No data' }}
				</div>
			</div>

			<div class="flex items-center gap-4 w-full">
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
								{{ formatNumber(data.micro) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									data.micro_men_percent ?? 0,
									data.micro_women_percent ?? 0,
									data.micro_percent ?? 0,
									data.micro_women ?? 0,
									data.micro_men ?? 0,
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
								{{ formatNumber(data.small) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									data.small_men_percent ?? 0,
									data.small_women_percent ?? 0,
									data.small_percent ?? 0,
									data.small_women ?? 0,
									data.small_men ?? 0,
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
								{{ formatNumber(data.medium) }}
							</p>
						</div>
						<VChart
							:option="
								gaugeOption(
									data.medium_men_percent ?? 0,
									data.medium_women_percent ?? 0,
									data.medium_percent ?? 0,
									data.medium_women ?? 0,
									data.medium_men ?? 0,
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
// PROPS
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

// MOUNTED
onMounted(() => {
	getData()
	getLineData()
	getRegions()
})

// DATA
const $axios = useAxios()
const emit = defineEmits(['filter-change'])
const data = ref([])
const lineData = ref(null)
const regions = ref([])
const selectedRegion = ref(null)
const selectedYear = ref(null)
const selectedBusiness = ref(null)

const currentYear = new Date().getFullYear()
const yearOptions = Array.from(
	{ length: currentYear - 2019 },
	(_, i) => 2020 + i
)
const microOptions = [
	{ value: 1, label: 'MICRO' },
	{ value: 2, label: 'SMALL' },
	{ value: 3, label: 'MEDIUM' },
]

// METHODS
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

function getData() {
	$axios
		.get('api/v1/wefi/dashboard/customers')
		.then(res => {
			data.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function getLineData(params = {}) {
	$axios
		.get('api/v1/wefi/dashboard/org_monthly', { params })
		.then(res => {
			lineData.value = res.data.data
		})
		.catch(error => {
			console.error(error)
		})
}

function setFilter() {
	getLineData({
		year: selectedYear.value,
		region_id: selectedRegion.value,
		business_type: selectedBusiness.value,
	})
}

// COMPUTED
const customers_total = computed(() => {
	return data.value?.individual_count + data.value?.legal_count
})
const pieOption = computed(() => ({
	color: ['#3B8FF3', '#F29F67'],
	title: {
		text: `{value|${formatNumber(
			(data.value?.individual_count ?? 0) + (data.value?.legal_count ?? 0)
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
					value: data.value?.individual_count ?? 0,
					name: 'Individual entrepreneurs',
				},
				{ value: data.value?.legal_count ?? 0, name: 'Legal entities' },
			],
		},
	],
}))

const lineOption = computed(() => {
	const months = lineData.value.map(item => item.name)
	const values = lineData.value.map(item => item.cc)

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
			axisLabel: { formatter: '{value}' },
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

const gaugeOption = (menPct, womenPct, sumPct, womenSum, menSum) => {
	// нормализация
	menPct = Number(menPct) || 0;
	womenPct = Number(womenPct) || 0;
	sumPct = Number(sumPct);
	if (!isFinite(sumPct)) sumPct = 0;
	sumPct = Math.max(0, Math.min(100, sumPct)); // clamp 0..100

	const totalShare = menPct + womenPct;
	const filledAngle = (sumPct / 100) * 180; // сколько градусов заполнено из полукруга
	const menAngle = totalShare > 0 ? (menPct / totalShare) * filledAngle : 0;
	const womenAngle = totalShare > 0 ? (womenPct / totalShare) * filledAngle : 0;
	const remainderFilledAngle = Math.max(0, filledAngle - menAngle - womenAngle); // на случай погрешностей
	const fillerAngle = Math.max(0, 360 - filledAngle); // прозрачная нижняя половина

	// защитим от маленьких дробей (чтобы сумма = 360)
	const sumAngles = menAngle + womenAngle + remainderFilledAngle + fillerAngle;
	const normalizeFactor = sumAngles > 0 ? 360 / sumAngles : 1;

	const menVal = menAngle * normalizeFactor;
	const womenVal = womenAngle * normalizeFactor;
	const remVal = remainderFilledAngle * normalizeFactor;
	const fillerVal = fillerAngle * normalizeFactor;

	return {
		animationDuration: 1000,
		animationEasing: 'cubicOut',
		tooltip: {
			trigger: 'item',
			formatter: params => {
				if (!params || !params.name) return '';
				if (params.name === 'Filled remainder' || params.name === 'invisible') return '';
				const isMen = params.name === 'Men';
				const originalPct = isMen ? menPct : womenPct;
				const sumAmount = isMen ? menSum : womenSum;
				const color = isMen ? '#3B8FF3' : '#F29F67';

				return `
					<div style="font-size:13px;line-height:1.6;color:#000;">
						<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
							<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span>
							<b>${params.name}</b>
						</div>
						<div style="display:flex;gap:6px;margin-bottom:4px;">
							<span>• Percentage:</span>
							<span style="font-weight:bold;">${originalPct.toFixed(1)}%</span>
						</div>
						${
							sumAmount != null
								? `<div style="display:flex;gap:6px;"><span>• Sum:</span><span style="font-weight:bold;">${Number(sumAmount).toLocaleString()}</span></div>`
								: ''
						}
					</div>
				`;
			},
		},
		series: [
			// фон: серый полукруг (чтобы была видна пустая часть сверху)
			{
				type: 'pie',
				startAngle: 180,
				radius: ['72%', '88%'],
				center: ['50%', '62%'],
				hoverAnimation: false,
				silent: true,
				label: { show: false },
				data: [
					{ value: 180, itemStyle: { color: '#E5EAFC' } }, // верхняя половина фон
					{ value: 180, itemStyle: { color: 'transparent' } }, // нижняя прозрачная
				],
			},
			// foreground: men / women / remainderFilled / invisible bottom
			{
				type: 'pie',
				startAngle: 180,
				radius: ['72%', '88%'],
				center: ['50%', '62%'],
				avoidLabelOverlap: false,
				hoverAnimation: true,
				label: { show: false },
				stillShowZeroSum: false,
				data: [
					{ value: menVal, name: 'Men', itemStyle: { color: '#3B8FF3' }, sumAmount: menSum },
					{ value: womenVal, name: 'Women', itemStyle: { color: '#F29F67' }, sumAmount: womenSum },
					{
						value: remVal,
						name: 'Filled remainder',
						itemStyle: { color: '#E5EAFC' },
						tooltip: { show: false },
					},
					{
						value: fillerVal,
						name: 'invisible',
						itemStyle: { color: 'transparent' },
						tooltip: { show: false },
					},
				],
			},
		],
		graphic: [
			{
				type: 'text',
				left: '22%',
				top: '44%',
				style: {
					text: `${sumPct.toFixed(1)}%\nTotal Participants`,
					textAlign: 'center',
					fill: '#111827',
					font: '600 18px "Arial"',
					lineHeight: 26,
				},
			},
		],
	};
};
</script>

<style scoped>
.gradient-bar {
	background: linear-gradient(90deg, #018e20 0%, #007219 100%);
}
</style>
