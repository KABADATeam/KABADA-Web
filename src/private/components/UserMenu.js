import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect} from 'react-redux';
import { logout } from '../../appStore/actions/authenticationActions';

class UserMenu extends React.Component {

    onLogoutClick() {
        this.props.logout();
    }

    render() {
        return (
            <Dropdown item icon='bars' style={{ color: "#232A4A" }}>
                <Dropdown.Menu>
                    <Dropdown.Header>{this.props.user.email}</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item icon='setting' text='My profile' />
                    <Dropdown.Divider />
                    <Dropdown.Item icon='sign out' text='Logout' onClick={this.onLogoutClick.bind(this)}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { logout })(UserMenu);