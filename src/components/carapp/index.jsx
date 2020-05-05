import React, { Component } from 'react';
import style from './carapp.css';

import CarApi from './../../lib/CarApi';
import CarSelector from './../carselector';
import CarList from './../carlist';


class CarApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			component_state: 'EMPTY',
			manufacturers: [],
			models: [],
			details: []
		};
	}

	componentDidMount() {
		if (this.props.hasOwnProperty('testState')) {
			this.setState(this.props.testState);
		} else {
			this.setManufacturers();
		}
		
	}

	setManufacturers() {
		this.setState({
			component_state: 'LOADING',
			models:[],
			details:[]
		});

		let nextState = Object.assign({}, this.state);
		nextState.component_state = 'IDEAL';

		CarApi.getManufacturers()
			.then((manufacturers)=>{
				nextState.manufacturers = manufacturers;
			})
			.then(()=>{
				this.setState(nextState);
			})
			.catch((error) => {
				this.setState({component_state: 'ERROR'})
			});

		return this
	}



	setModels(manufacturer) {
		if (manufacturer != "default") {
			this.setState({
				component_state: 'LOADING',
				details:[]
			});

			let nextState = Object.assign({}, this.state);
			nextState.component_state = 'IDEAL';

			CarApi.getModels(manufacturer)
				.then((models)=>{
					nextState.models = models;
				})
				.then(()=>{
					this.setState(nextState);
				})
				.catch((error) => {
					this.setState({component_state: 'ERROR'})
				});
		}
	}

	setDetails(manufacturer, model) {
		if (manufacturer != "default" && model != "default") {
			this.setState({
				component_state: 'LOADING',
				details:[]
			})
			let nextState = Object.assign({}, this.state);
			nextState.component_state = 'IDEAL';

			CarApi.getDetails(manufacturer, model)
				.then((details)=>{
					nextState.details = details;
				})
				.then(()=>{
					this.setState(nextState);
				})
				.catch((error) => {
					this.setState({component_state: 'ERROR'})
				});
		}
	}

	onManufacturerSelect(manufacturer) {
		if (!this.props.hasOwnProperty('testState')) {
			this.setModels(manufacturer);
		}
	}

	onModelSelect(model) {
		if (!this.props.hasOwnProperty('testState')) {
			this.setDetails(this.refs.selector.state.manufacturer, model);
		} else {
			this.setState({component_state: 'IDEAL'})
		}
	}

	onResetModel() {
		this.forceUpdate();
	}

	onReload() {
		if (this.state.manufacturers.length === 0) {
			this.setManufacturers();
		}
		this.setModels(this.refs.selector.state.manufacturer);
		this.setDetails(this.refs.selector.state.manufacturer, this.refs.selector.state.model);
	}

  render() {
	return( 
		<div className={style['getag-carapp']}>
			<div className={style['card']}>
				<div className={style['card-header']}>
					Search car
				</div>
				<div className={style['card-body']}>
					<div className="mb-3">
						<CarSelector
							ref="selector" 
							manufacturers={this.state.manufacturers}
							onManufacturerSelect={this.onManufacturerSelect.bind(this)}
							models={this.state.models}
							onModelSelect={this.onModelSelect.bind(this)}
							onResetModel={this.onResetModel.bind(this)}
						/>

						<div className={style['ui-group']}>
							<button onClick={this.onReload.bind(this)}>Reload</button>
						</div>
					</div>


					{(()=>{
						switch(this.state.component_state) {
							case 'EMPTY':
								return <div></div>
							case 'LOADING':
								return <p className="lead">Loading ...</p>
							case 'ERROR':
								return <p className="lead">We're sorry. The your request failed. To try again, click on Reload.</p>
							case 'IDEAL':
								return <CarList
									ref="list"
									manufacturer={this.refs.selector.state.manufacturer}
									model={this.refs.selector.state.model}
									modelCount={this.state.models.length}
									details={this.state.details}
								/>
						}
					})()}
				</div>
			</div>
		</div>
	)
  }
}

export default CarApp;
