import {ModalHeader} from "reactstrap";
import React from "react";

export default {
    loading: 'Cargando...',
    language: 'Idioma',
    map:'Mapa',
    account:'Cuenta',
    myAccount:'Mi cuenta',
    searchMenu: 'Buscar menú',

    providerTitle:'Proveedores',
    newProviderModalTitle:'Agregar nuevo proveedor',

    editProviderModalTitle:'Editar proveedor',

    accountCreditModalTitle: 'Depositar / Retirar credito para %(username)s',

    buttons: {
        newProviderButton:'Agregar proveedor',
        newMenuButton: 'Agregar menú',
        navbarProviderButton: 'Proveedores',
        accountCreditButton: 'Depositar/Retirar credito',
        confirmButton: 'Confirmar',
        cancelButton: 'Cancelar',
        editButton: 'Editar',
        deleteButton: 'Borrar',
        loginButton: 'Iniciar sesion',
        logoutButton: 'Cerrar sesion',
        seePurchaseButton: 'Ver mi compra',
        addMenuButton: 'Agregar a mi compra'
    },

    labels: {
        nameLabel: 'Nombre',
        stateLabel: 'Ciudad',
        addressLabel: 'Dirección',
        phoneLabel: 'Telefono',
        latitudeLabel: 'Latitud',
        longitudeLabel: 'Longitud',
        descriptionLabel: 'Descripción',
        websiteLabel: 'Pagina web',
        hoursFromLabel: 'Hora de inicio de servicio',
        hoursToLabel: 'Hora de finalización de servicio',
        officeDaysFromLabel: 'Servicio empezando los',
        officeDaysToLabel: 'Servicio finalizando los',
        accountCreditLabel: 'Credito',
        actionsLabel: 'Acciones',
        chooseADayLabel: 'Elija un dia',
        nameFilterLabel: 'Filtrar por nombre:',
        providerLabel: 'Proveedor',
        quantityLabel: 'Cantidad',
        priceLabel: 'Precio',
        categoryLabel: 'Categoria'
    },

    placeholders: {
        providerNamePlaceholder: 'Escriba el nombre de Proveedor',
        filterProviderNamePlaceholder: 'Escriba un nombre de proveedor',
        filterMenuNamePlaceholder: 'Escriba un nombre de menú',
        statePlaceholder: 'Escriba la localidad donde se encuentra',
        addressPlaceholder: 'Escriba su direccion',
        emailPlaceholder: 'Escriba su direccion de correo electronico',
        phonePlaceholder: 'Escriba su telefono',
        logoPlaceholder: 'Escriba la URL logo',
        latitudePlaceholder: 'Escriba su latitud',
        longitudePlaceholder: 'Escriba su longitud',
        descriptionPlaceholder: 'Escriba una descripcion',
        websitePlaceholder: 'Escriba la URL de su pagina web',
        accountCreditPlaceholder: 'Escriba una cantidad'
    },

    messages: {
        successfulPurchaseMessage: 'Su compra ha sido realizada con éxito',
        failedPurchaseMessage: 'No se pudo realizar la compra',
        menuInPurchaseMessage: 'Este menú ya está en la compra',
    },

    titles: {
        menusTitle: 'Menús',
        providerMenusTitle: 'Menús de %(providername)s'
    }
}