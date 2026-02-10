import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <MainLayout userRole={userRole}>
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              {icon ? (
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="text-primary">{icon}</div>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <Zap className="text-gray-400" size={48} />
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {description}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-blue-700 leading-relaxed">
                This page is currently a placeholder. To view the actual content and features,
                please continue using the app or provide feedback to customize this section.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                Go Back
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <ChevronRight size={18} className="mr-2" />
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Placeholder;
