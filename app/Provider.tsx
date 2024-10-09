"use client";

import Loader from "@/components/Loader"; // Import Loader component, which will act as a fallback during suspense
import { getClerkUsers } from "@/lib/actions/user.actions"; // Import action to retrieve users from Clerk
import {
  ClientSideSuspense, // Suspense component for managing loading state on the client side
  LiveblocksProvider, // Provider component from Liveblocks for handling real-time collaboration
} from "@liveblocks/react/suspense";

// Provider component: Wraps the application with Liveblocks functionality
// This component will provide real-time collaboration features to its children components
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      // Endpoint for handling authentication with Liveblocks
      authEndpoint="/api/liveblocks-auth"
      // Function to resolve user information based on provided userIds
      resolveUsers={async ({ userIds }) => {
        // Fetch user data from Clerk using the userIds
        const users = await getClerkUsers({ userIds });

        return users; // Return the fetched user data
      }}>
      {/* Suspense component used to delay rendering of children until Liveblocks is ready */}
      {/* Loader component will be shown as fallback while the users are being resolved */}
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider; // Export the Provider component for use in the application
