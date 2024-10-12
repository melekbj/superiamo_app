'use client';

import { useState, useEffect } from 'react';
import { User } from 'next-auth';
import { validateAddress } from '@/utils/addressValidation';

type ProfileFormProps = {
  user: User & {
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
  };
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const nameParts = user.name?.split(' ') || ['', ''];
    setFormData({
      firstName: user.firstName || nameParts[0] || '',
      lastName: user.lastName || nameParts.slice(1).join(' ') || '',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || '',
      phoneNumber: user.phoneNumber || '',
    });
  }, [user]);

  const [addressError, setAddressError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'address') {
      setAddressError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate address
    const addressValidation = await validateAddress(formData.address);
    if (!addressValidation.isValid) {
      setAddressError(addressValidation.message);
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User updated successfully:', updatedUser);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-4">
      <div>
        <label htmlFor="firstName" className="block mb-1">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-1">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-1">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Update Profile
      </button>
    </form>
  );
}