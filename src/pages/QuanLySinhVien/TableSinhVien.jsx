import React, { Component } from "react";

export default class TableSinhVien extends Component {
  render() {
    const { arrSinhVien, handleFormDelete, handleFormEdit} = this.props;
    return (
      <div className="container mt-2">
        <table className="table">
          <thead>
            <tr className="bg-dark text-white fw-bold">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
            {arrSinhVien.map(({maSV, hoTen, soDienThoai, email}, index) => {
              return (
                <tr key={index}>
                  <td>{maSV}</td>
                  <td>{hoTen}</td>
                  <td>{soDienThoai}</td>
                  <td>{email}</td>
                  <td>
                    <button className="btn btn-danger mx-1" onClick={()=>{
                        handleFormDelete(maSV)
                      }}>
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-primary mx-1" onClick={()=>{
                      let sv = {maSV, hoTen, soDienThoai, email};
                      handleFormEdit(sv)
                    }}>
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}
