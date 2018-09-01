import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {range} from 'lodash';

export default class ItemIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            current_page: 1,
            last_page: null
        };
    }

    loadData() {
        
    }

    renderPagination() {
        // console.log(range(1, 10));
        let {current_page, last_page} = this.state;
        if (current_page == null || last_page == null)
            return null;

        let pagination_range = 10;
        let first = current_page - pagination_range > 1 ? current_page - pagination_range : 1;
        let last = current_page + pagination_range <= last_page ? current_page + pagination_range : last_page;  
        
        return (
            <nav>
                <ul className="pagination">
                    {range(first, last + 1).map(link => {
                        return (
                            <li className="page-item">
                                <a className="page-link">
                                    {link}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    }
    
    componentDidMount() {
        console.log("Is this loaded? Yes.");
        // axios(window.location.href)
        //     .then(response => {
        //             this.setState({
        //                 items: response.data.data,
        //                 current_page: response.data.current_page,
        //                 last_page: response.data.last_page
        //             })
        //         })
        //     .catch(error => { alert(error) })
    }

    render() {
        return (
            <div>
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th> Price </th>
                            <th> Description </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td> {item.id} </td>
                                    <td> {item.name} </td>
                                    <td> {item.price} </td>
                                    <td> {item.description} </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {this.renderPagination()}
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<ItemIndex />, document.getElementById('root'));
}
