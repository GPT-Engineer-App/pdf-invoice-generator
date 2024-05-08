import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Invoice Number: {data.invoiceNumber}</Text>
        <Text>Invoice Date: {data.invoiceDate}</Text>
        <Text>Sender's Address: {data.senderAddress}</Text>
        <Text>Recipient's Address: {data.recipientAddress}</Text>
        {data.lineItems.map((item, index) => (
          <Text key={index}>{item.description} - Quantity: {item.quantity} - Price: {item.price} - Subtotal: {item.quantity * item.price}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;