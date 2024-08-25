// components/Requests.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Requests() {
  const sentRequests = [
    { to: "User3", book: "To Kill a Mockingbird", status: "Pending" },
    { to: "User4", book: "The Catcher in the Rye", status: "Rejected" },
  ];

  const receivedRequests = [
    { from: "User1", book: "1984", status: "Pending" },
    { from: "User2", book: "The Great Gatsby", status: "Accepted" },
  ];

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
            {receivedRequests.map((request, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{request.book}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>From: {request.from}</p>
                  <p>Status: {request.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sentRequests.map((request, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{request.book}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>To: {request.to}</p>
                  <p>Status: {request.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
