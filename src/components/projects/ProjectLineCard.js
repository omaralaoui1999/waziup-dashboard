import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import deviceImage from './../../images/device.png';
import projectImage from './../../images/project.png';
import gatewayImage from './../../images/gateway.png';
import Grid from '@material-ui/core/Grid';

export default class ProjectLineCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let project = this.props.project;

    let projectName = (project.name ? project.name + " " : "");

    return (
      <Card className="deviceNode">
        <div className="contentCards">

          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={24}>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <div className="boardIcon">
                <img src={projectImage} height="64" title={project.dateUpdated ? "Last update at " + project.dateUpdated : "No data yet"} />
                {/* <pre> {project.owner ? "owner: " + project.owner + (this.props.user && project.owner == this.props.user.username ? " (you)" : "") : ""} </pre> */}
                <br />
                <span className="Typography"> {projectName} </span>
              </div>
            </Grid>
            <div className="boardIcon">
              <img src={gatewayImage} height="64" title={project.dateUpdated ? "Last update at " + project.dateUpdated : "No data yet"} />
              <br />
              <span className="Typography"> {project.gateways.length} gateways</span>
            </div>  
            <div className="boardIcon">
              <img src={deviceImage} height="64" title={project.dateUpdated ? "Last update at " + project.dateUpdated : "No data yet"} />
              <br />
              <span className="Typography"> {project.devices.length} devices</span>
            </div>             
          </Grid>
        </div>
      </Card>
    );
  }

  static propTypes = {
    project: PropTypes.object.isRequired, //Should be a Waziup.Project
    user: PropTypes.object.isRequired
  }
}
