import React, { Component } from 'react';
import axios from 'axios';
import IncomeChartHome from '../components/IncomeChartHome';
import { Col, Row, Button } from 'react-bootstrap';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseChartHome from "../components/ExpenseChartHome";
import IncomeChart from '../components/IncomeChart';
import BarChartComponent from '../components/BarChartComponent';
import { Bar, Line, Pie } from 'react-chartjs-2';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      categories: [],
      itemStart: 0,
      itemEnd: 15,
      display: false,
      token: this.props.token
    };
  }

  // Fetch all categories from the server
  getAllCats = async () => {
    await axios.get(`http://localhost:3000/category`)
      .then(response => {
        this.setState({ categories: response.data.category }, () => console.log("Fetched all categories"), console.log(response.data));
      });
  }

  // Fetch expenses by user ID from the server
  getExpensesByUser = async (id) => {
    await axios.get(`http://localhost:3000/expense/user/` + id)
      .then(response => {
        this.setState({ expenses: response.data.expenses }, () => console.log("Fetched all expenses for the user"));
      });
  }

  // Get all expenses by category ID and user ID from the server
  getExpensesByCat = async (id) => {
    await axios.get(`http://localhost:3000/expense/category/${id}/user/${this.props.currentUserId}`)
      .then(response => {
        this.setState({ expenses: response.data.expenses }, () => console.log("Fetched all expenses for category."));
      });
  }

  // Returns category name given cat id
  getCatName(id) {
    for (let i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i].id === id)
        return this.props.categories[i].name;
    }
    return "No category";
  }

  // Reset item counts for pagination
  resetItemCounts = () => {
    this.setState({ itemStart: 0, itemEnd: 15 });
  }

  // Handle previous button click for pagination
  handlePrev = () => {
    const oldStart = this.state.itemStart;
    const oldEnd = this.state.itemEnd;
    this.setState({ itemStart: oldStart - 15, itemEnd: oldEnd - 15 });
  }

  // Handle next button click for pagination
  handleNext = () => {
    const oldStart = this.state.itemStart;
    const oldEnd = this.state.itemEnd;
    this.setState({ itemStart: oldStart + 15, itemEnd: oldEnd + 15 });
  }

  // Handle category selection
  handleCat = async (id) => {
    this.resetItemCounts();
    if (id === 0) {
      return await this.getExpensesByUser(this.props.currentUserId);
    }
    return await this.getExpensesByCat(id);
  }

  render() {
    const styles = {
      catButton: {
        backgroundColor: "white",
        color: "#D83F87",
        width: '100%',
        border: '1px solid #D83F87',
        borderRadius: '15px',
        marginBottom: '8px',
        fontSize: '15px'
      },
      pageStyles: {
        backgroundColor: "#F7F9FB",
        padding: "20px",
        height: "480px"
      },
      headerStyles: {
        color: "black",
        fontSize: '20px'
      }
    }

    return (
      <div style={styles.pageStyles}>
        {/* Bar Chart */}
        <Row>
          <Col md={8} style={{ width: "700px", height: "410px", backgroundColor: "white", border: "solid 1px lightgrey", marginLeft: "-11px", float: "left" }}>
            <div style={{ width: "700px", height: "40px", fontSize: "14px", backgroundColor: "#ff3300", color: "white", paddingTop: "10px", paddingLeft: "10px" }}>
              Yearly Breakdown
            </div>
            <div style={{ width: "650px", height: "150px", marginLeft: "10px", padding: "5px" }}><IncomeChartHome /></div><br />
          </Col>

          {/* Pie Chart */}
          {/* <Col md={4} style={{float:"left", marginLeft:"80px"}}>
            <div style={{width:"430px", height:"400px",backgroundColor:"white", border:"solid 1px lightgrey"}}>
                <div style={{width:"430px", height:"40px", fontSize:"14px", backgroundColor:"#a300cc", color:"white", paddingTop:"10px", paddingLeft:"10px"}}>
                  Expense Overview
                </div>
                <div style={{width:"50px",height:"150px", marginLeft:"50px", padding:"10px"}}><ExpenseChartHome /></div><br/>
                {/* <hr></hr> */}
                {/* <a href="/incomechart1" style={{textDecoration:"none"}}><p style={{color:"#8a00e6", fontSize:"13px", fontWeight:"bold", marginLeft:"490px", paddingBottom:"10px"}}>OPEN REPORT </p></a> */}
          {/* </div> */}
          {/* </Col> */}

          {/* Pie Chart */}
          <Col md={2} style={{ float: "left", marginLeft: "63px" }}>
            <div style={{ width: "350px", height: "410px", backgroundColor: "white", border: "solid 1px lightgrey" }}>
              <div style={{ width: "350px", height: "40px", fontSize: "14px", backgroundColor: "#ff3300", color: "white", paddingTop: "10px", paddingLeft: "10px" }}>
                <b>TrackIt</b>
              </div>
              <p style={{ fontSize: "14px", textAlign: "justify", textJustify: "inter-word", padding: "10px", color: "purple" }}><b>TractIt</b> is an Expense Tracker used to analyze and track monthly income and expense data. It is a simple tool to visualize data. It includes charts that will help users to figure out their income, expenses and savings per month.</p>
              {/* <div style={{width:"50px",height:"150px", marginLeft:"50px", padding:"10px"}}><ExpenseChartHome /></div><br/> */}
              <p style={{ marginTop: "-8px", color: "#005ce6", marginLeft: "20px" }}><b>Steps to analyze your expenditure</b></p>
              <p style={{ width: "150px", marginLeft: "90px", display: "inline-block", height: "50px", fontSize: "15px", color: "white", backgroundColor: "#00b359", paddingTop: "12px", paddingLeft: "28px" }}>
                Add Budget
              </p><br />
              <p style={{ width: "150px", marginLeft: "90px", display: "inline-block", height: "50px", fontSize: "15px", color: "white", backgroundColor: "#ff3300", paddingTop: "12px", paddingLeft: "28px" }}>
                Add Expense
              </p><br />
              <p style={{ width: "150px", marginLeft: "90px", display: "inline-block", height: "50px", fontSize: "15px", color: "white", backgroundColor: "#9933ff", paddingTop: "12px", paddingLeft: "28px" }}>
                View Reports
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
