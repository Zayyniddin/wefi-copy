<template>
	<section class="relative h-screen w-full overflow-hidden">
		<img
			src="@/assets/images/hero-bg.png"
			alt="Women Entrepreneurs"
			class="absolute inset-0 h-full w-full object-cover z-0"
		/>

		<div
			class="absolute inset-0 z-10 pointer-events-none"
			style="
				background: linear-gradient(
					270deg,
					rgba(0, 0, 0, 0.0001) 0%,
					#000 99.9%
				);
				background-blend-mode: multiply;
			"
		></div>

		<div
			class="relative z-20 h-full flex items-center justify-center text-white px-4"
		>
			<div class="w-full max-w-[980px] text-left">
				<h1 class="text-5xl font-bold mb-6 leading-tight">
					Women Entrepreneurs Finance Code Republic of Uzbekistan
				</h1>
				<p class="text-lg max-w-[487px]">
					An online platform providing gender-disaggregated data on micro, small
					and medium-sized enterprises.
				</p>
			</div>
		</div>
	</section>
</template>
