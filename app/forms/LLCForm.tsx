'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import LLCNavBar from './LLCNavBar';

const LLCForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState('');

  const handleFormChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitButton = event.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitButton.disabled = true;

    let template_id = '';

    if (selectedForm === 'ny-llc') {
      template_id = 'template_ofset74';
    } else if (selectedForm === 'nationwide-llc') {
      template_id = 'template_w39oj2c';
    }

    if (template_id) {
      emailjs.sendForm('service_b680i9p', template_id, event.currentTarget, '6WTmCe0O-HEglaZFI')
        .then((result) => {
          console.log('SUCCESS!', result.status, result.text);
          alert('Form submitted successfully!');
        }, (error) => {
          console.error('FAILED...', error);
          alert('Failed to send form. Please try again.');
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    } else {
      alert('Please select a valid form option.');
      submitButton.disabled = false;
    }
  };

  return (
    <div>
      <LLCNavBar />
      <div className="p-5 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-24">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">LLC Formation</h1>
        <div className="mb-6 text-center">
          <label htmlFor="llcform-form-select" className="block mb-2 text-lg font-semibold text-gray-700">Select Form:</label>
          <select id="llcform-form-select" name="selectedForm" onChange={handleFormChange} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">--Select an option--</option>
            <option value="ny-llc">New York State LLC</option>
            <option value="nationwide-llc">Nationwide Entity Formation</option>
          </select>
        </div>
        {selectedForm && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {selectedForm === 'ny-llc' ? 'New York State LLC Formation' : 'Nationwide Entity Formation'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Name of the Entity:</label>
                <input type="text" name="entityName" required className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Second Option:</label>
                <input type="text" name="secondOption" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Service of Process Address:</label>
                <input type="text" name="serviceAddress" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex items-center gap-4">
                <label className="block text-lg font-semibold text-gray-700">Would you like your LLC published?</label>
                <input type="checkbox" name="llcPublished" className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-4">
                <label className="block text-lg font-semibold text-gray-700">Would you like a Federal Tax ID Number?</label>
                <input type="checkbox" name="federalTaxID" className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Number of members:</label>
                <input type="number" name="numberOfMembers" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Responsible Party (Individual):</label>
                <input type="text" name="responsibleParty" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Member's SSN:</label>
                <input type="text" name="ssn" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Office Address:</label>
                <input type="text" name="officeAddress" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Principle Business Activity (e.g., Real Estate):</label>
                <input type="text" name="businessActivity" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Principle Product (e.g., Residential Rentals):</label>
                <input type="text" name="product" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              {/* Upload file input */}
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Upload Document:</label>
                <input type="file" name="file" className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLCForm;
