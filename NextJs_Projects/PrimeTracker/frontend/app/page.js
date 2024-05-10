import React from "react";
import Navbar from "./components/Navbar";
import { MongoClient } from "mongodb";
import Link from "next/link";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'primetracker';

export default async function Home() {


  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('prices');
  const findResult = await collection.aggregate([
    {
      $group: {
        _id: "$asin",
        title: { $first: "$title" }
      }
    },
    {
      $project: {
        _id: 0,
        asin: "$_id",
        title: 1
      }
    }
  ]).toArray()
  console.log(findResult);
  return (
    <>
      <Navbar />
      <h1 className="my-3 text-center py-5 font-bold text-4xl">Welcome to PrimeTracker - Track your favourite products price!</h1>
      <div>
        <ul className="list-decimal justify-center px-9 font-bold items-center">
        {findResult.map(item => {
          return <li className=" my-4" key={item}><Link href={`/${item.asin}`}>{item.title}</Link></li>
        })}
        </ul>
      </div>
    </>
  );
}
