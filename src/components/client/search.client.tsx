import { Button, Col, Form, FormProps, Row, Select, notification } from "antd";
import {
  DownOutlined,
  EnvironmentOutlined,
  MoneyCollectOutlined,
  MonitorOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import {
  LOCATION_LIST,
  SKILLS_LIST,
  LEVEL_LIST,
  SALARY_LIST,
} from "@/config/utils";
import { ProForm } from "@ant-design/pro-components";
import { useState } from "react";
import { callFetchJob, callSearchJob } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { searchJob } from "@/redux/slice/jobSlide";
type FieldType = {
  skills: string[];
  location: string[];
  level: string;
  salary?: string;
};
const SearchClient = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const optionsSkills = SKILLS_LIST;
  const optionsLocations = LOCATION_LIST;
  const optionLevels = LEVEL_LIST;
  const optionSalaries = SALARY_LIST;
  const [form] = Form.useForm();
  const [locationSelected, setLocationSelected] = useState<String[]>([]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

  const onFinish = async (values: FieldType) => {
    localStorage.setItem("isSearching", "true");

    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    try {
      localStorage.setItem("isSearching", "true");
      localStorage.setItem("dataSearching", JSON.stringify(values));
      if (!values.level || !values.skills || !values.location) {
        // values = { ...values, level: "-1" };
        notification.error({
          message: "Vui lòng không để trống kỹ năng, địa chỉ, level",
        });
        return;
      }
      if (!values.salary) {
        values = { ...values, salary: "-1" };
      }
      // navigate("/job");
      await dispatch(searchJob({ values, query }));
    } catch (error) {
      notification.error({ message: "Error" });
    }
  };
  return (
    <ProForm
      form={form}
      onFinish={onFinish}
      submitter={{
        render: () => <></>,
      }}
    >
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <h2>Việc Làm IT Cho Developer</h2>
        </Col>
        <Col span={23} md={17} style={{ paddingRight: "0" }}>
          <ProForm.Item name="skills">
            <Select
              mode="multiple"
              allowClear
              suffixIcon={null}
              style={{ width: "100%" }}
              placeholder={
                <>
                  <MonitorOutlined /> Tìm theo kỹ năng...
                </>
              }
              optionLabelProp="label"
              options={optionsSkills}
            />
          </ProForm.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11} md={5}>
          <ProForm.Item name="location">
            <Select
              mode="multiple"
              allowClear
              //   showArrow={false}
              suffixIcon={<DownOutlined />}
              style={{ width: "100%" }}
              placeholder={
                <>
                  <EnvironmentOutlined /> Địa điểm...
                </>
              }
              optionLabelProp="label"
              options={optionsLocations}
              onChange={(e: string[]) => {
                setLocationSelected(e);
              }}
            />
          </ProForm.Item>
        </Col>
        <Col span={1} md={1}></Col>
        <Col span={11} md={5}>
          <ProForm.Item name="level">
            <Select
              // mode="multiple"
              allowClear
              //   showArrow={false}
              suffixIcon={<DownOutlined />}
              style={{ width: "100%" }}
              placeholder={
                <>
                  <OrderedListOutlined /> Level
                </>
              }
              optionLabelProp="label"
              options={optionLevels}
              onChange={(e: string[]) => {
                // setLocationSelected(e);
              }}
            />
          </ProForm.Item>
        </Col>
        <Col span={0} md={1}></Col>

        <Col span={11} md={5}>
          <ProForm.Item name="salary">
            <Select
              // mode="multiple"
              allowClear
              //   showArrow={false}
              suffixIcon={<DownOutlined />}
              style={{ width: "100%" }}
              placeholder={
                <>
                  <MoneyCollectOutlined /> Mức lương
                </>
              }
              optionLabelProp="label"
              options={optionSalaries}
              onChange={(e: string[]) => {
                // setLocationSelected(e);
              }}
            />
          </ProForm.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12} md={4}>
          <Button
            type="primary"
            // onClick={() => searchJobFunction()}
            htmlType="submit"
          >
            Tìm kiếm jobs
          </Button>
        </Col>
      </Row>
    </ProForm>
  );
};
export default SearchClient;
