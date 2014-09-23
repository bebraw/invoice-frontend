'use strict';
var extend = require('xtend');


var props = {
    company: {
        title: 'Company',
        type: 'string'
    },
    name: {
        title: 'Name',
        type: 'string'
    },
    address: {
        title: 'Address',
        type: 'string'
    },
    city: {
        title: 'City',
        type: 'string'
    },
    postalCode: {
        title: 'Postal Code',
        type: 'string'
    },
    phone: {
        title: 'Phone',
        type: 'string'
    },
    companyId: {
        title: 'Company ID',
        type: 'string'
    }
};

var senderExtras = {
    iban: {
        title: 'IBAN',
        type: 'string'
    },
    bic: {
        title: 'BIC/SWIFT',
        type: 'string'
    }
};

module.exports = {
    type: 'object',
    properties: {
        member: {
            title: 'Member',
            type: 'object',
            properties: {
                id: {
                    title: 'Id',
                    type: 'integer'
                },
                invoiceNumber: {
                    title: 'Invoice number',
                    type: 'integer'
                }
            }
        },
        sender: {
            title: 'Sender',
            type: 'object',
            properties: extend(props, senderExtras)
        },
        recipient: {
            title: 'Recipient',
            type: 'object',
            properties: props
        },
        services: {
            title: 'Services',
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    name: {
                        title: 'Service',
                        type: 'string'
                    },
                    cost: {
                        title: 'Cost',
                        type: 'number'
                    }
                }
            }
        }
    }
};
