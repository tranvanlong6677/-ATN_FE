import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import logo from "../../../public/logo.jpg";
import styles from "@/styles/client.module.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={`footer-wrapper`}>
      {/* <Container></Container> */}
      <div className={`${styles["container"]} container`}>
        <img className="logo-image" src={logo} alt="" />

        <div className="footer-info">
          <div className="for-web">
            <h4>Về VieclamIT</h4>
            <ul>
              <li onClick={() => navigate("/")}>Trang chủ</li>
              <li
                onClick={() => {
                  navigate("/about");
                }}
              >
                Về vieclamit.com
              </li>
            </ul>
          </div>
          <div className="contact">
            <h4>Thông tin liên hệ</h4>
            <div className="contact-item">
              <div className="icon">
                <PhoneOutlined />
              </div>
              <div className="value">Số điện thoại : 0123456789</div>
            </div>

            <div className="contact-item">
              <div className="icon">
                <MailOutlined />
              </div>
              <div className="value">Email : vieclamit@gmail.com</div>
            </div>

            <div className="contact-item">
              <div className="icon">
                <HomeOutlined />
              </div>
              <div className="value">
                Địa chỉ: Đường xx, Quận yy, Thành phố zz
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
