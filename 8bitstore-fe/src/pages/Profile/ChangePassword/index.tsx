import "./ChangePassword.scss"

const ChangePassword: React.FC = () => {

  return (
    <div className="change-password-container">
      <label htmlFor="password">Mật khẩu mới</label>
      <input id="password" className="" type="text"></input>
      <label htmlFor="re-enter">Nhập lại mật khẩu</label>
      <input id="re-enter" className="" type="text"></input>
      <button>Cập nhật</button>
    </div>
  )
}

export default ChangePassword;