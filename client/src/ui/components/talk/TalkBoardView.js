import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '../_common/Button';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
import handleGetCategories from '../../../modules/handle-get-categories';
import handleUpdateFirstLogin from '../../../modules/handle-update-first-login';

const mapStateToProps = state => ({
  userId: state.userId,
  token: state.token,
});

class TalkBoardView extends React.Component {
  constructor(props) {
    super(props);
    const { firstLogin } = this.props;
    this.state = {
      category: '',
      fadeBackground: false,
      categories: [],
      isWelcomeModalOpen: firstLogin,
    };
    this.switchCategories = this.switchCategories.bind(this);
    this.toggleBackgroundFade = this.toggleBackgroundFade.bind(this);
    this.closeWelcomeModal = this.closeWelcomeModal.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    handleGetCategories({ userId })
      .then((response) => {
        this.setState({
          category: response.categories ? response.categories[0] : '',
          categories: response.categories ? response.categories : [''],
        });
      })
      .catch(error => console.log(error));
  }

  openWelcomeModal() {
    this.setState({
      isWelcomeModalOpen: true,
    });
  }

  closeWelcomeModal() {
    const { firstLogin, userId } = this.props;
    if (firstLogin) {
      handleUpdateFirstLogin({ userId })
      .catch(error => console.log(error))
      this.setState({
        isWelcomeModalOpen: false,
      });
    }
  }

  toggleBackgroundFade({ fade }) {
    this.setState({
      fadeBackground: fade,
    });
  }

  switchCategories({ category }) {
    this.setState({
      category,
    });
  }

  renderWelcomeModal() {
    const { isWelcomeModalOpen } = this.state;
    return (
      <Modal
        isOpen={isWelcomeModalOpen}
        onRequestClose={this.closeWelcomeModal}
        ariaHideApp={false}
      >
        <h3>
          Welcome to Talk Board
        </h3>
        <h4>
          The app which aims to make communication simple
        </h4>
        <p>
          We have added an example category and a few images to get you started
        </p>
        <p>
          To add more head over to Add Images and you can browse our collection or
          upload your download
          To start using a new image you will need to add your categories and
          assign your images to the appropriate one.
        </p>
        <br />
        <p>
          Thanks for using Talk Board, let me know if you have any questions or difficulties
        </p>
        <Button
          label="Continue"
          onClick={() => this.closeWelcomeModal()}
        />
      </Modal>
    )
  }

  render() {
    const { category, fadeBackground, categories } = this.state;
    const { userId, firstLogin } = this.props;
    console.log(firstLogin)
    return (
      <div
        className="TalkBoardView"
      >
        <CategoriesList
          switchCategories={this.switchCategories}
          categories={categories}
        />
        {category
          ? (
            <TalkBoardSelectContainer
              key={category}
              category={category}
              toggleBackgroundFade={this.toggleBackgroundFade}
              userId={userId}
            />
          ) : null
          }
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
        {firstLogin ? this.renderWelcomeModal() : null}
      </div>
    );
  }
}

TalkBoardView.propTypes = {
  userId: PropTypes.string,
  firstLogin: PropTypes.bool,
};

TalkBoardView.defaultProps = {
  userId: undefined,
  firstLogin: undefined,
};


export default connect(mapStateToProps)(TalkBoardView);
