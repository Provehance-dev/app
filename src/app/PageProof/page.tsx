'use client'

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageProof() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const connection_id = searchParams.get('connection_id');

  // verification
  console.log("code:" + code);
  console.log("connection_id: " + connection_id);

  useEffect(() => {
    if (code && connection_id) {
      const clientId = process.env.CLIENT_ID;
      const clientSecret = process.env.CLIENT_SECRET;

      const data = {
        code: code,
        client_id: clientId,
        client_secret: clientSecret
      };

      fetch(`https://myfreetest-sandbox.biapi.pro/2.0/auth/token/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Access Token:', data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [code, connection_id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Proof of Funds</h1>
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="hash" className="block text-lg font-semibold mb-2">Hash</label>
          <p id="hash" className="bg-gray-100 p-2 rounded-md">0xez65f1s3d5f1a3e5f13w5d1f3q51qd3s1da</p>
        </div>
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-lg font-semibold mb-2">PDF</label>
          <a href="/path/to/pdf-file.pdf" download className="block bg-indigo-500 text-white px-6 py-3 rounded-md text-center hover:bg-indigo-600 text-lg font-semibold">Download</a>
        </div>
      </div>
    </div>
  );
}