import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  month: Yup.string(),
  amount: Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Must be a Valid Amount").required("Required"),
});

const initialValues = {
  month: '',
  amount: '',
};

const CreateBudget = () => {
  const [tokenError, setTokenError] = useState(false);
  const [month, setMonth] = useState('');
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [successfulPost, setSuccessfulPost] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    getIncomes();
  }, []);

  const getIncomes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/income/user/${localStorage.getItem('currentUserId')}`);
      setIncomes(response.data.incomes);
      console.log("Fetched all incomes", response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const handleSubmit = async ({ amount }) => {
    if (index === 0) {
      alert("Please select a month");
      return;
    }

    for (let i = 0; i < incomes.length; i++) {
      if (incomes[i].month === month) {
        alert("Budget for this month already exists. Please modify it.");
        return;
      }
    }

    try {
      const response = await axios.post(`http://localhost:3000/income`, {
        month,
        amount,
        user_id: localStorage.getItem('currentUserId'),
      });

      if (response.data) {
        console.log(response.data);
        setSuccessfulPost(true);
        setError(response.error);
      } else {
        setError(response.error);
        console.log("Error creating budget:", response.error);
      }
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const handlePullDown = (event) => {
    const selectedindex = event.target.selectedIndex;
    const selectedmonth = event.target.value;
    setMonth(selectedmonth);
    setIndex(selectedindex);
    setSuccessfulPost(false);
  };

  return (
    <div>
      {successfulPost ? <p style={{ color: "#FB4807", fontSize: "15px" }}>Budget created!!</p> : ""}
      {tokenError ? <Redirect to='/login' /> : ''}

      <Formik
        validationSchema={FormSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm({
            amount: '',
            monthList: '',
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p style={{ backgroundColor: "#a300cc", color: "white", width: "250px", height: "30px", paddingTop: "2px", paddingLeft: "5px" }}>Add Budget</p>

            <label htmlFor="month" className="form-label" style={{ fontSize: "15px" }}>Month</label><br />
            <select id="options" name="monthList" style={{ color: "#4380C3", fontSize: "15px", width: "250px", height: "25px" }} onChange={(event) => handlePullDown(event)}>
              <option defaultValue={0} label="--Months--" />
              {months?.map(
                (month) => <option key={month} value={month} label={month} />
              )}
            </select><br />
            {errors.month && touched.month ? (<div style={{ color: 'red' }}>{errors.month}</div>) : null}<br />

            <label htmlFor="amount" className="form-label" style={{ fontSize: "15px" }}>Amount</label><br />
            <Field name="amount" style={{ width: "250px", height: "25px", color: "#4380C3", fontSize: "15px" }} /><br />
            {errors.amount && touched.amount ? (<div style={{ color: 'red' }}>{errors.amount}</div>) : null}<br />

            <small style={{ color: "red" }}>{error}</small>
            <Button className="btn btn-primary" style={{ backgroundColor: "#00b359" }} type="submit">Add Budget</Button><br />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBudget;
