import { CButton, CForm, CFormGroup, CInput } from "@coreui/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const AmendModal = ({
  statusAmend,
  submitAmmend,
  cancelAmend,
  handleChange,
  objAmend,
}) => {
  return (
    <Modal
      width={1000}
      height={500}
      centered
      visible={statusAmend}
      onOk={() => submitAmmend}
      onCancel={() => cancelAmend}
    >
      <CForm onSubmit={submitAmmend}>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Amendment Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CFormGroup>
                  <CInput
                    id="form"
                    name="amendmentReason"
                    type="text"
                    onChange={handleChange}
                    value={objAmend.amendmentReason}
                  />
                </CFormGroup>
              </td>
              <td>
                {" "}
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </td>
            </tr>
          </tbody>
        </table>
      </CForm>
    </Modal>
  );
};
export default AmendModal;
