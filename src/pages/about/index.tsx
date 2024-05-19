import styles from "styles/client.module.scss";

const AboutPage = () => {
  return (
    <div className={`${styles["container"]} about-container`}>
      <div className="about-content">
        <h1>Về VieclamIT</h1>
        <p>
          VieclamIT giúp developer chất như bạn phát triển sự nghiệp. Chúng tôi
          cung cấp những cơ hội việc làm IT tốt nhất cũng như nhiều nguồn tài
          liệu hữu ích trên blog để giúp bạn phát triển. VieclamIT được những
          công ty IT hàng đầu lựa chọn để tuyển dụng các ứng viên IT tài năng
          nhất.
        </p>

        <h2>Điều Gì Khiến Chúng Tôi Khác Biệt?</h2>
        <p>VieclamIT là trang web việc làm duy nhất tại Việt Nam:</p>
        <ul>
          <li>
            <span> Tập trung vào việc làm IT </span>
            <br />
            Chúng tôi thiết kế trang web dành riêng cho nhu cầu và sở thích của
            ứng viên IT.
          </li>

          <li>
            <span> Sàng lọc ứng viên</span>
            <br />
            Nhà tuyển dụng chỉ nhận CV từ các developer có kinh nghiệm.
          </li>

          <li>
            <span> Cung cấp thông tin đánh giá công ty </span>
            <br />
            Ứng viên có thể thấy được môi trường làm việc tại các công ty trước
            khi họ ứng tuyển.
          </li>
        </ul>

        <h2>Bạn có cần một nhân viên IT xuất chúng ngay lúc này?</h2>
        <p>Hãy để lại thông tin để được chúng tôi liên hệ tư vấn ngay.</p>

        <h2>Bạn muốn liên hệ với chúng tôi?</h2>
        <p>
          Tên: Công ty Cổ Phần VieclamIT <br />
          Địa chỉ văn phòng: Đường xx, Quận yy, Thành phố zz Hồ Chí Minh, Việt
          Nam <br />
          Mã số thuế: xxxxxxxxxx <br />
        </p>

        <h2>Bạn muốn tìm hiểu thêm?</h2>
        <p>
          Các bạn có thể tham khảo các bài báo về VieclamIT và gặp gỡ thành viên
          VieclamIT.
        </p>

        <h2>Bạn muốn gia nhập VieclamIT?</h2>
        <p>Chúng tôi đang tuyển dụng!</p>
      </div>
    </div>
  );
};

export default AboutPage;
