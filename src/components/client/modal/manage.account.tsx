import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  message,
  notification,
} from "antd";
import { isMobile } from "react-device-detect";
import type { FormProps, TabsProps } from "antd";
import { IResume } from "@/types/backend";
import { useState, useEffect } from "react";
import {
  callFetchResumeByUser,
  callGetSubscriberSkills,
  callUpdateSubscriber,
} from "@/config/api";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { MonitorOutlined } from "@ant-design/icons";
import { SKILLS_LIST } from "@/config/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changePassword, updateUser } from "@/redux/slice/userSlide";
import { useForm } from "antd/es/form/Form";
import { fetchAccount } from "@/redux/slice/accountSlide";

interface IProps {
  open: boolean;
  onClose: (v: boolean) => void;
}
interface changePasswordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface IUpdateDataUser {
  name: string;
  age: number;
  gender: string;
  address: string;
}

const UserResume = (props: any) => {
  const [listCV, setListCV] = useState<IResume[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      setIsFetching(true);
      const res = await callFetchResumeByUser();
      if (res && res.data) {
        setListCV(res.data as IResume[]);
      }
      setIsFetching(false);
    };
    init();
  }, []);
  const columns: ColumnsType<IResume> = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Công Ty",
      dataIndex: ["companyId", "name"],
    },
    {
      title: "Vị trí",
      dataIndex: ["jobId", "name"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },

    {
      title: "Update CV gần nhất",
      dataIndex: "createdAt",
      render(value, record, index) {
        return <>{dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>;
      },
    },
    {
      title: "",
      dataIndex: "",
      render(value, record, index) {
        return (
          <>
            <a href={`${record.url}`} target="_blank">
              Chi tiết CV
            </a>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table<IResume>
        columns={columns}
        dataSource={listCV}
        loading={isFetching}
        pagination={false}
        size="large"
      />
    </div>
  );
};

const UserUpdateInfo = () => {
  const user = useAppSelector((state) => state.account.user);
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const onFinish: FormProps<IUpdateDataUser>["onFinish"] = async (values) => {
    const res = await dispatch(
      updateUser({
        name: form.getFieldValue("name"),
        age: form.getFieldValue("age"),
        gender: form.getFieldValue("gender"),
        address: form.getFieldValue("address"),
      })
    );

    if (res.payload?.data) {
      message.success(res.payload?.message);
      await dispatch(fetchAccount());

      // form.setFieldValue("name", null);
      // form.setFieldValue("age", null);
      // form.setFieldValue("gender", null);
      // form.setFieldValue("address", null);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.payload?.message,
      });
    }
  };

  const onFinishFailed: FormProps<IUpdateDataUser>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<IUpdateDataUser>
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          initialValue={user.name}
        >
          <Input />
        </Form.Item>

        <Form.Item<IUpdateDataUser>
          label="Tuổi"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
          initialValue={user.age}
        >
          <Input />
        </Form.Item>

        <Form.Item<IUpdateDataUser>
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Please input gender!" }]}
          initialValue={user.gender}
        >
          {/* <Input /> */}
          <Select
            defaultValue={
              user?.gender.toUpperCase() === "MALE"
                ? { value: "MALE", label: <span>Nam</span> }
                : { value: "FEMALE", label: <span>Nữ</span> }
            }
            options={[
              { value: "MALE", label: <span>Nam</span> },
              { value: "FEMALE", label: <span>Nữ</span> },
            ]}
          />
        </Form.Item>

        <Form.Item<IUpdateDataUser>
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Please input address!" }]}
          initialValue={user.address}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật người dùng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const JobByEmail = (props: any) => {
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    const init = async () => {
      const res = await callGetSubscriberSkills();
      if (res && res.data) {
        form.setFieldValue("skills", res.data.skills);
      }
    };
    init();
  }, []);

  const onFinish = async (values: any) => {
    const { skills } = values;
    const res = await callUpdateSubscriber({
      email: user.email,
      name: user.name,
      skills: skills ? skills : [],
    });
    if (res.data) {
      message.success("Cập nhật thông tin thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item
              label={"Kỹ năng"}
              name={"skills"}
              rules={[
                { required: true, message: "Vui lòng chọn ít nhất 1 skill!" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                showArrow={false}
                style={{ width: "100%" }}
                placeholder={
                  <>
                    <MonitorOutlined /> Tìm theo kỹ năng...
                  </>
                }
                optionLabelProp="label"
                options={SKILLS_LIST}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button onClick={() => form.submit()}>Cập nhật</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const ChangePassword = (props: any) => {
  const { form } = props;
  const dispatch = useAppDispatch();
  const onFinish: FormProps<changePasswordType>["onFinish"] = async (
    values
  ) => {
    if (
      !(
        form.getFieldValue("newPassword") ===
        form.getFieldValue("newPasswordConfirm")
      )
    ) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Lỗi khi xác nhận mật khẩu mới",
      });
    } else {
      const res = await dispatch(
        changePassword({
          oldPassword: form.getFieldValue("oldPassword"),
          newPassword: form.getFieldValue("newPassword"),
        })
      );
      if (res.payload?.data) {
        message.success(res.payload?.message);
        form.setFieldValue("oldPassword", null);
        form.setFieldValue("newPassword", null);
        form.setFieldValue("newPasswordConfirm", null);
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.payload?.message,
        });
      }
    }
  };

  const onFinishFailed: FormProps<changePasswordType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<changePasswordType>
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<changePasswordType>
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<changePasswordType>
          label="Xác nhận mật khẩu mới"
          name="newPasswordConfirm"
          rules={[
            { required: true, message: "Please input confirm new password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thay đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ManageAccount = (props: IProps) => {
  const { open, onClose } = props;
  const [form] = Form.useForm();

  const onChange = (key: string) => {
    form.setFieldValue("oldPassword", null);
    form.setFieldValue("newPassword", null);
    form.setFieldValue("newPasswordConfirm", null);
  };

  const items: TabsProps["items"] = [
    {
      key: "user-resume",
      label: `Rải CV`,
      children: <UserResume />,
    },
    {
      key: "email-by-skills",
      label: `Nhận Jobs qua Email`,
      children: <JobByEmail />,
    },
    {
      key: "user-update-info",
      label: `Cập nhật thông tin`,
      children: <UserUpdateInfo />,
    },
    {
      key: "user-password",
      label: `Thay đổi mật khẩu`,
      children: <ChangePassword form={form} />,
    },
  ];

  return (
    <>
      <Modal
        title="Quản lý tài khoản"
        open={open}
        onCancel={() => onClose(false)}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
        width={isMobile ? "100%" : "1000px"}
      >
        <div style={{ minHeight: 400 }}>
          <Tabs
            defaultActiveKey="user-resume"
            items={items}
            onChange={onChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default ManageAccount;
