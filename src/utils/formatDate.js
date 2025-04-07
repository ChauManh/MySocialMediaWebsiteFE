// utils/formatDate.js

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 nếu chỉ có 1 chữ số
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0, vì vậy phải cộng thêm 1)
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0'); // Lấy giờ và thêm số 0 nếu chỉ có 1 chữ số
    const minutes = String(d.getMinutes()).padStart(2, '0'); // Lấy phút và thêm số 0 nếu chỉ có 1 chữ số
  
    return `${hours}h${minutes} ${day}/${month}/${year}`;
  };
  
  export default formatDate;
  