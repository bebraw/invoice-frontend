'use strict';
var React = require('react');
var moment = require('moment');


module.exports = React.createClass({
    displayName: 'Preview',

    render: function() {
        var today = moment().format('DD.MM.YYYY');
        var data = this.props.data;

        // arrays/objects may be undefined initially so extra checks are needed
        data.recipient = this.props.data.recipient || {};

        var services = calculateServices({
            initial: this.props.data.services,
            vat: 0.24
        });

        return (
            <div className="preview">
                <header>
                    <div className="sender">
                        <div className="company">Company ltd.</div>
                        <div className="name">John Doe</div>
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

function calculateServices(o) {
    var services = o.initial || [];

    // calculate vats
    services = services.map(function(service) {
        var cost = service.cost || 0;
        var vatCost = o.vat * cost;

        return {
            name: service.name,
            cost: cost,
            vat: o.vat * 100,
            vatCost: vatCost,
            total: vatCost + cost
        };
    });

    // calculate totals
    var total = sum(services, 'total');
    services.push({
        name: 'Total',
        cost: sum(services, 'cost'),
        vat: o.vat * 100,
        vatCost: sum(services, 'vatCost'),
        total: total,
    });

    services.push({
        name: 'Total',
        total: total
    });

    return services;
}

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
