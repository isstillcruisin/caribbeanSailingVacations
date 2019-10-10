import React, { Component } from "react";
import ConfigureWhiteLabelForm from "../components/ConfigureWhiteLabelForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form, Col } from 'react-bootstrap';


class ConfigureWhiteLabel extends Component {
  state = {saved: true};

  componentDidMount() {
    console.log(this.props.match.params)
    let { name } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      API.getCurrentUser().then(res2 => {
        if (res2 && res2.data._id !== res.data._travelAgent._id) {
          this.setState({ unauthorized: true});
        } else {
          this.setState({ whiteLabel: res.data});
        }
      });
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    try {
      this.saveWhiteLabel();
    } catch (err) {
      console.log("error in save White Label (╯°□°)╯︵ ┻━┻ ", err);
    }
  };

  saveWhiteLabel = event => {
    event.preventDefault();
    API.saveWhiteLabel(this.state.whiteLabel)
      .then(res =>
        this.setState({
          whiteLabel: this.state.whiteLabel,
          saved: true
        })
      )
      .catch(err => console.log("saving white label error", err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    var newWhiteLabel = Object.assign({}, this.state.whiteLabel)
    newWhiteLabel[name] = value;
    this.setState({
      whiteLabel: newWhiteLabel,
      saved: false
    });
  };

  renderAllEBrochureRows = (whiteLabel) => {
    return whiteLabel.ebrochures.map((eBrochure, i) => {
      return <tr key={`ebrochure-${i}`}>
        <td>{eBrochure.name}</td>
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}`}
            className="e-brochure-link"
          >
            <Button>View E-Brochure</Button>
          </LinkContainer>
        </td> 
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}/edit`}
            className="edit-e-brochure-link"
          >
            <Button>Edit E-Brochure</Button>
          </LinkContainer>
        </td> 
        
      </tr>
    });
  }

  render() {
    if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: `/`,
          state: { alert: `You are not authorized to perform this action.` } 
        }} 
      />)
    } else if (this.state.whiteLabel) {
      return (<Container> 
        <h1>White Label: '{this.state.whiteLabel.name}'</h1>
        <Tabs defaultActiveKey={this.props.match.params.tab} id="white-label-tabs" variant='pills'>
          <Tab eventKey="configure" title="Configure">
            <Card>
              <ConfigureWhiteLabelForm
                whiteLabel = {this.state.whiteLabel}
                handleInputChange = {this.handleInputChange}
                handleSaveWhiteLabel = {this.saveWhiteLabel}
                saved = {this.state.saved}
              />
            </Card>
          </Tab>
          <Tab eventKey="ebrochures" title='E-Brochures'>
            <Card>
              <Card.Header>E-Brochures</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>View</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderAllEBrochureRows(this.state.whiteLabel)}   
                  </tbody>
                </Table>

                <LinkContainer
                  to={`/white-label/${this.state.whiteLabel.name}/new-e-brochure`}
                  className="add-e-brochure-link"
                >
                  <Button>Add New E-Brochure</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>)
    } else {
      return <Loader />;
    }
  }
}

export default ConfigureWhiteLabel;
