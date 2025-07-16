export async function useDashboardData($axios, updateCallback) {
	const cacheKey = 'dashboard-data'

	// Получаем из localStorage (если есть)
	const cached = localStorage.getItem(cacheKey)
	if (cached) {
		try {
			const parsed = JSON.parse(cached)

			// Показываем кеш сразу
			if (typeof updateCallback === 'function') {
				updateCallback(parsed)
			}

			// Параллельно — запрос на обновление
			$axios.get('/api/v1/wefi/dashboard/').then(res => {
				const fresh = res.data.data
				localStorage.setItem(cacheKey, JSON.stringify(fresh))
				updateCallback(fresh)
			})

			// Сразу возвращаем старые данные
			return parsed
		} catch (e) {
			console.error('Ошибка чтения кеша:', e)
			localStorage.removeItem(cacheKey)
		}
	}

	// Если кеша не было — просто грузим и сохраняем
	const res = await $axios.get('/api/v1/wefi/dashboard/')
	const data = res.data.data
	localStorage.setItem(cacheKey, JSON.stringify(data))
	return data
}
