import { clear } from "@testing-library/user-event/dist/clear";
import _ from "lodash";
import React, { Component } from "react";
import TableSinhVien from "./TableSinhVien";

export default class QuanLySinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      },
      formError: {
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      },
      arrSinhVien: [
        {
          maSV: "19120617",
          hoTen: "Mạch Vi Phong",
          soDienThoai: "0979161290",
          email: "machviphong21041001@gmail.com",
        },
        {
          maSV: "19120618",
          hoTen: "Mạch Đình Phong",
          soDienThoai: "0773924972",
          email: "machdinhphong2104@gmail.com",
        },
      ],
      valid: false,
      keyword: "",
      arrSVTemp: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");

    if (!this.checkFormValid()) {
      alert("form is invalid");
      return;
    }
    let arrSinhVien = this.state.arrSinhVien;
    let newSinhVien = { ...this.state.formValue };
    let indexSV = arrSinhVien.findIndex((sv) => sv.maSV === newSinhVien.maSV);
    if (indexSV !== -1) {
      alert("Sinh viên này đã tồn tại!");
    } else {
      arrSinhVien.push(newSinhVien);
    }

    this.setState({
      arrSinhVien: arrSinhVien,
    });
    console.log("array sinh vien: ", arrSinhVien);
  };

  checkFormValid = () => {
    let { formValue, formError } = this.state;
    for (let key in formError) {
      if (formValue[key] === "" || formError[key] !== "") {
        return false;
      }
    }
    return true;
  };

  handleChangeInput = (e) => {
    let { name, value } = e.target;
    let newFormValue = this.state.formValue;
    let dataType = e.target.getAttribute("data-type");
    let dataMaxLength = e.target.getAttribute("data-max-length");
    newFormValue[name] = value;

    let newFormError = this.state.formError;
    let message = "";

    if (value.trim() === "") {
      message = name + " can not be blank!";
    } else {
      if (value.length > dataMaxLength && name === "maSV") {
        message = name + " can not be over max length!";
      }
      if (dataType === "phoneNumber") {
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!regex.test(value)) {
          message = name + " is wrong syntax!";
        }
      }
      if (dataType === "email") {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(value)) {
          message = name + " is wrong syntax!";
        }
      }
      // if (dataType === "name") {
      //   let regex = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
      //   if (!regex.test(value)) {
      //     message = name + " is wrong syntax!";
      //   }
      // }
      if (dataType === "number") {
        let regex = /^\d+(,\d{1,2})?$/;
        if (!regex.test(value)) {
          message = name + " is wrong syntax!";
        }
      }
    }

    console.log("valid", this.state.valid);
    newFormError[name] = message;
    this.setState(
      {
        formValue: newFormValue,
        formError: newFormError,
      },
      () => {
        console.log("form update: ", this.state.formValue);
        this.setState({
          valid: this.checkFormValid(),
        });
      }
    );
  };

  handleFormDelete = (maSVClick) => {
    let arrSinhVien = this.state.arrSinhVien;
    let arrAfterDelete = arrSinhVien.filter((sv) => sv.maSV !== maSVClick);
    console.log(arrAfterDelete);
    this.setState({
      arrSinhVien: arrAfterDelete,
    });
  };
  handleFormEdit = (svClick) => {
    console.log(svClick);
    console.log("form value", this.state.formValue);
    this.setState(
      {
        formValue: svClick,
      },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        });
      }
    );
  };
  handleFormUpdate = () => {
    let { arrSinhVien, formValue } = this.state;
    let svUpdate = arrSinhVien.find((sv) => sv.maSV === formValue.maSV);
    if (svUpdate) {
      for (let key in svUpdate) {
        if (key !== "maSV") {
          svUpdate[key] = formValue[key];
        }
      }
    }
    this.setState({
      arrSinhVien: arrSinhVien,
    });
  };
  handleClearFormValue = () => {
    let clearForm = this.state.formValue;
    for (let key in clearForm) {
      clearForm[key] = "";
    }
    this.setState(
      {
        formValue: clearForm,
      },
      () => {
        this.setState({
          valid: this.checkFormValid(),
        });
      }
    );
  };
  handleSearchInput = (e) => {
    // e.preventDefault();
    let keyword = e.target.value;
    if (keyword === "") {
      this.setState({
        keyword: "",
      });
    } else {
      this.setState(
        {
          keyword: keyword,
        },
        () => {
          console.log("keyword", this.state.keyword);
        }
      );
    }
  };
  handleSearchButton = () => {
    let { arrSinhVien, arrSVTemp, keyword } = this.state;
    // arrSVTemp = {...arrSinhVien};
    keyword = this.removeVietnameseTones(keyword);
    let svSearch = arrSinhVien.filter((sv) => {
      let nameSV = sv.hoTen;
      nameSV = this.removeVietnameseTones(nameSV);
      return _.includes(nameSV, keyword);
    });
    // arrSinhVien = svSearch;
    this.setState({
      arrSVTemp: arrSinhVien,
      arrSinhVien: svSearch,
    });
  };
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str.trim().toLowerCase();
  };
  handleClearButton = () => {
    let arrSVTemp = this.state.arrSVTemp;
    console.log("arrTemp: ", arrSVTemp);
    this.setState({
      arrSinhVien: arrSVTemp,
      keyword: "",
    });
  };
  render() {
    return (
      <>
        <form className="container pt-5" onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h3 className=" p-2">Thông tin sinh viên</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <p style={{ margin: 0 }}>Mã SV</p>
                    <input
                      type="text"
                      name="maSV"
                      data-type="number"
                      value={this.state.formValue.maSV}
                      data-max-length="8"
                      className="form-control mb-3"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.maSV && (
                      <div className="alert alert-danger">
                        {this.state.formError.maSV}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p style={{ margin: 0 }}>Họ tên</p>
                    <input
                      type="text"
                      name="hoTen"
                      data-type="name"
                      value={this.state.formValue.hoTen}
                      className="form-control mb-3"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.hoTen && (
                      <div className="alert alert-danger">
                        {this.state.formError.hoTen}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p style={{ margin: 0 }}>Số điện thoại</p>
                    <input
                      type="text"
                      data-type="phoneNumber"
                      name="soDienThoai"
                      value={this.state.formValue.soDienThoai}
                      className="form-control mb-3"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.soDienThoai && (
                      <div className="alert alert-danger">
                        {this.state.formError.soDienThoai}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p style={{ margin: 0 }}>Email</p>
                    <input
                      type="text"
                      data-type="email"
                      name="email"
                      value={this.state.formValue.email}
                      className="form-control mb-3"
                      onInput={this.handleChangeInput}
                    />
                    {this.state.formError.email && (
                      <div className="alert alert-danger">
                        {this.state.formError.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-success p-2 me-1"
                disabled={!this.state.valid}
              >
                Insert
              </button>
              <button
                type="button"
                className="btn btn-primary p-2 mx-1"
                disabled={!this.state.valid}
                onClick={() => {
                  this.handleFormUpdate();
                }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-warning text-danger p-2 mx-1"
                disabled={!this.state.valid}
                onClick={() => {
                  this.handleClearFormValue();
                }}
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
        <div className="container mt-2">
          <div className="input-group">
            <input
              type="text"
              name="keyword"
              value={this.state.keyword}
              defaultValue={this.state.keyword}
              className="form-control"
              placeholder="Searching name ..."
              aria-label="Searching"
              aria-describedby="basic-addon1"
              onInput={this.handleSearchInput}
            />
            <button
              className="input-group-text btn-search"
              id="basic-addon1"
              onClick={() => {
                this.handleSearchButton();
              }}
            >
              Search
            </button>
            <button
              className="input-group-text btn-clear"
              id="basic-addon1"
              onClick={() => {
                this.handleClearButton();
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="tableSinhVien">
          <TableSinhVien
            arrSinhVien={this.state.arrSinhVien}
            handleFormDelete={this.handleFormDelete}
            handleFormEdit={this.handleFormEdit}
          />
        </div>
      </>
    );
  }
}
