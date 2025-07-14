<template>
	<section class="relative h-[430px] w-full">
		<transition name="fade" mode="out-in">
			<img :key="bannerImage" :src="bannerImage" alt="Banner"
				class="absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-500" />
		</transition>

		<div class="absolute inset-0 z-10 pointer-events-none" style="
				background: linear-gradient(
					270deg,
					rgba(0, 0, 0, 0.0001) 0%,
					#000 99.9%
				);
				background-blend-mode: multiply;
			"></div>

		<div class="relative f-container mx-auto z-20 h-full flex flex-col items-start justify-center text-white px-4">
			<div class="max-w-[800px] w-full">
				<p class="text-white text-4xl mb-10">Dashboard</p>
			</div>
		</div>
	</section>
	<div class="relative f-container mx-auto z-20 h-full -mt-40 pb-10 w-full px-4 overflow-x-auto max-w-full">

		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="Market size and Market share" name="first" lazy>
				<MarketTab :customers='data.customers' :orgMonthly='data.org_monthly' />
			</el-tab-pane>
			<el-tab-pane label="MSME Credit" name="second" lazy>
				<MsmeCreditTab :creditDebit='data.credit_debit' :npl='data.npl' :creditLoan='data.credit_loan' />
			</el-tab-pane>
			<el-tab-pane label="MSME Deposit" name="third" lazy>
				<MsmeDepositTab :deposit='data.deposit' />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.png'
import banner3 from '@/assets/images/banner3.png'
const route = useRoute()
const $axios = useAxios()
const data = ref([])
const activeName = ref('first')


onMounted(() => {
	getData()

	const tabParam = route.query.tab
	if (tabParam === 'first' || tabParam === 'second' || tabParam === 'third') {
		activeName.value = tabParam
	}
})

function getData() {
	$axios.get('api/v1/wefi/dashboard/').then(res => {
		data.value = res.data.data
	})
}


const handleClick = (tab, event) => {
	// console.log(tab, event)
}

const bannerImage = computed(() => {
	switch (activeName.value) {
		case 'second':
			return banner2
		case 'third':
			return banner3
		default:
			return banner1
	}
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0.2;
}
</style>
