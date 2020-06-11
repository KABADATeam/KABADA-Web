import React, { Component } from 'react';
import { Grid, Form, Dropdown, Button, Label, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getIndustries, getActivities, selectActivity, selectIndustry } from '../../appStore/actions/naceActions';
import { getCountries,selectCountry } from  '../../appStore/actions/countriesActions';
import { saveInitialPlanData } from '../../appStore/actions/planActions';
import { setMessage  } from '../../appStore/actions/messageActions';
import '../../css/index.css';

class InitialStage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            needsSaving: false,
            buttonLoading: false
        };
    }

    componentDidMount() {  
        this.props.getCountries();
        this.props.getIndustries();
    }

    onTitleChanged = (e, data) => {
        this.setState({
            title: data.value,
            needsSaving: true 
        });
    }

    onCountryChanged = (e, data) => {
        const country = this.props.countries.find(item => item.id === data.value);
        this.props.selectCountry(country);
        this.setState({
            needsSaving: true
        });
    } 

    onIndustryChanged = (e, data) => {
        this.props.selectIndustry(data.value);
        this.props.getActivities(data.value);
        this.setState({
            needsSaving: true
        });
    } 
    
    onActivityChanged = (e, data) => {
        var activity = this.props.activities.find(item => item.id === data.value);
        if (activity === undefined) {
            for (var i = 0 ; i < this.props.activities.length; i += 1) {
                var item = this.props.activities[i];
                for (var j = 0 ; j < item.childActivities.length; j += 1) {
                    var childItem = item.childActivities[j];
                    if (childItem.id === data.value) {
                        activity = childItem;
                        break;
                    }
                }
            }
        }
        this.props.selectActivity(activity);
        this.setState({
            needsSaving: true
        });
    } 
    
    onNextClicked = () => {
        if (this.state.needsSaving === true) {
            this.setState({ buttonLoading: true });
            this.props.saveInitialPlanData(this.state.title, this.props.selectedActivity.id, this.props.selectedCountry.id, () => {
                this.setState({ buttonLoading: false });
                this.props.history.push('/market-analysis');
                this.props.setMessage("Saved");
            }, () => {
                this.setState({ buttonLoading: false });
            });
        } else {
            this.props.history.push('/market-analysis');
        }       
    }
      
    render() {
        const countries = this.props.countries.map(({ id, title }) => ({key: id, value: id, text: title }));
        const industriesItems = this.props.industries.map((item) => ({
                key: item.id,
                value: item.id,
                text: item.code + '. ' + item.title,
                content: (
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={1}>
                                {item.code}
                            </Grid.Column>
                            <Grid.Column width={15}>
                                {item.title}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            })
        );

        const activitiesItems = [];

        this.props.activities.forEach(item => {
            activitiesItems.push({
                key: item.id,
                value: item.id,
                text: item.code + '. ' + item.title,
                content : (
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={1} style={{ textAlign: "left"}}>
                                {item.code}
                            </Grid.Column>
                            <Grid.Column width={15}>
                                {item.title}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            });
            item.childActivities.forEach(childItem => {
                activitiesItems.push({
                    key: childItem.id,
                    value: childItem.id,
                    text: childItem.code + '. ' + childItem.title,
                    content : (
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column width={2} style={{ textAlign: "right"}}>
                                    {childItem.code}
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    {childItem.title}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    )
                });
            });
        });

        return (
            <div style={{ width: "50%", margin: "0 auto", textAlign: "left" }}>
                <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                    <h2>Business plan creation</h2>
                </div>
                <Grid style={{ marginTop: "3vh"}}>
                    <Grid.Row columns={1}>
                        <Grid.Column width={16}>
                            <Form style={{ textAlign: "left" }}>
                                <Form.Field>
                                    <Label basic className="label-config">Business Plan Title:</Label>
                                    <div className="decoration"></div>
                                    <Input focus placeholder='Enter title' fluid onChange={this.onTitleChanged.bind(this)} />
                                </Form.Field>

                                <Form.Field className="form-field-config">
                                    <Label basic className="label-config">NACE Rev. 2 Section:</Label>
                                    <div className="decoration"></div>
                                    <Dropdown
                                        placeholder='Select Section'
                                        fluid
                                        search
                                        loading={this.props.loading}
                                        selection
                                        options={industriesItems}
                                        onChange={this.onIndustryChanged} />
                                </Form.Field>

                                <Form.Field className="form-field-config">
                                    <Label basic className="label-config">NACE Rev. 2 Division, Group, Class:</Label>
                                    <div className="decoration"></div>
                                    <Dropdown
                                        placeholder='Select Division, Group or Class'
                                        fluid
                                        search
                                        selection
                                        noResultsMessage="Select NACE Rev. 2 Section first"
                                        onChange={this.onActivityChanged} 
                                        options={activitiesItems}
                                    />
                                </Form.Field>

                                <Form.Field className="form-field-config">
                                    <Label basic className="label-config">Country:</Label>
                                    <div className="decoration"></div>
                                    <Dropdown
                                        placeholder='Select Country'
                                        fluid
                                        search
                                        selection
                                        options={countries}
                                        onChange={this.onCountryChanged}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={8} style={{ overflow: "hidden" }}>
                            
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column style={{ textAlign: "right" }}>
                            <Button className="button-next" icon labelPosition='right' loading={this.state.buttonLoading} onClick={this.onNextClicked}>
                                Next
                                <Icon name='right arrow' />
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        activities: state.activities,
        industries: state.industries,
        countries: state.countries,
        selectedActivity: state.selectedActivity,
        selectedCountry: state.selectedCountry,
        selectedIndustry: state.selectedIndustry
    };
}

export default connect(mapStateToProps, 
    { 
        getActivities, 
        getIndustries, 
        getCountries, 
        selectCountry, 
        selectActivity, 
        selectIndustry, 
        saveInitialPlanData,
        setMessage
    })(InitialStage);