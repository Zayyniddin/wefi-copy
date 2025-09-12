<template>
	<div class="border-t border-[#E7E9ED] py-20 bg-white text-black">
		<div class="max-w-7xl mx-auto px-4 flex items-start gap-24">
			<div>
				<p class="font-bold text-4xl max-w-[400px]">
					{{ $t('genderInfoUzbekistan') }}
				</p>
			</div>

			<!-- Sections -->
			<div>
				<h3 class="font-medium text-2xl mb-4">{{ $t('sections') }}</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>{{ $t('regionalOverview') }}</li>
					<li>{{ $t('genderIndicators') }}</li>
					<li>{{ $t('blogs') }}</li>
					<li>{{ $t('faq') }}</li>
					<li class="">
						<NuxtLink :to="localePath('about')">{{ $t('about') }}</NuxtLink>
					</li>
					<li class="">
						<a href="#faq">{{ $t('faq') }}</a>
					</li>
				</ul>
			</div>

			<!-- Useful Links -->
			<div>
				<h3 class="font-medium text-2xl mb-4">{{ $t('usefulLinks') }}</h3>
				<ul class="space-y-2 text-sm text-primary">
					<li><a href="#" class="hover:underline">finlit.uz</a></li>
					<li><a href="#" class="hover:underline">bank-kredit.uz</a></li>
					<li>
						<a href="#" class="hover:underline">hamroh.business-portal.uz</a>
					</li>
					<li><a href="#" class="hover:underline">portal.uz</a></li>
					<li>
						<a href="#" class="hover:underline">loyihalar-fabrikasi.uz</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="py-6 max-w-[1110px] w-full mx-auto border-t border-[#E7E9ED]">
		<p class="text-sm">
			{{ $t('copyright') }}
		</p>
	</div>
</template>


<script setup>
const localePath = useLocalePath()
</script>