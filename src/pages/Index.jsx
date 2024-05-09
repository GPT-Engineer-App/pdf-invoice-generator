import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { jsPDF } from "jspdf";

const Index = () => {
  const [lineItems, setLineItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 10);
    doc.text(`Date: ${invoiceDate}`, 10, 20);
    doc.text(`Sender Address: ${senderAddress}`, 10, 30);
    doc.text(`Recipient Address: ${recipientAddress}`, 10, 40);
    lineItems.forEach((item, index) => {
      doc.text(`${item.description} - Quantity: ${item.quantity} - Price: $${item.price} - Subtotal: $${calculateSubtotal(item.quantity, item.price)}`, 10, 50 + (index * 10));
    });
    doc.save('invoice.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold underline mb-4">Invoice Generator</h1>
      <div>
        <label>Invoice Number</label>
        <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="border p-1" />
        <label>Date</label>
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border p-1" />
        <label>Sender Address</label>
        <textarea value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} className="border p-1" />
        <label>Recipient Address</label>
        <textarea value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="border p-1" />
      </div>
      <div>
        {lineItems.map((item, index) => (
          <div key={index} className="flex mb-2">
            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} className="border p-1 flex-1" />
            <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)} className="border p-1 w-20" />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleLineItemChange(index, 'price', e.target.value)} className="border p-1 w-20" />
            <button onClick={() => handleRemoveLineItem(index)} className="p-1"><FaTrash /></button>
          </div>
        ))}
        <button onClick={handleAddLineItem} className="p-1"><FaPlus /></button>
      </div>
      <button onClick={downloadPDF} className="mt-4 p-2 bg-blue-500 text-white">Download Invoice</button>
    </div>
  );
};

export default Index;