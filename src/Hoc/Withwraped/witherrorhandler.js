import React, { Component } from "react";
import Modal from "../../Components/Layout/UI/Modal/Modal";
import Aux from "../Auxiliary";
const withErrorhandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      ismodal: false,
    };
    componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
          ismodal: false,
        });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
            ismodal: true,
          });
        }
      );
    }
    errorconfirmhandler = () => {
      this.setState({
        error: null,
        ismodal: false,
      });
    };

    render() {
      console.log(this.state.ismodal);
      return (
        <Aux>
          <Modal
            ordered={this.state.ismodal}
            clickedbackdrop={this.errorconfirmhandler}
          >
            {this.state.ismodal ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorhandler;
