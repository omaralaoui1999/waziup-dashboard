import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Container,  Col, Visible, Hidden } from 'react-grid-system'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import node from './barChart';
import rd3 from 'react-d3-library';
import SensorData from './SensorData.js'
const BarChart = rd3.BarChart;


var position = [12.238, -1.561];
class sensorDetail extends Component {
     constructor(props){
        super(props);
        this.state = {
            sensor:{},
            markers: [],
            id:this.props.params.sensorId,
            d3: '',
        };
      }
 
  defaultProps = {
    sensors: []
  };

  componentWillReceiveProps(nextProps){

    if (nextProps.sensors && this.props.params.sensorId) {
        var sensor = nextProps.sensors.find((el)=>{
            return el.id === this.props.params.sensorId;
        });
        this.setState({sensor:sensor});
        var markers = [];
        if(sensor.location && sensor.location.coordinates){
            markers.push({
              position:[
                sensor.location.coordinates[1],
                sensor.location.coordinates[0]
              ],
              defaultAnimation: 2,
            });
          }
        position = markers[0].position;
        this.setState({markers:markers})
    }
  }
  componentDidMount() {
    this.setState({d3: node});
  }
  render() {
    if (this.state.markers.lenght>0) {
    }
    const listMarkers = this.state.markers.map((marker,index) =>
            <Marker key={index} position={marker.position}>
              <Popup>
                <span>Sensor infos<br/>{marker.position}</span>
              </Popup>
            </Marker>
    ); 
    return (
      <div className="sensor">
        <h1 className="page-title">Sensor: {this.state.id}</h1>
        <Container fluid={true}>
           <Card>
            <CardHeader title={this.state.id + " Map Location"} />
            <CardMedia>
              <Map ref="map" center={position} zoom={8}>
                <TileLayer
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {listMarkers}
              </Map>
            </CardMedia>

            <CardTitle title="Current values"/>
            <CardText>
                <BarChart data={this.state.d3} />
            </CardText>
            
            <CardTitle title="Historical Data"/>
            <CardText>
                <BarChart data={this.state.d3} />
            </CardText>
          </Card>
        </Container>
      </div>
    );
  }
}

export default sensorDetail;
