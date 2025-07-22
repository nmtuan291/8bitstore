import "./ChangePassword.scss"

const ChangePassword: React.FC = () => {

  return (
    <div className="change-password-page-wrapper">
      <div className="change-password-container">
        <label htmlFor="password">Mật khẩu mới</label>
        <input id="password" className="" type="password" placeholder="Nhập mật khẩu mới" />
        <label htmlFor="re-enter">Nhập lại mật khẩu</label>
        <input id="re-enter" className="" type="password" placeholder="Nhập lại mật khẩu" />
        <button>Cập nhật</button>
      </div>
    </div>
  )
}

export default ChangePassword;