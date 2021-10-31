import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import NodeFetch from 'node-fetch' ;
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const handleSubmit = (event) => {
    event.preventDefault()
    saveGames() // Save games when form is submitted
  }
  const saveGames = () => {
    const data = { username: 'example' }; 
     fetch('http://localhost:8000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(data),
    }) .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
     
  }

  export default class CreateFlight extends Component {
    constructor(props) {
        super(props);

        this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
        this.onChangeDepartureDate = this.onChangeDepartureDate.bind(this);
        this.onChangeArrivalDate = this.onChangeArrivalDate.bind(this);
        this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
        this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
        this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
        this.onChangeBusinessClassSeats = this.onChangeBusinessClassSeats.bind(this);
        this.onChangeDepartureAirport = this.onChangeDepartureAirport.bind(this);
        this.onChangeArrivalAirport = this.onChangeArrivalAirport.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            FlightNo: '',
            DepartureDate: new Date(),
            ArrivalDate: new Date(),
            DepartureTime: '',
            ArrivalTime: '',
            EconomySeats: '',
            BusinessClassSeats: '',
            DepartureAirport: '',
            ArrivalAirport: ''
        }
    }

    onChangeFlightNo(e) {
        this.setState({
            FlightNo: e.target.value
        })
    }

    onChangeDepartureDate(DepartureDate) {
        this.setState({
            DepartureDate: DepartureDate
        })
    }

    onChangeArrivalDate(ArrivalDate) {
        this.setState({
            ArrivalDate: ArrivalDate
        })
    }

    onChangeDepartureTime(e) {
        this.setState({
            DepartureTime: e.target.value
        })
    }

    onChangeArrivalTime(e) {
        this.setState({
            ArrivalTime: e.target.value
        })
    }

    onChangeEconomySeats(e) {
        this.setState({
            EconomySeats: e.target.value
        })
    }

    onChangeBusinessClassSeats(e) {
        this.setState({
            BusinessClassSeats: e.target.value
        })
    }

    onChangeDepartureAirport(e) {
        this.setState({
            DepartureAirport: e.target.value
        })
    }

    onChangeArrivalAirport(e) {
        this.setState({
            ArrivalAirport: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const flight = {
            FlightNo: this.state.FlightNo,
            DepartureDate: this.state.DepartureDate,
            ArrivalDate: this.state.ArrivalDate,
            DepartureTime: this.state.DepartureTime,
            ArrivalTime: this.state.ArrivalTime,
            EconomySeats: this.state.EconomySeats,
            BusinessClassSeats: this.state.BusinessClassSeats,
            DepartureAirport: this.state.DepartureAirport,
            ArrivalAirport: this.state.ArrivalAirport
        }
        fetch('http://localhost:8000/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
             // 'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(flight),
          }) .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
           

       // window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Flight</h3>
                <form onSubmit={this.onSubmit} className="row g-3">

                    <div className="form-group">
                        <label>Flight Number: </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.FlightNo}
                            onChange={this.onChangeFlightNo}
                        />
                    </div>

                    <div className="form-group">
                        <label>Departure Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.DepartureDate}
                                onChange={this.onChangeDepartureDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Arrival Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.ArrivalDate}
                                onChange={this.onChangeArrivalDate}
                            />
                        </div>
                    </div>

                    <div className="form-group" className="col-md-6">
                        <label>Departure Time: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.DepartureTime}
                            onChange={this.onChangeDepartureTime}
                        />
                    </div>

                    <div className="form-group" className="col-md-6">
                        <label>Arrival Time: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.ArrivalTime}
                            onChange={this.onChangeArrivalTime}
                        />
                    </div>

                    <div className="form-group">
                        <label>Economy Seats: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.EconomySeats}
                            onChange={this.onChangeEconomySeats}
                        />
                    </div>

                    <div className="form-group">
                        <label>Business Class Seats: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.BusinessClassSeats}
                            onChange={this.onChangeBusinessClassSeats}
                        />
                    </div>

                    <div className="form-group" className="col-md-6">
                        <label>Departure Airport: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.DepartureAirport}
                            onChange={this.onChangeDepartureAirport}
                        />
                    </div>

                    <div className="form-group" className="col-md-6">
                        <label>Arrival Airport: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.ArrivalAirport}
                            onChange={this.onChangeArrivalAirport}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create Flight" className="btn btn-dark" />
                    </div>
                </form>
            </div>
        )
    }
}