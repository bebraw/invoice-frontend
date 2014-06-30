'use strict';
var React = require('react');
var LocalStorageMixin = require('react-localstorage');
var moment = require('moment');
var validate = require('plexus-validate');
var Form = require('plexus-form');


var schema = {
    title: 'Invoice',
    description: 'Invoice generator',
    type: 'object',
    required: ['name', 'memberId', 'invoiceNumber', 'services'],
    properties: {
        name: {
            title: 'Your name',
            description: 'Your full name',
            type: 'string',
            minLength: 3,
            maxLength: 40,
            pattern: '^[A-ZÖÄÅ][a-zöäå]*(\\s[A-ZÖÄÅ][a-zöäå]*)*$',
            'x-hints': {
                form: {
                    classes: 'important-field'
                }
            }
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
var Preview = React.createClass({
    displayName: 'Preview',

    render: function() {
        var vatPercent = 0.24;
        var today = moment().format('DD.MM.YYYY');
        var data = this.props.data;

        // XXX: arrays/objects may be undefined initially so extra checks are needed
        data.recipient = this.props.data.recipient || {};

        // attach vats
        var services = this.props.data.services || [];
        services = services.map(function(service) {
            var cost = service.cost || 0;
            var vatCost = vatPercent * cost;

            return {
                name: service.name,
                cost: cost,
                vat: vatPercent * 100,
                vatCost: vatCost,
                total: vatCost + cost
            };
        });

        // attach totals
        var total = sum(services, 'total');
        services.push({
            name: 'Total',
            cost: sum(services, 'cost'),
            vat: vatPercent * 100,
            vatCost: sum(services, 'vatCost'),
            total: total,
        });

        services.push({
            name: 'Total',
            total: total
        });

        function sum(d, prop) {
            return d.map(function(a) {
                return a[prop];
            }).reduce(function(a, b) {
                return a + b;
            }, 0);
        }

        function toFixed(a) {
            if(a) {
                return a.toFixed(2);
            }
        }

        return (
            <div className="preview">
                <header>
                    <div className="sender">
                        <div className="company">Company ltd.</div>
                        <div className="name">{data.name}</div>
                        <div className="address">Demotie 123</div>
                        <div className="city">12345 JYVÄSKYLÄ</div>
                    </div>
                    <div className="extra">
                        <div className="invoice">INVOICE</div>
                        <div className="date">{today}</div>
                        <div className="logo">LOGO</div>
                    </div>
                </header>
                <article>
                    <div className="info">
                        <div className="recipient">
                            <div className="company">{data.recipient.company}</div>
                            <div className="name">{data.recipient.name}</div>
                            <div className="address">{data.recipient.address}</div>
                            <div className="city">{data.recipient.postalCode} {data.recipient.city}</div>
                        </div>
                    </div>
                    <table className="services">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Tax free</th>
                                <th>Tax (%)</th>
                                <th>Tax</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {services.map(function(service, i) {
                            return <tr key={i}>
                                <td>{service.name}</td>
                                <td>{toFixed(service.cost)}</td>
                                <td>{toFixed(service.vat)}</td>
                                <td>{toFixed(service.vatCost)}</td>
                                <td>{toFixed(service.total)}</td>
                            </tr>;
                        })}
                        </tbody>
                    </table>
                </article>
                <footer>
                    <div className="companyDetails"></div>
                </footer>
            </div>
        );
    }
});
var FormDemoPage = React.createClass({
    displayName: 'FormDemoPage',
    mixins: [LocalStorageMixin],

    getInitialState: function() {
        return {
            schema: schema,
            text: JSON.stringify(schema, null, 2),
            // XXX: looks like these values aren't taken in count by Form!!!
            values: {
                services: [],
                recipient: {}
            }
        };
    },
    onSubmit: function(output) {
        this.setState({
            values: output
        });
    },
    render: function() {
        return (
            <div>
                <div className="fields">
                    <Form
                        buttons={[]}
                        schema={this.state.schema}
                        validate={validate}
                        submitOnChange={true}
                        onSubmit={this.onSubmit}
                        values={this.state.values}
                    />
                </div>
                <Preview data={this.state.values} />
            </div>
        );
    }
});
React.renderComponent(FormDemoPage(), document.getElementById('react-main'));