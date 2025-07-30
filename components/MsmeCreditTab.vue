<template>
	<div class="flex items-stretch gap-4">
		<div class="bg-white rounded-xl shadow p-8 w-[350px] h-fit space-y-6">
			<p class="font-bold text-2xl">Filters</p>
			<!-- Period -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select period for analysis
				</p>
				<el-select
					clearable
					v-model="filtersStore.period"
					placeholder="Year"
					size="small"
				>
					<el-option
						v-for="item in yearOptions"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</div>

			<!-- Business Type -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select business type for analysis
				</p>
				<el-checkbox-group
					:model-value="filtersStore.businessTypes ?? allBusinessTypes"
					@change="onBusinessTypeChange"
					class="flex flex-col gap-1"
				>
					<el-checkbox :label="1">Individual entrepreneurs</el-checkbox>
					<el-checkbox :label="2">Legal entities</el-checkbox>
				</el-checkbox-group>
			</div>

			<!-- Business Size -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select business size for analysis
				</p>
				<el-checkbox-group
					:model-value="filtersStore.businessSizes ?? allBusinessSizes"
					@change="onBusinessSizeChange"
					class="flex flex-col gap-1"
				>
					<el-checkbox :label="1">Micro business</el-checkbox>
					<el-checkbox :label="2">Small business</el-checkbox>
					<el-checkbox :label="3">Medium business</el-checkbox>
				</el-checkbox-group>
			</div>

			<!-- Sectors -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select sector(s) for analysis
				</p>
				<el-radio-group
					:model-value="filtersStore.sector ?? 'all'"
					@change="onSectorChange"
					class="flex flex-col gap-1"
				>
					<el-radio label="all">All sectors</el-radio>
					<el-radio :label="1">Agriculture</el-radio>
					<el-radio :label="2">Construction</el-radio>
					<el-radio :label="3">Manufacturing</el-radio>
					<el-radio :label="4">Services</el-radio>
					<el-radio :label="5">Trade</el-radio>
					<el-radio :label="6">Other</el-radio>
				</el-radio-group>
			</div>

			<!-- Regions -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select region(s) for analysis
				</p>
				<el-radio-group
					:model-value="filtersStore.region ?? 'all'"
					@change="onRegionChange"
					class="flex flex-col gap-1"
				>
					<el-radio label="all">All regions</el-radio>
					<el-radio
						v-for="region in regions"
						:key="region.id"
						:label="region.id"
					>
						{{ region.full_name }}
					</el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<ValueIssuedBank />
			<NumberIssuedBank />
			<div class="bg-white p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">Statistics</p>
				<p
					class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]"
				>
					By NPL
				</p>
				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Micro</p>
							<p class="font-bold text-xl mr-8">
								{{ npl?.micro_percent?.toFixed(1) }}%
							</p>
						</div>
						<VChart :option="microChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center justify-between w-[135px] gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.micro_women_percent?.toFixed(1) }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.micro_men_percent?.toFixed(1) }} %
								</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Small</p>
							<p class="font-bold text-xl mr-8">
								{{ npl?.small_percent?.toFixed(1) }}%
							</p>
						</div>
						<VChart :option="smallChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-[135px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.small_women_percent?.toFixed(1) }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.small_men_percent?.toFixed(1) }} %
								</p>
							</div>
						</div>
					</div>
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Medium</p>
							<p class="font-bold text-xl mr-8">
								{{ npl?.medium_percent?.toFixed(1) }}%
							</p>
						</div>
						<VChart :option="mediumChart" class="!w-[310px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div
								class="flex items-center w-[135px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#F29F67] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.medium_women_percent?.toFixed(1) }} %
								</p>
							</div>

							<div
								class="flex items-center gap-2 w-[135px] justify-between rounded-lg border-[#E5E5EF] border p-2"
							>
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#3B8FF3] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">
									{{ npl?.medium_men_percent?.toFixed(1) }} %
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFiltersStore } from '@/store/filterStore.js'
const { generate } = useStackedChart()
const filtersStore = useFiltersStore()
const $axios = useAxios()
const emit = defineEmits(['filterChanged'])
const props = defineProps({
	npl: {
		type: Object,
		default: () => [],
	},
})

