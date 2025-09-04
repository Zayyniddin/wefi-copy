<template>
	<div class="w-full">
		<div class="f-container p-4 mx-auto flex items-center justify-between">
			<a href="/" class="font-bold text-2xl max-w-72 text-white" :class='textColor'>
				Gender-Disaggregated data in Uzbekistan
			</a>
			<nav v-if="route.path != '/about'">
				<ul class="flex items-center gap-5 text-white" >
					<li class="text-sm font-bold">
						<a href="#overview">Overview</a>
					</li>
					<li class="text-sm font-bold">
						<nuxt-link to="/about">About</nuxt-link> 
					</li>
					<li class="text-sm font-bold">
						<a href="#blog">Blog</a>
					</li>
					<li class="text-sm font-bold">
						<a href="#faq">FAQ</a>
					</li>
				</ul>
			</nav>

			<NuxtLink
				v-if="route.path == '/' || route.path == '/about'"
				to="dashboard"
				class="bg-primary text-white max-w-[150px] w-full text-center rounded-lg text-lg py-2 px-3"
			>
				Dashboard
			</NuxtLink>
			<NuxtLink
				v-if="route.path == '/dashboard'"
				to="/"
				class="bg-primary text-white text-center rounded-lg max-w-[150px] w-full text-lg py-2 px-3"
			>
				Main
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()


const textColor = computed(() =>
  route.path === '/about' ? '!text-black' : '!text-white'
)
</script>
