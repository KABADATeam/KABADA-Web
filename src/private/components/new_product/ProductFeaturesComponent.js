import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductFeatures } from "../../../appStore/actions/productActions";

const { Text } = Typography;

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

class ProductFeaturesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          checked: []
        };
      }
      //everytime you check checkbox it will add id of income source to checked array ['7878787','898954654654654']
      onChange = checkedValues => {
        this.setState(() => {
          return { checked: checkedValues };
        });
        this.props.setProductFeatures(checkedValues);
      };
    
      isDisabled = id => {
        return (
          this.state.checked.length > 4 && this.state.checked.indexOf(id) === -1
        );
      };

    render() {
        const checkBoxes = this.props.features.map((obj) =>
            <Checkbox value={obj.id} key={obj.key}>{obj.title}</Checkbox>
        );

        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Product features</Text>
                        <Text style={descriptionTextStyle}>Up to 5 of mixed characteristics</Text>
                        <Checkbox.Group onChange={this.onChange}>
                            <Space direction="vertical">
                                {this.props.features.map((obj) =>(
                                    <Checkbox value={obj.id} key={obj.key} disabled={this.isDisabled(obj.id)}>{obj.title}</Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    </Space>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        features: state.productFeatures
    };
}

export default connect(mapStateToProps, { setProductFeatures })(ProductFeaturesComponent);
