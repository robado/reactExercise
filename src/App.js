import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {listItems: []};
        this.repository = React.createRef();
    }



    componentDidMount() {
        fetch('https://api.github.com/search/repositories?q=react')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    listItems: responseData.items
                })
            });
    }

    searchButtonPressed = () => {
        let repository = this.refs.repository.value;
        fetch('https://api.github.com/search/repositories?q=' + repository)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    listItems: responseData.items
                })
            });
    };


    render() {
        const rows = this.state.listItems.map((repo, index) =>
            <tr key={index}>
                <td>{repo.full_name}</td>
                <td><a href={'' + repo.url}>{repo.url}</a></td>
            </tr>
        );
        console.log({rows});
        return (
            <div>
                <h2>Repositories</h2>
                <input type="text" ref="repository"/><button onClick={this.searchButtonPressed}>Search</button>
                <ul>
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                        </tr>
                        {rows}
                        </tbody>
                    </table>
                </ul>
            </div>
        );
    }
}
export default App;
