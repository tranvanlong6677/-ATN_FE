import { Button, Divider } from "antd";
import styles from "styles/client.module.scss";
import SearchClient from "@/components/client/search.client";
import JobCard from "@/components/client/card/job.card";
import CompanyCard from "@/components/client/card/company.card";
import imgLogo from "/logo.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles["container"]} ${styles["home-section"]}`}>
      <div className="home-logo-container" style={{ marginTop: 20 }}>
        {/* <SearchClient /> */}
        <img src={imgLogo} alt="" className="img-logo-home" />
        <div className="content">
          <h1>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
          <Button
            type="primary"
            onClick={() => {
              navigate("/job");
            }}
          >
            Tìm kiếm công việc
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
      {/* <img src={imgLogo} alt="" className="img-logo-home" /> */}
      <Divider />
      <CompanyCard />
      <div style={{ margin: 50 }}></div>
      <Divider />
      <JobCard />
    </div>
  );
};

export default HomePage;
