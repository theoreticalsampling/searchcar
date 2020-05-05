import axios from 'axios';

export default class CarApi {

	static makesUrl = 'https://apiserver-2ai6f89ri.now.sh/api/makes';
	static modelsUrl = 'https://apiserver-2ai6f89ri.now.sh/api/models';
	static vehiclesUrl = 'https://apiserver-2ai6f89ri.now.sh/api/vehicles'

	static query(config) {
		return axios.get(config['url'])
	}

	static getManufacturers() {
		return new Promise((resolve, reject) => {
			this.query({'url': this.makesUrl})
				.then((res)=>{
					resolve(res.data);
				})
				.catch((error)=>{
					reject(error.message)
				});
		})	
	}

	static getModels(manufacturer) {
		return new Promise((resolve, reject) => {
			this.query({'url': this.modelsUrl + '?make='+ manufacturer})
				.then((res)=>{
					resolve(res.data);
				})
				.catch((error)=>{
					reject(error.message)
				});
		})
	}

	static getDetails(manufacturer, model) {
		return new Promise((resolve, reject) => {
			this.query({'url': this.vehiclesUrl + '?make='+ manufacturer + '&model=' + model})
				.then((res)=>{
					resolve(res.data);
				})
				.catch((error)=>{
					reject(error.message)
				});
		})
	}
}