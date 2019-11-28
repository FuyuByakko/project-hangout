import React, { Component } from "react";
import axios from "axios";
import Hotel from "./Hotel";
import "./styles/Hotels.css";

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      currentHotel: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getHotels();
  }

  getHotels = () => {
    console.log("getting hotels");
    axios
      .post("api/hotels", {
        city: this.props.cityName,
        arrivalDate: this.props.arrivalDate,
        departureDate: this.props.departureDate,
        minPrice: this.props.minPrice,
        maxPrice: this.props.maxPrice,
      })
      .then(list => {
        console.log(list);
        this.setState({ hotels: list.data ? list.data.filter(x => x !== null) : [], loading: false }, function() {
          console.log(this.state);
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  getNextHotel = () => {
    const hotelAmount = this.state.hotels.length - 1;
    const newHotel = this.state.currentHotel + 1;
    if (this.state.currentHotel === hotelAmount) {
      this.setState({ currentHotel: 0 });
    } else {
      this.setState({ currentHotel: newHotel });
    }
  };

  getPrevHotel = () => {
    const hotelAmount = this.state.hotels.length - 1;
    const newHotel = this.state.currentHotel - 1;
    if (this.state.currentHotel === 0) {
      this.setState({ currentHotel: hotelAmount });
    } else {
      this.setState({ currentHotel: newHotel });
    }
  };

  nothingFound = () => {
    if (!this.state.loading && this.state.hotels.length < 1) {
      return <h1 className="loading"> Sorry, no hotels found...</h1>;
    }
    return;
  };

  render() {
    const hotels = this.state.hotels.map(hotel => {
      return (
        <Hotel
          key={this.state.currentHotel}
          image={hotel.photos.replace("square60", "square300")}
          name={hotel.hotelName}
          city={hotel.city}
          zip={hotel.zip}
          address={hotel.address}
          url={hotel.url}
          review={hotel.reviewScore}
          price={hotel.minTotalPrice + " " + hotel.currencyCode}
          available={hotel.roomsLeft + " " + (hotel.roomsLeft === 1 ? " Room Left" : " Rooms Left")}
        />
      );
    });

    return (
      <div className="hotels">
        <div className="leftArrow">
          <img
            className="arrowImage"
            src="https://img.icons8.com/flat_round/64/000000/arrow-left.png"
            alt="Left"
            onClick={this.getPrevHotel}
          ></img>
        </div>
        <div className="selectedHotel">
          <center type="text" className="hotelInfo">
            {this.state.loading ? (
              <img className="loading" src="https://media1.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif" />
            ) : (
              hotels[this.state.currentHotel]
            )}
            {this.nothingFound()}
          </center>
        </div>
        <div className="rightArrow">
          <img
            className="arrowImage"
            src="https://img.icons8.com/flat_round/64/000000/arrow-right.png"
            alt="Right"
            onClick={this.getNextHotel}
          ></img>
        </div>
      </div>
    );
  }
}
