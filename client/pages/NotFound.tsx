import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-error" size={48} />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              The requested URL{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {location.pathname}
              </span>{" "}
              does not exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">Go Back</Button>
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90">
                  <Home size={18} className="mr-2" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
