import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../src/App';
import CarSelector from '../src/components/carselector';
import CarApp from '../src/components/carapp';

import filledState from '../__mocks__/stateMock';

describe('Isolated Test of empty CarSelector component', () => {
	let component = shallow(
		<CarSelector 
			manufacturers={[]}
			models={[]}
		/>
	);


	it('renders empty manufacturers dropdown', () => {
		// dropdown is present
		expect(component.find('#manufacturers').exists()).toBe(true);
		// dropdown contains only one default option
		expect(component.find('#manufacturers').children().length).toBe(1);
	});
});


describe('Isolated Test of filled CarSelector component', () => {

	let component = shallow(
		<CarSelector 
			manufacturers={filledState.manufacturers}
			models={[]}
		/>
	);

	it('renders filled manufacturers dropdown', () => {
		// dropdown is present
		expect(component.find('#manufacturers').exists()).toBe(true);
		// dropdown contains the number of specified options plus one default option
		expect(component.find('#manufacturers').children().length).toBe(filledState.manufacturers.length + 1);

		for (let [index, manufacturer] of filledState.manufacturers.entries()) {
			expect(component.find('#manufacturers').children().at(index + 1).text()).toBe(manufacturer)
		}
	});
});


describe('UseCase: As a user I want to select the manufacturer and the model of my car and see details about my car', () => {
	let component = mount(<CarApp testState={filledState}/>);

	it('lets me a select a manufacturer', () => {
		component.find('#manufacturers').simulate('change', { target: { value: "BMW" } } );;
		expect(component.find('#manufacturers').props().value).toBe("BMW");
	});

	it('lets me a select a model', () => {
		component.find('#models').simulate('change', { target: { value: "3er" } } );;
		expect(component.find('#models').props().value).toBe("3er");
	});

	it('shows me the details', () => {
		let details = component.find('#details-container').find(".getag-details-container .detail-card:first-child").html();
		for (let [key, value] of Object.entries(filledState.details[0])) {
			expect(details.includes(value)).toBe(true)
		}
	});
});