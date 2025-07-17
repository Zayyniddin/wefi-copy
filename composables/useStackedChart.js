export function useStackedChart() {
	function generate({
		seriesData,
		totalsPercent = [],
		addRemaining = true,
		addGraphic = true,
		barWidth = 20,
		hideYAxisLabels = false,
	}) {
		const categories = seriesData[0]?.data.map(d => d.name) || []
		const reversedTotals = [...totalsPercent].reverse()

		const percentByCategory = {}
		categories.forEach((cat, i) => {
			percentByCategory[cat] = reversedTotals[i]
		})

		const MIN_VISIBLE_PERCENT = 1.5

		if (totalsPercent.length > 0) {
			seriesData.forEach(s => {
				s.data = s.data.map((item, i) => {
					const totalPercent = reversedTotals[i] || 0
					const scale = totalPercent / 100

					const rawScaled = item.value * scale

					let value = rawScaled
					if (rawScaled > 0 && rawScaled < MIN_VISIBLE_PERCENT) {
						value = MIN_VISIBLE_PERCENT
					}

					return {
						...item,
						__original: item.value,
						value,
						__scaled: rawScaled,
					}
				})
			})
		}

		// Remaining
		if (addRemaining) {
			const remaining = categories.map((_, i) => {
				const sum = seriesData.reduce(
					(acc, s) => acc + (s.data[i]?.value || 0),
					0
				)

				return {
					name: categories[i],
					value: Math.max(0, 100 - sum),
				}
			})

			seriesData.push({
				name: 'Remaining',
				data: remaining,
				style: {
					color: 'rgba(0, 0, 0, 0.05)',
					borderRadius: [0, 8, 8, 0],
				},
				tooltip: false,
			})
		}

		const graphicTexts = addGraphic
			? categories.map((cat, i) => ({
					type: 'text',
					top: i * 46,
					style: {
						text: `${(percentByCategory[cat] || 0).toFixed(1)}%`,
						fill: '#013F21',
						font: '12px sans-serif',
						width: 50,
						overflow: 'truncate',
					},
			  }))
			: []

		return {
			grid: {
				left: 6,
				top: 20,
				bottom: 20,
				containLabel: true,
			},
			tooltip: {
				trigger: 'item',
				formatter: params => {
	const color = params.color
	const label = params.seriesName
	const category = params.name
	const value = typeof params.data?.__original === 'number'
		? params.data.__original
		: params.value

	// Получаем текущий год и месяц
	const now = new Date()
	const monthName = now.toLocaleString('en-US', { month: 'long' })
	const year = now.getFullYear()

	// Генерируем список всех дополнительных полей, кроме стандартных
	const extraFields = Object.entries(params.data || {})
		.filter(([key]) =>
			!['value', 'name', '__original', '__scaled'].includes(key)
		)
		.map(([key, val]) => {
			const formatted =
				typeof val === 'number' ? val.toLocaleString() : val
			return `<div>• ${key[0].toUpperCase() + key.slice(1)}: ${formatted}</div>`
		})
		.join('')

	return `
		<div style="padding: 2px;">
			<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
				<div style="width: 10px; height: 10px; background: ${color}; border-radius: 50%;"></div>
				<b>${label}</b>
			</div>
			<div style="margin-left: 16px;">
				<div>• Percentage: ${value.toFixed(1)}%</div>
				${extraFields}
			</div>
		</div>
	`
				},
			},

			xAxis: {
				type: 'value',
				show: false,
				max: 100,
			},
			yAxis: {
				type: 'category',
				data: categories,
				inverse: true,
				axisLine: { show: false },
				axisTick: { show: false },
				axisLabel: hideYAxisLabels
					? { show: false }
					: {
							fontSize: 14,
							color: '#374151',
							fontWeight: 500,
					  },
			},
			series: seriesData.map(s => ({
				name: s.name,
				type: 'bar',
				stack: 'total',
				barWidth,
				tooltip: { show: s.tooltip !== false },
				itemStyle: {
					color: s.style?.color || '#000',
					borderRadius: s.style?.borderRadius || [0, 5, 5, 0],
				},
				data: s.data,
			})),
			graphic: addGraphic
				? [
						{
							type: 'group',
							left: '92%',
							top: 38,
							children: graphicTexts,
						},
				  ]
				: [],
		}
	}

	return { generate }
}
