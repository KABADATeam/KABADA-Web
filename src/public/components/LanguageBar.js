import React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';

const languageOptions = [
    { key: 'en', value: 'en', text: 'English' },
    { key: 'cz', value: 'cz', text: 'Čeština' },
    { key: 'it', value: 'it', text: 'Italiano' },
    { key: 'lv', value: 'lv', text: 'Latviešu' },
    { key: 'lt', value: 'lt', text: 'Lietuvių' },
    { key: 'pt', value: 'pt', text: 'Português' }
]

class LanguageBar extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            text: ''
        }
    }

    onSelectionChanged(e, data) {
        this.setState({
            text: data.value
        });
    }

    render() {
        console.log(this.state.text)
        return (
            <div style={{ color: 'black'}}>
                <Icon name='world' />
                <Dropdown
                    inline
                    defaultValue='en'
                    options={languageOptions}
                    onChange={this.onSelectionChanged.bind(this)}
                />
            </div>
        )
    }
}

export default LanguageBar;