import React, { useState } from 'react'
import * as Yup from "yup"
import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap"

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "Male",
    interests: [],
    birthDate: "",
    city: "",
    state: "",
    zipcode: "",
    address: ""
}

const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    username: Yup.string().required("Username is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one symbol"
        )
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    age: Yup.number()
        .typeError("Age must be a number")
        .min(18, "You must be at least 18 years old")
        .max(100, "You cannot be older than 100 years")
        .positive("Age cannot be negative")
        .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
        .min(1, "Select at least one interest")
        .required("Select at least one interest"),
    birthDate: Yup.date().required("Birth date is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string()
        .min(6, "Zip code must be 6 characters long")
        .max(6, "Zip code must be 6 characters long")
        .required("Zip code is required")
});


const htmlFormContent = [
    { type: 'text', name: 'firstName', label: 'First Name' },
    { type: 'text', name: 'lastName', label: 'Last Name' },
    { type: 'text', name: 'username', label: 'Username' },
    { type: 'email', name: 'email', label: 'Email' },
    { type: 'text', name: 'phoneNumber', label: 'Phone Number' },
    { type: 'number', name: 'age', label: 'Age' },
    { type: 'text', name: 'city', label: 'City' },
    { type: 'text', name: 'state', label: 'State' },
    { type: 'text', name: 'zipcode', label: 'ZipCode' },
    { type: 'text', name: 'address', label: 'Address' },
    { type: 'date', name: 'birthDate', label: 'Date Of Birth' },
    { type: 'password', name: 'password', label: 'Password' },
    { type: 'password', name: 'confirmPassword', label: 'Confirm Password' },
]


const SignupForm = () => {
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterest = [...formData.interests];
        if (checked) {
            updatedInterest.push(name);
        } else {
            updatedInterest = updatedInterest.filter(
                (interest) => interest !== name
            );
        }
        setFormData({ ...formData, interests: updatedInterest });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("form submitted");
            console.log(formData);
            setFormData(initialForm);

        } catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setErrors(newErrors);

        }

    };

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center my-2'>
                <Col sm={10} md={11}>
                    <h1 className='text-warning text-center fw-bold'><u>React Form using Yup</u></h1>
                    <hr />
                </Col>
            </Row>

            <Form noValidate onSubmit={handleSubmit} className='my-2'>
                <Row className='justify-content-center my-3'>

                    {htmlFormContent.map(item =>

                        <FloatingLabel key={item.name} as={Col} md={4} controlId={item.name} label={item.label} className="mb-3 p-1">
                            <Form.Control type={item.type} required name={item.name} onChange={handleChange} value={formData[item.name]} />
                            {errors[item.name] && <p className="text-danger" type="invalid">{errors[item.name]}</p>}
                        </FloatingLabel>)
                    }

                    <FloatingLabel as={Col} md={4} controlId="validationCustom07" label="Gender" className="mb-3 p-1">
                        <Form.Select name="gender" onChange={handleChange} value={formData.gender} size="sm" aria-label="Floating label select example">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </FloatingLabel>

                    <Form.Group as={Col} md={4} controlId="checkbox" className="mb-3 px-2 py-1">
                        <Form.Label className='text-warning w-full'>Interests</Form.Label>
                        <Form.Check name="coding" id="coding" checked={formData.interests.includes("coding")} onChange={handleCheckboxChange} type="checkbox" className='d-md-inline-block mx-md-2 mx-sm-0' label="coding" />
                        <Form.Check name="singing" id="singing" checked={formData.interests.includes("singing")} onChange={handleCheckboxChange} type="checkbox" className='d-md-inline-block mx-md-2 mx-sm-0' label="singing" />
                        <Form.Check name="dancing" id="dancing" checked={formData.interests.includes("dancing")} onChange={handleCheckboxChange} type="checkbox" className='d-md-inline-block mx-md-2 mx-sm-0' label="dancing" />
                        <Form.Check name="sports" id="sports" checked={formData.interests.includes("sports")} onChange={handleCheckboxChange} type="checkbox" className='d-md-inline-block mx-md-2 mx-sm-0' label="sports" />

                        {errors.interests ? <p className="text-danger" type="invalid">{errors.interests}</p> : <p type="valid"></p>}
                    </Form.Group>

                    <Col md={10} sm={10}>
                        <Button type="submit" className='mt-3 btn-outline-success'>Submit form</Button>
                    </Col>
                </Row>

            </Form>
        </Container >

    )
}

export default SignupForm