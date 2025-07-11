<template>
	<Hero />
	<MainStats :data="data.msme" />
	<MainMap :orgRegion="data.org_region" :msme="data.msme" />
	<GenderStats />
	<MainForm />
	<Blogs />
	<Questionary />
	<Partners />
	<Footer />
</template>

<script setup>
const $axios = useAxios()
const data = ref([])

onMounted(() => {
	getData()
})

function getData() {
	$axios.get('api/v1/wefi/dashboard/').then(res => {
		data.value = res.data.data
	})
}
</script>
