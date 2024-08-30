"use client";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setSentRequests, setReceivedRequests, updateSentRequestStatus, updateReceivedRequestStatus } from "@/utils/requestSlice";
import { toast } from "react-toastify";


export default function Request() {
  const [loading, setLoading] = useState(true);

  const sentRequests = useSelector((state) => state.requests?.sentRequests);
  const receivedRequests = useSelector((state) => state.requests?.receivedRequests);
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();

  // Memoized user to avoid recalculating from the state on every render
  const memoizedUser = useMemo(() => user, [user]);

  // Fetch sent and received requests from Supabase
  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("requests")
          .select(`
            id,
            from_user_id,
            to_user_id,
            book_id,
            status,
            from_user:from_user_id (id, name), 
            to_user:to_user_id (id, name),   
            book:book_id (id, title)       
          `);

        if (error) {
          console.error("Error fetching requests:", error);
          throw error;
        }

        console.log("Fetched requests data:", data);

        dispatch(setSentRequests(data.filter((request) => request.from_user_id === memoizedUser.id)));
        dispatch(setReceivedRequests(data.filter((request) => request.to_user_id === memoizedUser.id)));
      } catch (err) {
        console.error("Error in fetchAllRequests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (memoizedUser?.id) {
      fetchAllRequests();
    } else {
      setLoading(false);
      console.log("No user is logged in");
    }
  }, [memoizedUser, dispatch]);

  // Handle the "Cancel" button click
  const handleCancel = async (requestId) => {
    try {
      const { error } = await supabase
        .from("requests")
        .update({ status: "canceled" })
        .eq("id", requestId);

      if (error) throw error;

      // Update local and global state after canceling
      dispatch(updateSentRequestStatus({ requestId, status: "canceled" }));
      toast.success("Request canceled successfully");
    } catch (error) {
      toast.error("Error canceling request: " + error.message);
    }
  };

  // Handle the "Accept" button click
  const handleAccept = async (requestId) => {
    try {
      const { error } = await supabase
        .from("requests")
        .update({ status: "approved" })
        .eq("id", requestId);

      if (error) throw error;

      // Update local and global state after accepting
      dispatch(updateReceivedRequestStatus({ requestId, status: "accepted" }));
      toast.success("Request accepted successfully");
    } catch (error) {
      toast.error("Error accepting request: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading requests...</p>;
  }

  return (
    
    <div className="p-6">
      {console.log(receivedRequests)}
     {console.log(sentRequests)}
      <h2 className="mb-4 text-xl font-bold">Requests</h2>
      <Tabs defaultValue="received">
        <TabsList className="mb-4">
          <TabsTrigger value="received">Received Requests</TabsTrigger>
          <TabsTrigger value="sent">Sent Requests</TabsTrigger>
        </TabsList>

        {/* Received Requests */}
        <TabsContent value="received">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {receivedRequests?.length > 0 ? (
              receivedRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle>{request.book.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>From: {request.from_user.name}</p>
                    <p>Status: {request.status}</p>
                    {request.status === "pending" && (
                      <Button onClick={() => handleAccept(request.id)} className="mt-4">
                        Accept
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No received requests</p>
            )}
          </div>
        </TabsContent>

        {/* Sent Requests */}
        <TabsContent value="sent">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sentRequests?.length > 0 ? (
              sentRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle>{request.book.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>To: {request.to_user.name}</p>
                    <p>Status: {request.status}</p>
                    {request.status === "pending" && (
                      <Button onClick={() => handleCancel(request.id)} className="mt-4" variant="destructive">
                        Cancel
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No sent requests</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
