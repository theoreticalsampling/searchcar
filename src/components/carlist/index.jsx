import React, { Component } from 'react';
import style from './carlist.scss';

class CarList extends Component {
	constructor(props) {
    	super(props);
	}

	update() {
		this.forceUpdate();
	}

	render() {

		return(
			<div id="details-container">
				{ (this.props.manufacturer !== "default" && this.props.modelCount === 0) &&
					<p className="lead">
						{'Ooops! We don\'t have a list of ' + this.props.manufacturer + '\'s model'}
					</p>
				}

				{ (this.props.manufacturer !== "default" && this.props.model !== "default" && this.props.details.length === 0) &&
					<p className="lead">
						{'Ooops! We don\'t have a list of ' + this.props.manufacturer + '\'s model'}
					</p>
				}

				{ this.props.details.length > 0 &&
					<div className={style['getag-details-container']}>
						{ this.props.details.map((detail, i) => {
							
							return(
								<div key={i} className={style['detail-card']}>
									<p>
										<strong>Manufacturer: </strong>
										<span>{detail.make}</span>
									</p>
									<p>
										<strong>Model: </strong>
										<span>{detail.model}</span>
									</p>
									<p>
										<strong>Horsepower: </strong>
										<span>{detail.enginePowerPS}</span>
									</p>
									<p>
										<strong>Performance: </strong>
										<span>{detail.enginePowerKW}</span>
									</p>
									<p>
										<strong>Fuel-Type: </strong>
										<span>{detail.fuelType}</span>
									</p>
									<p>
										<strong>Body-Type: </strong>
										<span>{detail.bodyType}</span>
									</p>
									<p>
										<strong>Engine-Capacity: </strong>
										<span>{detail.engineCapacity}</span>
									</p>
								</div>
							);
						})}
					</div>
				}


				
				
			</div>
		);
	}
}

export default CarList;