import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
				ssr: false,
				devtools: { enabled: true },
				modules: [
				 '@nuxt/eslint',
				 '@nuxt/icon',
				 '@nuxt/fonts',
				 'nuxt-echarts',
				 '@element-plus/nuxt',
				 '@pinia/nuxt',
				],
				css: ['~/assets/css/main.css'],
   runtimeConfig: {
    public: {
      apiBase: 'https://api.mahalla.bank-kredit.uz/', 
    }
  },
				echarts: {
								renderer: ['svg', 'canvas'],
								charts: ['BarChart', 'PieChart', 'MapChart'], 
								components: [
												'DatasetComponent',
												'GridComponent',
												'TooltipComponent',
												'LegendComponent',
												'TitleComponent',
												'VisualMapComponent', 
												'GeoComponent', 
								],
								features: ['LabelLayout', 'UniversalTransition'],
				},
				vite: {
								plugins: [tailwindcss()],
				},
})