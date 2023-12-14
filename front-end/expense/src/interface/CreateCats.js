import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string(),
});

const initialValues = {
  name: '',
  description: '',
};

const CreateCats = () => {
  const [tokenError, setTokenError] = useState(false);
  const [error, setError] = useState('');
  const [successfulPost, setSuccessfulPost] = useState(false);

  const handleSubmit = async ({ name, description }) => {
    try {
      const response = await axios.post(`http://localhost:3000/category`, {
        name: name,
        description: description,
      });

      if (response.data) {
        console.log(response.data);
        setSuccessfulPost(true);
        setError(response.error);
      } else {
        setError(response.error);
        console.log("Error creating category:", response.error);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      {successfulPost ? <p style={{ color: "#FB4807", fontSize: "15px" }}>Category created!!</p> : ""}
      {tokenError ? <Redirect to='/login' /> : ''}

      <Formik
        validationSchema={FormSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm({
            name: '',
            description: '',
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <p style={{ backgroundColor: "#a300cc", color: "white", width: "250px", height: "30px", paddingTop: "2px", paddingLeft: "5px" }}>Add Category</p>

            <label htmlFor="name" className="form-label" style={{ fontSize: "15px" }}>Name</label><br />
            <Field name="name" style={{ width: "250px", height: "25px", color: "#4380C3", fontSize: "15px" }} /><br />
            {errors.name && touched.name ? (<div style={{ color: 'red' }}>{errors.name}</div>) : null}<br />

            <label htmlFor="description" className="form-label" style={{ fontSize: "15px" }}>Description</label><br />
            <Field name="description" style={{ width: "250px", height: "25px", color: "#4380C3", fontSize: "15px" }} /><br />
            {errors.description && touched.description ? (<div style={{ color: 'red' }}>{errors.description}</div>) : null}<br />

            <small style={{ color: "red" }}>{error}</small>
            <Button style={{ backgroundColor: "#00b359" }} type="submit">Add Category</Button><br />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCats;
