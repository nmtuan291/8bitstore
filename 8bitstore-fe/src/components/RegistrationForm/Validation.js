const Validation = (formData) => {
    const errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
        errors.email = "Email format is not correct.";
    }

    if (!formData.fullName) {
        errors.fullName = "Full name is required";
    }

    if (!formData.address) {
        errors.address = "Address is required";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (!passwordPattern.test(formData.password)) {
        errors.password = "Password must contain character from a - z, A-Z, 0-9, at least 1 special character and the length is greater or equal to 8"
    }

    if (formData.password !== formData.confirmPassworod) {
        errors.confirmPassworod = "Password didn't match";
    } else if (!formData.confirmPassworod) {
        
    }

    if (!formData.phoneNumber) {
        errors.phoneNumber = "Phone number is required";
    }

    return errors;
};

// export default Validation;


export default Validation;
