import { useParams } from "react-router-dom";
import React from 'react';

export default function Invoices() {
    const params = useParams();
    console.log(params);
    return (
        <h1>Invoices {params.invoiceId}</h1>
    );
}