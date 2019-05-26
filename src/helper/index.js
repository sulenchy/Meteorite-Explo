
const fetchApi = async (isLoading, isComplete) => {
    isLoading();
    const data = await this.props.fetchItem();
    this.setState(prevState => ({
        ...prevState,
        item: [...data.item]
    }));
    isComplete();
}

const searchByName = async (isLoading, isComplete) => {
    isLoading();
    const data = await this.props.searchItem(this.state.value);
    this.setState(prevState => ({
        ...prevState,
        item: [...data.item]
    }));
    isComplete();
}


export {fetchApi, searchByName};