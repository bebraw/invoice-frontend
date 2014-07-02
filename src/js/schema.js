'use strict';

module.exports = {
    type: 'object',
    properties: {
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
