<template>
	<div class="border-t border-[#E7E9ED] py-20 bg-white text-black">
		<div class="max-w-7xl mx-auto px-4 flex items-start gap-24">
			<div>
				<p class="font-bold text-2xl">
					{{ $t('genderInfoUzbekistan') }}
				</p>
			</div>

			<!-- Sections -->
			<div>
				<h3 class="font-medium text-sm mb-4">{{ $t('sections') }}</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>{{ $t('regionalOverview') }}</li>
					<li>{{ $t('genderIndicators') }}</li>
					<li>{{ $t('blogs') }}</li>
					<li>{{ $t('faq') }}</li>
					<li>{{ $t('ourPartners') }}</li>
				</ul>
			</div>

			<!-- Useful Links -->
			<div>
				<h3 class="font-medium text-sm mb-4">{{ $t('usefulLinks') }}</h3>
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

			<!-- Legal -->
			<div>
				<h3 class="font-medium text-sm mb-4">{{ $t('legal') }}</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>{{ $t('privacyPolicy') }}</li>
					<li>{{ $t('termsConditions') }}</li>
					<li>{{ $t('returnPolicy') }}</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="font-medium text-sm mb-4">{{ $t('contactUs') }}</h3>
				<ul class="space-y-2 text-sm text-primary">
					<li>
						<a href="mailto:support@brainwave.io" class="hover:underline">
							support@brainwave.io
						</a>
					</li>
					<li>
						<a href="tel:+13339434391435" class="hover:underline">
							+133-394-3439-1435
						</a>
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
