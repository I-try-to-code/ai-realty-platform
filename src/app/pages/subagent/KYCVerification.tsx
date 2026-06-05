import { useState } from "react";
import { Upload, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";

export function KYCVerification() {
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected">("pending");
  const [documents, setDocuments] = useState({
    idProof: null as string | null,
    license: null as string | null,
    addressProof: null as string | null,
  });

  const handleUpload = (type: keyof typeof documents) => {
    setDocuments({
      ...documents,
      [type]: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
          <p className="text-gray-600 mt-1">Complete your verification to start listing properties</p>
        </div>

        {/* Status Card */}
        <Card>
          <div className="flex items-start space-x-4">
            <div className={`size-12 rounded-lg flex items-center justify-center ${
              verificationStatus === "verified" ? "bg-green-100" :
              verificationStatus === "rejected" ? "bg-red-100" :
              "bg-yellow-100"
            }`}>
              {verificationStatus === "verified" && <CheckCircle2 className="size-7 text-green-600" />}
              {verificationStatus === "rejected" && <AlertCircle className="size-7 text-red-600" />}
              {verificationStatus === "pending" && <Clock className="size-7 text-yellow-600" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">Verification Status</h2>
                <Badge
                  variant={
                    verificationStatus === "verified" ? "success" :
                    verificationStatus === "rejected" ? "danger" :
                    "warning"
                  }
                >
                  {verificationStatus === "verified" && "Verified"}
                  {verificationStatus === "rejected" && "Rejected"}
                  {verificationStatus === "pending" && "Pending Review"}
                </Badge>
              </div>
              <p className="text-gray-600">
                {verificationStatus === "verified" && "Your account has been verified. You can now list properties."}
                {verificationStatus === "rejected" && "Your verification was rejected. Please upload valid documents."}
                {verificationStatus === "pending" && "Your documents are under review. This usually takes 24-48 hours."}
              </p>
            </div>
          </div>
        </Card>

        {/* Progress Steps */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Verification Progress</h2>
          <div className="space-y-4">
            {[
              { step: "Personal Information", status: "completed" },
              { step: "Document Upload", status: documents.idProof && documents.license ? "completed" : "current" },
              { step: "Admin Review", status: verificationStatus === "verified" ? "completed" : "pending" },
              { step: "Approval", status: verificationStatus === "verified" ? "completed" : "pending" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`size-8 rounded-full flex items-center justify-center font-semibold ${
                  item.status === "completed" ? "bg-green-100 text-green-600" :
                  item.status === "current" ? "bg-blue-100 text-primary" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {item.status === "completed" ? <CheckCircle2 className="size-5" /> : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    item.status === "pending" ? "text-gray-500" : "text-gray-900"
                  }`}>
                    {item.step}
                  </p>
                </div>
                <Badge variant={
                  item.status === "completed" ? "success" :
                  item.status === "current" ? "info" :
                  "default"
                } size="sm">
                  {item.status === "completed" ? "Completed" :
                   item.status === "current" ? "In Progress" :
                   "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Document Upload */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Documents</h2>
          <div className="space-y-6">
            {/* ID Proof */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                Government ID Proof
                <span className="text-red-500 ml-1">*</span>
              </label>
              {documents.idProof ? (
                <div className="relative group">
                  <img
                    src={documents.idProof}
                    alt="ID Proof"
                    className="w-full h-40 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="size-12 text-white" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleUpload("idProof")}
                  className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                >
                  <Upload className="size-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload ID Proof</span>
                  <span className="text-xs text-gray-500 mt-1">Passport, Driver's License, or National ID</span>
                </button>
              )}
            </div>

            {/* Real Estate License */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                Real Estate License
                <span className="text-red-500 ml-1">*</span>
              </label>
              {documents.license ? (
                <div className="relative group">
                  <img
                    src={documents.license}
                    alt="License"
                    className="w-full h-40 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="size-12 text-white" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleUpload("license")}
                  className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                >
                  <FileText className="size-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload License</span>
                  <span className="text-xs text-gray-500 mt-1">Valid real estate agent license</span>
                </button>
              )}
            </div>

            {/* Address Proof */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                Address Proof
                <span className="text-gray-500 ml-1">(Optional)</span>
              </label>
              {documents.addressProof ? (
                <div className="relative group">
                  <img
                    src={documents.addressProof}
                    alt="Address Proof"
                    className="w-full h-40 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="size-12 text-white" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleUpload("addressProof")}
                  className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                >
                  <Upload className="size-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Upload Address Proof</span>
                  <span className="text-xs text-gray-500 mt-1">Utility bill or bank statement</span>
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            All documents will be reviewed by our admin team
          </p>
          <Button
            size="lg"
            variant="success"
            disabled={!documents.idProof || !documents.license}
          >
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
}
