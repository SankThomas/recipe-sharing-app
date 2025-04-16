"use client";

import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { config, databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

export default function UploadRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    area: "",
    instructions: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const uploadImages = async (files) => {
    try {
      const imageUrls = await Promise.all(
        [...files].map(async (file) => {
          const uploadedFile = await storage.createFile(
            config.imagesBucket,
            ID.unique(),
            file,
          );
          return storage.getFileView(config.imagesBucket, uploadedFile.$id);
        }),
      );
      return imageUrls;
    } catch (error) {
      toast.error("Image upload failed:", { description: error.message });
      return [];
    }
  };

  const uploadRecipe = async () => {
    setUploading(true);

    try {
      let imageUrls = [];

      if (recipe.images.length > 0) {
        imageUrls = await uploadImages(recipe.images);
      }

      await databases.createDocument(
        config.database,
        config.recipesCollection,
        ID.unique(),
        {
          name: recipe.name,
          category: recipe.category,
          area: recipe.area,
          instructions: recipe.instructions,
          images: imageUrls,
        },
      );

      setRecipe({
        name: "",
        category: "",
        area: "",
        instructions: "",
        images: [],
      });

      router.refresh();

      toast.success("Recipe uploaded!");
    } catch (error) {
      toast.error("Error uploading recipe", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={uploadRecipe} className="space-y-3">
      <article>
        <Label htmlFor="image">Upload image</Label>
        <Input
          id="image"
          type="file"
          multiple
          onChange={(e) => setRecipe({ ...recipe, images: e.target.files })}
        />
      </article>

      <article>
        <Label htmlFor="recipe-name">Recipe name</Label>
        <Input
          id="recipe-name"
          placeholder="e.g chicken tikka masala"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
      </article>

      <article>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="e.g meat"
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
        />
      </article>

      <article>
        <Label htmlFor="area">Area</Label>
        <Input
          id="area"
          placeholder="e.g Kenyan"
          value={recipe.area}
          onChange={(e) => setRecipe({ ...recipe, area: e.target.value })}
        />
      </article>

      <article>
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="area"
          placeholder="Type something"
          rows={8}
          value={recipe.instructions}
          onChange={(e) =>
            setRecipe({ ...recipe, instructions: e.target.value })
          }
        />
      </article>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <DialogClose asChild>
          <Button variant="outline">
            <LogOutIcon /> Cancel
          </Button>
        </DialogClose>
        <Button disabled={uploading} onClick={uploadRecipe}>
          {uploading ? "+ Uploading recipe..." : "+ Upload product"}
        </Button>
      </div>
    </form>
  );
}
