"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"; // Import Button from Shadcn

export default function Requests() {
  const sentRequests = [
    { id: 1, to: "User3", book: "To Kill a Mockingbird", status: "Pending" },
    { id: 2, to: "User4", book: "The Catcher in the Rye", status: "Rejected" },
  ];

  const receivedRequests = [
    { id: 1, from: "User1", book: "1984", status: "Pending" },
    { id: 2, from: "User2", book: "The Great Gatsby", status: "Accepted" },
  ];

  const handleCancel = (requestId) => {
    // Logic to cancel the request
    console.log(`Request ${requestId} cancelled.`);
  };

  const handleAccept = (requestId) => {
    // Logic to accept the request
    console.log(`Request ${requestId} accepted.`);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Requests</h2>
      <Tabs defaultValue="received">
        <TabsList className="mb-4">
          <TabsTrigger value="received">Received Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>

        {/* Received Requests */}
        <TabsContent value="received">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {receivedRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle>{request.book}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>From: {request.from}</p>
                  <p>Status: {request.status}</p>
                  {request.status === "Pending" && (
                    <Button onClick={() => handleAccept(request.id)} className="mt-4">
                      Accept
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sentRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle>{request.book}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>To: {request.to}</p>
                  <p>Status: {request.status}</p>
                  {request.status === "Pending" && (
                    <Button onClick={() => handleCancel(request.id)} className="mt-4" variant="destructive">
                      Cancel
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
