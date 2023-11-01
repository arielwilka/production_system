"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginAccount() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
      username: "",
      password: "",
    });
    const [error, setError] = useState("");
  
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        setFormValues({ username: "", password: "" });
  
        const res = await signIn("credentials", {
          redirect: false,
          username: formValues.username,
          password: formValues.password,
          callbackUrl,
        });
  
        setLoading(false);
  
        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          setError("invalid username or password");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  return (
    <div className="relative flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full m-auto --background rounded-3xl lg:max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Please login to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {error && (
                <div className="mt-4 text-red-500">{error}</div>
              )}
              <div className="mt-4">
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </CardFooter>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}