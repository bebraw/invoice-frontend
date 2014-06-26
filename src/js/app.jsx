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
        return (
            <pre>{JSON.stringify(this.props.data, null, 4)}</pre>
        );
    }
});
var FormDemoPage = React.createClass({
    displayName: 'FormDemoPage',
    getInitialState: function() {
        return {
            schema: schema,
            text: JSON.stringify(schema, null, 2)
        };
    },
    render: function() {
        // TODO: need to implement Form.onChange to get this work nicely
        return (
            <div>
                <ul className="flexContainer">
                    <li className="flexItem">
                        <h3>Invoice</h3>
                        <Form buttons={[]} schema={this.state.schema} validate={validate} />
                    </li>
                    <li className="flexItem">
                        <h3>Preview</h3>
                        <Preview data={this.state.data} />
                    </li>
                </ul>
            </div>
        );
    }
});
React.renderComponent(FormDemoPage(), document.getElementById('react-main'));