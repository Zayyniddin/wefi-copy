<template>
	<div data-aos="fade-up" class="bg-[#F4F7FA] py-16">
  <p class="text-2xl font-bold mb-16 text-center max-w-[450px] mx-auto w-full">
    {{$t('genderStatsTitle')}}
  </p>
  <div class="flex items-stretch justify-center gap-5">
    <NuxtLink to='/dashboard' class="flex flex-col gap-5 max-w-[450px] w-full">
      <p class="text-sm font-medium min-h-[40px]">{{$t('marketSizeShare')}}</p>
      <img class="rounded-[10px]" src="@/assets/images/gender-stat1.png" alt="" />
      <p class="text-lg text-gray-500">
        {{$t('msmeTotalAndWsmeShare')}}
      </p>
      <p class="flex font-bold items-center gap-2 leading-6 text-primary">
        {{$t('viewDashboard')}} <Icon name="material-symbols:arrow-forward" />
      </p>
    </NuxtLink>

    <NuxtLink to="/dashboard?tab=second" class="flex flex-col gap-5 max-w-[450px] w-full">
      <p class="text-sm font-medium min-h-[40px]">{{$t('wmsmeCreditNpl')}}</p>
      <img class="rounded-[10px]" src="@/assets/images/gender-stat2.png" alt="" />
      <p class="text-lg text-gray-500">
        {{$t('valueOutstandingAndNpl')}}
      </p>
      <p class="flex font-bold items-center gap-2 leading-6 text-primary">
        {{$t('viewDashboard')}} <Icon name="material-symbols:arrow-forward" />
      </p>
    </NuxtLink>

    <NuxtLink to="/dashboard?tab=third" class="flex flex-col gap-5 max-w-[450px] w-full">
      <p class="text-sm font-medium min-h-[40px]">{{$t('wmsmeDeposits')}}</p>
      <img class="rounded-[10px]" src="@/assets/images/gender-stat3.png" alt="" />
      <p class="text-lg text-gray-500">
        {{$t('wmsmeDepositsTotal')}}
      </p>
      <p class="flex font-bold items-center gap-2 leading-6 text-primary">
        {{$t('viewDashboard')}} <Icon name="material-symbols:arrow-forward" />
      </p>
    </NuxtLink>
  </div>
</div>
</template>

<script setup></script>
