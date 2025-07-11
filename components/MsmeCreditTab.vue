<template>
	<div class="flex items-stretch gap-4">
		<div class="bg-white rounded-xl shadow p-8 w-[350px] h-fit space-y-6">
			<p class="font-bold text-2xl">Filters</p>
			<!-- Period -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select period for analysis
				</p>
				<el-select v-model="value" placeholder="Micro" size="small">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>

			<!-- Business Type -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select business type for analysis
				</p>
				<el-checkbox-group v-model="businessTypes" class="flex flex-col gap-1">
					<el-checkbox label="Individual entrepreneurs" />
					<el-checkbox label="Legal entities" />
				</el-checkbox-group>
			</div>

			<!-- Business Size -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select business size for analysis
				</p>
				<el-checkbox-group v-model="businessSizes" class="flex flex-col gap-1">
					<el-checkbox label="Micro business" />
					<el-checkbox label="Small business" />
					<el-checkbox label="Medium business" />
				</el-checkbox-group>
			</div>

			<!-- Sectors -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select sector(s) for analysis
				</p>
				<el-radio-group v-model="sector" class="flex flex-col gap-1">
					<el-radio label="All sectors" />
					<el-radio label="Agriculture" />
					<el-radio label="Construction" />
					<el-radio label="Manufacturing" />
					<el-radio label="Services" />
					<el-radio label="Trade" />
					<el-radio label="Other" />
				</el-radio-group>
			</div>

			<!-- Regions -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select region(s) for analysis
				</p>
				<el-radio-group v-model="region" class="flex flex-col items-baseline gap-1">
					<el-radio label="All regions" />
					<el-radio label="Tashkent" />
					<el-radio label="Tashkent Region" />
					<el-radio label="Samarkand" />
					<el-radio label="Fergana" />
					<el-radio label="Andijan" />
					<el-radio label="Djizzakh" />
					<el-radio label="Bukhara" />
					<el-radio label="Nukus" />
					<el-radio label="Namangan" />
					<el-radio label="Surkhandarya" />
					<el-radio label="Kashkadarya" />
					<el-radio label="Khorezm" />
					<el-radio label="Syrdarya" />
					<el-radio label="Navoi" />
				</el-radio-group>
			</div>

			<!-- Currencies -->
			<div>
				<p class="text-sm font-medium text-[#013F21] mb-2">
					Select currency(ies) for analysis
				</p>
				<el-radio-group v-model="currency" class="flex flex-col gap-1">
					<el-radio label="UZS" />
					<el-radio label="USD" />
				</el-radio-group>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<ValueIssuedBank :data='creditDebit' />
			<NumberIssuedBank :data='creditDebit' />
			<div class="bg-white p-6 rounded-lg shadow">
				<p class="text-sm text-gray-500">Statistics</p>
				<p class="font-medium text-black text-lg border-b pb-2 border-[#E5E5EF]">
					By NPL
				</p>
				<div class="flex items-center justify-between">
					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Micro</p>
							<p class="font-bold text-xl mr-8">{{ microTotal }}%</p>
						</div>
						<VChart :option="microChart" class="!w-[300px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div class="flex items-center justify-between w-[125px] gap-2 rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-sm text-[#615E83]">{{ micro.women }} %</p>
							</div>

							<div class="flex items-center gap-2 w-[125px]  justify-between rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">{{ micro.men }} %</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Small</p>
							<p class="font-bold text-xl mr-8">{{smallTotal}}%</p>
						</div>
						<VChart :option="smallChart" class="!w-[300px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div class="flex items-center w-[125px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
								<p class="text-sm text-[#615E83]">{{ small.women }} %</p>
							</div>

							<div class="flex items-center gap-2 w-[125px] justify-between rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">{{ micro.men }} %</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center justify-between mt-4 -mb-4">
							<p class="text-gray-400">Medium</p>
							<p class="font-bold text-xl mr-8">{{ mediumTotal }}%</p>
						</div>
						<VChart :option="mediumChart" class="!w-[300px] !h-[110px] z-50" />
						<div class="flex items-center gap-2 -mt-8">
							<div class="flex items-center w-[125px] justify-between gap-2 rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
									<div class="w-3 h-3 bg-[#4A3AFF] rounded-full"></div>
									<p class="text-sm text-[#615E83]">Women</p>
								</div>
									<p class="text-sm text-[#615E83]">{{ medium.women }} %</p>
							</div>

							<div class="flex items-center gap-2 w-[125px] justify-between rounded-lg border-[#E5E5EF] border p-2">
								<div class="flex items-center gap-2">
								<div class="w-3 h-3 bg-[#018E20] rounded-full"></div>
								<p class="text-sm text-[#615E83]">Men</p>
								</div>
								<p class="text-sm text-[#615E83]">{{ micro.men }} %</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	creditDebit: {
		type: Array,
		default: () => [],
	},
	npl: {
		type: Object,
		default: () => ({}),
	},
})

