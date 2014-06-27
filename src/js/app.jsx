'use strict';
var React = require('react');
var validate = require('plexus-validate');
var Form = require('./plexus-form');
var $ = React.DOM;
window.React = React;


var schema = {
    'title': 'Invoice',
    'description': 'Invoice generator',
    'type': 'object',
    'required': ['name', 'memberId', 'invoiceNumber', 'services'],
    'properties': {
        'name': {
            'title': 'Your name',
            'description': 'Your full name',
            'type': 'string',
            'minLength': 3,
            'maxLength': 40,
            'pattern': '^[A-ZÖÄÅ][a-zöäå]*(\\s[A-ZÖÄÅ][a-zöäå]*)*$',
            'x-hints': {
                'form': {
                    'classes': 'important-field'
                }
            }
        },
        'memberId': {
            'title': 'Member id',
            'description': 'Your member id',
            'type': 'number',
            'minLength': 1,
            'maxLength': 10
        },
        'invoiceNumber': {
            'title': 'Invoice number',
            'description': 'Invoice number (nth invoice you are sending)',
            'type': 'number',
            'minLength': 1,
            'maxLength': 10
        },
/*        'recipient': {
            'title': 'Recipient',
            'type': 'object',
            'properties': {
                'name': {
                    'title': 'Name',
                    'type': 'string'
                }
            }
        },*/
        'services': {
            'title': 'Services',
            'type': 'array',
            'minItems': 1,
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'title': 'Service',
                        'type': 'string'
                    },
                    'cost': {
                        'title': 'Cost',
                        'type': 'number'
                    }
                }
            }
        }
    }
};
var Preview = React.createClass({
    displayName: 'Preview',
    render: function() {
        console.log(this.props.data);

        // XXX: arrays/objects may be undefined initially
        return (
            <div className="preview">
                <header>
                    <div className="sender">
                        <div className="company">Company ltd.</div>
                        <div className="name">{this.props.data.name}</div>
                        <div className="address">12345 JYVÄSKYLÄ</div>
                    </div>
                    <div className="extra">
                        <div className="invoice">INVOICE</div>
                        <div className="date">{new Date().toString()}</div>
                        <div className="logo">LOGO</div>
                    </div>
                </header>
                <article>
                    <table className="services">
                        <tr><th>Service</th><th>Tax free</th><th>Tax</th><th>Total</th></tr>
                        {this.props.data.services.map(function(service, i) {
                            return <tr key={i}><td>{service.name}</td><td>{service.cost}</td></tr>;
                        })}
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