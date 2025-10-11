// src/pages/SellerProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SellerProfile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== 'seller') {
    return <p>Access denied. You must be a seller to view this page.</p>;
  }

  // Dummy brand info — you can fetch from Firebase later
  const brandInfo = {
    name: currentUser.brandName || 'My Brand',
    description: currentUser.brandDescription || 'Add a description for your brand.',
    website: currentUser.website || 'https://example.com',
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Seller Profile</h1>

      {/* Brand Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">{brandInfo.name}</h2>
        <p className="mb-2">{brandInfo.description}</p>
        <a
          href={brandInfo.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit Website
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/admin')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Admin Dashboard
        </button>

        <button
          onClick={() => navigate('/admin/product/new')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Product
        </button>
      </div>
    </div>
  );
}

export default SellerProfile;
