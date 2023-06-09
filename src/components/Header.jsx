import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { setUrlGravatar } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    this.getImageGravatar();
  }

  getImageGravatar = () => {
    const { email, dispatch } = this.props;
    const userEmail = md5(email).toString();
    const urlApi = `https://www.gravatar.com/avatar/${userEmail}`;
    dispatch(setUrlGravatar(urlApi));
  };

  render() {
    const { name, email, score } = this.props;
    const userEmail = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" alt="userImage" src={ `https://www.gravatar.com/avatar/${userEmail}` } />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
