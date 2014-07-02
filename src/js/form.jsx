'use strict';
var React = require('react');
var LocalStorageMixin = require('react-localstorage');
var validate = require('plexus-validate');
var Form = require('plexus-form');

var schema = require('./schema');
var Preview = require('./preview.jsx');


module.exports  = React.createClass({
    displayName: 'FormDemoPage',
    mixins: [LocalStorageMixin],

    getInitialState: function() {
        return {
            schema: schema,
            values: {}
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