const allBusinessTypes = [1, 2]
const allBusinessSizes = [1, 2, 3]

const onBusinessTypeChange = val => {
	filtersStore.setBusinessTypes(val)
}

const onBusinessSizeChange = val => {
	filtersStore.setBusinessSizes(val)
}

const onSectorChange = val => {
	filtersStore.setSector(val)
}

const onRegionChange = val => {
	filtersStore.setRegion(val)
}

const regions = ref([])

const currentYear = new Date().getFullYear()
const yearOptions = Array.from(
	{ length: currentYear - 2019 },
	(_, i) => 2020 + i
)

// MOUNTED
onMounted(() => {
	getData()
})

function getData() {
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

// Total NPL sum
const microSum = props.npl?.micro_sum ?? 0
const smallSum = props.npl?.small_sum ?? 0
const mediumSum = props.npl?.medium_sum ?? 0
const totalNplSum = microSum + smallSum + mediumSum

// Percent of each business size in total NPL
const microTotal = computed(() => {
	const micro = props.npl?.micro_sum ?? 0
	const small = props.npl?.small_sum ?? 0
	const medium = props.npl?.medium_sum ?? 0
	const total = micro + small + medium
	return total === 0 ? 0 : +((micro / total) * 100).toFixed(1)
})

const smallTotal = computed(() => {
	const micro = props.npl?.micro_sum ?? 0
	const small = props.npl?.small_sum ?? 0
	const medium = props.npl?.medium_sum ?? 0
	const total = micro + small + medium
	return total === 0 ? 0 : +((small / total) * 100).toFixed(1)
})

const mediumTotal = computed(() => {
	const micro = props.npl?.micro_sum ?? 0
	const small = props.npl?.small_sum ?? 0
	const medium = props.npl?.medium_sum ?? 0
	const total = micro + small + medium
	return total === 0 ? 0 : +((medium / total) * 100).toFixed(1)
})

// Inner male/female percentages
function calcInnerPercent(menRaw, womenRaw) {
	const men = menRaw ?? 0
	const women = womenRaw ?? 0
	const total = men + women
	return {
		men: total === 0 ? 0 : +((men / total) * 100).toFixed(1),
		women: total === 0 ? 0 : +((women / total) * 100).toFixed(1),
	}
}

const micro = computed(() =>
	calcInnerPercent(props.npl?.micro_men_sum, props.npl?.micro_women_sum)
)
const small = computed(() =>
	calcInnerPercent(props.npl?.small_men_sum, props.npl?.small_women_sum)
)
const medium = computed(() =>
	calcInnerPercent(props.npl?.medium_men_sum, props.npl?.medium_women_sum)
)

// Чарты (можно сделать computed() для плавного обновления)
const microChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.micro_percent ?? 0],
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: props.npl?.micro_women_percent ?? 0,
						sum: props.npl?.micro_women_sum ?? 0,
						name: 'Micro',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: props.npl?.micro_men_percent ?? 0,
						sum: props.npl?.micro_men_sum ?? 0,
						name: 'Micro',
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

const smallChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.small_percent ?? 0],
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: props.npl?.small_women_percent ?? 0,
						sum: props.npl?.small_women_sum ?? 0,
						name: 'Small',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: props.npl?.small_men_percent ?? 0,
						sum: props.npl?.small_men_sum ?? 0,
						name: 'Small',
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

const mediumChart = computed(() =>
	generate({
		totalsPercent: [props.npl?.small_percent ?? 0],
		seriesData: [
			{
				name: 'Women',
				data: [
					{
						value: props.npl?.medium_women_percent ?? 0,
						sum: props.npl?.medium_women_sum ?? 0,
						name: 'Medium',
					},
				],
				style: { color: '#F29F67', borderRadius: [8, 0, 0, 8] },
			},
			{
				name: 'Men',
				data: [
					{
						value: props.npl?.medium_men_percent ?? 0,
						sum: props.npl?.medium_men_sum ?? 0,
						name: 'Medium',
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
