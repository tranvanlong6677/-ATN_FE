import { callFetchResumeInWeek } from "@/config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCompany } from "@/redux/slice/companySlide";
import { fetchJob } from "@/redux/slice/jobSlide";
import { fetchUser } from "@/redux/slice/userSlide";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DashboardPage = () => {
  const NO_DATA = "No data";
  const [quantityResumeInWeek, setQuantityResumeInWeek] = useState<number>(0);
  const dispatch = useAppDispatch();
  const meta = useAppSelector((state) => state.user.meta);
  const metaCompany = useAppSelector((state) => state.company.meta);
  const metaJob = useAppSelector((state) => state.job.meta);
  const user = useAppSelector((state) => state.account.user);

  const formatter = (value: number | string) => {
    return <CountUp end={Number(value)} separator="," />;
  };
  const fetchResumeInWeek = async () => {
    try {
      const res = await callFetchResumeInWeek();
      setQuantityResumeInWeek(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchUser({ query: "" }));
    dispatch(fetchCompany({ query: "" }));
    dispatch(fetchJob({ query: "" }));
    fetchResumeInWeek();
  }, []);

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={8}>
        <Card title="Số lượng người dùng" bordered={false}>
          {user?.role?.name === "SUPER_ADMIN" ? (
            <Statistic title="Users" value={meta.total} formatter={formatter} />
          ) : (
            <Statistic title="Users" value={NO_DATA} />
          )}
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title="Số lượng công ty" bordered={false}>
          {user?.role?.name === "SUPER_ADMIN" ? (
            <Statistic
              title="Companies"
              value={metaCompany.total}
              formatter={formatter}
            />
          ) : (
            <Statistic title="Companies" value={NO_DATA} />
          )}
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title="Số lượng Job hiện có" bordered={false}>
          {user?.role?.name === "SUPER_ADMIN" ? (
            <Statistic
              title="Jobs"
              value={metaJob.total}
              formatter={formatter}
            />
          ) : (
            <Statistic title="Jobs" value={NO_DATA} />
          )}
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card
          title="Số lượng CV được gửi trong 7 ngày gần nhất"
          bordered={false}
        >
          {user?.role?.name === "SUPER_ADMIN" ? (
            <Statistic
              title="CV"
              value={quantityResumeInWeek}
              formatter={formatter}
            />
          ) : (
            <Statistic title="CV" value={NO_DATA} />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
