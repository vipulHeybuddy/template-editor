import React, { useState, useEffect } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

// Azure Blob Storage Configuration
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-03-19T15:29:28Z&st=2025-03-19T07:29:28Z&spr=https,http&sig=f0Si4mPzumia6EyigU1ilagkKbgQR2OFesaJJZYuPec%3D";
const storageAccountName = "heybuddystorage";
const containerName = "images";

// Azure Storage utility functions
const uploadFileToBlobStorage = async (file) => {
  try {
    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
    
    const options = {
      blobHTTPHeaders: {
        blobContentType: file.type,
      },
    };
    
    const arrayBuffer = await file.arrayBuffer();
    await blockBlobClient.uploadData(arrayBuffer, options);
    
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading to Azure Blob Storage:", error);
    throw error;
  }
};

// HTML Template Generator
const generateEmailHtml = (templateData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateData.headline1} ${templateData.headline2}</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
    }
    .header {
      text-align: center;
      padding: 20px;
    }
    .section {
      margin-bottom: 30px;
    }
    .text-center {
      text-align: center;
    }
    .btn {
      background-color: #3182ce;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 30px;
      font-weight: bold;
      display: inline-block;
      margin: 10px 0;
    }
    .text-blue {
      color: #3182ce;
    }
    .benefits-grid {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin: 20px 0;
    }
    .benefit-cell {
      display: table-cell;
      text-align: center;
      padding: 10px;
      width: 25%;
    }
    .benefit-icon {
      width: 50px;
      height: 50px;
      background-color: #e6f0ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 10px;
      color: #3182ce;
    }
    .services-grid {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin: 20px 0;
    }
    .service-cell {
      display: table-cell;
      text-align: center;
      padding: 10px;
      width: 50%;
    }
    .service-img {
      width: 100%;
      max-width: 250px;
      height: auto;
      margin-bottom: 10px;
    }
    .social-container {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin: 20px 0;
    }
    .social-icon {
      display: table-cell;
      text-align: center;
    }
    .social-circle {
      width: 24px;
      height: 24px;
      background-color: #e2e8f0;
      border-radius: 50%;
      display: inline-block;
    }
    .headline {
      font-size: 28px;
      font-weight: bold;
      margin: 5px 0;
    }
    .subheadline {
      font-size: 16px;
      margin: 10px 0;
    }
    .impact-text {
      font-size: 24px;
      font-weight: bold;
      margin: 5px 0;
    }
    img {
      max-width: 100%;
    }
    .image-placeholder {
      background-color: #e2e8f0;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #718096;
      font-size: 14px;
    }
    .service-placeholder {
      background-color: #e2e8f0;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #718096;
      font-size: 14px;
    }
    @media only screen and (max-width: 480px) {
      .benefits-grid, .services-grid {
        display: block;
      }
      .benefit-cell, .service-cell {
        display: block;
        width: 100%;
        margin-bottom: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="headline">
        <span>${templateData.headline1}</span> <span class="text-blue">BRAND</span>
      </h1>
      <h1 class="headline">${templateData.headline2}</h1>
      <p class="subheadline">${templateData.subheadline}</p>
      
      <a href="#" class="btn">
        ${templateData.ctaButton}
      </a>
    </div>
    
    <div class="section">
      ${templateData.headerImage ? 
        `<img src="${templateData.headerImage}" alt="Header Image" style="width: 100%; height: auto;">` : 
        `<div class="image-placeholder">
          <p>Image Placeholder</p>
        </div>`
      }
    </div>
    
    <div class="section text-center">
      <h2>${templateData.whatWeDo}</h2>
      <p>${templateData.description}</p>
    </div>
    
    <div class="section">
      <div class="benefits-grid">
        <div class="benefit-cell">
          <div class="benefit-icon">icon</div>
          <p style="font-weight: bold; font-size: 12px;">${templateData.benefit1}</p>
        </div>
        <div class="benefit-cell">
          <div class="benefit-icon">icon</div>
          <p style="font-weight: bold; font-size: 12px;">${templateData.benefit2}</p>
        </div>
        <div class="benefit-cell">
          <div class="benefit-icon">icon</div>
          <p style="font-weight: bold; font-size: 12px;">${templateData.benefit3}</p>
        </div>
        <div class="benefit-cell">
          <div class="benefit-icon">icon</div>
          <p style="font-weight: bold; font-size: 12px;">${templateData.benefit4}</p>
        </div>
      </div>
    </div>
    
    <div class="section text-center">
      <h2 class="impact-text">${templateData.impactHeadline1}</h2>
      <h2 class="impact-text">${templateData.impactHeadline2}</h2>
      <p class="impact-text text-blue">${templateData.impactHighlight}</p>
    </div>
    
    <div class="section">
      <div class="services-grid">
        <div class="service-cell">
          ${templateData.service1Image ? 
            `<img src="${templateData.service1Image}" alt="Service 1" class="service-img">` : 
            `<div class="service-placeholder">
              <p>Image Placeholder</p>
            </div>`
          }
          <p>${templateData.service1}</p>
        </div>
        <div class="service-cell">
          ${templateData.service2Image ? 
            `<img src="${templateData.service2Image}" alt="Service 2" class="service-img">` : 
            `<div class="service-placeholder">
              <p>Image Placeholder</p>
            </div>`
          }
          <p>${templateData.service2}</p>
        </div>
      </div>
    </div>
    
    <div class="section text-center">
      <h2 class="impact-text">${templateData.closingCta1}</h2>
      <h2 class="headline">
        <span>CGI</span> <span class="text-blue">AD</span>
      </h2>
      
      <a href="#" class="btn">
        ${templateData.contactButton}
      </a>
      
      <p style="margin-top: 20px;">
        ${templateData.contactText}
        <br>
        <a href="mailto:${templateData.emailAddress}" class="text-blue" style="text-decoration: none;">
          ${templateData.emailAddress}
        </a>
      </p>
      
      <div class="social-container">
        <div class="social-icon"><div class="social-circle"></div></div>
        <div class="social-icon"><div class="social-circle"></div></div>
        <div class="social-icon"><div class="social-circle"></div></div>
        <div class="social-icon"><div class="social-circle"></div></div>
      </div>
    </div>
  </div>
</body>
</html>`;
};

const downloadHtmlTemplate = (templateData, filename = "email-template.html") => {
  const html = generateEmailHtml(templateData);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return html;
};

// Main EmailTemplateEditor component
const EmailTemplateEditor = () => {
  const [template, setTemplate] = useState({
    headline1: "YOUR BRAND",
    headline2: "DESERVES MORE",
    subheadline: "THAN JUST ANOTHER AD",
    ctaButton: "PORTFOLIO",
    whatWeDo: "WHAT WE DO?",
    description: "Heybuddy specializes in cutting-edge digital solutions, offering services such as game development, CGI and 3D billboard ads.",
    benefit1: "INCREASE BRAND RECALL",
    benefit2: "INCREASE IN SALES",
    benefit3: "INCREASE IN REACH",
    benefit4: "INCREASE ENGAGEMENT",
    impactHeadline1: "WE CREATE HIGH-IMPACT 3D CGI ADS",
    impactHeadline2: "THAT MAKE YOUR BRAND",
    impactHighlight: "UNFORGETTABLE.",
    service1: "3D MODELING",
    service2: "3D ANIMATION",
    closingCta1: "LET'S MAKE YOUR FIRST",
    closingCta2: "CGI AD",
    contactButton: "CONTACT NOW",
    contactText: "OR VISIT",
    emailAddress: "info@heybuddy.co.in",
    // Added image fields
    headerImage: "",
    service1Image: "",
    service2Image: ""
  });
  
  const [loading, setLoading] = useState({
    headerImage: false,
    service1Image: false,
    service2Image: false
  });

  const handleChange = (field, value) => {
    setTemplate({
      ...template,
      [field]: value
    });
  };
  
  const handleImageUpload = async (e, imageField) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(prev => ({
      ...prev,
      [imageField]: true
    }));
    
    try {
      const imageUrl = await uploadFileToBlobStorage(file);
      handleChange(imageField, imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(prev => ({
        ...prev,
        [imageField]: false
      }));
    }
  };
  
  const handleExport = () => {
    downloadHtmlTemplate(template);
  };
  
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Editor Panel */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 overflow-y-auto h-screen">
        <h2 className="text-xl font-bold mb-4">Email Template Editor</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">Header Section</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">Headline 1</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.headline1}
                onChange={(e) => handleChange('headline1', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Headline 2</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.headline2}
                onChange={(e) => handleChange('headline2', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Subheadline</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.subheadline}
                onChange={(e) => handleChange('subheadline', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">CTA Button</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.ctaButton}
                onChange={(e) => handleChange('ctaButton', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Header Image</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'headerImage')}
                disabled={loading.headerImage}
              />
              {loading.headerImage && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.headerImage && (
                <div className="mt-1 relative">
                  <img 
                    src={template.headerImage} 
                    alt="Header preview" 
                    className="w-full h-20 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleChange('headerImage', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Services Section</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">What We Do Heading</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.whatWeDo}
                onChange={(e) => handleChange('whatWeDo', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea 
                className="w-full p-2 border rounded" 
                value={template.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="3"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Benefits</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">Benefit 1</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.benefit1}
                onChange={(e) => handleChange('benefit1', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Benefit 2</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.benefit2}
                onChange={(e) => handleChange('benefit2', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Benefit 3</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.benefit3}
                onChange={(e) => handleChange('benefit3', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Benefit 4</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.benefit4}
                onChange={(e) => handleChange('benefit4', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Impact Section</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">Impact Line 1</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.impactHeadline1}
                onChange={(e) => handleChange('impactHeadline1', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Impact Line 2</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.impactHeadline2}
                onChange={(e) => handleChange('impactHeadline2', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Impact Highlight</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.impactHighlight}
                onChange={(e) => handleChange('impactHighlight', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Services</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">Service 1</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.service1}
                onChange={(e) => handleChange('service1', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Service 1 Image</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'service1Image')}
                disabled={loading.service1Image}
              />
              {loading.service1Image && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.service1Image && (
                <div className="mt-1 relative">
                  <img 
                    src={template.service1Image} 
                    alt="Service 1 preview" 
                    className="w-full h-20 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleChange('service1Image', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Service 2</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.service2}
                onChange={(e) => handleChange('service2', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Service 2 Image</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'service2Image')}
                disabled={loading.service2Image}
              />
              {loading.service2Image && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.service2Image && (
                <div className="mt-1 relative">
                  <img 
                    src={template.service2Image} 
                    alt="Service 2 preview" 
                    className="w-full h-20 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleChange('service2Image', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Call to Action</h3>
            <div className="mb-2">
              <label className="block text-sm mb-1">CTA Line 1</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.closingCta1}
                onChange={(e) => handleChange('closingCta1', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">CTA Line 2</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.closingCta2}
                onChange={(e) => handleChange('closingCta2', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Contact Button</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.contactButton}
                onChange={(e) => handleChange('contactButton', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Contact Text</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.contactText}
                onChange={(e) => handleChange('contactText', e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Email Address</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.emailAddress}
                onChange={(e) => handleChange('emailAddress', e.target.value)}
              />
            </div>
          </div>
          
          <button 
            className="w-full p-3 bg-blue-500 text-white rounded font-bold"
            onClick={handleExport}
          >
            Export Template
          </button>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="w-full md:w-2/3 bg-white overflow-y-auto h-screen">
        <div className="max-w-2xl mx-auto my-8 border border-gray-200 shadow-lg">
          {/* Template Preview */}
          <div className="bg-white p-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold">
                <span className="text-black">{template.headline1}</span> <span className="text-blue-500">BRAND</span>
              </h1>
              <h1 className="text-4xl font-bold my-2">{template.headline2}</h1>
              <p className="text-lg mt-2">{template.subheadline}</p>
              
              <button className="bg-blue-500 text-white rounded-full px-6 py-2 mt-4">
                {template.ctaButton}
              </button>
            </div>
            
            <div className="my-8">
              {template.headerImage ? (
                <img 
                  src={template.headerImage} 
                  alt="Header" 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <p className="text-sm text-gray-600">Image Placeholder</p>
                </div>
              )}
            </div>
            
            <div className="text-center my-8">
              <h2 className="text-2xl font-bold mb-4">{template.whatWeDo}</h2>
              <p className="text-center">{template.description}</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 my-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500">icon</span>
                  </div>
                </div>
                <p className="text-xs font-bold">{template.benefit1}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500">icon</span>
                  </div>
                </div>
                <p className="text-xs font-bold">{template.benefit2}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500">icon</span>
                  </div>
                </div>
                <p className="text-xs font-bold">{template.benefit3}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500">icon</span>
                  </div>
                </div>
                <p className="text-xs font-bold">{template.benefit4}</p>
              </div>
            </div>
            
            <div className="text-center my-8">
              <h2 className="text-2xl font-bold">{template.impactHeadline1}</h2>
              <h2 className="text-2xl font-bold mb-2">{template.impactHeadline2}</h2>
              <p className="text-2xl font-bold text-blue-500">{template.impactHighlight}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-8">
              <div>
                {template.service1Image ? (
                  <img 
                    src={template.service1Image} 
                    alt="Service 1" 
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <p className="text-sm text-gray-600">Image Placeholder</p>
                  </div>
                )}
                <p className="text-center mt-2">{template.service1}</p>
              </div>
              <div>
                {template.service2Image ? (
                  <img 
                    src={template.service2Image} 
                    alt="Service 2" 
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <p className="text-sm text-gray-600">Image Placeholder</p>
                  </div>
                )}
                <p className="text-center mt-2">{template.service2}</p>
              </div>
            </div>
            
            <div className="text-center my-8">
              <h2 className="text-2xl font-bold">{template.closingCta1}</h2>
              <h2 className="text-4xl font-bold">
                <span className="text-black">CGI</span> <span className="text-blue-500">AD</span>
              </h2>
              
              <button className="bg-blue-500 text-white rounded-full px-6 py-2 mt-4">
                {template.contactButton}
              </button>
              
              <p className="mt-4">
                {template.contactText}
                <br />
                <a href={`mailto:${template.emailAddress}`} className="text-blue-500">
                  {template.emailAddress}
                </a>
              </p>
              
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <EmailTemplateEditor />
    </div>
  );
}

export default App;