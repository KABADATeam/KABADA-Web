import React from 'react';
import { Modal, Col, Typography, Button, Row } from 'antd';

const { Text } = Typography;
const titleTextStyle = {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
};
const subTitleTextStyle = {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '24px',
};
const textContainerStyle = {
  padding: '10px 0px',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '25px',
};
function PoliciesComponent(props) {
  const onCancel = () => {
    props.onClose();
  };
  return (
    <>
      <Modal
        visible={props.visible}
        onCancel={onCancel}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: false }}
        footer={null}
      >
        <div>
          <Row>
            <Col span={24}>
              <div>
                <Text style={{ ...titleTextStyle }}>
                  KABADA Terms and Conditions
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  By setting up a user account, I agree with the following
                  conditions for the processing of personal data and that
                  personal data is processed to ensure the efficient functioning
                  of the system developed in the Erasmus + Knowledge Alliance
                  project: KABADA / Knowledge Alliance of Business idea
                  Assessment: Digital Approach (No.
                  612542-EPP-1-2019-1-LV-EPPKA2-KA). The controller of the
                  personal data is Banku augstskola (Reg. No. 90000437699),
                  address Krišjāņa Valdemāra Street 161, Riga, LV-1013, Latvia.
                  Email info@kabada.eu.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>
                  What personal data are processed?
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  Email address and first name, last name. The business plans
                  created by the personal in KABADA system and they structure.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>
                  For what purpose personal data is being processed?
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  Personal data is used to identify the user and the user can
                  access their own and other users' shared business plans
                  created in the KABADA system. The structure of business plans
                  created by the person is used in the training of the
                  artificial intelligence of the KABADA system, which provides
                  support for new business plans and training of artificial
                  intelligence itself.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>Legal basis</Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  When processing personal data, the controller shall comply
                  with Regulation (EU) 2016/679 of the European Parliament and
                  of the Council of 27 April 2016 on the protection of
                  individuals with regard to the processing of personal data and
                  on the free movement of such data and repealing the provisions
                  of Directive 95/46/EC.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>
                  Security and access to data{' '}
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  Personal data is stored on the servers of the Banku augstskola
                  located in the territory of the European Union or the Member
                  States of the European Economic Area. Access to personal data
                  is for the staff of KABADA project to resolve technical issues
                  related to the use of software, as well as to provide support
                  services to system users. The KABADA project shall take
                  appropriate physical, organisational and technical security
                  measures to protect personal data from accidental or illegal
                  destruction, disappearance, modification or unauthorised
                  access and disclosure. The transfer of personal data to other
                  potentially interested parties is not carried out.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>
                  Access to and rectification of personal data
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  Personal data can be accessed and rectified in the user
                  profile of KABADA system.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>
                  Storage and erasure
                </Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  With the closing of the KABADA system user account, personal
                  data is deleted, including the business plans created by the
                  person in the KABADA system and their structures. Valid user
                  accounts are maintained for as long as the KABADA system is
                  used.
                </Text>
              </div>

              <div>
                <Text style={{ ...subTitleTextStyle }}>Dispute settlement</Text>
              </div>
              <div style={{ ...textContainerStyle }}>
                <Text>
                  Disputes related to the processing of personal data are
                  resolved through user support in info@kabada.eu
                </Text>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '15px' }}></div>
      </Modal>
    </>
  );
}

export default PoliciesComponent;
