import React, { useState } from "react";
import styles from "./Setting.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { updateUserProfile } from "../../services/userApi";

const cx = classNames.bind(styles);

function Setting() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email,
    gender: user?.gender || "",
    about: user?.about || "",
  });

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSaveClick = async (field) => {
    const newValue = formData[field];
    const oldValue = user?.[field];

    if (newValue === oldValue) {
      setEditField(null); // không thay đổi => thoát edit
      return;
    }

    const updateData = { [field]: newValue };
    const res = await updateUserProfile(updateData);
    if (res.EC === 0) {
      setUser((prev) => ({ ...prev, ...updateData }));
      setEditField(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back-button")} onClick={() => navigate("/")}>
        ← Trở về trang chủ
      </div>

      <div className={cx("section")}>
        <h2 className={cx("title")}>Thông tin cá nhân</h2>

        {["fullname", "email", "gender", "about"].map((field) => (
          <div className={cx("info-row")} key={field}>
            <label>
              {
                {
                  fullname: "Họ tên",
                  email: "Email",
                  gender: "Giới tính",
                  about: "Giới thiệu",
                }[field]
              }
              :
            </label>
            {editField === field && field !== "email" ? (
              field === "gender" ? (
                <div className={cx("radio-group")}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      checked={formData.gender === "Nam"}
                      onChange={handleChange}
                    />{" "}
                    Nam
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      checked={formData.gender === "Nữ"}
                      onChange={handleChange}
                    />{" "}
                    Nữ
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={cx("input")}
                />
              )
            ) : field === "email" ? (
              <input
                type="email"
                value={formData.email}
                disabled
                className={cx("input")}
              />
            ) : (
              <span>{formData[field] || "Chưa có thông tin"}</span>
            )}

            {/* Chỉ hiển thị nút sửa/lưu nếu không phải email */}
            {field !== "email" && (
              <button
                className={cx("edit-btn")}
                onClick={() =>
                  editField === field
                    ? handleSaveClick(field)
                    : handleEditClick(field)
                }
              >
                {editField === field ? "Lưu" : "Sửa"}
              </button>
            )}
          </div>
        ))}

        <div className={cx("info-row")}>
          <label>Ngày tạo:</label>
          <span>{formatDate(user?.createdAt)}</span>
        </div>
      </div>

      <div className={cx("section")}>
        <h2 className={cx("title")}>Bảo mật</h2>
        <button
          className={cx("button")}
          onClick={() => alert("Chức năng đang phát triển")}
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

export default Setting;
