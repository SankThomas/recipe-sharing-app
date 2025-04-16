"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { config, databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import RecipeCard from "@/components/recipecard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await databases.listDocuments(
        config.database,
        config.recipesCollection,
        [Query.orderDesc("$createdAt")],
      );
      setRecipes(response.documents);
    } catch (error) {
      toast.error("An error occurred when trying showing recipes", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      <div>
        <h1 className="mb-8 text-xl font-bold">News Feed</h1>
        {/* <Input /> */}
      </div>

      <div>
        {!recipes ? (
          <div>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          recipes.map((recipe) => <RecipeCard key={recipe.$id} {...recipe} />)
        )}
      </div>
    </section>
  );
}
