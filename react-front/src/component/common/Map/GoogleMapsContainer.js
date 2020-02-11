import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import './GoogleMap.scss';
class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      location: {lat: 37.499547, lng: 127.029580},
      selected:'강남점',
      value:'강남점'
    }

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  Change=(e)=> {
    this.setState({
      selected:e.target.value
    })

    switch(e.target.value){
      case '강남점':
                this.setState({
                  location : {lat: 37.499160, lng: 127.028910},
                  value : '강남점'
        });
              break;      

      case '역삼점' :
        this.setState({
          location:{lat: 37.499868, lng: 127.035740},
          value : '역삼점'
        });
      break;    

      case '선릉점' :
        this.setState({
          location:{lat: 37.505189, lng: 127.049150},
          value : '선릉점'
        });
        break;
        default:
          break;
    }
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '78%',
      height: '80vh',
      'marginBottom' : '40px',
      'marginTop' : '10px',
      float : 'left'
    }
    if(this.state.value==='강남점'){
    return (
            <div className='wrapper'>
            <div className='storesInfotitle'>매장 픽업 서비스</div>
            <div class="selectbox">
            <label for="ex_select">{this.state.selected}</label>
            <select value={this.state.selected} onChange={this.Change.bind(this)}> 
            <option value='강남점' className='locationButton'> 강남점 </option>
            <option value='역삼점' className='locationButton'> 역삼점 </option>
            <option value='선릉점' className='locationButton'> 선릉점 </option>
            </select>
            </div>
              <Map
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = { 14 }
                initialCenter = {this.state.location}
              >
                <Marker
                  onMouseover = { this.onMarkerClick }
                  title = { 'Changing Colors Garage' }
                  position = {this.state.location}
                  name = { 'Changing Colors Garage' }
                />
                <InfoWindow
                  marker = { this.state.activeMarker }
                  visible = { this.state.showingInfoWindow }
                >
                    <h2>
                      DayOff
                    </h2>
                      <h4>현대여성을 위한 쇼핑몰</h4>
                      <p> 지점명 : DayOff_강남점 </p>
                      <p>홈페이지 : DayOff@ShopingDayOff.com</p>
                      <p>고객센터 : 02-123-4567 </p>
                    
                </InfoWindow>
              </Map>
              </div>
            );
                      }else if(this.state.value==='역삼점'){
                            return (
                              <div className='wrapper'>
                              <div className='storesInfotitle'>매장 픽업 서비스</div>
                              <div class="selectbox">
                              <label for="ex_select">{this.state.selected}</label>
                              <select value={this.state.selected} onChange={this.Change.bind(this)}> 
                              <option value='강남점' className='locationButton'> 강남점 </option>
                              <option value='역삼점' className='locationButton'> 역삼점 </option>
                              <option value='선릉점' className='locationButton'> 선릉점 </option>
                              </select>
                              </div>
                        <Map
                          item
                          xs = { 12 }
                          style = { style }
                          google = { this.props.google }
                          onClick = { this.onMapClick }
                          zoom = { 14 }
                          initialCenter = {this.state.location}
                        >
                          <Marker
                            onMouseover = { this.onMarkerClick }
                            title = { 'Changing Colors Garage' }
                            position = {this.state.location}
                            name = { 'Changing Colors Garage' }
                          />
                          <InfoWindow
                            marker = { this.state.activeMarker }
                            visible = { this.state.showingInfoWindow }
                          >
                              <h2>
                                DayOff
                              </h2>
                                <h4>현대여성을 위한 쇼핑몰</h4>
                                <p> 지점명 : DayOff_역삼점 </p>
                                <p>홈페이지 : DayOff@ShopingDayOff.com</p>
                                <p>고객센터 : 02-462-3949 </p>
                              
                          </InfoWindow>
                        </Map>
                        </div>
                      );
                              }else if(this.state.value==='선릉점'){
                                return (
                                  <div className='wrapper'>
                                  <div className='storesInfotitle'>매장 픽업 서비스</div>
                                  <div class="selectbox">
                                  <label for="ex_select">{this.state.selected}</label>
                                  <select value={this.state.selected} onChange={this.Change.bind(this)}> 
                                  <option value='강남점' className='locationButton'> 강남점 </option>
                                  <option value='역삼점' className='locationButton'> 역삼점 </option>
                                  <option value='선릉점' className='locationButton'> 선릉점 </option>
                                  </select>
                                  </div>
                              <Map
                              item
                              xs = { 12 }
                              style = { style }
                              google = { this.props.google }
                              onClick = { this.onMapClick }
                              zoom = { 14 }
                              initialCenter = {this.state.location}
                              >
                              <Marker
                                onMouseover = { this.onMarkerClick }
                                title = { 'Changing Colors Garage' }
                                position = {this.state.location}
                                name = { 'Changing Colors Garage' }
                              />
                              <InfoWindow
                                marker = { this.state.activeMarker }
                                visible = { this.state.showingInfoWindow }
                              >
                                  <h2>
                                    DayOff
                                  </h2>
                                    <h4>현대여성을 위한 쇼핑몰</h4>
                                    <p> 지점명 : DayOff_선릉점 </p>
                                    <p>홈페이지 : DayOff@ShopingDayOff.com</p>
                                    <p>고객센터 : 02-555-1587 </p>
                                  
                              </InfoWindow>
                              </Map>
                              </div>
                              );
                                }
                                  }
                                }

export default GoogleApiWrapper({
    apiKey: (process.env.AIzaSyCs88hJR2Tmb7lpqU6LGRHEdeSScXyNBag)
})(GoogleMapsContainer)