"use client"; 

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import FinCenNavBar from './FinCenNavBar';

interface FinCenFormInputs {
  reportingCompanyLegalName: string;
  reportingCompanyAlternateName: string;
  taxIdentificationType: string;
  taxIdentificationNumber: string;
  countryJurisdiction: string;
  stateOfFormation: string;
  address: string;
  city: string;
  usOrTerritory: string;
  state: string;
  zipCode: string;
  beneficialOwnerLastName: string;
  beneficialOwnerFirstName: string;
  beneficialOwnerMiddleName: string;
  beneficialOwnerSuffix: string;
  beneficialOwnerDOB: string;
  beneficialOwnerAddress: string;
  beneficialOwnerCity: string;
  beneficialOwnerCountryJurisdiction: string;
  beneficialOwnerState: string;
  beneficialOwnerZip: string;
  identifyingDocumentType: string;
  identifyingDocumentNumber: string;
  identifyingDocumentIssuingJurisdiction: string;
  identifyingDocumentCountry: string;
  identifyingDocumentExpirationDate: string;
  liabilityAcknowledgment: boolean;
}

const FinCen: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FinCenFormInputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FinCenFormInputs> = (data) => {
    const requiredFields = [
      'reportingCompanyLegalName', 'reportingCompanyAlternateName', 'taxIdentificationType', 'taxIdentificationNumber',
      'countryJurisdiction', 'stateOfFormation', 'address', 'city', 'usOrTerritory', 'state', 'zipCode',
      'beneficialOwnerLastName', 'beneficialOwnerFirstName', 'beneficialOwnerMiddleName', 'beneficialOwnerSuffix',
      'beneficialOwnerDOB', 'beneficialOwnerAddress', 'beneficialOwnerCity', 'beneficialOwnerCountryJurisdiction',
      'beneficialOwnerState', 'beneficialOwnerZip', 'identifyingDocumentType', 'identifyingDocumentNumber',
      'identifyingDocumentIssuingJurisdiction', 'identifyingDocumentCountry', 'identifyingDocumentExpirationDate'
    ];

    const missingFields = requiredFields.filter(field => !data[field as keyof FinCenFormInputs]);

    if (missingFields.length > 0) {
      alert(`The following fields are missing: ${missingFields.join(', ')}`);
      return;
    }

    const emailData = {
      ...data,
      liabilityAcknowledgment: data.liabilityAcknowledgment ? 'Yes' : 'No'
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

  return (
    <div>
      <FinCenNavBar />
      <div className="p-5 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-24">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Beneficial Ownership Information Report Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section className="border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Reporting Company Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/** Reporting Company Fields */}
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
          
          {/** Current U.S. Address Fields */}
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
          
          {/** Beneficial Owner Information */}
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
                <input {...register('beneficialOwnerMiddleName', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
                {errors.beneficialOwnerMiddleName && <p className="text-red-500">This field is required</p>}
              </div>
              <div>
                <label className="block mb-1 font-bold text-gray-700">Suffix</label>
                <input {...register('beneficialOwnerSuffix', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
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
          
          {/** Beneficial Owner's Identification Info */}
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
          
          {/** Liability Acknowledgment */}
          <section className="border-t border-gray-300 pt-6">
            <div className="flex items-center">
              <input type="checkbox" {...register('liabilityAcknowledgment')} className="mr-2" />
              <label className="font-bold text-gray-700">Liability Acknowledgment</label>
            </div>
          </section>
          
          {/** Submit Button */}
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
