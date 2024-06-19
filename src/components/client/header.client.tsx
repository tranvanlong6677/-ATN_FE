import { useState, useEffect } from "react";
import {
  CodeOutlined,
  ContactsOutlined,
  DashOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, MenuProps, Space, message } from "antd";
import { Menu, ConfigProvider } from "antd";
import styles from "@/styles/client.module.scss";
import { isMobile } from "react-device-detect";
import { FaReact } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { callLogout } from "@/config/api";
import { setLogoutAction } from "@/redux/slice/accountSlide";
import ManageAccount from "./modal/manage.account";
import imgLogo from "/logo.jpg";
const Header = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  console.log(">>> check user", user);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState("home");
  const location = useLocation();

  const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);
  function handleWindowSizeChange() {
    setInnerWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const items: MenuProps["items"] = [
    {
      label: <Link to={"/"}>Trang Chủ</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/job"}>Việc Làm IT</Link>,
      key: "/job",
      icon: <CodeOutlined />,
    },
    {
      label: <Link to={"/company"}>Top Công ty IT</Link>,
      key: "/company",
      icon: <RiseOutlined />,
    },
    {
      label: <Link to={"/about"}>Về VieclamIT</Link>,
      key: "/about",
      icon: <QuestionCircleOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown =
    user?.role?.name === "NORMAL_USER"
      ? [
          {
            label: (
              <label
                style={{ cursor: "pointer" }}
                onClick={() => setOpenManageAccount(true)}
              >
                Quản lý tài khoản
              </label>
            ),
            key: "manage-account",
            icon: <ContactsOutlined />,
          },
          // {
          //   label: <Link to={"/admin"}>Trang quản trị </Link>,
          //   key: "admin",
          //   icon: <DashOutlined />,
          // },
          {
            label: (
              <label
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                Đăng xuất
              </label>
            ),
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ]
      : [
          {
            label: (
              <label
                style={{ cursor: "pointer" }}
                onClick={() => setOpenManageAccount(true)}
              >
                Quản lý tài khoản
              </label>
            ),
            key: "manage-account",
            icon: <ContactsOutlined />,
          },
          {
            label: (
              <Link to={"/admin"}>
                Trang quản trị{" "}
                {user?.role?.name === "SUPER_ADMIN" ? "Admin" : "HR"}
              </Link>
            ),
            key: "admin",
            icon: <DashOutlined />,
          },
          {
            label: (
              <label
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                Đăng xuất
              </label>
            ),
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ];

  const itemsMobiles = [...items, ...itemsDropdown];

  return (
    <>
      <div className={styles["header-section"]}>
        <div className={styles["container"]}>
          {innerWidth > 1000 ? (
            <div style={{ display: "flex", gap: 30 }}>
              <div className={styles["brand"]}>
                {/* <FaReact onClick={() => navigate("/")} title="Tìm việc IT" /> */}
                <img
                  src={imgLogo}
                  alt=""
                  style={{ width: "55px", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                  title="Tìm việc IT"
                />
              </div>
              <div className={styles["top-menu"]}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#fff",
                      colorBgContainer: "#222831",
                      colorText: "#a7a7a7",
                    },
                  }}
                >
                  <Menu
                    // onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                  />
                </ConfigProvider>
                <div className={styles["extra"]}>
                  {isAuthenticated === false ? (
                    <Link to={"/login"}>Đăng Nhập</Link>
                  ) : (
                    <Dropdown
                      menu={{ items: itemsDropdown }}
                      trigger={["click"]}
                    >
                      <Space style={{ cursor: "pointer" }}>
                        <span>Welcome {user?.name}</span>
                        <Avatar>
                          {" "}
                          {user?.name?.substring(0, 2)?.toUpperCase()}{" "}
                        </Avatar>
                      </Space>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["header-mobile"]}>
              <span>VieclamIT</span>
              <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
            </div>
          )}
        </div>
      </div>
      <Drawer
        title="Chức năng"
        placement="right"
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={itemsMobiles}
        />
      </Drawer>
      <ManageAccount open={openMangeAccount} onClose={setOpenManageAccount} />
    </>
  );
};

export default Header;
