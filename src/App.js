import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, } from 'redux';
import { fetchItem, isLoading, isComplete, searchItem } from './actions/index';
import Spinner from './Spinner';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            error: '',
            isLoading: false,
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSearch = async (event) => {
        event.preventDefault();
        this.props.isLoading();
        const data = await this.props.searchItem(this.state.value);
        data.type === 'SET_ITEM' ? 
        this.setState(prevState => ({
            ...prevState,
            item: [...data.item],
            error: ''
        })) :
        this.setState(prevState => ({
            ...prevState,
            error: [data.error]
        })) 
        this.props.isComplete();
    }

    async componentDidMount(){
      this.props.isLoading();
      const data = await this.props.fetchItem();
      data.type === 'SET_ITEM' ? 
        this.setState(prevState => ({
            ...prevState,
            item: [...data.item],
            error: ''
        })) :
        this.setState(prevState => ({
            ...prevState,
            error: [data.error]
        })) 
      this.props.isComplete();
    }

  render() {
        const { item } = this.state;
        return (
            <div className="main-container">
                <div className="main-header">
                    <div className="title"><h1>Find your meteorite landing info</h1></div>
                    <div className="main-form">
                        <form onSubmit={this.handleSearch}>
                            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by name" />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                </div>
                {this.props.item.isLoading ? <Spinner/> : <div/>}
                <div className="table-container">
                    <table className="main-table">
                        <thead className="table-head">
                            <tr className="tr-head">
                                <td className="table-cell">Name</td>
                                <td className="table-cell">Id</td>
                                <td className="table-cell">Name Type</td>
                                <td className="table-cell">Rec Class</td>
                                <td className="table-cell">Mass (g)</td>
                                <td className="table-cell">Fall</td>
                                <td className="table-cell">Year</td>
                                <td className="table-cell">Latitude</td>
                                <td className="table-cell">Longitude</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.error !== '' ? 
                                <tr className="error-tr"><td>{`${this.state.error}.`}</td></tr> :
                                item.length < 1 ?
                                <tr className="error-tr"><td>{`Search term not found (status code: 400)`}</td></tr> :
                                item.map((element, index) => {
                                    let year = element.year;
                                    return (
                                        <tr key={`tr- ${index}`}>
                                            <td className="table-cell">{element.name}</td>
                                            <td className="table-cell">{element.id}</td>
                                            <td className="table-cell">{element.nametype}</td>
                                            <td className="table-cell">{element.recclass}</td>
                                            <td className="table-cell">{element.mass}</td>
                                            <td className="table-cell">{element.fall}</td>
                                            <td className="table-cell">{year ? year.slice(0, 4) : ''}</td>
                                            <td className="table-cell">{element.reclat}</td>
                                            <td className="table-cell">{element.reclong}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className="main-footer">
                    <h3>Pagination: work in progress</h3>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
  item: state.item,
  isLoading: state.isLoading,
}};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchItem,
    isLoading,
    isComplete,
    searchItem
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

