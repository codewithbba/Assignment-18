import React, { useState } from "react";
import "./RagistrationForm.css";

function RegistrationForm() {
  const [formValues, setFormValues] = useState({
    userId: "",
    password: "",
    name: "",
    address: "",
    country: "",
    zipCode: "",
    email: "",
    sex: "",
    language: [],
    about: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedLanguages = [...formValues.language];
    if (checked) {
      updatedLanguages.push(value);
    } else {
      updatedLanguages = updatedLanguages.filter((lang) => lang !== value);
    }
    setFormValues({ ...formValues, language: updatedLanguages });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.userId || formValues.userId.length < 5 || formValues.userId.length > 12) {
      errors.userId = "Required and must be of length 5 to 12.";
    }
    if (!formValues.password || formValues.password.length < 7 || formValues.password.length > 12) {
      errors.password = "Required and must be of length 7 to 12.";
    }
    if (!formValues.name || !/^[A-Za-z]+$/.test(formValues.name)) {
      errors.name = "Required and alphabets only.";
    }
    if (!formValues.country) {
      errors.country = "Required. Must select a country.";
    }
    if (!formValues.zipCode || !/^\d+$/.test(formValues.zipCode)) {
      errors.zipCode = "Required. Must be numeric only.";
    }
    if (!formValues.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      errors.email = "Required. Must be a valid email.";
    }
    if (!formValues.sex) {
      errors.sex = "Required.";
    }
    if (formValues.language.length === 0) {
      errors.language = "Required.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      {isSubmitted ? (
        <div>Form successfully submitted!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>User Id:</label>
            <input
              type="text"
              name="userId"
              value={formValues.userId}
              onChange={handleInputChange}
            />
            {formErrors.userId && <span>{formErrors.userId}</span>}
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>

          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span>{formErrors.name}</span>}
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Country:</label>
            <select
              name="country"
              value={formValues.country}
              onChange={handleInputChange}
            >
              <option value="">(Please select a country)</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
            {formErrors.country && <span>{formErrors.country}</span>}
          </div>

          <div>
            <label>ZIP Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formValues.zipCode}
              onChange={handleInputChange}
            />
            {formErrors.zipCode && <span>{formErrors.zipCode}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span>{formErrors.email}</span>}
          </div>

          <div>
            <label>Sex:</label>
            <input
              type="radio"
              name="sex"
              value="Male"
              onChange={handleInputChange}
            />{" "}
            Male
            <input
              type="radio"
              name="sex"
              value="Female"
              onChange={handleInputChange}
            />{" "}
            Female
            {formErrors.sex && <span>{formErrors.sex}</span>}
          </div>

          <div>
            <label>Language:</label>
            <input
              type="checkbox"
              name="language"
              value="English"
              onChange={handleCheckboxChange}
            />{" "}
            English
            <input
              type="checkbox"
              name="language"
              value="Non English"
              onChange={handleCheckboxChange}
            />{" "}
            Non English
            {formErrors.language && <span>{formErrors.language}</span>}
          </div>

          <div>
            <label>About:</label>
            <textarea
              name="about"
              value={formValues.about}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;

