"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, getUserData } from "@/app/actions/auth/auth-actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData();
            if (userData) {
                setUser(userData);
            } else {
                router.push('/auth/sign-in');
            }
        };

        fetchUserData();
    }, [router]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
        router.refresh();
        toast.success("Signed out successfully!");
    };

    if (!user) {
        return <div className={`text-center`}>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div>
                            <strong>Role:</strong> {user.role}
                        </div>

                        <div className="flex justify-center">
                            <Image
                                src="/assets/profile/profile-asset.svg"
                                alt="Profile Asset"
                                width={150}
                                height={150}
                                className="my-20"
                            />
                        </div>

                        <Button className="w-full" variant="destructive" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}