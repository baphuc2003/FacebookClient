import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import cors from "cors";
import Swal from "sweetalert2";
export default function VerifyEmailRegister() {
  const [dataQuery, setDataQuery] = useState({});
  const [searchParam] = useSearchParams();
  // Lấy tham số truy vấn từ URL
  useEffect(() => {
    const fetchData = async () => {
      // Lấy tham số truy vấn từ URL
      const queryParams = Object.fromEntries([...searchParam]);
      console.log("Query params:", queryParams);
      setDataQuery(queryParams);

      try {
        const res = await axios.post(
          `http://localhost:4001/users/verify-email`,
          queryParams
        );
        console.log(res);
        if (res.data) {
          Swal.fire({
            title: "Bạn đã xác thực email thành công!",
            text: "Nhấn vào đây để về Trang chủ",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              // Điều hướng đến trang chủ sau khi người dùng nhấn nút OK
              window.location.href = "/";
            }
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Bạn đã xác thực Email trước đó rồi!",
          text: "Nhấn vào đây để về Trang chủ",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // Thay đổi URL và ngăn người dùng quay lại trang xác thực trước đó
            window.history.replaceState(null, "", "/");

            // Điều hướng đến trang chủ
            window.location.href = "/";
          }
        });
      }
    };

    fetchData();
  }, [searchParam]);
  return <></>;
}
