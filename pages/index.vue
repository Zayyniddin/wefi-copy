<template>
	<Hero />
	<MainStats :data="data.msme" />
	<MainMap :orgRegion="data.org_region" :msme="data.msme" />
	<GenderStats />
	<MainForm />
	<Blogs />
	<!-- <TeamMembers /> -->
	<Questionary />
	<Partners />
	<Footer />
</template>

<script setup>
const $axios = useAxios()
const data = ref([]) 

onMounted(async () => {
	data.value = await useDashboardData($axios, updated => {
		data.value = updated
	})
})
</script>
