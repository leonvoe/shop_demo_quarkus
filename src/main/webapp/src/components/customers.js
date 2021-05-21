import React from 'react'

const Customers = ({ customers }) => {
    return (
        <div>
            <center><h1>Customers List</h1></center>
            <table class="pf-c-table pf-m-grid-md" role="grid" aria-label="List of all customers" id="table-basic">
                <caption>Supersonic Subatomic Particles</caption>
                <thead>
                    <tr role="row">
                        <th role="columnheader" scope="col">First name</th>
                        <th role="columnheader" scope="col">Last name</th>
                    </tr>
                </thead>
                {customers.map((customer) => (
                    <tbody role="rowgroup">
                        <tr role="row">
                            <td role="cell" data-label="Customer name">{customer.first_name}</td>
                            <td role="cell" data-label="Customer surname">{customer.last_name}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
};

export default Customers