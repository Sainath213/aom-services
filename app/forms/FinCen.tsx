"use client"; 
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import FinCenNavBar from './FinCenNavBar';

const FinCen: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<typeof formData>({
    mode: 'onChange',
  });

  const [formData, setFormData] = useState({
    submitterFirstName: '',
    submitterLastName: '',
    submitterPhoneNumber: '',
    submitterEmail: '',
    reportingCompanyLegalName: '',
    reportingCompanyAlternateName: '',
    taxIdentificationType: '',
    taxIdentificationNumber: '',
    countryJurisdiction: '',
    stateOfFormation: '',
    address: '',
    city: '',
    usOrTerritory: '',
    state: '',
    zipCode: '',
    beneficialOwnerLastName: '',
    beneficialOwnerFirstName: '',
    beneficialOwnerMiddleName: '',
    beneficialOwnerSuffix: '',
    beneficialOwnerDOB: '',
    beneficialOwnerAddress: '',
    beneficialOwnerCity: '',
    beneficialOwnerCountryJurisdiction: '',
    beneficialOwnerState: '',
    beneficialOwnerZip: '',
    identifyingDocumentType: '',
    identifyingDocumentNumber: '',
    identifyingDocumentIssuingJurisdiction: '',
    identifyingDocumentCountry: '',
    identifyingDocumentExpirationDate: '',
    liabilityAcknowledgment: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const onSubmit: SubmitHandler<typeof formData> = (data) => {
    const requiredFields = [
      'submitterFirstName', 'submitterLastName', 'submitterPhoneNumber', 'submitterEmail',
      'reportingCompanyLegalName', 'reportingCompanyAlternateName', 'taxIdentificationType', 'taxIdentificationNumber',
      'countryJurisdiction', 'stateOfFormation', 'address', 'city', 'usOrTerritory', 'state', 'zipCode',
      'beneficialOwnerLastName', 'beneficialOwnerFirstName',
      'beneficialOwnerDOB', 'beneficialOwnerAddress', 'beneficialOwnerCity', 'beneficialOwnerCountryJurisdiction',
      'beneficialOwnerState', 'beneficialOwnerZip', 'identifyingDocumentType', 'identifyingDocumentNumber',
      'identifyingDocumentIssuingJurisdiction', 'identifyingDocumentCountry', 'identifyingDocumentExpirationDate'
    ];

    const missingFields = requiredFields.filter(field => !data[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      alert(`The following fields are missing: ${missingFields.join(', ')}`);
      return;
    }

    const emailData = {
      ...data,
      liabilityAcknowledgment: data.liabilityAcknowledgment ? 'Yes' : 'No',
    };

    emailjs.send('service_2qfl8vg', 'template_mvrs24t', emailData, '6WTmCe0O-HEglaZFI')
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Form submitted successfully!');
        reset();
      }, error => {
        console.error('FAILED...', error);
        alert('Form submission failed.');
      });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      await handlePdfUpload(selectedFile);
    }
  };

  const handlePdfUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('extractionId', '-O4pWe0sMbKcpXIWkJ2q'); 
    formData.append('files', file);

    try {
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
    }
  };

  const getBatchResults = async (extractionId: string, batchId: string, fileId: string) => {
    const payload = {
      "extractionId": extractionId,
      "batchId": batchId,
      "fileId": fileId,
    };

    try {
      let attempts = 0;
      let status = 'waiting';
      let resultData: any;

      setLoadingMessage('Autofilling is in process. Please wait...');

      while (status === 'waiting' && attempts < 10) {
        const response = await axios.post('https://api.extracta.ai/api/v1/getBatchResults', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Mzg3Njg0MTYw_iix76x7yw2ecokzls6vrv'
          }
        });

        resultData = response.data;
        status = resultData.status || resultData.files[0]?.status;

        if (status === 'waiting') {
          await new Promise(res => setTimeout(res, 10000)); // Wait for 10 seconds before retrying
          attempts++;
        }
      }

      setLoadingMessage('');

      if (status !== 'processed') {
        throw new Error('File processing failed or is still in progress');
      }
      return resultData;
    } catch (error) {
      console.error('Error fetching extraction results:', (error as any).message || error);
      throw error;
    }
  };

  const mapParsedDataToForm = (parsedData: Record<string, any>) => {
    setValue('reportingCompanyLegalName', parsedData['REPORTING COMPANY LEGAL NAME'] || '');
    setValue('reportingCompanyAlternateName', parsedData['ALTERNATE NAME'] || '');
    setValue('taxIdentificationType', parsedData['TAX IDENTIFICATION TYPE'] || '');
    setValue('taxIdentificationNumber', parsedData['TAX IDENTIFICATION NUMBER'] || '');
    setValue('countryJurisdiction', parsedData['COUNTRYJURISDICTION'] || '');
    setValue('stateOfFormation', parsedData['STATE OF FORMATION'] || '');
    setValue('address', parsedData['ADDRESS'] || '');
    setValue('city', parsedData['CITY'] || '');
    setValue('usOrTerritory', parsedData['US OR US TERRITORY'] || '');
    setValue('state', parsedData['STATE'] || '');
    setValue('zipCode', parsedData['ZIP CODE'] || '');
    setValue('beneficialOwnerLastName', parsedData['INDIVIDUAL’S LAST NAME OR ENTITY’S LEGAL NAME'] || '');
    setValue('beneficialOwnerFirstName', parsedData['FIRST NAME'] || '');
    setValue('beneficialOwnerMiddleName', parsedData['MIDDLE NAME'] || '');
    setValue('beneficialOwnerSuffix', parsedData['SUFFIX'] || '');
    setValue('beneficialOwnerDOB', parsedData['DATE OF BIRTH'] || '');
    setValue('beneficialOwnerAddress', parsedData['Beneficial Owner Information ADDRESS'] || '');
    setValue('beneficialOwnerCity', parsedData['Beneficial Owner Information City'] || '');
    setValue('beneficialOwnerCountryJurisdiction', parsedData['Beneficial Owner Information CountryJurisdiction'] || '');
    setValue('beneficialOwnerState', parsedData['Beneficial Owner Information state'] || '');
    setValue('beneficialOwnerZip', parsedData['"Beneficial Owner Information zipcode "'] || '');
    setValue('identifyingDocumentType', parsedData['IDENTIFYING DOCUMENT TYPE'] || '');
    setValue('identifyingDocumentNumber', parsedData['Identifying Document Number'] || '');
    setValue('identifyingDocumentIssuingJurisdiction', parsedData['Identifying Document state'] || '');
    setValue('identifyingDocumentCountry', parsedData['Identifying Document CountryJurisdiction'] || '');
    setValue('identifyingDocumentExpirationDate', parsedData['Identifying Document Expiration Date'] || '');
  };

  return (
    <div>
      <FinCenNavBar />
      <div className="p-5 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-24">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Beneficial Ownership Information Report Form</h1>
        {loadingMessage && <p className="text-center text-blue-500">{loadingMessage}</p>} {/* Display message */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Submitter Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-gray-700">First Name</label>
                <input {...register('submitterFirstName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.submitterFirstName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Last Name</label>
                <input {...register('submitterLastName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.submitterLastName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Phone Number</label>
                <input type="tel" {...register('submitterPhoneNumber', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.submitterPhoneNumber && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Email</label>
                <input type="email" {...register('submitterEmail', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.submitterEmail && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
          </section>
          <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Reporting Company Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-gray-700">Legal Name</label>
                <input {...register('reportingCompanyLegalName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.reportingCompanyLegalName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Alternate Name</label>
                <input {...register('reportingCompanyAlternateName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.reportingCompanyAlternateName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Tax Identification Type</label>
                <input {...register('taxIdentificationType', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.taxIdentificationType && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Tax Identification Number</label>
                <input {...register('taxIdentificationNumber', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.taxIdentificationNumber && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Country/Jurisdiction</label>
                <input {...register('countryJurisdiction', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.countryJurisdiction && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">State of Formation</label>
                <input {...register('stateOfFormation', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.stateOfFormation && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Current U.S. Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-gray-700">Address</label>
                <input {...register('address', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.address && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">City</label>
                <input {...register('city', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.city && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">U.S. or U.S. Territory</label>
                <input {...register('usOrTerritory', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.usOrTerritory && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">State</label>
                <input {...register('state', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.state && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Zip Code</label>
                <input {...register('zipCode', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.zipCode && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Beneficial Owner Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-gray-700">Last Name or Entity&apos;s Legal Name</label>
                <input {...register('beneficialOwnerLastName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerLastName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">First Name</label>
                <input {...register('beneficialOwnerFirstName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerFirstName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Middle Name</label>
                <input {...register('beneficialOwnerMiddleName')} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerMiddleName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Suffix</label>
                <input {...register('beneficialOwnerSuffix')} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerSuffix && <p className="text-red-500">This field is required</p>}
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-700">Date of Birth</label>
                <input type="date" {...register('beneficialOwnerDOB', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerDOB && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Address</label>
                <input {...register('beneficialOwnerAddress', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerAddress && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">City</label>
                <input {...register('beneficialOwnerCity', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerCity && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Country/Jurisdiction</label>
                <input {...register('beneficialOwnerCountryJurisdiction', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerCountryJurisdiction && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">State</label>
                <input {...register('beneficialOwnerState', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerState && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Zip Code</label>
                <input {...register('beneficialOwnerZip', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerZip && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Beneficial Owner&apos;s Identification Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-gray-700">Identifying Document Type</label>
                <input {...register('identifyingDocumentType', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.identifyingDocumentType && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Identifying Document Number</label>
                <input {...register('identifyingDocumentNumber', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.identifyingDocumentNumber && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Identifying Document Issuing Jurisdiction</label>
                <input {...register('identifyingDocumentIssuingJurisdiction', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.identifyingDocumentIssuingJurisdiction && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Country/Jurisdiction</label>
                <input {...register('identifyingDocumentCountry', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.identifyingDocumentCountry && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Expiration Date</label>
                <input type="date" {...register('identifyingDocumentExpirationDate', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.identifyingDocumentExpirationDate && <p className="text-red-500">This field is required</p>}
              </div>
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6">
            <div className="flex items-center">
              <input type="checkbox" {...register('liabilityAcknowledgment')} className="mr-2" />
              <label className="font-bold text-gray-700">Liability Acknowledgment</label>
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6">
            <div className="flex flex-col">
              <label className="block mb-1 font-bold text-gray-700">Upload Document:</label>
              <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
          </section>

          <section className="border-t border-gray-300 pt-6 text-center">
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Submit
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default FinCen;
