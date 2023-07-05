const sdGrid = require('@sendgrid/mail');
const InvoiceTemplateId = 'd-253a7195927a42eaa57837464332d6cd';

interface InvoiceDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderDetails: {
    products: [
      {
        name: string;
        price: string;
        quantity: string;
      }
    ];
  };
  total: string;
}

export async function sendCustomerInvoice(invoice: InvoiceDetails) {
  sdGrid.setApiKey(process.env.SEND_GRID_API_KEY);
  const message = {
    from: { email: process.env.SENDER_EMAIL, name: 'MR PERFUMES' },
    personalizations: [
      {
        to: [
          {
            email: invoice.customerEmail,
          },
        ],
        dynamic_template_data: {
          customerName: invoice.customerName,
          orderId: invoice.orderId,
          orderDetails: invoice.orderDetails,
          total: invoice.total,
        },
      },
    ],
    template_id: InvoiceTemplateId,
  };
  try {
    sdGrid.send(message);
  } catch (error) {
    console.log(error);
  }
}
