import React, { Component } from 'react';
import style from '../carapp/carapp.css';
import { isEqual } from 'lodash';

export default class CarSelector extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		manufacturer: "default",
    		model: "default"
    	}
	}

	componentDidUpdate(prevProps) {
		if (!isEqual(prevProps.models, this.props.models)) {
			this.setState({model: "default"}, this.props.onResetModel);
		}
	}

	render() {
		return(
			<div className="mb-3">
				<div className={style['ui-group']}>
					<label className="lead" htmlFor="cars">Choose a car:</label>

					<select 
						id="manufacturers"
						value={this.state.manufacturer}
						onChange={(event)=>{
							this.setState({manufacturer: event.target.value})
							this.props.onManufacturerSelect(event.target.value);
						}}
					>
						<option disabled value="default"> -- </option>
						{
							this.props.manufacturers.map((manufacturer, i) => {
								return <option key={i} value={manufacturer}>{manufacturer}</option>
							})
						}
					</select>
				</div>
				<div className={style['ui-group']}>
					<label className="lead" htmlFor="models">Choose a model:</label>

					<select 
						id="models"
						value={this.state.model}
						onChange={(event)=>{
							this.setState({model: event.target.value})
							this.props.onModelSelect(event.target.value)
						}}
					>
						<option disabled value="default"> -- </option>
						{
							this.props.models.map((model, i) => {
								return <option key={i} value={model}>{model}</option>
							})
						}
					</select>
				</div>
			</div>
		);
	}
}