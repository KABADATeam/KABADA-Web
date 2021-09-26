import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Divider, Select, Checkbox,Col,Row } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductPriceLevel, setIncomeSources } from "../../../appStore/actions/productActions";

const { Text } = Typography;
const { Option } = Select;

const infoTextStyle = {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center",
    fontWeight: 600,
}
const descriptionTextStyle = {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#8C8C8C',
}
class PriceLevelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checked: []
        };
      }
      //everytime you check checkbox it will add id of income source to checked array ['7878787','898954654654654']
      onChange = checkedValues => {
          console.log(checkedValues)
        this.setState(() => {
          return { checked: checkedValues };
        });
        this.props.setIncomeSources(checkedValues);
      };
    
      isDisabled = id => {
        return (
          this.state.checked.length > 4 && this.state.checked.indexOf(id) === -1
        );
      };

    onSelectionChange(id) {
        this.props.setProductPriceLevel(id);
    }

    onIncomeSourcesChanged = (values) => {
        this.props.setIncomeSources(values);
    }

    render() {
        const options = this.props.priceLevels.map((obj) =>
            <Option key={obj.id} value={obj.id}>{obj.title}</Option>
        );
        const checkBoxes = this.props.incomeSources.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );
        

        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Text style={infoTextStyle}>Price Level</Text>
                    <Select style={{ width: '100%', marginTop: '20px' }} placeholder="Select price level" onChange={this.onSelectionChange.bind(this)}>
                        {options}
                    </Select>

                    <Divider />
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Additional income sources</Text>
                        <Text style={descriptionTextStyle}>Select up to 5 sources</Text>
                        {/* <Checkbox.Group onChange={this.onIncomeSourcesChanged}>
                            <Space direction="vertical">
                                {checkBoxes}
                            </Space>
                        </Checkbox.Group> */}
                        <Checkbox.Group onChange={this.onChange}>
                            <Space direction="vertical">
                            {this.props.incomeSources.map((obj) => (
                               <Checkbox value={obj.id} key={obj.key} disabled={this.isDisabled(obj.id)}>{obj.title}</Checkbox>
                            ))}
                            </Space>
                        </Checkbox.Group>

                        {/* <Checkbox.Group style={{ width: "100%" }} onChange={this.onChange}>
        <Row>
          <Col span={8}>
            <Checkbox value="A" disabled={this.isDisabled("A")}>
              A
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="B" disabled={this.isDisabled("B")}>
              B
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="C" disabled={this.isDisabled("C")}>
              C
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="D" disabled={this.isDisabled("D")}>
              D
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="E" disabled={this.isDisabled("E")}>
              E
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group> */}
                    </Space>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priceLevels: state.productFeaturesLevels.priceLevels,
        incomeSources: state.additionalIncomeSources
    };
}

export default connect(mapStateToProps, { setProductPriceLevel, setIncomeSources })(PriceLevelComponent);
