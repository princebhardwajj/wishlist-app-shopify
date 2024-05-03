import { json } from "@remix-run/node";
import db  from "../db.server";
// import { cors } from "remix-utils/cors"
import { cors } from "remix-utils/cors";

export async function loader() {
    return json({
        ok: true,
        message: "Hello, from the api",
    });
}



export async function action({ request }) {
    const method = request.method;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;

    if(!customerId || !productId || !shop) {
        return json({
            message: "Missing data, Required data : customerId, productId, shop",
            method: method,
        });
    }


    switch (method) {
        case "POST":
            // Handle POST request logic here
            // For example, adding a new item to the wishlist
            const wishlist = await db.wishlist.create({
                data: {
                    customerId,
                    productId,
                    shop
                }
            })
            const response = json({  message: "Product added to wishlist", method: "POST", wishlist: wishlist });
            return cors(request, response);


            break;
        case "PATCH":
            // Handle PATCH request logic here
            // For example, updating an existing item in the wishlist
            return json({ message: "Success", method: "PATCH" });
            break;
        default:
            // Optional: handle other methods or return a method not allowed response
            return new Response("Method Not Allowed", { status: 405 });
    }

}