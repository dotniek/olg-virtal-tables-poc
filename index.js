import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const Orders = [
    {
        OrderGuid: '0c0973c7-2623-4f86-968d-91ab63d67dfd',
        OrderId: 1,
        OrderDate: '2023-10-03T00:00:00Z',
        CustomerId: '57489052-104a-4515-90aa-93639c44343e',
    },
    {
        OrderGuid: 'a74087a4-4a07-449b-af45-be4732337556',
        OrderId: 2,
        OrderDate: '2023-10-17T00:00:00Z',
        CustomerId: 'c4d59b78-f8bb-4301-a0b2-838f5a0e05a8',
    },
    {
        OrderGuid: 'f4d57648-0432-4f3e-9ad8-69538067df70',
        OrderId: 3,
        OrderDate: '2023-10-25T00:00:00Z',
        CustomerId: 'f2760589-d4de-4ee0-997d-300a482e4b6b',
    }
];

const Order_Details = [
    {
        OrderGuid: '0c0973c7-2623-4f86-968d-91ab63d67dfd',
        OrderId: 1,
        ProductGuid: '57489052-104a-4515-90aa-93639c44343e',
        Quantity: 1,
        Price: 199.99
    },
    {
        OrderGuid: 'a74087a4-4a07-449b-af45-be4732337556',
        OrderId: 2,
        ProductGuid: 'c4d59b78-f8bb-4301-a0b2-838f5a0e05a8',
        Quantity: 2,
        Price: 19.99
    },
    {
        OrderGuid: 'a74087a4-4a07-449b-af45-be4732337556',
        OrderId: 2,
        ProductGuid: 'f2760589-d4de-4ee0-997d-300a482e4b6b',
        Quantity: 1,
        Price: 9.99
    },
    {
        OrderGuid: 'f4d57648-0432-4f3e-9ad8-69538067df70',
        OrderId: 3,
        ProductGuid: 'f2760589-d4de-4ee0-997d-300a482e4b6b',
        Quantity: 1,
        Price: 9.99
    },
    {
        OrderGuid: 'f4d57648-0432-4f3e-9ad8-69538067df70',
        OrderId: 3,
        ProductGuid: 'c4d59b78-f8bb-4301-a0b2-838f5a0e05a8',
        Quantity: 2,
        Price: 19.99
    },
];

app.get('/orders', function (req, res) {
    res.status(200).json({ value: Orders });
});

app.get('/orders/:id', function (req, res) {
    const orderId = req.params.id;

    const filtered = Orders.filter(x => x.OrderId == orderId || x.OrderGuid == orderId);

    if (filtered.length) {
        res.status(200).json({ value: filtered[0] });
    } else {
        res.status(404).json(`The order with Id = '${orderId}'  could not be found!`);
    }
});

app.get('/order_details', function (req, res) {
    res.status(200).json({value: Order_Details});
});

app.get('/order_details/:orderId', function (req, res) {
    const orderId = req.params.orderId;
    let order_details;
    if (typeof orderId === 'number') {
        order_details = Order_Details.filter(x => x.OrderId === orderId || x.OrderGuid === orderId);
    }
    else {
        order_details = Order_Details.filter(x => x.OrderId === orderId || x.OrderGuid === orderId);
    }

    res.status(200).json({value: Order_Details});
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));