"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({
  $id,
  image,
  name,
  instructions,
  ingredients,
}) {
  return (
    <Link href={`/recipes/${$id}`} className="mb-4 block">
      <Card>
        <CardHeader>
          <Image
            src={image}
            alt={name}
            width={1920}
            height={1080}
            className="size-96 w-full rounded-lg object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-lg">{name}</CardTitle>
          <CardDescription className="leading-6">
            {instructions}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
