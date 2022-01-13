import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Button from './components/Button';
import fetchImages from './components/APIservice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  static propTypes = {
    page: PropTypes.number,
    status: PropTypes.string,
    error: PropTypes.string,
    largeImage: PropTypes.string,
    isOpenModal: PropTypes.bool,
  };

  state = {
    searchQuery: '',
    images: [],
    page: null,
    status: 'idle',
    error: null,
    largeImage: '',
    isOpenModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.setState({ status: 'pending' });
      fetchImages(searchQuery, page)
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          }));
          if (this.state.page !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleCloseModal = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    this.setState({
      isOpenModal: false,
      largeImage: '',
    });
  };

  handleCloseModalByEscape = () => {
    this.setState({ isOpenModal: false, largeImage: '' });
  };

  handleOpenModal = e => {
    this.setState({ isOpenModal: true, largeImage: e.target.dataset.source });
  };

  render() {
    const { images, status, isOpenModal, largeImage, error } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />

        <ImageGallery images={images} onOpenModal={this.handleOpenModal} />

        {status === 'pending' && <Loader />}
        {images.length !== 0 && (
          <Button text="Load more" onClick={this.onLoadMoreClick} />
        )}

        {status === 'rejected' && <h1>{error.message}</h1>}

        {isOpenModal && (
          <Modal
            largeModalImg={largeImage}
            onCloseModal={this.handleCloseModal}
            onClickByEscape={this.handleCloseModalByEscape}
          />
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
