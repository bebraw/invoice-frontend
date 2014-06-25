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
var SchemaEditor = React.createClass({
    displayName: 'SchemaEditor',
    preventSubmit: function(event) {
        event.preventDefault();
    },
    render: function() {
        return $.form({
            onSubmit: this.preventSubmit
        }, $.textarea({
            rows: 30,
            cols: 60,
            onChange: this.props.onChange,
            value: this.props.value
        }));
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
    update: function(event) {
        var text = event.target.value;
        var schema;
        try {
            schema = JSON.parse(event.target.value);
            this.setState({
                schema: schema,
                text: text
            });
        } catch (ex) {
            this.setState({
                text: text
            });
        }
    },
    onFormSubmit: function(data, value) {
        this.setState({
            button: value,
            data: data
        });
    },
    render: function() {
        return $.div(null, $.ul({
            className: 'flexContainer'
        }, $.li({
            className: 'flexItem'
        }, $.h3(null, 'Schema:'), SchemaEditor({
            value: this.state.text,
            onChange: this.update
        })), $.li({
            className: 'flexItem'
        }, $.h3(null, 'Generated form:'), Form({
            buttons: ['Dismissed', 'Energise'],
            onSubmit: this.onFormSubmit,
            schema: this.state.schema,
            validate: validate
        })), $.li({
            className: 'flexItem'
        }, $.h3(null, 'Data:'), $.pre(null, JSON.stringify(this.state.data, null, 4)), $.h3(null, 'Button:'), $.p(null, this.state.button))));
    }
});
React.renderComponent(FormDemoPage(), document.getElementById('react-main'));