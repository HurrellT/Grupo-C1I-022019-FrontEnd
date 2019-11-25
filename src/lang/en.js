import {ModalHeader} from "reactstrap";
import React from "react";

export default {
    loading: 'Loading...',
    language: 'Language',
    map:'Map',
    account:'Account',
    myAccount:'My account',
    searchMenu: 'Search menu',

    providerTitle:'Providers',
    newProviderModalTitle:'Add new provider',

    editProviderModalTitle:'Edit provider',

    accountCreditModalTitle: 'Deposit / Withdraw credit for %(username)s',

    buttons: {
        newProviderButton:'Add provider',
        newMenuButton: 'Add menu',
        navbarProviderButton: 'Providers',
        accountCreditButton: 'Deposit/Withdraw credit',
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        editButton: 'Edit',
        deleteButton: 'Delete',
        loginButton: 'Log in',
        logoutButton: 'Log out',
        seePurchaseButton: 'See my purchase',
        addMenuButton: 'Add to my purchase'
    },

    labels: {
        nameLabel: 'Name',
        stateLabel: 'State',
        addressLabel: 'Adress',
        phoneLabel: 'Phone number',
        latitudeLabel: 'Latitude',
        longitudeLabel: 'Longitude',
        descriptionLabel: 'Description',
        websiteLabel: 'Website',
        hoursFromLabel: 'Service starting at',
        hoursToLabel: 'Service finishing at',
        officeDaysFromLabel: 'Service starting on',
        officeDaysToLabel: 'Service finishing on',
        accountCreditLabel: 'Credit',
        actionsLabel: 'Actions',
        chooseADayLabel: 'Choose a day',
        nameFilterLabel: 'Filter by name:',
        providerLabel: 'Provider',
        quantityLabel: 'Quantity',
        priceLabel: 'Price',
        categoryLabel: 'Category'
    },

    placeholders: {
        providerNamePlaceholder: 'Type your provider name',
        filterProviderNamePlaceholder: 'Type a provider name',
        filterMenuNamePlaceholder: 'Type a menu name',
        statePlaceholder: 'Type the state where you are located',
        addressPlaceholder: 'Type your address',
        emailPlaceholder: 'Type your email address',
        phonePlaceholder: 'Type your phone number',
        logoPlaceholder: 'Type your logo URL',
        latitudePlaceholder: 'Type your latitude',
        longitudePlaceholder: 'Type your longitude',
        descriptionPlaceholder: 'Type a description',
        websitePlaceholder: 'Type the URL of your website',
        accountCreditPlaceholder: 'Type an amount'
    },

    messages: {
        successfulPurchaseMessage: 'Your purchase has been made successfully',
        failedPurchaseMessage: 'The purchase could not be made',
        menuInPurchaseMessage: 'This menu is already in purchase',
    },

    titles: {
        menusTitle: 'Menus',
        providerMenusTitle: '%(providername)s menus'
    }
}