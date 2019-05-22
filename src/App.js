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
      console.log("value: ", process.env.REACT_APP_SEARCH_URL)
      const data = await this.props.searchItem(this.state.value);
      this.setState(prevState => ({
        ...prevState,
        item: [...data.item]
      }));
      this.props.isComplete();
    }

    async componentDidMount(){
      this.props.isLoading();
      const data = await this.props.fetchItem();
      this.setState(prevState => ({
        ...prevState,
        item: [...data.item]
      }));
      this.props.isComplete();
    }

  render() {
        const { item } = this.state;
        return (
            <div className="main-container">
                <div className="main-header">
                    <div className="title"><h1>Meteorite Explorer</h1></div>
                    <div className="main-form">
                        <form onSubmit={this.handleSearch}>
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                </div>
                {this.props.item.isLoading ? <Spinner/> : <div/>}
                <div className="table-container">
                    <table className="main-table">
                        <thead className="table-head">
                            <tr>
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
                                item.map((element, index) => {
                                    let year = element.year;
                                    return (
                                        <tr key={`tr- ${index}`}>
                                            <td>{element.name}</td>
                                            <td>{element.id}</td>
                                            <td>{element.nametype}</td>
                                            <td>{element.recclass}</td>
                                            <td>{element.mass}</td>
                                            <td>{element.fall}</td>
                                            <td>{year ? year.slice(0, 4) : ''}</td>
                                            <td>{element.reclat}</td>
                                            <td>{element.reclong}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className="main-footer">
                    <h3>pagination</h3>
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

