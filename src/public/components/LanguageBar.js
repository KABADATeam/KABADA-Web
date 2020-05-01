import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeLanguage } from '../../appStore/actions/languageActions';

const languageOptions = [
    { key: 'en', value: 'en', text: 'English' },
    { key: 'cz', value: 'cz', text: 'Čeština' },
    { key: 'it', value: 'it', text: 'Italiano' },
    { key: 'lv', value: 'lv', text: 'Latviešu' },
    { key: 'lt', value: 'lt', text: 'Lietuvių' },
    { key: 'pt', value: 'pt', text: 'Português' }
]

class LanguageBar extends React.Component {

    onSelectionChanged(e, data) {
        this.props.changeLanguage(data.value);
    }

    render() {
        return (
            <div style={{ color: 'black'}}>
                <Icon name='world' />
                <Dropdown
                    inline
                    defaultValue={this.props.language}
                    options={languageOptions}
                    onChange={this.onSelectionChanged.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    };
}

export default connect(mapStateToProps, { changeLanguage })(LanguageBar);