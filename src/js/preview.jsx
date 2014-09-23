'use strict';
var React = require('react');
var moment = require('moment');


module.exports = React.createClass({
    displayName: 'Preview',

    render: function() {
        var today = moment().format('DD.MM.YYYY');
        var data = this.props.data;

        // arrays/objects may be undefined initially so extra checks are needed
        data.sender = this.props.data.sender || {};
        data.recipient = this.props.data.recipient || {};

        var reference = calculateReference({
            id: this.props.data.member.id,
            number: this.props.data.member.invoiceNumber
        });

        var services = calculateServices({
            initial: this.props.data.services,
            vat: 0.24
        });

        return (
            <div className="preview">
                <header>
                    <h1 className="company">{data.sender.company}</h1>
                    <div className="sender">
                        <div className="name">{data.sender.name}</div>
                        <div className="address">{data.sender.address}</div>
                        <div className="city">{data.sender.postalCode} {data.sender.city}</div>
                        <div className="phone">Phone: {data.sender.phone}</div>
                        <div className="iban">IBAN: {data.sender.iban}</div>
                        <div className="bic">BIC/SWIFT: {data.sender.bic}</div>
                        <div className="companyId">Company ID: {data.sender.companyId}</div>
                    </div>
                    <div className="extra">
                        <div className="invoice">INVOICE</div>
                        <div className="date">{today}</div>
                        <div className="reference"># {reference}</div>
                    </div>
                </header>
                <article>
                    <div className="info">
                        <div className="recipient">
                            <div className="company">{data.recipient.company}</div>
                            <div className="name">{data.recipient.name}</div>
                            <div className="address">{data.recipient.address}</div>
                            <div className="city">{data.recipient.postalCode} {data.recipient.city}</div>
                            <div className="phone">{data.recipient.phone}</div>
                            <div className="companyId">{data.recipient.companyId}</div>
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

function calculateReference(o) {
    if(o.id && o.number) {
        return teeViite(o.id, o.number)
    }
}

// Viitenumeron muodostaja JavaScriptillä
// (c) Kimmo Surakka <kusti@cs.tut.fi>, 1998
// Koodia saa käyttää vapaasti muuttamattomana,
// tätä tekijänoikeusilmoitusta ei saa poistaa.
//
// Muokattu Kimmo Surakan luvalla, nyt muodostaa sarjan viitenumeroita. 
// (c) Jori Mäntysalo <jori.mantysalo@uta.fi>, 2004
//
function teeViite(memberId, invoiceId) {
    var pohja = '' + (memberId * 1000 + invoiceId);

    // tarkistetta käytetään painotetun summan laskemiseen
    var tarkiste = 0;
    //  tänne sijoitetaan lopullinen, muotoiltu merkkijono:
    var muotoiltu="";
    // Tarvittavat kertoimet löytyvät tästä:
    var kerroin = "731";
    // Käydään merkkijono läpi lopusta alkuun:
    for( var i=pohja.length - 1, j=0, k=1 ; i >= 0 ; i--, j++, k++) {
        // Käsiteltävä merkki:
        var merkki = pohja.charAt(i, 10);
        // Lasketaan painotettua summaa:
        tarkiste += parseInt(kerroin.charAt( j % 3 ), 10)
                    * parseInt(merkki);
        // Muotoillaan samalla tulosmerkkijonoa:
        if( k%5 == 0) {
            muotoiltu = " " + muotoiltu;
        }
        muotoiltu = merkki + muotoiltu;
    }
    // Muodostetaan tarkistusnumero
    tarkiste = (10 - tarkiste % 10) % 10;
    // Palautetaan täydellinen viitenumero:
    return muotoiltu + tarkiste.toString();
}
