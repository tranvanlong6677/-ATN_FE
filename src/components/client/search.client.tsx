import { Button, Col, Form, FormProps, Row, Select, notification } from "antd";
import {
  DownOutlined,
  EnvironmentOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import { LOCATION_LIST, SKILLS_LIST } from "@/config/utils";
import { ProForm } from "@ant-design/pro-components";
import { useState } from "react";
import { callFetchJob, callSearchJob } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { searchJob } from "@/redux/slice/jobSlide";
type FieldType = {
  skills: string[];
  location: string[];
};
const SearchClient = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const optionsSkills = SKILLS_LIST;
  const optionsLocations = LOCATION_LIST;
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

      const res = await dispatch(searchJob({ values, query }));
      navigate("/job");
    } catch (error) {
      notification.error({ message: "Error" });
    }
  };
  const searchJobFunction = () => {};
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
        <Col span={24} md={16}>
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
        <Col span={12} md={4}>
          <ProForm.Item name="location">
            <Select
              mode="multiple"
              allowClear
              //   showArrow={false}
              suffixIcon=<DownOutlined />
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
        <Col span={12} md={4}>
          <Button
            type="primary"
            // onClick={() => searchJobFunction()}
            htmlType="submit"
          >
            Search
          </Button>
        </Col>
      </Row>
    </ProForm>
  );
};
export default SearchClient;
