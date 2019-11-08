import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import counterpart from "counterpart";
import Translate from 'react-translate-component';


class Language extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lang: localStorage.getItem('lang')
        }
    }

    onLangChange = (e) => {
        this.setState({lang: localStorage.getItem('lang')});
        localStorage.setItem('lang', e.target.value);
        counterpart.setLocale(e.target.value);
    };

    componentDidMount() {
        this.setState({lang: localStorage.getItem('lang')});
        counterpart.setLocale(this.state.lang);
    }

    render() {
        return (
            <div>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <Translate content='language'/>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem value='es' onClick={this.onLangChange}>ES</DropdownItem>
                        <DropdownItem value='en' onClick={this.onLangChange}>EN</DropdownItem>
                        {/*<DropdownItem divider />*/}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

export default Language