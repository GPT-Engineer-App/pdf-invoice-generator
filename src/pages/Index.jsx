import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF';

const Index = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, price: 0 }]);

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...lineItems];
    newLineItems[index][field] = value;
    setLineItems(newLineItems);
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveLineItem = (index) => {
    const newLineItems = [...lineItems];
    newLineItems.splice(index, 1);
    setLineItems(newLineItems);
  };

  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold underline mb-4">Invoice Generator</h1>
      <div className="mb-4">
        <label className="block">Invoice Number</label>
        <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="border p-2" />
      </div>
      <div className="mb-4">
        <label className="block">Invoice Date</label>
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border p-2" />
      </div>
      <div className="mb-4">
        <label className="block">Sender's Address</label>
        <textarea value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} className="border p-2" />
      </div>
      <div className="mb-4">
        <label className="block">Recipient's Address</label>
        <textarea value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="border p-2" />
      </div>
      {lineItems.map((item, index) => (
        <div key={index} className="flex mb-2">
          <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} className="border p-2 flex-1" />
          <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value, 10))} className="border p-2 w-24" />
          <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleLineItemChange(index, 'price', parseFloat(e.target.value))} className="border p-2 w-24" />
          <span className="p-2">{calculateSubtotal(item.quantity, item.price).toFixed(2)}</span>
          <button onClick={() => handleRemoveLineItem(index)} className="p-2"><FaTrash /></button>
        </div>
      ))}
      <button onClick={handleAddLineItem} className="p-2 border mt-2"><FaPlus /> Add Line Item</button>
      <div className="mt-4">
        <PDFDownloadLink document={<InvoicePDF data={{ invoiceNumber, invoiceDate, senderAddress, recipientAddress, lineItems }} />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Index;