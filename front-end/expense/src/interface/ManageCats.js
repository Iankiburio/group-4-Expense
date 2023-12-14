import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class ManageCats extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            catId: 0,
            clicked: false,
            successfulDelete: false,
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    componentDidUpdate() {
        this.getCategories();
    }

    // Fetch all categories
    getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/category');
            this.setState({ categories: response.data.category }, () => console.log("Fetched all categories"), console.log(response.data));
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    // Set state to navigate to the edit category page
    editCat = (catId) => {
        this.setState({ clicked: true, catId });
    };

    render() {
        return (
            <div>
                {this.state.clicked ? (
                    <Redirect to={{ pathname: `/editcategory/${this.state.catId}` }} />
                ) : (
                    ""
                )}

                {this.state.categories.length > 0 ? (
                    <Table bordered hover size="md" style={{ marginTop: "30px", marginLeft: "30px" }}>
                        <thead style={{ backgroundColor: "#a300cc", color: "white", fontSize: "14px" }}>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name ?? "No Name"}</td>
                                    <td>{category.description ?? "No Description"}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: "#00b359" }}
                                            onClick={() => this.editCat(category.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p style={{ marginLeft: "30px" }}>No categories created. Please add a category.</p>
                )}
            </div>
        );
    }
}
