import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [lineItems, setLineItems] = useState([{ description: '', quantity: 0, price: 0 }]);
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
    setLineItems([...lineItems, { description: '', quantity: 0, price: 0 }]);
  };

  const handleRemoveLineItem = (index) => {
    const newLineItems = [...lineItems];
    newLineItems.splice(index, 1);
    setLineItems(newLineItems);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice Details', 10, 10);
    doc.text(`Sender's Address: ${senderAddress}`, 10, 20);
    doc.text(`Recipient's Address: ${recipientAddress}`, 10, 30);
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 40);
    doc.text(`Date: ${invoiceDate}`, 10, 50);
    lineItems.forEach((item, index) => {
      const position = 60 + (index * 10);
      doc.text(`Item ${index + 1}: ${item.description}, Quantity: ${item.quantity}, Price: $${item.price}`, 10, position);
    });
    const subtotal = calculateSubtotal().toFixed(2);
    doc.text(`Subtotal: $${subtotal}`, 10, 60 + (lineItems.length * 10));
    doc.save('invoice.pdf');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Invoice Details</h1>
      <div>
        <label className="block mb-2">Sender's Address:</label>
        <input type="text" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} className="border p-2 w-full mb-4" />
        <label className="block mb-2">Recipient's Address:</label>
        <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="border p-2 w-full mb-4" />
        <label className="block mb-2">Invoice Number:</label>
        <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="border p-2 w-full mb-4" />
        <label className="block mb-2">Date:</label>
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border p-2 w-full mb-4" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Line Items</h2>
        {lineItems.map((item, index) => (
          <div key={index} className="flex mb-4">
            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} className="border p-2 w-1/3" />
            <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)} className="border p-2 w-1/4" />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleLineItemChange(index, 'price', e.target.value)} className="border p-2 w-1/4" />
            <button onClick={() => handleRemoveLineItem(index)} className="p-2 text-red-500"><FaTrash /></button>
          </div>
        ))}
        <button onClick={handleAddLineItem} className="p-2 bg-blue-500 text-white"><FaPlus /> Add Item</button>
        <button onClick={downloadPDF} className="mt-4 p-2 bg-green-500 text-white">Download PDF</button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Index;