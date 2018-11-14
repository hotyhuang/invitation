import axios from 'axios'

const baseURL = 'http://localhost:8443'
const TIMEOUT_IN_SECS = 30

const instance = axios.create({
    baseURL,
    timeout: TIMEOUT_IN_SECS*1000,
    service: 'PeopleInvitation',
})

const URLS = {
	LIST_ALL: '/find',
	ADD: '/add'
}

instance.interceptors.response.use(resp => {
	return resp.data || resp
})

export default class API {
	static getAll () {
		return new Promise((resolve, reject) => {
			instance.get(URLS.LIST_ALL)
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	static add (name, number) {
		return new Promise((resolve, reject) => {
			instance.post(URLS.ADD, { name, number })
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}