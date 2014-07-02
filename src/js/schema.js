'use strict';

module.exports = {
    type: 'object',
    required: ['name', 'memberId', 'invoiceNumber', 'services'],
    properties: {
        name: {
            title: 'Your name',
            description: 'Your full name',
            type: 'string',
            minLength: 3,
            maxLength: 40,
            pattern: '^[A-ZÖÄÅ][a-zöäå]*(\\s[A-ZÖÄÅ][a-zöäå]*)*$'
        },
        memberId: {
            title: 'Member id',
            description: 'Your member id',
            type: 'number',
            minLength: 1,
            maxLength: 10
        },
        invoiceNumber: {
            title: 'Invoice number',
            description: 'Invoice number (nth invoice you are sending)',
            type: 'number',
            minLength: 1,
            maxLength: 10
        },
        recipient: {
            title: 'Recipient',
            type: 'object',
            properties: {
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
                }
            }
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
