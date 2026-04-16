import { useState } from 'react';
import { Send, Check, Upload, Briefcase, MapPin, DollarSign } from 'lucide-react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { seoConfig } from '../components/SEO';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  currentCompany: string;
  expectedSalary: string;
  portfolioLink: string;
  linkedinUrl: string;
  education: string;
  skills: string;
  whyJoinUs: string;
  resume: File | null;
  coverLetter: File | null;
}

export default function CareersPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    portfolioLink: '',
    linkedinUrl: '',
    education: '',
    skills: '',
    whyJoinUs: '',
    resume: null,
    coverLetter: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    // File size validation (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > MAX_SIZE) {
      throw new Error(`File size is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Maximum allowed size is 5MB.`);
    }

    // File type validation (PDF, DOC, DOCX only)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed.");
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "upload_resume");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvsjc2s2t/raw/upload",
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Upload failed. Please try again.");
      }

      const data = await response.json();
      console.log("Cloudinary full response:", data);
      
      // Try different URL fields that Cloudinary might return
      const fileUrl = data.secure_url || data.url || data.public_id;
      console.log("File URL found:", fileUrl);
      
      if (!fileUrl) {
        throw new Error("Upload completed but no URL returned. Response: " + JSON.stringify(data));
      }

      // For raw files, construct proper URL if needed
      let finalUrl = fileUrl;
      if (data.resource_type === 'raw' && data.public_id) {
        finalUrl = `https://res.cloudinary.com/dvsjc2s2t/raw/upload/${data.public_id}`;
        console.log("Constructed raw URL:", finalUrl);
      }

      return finalUrl;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error. Please check your internet connection.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resumeUrl = "";
      let coverUrl = "";

      // Upload Resume
      if (formData.resume) {
        console.log("Uploading resume...", formData.resume.name);
        resumeUrl = await uploadToCloudinary(formData.resume);
        console.log("Resume uploaded:", resumeUrl);
      }

      // Upload Cover Letter
      if (formData.coverLetter) {
        console.log("Uploading cover letter...", formData.coverLetter.name);
        coverUrl = await uploadToCloudinary(formData.coverLetter);
        console.log("Cover letter uploaded:", coverUrl);
      }

      const form = new FormData();

      // Append normal fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value === "string") {
          form.append(key, value);
        }
      });

      // Append file URLs instead of files
      form.append("resume_link", resumeUrl);
      form.append("cover_letter_link", coverUrl);

      console.log("Submitting to Formspree...", { resumeUrl, coverUrl });

      // Send to Formspree
      const response = await fetch("https://formspree.io/f/mkokodbw", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error("Formspree error:", errorData);
        alert("Submission failed: " + (errorData.error || "Unknown error"));
      }

    } catch (error) {
      console.error("Submit error:", error);
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          <PageHero
            label="Careers"
            title="We're"
            highlight="#Hiring"
            description="Join our team and shape the future of technology"
            backgroundImage="hero-background/201.png"
          />
          
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for your interest in joining Echoes Software Technologies. We have received your application for the Marketing Executive position. Our HR team will review your application and get back to you within 3-5 business days.
              </p>
              <a 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all duration-300 rounded"
              >
                Back to Home
              </a>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO {...seoConfig.careers} canonical="/careers" />
      <div className="min-h-screen bg-white">
        <PageHero
          label="Careers"
          title="We're"
          highlight="#Hiring"
          description="Join our team and shape the future of technology"
          backgroundImage="hero-background/201.png"
        />

        {/* Job Listing */}
        <section className="py-12 md:py-16 bg-muted border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-2">
                    Marketing Executive
                  </h2>
                  <p className="text-muted-foreground">
                    Echoes Software Technologies • Karur, Tamil Nadu
                  </p>
                </div>
                <span className="inline-flex items-center self-start px-4 py-1.5 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-semibold tracking-wide uppercase rounded-md shadow-md">
                  Part-Time
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="break-words">Remote Job</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="break-words">Commission based</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="break-words">Freshers welcome</span>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-3">Job Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  We are looking for a dynamic and creative Marketing Executive to join our growing team at Echoes Software Technologies. The ideal candidate will be responsible for developing and executing marketing strategies to promote our software solutions and services.
                </p>
                
                <h3 className="font-semibold mb-3">Key Responsibilities</h3>
                <ul className="text-muted-foreground text-sm space-y-2 mb-4">
                  <li>• Develop and implement digital marketing campaigns across various platforms</li>
                  <li>• Manage social media accounts and create engaging content</li>
                  <li>• Conduct market research and analyze competitor activities</li>
                  <li>• Generate leads through various marketing channels</li>
                  <li>• Collaborate with the sales team to support business development</li>
                  <li>• Track and report on marketing metrics and campaign performance</li>
                </ul>

                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li>• Bachelor's degree in Marketing, Business, or related field</li>
                  <li>• Freshers can also apply - training will be provided</li>
                  <li>• Strong understanding of social media platforms and SEO</li>
                  <li>• Excellent written and verbal communication skills</li>
                  <li>• Creative thinking and problem-solving abilities</li>
                  <li>• Proficiency in marketing tools and analytics platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-10">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                    >
                      <option value="">Select experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current/Last Company
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Highest Education <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="education"
                      required
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                    >
                      <option value="">Select education</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="mba">MBA</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Links & Portfolio */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Links & Portfolio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Portfolio/Website Link
                    </label>
                    <input
                      type="url"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Skills & Expertise
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Key Skills (comma separated) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="skills"
                    required
                    rows={3}
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded resize-none"
                    placeholder="e.g., Digital Marketing, SEO, Social Media Management, Content Creation, Google Analytics..."
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Additional Information
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Why do you want to join Echoes Software? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="whyJoinUs"
                    required
                    rows={4}
                    value={formData.whyJoinUs}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-primary transition-colors rounded resize-none"
                    placeholder="Tell us about your motivation and why you'd be a great fit for our team..."
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Document Uploads
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Resume/CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'resume')}
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex items-center gap-2 px-4 py-3 border border-border bg-white rounded cursor-pointer hover:bg-muted transition-colors"
                      >
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate">
                          {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC)'}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cover Letter
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'coverLetter')}
                        className="hidden"
                        id="coverletter-upload"
                      />
                      <label
                        htmlFor="coverletter-upload"
                        className="flex items-center gap-2 px-4 py-3 border border-border bg-white rounded cursor-pointer hover:bg-muted transition-colors"
                      >
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground truncate">
                          {formData.coverLetter ? formData.coverLetter.name : 'Upload Cover Letter (Optional)'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  By submitting this application, you agree to our privacy policy and terms of service.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold hover:bg-primary transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
}
