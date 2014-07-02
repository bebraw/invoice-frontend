'use strict';
var React = require('react');
var drag = require('dragjs');


module.exports = React.createClass({
    displayName: 'Handle',
    render: function() {
        return (
            <div className="handle" draggable="true" onDrag={this.dragHandle}></div>
        );
    },
    componentDidMount: function() {
        // TODO: extend dragjs to support this sort of work
        drag(this.getDOMNode());
    }
});