const { generate } = useStackedChart()

// Фильтры
const businessTypes = ref(['Individual', 'Legal'])
const businessSizes = ref(['Micro business'])
const sector = ref('All sectors')
const region = ref('All regions')
const currency = ref('USD')

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

const micro = computed(() => calcInnerPercent(props.npl?.micro_men_sum, props.npl?.micro_women_sum))
const small = computed(() => calcInnerPercent(props.npl?.small_men_sum, props.npl?.small_women_sum))
const medium = computed(() => calcInnerPercent(props.npl?.medium_men_sum, props.npl?.medium_women_sum))


// Чарты (можно сделать computed() для плавного обновления)
const microChart = computed(() =>
  generate({
    totalsPercent: [
      (props.npl?.micro_sum ?? 0) + (props.npl?.small_sum ?? 0) + (props.npl?.medium_sum ?? 0)
        ? +(((props.npl?.micro_sum ?? 0) / ((props.npl?.micro_sum ?? 0) + (props.npl?.small_sum ?? 0) + (props.npl?.medium_sum ?? 0))) * 100).toFixed(1)
        : 0
    ],
    seriesData: [
      {
        name: 'Women',
        data: [{
          value: (() => {
            const women = props.npl?.micro_women_sum ?? 0
            const men = props.npl?.micro_men_sum ?? 0
            const total = women + men
            return total ? +((women / total) * 100).toFixed(1) : 0
          })(),
          name: 'Micro',
        }],
        style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
      },
      {
        name: 'Men',
        data: [{
          value: (() => {
            const women = props.npl?.micro_women_sum ?? 0
            const men = props.npl?.micro_men_sum ?? 0
            const total = women + men
            return total ? +((men / total) * 100).toFixed(1) : 0
          })(),
          name: 'Micro',
        }],
        style: { color: '#018E20' },
      },
    ],
    barWidth: 40,
    addGraphic: false,
    hideYAxisLabels: true,
  })
)


const smallChart = computed(() =>
  generate({
    totalsPercent: [smallTotal.value ?? 0],
    seriesData: [
      {
        name: 'Women',
        data: [
          {
            value: small.value?.women ?? 0,
            name: 'Small',
          },
        ],
        style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
      },
      {
        name: 'Men',
        data: [
          {
            value: small.value?.men ?? 0,
            name: 'Small',
          },
        ],
        style: { color: '#018E20' },
      },
    ],
    barWidth: 40,
    addGraphic: false,
    hideYAxisLabels: true,
  })
)

const mediumChart = computed(() =>
  generate({
    totalsPercent: [mediumTotal.value ?? 0],
    seriesData: [
      {
        name: 'Women',
        data: [
          {
            value: medium.value?.women ?? 0,
            name: 'Medium',
          },
        ],
        style: { color: '#4A3AFF', borderRadius: [8, 0, 0, 8] },
      },
      {
        name: 'Men',
        data: [
          {
            value: medium.value?.men ?? 0,
            name: 'Medium',
          },
        ],
        style: { color: '#018E20' },
      },
    ],
    barWidth: 40,
    addGraphic: false,
    hideYAxisLabels: true,
  })
)


</script>
