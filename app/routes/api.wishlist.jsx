import { json } from "@remix-run/node";

export async function loader() {
    return json({
        ok: true,
        message: "Hello, World!",
    });
}



export async function action({ request }) {
    const method = request.method;
    switch (method) {
        case "POST":
            // Handle POST request logic here
            // For example, adding a new item to the wishlist
            return json({ message: "Success", method: "POST" });


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