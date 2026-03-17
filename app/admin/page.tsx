import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Login page</CardTitle>
        <CardDescription>Please enter your credentials</CardDescription>

        <CardContent></CardContent>
      </CardHeader>
    </Card>
  );
}
