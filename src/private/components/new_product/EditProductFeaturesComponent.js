import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Space, Card, Checkbox } from 'antd';
import { cardStyle, tableCardBodyStyle } from '../../../styles/customStyles';
import { setProductFeatures,getProduct ,getProductFeatures} from "../../../appStore/actions/productActions";
import { thisExpression } from '@babel/types';

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

class EditProductFeaturesComponent extends Component {
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
    
      isDisabled(id){
        return (
          this.state.checked.length > 8 && this.state.checked.indexOf(id) === -1
        );
      }; 
    
    componentDidMount(){
        this.props.getProduct(this.props.productId, (data) => {
            this.setState({
                checked: this.props.product.product_features
            })
        });
        this.props.getProductFeatures();
    }
    


    render() {
        return (
            <>
                <Card style={{ ...cardStyle, padding: 20 }} bodyStyle={{ ...tableCardBodyStyle, padding: 0 }}>
                    <Space direction="vertical">
                        <Text style={infoTextStyle}>Product features</Text>
                        <Text style={descriptionTextStyle}>Up to 9 of mixed characteristics</Text>
                        {console.log(this.state)}
                        <Checkbox.Group onChange={this.onChange} value={this.props.product.product_features}>
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
        features: state.productFeatures,
        product: state.product
    };
}

export default connect(mapStateToProps, { setProductFeatures, getProduct,getProductFeatures })(EditProductFeaturesComponent);
