<template>
	<div class="bg-[#F4F7FA] py-16">
		<p
			class="text-2xl font-bold mb-16 text-center max-w-[450px] mx-auto w-full"
		>
			Gender Statistics in Entrepreneurship: Key Indicators Overview
		</p>
		<div class="flex items-start justify-center gap-5">
			<NuxtLink to='/dashboard' class="flex flex-col gap-5 max-w-[450px] w-full">
				<p class="text-xl font-medium">Market size and Market share</p>
				<img
					class="rounded-[10px]"
					src="@/assets/images/gender-stat1.png"
					alt=""
				/>
				<p class="text-lg text-gray-500">
					Total number of MSME and share of WSME
				</p>
				<p class="flex font-bold items-center gap-2 leading-6 text-primary">
					View dashboard <Icon name="material-symbols:arrow-forward" />
				</p>
			</NuxtLink>

			<NuxtLink to="/dashboard?tab=second" class="flex flex-col gap-5 max-w-[450px] w-full">
				<p class="text-xl font-medium">
					WMSME Credit and Non-Performing Loans (NPL)
				</p>
				<img
					class="rounded-[10px]"
					src="@/assets/images/gender-stat2.png"
					alt=""
				/>
				<p class="text-lg text-gray-500">
					Value of outstanding loans and percentage of non-performing loans
				</p>
				<p class="flex font-bold items-center gap-2 leading-6 text-primary">
					View dashboard <Icon name="material-symbols:arrow-forward" />
				</p>
			</NuxtLink>

			<NuxtLink to="/dashboard?tab=third" class="flex flex-col gap-5 max-w-[450px] w-full">
				<p class="text-xl font-medium">WMSME Deposits</p>
				<img
					class="rounded-[10px]"
					src="@/assets/images/gender-stat3.png"
					alt=""
				/>
				<p class="text-lg text-gray-500">
					Total number and value of WMSME Deposits
				</p>
				<p class="flex font-bold items-center gap-2 leading-6 text-primary">
					View dashboard <Icon name="material-symbols:arrow-forward" />
				</p>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup></script>
