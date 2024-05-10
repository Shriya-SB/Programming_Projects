import React from "react";
import Navbar from "../components/Navbar";
import DisplayChart from "../components/DisplayChart";
import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'primetracker';

export default async function Page({ params }) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('prices');

    let asin = params.asin
    const data = await collection.aggregate([
        {
            $match: {
                asin: asin.toUpperCase()
            }
        },
        {
            $group: {
                _id: "$asin",
                data: {
                    $push: {
                        time: { $dayOfMonth: "$time" },
                        price: { $toInt: "$price" }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                labeel: "Product",
                data: "$data"
            }
        }
    ]).toArray()
    console.log(data);
    return (
        <>
            <Navbar />
            <h1>Track Price For: {params.asin}</h1>
            <div className="m-auto my-3">
                <DisplayChart data={data} />
            </div>
        </>
    )
}
