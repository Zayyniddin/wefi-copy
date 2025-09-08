<template>
	<div class="f-container mx-auto px-4">
  <div class="flex mb-16 items-center justify-between">
    <p class="text-2xl font-bold">
      {{$t('storiesTitle')}}
    </p>
    <p class="text-sm text-primary">{{$t('viewAllBlogs')}}</p>
  </div>

  <div class="flex justify-between">
    <div class="flex flex-col gap-5 max-w-[450px] h-[455px] w-full">
      <iframe width="full" class="rounded-[10px] h-[250px]"
        src="https://www.youtube.com/embed/jcR8RrL7FcE?si=uo8hMaiEal3ZIXi6&amp;start=1" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <p class="text-lg font-bold">{{$t('businesswomen')}}</p>
      <p class="flex items-center gap-2">
        {{$t('businesswomenDesc')}}
      </p>
      <div class="flex items-center mt-auto justify-between">
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/eye.svg" alt="" />
          <p class="font-medium text-sm">{{$t('viewed')}}</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/like.svg" alt="" />
          <p class="font-medium text-sm">{{$t('liked')}}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
      <iframe width="full" class="rounded-[10px] h-[250px]"
        src="https://www.youtube.com/embed/AVyBIPIulpo?si=0KfXsLOHZCmC6mIN&amp;start=1" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <p class="text-lg font-bold">{{$t('successStoryOne')}}</p>
      <p class="flex items-center gap-2">
        {{$t('successStoryOneDesc')}}
      </p>
      <div class="flex items-center mt-auto justify-between">
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/eye.svg" alt="" />
          <p class="font-medium text-sm">{{$t('viewed')}}</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/like.svg" alt="" />
          <p class="font-medium text-sm">{{$t('liked')}}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 max-w-[450px] h-[450px] w-full">
      <iframe width="full" class="rounded-[10px] h-[250px]"
        src="https://www.youtube.com/embed/3u_OHyuZ1AI?si=hYXYYpwljO_6vrLC&amp;start=1" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <p class="text-lg font-bold">{{$t('wsmeNewJobs')}}</p>
      <p class="flex items-center gap-2">
        {{$t('wsmeNewJobsDesc')}}
      </p>
      <div class="flex items-center mt-auto justify-between">
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/eye.svg" alt="" />
          <p class="font-medium text-sm">{{$t('viewed')}}</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="@/assets/icons/like.svg" alt="" />
          <p class="font-medium text-sm">{{$t('liked')}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup></script>
