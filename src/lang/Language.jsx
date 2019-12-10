import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import counterpart from "counterpart";
import Translate from 'react-translate-component';


class Language extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lang: localStorage.getItem('lang'),
            locale: localStorage.getItem('locale'),
            currency: localStorage.getItem('currency')
        }
    }

    onLangChange = (e) => {
        let values = e.target.value.split(',');
        this.setState({
            lang: localStorage.getItem('lang'),
            locale: localStorage.getItem('locale'),
            currency: localStorage.getItem('currency')
        });
        localStorage.setItem('lang', values[0]);
        localStorage.setItem('locale', values[1]);
        localStorage.setItem('currency', values[2]);
        counterpart.setLocale(values[0]);
    };

    componentDidMount() {
        this.setState({
            lang: localStorage.getItem('lang'),
            locale: localStorage.getItem('locale'),
            currency: localStorage.getItem('currency')
        });
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
                        <DropdownItem value='es,es-AR,ARS' onClick={this.onLangChange}>ES</DropdownItem>
                        <DropdownItem value='en,en-US,USD' onClick={this.onLangChange}>EN</DropdownItem>
                        {/*<DropdownItem divider />*/}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

export default Language