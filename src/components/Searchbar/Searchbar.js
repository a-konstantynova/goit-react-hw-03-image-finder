import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('Введите поисковый запрос!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchForm__button}>
            <span className={s.searchForm__button_label}>Search</span>
          </button>
          <input
            className={s.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
