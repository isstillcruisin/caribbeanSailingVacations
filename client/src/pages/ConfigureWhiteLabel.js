import React, { Component } from "react";
import ConfigureWhiteLabelForm from "../components/ConfigureWhiteLabelForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card';

class ConfigureWhiteLabel extends Component {
  state = {};

  componentDidMount() {
    let { name } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      API.getCurrentUserId().then(res2 => {
        if (res2 && res2.data.id !== res.data._travelAgent._id) {
          this.setState({ unauthorized: true});
        } else {
          this.setState({ whiteLabel: res.data});
        }
      });
    });
  }

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   try {
  //     this.saveWhiteLabel();
  //   } catch (err) {
  //     console.log("error in save White Label (╯°□°)╯︵ ┻━┻ ", err);
  //   }
  // };

  // saveWhiteLabel = () => {
  //   API.saveWhiteLabel({
  //     whiteLabelName: this.state.whiteLabelName,      
  //   })
  //     .then(res =>
  //       this.setState({
  //         saved: true
  //       })
  //     )
  //     .catch(err => console.log("saving white label error", err));
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  render() {
    if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: `/`,
          state: { alert: `You are not authorized to perform this action.` } 
        }} 
      />)
    } else if (this.state.whiteLabel) {
      return (<> 
        <h1>Configure Charter Assistant {this.state.whiteLabel.name}</h1>
        <Card>
          <ConfigureWhiteLabelForm
            whiteLabel = {this.state.whiteLabel}
          />
        </Card>
      </>)
    } else {
      return <Loader />;
    }
  }
}

export default ConfigureWhiteLabel;