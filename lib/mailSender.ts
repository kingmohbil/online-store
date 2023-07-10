const sdGrid = require('@sendgrid/mail');
const CustomerInvoiceTemplateId = 'd-253a7195927a42eaa57837464332d6cd';
const ManagerTemplateId = 'd-0b5298e405b34baeb66116931a661717';
const DeliveryTemplateId = 'd-d091704babfe41659f60c3a676fb1457';
const ProductProviderTemplateId = 'd-48e1e264952f4c0289bddbfbbdca06b0';

// customer invoice details
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

interface ManagerEmailDetails extends InvoiceDetails {
  managerEmail: string;
  customerPhone: string;
  customerSecondPhone: string;
  customerLocation: string;
  paymentMethod: string;
}

interface DeliveryDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerSecondPhone: string;
  customerLocation: string;
  customerPayment: string;
}

interface ProductProviderDetails {
  orderId: string;
  orderDetails: {
    products: [
      {
        name: string;
        quantity: string;
      }
    ];
  };
}
// send grid api key
sdGrid.setApiKey(process.env.SEND_GRID_API_KEY);

export async function sendCustomerInvoice(invoice: InvoiceDetails) {
  if (process.env.SENDER_EMAIL == null) {
    console.log('Please provide SENDER_EMAIL variable');
    return;
  }
  const message = {
    // sender email
    from: { email: process.env.SENDER_EMAIL, name: 'MR PERFUMES' },
    personalizations: [
      {
        // receiver email
        to: [
          {
            email: invoice.customerEmail,
          },
        ],
        // email data
        dynamic_template_invoice: {
          customerName: invoice.customerName,
          orderId: invoice.orderId,
          orderDetails: invoice.orderDetails,
          total: invoice.total,
        },
      },
    ],
    template_id: CustomerInvoiceTemplateId,
  };
  try {
    return Promise.resolve(sdGrid.send(message));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function sendManagerInvoice(invoice: ManagerEmailDetails) {
  if (process.env.SENDER_EMAIL == null) {
    console.log('Please provide SENDER_EMAIL variable');
    return;
  }
  if (process.env.MANAGER_EMAIL == null) {
    console.log('Please provide MANAGER_EMAIL variable');
    return;
  }
  const message = {
    // sender email
    from: { email: process.env.SENDER_EMAIL, name: 'MR PERFUMES' },
    personalizations: [
      {
        // receiver email
        to: [
          {
            email: process.env.MANAGER_EMAIL,
          },
        ],
        // manager invoice data
        dynamic_template_invoice: {
          orderId: invoice.orderId,
          customerName: invoice.customerName,
          customerEmail: invoice.customerEmail,
          customerPhone: invoice.customerPhone,
          customerSecondPhone: invoice.customerSecondPhone,
          customerLocation: invoice.customerLocation,
          orderDetails: invoice.orderDetails,
          total: invoice.total,
          paymentMethod: invoice.paymentMethod,
        },
      },
    ],
    template_id: ManagerTemplateId,
  };
  try {
    return Promise.resolve(sdGrid.send(message));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function sendDeliveryEmail(invoice: DeliveryDetails) {
  if (process.env.SENDER_EMAIL == null) {
    console.log('Please provide SENDER_EMAIL variable');
    return;
  }
  if (process.env.DELIVERY_EMAIL == null) {
    console.log('Please provide DELIVERY_EMAIL variable');
    return;
  }
  const message = {
    // sender email
    from: { email: process.env.SENDER_EMAIL, name: 'MR PERFUMES' },
    personalizations: [
      {
        // receiver email
        to: [
          {
            email: process.env.DELIVERY_EMAIL,
          },
        ],
        // delivery email date
        dynamic_template_invoice: {
          orderId: invoice.orderId,
          customerName: invoice.customerName,
          customerPhone: invoice.customerPhone,
          customerSecondPhone: invoice.customerSecondPhone,
          customerPayment: invoice.customerPayment,
        },
      },
    ],
    template_id: DeliveryTemplateId,
  };
  try {
    return Promise.resolve(sdGrid.send(message));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function sendProductProviderEmail(
  invoice: ProductProviderDetails
) {
  if (process.env.SENDER_EMAIL == null) {
    console.log('Please provide SENDER_EMAIL variable');
    return;
  }
  if (process.env.PRODUCT_PROVIDER_EMAIL == null) {
    console.log('Please provide PRODUCT_PROVIDER_EMAIL variable');
    return;
  }
  const message = {
    // sender email
    from: { email: process.env.SENDER_EMAIL, name: 'MR PERFUMES' },
    personalizations: [
      {
        // receiver email
        to: [
          {
            email: process.env.PRODUCT_PROVIDER_EMAIL,
          },
        ],
        // product provider email data
        dynamic_template_invoice: {
          orderId: invoice.orderId,
          orderDetails: invoice.orderDetails,
        },
      },
    ],
    template_id: ProductProviderTemplateId,
  };
  try {
    return Promise.resolve(sdGrid.send(message));
  } catch (error) {
    return Promise.reject(error);
  }
}
