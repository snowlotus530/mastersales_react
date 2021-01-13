import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterArea = () => {
  return (
    <div className="container-fluid linear-gradient text-white">
      <div className="container">
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
          <MDBContainer fluid className="text-center text-md-left">
            <MDBRow>
              <MDBCol md="6">
                <h5 className="title">Master Sales Big Store</h5>
                <p>
                  Hệ thống thương mại lĩnh vực công nghệ lớn nhất thế giới
                  <br />
                  <br />
                  Địa chỉ văn phòng: KTPM2018 Trường ĐH Công nghệ thông tin
                  ĐHQGHCM
                  <br /> Chúng tôi nhận đặt hàng trực tuyến và giao hàng tận
                  nơi, đồng thời hỗ trợ mua và nhận hàng trực tiếp tại cửa hàng
                  và trung tâm xử lý đơn hàng
                </p>
              </MDBCol>
              <MDBCol md="6">
                <div className="d-flex justify-content-around">
                  <div>
                    <h5 className="title">VỀ CHÚNG TÔI</h5>
                    <br />
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Giới thiệu</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Điều khoản dịch vụ</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Phương thức giao hàng</a>
                    </p>
                  </div>
                  <div>
                    <h5 className="title">HỖ TRỢ</h5>
                    <br />
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Đặt câu hỏi</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Hướng dẫn mua hàng</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Câu hỏi thường gặp</a>
                    </p>
                  </div>
                  <div>
                    <h5 style={{color: 'inherit'}} className="title">LIÊN HỆ</h5>
                    <br />
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Điện thoại: 01234565</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Email: ms123@gm.com</a>
                    </p>
                    <p>
                      <a style={{color: 'inherit'}} href="#!">Làm việc 24h</a>
                    </p>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="/"> MasterSales </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    </div>
  );
};

export default FooterArea;
