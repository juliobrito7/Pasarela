import express from "express";
import cors from "cors";

//SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
//Agrega credenciales
const client = new MercadoPagoConfig({
    accessToken: "APP_USR-3450489551199648-082221-f85af34f60595e9622af04c2212e29f7-242272734",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title:req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://www.mercadopago.com.ar/",
                failure: "https://www.mercadopago.com.ar/",
                pending: "https://www.mercadopago.com.ar/",
            },
            auto_return: "approved",
        };

            const preference = new Preference(client);
            const result = await preference.create({ body });
            res.json({
                id: result.id,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error al crear la preferencia",
            });
        }
    });

    app.listen(port, () => {
        console.log(`El servidor esta corriendo en el puerto ${port}`);
    });
