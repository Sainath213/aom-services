'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import LLCNavBar from './LLCNavBar';

const LLCForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [formData, setFormData] = useState({
    entityName: '',
    secondOption: '',
    serviceAddress: '',
    numberOfMembers: '',
    responsibleParty: '',
    ssn: '',
    officeAddress: '',
    businessActivity: '',
    product: '',
    stateOfFormation: '',
    registeredAgent: false,
    memberManaged: false,
    otherState: '',
    corporateKit: false,
    llcPublished: false,
    federalTaxID: false,
    memberManagerName: '',
    phoneNumber: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const handleFormChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      await handlePdfUpload(event.target.files[0]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePdfUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('extractionId', '-O4peBlKkMFd3BznOIsr');
    formData.append('files', file);

    try {
      setLoadingMessage('Uploading and extracting data from PDF. Please wait...');
      const uploadResponse = await axios.post('https://api.extracta.ai/api/v1/uploadFiles', formData, {
        headers: {
          'Authorization': 'Bearer Mzg3Njg0MTYw_iix76x7yw2ecokzls6vrv',
          'Content-Type': 'multipart/form-data',
        },
      });

      const { extractionId, batchId, files } = uploadResponse.data;

      if (!files || files.length === 0) {
        throw new Error('No files returned from the extraction service');
      }

      const fileId = files[0]?.fileId;
      if (!fileId) {
        throw new Error('File ID is undefined');
      }

      const resultResponse = await getBatchResults(extractionId, batchId, fileId);
      if (!resultResponse || !resultResponse.files || resultResponse.files.length === 0) {
        throw new Error('No results returned from the extraction service');
      }

      mapParsedDataToForm(resultResponse.files[0].result);
    } catch (error) {
      console.error('Error during PDF extraction:', (error as any).message || error);
      alert('Failed to extract data from the document.');
    } finally {
      setLoadingMessage('');
    }
  };

  const getBatchResults = async (extractionId: string, batchId: string, fileId: string) => {
    const payload = { extractionId, batchId, fileId };

    try {
      setLoadingMessage('Processing PDF. Please wait...');
      let status = 'waiting';
      let resultData;

      while (status === 'waiting') {
        const response = await axios.post('https://api.extracta.ai/api/v1/getBatchResults', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Mzg3Njg0MTYw_iix76x7yw2ecokzls6vrv',
          },
        });

        resultData = response.data;
        status = resultData.status || resultData.files[0]?.status;

        if (status !== 'waiting') break;
      }

      if (status !== 'processed') {
        throw new Error('File processing failed or is still in progress');
      }

      return resultData;
    } catch (error) {
      console.error('Error fetching extraction results:', (error as any).message || error);
      throw error;
    }
  };

  const mapParsedDataToForm = (parsedData: any) => {
    const updatedFormData = { ...formData };
    updatedFormData.entityName = parsedData['NAME OF ENTITY'] || '';
    updatedFormData.serviceAddress = parsedData['ADDRESS'] || '';
    updatedFormData.responsibleParty = parsedData['Responsible Party (Individual)'] || '';
    updatedFormData.ssn = parsedData["MEMBER'S SSN"] || '';
    updatedFormData.officeAddress = parsedData['PRIMARY OFFICE ADDRESS'] || '';
    updatedFormData.businessActivity = parsedData['PRINCIPLE BUSINESS ACTIVITY (IE REAL ESTATE)'] || '';
    updatedFormData.product = parsedData['PRINCIPLE PRODUCT (IE RESIDENTIAL RENTALS)'] || '';
    updatedFormData.stateOfFormation = parsedData['STATE OF FORMATION'] || '';
    updatedFormData.numberOfMembers = parsedData['NUMBER OF MEMBERS'] || '';
    updatedFormData.phoneNumber = parsedData['PHONE NUMBER'] || '';
    updatedFormData.otherState = parsedData['DO YOU WANT THIS ENTITY REGISTERED IN ANOTHER STATE?'] || '';
    updatedFormData.memberManaged = parsedData['IS THIS LLC MEMBER OR MANAGER MANAGED'] === 'Member' ? true : false;
    updatedFormData.corporateKit = parsedData['WOULD YOU LIKE A CORPORATE KIT'] === 'Yes' ? true : false;
    updatedFormData.registeredAgent = parsedData['WOULD YOU LIKE US TO PROVIDE A REGISTERED AGENT?'] === 'Yes' ? true : false;
    updatedFormData.federalTaxID = parsedData['WOULD YOU LIKED A FEDERAL TAX ID NUMBER?'] === 'Yes' ? true : false;
    updatedFormData.secondOption = parsedData['SECOND OPTION'] || '';

    setFormData(updatedFormData);
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
        {loadingMessage && <p className="text-center text-blue-500">{loadingMessage}</p>}
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
                <input
                  type="text"
                  name="entityName"
                  value={formData.entityName}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Second Option:</label>
                <input
                  type="text"
                  name="secondOption"
                  value={formData.secondOption}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Service of Process Address:</label>
                <input
                  type="text"
                  name="serviceAddress"
                  value={formData.serviceAddress}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="block text-lg font-semibold text-gray-700">Would you like your LLC published?</label>
                <input
                  type="checkbox"
                  name="llcPublished"
                  checked={formData.llcPublished}
                  onChange={handleInputChange}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="block text-lg font-semibold text-gray-700">Would you like a Federal Tax ID Number?</label>
                <input
                  type="checkbox"
                  name="federalTaxID"
                  checked={formData.federalTaxID}
                  onChange={handleInputChange}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Number of members:</label>
                <input
                  type="number"
                  name="numberOfMembers"
                  value={formData.numberOfMembers}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Responsible Party (Individual):</label>
                <input
                  type="text"
                  name="responsibleParty"
                  value={formData.responsibleParty}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Member's SSN:</label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Office Address:</label>
                <input
                  type="text"
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Principle Business Activity (e.g., Real Estate):</label>
                <input
                  type="text"
                  name="businessActivity"
                  value={formData.businessActivity}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Principle Product (e.g., Residential Rentals):</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Upload file input */}
              <div className="flex flex-col gap-4">
                <label className="block text-lg font-semibold text-gray-700">Upload Document:</label>
                <input type="file" name="file" onChange={handleFileChange} className="p-2 border border-gray-300 rounded-lg" />
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
