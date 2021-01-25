import React, {Component} from "react";
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func,
    clearUsers: PropTypes.func,
    showClear: PropTypes.bool,
    setAlert: PropTypes.func,
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  onSubmit(e) {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({text: ''})
    }
  };
  //jeśli funkcja nie jest strzałkowa - trzeba ją wiązać za pomocą .bind(this)
  //lepiej zrobić strzałkową
  // wyrażenia ***** ? ** : ** oraz ****** && ******* są równoważne (to drugie nie posiada opcji na fałsz)

  render() {
    const {showClear, clearUsers} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            name="text"
            placeholder="Search users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input type="submit" value="Search" className="btn btn-dark btn-block"/>
        </form>
        {showClear &&
        <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
        }
      </div>
    );
  }
}

export default Search;