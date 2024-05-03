import React, { useState } from "react";
import "./FormSignup.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function FormSignup() {
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    sex: "male",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/users/register",
        dataForm
      );
      setIsRegistered(true);
      if (res.data) {
        Swal.fire({
          title: "Bạn đã đăng ký tài khoản thành công!",
          text: "Bây giờ hãy tới Gmail của bạn để tiến hành xác thực người dùng.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // // Thay đổi URL và ngăn người dùng quay lại trang xác thực trước đó
            // window.history.replaceState(null, "", "/");

            // // Điều hướng đến trang chủ
            // window.location.href = "/";
            window.location.href = "https://mail.google.com/";
          }
        });
      }
    } catch (error) {
      console.log(error);
      console.log("check 32 ", error.response?.data?.errors?.email?.msg);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response?.data?.errors?.email?.msg}`,
      });
    }
  };
  return (
    <>
      <div className="container_form">
        <form action="">
          <div className="header">
            <div className="t_head">
              <h1>Đăng ký</h1>
              <span className="exit">x</span>
            </div>
            <div className="b_head">
              <h5>Nhanh chóng và dễ dàng</h5>
            </div>
          </div>
          <div className="main_inp">
            <div className="name_inp">
              <input
                type="text"
                placeholder="Họ"
                value={dataForm.lastName}
                onChange={(e) =>
                  setDataForm({ ...dataForm, lastName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tên"
                value={dataForm.firstName}
                onChange={(e) =>
                  setDataForm({ ...dataForm, firstName: e.target.value })
                }
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="email"
              value={dataForm.email}
              onChange={(e) =>
                setDataForm({ ...dataForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="password"
              value={dataForm.password}
              onChange={(e) =>
                setDataForm({ ...dataForm, password: e.target.value })
              }
            />
            <select
              name="gender"
              className="gender"
              value={dataForm.sex}
              onChange={(e) =>
                setDataForm({ ...dataForm, sex: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="des">
              <p>
                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
                liện hệ bạn lên này.
              </p>
              <p>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
                <span> Điều khoản, Chính sách quyền riêng tư</span> và
                <span> Chính sách cookie</span> của chúng tôi.
              </p>
            </div>
          </div>
          <div className="foo_btn">
            <button onClick={(e) => handleSignup(e)}>Đăng ký</button>
          </div>
        </form>
      </div>
    </>
  );
}
