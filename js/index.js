const NEWS_API = '09875061c8604df6ad93566a4e876305'
const NEWS_BASE_URL = 'https://newsapi.org/v1/'

function getNewsSourcesUrl(category, language = 'en', country = 'us') {
	return `${NEWS_BASE_URL}sources?language=${language}&country=${country}${category !== undefined ? `&category=${category}` : ''}&apiKey=${NEWS_API}`
}

function getNewsUrl(source, sortBy) {
	return `${NEWS_BASE_URL}articles?source=${source}&sortBy=${sortBy}&apiKey=${NEWS_API}`
}

let news = new Vue({
	el: '.news',
	data: {
		categories: ['general', 'technology', 'entertainment', 'business', 'music', 'politics', 'science-and-nature', 'sport', 'gaming'],
		sources: [],
		articles: []
	},
	methods: {
		getNewsSources: function(category) {
			axios.get(getNewsSourcesUrl(category)).then(response => {
				console.log(response.data.sources)
				this.sources = response.data.sources
				this.articles = []
			}).catch(error => { console.error(error) })
		},
		getNews: function(source, sortBy) {
			axios.get(getNewsUrl(source, sortBy)).then(response => {
				console.log(response.data)
				this.articles = response.data.articles
			}).catch(error => { console.error(error) })
		}
	},
	filters: {
		capitalize: value => {
			if(!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		},
		date: value => {
			if(!value) return ''
			value = new Date(value.toString())
			return value.toUTCString()
		},
		category: value => {
			if(!value) return ''
			return value.toString().replace(/-/g, ' ')
		}
	}
})