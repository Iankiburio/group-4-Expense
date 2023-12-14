import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  month: Yup.string(),
  description: Yup.string().required("Required"),
  amount: Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Must be a Valid Amount").required("Required"),
  category: Yup.string()
});

const initialValues = {
  month: '',
  amount: '',
  description: '',
  category: ''
};

const CreateExpense = (props) => {
  const [tokenError, setTokenError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [month, setMonth] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);
  const [catIndex, setCatIndex] = useState(0);
  const [error, setError] = useState('');
  const [successfulPost, setSuccessfulPost] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    getAllCats();
  }, []);

  const getAllCats = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/category`);
      setCategories(response.data.category);
      console.log("Fetched all categories", response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async ({ month, amount, description, category }) => {
    try {
      if (monthIndex === 0) {
        alert("Please select a month");
        return;
      }
      if (catIndex === 0) {
        alert("Please select a Category");
        return;
      }

      const response = await axios.post(`http://localhost:3000/expense`, {
        month: month,
        amount: amount,
        description: description,
        category_id: selectedCatId,
        user_id: localStorage.getItem('currentUserId')
      });

      if (response.data) {
        console.log(response.data);
        setSuccessfulPost(true);
        setError(response.error);
      } else {
        setError(response.error);
        console.log("Error creating expense:", response.error);
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  const handleMonthPullDown = (event) => {
    const selectedindex = event.target.selectedIndex;
    const selectedmonth = event.target.options[event.target.selectedIndex].label;
    setMonth(selectedmonth);
    setMonthIndex(selectedindex);
    setSuccessfulPost(false);
  };

  const handleCatPullDown = (event) => {
    const selectedindex = event.target.selectedIndex;
    const selectedcatid = event.target.options[event.target.selectedIndex].value;
    setSelectedCatId(selectedcatid);
    setCatIndex(selectedindex);
    setSuccessfulPost(false);
  };

  return (
    <div>
      {successfulPost ? <p style={{ color: "#FB4807", fontSize: "15px" }}>Your expense was created</p> : ""}
      {tokenError ? <Redirect to='/login' /> : ''}

      <Formik
        validationSchema={FormSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm({
            amount: '',
            monthList: ''
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p style={{ backgroundColor: "#a300cc", color: "white", width: "250px", height: "30px", paddingTop: "2px", paddingLeft: "5px" }}>Add Expense</p>
            <label htmlFor="month" className="form-label" style={{ fontSize: "15px" }}>Month</label><br />
            <select id="options" name="monthList" style={{ color: "#4380C3", fontSize: "15px", width: "250px", height: "25px" }} onChange={(event) => handleMonthPullDown(event)}>
              <option defaultValue={0} label="--Months--" />
              {months?.map(
                (month) => <option key={month.indexOf(month)} value={month.indexOf(month)} label={month} />
              )}
            </select>
            {errors.month && touched.month ? (<div style={{ color: 'red' }}>{errors.month}</div>) : null}<br />

            <label htmlFor="amount" className="form-label" style={{ fontSize: "15px" }}>Amount</label><br />
            <Field name="amount" style={{ width: "250px", height: "25px", color: "#4380C3", fontSize: "15px" }} />
            {errors.amount && touched.amount ? (<div style={{ color: 'red' }}>{errors.amount}</div>) : null}<br />

            <label htmlFor="description" className="form-label" style={{ fontSize: "15px" }}>Description</label><br />
            <Field name="description" style={{ color: "#4380C3", fontSize: "15px", width: "250px", height: "25px" }} /><br />
            {errors.description && touched.description ? (<div style={{ color: 'red' }}>{errors.description}</div>) : null}

            <label htmlFor="category" className="form-label" style={{ fontSize: "15px" }}>Category</label><br />
            <select id="options" name="catList" style={{ color: "#4380C3", fontSize: "15px", width: "250px", height: "25px" }} onChange={(event) => handleCatPullDown(event)}>
              <option defaultValue={0} label="--Category--" />
              {categories?.map(
                (cat) => <option key={cat.id} value={cat.id} label={cat.name} />
              )}
            </select><br /><br />

            <small style={{ color: "red" }}>{error}</small>
            <Button className="btn btn-primary " type="submit" style={{ backgroundColor: "#00b359" }}>Add Expense</Button><br />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateExpense;
