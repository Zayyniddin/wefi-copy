<template>
	<div class="w-full">
		<div class="f-container p-4 mx-auto flex items-center justify-between">
			<a href='/' class="font-bold text-2xl max-w-72 text-white">
				Gender-Disaggregated data in Uzbekistan
			</a>
			<nav>
				<ul class="flex items-center gap-5 text-white">
					<li class="text-sm font-bold">
						<NuxtLink to="">Overview </NuxtLink>
					</li>
					<li class="text-sm font-bold">
						<NuxtLink to="">About </NuxtLink>
					</li>
					<li class="text-sm font-bold">
						<NuxtLink to="">Blog </NuxtLink>
					</li>
					<li class="text-sm font-bold">
						<NuxtLink to="">FAQ </NuxtLink>
					</li>
				</ul>
			</nav>
			<NuxtLink v-if='route.path == "/"' to='dashboard' class="bg-primary text-white max-w-[150px] w-full text-center rounded-lg text-lg py-2 px-3">
				Dashboard
			</NuxtLink>
				<NuxtLink v-if='route.path == "/dashboard"' to='/' class="bg-primary text-white text-center rounded-lg max-w-[150px] w-full text-lg py-2 px-3">
				Main
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
</script>
