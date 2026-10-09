/*
A union allows a value to satisfy at least one of the specified types.

Use a union when a value can have multiple possible types or states.
*/

type SearchQuery = string | number;

let query: SearchQuery;

query = "TypeScript"; // ✅
query = 12345; // ✅
query = true; // ❌
// SearchQuery only accepts stings or numbers

type PaymentStatus = "pending" | "completed" | "failed";

let status1: PaymentStatus = "completed"; // ✅
status1 = "refunded"; // ❌

// Unions don't automatically give access to every property
type EmailNotification = {
    email: string;
};

type SMSNotification = {
    phone: string;
};

function notify(user: EmailNotification | SMSNotification) {
    // console.log(user.email); // ❌ Not guaranteed

    if ("email" in user) {
        console.log(user.email); // ✅ Narrowed
    }
}

// With a union, TypeScript only lets you access properties guaranteed to exist across the
// possibilities until you narrow the type.
