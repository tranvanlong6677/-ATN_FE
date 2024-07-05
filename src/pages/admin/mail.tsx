import { callSendEmail } from "@/config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendEmail } from "@/redux/slice/mailSlide";
import { Button, Spin, notification } from "antd";
const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
const MailPage = () => {
  const isLoading = useAppSelector((state) => state.mail.isFetching);
  const dispatch = useAppDispatch();
  const sendEmailFunc = async () => {
    try {
      const res = await dispatch(sendEmail());
      if (+res.payload.statusCode === 200) {
        notification.success({
          message: "Gửi email thành công",
          description: "Vui lòng kiểm tra email của bạn",
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau",
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Spin tip="Loading" size="large" spinning={isLoading}>
          <div className="loading-mask">{content}</div>
        </Spin>
      ) : (
        <></>
      )}

      <Button type="primary" onClick={() => sendEmailFunc()}>
        Gửi email hệ thống
      </Button>
    </>
  );
};
export default MailPage;
