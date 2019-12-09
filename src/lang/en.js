// import React from "react";

export default {
    loading: 'Loading...',
    language: 'Language',
    map:'Map',
    account:'Account',
    myAccount:'My account',
    searchMenu: 'Search menu',
    purchaseHistory: 'My purchase history',

    providerTitle:'Providers',
    newProviderModalTitle:'Add new provider',

    editProviderModalTitle:'Edit provider',
    editClient:'Edit client',

    accountCreditModalTitle: 'Deposit / Withdraw credit for %(username)s',

    buttons: {
        newProviderButton:'Add provider',
        newMenuButton: 'Add menu',
        navbarProviderButton: 'Providers',
        accountCreditButton: 'Deposit/Withdraw credit',
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Accept',
        editButton: 'Edit',
        deleteButton: 'Delete',
        loginButton: 'Log in',
        logoutButton: 'Log out',
        withdrawCredit: 'Withdraw credit',
        depositCredit: 'Deposit credit',
        seePurchaseButton: 'See my purchase',
        addMenuToPurchaseButton: 'Add to my purchase',
        changeQuantityButton: 'Change quantity',
        removeFromPurchaseButton: 'Remove from purchase',
        addMenuButton: 'Add menu',
        makeThePurchaseButton: 'Make the purchase',
        selectPurchaseDataButton: 'Select date, time and type of delivery',
        rateButton: 'Rate',
        seePurchaseMenusButton: 'See purchase menus',
        beAProvider: 'Be a Provider!',
        seeMenusButton: 'See menus',
    },

    labels: {
        nameLabel: 'Name',
        lastNameLabel: 'Lastname',
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
        availableAccountCredit: 'Your available credit is %(credit)s USD',
        chooseADeliveryTypeLabel: 'Choose a delivery type',
        nameFilterLabel: 'Filter by name:',
        providerLabel: 'Provider',
        quantityLabel: 'Quantity',
        priceLabel: 'Price',
        unitPriceLabel: 'Unit price',
        categoryLabel: 'Category',
        pendingLabel: 'Pending',
        deliveryTimeLabel: 'Delivery time',
        deliveryDateLabel: 'Delivery date',
        deliveryTypeLabel: 'Delivery type',
        deliveryPriceLabel: 'Delivery price',
        orderDateLabel: 'Order date',
        scoreLabel: 'Score',
        newUserRegistration: 'Register!'
    },

    placeholders: {
        clientNamePlaceholder: 'Type your name',
        clientLastnamePlaceholder: 'Type your lastname',
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
        accountCreditPlaceholder: 'Type an amount',
        menuDescriptionPlaceholder: 'Type the description of the menu',
        deliveryPricePlaceholder: 'Type the delivery price',
    },

    messages: {
        successfulPurchaseMessage: 'Your purchase has been made successfully',
        successfulScoreMessage: 'Your score was saved correctly',
        failedPurchaseMessage: 'The purchase could not be made',
        menuInPurchaseMessage: 'This menu is already in purchase',
        quantityGreaterThan0Message: 'The quantity must be greater than 0',
        scoreBetween1And5: 'The score must be between 1 and 5',
        noMenusInPurchaseMessage: 'There are no menus in your purchase yet',
        alreadyScoredMessage: 'This purchase already has a score, it cannot be scored twice',
        pendingScoreMessage: 'You still have purchases without scoring',
    },

    titles: {
        menusTitle: 'Menus',
        providerMenusTitle: '%(providername)s menus',
        purchaseHistoryTitle: 'Purchase history',
        addMenuTitle: 'Add new menu',
        informationTitle: 'Information',
        selectQuantityTitle: 'Select quantity',
        myPurchaseTitle: 'My purchase',
        providerPurchaseTitle: 'My purchase for %(providername)s',
        purchaseMenusTitle: 'Purchase menus',
        selectScoreTitle: 'Select score',
    },

    validations: {
        invalidPhoneNumber: 'Please, insert a valid phone number',
        invalidEmail: 'Please, insert a valid email address',
        address: 'Please, insert your address',
        state: 'Please, insert your state',
        name: 'Please, insert your name',
        menuName: 'Please, insert a name for the menu'
    }
}