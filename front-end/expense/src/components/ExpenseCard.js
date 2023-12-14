import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class ExpenseCard extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  // Returns category name given cat id
  getCatName(id) {
    for (let i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i].id === id)
        return this.props.categories[i].name;
    }
    return "No category";
  }

  // Handle click to redirect to the detailed expense view
  handleRenderItem = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <Col>
        {this.state.clicked ? (
          <Redirect to={`/expense/${this.props.expenseitem.id}`} />
        ) : (
          ""
        )}

        {/* Expense Card */}
        <Card style={{ width: "250px", height: "200px", marginBottom: "25px" }}>
          <Card.Body>
            {/* Expense Title */}
            <Card.Title style={{ fontSize: "13px", color: "#606A72", backgroundColor: "aliceblue", paddingTop: "5px", width: "200px", height: "30px" }}>
              Expense ID: {(this.props.expenseitem.id) ?? "Generic Expense"}
            </Card.Title>

            {/* Expense Details */}
            <Card.Text style={{ fontSize: "13px", color: "#D83F87" }}>
              {this.getCatName(this.props.expenseitem.category_id)}<br />
              {this.props.expenseitem.month ?? "Sorry, No Month"}<br />
              {titleCase(this.props.expenseitem.description) ?? "Sorry, No Description"}
            </Card.Text>

            {/* Expense Amount */}
            <Card.Subtitle className="float-left " style={{ color: "#71D4EE" }}>
              ${this.props.expenseitem.amount ?? "?.??"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Card.Subtitle>

          </Card.Body>
        </Card>
      </Col>
    );
  }
}
