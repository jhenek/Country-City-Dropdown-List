import React from 'react';
import ReactDOM from 'react-dom';
import countries from './countries';
import cities from './cities';


document.addEventListener('DOMContentLoaded', function(){
	
	class Form extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				result: ''
			};
		}
		
		handleOptionChange = (event) => {
			this.setState({result: event.target.value});
			if ( typeof this.props.returnResult === 'function' ){
				this.props.returnResult(event.target.value);
			}
		};
		
		render() {
			
			return (
				<div>
					<select
					className="form"
						value={this.state.country}
						onChange={this.handleOptionChange}>
						{this.props.options}
					</select>
				</div>
			)
		}
	}
	
	class App extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				status: false,
				country: '',
				city: '',
				countries: [],
				cities: [],
				citiesResult: [<option key="0" value="City">- City -</option>],
			};
		}
		
		returnCountry = (country) => {
			this.setState({country: country,
								status: true,
								city: ''});
		}
		
		returnCity = (city) => {
			this.setState({city: this.state.cities[city]});
		}
		
		returnStatus = () => {
			this.setState({status: false});
		}

		componentDidMount() {
			this.setState({countries: countries.map( (opt, index)  => <option key={index} value={opt.code}>{opt.name_en}</option>)});

		}

		componentDidUpdate() {
			if (this.state.status) {
				let temp = [];
				for (let i=0; i< cities.length; i++) {
					if (cities[i].country === this.state.country) {
						temp.push(cities[i]);
					}
				}
				this.setState({citiesResult: temp.map( (opt, index)  => <option key={index} value={index}>{opt.name}</option>),
									cities: temp,
									status: false
									});
			}
		}

		render(){

			return (
				<div className="container">
					<Form
						options={this.state.countries}
						returnResult={this.returnCountry}
					/>
					<Form
						options={this.state.citiesResult} 
						returnResult={this.returnCity}
					/>
					<div>
						<p>You selected:   <span>{this.state.city.name}</span> </p>
						<p>Latitude:   <span>{this.state.city.lat}</span> </p>
						<p>Longitude:   <span>{this.state.city.lng}</span></p>
					</div>
				</div>
			)
		}
	}
	
	ReactDOM.render(
		<App/>,
		document.getElementById('app')
	);
});
