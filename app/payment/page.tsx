"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function PaymentPage() {
  const [amount, setAmount] = useState("149");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handlePaymentVerification = async () => {
    setIsLoading(true);
    setMessage({ type: null, text: "" });

    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number.parseFloat(amount) }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text:
            data.message ||
            "Payment verified successfully! Thank you for your support.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Payment verification failed. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Add money to your account
              </CardTitle>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full mx-auto"></div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Payment Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg font-semibold border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                    min="100"
                  />
                </div>
              </div>

              {/* QR Code Section */}
              <div className="text-center space-y-4">
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-purple-200 mx-auto w-fit">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=180&width=180"
                      alt="UPI QR Code for Mental Saathi Payment"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="font-medium">Instructions:</span> Scan the QR
                  code using any UPI app to make your payment of ₹{amount}
                </p>
              </div>

              {/* Message Display */}
              {message.type && (
                <Alert
                  className={`${
                    message.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription className="font-medium">
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                onClick={handlePaymentVerification}
                disabled={isLoading || !amount}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  "I've Paid"
                )}
              </Button>

              {/* Footer Message */}
              <div className="text-center pt-4 border-t border-purple-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="text-purple-600 font-medium">💜</span> Every
                  contribution helps us support someone's mental wellness
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
