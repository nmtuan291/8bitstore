import { User } from "../interfaces/interfaces";

const Validation = (formData: User): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // Username
  if (!formData.userName) errors.userName = "Tên người dùng là bắt buộc";

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!formData.email) {
    errors.email = "Email là bắt buộc";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Full Name
  if (!formData.fullName) errors.fullName = "Họ tên là bắt buộc";

  // Phone Number (optional, but you can uncomment to require)
  const phonePattern = /^\d{9,15}$/;
  if (formData.phoneNumber && !phonePattern.test(formData.phoneNumber)) {
    errors.phoneNumber = "Số điện thoại không hợp lệ";
  }

  // Password
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!formData.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (!passwordPattern.test(formData.password)) {
    errors.password = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
  }

  // Confirm Password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

export default Validation;
