import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FeedbackFormProps {
  articleTitle: string;
}

export const ArticleFeedbackForm: React.FC<FeedbackFormProps> = ({
  articleTitle,
}) => {
  const [helpfulFeedback, setHelpfulFeedback] = useState<boolean | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [showThankYouAlert, setShowThankYouAlert] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send this feedback to your backend
    console.log("Feedback submitted:", {
      articleTitle,
      helpful: helpfulFeedback,
      feedback: feedbackText,
    });

    // Reset form
    setShowFeedbackForm(false);
    setFeedbackText("");

    // Show thank you message
    setShowSuccessDialog(true);
  };

  return (
    <div className="mt-10 pt-6 border-t">
      <h3 className="font-medium text-lg mb-4">Was this article helpful?</h3>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button
          variant={helpfulFeedback === true ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setHelpfulFeedback(true);
            setShowFeedbackForm(true);
          }}
          className={
            helpfulFeedback === true
              ? "bg-green-600 hover:bg-green-700 border-green-600"
              : ""
          }>
          <ThumbsUp className="h-4 w-4 mr-2" />
          Yes, it helped
        </Button>

        <Button
          variant={helpfulFeedback === false ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setHelpfulFeedback(false);
            setShowFeedbackForm(true);
          }}
          className={
            helpfulFeedback === false
              ? "bg-red-600 hover:bg-red-700 border-red-600"
              : ""
          }>
          <ThumbsDown className="h-4 w-4 mr-2" />
          No, I need more help
        </Button>
      </div>

      {showFeedbackForm && (
        <form onSubmit={handleFeedbackSubmit} className="mt-6 animate-fadeIn">
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-2">
              Your feedback helps us improve our help content
            </label>
            <Textarea
              id="feedback"
              placeholder={
                helpfulFeedback
                  ? "What did you find most helpful?"
                  : "What information was missing or unclear?"
              }
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-[120px] resize-y w-full p-3 text-gray-800 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowFeedbackForm(false)}
              className="text-gray-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Submit Feedback
            </Button>
          </div>
        </form>
      )}

      {showThankYouAlert && (
        <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Thank you for your feedback!</AlertTitle>
          <AlertDescription>
            We appreciate you taking the time to help us improve our help
            content.
          </AlertDescription>
        </Alert>
      )}

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you for your feedback</AlertDialogTitle>
            <AlertDialogDescription>
              We appreciate you taking the time to share your thoughts. Your
              feedback helps us improve our help content for everyone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setShowSuccessDialog(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticleFeedbackForm;
