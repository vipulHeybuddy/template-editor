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

// HTML Template Generator - Updated for email compatibility
const generateEmailHtml = (templateData) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${templateData.headline1} ${templateData.headline2}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="border: 0; width: 100%;">
    <tr>
      <td style="padding: 0;">
        <table align="center" role="presentation" cellpadding="0" cellspacing="0" style="border: 0; max-width: 600px; width: 100%;">
          <!-- Header Section -->
          <tr>
            <td align="center" style="padding: 20px;">
              <h1 style="font-size: 28px; font-weight: bold; margin: 5px 0;">
                <span>${templateData.headline1}</span> <span style="color: #3182ce;">BRAND</span>
              </h1>
              <h1 style="font-size: 28px; font-weight: bold; margin: 5px 0;">${templateData.headline2}</h1>
              <p style="font-size: 16px; margin: 10px 0;">${templateData.subheadline}</p>
              
              <div>
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${templateData.ctaButtonLink || '#'}" style="height:40px;v-text-anchor:middle;width:150px;" arcsize="50%" stroke="f" fillcolor="#3182ce">
                  <w:anchorlock/>
                  <center>
                <![endif]-->
                <a href="${templateData.ctaButtonLink || '#'}" style="background-color: #3182ce; border-radius: 30px; color: white; display: inline-block; font-family: sans-serif; font-size: 16px; font-weight: bold; line-height: 40px; text-align: center; text-decoration: none; width: 150px; -webkit-text-size-adjust: none;">${templateData.ctaButton}</a>
                <!--[if mso]>
                  </center>
                </v:roundrect>
                <![endif]-->
              </div>
            </td>
          </tr>
          
          <!-- Header Image -->
          <tr>
            <td style="padding: 0;">
              ${templateData.headerImage ? 
                `<img src="${templateData.headerImage}" alt="Header Image" style="width: 100%; height: auto; border: 0; display: block;" />` : 
                `<div style="background-color: #e2e8f0; height: 200px; display: block; text-align: center;">
                  <p style="margin: 0; padding-top: 90px; color: #718096; font-size: 14px;">Image Placeholder</p>
                </div>`
              }
            </td>
          </tr>
          
          <!-- What We Do Section -->
          <tr>
            <td align="center" style="padding: 20px;">
              <h2 style="margin: 10px 0;">${templateData.whatWeDo}</h2>
              <p style="margin: 10px 0;">${templateData.description}</p>
            </td>
          </tr>
          
          <!-- Benefits Section -->
          <tr>
            <td style="padding: 0 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <!-- Benefit 1 -->
                  <td align="center" style="padding: 10px; width: 25%; vertical-align: top;">
                    <div style="margin-bottom: 10px;">
                      ${templateData.benefit1Icon ? 
                        `<img src="${templateData.benefit1Icon}" alt="Benefit 1 icon" style="width: 50px; height: 50px; border: 0; display: block; margin: 0 auto;" />` : 
                        `<div style="width: 50px; height: 50px; background-color: #e6f0ff; border-radius: 50%; color: #3182ce; text-align: center; line-height: 50px; margin: 0 auto;">icon</div>`
                      }
                    </div>
                    <p style="font-weight: bold; font-size: 12px; margin: 5px 0;">${templateData.benefit1}</p>
                  </td>
                  
                  <!-- Benefit 2 -->
                  <td align="center" style="padding: 10px; width: 25%; vertical-align: top;">
                    <div style="margin-bottom: 10px;">
                      ${templateData.benefit2Icon ? 
                        `<img src="${templateData.benefit2Icon}" alt="Benefit 2 icon" style="width: 50px; height: 50px; border: 0; display: block; margin: 0 auto;" />` : 
                        `<div style="width: 50px; height: 50px; background-color: #e6f0ff; border-radius: 50%; color: #3182ce; text-align: center; line-height: 50px; margin: 0 auto;">icon</div>`
                      }
                    </div>
                    <p style="font-weight: bold; font-size: 12px; margin: 5px 0;">${templateData.benefit2}</p>
                  </td>
                  
                  <!-- Benefit 3 -->
                  <td align="center" style="padding: 10px; width: 25%; vertical-align: top;">
                    <div style="margin-bottom: 10px;">
                      ${templateData.benefit3Icon ? 
                        `<img src="${templateData.benefit3Icon}" alt="Benefit 3 icon" style="width: 50px; height: 50px; border: 0; display: block; margin: 0 auto;" />` : 
                        `<div style="width: 50px; height: 50px; background-color: #e6f0ff; border-radius: 50%; color: #3182ce; text-align: center; line-height: 50px; margin: 0 auto;">icon</div>`
                      }
                    </div>
                    <p style="font-weight: bold; font-size: 12px; margin: 5px 0;">${templateData.benefit3}</p>
                  </td>
                  
                  <!-- Benefit 4 -->
                  <td align="center" style="padding: 10px; width: 25%; vertical-align: top;">
                    <div style="margin-bottom: 10px;">
                      ${templateData.benefit4Icon ? 
                        `<img src="${templateData.benefit4Icon}" alt="Benefit 4 icon" style="width: 50px; height: 50px; border: 0; display: block; margin: 0 auto;" />` : 
                        `<div style="width: 50px; height: 50px; background-color: #e6f0ff; border-radius: 50%; color: #3182ce; text-align: center; line-height: 50px; margin: 0 auto;">icon</div>`
                      }
                    </div>
                    <p style="font-weight: bold; font-size: 12px; margin: 5px 0;">${templateData.benefit4}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Impact Section -->
          <tr>
            <td align="center" style="padding: 20px;">
              <h2 style="font-size: 24px; font-weight: bold; margin: 5px 0;">${templateData.impactHeadline1}</h2>
              <h2 style="font-size: 24px; font-weight: bold; margin: 5px 0;">${templateData.impactHeadline2}</h2>
              <p style="font-size: 24px; font-weight: bold; margin: 5px 0; color: #3182ce;">${templateData.impactHighlight}</p>
            </td>
          </tr>
          
          <!-- Services Section -->
          <tr>
            <td style="padding: 0 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <!-- Service 1 -->
                  <td align="center" style="padding: 10px; width: 50%; vertical-align: top;">
                    ${templateData.service1Image ? 
                      `<img src="${templateData.service1Image}" alt="Service 1" style="width: 100%; max-width: 250px; height: auto; border: 0; display: block; margin: 0 auto 10px;" />` : 
                      `<div style="background-color: #e2e8f0; height: 160px; text-align: center; margin-bottom: 10px;">
                        <p style="margin: 0; padding-top: 70px; color: #718096; font-size: 14px;">Image Placeholder</p>
                      </div>`
                    }
                    <p style="margin: 10px 0;">${templateData.service1}</p>
                  </td>
                  
                  <!-- Service 2 -->
                  <td align="center" style="padding: 10px; width: 50%; vertical-align: top;">
                    ${templateData.service2Image ? 
                      `<img src="${templateData.service2Image}" alt="Service 2" style="width: 100%; max-width: 250px; height: auto; border: 0; display: block; margin: 0 auto 10px;" />` : 
                      `<div style="background-color: #e2e8f0; height: 160px; text-align: center; margin-bottom: 10px;">
                        <p style="margin: 0; padding-top: 70px; color: #718096; font-size: 14px;">Image Placeholder</p>
                      </div>`
                    }
                    <p style="margin: 10px 0;">${templateData.service2}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Call to Action Section -->
          <tr>
            <td align="center" style="padding: 20px;">
              <h2 style="font-size: 24px; font-weight: bold; margin: 5px 0;">${templateData.closingCta1}</h2>
              <h1 style="font-size: 28px; font-weight: bold; margin: 5px 0;">
                <span>CGI</span> <span style="color: #3182ce;">AD</span>
              </h1>
              
              <div>
                <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${templateData.contactButtonLink || '#'}" style="height:40px;v-text-anchor:middle;width:150px;" arcsize="50%" stroke="f" fillcolor="#3182ce">
                  <w:anchorlock/>
                  <center>
                <![endif]-->
                <a href="${templateData.contactButtonLink || '#'}" style="background-color: #3182ce; border-radius: 30px; color: white; display: inline-block; font-family: sans-serif; font-size: 16px; font-weight: bold; line-height: 40px; text-align: center; text-decoration: none; width: 150px; -webkit-text-size-adjust: none;">${templateData.contactButton}</a>
                <!--[if mso]>
                  </center>
                </v:roundrect>
                <![endif]-->
              </div>
              
              <p style="margin-top: 20px;">
                ${templateData.contactText}
                <br />
                <a href="mailto:${templateData.emailAddress}" style="color: #3182ce; text-decoration: none;">
                  ${templateData.emailAddress}
                </a>
              </p>
              
              <!-- Social Icons -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 200px; margin: 20px auto;">
                <tr>
                  <!-- X/Twitter -->
                  <td align="center" style="padding: 0 5px;">
                    <a href="${templateData.twitterLink || '#'}" target="_blank" style="text-decoration: none;">
                      ${templateData.twitterIcon ? 
                        `<img src="${templateData.twitterIcon}" alt="Twitter" style="width: 24px; height: 24px; border: 0;" />` : 
                        `<div style="width: 24px; height: 24px; background-color: #e2e8f0; border-radius: 50%; margin: 0 auto;"></div>`
                      }
                    </a>
                  </td>
                  
                  <!-- LinkedIn -->
                  <td align="center" style="padding: 0 5px;">
                    <a href="${templateData.linkedinLink || '#'}" target="_blank" style="text-decoration: none;">
                      ${templateData.linkedinIcon ? 
                        `<img src="${templateData.linkedinIcon}" alt="LinkedIn" style="width: 24px; height: 24px; border: 0;" />` : 
                        `<div style="width: 24px; height: 24px; background-color: #e2e8f0; border-radius: 50%; margin: 0 auto;"></div>`
                      }
                    </a>
                  </td>
                  
                  <!-- Facebook -->
                  <td align="center" style="padding: 0 5px;">
                    <a href="${templateData.facebookLink || '#'}" target="_blank" style="text-decoration: none;">
                      ${templateData.facebookIcon ? 
                        `<img src="${templateData.facebookIcon}" alt="Facebook" style="width: 24px; height: 24px; border: 0;" />` : 
                        `<div style="width: 24px; height: 24px; background-color: #e2e8f0; border-radius: 50%; margin: 0 auto;"></div>`
                      }
                    </a>
                  </td>
                  
                  <!-- Instagram -->
                  <td align="center" style="padding: 0 5px;">
                    <a href="${templateData.instagramLink || '#'}" target="_blank" style="text-decoration: none;">
                      ${templateData.instagramIcon ? 
                        `<img src="${templateData.instagramIcon}" alt="Instagram" style="width: 24px; height: 24px; border: 0;" />` : 
                        `<div style="width: 24px; height: 24px; background-color: #e2e8f0; border-radius: 50%; margin: 0 auto;"></div>`
                      }
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
    ctaButtonLink: "https://example.com/portfolio", // New field
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
    contactButtonLink: "https://example.com/contact", // New field
    contactText: "OR VISIT",
    emailAddress: "info@heybuddy.co.in",
    // Social media links
    twitterLink: "https://twitter.com/heybuddy",
    linkedinLink: "https://linkedin.com/company/heybuddy",
    facebookLink: "https://facebook.com/heybuddy",
    instagramLink: "https://instagram.com/heybuddy",
    // Image fields
    headerImage: "",
    service1Image: "",
    service2Image: "",
    // Benefit icon fields
    benefit1Icon: "",
    benefit2Icon: "",
    benefit3Icon: "",
    benefit4Icon: "",
    // Social icon fields
    twitterIcon: "",
    linkedinIcon: "",
    facebookIcon: "",
    instagramIcon: ""
  });
  
  const [loading, setLoading] = useState({
    headerImage: false,
    service1Image: false,
    service2Image: false,
    benefit1Icon: false,
    benefit2Icon: false,
    benefit3Icon: false,
    benefit4Icon: false,
    twitterIcon: false,
    linkedinIcon: false,
    facebookIcon: false,
    instagramIcon: false
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
              <label className="block text-sm mb-1">CTA Button Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.ctaButtonLink}
                onChange={(e) => handleChange('ctaButtonLink', e.target.value)}
                placeholder="https://example.com"
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
              <label className="block text-sm mb-1">Benefit 1 Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'benefit1Icon')}
                disabled={loading.benefit1Icon}
              />
              {loading.benefit1Icon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.benefit1Icon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.benefit1Icon} 
                    alt="Benefit 1 icon preview" 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => handleChange('benefit1Icon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
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
              <label className="block text-sm mb-1">Benefit 2 Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'benefit2Icon')}
                disabled={loading.benefit2Icon}
              />
              {loading.benefit2Icon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.benefit2Icon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.benefit2Icon} 
                    alt="Benefit 2 icon preview" 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => handleChange('benefit2Icon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
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
              <label className="block text-sm mb-1">Benefit 3 Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'benefit3Icon')}
                disabled={loading.benefit3Icon}
              />
              {loading.benefit3Icon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.benefit3Icon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.benefit3Icon} 
                    alt="Benefit 3 icon preview" 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => handleChange('benefit3Icon', '')}
                  >
                    ×
                  </button>
               </div>
              )}
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
            <div className="mb-2">
              <label className="block text-sm mb-1">Benefit 4 Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'benefit4Icon')}
                disabled={loading.benefit4Icon}
              />
              {loading.benefit4Icon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.benefit4Icon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.benefit4Icon} 
                    alt="Benefit 4 icon preview" 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => handleChange('benefit4Icon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
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
              <label className="block text-sm mb-1">Contact Button Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.contactButtonLink}
                onChange={(e) => handleChange('contactButtonLink', e.target.value)}
                placeholder="https://example.com/contact"
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
          
          <div>
            <h3 className="font-bold">Social Media</h3>
            
            <div className="mb-2">
              <label className="block text-sm mb-1">Twitter/X Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.twitterLink}
                onChange={(e) => handleChange('twitterLink', e.target.value)}
                placeholder="https://twitter.com/yourbrand"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Twitter/X Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'twitterIcon')}
                disabled={loading.twitterIcon}
              />
              {loading.twitterIcon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.twitterIcon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.twitterIcon} 
                    alt="Twitter icon preview" 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    onClick={() => handleChange('twitterIcon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <label className="block text-sm mb-1">LinkedIn Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.linkedinLink}
                onChange={(e) => handleChange('linkedinLink', e.target.value)}
                placeholder="https://linkedin.com/company/yourbrand"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">LinkedIn Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'linkedinIcon')}
                disabled={loading.linkedinIcon}
              />
              {loading.linkedinIcon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.linkedinIcon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.linkedinIcon} 
                    alt="LinkedIn icon preview" 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    onClick={() => handleChange('linkedinIcon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <label className="block text-sm mb-1">Facebook Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.facebookLink}
                onChange={(e) => handleChange('facebookLink', e.target.value)}
                placeholder="https://facebook.com/yourbrand"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Facebook Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'facebookIcon')}
                disabled={loading.facebookIcon}
              />
              {loading.facebookIcon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.facebookIcon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.facebookIcon} 
                    alt="Facebook icon preview" 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    onClick={() => handleChange('facebookIcon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <label className="block text-sm mb-1">Instagram Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded" 
                value={template.instagramLink}
                onChange={(e) => handleChange('instagramLink', e.target.value)}
                placeholder="https://instagram.com/yourbrand"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm mb-1">Instagram Icon</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border rounded" 
                onChange={(e) => handleImageUpload(e, 'instagramIcon')}
                disabled={loading.instagramIcon}
              />
              {loading.instagramIcon && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
              {template.instagramIcon && (
                <div className="mt-1 relative">
                  <img 
                    src={template.instagramIcon} 
                    alt="Instagram icon preview" 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    onClick={() => handleChange('instagramIcon', '')}
                  >
                    ×
                  </button>
                </div>
              )}
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
              
              <a 
                href={template.ctaButtonLink || "#"} 
                className="bg-blue-500 text-white rounded-full px-6 py-2 mt-4 inline-block"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {template.ctaButton}
              </a>
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
                  {template.benefit1Icon ? (
                    <img 
                      src={template.benefit1Icon} 
                      alt="Benefit 1" 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500">icon</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-bold">{template.benefit1}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {template.benefit2Icon ? (
                    <img 
                      src={template.benefit2Icon} 
                      alt="Benefit 2" 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500">icon</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-bold">{template.benefit2}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {template.benefit3Icon ? (
                    <img 
                      src={template.benefit3Icon} 
                      alt="Benefit 3" 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500">icon</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-bold">{template.benefit3}</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {template.benefit4Icon ? (
                    <img 
                      src={template.benefit4Icon} 
                      alt="Benefit 4" 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500">icon</span>
                    </div>
                  )}
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
              
              <a 
                href={template.contactButtonLink || "#"} 
                className="bg-blue-500 text-white rounded-full px-6 py-2 mt-4 inline-block"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {template.contactButton}
              </a>
              
              <p className="mt-4">
                {template.contactText}
                <br />
                <a href={`mailto:${template.emailAddress}`} className="text-blue-500">
                  {template.emailAddress}
                </a>
              </p>
              
              <div className="flex justify-center space-x-4 mt-4">
                <a 
                  href={template.twitterLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {template.twitterIcon ? (
                    <img 
                      src={template.twitterIcon} 
                      alt="Twitter" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                </a>
                <a 
                  href={template.linkedinLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {template.linkedinIcon ? (
                    <img 
                      src={template.linkedinIcon} 
                      alt="LinkedIn" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                </a>
                <a 
                  href={template.facebookLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {template.facebookIcon ? (
                    <img 
                      src={template.facebookIcon} 
                      alt="Facebook" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                </a>
                <a 
                  href={template.instagramLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {template.instagramIcon ? (
                    <img 
                      src={template.instagramIcon} 
                      alt="Instagram" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                </a>
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
