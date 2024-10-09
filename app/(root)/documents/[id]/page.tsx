// Mengimpor komponen dan fungsi yang diperlukan dari berbagai modul
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

// Mendefinisikan komponen Document yang menggunakan fungsi async
const Document = async ({ params: { id } }: SearchParamProps) => {
  // Mendapatkan informasi pengguna saat ini dari Clerk
  const clerkUser = await currentUser();
  // Jika pengguna tidak terautentikasi, alihkan ke halaman login
  if (!clerkUser) redirect("/sign-in");

  // Mengambil data dokumen berdasarkan ID ruangan dan email pengguna
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  // Jika dokumen tidak ditemukan, alihkan ke halaman utama
  if (!room) redirect("/");

  //TODO asses user permission on the docs

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={[]}
        currentUserType={"creator"}
      />
    </main>
  );
};

// Mengekspor komponen Document sebagai default export
export default Document;
